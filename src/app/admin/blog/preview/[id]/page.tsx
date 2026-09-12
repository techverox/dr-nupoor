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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Sticky Admin Preview Banner */}
      <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-md text-white px-4 sm:px-6 py-2.5 border-b border-zinc-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 tracking-wide uppercase text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Preview (Admin Only)
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400">
              Viewing: <strong className="text-zinc-200">{post.title}</strong>
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400">
              Status:{" "}
              <strong className={isPublished ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                {isPublished ? "PUBLISHED" : "DRAFT"}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/blog/${post.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Return to Editor
            </Link>

            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Articles
            </Link>

            {isPublished && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-emerald-400 transition-colors font-medium"
              >
                <span>Live Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 1. ARTICLE HEADER */}
      <section className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb row */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-6">
            <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Blog
            </Link>
            <span>/</span>
            <span>{post.categoryName || "General"}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
              {post.categoryName || "General"}
            </span>
            {post.isFeatured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-900">
                <Sparkles className="w-3 h-3" />
                Featured Article
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                {(post.author?.name || "D").charAt(0)}
              </div>
              <div>
                <div className="font-bold text-zinc-900 dark:text-zinc-100">
                  {post.author?.name || "DigiVigee Team"}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {post.author?.role || "Digital Marketing Strategist"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
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
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-sm">
            <RenderedMarkdownContent content={post.content} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-1">
                Tags:
              </span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium border border-zinc-200 dark:border-zinc-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Bio Box */}
          {post.author && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-extrabold text-xl shrink-0">
                {post.author.name.charAt(0)}
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Written by {post.author.name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {post.author.bio || "Senior Growth Strategist and Marketing Consultant at DigiVigee."}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. FINAL CTA */}
      <CTASection
        title="Ready to Apply These Strategies?"
        description="Let our dedicated growth team implement high-converting campaigns tailored for your business."
        primaryButtonText="Get Free Consultation"
      />
    </div>
  );
}
