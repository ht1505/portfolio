'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Briefcase } from 'lucide-react';
import { Experience } from '../../../types';
import { fallbackExperience } from '../../../lib/fallbackData';
import { experienceService } from '../../../services/experience.service';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { Input, Textarea } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>(fallbackExperience);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    role: '',
    company: '',
    type: 'Full-Time',
    description: '',
    technologies: [],
    responsibilities: [],
    startDate: '',
    endDate: '',
    current: false,
    order: 0,
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    experienceService
      .getAll()
      .then((data) => {
        if (data && data.length > 0) setExperiences(data);
      })
      .catch(() => {});
  }, []);

  const openAddModal = () => {
    setEditingExp(null);
    setFormData({
      role: '',
      company: '',
      type: 'Software Engineering',
      description: '',
      technologies: [],
      responsibilities: [],
      startDate: '2024-01-01',
      current: true,
      order: 0,
    });
    setTechInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({ ...exp });
    setTechInput(exp.technologies.join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await experienceService.delete(id);
      setExperiences(experiences.filter((e) => e._id !== id));
    } catch {
      setExperiences(experiences.filter((e) => e._id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTechs = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const expData = {
      ...formData,
      technologies: parsedTechs,
    };

    try {
      if (editingExp) {
        const updated = await experienceService.update(editingExp._id, expData);
        setExperiences(
          experiences.map((e) => (e._id === editingExp._id ? { ...e, ...updated } : e))
        );
      } else {
        const created = await experienceService.create(expData);
        setExperiences([...experiences, created]);
      }
    } catch {
      if (editingExp) {
        setExperiences(
          experiences.map((e) =>
            e._id === editingExp._id ? ({ ...e, ...expData } as Experience) : e
          )
        );
      } else {
        const newExp = {
          ...expData,
          _id: 'local-' + Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Experience;
        setExperiences([...experiences, newExp]);
      }
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Manage Experience & Education</h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain timeline of professional roles and academic accomplishments
          </p>
        </div>
        <Button onClick={openAddModal} className="gap-2">
          <Plus size={16} />
          <span>Add Entry</span>
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                <Badge variant="blue">{exp.company}</Badge>
                <Badge variant="slate">{exp.type}</Badge>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Calendar size={13} />
                <span>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate || 'N/A'}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed pt-1">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.technologies.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditModal(exp)}
                className="gap-1.5"
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(exp._id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExp ? 'Edit Experience' : 'Add Experience Entry'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Role / Title"
            required
            placeholder="e.g. Software Engineer Intern"
            value={formData.role || ''}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <Input
            label="Company / Institution"
            required
            placeholder="e.g. Google / Tech Startup"
            value={formData.company || ''}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <Input
            label="Type"
            placeholder="Internship / Full-Time / Academic / Project"
            value={formData.type || ''}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start Date"
              type="date"
              required
              value={formData.startDate?.substring(0, 10) || ''}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Input
              label="End Date"
              type="date"
              disabled={formData.current}
              value={formData.endDate?.substring(0, 10) || ''}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="current"
              checked={formData.current || false}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600"
            />
            <label htmlFor="current" className="text-sm text-slate-300">
              I am currently working/studying here
            </label>
          </div>
          <Input
            label="Technologies (comma separated)"
            placeholder="React, TypeScript, Node.js"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
          />
          <Textarea
            label="Description & Key Outcomes"
            rows={3}
            required
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
