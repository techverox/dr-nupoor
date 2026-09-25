"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LandingPageTemplate } from "@/types/landingPage";
import { SectionRenderer } from "@/components/landing/SectionRenderer";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  ArrowLeft,
  Folder,
  Sparkles,
  Layers,
  Eye,
  Trash2,
  Rocket,
  Search,
  X,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  ExternalLink,
  ShieldCheck,
  Zap,
  Copy,
  Info,
  SlidersHorizontal,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Enterprise OS",
  "Lead Generation",
  "Service",
  "Product",
  "Campaign",
  "General",
];

export default function LandingPageTemplatesGalleryPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<LandingPageTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Notifications
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Side-by-Side Live Preview Studio
  const [previewTemplate, setPreviewTemplate] = useState<LandingPageTemplate | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // "Use Template" modal
  const [instantiateTemplate, setInstantiateTemplate] = useState<LandingPageTemplate | null>(null);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");
  const [isInstantiating, setIsInstantiating] = useState(false);
  const [instantiateError, setInstantiateError] = useState("");

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<LandingPageTemplate | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset to Defaults modal
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Load templates from API
  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/landing-pages/templates");
      const data = await res.json();
      if (data.success && data.templates) {
        setTemplates(data.templates);
      } else {
        setFeedback({ message: data.error || "Failed to load templates.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error loading templates.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tpl.name.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q) ||
        (tpl.tags && tpl.tags.some((t) => t.toLowerCase().includes(q))) ||
        (tpl.category && tpl.category.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === "All" ||
        tpl.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, selectedCategory]);

  // Open "Use Template" modal
  const openUseModal = (tpl: LandingPageTemplate) => {
    setInstantiateTemplate(tpl);
    const suggestedTitle = `${tpl.name} Campaign`;
    setNewPageTitle(suggestedTitle);
    setNewPageSlug(
      suggestedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
    setInstantiateError("");
  };

  // Submit "Use Template"
  const handleInstantiateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instantiateTemplate) return;

    setIsInstantiating(true);
    setInstantiateError("");

    try {
      const res = await fetch(`/api/admin/landing-pages/templates/${instantiateTemplate.id}/use`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPageTitle,
          slug: newPageSlug,
        }),
      });
      const data = await res.json();

      if (data.success && data.landingPage) {
        router.push(`/admin/landing-pages/${data.landingPage.id}/builder`);
      } else {
        setInstantiateError(data.error || "Failed to instantiate template.");
      }
    } catch {
      setInstantiateError("Network error instantiating template.");
    } finally {
      setIsInstantiating(false);
    }
  };

  // 1-Click Reset to Defaults
  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/landing-pages/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success && data.templates) {
        setTemplates(data.templates);
        setFeedback({
          message: data.message || "All 6 official landing page blueprints reset to defaults!",
          type: "success",
        });
        setIsResetModalOpen(false);
      } else {
        setFeedback({ message: data.error || "Failed to reset templates.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error during reset.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Delete Template
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/landing-pages/templates/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setTemplates((prev) => prev.filter((t) => t.id !== deleteTarget.id));
        setFeedback({ message: data.message || "Template deleted successfully.", type: "success" });
        setDeleteTarget(null);
      } else {
        setFeedback({ message: data.error || "Failed to delete template.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error deleting template.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // Find Homepage OS Template if present
  const homepageOsTemplate = useMemo(() => {
    return templates.find((t) => t.id === "tpl-homepage-os" || t.category === "Enterprise OS");
  }, [templates]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Breadcrumbs and Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
            <Link
              href="/admin/landing-pages"
              className="hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Landing Pages
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">Templates Studio</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D84C70] to-[#C23B5E] flex items-center justify-center text-white shadow-md shadow-rose-900/10">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                Landing Page Templates
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Studio
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Pre-assembled clinical blueprints for Dr. Noopur Patel&apos;s practice. Create specialized patient care funnels in 1 click.
              </p>
            </div>
          </div>
        </div>

        {/* Top Header Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* 1-Click Reset to Defaults Button */}
          <button
            type="button"
            id="reset-templates-defaults-btn"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs transition-all cursor-pointer"
            title="Restore canonical clinical blueprints to factory defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset to Defaults</span>
          </button>

          {/* Component Library link */}
          <Link
            href="/admin/landing-pages/components"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 shadow-xs transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Component Library</span>
          </Link>

          {/* Homepage Clone Instant Launch Button */}
          {homepageOsTemplate && (
            <button
              onClick={() => openUseModal(homepageOsTemplate)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#D84C70] to-[#C23B5E] text-white hover:brightness-105 shadow-md shadow-rose-900/10 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Clone Clinic Blueprint</span>
            </button>
          )}
        </div>
      </div>

      {/* Bento Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#D84C70] flex items-center justify-center shrink-0 border border-rose-100">
            <Folder className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{templates.length} Blueprints</div>
            <div className="text-xs text-slate-500 font-medium">Production Ready</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-emerald-600">Oncology Ready</div>
            <div className="text-xs text-slate-500 font-medium">Clinical Standard</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">Multi-Device</div>
            <div className="text-xs text-slate-500 font-medium">Desktop, Tablet &amp; Mobile</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">Safe Cloning</div>
            <div className="text-xs text-slate-500 font-medium">Independent Page Copies</div>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in duration-200 shadow-xs ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-semibold">{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search blueprints by name, category, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#D84C70] focus:ring-2 focus:ring-[#D84C70]/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredTemplates.length}</strong> of {templates.length} templates
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
            Categories:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="py-24 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#D84C70] border-t-transparent mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading clinical blueprints...</p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 shadow-xs px-4">
          <Folder className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No blueprints match your filter</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
            Try modifying your search or select &ldquo;All&rdquo; categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl) => {
            const isHomepageClone = tpl.id === "tpl-homepage-os" || tpl.category === "Enterprise OS";

            return (
              <div
                key={tpl.id}
                className={`group bg-white border rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative ${
                  isHomepageClone
                    ? "border-[#D84C70]/60 ring-2 ring-[#D84C70]/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Miniature Live Preview Container */}
                <div className="h-56 bg-slate-900 relative overflow-hidden border-b border-slate-200">
                  <div className="scale-[0.42] origin-top-left w-[238%] pointer-events-none select-none opacity-90 group-hover:opacity-100 transition-opacity">
                    {tpl.sections.slice(0, 3).map((sec) => (
                      <SectionRenderer key={sec.id} section={sec} isBuilder={false} />
                    ))}
                  </div>

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    {isHomepageClone ? (
                      <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#D84C70] to-[#C23B5E] text-white text-[11px] font-black shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Clinical Blueprint
                      </span>
                    ) : tpl.badge ? (
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {tpl.badge}
                      </span>
                    ) : null}
                  </div>

                  {/* Section Count Pill */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/10">
                    <Layers className="w-3 h-3 text-emerald-400" />
                    <span>{tpl.sections.length} Sections</span>
                  </div>

                  {/* Quick Inspect Button */}
                  <button
                    onClick={() => {
                      setPreviewTemplate(tpl);
                      setPreviewDevice("desktop");
                    }}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-xs font-bold shadow-md backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D84C70]" />
                    <span>Live Studio</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {tpl.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        ID: {tpl.id}
                      </span>
                    </div>

                    <h3 className="font-black text-slate-900 text-base leading-snug">
                      {tpl.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1.5 mb-4">
                      {tpl.description}
                    </p>

                    {/* Section Types Chips */}
                    <div className="flex flex-wrap gap-1 mb-5">
                      {tpl.sections.map((sec, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600"
                        >
                          {sec.type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setDeleteTarget(tpl)}
                      title="Delete Template Master"
                      className="text-xs font-medium text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setPreviewTemplate(tpl);
                          setPreviewDevice("desktop");
                        }}
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        Inspect
                      </button>

                      <button
                        onClick={() => openUseModal(tpl)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#D84C70] to-[#C23B5E] text-white hover:brightness-105 shadow-md shadow-rose-900/10 transition-all cursor-pointer"
                      >
                        <Rocket className="w-3.5 h-3.5 text-white" />
                        <span>Use Template</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIDE-BY-SIDE LIVE PREVIEW STUDIO MODAL */}
      {/* ========================================================================= */}
      {previewTemplate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            {/* Studio Header Bar */}
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-[#D84C70] border border-rose-200">
                    {previewTemplate.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {previewTemplate.sections.length} Sections
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                  {previewTemplate.name}
                </h2>
              </div>

              {/* Responsive Device Viewport Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === "desktop"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Desktop Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>

                <button
                  onClick={() => setPreviewDevice("tablet")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === "tablet"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Tablet Preview (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>

                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === "mobile"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Mobile Preview (390px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const tpl = previewTemplate;
                    setPreviewTemplate(null);
                    openUseModal(tpl);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D84C70] to-[#C23B5E] text-white text-xs font-black shadow-md shadow-rose-900/10 hover:brightness-105 transition-all cursor-pointer"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Use Template</span>
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close Studio"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Device Canvas */}
            <div className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6 flex justify-center items-start">
              <div
                className={`transition-all duration-300 w-full ${
                  previewDevice === "desktop"
                    ? "max-w-5xl"
                    : previewDevice === "tablet"
                    ? "max-w-[768px] border-4 border-slate-300 rounded-3xl p-3 bg-white shadow-2xl"
                    : "max-w-[390px] border-8 border-slate-300 rounded-[3rem] p-3 bg-white shadow-2xl"
                }`}
              >
                {/* Mobile top notch indicator */}
                {previewDevice === "mobile" && (
                  <div className="w-28 h-4 bg-slate-300 rounded-full mx-auto mb-2" />
                )}

                <div className="space-y-4 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200">
                  {previewTemplate.sections.map((section) => (
                    <div key={section.id} className="overflow-hidden">
                      <SectionRenderer section={section} isBuilder={false} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Studio Footer Bar */}
            <div className="px-5 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>All {previewTemplate.sections.length} sections are verified responsive and ready to instantiate.</span>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-3 py-1 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1-CLICK "USE TEMPLATE" MODAL */}
      {/* ========================================================================= */}
      {instantiateTemplate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#D84C70] flex items-center justify-center border border-rose-100">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D84C70]">
                    1-Click Page Launch
                  </span>
                  <h2 className="text-lg font-black text-slate-900">
                    {instantiateTemplate.name}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setInstantiateTemplate(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {instantiateError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{instantiateError}</span>
              </div>
            )}

            <form onSubmit={handleInstantiateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  New Page Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPageTitle}
                  onChange={(e) => {
                    setNewPageTitle(e.target.value);
                    setNewPageSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, "")
                    );
                  }}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#D84C70] focus:ring-2 focus:ring-[#D84C70]/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Live URL Slug <span className="text-rose-500">*</span>
                </label>
                <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <span className="px-3.5 py-2.5 text-xs font-medium text-slate-400 bg-slate-50 border-r border-slate-200 select-none">
                    /landing/
                  </span>
                  <input
                    type="text"
                    required
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    placeholder="my-campaign-page"
                    className="w-full px-3.5 py-2.5 text-sm bg-transparent text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Explanatory Box */}
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-slate-700 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#D84C70] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Safe &amp; Instant:</strong> All {instantiateTemplate.sections.length} sections will be copied into your new independent page. You will immediately open the Visual Builder where you can customize copy and images easily!
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setInstantiateTemplate(null)}
                  className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isInstantiating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black rounded-xl bg-gradient-to-r from-[#D84C70] to-[#C23B5E] text-white hover:brightness-105 shadow-md shadow-rose-900/10 disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Rocket className="w-3.5 h-3.5 text-white" />
                  <span>{isInstantiating ? "Creating Page..." : "Create & Launch Builder"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1-CLICK RESET CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      <ConfirmDialog
        isOpen={isResetModalOpen}
        title="Reset All Blueprints to Defaults?"
        message="Are you sure you want to reset all landing page templates to clinical defaults? This will restore canonical blueprints to their original clinical state. Any previously created landing pages will remain completely safe and unaffected."
        confirmLabel="Yes, Reset to Defaults"
        isDestructive
        isLoading={isResetting}
        onConfirm={handleResetToDefaults}
        onClose={() => setIsResetModalOpen(false)}
      />

      {/* ========================================================================= */}
      {/* DELETE TEMPLATE CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Blueprint Master?"
        message={`Are you sure you want to delete the template "${deleteTarget?.name}"? Any landing pages that were already created from this template will remain completely intact.`}
        confirmLabel="Delete Template"
        isDestructive
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
