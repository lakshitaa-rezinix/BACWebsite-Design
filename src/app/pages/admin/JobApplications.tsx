import { motion } from "motion/react";
import { Eye, Download, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";

interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resumePath: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  "Under Review": "bg-yellow-500/10 text-yellow-400",
  Shortlisted: "bg-blue-500/10 text-blue-400",
  "Interview Scheduled": "bg-green-500/10 text-green-400",
  Rejected: "bg-red-500/10 text-red-400",
  Hired: "bg-emerald-500/10 text-emerald-400",
};

const statusOptions = ["Under Review", "Shortlisted", "Interview Scheduled", "Rejected", "Hired"];

export function JobApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewApp, setViewApp] = useState<Application | null>(null);

  const fetchApplications = async () => {
    try {
      const data = await api.getApplications();
      setApplications(data);
    } catch {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.updateApplicationStatus(id, status);
      toast.success(`Status updated to "${status}"`);
      fetchApplications();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDownloadResume = async (app: Application) => {
    try {
      await api.downloadResume(app._id, app.name);
    } catch (err: any) {
      toast.error(err.message || "Failed to download resume");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="ml-3 text-muted-foreground">Loading applications...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Job Applications
        </h1>
        <p className="text-muted-foreground mt-1">
          {applications.length} total applications
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/50 border border-primary/20 rounded-xl overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left p-4 text-primary text-sm font-semibold">Applicant</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Position</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Date</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Status</th>
              <th className="text-right p-4 text-primary text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No applications yet.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app._id}
                  className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-foreground text-sm font-medium">{app.name}</div>
                    <div className="text-muted-foreground text-xs">{app.email}</div>
                  </td>
                  <td className="p-4 text-foreground/70 text-sm">{app.jobTitle}</td>
                  <td className="p-4 text-muted-foreground text-sm">
                    {new Date(app.createdAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className={`px-2.5 py-1 text-xs rounded-full font-medium border-0 outline-none cursor-pointer ${
                        statusColors[app.status] || "bg-gray-500/10 text-gray-400"
                      }`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewApp(app)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDownloadResume(app)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Download resume"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* View Application Modal */}
      {viewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-primary/20 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Application Details</h3>
              <button onClick={() => setViewApp(null)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Name</label>
                <p className="text-foreground font-medium">{viewApp.name}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                <p className="text-foreground">{viewApp.email}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Phone</label>
                <p className="text-foreground">{viewApp.phone}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Position</label>
                <p className="text-foreground">{viewApp.jobTitle}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Status</label>
                <p>
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${statusColors[viewApp.status] || ""}`}>
                    {viewApp.status}
                  </span>
                </p>
              </div>
              {viewApp.coverLetter && (
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Cover Letter</label>
                  <p className="text-foreground text-sm mt-1 whitespace-pre-wrap bg-background/50 border border-primary/10 rounded-lg p-3">
                    {viewApp.coverLetter}
                  </p>
                </div>
              )}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Applied</label>
                <p className="text-foreground text-sm">
                  {new Date(viewApp.createdAt).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <button
                onClick={() => handleDownloadResume(viewApp)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm"
              >
                <Download size={16} />
                Download Resume
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
