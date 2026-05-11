"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  /** RGB triplet string, e.g. "139,92,246" */
  color: string;
  alpha: number;
}

const PARTICLE_COLORS = [
  "139,92,246", // violet
  "6,182,212",  // cyan
  "245,158,11", // amber
  "167,139,250", // violet-light
] as const;

const CONNECTION_THRESHOLD = 100; // px — max distance to draw a line
const REPULSION_RADIUS     = 120; // px — mouse repulsion field
const REPULSION_FORCE      = 0.5;
const VELOCITY_DAMPING     = 0.97;

/**
 * ParticleField — full-viewport canvas with:
 *  - ~60 drifting coloured particles
 *  - Connection lines drawn between nearby particles
 *  - Mouse repulsion so particles flee the cursor
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -1000, y: -1000 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const COUNT = Math.min(60, Math.floor((W * H) / 20_000));

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:      Math.random() * W,
      y:      Math.random() * H,
      vx:     (Math.random() - 0.5) * 0.35,
      vy:     (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.6,
      color:  PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      alpha:  Math.random() * 0.5 + 0.15,
    }));

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize",     onResize);
    window.addEventListener("mousemove",  onMouse);

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;

      // Update + draw particles
      for (const p of particles) {
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.hypot(dx, dy);

        if (dist < REPULSION_RADIUS) {
          const f = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
          p.vx += (dx / dist) * f * REPULSION_FORCE;
          p.vy += (dy / dist) * f * REPULSION_FORCE;
        }

        p.vx *= VELOCITY_DAMPING;
        p.vy *= VELOCITY_DAMPING;
        p.x  += p.vx;
        p.y  += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y,
          );
          if (d < CONNECTION_THRESHOLD) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - d / CONNECTION_THRESHOLD)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
