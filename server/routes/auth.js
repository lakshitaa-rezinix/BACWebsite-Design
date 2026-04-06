const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();

const adminSchema = new mongoose.Schema({ email: String, password: String });
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token, email: admin.email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
