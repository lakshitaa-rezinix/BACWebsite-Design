import { motion, useMotionValue, animate, useInView } from "motion/react";
import { Link } from "react-router";
import { CheckCircle, Download, Mail, FileCheck, TrendingUp, Users, Award, BarChart3, ArrowUpRight, Clock, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { SplitTextReveal } from "../animations/AnimatedText";
import { MagneticButton } from "../animations/MagneticButton";
import { useRef, useEffect, useState } from "react";

function DashCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const unsubscribe = count.on("change", (v) => setDisplay(Math.round(v)));
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return () => { controls.stop(); unsubscribe(); };
  }, [value, count, isInView]);

  return <span ref={ref} className="font-mono">{display}{suffix}</span>;
}

export function ProficiencyHighlight() {
  const features = [
    { icon: CheckCircle, text: "Online Registration" },
    { icon: FileCheck, text: "Certificate Generation" },
    { icon: Download, text: "Download Portal" },
    { icon: Mail, text: "Email Notifications" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative jewelry accent */}
      <img
        src="/images/hallmarking/bangles1.jpg"
        alt=""
        className="hidden lg:block absolute -right-10 top-16 w-28 opacity-[0.06] rotate-12 pointer-events-none select-none"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Digital Platform
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <SplitTextReveal splitBy="word" staggerDelay={0.07}>
                Digitized Proficiency Testing
              </SplitTextReveal>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Streamlined online portal for proficiency testing registration, certification, and management.
            </motion.p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    delay: index * 0.08,
                  }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    className="p-2 bg-primary/10 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <feature.icon className="text-primary" size={20} />
                  </motion.div>
                  <span className="text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <MagneticButton>
                <Link to="/proficiency-portal">
                  <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold">
                    Access Portal
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card/60 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Glassmorphism panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

              {/* Top toolbar */}
              <div className="relative flex items-center justify-between px-6 py-4 border-b border-primary/15 bg-background/30">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-primary/15 rounded-lg">
                    <BarChart3 className="text-primary" size={16} />
                  </div>
                  <span className="text-foreground font-semibold text-sm">Proficiency Testing Portal</span>
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-primary/20 rounded-full" />
                  <div className="w-3 h-3 bg-primary/30 rounded-full" />
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
              </div>

              <div className="relative p-6 space-y-5">
                {/* Stat cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Users, label: "Participants", value: 248, suffix: "", trend: "+12%" },
                    { icon: Award, label: "Certified", value: 196, suffix: "", trend: "+8%" },
                    { icon: Shield, label: "Pass Rate", value: 94, suffix: "%", trend: "+3%" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                      className="p-3 bg-background/40 border border-primary/10 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="text-primary/50" size={14} />
                        <span className="text-green-400 text-[10px] font-medium flex items-center gap-0.5">
                          <ArrowUpRight size={10} />
                          {stat.trend}
                        </span>
                      </div>
                      <div className="text-foreground text-xl font-bold font-mono leading-none">
                        <DashCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-muted-foreground text-[10px] mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Mini bar chart */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="p-4 bg-background/30 border border-primary/10 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-foreground text-xs font-semibold">Monthly Results</span>
                    <span className="text-muted-foreground text-[10px]">Last 6 months</span>
                  </div>
                  <div className="flex items-end gap-2 h-20">
                    {[45, 62, 38, 75, 58, 82].map((height, index) => (
                      <motion.div
                        key={index}
                        className="flex-1 rounded-t-sm"
                        style={{ background: index === 5 ? "rgba(198,167,94,0.6)" : "rgba(198,167,94,0.2)" }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 + index * 0.08 }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                      <span key={m} className="text-muted-foreground text-[9px] flex-1 text-center">{m}</span>
                    ))}
                  </div>
                </motion.div>

                {/* Recent activity rows */}
                <div className="space-y-2">
                  {[
                    { name: "Gold Purity Round 24", status: "Completed", statusColor: "text-green-400", time: "2h ago" },
                    { name: "Silver Assay Round 12", status: "In Progress", statusColor: "text-yellow-400", time: "5h ago" },
                    { name: "Platinum Round 08", status: "Registered", statusColor: "text-primary/60", time: "1d ago" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.08 }}
                      className="flex items-center justify-between p-3 bg-background/20 border border-primary/8 rounded-lg"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        <span className="text-foreground text-xs truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-[10px] font-medium ${item.statusColor}`}>{item.status}</span>
                        <span className="text-muted-foreground text-[10px] flex items-center gap-1">
                          <Clock size={9} />
                          {item.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#2E5BFF]/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
