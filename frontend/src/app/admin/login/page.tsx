'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { authService } from '../../../services/auth.service';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@localhost.dev');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login(email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 'Invalid email or password. Use dev credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-md w-full relative">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Admin Authentication</h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to manage portfolio projects, skills, and contact messages
            </p>
          </div>

          <div className="mb-6 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
            <span className="font-semibold block mb-1">Development Credentials Pre-filled:</span>
            <span>Email: admin@localhost.dev | Password: admin123</span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full mt-2"
              isLoading={loading}
            >
              Sign In to Console
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
