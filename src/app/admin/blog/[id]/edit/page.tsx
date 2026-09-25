"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { BlogPost, BlogStatus, CmsBlogFormData } from "@/types";
import { generateSlug, calculateReadingTime } from "@/lib/utils/blogUtils";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { BlogSeoChecker } from "@/components/admin/BlogSeoChecker";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import {
  ArrowLeft,
  FileText,
  Eye,
  Save,
  Send,
  Archive,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Globe,
  User,
  Sparkles
} from "lucide-react";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPostPage({ params }: EditPageProps) {
  const resolvedParams = use(params);
  const postId = resolvedParams.id;

  const [activeTab, setActiveTab] = useState<"content" | "seo" | "audit">("content");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState<CmsBlogFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "/images/blog/breast-cancer-myths.jpg",
    featuredImageAlt: "Dr. Noopur Patel Health Guide",
    categoryName: "Breast Health",
    categoryId: "breast-health",
    tagsText: "",
    authorName: "Dr. Noopur Patel",
    authorRole: "Consultant Breast Oncoplastic Surgeon",
    authorBio: "Breast cancer specialist and surgical oncologist at Marengo CIMS Hospital, Ahmedabad.",
    authorAvatar: "/images/team/dr-noopur-patel.jpg",
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

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/admin/blog/${postId}`);
        const data = await res.json();
        if (data.success && data.post) {
          const p: BlogPost = data.post;
          setFormData({
            title: p.title || "",
            slug: p.slug || "",
            excerpt: p.excerpt || "",
            content: p.content || "",
            featuredImage: p.featuredImage || "/images/blog/breast-cancer-myths.jpg",
            featuredImageAlt: p.featuredImageAlt || "",
            categoryName: p.categoryName || "Breast Health",
            categoryId: p.categoryId || "breast-health",
            tagsText: (p.tags || []).join(", "),
            authorName: p.author?.name || "Dr. Noopur Patel",
            authorRole: p.author?.role || "Consultant Breast Oncoplastic Surgeon",
            authorBio: p.author?.bio || "Breast cancer specialist and surgical oncologist at Marengo CIMS Hospital, Ahmedabad.",
            authorAvatar: p.author?.avatar || "/images/team/dr-noopur-patel.jpg",
            isFeatured: Boolean(p.isFeatured),
            status: p.status || "draft",
            metaTitle: p.seo?.title || p.title || "",
            metaDescription: p.seo?.description || p.excerpt || "",
            canonicalUrl: p.seo?.canonicalUrl || "",
            ogTitle: p.seo?.ogTitle || "",
            ogDescription: p.seo?.ogDescription || "",
            ogImage: p.seo?.ogImage || "",
            keywordsText: (p.seo?.keywords || p.tags || []).join(", "),
          });
        } else {
          setFeedback({ message: data.error || "Failed to load post data.", type: "error" });
        }
      } catch (e) {
        console.error("[EditBlog] Fetch error:", e);
        setFeedback({ message: "Network error loading post.", type: "error" });
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [postId]);

  // Derived audit object for live checker
  const currentPostForAudit: Partial<BlogPost> = {
    id: postId,
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
      setFeedback({ message: "Article title cannot be empty.", type: "error" });
      setActiveTab("content");
      return;
    }

    if (!formData.slug.trim()) {
      setFeedback({ message: "URL slug cannot be empty.", type: "error" });
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
      const res = await fetch(`/api/admin/blog/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, status: finalStatus }));
        setFeedback({
          message: `Article ${finalStatus === "published" ? "published" : "saved"} successfully!`,
          type: "success",
        });
      } else {
        setFeedback({ message: data.error || "Failed to update article.", type: "error" });
      }
    } catch (e) {
      console.error("[EditBlog] Save error:", e);
      setFeedback({ message: "Network error saving article.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-rose-600 border-t-transparent animate-spin" />
          <p className="text-xs font-medium text-slate-500">Loading article editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Link
              href="/admin/blog"
              className="text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Articles
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-md">
              {formData.title || "Edit Article"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Edit Health Article
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wide uppercase ${
                formData.status === "published"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : formData.status === "scheduled"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {formData.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href={`/admin/blog/preview/${postId}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            Preview
          </Link>

          <button
            type="button"
            onClick={() => handleSave(formData.status)}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-slate-500" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          {formData.status === "draft" ? (
            <button
              type="button"
              onClick={() => handleSave("published")}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Publish
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 shadow-sm transition-colors disabled:opacity-50"
            >
              <Archive className="w-4 h-4" />
              Unpublish to Draft
            </button>
          )}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl border text-sm animate-in fade-in duration-200 ${
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
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "content"
              ? "border-rose-600 text-rose-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          1. Article Content & Body
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "seo"
              ? "border-rose-600 text-rose-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          2. SEO & Social Metadata
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("audit")}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === "audit"
              ? "border-rose-600 text-rose-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
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
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Article Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Understanding Breast Lumps: Normal Changes vs When to Consult a Specialist"
                className="w-full px-4 py-2.5 text-base font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <div className="flex rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                  <span className="px-3 py-2 text-xs font-medium text-slate-500 bg-slate-100 border-r border-slate-200 select-none">
                    /blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))}
                    className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Category <span className="text-rose-500">*</span>
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
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Short Excerpt <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Rich Content Editor Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              Main Article Content
            </h2>
            <BlogEditor
              value={formData.content}
              onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              minHeight="550px"
            />
          </div>

          {/* Featured Image and Tags */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-400" />
              Media & Featured Asset
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Featured Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="px-3.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-semibold shrink-0 transition-colors"
                  >
                    Select
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Image Alt Text (Accessibility)
                </label>
                <input
                  type="text"
                  value={formData.featuredImageAlt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featuredImageAlt: e.target.value }))}
                  placeholder="e.g. Dr. Noopur Patel Breast Care Guide"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Tags / Keywords (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.tagsText}
                onChange={(e) => setFormData((prev) => ({ ...prev, tagsText: e.target.value }))}
                placeholder="Breast Cancer, Early Detection, Oncology Care, Ahmedabad"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Author Details & Spotlight */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              Author Attribution & Visibility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Author Name
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, authorName: e.target.value }))}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Author Role
                </label>
                <input
                  type="text"
                  value={formData.authorRole}
                  onChange={(e) => setFormData((prev) => ({ ...prev, authorRole: e.target.value }))}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Author Short Bio
              </label>
              <textarea
                rows={2}
                value={formData.authorBio}
                onChange={(e) => setFormData((prev) => ({ ...prev, authorBio: e.target.value }))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>

            <label className="flex items-center gap-2.5 pt-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
              />
              <span className="text-sm font-semibold text-slate-900">
                Feature this article on Homepage & Spotlight Sections
              </span>
            </label>
          </div>
        </div>
      )}

      {/* TAB 2: SEO & OPEN GRAPH METADATA */}
      {activeTab === "seo" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            Search Engine & Open Graph Optimization
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Custom SEO Title
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
              placeholder="Defaults to article title if empty"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Custom Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.metaDescription}
              onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
              placeholder="Defaults to article excerpt if empty"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Canonical URL (Optional)
              </label>
              <input
                type="url"
                value={formData.canonicalUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, canonicalUrl: e.target.value }))}
                placeholder="https://drnoopurpatel.com/blog/..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Open Graph Image URL (Optional)
              </label>
              <input
                type="text"
                value={formData.ogImage}
                onChange={(e) => setFormData((prev) => ({ ...prev, ogImage: e.target.value }))}
                placeholder="Defaults to featured image"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Open Graph Title (Optional)
              </label>
              <input
                type="text"
                value={formData.ogTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, ogTitle: e.target.value }))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Open Graph Description (Optional)
              </label>
              <input
                type="text"
                value={formData.ogDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, ogDescription: e.target.value }))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REAL-TIME SEO AUDIT & SERP PREVIEW */}
      {activeTab === "audit" && (
        <BlogSeoChecker post={currentPostForAudit} />
      )}

      {/* Bottom Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <Link
          href="/admin/blog"
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          Cancel
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave(formData.status)}
            disabled={isSaving}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          {formData.status === "draft" ? (
            <button
              type="button"
              onClick={() => handleSave("published")}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              Publish Article
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors disabled:opacity-50"
            >
              <Archive className="w-4 h-4" />
              Unpublish to Draft
            </button>
          )}
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
