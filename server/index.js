const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Fail fast on missing configuration rather than booting a broken server that
// only errors once a request arrives.
for (const key of ["MONGODB_URI", "JWT_SECRET"]) {
  if (!process.env[key]) {
    console.error(`FATAL: ${key} is not set. Copy server/.env.example to server/.env.`);
    process.exit(1);
  }
}

const app = express();
const isProd = process.env.NODE_ENV === "production";

// Behind nginx: trust the proxy so req.ip is the real client IP, which the rate
// limiter keys on. Without this every request looks like it comes from 127.0.0.1
// and one visitor could exhaust the login limit for everyone.
app.set("trust proxy", 1);

// The uploads directory is gitignored, so a fresh deploy has no such folder and
// multer's diskStorage does not create it — resume uploads would fail on a new box.
const UPLOAD_DIR = path.join(__dirname, "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());

// In production, only the site's own origin may call the API. CORS_ORIGIN takes a
// comma-separated list. Left unset in development, any origin is allowed so the
// Vite dev server keeps working.
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Same-origin/server-side requests send no Origin header.
      if (!origin) return cb(null, true);
      if (!allowedOrigins.length) return cb(null, !isProd);
      cb(null, allowedOrigins.includes(origin));
    },
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// NOTE: uploads are deliberately NOT served as static files. This used to be
//   app.use("/uploads", express.static(UPLOAD_DIR))
// which published every candidate's resume at /uploads/<filename> with no
// authentication, bypassing the admin-only download route. Nothing in the
// frontend referenced it. Resumes and certificates are served exclusively
// through their authorised endpoints, which stream the file after a check.

// Throttle credential stuffing against the single admin account.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { error: "Too many login attempts. Please try again in 15 minutes." },
});

// Broad limit so a scripted client cannot hammer the public form endpoints.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down." },
});

app.get("/api/health", (req, res) =>
  res.json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uptime: Math.round(process.uptime()),
  })
);

app.use("/api", apiLimiter);
app.use("/api/auth/login", loginLimiter);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/registrations", require("./routes/registrations"));
app.use("/api/certificates", require("./routes/certificates"));
app.use("/api/blog", require("./routes/blog"));

// Unmatched API routes must return JSON. Without this they fall through to
// Express's HTML 404 page, which the frontend's res.json() cannot parse and
// surfaces to the user as a confusing parse error.
app.use("/api", (req, res) => res.status(404).json({ error: "Endpoint not found" }));

// Central error handler. Multer rejections (wrong type, too large) are emitted
// via next(err), not thrown inside the route's try/catch, so without this they
// would return an HTML 500 instead of an actionable message.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File is too large. Maximum size is 5MB." });
  }
  if (err.message === "Only PDF files allowed") {
    return res.status(415).json({ error: "Only PDF files are allowed." });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body is too large." });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: isProd ? "Server error" : err.message });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB (${mongoose.connection.name})`);
    const server = app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });

    // Let PM2 restarts and deploys drain in-flight requests instead of cutting
    // connections mid-upload.
    for (const signal of ["SIGTERM", "SIGINT"]) {
      process.on(signal, () => {
        console.log(`${signal} received, shutting down gracefully`);
        server.close(() => mongoose.connection.close(false).then(() => process.exit(0)));
        setTimeout(() => process.exit(1), 10000).unref();
      });
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
