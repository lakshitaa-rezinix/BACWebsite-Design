import { motion } from "motion/react";
import {
  FileText,
  Briefcase,
  ClipboardList,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Blog Posts",
    value: "5",
    change: "+2 this month",
    icon: FileText,
  },
  {
    label: "Job Applications",
    value: "24",
    change: "+8 this week",
    icon: Briefcase,
  },
  {
    label: "PT Registrations",
    value: "142",
    change: "+12 this month",
    icon: ClipboardList,
  },
  {
    label: "Certificates Issued",
    value: "89",
    change: "+5 this week",
    icon: Award,
  },
];

const recentActivity = [
  {
    action: "New job application received",
    detail: "Senior Quality Analyst - Mumbai",
    time: "2 hours ago",
  },
  {
    action: "PT registration completed",
    detail: "XRF Proficiency Test - Delhi Lab",
    time: "5 hours ago",
  },
  {
    action: "Certificate issued",
    detail: "PT-2024-089 - Gold Hallmarking",
    time: "1 day ago",
  },
  {
    action: "Blog post published",
    detail: "BIS Award Recognition 2024",
    time: "2 days ago",
  },
  {
    action: "New job application received",
    detail: "Lab Technician - Surat",
    time: "3 days ago",
  },
];

export function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to BAC Admin Panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card/50 border border-primary/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <stat.icon className="text-primary" size={20} />
              </div>
              <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                <TrendingUp size={12} />
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-muted-foreground text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card/50 border border-primary/20 rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-background/30 rounded-lg border border-primary/10"
            >
              <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-sm font-medium">
                  {item.action}
                </p>
                <p className="text-muted-foreground text-xs">{item.detail}</p>
              </div>
              <span className="text-muted-foreground text-xs whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
