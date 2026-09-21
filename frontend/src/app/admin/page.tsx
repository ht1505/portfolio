'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  Briefcase,
  Layers,
  Mail,
  ArrowRight,
  Server,
  Activity,
  Plus,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { authService } from '../../services/auth.service';
import { DashboardStats } from '../../types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 3,
    experiences: 2,
    skills: 15,
    messages: 1,
    unreadMessages: 1,
  });
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);

  useEffect(() => {
    authService
      .getDashboardStats()
      .then((data) => {
        setStats(data);
        setServerOnline(true);
      })
      .catch(() => {
        setServerOnline(false);
      });
  }, []);

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      href: '/admin/projects',
      icon: FolderGit2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Experiences',
      value: stats.experiences,
      href: '/admin/experience',
      icon: Briefcase,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Skills Registered',
      value: stats.skills,
      href: '/admin/skills',
      icon: Layers,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Inquiries Received',
      value: stats.messages,
      href: '/admin/messages',
      icon: Mail,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} New` : undefined,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            System overview and portfolio management controls
          </p>
        </div>

        {/* Server status badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span
            className={`w-2 h-2 rounded-full ${
              serverOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span>API: {serverOnline ? 'Online (localhost:5000)' : 'Standalone / Mock'}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="group">
              <Card className="hover:border-slate-700 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
                      <Icon size={20} />
                    </div>
                    {card.badge && (
                      <span className="px-2 py-0.5 text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                    {card.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & System Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-100">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/admin/projects">
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <Plus size={16} />
                  <span>New Project</span>
                </Button>
              </Link>
              <Link href="/admin/experience">
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <Plus size={16} />
                  <span>Add Experience</span>
                </Button>
              </Link>
              <Link href="/admin/skills">
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <Plus size={16} />
                  <span>Register Skill</span>
                </Button>
              </Link>
              <Link href="/admin/messages">
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <Mail size={16} />
                  <span>Check Inbox</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Activity size={18} className="text-blue-400" />
              <span>Development Notice</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              This admin panel operates locally. In a full production setup, authenticate with encrypted password hashing (bcrypt), store documents in a cloud MongoDB instance (Atlas), and configure AWS S3 bucket uploads for resume assets.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-500">
              Stack: Next.js 15 • Express.js • MongoDB • Zod
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
