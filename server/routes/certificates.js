const express = require("express");
const Certificate = require("../models/Certificate");
const auth = require("../middleware/auth");
const validateId = require("../middleware/validateId");
const router = express.Router();

// Public: lookup by registration ID
router.get("/lookup/:registrationId", async (req, res) => {
  try {
    const certificates = await Certificate.find({
      registrationId: req.params.registrationId,
    }).sort({ createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: list all certificates
router.get("/", auth, async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: issue certificate
router.post("/", auth, async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json(certificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: update certificate
router.put("/:id", auth, validateId, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!certificate) return res.status(404).json({ error: "Certificate not found" });
    res.json(certificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: delete certificate
router.delete("/:id", auth, validateId, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
