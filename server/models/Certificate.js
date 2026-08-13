const mongoose = require("mongoose");

const { nextSequentialId } = require("../lib/sequence");

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

  // Uploaded PDF. Stored on the server's disk under uploads/certificates/ and
  // served ONLY through the authorised download route — never as a static file.
  filePath: { type: String },
  originalName: { type: String },
  fileSize: { type: Number },

  createdAt: { type: Date, default: Date.now },
});

// Mongoose 9 calls async hooks with no arguments and awaits the returned
// promise. Taking a `next` parameter here threw "next is not a function" on
// every save, which made Certificate.create() fail outright.
certificateSchema.pre("save", async function () {
  if (!this.certificateId) {
    this.certificateId = await nextSequentialId(this.constructor, "certificateId", "CERT");
  }
});

module.exports = mongoose.model("Certificate", certificateSchema);
