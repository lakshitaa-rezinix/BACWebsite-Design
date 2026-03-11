import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  ClipboardList,
  Award,
  LogOut,
} from "lucide-react";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/blog", label: "Blog Posts", icon: FileText },
  { path: "/admin/applications", label: "Job Applications", icon: Briefcase },
  {
    path: "/admin/registrations",
    label: "PT Registrations",
    icon: ClipboardList,
  },
  { path: "/admin/certificates", label: "Certificates", icon: Award },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("bac-admin-auth");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-primary/20 flex flex-col">
        <div className="p-6 border-b border-primary/20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logos/bac-logo-symbol.png"
              alt="BAC"
              className="w-8 h-8 object-contain brightness-0 dark:invert"
            />
            <div>
              <div className="text-foreground font-semibold text-sm">
                BAC Admin
              </div>
              <div className="text-primary/60 text-xs">Dashboard</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
