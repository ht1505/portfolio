import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
} from 'lucide-react';
import { fallbackProjects } from '../../../lib/fallbackData';
import { projectService } from '../../../services/project.service';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  let project = fallbackProjects.find((p) => p.slug === slug);
  try {
    const fetched = await projectService.getBySlug(slug);
    if (fetched) project = fetched;
  } catch {
    // fallback used
  }

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Hitesh Thacker`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  let project = fallbackProjects.find((p) => p.slug === slug);
  try {
    const fetched = await projectService.getBySlug(slug);
    if (fetched) project = fetched;
  } catch {
    // fallback used
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Navigation breadcrumb */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="border-b border-slate-800 pb-8 mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.category && (
            <Badge variant="purple">{project.category}</Badge>
          )}
          {project.featured && (
            <Badge variant="blue">Featured Case Study</Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          {project.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Action Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="gap-2">
                <Github size={16} />
                <span>Source Code</span>
              </Button>
            </a>
          )}
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Technical Overview & Architecture */}
      <div className="space-y-12">
        {/* Technologies Grid */}
        <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-4">
            <Layers size={18} className="text-blue-400" />
            <span>Technologies & Tools Employed</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="slate" className="px-3 py-1 text-xs font-mono">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Detailed Narrative */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">Project Overview & Architecture</h2>
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-300 leading-relaxed text-sm sm:text-base space-y-4">
            <p>{project.detailedDescription}</p>
          </div>
        </section>

        {/* Key Features */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Cpu size={22} className="text-blue-400" />
              <span>Key Features & Implementations</span>
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-lg bg-slate-900/50 border border-slate-800/80 text-sm text-slate-300"
                >
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Challenges & Solutions */}
        {project.challengesAndSolutions && project.challengesAndSolutions.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <AlertCircle size={22} className="text-amber-400" />
              <span>Challenges & Technical Solutions</span>
            </h2>
            <div className="space-y-3">
              {project.challengesAndSolutions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/80 text-sm text-slate-300 leading-relaxed"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
          <Link href="/projects">
            <Button variant="secondary" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              <span>All Projects</span>
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="sm">
              Discuss this project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
