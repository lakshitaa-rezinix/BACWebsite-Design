import { useReducedMotion } from "motion/react";
import { useIsMobile } from "../components/ui/use-mobile";

// Shared spring configurations
export const SPRING_GENTLE = { type: "spring" as const, stiffness: 100, damping: 30 };
export const SPRING_BOUNCY = { type: "spring" as const, stiffness: 300, damping: 20 };
export const SPRING_STIFF = { type: "spring" as const, stiffness: 400, damping: 40 };

// Shared timing
export const STAGGER_DELAY = 0.08;
export const DURATION_FAST = 0.3;
export const DURATION_NORMAL = 0.6;
export const DURATION_SLOW = 1.0;

/**
 * Returns false if complex animations should be disabled
 * (mobile devices or user prefers reduced motion)
 */
export function useAnimationEnabled() {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  return !isMobile && !prefersReduced;
}

export { useIsMobile, useReducedMotion };
