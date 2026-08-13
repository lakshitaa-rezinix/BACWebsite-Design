const express = require("express");
const path = require("path");
const fs = require("fs");
const Registration = require("../models/Registration");
const Certificate = require("../models/Certificate");
const auth = require("../middleware/auth");
const validateId = require("../middleware/validateId");
const router = express.Router();

const CERT_DIR = path.join(__dirname, "../uploads/certificates");

// Public: submit registration
router.post("/", async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json({
      message: "Registration submitted successfully",
      registrationId: registration.registrationId,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: list all registrations, each with how many certificates reference it
// so the UI can warn before a delete cascades.
router.get("/", auth, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 }).lean();

    const counts = await Certificate.aggregate([
      { $group: { _id: "$registrationId", count: { $sum: 1 } } },
    ]);
    const byRegId = Object.fromEntries(counts.map((c) => [c._id, c.count]));

    res.json(
      registrations.map((r) => ({ ...r, certificateCount: byRegId[r.registrationId] || 0 }))
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: update registration status
router.put("/:id", auth, validateId, async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!registration) return res.status(404).json({ error: "Registration not found" });
    res.json(registration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Admin: delete a registration.
 *
 * Certificates reference a registration by its PT id, and the portal verifies a
 * downloader's email against the registration record. Leaving certificates
 * behind would therefore strand them — findable but undownloadable — so they
 * are removed with the registration. The UI warns with the exact count first.
 */
router.delete("/:id", auth, validateId, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ error: "Registration not found" });

    const certificates = await Certificate.find({ registrationId: registration.registrationId });
    for (const cert of certificates) {
      if (cert.filePath) {
        fs.rmSync(path.join(CERT_DIR, path.basename(cert.filePath)), { force: true });
      }
    }
    await Certificate.deleteMany({ registrationId: registration.registrationId });
    await Registration.findByIdAndDelete(req.params.id);

    res.json({
      message: "Registration deleted",
      certificatesDeleted: certificates.length,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
