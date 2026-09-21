'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Terminal, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { GITHUB_URL, LINKEDIN_URL } from '@/config/site';

export const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto text-center px-4">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Available for Full-Time SWE & Intern Opportunities</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
          Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">Hitesh Thacker</span>
        </h1>

        <p className="mt-4 text-xl sm:text-2xl font-medium text-slate-300">
          Computer Science & Engineering Student & Full-Stack Engineer
        </p>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          I build scalable web applications, robust RESTful architectures, and data-driven systems. Focused on clean code, modern web technologies, and solving practical engineering problems.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/projects">
            <Button size="lg" className="gap-2">
              <span>View Projects</span>
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </Link>
          <a
            href="/resume/Hitesh_Thacker_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg" className="gap-2">
              <Download size={16} />
              <span>Resume</span>
            </Button>
          </a>
        </div>

        {/* Quick Social links */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex items-center justify-center gap-6 text-slate-400">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-slate-200 transition-colors"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-slate-200 transition-colors"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Terminal size={14} className="text-blue-400" />
            <span>Node.js / React / Express / MongoDB</span>
          </span>
        </div>
      </div>
    </section>
  );
};

