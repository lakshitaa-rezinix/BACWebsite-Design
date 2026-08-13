const mongoose = require("mongoose");

const { nextSequentialId } = require("../lib/sequence");

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

// Mongoose 9 calls async hooks with no arguments and awaits the returned
// promise. Taking a `next` parameter here threw "next is not a function" on
// every save, which made Registration.create() fail outright.
registrationSchema.pre("save", async function () {
  if (!this.registrationId) {
    this.registrationId = await nextSequentialId(this.constructor, "registrationId", "PT");
  }
});

module.exports = mongoose.model("Registration", registrationSchema);
