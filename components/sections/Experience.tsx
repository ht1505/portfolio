"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/lib/data/experience";

/** Experience — clean timeline, uniform card styling, consistent spacing. */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative px-6 py-24 sm:px-10 md:py-32"
    >
      {/* Blob accent */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full"
        style={{ background: "var(--blob-2)", filter: "blur(100px)", opacity: 0.5 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <SectionHeading
          eyebrow="Leadership & Experience"
          title="Making an impact"
          description="Roles where I combined technical depth with people, coordination, and vision."
        />

        <ol className="relative mt-14 space-y-6 pl-12">
          {/* Vertical timeline rail */}
          <div
            className="absolute left-4 top-0 h-full w-0.5 rounded-full"
            style={{ background: "linear-gradient(to bottom, #7c3aed, #0891b2 60%, transparent)" }}
            aria-hidden="true"
          />

          {experiences.map((item, i) => (
            <li key={item.role}>
              <Reveal delay={0.08 * i} direction="left">
                <motion.article
                  className="relative rounded-xl p-5"
                  style={{
                    background: "var(--bg-card)",
                    border:     "1px solid var(--border)",
                    boxShadow:  "0 2px 12px var(--shadow)",
                  }}
                  whileHover={{ x: 4, boxShadow: `0 6px 28px ${item.color}15` }}
                >
                  {/* Left colour accent — 3 px vertical bar */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />

                  {/* Timeline dot */}
                  <span
                    className="absolute -left-[2.35rem] top-5 flex h-7 w-7 items-center justify-center rounded-full text-sm"
                    style={{
                      background: `${item.color}18`,
                      border:     `2px solid ${item.color}50`,
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>

                  <header className="flex flex-wrap items-center justify-between gap-2 pl-3">
                    <h3
                      className="text-sm font-bold sm:text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.role}
                    </h3>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ background: `${item.color}12`, color: item.color }}
                    >
                      <time>{item.period}</time>
                    </span>
                  </header>

                  <p
                    className="mt-2 pl-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.details}
                  </p>
                </motion.article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
