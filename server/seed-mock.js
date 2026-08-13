// Demo/staging data seeder — NOT for a clean production launch.
//
//   node seed-mock.js          insert mock jobs, registrations, certificates, applications
//   node seed-mock.js --purge  remove exactly what this script inserts
//
// Mock records are identified by the marker values below, so --purge never
// touches real submissions. Resume PDFs are written into server/uploads/ so the
// admin panel's download button works on the mock applications too.
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Job = require("./models/Job");
const Registration = require("./models/Registration");
const Certificate = require("./models/Certificate");
const Application = require("./models/Application");

const MOCK_EMAIL_DOMAIN = "@mock.bacdemo.test";
const MOCK_JOB_TITLES = [
  "Senior Assayer — Fire Assay",
  "XRF Analyst",
  "Hallmarking Technician (HUID Marking)",
  "Quality Control Executive",
];

const UPLOAD_DIR = path.join(__dirname, "uploads");

const JOBS = [
  {
    title: MOCK_JOB_TITLES[0],
    department: "Fire Assay Laboratory",
    location: "Mumbai",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Lead cupellation and acid parting operations, own gravimetric accuracy for every batch, and mentor junior assayers on IS 1418 method compliance.",
    requirements: [
      "B.Sc. Chemistry or Metallurgy",
      "5+ years hands-on fire assay experience",
      "Working knowledge of IS 1418 and BIS hallmarking norms",
      "Comfortable with furnace operations in full PPE",
    ],
    isActive: true,
  },
  {
    title: MOCK_JOB_TITLES[1],
    department: "Testing",
    location: "Bangalore",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Operate SpectroCube and iEDX XRF analysers for non-destructive purity screening, and maintain calibration records against certified reference materials.",
    requirements: [
      "B.Sc. in Chemistry, Physics, or Materials Science",
      "Experience with XRF or similar analytical instrumentation",
      "Meticulous record-keeping",
    ],
    isActive: true,
  },
  {
    title: MOCK_JOB_TITLES[2],
    department: "Marking Bay",
    location: "Surat",
    type: "Full-time",
    experience: "1-3 years",
    description:
      "Apply six-digit HUID marks under microscope guidance, following the standard marking-position chart across bangles, rings, chains, and pendants.",
    requirements: [
      "Diploma or ITI qualification",
      "Steady hand and strong attention to detail",
      "Willing to work in shifts",
    ],
    isActive: true,
  },
  {
    title: MOCK_JOB_TITLES[3],
    department: "Quality Control",
    location: "Delhi",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Final verification of hallmarked articles before dispatch, including audit trails and non-conformance reporting.",
    requirements: ["B.Sc. or equivalent", "QMS/ISO 17025 exposure preferred"],
    isActive: false, // deliberately inactive, to exercise the admin's active/inactive filter
  },
];

const REGISTRATIONS = [
  {
    organizationName: "Rajkot Gold Testing Laboratory",
    laboratoryAddress: "22 Sarvoday Society, Gondal Road",
    cityStateCountry: "Rajkot, Gujarat, India",
    pinCode: "360002",
    contactPerson: "Nilesh Vora",
    designation: "Technical Manager",
    mobile: "9825044556",
    email: "nilesh.vora" + MOCK_EMAIL_DOMAIN,
    ptPrograms: ["Gold"],
    testType: "Gold",
    accreditationType: "NABL",
    accreditationNumber: "TC-7742",
    testMethod: "Fire Assay (cupellation) — IS 1418",
    agreeProtocol: true,
    agreeDataUse: true,
    status: "Approved",
  },
  {
    organizationName: "Coimbatore Assay & Hallmarking Centre",
    laboratoryAddress: "5/3 Raja Street, RS Puram",
    cityStateCountry: "Coimbatore, Tamil Nadu, India",
    pinCode: "641002",
    contactPerson: "Latha Subramanian",
    designation: "Lab Head",
    mobile: "9843011223",
    email: "latha.s" + MOCK_EMAIL_DOMAIN,
    ptPrograms: ["Gold", "Silver"],
    testType: "Gold, Silver",
    accreditationType: "BIS",
    accreditationNumber: "BIS-AHC-2291",
    testMethod: "Fire Assay (cupellation) — IS 1418",
    agreeProtocol: true,
    agreeDataUse: true,
    status: "Pending",
  },
  {
    organizationName: "Jaipur Precious Metal Analytics",
    laboratoryAddress: "opp. Gem Bhawan, MI Road",
    cityStateCountry: "Jaipur, Rajasthan, India",
    pinCode: "302001",
    contactPerson: "Arvind Sharma",
    designation: "Proprietor",
    mobile: "9414077889",
    email: "arvind" + MOCK_EMAIL_DOMAIN,
    ptPrograms: ["Silver"],
    testType: "Silver",
    accreditationType: "Not Accredited",
    testMethod: "Other",
    testMethodOther: "Volhard titration",
    agreeProtocol: true,
    agreeDataUse: true,
    status: "Pending",
  },
];

const APPLICATIONS = [
  {
    jobTitle: MOCK_JOB_TITLES[0],
    name: "Prakash Iyer",
    email: "prakash.iyer" + MOCK_EMAIL_DOMAIN,
    phone: "9820133445",
    coverLetter:
      "Eight years running cupellation furnaces at a BIS-recognised centre. I have trained four junior assayers and hold a clean audit record.",
    status: "Shortlisted",
  },
  {
    jobTitle: MOCK_JOB_TITLES[1],
    name: "Sneha Kulkarni",
    email: "sneha.k" + MOCK_EMAIL_DOMAIN,
    phone: "9930022110",
    coverLetter:
      "M.Sc. Analytical Chemistry with three years on ED-XRF instrumentation, including CRM-based calibration and drift monitoring.",
    status: "Under Review",
  },
  {
    jobTitle: MOCK_JOB_TITLES[2],
    name: "Imran Qureshi",
    email: "imran.q" + MOCK_EMAIL_DOMAIN,
    phone: "9727088990",
    coverLetter:
      "Two years of laser marking on finished jewellery in Surat. Familiar with HUID placement rules for chains and collet areas.",
    status: "Interview Scheduled",
  },
];

/** Minimal but structurally valid single-page PDF, so downloads open properly. */
function makePdf(name) {
  const text = `Resume - ${name} (mock data)`;
  const objs = [
    "<</Type/Catalog/Pages 2 0 R>>",
    "<</Type/Pages/Kids[3 0 R]/Count 1>>",
    "<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>",
    `<</Length ${text.length + 44}>>\nstream\nBT /F1 14 Tf 60 760 Td (${text}) Tj ET\nendstream`,
    "<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => (pdf += String(o).padStart(10, "0") + " 00000 n \n"));
  pdf += `trailer<</Size ${objs.length + 1}/Root 1 0 R>>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

async function purge() {
  const apps = await Application.find({ email: new RegExp(MOCK_EMAIL_DOMAIN + "$") });
  for (const a of apps) {
    if (a.resumePath) fs.rmSync(path.join(UPLOAD_DIR, path.basename(a.resumePath)), { force: true });
  }
  const r1 = await Application.deleteMany({ email: new RegExp(MOCK_EMAIL_DOMAIN + "$") });
  const regs = await Registration.find({ email: new RegExp(MOCK_EMAIL_DOMAIN + "$") });
  const regIds = regs.map((r) => r.registrationId);
  const r2 = await Registration.deleteMany({ email: new RegExp(MOCK_EMAIL_DOMAIN + "$") });
  const r3 = await Certificate.deleteMany({ registrationId: { $in: regIds } });
  const r4 = await Job.deleteMany({ title: { $in: MOCK_JOB_TITLES } });
  console.log(
    `Purged — jobs: ${r4.deletedCount}, registrations: ${r2.deletedCount}, ` +
      `certificates: ${r3.deletedCount}, applications: ${r1.deletedCount}`
  );
}

async function seed() {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  await Job.deleteMany({ title: { $in: MOCK_JOB_TITLES } });
  const jobs = await Job.create(JOBS);
  console.log(`Jobs: ${jobs.length} created (${jobs.filter((j) => j.isActive).length} active)`);

  // Registrations use a pre-save hook for the PT id, so insert them one by one.
  await Registration.deleteMany({ email: new RegExp(MOCK_EMAIL_DOMAIN + "$") });
  const regs = [];
  for (const r of REGISTRATIONS) regs.push(await Registration.create(r));
  console.log(`Registrations: ${regs.length} created — ${regs.map((r) => r.registrationId).join(", ")}`);

  // Issue a certificate for the approved lab only, so the portal lookup demo works.
  const approved = regs.find((r) => r.status === "Approved");
  await Certificate.deleteMany({ registrationId: approved.registrationId });
  const cert = await Certificate.create({
    registrationId: approved.registrationId,
    testType: "Gold",
    organizationName: approved.organizationName,
    issueDate: new Date(),
    validUntil: new Date(Date.now() + 365 * 24 * 3600 * 1000),
    status: "Active",
  });
  console.log(`Certificates: 1 created — ${cert.certificateId} for ${approved.registrationId}`);

  await Application.deleteMany({ email: new RegExp(MOCK_EMAIL_DOMAIN + "$") });
  let n = 0;
  for (const a of APPLICATIONS) {
    const job = jobs.find((j) => j.title === a.jobTitle);
    const filename = `mock-${Date.now()}-${n}.pdf`;
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), makePdf(a.name));
    await Application.create({ ...a, jobId: job._id, resumePath: filename });
    n++;
  }
  console.log(`Applications: ${n} created (resume PDFs written to server/uploads/)`);
}

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to ${mongoose.connection.name}\n`);
  if (process.argv.includes("--purge")) await purge();
  else await seed();
  await mongoose.disconnect();
})().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
