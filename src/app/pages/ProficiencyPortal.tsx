import { motion } from "motion/react";
import { 
  FileText, 
  Download, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Users,
  Award
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";

export function ProficiencyPortal() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "register" | "certificates">("dashboard");

  const stats = [
    { icon: FileText, label: "Total Registrations", value: "142", trend: "+12%" },
    { icon: Award, label: "Certificates Issued", value: "89", trend: "+8%" },
    { icon: Users, label: "Active Participants", value: "53", trend: "+15%" },
  ];

  const recentRegistrations = [
    { id: "REG-2024-045", name: "Gold Purity Test", date: "2024-03-01", status: "Completed" },
    { id: "REG-2024-044", name: "Silver Hallmark", date: "2024-02-28", status: "In Progress" },
    { id: "REG-2024-043", name: "Platinum Analysis", date: "2024-02-27", status: "Completed" },
    { id: "REG-2024-042", name: "Diamond Grading", date: "2024-02-26", status: "Pending" },
  ];

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
              { id: "dashboard", label: "Dashboard", icon: TrendingUp },
              { id: "register", label: "New Registration", icon: FileText },
              { id: "certificates", label: "My Certificates", icon: Award },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <stat.icon className="text-primary" size={24} />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-foreground font-mono mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Registrations */}
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Recent Registrations
                </h2>
                <div className="space-y-4">
                  {recentRegistrations.map((reg, index) => (
                    <motion.div
                      key={reg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-background/50 border border-primary/10 rounded-lg hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="text-primary" size={20} />
                        </div>
                        <div>
                          <div className="text-foreground font-semibold">
                            {reg.name}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {reg.id} • {reg.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          reg.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : reg.status === "In Progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {reg.status}
                        </span>
                        {reg.status === "Completed" && (
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                            <Download size={16} className="mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  New Registration
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-foreground mb-2">
                      Organization Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter organization name"
                      className="bg-background/50 border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2">
                      Contact Person
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter contact person name"
                      className="bg-background/50 border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      className="bg-background/50 border-primary/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2">
                      Test Type
                    </label>
                    <select className="w-full px-4 py-2 bg-background/50 border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors">
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
                      className="w-full px-4 py-2 bg-background/50 border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-6">
                    Submit Registration
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
            >
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Award className="text-primary" size={28} />
                      </div>
                      <CheckCircle className="text-green-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Certificate #{2024000 + cert}
                    </h3>
                    <p className="text-muted-foreground mb-1">
                      Gold Purity Proficiency Test
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      Issued: March {cert}, 2024
                    </p>
                    <div className="flex gap-3">
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground">
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                        <Mail size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
