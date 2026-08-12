const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Inline admin schema for seeding
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);

// Credentials come from the environment so a real password never lives in the
// repo. Set ADMIN_EMAIL / ADMIN_PASSWORD before running against a live database.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@bombayassay.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function seed() {
  if (!ADMIN_PASSWORD) {
    console.error(
      "Refusing to seed: ADMIN_PASSWORD is not set.\n" +
        "Run with an explicit password, e.g.\n" +
        "  ADMIN_PASSWORD='<strong-password>' node seed.js"
    );
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!existing) {
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await Admin.create({ email: ADMIN_EMAIL, password: hashed });
    console.log(`Admin user created: ${ADMIN_EMAIL}`);
  } else {
    console.log(`Admin user already exists: ${ADMIN_EMAIL}`);
  }
  await mongoose.disconnect();
}

seed();
