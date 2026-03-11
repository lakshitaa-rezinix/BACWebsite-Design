import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { ArrowDown, ChevronRight, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { HALLMARKING_STEPS } from "../data/hallmarking-steps";

export function HallmarkingJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Progress Bar - fixed at top */}
      <div className="fixed top-20 left-0 right-0 z-40 h-1 bg-card/50">
        <motion.div
          style={{ width: progressWidth }}
          className="h-full bg-gradient-to-r from-primary to-primary/70"
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
        {/* Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #C6A75E 1px, transparent 1px),
                linear-gradient(to bottom, #C6A75E 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                Hallmarking
              </span>{" "}
              Journey
            </h1>

            <p className="text-foreground/70 text-xl max-w-2xl mx-auto mb-10">
              Follow our mascot through the complete hallmarking process — from security check
              to the final stamp of trust. Discover how every piece of jewelry gets its guarantee of purity.
            </p>

            {/* Hero poster collage preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative max-w-md mx-auto mb-10"
            >
              <div className="relative">
                <img
                  src="/images/posters/work-instruction-1.jpg"
                  alt="Hallmarking Process"
                  className="w-56 h-56 object-cover object-left-top rounded-2xl border-2 border-primary/30 shadow-xl mx-auto"
                />
                <img
                  src="/images/posters/work-instruction-3.jpg"
                  alt="Hallmarking Stamp"
                  className="absolute -bottom-4 -right-4 w-32 h-32 object-cover object-left rounded-xl border-2 border-primary/20 shadow-lg"
                />
                <img
                  src="/images/posters/work-instruction-6.jpg"
                  alt="Security"
                  className="absolute -top-4 -left-4 w-28 h-28 object-cover object-left rounded-xl border-2 border-primary/20 shadow-lg"
                />
              </div>
            </motion.div>

            {/* BIS Certification Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-3 bg-card/60 backdrop-blur-sm border border-primary/20 rounded-full px-5 py-2.5">
                <img src="/images/hallmarking/bis.png" alt="BIS Logo" className="w-7 h-7 object-contain" />
                <span className="text-foreground/80 text-sm font-medium">BIS-Recognized Hallmarking Center</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a href="#step-1">
                <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold group text-lg px-8 py-6">
                  Begin the Journey
                  <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" size={20} />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Step indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-3 mt-12 pb-24"
          >
            {HALLMARKING_STEPS.map((step) => (
              <a
                key={step.id}
                href={`#step-${step.id}`}
                className="group flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary text-sm font-bold group-hover:bg-primary/10 group-hover:border-primary transition-all">
                  {step.id}
                </div>
                <span className="text-muted-foreground text-xs mt-1 hidden sm:block max-w-[80px] text-center leading-tight">
                  {step.title}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      {HALLMARKING_STEPS.map((step, index) => (
        <section
          key={step.id}
          id={`step-${step.id}`}
          className="relative min-h-screen flex items-center py-24 overflow-hidden"
        >
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

          {/* Step number watermark */}
          <div className="absolute top-12 right-8 text-[200px] font-bold text-primary/5 leading-none select-none hidden lg:block">
            {String(step.id).padStart(2, "0")}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Step indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                {step.id}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              <span className="text-muted-foreground text-sm">
                Step {step.id} of {HALLMARKING_STEPS.length}
              </span>
            </motion.div>

            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              {/* Poster illustration */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex justify-center ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Glow behind image */}
                  <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />
                  <img
                    src={step.posterImage}
                    alt={step.title}
                    className="relative z-10 w-full max-w-lg rounded-2xl border-2 border-primary/20 shadow-2xl"
                  />
                  {/* Subtitle overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl p-4">
                    <p className="text-white font-semibold text-lg italic">"{step.subtitle}"</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {step.title}
                </h2>

                <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                  {step.description}
                </p>

                {/* Facts */}
                <div className="space-y-3">
                  {step.facts.map((fact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Shield size={12} className="text-primary" />
                      </div>
                      <span className="text-foreground/70 text-sm">{fact}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Connector to next step */}
            {index < HALLMARKING_STEPS.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center mt-16"
              >
                <a
                  href={`#step-${step.id + 1}`}
                  className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-xs uppercase tracking-wider mb-2">Next Step</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowDown size={20} />
                  </motion.div>
                </a>
              </motion.div>
            )}
          </div>
        </section>
      ))}

      {/* Closing Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield size={32} className="text-primary" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                Mark of Trust
              </span>
            </h2>

            <p className="text-foreground/70 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Every piece of jewelry that passes through BOMBAY ASSAY COMPANY carries a guarantee —
              a guarantee of purity, precision, and trust. From receiving to hallmarking,
              our process ensures that the mark on your jewelry means exactly what it says.
            </p>

            {/* Hallmark diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-10"
            >
              <img
                src="/images/hallmarking/1.jpg"
                alt="Hallmark identification — BIS logo, purity in karat, assaying centre mark, jeweller code"
                className="w-full max-w-md rounded-xl drop-shadow-[0_10px_30px_rgba(198,167,94,0.15)]"
              />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/services">
                <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold group">
                  Explore Our Services
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
