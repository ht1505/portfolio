import React from 'react';
import { Skill } from '../../types';
import { Badge } from '../ui/Badge';
import { Code, Database, Server, Wrench } from 'lucide-react';

interface SkillsOverviewProps {
  skills: Skill[];
}

export const SkillsOverview: React.FC<SkillsOverviewProps> = ({ skills }) => {
  // Group skills by category
  const categories = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Code size={18} className="text-blue-400" />;
      case 'backend':
        return <Server size={18} className="text-emerald-400" />;
      case 'database':
        return <Database size={18} className="text-amber-400" />;
      default:
        return <Wrench size={18} className="text-purple-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(categories).map(([category, items]) => (
        <div
          key={category}
          className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5 mb-4">
            {getCategoryIcon(category)}
            <h3 className="font-semibold text-slate-200 capitalize">{category}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <Badge key={skill._id || skill.name} variant="slate" className="py-1 px-2.5">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
