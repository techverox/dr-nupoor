"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { InstagramPost, InstagramFetchResult } from "@/types/instagram";
import { notifyLiveSync, subscribeLiveSync } from "@/lib/sync/clientSync";
import { InstagramIcon } from "@/components/doctor/SocialIcons";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Trash2,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  RotateCcw,
  Link as LinkIcon,
  Video,
  AlertCircle,
  X,
  Play,
} from "lucide-react";

export default function AdminInstagramPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // New Reel Quick-Add Form State
  const [inputUrl, setInputUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState<InstagramFetchResult | null>(null);
  const [customTitle, setCustomTitle] = useState("");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Edit Modal State
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Drag and Drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Reset Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Video Preview Modal
  const [previewPost, setPreviewPost] = useState<InstagramPost | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  }, []);

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/instagram");
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setPosts(data.items.sort((a: InstagramPost, b: InstagramPost) => (a.order || 0) - (b.order || 0)));
      }
    } catch {
      showToast("Unable to load Instagram showcase data.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadPosts();
    const unsubscribe = subscribeLiveSync((event) => {
      if (!event.collection || event.collection === "instagramPosts") {
        loadPosts();
      }
    });
    return () => unsubscribe();
  }, [loadPosts]);

  // Handle Auto-Fetch from URL
  const handleAutoFetch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanUrl = inputUrl.trim();
    if (!cleanUrl) {
      showToast("Please paste an Instagram post or reel link.", "error");
      return;
    }

    setIsFetching(true);
    setFetchedData(null);

    try {
      const res = await fetch("/api/admin/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetch", url: cleanUrl }),
      });
      const data: InstagramFetchResult = await res.json();

      if (data.success) {
        setFetchedData(data);
        setCustomTitle(data.title || "Breast Awareness Reel");
        setCustomImageUrl(data.imageUrl || "/images/doctor/assets/insta-1.png");
        showToast("Instagram reel details fetched successfully!");
      } else {
        showToast(data.error || "Could not fetch details. You can enter them manually.", "error");
      }
    } catch {
      showToast("Network error while contacting Instagram. You can type title manually.", "error");
    } finally {
      setIsFetching(false);
    }
  };

  // Add the Fetched / Configured Reel to the Showcase
  const handleAddPost = async () => {
    if (!inputUrl.trim()) {
      showToast("Instagram link is required.", "error");
      return;
    }

    setIsAdding(true);
    try {
      const newOrder = posts.length + 1;
      const res = await fetch("/api/admin/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: inputUrl.trim(),
          title: customTitle.trim() || "Breast Health Awareness",
          imageUrl: customImageUrl.trim() || "/images/doctor/assets/insta-1.png",
          shortcode: fetchedData?.shortcode || "",
          embedUrl: fetchedData?.embedUrl || "",
          order: newOrder,
          isActive: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("Reel added to showcase! It is now live on the website.");
        setInputUrl("");
        setFetchedData(null);
        setCustomTitle("");
        setCustomImageUrl("");
        await loadPosts();
        notifyLiveSync("instagramPosts", data.id, "CMS_MUTATION");
      } else {
        showToast(data.error || "Failed to add reel.", "error");
      }
    } catch {
      showToast("Failed to save reel.", "error");
    } finally {
      setIsAdding(false);
    }
  };

  // Save Edit Post
  const handleSaveEdit = async () => {
    if (!editingPost) return;
    setIsSavingEdit(true);
    try {
      const res = await fetch("/api/admin/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPost.id,
          title: editTitle.trim(),
          imageUrl: editImageUrl.trim(),
          url: editUrl.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Reel details updated successfully.");
        setEditingPost(null);
        await loadPosts();
        notifyLiveSync("instagramPosts", editingPost.id, "CMS_MUTATION");
      } else {
        showToast(data.error || "Failed to update.", "error");
      }
    } catch {
      showToast("Failed to update reel.", "error");
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Toggle Active/Inactive
  const handleToggleActive = async (post: InstagramPost) => {
    const nextState = !post.isActive;
    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, isActive: nextState } : p))
    );

    try {
      const res = await fetch("/api/admin/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleActive", id: post.id, isActive: nextState }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(nextState ? "Reel is now visible on website." : "Reel is hidden from website.");
        notifyLiveSync("instagramPosts", post.id, "CMS_MUTATION");
      } else {
        await loadPosts();
      }
    } catch {
      await loadPosts();
    }
  };

  // Delete Post
  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}" from the showcase?`)) return;

    try {
      const res = await fetch(`/api/admin/instagram?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("Reel removed from showcase.");
        await loadPosts();
        notifyLiveSync("instagramPosts", id, "CMS_MUTATION");
      } else {
        showToast(data.error || "Failed to delete.", "error");
      }
    } catch {
      showToast("Failed to delete reel.", "error");
    }
  };

  // Move Up / Move Down buttons for 100% simple ordering
  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= posts.length) return;

    const newPosts = [...posts];
    const [moved] = newPosts.splice(index, 1);
    newPosts.splice(targetIndex, 0, moved);

    // Update order numbers locally
    const reordered = newPosts.map((p, idx) => ({ ...p, order: idx + 1 }));
    setPosts(reordered);

    // Save to API
    const orderedIds = reordered.map((p) => p.id);
    try {
      await fetch("/api/admin/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", orderedIds }),
      });
      notifyLiveSync("instagramPosts", "all", "CMS_MUTATION");
      showToast("Rank updated successfully!");
    } catch {
      await loadPosts();
    }
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newPosts = [...posts];
    const [moved] = newPosts.splice(draggedIndex, 1);
    newPosts.splice(dropIndex, 0, moved);

    const reordered = newPosts.map((p, idx) => ({ ...p, order: idx + 1 }));
    setPosts(reordered);
    setDraggedIndex(null);

    const orderedIds = reordered.map((p) => p.id);
    try {
      await fetch("/api/admin/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", orderedIds }),
      });
      notifyLiveSync("instagramPosts", "all", "CMS_MUTATION");
      showToast("Order saved via drag & drop!");
    } catch {
      await loadPosts();
    }
  };

  // Reset to Defaults
  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Reset to default 5 clinical awareness reels successfully.");
        setIsResetConfirmOpen(false);
        await loadPosts();
        notifyLiveSync("instagramPosts", "all", "CMS_MUTATION");
      } else {
        showToast(data.error || "Failed to reset.", "error");
      }
    } catch {
      showToast("Failed to reset showcase.", "error");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Toast Alert */}
      {feedback && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-sm font-semibold transition-all animate-in slide-in-from-top-2 ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-rose-50 text-rose-900 border-rose-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F4] text-[#88213B] text-xs font-bold uppercase tracking-wider border border-[#F5CAD5] mb-2">
            <InstagramIcon className="w-3.5 h-3.5 text-[#D84C70]" />
            Instagram Feed Manager
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Instagram Awareness &amp; Reels
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage the &quot;Latest From Instagram&quot; showcase section on the homepage. Add reels via link, auto-fetch cover images, and reorder ranks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset to Defaults</span>
          </button>
          <a
            href="/#instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Feed</span>
          </a>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: QUICK ADD REEL BY LINK (Super Simple & Intuitive)
          ========================================================================= */}
      <div className="bg-gradient-to-br from-[#FFF5F7] via-white to-[#FDF2F4] border border-[#F5CAD5] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-rose-800 text-sm font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#D84C70]" />
            1-Click Add Reel from Link
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2">
            Paste Instagram Reel or Post Link
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Simply copy any Reel URL from Instagram and paste it here. Our system will automatically extract the cover photo and topic!
          </p>

          <form onSubmit={handleAutoFetch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/C-xyz123/ or https://www.instagram.com/p/..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#F0D5DC] bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D84C70] focus:border-transparent shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isFetching || !inputUrl.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#88213B] hover:bg-[#731930] disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-[#88213B]/15 transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                {isFetching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Fetching Details...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Auto-Fetch Details</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Live Preview Card after Fetching */}
          {fetchedData && (
            <div className="mt-6 pt-6 border-t border-[#F5CAD5]/60 animate-in fade-in slide-in-from-top-3">
              <div className="bg-white rounded-2xl border border-[#F0D5DC] p-5 shadow-xs">
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Reel Detected (Shortcode: {fetchedData.shortcode})
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Thumbnail Preview */}
                  <div className="sm:col-span-4 relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs group">
                    <Image
                      src={customImageUrl || fetchedData.imageUrl || "/images/doctor/assets/insta-1.png"}
                      alt="Cover Preview"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[11px] font-bold text-white bg-slate-950/70 px-2.5 py-1 rounded-md">
                        Preview Thumbnail
                      </span>
                    </div>
                  </div>

                  {/* Form Fields to tweak */}
                  <div className="sm:col-span-8 space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Topic / Title (Displayed on Website Card):
                      </label>
                      <input
                        type="text"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        placeholder="e.g. Early Signs of Breast Cancer"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#D84C70]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Cover Image URL (Auto-fetched or custom):
                      </label>
                      <input
                        type="text"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        placeholder="/images/doctor/assets/insta-1.png"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#D84C70]"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleAddPost}
                        disabled={isAdding}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                      >
                        {isAdding ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Adding to Showcase...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Homepage Showcase</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setFetchedData(null)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: MANAGE REELS & ORDER (Drag & Drop + Up/Down for 10-yr-old simplicity)
          ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Showcase Reels ({posts.length} Total, {posts.filter((p) => p.isActive).length} Active)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              The top 5 active reels will be shown prominently on the homepage. Use the <strong>↑ Move Up</strong> / <strong>↓ Move Down</strong> buttons or drag cards to reorder ranks!
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Rank 1 is First on Homepage</span>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#D84C70]" />
            <span className="text-sm">Loading showcase reels...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Video className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="font-semibold">No reels in showcase yet.</p>
            <p className="text-xs text-slate-400 mt-1">Paste an Instagram link above to add your first reel!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post, index) => {
              const isFirst = index === 0;
              const isLast = index === posts.length - 1;
              const isRankedTop5 = index < 5;

              return (
                <div
                  key={post.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                    draggedIndex === index
                      ? "opacity-50 border-[#D84C70] bg-[#FFF5F7]"
                      : post.isActive
                      ? "bg-white border-slate-200 hover:border-[#D84C70]/60 hover:shadow-xs"
                      : "bg-slate-50 border-slate-200 opacity-60"
                  }`}
                >
                  {/* Left: Drag Handle & Rank Badge */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      title="Drag to reorder"
                      className="cursor-grab active:cursor-grabbing text-slate-300 group-hover:text-slate-500 transition-colors p-1"
                    >
                      <GripVertical className="w-5 h-5" />
                    </button>

                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                        isRankedTop5 && post.isActive
                          ? "bg-[#88213B] text-white border-[#88213B] shadow-xs"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                      title={`Rank ${index + 1}`}
                    >
                      #{index + 1}
                    </div>

                    {/* Thumbnail */}
                    <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <Image
                        src={post.imageUrl || "/images/doctor/assets/insta-1.png"}
                        alt={post.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Title & Details */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-slate-400 font-mono">
                          ID: {post.shortcode || post.id}
                        </span>
                        {isRankedTop5 && post.isActive && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-md">
                            Homepage Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick Action Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Rank Mover Buttons (↑ / ↓ for mobile & fast click) */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => handleMove(index, "up")}
                        disabled={isFirst}
                        title="Move Up in Rank"
                        className="p-1.5 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(index, "down")}
                        disabled={isLast}
                        title="Move Down in Rank"
                        className="p-1.5 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Preview Video / Reel Modal Trigger */}
                    <button
                      type="button"
                      onClick={() => setPreviewPost(post)}
                      title="Preview in Modal"
                      className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                    >
                      <Play className="w-4 h-4 text-[#D84C70]" />
                    </button>

                    {/* External Link */}
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in Instagram"
                      className="p-2 rounded-xl text-slate-600 hover:text-[#D84C70] hover:bg-slate-100 border border-slate-200 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    {/* Visibility Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleActive(post)}
                      title={post.isActive ? "Hide from website" : "Show on website"}
                      className={`p-2 rounded-xl border transition-colors ${
                        post.isActive
                          ? "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                          : "text-slate-400 bg-slate-100 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {post.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPost(post);
                        setEditTitle(post.title);
                        setEditImageUrl(post.imageUrl);
                        setEditUrl(post.url);
                      }}
                      title="Edit Title / Image"
                      className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleDeletePost(post.id, post.title)}
                      title="Delete Reel"
                      className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          SECTION 3: LIVE HOMEPAGE PREVIEW (Visual Confirmation for Admin)
          ========================================================================= */}
      <div className="bg-[#FFF8F9]/70 border border-[#F5D6DE] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-[#88213B] uppercase tracking-wider mb-1">
              Live Preview
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">
              How Visitors See This on Homepage
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-[#F5CAD5]">
            Updates automatically with your changes
          </span>
        </div>

        {/* 5-Column Grid exactly like Homepage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {posts
            .filter((p) => p.isActive)
            .slice(0, 5)
            .map((p, idx) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[#F0D5DC] shadow-xs overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[4/3] bg-slate-100">
                  <Image
                    src={p.imageUrl || "/images/doctor/assets/insta-1.png"}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    #{idx + 1}
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h4 className="font-serif text-xs font-bold text-slate-900 line-clamp-2">
                    {p.title}
                  </h4>
                  <div className="text-[10px] font-bold text-[#88213B] mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span>Watch on Instagram</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: EDIT REEL MODAL
          ========================================================================= */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Edit Reel Details
              </h3>
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reel / Post Title:
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#D84C70]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cover Image URL:
                </label>
                <input
                  type="text"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D84C70]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Instagram Link:
                </label>
                <input
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#D84C70]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={isSavingEdit}
                className="px-5 py-2.5 rounded-xl bg-[#88213B] hover:bg-[#731930] text-white text-xs font-bold shadow-sm transition-all"
              >
                {isSavingEdit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: INTERACTIVE VIDEO / REEL PREVIEW MODAL
          ========================================================================= */}
      {previewPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold truncate max-w-[280px]">
                  {previewPost.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPost(null)}
                className="p-1 text-slate-400 hover:text-white rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Reel iframe or direct fallback */}
            <div className="relative w-full aspect-[9/16] max-h-[520px] bg-black">
              {previewPost.embedUrl ? (
                <iframe
                  src={previewPost.embedUrl}
                  title={previewPost.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
                  <Play className="w-12 h-12 text-rose-400 mb-3" />
                  <p className="text-sm font-semibold">{previewPost.title}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">Dr. Noopur Patel Practice</span>
              <a
                href={previewPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#88213B] text-white text-xs font-bold hover:bg-[#731930] transition-colors"
              >
                <span>Open in Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: RESET CONFIRMATION MODAL
          ========================================================================= */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Reset Instagram Showcase?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                This will restore the 5 default clinical awareness reels (Early Signs of Breast Cancer, Benign vs Cancerous Lumps, Self-Exam Guide, Treatment Options, and Mammography Myths).
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetToDefaults}
                disabled={isResetting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                {isResetting ? "Resetting..." : "Yes, Reset to Defaults"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
