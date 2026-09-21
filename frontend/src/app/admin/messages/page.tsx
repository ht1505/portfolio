'use client';

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Trash2, MailOpen, Calendar, User } from 'lucide-react';
import { ContactMessage } from '../../../types';
import { contactService } from '../../../services/contact.service';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      _id: 'msg-sample-1',
      name: 'Alex Mercer',
      email: 'alex.mercer@recruiting-tech.com',
      subject: 'Senior Full-Stack Engineer Opportunity',
      message:
        'Hi Hitesh, I was thoroughly impressed by your TrustWork project architecture and clean separation of concerns. We have an active opening for a full-stack engineer on our platform engineering team and would love to arrange a preliminary technical call with you.',
      read: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    contactService
      .getAllMessages()
      .then((data) => {
        if (data && data.length > 0) setMessages(data);
      })
      .catch(() => {});
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await contactService.markAsRead(id);
      setMessages(
        messages.map((m) => (m._id === id ? { ...m, read: true } : m))
      );
    } catch {
      setMessages(
        messages.map((m) => (m._id === id ? { ...m, read: true } : m))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await contactService.deleteMessage(id);
      setMessages(messages.filter((m) => m._id !== id));
    } catch {
      setMessages(messages.filter((m) => m._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Contact Inquiries</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review incoming opportunities and communications submitted via portfolio
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-6 rounded-xl border transition-all ${
                msg.read
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-slate-900 border-blue-500/30 ring-1 ring-blue-500/20 shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-100">{msg.subject}</h3>
                    {!msg.read && <Badge variant="blue">New</Badge>}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      <span className="text-slate-200 font-medium">{msg.name}</span>
                    </span>
                    <span>•</span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-blue-400 hover:underline"
                    >
                      {msg.email}
                    </a>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar size={12} />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}>
                    <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
                      <Mail size={14} />
                      <span>Reply</span>
                    </Button>
                  </a>
                  {!msg.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsRead(msg._id)}
                      className="gap-1.5 text-xs"
                      title="Mark as read"
                    >
                      <MailOpen size={14} />
                      <span>Mark Read</span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(msg._id)}
                    className="text-slate-400 hover:text-red-400"
                    title="Delete message"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 p-6 rounded-xl bg-slate-900 border border-slate-800">
            <Mail className="mx-auto text-slate-600 mb-2" size={32} />
            <h3 className="font-semibold text-slate-300">Inbox is empty</h3>
            <p className="text-xs text-slate-500 mt-1">No contact messages received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
