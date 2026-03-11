import { motion, useMotionValue, animate as motionAnimate } from "motion/react";
import { Link } from "react-router";
import { ArrowDown, ChevronRight, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect, type CSSProperties } from "react";
import { SplitTextReveal, TypewriterText } from "../animations/AnimatedText";
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

const TEAM_CARDS = [
  { src: "/images/team/team-delhi.jpeg",    city: "Delhi" },
  { src: "/images/team/team-mumbai.jpeg",   city: "Mumbai" },
  { src: "/images/team/team-kolkata.jpeg",  city: "Kolkata" },
  { src: "/images/team/team-hosur.jpeg",    city: "Hosur" },
  { src: "/images/team/team-udupi.jpeg",    city: "Udupi" },
  { src: "/images/team/team-surat.jpeg",    city: "Surat" },
];

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

function TeamShowcase() {
  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Phase 1: flip out
      setFlipping(true);
      setTimeout(() => {
        // Swap image at the halfway point
        setIndex((prev) => (prev + 1) % TEAM_CARDS.length);
        // Phase 2: flip back in
        setTimeout(() => setFlipping(false), 400);
      }, 400);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const card = TEAM_CARDS[index];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div className="relative max-w-lg mx-auto">
        {/* Gold glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/12 rounded-full blur-[80px] pointer-events-none" />

        {/* Flipping main card */}
        <div style={{ perspective: 900 }}>
          <motion.div
            animate={{ rotateY: flipping ? 12 : 0, opacity: flipping ? 0 : 1, scale: flipping ? 0.97 : 1 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative border border-primary/25 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <img
              src={card.src}
              alt={`BAC ${card.city} team`}
              className="w-full h-72 md:h-80 object-cover block"
            />

            {/* Golden overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-primary/8 to-transparent pointer-events-none" />

            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(198,167,94,0.12) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
            />

            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary/40 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary/40 rounded-br-2xl" />

            {/* City label */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/70 backdrop-blur-md px-5 py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-primary font-medium">
                <MapPin size={12} />
                {card.city}
              </div>
              <span className="text-foreground/60">BAC Team</span>
              <div className="flex gap-1">
                {TEAM_CARDS.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-primary" : "bg-primary/25"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative mt-6 bg-card/80 backdrop-blur-xl border border-primary/30 rounded-2xl p-5 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(198,167,94,0.08) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
          />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                <AnimatedCounter value={10} suffix="M+" />
              </div>
              <div className="text-muted-foreground text-xs mt-1">Pieces Annually</div>
            </div>
            <div className="border-x border-primary/20">
              <div className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                <AnimatedCounter value={7} />
              </div>
              <div className="text-muted-foreground text-xs mt-1">Centers Across India</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                <AnimatedCounter value={20} suffix="+" />
              </div>
              <div className="text-muted-foreground text-xs mt-1">Years of Trust</div>
            </div>
          </div>
        </motion.div>

        {/* Decorative glows */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#2E5BFF]/10 rounded-full blur-2xl pointer-events-none" />
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #C6A75E 1px, transparent 1px),
            linear-gradient(to bottom, #C6A75E 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Mesh Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 0.9, 1.1, 1],
          x: [0, 80, -40, 60, 0],
          y: [0, -50, 30, -70, 0],
          opacity: [0.2, 0.4, 0.3, 0.5, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.3, 0.9, 1.2],
          x: [0, -60, 50, -30, 0],
          y: [0, 40, -60, 20, 0],
          opacity: [0.15, 0.3, 0.2, 0.35, 0.15],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#2E5BFF]/10 rounded-full blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -40, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/3 w-72 h-72 bg-[#E8D5A0]/15 rounded-full blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          x: [0, -70, 0],
          y: [0, 60, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
      />

      {/* Jewelry decorative layer */}
      {/* necklace1 — elaborate multi-strand on display stand, left edge */}
      <JewelDecor
        src="/images/hallmarking/necklace1.png"
        opacity={0.12}
        style={{ left: '-65px', top: '16%', width: '250px', transform: 'rotate(-5deg)' }}
        floatY={11} floatDuration={22} delay={0.5}
      />
      {/* bangles1 — two ornate bangles, bottom-right corner */}
      <JewelDecor
        src="/images/hallmarking/bangles1.png"
        opacity={0.11}
        style={{ right: '-30px', bottom: '-15px', width: '200px', transform: 'rotate(22deg)' }}
        floatY={9} floatDuration={18} delay={0.7}
      />
      {/* earrings1 — gold hoop earrings, top-right */}
      <JewelDecor
        src="/images/hallmarking/earrings1.png"
        opacity={0.14}
        style={{ right: '70px', top: '40px', width: '88px', transform: 'rotate(15deg)' }}
        floatY={8} floatDuration={16} delay={0.9}
      />
      {/* stuff1 — gold tray with coins and flowers, bottom-left */}
      <JewelDecor
        src="/images/hallmarking/stuff1.png"
        opacity={0.12}
        style={{ left: '8px', bottom: '-10px', width: '165px', transform: 'rotate(-10deg)' }}
        floatY={7} floatDuration={24} delay={0.6}
      />
      {/* necklace2 — multi-strand on stand, top-left partially off-screen (only necklace visible) */}
      <JewelDecor
        src="/images/hallmarking/necklace2.png"
        opacity={0.07}
        style={{ left: '50px', top: '-55px', width: '170px', transform: 'rotate(8deg)' }}
        floatY={6} floatDuration={26} delay={1.1}
      />

      <div className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-0 -mt-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <SplitTextReveal
                className="text-foreground block"
                splitBy="word"
                staggerDelay={0.08}
                animate
              >
                India's Benchmark in
              </SplitTextReveal>
              <SplitTextReveal
                className="text-foreground block"
                splitBy="word"
                staggerDelay={0.08}
                animate
              >
                Jewelry
              </SplitTextReveal>
              <SplitTextReveal
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 block"
                splitBy="word"
                staggerDelay={0.08}
                animate
              >
                Quality & Hallmarking
              </SplitTextReveal>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-foreground/70 text-base mb-5 max-w-xl"
            >
              <TypewriterText
                text="BIS-recognized hallmarking center | 10M+ pieces annually"
                speed={30}
                startDelay={1200}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <Link to="/proficiency-portal">
                  <Button className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold group px-6 py-5 rounded-xl shadow-[0_2px_20px_rgba(198,167,94,0.3)] hover:shadow-[0_4px_32px_rgba(198,167,94,0.5)] transition-all duration-300 border-0">
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
                  <Button variant="ghost" className="px-6 py-5 rounded-xl border border-primary/35 hover:border-primary/70 text-foreground/75 hover:text-primary bg-primary/5 hover:bg-primary/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_18px_rgba(198,167,94,0.15)]">
                    Explore Services
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Visual — Team Photo Flipper */}
          <TeamShowcase />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2 text-primary/70"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
