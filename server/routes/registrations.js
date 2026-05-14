const express = require("express");
const Registration = require("../models/Registration");
const auth = require("../middleware/auth");
const router = express.Router();

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

// Admin: list all registrations
router.get("/", auth, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: update registration status
router.put("/:id", auth, async (req, res) => {
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

module.exports = router;
