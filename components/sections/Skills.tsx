"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { allTags } from "@/lib/data/skills";

const SKILL_GROUPS = [
  { label: "Languages",      color: "#7c3aed", skills: ["C", "C++", "Java", "Python", "TypeScript", "JavaScript"] },
  { label: "Frontend",       color: "#0891b2", skills: ["React", "Next.js", "HTML/CSS", "Framer Motion"] },
  { label: "Backend",        color: "#059669", skills: ["Node.js", "Express", "FastAPI", "REST APIs"] },
  { label: "Data & AI",      color: "#d97706", skills: ["Machine Learning", "RAG Systems", "KNIME", "Power BI", "Tableau"] },
  { label: "Databases",      color: "#db2777", skills: ["PostgreSQL", "MySQL", "MongoDB", "SQL"] },
  { label: "Tools & DevOps", color: "#7c3aed", skills: ["Git", "GitHub", "Docker", "Vercel"] },
];

/** Skills — uniform-height grouped category cards + interactive tag cloud. */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden px-6 py-24 sm:px-10 md:py-32"
    >
      {/* Blob accent */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "var(--blob-1)", filter: "blur(120px)", opacity: 0.5 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="A polyglot toolkit spanning AI, full-stack development, and data analytics."
          center
        />

        {/* ── Skill category grid — equal heights via CSS grid row stretch ── */}
        <div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          /* Every cell stretches to fill its grid row automatically */
          style={{ alignItems: "stretch" }}
        >
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={0.06 * gi}>
              <motion.div
                className="flex h-full flex-col rounded-2xl p-6"
                style={{
                  background: `${group.color}08`,
                  border:     `1.5px solid ${group.color}20`,
                  minHeight:  "10rem",   /* visual floor so tiny groups aren't too short */
                }}
                whileHover={{ y: -4, boxShadow: `0 12px 36px ${group.color}18` }}
              >
                {/* Header row */}
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                    style={{ background: group.color }}
                    aria-hidden="true"
                  >
                    {gi + 1}
                  </span>
                  <h3 className="text-sm font-bold tracking-wide" style={{ color: group.color }}>
                    {group.label}
                  </h3>
                </div>

                {/* Tags — flex-wrap so they flow naturally */}
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        background: `${group.color}12`,
                        color:      "var(--text-secondary)",
                        border:     `1px solid ${group.color}25`,
                      }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* ── All-skills cloud ── */}
        <Reveal delay={0.1}>
          <div className="mt-14 text-center">
            <p className="section-eyebrow mb-6">Full Technology Stack</p>
            <ul className="flex flex-wrap justify-center gap-2.5">
              {allTags.map((tag, i) => (
                <motion.li
                  key={tag}
                  className="rounded-full px-3.5 py-1.5 text-xs font-medium"
                  style={{
                    background: "var(--bg-card)",
                    border:     "1px solid var(--border)",
                    color:      "var(--text-secondary)",
                    boxShadow:  "0 1px 4px var(--shadow)",
                  }}
                  whileHover={{ scale: 1.08, y: -2, background: "#7c3aed", color: "#fff", border: "1px solid #7c3aed" }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.018, duration: 0.3 }}
                >
                  {tag}
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
