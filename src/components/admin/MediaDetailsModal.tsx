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
      const res = await onDeleteAsset(item.id, force);
      if (res.success) {
        setIsConfirmDeleteOpen(false);
        onClose();
      } else if (res.inUseWarning) {
        setUsageReferences(res.inUseWarning);
        setFeedback({
          message: "Asset is currently in use across your website content. Please review references before deleting.",
          type: "error",
        });
        setIsConfirmDeleteOpen(false);
      } else {
        setFeedback({ message: res.error || "Failed to delete asset.", type: "error" });
        setIsConfirmDeleteOpen(false);
      }
    } catch {
      setFeedback({ message: "Network error deleting asset.", type: "error" });
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
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-zinc-900/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 m-0 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-zinc-400" />
              Media Asset Details
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold tracking-wider bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              {item.mimeType?.replace("image/", "").toUpperCase() || "IMAGE"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Visual Preview & Technical Specs */}
            <div className="w-full lg:w-5/12 flex flex-col gap-6">
              {/* Visual Box */}
              <div className="w-full h-64 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 flex items-center justify-center p-4 overflow-hidden relative group">
                <div className="absolute inset-0 bg-[url('/checkers.png')] opacity-10 pointer-events-none"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.altText || item.name}
                  className="max-w-full max-h-full object-contain relative z-10 drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Technical Specs List */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/60 text-sm flex flex-col gap-3 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/50 pb-2">
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-300">File Name:</strong> 
                  <code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono truncate max-w-[200px]" title={item.fileName}>{item.fileName}</code>
                </div>
                <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/50 pb-2">
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-300">File Size:</strong> 
                  <span>{formatFileSize(item.fileSize)}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/50 pb-2">
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-300">MIME Type:</strong> 
                  <span>{item.mimeType}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/50 pb-2">
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-300">Uploaded:</strong> 
                  <span>{formatDate(item.uploadedAt)}</span>
                </div>
                {item.width && item.height && (
                  <div className="flex justify-between">
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-300">Dimensions:</strong> 
                    <span>{item.width} &times; {item.height} px</span>
                  </div>
                )}
              </div>

              {/* Public URL Box */}
              <div>
                <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 mb-2">
                  <LinkIcon className="w-4 h-4 text-zinc-400" />
                  Public Asset URL
                </label>
                <div className="flex gap-2 relative">
                  <input
                    type="text"
                    readOnly
                    value={item.url}
                    className="flex-1 w-full pl-3 pr-2 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-mono text-zinc-600 dark:text-zinc-400 focus:outline-none"
                  />
                  <button 
                    onClick={handleCopy}
                    className={`shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-colors ${
                      copied 
                        ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900" 
                        : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
              </div>

              {/* In-Use Dependency Warnings */}
              <div className="mt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-zinc-400" />
                    Website Usage & References
                  </label>
                  {isCheckingUsage && (
                    <span className="text-xs font-medium text-blue-500 animate-pulse">Scanning...</span>
                  )}
                </div>

                {usageReferences.length > 0 ? (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 text-sm text-amber-800 dark:text-amber-500">
                    <div className="font-bold mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
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
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/30 text-xs font-medium text-emerald-700 dark:text-emerald-500 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Not currently detected in active website records.
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Editable Metadata & Alt Text */}
            <form onSubmit={handleSave} className="w-full lg:w-7/12 flex flex-col gap-5 h-full relative">
              {feedback && (
                <div className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 border ${
                  feedback.type === 'success' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-900/50 dark:text-emerald-400' 
                    : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400'
                }`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {feedback.message}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  Accessible Alt Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  rows={3}
                  placeholder="Describe what is visible in the image concisely..."
                  required
                  className="block w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 dark:text-zinc-100 transition-shadow resize-y"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Screen readers announce this to visually impaired visitors and search bots use it for Google Image indexing.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  Asset Title / Display Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Descriptive title..."
                  className="block w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 dark:text-zinc-100 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  Caption / Editorial Notes (Optional)
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={4}
                  placeholder="Optional caption or internal editorial usage instructions..."
                  className="block w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 dark:text-zinc-100 transition-shadow resize-y"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsConfirmDeleteOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Asset
                </button>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-bold rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-bold text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={() => handleDelete(usageReferences.length > 0)}
        title="Delete Media Asset?"
        message={
          usageReferences.length > 0
            ? `WARNING: This media asset is currently in use in ${usageReferences.length} website item(s). Deleting it will cause broken image links on your public site. Are you sure you wish to proceed?`
            : `Are you sure you want to permanently delete "${item.name || item.fileName}"? This action cannot be undone.`
        }
        confirmLabel={usageReferences.length > 0 ? "Delete Anyway (Force)" : "Delete Asset"}
        isDestructive
        isLoading={isDeleting}
      />
    </div>
  );
}
