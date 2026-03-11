import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing! We'll keep you updated.");
      setEmail("");
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative jewelry accents */}
      <img
        src="/images/hallmarking/earrings1.jpg"
        alt=""
        className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 w-16 opacity-[0.06] -rotate-12 pointer-events-none select-none"
      />

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 sm:p-12 text-center overflow-hidden"
        >
          <div className="relative z-10">
            <motion.div
              className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <Mail className="text-primary" size={28} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-foreground mb-3"
            >
              Stay Updated
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8 max-w-md mx-auto"
            >
              Subscribe to our newsletter for the latest industry news, hallmarking
              updates, and insights from BAC.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-background border border-primary/20 rounded-lg text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none focus:shadow-[0_0_15px_rgba(198,167,94,0.15)] transition-all"
              />
              <button
                type="submit"
                className="relative overflow-hidden px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap group"
              >
                Subscribe
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
