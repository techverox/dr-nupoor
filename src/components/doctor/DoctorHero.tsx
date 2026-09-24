"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Activity,
  MessageCircle
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface DoctorHeroProps {
  badge?: string;
  headline?: string;
  headlineHighlight?: string;
  subheadline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function DoctorHero({
  badge = "SPECIALISED BREAST CARE IN AHMEDABAD",
  headline = "Expert Care for",
  headlineHighlight = "Every Woman",
  subheadline = "Compassionate, evidence-based and personalised surgical breast care — from diagnosis to recovery and long-term surveillance.",
  primaryCtaText = "Request an Appointment",
  primaryCtaLink = "/appointments",
  secondaryCtaText = "Consult on WhatsApp",
  secondaryCtaLink = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`,
}: DoctorHeroProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#FFF8F9] via-[#FFFFFF] to-[#FFFFFF] overflow-hidden pt-8 pb-16 lg:py-20 border-b border-rose-100/50">
      {/* Subtle decorative background contours */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#FDF2F4] to-transparent rounded-full blur-3xl pointer-events-none -z-0 opacity-70" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#FFF0F3] rounded-full blur-3xl pointer-events-none -z-0 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF2F4] border border-[#F5D6DE] text-[#D84C70] text-[11px] sm:text-[12px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70]" />
              {badge}
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-[42px] sm:text-[54px] lg:text-[62px] font-bold text-[#1A202C] leading-[1.1] tracking-tight">
              {headline}{" "}
              <span className="italic font-serif text-[#D84C70] font-medium block sm:inline">
                {headlineHighlight}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-600 text-[16px] sm:text-[18px] leading-relaxed max-w-2xl font-normal">
              {subheadline}
            </p>

            {/* 4 Feature Value Pills (Exact Match from Screenshot) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FFF8F9] border border-[#F5D6DE]/70 text-center transition-all hover:bg-[#FDF2F4] hover:shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#D84C70] mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[12px] font-semibold text-slate-800">Early Detection</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FFF8F9] border border-[#F5D6DE]/70 text-center transition-all hover:bg-[#FDF2F4] hover:shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#D84C70] mb-2">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-[12px] font-semibold text-slate-800">Advanced Surgical Care</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FFF8F9] border border-[#F5D6DE]/70 text-center transition-all hover:bg-[#FDF2F4] hover:shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#D84C70] mb-2">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[12px] font-semibold text-slate-800">Oncoplastic Approach</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FFF8F9] border border-[#F5D6DE]/70 text-center transition-all hover:bg-[#FDF2F4] hover:shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#D84C70] mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-[12px] font-semibold text-slate-800">Patient-Centred Support</span>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <Link
                href={primaryCtaLink}
                className="inline-flex items-center justify-center gap-2.5 bg-[#D84C70] hover:bg-[#BE3A5C] text-white text-[15px] font-semibold px-7 py-3.5 rounded-full shadow-[0_6px_20px_rgba(216,76,112,0.28)] hover:shadow-[0_8px_25px_rgba(216,76,112,0.38)] transition-all duration-200 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>{primaryCtaText}</span>
              </Link>

              <a
                href={secondaryCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white border-1.5 border-[#D84C70] text-[#D84C70] hover:bg-[#FDF2F4] text-[15px] font-semibold px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#D84C70]" />
                <span>{secondaryCtaText}</span>
              </a>
            </div>

            {/* Location Tag */}
            <div className="flex items-center gap-2 text-[13px] text-slate-500 pt-1 font-medium">
              <MapPin className="w-4 h-4 text-[#D84C70]" />
              <span>Located at Marengo CIMS Hospital, Ahmedabad, Gujarat</span>
            </div>
          </div>

          {/* Right Column: Doctor Portrait & Aesthetic Badge */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Background Soft Pink Pod Shape */}
            <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[36px] bg-gradient-to-tr from-[#FCE7EC] via-[#FDF2F4] to-[#FFF5F7] p-2.5 border border-[#F5D6DE]/60 shadow-[0_20px_50px_rgba(216,76,112,0.12)] overflow-hidden">
              
              {/* Doctor Main Portrait */}
              <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-slate-50">
                <Image
                  src="/images/doctor/assets/dr-noopur-hd.jpg"
                  alt="Dr. Noopur Patel, Breast Cancer Surgeon & Associate Consultant in Surgical Breast Oncology"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                />

                {/* Subtle soft gradient fade at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Doctor Quote Overlay */}
                <div className="absolute top-4 left-4 max-w-[190px] bg-white/90 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/70 shadow-sm">
                  <p className="font-serif italic text-[13px] text-[#9B2846] leading-tight font-medium">
                    &ldquo;Early Detection Saves Lives&rdquo;
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">
                    — Dr. Noopur Patel
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Right Floating Badge (Exact Match) */}
            <div className="absolute -bottom-4 right-0 sm:right-2 bg-white/95 backdrop-blur-md border border-[#F5D6DE] rounded-2xl p-2.5 shadow-xl flex items-center gap-3 max-w-[220px] animate-fade-in">
              <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden shadow-xs">
                <Image
                  src="/images/doctor/assets/favicon.png"
                  alt="Dr. Noopur Patel Brand Icon"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[12px] font-bold text-[#1A202C] leading-tight">
                  Stronger Women
                </span>
                <span className="text-[10.5px] font-semibold text-[#D84C70]">
                  Healthier Tomorrows
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
