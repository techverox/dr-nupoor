import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { SocialShareBar } from "@/components/blog/SocialShareBar";
import { getCmsBlogPostBySlug, getCmsBlogPosts } from "@/lib/services/cmsService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/config/site";
import { formatDate } from "@/utils/formatters";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Stethoscope,
  ChevronRight,
  HeartHandshake,
  CheckCircle2,
  Building2,
  MessageCircle,
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

  const title = post.seo?.title?.trim() || `${post.title} | Dr. Noopur Patel Ahmedabad`;
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
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello Dr. Noopur Patel, I have a question regarding your article: "${post.title}".`
  )}`;

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
      worksFor: {
        "@type": "MedicalOrganization",
        name: "Marengo CIMS Hospital, Ahmedabad",
      },
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "Dr. Noopur Patel — Breast Cancer Surgeon",
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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#D84C70]/20 selection:text-[#9B2846] flex flex-col">
      {/* Inject Search Engine JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Global Doctor Navigation Bar */}
      <DoctorNavbar />

      {/* 2. Article Header & Hero */}
      <header className="pt-8 sm:pt-12 pb-10 px-4 sm:px-6 lg:px-8 border-b border-[#F5D6DE]/70 bg-gradient-to-b from-[#FFF8F9] to-white">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <Link href="/" className="hover:text-[#D84C70] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-[#D84C70] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </nav>

          {/* Category & Reading Time Badges */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-[#FFF0F4] text-[#9B2846] border border-[#F5D6DE] font-bold text-xs uppercase tracking-wider">
              {post.categoryName || "Breast Health"}
            </span>

            {post.isFeatured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF8F9] text-[#D84C70] border border-[#F5CAD5] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#D84C70]" />
                Featured
              </span>
            )}

            <span className="text-xs text-slate-300">•</span>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Clock className="w-3.5 h-3.5 text-[#D84C70]" />
              {post.readingTimeMinutes || 5} min read
            </span>

            <span className="text-xs text-slate-300">•</span>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-[#D84C70]" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-[1.2] mb-6">
            {post.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author Bar */}
          <div className="pt-6 border-t border-[#F5D6DE]/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {post.author?.avatar ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-xs border border-[#F5D6DE] shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name || "Dr. Noopur Patel"}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#D84C70] text-white font-bold text-base flex items-center justify-center shadow-xs">
                  {post.author?.name ? post.author.name.charAt(0) : "D"}
                </div>
              )}
              <div>
                <div className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                  <span>{post.author?.name || "Dr. Noopur Patel"}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D84C70]" />
                </div>
                <div className="text-xs text-slate-600">
                  {post.author?.role || "Associate Consultant – Surgical Breast Oncology"}
                </div>
                <div className="text-[11px] text-[#9B2846] font-medium flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3 text-[#D84C70]" />
                  <span>Marengo CIMS Hospital, Ahmedabad</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ask Doctor</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main Article Content Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-72 sm:h-[420px] rounded-3xl overflow-hidden mb-10 shadow-lg border border-[#F5D6DE] bg-[#FFF8F9]">
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
        <div className="border-b border-[#F5D6DE]/70 pb-4 mb-8">
          <SocialShareBar title={post.title} url={articleUrl} />
        </div>

        {/* Markdown Rendered Article Body */}
        <div className="bg-white rounded-3xl border border-[#F5D6DE]/80 p-6 sm:p-12 shadow-xs mb-10">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Tags List */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap py-4 mb-8 border-b border-[#F5D6DE]">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Tag className="w-3.5 h-3.5 text-[#D84C70]" />
              Medical Topics:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#FFF8F9] text-[#9B2846] border border-[#F5D6DE] text-xs font-semibold hover:bg-[#FFF0F4] transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Social Share Bar Bottom */}
        <div className="bg-[#FFF8F9] rounded-2xl p-4 sm:p-6 border border-[#F5D6DE] mb-12">
          <SocialShareBar title={post.title} url={articleUrl} />
        </div>

        {/* Author Bio Box */}
        {post.author && (
          <div className="bg-gradient-to-r from-[#FFF8F9] to-white rounded-3xl border border-[#F5D6DE] p-6 sm:p-8 shadow-xs mb-16 flex flex-col sm:flex-row items-start gap-5">
            {post.author.avatar ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-xs border-2 border-[#D84C70]/30 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name || "Dr. Noopur Patel"}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#D84C70] text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
                {post.author.name ? post.author.name.charAt(0) : "D"}
              </div>
            )}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-950">
                  About {post.author.name || "Dr. Noopur Patel"}
                </h3>
                <span className="text-[11px] font-bold text-[#9B2846] bg-[#FFF0F4] px-2.5 py-0.5 rounded-full border border-[#F5D6DE]">
                  {post.author.role || "Breast Cancer Surgeon"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {post.author.bio ||
                  "Dr. Noopur Patel is an experienced Breast Cancer Surgeon and Oncoplastic Specialist at Marengo CIMS Hospital, Ahmedabad, providing evidence-based patient education and personalized surgical care."}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#D84C70]">
                <Link href="/about" className="hover:underline flex items-center gap-1">
                  <span>View Surgeon Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span>•</span>
                <Link href="/appointments" className="hover:underline">
                  Book Clinic Consultation
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4. Related Clinical Articles */}
        {relatedPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-[#D84C70] uppercase tracking-widest flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Related Clinical Insights
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-950 mt-1">
                  Recommended Reads
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-slate-600 hover:text-[#D84C70] inline-flex items-center gap-1 transition-colors"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group bg-white rounded-2xl border border-[#F5D6DE] p-5 shadow-xs hover:shadow-md hover:border-[#D84C70]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#9B2846] uppercase tracking-wider bg-[#FFF0F4] px-2 py-0.5 rounded-md border border-[#F5D6DE]">
                      {item.categoryName || "Breast Health"}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-slate-950 group-hover:text-[#D84C70] transition-colors mt-3 mb-2 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 mt-4">
                    <span>{item.readingTimeMinutes || 5} min read</span>
                    <span className="font-bold text-[#D84C70] group-hover:translate-x-0.5 transition-transform">
                      Read Article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 5. High-Impact Strategic Call to Action Banner */}
        <section className="bg-gradient-to-b from-[#FFF8F9] via-white to-[#FDF2F5] rounded-3xl p-8 sm:p-12 text-center border border-[#F5D6DE] shadow-xs relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-rose-500/5 via-transparent to-transparent" />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F4] text-[#D84C70] text-xs font-bold uppercase tracking-wider border border-[#F5D6DE]">
              <HeartHandshake className="w-3.5 h-3.5" />
              Specialist Consultation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Have questions about your breast health or diagnosis?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Schedule an in-person consultation with Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad. 
              Gentle clinical evaluation, clear explanation of reports, and personalized surgical guidance.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/appointments">
                <ShimmerButton
                  shimmerColor="rgba(255, 255, 255, 0.45)"
                  className="px-8 py-3.5 rounded-full bg-[#D84C70] hover:bg-[#BE3455] text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 cursor-pointer"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-300 shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Comprehensive Doctor Footer */}
      <DoctorFooter />
    </div>
  );
}
