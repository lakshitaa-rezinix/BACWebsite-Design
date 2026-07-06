const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

const registrationSchema = new mongoose.Schema({
  registrationId: { type: String, unique: true },

  // 1 | Laboratory Information
  organizationName: { type: String, required: true }, // Laboratory Name
  laboratoryAddress: { type: String },
  cityStateCountry: { type: String },
  pinCode: { type: String },
  contactPerson: { type: String },
  designation: { type: String },
  mobile: { type: String },
  email: { type: String, required: true },

  // 2 | PT Program Applied For
  ptPrograms: { type: [String], default: [] }, // e.g. ["Gold", "Silver"]
  // Human-readable summary kept for the admin table / certificate mapping
  testType: { type: String },

  // 3 | Accreditation Details
  accreditationType: { type: String }, // NABL / BIS / Internal / Not Accredited
  accreditationNumber: { type: String },
  gstNumber: { type: String },

  // 4 | PT Participation Details
  testMethod: { type: String }, // Fire Assay (cupellation) — IS 1418 / Other
  testMethodOther: { type: String },

  // 5 | Declaration
  agreeProtocol: { type: Boolean, default: false },
  agreeDataUse: { type: Boolean, default: false },

  applicationDate: { type: Date },
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
