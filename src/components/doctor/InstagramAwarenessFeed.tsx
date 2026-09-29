"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, ExternalLink, X } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";
import { SITE_CONFIG } from "@/config/site";
import { InstagramPost } from "@/types/instagram";
import { subscribeLiveSync } from "@/lib/sync/clientSync";

const FALLBACK_SEED_POSTS: InstagramPost[] = [
  {
    id: "insta-seed-1",
    url: "https://www.instagram.com/drnoopurpatel",
    shortcode: "DEEarlySignsBC",
    title: "Early Signs of Breast Cancer",
    caption: "Early detection saves lives. Recognize the subtle symptoms early with Dr. Noopur Patel.",
    imageUrl: "/images/doctor/assets/insta-1.png",
    embedUrl: "https://www.instagram.com/reel/DEEarlySignsBC/embed/",
    order: 1,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "insta-seed-2",
    url: "https://www.instagram.com/drnoopurpatel",
    shortcode: "DELumpCancerous",
    title: "Is Every Breast Lump Cancerous?",
    caption: "Over 80% of breast lumps are benign (non-cancerous). Understand triple assessment and peace of mind.",
    imageUrl: "/images/doctor/assets/insta-2.png",
    embedUrl: "https://www.instagram.com/reel/DELumpCancerous/embed/",
    order: 2,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "insta-seed-3",
    url: "https://www.instagram.com/drnoopurpatel",
    shortcode: "DESelfExamGuide",
    title: "Breast Self-Exam: How to Do It?",
    caption: "A 5-minute monthly guide on how to perform a gentle breast self-examination at home.",
    imageUrl: "/images/doctor/assets/insta-3.png",
    embedUrl: "https://www.instagram.com/reel/DESelfExamGuide/embed/",
    order: 3,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "insta-seed-4",
    url: "https://www.instagram.com/drnoopurpatel",
    shortcode: "DETreatmentBCS",
    title: "Treatment Options for Breast Cancer",
    caption: "From Oncoplastic Breast Conservation to modern reconstructive care: what every patient should know.",
    imageUrl: "/images/doctor/assets/insta-4.png",
    embedUrl: "https://www.instagram.com/reel/DETreatmentBCS/embed/",
    order: 4,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "insta-seed-5",
    url: "https://www.instagram.com/drnoopurpatel",
    shortcode: "DEMammographyMyths",
    title: "Myths About Mammography",
    caption: "Dispelling common fears about radiation, pain, and age criteria for routine breast screenings.",
    imageUrl: "/images/doctor/assets/insta-5.png",
    embedUrl: "https://www.instagram.com/reel/DEMammographyMyths/embed/",
    order: 5,
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

export default function InstagramAwarenessFeed({ initialPosts }: { initialPosts?: InstagramPost[] }) {
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts || FALLBACK_SEED_POSTS);
  const [activeModalPost, setActiveModalPost] = useState<InstagramPost | null>(null);

  const fetchActivePosts = useCallback(async () => {
    try {
      const res = await fetch("/api/instagram", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
        setPosts(data.posts);
      }
    } catch {
      // Graceful fallback to initial or default
    }
  }, []);

  useEffect(() => {
    fetchActivePosts();
    // Subscribe to real-time mutations from admin panel
    const unsubscribe = subscribeLiveSync((event) => {
      if (!event.collection || event.collection === "instagramPosts") {
        fetchActivePosts();
      }
    });
    return () => unsubscribe();
  }, [fetchActivePosts]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalPost(null);
      }
    };
    if (activeModalPost) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalPost]);

  const displayPosts = posts.filter((p) => p.isActive).slice(0, 5);

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/50 border-b border-[#F5D6DE]" id="instagram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F4] text-[#88213B] text-[11px] font-bold uppercase tracking-wider border border-[#F5CAD5] mb-2.5">
              <InstagramIcon className="w-3.5 h-3.5 text-[#D84C70]" />
              Dr. Noopur Patel Practice
            </div>
            <h2 className="font-serif text-[30px] sm:text-[38px] font-bold text-slate-900 leading-tight mb-1.5">
              Latest From Instagram
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Breast health tips, cancer awareness reels, and surgical education.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#88213B] hover:text-[#731930] text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full border border-[#F5CAD5] bg-white hover:bg-[#FFF5F7] transition-all shadow-xs"
            >
              <InstagramIcon className="w-4 h-4 text-[#D84C70]" />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>

        {/* 5 Instagram Reel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {displayPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-2xl border border-[#F0D5DC] hover:border-[#D84C70] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer"
              onClick={() => setActiveModalPost(post)}
            >
              {/* Media Viewport */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src={post.imageUrl || "/images/doctor/assets/insta-1.png"}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 240px"
                />

                {/* Video Play Badge Overlay */}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#88213B] shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Subtle Instagram Watermark */}
                <div className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-xs text-white p-1 rounded-md">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Link */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-serif text-sm font-bold text-slate-900 leading-snug group-hover:text-[#88213B] transition-colors mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-[#88213B] group-hover:text-[#731930] flex items-center gap-1 transition-colors">
                    <span>Watch Reel</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>

                  {/* Direct Instagram Deep Link */}
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Open on Instagram"
                    className="p-1 text-slate-400 hover:text-[#D84C70] rounded-md transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE VIDEO / REEL MODAL (Plays video inside modal or redirects)
          ========================================================================= */}
      {activeModalPost && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalPost(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full overflow-hidden border border-slate-200 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <InstagramIcon className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-xs font-bold truncate">
                  {activeModalPost.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalPost(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Player or Fallback View */}
            <div className="relative w-full aspect-[9/16] max-h-[500px] sm:max-h-[540px] bg-black flex items-center justify-center overflow-hidden">
              {activeModalPost.embedUrl ? (
                <iframe
                  src={activeModalPost.embedUrl}
                  title={activeModalPost.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={activeModalPost.imageUrl || "/images/doctor/assets/insta-1.png"}
                    alt={activeModalPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center p-6 text-center text-white">
                    <Play className="w-12 h-12 text-rose-400 mb-3 fill-current" />
                    <p className="font-serif font-bold text-sm sm:text-base mb-2">
                      {activeModalPost.title}
                    </p>
                    <a
                      href={activeModalPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#88213B] text-white text-xs font-bold hover:bg-[#731930] shadow-md transition-all"
                    >
                      <span>Watch Reel on Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 font-medium">
                @drnoopurpatel
              </span>
              <a
                href={activeModalPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#88213B] hover:bg-[#731930] text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Watch on Instagram App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
