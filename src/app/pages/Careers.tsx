import { motion } from "motion/react";
import { Briefcase, MapPin, Clock, ChevronRight, Search, Filter, X, Upload, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { SplitTextReveal, GoldShimmerText } from "../components/animations/AnimatedText";
import { api } from "../lib/api";
import { toast } from "sonner";

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  isActive: boolean;
}

export function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    api.getJobs()
      .then(setJobs)
      .catch(() => toast.error("Failed to load job listings"))
      .finally(() => setLoading(false));
  }, []);

  const departments = ["all", ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || job.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleApply = (job: Job) => {
    setApplyingJob(job);
    setShowApplicationForm(true);
    setFormData({ name: "", email: "", phone: "", coverLetter: "" });
    setResumeFile(null);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob || !resumeFile) return;

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("jobId", applyingJob._id);
      data.append("jobTitle", applyingJob.title);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("coverLetter", formData.coverLetter);
      data.append("resume", resumeFile);

      await api.submitApplication(data);
      toast.success("Application submitted successfully!");
      setShowApplicationForm(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #C6A75E 1px, transparent 1px),
              linear-gradient(to bottom, #C6A75E 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              <SplitTextReveal splitBy="word" staggerDelay={0.08} animate>
                Join Our Team
              </SplitTextReveal>
            </h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-muted-foreground text-xl mb-8">
              <GoldShimmerText>
                Build your career with India's leading hallmarking and quality assurance company
              </GoldShimmerText>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-y border-primary/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" size={20} />
              <Input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-primary/20 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60 pointer-events-none" size={20} />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="pl-10 pr-4 py-2 bg-card border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
              <span className="ml-3 text-muted-foreground">Loading positions...</span>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Job Cards */}
              <div className="lg:col-span-2 space-y-4">
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      {jobs.length === 0
                        ? "No open positions at the moment. Check back soon!"
                        : "No positions match your search."}
                    </p>
                  </div>
                ) : (
                  filteredJobs.map((job, index) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedJob(job._id)}
                      className={`p-6 bg-card/50 backdrop-blur-sm border rounded-xl cursor-pointer transition-all ${
                        selectedJob === job._id
                          ? "border-primary bg-primary/5"
                          : "border-primary/20 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {job.title}
                          </h3>
                          <div className="text-primary text-sm">{job.department}</div>
                        </div>
                        <ChevronRight
                          className={`text-primary transition-transform ${
                            selectedJob === job._id ? "rotate-90" : ""
                          }`}
                          size={20}
                        />
                      </div>

                      <p className="text-muted-foreground mb-4">{job.description}</p>

                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin size={16} className="text-primary" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock size={16} className="text-primary" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Briefcase size={16} className="text-primary" />
                          {job.experience}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Job Details Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit">
                {selectedJob ? (
                  <motion.div
                    key={selectedJob}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl"
                  >
                    {(() => {
                      const job = jobs.find((j) => j._id === selectedJob);
                      if (!job) return null;
                      return (
                        <>
                          <h3 className="text-2xl font-bold text-foreground mb-4">
                            Requirements
                          </h3>
                          <ul className="space-y-3 mb-6">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            onClick={() => handleApply(job)}
                            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold"
                          >
                            Apply Now
                          </Button>
                        </>
                      );
                    })()}
                  </motion.div>
                ) : (
                  <div className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl text-center">
                    <p className="text-muted-foreground">
                      Select a position to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Join BAC?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Competitive Compensation",
                description: "Industry-leading salary packages and benefits"
              },
              {
                title: "Career Growth",
                description: "Continuous learning and advancement opportunities"
              },
              {
                title: "Work-Life Balance",
                description: "Flexible schedules and supportive environment"
              },
              {
                title: "Health Benefits",
                description: "Comprehensive health insurance for you and family"
              },
              {
                title: "Industry Leadership",
                description: "Work with BIS-certified excellence standards"
              },
              {
                title: "Innovation Culture",
                description: "Be part of cutting-edge quality assurance"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl hover:border-primary/50 transition-all"
              >
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationForm && applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-primary/20 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Apply for Position</h3>
                <p className="text-primary text-sm mt-1">{applyingJob.title}</p>
              </div>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-card border-primary/20 text-foreground"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-card border-primary/20 text-foreground"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-card border-primary/20 text-foreground"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Cover Letter</label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-card border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us why you'd be a great fit..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Resume (PDF) *</label>
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/60 transition-colors">
                  <Upload size={20} className="text-primary" />
                  <span className="text-muted-foreground text-sm">
                    {resumeFile ? resumeFile.name : "Click to upload PDF (max 5MB)"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    required
                  />
                </label>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
