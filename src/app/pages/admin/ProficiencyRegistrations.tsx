import { motion } from "motion/react";
import { Eye, CheckCircle, Clock, XCircle, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";

interface Registration {
  _id: string;
  registrationId: string;
  organizationName: string;
  laboratoryAddress?: string;
  cityStateCountry?: string;
  pinCode?: string;
  contactPerson?: string;
  designation?: string;
  mobile?: string;
  email: string;
  ptPrograms?: string[];
  testType: string;
  accreditationType?: string;
  accreditationNumber?: string;
  gstNumber?: string;
  testMethod?: string;
  testMethodOther?: string;
  agreeProtocol?: boolean;
  agreeDataUse?: boolean;
  applicationDate?: string;
  preferredDate?: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export function ProficiencyRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewReg, setViewReg] = useState<Registration | null>(null);

  const fetchRegistrations = async () => {
    try {
      const data = await api.getRegistrations();
      setRegistrations(data);
    } catch {
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.updateRegistrationStatus(id, status);
      toast.success(`Registration ${status.toLowerCase()}`);
      fetchRegistrations();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const total = registrations.length;
  const approved = registrations.filter((r) => r.status === "Approved").length;
  const pending = registrations.filter((r) => r.status === "Pending").length;
  const rejected = registrations.filter((r) => r.status === "Rejected").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="ml-3 text-muted-foreground">Loading registrations...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          PT Registrations
        </h1>
        <p className="text-muted-foreground mt-1">
          Proficiency testing registration management
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-foreground">{total}</div>
          <div className="text-muted-foreground text-sm">Total</div>
        </div>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-green-400">{approved}</div>
          <div className="text-muted-foreground text-sm">Approved</div>
        </div>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-yellow-400">{pending}</div>
          <div className="text-muted-foreground text-sm">Pending</div>
        </div>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-red-400">{rejected}</div>
          <div className="text-muted-foreground text-sm">Rejected</div>
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
              <th className="text-left p-4 text-primary text-sm font-semibold">ID</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Organization</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Test Type</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Date</th>
              <th className="text-left p-4 text-primary text-sm font-semibold">Status</th>
              <th className="text-right p-4 text-primary text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No registrations yet.
                </td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr
                  key={reg._id}
                  className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                >
                  <td className="p-4 text-primary text-sm font-mono">
                    {reg.registrationId}
                  </td>
                  <td className="p-4">
                    <div className="text-foreground text-sm font-medium">
                      {reg.organizationName}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {reg.contactPerson}
                    </div>
                  </td>
                  <td className="p-4 text-foreground/70 text-sm">
                    {reg.testType}
                  </td>
                  <td className="p-4 text-muted-foreground text-sm">
                    {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-medium ${
                        reg.status === "Approved"
                          ? "bg-green-500/10 text-green-400"
                          : reg.status === "Rejected"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {reg.status === "Approved" ? (
                        <CheckCircle size={12} />
                      ) : reg.status === "Rejected" ? (
                        <XCircle size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {reg.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewReg(reg)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      {reg.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(reg._id, "Approved")}
                            className="px-2.5 py-1 text-xs bg-green-500/10 text-green-400 rounded-full hover:bg-green-500/20 transition-colors font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(reg._id, "Rejected")}
                            className="px-2.5 py-1 text-xs bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20 transition-colors font-medium"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* View Registration Modal */}
      {viewReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-primary/20 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Registration Details</h3>
              <button onClick={() => setViewReg(null)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Registration ID</label>
                <p className="text-primary font-mono font-medium">{viewReg.registrationId}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Laboratory Name</label>
                <p className="text-foreground font-medium">{viewReg.organizationName}</p>
              </div>
              {viewReg.laboratoryAddress && (
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Laboratory Address</label>
                  <p className="text-foreground text-sm">
                    {viewReg.laboratoryAddress}
                    {viewReg.cityStateCountry ? `, ${viewReg.cityStateCountry}` : ""}
                    {viewReg.pinCode ? ` - ${viewReg.pinCode}` : ""}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {viewReg.contactPerson && (
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Contact Person</label>
                    <p className="text-foreground">{viewReg.contactPerson}</p>
                  </div>
                )}
                {viewReg.designation && (
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Designation</label>
                    <p className="text-foreground">{viewReg.designation}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                  <p className="text-foreground break-all">{viewReg.email}</p>
                </div>
                {viewReg.mobile && (
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Mobile</label>
                    <p className="text-foreground">{viewReg.mobile}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">PT Program</label>
                <p className="text-foreground">
                  {viewReg.ptPrograms && viewReg.ptPrograms.length > 0
                    ? viewReg.ptPrograms.join(" & ")
                    : viewReg.testType}
                </p>
              </div>
              {(viewReg.accreditationType || viewReg.accreditationNumber) && (
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Accreditation</label>
                  <p className="text-foreground text-sm">
                    {viewReg.accreditationType}
                    {viewReg.accreditationNumber ? ` — ${viewReg.accreditationNumber}` : ""}
                  </p>
                </div>
              )}
              {viewReg.gstNumber && (
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">GST Number</label>
                  <p className="text-foreground">{viewReg.gstNumber}</p>
                </div>
              )}
              {viewReg.testMethod && (
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Test Method</label>
                  <p className="text-foreground text-sm">{viewReg.testMethod}</p>
                </div>
              )}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Declaration</label>
                <p className="text-foreground text-sm">
                  Protocol &amp; confidentiality: {viewReg.agreeProtocol ? "Agreed" : "Not agreed"}
                  <br />
                  Anonymized data use: {viewReg.agreeDataUse ? "Agreed" : "Not agreed"}
                </p>
              </div>
              {viewReg.preferredDate && (
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Preferred Date</label>
                  <p className="text-foreground">{new Date(viewReg.preferredDate).toLocaleDateString()}</p>
                </div>
              )}
              {viewReg.notes && (
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Notes</label>
                  <p className="text-foreground text-sm whitespace-pre-wrap bg-background/50 border border-primary/10 rounded-lg p-3 mt-1">
                    {viewReg.notes}
                  </p>
                </div>
              )}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Status</label>
                <p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-medium ${
                    viewReg.status === "Approved"
                      ? "bg-green-500/10 text-green-400"
                      : viewReg.status === "Rejected"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {viewReg.status}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Submitted</label>
                <p className="text-foreground text-sm">
                  {new Date(viewReg.createdAt).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
