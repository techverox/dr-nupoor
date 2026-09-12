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
  Filter,
} from "lucide-react";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/formatters";
import { Counter, ShimmerButton, FadeIn } from "@/components/motion";
import SocialProofBar from "@/components/SocialProofBar";

interface BlogArchiveClientViewProps {
  initialPosts: BlogPost[];
}

interface CategoryOption {
  id: string;
  label: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: "all", label: "All Playbooks" },
  { id: "operations", label: "Agency OS & Operations" },
  { id: "performance", label: "Performance Ad Ops" },
  { id: "social", label: "Social Media & Creative" },
  { id: "localseo", label: "Local SEO & GBP" },
  { id: "billing", label: "Billing & Retainers" },
];

export default function BlogArchiveClientView({ initialPosts }: BlogArchiveClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" ||
        post.categoryId?.toLowerCase() === selectedCategory.toLowerCase() ||
        post.categoryName?.toLowerCase().includes(selectedCategory.toLowerCase());

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

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-[#0C1628] selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* Background Subtle Mesh */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[650px] bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(0,135,68,0.06),transparent_70%)] pointer-events-none"
      />

      {/* Hero Header Section */}
      <section className="relative pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-16 sm:pb-20 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Staggered Heading Reveal */}
          <FadeIn direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0C1628] max-w-4xl mx-auto leading-[1.12] mb-6">
              Agency Scaling Playbooks.{" "}
              <span className="text-[#008744] bg-gradient-to-r from-[#008744] to-[#00B84D] bg-clip-text text-transparent">
                Audited Operations & Strategy.
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto font-normal leading-relaxed mb-12">
              Data-driven frameworks on performance ad pacing, white-label client reporting, local SEO rank architecture, and high-margin agency economics.
            </p>
          </FadeIn>

          {/* Live Metric Ribbon (Dynamic Count-Up Engine) */}
          <FadeIn direction="up" delay={0.4}>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0C1628] tracking-tight">
                  <Counter to={120} suffix="+" duration={1.2} />
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Verified Playbooks
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#008744] tracking-tight">
                  <Counter to={14.2} suffix="k" decimals={1} duration={1.3} />
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Agency Subscribers
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0C1628] tracking-tight">
                  <Counter to={4.8} suffix="x" decimals={1} duration={1.4} />
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Avg Retainer ROAS Lift
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#008744] tracking-tight">
                  <Counter to={99.4} suffix="%" decimals={1} duration={1.5} />
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Practical Success Rate
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Filter Tabs & Search Bar Sticky Ribbon */}
      <section className="sticky top-20 z-20 py-4 bg-[#FCFDFD]/90 backdrop-blur-md border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Magnetic Fluid Pill Category Tabs */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-2xs gap-1 overflow-x-auto max-w-full">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? initialPosts.length
                    : initialPosts.filter(
                        (p) =>
                          p.categoryId === cat.id ||
                          p.categoryName?.toLowerCase().includes(cat.id)
                      ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer flex items-center gap-1.5 z-10 ${
                      isActive
                        ? "text-[#0C1628]"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBlogTabPill"
                        className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/90 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-emerald-50 text-[#008744] font-bold"
                          : "bg-slate-200/60 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Real-Time Search Bar */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search playbooks, ad ops, SOPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full bg-white border border-slate-200 text-[#0C1628] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs transition-all"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Main Articles Container */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Featured Playbook Hero Bento */}
        {featuredPost && (
          <FadeIn direction="up" delay={0.1}>
            <article className="group relative bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-500/40 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Image Banner */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto min-h-[280px] bg-slate-100 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200/70">
                  <Image
                    src={featuredPost.featuredImage || "/images/showcase/collaborate_keynote.jpg"}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008744] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      Featured Agency Playbook
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#008744] font-bold uppercase tracking-wider text-[10px] border border-emerald-200/80">
                        {featuredPost.categoryName || "Agency OS"}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {featuredPost.readingTimeMinutes || 6} min read
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1628] group-hover:text-[#008744] transition-colors tracking-tight leading-snug mb-4">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-[#475569] leading-relaxed line-clamp-3 mb-6 font-normal">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {featuredPost.author?.avatar && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
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
                        <div className="text-xs font-bold text-[#0C1628] flex items-center gap-1">
                          <span>{featuredPost.author?.name || "DigiVigee Team"}</span>
                          <CheckCircle2 className="w-3 h-3 text-[#008744]" />
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {featuredPost.author?.role || "Operations Director"}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#008744] hover:bg-[#009b4e] text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer group/btn"
                    >
                      <span>Read Playbook</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </div>
            </article>
          </FadeIn>
        )}

        {/* Playbooks Bento Grid */}
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
                  className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 border border-slate-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
                >
                  <div>
                    {/* Visual Media Header */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-200/70"
                    >
                      <Image
                        src={post.featuredImage || "/images/showcase/pillar_roas_command.jpg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800 uppercase tracking-wider border border-slate-200/60 shadow-2xs">
                          {post.categoryName || "Operations"}
                        </span>
                      </div>
                    </Link>

                    {/* Metadata Strip */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {post.readingTimeMinutes || 5} min read
                      </span>
                    </div>

                    {/* Playbook Title */}
                    <h3 className="text-lg font-bold text-[#0C1628] group-hover:text-[#008744] transition-colors line-clamp-2 leading-snug mb-3 tracking-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[#475569] line-clamp-2 leading-relaxed mb-5 font-normal">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author Attribution & Read Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      {post.author?.avatar && (
                        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[130px]">
                        {post.author?.name || "DigiVigee"}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#008744] hover:text-[#00B84D] transition-colors group/link"
                    >
                      <span>Read</span>
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
              className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-lg mx-auto shadow-2xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#008744] mx-auto flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0C1628] mb-1">No playbooks found</h3>
              <p className="text-xs text-slate-500 mb-6">
                No matching articles for &quot;{searchQuery}&quot;. Clear your search or explore all categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#008744] text-white text-xs font-bold hover:bg-[#009b4e] transition-colors shadow-2xs cursor-pointer"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* Social Proof Partner Strip */}
      <SocialProofBar />

      {/* High-Conversion Light-First Newsletter & Diagnostic Section */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-white to-emerald-50/40 p-8 sm:p-14 border border-emerald-200/90 shadow-sm text-center overflow-hidden">
          
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/70 text-[#008744] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agency Growth Weekly</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1628] tracking-tight leading-tight">
              Stay Ahead of Platform Algorithms & Retainer Shifts.
            </h2>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Join 14,200+ agency owners receiving our bi-weekly breakdown of validated growth experiments, ad ops frameworks, and retainer economics.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <ShimmerButton
                  shimmerColor="rgba(255, 255, 255, 0.45)"
                  className="px-7 py-3.5 rounded-xl bg-[#008744] hover:bg-[#009b4e] text-white font-bold text-sm shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <span>Request Custom Growth Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
              <Link
                href="/platform"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0C1628] font-bold text-sm border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
              >
                Explore Agency OS
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 pt-3">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bi-Weekly Playbooks</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Headcount Overhead</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Unsubscribe Anytime</span>
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
