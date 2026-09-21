'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { contactService } from '../../services/contact.service';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, MAILTO_URL } from '@/config/site';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      errs.message = 'Message cannot be empty';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await contactService.sendMessage(formData);
      setSuccessMessage('Thank you for reaching out! Your message has been received.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      // In case backend is not running or error, inform cleanly
      setErrorMessage(
        `Unable to send message directly right now. Feel free to email me directly at ${EMAIL}!`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
          Get in Touch
        </span>
        <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
          Let&apos;s Connect
        </h1>
        <p className="mt-3 text-base text-slate-300">
          Have an open software engineering opportunity, freelance inquiry, or just want to chat about tech? Drop me a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-slate-100">Contact Information</h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Direct Email</span>
                  <a href={MAILTO_URL} className="font-medium hover:text-blue-400 transition-colors">
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Location</span>
                  <span className="font-medium text-slate-200">
                    Gujarat / India (Open to Remote & Relocation)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <span className="text-xs text-slate-400 block mb-3">Connect on Social Platforms</span>
              <div className="flex items-center gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-xl bg-slate-900/80 border border-slate-800 space-y-5"
          >
            {successMessage && (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Name"
                placeholder="Jane Doe"
                value={formData.name}
                error={errors.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="jane@example.com"
                value={formData.email}
                error={errors.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <Input
              label="Subject"
              placeholder="Project inquiry / Full-time role opportunity"
              value={formData.subject}
              error={errors.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />

            <Textarea
              label="Message"
              placeholder="Hi Hitesh, I came across your portfolio and would love to discuss..."
              rows={5}
              value={formData.message}
              error={errors.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto gap-2"
              isLoading={isSubmitting}
            >
              <Send size={16} />
              <span>Send Message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
