'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  Layers,
  Mail,
  FileText,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import { authService } from '../../services/auth.service';

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
  { name: 'Skills', href: '/admin/skills', icon: Layers },
  { name: 'Messages', href: '/admin/messages', icon: Mail },
  { name: 'Resume', href: '/admin/resume', icon: FileText },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-100 block">Admin Console</span>
            <span className="text-xs text-slate-400">Portfolio CMS</span>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
            DEV
          </span>
        </div>

        {/* Nav list */}
        <nav className="p-4 space-y-1.5">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Live Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
