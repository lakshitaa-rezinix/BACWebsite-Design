import { motion, useMotionValue, animate as motionAnimate } from "motion/react";
import { Link } from "react-router";
import { ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect, type CSSProperties } from "react";
import { MagneticButton } from "../animations/MagneticButton";

function JewelDecor({
  src, opacity = 0.12, style, floatY = 10, floatDuration = 20, delay = 0.6,
}: {
  src: string; opacity?: number; style: CSSProperties; floatY?: number; floatDuration?: number; delay?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none z-[1]"
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ delay, duration: 1.8 }}
    >
      <motion.img
        src={src}
        alt=""
        aria-hidden="true"
        animate={{ y: [0, -floatY, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        draggable={false}
        style={{ display: "block" }}
      />
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = motionAnimate(count, value, { duration: 2, ease: "easeOut" });
      const unsubscribe = count.on("change", (v) => setDisplay(Math.round(v).toString()));
      return () => { controls.stop(); unsubscribe(); };
    }, 800);
    return () => clearTimeout(timer);
  }, [value, count]);

  return <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{display}{suffix}</span>;
}

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${320 + i * 6}C-${
      380 - i * 5 * position
    } -${320 + i * 6} -${312 - i * 5 * position} ${85 - i * 6} ${
      152 - i * 5 * position
    } ${212 - i * 6}C${616 - i * 5 * position} ${339 - i * 6} ${
      684 - i * 5 * position
    } ${744 - i * 6} ${684 - i * 5 * position} ${744 - i * 6}`,
    width: 0.4 + i * 0.025,
    opacity: 0.06 + i * 0.015,
    duration: 22 + (i % 7) * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-primary" viewBox="0 -80 696 316" fill="none" aria-hidden="true">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [path.opacity * 0.5, path.opacity, path.opacity * 0.5],
              pathOffset: [0, 1, 0],
            }}
            transition={{ duration: path.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

const HEADING = [
  { text: "India's Benchmark in", italic: false, gold: false },
  { text: "Jewelry", italic: false, gold: false },
  { text: "Quality & Hallmarking", italic: true, gold: true },
];

export function HeroEditorial() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Animated Gold SVG Paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Subtle orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/5 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-primary/8 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Jewelry decorative layer */}
      {/* set4 — two layered necklaces, left side */}
      <JewelDecor
        src="/images/hallmarking/set4.png"
        opacity={0.13}
        style={{ left: '-55px', top: '24%', width: '250px', transform: 'rotate(-8deg)' }}
        floatY={11} floatDuration={21} delay={0.5}
      />
      {/* set2 — choker + long earrings, right side upper */}
      <JewelDecor
        src="/images/hallmarking/set2.png"
        opacity={0.14}
        style={{ right: '-42px', top: '16%', width: '215px', transform: 'rotate(10deg)' }}
        floatY={10} floatDuration={19} delay={0.7}
      />
      {/* necklace5 — simple flat choker, bottom-right */}
      <JewelDecor
        src="/images/hallmarking/necklace5.png"
        opacity={0.12}
        style={{ right: '45px', bottom: '45px', width: '155px', transform: 'rotate(-15deg)' }}
        floatY={8} floatDuration={16} delay={0.9}
      />
      {/* stuff2 — rings and earrings collection, bottom-left */}
      <JewelDecor
        src="/images/hallmarking/stuff2.png"
        opacity={0.12}
        style={{ left: '28px', bottom: '25px', width: '172px', transform: 'rotate(10deg)' }}
        floatY={9} floatDuration={24} delay={0.8}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 pb-10">

        {/* Thin decorative rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
        />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-primary/70 text-xs uppercase tracking-[0.35em] mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          BIS Recognized · Est. 2004
        </motion.p>

        {/* Heading — Cormorant Garamond, line-by-line reveal */}
        <h1
          className="mb-8 tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.15 }}
        >
          {HEADING.map((line, lineIndex) => (
            <div key={lineIndex} className="overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.3 + lineIndex * 0.18,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                  fontWeight: line.gold ? 700 : 600,
                  fontStyle: line.italic ? "italic" : "normal",
                  color: line.gold ? "transparent" : undefined,
                  backgroundImage: line.gold
                    ? "linear-gradient(135deg, #C6A75E 0%, #E8D5A0 50%, #C6A75E 100%)"
                    : undefined,
                  WebkitBackgroundClip: line.gold ? "text" : undefined,
                  backgroundClip: line.gold ? "text" : undefined,
                }}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="text-foreground/55 mb-10 mx-auto max-w-xl tracking-wide"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            letterSpacing: "0.02em",
          }}
        >
          BIS-recognized hallmarking center&ensp;·&ensp;10M+ pieces annually
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <MagneticButton>
            <Link to="/proficiency-portal">
              <Button
                className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold group px-7 py-5 text-base rounded-xl shadow-[0_2px_20px_rgba(198,167,94,0.3)] hover:shadow-[0_4px_32px_rgba(198,167,94,0.5)] transition-all duration-300 border-0"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Register for Proficiency Testing
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/services">
              <Button
                variant="ghost"
                className="px-7 py-5 text-base rounded-xl border border-primary/35 hover:border-primary/70 text-foreground/75 hover:text-primary bg-primary/5 hover:bg-primary/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_18px_rgba(198,167,94,0.15)]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Explore Services
              </Button>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="relative inline-flex bg-card/50 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden"
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(198,167,94,0.08) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
          />
          <div className="flex items-stretch">
            {[
              { value: 10, suffix: "M+", label: "Pieces Annually" },
              { value: 7, suffix: "", label: "Centers Across India" },
              { value: 20, suffix: "+", label: "Years of Trust" },
            ].map((stat, i) => (
              <div key={i} className="flex items-stretch">
                {i > 0 && <div className="w-px bg-primary/15 self-stretch" />}
                <div className="text-center px-8 py-4">
                  <div
                    className="text-2xl md:text-3xl font-bold text-primary"
                    style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    className="text-muted-foreground mt-0.5"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase" }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-primary/50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "'Inter', sans-serif" }}>Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
