import { motion } from "motion/react";
import {
  FileText,
  Award,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { api } from "../lib/api";
import { toast } from "sonner";

interface Certificate {
  _id: string;
  certificateId: string;
  registrationId: string;
  testType: string;
  organizationName: string;
  issueDate: string;
  validUntil: string;
  hasFile?: boolean;
  status: string;
}

export function ProficiencyPortal() {
  const [activeTab, setActiveTab] = useState<"register" | "certificates">("register");

  // Registration form state — mirrors BAC/PT/REG enrolment form
  const emptyRegForm = {
    // 1 | Laboratory Information
    organizationName: "", // Laboratory Name
    laboratoryAddress: "",
    cityStateCountry: "",
    pinCode: "",
    contactPerson: "",
    designation: "",
    mobile: "",
    email: "",
    // 2 | PT Program Applied For
    goldPT: false,
    silverPT: false,
    // 3 | Accreditation Details
    accreditationType: "NABL Accredited (ISO/IEC 17025:2017)",
    accreditationNumber: "",
    gstNumber: "",
    // 4 | PT Participation Details
    testMethod: "Fire Assay (cupellation) — IS 1418",
    testMethodOther: "",
    // 5 | Declaration
    agreeProtocol: false,
    agreeDataUse: false,
  };
  const [regForm, setRegForm] = useState(emptyRegForm);
  const [submittingReg, setSubmittingReg] = useState(false);
  const [assignedRegId, setAssignedRegId] = useState<string | null>(null);

  // Certificate lookup state
  const [lookupId, setLookupId] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [lookingUp, setLookingUp] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState<Record<string, string>>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ptPrograms = [
      ...(regForm.goldPT ? ["Gold"] : []),
      ...(regForm.silverPT ? ["Silver"] : []),
    ];
    if (ptPrograms.length === 0) {
      toast.error("Please select at least one PT program (Gold or Silver).");
      return;
    }
    if (regForm.testMethod === "Other" && !regForm.testMethodOther.trim()) {
      toast.error("Please specify your test method.");
      return;
    }
    if (!regForm.agreeProtocol) {
      toast.error("Please confirm agreement to the PT scheme protocol.");
      return;
    }

    setSubmittingReg(true);
    setAssignedRegId(null);
    try {
      const payload = {
        organizationName: regForm.organizationName,
        laboratoryAddress: regForm.laboratoryAddress,
        cityStateCountry: regForm.cityStateCountry,
        pinCode: regForm.pinCode,
        contactPerson: regForm.contactPerson,
        designation: regForm.designation,
        mobile: regForm.mobile,
        email: regForm.email,
        ptPrograms,
        testType: `${ptPrograms.join(" & ")} PT Program`,
        accreditationType: regForm.accreditationType,
        accreditationNumber: regForm.accreditationNumber,
        gstNumber: regForm.gstNumber,
        testMethod:
          regForm.testMethod === "Other"
            ? regForm.testMethodOther
            : regForm.testMethod,
        testMethodOther: regForm.testMethodOther,
        agreeProtocol: regForm.agreeProtocol,
        agreeDataUse: regForm.agreeDataUse,
        applicationDate: new Date().toISOString(),
      };
      const result = await api.submitRegistration(payload);
      setAssignedRegId(result.registrationId);
      toast.success("Registration submitted successfully!");
      setRegForm(emptyRegForm);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit registration");
    } finally {
      setSubmittingReg(false);
    }
  };

  const handleCertificateDownload = async (cert: Certificate) => {
    const email = (downloadEmail[cert._id] ?? "").trim();
    if (!email) {
      toast.error("Please enter the email address on your registration");
      return;
    }
    setDownloadingId(cert._id);
    try {
      await api.downloadCertificate(cert._id, email, cert.certificateId);
      toast.success("Certificate downloaded");
    } catch (err: any) {
      toast.error(err.message || "Could not download certificate");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleCertificateLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupId.trim()) return;
    setLookingUp(true);
    setHasSearched(true);
    try {
      const results = await api.lookupCertificates(lookupId.trim());
      setCertificates(results);
      if (results.length === 0) {
        toast.info("No certificates found for this registration ID");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to look up certificates");
      setCertificates([]);
    } finally {
      setLookingUp(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #C6A75E 1px, transparent 1px),
              linear-gradient(to bottom, #C6A75E 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-block mb-4">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Digital Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Proficiency Testing Portal
            </h1>
            <p className="text-muted-foreground text-xl">
              Streamlined online registration, certification, and management system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-6 border-b border-primary/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            {[
              { id: "register" as const, label: "New Registration", icon: FileText },
              { id: "certificates" as const, label: "My Certificates", icon: Award },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/50 text-muted-foreground hover:text-foreground border border-primary/20"
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              {/* Success message with registration ID */}
              {assignedRegId && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-6 bg-green-500/10 border border-green-500/30 rounded-xl text-center"
                >
                  <CheckCircle className="text-green-400 mx-auto mb-3" size={32} />
                  <h3 className="text-xl font-bold text-foreground mb-2">Registration Submitted!</h3>
                  <p className="text-muted-foreground mb-3">Your registration ID is:</p>
                  <div className="text-3xl font-mono font-bold text-primary bg-primary/10 rounded-lg py-3 px-6 inline-block">
                    {assignedRegId}
                  </div>
                  <p className="text-muted-foreground text-sm mt-3">
                    Save this ID to look up your certificates later.
                  </p>
                </motion.div>
              )}

              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-8">
                <div className="mb-8">
                  <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                    Form Ref: BAC/PT/REG · Rev. 01
                  </span>
                  <h2 className="text-3xl font-bold text-foreground mt-1">
                    PT Program Registration
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Proficiency Testing (PT) Program — Gold &amp; Silver enrolment.
                    Fields marked <span className="text-primary">*</span> are mandatory.
                  </p>
                </div>

                <form onSubmit={handleRegistrationSubmit} className="space-y-10">
                  {/* 1 | Laboratory Information */}
                  <fieldset className="space-y-5">
                    <legend className="w-full text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-2 mb-4">
                      1 | Laboratory Information
                    </legend>

                    <div>
                      <label className="block text-foreground mb-2 text-sm">
                        Laboratory Name <span className="text-primary">*</span>
                      </label>
                      <Input
                        required
                        type="text"
                        placeholder="Enter laboratory name"
                        value={regForm.organizationName}
                        onChange={(e) => setRegForm({ ...regForm, organizationName: e.target.value })}
                        className="bg-background/50 border-primary/20 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-foreground mb-2 text-sm">
                        Laboratory Address <span className="text-primary">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Enter full laboratory address"
                        value={regForm.laboratoryAddress}
                        onChange={(e) => setRegForm({ ...regForm, laboratoryAddress: e.target.value })}
                        className="w-full px-4 py-2 bg-background/50 border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-foreground mb-2 text-sm">
                          City / State / Country <span className="text-primary">*</span>
                        </label>
                        <Input
                          required
                          type="text"
                          placeholder="e.g. Mumbai, Maharashtra, India"
                          value={regForm.cityStateCountry}
                          onChange={(e) => setRegForm({ ...regForm, cityStateCountry: e.target.value })}
                          className="bg-background/50 border-primary/20 text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-foreground mb-2 text-sm">
                          PIN Code
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter PIN code"
                          value={regForm.pinCode}
                          onChange={(e) => setRegForm({ ...regForm, pinCode: e.target.value })}
                          className="bg-background/50 border-primary/20 text-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-foreground mb-2 text-sm">
                          Contact Person Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter contact person name"
                          value={regForm.contactPerson}
                          onChange={(e) => setRegForm({ ...regForm, contactPerson: e.target.value })}
                          className="bg-background/50 border-primary/20 text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-foreground mb-2 text-sm">
                          Designation <span className="text-primary">*</span>
                        </label>
                        <Input
                          required
                          type="text"
                          placeholder="e.g. Quality Manager"
                          value={regForm.designation}
                          onChange={(e) => setRegForm({ ...regForm, designation: e.target.value })}
                          className="bg-background/50 border-primary/20 text-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-foreground mb-2 text-sm">
                          Mobile Number <span className="text-primary">*</span>
                        </label>
                        <Input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={regForm.mobile}
                          onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                          className="bg-background/50 border-primary/20 text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-foreground mb-2 text-sm">
                          Email ID <span className="text-primary">*</span>
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="Enter email address"
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          className="bg-background/50 border-primary/20 text-foreground"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* 2 | PT Program Applied For */}
                  <fieldset className="space-y-4">
                    <legend className="w-full text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-2 mb-4">
                      2 | PT Program Applied For <span className="text-primary">*</span>
                    </legend>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <label
                        className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          regForm.goldPT
                            ? "border-primary bg-primary/10"
                            : "border-primary/20 bg-background/30 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={regForm.goldPT}
                          onChange={(e) => setRegForm({ ...regForm, goldPT: e.target.checked })}
                          className="mt-1 accent-primary"
                        />
                        <span>
                          <span className="block font-semibold text-foreground">GOLD PT Program</span>
                          <span className="block text-muted-foreground text-sm">
                            Proficiency testing for gold purity / assay
                          </span>
                        </span>
                      </label>

                      <label
                        className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          regForm.silverPT
                            ? "border-primary bg-primary/10"
                            : "border-primary/20 bg-background/30 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={regForm.silverPT}
                          onChange={(e) => setRegForm({ ...regForm, silverPT: e.target.checked })}
                          className="mt-1 accent-primary"
                        />
                        <span>
                          <span className="block font-semibold text-foreground">SILVER PT Program</span>
                          <span className="block text-muted-foreground text-sm">
                            Proficiency testing for silver purity / assay
                          </span>
                        </span>
                      </label>
                    </div>
                  </fieldset>

                  {/* 3 | Accreditation Details */}
                  <fieldset className="space-y-5">
                    <legend className="w-full text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-2 mb-4">
                      3 | Accreditation Details
                    </legend>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "NABL Accredited (ISO/IEC 17025:2017)",
                        "BIS Recognized",
                        "Internal Laboratory",
                        "Not Accredited",
                      ].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm ${
                            regForm.accreditationType === option
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-primary/20 bg-background/30 text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="accreditationType"
                            value={option}
                            checked={regForm.accreditationType === option}
                            onChange={(e) => setRegForm({ ...regForm, accreditationType: e.target.value })}
                            className="accent-primary"
                          />
                          {option}
                        </label>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-foreground mb-2 text-sm">
                          NABL / BIS Number (if applicable)
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter accreditation number"
                          value={regForm.accreditationNumber}
                          onChange={(e) => setRegForm({ ...regForm, accreditationNumber: e.target.value })}
                          className="bg-background/50 border-primary/20 text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-foreground mb-2 text-sm">
                          GST Number <span className="text-primary">*</span>
                        </label>
                        <Input
                          required
                          type="text"
                          placeholder="Enter GST number (or NA)"
                          value={regForm.gstNumber}
                          onChange={(e) => setRegForm({ ...regForm, gstNumber: e.target.value })}
                          className="bg-background/50 border-primary/20 text-foreground"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* 4 | PT Participation Details */}
                  <fieldset className="space-y-4">
                    <legend className="w-full text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-2 mb-4">
                      4 | PT Participation Details
                    </legend>

                    <div>
                      <label className="block text-foreground mb-3 text-sm">
                        Test Method Used in Your Laboratory <span className="text-primary">*</span>
                      </label>
                      <div className="space-y-3">
                        {[
                          "Fire Assay (cupellation) — IS 1418",
                          "Other",
                        ].map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-3 text-foreground/90 cursor-pointer text-sm"
                          >
                            <input
                              type="radio"
                              name="testMethod"
                              value={option}
                              checked={regForm.testMethod === option}
                              onChange={(e) => setRegForm({ ...regForm, testMethod: e.target.value })}
                              className="accent-primary"
                            />
                            {option === "Other" ? "Other (please specify below)" : option}
                          </label>
                        ))}
                      </div>

                      {regForm.testMethod === "Other" && (
                        <Input
                          type="text"
                          placeholder="Specify your test method"
                          value={regForm.testMethodOther}
                          onChange={(e) => setRegForm({ ...regForm, testMethodOther: e.target.value })}
                          className="mt-3 bg-background/50 border-primary/20 text-foreground"
                        />
                      )}
                    </div>
                  </fieldset>

                  {/* 5 | Declaration */}
                  <fieldset className="space-y-4">
                    <legend className="w-full text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-2 mb-4">
                      5 | Declaration
                    </legend>

                    <p className="text-muted-foreground text-sm">
                      I/We hereby apply to participate in the Proficiency Testing Program of
                      Bombay Assay Company. I/We confirm that the information provided is true
                      and correct, agree to abide by the PT scheme protocol and confidentiality
                      terms, and undertake to remit the applicable fee.
                    </p>

                    <label className="flex items-start gap-3 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={regForm.agreeProtocol}
                        onChange={(e) => setRegForm({ ...regForm, agreeProtocol: e.target.checked })}
                        className="mt-1 accent-primary"
                      />
                      <span className="text-foreground/90">
                        I confirm our laboratory agrees to follow PT instructions, maintain
                        confidentiality, and submit results on time. <span className="text-primary">*</span>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={regForm.agreeDataUse}
                        onChange={(e) => setRegForm({ ...regForm, agreeDataUse: e.target.checked })}
                        className="mt-1 accent-primary"
                      />
                      <span className="text-foreground/90">
                        I agree that anonymized data may be used for statistical evaluation and reporting.
                      </span>
                    </label>
                  </fieldset>

                  <Button
                    type="submit"
                    disabled={submittingReg}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-6"
                  >
                    {submittingReg ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={16} />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Registration"
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              {/* Lookup Form */}
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-8 mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Certificate Lookup
                </h2>
                <p className="text-muted-foreground mb-6">
                  Enter your registration ID to find your certificates.
                </p>
                <form onSubmit={handleCertificateLookup} className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="e.g. PT-2026-001"
                    value={lookupId}
                    onChange={(e) => setLookupId(e.target.value)}
                    className="flex-1 bg-background/50 border-primary/20 text-foreground"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={lookingUp}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-6"
                  >
                    {lookingUp ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <span className="flex items-center gap-2">
                        <Search size={16} />
                        Look Up
                      </span>
                    )}
                  </Button>
                </form>
              </div>

              {/* Results */}
              {hasSearched && !lookingUp && (
                <div className="space-y-4">
                  {certificates.length === 0 ? (
                    <div className="text-center py-12 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl">
                      <XCircle className="text-muted-foreground mx-auto mb-3" size={32} />
                      <p className="text-muted-foreground">
                        No certificates found for this registration ID.
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Please check your ID and try again.
                      </p>
                    </div>
                  ) : (
                    certificates.map((cert, index) => (
                      <motion.div
                        key={cert._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl hover:border-primary/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Award className="text-primary" size={28} />
                          </div>
                          {cert.status === "Active" ? (
                            <span className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                              <CheckCircle size={16} /> Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                              <Clock size={16} /> Expired
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {cert.certificateId}
                        </h3>
                        <p className="text-primary text-sm mb-1">{cert.testType}</p>
                        <p className="text-muted-foreground text-sm mb-1">
                          Organization: {cert.organizationName}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Issued: {new Date(cert.issueDate).toLocaleDateString()} &bull;
                          Valid Until: {new Date(cert.validUntil).toLocaleDateString()}
                        </p>

                        {cert.hasFile ? (
                          <div className="mt-4 pt-4 border-t border-primary/15">
                            <label className="block text-sm text-foreground mb-2">
                              Enter the email address on your registration to download
                              the certificate PDF
                            </label>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Input
                                type="email"
                                value={downloadEmail[cert._id] ?? ""}
                                onChange={(e) =>
                                  setDownloadEmail((prev) => ({
                                    ...prev,
                                    [cert._id]: e.target.value,
                                  }))
                                }
                                placeholder="you@laboratory.com"
                                className="bg-background/50 border-primary/20 text-foreground"
                              />
                              <Button
                                type="button"
                                onClick={() => handleCertificateDownload(cert)}
                                disabled={downloadingId === cert._id}
                                className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold whitespace-nowrap"
                              >
                                {downloadingId === cert._id ? (
                                  <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={16} />
                                    Preparing...
                                  </span>
                                ) : (
                                  "Download PDF"
                                )}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-4 pt-4 border-t border-primary/15 text-muted-foreground text-sm">
                            The signed PDF for this certificate has not been uploaded
                            yet. Please contact BAC if you need it urgently.
                          </p>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
