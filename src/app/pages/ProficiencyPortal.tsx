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
  status: string;
}

export function ProficiencyPortal() {
  const [activeTab, setActiveTab] = useState<"register" | "certificates">("register");

  // Registration form state
  const [regForm, setRegForm] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    testType: "Gold Purity Test",
    preferredDate: "",
    notes: "",
  });
  const [submittingReg, setSubmittingReg] = useState(false);
  const [assignedRegId, setAssignedRegId] = useState<string | null>(null);

  // Certificate lookup state
  const [lookupId, setLookupId] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [lookingUp, setLookingUp] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingReg(true);
    setAssignedRegId(null);
    try {
      const result = await api.submitRegistration(regForm);
      setAssignedRegId(result.registrationId);
      toast.success("Registration submitted successfully!");
      setRegForm({
        organizationName: "",
        contactPerson: "",
        email: "",
        testType: "Gold Purity Test",
        preferredDate: "",
        notes: "",
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit registration");
    } finally {
      setSubmittingReg(false);
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
              className="max-w-2xl mx-auto"
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
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  New Registration
                </h2>
                <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                  <div>
                    <label className="block text-foreground mb-2">
                      Organization Name *
                    </label>
                    <Input
                      required
                      type="text"
                      placeholder="Enter organization name"
                      value={regForm.organizationName}
                      onChange={(e) => setRegForm({ ...regForm, organizationName: e.target.value })}
                      className="bg-background/50 border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2">
                      Contact Person *
                    </label>
                    <Input
                      required
                      type="text"
                      placeholder="Enter contact person name"
                      value={regForm.contactPerson}
                      onChange={(e) => setRegForm({ ...regForm, contactPerson: e.target.value })}
                      className="bg-background/50 border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2">
                      Email Address *
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

                  <div>
                    <label className="block text-foreground mb-2">
                      Test Type *
                    </label>
                    <select
                      value={regForm.testType}
                      onChange={(e) => setRegForm({ ...regForm, testType: e.target.value })}
                      className="w-full px-4 py-2 bg-background/50 border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors"
                    >
                      <option>Gold Purity Test</option>
                      <option>Silver Hallmark</option>
                      <option>Platinum Analysis</option>
                      <option>Diamond Grading</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-foreground mb-2">
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      value={regForm.preferredDate}
                      onChange={(e) => setRegForm({ ...regForm, preferredDate: e.target.value })}
                      className="bg-background/50 border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Any special requirements or notes..."
                      value={regForm.notes}
                      onChange={(e) => setRegForm({ ...regForm, notes: e.target.value })}
                      className="w-full px-4 py-2 bg-background/50 border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

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
