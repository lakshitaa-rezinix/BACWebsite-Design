import { motion } from "motion/react";
import { Eye, CheckCircle, Clock } from "lucide-react";

const registrations = [
  {
    id: "PT-2024-142",
    organization: "Titan Company Ltd",
    contact: "Rajesh Kumar",
    testType: "XRF Proficiency Test",
    date: "2024-12-12",
    status: "Approved",
  },
  {
    id: "PT-2024-141",
    organization: "Caratlane",
    contact: "Meera Shah",
    testType: "Fire Assay",
    date: "2024-12-10",
    status: "Pending",
  },
  {
    id: "PT-2024-140",
    organization: "Kalyan Jewellers",
    contact: "Suresh Nair",
    testType: "Gold Hallmarking",
    date: "2024-12-08",
    status: "Approved",
  },
  {
    id: "PT-2024-139",
    organization: "Malabar Gold",
    contact: "Anita Menon",
    testType: "Diamond Testing",
    date: "2024-12-05",
    status: "Approved",
  },
  {
    id: "PT-2024-138",
    organization: "PC Jeweller",
    contact: "Dinesh Gupta",
    testType: "XRF Proficiency Test",
    date: "2024-12-01",
    status: "Pending",
  },
];

export function ProficiencyRegistrations() {
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
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-foreground">142</div>
          <div className="text-muted-foreground text-sm">Total Registrations</div>
        </div>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-green-400">127</div>
          <div className="text-muted-foreground text-sm">Approved</div>
        </div>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-yellow-400">15</div>
          <div className="text-muted-foreground text-sm">Pending</div>
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
                ID
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Organization
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Test Type
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Date
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
            {registrations.map((reg) => (
              <tr
                key={reg.id}
                className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
              >
                <td className="p-4 text-primary text-sm font-mono">
                  {reg.id}
                </td>
                <td className="p-4">
                  <div className="text-foreground text-sm font-medium">
                    {reg.organization}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {reg.contact}
                  </div>
                </td>
                <td className="p-4 text-foreground/70 text-sm">
                  {reg.testType}
                </td>
                <td className="p-4 text-muted-foreground text-sm">
                  {new Date(reg.date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-medium ${
                      reg.status === "Approved"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {reg.status === "Approved" ? (
                      <CheckCircle size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {reg.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <Eye size={16} />
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
