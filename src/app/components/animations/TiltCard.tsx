import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { useIsMobile } from "../ui/use-mobile";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 30 });

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-normalizedY * maxTilt);
    rotateY.set(normalizedX * maxTilt);
    glareX.set((normalizedX + 0.5) * 100);
    glareY.set((normalizedY + 0.5) * 100);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${50}% ${50}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
}
