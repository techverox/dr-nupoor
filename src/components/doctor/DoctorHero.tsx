"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
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
  badge = "SURGICAL BREAST ONCOLOGY · BREAST CANCER SPECIALIST",
  subheadline = "Specialised care for breast cancer, benign breast lumps, and oncoplastic breast surgery with an evidence-based, compassionate, patient-first approach.",
  primaryCtaText = "Book a Consultation",
  primaryCtaLink = "/appointments",
  secondaryCtaText = "Consult on WhatsApp",
  secondaryCtaLink = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hello%20Dr.%20Nupur%20Patel,%20I%20would%20like%20to%20schedule%20a%20consultation.`,
}: DoctorHeroProps) {
  return (
    <section className="w-full bg-white py-2 sm:py-4 lg:py-6" id="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Contained Hero Box with Rich Visual Depth */}
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#FFF5F7] via-[#FAF0F3] to-[#F7E5EB] border border-[#F5CAD5] rounded-3xl lg:rounded-[36px] shadow-sm">
          
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#D84C70]/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#9B2846]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full p-4 sm:p-8 lg:p-12 xl:p-14">
            {/* Flex Container: On mobile image comes FIRST (order-1), on desktop text on left (order-1) & photo on right (order-2) */}
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              
              {/* =========================================================================
                  MOBILE ONLY: Doctor Photo shown AT THE TOP (order-1 on mobile)
                  ========================================================================= */}
              <div className="w-full lg:hidden order-1">
                <div className="relative w-full max-w-md mx-auto aspect-square sm:aspect-[4/3.8] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FCEEF2] to-[#F5D2DB] border border-[#F5CAD5] shadow-md">
                  <Image
                    src="/images/doctor/optimized/dr-nupur-clinic-hero-mobile.webp"
                    alt="Dr. Nupur Patel — Surgical Breast Oncologist in Ahmedabad"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-center"
                  />
                  {/* Subtle Gradient Overlay at bottom for legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  {/* Doctor Badge Pill on Mobile (top-left so pink ribbon on right stays visible) */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-rose-200 shadow-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-bold text-slate-900">Dr. Nupur Patel</span>
                  </div>

                  {/* Hospital Pill top-right */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-rose-100 shadow-xs flex items-center gap-1">
                    <span className="text-[10px] font-semibold text-rose-800">Marengo CIMS</span>
                  </div>

                  {/* Bottom Mobile Tagline */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-950/75 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 text-white flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold tracking-wider uppercase text-rose-300 leading-none">
                        Surgical Breast Oncology
                      </p>
                      <p className="text-[11px] font-medium text-white/90 leading-tight mt-0.5">
                        Marengo CIMS Hospital, Ahmedabad
                      </p>
                    </div>
                    <span className="text-[9.5px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                      OPD Available
                    </span>
                  </div>
                </div>
              </div>

              {/* =========================================================================
                  TEXT / HERO CONTENT (order-2 on mobile, order-1 on desktop)
                  ========================================================================= */}
              <div className="w-full lg:w-7/12 order-2 lg:order-1 space-y-4 sm:space-y-5">
                
                {/* 1. Top Eyebrow Badge - Surgical Breast Oncology */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5CAD5] text-[#88213B] text-[11px] sm:text-[12.5px] font-bold tracking-wider uppercase shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#D84C70] shrink-0 animate-pulse" />
                  <span>{badge}</span>
                </div>

                {/* 2. Main Heading - Explicitly "Surgical Breast Oncology" */}
                <h1 className="font-serif text-[28px] sm:text-[40px] md:text-[46px] lg:text-[48px] xl:text-[54px] font-bold text-slate-900 leading-[1.15] tracking-tight">
                  <span className="text-slate-900 block">Surgical Breast Oncology</span>
                  <span className="text-[#D84C70] block text-[24px] sm:text-[34px] md:text-[40px] lg:text-[42px] xl:text-[46px] mt-1">
                    &amp; Cancer Surgery in Ahmedabad
                  </span>
                </h1>

                {/* 3. Supporting Description */}
                <p className="text-slate-700 text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed font-normal max-w-2xl">
                  {subheadline}
                </p>

                {/* 4. Four Bullet Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Lady Breast Surgeon for Confidential Care</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Fellowship in Breast Oncology (Max)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Breast Conservation &amp; Oncoplastic Surgery</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Cashless Mediclaim &amp; TPA Empaneled</span>
                  </div>
                </div>

                {/* 5. CTA Buttons Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href={primaryCtaLink}
                    className="inline-flex items-center justify-center gap-2 bg-[#D84C70] hover:bg-[#C0395D] text-white text-[14px] sm:text-[15px] font-semibold px-7 py-3.5 rounded-full shadow-[0_4px_16px_rgba(216,76,112,0.28)] hover:shadow-[0_6px_22px_rgba(216,76,112,0.38)] transition-all duration-200 active:scale-95 text-center cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 ml-0.5" />
                  </Link>

                  <a
                    href={secondaryCtaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-700 hover:text-emerald-800 text-[14px] sm:text-[15px] font-semibold px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 text-center cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{secondaryCtaText}</span>
                  </a>
                </div>

                {/* 6. Hospital Practice Location Badge */}
                <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-slate-600 pt-1 font-medium">
                  <MapPin className="w-4 h-4 text-[#D84C70] shrink-0" />
                  <span>Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad</span>
                </div>

              </div>

              {/* =========================================================================
                  DESKTOP ONLY: Large High-Res Doctor Showcase Column (order-2 on desktop)
                  ========================================================================= */}
              <div className="hidden lg:block lg:w-5/12 order-2">
                <div className="relative w-full max-w-[440px] xl:max-w-[480px] mx-auto">
                  
                  {/* Decorative Frame Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-[#D84C70]/20 via-rose-200/40 to-transparent rounded-[32px] blur-md -z-10" />

                  {/* Main Portrait Card */}
                  <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-white to-[#FCE8ED] border-2 border-white shadow-xl">
                    <Image
                      src="/images/doctor/optimized/dr-nupur-clinic-hero-desktop.webp"
                      alt="Dr. Nupur Patel — Surgical Breast Oncology Specialist in Ahmedabad"
                      fill
                      priority
                      sizes="(min-width: 1024px) 480px"
                      className="object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                    />

                    {/* Gradient Overlay at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Floating Doctor Badge (Top-Left so the pink ribbon on right stays visible) */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-rose-100 shadow-md flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#FCE8ED] flex items-center justify-center text-[#D84C70]">
                        <ShieldCheck className="w-4 h-4 text-[#D84C70]" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-900 leading-none">Dr. Nupur Patel</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Associate Consultant</div>
                      </div>
                    </div>

                    {/* Sleek Floating Hospital / Philosophy Badge (Bottom) */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-rose-100 shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <div>
                          <div className="text-[11px] font-bold text-slate-900 leading-none">Marengo CIMS Hospital</div>
                          <div className="text-[9.5px] text-slate-500 mt-0.5 font-medium">Science City Road, Sola, Ahmedabad</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#88213B] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        Breast Oncology
                      </span>
                    </div>

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
