import { motion } from "motion/react";
import { Eye, Download } from "lucide-react";

const applications = [
  {
    id: 1,
    name: "Rahul Sharma",
    position: "Senior Quality Analyst",
    location: "Mumbai",
    date: "2024-12-10",
    status: "Under Review",
  },
  {
    id: 2,
    name: "Priya Patel",
    position: "Gemologist",
    location: "Surat",
    date: "2024-12-08",
    status: "Shortlisted",
  },
  {
    id: 3,
    name: "Amit Kumar",
    position: "Lab Technician",
    location: "Delhi",
    date: "2024-12-05",
    status: "Under Review",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    position: "Business Dev Manager",
    location: "Bangalore",
    date: "2024-12-01",
    status: "Interview Scheduled",
  },
  {
    id: 5,
    name: "Vikram Singh",
    position: "IT Administrator",
    location: "Bangalore",
    date: "2024-11-28",
    status: "Rejected",
  },
];

const statusColors: Record<string, string> = {
  "Under Review": "bg-yellow-500/10 text-yellow-400",
  Shortlisted: "bg-blue-500/10 text-blue-400",
  "Interview Scheduled": "bg-green-500/10 text-green-400",
  Rejected: "bg-red-500/10 text-red-400",
};

export function JobApplications() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Job Applications
        </h1>
        <p className="text-muted-foreground mt-1">
          Review and manage applications
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
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Applicant
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Position
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Location
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
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
              >
                <td className="p-4 text-foreground text-sm font-medium">
                  {app.name}
                </td>
                <td className="p-4 text-foreground/70 text-sm">
                  {app.position}
                </td>
                <td className="p-4 text-foreground/70 text-sm">
                  {app.location}
                </td>
                <td className="p-4 text-muted-foreground text-sm">
                  {new Date(app.date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                      statusColors[app.status] || ""
                    }`}
                  >
                    {app.status}
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
