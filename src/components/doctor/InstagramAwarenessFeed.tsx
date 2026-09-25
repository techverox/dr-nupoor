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
      image: "/images/doctor/assets/dr-noopur-hd.jpg",
      category: "Doctor Insights",
      title: "Meet Dr. Noopur Patel",
      caption: "Dedicated to providing compassionate, evidence-based surgical breast oncology at Marengo CIMS Hospital.",
      likes: "1,428",
      comments: "54",
      hashtag: "#BreastSurgeon",
    },
    {
      id: 2,
      image: "/images/doctor/assets/early-detection-woman.png",
      category: "Self-Exam Guide",
      title: "Monthly Self-Exam Protocol",
      caption: "5 minutes each month can save a life. Knowing your normal breast tissue helps spot subtle changes early.",
      likes: "2,190",
      comments: "86",
      hashtag: "#EarlyDetection",
    },
    {
      id: 3,
      image: "/images/doctor/assets/anatomy-diagram.png",
      category: "Warning Signs",
      title: "Know The Warning Signs",
      caption: "Lumps, skin dimpling, or nipple changes merit prompt evaluation. Early staging ensures the highest cure rates.",
      likes: "1,845",
      comments: "63",
      hashtag: "#BreastHealth",
    },
    {
      id: 4,
      image: "/images/doctor/assets/service-2.png",
      category: "Oncoplastic Care",
      title: "Restoring Form & Symmetry",
      caption: "Oncoplastic surgery combines clean cancer clearance with plastic surgical techniques to preserve natural shape.",
      likes: "2,460",
      comments: "92",
      hashtag: "#OncoplasticSurgery",
    },
    {
      id: 5,
      image: "/images/doctor/assets/doctor-consultation-about.png",
      category: "Patient Support",
      title: "You Are Never Alone",
      caption: "Compassionate clinical companionship, emotional reassurance, and dedicated post-surgical surveillance.",
      likes: "3,110",
      comments: "118",
      hashtag: "#StrongerWomen",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/40 border-b border-rose-100/60" id="instagram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
              FOLLOW OUR JOURNEY
            </span>
            <h2 className="font-serif text-[32px] sm:text-[42px] font-bold text-[#1A202C] leading-tight mb-2">
              Latest from Instagram
            </h2>
            <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
              Health tips, patient education, awareness campaigns, and surgical breast oncology insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Carousel Arrow Buttons */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous posts"
                className="w-10 h-10 rounded-full bg-white border border-[#F5D6DE] text-slate-700 hover:text-[#D84C70] hover:border-[#D84C70] hover:bg-[#FFF8F9] flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next posts"
                className="w-10 h-10 rounded-full bg-white border border-[#F5D6DE] text-slate-700 hover:text-[#D84C70] hover:border-[#D84C70] hover:bg-[#FFF8F9] flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-white hover:bg-[#FDF2F4] transition-all shadow-xs"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>

        {/* 5 Professional Instagram Feed Cards with Smooth Horizontal Scrolling */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post) => (
            <a
              key={post.id}
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[calc(20%-20px)] snap-start bg-white rounded-2xl border border-[#F5D6DE] hover:border-[#D84C70] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* 1. Instagram Post Header */}
              <div className="p-3.5 flex items-center justify-between border-b border-slate-100 bg-white">
                <div className="flex items-center gap-2.5">
                  {/* Avatar with authentic Instagram gradient ring */}
                  <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex-shrink-0">
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-white bg-slate-100">
                      <Image
                        src="/images/doctor/assets/dr-noopur-hd.jpg"
                        alt="Dr. Noopur Patel"
                        fill
                        className="object-cover object-top"
                        sizes="32px"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-slate-900 leading-tight flex items-center gap-1">
                      drnoopurpatel
                      <CheckCircle2 className="w-3 h-3 text-[#3897f0] fill-[#3897f0] inline" />
                    </span>
                    <span className="text-[10px] text-slate-400">Marengo CIMS Hospital</span>
                  </div>
                </div>

                <InstagramIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#D84C70] transition-colors" />
              </div>

              {/* 2. Media Viewport (Square 1:1 Aspect Ratio) */}
              <div className="relative w-full aspect-square bg-slate-50 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 280px, 320px"
                />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10.5px] font-bold text-[#D84C70] border border-white/60 shadow-xs">
                  {post.category}
                </div>

                {/* Instagram Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#D84C70] text-[12px] font-bold flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>View Post</span>
                  </div>
                </div>
              </div>

              {/* 3. Action Icons & Likes Row */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-slate-700 mb-2">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-slate-700 group-hover:text-red-500 group-hover:fill-red-500 transition-colors cursor-pointer" />
                      <MessageCircle className="w-4 h-4 text-slate-700 hover:text-slate-900 transition-colors" />
                      <Send className="w-4 h-4 text-slate-700 hover:text-slate-900 transition-colors" />
                    </div>
                    <Bookmark className="w-4 h-4 text-slate-700 hover:text-slate-900 transition-colors" />
                  </div>

                  <div className="text-[11.5px] font-bold text-slate-900 mb-1">
                    {post.likes} likes
                  </div>

                  {/* Title & Caption */}
                  <h3 className="font-serif text-[13.5px] font-bold text-slate-900 leading-snug line-clamp-1 mb-1 group-hover:text-[#D84C70] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed line-clamp-2">
                    <span className="font-semibold text-slate-800 mr-1">drnoopurpatel</span>
                    {post.caption}
                  </p>
                </div>

                {/* Hashtag & Comments Footer */}
                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                  <span className="font-semibold text-[#D84C70]">{post.hashtag}</span>
                  <span className="text-slate-400">View {post.comments} comments</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

