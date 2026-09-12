"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Bot,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Check
} from "lucide-react";
import { FadeIn, Counter, MagneticButton } from "@/components/motion";
import { HomePageContent } from "@/types";

interface HeroProps {
  content?: HomePageContent;
}

export default function Hero({ content }: HeroProps) {
  const [currentCycle, setCurrentCycle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Auto-cycle through the 3 cards every 3.8s, paused on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentCycle((prev) => (prev + 1) % 3);
    }, 3800);
    return () => clearInterval(timer);
  }, [isHovered]);

  // Smooth mouse parallax physics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 9;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3 Physical visual slots matching Wrike 1:1 compact proportions
  // Slot 0: Top-Left | Slot 1: Middle-Right | Slot 2: Bottom-Left
  const slotCoords = [
    { x: 6, y: 4, width: 236 },
    { x: 164, y: 106, width: 240 },
    { x: 6, y: 208, width: 236 },
  ];

  // Dynamic slot assignment across the 3 cyclic states from Wrike
  const getCardPlacement = (cardIndex: number, cycle: number) => {
    let slot = 0;
    if (cycle === 0) {
      if (cardIndex === 0) slot = 0;
      else if (cardIndex === 1) slot = 2;
      else slot = 1;
    } else if (cycle === 1) {
      if (cardIndex === 1) slot = 0;
      else if (cardIndex === 0) slot = 1;
      else slot = 2;
    } else {
      // cycle === 2
      if (cardIndex === 2) slot = 1;
      else if (cardIndex === 0) slot = 0;
      else slot = 2;
    }

    const isActive = cardIndex === cycle;
    return { slot, isActive };
  };

  // Enterprise Wrike Card Definitions
  const heroCards = [
    {
      id: "planning",
      title: "Project planning",
      icon: (
        <svg className="w-[18px] h-[18px] text-[#0C1628] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="3" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      ),
      progressWidths: ["100%", "78%"],
      avatars: [
        "/images/showcase/sophie_laurent.jpg",
        "/images/showcase/marcus_vance.jpg"
      ],
      badges: [
        {
          id: "filter",
          icon: (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V20a1 1 0 0 1-1.447.894l-4-2A1 1 0 0 1 8 18v-3.586a1 1 0 0 0-.293-.707L1.293 7.293A1 1 0 0 1 1 6.586V4z" />
            </svg>
          )
        }
      ]
    },
    {
      id: "backlog",
      title: "Backlog review",
      icon: (
        <svg className="w-[18px] h-[18px] text-[#0C1628] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="6" height="6" rx="1.5" />
          <rect x="3" y="14" width="6" height="6" rx="1.5" />
          <path d="M6 10v4" />
          <path d="M9 7h7a3 3 0 0 1 3 3v2" />
          <polyline points="16 11 19 14 22 11" />
        </svg>
      ),
      progressWidths: ["100%", "65%"],
      avatars: [
        "/images/showcase/elena_rostova.jpg"
      ],
      badges: [
        {
          id: "puzzle",
          icon: (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 11H19V7a2 2 0 0 0-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4a2 2 0 0 0-2 2v3.8h1.5a2.5 2.5 0 0 1 0 5H2V20a2 2 0 0 0 2 2h3.8v-1.5a2.5 2.5 0 0 1 5 0V22H17a2 2 0 0 0 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z" />
            </svg>
          )
        }
      ]
    },
    {
      id: "risk",
      title: "Risk mitigation",
      icon: (
        <svg className="w-[18px] h-[18px] text-[#0C1628] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      progressWidths: ["100%", "72%"],
      avatars: [
        "/images/showcase/sophie_laurent.jpg",
        "/images/showcase/david_sterling.jpg"
      ],
      badges: [
        {
          id: "shield",
          icon: (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          )
        },
        {
          id: "bot",
          icon: (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h2a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v1a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-1H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1v-1a5 5 0 0 1 5-5h2V5.73A2 2 0 0 1 12 2zm-3 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
            </svg>
          )
        }
      ]
    }
  ];

  // Enterprise Client Brand Marks: Uniform Premium Glass Cards & Optically Balanced Proportions
  const brandLogos = [
    {
      id: "techverox",
      name: "Techverox",
      element: (
        <div className="h-10 sm:h-12 w-full max-w-[150px] px-2.5 sm:px-3 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-slate-300 shadow-2xs hover:shadow-xs flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <img
            src="/images/techverox_logo.png"
            alt="Techverox"
            className="h-[25px] sm:h-[29px] lg:h-[31px] w-auto max-w-full object-contain shrink-0"
          />
        </div>
      )
    },
    {
      id: "ms-cooling",
      name: "MS Cooling Engineering",
      element: (
        <div className="h-10 sm:h-12 w-full max-w-[150px] px-2.5 sm:px-3 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-slate-300 shadow-2xs hover:shadow-xs flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <img
            src="/images/brands/ms-cooling.png"
            alt="MS Cooling Engineering"
            className="h-[25px] sm:h-[29px] lg:h-[31px] w-auto max-w-full object-contain shrink-0 mix-blend-multiply"
          />
        </div>
      )
    },
    {
      id: "tshirt-factory",
      name: "T-Shirt Factory",
      element: (
        <div className="h-10 sm:h-12 w-full max-w-[150px] px-2.5 sm:px-3 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-slate-300 shadow-2xs hover:shadow-xs flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <img
            src="/images/brands/tshirt-factory.jpg"
            alt="T-Shirt Factory"
            className="h-[33px] sm:h-[38px] lg:h-[40px] w-auto max-w-full object-contain shrink-0 mix-blend-multiply contrast-105"
          />
        </div>
      )
    },
    {
      id: "nexus-global",
      name: "Nexus Global Overseas",
      element: (
        <div className="h-10 sm:h-12 w-full max-w-[150px] px-2.5 sm:px-3 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-slate-300 shadow-2xs hover:shadow-xs flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <img
            src="/images/brands/nexus-global.png"
            alt="Nexus Global Overseas"
            className="h-[25px] sm:h-[30px] lg:h-[32px] w-auto max-w-full object-contain shrink-0 mix-blend-multiply"
          />
        </div>
      )
    },
    {
      id: "truck-sathi",
      name: "Truck Sathi",
      element: (
        <div className="h-10 sm:h-12 w-full max-w-[150px] px-2.5 sm:px-3 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-slate-300 shadow-2xs hover:shadow-xs flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <img
            src="/images/brands/truck-sathi.png"
            alt="Truck Sathi"
            className="h-[24px] sm:h-[28px] lg:h-[30px] w-auto max-w-full object-contain shrink-0 contrast-110"
          />
        </div>
      )
    },
    {
      id: "ms-majadari",
      name: "MS Majadari",
      element: (
        <div className="h-10 sm:h-12 w-full max-w-[150px] px-2 sm:px-2.5 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-slate-300 shadow-2xs hover:shadow-xs flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <img
            src="/images/brands/ms-majadari.png"
            alt="MS Majadari"
            className="h-[26px] sm:h-[30px] lg:h-[32px] w-auto max-w-full object-contain shrink-0"
          />
        </div>
      )
    }
  ];

  return (
    <section
      ref={heroRef}
      className="hero relative pt-[78px] sm:pt-[90px] lg:pt-[102px] pb-6 sm:pb-8 overflow-hidden bg-transparent"
    >
      {/* Main Editorial Content & Visual Layer (Aligned with Navbar max-w-7xl Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Hero Section: Split Headline & Wrike-Style Floating Cards Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 xl:gap-12 items-center w-full">
          
          {/* Left Column: Typography & Dual CTA - order-2 on mobile (below animation), lg:order-1 on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-6 text-left space-y-3.5 sm:space-y-5 relative">
            {/* Top Kicker Eyebrow Badge matching DigiVigee Logo Palette */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-[#00C853]/25 text-[#008744] text-[11.5px] sm:text-[12.5px] font-semibold tracking-tight shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C853] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C853]"></span>
              </span>
              <span className="text-[#0A2248] font-bold">DIGIVIGEE</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">
                {content?.heroBadge || "Digital Agency & AI Platform"}
              </span>
              <ArrowRight className="w-3 h-3 text-[#00C853] ml-0.5" />
            </div>

            {/* Logo-Harmonized High-Authority Headline */}
            <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] xl:text-[60px] font-extrabold tracking-[-0.035em] text-[#0A2248] leading-[1.06]">
              {content?.heroHeadline || "High-Performance Marketing."}{" "}
              <span className="text-[#00C853]">
                {content?.heroHeadlineHighlight || "Powered by AI."}
              </span>
            </h1>

            {/* High-Legibility Minimalist Subheadline for Digital Marketing Agency OS */}
            <p className="text-[14.5px] sm:text-[17px] text-[#3E4D64] font-normal leading-[1.6] max-w-lg">
              {content?.heroSubheadline || "We engineer predictable revenue, high-ticket leads, and omnichannel growth for scaling brands—backed by 24/7 transparent client portals and autonomous AI campaign telemetry."}
            </p>

            {/* Dual CTAs: Pure DigiVigee Emerald Primary + Minimalist Frosted Glass Secondary */}
            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton strength={0.18}>
                <Link
                  href={content?.primaryCtaLink || "/contact"}
                  className="group relative inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-7 sm:px-8 rounded-full text-[13px] sm:text-[13.5px] font-bold text-white bg-[#00C853] hover:bg-[#00B448] shadow-[0_4px_18px_rgba(0,200,83,0.32)] hover:shadow-[0_6px_26px_rgba(0,200,83,0.45)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>{content?.primaryCtaText || "Claim Free Growth Audit"}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </MagneticButton>

              {/* Minimalist Frosted Glass Tour Button */}
              <Link
                href={content?.secondaryCtaLink || "#platform"}
                className="inline-flex items-center gap-2.5 h-11 sm:h-12 px-5 sm:px-6 rounded-full text-[13px] sm:text-[14px] font-semibold text-[#0A2248] bg-white/90 hover:bg-slate-50/90 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all duration-200 group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center group-hover:bg-emerald-100/70 transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current text-[#00C853] pl-0.5" />
                </div>
                <span>{content?.secondaryCtaText || "Explore AI Platform"}</span>
              </Link>
            </div>

            {/* Micro Social Proof Badges with Live Radar Pulse & Counter */}
            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 text-[11px] sm:text-[11.5px] text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-[#008744] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C853] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C853]"></span>
                </span>
                <Counter to={2350} suffix="+ Scaling Brands & Agencies" />
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-slate-600">Full-Service Growth</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-slate-600">24/7 Live Client Portal</span>
            </div>
          </div>

          {/* Right Column: Floating Cards Stage - order-1 on mobile (UPAR), lg:order-2 on desktop */}
          <div
            className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6 relative flex flex-col justify-center items-center mb-1 sm:mb-3 lg:my-0 select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Outer 3D Perspective Stage */}
            <div
              className="relative w-full max-w-[430px] xl:max-w-[440px] h-[250px] sm:h-[300px] lg:h-[350px] flex items-center justify-center scale-[0.72] sm:scale-[0.85] md:scale-95 lg:scale-100 origin-center transition-transform"
              style={{ perspective: "1200px" }}
            >
              {/* DigiVigee Logo-Matched Radiant Emerald Halo */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] bg-gradient-to-tr from-[#00C853]/18 via-[#00C853]/10 to-[#0A2248]/6 rounded-full blur-[65px] pointer-events-none -z-10"
                style={{
                  transform: `translate3d(calc(-50% + ${mouseOffset.x * -1.5}px), calc(-50% + ${mouseOffset.y * -1.5}px), 0)`,
                  transition: "transform 0.3s ease-out",
                }}
              />

              {/* Ambient Decorative Accents matching Wrike Slide 4 */}
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 0)`,
                  transition: "transform 0.25s ease-out",
                }}
              >
                {/* Floating Green Plus '+' Top Right */}
                <span className="absolute top-2 right-4 text-[#00E05C] font-light text-lg select-none opacity-85 animate-pulse">
                  +
                </span>

                {/* Floating Green Plus '+' Bottom Right */}
                <span className="absolute bottom-4 right-5 text-[#00E05C]/75 font-light text-base select-none">
                  +
                </span>

                {/* Floating Green Solid Square Dot Left */}
                <div className="absolute top-[54%] left-0 w-2.5 h-2.5 rounded-xs bg-[#00E05C] shadow-2xs" />

                {/* Rounded Square Wireframe Top Right */}
                <div className="absolute top-1 right-2 w-16 h-16 rounded-xl border border-[#00E05C]/25" />

                {/* Rounded Square Wireframe Bottom Right */}
                <div className="absolute bottom-2 right-8 w-14 h-14 rounded-lg border border-[#00E05C]/20" />
              </div>

              {/* Inner 3D Card Stage responding dynamically to Mouse Cursor Tilt */}
              <div
                className="relative w-full h-full"
                style={{
                  transform: `rotateX(${-mouseOffset.y * 0.8}deg) rotateY(${mouseOffset.x * 0.8}deg) translate3d(${mouseOffset.x * -1.2}px, ${mouseOffset.y * -1.2}px, 0)`,
                  transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                  transformStyle: "preserve-3d",
                }}
              >
                {heroCards.map((card, cardIdx) => {
                  const { slot, isActive } = getCardPlacement(cardIdx, currentCycle);
                  const coords = slotCoords[slot];

                  return (
                    <div
                      key={card.id}
                      onClick={() => setCurrentCycle(cardIdx)}
                      className={`absolute rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md p-3 sm:p-3.5 border transition-all cursor-pointer ${
                        isActive
                          ? "border-emerald-200/90 shadow-[0_16px_36px_rgba(0,180,80,0.18),0_6px_16px_rgba(15,23,42,0.06)]"
                          : "border-slate-100/90 shadow-[0_6px_20px_rgba(15,23,42,0.04)] hover:shadow-md"
                      }`}
                      style={{
                        width: `${coords.width}px`,
                        transform: `translate3d(${coords.x}px, ${coords.y}px, ${isActive ? 24 : 0}px) scale(${isActive ? 1.03 : 0.95})`,
                        zIndex: isActive ? 30 : 10 + cardIdx,
                        opacity: isActive ? 1 : 0.88,
                        transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, box-shadow 0.6s ease",
                      }}
                    >
                      {/* Card Title Row with Icon */}
                      <div className="flex items-center gap-1.5 mb-2">
                        {card.icon}
                        <span className="text-[12.5px] sm:text-[13px] font-bold tracking-tight text-[#0C1628]">
                          {card.title}
                        </span>
                      </div>

                      {/* Dual Progress Bars: Wrike-Style 1s Progressive Gradient Fill in Cyclic Loop */}
                      <div className="space-y-1 mb-2.5">
                        {/* Progress Bar 1 */}
                        <div
                          className="h-[5px] rounded-full overflow-hidden bg-slate-200/80 relative"
                          style={{ width: card.progressWidths[0] }}
                        >
                          {isActive && (
                            <div
                              key={`bar-1-${currentCycle}-${card.id}`}
                              className="absolute inset-y-0 left-0 rounded-full animate-wrike-fill-1"
                              style={{
                                background: "linear-gradient(90deg, #B5F100 0%, #22C55E 46%, #67E8F9 100%)",
                                boxShadow: "0 0 10px rgba(52, 211, 153, 0.45)",
                              }}
                            />
                          )}
                        </div>

                        {/* Progress Bar 2 */}
                        <div
                          className="h-[5px] rounded-full overflow-hidden bg-slate-200/80 relative"
                          style={{ width: card.progressWidths[1] }}
                        >
                          {isActive && (
                            <div
                              key={`bar-2-${currentCycle}-${card.id}`}
                              className="absolute inset-y-0 left-0 rounded-full animate-wrike-fill-2"
                              style={{
                                background: "linear-gradient(90deg, #B5F100 0%, #22C55E 46%, #67E8F9 100%)",
                                boxShadow: "0 0 10px rgba(52, 211, 153, 0.45)",
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Avatars & Bright Green AI Badges Row */}
                      <div className="flex items-center gap-2 pt-0.5">
                        {/* Circular Team Avatars */}
                        <div className="flex items-center -space-x-1.5 shrink-0">
                          {card.avatars.map((avatarSrc, aIdx) => (
                            <div
                              key={aIdx}
                              className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-xs"
                            >
                              <Image
                                src={avatarSrc}
                                alt="Team Avatar"
                                fill
                                className="object-cover"
                                sizes="28px"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Wrike-Style Vibrant Green Rounded Square Badges with Sparkle */}
                        <div className="flex items-center gap-1">
                          {card.badges.map((badge, bIdx) => (
                            <div
                              key={bIdx}
                              className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-[#00F566] to-[#00C853] text-white flex items-center justify-center shadow-[0_3px_10px_rgba(0,224,92,0.28)] shrink-0 transition-transform hover:scale-105"
                            >
                              {badge.icon}
                              <span className="absolute -top-0.5 -right-0.5 text-[8px] text-white font-black leading-none select-none">
                                ✦
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tactile Cycle Navigation Indicator Pills */}
            <div className="flex items-center justify-center gap-2 pt-1 sm:pt-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCycle(idx)}
                  className={`h-1.5 rounded-full transition-all duration-400 cursor-pointer ${
                    currentCycle === idx
                      ? "w-7 bg-[#00E05C] shadow-[0_0_8px_rgba(0,224,92,0.5)]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Show ${heroCards[idx].title}`}
                />
              ))}
            </div>
          </div>

        </div>
        {/* ================================================================
            ENTERPRISE CLIENT TRUST RIBBON: STATIC OPTICALLY-BALANCED GRID
            ================================================================ */}
        <div className="w-full relative z-20 pt-4 sm:pt-6 pb-2 border-t border-slate-200/60 mt-4 sm:mt-8 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 sm:mb-4 text-center">
            <p className="text-[10px] sm:text-[11.5px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-slate-400">
              TRUSTED BY 2,350+ DIGITAL MARKETING AGENCIES & SCALING BRANDS WORLDWIDE
            </p>
          </div>

          {/* Clean Static Grid: 6 logos in 1 line on Desktop, 3x2 on Mobile & Tablet */}
          <div className="max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6">
            <div className="grid grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-3 sm:gap-6 lg:gap-8 py-1 sm:py-2">
              {brandLogos.map((brand) => (
                <div
                  key={brand.id}
                  className="group h-10 sm:h-12 lg:h-14 w-full flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-200 cursor-default"
                >
                  {brand.element}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
