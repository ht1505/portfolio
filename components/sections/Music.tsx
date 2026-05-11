"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements, tablaStory, tablaQuote, waveBars } from "@/lib/data/music";

// ─── Canvas tabla ─────────────────────────────────────────────────────────────

interface Ripple { x: number; y: number; r: number; alpha: number; }

function TablaCanvas() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef     = useRef<number>(0);
  const beatRef    = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2;

    ctx.clearRect(0, 0, W, H);
    beatRef.current += 0.03;

    // Outer wood rim
    const rimGrad = ctx.createRadialGradient(cx, cy, 80, cx, cy, 115);
    rimGrad.addColorStop(0, "#8B5E3C");
    rimGrad.addColorStop(1, "#5C3317");
    ctx.beginPath();
    ctx.arc(cx, cy, 115, 0, Math.PI * 2);
    ctx.fillStyle = rimGrad;
    ctx.fill();

    // Drum skin
    const skinGrad = ctx.createRadialGradient(cx - 10, cy - 10, 0, cx, cy, 95);
    skinGrad.addColorStop(0, "#2a1400");
    skinGrad.addColorStop(0.7, "#1a0d00");
    skinGrad.addColorStop(1, "#0a0500");
    ctx.beginPath();
    ctx.arc(cx, cy, 95, 0, Math.PI * 2);
    ctx.fillStyle = skinGrad;
    ctx.fill();

    // Tension rings
    for (const r of [68, 82, 95]) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(200,140,60,0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Syahi (centre black patch) — pulsing
    const pulse = 1 + Math.sin(beatRef.current) * 0.03;
    const syahi = ctx.createRadialGradient(cx, cy, 0, cx, cy, 36 * pulse);
    syahi.addColorStop(0, "#111");
    syahi.addColorStop(1, "#000");
    ctx.beginPath();
    ctx.arc(cx, cy, 36 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = syahi;
    ctx.fill();

    // Gold ring around syahi
    ctx.beginPath();
    ctx.arc(cx, cy, 38 * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(217,119,6,${0.4 + Math.sin(beatRef.current) * 0.15})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ambient glow
    const glow = ctx.createRadialGradient(cx, cy, 30, cx, cy, 130);
    glow.addColorStop(0, `rgba(124,58,237,${0.04 + Math.sin(beatRef.current * 0.6) * 0.02})`);
    glow.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(cx, cy, 130, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // Click ripples
    ripplesRef.current = ripplesRef.current.filter((rpl) => rpl.alpha > 0.01);
    for (const rpl of ripplesRef.current) {
      ctx.beginPath();
      ctx.arc(rpl.x, rpl.y, rpl.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(217,119,6,${rpl.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      rpl.r += 2.5;
      rpl.alpha *= 0.93;
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  function onClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = canvasRef.current!.width  / rect.width;
    const scaleY = canvasRef.current!.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top)  * scaleY;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        ripplesRef.current.push({ x, y, r: 10 + i * 14, alpha: 0.75 - i * 0.18 });
      }, i * 80);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        onClick={onClick}
        className="cursor-pointer rounded-full"
        style={{ boxShadow: "0 8px 50px rgba(124,58,237,0.2), 0 0 80px rgba(217,119,6,0.08)" }}
        role="img"
        aria-label="Interactive tabla drum. Click to play a ripple."
        title="Click the tabla!"
      />
      <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--text-muted)" }}>
        Click the tabla ↑
      </p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

const WAVEFORM_COLORS = ["#d97706", "#7c3aed", "#0891b2", "#db2777", "#d97706"];

/** Music — immersive tabla section with canvas, story, achievements, and taal waveform. */
export function Music() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="music-journey"
      ref={sectionRef}
      aria-labelledby="music-heading"
      className="relative overflow-hidden px-6 py-24 sm:px-10 md:py-32"
    >
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full"
        style={{ background: "var(--blob-3)", filter: "blur(120px)", opacity: 0.7 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full"
        style={{ background: "var(--blob-1)", filter: "blur(120px)", opacity: 0.5 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Music Journey"
          title="Where rhythm meets code"
          description="Tabla isn't just music — it's discipline, precision, and flow. The same qualities I bring to engineering."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Story + achievements */}
          <Reveal delay={0.06}>
            <div className="space-y-5">
              {tablaStory.map((para, i) => (
                <motion.p
                  key={i}
                  className="text-base leading-relaxed sm:text-lg"
                  style={{ color: "var(--text-secondary)" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
                >
                  {para}
                </motion.p>
              ))}

              <motion.blockquote
                className="rounded-2xl py-4 pl-5 text-sm italic sm:text-base"
                style={{
                  borderLeft:  "3px solid #d97706",
                  background:  "rgba(217,119,6,0.06)",
                  color:       "var(--text-secondary)",
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
              >
                &ldquo;{tablaQuote}&rdquo;
              </motion.blockquote>

              {/* Achievement photo cards */}
              <ul className="grid grid-cols-2 gap-3" aria-label="Music awards">
                {achievements.map((a, i) => (
                  <motion.li
                    key={a.event}
                    className="group overflow-hidden rounded-2xl"
                    style={{
                      background: "var(--bg-card)",
                      border:     "1px solid rgba(217,119,6,0.2)",
                      boxShadow:  "0 2px 14px var(--shadow)",
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(217,119,6,0.18)" }}
                  >
                    {/*
                      COMPETITION PHOTO — drop your photos in public/images/:
                        award-vaudeville-2025.jpg
                        award-pdeu-2024.jpg
                        award-nuzeal-2025.jpg
                        award-vaudeville-2024.jpg
                    */}
                    <div className="relative h-28 w-full overflow-hidden bg-amber-50 dark:bg-amber-950">
                      {a.image && (
                        <Image
                          src={a.image}
                          alt={`${a.award} at ${a.event}`}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      {/* Fallback shown while no image exists */}
                      {!a.image && (
                        <div
                          className="flex h-full w-full items-center justify-center text-3xl"
                          style={{ background: "rgba(217,119,6,0.06)" }}
                          aria-hidden="true"
                        >
                          {a.icon}
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold" style={{ color: "#d97706" }}>{a.award}</p>
                      <p className="mt-0.5 text-xs leading-snug" style={{ color: "var(--text-muted)" }}>{a.event}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Tabla + waveform */}
          <Reveal delay={0.12}>
            <div className="flex flex-col items-center gap-8">
              <TablaCanvas />

              {/* Taal waveform card */}
              <div
                className="w-full rounded-3xl p-6"
                style={{
                  background: "var(--bg-card)",
                  border:     "1px solid var(--border)",
                  boxShadow:  "0 4px 24px var(--shadow)",
                }}
              >
                <p className="mb-4 text-center text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--text-muted)" }}>
                  Tabla Taal — Teentaal (16 beats)
                </p>
                <div className="flex items-end justify-center gap-1" aria-hidden="true">
                  {waveBars.map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-2 rounded-full"
                      style={{ background: WAVEFORM_COLORS[i % WAVEFORM_COLORS.length] }}
                      animate={inView ? { height: [4, h * 2.8, 4] } : { height: 4 }}
                      transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.1, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
