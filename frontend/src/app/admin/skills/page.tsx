'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Layers } from 'lucide-react';
import { Skill } from '../../../types';
import { fallbackSkills } from '../../../lib/fallbackData';
import { skillService } from '../../../services/skill.service';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend');

  useEffect(() => {
    skillService
      .getAll()
      .then((data) => {
        if (data && data.length > 0) setSkills(data);
      })
      .catch(() => {});
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await skillService.delete(id);
      setSkills(skills.filter((s) => s._id !== id));
    } catch {
      setSkills(skills.filter((s) => s._id !== id));
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSkillData = {
      name: name.trim(),
      category,
      order: skills.length + 1,
    };

    try {
      const created = await skillService.create(newSkillData);
      setSkills([...skills, created]);
    } catch {
      const simulated: Skill = {
        ...newSkillData,
        _id: 'skill-' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setSkills([...skills, simulated]);
    }

    setName('');
    setIsModalOpen(false);
  };

  // Group by category
  const categories = ['Frontend', 'Backend', 'Database', 'Tools'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Manage Skills</h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize tech stack categories displayed across the portfolio
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus size={16} />
          <span>Add Skill</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const items = skills.filter(
            (s) => s.category?.toLowerCase() === cat.toLowerCase()
          );
          return (
            <div
              key={cat}
              className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-200">{cat}</h3>
                <span className="text-xs text-slate-400 font-mono">
                  {items.length} skills
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <div
                    key={skill._id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/60 text-xs text-slate-200 group"
                  >
                    <span>{skill.name}</span>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="text-slate-500 hover:text-red-400 transition-colors ml-1"
                      title="Remove skill"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Technical Skill"
      >
        <form onSubmit={handleAddSkill} className="space-y-4">
          <Input
            label="Skill Name"
            placeholder="e.g. Docker, GraphQL, Redis"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Skill</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
