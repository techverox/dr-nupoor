"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogPost, BlogStatus, CmsBlogFormData } from "@/types";
import { generateSlug, calculateReadingTime } from "@/lib/utils/blogUtils";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { BlogSeoChecker } from "@/components/admin/BlogSeoChecker";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import {
  ArrowLeft,
  FileText,
  Search,
  Sparkles,
  Save,
  Send,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Globe,
  User,
  Tag
} from "lucide-react";

export default function CreateNewBlogPostPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "audit">("content");
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState<CmsBlogFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "/images/blog/social-media-tips.jpg",
    featuredImageAlt: "",
    categoryName: "Social Media",
    categoryId: "social-media",
    tagsText: "Social Media, Growth, Marketing",
    authorName: "Disha Parmar",
    authorRole: "Social Media Strategist",
    authorBio: "Specializes in visual storytelling, viral reels production, and community engagement.",
    authorAvatar: "/images/team/disha-parmar.jpg",
    isFeatured: false,
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    keywordsText: "",
  });

  const handleTitleChange = (newTitle: string) => {
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: prev.slug === generateSlug(prev.title) || !prev.slug ? generateSlug(newTitle) : prev.slug,
      metaTitle: !prev.metaTitle || prev.metaTitle === prev.title ? newTitle : prev.metaTitle,
    }));
  };

  const handleExcerptChange = (newExcerpt: string) => {
    setFormData((prev) => ({
      ...prev,
      excerpt: newExcerpt,
      metaDescription: !prev.metaDescription || prev.metaDescription === prev.excerpt ? newExcerpt : prev.metaDescription,
    }));
  };

  // Compile BlogPost object for preview/SEO analysis
  const currentPostForAudit: Partial<BlogPost> = {
    title: formData.title,
    slug: formData.slug,
    excerpt: formData.excerpt,
    content: formData.content,
    featuredImage: formData.featuredImage,
    featuredImageAlt: formData.featuredImageAlt,
    categoryName: formData.categoryName,
    categoryId: formData.categoryId,
    tags: formData.tagsText.split(",").map((t) => t.trim()).filter(Boolean),
    author: {
      id: "author-custom",
      name: formData.authorName,
      role: formData.authorRole,
      bio: formData.authorBio,
      avatar: formData.authorAvatar,
    },
    readingTimeMinutes: calculateReadingTime(formData.content),
    status: formData.status,
    isFeatured: formData.isFeatured,
    seo: {
      title: formData.metaTitle || formData.title,
      description: formData.metaDescription || formData.excerpt,
      slug: formData.slug,
      canonicalUrl: formData.canonicalUrl || undefined,
      ogTitle: formData.ogTitle || undefined,
      ogDescription: formData.ogDescription || undefined,
      ogImage: formData.ogImage || formData.featuredImage || undefined,
      keywords: formData.keywordsText.split(",").map((k) => k.trim()).filter(Boolean),
    },
  };

  const handleSave = async (statusOverride?: BlogStatus) => {
    const finalStatus = statusOverride || formData.status;

    if (!formData.title.trim()) {
      setFeedback({ message: "Article title is required.", type: "error" });
      setActiveTab("content");
      return;
    }

    if (!formData.slug.trim()) {
      setFeedback({ message: "URL slug is required.", type: "error" });
      setActiveTab("content");
      return;
    }

    if (!formData.content.trim()) {
      setFeedback({ message: "Article body content cannot be empty.", type: "error" });
      setActiveTab("content");
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const payload: Partial<BlogPost> = {
      ...currentPostForAudit,
      status: finalStatus,
    };

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          message: `Article ${finalStatus === "published" ? "published" : "saved as draft"} successfully!`,
          type: "success",
        });
        setTimeout(() => {
          router.push(`/admin/blog/${data.id}/edit`);
        }, 800);
      } else {
        setFeedback({ message: data.error || "Failed to save article.", type: "error" });
      }
    } catch (e) {
      console.error("[CreateBlog] Save error:", e);
      setFeedback({ message: "Network error saving article.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Link
              href="/admin/blog"
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Articles
            </Link>
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Create New</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Create Blog Article
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Author and publish search-optimized articles to power your content engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 shadow-sm transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-zinc-500" />
            {isSaving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 shadow-sm transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Publish Article
          </button>
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
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "content"
              ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          1. Article Content & Body
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "seo"
              ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          2. SEO & Social Metadata
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("audit")}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === "audit"
              ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          3. Real-Time SEO Audit
        </button>
      </div>

      {/* TAB 1: ARTICLE CONTENT */}
      {activeTab === "content" && (
        <div className="space-y-6">
          {/* Main Title, Slug & Category */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. 10 Proven Social Media Tactics to Skyrocket Organic Growth"
                className="w-full px-4 py-2.5 text-base font-semibold bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
                  <span className="px-3 py-2 text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 border-r border-zinc-200 dark:border-zinc-700 select-none">
                    /blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))}
                    placeholder="e.g. 10-proven-social-media-tactics"
                    className="w-full px-3 py-2 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.categoryName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      categoryName: e.target.value,
                      categoryId: generateSlug(e.target.value),
                    }))
                  }
                  placeholder="e.g. Social Media, Performance Marketing, SEO"
                  className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                Short Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e) => handleExcerptChange(e.target.value)}
                placeholder="A concise 1-2 sentence summary explaining the core value of this article..."
                className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>
          </div>

          {/* Rich Content Editor Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-400" />
              Main Article Content
            </h2>
            <BlogEditor
              value={formData.content}
              onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              minHeight="500px"
            />
          </div>

          {/* Featured Image and Tags */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-zinc-400" />
              Media & Featured Asset
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                  Featured Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="/images/blog/your-image.jpg"
                    className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-semibold shrink-0 transition-colors"
                  >
                    Select
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                  Image Alt Text (Accessibility)
                </label>
                <input
                  type="text"
                  value={formData.featuredImageAlt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featuredImageAlt: e.target.value }))}
                  placeholder="e.g. Digital Marketing Strategy Infographic"
                  className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                Tags / Keywords (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.tagsText}
                onChange={(e) => setFormData((prev) => ({ ...prev, tagsText: e.target.value }))}
                placeholder="Social Media, Instagram, Growth Hacking"
                className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>
          </div>

          {/* Author Details & Spotlight */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-400" />
              Author Attribution & Visibility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                  Author Name
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, authorName: e.target.value }))}
                  className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                  Author Role
                </label>
                <input
                  type="text"
                  value={formData.authorRole}
                  onChange={(e) => setFormData((prev) => ({ ...prev, authorRole: e.target.value }))}
                  className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                Author Short Bio
              </label>
              <textarea
                rows={2}
                value={formData.authorBio}
                onChange={(e) => setFormData((prev) => ({ ...prev, authorBio: e.target.value }))}
                className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>

            <label className="flex items-center gap-2.5 pt-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-zinc-300 dark:border-zinc-700"
              />
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Feature this article on Homepage & Spotlight Sections
              </span>
            </label>
          </div>
        </div>
      )}

      {/* TAB 2: SEO & OPEN GRAPH METADATA */}
      {activeTab === "seo" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-zinc-400" />
            Search Engine & Open Graph Optimization
          </h2>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
              Custom SEO Title
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
              placeholder="Defaults to article title if empty"
              className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
              Custom Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.metaDescription}
              onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
              placeholder="Defaults to article excerpt if empty"
              className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                Canonical URL (Optional)
              </label>
              <input
                type="url"
                value={formData.canonicalUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, canonicalUrl: e.target.value }))}
                placeholder="https://digivigee.com/blog/..."
                className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                Open Graph Image URL (Optional)
              </label>
              <input
                type="text"
                value={formData.ogImage}
                onChange={(e) => setFormData((prev) => ({ ...prev, ogImage: e.target.value }))}
                placeholder="Defaults to featured image"
                className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                Open Graph Title (Optional)
              </label>
              <input
                type="text"
                value={formData.ogTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, ogTitle: e.target.value }))}
                className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                Open Graph Description (Optional)
              </label>
              <input
                type="text"
                value={formData.ogDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, ogDescription: e.target.value }))}
                className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REAL-TIME SEO AUDIT & SERP PREVIEW */}
      {activeTab === "audit" && (
        <BlogSeoChecker post={currentPostForAudit} />
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <Link
          href="/admin/blog"
          className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          Cancel
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 shadow-sm transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            Publish Article
          </button>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        title="Select Featured Blog Image"
        onSelect={(selected) => {
          setFormData((prev) => ({
            ...prev,
            featuredImage: selected.url,
            featuredImageAlt: selected.altText || prev.featuredImageAlt,
          }));
        }}
      />
    </div>
  );
}
