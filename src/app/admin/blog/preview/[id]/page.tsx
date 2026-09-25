import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCmsBlogPostByIdAdmin } from "@/lib/services/cmsService";
import { formatDate } from "@/utils/formatters";
import { RenderedMarkdownContent } from "@/components/admin/BlogEditor";
import { CTASection } from "@/components/public";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Edit2,
  Tag,
  User,
  Sparkles
} from "lucide-react";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogPostPreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  const post = await getCmsBlogPostByIdAdmin(id);

  if (!post) {
    notFound();
  }

  const isPublished = post.status === "published";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Sticky Admin Preview Banner */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-slate-800 px-4 sm:px-6 py-2.5 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 tracking-wide uppercase text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Preview (Admin Only)
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-500">
              Viewing: <strong className="text-slate-900">{post.title}</strong>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-500">
              Status:{" "}
              <strong className={isPublished ? "text-emerald-700 font-semibold" : "text-amber-700 font-semibold"}>
                {isPublished ? "PUBLISHED" : "DRAFT"}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/blog/${post.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors shadow-sm"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Return to Editor
            </Link>

            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Articles
            </Link>

            {isPublished && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors font-medium"
              >
                <span>Live Public Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 1. ARTICLE HEADER */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb row */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link href="/blog" className="hover:text-slate-900 font-medium">
              Blog & Insights
            </Link>
            <span>/</span>
            <span>{post.categoryName || "Clinical Guidance"}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              {post.categoryName || "Clinical Guidance"}
            </span>
            {post.isFeatured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Featured Health Insight
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center font-bold text-base shadow-sm">
                {(post.author?.name || "N").charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  {post.author?.name || "Dr. Noopur Patel"}
                </div>
                <div className="text-xs text-slate-500">
                  {post.author?.role || "Consultant Breast Oncoplastic Surgeon"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                ~{post.readingTimeMinutes || 1} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE BODY CONTENT */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Main Markdown Body */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            <RenderedMarkdownContent content={post.content} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Tags:
              </span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Bio Box */}
          {post.author && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center font-extrabold text-xl shrink-0">
                {post.author.name.charAt(0)}
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm font-bold text-slate-900 mb-1">
                  Authored by {post.author.name}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {post.author.bio || "Consultant Breast Surgeon and Surgical Oncologist at Marengo CIMS Hospital, Ahmedabad."}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CLINICAL CTA */}
      <CTASection
        title="Need Specialized Breast Health Guidance?"
        description="Consult Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad for compassionate, evidence-based surgical oncology care."
        primaryButtonText="Book Clinical OPD Consultation"
      />
    </div>
  );
}
