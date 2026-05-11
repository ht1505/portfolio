"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient scroll progress bar pinned to viewport top. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #7c3aed, #0891b2, #d97706)",
      }}
      aria-hidden="true"
    />
  );
}
