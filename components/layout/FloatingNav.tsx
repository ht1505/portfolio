"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/data/site";
import { useTheme } from "@/lib/context/ThemeContext";

/**
 * SiteNav — always-visible fixed header.
 *
 * Active-section tracking uses IntersectionObserver (fires only when a
 * section crosses the viewport, never on every scroll frame), so the
 * highlighted tab can never oscillate.
 */
export function FloatingNav() {
  const [active, setActive] = useState<string>("#hero");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Map each section id → nav href so we can look it up fast
    const hrefMap = new Map<string, string>(
      navLinks.map((l) => [l.href.replace("#", ""), l.href]),
    );

    // rootMargin: treat the top 30 % of the viewport as the trigger zone.
    // When a section enters that zone it becomes active.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const href = hrefMap.get(entry.target.id);
            if (href) setActive(href);
          }
        }
      },
      { rootMargin: "0px 0px -65% 0px", threshold: 0 },
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navBg =
    theme === "light"
      ? "rgba(255,255,255,0.88)"
      : "rgba(8,8,26,0.88)";

  return (
    <header
      className="fixed top-0 inset-x-0 z-40"
      style={{
        background:           navBg,
        backdropFilter:       "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom:         "1px solid var(--border)",
        boxShadow:            "0 2px 16px var(--shadow)",
      }}
    >
      <nav
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-2 px-5"
        aria-label="Site navigation"
      >
        {/* Brand */}
        <a href="#hero" aria-label="Back to top" className="flex-shrink-0">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold text-white"
            style={{ background: "linear-gradient(135deg,#7c3aed,#0891b2)" }}
          >
            HT
          </span>
        </a>

        {/* Nav links */}
        <ul className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map(({ href, label }) => {
            const isActive = active === href;
            return (
              <li key={href}>
                <a
                  href={href}
                  className="block rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide"
                  style={{
                    color:           isActive ? "#7c3aed"              : "var(--text-muted)",
                    background:      isActive ? "rgba(124,58,237,0.10)" : "transparent",
                    border:          isActive ? "1.5px solid rgba(124,58,237,0.25)" : "1.5px solid transparent",
                    transition:      "color 0.22s ease, background 0.22s ease, border-color 0.22s ease",
                    whiteSpace:      "nowrap",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex flex-shrink-0 items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
            style={{
              background: "var(--bg-secondary)",
              border:     "1px solid var(--border)",
            }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </motion.button>

          {/* GitHub */}
          <a
            href="https://github.com/ht1505"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              background: "var(--bg-secondary)",
              border:     "1px solid var(--border)",
              color:      "var(--text-secondary)",
              transition: "color 0.2s, background 0.2s",
            }}
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
