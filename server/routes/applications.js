const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Application = require("../models/Application");
const auth = require("../middleware/auth");
const validateId = require("../middleware/validateId");
const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Public: submit application
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { jobId, jobTitle, name, email, phone, coverLetter } = req.body;
    if (!req.file) return res.status(400).json({ error: "Resume is required" });

    const application = await Application.create({
      jobId,
      jobTitle,
      name,
      email,
      phone,
      coverLetter,
      resumePath: req.file.filename,
    });
    res.status(201).json({ message: "Application submitted successfully", id: application._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: list all applications
router.get("/", auth, async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: update application status
router.put("/:id", auth, validateId, async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: download resume
router.get("/:id/resume", auth, validateId, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });

    // resumePath is a server-generated basename, but strip any directory part
    // anyway so a malformed record can never escape the uploads directory.
    const stored = path.basename(application.resumePath || "");
    const filePath = path.join(UPLOAD_DIR, stored);
    if (!stored || !fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Resume file is no longer available" });
    }

    // Without this the browser saves the random storage name (e.g. 17123-948.pdf).
    const safeName = (application.name || "candidate").replace(/[^a-zA-Z0-9 _-]/g, "").trim();
    res.download(filePath, `${safeName || "candidate"} - Resume.pdf`);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
