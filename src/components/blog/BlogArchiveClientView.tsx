"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Stethoscope,
  HeartHandshake,
  Building2,
  Phone,
  MessageCircle,
} from "lucide-react";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/formatters";
import { Counter, ShimmerButton, FadeIn } from "@/components/motion";
import { SITE_CONFIG } from "@/config/site";

interface BlogArchiveClientViewProps {
  initialPosts: BlogPost[];
}

interface CategoryOption {
  id: string;
  label: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: "all", label: "All Articles" },
  { id: "screening", label: "Screening & Detection" },
  { id: "surgical", label: "Surgical Innovation" },
  { id: "benign", label: "General Breast Health" },
  { id: "educational", label: "Educational" },
  { id: "insurance", label: "Insurance & Pricing" },
  { id: "recovery", label: "Recovery & Care" },
];

export default function BlogArchiveClientView({ initialPosts }: BlogArchiveClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const catId = (post.categoryId || "").toLowerCase();
      const catName = (post.categoryName || "").toLowerCase();

      let matchesCategory = selectedCategory === "all";
      if (!matchesCategory) {
        if (selectedCategory === "screening") {
          matchesCategory = catId.includes("early") || catId.includes("screen") || catName.includes("screen") || catName.includes("detect");
        } else if (selectedCategory === "surgical") {
          matchesCategory = catId.includes("surg") || catId.includes("oncoplast") || catName.includes("surg") || catName.includes("innov");
        } else if (selectedCategory === "benign") {
          matchesCategory = catId.includes("benign") || catName.includes("benign") || catName.includes("general");
        } else if (selectedCategory === "educational") {
          matchesCategory = catId.includes("educat") || catName.includes("educat");
        } else if (selectedCategory === "insurance") {
          matchesCategory = catId.includes("financ") || catId.includes("insur") || catName.includes("insur") || catName.includes("pricing");
        } else if (selectedCategory === "recovery") {
          matchesCategory = catId.includes("recov") || catName.includes("recov") || catName.includes("care");
        } else {
          matchesCategory = catId.includes(selectedCategory) || catName.includes(selectedCategory);
        }
      }

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.categoryName?.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Featured post logic
  const isDefaultView = selectedCategory === "all" && !searchQuery.trim();
  const featuredPost = isDefaultView
    ? filteredPosts.find((p) => p.isFeatured) || filteredPosts[0]
    : null;

  const gridPosts = useMemo(() => {
    if (featuredPost && isDefaultView) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, isDefaultView]);

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Noopur Patel, I was reading your breast health blog and have a question regarding consultation."
  )}`;

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      {/* Background Subtle Rose Gradient Mesh */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(216,76,112,0.06),transparent_70%)] pointer-events-none"
      />

      {/* Hero Header Section */}
      <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden text-center border-b border-[#F5D6DE]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Eyebrow Badge */}
          <FadeIn direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F4] border border-[#F5D6DE] text-[#9B2846] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D84C70] animate-pulse" />
              <Stethoscope className="w-3.5 h-3.5 text-[#D84C70]" />
              <span>Breast Health &amp; Surgical Oncology Insights</span>
            </div>
          </FadeIn>

          {/* Heading */}
          <FadeIn direction="up" delay={0.2}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.2] mb-5">
              Evidence-Based Guidance for{" "}
              <span className="text-[#D84C70] italic">
                Breast Health &amp; Cancer Care
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Clear, compassionate, and clinically reviewed articles on early detection, mammography, 
              benign breast lumps, oncoplastic breast surgery, and recovery by Dr. Noopur Patel (Marengo CIMS Hospital, Ahmedabad).
            </p>
          </FadeIn>

          {/* Clinical Statistics & Trust Ribbon */}
          <FadeIn direction="up" delay={0.4}>
            <div className="max-w-4xl mx-auto bg-[#FFF8F9] rounded-2xl p-4 sm:p-6 border border-[#F5D6DE] shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  <Counter to={10} suffix="+" duration={1.2} />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Years Surgical Care
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-[#D84C70] tracking-tight">
                  <Counter to={500} suffix="+" duration={1.3} />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Patients Evaluated
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  <Counter to={100} suffix="%" duration={1.4} />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Evidence-Based Care
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-[#D84C70] tracking-tight">
                  <span>Marengo CIMS</span>
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Ahmedabad Practice
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Filter Tabs & Search Bar Sticky Ribbon */}
      <section className="sticky top-[68px] sm:top-[74px] md:top-[80px] z-20 py-3.5 bg-white/95 backdrop-blur-md border-b border-[#F5D6DE]/70 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
            
            {/* Category Filter Pills */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] shadow-2xs gap-1 overflow-x-auto max-w-full">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;

                let count = 0;
                if (cat.id === "all") {
                  count = initialPosts.length;
                } else if (cat.id === "screening") {
                  count = initialPosts.filter((p) => (p.categoryId || "").includes("early") || (p.categoryName || "").toLowerCase().includes("screen")).length;
                } else if (cat.id === "surgical") {
                  count = initialPosts.filter((p) => (p.categoryId || "").includes("surg") || (p.categoryName || "").toLowerCase().includes("surg")).length;
                } else if (cat.id === "benign") {
                  count = initialPosts.filter((p) => (p.categoryId || "").includes("benign") || (p.categoryName || "").toLowerCase().includes("benign")).length;
                } else if (cat.id === "educational") {
                  count = initialPosts.filter((p) => (p.categoryId || "").includes("educat") || (p.categoryName || "").toLowerCase().includes("educat")).length;
                } else if (cat.id === "insurance") {
                  count = initialPosts.filter((p) => (p.categoryId || "").includes("financ") || (p.categoryName || "").toLowerCase().includes("insur")).length;
                } else if (cat.id === "recovery") {
                  count = initialPosts.filter((p) => (p.categoryId || "").includes("recov") || (p.categoryName || "").toLowerCase().includes("recov")).length;
                } else {
                  count = initialPosts.filter((p) => (p.categoryId || "").includes(cat.id)).length;
                }

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer flex items-center gap-1.5 z-10 ${
                      isActive
                        ? "text-[#9B2846]"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBlogTabPill"
                        className="absolute inset-0 bg-white rounded-full shadow-xs border border-[#F5D6DE] -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-[#FFF0F4] text-[#D84C70] font-bold"
                          : "bg-slate-200/60 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Real-Time Search Bar */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lumps, mammography, biopsy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-white border border-[#F5D6DE] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/20 focus:border-[#D84C70] shadow-2xs transition-all"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Main Articles Container */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Featured Clinical Article Hero Card */}
        {featuredPost && (
          <FadeIn direction="up" delay={0.1}>
            <article className="group relative bg-white rounded-3xl border border-[#F5D6DE] hover:border-[#D84C70]/50 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Image Banner */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto min-h-[300px] bg-[#FFF8F9] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#F5D6DE]">
                  <Image
                    src={featuredPost.featuredImage || "/images/doctor/assets/service-1.png"}
                    alt={featuredPost.featuredImageAlt || featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D84C70] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      Featured Clinical Article
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#FFF0F4] text-[#9B2846] font-bold uppercase tracking-wider text-[10.5px] border border-[#F5D6DE]">
                        {featuredPost.categoryName || "Breast Health"}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#D84C70]" />
                        {featuredPost.readingTimeMinutes || 5} min read
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 group-hover:text-[#D84C70] transition-colors tracking-tight leading-snug mb-4">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {featuredPost.author?.avatar && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#F5D6DE] shrink-0">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                          <span>{featuredPost.author?.name || "Dr. Noopur Patel"}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D84C70]" />
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {featuredPost.author?.role || "Breast Cancer Surgeon"}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#D84C70] hover:bg-[#BE3455] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer group/btn"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </div>
            </article>
          </FadeIn>
        )}

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          {gridPosts.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {gridPosts.map((post, idx) => (
                <motion.article
                  key={`blog-post-${post.slug || post.id || idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 border border-[#F5D6DE]/80 hover:border-[#D84C70]/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
                >
                  <div>
                    {/* Visual Media Header */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 bg-[#FFF8F9] border border-[#F5D6DE]"
                    >
                      <Image
                        src={post.featuredImage || "/images/doctor/assets/service-2.png"}
                        alt={post.featuredImageAlt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10.5px] font-bold text-[#9B2846] uppercase tracking-wider border border-[#F5D6DE] shadow-2xs">
                          {post.categoryName || "Breast Health"}
                        </span>
                      </div>
                    </Link>

                    {/* Metadata Strip */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#D84C70]" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D84C70]" />
                        {post.readingTimeMinutes || 5} min read
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="font-serif text-lg font-bold text-slate-950 group-hover:text-[#D84C70] transition-colors line-clamp-2 leading-snug mb-3 tracking-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-5 font-normal">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author Attribution & Read Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      {post.author?.avatar && (
                        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#F5D6DE] shrink-0">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[140px]">
                        {post.author?.name || "Dr. Noopur Patel"}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#D84C70] hover:text-[#9B2846] transition-colors group/link"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </motion.article>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-[#FFF8F9] rounded-3xl border border-[#F5D6DE] p-8 max-w-lg mx-auto shadow-2xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F4] text-[#D84C70] mx-auto flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No articles found</h3>
              <p className="text-xs text-slate-500 mb-6">
                No matching clinical articles for &quot;{searchQuery}&quot;. Clear your search or explore all categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-full bg-[#D84C70] text-white text-xs font-bold hover:bg-[#BE3455] transition-colors shadow-xs cursor-pointer"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* High-Conversion Breast Health Consultation Banner */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#FFF8F9] via-white to-[#FDF2F5] p-8 sm:p-14 border border-[#F5D6DE] shadow-xs text-center overflow-hidden">
          
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D84C70]/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0F4] text-[#9B2846] text-xs font-bold uppercase tracking-wider border border-[#F5D6DE]">
              <HeartHandshake className="w-3.5 h-3.5 text-[#D84C70]" />
              <span>Compassionate Breast Care</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Have Questions About a Breast Lump or Diagnosis?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Schedule a private, gentle clinical consultation with Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad. 
              Comprehensive triple assessment, clear surgical guidance, and cashless Mediclaim support.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link href="/appointments">
                <ShimmerButton
                  shimmerColor="rgba(255, 255, 255, 0.45)"
                  className="px-7 py-3 rounded-full bg-[#D84C70] hover:bg-[#BE3455] text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 cursor-pointer"
                >
                  <span>Book In-Person Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-300 shadow-2xs transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consult on WhatsApp</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600 pt-3">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>Female-Led Confidential Care</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>Triple Assessment Protocol</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>Cashless Mediclaim Support</span>
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
