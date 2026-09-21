import Link from 'next/link';
import { ArrowRight, Code, Terminal, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Hero } from '../components/sections/Hero';
import { ProjectCard } from '../components/sections/ProjectCard';
import { SkillsOverview } from '../components/sections/SkillsOverview';
import { Button } from '../components/ui/Button';
import { fallbackProjects, fallbackSkills, fallbackExperience } from '../lib/fallbackData';
import { projectService } from '../services/project.service';
import { skillService } from '../services/skill.service';
import { experienceService } from '../services/experience.service';
import { EMAIL, MAILTO_URL } from '@/config/site';

async function getData() {
  try {
    const [projects, skills, experience] = await Promise.all([
      projectService.getAll().catch(() => fallbackProjects),
      skillService.getAll().catch(() => fallbackSkills),
      experienceService.getAll().catch(() => fallbackExperience),
    ]);

    return {
      projects: projects.length > 0 ? projects : fallbackProjects,
      skills: skills.length > 0 ? skills : fallbackSkills,
      experience: experience.length > 0 ? experience : fallbackExperience,
    };
  } catch {
    return {
      projects: fallbackProjects,
      skills: fallbackSkills,
      experience: fallbackExperience,
    };
  }
}

export default async function HomePage() {
  const { projects, skills, experience } = await getData();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <Sparkles size={14} />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-100">Featured Projects</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Engineered platforms and models demonstrating full-stack architecture, machine learning inference, and database design.
            </p>
          </div>
          <Link href="/projects">
            <Button variant="outline" size="sm" className="gap-1.5 self-start md:self-auto">
              <span>All Projects</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      {/* 3. Skills & Technologies */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Layers size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-100">Skills & Tech Stack</h2>
          <p className="text-slate-400 text-sm mt-2">
            A comprehensive overview of programming languages, frameworks, databases, and developer tooling I use.
          </p>
        </div>

        <SkillsOverview skills={skills} />
      </section>

      {/* 4. Experience & Education Timeline Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <BookOpen size={14} />
              <span>Background & Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Experience & Education</h2>
          </div>
          <Link href="/about">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              <span>Read Full Bio</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
          {experience.map((exp) => (
            <div key={exp._id} className="relative pl-10">
              <div className="absolute left-2 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-slate-950" />
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="font-bold text-base text-slate-100">{exp.role}</h3>
                  <span className="text-xs font-mono text-slate-400">
                    {exp.startDate.substring(0, 7)} — {exp.current ? 'Present' : exp.endDate?.substring(0, 7)}
                  </span>
                </div>
                <div className="text-sm font-medium text-blue-400 mb-3">{exp.company} • {exp.type}</div>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] pointer-events-none rounded-full" />
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-100">Let&apos;s Build Something Together</h2>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
            Open to software engineering roles, internships, and collaborative software projects. Feel free to reach out directly!
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                <span>Send a Message</span>
                <ArrowRight size={18} />
              </Button>
            </Link>
            <a href={MAILTO_URL}>
              <Button variant="outline" size="lg">
                {EMAIL}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
