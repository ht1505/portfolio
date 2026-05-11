"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects, otherProjects, GITHUB_PROFILE_URL } from "@/lib/data/projects";
import type { Project, MiniProject } from "@/lib/types";

// ─── Featured project card ────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-80, 80], [6, -6]),  { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-80, 80], [-6, 6]),  { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = cardRef.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width  / 2);
    my.set(e.clientY - r.top  - r.height / 2);
  }
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      className="group h-full"
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-shadow"
        style={{
          background: "var(--bg-card)",
          border:     `1px solid ${project.color}25`,
          boxShadow:  "0 2px 16px var(--shadow)",
        }}
      >
        {/* Colour accent stripe along the top */}
        <div
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: project.color }}
          aria-hidden="true"
        />

        {/* Title row with emoji icon */}
        <div className="mb-4 flex items-start gap-4 pt-2">
          <span
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl"
            style={{ background: `${project.color}15` }}
            aria-hidden="true"
          >
            {project.emoji}
          </span>
          <h3 className="text-base font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
            {project.title}
          </h3>
        </div>

        {/* Description — takes available space so footers align */}
        <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        {/* Tech pills */}
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}22` }}
            >
              {t}
            </li>
          ))}
        </ul>

        {/* CTA — always at bottom */}
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
            style={{ color: project.color }}
          >
            View on GitHub
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Other exploration card ───────────────────────────────────────────────────

function ExplorationCard({ project }: { project: MiniProject }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="flex h-full flex-col rounded-2xl p-5 transition-shadow"
      style={{
        background: "var(--bg-card)",
        border:     "1px solid var(--border)",
        boxShadow:  "0 2px 10px var(--shadow)",
      }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px var(--shadow)" }}
    >
      <h3 className="text-sm font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
        {project.title}
      </h3>
      {/* flex-1 pushes the link to the bottom */}
      <p className="mt-2 flex-1 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {project.desc}
      </p>
      <p className="mt-4 text-xs font-bold" style={{ color: "var(--accent-purple)" }}>
        GitHub →
      </p>
    </motion.a>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

/** Projects — two-column featured grid + uniform two-column explorations grid. */
export function Projects() {
  return (
    <>
      {/* ── Featured projects ── */}
      <section
        id="featured-projects"
        aria-labelledby="projects-heading"
        className="px-6 py-24 sm:px-10 md:py-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            description="AI products, analytics systems, and full-stack applications."
          />

          {/* grid with items-stretch so cards match height in each row */}
          <div className="mt-12 grid gap-5 md:grid-cols-2" style={{ alignItems: "stretch" }}>
            {featuredProjects.map((project, i) => (
              <Reveal key={project.title} delay={0.06 * i}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other explorations ── */}
      <section
        id="other-projects"
        aria-label="Other projects"
        className="px-6 pb-24 sm:px-10"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px flex-1" style={{ background: "var(--border)" }} aria-hidden="true" />
              <p className="section-eyebrow">Other Explorations</p>
              <span className="h-px flex-1" style={{ background: "var(--border)" }} aria-hidden="true" />
            </div>
          </Reveal>

          {/* Same 2-col grid, height-matched */}
          <div className="grid gap-4 md:grid-cols-2" style={{ alignItems: "stretch" }}>
            {otherProjects.map((project, i) => (
              <Reveal key={project.title} delay={0.07 * i}>
                <ExplorationCard project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-8 text-center">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                style={{
                  background: "var(--bg-card)",
                  border:     "1.5px solid var(--border)",
                  color:      "var(--text-secondary)",
                  boxShadow:  "0 2px 10px var(--shadow)",
                }}
              >
                View all repositories on GitHub →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
