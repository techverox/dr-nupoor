"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InteractiveCard from "./InteractiveCard";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  CheckCircle2,
  X,
  Star,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, Counter } from "@/components/motion";
import { TestimonialItem } from "@/types";

// Customer Brand Logos (Clean Light-Themed Vector SVGs)
function CustomerLogo({ id }: { id: string }) {
  const fillClass = "fill-[#0C1628] text-[#0C1628]";

  switch (id) {
    case "nvidia":
      return (
        <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <svg className={`w-4 h-3.5 shrink-0 ${fillClass}`} viewBox="0 0 24 18">
            <path d="M7.4 9c0-1.8 1.4-3.2 3.2-3.2 1.8 0 3.2 1.4 3.2 3.2 0 1.8-1.4 3.2-3.2 3.2-1.8 0-3.2-1.4-3.2-3.2zm-2.8 0c0 3.3 2.7 6 6 6 2.8 0 5.2-2 5.8-4.6h-2.6c-.5 1.3-1.8 2.3-3.2 2.3-2 0-3.6-1.6-3.6-3.6s1.6-3.6 3.6-3.6c1.4 0 2.7.9 3.2 2.3h2.6C15.8 5 13.4 3 10.6 3c-3.3 0-6 2.7-6 6zm-2.8 0C1.8 4 6 0 10.6 0c4.4 0 8 3.1 8.8 7.1h-2.6C16.1 4.5 13.6 2.4 10.6 2.4c-3.6 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6c3 0 5.5-2.1 6.2-4.7h2.6c-.8 4-4.4 7.1-8.8 7.1C6 18 1.8 14 1.8 9z" />
          </svg>
          <span className={`text-[11.5px] font-black tracking-wider font-sans ${fillClass}`}>
            NVIDIA
          </span>
        </div>
      );
    case "syneos":
      return (
        <div className="flex flex-col text-left opacity-90 group-hover:opacity-100 transition-opacity">
          <span className={`text-[11.5px] font-black tracking-tight leading-none ${fillClass}`}>
            syneos.
          </span>
          <span className={`text-[6.5px] font-extrabold tracking-widest leading-none mt-0.5 opacity-80 ${fillClass}`}>
            HEALTH
          </span>
        </div>
      );
    case "walmart":
      return (
        <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
          <span className={`text-[11.5px] font-black tracking-tight font-sans ${fillClass}`}>
            Walmart
          </span>
          <svg className={`w-3 h-3 shrink-0 ${fillClass}`} viewBox="0 0 24 24">
            <path d="M12 2.5a1 1 0 011 1V7a1 1 0 11-2 0V3.5a1 1 0 011-1zm0 14a1 1 0 011 1v3.5a1 1 0 11-2 0V17a1 1 0 011-1zm8.2-7.5a1 1 0 010 1.4l-2.5 2.5a1 1 0 01-1.4-1.4l2.5-2.5a1 1 0 011.4 0zm-14 8.2a1 1 0 010 1.4l-2.5 2.5a1 1 0 01-1.4-1.4l2.5-2.5a1 1 0 011.4 0zm14 1.4a1 1 0 01-1.4 0l-2.5-2.5a1 1 0 111.4-1.4l2.5 2.5a1 1 0 010 1.4zm-14-8.2a1 1 0 01-1.4 0l-2.5-2.5a1 1 0 011.4-1.4l2.5 2.5a1 1 0 010 1.4z" />
          </svg>
        </div>
      );
    case "siemens":
      return (
        <span className={`text-[11px] font-black tracking-[0.14em] font-sans opacity-90 group-hover:opacity-100 transition-opacity ${fillClass}`}>
          SIEMENS
        </span>
      );
    case "nickelodeon":
      return (
        <span className={`text-[11.5px] font-black tracking-normal font-sans lowercase opacity-90 group-hover:opacity-100 transition-opacity ${fillClass}`}>
          nickelodeon
        </span>
      );
    default:
      return null;
  }
}

const defaultTestimonials = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Managing Partner",
    stat: "$14M+ Managed Spend",
    quote: "Digivigee became our tool of excellency for running enterprise ad accounts without chaos.",
    logoId: "nvidia",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "Head of Client Growth",
    stat: "120+ Active Workspaces",
    quote: "The most powerful work management platform I've seen in 12 years of scaling agency ops.",
    logoId: "syneos",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    role: "Performance Director",
    stat: "4.82x Blended ROAS",
    quote: "Now our 45 media buyers have a single source of truth across Meta, Google, and Shopify.",
    logoId: "walmart",
  },
  {
    id: 4,
    name: "David Sterling",
    role: "Founder & CEO",
    stat: "$250k/mo Retainer Run",
    quote: "With Digivigee's tools, our end client deliverables and retainer collections became 10x faster.",
    logoId: "siemens",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    role: "VP Operations",
    stat: "Zero Manual Invoicing",
    quote: "Without Digivigee, I cannot imagine our account managers tracking 100+ active retainers.",
    logoId: "nickelodeon",
  },
];

const fallbackLogos = ["nvidia", "syneos", "walmart", "siemens", "nickelodeon"];

export interface AgencyRoiComparisonProps {
  initialTestimonials?: TestimonialItem[];
}

export default function AgencyRoiComparison({ initialTestimonials }: AgencyRoiComparisonProps = {}) {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const testimonials = (initialTestimonials && initialTestimonials.length > 0)
    ? initialTestimonials.slice(0, 5).map((t, idx) => ({
        id: idx + 1,
        name: t.clientName || "Agency Client",
        role: [t.clientRole, t.companyName].filter(Boolean).join(" • ") || "Verified Client",
        stat: t.serviceReceived || (t.rating ? `${t.rating}.0 ★ Verified Review` : "Enterprise Client"),
        quote: t.testimonial,
        logoId: fallbackLogos[idx % fallbackLogos.length],
      }))
    : defaultTestimonials;

  return (
    <div className="relative">
      
      {/* ================================================================
          SECTION 5: ENTERPRISE FOUNDATION DUAL SPLIT CARDS (100% LIGHT-FIRST)
          ================================================================ */}
      <section className="py-16 sm:py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={20} duration={0.6}>
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.035em] text-[#0C1628] leading-[1.15] mb-3">
                The trusted operating system for<br />
                agencies and AI
              </h2>
              <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-2xl mx-auto">
                Built specifically for digital marketing agencies, backed by enterprise-grade security, client isolation, and automated retainer telemetry.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Split Card 1: Templatize repetitive work */}
            <StaggerItem className="h-full">
              <InteractiveCard maxTilt={1.5} glowEffect={false} className="h-full">
                <div className="h-full rounded-2xl sm:rounded-3xl bg-[#F8FAFC] p-5 sm:p-6 lg:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group text-left border border-slate-200/80 hover:border-emerald-500/30">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
                    {/* Left Text Column */}
                    <div className="lg:col-span-6 space-y-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        <span>SOP LIBRARY</span>
                      </div>
                      <h3 className="text-lg sm:text-[22px] font-bold text-[#0C1628] tracking-tight leading-snug group-hover:text-emerald-700 transition-colors">
                        Templatize repetitive work
                      </h3>
                      <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed font-normal">
                        Prebuilt agency templates give your account managers a proven retainer structure from day one. Standardize client workflows without reinventing the wheel.
                      </p>
                      
                      {/* Clean Minimalist Workflow Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {["Paid Media (ROAS)", "Creative Sprints", "Client Portal", "DTC Retainers"].map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 text-[10.5px] font-semibold text-[#0C1628] shadow-2xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Link
                          href="#contact"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008744] hover:text-[#007038] transition-colors group/link"
                        >
                          <span>Get started now</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Visual: Woman with Tablet Photo */}
                    <div className="lg:col-span-6 relative w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-xs border border-slate-200/80">
                      <Image
                        src="/images/showcase/template_woman_tablet.jpg"
                        alt="Templatize repetitive work"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 320px"
                      />
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>

            {/* Split Card 2: Support that understands your needs */}
            <StaggerItem className="h-full">
              <InteractiveCard maxTilt={1.5} glowEffect={false} className="h-full">
                <div className="h-full rounded-2xl sm:rounded-3xl bg-[#F8FAFC] p-5 sm:p-6 lg:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group text-left border border-slate-200/80 hover:border-emerald-500/30">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
                    {/* Left Text Column */}
                    <div className="lg:col-span-6 space-y-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/80 text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                        <span>DEDICATED SLAS</span>
                      </div>
                      <h3 className="text-lg sm:text-[22px] font-bold text-[#0C1628] tracking-tight leading-snug group-hover:text-emerald-700 transition-colors">
                        Support that understands your needs
                      </h3>
                      <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed font-normal">
                        Direct Slack connect with senior agency architects who have helped 2,350+ agencies scale past 100+ active retainers. Benefit from real operational experience.
                      </p>

                      {/* Clean Minimalist Trust & SLA Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1E293B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span className="truncate"><Counter to={99.8} decimals={1} suffix="% CSAT Rating" /></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1E293B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="truncate">SOC-2 Type II</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1E293B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span className="truncate">Slack Direct Sync</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1E293B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span className="truncate">Dedicated Pod</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008744] hover:text-[#007038] transition-colors group/link"
                        >
                          <span>Explore our services</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Visual: Two Women in Office Photo */}
                    <div className="lg:col-span-6 relative w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-xs border border-slate-200/80">
                      <Image
                        src="/images/showcase/enterprise_support_pro.jpg"
                        alt="Support that understands your needs"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 320px"
                      />
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>

          </StaggerContainer>

        </div>
      </section>

      {/* ================================================================
          SECTION 6: ULTRA-MINIMALIST ENTERPRISE SOCIAL PROOF WALL (LIGHT)
          ================================================================ */}
      <section id="testimonials" className="py-16 sm:py-20 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <FadeIn direction="up" distance={20} duration={0.6}>
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-3">
                <CheckCircle2 className="w-3 h-3 text-[#009669]" />
                <span>Customer Proof & Retention Results</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-[-0.03em] text-[#0C1628] leading-[1.15] mb-3">
                Your client retainers, scaled.<br />
                <span className="text-[#008744]">
                  <Counter to={2350} suffix="+ times over." />
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-xl mx-auto">
                Hear directly from agency owners and media directors running high-ticket retainers on Digivigee OS.
              </p>
            </div>
          </FadeIn>

          {/* Dynamic Balanced High-Density Review Cards with Cascading Stagger */}
          <StaggerContainer
            staggerDelay={0.06}
            className={`grid grid-cols-1 sm:grid-cols-2 ${testimonials.length <= 3 ? "lg:grid-cols-3 max-w-5xl mx-auto" : testimonials.length === 4 ? "lg:grid-cols-4 max-w-6xl mx-auto" : "lg:grid-cols-5"} gap-5 items-stretch`}
          >
            {testimonials.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <InteractiveCard
                  maxTilt={1.5}
                  glowEffect={false}
                  className="h-full"
                >
                  <div className="h-full rounded-2xl bg-white p-5 sm:p-5.5 border border-slate-200/80 hover:border-emerald-500/40 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group text-left">
                    
                    <div>
                      {/* Top Row: Customer Logo + 5-Star Rating */}
                      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                        <div className="h-5 flex items-center">
                          <CustomerLogo id={item.logoId} />
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, sIdx) => (
                            <Star key={sIdx} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Direct Quote */}
                      <p className="text-[12.5px] font-medium text-[#1E293B] leading-relaxed line-clamp-3 mb-4">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Bottom: Leader Details + Verified Metric + Case Study Button */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div>
                        <div className="text-[12px] font-bold text-[#0C1628] tracking-tight">
                          {item.name}
                        </div>
                        <div className="text-[10.5px] text-slate-500 truncate">
                          {item.role}
                        </div>
                      </div>

                      <div className="inline-block text-[10px] font-mono font-bold text-[#008744] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ✓ {item.stat}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedVideo(item.id)}
                        className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-[#008744] hover:text-white text-[#0C1628] text-[10.5px] font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200/80 cursor-pointer shadow-2xs"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>45s Video Briefing</span>
                      </button>
                    </div>

                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* Video Modal if clicked */}
      {selectedVideo !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 text-slate-900 relative border border-slate-200 shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#0C1628]">
                Executive Agency Case Study
              </h3>
              <p className="text-sm text-slate-600">
                Playing verified agency walkthrough for {testimonials.find(t => t.id === selectedVideo)?.name}...
              </p>
              <div className="aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200">
                <video
                  src="/video/hero_video.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
