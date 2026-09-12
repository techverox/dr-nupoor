"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ReusableComponent, LandingPageSection } from "@/types/landingPage";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { SectionRenderer } from "@/components/landing/SectionRenderer";
import {
  ArrowLeft,
  Layers,
  Sparkles,
  RotateCcw,
  Plus,
  Search,
  X,
  Eye,
  Edit3,
  Copy,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Palette,
  Sliders,
  Folder,
  ArrowUpDown,
  Check,
  Zap,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Hero",
  "Features",
  "Services",
  "Trust",
  "Testimonials",
  "Pricing",
  "FAQ",
  "Conversion",
  "Advanced",
];

const COLOR_SWATCHES = [
  { name: "Obsidian Dark", bg: "#0f172a", text: "#ffffff" },
  { name: "Clean White", bg: "#ffffff", text: "#0f172a" },
  { name: "Cool Slate", bg: "#F8FAFC", text: "#0f172a" },
  {
    name: "Emerald Glow",
    bg: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    text: "#ffffff",
  },
  {
    name: "Midnight Navy",
    bg: "linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e293b 100%)",
    text: "#ffffff",
  },
  {
    name: "Indigo Cyber",
    bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
    text: "#ffffff",
  },
];

export default function ReusableComponentsLibraryPage() {
  const [components, setComponents] = useState<ReusableComponent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "category" | "updated">("updated");

  // Notifications
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Copied Name Feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Live Studio & Edit State (Side-by-Side Editor)
  const [studioActive, setStudioActive] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);
  const [studioTab, setStudioTab] = useState<"content" | "styling" | "metadata">("content");
  const [studioViewport, setStudioViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mobileStudioView, setMobileStudioView] = useState<"controls" | "preview">("controls");

  // Studio Draft State (Mirrored with 0ms real-time latency)
  const [draftName, setDraftName] = useState("");
  const [draftCategory, setDraftCategory] = useState("Hero");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftTags, setDraftTags] = useState("");
  const [draftSectionType, setDraftSectionType] = useState("hero");
  const [draftContent, setDraftContent] = useState<Record<string, unknown>>({});
  const [draftStyling, setDraftStyling] = useState<{
    backgroundColor?: string;
    textColor?: string;
    paddingY?: "sm" | "md" | "lg" | "xl";
  }>({
    backgroundColor: "#0f172a",
    textColor: "#ffffff",
    paddingY: "xl",
  });
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  // 1-Click Reset to Defaults Modal
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Deletion Modal
  const [deleteTarget, setDeleteTarget] = useState<ReusableComponent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load Components
  const loadComponents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/landing-pages/components");
      const data = await res.json();
      if (data.success && data.components) {
        setComponents(data.components);
      } else {
        setFeedback({ message: data.error || "Failed to load components.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error loading components.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComponents();
  }, []);

  // Filtered & Sorted Components
  const filteredComponents = components
    .filter((comp) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        comp.name.toLowerCase().includes(query) ||
        comp.sectionType.toLowerCase().includes(query) ||
        (comp.description && comp.description.toLowerCase().includes(query)) ||
        (comp.tags && comp.tags.some((t) => t.toLowerCase().includes(query)));

      const matchesCategory =
        selectedCategory === "All" ||
        comp.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }
      // default: updated
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  // Open Studio for existing component
  const openStudioForComponent = (comp: ReusableComponent) => {
    setActiveComponentId(comp.id);
    setIsCreatingNew(false);
    setDraftName(comp.name);
    setDraftCategory(comp.category);
    setDraftDescription(comp.description || "");
    setDraftTags(comp.tags ? comp.tags.join(", ") : "");
    setDraftSectionType(comp.sectionType);
    setDraftContent(JSON.parse(JSON.stringify(comp.sectionContent || {})));
    setDraftStyling(
      comp.sectionStyling
        ? JSON.parse(JSON.stringify(comp.sectionStyling))
        : { backgroundColor: "#ffffff", textColor: "#0f172a", paddingY: "xl" }
    );
    setStudioTab("content");
    setMobileStudioView("controls");
    setStudioActive(true);
  };

  // Open Studio for creating new component
  const openStudioForNew = () => {
    setActiveComponentId(null);
    setIsCreatingNew(true);
    setDraftName("Custom Homepage Block");
    setDraftCategory("Hero");
    setDraftDescription("Custom high-converting master block for fast page building.");
    setDraftTags("custom, high-conversion");
    setDraftSectionType("hero");
    setDraftContent({
      eyebrow: "Enterprise Agency Growth OS",
      headline: "Scale 10x Client Retainers. Burn Out 0 Teams.",
      description:
        "Stop wasting senior talent on manual reporting that Digivigee handles in seconds.",
      primaryCtaLabel: "Claim Free Proposal",
      primaryCtaTarget: "#lead-form",
      secondaryCtaLabel: "Explore Capabilities",
      secondaryCtaTarget: "#features",
      logosHeading: "Trusted by 2,350+ Scaling Agencies & Enterprises",
    });
    setDraftStyling({
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      paddingY: "xl",
    });
    setStudioTab("content");
    setMobileStudioView("controls");
    setStudioActive(true);
  };

  // Live content updater (0ms latency)
  const updateDraftContentField = (key: string, value: unknown) => {
    setDraftContent((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Live styling updater (0ms latency)
  const updateDraftStylingField = (key: string, value: unknown) => {
    setDraftStyling((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Copy component name
  const handleCopyName = (comp: ReusableComponent) => {
    navigator.clipboard.writeText(comp.name);
    setCopiedId(comp.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Save changes in Studio
  const handleSaveStudio = async () => {
    if (!draftName.trim()) {
      setFeedback({ message: "Component name is required.", type: "error" });
      return;
    }

    setIsSavingDraft(true);
    try {
      const payload = {
        name: draftName.trim(),
        category: draftCategory.trim(),
        description: draftDescription.trim(),
        tags: draftTags
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean),
        sectionType: draftSectionType,
        sectionContent: draftContent,
        sectionStyling: draftStyling,
      };

      if (isCreatingNew || !activeComponentId) {
        // Create
        const res = await fetch("/api/admin/landing-pages/components", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success && data.component) {
          setComponents((prev) => [data.component, ...prev]);
          setFeedback({
            message: `Created master component "${data.component.name}" successfully.`,
            type: "success",
          });
          setStudioActive(false);
        } else {
          setFeedback({ message: data.error || "Failed to create component.", type: "error" });
        }
      } else {
        // Update
        const res = await fetch(`/api/admin/landing-pages/components/${activeComponentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success && data.component) {
          setComponents((prev) =>
            prev.map((c) => (c.id === activeComponentId ? data.component : c))
          );
          setFeedback({
            message: `Updated master component "${data.component.name}" successfully.`,
            type: "success",
          });
          setStudioActive(false);
        } else {
          setFeedback({ message: data.error || "Failed to update component.", type: "error" });
        }
      }
    } catch {
      setFeedback({ message: "Network error saving master component.", type: "error" });
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Duplicate Component
  const handleDuplicate = async (comp: ReusableComponent) => {
    try {
      const res = await fetch(`/api/admin/landing-pages/components/${comp.id}/duplicate`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success && data.component) {
        setComponents((prev) => [data.component, ...prev]);
        setFeedback({
          message: `Duplicated "${comp.name}" successfully.`,
          type: "success",
        });
      } else {
        setFeedback({ message: data.error || "Failed to duplicate component.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error duplicating component.", type: "error" });
    }
  };

  // Delete Component
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/landing-pages/components/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setComponents((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        setFeedback({
          message: `Deleted "${deleteTarget.name}" successfully.`,
          type: "success",
        });
        setDeleteTarget(null);
      } else {
        setFeedback({ message: data.error || "Failed to delete component.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error deleting component.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // 1-Click Reset to Defaults
  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/landing-pages/components", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success && data.components) {
        setComponents(data.components);
        setFeedback({
          message: "Restored all 11 canonical DigiVigee homepage-grade master components successfully!",
          type: "success",
        });
        setIsResetModalOpen(false);
      } else {
        setFeedback({ message: data.error || "Failed to reset components.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error resetting components.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Draft Section Object for Live Render
  const draftSectionForRenderer: LandingPageSection = {
    id: activeComponentId || "studio-live-preview",
    type: draftSectionType,
    order: 0,
    isVisible: true,
    content: draftContent,
    styling: draftStyling,
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Link
              href="/admin/landing-pages"
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Landing Pages
            </Link>
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              Reusable Component Library
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            Reusable Component Library
            <span className="ml-2 text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
              100% Real Website Data
            </span>
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
            Pre-engineered master blocks matching DigiVigee homepage 1:1. Edit live in side-by-side studio or insert into any landing page with zero coding.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* 1-Click Reset to Defaults */}
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50 shadow-xs transition-all cursor-pointer"
            title="Restore all 11 canonical DigiVigee homepage-grade master components"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Reset to Defaults
          </button>

          {/* New Component Button */}
          <button
            type="button"
            onClick={openStudioForNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Master Component
          </button>

          {/* Browse Templates */}
          <Link
            href="/admin/landing-pages/templates"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 shadow-xs transition-colors"
          >
            <Folder className="w-3.5 h-3.5 text-zinc-500" />
            Templates
          </Link>
        </div>
      </div>

      {/* Top Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Total Master Blocks
          </div>
          <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
            {components.length}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Canonical Homepage Ready
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
            11 Blocks
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Categories Available
          </div>
          <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
            {CATEGORIES.length - 1}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Real-Time Sync
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            0ms Active
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl border text-sm animate-in fade-in duration-200 ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
              : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span className="font-semibold">{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search, Sort & Category Filter Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search components by title, category, type, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "category" | "updated")}
                className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none"
              >
                <option value="updated">Recently Updated</option>
                <option value="name">Name (A-Z)</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Showing <strong className="text-zinc-900 dark:text-zinc-200">{filteredComponents.length}</strong> of {components.length}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-bold text-zinc-400 mr-2 uppercase tracking-wider">
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Components Grid */}
      {isLoading ? (
        <div className="py-24 text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-3" />
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Syncing canonical master components...
          </p>
        </div>
      ) : filteredComponents.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs px-4">
          <Layers className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {searchQuery || selectedCategory !== "All"
              ? "No components match your search filters"
              : "No reusable components found"}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mt-1">
            {searchQuery || selectedCategory !== "All"
              ? "Try adjusting your query or resetting category selection."
              : "Click 'Reset to Defaults' to restore the 11 canonical homepage-grade components."}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            {searchQuery || selectedCategory !== "All" ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 cursor-pointer"
              >
                Reset Filters
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restore Homepage Defaults
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((comp) => (
            <div
              key={comp.id}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/50 flex flex-col overflow-hidden transition-all duration-200"
            >
              {/* Miniature Live Render Container */}
              <div
                onClick={() => openStudioForComponent(comp)}
                className="h-48 bg-zinc-950 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 cursor-pointer"
              >
                <div className="scale-[0.52] origin-top-left w-[192%] pointer-events-none select-none opacity-90 group-hover:opacity-100 transition-opacity">
                  <SectionRenderer
                    section={{
                      id: `card-${comp.id}`,
                      type: comp.sectionType,
                      order: 0,
                      isVisible: true,
                      content: comp.sectionContent,
                      styling: comp.sectionStyling,
                    }}
                    isBuilder={false}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Inspect Button on Card */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2.5 py-1 rounded-md bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-100 text-xs font-bold shadow-xs backdrop-blur-sm flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    Live Studio
                  </span>
                </div>
              </div>

              {/* Component Info Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3
                    onClick={() => openStudioForComponent(comp)}
                    className="font-bold text-zinc-900 dark:text-zinc-100 text-base leading-snug hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {comp.name}
                  </h3>
                </div>

                {comp.description && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3.5">
                    {comp.description}
                  </p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                    {comp.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[11px] font-medium">
                    Type: {comp.sectionType}
                  </span>
                  {comp.tags &&
                    comp.tags.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 text-[11px]"
                      >
                        #{t}
                      </span>
                    ))}
                </div>

                {/* Action Bar */}
                <div className="pt-3.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => openStudioForComponent(comp)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Open Live Studio
                  </button>

                  <div className="flex items-center gap-1.5">
                    {/* Copy Name Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyName(comp)}
                      title="Copy Component Title"
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      {copiedId === comp.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Duplicate */}
                    <button
                      type="button"
                      onClick={() => handleDuplicate(comp)}
                      title="Duplicate Component"
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(comp)}
                      title="Delete Component"
                      className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/60 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          FULL SIDE-BY-SIDE LIVE PREVIEW & VISUAL STUDIO (0ms TURANT UPDATE)
         ========================================================================= */}
      {studioActive && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex flex-col overflow-hidden animate-in fade-in duration-200"
        >
          {/* Studio Top Navigation Bar */}
          <div className="h-16 px-4 sm:px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStudioActive(false)}
                className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isCreatingNew ? "Create Master Component" : "Master Component Live Studio"}
                </div>
                <h2 className="text-sm sm:text-base font-black text-zinc-900 dark:text-zinc-100 truncate max-w-xs sm:max-w-md">
                  {draftName || "Untitled Component"}
                </h2>
              </div>
            </div>

            {/* Mobile View Toggle (Controls vs Preview on small screens) */}
            <div className="flex lg:hidden items-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setMobileStudioView("controls")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mobileStudioView === "controls"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500"
                }`}
              >
                Controls
              </button>
              <button
                type="button"
                onClick={() => setMobileStudioView("preview")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mobileStudioView === "preview"
                    ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                    : "text-zinc-500"
                }`}
              >
                Live Stage
              </button>
            </div>

            {/* Desktop Viewport Device Switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setStudioViewport("desktop")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  studioViewport === "desktop"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                type="button"
                onClick={() => setStudioViewport("tablet")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  studioViewport === "tablet"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                Tablet
              </button>
              <button
                type="button"
                onClick={() => setStudioViewport("mobile")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  studioViewport === "mobile"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
            </div>

            {/* Studio Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setStudioActive(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveStudio}
                disabled={isSavingDraft}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                {isSavingDraft ? "Saving..." : "Save Master Block"}
              </button>
            </div>
          </div>

          {/* Studio Body: Split Screen */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* LEFT PANE: 10-Year-Old Child Simple Controls */}
            <div
              className={`w-full lg:w-[460px] xl:w-[500px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 overflow-hidden ${
                mobileStudioView === "preview" ? "hidden lg:flex" : "flex"
              }`}
            >
              {/* Studio Left Tabs */}
              <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-2 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setStudioTab("content")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    studioTab === "content"
                      ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-zinc-200/60 dark:border-zinc-700"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Content (0ms Live)
                </button>
                <button
                  type="button"
                  onClick={() => setStudioTab("styling")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    studioTab === "styling"
                      ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-zinc-200/60 dark:border-zinc-700"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  Colors & Canvas
                </button>
                <button
                  type="button"
                  onClick={() => setStudioTab("metadata")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    studioTab === "metadata"
                      ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-zinc-200/60 dark:border-zinc-700"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Metadata
                </button>
              </div>

              {/* Controls Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* TAB 1: CONTENT EDITING */}
                {studioTab === "content" && (
                  <div className="space-y-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>0ms Live Connection Active:</strong> Any text or item you type below reflects instantly in the right-side stage without page refresh!
                      </div>
                    </div>

                    {/* Section Type Selector for New Components */}
                    {isCreatingNew && (
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                          Section Blueprint Type
                        </label>
                        <select
                          value={draftSectionType}
                          onChange={(e) => setDraftSectionType(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs font-semibold bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="hero">Hero + Enterprise Logo Ribbon</option>
                          <option value="features">Bento Feature Pillars Grid</option>
                          <option value="services">Capabilities & Services Suite</option>
                          <option value="statistics">Proof Statistics Counter</option>
                          <option value="testimonials">Social Proof Testimonial Wall</option>
                          <option value="portfolio">Enterprise Case Studies</option>
                          <option value="pricing">3-Tier Retainer Pricing Table</option>
                          <option value="faq">FAQ Objection Clearance</option>
                          <option value="form">Lead Capture Form Card</option>
                          <option value="cta">Final Conversion Banner</option>
                          <option value="process">4-Step Delivery Process</option>
                        </select>
                      </div>
                    )}

                    {/* 1. Eyebrow Tag */}
                    {(draftSectionType === "hero" || draftContent.eyebrow !== undefined) && (
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                          Eyebrow Badge
                        </label>
                        <input
                          type="text"
                          value={String(draftContent.eyebrow || "")}
                          onChange={(e) => updateDraftContentField("eyebrow", e.target.value)}
                          placeholder="e.g. Enterprise Agency Growth OS"
                          className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    )}

                    {/* 2. Main Headline */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        Main Headline / Section Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={String(
                          draftContent.headline ||
                            draftContent.sectionTitle ||
                            draftContent.heading ||
                            ""
                        )}
                        onChange={(e) => {
                          if (
                            draftSectionType === "hero" ||
                            draftSectionType === "cta" ||
                            draftSectionType === "form"
                          ) {
                            updateDraftContentField("headline", e.target.value);
                          } else if (
                            draftSectionType === "process" ||
                            draftSectionType === "client-logos"
                          ) {
                            updateDraftContentField("heading", e.target.value);
                          } else {
                            updateDraftContentField("sectionTitle", e.target.value);
                          }
                        }}
                        placeholder="e.g. Scale 10x Client Retainers. Burn Out 0 Teams."
                        className="w-full px-3.5 py-2 text-xs font-bold bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* 3. Description / Subtitle */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        Description / Subheadline
                      </label>
                      <textarea
                        rows={3}
                        value={String(
                          draftContent.description ||
                            draftContent.sectionSubtitle ||
                            draftContent.subheadline ||
                            draftContent.quote ||
                            ""
                        )}
                        onChange={(e) => {
                          if (draftSectionType === "hero" || draftSectionType === "countdown") {
                            updateDraftContentField("description", e.target.value);
                          } else if (draftSectionType === "cta" || draftSectionType === "form") {
                            updateDraftContentField("subheadline", e.target.value);
                          } else if (draftSectionType === "testimonials") {
                            updateDraftContentField("quote", e.target.value);
                          } else {
                            updateDraftContentField("sectionSubtitle", e.target.value);
                          }
                        }}
                        placeholder="Provide compelling secondary copy that reinforces the core value proposition."
                        className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* 4. Hero Specific Buttons & Logos */}
                    {draftSectionType === "hero" && (
                      <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                              Primary CTA Label
                            </label>
                            <input
                              type="text"
                              value={String(draftContent.primaryCtaLabel || "")}
                              onChange={(e) =>
                                updateDraftContentField("primaryCtaLabel", e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                              Primary CTA Target
                            </label>
                            <input
                              type="text"
                              value={String(draftContent.primaryCtaTarget || "")}
                              onChange={(e) =>
                                updateDraftContentField("primaryCtaTarget", e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                              Secondary CTA Label
                            </label>
                            <input
                              type="text"
                              value={String(draftContent.secondaryCtaLabel || "")}
                              onChange={(e) =>
                                updateDraftContentField("secondaryCtaLabel", e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                              Secondary CTA Target
                            </label>
                            <input
                              type="text"
                              value={String(draftContent.secondaryCtaTarget || "")}
                              onChange={(e) =>
                                updateDraftContentField("secondaryCtaTarget", e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                            Enterprise Logos Ribbon Title
                          </label>
                          <input
                            type="text"
                            value={String(draftContent.logosHeading || "")}
                            onChange={(e) =>
                              updateDraftContentField("logosHeading", e.target.value)
                            }
                            placeholder="e.g. Trusted by 2,350+ Scaling Agencies & Enterprises"
                            className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                          />
                        </div>
                      </div>
                    )}

                    {/* 5. Features / Bento List Items Editor */}
                    {draftSectionType === "features" && (
                      <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                            Pillar Feature Cards
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Array.isArray(draftContent.features)
                                ? [...(draftContent.features as Array<{ title: string; desc: string }>)]
                                : [];
                              updateDraftContentField("features", [
                                ...current,
                                { title: "New Feature Pillar", desc: "Description of the feature pillar." },
                              ]);
                            }}
                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Feature
                          </button>
                        </div>

                        {(Array.isArray(draftContent.features)
                          ? (draftContent.features as Array<{ title: string; desc: string }>)
                          : []
                        ).map((feat, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase text-zinc-400">
                                Card #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const list = (draftContent.features as Array<{ title: string; desc: string }>).filter(
                                    (_, i) => i !== idx
                                  );
                                  updateDraftContentField("features", list);
                                }}
                                className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={feat.title || ""}
                              placeholder="Feature Title"
                              onChange={(e) => {
                                const list = [
                                  ...(draftContent.features as Array<{ title: string; desc: string }>),
                                ];
                                list[idx] = { ...list[idx], title: e.target.value };
                                updateDraftContentField("features", list);
                              }}
                              className="w-full px-2.5 py-1.5 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md"
                            />
                            <textarea
                              rows={2}
                              value={feat.desc || ""}
                              placeholder="Feature Description"
                              onChange={(e) => {
                                const list = [
                                  ...(draftContent.features as Array<{ title: string; desc: string }>),
                                ];
                                list[idx] = { ...list[idx], desc: e.target.value };
                                updateDraftContentField("features", list);
                              }}
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 6. Services Suite Items Editor */}
                    {draftSectionType === "services" && (
                      <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                            Service Capabilities
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Array.isArray(draftContent.services)
                                ? [...(draftContent.services as Array<{ icon: string; title: string; desc: string }>)]
                                : [];
                              updateDraftContentField("services", [
                                ...current,
                                { icon: "⚡", title: "New Service Capability", desc: "Service capability description." },
                              ]);
                            }}
                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Service
                          </button>
                        </div>

                        {(Array.isArray(draftContent.services)
                          ? (draftContent.services as Array<{ icon: string; title: string; desc: string }>)
                          : []
                        ).map((srv, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase text-zinc-400">
                                Service #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const list = (draftContent.services as Array<{ icon: string; title: string; desc: string }>).filter(
                                    (_, i) => i !== idx
                                  );
                                  updateDraftContentField("services", list);
                                }}
                                className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={srv.icon || "💼"}
                                onChange={(e) => {
                                  const list = [
                                    ...(draftContent.services as Array<{ icon: string; title: string; desc: string }>),
                                  ];
                                  list[idx] = { ...list[idx], icon: e.target.value };
                                  updateDraftContentField("services", list);
                                }}
                                className="w-10 px-1 py-1.5 text-center text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md"
                              />
                              <input
                                type="text"
                                value={srv.title || ""}
                                placeholder="Service Title"
                                onChange={(e) => {
                                  const list = [
                                    ...(draftContent.services as Array<{ icon: string; title: string; desc: string }>),
                                  ];
                                  list[idx] = { ...list[idx], title: e.target.value };
                                  updateDraftContentField("services", list);
                                }}
                                className="flex-1 px-2.5 py-1.5 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={srv.desc || ""}
                              placeholder="Service Description"
                              onChange={(e) => {
                                const list = [
                                  ...(draftContent.services as Array<{ icon: string; title: string; desc: string }>),
                                ];
                                list[idx] = { ...list[idx], desc: e.target.value };
                                updateDraftContentField("services", list);
                              }}
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 7. Statistics Items Editor */}
                    {draftSectionType === "statistics" && (
                      <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                            Proof Counter Metrics
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Array.isArray(draftContent.stats)
                                ? [...(draftContent.stats as Array<{ value: string; label: string }>)]
                                : [];
                              updateDraftContentField("stats", [
                                ...current,
                                { value: "10x", label: "Scale Lift" },
                              ]);
                            }}
                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Metric
                          </button>
                        </div>

                        {(Array.isArray(draftContent.stats)
                          ? (draftContent.stats as Array<{ value: string; label: string }>)
                          : []
                        ).map((st, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2"
                          >
                            <input
                              type="text"
                              value={st.value || ""}
                              placeholder="e.g. 2,350+"
                              onChange={(e) => {
                                const list = [
                                  ...(draftContent.stats as Array<{ value: string; label: string }>),
                                ];
                                list[idx] = { ...list[idx], value: e.target.value };
                                updateDraftContentField("stats", list);
                              }}
                              className="w-1/3 px-2.5 py-1.5 text-xs font-black text-emerald-600 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md"
                            />
                            <input
                              type="text"
                              value={st.label || ""}
                              placeholder="Metric Label"
                              onChange={(e) => {
                                const list = [
                                  ...(draftContent.stats as Array<{ value: string; label: string }>),
                                ];
                                list[idx] = { ...list[idx], label: e.target.value };
                                updateDraftContentField("stats", list);
                              }}
                              className="flex-1 px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md font-semibold"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const list = (draftContent.stats as Array<{ value: string; label: string }>).filter(
                                  (_, i) => i !== idx
                                );
                                updateDraftContentField("stats", list);
                              }}
                              className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 8. FAQ Items Editor */}
                    {draftSectionType === "faq" && (
                      <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                            FAQ Question Accordions
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Array.isArray(draftContent.items)
                                ? [...(draftContent.items as Array<{ question: string; answer: string }>)]
                                : [];
                              updateDraftContentField("items", [
                                ...current,
                                { question: "New FAQ Question?", answer: "Detailed verified answer." },
                              ]);
                            }}
                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add FAQ
                          </button>
                        </div>

                        {(Array.isArray(draftContent.items)
                          ? (draftContent.items as Array<{ question: string; answer: string }>)
                          : []
                        ).map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase text-zinc-400">
                                Question #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const list = (draftContent.items as Array<{ question: string; answer: string }>).filter(
                                    (_, i) => i !== idx
                                  );
                                  updateDraftContentField("items", list);
                                }}
                                className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={item.question || ""}
                              placeholder="Question"
                              onChange={(e) => {
                                const list = [
                                  ...(draftContent.items as Array<{ question: string; answer: string }>),
                                ];
                                list[idx] = { ...list[idx], question: e.target.value };
                                updateDraftContentField("items", list);
                              }}
                              className="w-full px-2.5 py-1.5 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md"
                            />
                            <textarea
                              rows={2}
                              value={item.answer || ""}
                              placeholder="Answer"
                              onChange={(e) => {
                                const list = [
                                  ...(draftContent.items as Array<{ question: string; answer: string }>),
                                ];
                                list[idx] = { ...list[idx], answer: e.target.value };
                                updateDraftContentField("items", list);
                              }}
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 9. Testimonial Author Attribution */}
                    {draftSectionType === "testimonials" && (
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                            Executive Author
                          </label>
                          <input
                            type="text"
                            value={String(draftContent.author || "")}
                            onChange={(e) => updateDraftContentField("author", e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                            Role / Company
                          </label>
                          <input
                            type="text"
                            value={String(draftContent.role || "")}
                            onChange={(e) => updateDraftContentField("role", e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                          />
                        </div>
                      </div>
                    )}

                    {/* 10. CTA Button Target */}
                    {draftSectionType === "cta" && (
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                            Button Label
                          </label>
                          <input
                            type="text"
                            value={String(draftContent.buttonLabel || "")}
                            onChange={(e) =>
                              updateDraftContentField("buttonLabel", e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                            Button Target
                          </label>
                          <input
                            type="text"
                            value={String(draftContent.buttonTarget || "")}
                            onChange={(e) =>
                              updateDraftContentField("buttonTarget", e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: STYLING & COLORS */}
                {studioTab === "styling" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                        Canvas & Background Presets
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {COLOR_SWATCHES.map((swatch) => {
                          const isCurrent =
                            (draftStyling.backgroundColor || "#ffffff") === swatch.bg;
                          return (
                            <button
                              key={swatch.name}
                              type="button"
                              onClick={() => {
                                updateDraftStylingField("backgroundColor", swatch.bg);
                                updateDraftStylingField("textColor", swatch.text);
                              }}
                              className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                                isCurrent
                                  ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                                  : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                              }`}
                            >
                              <div
                                className="w-5 h-5 rounded-md border border-zinc-300 dark:border-zinc-600 shrink-0"
                                style={{ background: swatch.bg }}
                              />
                              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                                {swatch.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Hex Color */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                        Custom Background Color / Hex
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={
                            draftStyling.backgroundColor?.startsWith("#")
                              ? draftStyling.backgroundColor
                              : "#0f172a"
                          }
                          onChange={(e) =>
                            updateDraftStylingField("backgroundColor", e.target.value)
                          }
                          className="w-9 h-9 rounded-lg border border-zinc-300 cursor-pointer p-0.5 bg-transparent"
                        />
                        <input
                          type="text"
                          value={draftStyling.backgroundColor || ""}
                          onChange={(e) =>
                            updateDraftStylingField("backgroundColor", e.target.value)
                          }
                          placeholder="#0f172a or linear-gradient(...)"
                          className="flex-1 px-3 py-2 text-xs font-mono bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    {/* Text Color Toggle */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                        Text Color Contrast
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => updateDraftStylingField("textColor", "#ffffff")}
                          className={`py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                            draftStyling.textColor === "#ffffff"
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                              : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          Light Text (For Dark BG)
                        </button>
                        <button
                          type="button"
                          onClick={() => updateDraftStylingField("textColor", "#0f172a")}
                          className={`py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                            draftStyling.textColor === "#0f172a"
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                              : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          Dark Text (For Light BG)
                        </button>
                      </div>
                    </div>

                    {/* Vertical Padding */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                        Vertical Spacing (Padding)
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(["sm", "md", "lg", "xl"] as const).map((pad) => (
                          <button
                            key={pad}
                            type="button"
                            onClick={() => updateDraftStylingField("paddingY", pad)}
                            className={`py-2 text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                              (draftStyling.paddingY || "xl") === pad
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                                : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                            }`}
                          >
                            {pad}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: METADATA */}
                {studioTab === "metadata" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        Component Master Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        placeholder="e.g. Enterprise Agency Hero Banner"
                        className="w-full px-3.5 py-2 text-xs font-bold bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        Category Classification <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={draftCategory}
                        onChange={(e) => setDraftCategory(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs font-semibold bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        Search Tags (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={draftTags}
                        onChange={(e) => setDraftTags(e.target.value)}
                        placeholder="e.g. hero, enterprise, high-converting"
                        className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        Internal Documentation / Description
                      </label>
                      <textarea
                        rows={3}
                        value={draftDescription}
                        onChange={(e) => setDraftDescription(e.target.value)}
                        placeholder="Explain where this block converts best and how it should be utilized across landing funnels."
                        className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Save Footer */}
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStudioActive(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleSaveStudio}
                  disabled={isSavingDraft}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSavingDraft ? "Saving..." : "Save Master Block"}
                </button>
              </div>
            </div>

            {/* RIGHT PANE: 0ms REAL-TIME LIVE PREVIEW STAGE */}
            <div
              className={`flex-1 bg-zinc-950 p-4 sm:p-6 overflow-y-auto flex-col items-center justify-start ${
                mobileStudioView === "controls" ? "hidden lg:flex" : "flex"
              }`}
            >
              <div
                className={`w-full transition-all duration-300 ${
                  studioViewport === "desktop"
                    ? "max-w-5xl"
                    : studioViewport === "tablet"
                    ? "max-w-[768px] border-x border-zinc-800 shadow-2xl rounded-2xl overflow-hidden bg-white"
                    : "max-w-[390px] border-[10px] border-zinc-800 rounded-[44px] shadow-2xl overflow-hidden bg-white"
                }`}
              >
                {/* Browser Mockup Chrome */}
                <div className="bg-zinc-900 px-4 py-2.5 rounded-t-2xl border border-zinc-800 flex items-center justify-between text-xs text-zinc-400 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950/80 px-4 py-0.5 rounded-full border border-zinc-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    digivigee.com/live-preview/{draftSectionType}
                  </div>
                  <div className="text-[10px] font-bold uppercase text-emerald-400">
                    0ms Live Mirror
                  </div>
                </div>

                {/* The Rendered Section (Immediate 0ms reflect) */}
                <div className="overflow-hidden shadow-2xl border-x border-b border-zinc-800 rounded-b-2xl">
                  <SectionRenderer
                    section={draftSectionForRenderer}
                    isBuilder={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          HIGH-CONTRAST 1-CLICK RESET TO DEFAULTS CONFIRMATION DIALOG
         ========================================================================= */}
      <ConfirmDialog
        isOpen={isResetModalOpen}
        title="Reset All Components to Homepage Defaults?"
        message="This will restore all 11 canonical DigiVigee homepage-grade master components (Hero + Enterprise Logos, Bento Role Pillars, Capabilities Suite, Proof Counter, Testimonial Wall, Case Studies, 3-Tier Pricing, FAQ Accordions, Lead Form Card, Final CTA Banner, and 4-Step Process) with 100% verified real agency data. Any modified master blocks will be safely restored."
        confirmLabel={isResetting ? "Restoring Defaults..." : "Yes, Reset to Defaults"}
        isDestructive={false}
        isLoading={isResetting}
        onConfirm={handleResetToDefaults}
        onClose={() => setIsResetModalOpen(false)}
      />

      {/* =========================================================================
          HIGH-CONTRAST DELETE MASTER COMPONENT CONFIRMATION DIALOG
         ========================================================================= */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Master Component?"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? Any landing pages that already use a copy of this section will remain 100% intact and unaffected.`}
        confirmLabel={isDeleting ? "Deleting..." : "Delete Component"}
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
