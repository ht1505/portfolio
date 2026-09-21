'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL } from '@/config/site';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Don't show public footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-slate-200">Hitesh Thacker</p>
            <p className="text-xs text-slate-400 mt-1">
              Computer Science & Engineering Student | Full-Stack Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            >
              <Github size={18} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            >
              <Linkedin size={18} />
            </a>
            <Link
              href="/contact"
              aria-label="Contact via Email"
              className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            >
              <Mail size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Hitesh Thacker. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js & Express
          </p>
        </div>
      </div>
    </footer>
  );
};
