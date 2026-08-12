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

// Mongoose 9 calls async hooks with no arguments and awaits the returned
// promise. Taking a `next` parameter here threw "next is not a function" on
// every save, which made Certificate.create() fail outright.
certificateSchema.pre("save", async function () {
  if (!this.certificateId) {
    const year = new Date().getFullYear();
    const counter = await Counter.findByIdAndUpdate(
      "certificateId",
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" }
    );
    this.certificateId = `CERT-${year}-${String(counter.seq).padStart(3, "0")}`;
  }
});

module.exports = mongoose.model("Certificate", certificateSchema);
