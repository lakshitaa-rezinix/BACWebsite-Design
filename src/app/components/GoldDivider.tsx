import { motion } from "motion/react";

export function GoldDivider() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-2">
      <svg
        viewBox="0 0 1200 30"
        className="w-full h-8"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6A75E" stopOpacity="0" />
            <stop offset="30%" stopColor="#C6A75E" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#E8D5A0" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#C6A75E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C6A75E" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Animated wave path */}
        <motion.path
          d="M0,15 C100,5 200,25 300,15 C400,5 500,25 600,15 C700,5 800,25 900,15 C1000,5 1100,25 1200,15"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Traveling gold dot */}
        <motion.circle
          r="3"
          fill="#C6A75E"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
        >
          <animateMotion
            dur="2s"
            begin="1.5s"
            fill="freeze"
            path="M0,15 C100,5 200,25 300,15 C400,5 500,25 600,15 C700,5 800,25 900,15 C1000,5 1100,25 1200,15"
          />
        </motion.circle>
      </svg>
    </div>
  );
}
