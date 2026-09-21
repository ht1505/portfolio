import React from 'react';
import Link from 'next/link';
import { GraduationCap, Award, Code2, Server, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const metadata = {
  title: 'About | Hitesh Thacker',
  description: 'Learn more about Hitesh Thacker, background, education in Computer Science, and technical philosophy.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
          Biography & Background
        </span>
        <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
          About Me
        </h1>
        <p className="mt-3 text-lg text-slate-300 leading-relaxed">
          Full-Stack Developer, CSE undergraduate student, and curious builder passionate about architecting scalable systems.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="space-y-8 text-slate-300 leading-relaxed">
        <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Code2 className="text-blue-400" size={20} />
            Engineering Approach
          </h2>
          <p>
            I am a Computer Science & Engineering student with a deep interest in distributed architectures, modern full-stack web platforms, and data-driven systems. My journey in technology started with understanding foundational computational logic and algorithms, which evolved into constructing end-to-end applications designed for stability, high concurrency, and clean developer workflows.
          </p>
          <p>
            Whether designing RESTful API endpoints in Express, structuring normalized and query-efficient MongoDB schemas, or engineering responsive, accessible interfaces in Next.js and React, I focus on building software that is maintainable, well-documented, and performant.
          </p>
        </section>

        {/* Education & Core Focus */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <GraduationCap size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-100">B.Tech in Computer Science & Engineering</h3>
            <p className="text-xs text-blue-400 font-mono mt-0.5">2021 — 2025</p>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              In-depth coursework in Data Structures, Object-Oriented Analysis, Algorithms & Complexity, Database Management Systems, Computer Networks, Operating Systems, and Distributed Systems.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Server size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Technical Specialties</h3>
            <p className="text-xs text-emerald-400 font-mono mt-0.5">Core Strengths</p>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              Full-stack TypeScript (React, Next.js, Node.js), relational & non-relational database design (MongoDB, PostgreSQL), machine learning classification pipelines (Python, Scikit-Learn), and containerized deployments.
            </p>
          </div>
        </section>

        {/* What I Value */}
        <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Award className="text-purple-400" size={20} />
            What I Value as an Engineer
          </h2>
          <ul className="space-y-3">
            {[
              'Correctness and Type Safety: Leveraging TypeScript, schema validators (Zod), and robust error boundaries.',
              'Clean Architecture: Separating business logic, data persistence, and HTTP transport layers.',
              'User Experience & Accessibility: Crafting fluid, responsive interfaces that perform without clutter or bloat.',
              'Continuous Growth: Proactively picking up emerging distributed system paradigms and cloud-native practices.',
            ].map((val, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <CheckCircle2 size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <span>{val}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Call to action */}
        <div className="pt-6 flex flex-wrap gap-4 items-center justify-between border-t border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-200">Interested in working together?</h3>
            <p className="text-xs text-slate-400">Check out my projects or send an inquiry directly.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/projects">
              <Button variant="secondary" size="sm">
                View Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm" className="gap-1.5">
                <span>Get in Touch</span>
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
