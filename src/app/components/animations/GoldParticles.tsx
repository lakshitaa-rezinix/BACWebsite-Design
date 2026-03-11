import { motion } from "motion/react";
import { useMemo } from "react";
import { useIsMobile } from "../ui/use-mobile";

interface GoldParticlesProps {
  density?: number;
  className?: string;
}

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  yOffset: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
    yOffset: -(20 + Math.random() * 50),
  }));
}

export function GoldParticles({ density = 20, className = "" }: GoldParticlesProps) {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? Math.min(density, 8) : density;

  const particles = useMemo(() => generateParticles(particleCount), [particleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #E8D5A0 0%, #C6A75E 100%)`,
          }}
          animate={{
            y: [0, p.yOffset],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
