"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost, BlogStatus } from "@/types";
import { formatDate } from "@/utils/formatters";
import { notifyLiveSync } from "@/lib/sync/clientSync";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  BookOpen,
  Layers,
  TrendingUp,
  Check,
  X,
  AlertCircle,
  FileText,
  UserCheck,
  Image as ImageIcon,
  Zap,
  Filter,
} from "lucide-react";

// Canonical clinical presets for Dr. Noopur Patel Clinic
const PRESET_IMAGES = [
  { label: "Early Screening & Mammography", url: "/images/doctor/assets/service-1.png" },
  { label: "Oncoplastic Breast Surgery", url: "/images/doctor/assets/service-2.png" },
  { label: "Benign Breast Evaluation", url: "/images/doctor/assets/condition-benign.png" },
  { label: "Ductal Assessment", url: "/images/doctor/assets/condition-ductal.png" },
  { label: "Breast Anatomy Normal", url: "/images/doctor/assets/condition-normal.png" },
  { label: "Dr. Noopur Patel Clinical", url: "/images/doctor/assets/hero-doctor.png" },
];

const PRESET_CATEGORIES = [
  "Screening & Early Detection",
  "Oncoplastic Surgery",
  "Breast Cancer Care",
  "Benign Breast Conditions",
  "Survivorship & Recovery",
  "Patient Education & Awareness",
];

const PRESET_AUTHORS = [
  { name: "Dr. Noopur Patel", role: "Breast Cancer Surgeon & Oncoplastic Specialist", avatar: "/images/doctor/assets/hero-doctor.png" },
  { name: "Clinical Oncology Team", role: "Marengo CIMS Hospital", avatar: "/images/doctor/assets/hero-doctor.png" },
];

export default function AdminBlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "published" | "draft">("all");

  // Feedback Toast
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Side-by-Side Live Preview Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<"card" | "article">("card");

  // Live Editor Form State
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "/images/doctor/assets/service-1.png",
    featuredImageAlt: "",
    categoryName: "Screening & Early Detection",
    categoryId: "screening",
    readingTimeMinutes: 5,
    authorName: "Dr. Noopur Patel",
    authorRole: "Breast Cancer Surgeon & Oncoplastic Specialist",
    authorAvatar: "/images/doctor/assets/hero-doctor.png",
    authorBio: "",
    status: "published" as BlogStatus,
    isFeatured: false,
    tagsText: "Early Detection, Mammography, Screening",
  });

  // Reset to Defaults Modal State
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Delete Target Modal State
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Auto-dismiss toast after 4s
  useEffect(() => {
    if (feedback) {
      const t = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  // Load all blog posts from API
  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      } else {
        setFeedback({ message: data.error || "Failed to load blog articles.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminBlog] Load error:", e);
      setFeedback({ message: "Network error loading blog articles.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Quick toggle publish/draft
  const handleTogglePublish = async (post: BlogPost) => {
    const nextStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/blog/${post.id}/publish`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        notifyLiveSync("blogs", post.id);
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: nextStatus } : p))
        );
        setFeedback({
          message: `Article "${post.title.substring(0, 35)}..." status set to ${nextStatus.toUpperCase()}!`,
          type: "success",
        });
      } else {
        setFeedback({ message: data.error || "Failed to toggle status.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminBlog] Toggle publish error:", e);
      setFeedback({ message: "Error updating status.", type: "error" });
    }
  };

  // Open Editor for existing post
  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content || "",
      featuredImage: post.featuredImage || "/images/doctor/assets/service-1.png",
      featuredImageAlt: post.featuredImageAlt || post.title,
      categoryName: post.categoryName || "Screening & Early Detection",
      categoryId: post.categoryId || "screening",
      readingTimeMinutes: post.readingTimeMinutes || 5,
      authorName: post.author?.name || "Dr. Noopur Patel",
      authorRole: post.author?.role || "Breast Cancer Surgeon & Oncoplastic Specialist",
      authorAvatar: post.author?.avatar || "/images/doctor/assets/hero-doctor.png",
      authorBio: post.author?.bio || "",
      status: post.status || "published",
      isFeatured: Boolean(post.isFeatured),
      tagsText: (post.tags || []).join(", "),
    });
    setPreviewMode("card");
    setIsEditorOpen(true);
  };

  // Open Editor for brand new post
  const handleOpenNew = () => {
    setEditingPost(null);
    setFormData({
      id: `blog-${Date.now()}`,
      title: "Understanding Early Signs of Breast Cancer: A Surgeon's Clinical Guide",
      slug: `early-signs-guide-${Date.now().toString().slice(-4)}`,
      excerpt: "A compassionate clinical overview on identifying subtle breast changes, understanding risk profiles, and the vital role of prompt mammographic screening.",
      content: "## Clinical Overview\n\nEarly detection of breast cancer significantly improves treatment outcomes and allows for minimally invasive, breast-conserving surgical options.\n\n### Key Warning Signs\n\n- A painless, firm breast lump or thickening\n- Changes in breast size, contour, or skin dimpling\n- Nipple retraction or unusual discharge\n\n### When to Seek Evaluation\n\nAny persistent breast change lasting more than one menstrual cycle should be evaluated promptly with clinical breast examination and imaging.",
      featuredImage: "/images/doctor/assets/service-1.png",
      featuredImageAlt: "Breast Cancer Early Detection and Clinical Evaluation",
      categoryName: "Screening & Early Detection",
      categoryId: "screening",
      readingTimeMinutes: 5,
      authorName: "Dr. Noopur Patel",
      authorRole: "Breast Cancer Surgeon & Oncoplastic Specialist",
      authorAvatar: "/images/doctor/assets/hero-doctor.png",
      authorBio: "Associate Consultant in Surgical Breast Oncology at Marengo CIMS Hospital, Ahmedabad.",
      status: "published",
      isFeatured: false,
      tagsText: "Early Detection, Mammography, Screening, Breast Care",
    });
    setPreviewMode("card");
    setIsEditorOpen(true);
  };

  // Auto slug generation from title
  const handleTitleChange = (newTitle: string) => {
    setFormData((prev) => {
      const shouldUpdateSlug = !editingPost || prev.slug.startsWith("playbook-");
      return {
        ...prev,
        title: newTitle,
        slug: shouldUpdateSlug
          ? newTitle
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
              .substring(0, 50)
          : prev.slug,
      };
    });
  };

  // Save Post to API (Instant Turant Update)
  const handleSavePost = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) {
      setFeedback({ message: "Article title and URL slug are required.", type: "error" });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        id: formData.id,
        title: formData.title.trim(),
        slug: formData.slug.trim().toLowerCase(),
        excerpt: formData.excerpt.trim(),
        content: formData.content,
        featuredImage: formData.featuredImage,
        featuredImageAlt: formData.featuredImageAlt || formData.title,
        categoryName: formData.categoryName,
        categoryId: formData.categoryId,
        readingTimeMinutes: Number(formData.readingTimeMinutes) || 5,
        author: {
          id: `author-${formData.authorName.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
          name: formData.authorName,
          role: formData.authorRole,
          avatar: formData.authorAvatar,
          bio: formData.authorBio,
        },
        status: formData.status,
        isFeatured: formData.isFeatured,
        tags: formData.tagsText.split(",").map((t) => t.trim()).filter(Boolean),
        seo: {
          title: `${formData.title} | Dr. Noopur Patel Clinical Blog`,
          description: formData.excerpt,
          canonicalUrl: `/blog/${formData.slug.trim()}`,
          ogTitle: formData.title,
          ogDescription: formData.excerpt,
          ogImage: formData.featuredImage,
          keywords: formData.tagsText.split(",").map((t) => t.trim()).filter(Boolean),
        },
      };

      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        notifyLiveSync("blogs", data.id || payload.id);
        setFeedback({
          message: `Article "${formData.title.substring(0, 30)}..." saved live & synchronized!`,
          type: "success",
        });
        setIsEditorOpen(false);
        await loadPosts();
      } else {
        setFeedback({ message: data.error || "Failed to save article.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminBlog] Save error:", e);
      setFeedback({ message: "Network error saving article.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // 1-Click Reset to Defaults
  const handleResetConfirm = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        notifyLiveSync("blogs", "all");
        setFeedback({
          message: "All clinical articles restored to canonical defaults!",
          type: "success",
        });
        setIsResetOpen(false);
        await loadPosts();
      } else {
        setFeedback({ message: data.error || "Failed to reset articles.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminBlog] Reset error:", e);
      setFeedback({ message: "Network error resetting articles.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        notifyLiveSync("blogs", deleteTarget.id);
        setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setFeedback({
          message: `Article "${deleteTarget.title.substring(0, 30)}..." permanently deleted.`,
          type: "success",
        });
        setDeleteTarget(null);
      } else {
        setFeedback({ message: data.error || "Failed to delete article.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminBlog] Delete error:", e);
      setFeedback({ message: "Network error deleting article.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // Metrics calculation
  const totalArticles = posts.length;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const uniqueCategories = useMemo(() => {
    const set = new Set(posts.map((p) => p.categoryName || "Agency OS"));
    return Array.from(set).filter(Boolean);
  }, [posts]);
  const totalReadingTime = posts.reduce((acc, p) => acc + (p.readingTimeMinutes || 5), 0);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.author?.name || "").toLowerCase().includes(q);

      const matchesStatus =
        selectedStatus === "all" || post.status === selectedStatus;

      const matchesCategory =
        selectedCategory === "all" ||
        (post.categoryName || "Agency OS") === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [posts, searchQuery, selectedStatus, selectedCategory]);

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Toast Notification */}
      {feedback && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-bold border backdrop-blur-md ${
              feedback.type === "success"
                ? "bg-emerald-900/90 text-emerald-100 border-emerald-500/40 shadow-emerald-950/20"
                : "bg-rose-900/90 text-rose-100 border-rose-500/40 shadow-rose-950/20"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
            <button
              onClick={() => setFeedback(null)}
              className="ml-2 text-white/70 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Health Insights &amp; Blog CMS
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Synchronized
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Publish and manage breast oncology articles, diagnostic guidance, and patient recovery education.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Reset to Defaults Button */}
          <button
            onClick={() => setIsResetOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
            title="Restore canonical clinical articles with 1 click"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reset Defaults
          </button>

          {/* View on Public Site */}
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-[#D84C70] hover:bg-slate-50 transition-all border border-slate-200 shadow-2xs no-underline"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            View on Site
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          {/* Create New Article */}
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] text-white hover:opacity-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Article
          </button>
        </div>
      </div>

      {/* 4-Card Summary Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Articles</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {totalArticles}
          </div>
          <div className="text-[11px] text-slate-400">Clinical guides &amp; articles</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-bold uppercase tracking-wider">Published Live</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            {publishedCount}
          </div>
          <div className="text-[11px] text-emerald-700/70">
            Active on /blog archive
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-bold uppercase tracking-wider">Categories</span>
            <Layers className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {uniqueCategories.length}
          </div>
          <div className="text-[11px] text-slate-400">Clinical topics</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-purple-600">
            <span className="text-xs font-bold uppercase tracking-wider">Total Read Time</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            ~{totalReadingTime}m
          </div>
          <div className="text-[11px] text-slate-400">Patient education time</div>
        </div>
      </div>

      {/* Filter & Search Bar (Simple & Clean for 10-year-old child) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, slug, excerpt, or author..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            {(["all", "published", "draft"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedStatus === st
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
          <span className="text-zinc-400 font-medium mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Categories ({posts.length})
          </button>
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#008744] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat} ({posts.filter((p) => (p.categoryName || "Clinical Care") === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Main Articles Table / Card Roster */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-500 font-medium">Synchronizing live clinical articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center px-4 space-y-4">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              📚
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No matching clinical articles found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or reset back to default canonical articles.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                {/* Article Info & Thumbnail */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={post.featuredImage || "/images/doctor/assets/service-1.png"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                    {post.isFeatured && (
                      <span className="absolute top-1 left-1 bg-[#D84C70] text-[9px] font-black text-white px-1.5 py-0.5 rounded-md uppercase">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-[#008744] border border-emerald-200/80">
                        {post.categoryName || "Screening & Detection"}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" /> ~{post.readingTimeMinutes || 5} min read
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        /blog/{post.slug}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl">
                      {post.excerpt}
                    </p>

                    {/* Author & Date Footer */}
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                      {post.author?.avatar && (
                        <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-slate-200">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="font-semibold text-slate-700">
                        {post.author?.name || "Dr. Noopur Patel"}
                      </span>
                      <span>•</span>
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Bar */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {/* Status Toggle Switch */}
                  <button
                    onClick={() => handleTogglePublish(post)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                      post.status === "published"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }`}
                    title="Click to toggle between published and draft"
                  >
                    {post.status === "published" ? "✓ Published" : "○ Draft"}
                  </button>

                  {/* Side-by-side Live Edit CTA */}
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                    Live Edit
                  </button>

                  {/* View Live Article Page */}
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-[#D84C70] hover:bg-slate-50 transition-all border border-slate-200 shadow-2xs no-underline"
                    title="Open live public URL"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => setDeleteTarget(post)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                    title="Delete article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SIDE-BY-SIDE LIVE PREVIEW MODAL (10-YEAR-OLD SIMPLICITY & SILICON VALLEY)  */}
      {/* ========================================================================= */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white w-full max-w-7xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D84C70]/10 text-[#D84C70] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>{editingPost ? "Side-by-Side Article Editor" : "Create New Clinical Article"}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-[#008744] uppercase tracking-wider">
                      Live Keystroke Sync: 0ms
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Left: Edit content easily. Right: See your live website card update in real-time.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Mode Selector for Preview */}
                <div className="hidden sm:flex items-center bg-slate-200/70 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setPreviewMode("card")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      previewMode === "card"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600"
                    }`}
                  >
                    Archive Card View
                  </button>
                  <button
                    onClick={() => setPreviewMode("article")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      previewMode === "article"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600"
                    }`}
                  >
                    Article Reader View
                  </button>
                </div>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Two Columns (Left Form, Right Live Preview) */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {/* LEFT COLUMN: Clean & Simple Editor Form */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(94vh-130px)]">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>1. Article Title</span>
                    <span className="text-[10px] text-slate-400 font-normal">Required</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Early Detection of Breast Cancer: Why Timely Screening Saves Lives..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] focus:outline-none"
                  />
                </div>

                {/* Slug & Reading Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                      2. URL Slug (/blog/[slug])
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                        }))
                      }
                      placeholder="e.g. early-detection-of-breast-cancer"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-900 focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                      Read Time (min)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={formData.readingTimeMinutes}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          readingTimeMinutes: parseInt(e.target.value) || 5,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                      3. Clinical Category
                    </label>
                    <select
                      value={formData.categoryName}
                      onChange={(e) => {
                        const val = e.target.value;
                        const id = val.toLowerCase().replace(/[^a-z0-9]/g, "-");
                        setFormData((prev) => ({ ...prev, categoryName: val, categoryId: id }));
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] focus:outline-none"
                    >
                      {PRESET_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                      Publication Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as BlogStatus,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] focus:outline-none"
                    >
                      <option value="published">🟢 Published Live (Visible on /blog)</option>
                      <option value="draft">🟡 Draft (Hidden from /blog)</option>
                    </select>
                  </div>
                </div>

                {/* Excerpt / Summary */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>4. Excerpt / Subtitle Summary</span>
                    <span className="text-[10px] text-slate-400 font-normal">Patient guide &amp; SEO summary</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief clinical description of the topic and key takeaways for patients..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Author Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                    5. Author &amp; Specialist
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PRESET_AUTHORS.map((aut) => {
                      const isSelected = formData.authorName === aut.name;
                      return (
                        <button
                          key={aut.name}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              authorName: aut.name,
                              authorRole: aut.role,
                              authorAvatar: aut.avatar,
                            }))
                          }
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-rose-50 border-[#D84C70] ring-1 ring-[#D84C70]"
                              : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-slate-200">
                            <Image src={aut.avatar} alt={aut.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-bold text-slate-900 truncate">
                              {aut.name}
                            </div>
                            <div className="text-[9px] text-slate-500 truncate">{aut.role}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Image Quick-Picks */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>6. Cover Image Visual</span>
                    <span className="text-[10px] text-slate-400 font-normal">1-click clinical photos</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {PRESET_IMAGES.map((img) => {
                      const isSelected = formData.featuredImage === img.url;
                      return (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, featuredImage: img.url }))}
                          className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#D84C70] ring-2 ring-[#D84C70]/30"
                              : "border-slate-200 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image src={img.url} alt={img.label} fill className="object-cover" sizes="80px" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#D84C70]/25 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white drop-shadow" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="Or enter custom image URL path..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-600 focus:outline-none focus:border-[#D84C70]"
                  />
                </div>

                {/* Content / Markdown Body */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>7. Clinical Article Content (Markdown)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Supports ## headings, bullets, highlights</span>
                  </label>
                  <textarea
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="## Clinical Overview\n\nExplain the diagnostic pathway, surgical options, and patient care guidance here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-900 focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Real-Time Live Preview Stage */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/70 border-l border-slate-200 flex flex-col justify-start space-y-4 overflow-y-auto max-h-[calc(94vh-130px)] sticky top-0">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Live Public Card Preview
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    /blog/{formData.slug || "slug"}
                  </span>
                </div>

                {/* REPLICA OF THE PUBLIC BLOG CARD */}
                {previewMode === "card" ? (
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between text-left transition-all max-w-md mx-auto w-full">
                    <div>
                      {/* Visual Media Header */}
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-200">
                        <Image
                          src={formData.featuredImage || "/images/showcase/collaborate_keynote.jpg"}
                          alt={formData.title || "Preview"}
                          fill
                          className="object-cover"
                          sizes="400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-slate-800 uppercase tracking-wider border border-slate-200 shadow-2xs">
                            {formData.categoryName || "Breast Oncology"}
                          </span>
                        </div>
                        {formData.status === "draft" && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                              Draft Preview
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Metadata Strip */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          Today
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          ~{formData.readingTimeMinutes || 5} min read
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug mb-3 hover:text-[#D84C70] transition-colors">
                        {formData.title || "Clinical Article Title"}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-5 font-normal">
                        {formData.excerpt || "Enter an excerpt to see how this summary appears to patients and visitors on the blog archive..."}
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                          <Image
                            src={formData.authorAvatar || "/images/team/dr-noopur-patel.png"}
                            alt={formData.authorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                            <span>{formData.authorName || "Dr. Noopur Patel"}</span>
                            <CheckCircle2 className="w-3 h-3 text-[#D84C70]" />
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {formData.authorRole || "Breast Cancer Surgeon"}
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-bold text-[#D84C70] group-hover:translate-x-0.5 transition-transform">
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* SINGLE ARTICLE HEADER PREVIEW */
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-left max-w-md mx-auto w-full">
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 text-[#D84C70] text-[10px] font-bold uppercase tracking-wider border border-rose-200">
                      {formData.categoryName}
                    </span>
                    <h2 className="text-lg font-black text-slate-900 leading-snug">
                      {formData.title}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>By {formData.authorName}</span>
                      <span>•</span>
                      <span>{formData.readingTimeMinutes}m read</span>
                    </div>
                    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-100">
                      <Image
                        src={formData.featuredImage}
                        alt="Article hero"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3 font-mono whitespace-pre-wrap line-clamp-6">
                      {formData.content}
                    </div>
                  </div>
                )}

                <div className="text-center pt-2">
                  <p className="text-[11px] text-slate-400">
                    Edits saved here reflect directly on the patient-facing health portal instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer Bar */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="text-xs text-slate-500 font-medium">
                URL: <span className="font-mono text-slate-700">/blog/{formData.slug}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSavePost}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D84C70] to-[#C23B5E] text-white hover:brightness-105 transition-all shadow-md shadow-rose-900/10 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving & Syncing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save &amp; Publish Article
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1-CLICK RESET TO DEFAULTS CONFIRMATION MODAL                              */}
      {/* ========================================================================= */}
      {isResetOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                Restore Canonical Health Articles?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                This will reset all oncology health awareness articles by Dr. Noopur Patel back to clinical defaults.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setIsResetOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetConfirm}
                disabled={isResetting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isResetting ? "Restoring..." : "Yes, Reset to Defaults"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL                                                 */}
      {/* ========================================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                Delete Health Article?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <span className="font-bold text-slate-800">
                  &quot;{deleteTarget.title}&quot;
                </span>
                ? This will remove it from the patient website.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
