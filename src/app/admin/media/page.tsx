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
      setFeedback({ message: "Asset metadata updated successfully!", type: "success" });
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
      setFeedback({ message: "Media asset deleted successfully.", type: "success" });
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
        setFeedback({ message: `"${data.item.name}" uploaded successfully!`, type: "success" });
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
          message: `Restored ${data.count || 37} canonical clinical media assets successfully!`,
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
      icon: <Tag className="w-3.5 h-3.5 text-rose-600" />,
    },
    {
      key: "hero",
      label: `Hero & Banners (${items.filter((i) => getItemCategory(i) === "hero").length})`,
      icon: <Monitor className="w-3.5 h-3.5 text-blue-600" />,
    },
    {
      key: "blog",
      label: `Health Blog (${items.filter((i) => getItemCategory(i) === "blog").length})`,
      icon: <BookOpen className="w-3.5 h-3.5 text-purple-600" />,
    },
    {
      key: "portfolio",
      label: `Clinical Cases (${items.filter((i) => getItemCategory(i) === "portfolio").length})`,
      icon: <Briefcase className="w-3.5 h-3.5 text-amber-600" />,
    },
    {
      key: "team",
      label: `Medical Team (${items.filter((i) => getItemCategory(i) === "team").length})`,
      icon: <Users className="w-3.5 h-3.5 text-teal-600" />,
    },
    {
      key: "awards",
      label: `Hospital Accreditations (${items.filter((i) => getItemCategory(i) === "awards").length})`,
      icon: <Award className="w-3.5 h-3.5 text-rose-600" />,
    },
    {
      key: "showcase",
      label: `Features & Badges (${items.filter((i) => getItemCategory(i) === "showcase").length})`,
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0 shadow-2xs">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                Clinical Media Library
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Media Cloud: Connected & Synced
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage doctor portraits, surgical illustrations, blog infographics, and hospital accreditation assets.
            </p>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            title="Restore all canonical Dr. Noopur Patel practice assets"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reset to Defaults
          </button>
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-all shadow-xs cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Upload New Media
          </button>
        </div>
      </div>

      {/* 2. Bento KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Assets */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Visual Assets</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center">
              <FileImage className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {items.length} Files
            </span>
            <span className="text-xs font-semibold text-emerald-600">100% Real Sync</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-normal">
            Portraits, surgical diagrams, breast health covers & badges.
          </p>
        </div>

        {/* Card 2: Total Storage */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Storage Footprint</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {totalStorageMb} MB
            </span>
            <span className="text-xs font-semibold text-blue-600">WebP Optimized</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-normal">
            High-fidelity compressed medical images for instantaneous loading.
          </p>
        </div>

        {/* Card 3: Alt Text SEO Health */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Alt Text SEO Health</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {seoCompliancePct}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {hasAltCount}/{items.length} Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-normal">
            Accessible descriptions for Google Medical Image indexing.
          </p>
        </div>

        {/* Card 4: Active Placements */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Website Integration</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Live Active</span>
            <span className="text-xs font-semibold text-amber-600">Turant Update</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-normal">
            Referenced in treatments, cases, articles & patient reviews.
          </p>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center justify-between p-4 rounded-xl border shadow-2xs ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
              <span className="font-semibold text-sm">{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="p-1 rounded-md hover:bg-black/5 transition-colors cursor-pointer text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by image name, file name, or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Alt Text Filter */}
          <div className="relative flex-1 md:w-48">
            <select
              value={altFilter}
              onChange={(e) => setAltFilter(e.target.value as "all" | "missing-alt" | "has-alt")}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 cursor-pointer"
            >
              <option value="all">All Alt Status</option>
              <option value="has-alt">Alt Text Ready ({hasAltCount})</option>
              <option value="missing-alt">Missing Alt ({missingAltCount})</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0 border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-400 hover:text-slate-600"
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
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="animate-spin w-8 h-8 border-3 border-rose-600 border-t-transparent rounded-full mb-4"></div>
          <p className="text-sm font-semibold text-slate-600">Connecting to Clinical Media Cloud...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200/80 shadow-2xs rounded-2xl p-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No Media Assets Found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
            {searchQuery || altFilter !== "all" || selectedCategory !== "all"
              ? "Try clearing your search query or selecting a different category."
              : "Upload your first clinical image asset to use across the Dr. Noopur Patel platform."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setAltFilter("all");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
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
                className="group flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer hover:border-rose-300 hover:shadow-md transition-all shadow-2xs"
              >
                {/* Visual Thumbnail */}
                <div className="relative w-full aspect-square bg-slate-50 flex items-center justify-center p-3 overflow-hidden border-b border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.altText || item.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    {item.altText ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-2xs">
                        <CheckCircle2 className="w-2.5 h-2.5" /> ALT
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-2xs">
                        <AlertTriangle className="w-2.5 h-2.5" /> NO ALT
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1 flex-1 bg-white justify-between">
                  <div>
                    <div
                      className="text-xs font-bold text-slate-900 truncate"
                      title={item.name || item.fileName}
                    >
                      {item.name || item.fileName}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                      <span>{formatFileSize(item.fileSize)}</span>
                      <span className="font-mono uppercase text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        {item.mimeType?.replace("image/", "") || "IMG"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(item.url, item.id);
                      }}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                        isCopied
                          ? "bg-rose-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      title="Copy public URL"
                    >
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? "Copied" : "Copy"}</span>
                    </button>

                    <span className="text-[10px] font-semibold text-rose-600 hover:underline">
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
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-5 py-3.5">Asset</th>
                  <th className="px-5 py-3.5">Alt Text</th>
                  <th className="px-5 py-3.5">Size / Type</th>
                  <th className="px-5 py-3.5">Dimensions</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredItems.map((item) => {
                  const isCopied = copiedId === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.url}
                              alt={item.altText || item.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate max-w-[220px]">
                              {item.name || item.fileName}
                            </div>
                            <div className="text-xs font-mono text-slate-400 truncate max-w-[220px]">
                              {item.url}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 max-w-[240px]">
                        {item.altText ? (
                          <div className="text-xs text-slate-700 truncate" title={item.altText}>
                            {item.altText}
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Missing Alt Text
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="text-xs font-semibold text-slate-700">
                          {formatFileSize(item.fileSize)}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase">
                          {item.mimeType?.replace("image/", "")}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-500">
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
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              isCopied
                                ? "bg-rose-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
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
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-rose-600" />
                Upload New Clinical Asset
              </h2>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 flex flex-col gap-5">
              {/* Drop Zone Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center cursor-pointer bg-slate-50 hover:bg-rose-50/30 hover:border-rose-400 transition-all flex flex-col items-center justify-center group"
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
                    <div className="w-32 h-32 rounded-xl bg-white p-2 border border-slate-200 mb-3 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={uploadPreviewUrl} alt="Upload Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">{uploadFile?.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {uploadFile ? formatFileSize(uploadFile.size) : ""} • Click to change file
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-7 h-7 text-rose-600" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">
                      Click to choose an image or drop it here
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Supports PNG, JPG, WebP, SVG &amp; GIF up to 5MB
                    </div>
                  </div>
                )}
              </div>

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Display Title / Asset Name
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Dr. Noopur Patel Practice Logo"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Alt Text input */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Accessible Alt Text (Required for SEO) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={uploadAltText}
                  onChange={(e) => setUploadAltText(e.target.value)}
                  placeholder="Describe what is seen in the image for oncology Google rankings..."
                  required
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 placeholder:text-slate-400"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Clinical SEO Tip: Write a descriptive alt text for accessibility and oncology health search indexing.
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadFile || !uploadAltText.trim() || isUploading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
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
        message={`Are you sure you want to restore the media library to canonical Dr. Noopur Patel practice defaults?\n\nThis will restore all verified clinical assets:\n• Dr. Noopur Patel Brand Logos & Hospital Badges\n• Surgical Hero & Consultation Banners\n• Breast Health Guides & Clinical Blog Covers\n• Oncoplastic Surgical Case Studies & Clinical Outcomes\n• Medical Team & Oncology Care Coordinator Portraits\n• Professional Accreditations & Hospital Affiliation Seals`}
        confirmLabel="Yes, Reset Media Assets"
        isDestructive={false}
        isLoading={isResetting}
      />
    </div>
  );
}
