import { motion, useMotionValue, animate as motionAnimate } from "motion/react";
import { Link } from "react-router";
import { ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect, type CSSProperties } from "react";
import { TypewriterText } from "../animations/AnimatedText";
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
      const controls = motionAnimate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      const unsubscribe = count.on("change", (v) => {
        setDisplay(Math.round(v).toString());
      });
      return () => {
        controls.stop();
        unsubscribe();
      };
    }, 1200);
    return () => clearTimeout(timer);
  }, [value, count]);

  return (
    <span className="font-mono">
      {display}
      {suffix}
    </span>
  );
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
    width: 0.5 + i * 0.03,
    opacity: 0.08 + i * 0.018,
    duration: 20 + (i % 7) * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-primary"
        viewBox="0 -80 696 316"
        fill="none"
        aria-hidden="true"
      >
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
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
              delay: 0,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const TITLE_WORDS = ["India's", "Benchmark", "in", "Jewelry", "Quality", "&", "Hallmarking"];
const GOLD_WORDS = new Set(["Quality", "&", "Hallmarking"]);

export function HeroBackgroundPaths() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Animated Gold SVG Paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Subtle gold orb accents */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Jewelry decorative layer */}
      {/* necklace3 — traditional choker, left side */}
      <JewelDecor
        src="/images/hallmarking/necklace3.png"
        opacity={0.15}
        style={{ left: '-60px', top: '28%', width: '255px', transform: 'rotate(-10deg)' }}
        floatY={12} floatDuration={21} delay={0.5}
      />
      {/* set1 — full bridal set with red gems, right side */}
      <JewelDecor
        src="/images/hallmarking/set1.png"
        opacity={0.12}
        style={{ right: '-55px', top: '20%', width: '265px', transform: 'rotate(8deg)' }}
        floatY={10} floatDuration={23} delay={0.7}
      />
      {/* set3 — necklace + jhumka earrings + bangles, bottom-left */}
      <JewelDecor
        src="/images/hallmarking/set3.png"
        opacity={0.11}
        style={{ left: '25px', bottom: '-8px', width: '195px', transform: 'rotate(-5deg)' }}
        floatY={8} floatDuration={19} delay={0.8}
      />
      {/* set5 — necklace + jhumka earrings, top-right */}
      <JewelDecor
        src="/images/hallmarking/set5.png"
        opacity={0.12}
        style={{ right: '65px', top: '22px', width: '175px', transform: 'rotate(12deg)' }}
        floatY={9} floatDuration={17} delay={1.0}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 pb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Animated per-letter heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-tight leading-[1.3]">
            {TITLE_WORDS.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-[0.25em] last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.08 + letterIndex * 0.025,
                      type: "spring",
                      stiffness: 160,
                      damping: 22,
                    }}
                    className={
                      GOLD_WORDS.has(word)
                        ? "inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70"
                        : "inline-block text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/80"
                    }
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-foreground/60 text-base md:text-lg mb-7 max-w-2xl mx-auto"
          >
            <TypewriterText
              text="BIS-recognized hallmarking center | 10M+ pieces annually"
              speed={28}
              startDelay={0}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 1.1 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <MagneticButton>
              <Link to="/proficiency-portal">
                <Button className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold group px-7 py-5 text-base rounded-xl shadow-[0_2px_20px_rgba(198,167,94,0.3)] hover:shadow-[0_4px_32px_rgba(198,167,94,0.5)] transition-all duration-300 border-0">
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
                >
                  Explore Services
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="relative inline-flex bg-card/60 backdrop-blur-xl border border-primary/25 rounded-2xl px-8 py-5 overflow-hidden"
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(198,167,94,0.09) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
            />
            <div className="flex items-center gap-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary tracking-tight">
                  <AnimatedCounter value={10} suffix="M+" />
                </div>
                <div className="text-muted-foreground text-xs mt-1">Pieces Annually</div>
              </div>
              <div className="w-px h-10 bg-primary/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary tracking-tight">
                  <AnimatedCounter value={7} />
                </div>
                <div className="text-muted-foreground text-xs mt-1">Centers Across India</div>
              </div>
              <div className="w-px h-10 bg-primary/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary tracking-tight">
                  <AnimatedCounter value={20} suffix="+" />
                </div>
                <div className="text-muted-foreground text-xs mt-1">Years of Trust</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
          className="flex flex-col items-center gap-2 text-primary/60"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
