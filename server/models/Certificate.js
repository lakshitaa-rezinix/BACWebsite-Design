const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, unique: true },
  registrationId: { type: String, required: true },
  testType: { type: String, required: true },
  organizationName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Active", "Expired"],
    default: "Active",
  },
  createdAt: { type: Date, default: Date.now },
});

certificateSchema.pre("save", async function (next) {
  if (!this.certificateId) {
    const year = new Date().getFullYear();
    const counter = await Counter.findByIdAndUpdate(
      "certificateId",
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );
    this.certificateId = `CERT-${year}-${String(counter.seq).padStart(3, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Certificate", certificateSchema);
