const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Certificate = require("../models/Certificate");
const Registration = require("../models/Registration");
const auth = require("../middleware/auth");
const validateId = require("../middleware/validateId");
const router = express.Router();

// Certificates live in their own subfolder, separate from resumes.
const CERT_DIR = path.join(__dirname, "../uploads/certificates");
fs.mkdirSync(CERT_DIR, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, CERT_DIR),
    filename: (req, file, cb) => {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"));
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/** Strip the file fields a public caller must never see (storage path). */
function publicView(cert) {
  const o = cert.toObject ? cert.toObject() : { ...cert };
  delete o.filePath;
  return { ...o, hasFile: !!(cert.filePath) };
}

// Public: look up certificates by registration ID. Returns metadata only —
// downloading the PDF additionally requires the registered email address.
router.get("/lookup/:registrationId", async (req, res) => {
  try {
    const certificates = await Certificate.find({
      registrationId: req.params.registrationId,
    }).sort({ createdAt: -1 });
    res.json(certificates.map(publicView));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Public: download a certificate PDF.
 *
 * A registration ID alone is a weak secret — it is sequential and guessable
 * (PT-2026-001, -002, ...). So the caller must also supply the email address on
 * the original registration. Admins can download without the email using their
 * bearer token.
 */
router.post("/:id/download", validateId, async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ error: "Certificate not found" });
    if (!cert.filePath) {
      return res.status(404).json({ error: "No certificate file has been uploaded yet" });
    }

    // Admins may bypass the email check with a valid token.
    let authorised = false;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      try {
        require("jsonwebtoken").verify(token, process.env.JWT_SECRET);
        authorised = true;
      } catch {
        /* fall through to the email check */
      }
    }

    if (!authorised) {
      const supplied = String(req.body?.email || "").trim().toLowerCase();
      if (!supplied) {
        return res.status(400).json({ error: "Email address is required to download this certificate" });
      }
      const registration = await Registration.findOne({ registrationId: cert.registrationId });
      if (!registration || String(registration.email || "").trim().toLowerCase() !== supplied) {
        return res.status(403).json({
          error: "That email does not match the one on this registration.",
        });
      }
    }

    const stored = path.basename(cert.filePath);
    const filePath = path.join(CERT_DIR, stored);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Certificate file is no longer available" });
    }

    const safe = (cert.certificateId || "certificate").replace(/[^a-zA-Z0-9 _-]/g, "");
    res.download(filePath, `${safe}.pdf`);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: list all certificates (includes filePath presence via hasFile).
router.get("/", auth, async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates.map(publicView));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: issue a certificate, optionally attaching the signed PDF.
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.filePath = req.file.filename;
      data.originalName = req.file.originalname;
      data.fileSize = req.file.size;
    }
    const certificate = await Certificate.create(data);
    res.status(201).json(publicView(certificate));
  } catch (err) {
    // Do not leave an orphaned upload behind if the document failed to save.
    if (req.file) fs.rmSync(path.join(CERT_DIR, req.file.filename), { force: true });
    res.status(400).json({ error: err.message });
  }
});

// Admin: update a certificate, optionally replacing the PDF.
router.put("/:id", auth, validateId, upload.single("file"), async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      if (req.file) fs.rmSync(path.join(CERT_DIR, req.file.filename), { force: true });
      return res.status(404).json({ error: "Certificate not found" });
    }

    const previous = certificate.filePath;
    Object.assign(certificate, req.body);
    if (req.file) {
      certificate.filePath = req.file.filename;
      certificate.originalName = req.file.originalname;
      certificate.fileSize = req.file.size;
    }
    await certificate.save();

    // Remove the superseded file only after the new one is safely persisted.
    if (req.file && previous && previous !== certificate.filePath) {
      fs.rmSync(path.join(CERT_DIR, path.basename(previous)), { force: true });
    }
    res.json(publicView(certificate));
  } catch (err) {
    if (req.file) fs.rmSync(path.join(CERT_DIR, req.file.filename), { force: true });
    res.status(400).json({ error: err.message });
  }
});

// Admin: delete a certificate and its file.
router.delete("/:id", auth, validateId, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ error: "Certificate not found" });
    if (certificate.filePath) {
      fs.rmSync(path.join(CERT_DIR, path.basename(certificate.filePath)), { force: true });
    }
    res.json({ message: "Certificate deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
