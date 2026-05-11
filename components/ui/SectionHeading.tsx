"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}

/** SectionHeading — consistent section header using CSS-token colors. */
export function SectionHeading({ eyebrow, title, description, center = false }: SectionHeadingProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <Reveal>
        <p className="section-eyebrow mb-3 flex items-center gap-2" style={center ? { justifyContent: "center" } : {}}>
          <span className="h-px w-5 rounded-full" style={{ background: "var(--accent-purple)" }} />
          {eyebrow}
          <span className="h-px w-5 rounded-full" style={{ background: "var(--accent-purple)" }} />
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
          style={{ color: "var(--text-primary)" }}
        >
          <span className="gradient-text">{title}</span>
        </h2>
        <motion.div
          className="mt-4 h-[3px] rounded-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #0891b2, transparent)" }}
          initial={{ width: 0 }}
          whileInView={{ width: center ? "100%" : 200 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </Reveal>

      {description && (
        <Reveal delay={0.14}>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
