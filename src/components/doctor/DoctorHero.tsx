"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, Sparkles, ShieldCheck, Quote } from "lucide-react";

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
  badge = "SPECIALISED. COMPASSIONATE. PATIENT-CENTRED.",
  subheadline = "Expert care for breast cancer and other breast conditions, with a focus on personalised treatment planning and advanced breast surgery.",
  primaryCtaText = "Book a Consultation",
  primaryCtaLink = "/appointments",
  secondaryCtaText = "Explore Treatments",
  secondaryCtaLink = "#cancer-treatments",
}: DoctorHeroProps) {
  return (
    <section className="w-full bg-white py-3 sm:py-6 lg:py-8">
      {/* =========================================================================
          CONTAINED HERO WRAPPER
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* THE HERO BOX: Controls max-width, rounding, and clips background */}
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#FFF5F7] via-[#FDF8F9] to-[#FCEEF2] border border-[#F5D6DE] rounded-3xl lg:rounded-[36px] lg:min-h-[580px] xl:min-h-[620px] flex flex-col lg:flex-row lg:items-center shadow-xs">
          
          {/* =========================================================================
              DESKTOP ONLY: Contained Background Image Layer & Floating Accents
              ========================================================================= */}
          <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/images/doctor/assets/hero-image.png"
              alt="Dr. Noopur Patel - Breast Cancer Surgeon in Ahmedabad"
              fill
              priority
              sizes="1280px"
              className="object-cover object-[85%_center] xl:object-[right_center]"
            />

            {/* Desktop: smooth gradient from left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F7] via-[#FFF5F7]/95 via-50% to-transparent w-[72%] xl:w-[58%]" />

            {/* Desktop Floating Doctor Pill (Top-Right) */}
            <div className="absolute top-8 right-12 z-20 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#F5D6DE] shadow-sm flex items-center gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#D84C70]">
                <ShieldCheck className="w-4 h-4 text-[#D84C70]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 leading-none">Dr. Noopur Patel</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Breast Cancer Surgeon · MS (Surg)</div>
              </div>
            </div>

            {/* Desktop Floating Quote (Mid-Right) */}
            <div className="absolute bottom-16 right-10 z-20 max-w-[270px] bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#F5D6DE] shadow-md shadow-rose-950/5">
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-[#D84C70] uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Patient-First Philosophy</span>
              </div>
              <p className="font-serif italic text-xs text-slate-800 leading-relaxed">
                &ldquo;Personalised Care for Every Step of Your Breast Health Journey&rdquo;
              </p>
            </div>
          </div>

          {/* =========================================================================
              FOREGROUND CONTENT CONTAINER (Both Mobile & Desktop)
              ========================================================================= */}
          <div className="relative z-10 w-full pt-6 pb-6 px-4 sm:px-8 lg:py-12 lg:px-12 xl:px-16 my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">
              
              {/* LEFT SIDE: Specialist Copy */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-3.5 sm:space-y-5 max-w-xl lg:max-w-none relative z-20">
                
                {/* 1. Top Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#F5CAD5] text-[#88213B] text-[10px] sm:text-[11.5px] font-bold tracking-wider uppercase shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#D84C70] shrink-0" />
                  <span>{badge}</span>
                </div>

                {/* 2. Main Heading */}
                <h1 className="font-serif text-[30px] sm:text-[40px] md:text-[48px] lg:text-[50px] xl:text-[54px] font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Breast Cancer Surgeon{" "}
                  <span className="text-[#D84C70] block sm:inline">in Ahmedabad</span>
                </h1>

                {/* 3. Supporting Description */}
                <p className="text-slate-600 text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed font-normal max-w-[540px]">
                  {subheadline}
                </p>

                {/* 4. CTA Buttons Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1">
                  <Link
                    href={primaryCtaLink}
                    className="inline-flex items-center justify-center gap-2 bg-[#D84C70] hover:bg-[#C0395D] text-white text-[14px] sm:text-[15px] font-semibold px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full shadow-[0_4px_16px_rgba(216,76,112,0.25)] hover:shadow-[0_6px_20px_rgba(216,76,112,0.35)] transition-all duration-200 active:scale-95 text-center cursor-pointer"
                  >
                    <span>{primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>

                  <a
                    href={secondaryCtaLink}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FDF2F4] border border-[#D84C70] text-[#D84C70] hover:text-[#88213B] text-[14px] sm:text-[15px] font-semibold px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full transition-all duration-200 active:scale-95 text-center cursor-pointer shadow-2xs"
                  >
                    <span>{secondaryCtaText}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>

                {/* 5. Hospital Location Text */}
                <div className="flex items-center gap-1.5 text-[11.5px] sm:text-[13px] text-slate-500 pt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#D84C70] shrink-0" />
                  <span>Marengo CIMS Hospital, Sola, Ahmedabad, Gujarat</span>
                </div>

              </div>

              {/* MOBILE ONLY: Doctor Photo Block below CTAs with Quote Card */}
              <div className="lg:hidden relative w-full mt-2">
                <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FCEEF2] to-[#F8DCE4] border border-[#F5CAD5]">
                  <Image
                    src="/images/doctor/assets/hero-image.png"
                    alt="Dr. Noopur Patel - Breast Cancer Surgeon in Ahmedabad"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw"
                    className="object-cover object-[75%_top]"
                  />
                  {/* Subtle bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Mobile Quote Overlay in Bottom Corner */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-rose-100 shadow-md flex items-start gap-2.5">
                    <Quote className="w-4 h-4 text-[#D84C70] shrink-0 mt-0.5" />
                    <p className="text-[11.5px] font-serif italic text-slate-800 leading-snug">
                      &ldquo;Personalised Care for Every Step of Your Breast Health Journey&rdquo;
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
