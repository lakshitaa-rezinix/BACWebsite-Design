import { motion } from "motion/react";
import { Pencil, Trash2, Plus, Loader2, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
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
  hasFile?: boolean;
  originalName?: string;
  createdAt: string;
}

const emptyForm = {
  registrationId: "",
  testType: "Gold Purity Test",
  organizationName: "",
  issueDate: "",
  validUntil: "",
  status: "Active",
};

export function CertificateManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [existingFile, setExistingFile] = useState<{ name?: string; has: boolean }>({ has: false });

  const fetchCertificates = async () => {
    try {
      const data = await api.getCertificates();
      setCertificates(data);
    } catch {
      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const total = certificates.length;
  const active = certificates.filter((c) => c.status === "Active").length;
  const expired = certificates.filter((c) => c.status === "Expired").length;

  const openIssueForm = () => {
    setForm(emptyForm);
    setFile(null);
    setExistingFile({ has: false });
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (cert: Certificate) => {
    setForm({
      registrationId: cert.registrationId,
      testType: cert.testType,
      organizationName: cert.organizationName,
      issueDate: cert.issueDate.split("T")[0],
      validUntil: cert.validUntil.split("T")[0],
      status: cert.status,
    });
    setFile(null);
    setExistingFile({ has: !!cert.hasFile, name: cert.originalName });
    setEditingId(cert._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Send multipart only when a PDF is attached; otherwise plain JSON.
      let payload: any = form;
      if (file) {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
        fd.append("file", file);
        payload = fd;
      }
      if (editingId) {
        await api.updateCertificate(editingId, payload);
        toast.success("Certificate updated");
      } else {
        await api.issueCertificate(payload);
        toast.success("Certificate issued");
      }
      setShowForm(false);
      fetchCertificates();
    } catch (err: any) {
      toast.error(err.message || "Failed to save certificate");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteCertificate(id);
      toast.success("Certificate deleted");
      setDeleteConfirm(null);
      fetchCertificates();
    } catch {
      toast.error("Failed to delete certificate");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="ml-3 text-muted-foreground">Loading certificates...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certificates</h1>
          <p className="text-muted-foreground mt-1">
            Issue and manage certificates
          </p>
        </div>
        <Button onClick={openIssueForm} className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold">
          <Plus size={18} className="mr-2" />
          Issue Certificate
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-foreground">{total}</div>
          <div className="text-muted-foreground text-sm">Total Certificates</div>
        </div>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-green-400">{active}</div>
          <div className="text-muted-foreground text-sm">Active</div>
        </div>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-red-400">{expired}</div>
          <div className="text-muted-foreground text-sm">Expired</div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/50 border border-primary/20 rounded-xl overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left p-4 text-primary text-sm font-semibold">Certificate ID</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Test Type</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Organization</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Issued</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Valid Until</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Status</th>
              <th className="text-right p-4 text-primary text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No certificates issued yet.
                </td>
              </tr>
            ) : (
              certificates.map((cert) => (
                <tr
                  key={cert._id}
                  className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                >
                  <td className="p-4 text-primary text-sm font-mono">
                    {cert.certificateId}
                  </td>
                  <td className="p-4 text-foreground/70 text-sm">
                    {cert.testType}
                  </td>
                  <td className="p-4 text-foreground text-sm font-medium">
                    {cert.organizationName}
                  </td>
                  <td className="p-4 text-muted-foreground text-sm">
                    {new Date(cert.issueDate).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4 text-muted-foreground text-sm">
                    {new Date(cert.validUntil).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                        cert.status === "Active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditForm(cert)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      {deleteConfirm === cert._id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(cert._id)}
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
                          onClick={() => setDeleteConfirm(cert._id)}
                          className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Issue/Edit Certificate Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-primary/20 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {editingId ? "Edit Certificate" : "Issue Certificate"}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Registration ID *</label>
                <Input
                  required
                  value={form.registrationId}
                  onChange={(e) => setForm({ ...form, registrationId: e.target.value })}
                  className="bg-card border-primary/20 text-foreground"
                  placeholder="e.g. PT-2026-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Test Type *</label>
                <select
                  value={form.testType}
                  onChange={(e) => setForm({ ...form, testType: e.target.value })}
                  className="w-full px-3 py-2 bg-card border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors"
                >
                  <option>Gold Purity Test</option>
                  <option>Silver Hallmark</option>
                  <option>Platinum Analysis</option>
                  <option>Diamond Grading</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Organization Name *</label>
                <Input
                  required
                  value={form.organizationName}
                  onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                  className="bg-card border-primary/20 text-foreground"
                  placeholder="Organization name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Issue Date *</label>
                  <Input
                    required
                    type="date"
                    value={form.issueDate}
                    onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                    className="bg-card border-primary/20 text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Valid Until *</label>
                  <Input
                    required
                    type="date"
                    value={form.validUntil}
                    onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                    className="bg-card border-primary/20 text-foreground"
                  />
                </div>
              </div>

              {editingId && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 bg-card border border-primary/20 text-foreground rounded-lg outline-none focus:border-primary transition-colors"
                  >
                    <option>Active</option>
                    <option>Expired</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Certificate PDF{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional — max 10MB)
                  </span>
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="w-full text-sm text-foreground file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
                {existingFile.has && !file && (
                  <p className="text-xs text-muted-foreground mt-1.5">
                    A PDF is already attached
                    {existingFile.name ? ` (${existingFile.name})` : ""}. Choosing a
                    new file replaces it.
                  </p>
                )}
                {file && (
                  <p className="text-xs text-primary mt-1.5">
                    Selected: {file.name} ({Math.round(file.size / 1024)} KB)
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1.5">
                  Labs download this from the PT Portal using their registration ID
                  plus the email they registered with.
                </p>
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
                  "Update Certificate"
                ) : (
                  "Issue Certificate"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
