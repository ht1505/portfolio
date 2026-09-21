import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="flex flex-col h-full hover:border-slate-700 transition-all group overflow-hidden">
      <CardContent className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {project.category && (
                <Badge variant="purple">{project.category}</Badge>
              )}
              {project.featured && (
                <Badge variant="blue">Featured</Badge>
              )}
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <Github size={18} />
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-100 mt-4 group-hover:text-blue-400 transition-colors">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="mt-2 text-sm text-slate-300 leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="slate" className="text-[11px] font-mono">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge variant="slate" className="text-[11px]">
                +{project.technologies.length - 5}
              </Badge>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
          >
            <span>Learn More & Architecture</span>
            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
