import { motion, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { SPRING_BOUNCY, STAGGER_DELAY } from "../../hooks/useAnimationConfig";

// ─── SplitTextReveal ─────────────────────────────────────────────
interface SplitTextRevealProps {
  children: string;
  splitBy?: "word" | "char";
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  animate?: boolean; // true = animate on mount, false = animate on scroll
}

export function SplitTextReveal({
  children,
  splitBy = "word",
  staggerDelay = STAGGER_DELAY,
  className = "",
  once = true,
  as: Tag = "span",
  animate: animateOnMount = false,
}: SplitTextRevealProps) {
  const prefersReduced = useReducedMotion();
  const tokens = splitBy === "word" ? children.split(" ") : children.split("");
  const separator = splitBy === "word" ? "\u00A0" : "";

  if (prefersReduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const animationProps = animateOnMount
    ? { initial: { y: "100%", opacity: 0 }, animate: { y: 0, opacity: 1 } }
    : { initial: { y: "100%", opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once, amount: 0.5 as const } };

  return (
    <Tag className={className}>
      {tokens.map((token, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] mb-[-0.15em]">
          <motion.span
            className="inline-block"
            {...animationProps}
            transition={{ ...SPRING_BOUNCY, delay: i * staggerDelay }}
          >
            {token}
            {separator}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// ─── GoldShimmerText ─────────────────────────────────────────────
interface GoldShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function GoldShimmerText({
  children,
  className = "",
  as: Tag = "span",
}: GoldShimmerTextProps) {
  return (
    <Tag className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(198,167,94,0.35) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          mixBlendMode: "overlay",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />
    </Tag>
  );
}

// ─── TypewriterText ──────────────────────────────────────────────
interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 40,
  className = "",
  startDelay = 800,
  showCursor = true,
}: TypewriterTextProps) {
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started || prefersReduced) {
      if (prefersReduced) setCharCount(text.length);
      return;
    }
    if (charCount >= text.length) return;
    const timer = setTimeout(() => setCharCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [started, charCount, text.length, speed, prefersReduced]);

  return (
    <span className={className}>
      {text.slice(0, charCount)}
      {showCursor && charCount < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "steps(2)" }}
          className="text-primary"
        >
          |
        </motion.span>
      )}
      {showCursor && charCount >= text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-primary"
        >
          |
        </motion.span>
      )}
    </span>
  );
}
