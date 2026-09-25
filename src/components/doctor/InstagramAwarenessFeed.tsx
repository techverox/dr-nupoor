"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark, CheckCircle2 } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";
import { SITE_CONFIG } from "@/config/site";

export default function InstagramAwarenessFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const posts = [
    {
      id: 1,
      image: "/images/doctor/assets/insta-1.png",
      title: "Early Signs of Breast Cancer",
    },
    {
      id: 2,
      image: "/images/doctor/assets/insta-2.png",
      title: "Is Every Breast Lump Cancerous?",
    },
    {
      id: 3,
      image: "/images/doctor/assets/insta-3.png",
      title: "Breast Self-Exam: How to Do It?",
    },
    {
      id: 4,
      image: "/images/doctor/assets/insta-4.png",
      title: "Treatment Options for Breast Cancer",
    },
    {
      id: 5,
      image: "/images/doctor/assets/insta-5.png",
      title: "Myths About Mammography",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/50 border-b border-[#F5D6DE]" id="instagram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-[30px] sm:text-[38px] font-bold text-slate-900 leading-tight mb-1.5">
              Latest From Instagram
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Breast health tips, awareness and surgical education.
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
          {posts.map((post) => (
            <a
              key={post.id}
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-[#F0D5DC] hover:border-[#D84C70] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Media Viewport */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 240px"
                />
              </div>

              {/* Title & Link */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-serif text-sm font-bold text-slate-900 leading-snug group-hover:text-[#88213B] transition-colors mb-3">
                  {post.title}
                </h3>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#88213B] group-hover:text-[#731930] transition-colors pt-2 border-t border-slate-100">
                  <span>Watch on Instagram</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

