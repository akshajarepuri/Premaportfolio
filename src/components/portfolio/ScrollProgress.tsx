import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX: width }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left gradient-bg"
    />
  );
}