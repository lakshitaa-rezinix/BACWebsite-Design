const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  jobTitle: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  coverLetter: { type: String },
  resumePath: { type: String, required: true },
  status: {
    type: String,
    enum: ["Under Review", "Shortlisted", "Interview Scheduled", "Rejected", "Hired"],
    default: "Under Review",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);
