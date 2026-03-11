import { motion } from "motion/react";

// ─── DiamondSVG ──────────────────────────────────────────────────
interface DiamondSVGProps {
  size?: number;
  className?: string;
}

export function DiamondSVG({ size = 48, className = "" }: DiamondSVGProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`pointer-events-none ${className}`}
      animate={{ rotate: [0, 3, -3, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <motion.stop
            offset="0%"
            stopColor="#C6A75E"
            animate={{ stopOpacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.stop
            offset="50%"
            stopColor="#E8D5A0"
            animate={{ stopOpacity: [1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <stop offset="100%" stopColor="#C6A75E" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Diamond crown (top) */}
      <polygon points="50,5 85,35 50,50 15,35" fill="url(#diamondGrad)" opacity="0.9" />
      {/* Diamond pavilion (bottom) */}
      <polygon points="15,35 85,35 50,95" fill="url(#diamondGrad)" opacity="0.7" />
      {/* Facet lines */}
      <line x1="50" y1="5" x2="50" y2="50" stroke="#E8D5A0" strokeWidth="0.5" opacity="0.6" />
      <line x1="50" y1="50" x2="50" y2="95" stroke="#E8D5A0" strokeWidth="0.5" opacity="0.4" />
      <line x1="15" y1="35" x2="85" y2="35" stroke="#E8D5A0" strokeWidth="0.5" opacity="0.5" />
      <line x1="50" y1="5" x2="15" y2="35" stroke="#E8D5A0" strokeWidth="0.5" opacity="0.3" />
      <line x1="50" y1="5" x2="85" y2="35" stroke="#E8D5A0" strokeWidth="0.5" opacity="0.3" />
      <line x1="50" y1="50" x2="15" y2="35" stroke="#E8D5A0" strokeWidth="0.5" opacity="0.3" />
      <line x1="50" y1="50" x2="85" y2="35" stroke="#E8D5A0" strokeWidth="0.5" opacity="0.3" />
      {/* Sparkle sweep */}
      <motion.line
        x1="10"
        y1="35"
        x2="20"
        y2="30"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
        animate={{ x1: [10, 90], x2: [20, 90], y1: [35, 35], y2: [30, 40], opacity: [0, 0.8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
      />
    </motion.svg>
  );
}

// ─── GoldRingSVG ─────────────────────────────────────────────────
interface GoldRingSVGProps {
  size?: number;
  className?: string;
}

export function GoldRingSVG({ size = 48, className = "" }: GoldRingSVGProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C6A75E" />
          <stop offset="50%" stopColor="#E8D5A0" />
          <stop offset="100%" stopColor="#C6A75E" />
        </linearGradient>
      </defs>
      {/* Main ring */}
      <motion.ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="35"
        stroke="url(#ringGrad)"
        strokeWidth="8"
        opacity="0.7"
        animate={{ scaleX: [1, 0.7, 1], scaleY: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 50px" }}
      />
      {/* Inner shadow ring */}
      <ellipse
        cx="50"
        cy="52"
        rx="30"
        ry="30"
        stroke="#C6A75E"
        strokeWidth="2"
        opacity="0.15"
      />
      {/* Shine arc sweeping around */}
      <motion.circle
        cx="50"
        cy="50"
        r="35"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
        strokeDasharray="20 200"
        animate={{ strokeDashoffset: [0, -220] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </motion.svg>
  );
}

// ─── SparkleSVG ──────────────────────────────────────────────────
interface SparkleSVGProps {
  size?: number;
  className?: string;
  color?: string;
  duration?: number;
}

export function SparkleSVG({
  size = 24,
  className = "",
  color = "#C6A75E",
  duration = 2,
}: SparkleSVGProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`pointer-events-none ${className}`}
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* 4-pointed star */}
      <path
        d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
        fill={color}
      />
    </motion.svg>
  );
}

// ─── GemStoneSVG ─────────────────────────────────────────────────
interface GemStoneSVGProps {
  size?: number;
  className?: string;
}

export function GemStoneSVG({ size = 40, className = "" }: GemStoneSVGProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={`pointer-events-none ${className}`}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C6A75E" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#2E5BFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C6A75E" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Hexagonal gem */}
      <polygon
        points="40,5 70,20 70,55 40,75 10,55 10,20"
        fill="url(#gemGrad)"
        stroke="#C6A75E"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Inner facet */}
      <polygon
        points="40,15 60,25 60,50 40,65 20,50 20,25"
        fill="none"
        stroke="#E8D5A0"
        strokeWidth="0.5"
        opacity="0.4"
      />
      {/* Center line */}
      <line x1="40" y1="15" x2="40" y2="65" stroke="#E8D5A0" strokeWidth="0.3" opacity="0.3" />
    </motion.svg>
  );
}
