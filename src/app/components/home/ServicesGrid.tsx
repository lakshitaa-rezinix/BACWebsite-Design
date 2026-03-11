import { motion } from "motion/react";
import { Award, Microscope, Shield, Diamond, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { SplitTextReveal } from "../animations/AnimatedText";
import { TiltCard } from "../animations/TiltCard";

const SERVICES = [
  {
    num: "01",
    icon: Award,
    title: "Hallmarking Services",
    description: "BIS-certified hallmarking for gold, silver, and platinum jewelry. Precision-stamped with the official BIS Hallmark, HUID, and purity grade.",
    tag: "BIS Certified",
  },
  {
    num: "02",
    icon: Microscope,
    title: "Testing & Assaying",
    description: "Advanced XRF and fire assay testing deliver accurate metal purity analysis for jewellers, manufacturers, and institutions.",
    tag: "XRF · Fire Assay",
  },
  {
    num: "03",
    icon: Shield,
    title: "Total Quality Control",
    description: "End-to-end quality assurance protocols covering sampling, verification, documentation, and BIS compliance reporting.",
    tag: "ISO Compliant",
  },
  {
    num: "04",
    icon: Diamond,
    title: "Diamond Certification",
    description: "Expert gemological evaluation and certification for diamonds and precious stones, graded to international GIA-aligned standards.",
    tag: "Gemological",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary/70 text-xs uppercase tracking-[0.3em] mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            What We Offer
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <SplitTextReveal splitBy="word" staggerDelay={0.07}>
              Our Services
            </SplitTextReveal>
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <TiltCard className="rounded-2xl h-full">
                <Link to="/services" className="block h-full">
                  <div className="relative h-full p-8 bg-card/50 backdrop-blur-sm border border-primary/15 rounded-2xl overflow-hidden hover:border-primary/45 transition-colors duration-300">

                    {/* Ghost number watermark */}
                    <span
                      className="absolute -top-4 -right-2 text-[7rem] font-bold leading-none select-none pointer-events-none text-primary/[0.04] group-hover:text-primary/[0.07] transition-colors duration-500"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      aria-hidden="true"
                    >
                      {service.num}
                    </span>

                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                    <div className="relative">
                      {/* Icon */}
                      <div className="mb-5 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/18 group-hover:border-primary/35 transition-all duration-300">
                        <service.icon className="text-primary" size={22} />
                      </div>

                      {/* Tag */}
                      <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-[0.2em] border border-primary/25 text-primary/60 bg-primary/5">
                        {service.tag}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <span className="inline-flex items-center gap-1.5 text-xs text-primary/60 group-hover:text-primary transition-colors duration-200">
                        Learn more
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors duration-200 border-b border-primary/20 hover:border-primary/50 pb-0.5"
          >
            View all services
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
