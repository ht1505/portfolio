"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

const VARIANTS = {
  hidden: (direction: RevealProps["direction"]) => ({
    opacity: 0,
    filter:  "blur(6px)",
    y:  direction === "up"    ?  32 : 0,
    x:  direction === "left"  ? -32 : direction === "right" ? 32 : 0,
  }),
  visible: { opacity: 1, filter: "blur(0px)", y: 0, x: 0 },
};

/**
 * Reveal — scroll-triggered entrance animation.
 * Supports three entry directions and a configurable stagger delay.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      custom={direction}
      variants={VARIANTS}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
