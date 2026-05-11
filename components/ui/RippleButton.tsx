"use client";

import { motion } from "framer-motion";

interface RippleButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** "primary" = gradient fill | "outline" = glass border */
  variant?: "primary" | "outline";
  className?: string;
}

/**
 * RippleButton — premium CTA component.
 * - "primary": purple→cyan gradient with glow shadow.
 * - "outline":  glassmorphism border.
 * Wraps in <a> when href is provided, otherwise renders as a <span> trigger.
 */
export function RippleButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: RippleButtonProps) {
  const baseClass =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 " +
    "text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300";

  const primaryClass =
    "text-white " +
    "before:absolute before:inset-0 before:rounded-full " +
    "before:bg-gradient-to-r before:from-violet-600 before:to-cyan-500 " +
    "after:absolute after:inset-0 after:rounded-full " +
    "after:bg-gradient-to-r after:from-violet-500 after:to-cyan-400 " +
    "after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100";

  const outlineClass =
    "glass-purple text-violet-300 border border-violet-500/30 " +
    "hover:border-violet-400/60 hover:text-violet-200";

  const variantClass = variant === "primary" ? primaryClass : outlineClass;
  const primaryStyle =
    variant === "primary"
      ? { boxShadow: "0 0 30px rgba(124,58,237,0.4)" }
      : undefined;

  const inner = (
    <motion.span
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClass} ${variantClass} ${className}`}
      style={primaryStyle}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }
  return inner;
}
