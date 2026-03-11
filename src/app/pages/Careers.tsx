import { motion } from "motion/react";
import { Briefcase, MapPin, Clock, ChevronRight, Search, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { SplitTextReveal, GoldShimmerText } from "../components/animations/AnimatedText";


export function Careers() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  const jobs = [
    {
      id: 1,
      title: "Senior Quality Analyst",
      department: "Quality Assurance",
      location: "Mumbai",
      type: "Full-time",
      experience: "5-7 years",
      description: "Lead quality assurance initiatives and manage testing protocols for hallmarking services.",
      requirements: [
        "B.Tech/M.Tech in Metallurgy or related field",
        "5+ years in quality control",
        "Experience with XRF and Fire Assay",
        "Knowledge of BIS standards"
      ]
    },
    {
      id: 2,
      title: "Gemologist",
      department: "Certification",
      location: "Delhi",
      type: "Full-time",
      experience: "3-5 years",
      description: "Perform diamond grading and gemstone certification using industry-standard protocols.",
      requirements: [
        "GIA or equivalent certification",
        "3+ years gemological experience",
        "Expertise in 4C grading",
        "Attention to detail"
      ]
    },
    {
      id: 3,
      title: "Laboratory Technician",
      department: "Testing",
      location: "Bangalore",
      type: "Full-time",
      experience: "2-4 years",
      description: "Conduct metal testing and analysis using advanced laboratory equipment.",
      requirements: [
        "B.Sc in Chemistry/Physics",
        "Experience with analytical instruments",
        "Understanding of metal testing procedures",
        "Good documentation skills"
      ]
    },
    {
      id: 4,
      title: "Business Development Manager",
      department: "Sales",
      location: "Mumbai",
      type: "Full-time",
      experience: "4-6 years",
      description: "Drive business growth and manage client relationships in the jewelry industry.",
      requirements: [
        "MBA or equivalent",
        "Experience in B2B sales",
        "Knowledge of jewelry industry",
        "Strong communication skills"
      ]
    },
    {
      id: 5,
      title: "IT Systems Administrator",
      department: "Technology",
      location: "Mumbai",
      type: "Full-time",
      experience: "3-5 years",
      description: "Manage and maintain IT infrastructure including proficiency testing portal.",
      requirements: [
        "B.Tech in Computer Science",
        "Experience with web applications",
        "Database management skills",
        "System security knowledge"
      ]
    },
    {
      id: 6,
      title: "Compliance Officer",
      department: "Legal & Compliance",
      location: "Delhi",
      type: "Full-time",
      experience: "4-6 years",
      description: "Ensure regulatory compliance and manage BIS certification processes.",
      requirements: [
        "Law degree or related qualification",
        "Understanding of BIS regulations",
        "Experience in compliance",
        "Strong analytical skills"
      ]
    }
  ];

  const departments = ["all", "Quality Assurance", "Certification", "Testing", "Sales", "Technology", "Legal & Compliance"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || job.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

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
            {/* Search */}
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

            {/* Department Filter */}
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
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Job Cards */}
            <div className="lg:col-span-2 space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No positions match your search.</p>
                </div>
              ) : (
                filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedJob(job.id)}
                    className={`p-6 bg-card/50 backdrop-blur-sm border rounded-xl cursor-pointer transition-all ${
                      selectedJob === job.id
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
                          selectedJob === job.id ? "rotate-90" : ""
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
                    const job = jobs.find(j => j.id === selectedJob);
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
                        <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold">
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
    </div>
  );
}
