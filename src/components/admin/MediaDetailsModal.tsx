"use client";

import React, { useState, useEffect } from "react";
import { MediaItem, MediaUsageReference } from "@/types";
import { formatDate } from "@/utils/formatters";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  Image as ImageIcon,
  X,
  Copy,
  Check,
  Save,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Info,
  Link as LinkIcon
} from "lucide-react";

export interface MediaDetailsModalProps {
  item: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateMetadata: (id: string, metadata: { altText?: string; title?: string; caption?: string }) => Promise<void>;
  onDeleteAsset: (id: string, force?: boolean) => Promise<{ success: boolean; error?: string; inUseWarning?: MediaUsageReference[] }>;
}

export function MediaDetailsModal({
  item,
  isOpen,
  onClose,
  onUpdateMetadata,
  onDeleteAsset,
}: MediaDetailsModalProps) {
  const [altText, setAltText] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Usage scan
  const [isCheckingUsage, setIsCheckingUsage] = useState(false);
  const [usageReferences, setUsageReferences] = useState<MediaUsageReference[]>([]);

  // Deletion confirm dialog
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (item) {
      setAltText(item.altText || "");
      setTitle(item.title || item.name || "");
      setCaption(item.caption || "");
      setFeedback(null);
      checkUsage(item.url);
    }
  }, [item]);

  const checkUsage = async (url: string) => {
    setIsCheckingUsage(true);
    try {
      const res = await fetch(`/api/admin/media/check-usage?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.success && data.references) {
        setUsageReferences(data.references);
      }
    } catch {
      // Ignore background scan failure
    } finally {
      setIsCheckingUsage(false);
    }
  };

  if (!isOpen || !item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);
    try {
      await onUpdateMetadata(item.id, { altText, title, caption });
      setFeedback({ message: "Metadata updated successfully.", type: "success" });
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback({ message: "Failed to update metadata.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (force: boolean = false) => {
    setIsDeleting(true);
    try {
      const result = await onDeleteAsset(item.id, force);
      if (result.success) {
        setIsConfirmDeleteOpen(false);
        onClose();
      } else if (result.inUseWarning && !force) {
        setUsageReferences(result.inUseWarning);
        setFeedback({
          message: "Asset is currently in use on the website. Delete again to force removal.",
          type: "error"
        });
      } else {
        setFeedback({ message: result.error || "Failed to delete asset.", type: "error" });
      }
    } catch {
      setFeedback({ message: "An error occurred while deleting.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 bg-slate-50">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900 m-0 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-rose-600" />
              Clinical Asset Details
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold tracking-wider bg-slate-200 text-slate-700">
              {item.mimeType?.replace("image/", "").toUpperCase() || "IMAGE"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors focus:outline-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Visual Preview & Technical Specs */}
            <div className="w-full lg:w-5/12 flex flex-col gap-6">
              {/* Visual Box */}
              <div className="w-full h-64 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-4 overflow-hidden relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.altText || item.name}
                  className="max-w-full max-h-full object-contain relative z-10 drop-shadow-xs group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Technical Specs List */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm flex flex-col gap-3 text-slate-600">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <strong className="font-semibold text-slate-900">File Name:</strong> 
                  <code className="text-xs bg-slate-200 px-1.5 py-0.5 rounded font-mono truncate max-w-[200px]" title={item.fileName}>{item.fileName}</code>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <strong className="font-semibold text-slate-900">File Size:</strong> 
                  <span>{formatFileSize(item.fileSize)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <strong className="font-semibold text-slate-900">MIME Type:</strong> 
                  <span>{item.mimeType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <strong className="font-semibold text-slate-900">Uploaded:</strong> 
                  <span>{formatDate(item.uploadedAt)}</span>
                </div>
                {item.width && item.height && (
                  <div className="flex justify-between">
                    <strong className="font-semibold text-slate-900">Dimensions:</strong> 
                    <span>{item.width} &times; {item.height} px</span>
                  </div>
                )}
              </div>

              {/* Public URL Box */}
              <div>
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                  <LinkIcon className="w-4 h-4 text-slate-400" />
                  Public Asset URL
                </label>
                <div className="flex gap-2 relative">
                  <input
                    type="text"
                    readOnly
                    value={item.url}
                    className="flex-1 w-full pl-3 pr-2 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-slate-600 focus:outline-none"
                  />
                  <button 
                    onClick={handleCopy}
                    className={`shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                      copied 
                        ? "bg-rose-600 border-rose-600 text-white" 
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
              </div>

              {/* In-Use Dependency Warnings */}
              <div className="mt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-slate-400" />
                    Website Usage & References
                  </label>
                  {isCheckingUsage && (
                    <span className="text-xs font-medium text-rose-600 animate-pulse">Scanning...</span>
                  )}
                </div>

                {usageReferences.length > 0 ? (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
                    <div className="font-bold mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      In use by {usageReferences.length} website item(s):
                    </div>
                    <ul className="list-disc pl-6 space-y-1 text-xs opacity-90">
                      {usageReferences.map((ref, idx) => (
                        <li key={idx}>
                          <strong className="capitalize">{ref.collection}:</strong> {ref.title} <span className="opacity-75">({ref.field})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Not currently detected in active website records.
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Editable Metadata Form */}
            <div className="w-full lg:w-7/12 flex flex-col justify-between">
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                {feedback && (
                  <div
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                      feedback.type === "success"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    {feedback.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
                    <span>{feedback.message}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Display Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Dr. Noopur Patel Clinical Portrait"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Human-friendly name shown inside the admin media library.</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Alt Text (SEO & Accessibility) <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {altText.length} characters
                    </span>
                  </div>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Describe what is seen in the image for Google rankings and screen readers..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Google Image Search uses this text to understand oncology and clinical specialties.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Caption (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Optional clinical context, hospital photo credit, or doctor citation..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-y"
                  />
                </div>

                {/* Form Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
                  <button
                    type="button"
                    onClick={() => setIsConfirmDeleteOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Asset
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Metadata</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={() => handleDelete(usageReferences.length > 0)}
        title="Permanently Delete Media Asset?"
        message={
          usageReferences.length > 0
            ? `WARNING: This asset is currently used in ${usageReferences.length} live website content item(s). Deleting it will result in broken images on those pages. Are you sure you want to force deletion?`
            : "Are you sure you want to permanently delete this media asset? This cannot be undone."
        }
        confirmLabel={usageReferences.length > 0 ? "Force Delete Anyway" : "Yes, Delete Permanently"}
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
