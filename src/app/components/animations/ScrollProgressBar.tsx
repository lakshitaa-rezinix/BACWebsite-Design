import { motion, useScroll } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #C6A75E, #E8D5A0, #C6A75E)",
      }}
    />
  );
}
