import { motion } from "motion/react";
import {
  FileText,
  Briefcase,
  ClipboardList,
  Award,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";

interface StatCard {
  label: string;
  value: number;
  icon: typeof FileText;
}

interface ActivityItem {
  type: "application" | "registration";
  title: string;
  detail: string;
  date: string;
}

export function Dashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [jobs, applications, registrations, certificates] = await Promise.all([
          api.getAllJobs(),
          api.getApplications(),
          api.getRegistrations(),
          api.getCertificates(),
        ]);

        setStats([
          { label: "Active Jobs", value: jobs.length, icon: Briefcase },
          { label: "Job Applications", value: applications.length, icon: FileText },
          { label: "PT Registrations", value: registrations.length, icon: ClipboardList },
          { label: "Certificates Issued", value: certificates.length, icon: Award },
        ]);

        // Build recent activity from latest 5 applications + registrations combined
        const appItems: ActivityItem[] = applications.slice(0, 5).map((a: any) => ({
          type: "application" as const,
          title: "New job application",
          detail: `${a.name} applied for ${a.jobTitle}`,
          date: a.createdAt,
        }));
        const regItems: ActivityItem[] = registrations.slice(0, 5).map((r: any) => ({
          type: "registration" as const,
          title: "PT registration submitted",
          detail: `${r.organizationName} - ${r.testType}`,
          date: r.createdAt,
        }));

        const combined = [...appItems, ...regItems]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setActivity(combined);
      } catch {
        // Silently handle — stats will show 0s
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="ml-3 text-muted-foreground">Loading dashboard...</span>
      </div>
    );
  }

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
                Live
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
          {activity.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No recent activity yet.
            </p>
          ) : (
            activity.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-background/30 rounded-lg border border-primary/10"
              >
                <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground text-xs">{item.detail}</p>
                </div>
                <span className="text-muted-foreground text-xs whitespace-nowrap">
                  {formatTimeAgo(item.date)}
                </span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
