"use client";

import React, { useState, useEffect, useRef } from "react";
import { MediaItem, MediaUsageReference } from "@/types";
import { MediaCard, MediaDetailsModal } from "@/components/admin";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  Image as ImageIcon,
  Upload,
  Search,
  CheckCircle2,
  XCircle,
  X,
  FileImage,
  AlertTriangle,
  FolderOpen,
  RotateCcw,
  Sparkles,
  Layers,
  HardDrive,
  Copy,
  Check,
  Eye,
  ExternalLink,
  LayoutGrid,
  List,
  Filter,
  Tag,
  Award,
  Users,
  Briefcase,
  BookOpen,
  Monitor,
} from "lucide-react";

type MediaCategory =
  | "all"
  | "logos"
  | "hero"
  | "blog"
  | "portfolio"
  | "team"
  | "awards"
  | "showcase";

export default function AdminMediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>("all");
  const [altFilter, setAltFilter] = useState<"all" | "missing-alt" | "has-alt">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Selected item for details modal
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Quick Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);
  const [uploadAltText, setUploadAltText] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.success && data.items) {
        setItems(data.items);
      } else {
        setFeedback({ message: data.error || "Failed to load media assets.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error loading media library.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  // Update preview URL when uploadFile changes
  useEffect(() => {
    if (!uploadFile) {
      setUploadPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(uploadFile);
    setUploadPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadFile]);

  const handleUpdateMetadata = async (
    id: string,
    metadata: { altText?: string; title?: string; caption?: string }
  ) => {
    const res = await fetch(`/api/admin/media/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata),
    });
    const data = await res.json();
    if (data.success) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                altText: metadata.altText !== undefined ? metadata.altText : item.altText,
                title: metadata.title !== undefined ? metadata.title : item.title,
                caption: metadata.caption !== undefined ? metadata.caption : item.caption,
              }
            : item
        )
      );
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem((prev) =>
          prev
            ? {
                ...prev,
                altText: metadata.altText !== undefined ? metadata.altText : prev.altText,
                title: metadata.title !== undefined ? metadata.title : prev.title,
                caption: metadata.caption !== undefined ? metadata.caption : prev.caption,
              }
            : null
        );
      }
      setFeedback({ message: "✨ Asset metadata updated successfully!", type: "success" });
      setTimeout(() => setFeedback(null), 3000);
    } else {
      throw new Error(data.error || "Update failed");
    }
  };

  const handleDeleteAsset = async (
    id: string,
    force: boolean = false
  ): Promise<{ success: boolean; error?: string; inUseWarning?: MediaUsageReference[] }> => {
    const res = await fetch(`/api/admin/media/${id}?force=${force ? "true" : "false"}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedItem(null);
      setFeedback({ message: "🗑️ Media asset deleted successfully.", type: "success" });
      setTimeout(() => setFeedback(null), 3000);
      return { success: true };
    }
    return data;
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("altText", uploadAltText);
    formData.append("title", uploadTitle || uploadFile.name.replace(/\.[^/.]+$/, ""));

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.item) {
        setItems((prev) => [data.item, ...prev]);
        setShowUploadModal(false);
        setUploadFile(null);
        setUploadAltText("");
        setUploadTitle("");
        setFeedback({ message: `✨ "${data.item.name}" uploaded successfully!`, type: "success" });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Upload failed.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error uploading media.", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        setIsResetConfirmOpen(false);
        await loadMedia();
        setFeedback({
          message: `🔄 Restored ${data.count || 37} canonical DigiVigee media assets successfully!`,
          type: "success",
        });
        setTimeout(() => setFeedback(null), 5000);
      } else {
        setFeedback({ message: data.error || "Failed to reset media library.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error resetting media library.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Classify item category
  const getItemCategory = (item: MediaItem): MediaCategory => {
    const url = item.url.toLowerCase();
    const name = (item.name || "").toLowerCase();
    const fileName = (item.fileName || "").toLowerCase();

    if (url.includes("/awards/") || name.includes("award") || name.includes("badge") || name.includes("seal")) {
      return "awards";
    }
    if (url.includes("/team/") || name.includes("team") || name.includes("profile") || name.includes("portrait")) {
      return "team";
    }
    if (url.includes("/portfolio/") || name.includes("case study") || name.includes("portfolio")) {
      return "portfolio";
    }
    if (url.includes("/blog/") || name.includes("blog") || name.includes("strategy") || name.includes("guide")) {
      return "blog";
    }
    if (url.includes("/showcase/") || name.includes("card") || name.includes("command")) {
      return "showcase";
    }
    if (name.includes("logo") || fileName.includes("logo") || name.includes("symbol") || name.includes("wordmark")) {
      return "logos";
    }
    if (name.includes("hero") || fileName.includes("hero") || fileName.includes("banner") || name.includes("social card")) {
      return "hero";
    }
    return "showcase";
  };

  // Metrics
  const totalStorageBytes = items.reduce((acc, i) => acc + (i.fileSize || 0), 0);
  const totalStorageMb = (totalStorageBytes / (1024 * 1024)).toFixed(1);
  const missingAltCount = items.filter((i) => !i.altText || !i.altText.trim()).length;
  const hasAltCount = items.length - missingAltCount;
  const seoCompliancePct = items.length > 0 ? Math.round((hasAltCount / items.length) * 100) : 100;

  // Filtered items
  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.fileName.toLowerCase().includes(q) ||
      (item.altText && item.altText.toLowerCase().includes(q));

    let matchesAlt = true;
    if (altFilter === "missing-alt") matchesAlt = !item.altText || !item.altText.trim();
    if (altFilter === "has-alt") matchesAlt = Boolean(item.altText && item.altText.trim());

    let matchesCat = true;
    if (selectedCategory !== "all") {
      matchesCat = getItemCategory(item) === selectedCategory;
    }

    return matchesSearch && matchesAlt && matchesCat;
  });

  const categories: { key: MediaCategory; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: `All Media (${items.length})`, icon: <FolderOpen className="w-3.5 h-3.5" /> },
    {
      key: "logos",
      label: `Brand & Logos (${items.filter((i) => getItemCategory(i) === "logos").length})`,
      icon: <Tag className="w-3.5 h-3.5 text-emerald-600" />,
    },
    {
      key: "hero",
      label: `Hero & Banners (${items.filter((i) => getItemCategory(i) === "hero").length})`,
      icon: <Monitor className="w-3.5 h-3.5 text-blue-600" />,
    },
    {
      key: "blog",
      label: `Blog Covers (${items.filter((i) => getItemCategory(i) === "blog").length})`,
      icon: <BookOpen className="w-3.5 h-3.5 text-purple-600" />,
    },
    {
      key: "portfolio",
      label: `Case Studies (${items.filter((i) => getItemCategory(i) === "portfolio").length})`,
      icon: <Briefcase className="w-3.5 h-3.5 text-amber-600" />,
    },
    {
      key: "team",
      label: `Team Photos (${items.filter((i) => getItemCategory(i) === "team").length})`,
      icon: <Users className="w-3.5 h-3.5 text-teal-600" />,
    },
    {
      key: "awards",
      label: `Awards & Badges (${items.filter((i) => getItemCategory(i) === "awards").length})`,
      icon: <Award className="w-3.5 h-3.5 text-rose-600" />,
    },
    {
      key: "showcase",
      label: `Features & Cards (${items.filter((i) => getItemCategory(i) === "showcase").length})`,
      icon: <Layers className="w-3.5 h-3.5 text-indigo-600" />,
    },
  ];

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-16">
      {/* 1. Header Banner */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                Media Library
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                🟢 Live Media Cloud: Connected (Turant Sync)
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Upload, organize, inspect dimensions, and manage visual brand assets with real-time website sync.
            </p>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
            title="Restore all canonical DigiVigee production assets"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
            Reset to Defaults
          </button>
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Upload New Media
          </button>
        </div>
      </div>

      {/* 2. Bento KPI Cards (10-Year-Old Child Friendly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Assets */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Visual Assets</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileImage className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              {items.length} Files
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">100% Real Sync</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            Logos, hero graphics, blog covers &amp; case study visuals.
          </p>
        </div>

        {/* Card 2: Total Storage */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Storage Footprint</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              {totalStorageMb} MB
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Optimized</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            Compressed WebP, PNG &amp; JPG formats for rapid page loads.
          </p>
        </div>

        {/* Card 3: Alt Text SEO Health */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Alt Text SEO Health</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              {seoCompliancePct}%
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {hasAltCount}/{items.length} Ready
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            Accessible descriptions for Google Image Search &amp; screen readers.
          </p>
        </div>

        {/* Card 4: Active Placements */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Website Integration</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Live Active</span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Turant Update</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            Referenced in blogs, portfolio, services, team &amp; testimonials.
          </p>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center justify-between p-4 rounded-xl border ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-900/50 dark:text-emerald-400"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span className="font-medium text-sm">{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Filter and Search Bar */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by image name, file name, or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Alt Text Filter */}
          <div className="relative flex-1 md:w-48">
            <select
              value={altFilter}
              onChange={(e) => setAltFilter(e.target.value as "all" | "missing-alt" | "has-alt")}
              className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Alt Status</option>
              <option value="has-alt">Alt Text Ready ({hasAltCount})</option>
              <option value="missing-alt">Missing Alt ({missingAltCount})</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Media Grid / Table View */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500 dark:text-zinc-400">
          <div className="animate-spin w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-sm font-bold">Connecting to DigiVigee Media Cloud...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl p-8">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            No Media Assets Found
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
            {searchQuery || altFilter !== "all" || selectedCategory !== "all"
              ? "Try clearing your search query or selecting a different category."
              : "Upload your first image asset to use across the DigiVigee platform."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setAltFilter("all");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredItems.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all"
              >
                {/* Visual Thumbnail */}
                <div className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center p-3 overflow-hidden border-b border-zinc-100 dark:border-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.altText || item.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    {item.altText ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                        <CheckCircle2 className="w-2.5 h-2.5" /> ALT
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                        <AlertTriangle className="w-2.5 h-2.5" /> NO ALT
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1 flex-1 bg-white dark:bg-zinc-900 justify-between">
                  <div>
                    <div
                      className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate"
                      title={item.name || item.fileName}
                    >
                      {item.name || item.fileName}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
                      <span>{formatFileSize(item.fileSize)}</span>
                      <span className="font-mono uppercase text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
                        {item.mimeType?.replace("image/", "") || "IMG"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(item.url, item.id);
                      }}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                      title="Copy public URL"
                    >
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? "Copied" : "Copy"}</span>
                    </button>

                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                      Inspect &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-5 py-3.5">Asset</th>
                  <th className="px-5 py-3.5">Alt Text</th>
                  <th className="px-5 py-3.5">Size / Type</th>
                  <th className="px-5 py-3.5">Dimensions</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                {filteredItems.map((item) => {
                  const isCopied = copiedId === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.url}
                              alt={item.altText || item.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[220px]">
                              {item.name || item.fileName}
                            </div>
                            <div className="text-xs font-mono text-zinc-400 truncate max-w-[220px]">
                              {item.url}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 max-w-[240px]">
                        {item.altText ? (
                          <div className="text-xs text-zinc-700 dark:text-zinc-300 truncate" title={item.altText}>
                            {item.altText}
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Missing Alt Text
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          {formatFileSize(item.fileSize)}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase">
                          {item.mimeType?.replace("image/", "")}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-zinc-500 dark:text-zinc-400">
                        {item.width && item.height ? `${item.width} × ${item.height} px` : "—"}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyUrl(item.url, item.id);
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              isCopied
                                ? "bg-emerald-600 text-white"
                                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                            }`}
                          >
                            {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{isCopied ? "Copied" : "Copy"}</span>
                          </button>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Open in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Asset Details Modal */}
      <MediaDetailsModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onUpdateMetadata={handleUpdateMetadata}
        onDeleteAsset={handleDeleteAsset}
      />

      {/* Upload Modal Dialog */}
      {showUploadModal && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-zinc-900/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-600" />
                Upload New Image Asset
              </h2>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 flex flex-col gap-5">
              {/* Drop Zone Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-6 text-center cursor-pointer bg-zinc-50/50 hover:bg-emerald-50/30 dark:bg-zinc-800/30 dark:hover:bg-emerald-950/20 hover:border-emerald-500 transition-all flex flex-col items-center justify-center group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setUploadFile(f);
                    if (f && !uploadTitle) {
                      setUploadTitle(f.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
                    }
                  }}
                  className="hidden"
                />

                {uploadPreviewUrl ? (
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-xl bg-white dark:bg-zinc-800 p-2 border border-zinc-200 dark:border-zinc-700 mb-3 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={uploadPreviewUrl} alt="Upload Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{uploadFile?.name}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {uploadFile ? formatFileSize(uploadFile.size) : ""} • Click to change file
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl shadow-xs flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-7 h-7 text-emerald-600" />
                    </div>
                    <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      Click to choose an image or drop it here
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Supports PNG, JPG, WebP, SVG &amp; GIF up to 5MB
                    </div>
                  </div>
                )}
              </div>

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                  Display Title / Asset Name
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. DigiVigee Brand Icon"
                  className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Alt Text input */}
              <div>
                <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                  Accessible Alt Text (Required for SEO) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={uploadAltText}
                  onChange={(e) => setUploadAltText(e.target.value)}
                  placeholder="Describe what is seen in the image for Google rankings..."
                  required
                  className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-zinc-400 mt-1">
                  10-Year-Old Tip: Write a short sentence describing the picture so Google knows what it is!
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadFile || !uploadAltText.trim() || isUploading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload to Cloud</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetToDefaults}
        title="Reset Media Library to Defaults?"
        message={`Are you sure you want to restore the media library to canonical DigiVigee defaults?\n\nThis will restore all 37 real production assets:\n• DigiVigee Brand Logos & Symbols\n• Homepage Hero & Marketing Banners\n• Blog Strategy Covers & SEO Guides\n• Verified Portfolio Case Studies (Ayush, Kalpvruksh, etc.)\n• Leadership Team Portraits (Vipul, Disha, Hetal, etc.)\n• Industry Awards & Compliance Badges`}
        confirmLabel="Yes, Reset Media Assets"
        isDestructive={false}
        isLoading={isResetting}
      />
    </div>
  );
}
