'use client';

import React, { useState, useEffect } from 'react';
import { ProjectCard } from '../../components/sections/ProjectCard';
import { Project } from '../../types';
import { fallbackProjects } from '../../lib/fallbackData';
import { projectService } from '../../services/project.service';
import { Search, FolderGit2 } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    projectService
      .getAll()
      .then((data) => {
        if (data && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        // Fallback already set
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))) as string[]];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
          Engineering Portfolio
        </span>
        <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
          Projects & Case Studies
        </h1>
        <p className="mt-3 text-base text-slate-300">
          A showcase of full-stack web applications, machine learning architectures, and system designs.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by tech or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 p-8 rounded-xl bg-slate-900/40 border border-slate-800">
          <FolderGit2 className="mx-auto text-slate-600 mb-3" size={40} />
          <h3 className="text-lg font-semibold text-slate-300">No projects found</h3>
          <p className="text-sm text-slate-500 mt-1">
            Try adjusting your search criteria or category filter.
          </p>
        </div>
      )}
    </div>
  );
}
