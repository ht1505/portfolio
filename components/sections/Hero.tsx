"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroRoles, heroStats } from "@/lib/data/site";

/**
 * Path to the profile photo inside /public.
 * Copy your photo to: public/images/profile.jpg
 */
const PROFILE_IMAGE = "/images/profile.jpg";

/* ── Animated waveform bars ── */
const WAVE_BARS = [3, 7, 12, 18, 14, 9, 20, 16, 11, 6, 14, 10, 18, 8, 15, 12, 7, 4, 9, 13];
const BAR_COLORS = ["#7c3aed", "#0891b2", "#d97706", "#db2777", "#059669"];

function WaveformViz() {
  return (
    <div className="flex items-end justify-center gap-[3px]" aria-hidden="true">
      {WAVE_BARS.map((h, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full"
          style={{ background: BAR_COLORS[i % BAR_COLORS.length] }}
          animate={{ height: [4, h * 2.8, 4] }}
          transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.07, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Floating 3-D decorative blobs ── */
function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Purple blob */}
      <div
        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full animate-blob-drift"
        style={{ background: "var(--blob-1)", filter: "blur(80px)" }}
      />
      {/* Cyan blob */}
      <div
        className="absolute -right-32 top-40 h-[400px] w-[400px] rounded-full animate-blob-drift"
        style={{ background: "var(--blob-2)", filter: "blur(80px)", animationDelay: "3s" }}
      />
      {/* Gold blob */}
      <div
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full animate-blob-drift"
        style={{ background: "var(--blob-3)", filter: "blur(80px)", animationDelay: "6s" }}
      />
    </div>
  );
}

/* ── Floating 3-D shapes (like reference) ── */
function FloatingShapes() {
  const shapes = [
    { emoji: "⬡", top: "10%",  left: "5%",   size: 56, color: "#7c3aed", delay: "0s",   dur: "6s" },
    { emoji: "◈", top: "20%",  right: "6%",  size: 44, color: "#0891b2", delay: "1.5s", dur: "7s" },
    { emoji: "⬟", top: "65%",  left: "3%",   size: 48, color: "#d97706", delay: "0.8s", dur: "8s" },
    { emoji: "◉", top: "75%",  right: "4%",  size: 40, color: "#db2777", delay: "2s",   dur: "5s" },
    { emoji: "⬡", top: "45%",  right: "10%", size: 32, color: "#059669", delay: "1s",   dur: "9s" },
    { emoji: "◈", top: "85%",  left: "12%",  size: 36, color: "#7c3aed", delay: "3s",   dur: "6.5s" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {shapes.map((s, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center rounded-2xl text-2xl font-bold animate-float-slow"
          style={{
            top:      s.top,
            left:     (s as {left?: string}).left,
            right:    (s as {right?: string}).right,
            width:    s.size,
            height:   s.size,
            color:    s.color,
            fontSize: s.size * 0.5,
            background: `${s.color}15`,
            border:     `1.5px solid ${s.color}30`,
            boxShadow:  `0 4px 20px ${s.color}20`,
            animationDelay:    s.delay,
            animationDuration: s.dur,
            backdropFilter:    "blur(4px)",
          }}
        >
          {s.emoji}
        </div>
      ))}
    </div>
  );
}

/* ── Avatar circle ── */
function AvatarCircle() {
  return (
    <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center">
      {/* Rotating gradient ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(#7c3aed, #0891b2, #d97706, #db2777, #7c3aed)", padding: 3 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      >
        <div className="h-full w-full rounded-full" style={{ background: "var(--bg-primary)" }} />
      </motion.div>

      {/*
        ── PROFILE PHOTO ──────────────────────────────────────────────────────
        Drop your photo at:  public/images/profile.jpg
        It will appear here as a 112×112 circle.
        If the file is missing the gradient fallback below is shown instead.
      */}
      <motion.div
        className="relative z-10 h-28 w-28 overflow-hidden rounded-full"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {/* Fallback gradient — sits behind the image at z-index 0 */}
        <div
          className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold text-white"
          style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)", zIndex: 0 }}
          aria-hidden="true"
        >
          HT
        </div>
        {/* Profile photo — renders on top of the fallback (z-index 1) */}
        <Image
          src={PROFILE_IMAGE}
          alt="Hitesh Thacker — profile photo"
          fill
          className="object-cover object-top"
          priority
          style={{ zIndex: 1 }}
        />
      </motion.div>

      {/* Green "online" ping dot */}
      <span className="absolute bottom-2 right-2 flex h-5 w-5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-5 w-5 rounded-full bg-green-500" />
      </span>
    </div>
  );
}

/** Hero — centered, lively, reference-inspired layout */
export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-24 text-center sm:px-10"
    >
      <Blobs />
      <FloatingShapes />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <AvatarCircle />

        {/* Eyebrow */}
        <motion.p
          className="section-eyebrow mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          — Portfolio 2025 —
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{ color: "var(--text-primary)" }}>Hitesh </span>
          <span className="gradient-text">Thacker</span>
        </motion.h1>

        {/* Role chips */}
        <motion.div
          className="mt-5 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {heroRoles.map((role, i) => (
            <motion.span
              key={role}
              className="rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{
                background: "var(--bg-card)",
                border:     "1.5px solid var(--border)",
                color:      "var(--text-secondary)",
                boxShadow:  "0 2px 10px var(--shadow)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              whileHover={{ scale: 1.06, y: -2 }}
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Building intelligent systems and scalable products — with the discipline
          of a tabla artist and the curiosity of an engineer.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a href="#featured-projects" className="btn-primary">View Projects →</a>
          <a href="#music-journey" className="btn-outline">🎵 Tabla Story</a>
        </motion.div>

        {/* Stats row */}
        <motion.dl
          className="mt-12 flex flex-wrap items-start justify-center gap-8 sm:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {heroStats.map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <dt
                className="text-3xl font-extrabold"
                style={{ color }}
              >
                {value}
              </dt>
              <dd className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                {label}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Waveform */}
        <motion.div
          className="mx-auto mt-12 w-full max-w-sm rounded-3xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "0 4px 24px var(--shadow)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <p className="mb-3 text-center text-[10px] tracking-[0.25em]" style={{ color: "var(--text-muted)" }}>
            RHYTHM VISUALIZATION
          </p>
          <WaveformViz />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          aria-hidden="true"
        >
          <p className="text-[10px] tracking-[0.25em]" style={{ color: "var(--text-muted)" }}>SCROLL</p>
          <div className="animate-scroll-bounce h-6 w-[1px]" style={{ background: "linear-gradient(to bottom, var(--accent-purple), transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}
