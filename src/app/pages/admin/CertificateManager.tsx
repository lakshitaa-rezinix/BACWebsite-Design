import { motion } from "motion/react";
import { Download, Eye, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";

const certificates = [
  {
    id: "CERT-2024-089",
    testType: "XRF Proficiency Test",
    organization: "Titan Company Ltd",
    issueDate: "2024-12-10",
    validUntil: "2025-12-10",
    status: "Active",
  },
  {
    id: "CERT-2024-088",
    testType: "Fire Assay",
    organization: "Caratlane",
    issueDate: "2024-11-20",
    validUntil: "2025-11-20",
    status: "Active",
  },
  {
    id: "CERT-2024-087",
    testType: "Gold Hallmarking",
    organization: "Kalyan Jewellers",
    issueDate: "2024-11-15",
    validUntil: "2025-11-15",
    status: "Active",
  },
  {
    id: "CERT-2024-086",
    testType: "Diamond Testing",
    organization: "Malabar Gold",
    issueDate: "2024-10-01",
    validUntil: "2025-10-01",
    status: "Active",
  },
  {
    id: "CERT-2023-042",
    testType: "XRF Proficiency Test",
    organization: "PC Jeweller",
    issueDate: "2023-06-15",
    validUntil: "2024-06-15",
    status: "Expired",
  },
];

export function CertificateManager() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certificates</h1>
          <p className="text-muted-foreground mt-1">
            Issue and manage certificates
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold">
          <Plus size={18} className="mr-2" />
          Issue Certificate
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-foreground">89</div>
          <div className="text-muted-foreground text-sm">Total Certificates</div>
        </div>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-green-400">84</div>
          <div className="text-muted-foreground text-sm">Active</div>
        </div>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-red-400">5</div>
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
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Certificate ID
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Test Type
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Organization
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Issued
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Valid Until
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Status
              </th>
              <th className="text-right p-4 text-primary text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr
                key={cert.id}
                className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
              >
                <td className="p-4 text-primary text-sm font-mono">
                  {cert.id}
                </td>
                <td className="p-4 text-foreground/70 text-sm">
                  {cert.testType}
                </td>
                <td className="p-4 text-foreground text-sm font-medium">
                  {cert.organization}
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
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
