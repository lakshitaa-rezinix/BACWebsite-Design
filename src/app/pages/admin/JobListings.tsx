import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { api } from "../../lib/api";
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
  createdAt: string;
}

const emptyForm = {
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  experience: "",
  description: "",
  requirements: "",
  isActive: true,
};

export function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      const data = await api.getAllJobs();
      setJobs(data);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (job: Job) => {
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements.join("\n"),
      isActive: job.isActive,
    });
    setEditingId(job._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        requirements: form.requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      };

      if (editingId) {
        await api.updateJob(editingId, payload);
        toast.success("Job updated");
      } else {
        await api.createJob(payload);
        toast.success("Job created");
      }
      setShowForm(false);
      fetchJobs();
    } catch (err: any) {
      toast.error(err.message || "Failed to save job");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (job: Job) => {
    try {
      await api.updateJob(job._id, { isActive: !job.isActive });
      toast.success(job.isActive ? "Job deactivated" : "Job activated");
      fetchJobs();
    } catch {
      toast.error("Failed to update job");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteJob(id);
      toast.success("Job deleted");
      setDeleteConfirm(null);
      fetchJobs();
    } catch {
      toast.error("Failed to delete job");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="ml-3 text-muted-foreground">Loading jobs...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Listings</h1>
          <p className="text-muted-foreground mt-1">
            {jobs.length} total &bull; {jobs.filter((j) => j.isActive).length} active
          </p>
        </div>
        <Button onClick={openAddForm} className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold">
          <Plus size={16} className="mr-2" />
          Add Job
        </Button>
      </div>

      {/* Jobs Table */}
      <div className="bg-card/50 border border-primary/20 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left p-4 text-sm font-semibold text-foreground">Title</th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Department</th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Location</th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Status</th>
              <th className="text-right p-4 text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No jobs yet. Click "Add Job" to create one.
                </td>
              </tr>
            ) : (
              jobs.map((job, index) => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-foreground font-medium">{job.title}</div>
                    <div className="text-muted-foreground text-xs">{job.type} &bull; {job.experience}</div>
                  </td>
                  <td className="p-4 text-muted-foreground text-sm">{job.department}</td>
                  <td className="p-4 text-muted-foreground text-sm">{job.location}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      job.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {job.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleActive(job)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title={job.isActive ? "Deactivate" : "Activate"}
                      >
                        {job.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => openEditForm(job)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      {deleteConfirm === job._id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(job._id)}
                          className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-primary/20 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {editingId ? "Edit Job" : "Add New Job"}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Job Title *</label>
                <Input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-card border-primary/20 text-foreground"
                  placeholder="e.g. Senior Quality Analyst"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Department *</label>
                  <Input
                    required
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="bg-card border-primary/20 text-foreground"
                    placeholder="e.g. Quality Assurance"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Location *</label>
                  <Input
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="bg-card border-primary/20 text-foreground"
                    placeholder="e.g. Mumbai"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3 py-2 bg-card border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Experience *</label>
                  <Input
                    required
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="bg-card border-primary/20 text-foreground"
                    placeholder="e.g. 3-5 years"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description *</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-card border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Job description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Requirements (one per line)</label>
                <textarea
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-card border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors resize-none"
                  placeholder={"B.Tech in relevant field\n3+ years experience\nStrong communication skills"}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="accent-primary"
                  id="isActive"
                />
                <label htmlFor="isActive" className="text-sm text-foreground">Active (visible on careers page)</label>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </span>
                ) : editingId ? (
                  "Update Job"
                ) : (
                  "Create Job"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
