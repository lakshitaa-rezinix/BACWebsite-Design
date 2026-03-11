import { Outlet, Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ThemeToggle } from "../components/ThemeToggle";
import { LOCATIONS } from "../data/constants";
import { ScrollProgressBar } from "../components/animations/ScrollProgressBar";
import { PageWrapper } from "../components/PageWrapper";

export function Root() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/proficiency-portal", label: "Proficiency Portal" },
    { path: "/careers", label: "Careers" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
    { path: "/hallmarking-journey", label: "Hallmarking Journey" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/logos/bac-logo-symbol.png"
                alt="BAC Logo"
                className="w-10 h-10 object-contain brightness-0 dark:invert"
              />
              <div>
                <div className="text-foreground font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">
                  Bombay Assay Company
                </div>
                <div className="text-primary/60 text-xs tracking-wider">
                  BIS-RECOGNIZED HALLMARKING CENTER
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors group/navlink ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                  {/* Hover underline animation */}
                  {!isActive(link.path) && (
                    <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary/50 scale-x-0 group-hover/navlink:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground hover:text-primary transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-primary/20 bg-card"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Main Content with Page Transition */}
      <main className="pt-20">
        <PageWrapper key={location.pathname}>
          <Outlet />
        </PageWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-primary/20 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Link to="/" className="flex items-center gap-3 mb-4">
                <img
                  src="/images/logos/bac-logo-symbol.png"
                  alt="BAC Logo"
                  className="w-8 h-8 object-contain brightness-0 dark:invert"
                />
                <span className="text-foreground font-semibold text-lg">
                  Bombay Assay Company
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                India's benchmark in jewelry quality assurance and hallmarking.
                BIS-recognized center and exclusive partner to Titan Company.
              </p>
              <p className="text-muted-foreground text-sm">
                Bangalore, India (Head Office)
              </p>
              <p className="text-muted-foreground text-sm">
                info@bombayassay.com
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-primary font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { to: "/about", label: "About Us" },
                  { to: "/services", label: "Services" },
                  { to: "/gallery", label: "Gallery" },
                  { to: "/blog", label: "Blog & News" },
                  { to: "/careers", label: "Careers" },
                  { to: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="relative text-foreground/70 hover:text-primary transition-colors text-sm group/footlink inline-block"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary scale-x-0 group-hover/footlink:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Portals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-primary font-semibold mb-4">Portals</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/proficiency-portal"
                    className="relative text-foreground/70 hover:text-primary transition-colors text-sm group/footlink inline-block"
                  >
                    Proficiency Testing
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary scale-x-0 group-hover/footlink:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="relative text-foreground/70 hover:text-primary transition-colors text-sm group/footlink inline-block"
                  >
                    Careers Portal
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary scale-x-0 group-hover/footlink:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              </ul>

              <h3 className="text-primary font-semibold mb-3 mt-6">
                Our Centers
              </h3>
              <ul className="space-y-1">
                {LOCATIONS.map((loc) => (
                  <li key={loc.id}>
                    <Link
                      to={`/locations/${loc.id}`}
                      className="relative text-foreground/70 hover:text-primary transition-colors text-sm group/footlink inline-block"
                    >
                      {loc.city}
                      {loc.isHQ ? " (HQ)" : ""}
                      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary scale-x-0 group-hover/footlink:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-primary font-semibold mb-4">
                Stay Updated
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                Subscribe for industry news and updates.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Thank you for subscribing!");
                }}
                className="space-y-2"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 bg-card border border-primary/20 rounded-lg text-sm text-foreground placeholder-foreground/40 focus:border-primary/50 focus:outline-none focus:shadow-[0_0_10px_rgba(198,167,94,0.1)] transition-all"
                />
                <button
                  type="submit"
                  className="relative overflow-hidden w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors group"
                >
                  Subscribe
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                </button>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="border-t border-primary/20 mt-8 pt-8 text-center"
          >
            <p className="text-muted-foreground text-sm">
              &copy; 2026 Bombay Assay Company. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
