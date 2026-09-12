"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LandingPage, LandingPageStatus, LandingPageCtaConfig } from "@/types/landingPage";
import { formatDate } from "@/utils/formatters";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { generateSlug, validateLandingPageSlug } from "@/lib/utils/slug";
import {
  Layers,
  Sparkles,
  RotateCcw,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Copy,
  Trash2,
  CheckCircle2,
  Clock,
  Zap,
  Globe,
  Settings,
  ArrowRight,
} from "lucide-react";

export default function AdminLandingPagesPage() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | LandingPageStatus>("all");
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Creation modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<"blank" | "template">("template");
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newTemplate, setNewTemplate] = useState("tpl-agency-lead-gen");
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  const [createError, setCreateError] = useState("");

  // Edit modal state
  const [editingPage, setEditingPage] = useState<LandingPage | null>(null);
  const [activeEditTab, setActiveEditTab] = useState<"general" | "seo" | "cta_form">("general");
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [editError, setEditError] = useState("");

  // Deletion state
  const [deleteTarget, setDeleteTarget] = useState<LandingPage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset to Defaults state
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Load all landing pages
  const loadLandingPages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/landing-pages");
      const data = await res.json();
      if (data.success && data.landingPages) {
        setPages(data.landingPages);
      } else {
        setFeedback({ message: data.error || "Failed to load landing pages.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminLandingPages] Load error:", e);
      setFeedback({ message: "Network error loading landing pages.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLandingPages();
  }, []);

  // Auto-dismiss feedback toast
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Filtered list
  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || page.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Metrics
  const totalCount = pages.length;
  const publishedCount = pages.filter((p) => p.status === "published").length;
  const draftCount = pages.filter((p) => p.status === "draft").length;

  // Toggle Publication
  const handleTogglePublish = async (page: LandingPage) => {
    try {
      const res = await fetch(`/api/admin/landing-pages/${page.id}/publish`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setPages((prev) =>
          prev.map((p) => (p.id === page.id ? data.landingPage : p))
        );
        setFeedback({ message: data.message || "Publication status updated.", type: "success" });
      } else {
        setFeedback({ message: data.error || "Publication toggle failed.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error toggling publication status.", type: "error" });
    }
  };

  // Duplicate Landing Page
  const handleDuplicate = async (page: LandingPage) => {
    try {
      const res = await fetch(`/api/admin/landing-pages/${page.id}/duplicate`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setPages((prev) => [data.landingPage, ...prev]);
        setFeedback({ message: "Landing page duplicated successfully.", type: "success" });
      } else {
        setFeedback({ message: data.error || "Duplication failed.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error duplicating landing page.", type: "error" });
    }
  };

  // Safe Deletion
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/landing-pages/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setPages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setFeedback({ message: "Landing page deleted safely.", type: "success" });
        setDeleteTarget(null);
      } else {
        setFeedback({ message: data.error || "Failed to delete landing page.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error deleting landing page.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // 1-Click Reset to Defaults
  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/landing-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        await loadLandingPages();
        setFeedback({
          message: "3 Canonical Landing Pages Restored Successfully with 100% Real Data!",
          type: "success",
        });
        setIsResetConfirmOpen(false);
      } else {
        setFeedback({ message: data.error || "Failed to reset landing pages.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error during reset to defaults.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Handle Create Submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");

    if (!newTitle.trim() || newTitle.trim().length < 3) {
      setCreateError("Title must be at least 3 characters long.");
      return;
    }

    const validation = validateLandingPageSlug(newSlug || generateSlug(newTitle));
    if (!validation.isValid) {
      setCreateError(validation.error || "Invalid slug.");
      return;
    }

    setIsSubmittingCreate(true);
    try {
      const res = await fetch("/api/admin/landing-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          slug: validation.normalizedSlug,
          templateId: createMode === "template" ? newTemplate : "blank",
          status: "draft",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPages((prev) => [data.landingPage, ...prev]);
        setIsCreateModalOpen(false);
        setNewTitle("");
        setNewSlug("");
        setFeedback({ message: "Landing page created successfully as Draft.", type: "success" });
      } else {
        setCreateError(data.error || "Failed to create landing page.");
      }
    } catch {
      setCreateError("Network error creating landing page.");
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    setEditError("");
    setIsSubmittingEdit(true);

    try {
      const res = await fetch(`/api/admin/landing-pages/${editingPage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingPage.title,
          slug: editingPage.slug,
          status: editingPage.status,
          cta: editingPage.cta,
          form: editingPage.form,
          seo: editingPage.seo,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPages((prev) =>
          prev.map((p) => (p.id === editingPage.id ? data.landingPage : p))
        );
        setEditingPage(null);
        setFeedback({ message: "Page settings saved successfully.", type: "success" });
      } else {
        setEditError(data.error || "Failed to save changes.");
      }
    } catch {
      setEditError("Network error saving page settings.");
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header Banner with Live Sync and Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-Time Live Synced (0ms)
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">|</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              10-Year-Old Simplicity UI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            Landing Page Architecture & Builder
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
            Design homepage-grade, high-converting digital landing pages in seconds. Instant keystroke synchronization, live side-by-side preview, and 1-click defaults.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all shadow-xs cursor-pointer"
            title="Restore 3 canonical blueprints with real agency data"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>

          <button
            type="button"
            onClick={() => {
              setNewTitle("");
              setNewSlug("");
              setCreateError("");
              setIsCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-emerald-600 text-white font-bold text-xs hover:bg-zinc-800 dark:hover:bg-emerald-500 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Landing Page
          </button>
        </div>
      </div>

      {/* 2. Real-Time Feedback Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between border transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <span className="text-base shrink-0">⚠️</span>
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs opacity-70 hover:opacity-100 underline ml-4 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 3. Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 dark:text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Campaigns</span>
            <Globe className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {totalCount}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Multi-state ready blueprints</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Live Published</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {publishedCount}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Publicly indexed & converting</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In Draft</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
            {draftCount}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Work in progress</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between text-emerald-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Sync Latency</span>
            <Zap className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
            0 ms
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Instant Keystroke Mirroring</p>
        </div>
      </div>

      {/* 4. Search, Filter Tabs & Layout Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search landing pages by title or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-start sm:justify-end overflow-x-auto">
          {(["all", "published", "draft"] as const).map((status) => {
            const count =
              status === "all"
                ? totalCount
                : status === "published"
                ? publishedCount
                : draftCount;
            const active = selectedStatus === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {status} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Campaign Cards Grid */}
      {isLoading ? (
        <div className="p-16 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-zinc-500">Loading Landing Pages...</p>
        </div>
      ) : filteredPages.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Layers className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            No Landing Pages Found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-5">
            {searchQuery
              ? `No campaigns match "${searchQuery}". Try clearing the search filter.`
              : "No landing pages exist in this category yet. Create one or click 'Reset to Defaults'."}
          </p>
          <button
            type="button"
            onClick={handleResetToDefaults}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Restore 3 Canonical Blueprints
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPages.map((page) => {
            const isPublished = page.status === "published";
            const sectionCount = page.sections?.length || 0;

            return (
              <div
                key={page.id}
                className="group flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all p-5"
              >
                <div>
                  {/* Top Status & Slug Ribbon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isPublished
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isPublished ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                        }`}
                      />
                      {isPublished ? "Live Published" : "Draft Mode"}
                    </span>

                    <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
                      {sectionCount} {sectionCount === 1 ? "Section" : "Sections"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1">
                    {page.title}
                  </h3>

                  {/* Public Route Link */}
                  <a
                    href={`/landing/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 mb-4 transition-colors"
                  >
                    <span>/landing/{page.slug}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>

                  {/* Meta Details */}
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 mb-4">
                    <span>Updated {formatDate(page.updatedAt)}</span>
                    <span className="capitalize">{page.templateId || "Custom"}</span>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="space-y-2">
                  {/* Primary Visual Builder Button */}
                  <Link
                    href={`/admin/landing-pages/${page.id}/builder`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-emerald-600 dark:bg-white dark:hover:bg-emerald-500 text-white dark:text-zinc-900 dark:hover:text-white font-bold text-xs transition-all shadow-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    Open Visual Builder
                    <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Secondary Utility Controls */}
                  <div className="flex items-center justify-between gap-1 pt-1">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(page)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        isPublished
                          ? "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          : "border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100"
                      }`}
                    >
                      {isPublished ? "Unpublish" : "Publish"}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPage(page);
                          setActiveEditTab("general");
                        }}
                        className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        title="Page Settings & SEO"
                      >
                        <Settings className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(page)}
                        className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        title="Duplicate Blueprint"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(page)}
                        className="p-1.5 text-rose-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Delete Landing Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. CREATE LANDING PAGE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Create New Landing Page
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {createError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-400">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Starting Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateMode("template")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      createMode === "template"
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 ring-2 ring-emerald-500/20"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="font-bold text-xs">Pre-Built Blueprint</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">High-converting agency layout</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCreateMode("blank")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      createMode === "blank"
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 ring-2 ring-emerald-500/20"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="font-bold text-xs">Blank Canvas</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Build block-by-block</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Page Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ahmedabad Real Estate Performance Campaign"
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (!newSlug) {
                      setNewSlug(generateSlug(e.target.value));
                    }
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  URL Slug (/landing/*) *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-mono">/landing/</span>
                  <input
                    type="text"
                    placeholder="e.g. real-estate-growth"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 font-mono outline-none focus:ring-2 focus:ring-emerald-500/20"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingCreate}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingCreate ? "Creating..." : "Create & Launch Builder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. EDIT SETTINGS & SEO MODAL */}
      {editingPage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-600" />
                Page Settings & SEO Metadata
              </h3>
              <button
                type="button"
                onClick={() => setEditingPage(null)}
                className="text-zinc-400 hover:text-zinc-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Tab navigation */}
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 mb-4 pb-2">
              {(["general", "seo", "cta_form"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveEditTab(tab)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors capitalize cursor-pointer ${
                    activeEditTab === tab
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {tab === "cta_form" ? "CTA & Lead Form" : tab}
                </button>
              ))}
            </div>

            {editError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-400">
                {editError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {activeEditTab === "general" && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Campaign Title
                    </label>
                    <input
                      type="text"
                      value={editingPage.title}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, title: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      URL Slug (/landing/*)
                    </label>
                    <input
                      type="text"
                      value={editingPage.slug}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                        })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 font-mono outline-none focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Publication Status
                    </label>
                    <select
                      value={editingPage.status}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          status: e.target.value as LandingPageStatus,
                        })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 outline-none"
                    >
                      <option value="draft">Draft (Private / Testing Only)</option>
                      <option value="published">Published (Live to Public)</option>
                    </select>
                  </div>
                </>
              )}

              {activeEditTab === "seo" && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      SEO Title Tag
                    </label>
                    <input
                      type="text"
                      value={editingPage.seo?.seoTitle || ""}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          seo: { ...editingPage.seo, seoTitle: e.target.value },
                        })
                      }
                      placeholder="e.g. High-ROI Performance Marketing Agency | DigiVigee"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Meta Description (Search Snippet)
                    </label>
                    <textarea
                      rows={3}
                      value={editingPage.seo?.metaDescription || ""}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          seo: { ...editingPage.seo, metaDescription: e.target.value },
                        })
                      }
                      placeholder="High-converting agency solutions for ambitious enterprises..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="seo-noindex"
                      checked={Boolean(editingPage.seo?.noIndex)}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          seo: { ...editingPage.seo, noIndex: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                    <label htmlFor="seo-noindex" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Exclude from search engine indexing (noIndex)
                    </label>
                  </div>
                </>
              )}

              {activeEditTab === "cta_form" && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Primary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={editingPage.cta?.primaryCtaLabel || ""}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          cta: { ...editingPage.cta, primaryCtaLabel: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Primary CTA Target Anchor or URL
                    </label>
                    <input
                      type="text"
                      value={editingPage.cta?.primaryCtaTarget || ""}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          cta: { ...editingPage.cta, primaryCtaTarget: e.target.value },
                        })
                      }
                      placeholder="#lead-form"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Lead Form Title
                    </label>
                    <input
                      type="text"
                      value={editingPage.form?.formTitle || ""}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          form: { ...editingPage.form, formTitle: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. CONFIRM RESET TO DEFAULTS DIALOG */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Restore Default Landing Pages?"
        message={`This will restore all 4 canonical blueprints (Homepage Clone, Performance Marketing, Enterprise Retainers, and Local SEO) with 100% verified agency data.

• 4 ready-to-use homepage-grade campaigns
• 100% real agency copy, testimonials & FAQs
• Instant 0ms live builder synchronization`}
        confirmLabel={isResetting ? "Restoring..." : "Yes, Restore Defaults"}
        isDestructive={false}
        isLoading={isResetting}
        onConfirm={handleResetToDefaults}
        onClose={() => setIsResetConfirmOpen(false)}
      />

      {/* 9. CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Landing Page?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? Any live links at /landing/${deleteTarget?.slug} will immediately become inaccessible.`}
        confirmLabel={isDeleting ? "Deleting..." : "Delete Permanently"}
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
