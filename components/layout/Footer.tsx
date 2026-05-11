"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/lib/data/site";

const SOCIAL_COLORS = ["#7c3aed", "#0891b2", "#d97706"];

/** Footer with CSS-token colors that adapt to light/dark mode. */
export function Footer() {
  return (
    <footer
      className="relative px-6 pb-12 pt-14 sm:px-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-7 text-center">
        {/* Monogram */}
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-extrabold text-white"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#0891b2)",
            boxShadow:  "0 0 24px rgba(124,58,237,0.3)",
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          aria-hidden="true"
        >
          HT
        </motion.div>

        {/* Social links */}
        <nav aria-label="Social links">
          <ul className="flex gap-3">
            {socialLinks.map((s, i) => (
              <li key={s.label}>
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all"
                  style={{ background: SOCIAL_COLORS[i % SOCIAL_COLORS.length] }}
                  whileHover={{ y: -2, scale: 1.05 }}
                >
                  <span aria-hidden="true">{s.icon}</span>
                  {s.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Built with rhythm by{" "}
          <span className="font-bold" style={{ color: "var(--accent-purple)" }}>Hitesh Thacker</span>
          {" · "}
          <span className="gradient-text font-bold">Code × Tabla × Craft</span>
        </p>
      </div>
    </footer>
  );
}
