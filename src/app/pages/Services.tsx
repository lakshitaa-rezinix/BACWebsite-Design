import { motion } from "motion/react";
import { Award, Microscope, Shield, Diamond, CheckCircle, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { SplitTextReveal, GoldShimmerText } from "../components/animations/AnimatedText";
import { MagneticButton } from "../components/animations/MagneticButton";

const SERVICES = [
  {
    num: "01",
    icon: Award,
    tag: "BIS Certified",
    title: "Hallmarking Services",
    description:
      "BAC is a BIS-recognized hallmarking center authorized to stamp gold, silver, and platinum jewelry with the official BIS Hallmark, purity grade, and HUID — ensuring authenticity for consumers and compliance for manufacturers.",
    features: [
      "Gold hallmarking up to 24 karat",
      "Silver hallmarking (925, 999 purity)",
      "Platinum certification",
      "BIS-compliant HUID stamping",
      "Fast turnaround processing",
      "Digital record keeping",
    ],
    process: ["Sample Submission", "Purity Testing", "Hallmark Stamping", "Certificate Issuance"],
    image: "/images/hallmarking/set1.png",
    imageAlt: "Full bridal gold jewelry set — choker, earrings, and bangles awaiting hallmarking",
    imageCaption: "Every piece carries the BIS logo, purity grade, and a unique HUID",
  },
  {
    num: "02",
    icon: Microscope,
    tag: "XRF · Fire Assay",
    title: "Testing & Assaying",
    description:
      "We deploy advanced XRF (X-Ray Fluorescence) spectroscopy and traditional Fire Assay techniques to deliver precise metal purity analysis — trusted by jewellers, manufacturers, and financial institutions across India.",
    features: [
      "XRF non-destructive testing",
      "Fire Assay for precise purity",
      "Touchstone screening",
      "Specific gravity analysis",
      "Multi-metal identification",
      "Detailed analytical reports",
    ],
    process: ["Sample Collection", "Laboratory Analysis", "Quality Verification", "Report Generation"],
    image: "/images/hallmarking/set2.png",
    imageAlt: "Gold choker and long earring set — precision purity analysis before certification",
    imageCaption: "Precision analysis for every piece — destructive and non-destructive options",
  },
  {
    num: "03",
    icon: Shield,
    tag: "ISO Compliant",
    title: "Total Quality Control",
    description:
      "Our end-to-end quality management system covers the entire hallmarking and testing chain — from intake sampling to documentation and regulatory compliance — keeping your operations audit-ready at all times.",
    features: [
      "Quality audit services",
      "BIS compliance verification",
      "Process optimization advisory",
      "Staff training programs",
      "End-to-end documentation",
      "Continuous performance monitoring",
    ],
    process: ["Initial Assessment", "Process Review", "Implementation", "Ongoing Support"],
    image: "/images/hallmarking/set3.png",
    imageAlt: "Gold necklace, jhumka earrings, and bangles set representing comprehensive quality assurance",
    imageCaption: "Comprehensive oversight across every stage of your quality chain",
  },
  {
    num: "04",
    icon: Diamond,
    tag: "Gemological",
    title: "Diamond Certification",
    description:
      "Our gemologists evaluate diamonds and precious stones against internationally aligned GIA-standard criteria — issuing certificates of authenticity that protect buyers and add verifiable value to your pieces.",
    features: [
      "4C grading — Cut, Clarity, Color, Carat",
      "Authenticity verification",
      "Full diamond plotting",
      "Laser inscription",
      "International standard certification",
      "Detailed grading reports",
    ],
    process: ["Stone Submission", "Gemological Analysis", "Grading Assessment", "Certificate Delivery"],
    image: "/images/hallmarking/set4.png",
    imageAlt: "Two layered gold necklace sets certified to gemological standards",
    imageCaption: "GIA-aligned certification for diamonds and precious stones",
  },
];

function ProcessFlow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/5 text-xs font-medium text-foreground/70">
            <span
              className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold"
              style={{ fontSize: "9px" }}
            >
              {i + 1}
            </span>
            {step}
          </div>
          {i < steps.length - 1 && <ArrowRight size={12} className="text-primary/30 flex-shrink-0" />}
        </div>
      ))}
    </div>
  );
}

export function Services() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── Hero (original style) ─────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        {/* Gold grid background */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, #C6A75E 1px, transparent 1px), linear-gradient(to bottom, #C6A75E 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* set5 as right-side decoration */}
        <motion.img
          src="/images/hallmarking/set5.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute pointer-events-none select-none hidden lg:block"
          style={{ right: "-40px", top: "10%", width: "220px", transform: "rotate(8deg)", opacity: 0 }}
          animate={{ opacity: 0.12, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 0.5, duration: 1.5 },
            y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              <SplitTextReveal splitBy="word" staggerDelay={0.08} animate>
                Premium Services
              </SplitTextReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-xl"
            >
              <GoldShimmerText>
                Industry-leading solutions for quality assurance, certification, and testing
              </GoldShimmerText>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Thin gold rule */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* ── Service Sections ──────────────────────────────────── */}
      {SERVICES.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={service.num}
            id={`service-${service.num}`}
            className={`py-20 relative overflow-hidden ${isEven ? "" : "bg-card/20"}`}
          >
            {/* Background ghost number */}
            <span
              className="absolute -top-6 pointer-events-none select-none text-primary/[0.03]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(8rem, 20vw, 18rem)",
                fontWeight: 700,
                lineHeight: 1,
                right: isEven ? "2%" : undefined,
                left: isEven ? undefined : "2%",
              }}
              aria-hidden="true"
            >
              {service.num}
            </span>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-14 items-center ${isEven ? "" : "lg:[direction:rtl]"}`}>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:[direction:ltr]"
                >
                  {/* Tag + icon */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <service.icon className="text-primary" size={20} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-[0.2em] border border-primary/25 text-primary/60 bg-primary/5">
                      {service.tag}
                    </span>
                  </div>

                  {/* Number + title */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span
                      className="text-primary/20 font-bold leading-none"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem" }}
                    >
                      {service.num}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-7 text-base">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                    {service.features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="text-primary mt-0.5 flex-shrink-0" size={14} />
                        <span className="text-foreground/80 text-sm">{f}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Process flow */}
                  <div className="pt-5 border-t border-primary/10">
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">Process</p>
                    <ProcessFlow steps={service.process} />
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="lg:[direction:ltr] flex justify-center"
                >
                  <div className="relative max-w-sm w-full">
                    {/* Glow backdrop */}
                    <div className="absolute -inset-8 bg-primary/5 rounded-3xl blur-2xl pointer-events-none" />
                    {/* Border frame */}
                    <div className="relative rounded-2xl border border-primary/20 overflow-hidden bg-card/30 backdrop-blur-sm p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-2xl" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-2xl" />

                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full object-contain rounded-lg"
                        style={{ maxHeight: "320px" }}
                      />

                      {/* Caption */}
                      <p className="mt-4 text-center text-xs text-primary/50 leading-relaxed">
                        {service.imageCaption}
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Section divider */}
            {index < SERVICES.length - 1 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
              </div>
            )}
          </section>
        );
      })}

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-transparent to-card/40 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />

            <h2
              className="mb-4 text-foreground"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-base max-w-lg mx-auto mb-10 leading-relaxed">
              Reach out to discuss your requirements. Our team will guide you through the right service for your needs.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton>
                <Link to="/contact">
                  <Button className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold group px-7 py-5 rounded-xl shadow-[0_2px_20px_rgba(198,167,94,0.3)] hover:shadow-[0_4px_32px_rgba(198,167,94,0.5)] transition-all duration-300 border-0">
                    <span className="relative z-10 flex items-center gap-2">
                      Contact Us
                      <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </span>
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/proficiency-portal">
                  <Button
                    variant="ghost"
                    className="px-7 py-5 rounded-xl border border-primary/35 hover:border-primary/70 text-foreground/75 hover:text-primary bg-primary/5 hover:bg-primary/10 backdrop-blur-sm transition-all duration-300"
                  >
                    Register for Proficiency Testing
                  </Button>
                </Link>
              </MagneticButton>
            </div>

            <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
