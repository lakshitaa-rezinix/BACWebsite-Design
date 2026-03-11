import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Users, TrendingUp, Award } from "lucide-react";
import { Button } from "../ui/button";

import { MagneticButton } from "../animations/MagneticButton";


export function CareersTeaser() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card" />

          {/* Animated Grid */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: `
                linear-gradient(to right, #C6A75E 1px, transparent 1px),
                linear-gradient(to bottom, #C6A75E 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Content */}
          <div className="relative z-[2] border border-primary/20 rounded-3xl p-12 md:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                >
                  Join Us &amp; Build the Future of
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 block mt-1">
                    Quality Assurance
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-lg mb-8"
                >
                  Join a team of dedicated professionals setting the standard for jewelry certification and quality control in India.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <MagneticButton>
                    <Link to="/careers">
                      <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold group">
                        View Open Positions
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                      </Button>
                    </Link>
                  </MagneticButton>
                </motion.div>
              </div>

              {/* Right - Benefits */}
              <div className="space-y-4">
                {[
                  {
                    icon: TrendingUp,
                    title: "Career Growth",
                    description: "Continuous learning and advancement opportunities"
                  },
                  {
                    icon: Award,
                    title: "Industry Recognition",
                    description: "Work with BIS-certified excellence standards"
                  },
                  {
                    icon: Users,
                    title: "Collaborative Culture",
                    description: "Join a team of passionate professionals"
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      delay: 0.2 + index * 0.1,
                    }}
                    whileHover={{ x: -5 }}
                    className="flex gap-4 p-4 bg-primary/5 border border-primary/10 rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <motion.div
                      className="p-3 bg-primary/10 rounded-lg h-fit"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <benefit.icon className="text-primary" size={24} />
                    </motion.div>
                    <div>
                      <h3 className="text-foreground font-semibold mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2E5BFF]/10 rounded-full blur-3xl" />

          {/* Decorative jewelry accent */}
          <img
            src="/images/hallmarking/necklace1.jpg"
            alt=""
            className="hidden lg:block absolute -right-12 top-8 w-32 opacity-[0.06] rotate-12 pointer-events-none select-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
