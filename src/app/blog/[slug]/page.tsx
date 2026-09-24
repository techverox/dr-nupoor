import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { SocialShareBar } from "@/components/blog/SocialShareBar";
import { getCmsBlogPostBySlug, getCmsBlogPosts } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/config/site";
import { formatDate } from "@/utils/formatters";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Tag,
  UserCheck,
} from "lucide-react";
import { ShimmerButton } from "@/components/motion";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Dynamic SEO & OpenGraph Metadata for Individual Blog Post.
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCmsBlogPostBySlug(slug);

  if (!post || post.status !== "published") {
    return {
      title: "Article Not Found | Dr. Noopur Patel",
      robots: { index: false, follow: false },
    };
  }

  const title = post.seo?.title?.trim() || `${post.title} | Dr. Noopur Patel`;
  const description = post.seo?.description?.trim() || post.excerpt;

  return await resolveDynamicPageMetadata(`/blog/${post.slug}`, {
    title,
    description,
    path: `/blog/${post.slug}`,
    keywords: post.tags || [],
    ogImage: post.seo?.ogImage || post.featuredImage,
    ogType: "article",
    publishedTime: post.publishedAt || post.createdAt,
    authors: [post.author?.name || "Dr. Noopur Patel"],
  });
}

/**
 * Public Individual Blog Article Page.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getCmsBlogPostBySlug(slug);

  // Prevent draft or non-existent posts from being viewed publicly
  if (!post || post.status !== "published") {
    notFound();
  }

  // Fetch all published articles to find related reads
  const allPosts = await getCmsBlogPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.categoryId === post.categoryId || p.categoryName === post.categoryName)
    )
    .slice(0, 3);

  const articleUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;

  // JSON-LD Structured Data for Google Article Search Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage.startsWith("http")
      ? post.featuredImage
      : `${SITE_CONFIG.url}${post.featuredImage}`,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Dr. Noopur Patel",
      jobTitle: post.author?.role || "Breast Cancer Surgeon",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/doctor/assets/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900 flex flex-col">
      {/* Inject Search Engine JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Article Header & Hero */}
      <header className="pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-4xl mx-auto">
          {/* Category & Reading Time Badges */}
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 font-bold text-xs uppercase tracking-wider">
              {post.categoryName || "Growth Playbook"}
            </span>

            {post.isFeatured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Featured
              </span>
            )}

            <span className="text-xs text-slate-400">•</span>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readingTimeMinutes || 5} min read
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author Bar */}
          <div className="pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {post.author?.avatar ? (
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-slate-200 shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name || "Author"}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-base flex items-center justify-center shadow-xs">
                  {post.author?.name ? post.author.name.charAt(0) : "D"}
                </div>
              )}
              <div>
                <div className="text-sm font-bold text-slate-950">
                  {post.author?.name || "DigiVigee Team"}
                </div>
                <div className="text-xs text-slate-500">
                  {post.author?.role || "Growth Marketing Strategist"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published {formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main Article Content Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-72 sm:h-[420px] rounded-3xl overflow-hidden mb-12 shadow-xl shadow-slate-200/70 border border-slate-200/80 bg-slate-900">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Social Share Bar Top */}
        <div className="border-b border-slate-200 pb-4 mb-8">
          <SocialShareBar title={post.title} url={articleUrl} />
        </div>

        {/* Markdown Rendered Article Body */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-12 shadow-xs mb-10">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Tags List */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap py-4 mb-8 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Tag className="w-3.5 h-3.5" />
              Topic Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Social Share Bar Bottom */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/80 mb-12">
          <SocialShareBar title={post.title} url={articleUrl} />
        </div>

        {/* Author Bio Box */}
        {post.author && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-16 flex flex-col sm:flex-row items-start gap-5">
            {post.author.avatar ? (
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-xs border border-slate-200 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name || "Author"}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-[#0C1628] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                {post.author.name ? post.author.name.charAt(0) : "D"}
              </div>
            )}
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-950">
                  About {post.author.name}
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {post.author.role || "Author"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {post.author.bio ||
                  `${post.author.name} is an experienced breast surgeon and surgical oncologist at Marengo CIMS Hospital, Ahmedabad, providing evidence-based patient education.`}
              </p>
            </div>
          </div>
        )}

        {/* 4. Related Insights Carousel / Cards */}
        {relatedPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                  Continue Reading
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">
                  Related Clinical Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-slate-600 hover:text-slate-950 inline-flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded-md">
                      {item.categoryName || "Breast Health"}
                    </span>
                    <h4 className="text-sm font-bold text-slate-950 group-hover:text-rose-600 transition-colors mt-3 mb-2 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 mt-4">
                    <span>{item.readingTimeMinutes || 5} min read</span>
                    <span className="font-bold text-rose-600 group-hover:translate-x-0.5 transition-transform">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 5. High-Impact Strategic Call to Action Banner */}
        <section className="bg-gradient-to-b from-white via-white to-rose-50/40 rounded-3xl p-8 sm:p-12 text-center border border-rose-200/90 shadow-xl shadow-rose-950/[0.03] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-rose-500/5 via-transparent to-transparent" />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#D84C70] text-xs font-bold uppercase tracking-wider border border-rose-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70] animate-ping" />
              Expert Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0C1628]">
              Have questions about your breast health or diagnosis?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Schedule a consultation with Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad. Personalized clinical evaluation, gentle diagnostics, and clear guidance.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/appointments">
                <ShimmerButton
                  shimmerColor="rgba(255, 255, 255, 0.45)"
                  className="px-8 py-3.5 rounded-xl bg-[#D84C70] hover:bg-[#c23d60] text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 cursor-pointer"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
              <Link
                href="/patient-stories"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0C1628] font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition-colors"
              >
                Read Patient Stories
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Comprehensive Agency Footer */}
      <Footer />
    </div>
  );
}
