const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

const registrationSchema = new mongoose.Schema({
  registrationId: { type: String, unique: true },
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  testType: {
    type: String,
    enum: ["Gold Purity Test", "Silver Hallmark", "Platinum Analysis", "Diamond Grading"],
    required: true,
  },
  preferredDate: { type: Date },
  notes: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

registrationSchema.pre("save", async function (next) {
  if (!this.registrationId) {
    const year = new Date().getFullYear();
    const counter = await Counter.findByIdAndUpdate(
      "registrationId",
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );
    this.registrationId = `PT-${year}-${String(counter.seq).padStart(3, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Registration", registrationSchema);
