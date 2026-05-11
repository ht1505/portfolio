"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutStats } from "@/lib/data/site";

/**
 * Profile photo path — same image used in Hero.
 * Copy your photo to: public/images/profile.jpg
 */
const PROFILE_IMAGE = "/images/profile.jpg";

const FOCUS_TAGS = ["AI Systems", "Full-Stack", "Data Analytics", "Tabla", "Leadership"];
const TAG_COLORS = ["#7c3aed", "#0891b2", "#d97706", "#db2777", "#059669"];

/** About — two-column layout with avatar card and bio text. */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="About Me"
          title="Engineering depth meets artistic soul"
          description="A Computer Science Engineer who codes by day and plays tabla by night."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">

          {/* ── Avatar card ── */}
          <Reveal delay={0.05}>
            <motion.div
              className="relative mx-auto w-full max-w-sm rounded-3xl p-8 text-center"
              style={{
                background: "var(--bg-card)",
                border:     "1px solid var(--border)",
                boxShadow:  "0 4px 40px var(--shadow)",
              }}
              whileHover={{ y: -6 }}
            >
              {/*
                ── PROFILE PHOTO ──────────────────────────────────────────────────────
                Drop your photo at:  public/images/profile.jpg
              */}
              <div
                className="relative mx-auto h-28 w-28 overflow-hidden rounded-full"
                style={{ boxShadow: "0 0 30px rgba(124,58,237,0.35)" }}
              >
                {/* Fallback gradient — sits behind the image at z-index 0 */}
                <div
                  className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)", zIndex: 0 }}
                  aria-hidden="true"
                >
                  HT
                </div>
                {/* Profile photo — renders on top of the fallback */}
                <Image
                  src={PROFILE_IMAGE}
                  alt="Hitesh Thacker — profile photo"
                  fill
                  className="object-cover object-top"
                  style={{ zIndex: 1 }}
                />
              </div>
              <p className="mt-4 text-lg font-bold" style={{ color: "var(--text-primary)" }}>Hitesh Thacker</p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>CSE @ Nirma University</p>

              {/* Focus tag pills */}
              <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Focus areas">
                {FOCUS_TAGS.map((tag, i) => (
                  <motion.li
                    key={tag}
                    className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: TAG_COLORS[i % TAG_COLORS.length] }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {tag}
                  </motion.li>
                ))}
              </ul>

              {/* Decorative dots */}
              <div className="pointer-events-none absolute -right-3 -top-3 flex gap-1.5" aria-hidden="true">
                {["#7c3aed", "#0891b2", "#d97706"].map((c) => (
                  <span key={c} className="h-3 w-3 rounded-full" style={{ background: c, opacity: 0.7 }} />
                ))}
              </div>
            </motion.div>
          </Reveal>

          {/* ── Bio + stat grid ── */}
          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                <p>
                  I&apos;m a{" "}
                  <strong className="font-semibold" style={{ color: "var(--accent-purple)" }}>
                    Computer Science Engineering
                  </strong>{" "}
                  student at Nirma University, building data-driven and AI-powered systems that solve real problems.
                </p>
                <p>
                  I work across the full stack — from backend architecture and database design to intelligent
                  features and clean UIs. I love turning complex ideas into elegant, working products.
                </p>
                <p>
                  Beyond technology, I&apos;m a trained{" "}
                  <strong className="font-semibold" style={{ color: "var(--accent-gold)" }}>
                    tabla player
                  </strong>{" "}
                  with 6 of 7 Visharad levels completed. The discipline of riyaaz shapes how I write code —
                  with patience, precision, and rhythm.
                </p>
              </div>
            </Reveal>

            {/* Stats grid */}
            <Reveal delay={0.18}>
              <dl className="grid grid-cols-2 gap-4">
                {aboutStats.map(({ value, label, color }, i) => (
                  <motion.div
                    key={label}
                    className="rounded-2xl p-5 text-center"
                    style={{
                      background: `${color}10`,
                      border:     `1.5px solid ${color}30`,
                    }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <dt className="text-2xl font-extrabold" style={{ color }}>{value}</dt>
                    <dd className="mt-1 text-xs leading-snug" style={{ color: "var(--text-muted)" }}>{label}</dd>
                  </motion.div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
