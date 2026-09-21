'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Github } from 'lucide-react';
import { Project } from '../../../types';
import { fallbackProjects } from '../../../lib/fallbackData';
import { projectService } from '../../../services/project.service';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { Input, Textarea } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    shortDescription: '',
    detailedDescription: '',
    technologies: [],
    githubLink: '',
    liveDemoLink: '',
    category: '',
    featured: false,
    keyFeatures: [],
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    projectService
      .getAll()
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch(() => {});
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      detailedDescription: '',
      technologies: [],
      githubLink: '',
      liveDemoLink: '',
      category: 'Full-Stack Web App',
      featured: false,
      keyFeatures: [],
    });
    setTechInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({ ...project });
    setTechInput(project.technologies.join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.delete(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch {
      // Local optimistic delete
      setProjects(projects.filter((p) => p._id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTechs = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectData = {
      ...formData,
      slug: formData.slug || formData.title?.toLowerCase().replace(/\s+/g, '-'),
      technologies: parsedTechs,
    };

    try {
      if (editingProject) {
        const updated = await projectService.update(editingProject._id, projectData);
        setProjects(
          projects.map((p) => (p._id === editingProject._id ? { ...p, ...updated } : p))
        );
      } else {
        const created = await projectService.create(projectData);
        setProjects([...projects, created]);
      }
    } catch {
      // Fallback local update
      if (editingProject) {
        setProjects(
          projects.map((p) =>
            p._id === editingProject._id ? ({ ...p, ...projectData } as Project) : p
          )
        );
      } else {
        const newProj = {
          ...projectData,
          _id: 'local-' + Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Project;
        setProjects([...projects, newProj]);
      }
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Manage Projects</h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, or remove portfolio case studies
          </p>
        </div>
        <Button onClick={openAddModal} className="gap-2">
          <Plus size={16} />
          <span>New Project</span>
        </Button>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Title & Details</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Technologies</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-100 flex items-center gap-2">
                    <span>{project.title}</span>
                    {project.featured && <Badge variant="blue">Featured</Badge>}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {project.shortDescription}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="purple">{project.category || 'General'}</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] text-slate-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(project)}
                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded transition-colors"
                      title="Edit project"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add / Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Title"
            required
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Input
            label="URL Slug (e.g. trustwork)"
            value={formData.slug || ''}
            placeholder="auto-generated-if-empty"
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <Input
            label="Category"
            placeholder="Full-Stack Web App / Machine Learning / Systems"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <Input
            label="Technologies (comma separated)"
            placeholder="React, Node.js, Express, MongoDB"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="GitHub Link"
              placeholder="https://github.com/..."
              value={formData.githubLink || ''}
              onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
            />
            <Input
              label="Live Demo Link"
              placeholder="https://..."
              value={formData.liveDemoLink || ''}
              onChange={(e) => setFormData({ ...formData, liveDemoLink: e.target.value })}
            />
          </div>
          <Textarea
            label="Short Description"
            rows={2}
            required
            value={formData.shortDescription || ''}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          />
          <Textarea
            label="Detailed Description & Architecture"
            rows={4}
            required
            value={formData.detailedDescription || ''}
            onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
          />
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured || false}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="featured" className="text-sm text-slate-300">
              Highlight as Featured Project on Home Page
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingProject ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
