import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth — accepts any credentials
    localStorage.setItem("bac-admin-auth", "true");
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img
            src="/images/logos/bac-logo-symbol.png"
            alt="BAC"
            className="w-16 h-16 object-contain mx-auto mb-4 brightness-0 dark:invert"
          />
          <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">
            BOMBAY ASSAY COMPANY Dashboard
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-foreground mb-2 text-sm">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50"
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bombayassay.com"
                  className="bg-background/50 border-primary/20 text-foreground pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50"
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="bg-background/50 border-primary/20 text-foreground pl-10"
                  required
                />
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-5">
              Sign In
            </Button>
          </form>

          <p className="text-muted-foreground text-xs text-center mt-6">
            Demo: Use any email/password to login
          </p>
        </div>
      </motion.div>
    </div>
  );
}
