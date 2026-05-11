"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor — two-layer magnetic cursor.
 *  - Dot  : follows the mouse instantly.
 *  - Ring : trails with spring physics.
 *
 * Colors adapt to light / dark mode via CSS custom properties so the
 * cursor is always visible regardless of the page background.
 * Hidden automatically on touch-only devices via CSS (@media hover:none).
 */
export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 700, mass: 0.2 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Expand + tint cursor when hovering interactive elements
    const onEnter = () => {
      dotRef.current?.classList.add("scale-[2.5]", "!bg-violet-500");
      ringRef.current?.classList.add("scale-150", "!border-violet-500/60");
    };
    const onLeave = () => {
      dotRef.current?.classList.remove("scale-[2.5]", "!bg-violet-500");
      ringRef.current?.classList.remove("scale-150", "!border-violet-500/60");
    };

    window.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll<Element>("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <div
      className="custom-cursor pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {/* Dot — instant, uses text-primary color so it's dark on light bg */}
      <motion.div
        ref={dotRef}
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150"
        style={{
          left:       cursorX,
          top:        cursorY,
          background: "var(--text-primary)",  /* dark in light mode, light in dark mode */
        }}
      />
      {/* Ring — spring-lagged */}
      <motion.div
        ref={ringRef}
        className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
        style={{
          left:        ringX,
          top:         ringY,
          border:      "1.5px solid var(--text-primary)",  /* adapts to theme */
          opacity:     0.35,
        }}
      />
    </div>
  );
}
