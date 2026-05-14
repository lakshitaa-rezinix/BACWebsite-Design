const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Inline admin schema for seeding
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const existing = await Admin.findOne({ email: "admin@bombayassay.com" });
  if (!existing) {
    const hashed = await bcrypt.hash("BACadmin2026", 10);
    await Admin.create({ email: "admin@bombayassay.com", password: hashed });
    console.log("Admin user created: admin@bombayassay.com / BACadmin2026");
  } else {
    console.log("Admin user already exists");
  }
  await mongoose.disconnect();
}

seed();
