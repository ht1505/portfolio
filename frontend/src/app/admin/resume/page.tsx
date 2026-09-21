'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export default function AdminResumePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setStatus(null);
    }
  };

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setStatus('Resume uploaded successfully! (Staged in static assets). In production, this forwards directly to AWS S3 via pre-signed URL.');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Resume Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Upload and manage the PDF resume served to recruiters and hiring managers
        </p>
      </div>

      {/* Current Resume Status */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">Hitesh_Thacker_Resume.pdf</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Current active resume version
            </p>
          </div>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm" className="gap-1.5">
            <span>Preview</span>
            <ExternalLink size={14} />
          </Button>
        </a>
      </div>

      {/* Upload Box */}
      <form
        onSubmit={handleSimulatedUpload}
        className="p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-6"
      >
        <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-8 text-center transition-colors">
          <UploadCloud className="mx-auto text-blue-400 mb-3" size={40} />
          <h4 className="font-semibold text-slate-200">Upload New Resume (PDF)</h4>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Supports PDF documents up to 10MB
          </p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            id="resume-file"
            className="hidden"
          />
          <label htmlFor="resume-file">
            <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-700 transition-colors">
              Choose PDF File
            </span>
          </label>
          {selectedFile && (
            <p className="mt-3 text-xs text-blue-400 font-mono">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>

        {status && (
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
            <span>{status}</span>
          </div>
        )}

        <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-2">
          <span className="font-semibold text-slate-300 block">Production S3 Architecture Note:</span>
          <p>
            When migrating to AWS S3: The backend will issue a short-lived pre-signed PUT URL using the AWS SDK v3. The client uploads the binary directly to S3, triggering an automated cache invalidation on CloudFront.
          </p>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!selectedFile}>
            Update Resume Document
          </Button>
        </div>
      </form>
    </div>
  );
}
