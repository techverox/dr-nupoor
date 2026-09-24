"use client";

import React from "react";
import Image from "next/image";
import { InstagramIcon } from "./SocialIcons";
import { SITE_CONFIG } from "@/config/site";

export default function InstagramAwarenessFeed() {
  const posts = [
    { image: "/images/doctor/assets/insta-1.png", alt: "Dr. Noopur Patel Profile and Insights" },
    { image: "/images/doctor/assets/insta-2.png", alt: "Self Breast Exam Step by Step" },
    { image: "/images/doctor/assets/insta-3.png", alt: "Know the Signs of Breast Cancer" },
    { image: "/images/doctor/assets/insta-4.png", alt: "Breast Reconstruction - Restoring Confidence" },
    { image: "/images/doctor/assets/insta-5.png", alt: "Healthy Women Brighter Tomorrows" },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60" id="instagram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
              FOLLOW OUR JOURNEY
            </span>
            <h2 className="font-serif text-[32px] sm:text-[42px] font-bold text-[#1A202C] leading-tight mb-3">
              Latest from Instagram
            </h2>
            <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
              Health tips, patient education, awareness campaigns and more.
            </p>
          </div>

          <div>
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-[#FFF8F9] hover:bg-[#FDF2F4] transition-all shadow-xs"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>

        {/* 5 Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-[#F5D6DE] hover:border-[#D84C70] shadow-xs hover:shadow-md transition-all duration-300 block"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 220px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-[#D84C70]/20 transition-colors flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white/90 text-[#D84C70] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md">
                  <InstagramIcon className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
