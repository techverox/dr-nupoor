"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/formatters";
import { Search, Clock, Calendar, ArrowRight, Sparkles, Filter } from "lucide-react";

interface BlogListClientProps {
  initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 6;

export function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Extract unique category names
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((p) => {
      if (p.categoryName?.trim()) {
        set.add(p.categoryName.trim());
      }
    });
    return ["All", ...Array.from(set)];
  }, [initialPosts]);

  // Filter posts by category and search keyword
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.categoryName?.toLowerCase() === selectedCategory.toLowerCase();

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

  // Handle Featured Post (displayed prominently if on Page 1 with no search filter)
  const isDefaultView = selectedCategory === "All" && !searchQuery.trim() && currentPage === 1;
  const featuredPost = isDefaultView
    ? filteredPosts.find((p) => p.isFeatured) || filteredPosts[0]
    : null;

  // Non-featured posts for the grid
  const gridPosts = useMemo(() => {
    if (featuredPost && isDefaultView) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, isDefaultView]);

  // Pagination calculation
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return gridPosts.slice(start, start + POSTS_PER_PAGE);
  }, [gridPosts, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-12">
      {/* 1. Interactive Search & Category Filter Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 pr-2 hidden sm:inline-flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search playbooks & topics..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* 2. Featured Post Showcase (Hero Card) */}
      {featuredPost && (
        <article className="group relative bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Featured Image */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto bg-slate-900 overflow-hidden">
              <Image
                src={featuredPost.featuredImage || "/images/og-image.jpg"}
                alt={featuredPost.featuredImageAlt || featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Insight
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
                    {featuredPost.categoryName || "Marketing"}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {featuredPost.readingTimeMinutes || 5} min read
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mb-4 group-hover:text-emerald-600 transition-colors tracking-tight leading-snug">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                    {featuredPost.author?.name ? featuredPost.author.name.charAt(0) : "D"}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {featuredPost.author?.name || "DigiVigee Team"}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 group-hover:bg-emerald-500 text-white group-hover:text-slate-950 font-bold text-xs transition-colors shadow-sm"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* 3. Grid of Articles */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <Link href={`/blog/${post.slug}`} className="block relative h-52 bg-slate-900 overflow-hidden">
                  <Image
                    src={post.featuredImage || "/images/og-image.jpg"}
                    alt={post.featuredImageAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider border border-white/20">
                      {post.categoryName || "Strategy"}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTimeMinutes || 5} min read
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px] flex items-center justify-center">
                    {post.author?.name ? post.author.name.charAt(0) : "D"}
                  </div>
                  <span className="font-semibold text-slate-700 truncate max-w-[120px]">
                    {post.author?.name || "DigiVigee Team"}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-bold group-hover:translate-x-1 transition-transform"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-950 mb-1">No articles found</h3>
          <p className="text-xs text-slate-500 mb-6">
            We couldn't find any articles matching &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* 4. Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                currentPage === page
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
