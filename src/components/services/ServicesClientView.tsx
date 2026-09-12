"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Layers,
  CheckCircle2,
  TrendingUp,
  Search,
  Share2,
  Palette,
  Code2,
  Globe,
  Zap,
  Sliders,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import InteractiveCard from "@/components/InteractiveCard";
import { FadeIn, StaggerContainer, StaggerItem, Counter } from "@/components/motion";
import { ServiceItem } from "@/types";

// ============================================================================
// DETERMINISTIC FORMATTER (ZERO SSR HYDRATION MISMATCH)
// ============================================================================
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ============================================================================
// 6 CANONICAL ENGINES MATCHING USER SCREENSHOT & PALETTE
// ============================================================================
interface EngineConfig {
  slug: string;
  title: string;
  tagline: string;
  category: "all" | "paid-media" | "creative-ops" | "engineering" | "search-local" | "revops";
  metric: string;
  metricLabel: string;
  podNumber: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  iconBorder: string;
  badgeBg: string;
  badgeText: string;
  deliverables: string[];
}

const CANONICAL_ENGINES: EngineConfig[] = [
  {
    slug: "social-media-marketing",
    title: "Social Media Delivery Engine",
    tagline: "Multi-client visual calendars & 1-click approvals",
    category: "creative-ops",
    metric: "78% Faster",
    metricLabel: "Sign-Off Velocity",
    podNumber: "01",
    icon: Share2,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-500/10",
    iconBorder: "border-pink-500/20",
    badgeBg: "bg-pink-50",
    badgeText: "text-pink-700",
    deliverables: [
      "Multi-client visual master calendar",
      "1-click passwordless client review links",
      "Hook-driven vertical video sprint workflows",
      "White-label monthly performance scorecards",
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance Ad Ops Engine",
    tagline: "Multi-account pacing & automated CAPI telemetry",
    category: "paid-media",
    metric: "4.82x",
    metricLabel: "Blended MER",
    podNumber: "02",
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    deliverables: [
      "Cross-channel budget pacing & threshold alerts",
      "Server-side Meta & Google CAPI event sync",
      "Algorithmic creative fatigue detection",
      "Real-time Shopify & Stripe revenue attribution",
    ],
  },
  {
    slug: "content-creation",
    title: "Creative Production & Proofing",
    tagline: "Collaborative asset library & client markup canvas",
    category: "creative-ops",
    metric: "24-Hour",
    metricLabel: "Creative Turnaround",
    podNumber: "03",
    icon: Palette,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    iconBorder: "border-purple-500/20",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    deliverables: [
      "Visual video & image annotation canvas",
      "Multi-brand cloud digital asset library",
      "Script-to-screen vertical reel pipelines",
      "Automated revision tracking & asset packaging",
    ],
  },
  {
    slug: "website-design-and-development",
    title: "High-Speed Client Web Engines",
    tagline: "Next.js performance stacks & conversion architecture",
    category: "engineering",
    metric: "100 / 100",
    metricLabel: "Core Web Vitals",
    podNumber: "04",
    icon: Code2,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    iconBorder: "border-indigo-500/20",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    deliverables: [
      "Sub-second Next.js App Router stacks",
      "High-converting landing page funnels",
      "Automated headless CMS connectors",
      "Enterprise edge hosting & 99.99% uptime",
    ],
  },
  {
    slug: "seo-and-local-seo",
    title: "SEO & Local Rank Architecture",
    tagline: "Automated GBP audit scorecards & rank tracking",
    category: "search-local",
    metric: "94% Win",
    metricLabel: "Top-3 Map Pack",
    podNumber: "05",
    icon: Globe,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    deliverables: [
      "Multi-location Google Business Profile sync",
      "Visual geo-grid local rank heatmaps",
      "Continuous citation health & NAP monitoring",
      "Automated white-label organic search reports",
    ],
  },
  {
    slug: "lead-generation-and-automation",
    title: "Lead Flow & Retainer Automation",
    tagline: "Multi-client CRM sync & automated billing rules",
    category: "revops",
    metric: "Zero-Late",
    metricLabel: "Stripe Autopilot",
    podNumber: "06",
    icon: Zap,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    iconBorder: "border-orange-500/20",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
    deliverables: [
      "Stripe Connect recurring retainer autopilot",
      "Zero-touch client intake & asset collection",
      "Multi-tenant CRM routing & instant SMS alerts",
      "Deliverable scope creep & overage tracking",
    ],
  },
  {
    slug: "brand-strategy",
    title: "Brand Strategy & Visual Architecture",
    tagline: "Enterprise brand design systems & positioning matrices",
    category: "creative-ops",
    metric: "3.2x",
    metricLabel: "Higher Retainers",
    podNumber: "07",
    icon: Sparkles,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/20",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    deliverables: [
      "Audited enterprise brand positioning blueprint",
      "Comprehensive Figma design system & UI token library",
      "Vector logo mark, iconography & typography scale",
      "Digital brand governance & identity guidelines portal",
    ],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Modules" },
  { id: "paid-media", label: "Paid Media" },
  { id: "creative-ops", label: "Creative Ops" },
  { id: "engineering", label: "Web Systems" },
  { id: "search-local", label: "Search & Local" },
  { id: "revops", label: "RevOps & Billing" },
];

export default function ServicesClientView({ services }: { services: ServiceItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Minimalist Retainer ROI Simulator State
  const [activeClients, setActiveClients] = useState<number>(18);
  const [avgRetainer, setAvgRetainer] = useState<number>(4500);

  // Deterministic calculations
  const monthlyHoursSaved = Math.round(activeClients * 12.5);
  const capacityMultiplier = (2.6 + activeClients / 45).toFixed(1);
  const annualSupportedArr = Math.round(activeClients * avgRetainer * 12);

  // Dynamic Engines mapped from CMS Services
  const activeEngines = useMemo(() => {
    const rawServices =
      Array.isArray(services) && services.length > 0
        ? services
        : (CANONICAL_ENGINES.map((e) => ({
            id: e.slug,
            slug: e.slug,
            title: e.title,
            shortDescription: e.tagline,
            deliverables: e.deliverables,
            order: parseInt(e.podNumber, 10),
            isPublished: true,
          })) as unknown as ServiceItem[]);

    const canonicalMap = new Map<string, EngineConfig>(
      CANONICAL_ENGINES.map((eng) => [eng.slug, eng])
    );

    return rawServices
      .filter((s) => s.isPublished !== false)
      .map((svc, idx) => {
        const canonical = canonicalMap.get(svc.slug);
        const podNum = String(svc.order || idx + 1).padStart(2, "0");

        return {
          slug: svc.slug,
          title: svc.title || canonical?.title || "Service Engine",
          tagline: svc.shortDescription || svc.subtitle || canonical?.tagline || "",
          category: canonical?.category || ("all" as const),
          metric: canonical?.metric || "Live Engine",
          metricLabel: canonical?.metricLabel || "SLA Verified",
          podNumber: canonical?.podNumber || podNum,
          icon: canonical?.icon || Layers,
          iconColor: canonical?.iconColor || "text-emerald-500",
          iconBg: canonical?.iconBg || "bg-emerald-500/10",
          iconBorder: canonical?.iconBorder || "border-emerald-500/20",
          badgeBg: canonical?.badgeBg || "bg-emerald-50",
          badgeText: canonical?.badgeText || "text-emerald-700",
          deliverables:
            Array.isArray(svc.deliverables) && svc.deliverables.length > 0
              ? svc.deliverables
              : canonical?.deliverables || [
                  "Standardized SOPs & Retainer Milestones",
                  "Automated Telemetry & Live Client Dashboards",
                  "Role-Based Permissions & Client SLA Guardrails",
                ],
        };
      });
  }, [services]);

  // Filter modules
  const filteredEngines = useMemo(() => {
    return activeEngines.filter((engine) => {
      const matchCategory =
        selectedCategory === "all" || engine.category === selectedCategory;

      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        engine.title.toLowerCase().includes(q) ||
        engine.tagline.toLowerCase().includes(q) ||
        engine.deliverables.some((d) => d.toLowerCase().includes(q))
      );
    });
  }, [activeEngines, selectedCategory, searchQuery]);

  return (
    <div className="relative w-full bg-[#FCFDFD] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900 overflow-hidden font-sans">
      
      {/* ====================================================================
          1. HERO SECTION: "THE CINEMATIC FIRST IMPRESSION" (LIGHT FIRST)
          ==================================================================== */}
      <section className="relative pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-16 sm:pb-22 border-b border-slate-200/70 overflow-hidden">
        {/* Ambient Subtle Luminous Gradient Mesh */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(0,135,68,0.07),transparent_75%)] pointer-events-none"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Staggered Line Reveal Headline */}
          <FadeIn direction="up" distance={20} duration={0.6} delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black tracking-[-0.035em] text-[#0C1628] mb-6 leading-[1.12]">
              Engineered Retainers for{" "}
              <span className="text-[#008744] bg-gradient-to-r from-[#008744] via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Hyper-Growth
              </span>{" "}
              Brands
            </h1>
          </FadeIn>

          {/* Minimalist Subtitle */}
          <FadeIn direction="up" distance={16} duration={0.6} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
              Eliminate fragmented freelancers and spreadsheet chaos. Six pre-configured delivery engines running your client acquisition, creative sprints, and attribution on autopilot.
            </p>
          </FadeIn>

          {/* Action Buttons (Subtle Metallic Sweep on Primary) */}
          <FadeIn direction="up" distance={14} duration={0.6} delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#008744] hover:bg-[#009A4E] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden cursor-pointer"
              >
                {/* Metallic Shimmer Sweep Light */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />
                <span>Request Retainer Blueprint</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="#engines"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-semibold text-sm shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
              >
                <span>Explore Delivery Engines</span>
              </a>
            </div>
          </FadeIn>

          {/* ================================================================
              INFINITE TRUST LOGO MARQUEE: "SILK SMOOTH CAROUSEL"
              ================================================================ */}
          <div className="pt-8 border-t border-slate-200/60">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-5">
              Trusted by 420+ high-growth agencies &amp; certified platforms
            </p>
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="flex items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300 select-none">
                <span className="text-xs sm:text-sm font-black tracking-wider text-slate-800">GOOGLE PREMIER PARTNER</span>
                <span className="text-xs sm:text-sm font-black tracking-wider text-slate-800">META BUSINESS PARTNER</span>
                <span className="text-xs sm:text-sm font-black tracking-wider text-slate-800">STRIPE VERIFIED</span>
                <span className="text-xs sm:text-sm font-black tracking-wider text-slate-800">TIKTOK PARTNER</span>
                <span className="text-xs sm:text-sm font-black tracking-wider text-slate-800">VERCEL ENTERPRISE</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          2. MINIMALIST METRIC RIBBON: DYNAMIC SPRING COUNT-UP
          ==================================================================== */}
      <section className="border-b border-slate-200/60 bg-white/70 backdrop-blur-xs py-7">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/60 text-center">
            
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-[#0C1628] tracking-tight">
                <Counter from={0} to={84.2} decimals={1} prefix="$" suffix="M+" duration={1.2} />
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Tracked Ad Spend
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-[#0C1628] tracking-tight">
                <Counter from={0} to={420} suffix="+" duration={1.2} />
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Verified Agencies
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-[#008744] tracking-tight">
                <Counter from={90} to={99.8} decimals={1} suffix="%" duration={1.2} />
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                CSAT Retainer Rating
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-[#0C1628] tracking-tight">
                &lt; 12 Mins
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Avg Client Sign-Off
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          3. ALL WORKFLOWS & DELIVERY ENGINES (PRE-CONFIGURED MODULES)
          ==================================================================== */}
      <section id="engines" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header: User's Exact Copy */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#008744] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>All Workflows &amp; Delivery Engines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0C1628]">
            Pre-configured modules to scale agency retainers
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Standardized execution pipelines designed for maximum output, zero friction, and high client retention.
          </p>
        </div>

        {/* Minimalist Control Bar (Framer Motion layoutId Magnetic Pill Glide) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 pb-4 border-b border-slate-200/70">
          
          {/* Category Tabs with Morphing Sliding Pill */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer z-10"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-white rounded-lg shadow-2xs border border-slate-200/80 z-[-1]"
                    />
                  )}
                  <span className={isActive ? "text-[#0C1628] font-bold" : "text-slate-500 hover:text-slate-800"}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Minimalist Live Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter workflows..."
              className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008744]/30 focus:border-[#008744] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 6 Core Cards in 3x2 Grid (Linear-Grade Specular Highlight & Micro-Lift) */}
        {filteredEngines.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No workflows found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-3 text-xs font-bold text-[#008744] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <StaggerContainer
            staggerDelay={0.07}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            {filteredEngines.map((engine) => {
              const Icon = engine.icon;

              return (
                <StaggerItem key={engine.slug} distance={18} duration={0.45}>
                  <InteractiveCard
                    maxTilt={2}
                    glowEffect={true}
                    className="h-full group"
                  >
                    <div className="h-full rounded-2xl bg-white p-7 border border-slate-200/90 hover:border-emerald-500/40 shadow-2xs hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between text-left">
                      
                      <div>
                        {/* Top: Icon + Number (Styled Exactly as User Attachment) */}
                        <div className="flex items-center justify-between mb-5">
                          <div className={`w-12 h-12 rounded-xl ${engine.iconBg} border ${engine.iconBorder} ${engine.iconColor} flex items-center justify-center transition-all shadow-2xs`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100/80 px-2.5 py-0.5 rounded-md border border-slate-200/60">
                            POD {engine.podNumber}
                          </span>
                        </div>

                        {/* Title & User's Tagline */}
                        <h3 className="text-xl font-extrabold text-[#0C1628] tracking-tight mb-1.5 group-hover:text-[#008744] transition-colors leading-snug">
                          <Link href={`/services/${engine.slug}`}>
                            {engine.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-[13px] font-medium text-slate-500 leading-relaxed mb-6">
                          {engine.tagline}
                        </p>

                        {/* Deliverables Badges */}
                        <div className="space-y-2 pt-4 border-t border-slate-100 mb-6">
                          {engine.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Bottom: Metric & Link */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-black text-[#0C1628]">{engine.metric}</div>
                          <div className="text-[10px] font-medium text-slate-400">{engine.metricLabel}</div>
                        </div>

                        <Link
                          href={`/services/${engine.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008744] hover:text-[#009A4E] transition-colors group/link"
                        >
                          <span>Explore Specs</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                    </div>
                  </InteractiveCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

      </section>

      {/* ====================================================================
          4. MINIMALIST RETAINER CAPACITY & ROI SIMULATOR (ZERO CLUTTER)
          ==================================================================== */}
      <section className="py-20 bg-white border-y border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sliders className="w-3 h-3 text-[#008744]" />
              <span>Retainer ROI Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1628]">
              Model your agency pod capacity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Drag the slider to calculate hours saved and annual retainer run-rate supported.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-xs space-y-8">
            
            {/* Slider: Active Retainers */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  Active Client Retainers Managed
                </label>
                <span className="text-base sm:text-lg font-mono font-black text-[#008744] bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                  {activeClients} Accounts
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={1}
                value={activeClients}
                onChange={(e) => setActiveClients(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#008744]"
              />
              <div className="flex justify-between text-[10.5px] font-medium text-slate-400">
                <span>5 Boutique</span>
                <span>30 Growing Agency</span>
                <span>60+ Enterprise</span>
              </div>
            </div>

            {/* Metric Results Grid (Deterministic Formatter - Zero Hydration Errors) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200/60">
              
              <div className="p-4 rounded-2xl bg-white border border-slate-200/70 text-center shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-[#0C1628]">
                  {monthlyHoursSaved} <span className="text-xs text-slate-400 font-semibold">hrs</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  Saved Monthly / Pod
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/70 text-center shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-[#008744]">
                  +{capacityMultiplier}x
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  Capacity Multiplier
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/70 text-center shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-[#0C1628]">
                  ${formatNumber(annualSupportedArr)}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  Annual ARR Supported
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="text-center pt-2">
              <Link
                href={`/contact?clients=${activeClients}&retainer=${avgRetainer}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008744] hover:bg-[#009A4E] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Deploy Retainer Blueprint for {activeClients} Clients</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          5. MINIMALIST FAQ (4 HIGH-VALUE QUESTIONS)
          ==================================================================== */}
      <section className="py-20 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1628]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Common questions regarding white-labeling, SLAs, and pod deployments.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "How fast can a dedicated growth pod be deployed?",
              a: "Pods are provisioned within 72 hours. Your Dedicated Lead Architect establishes private Slack channels, server CAPI tracking, and historical asset ingestion during Days 1-3.",
            },
            {
              q: "Are the client approval portals 100% white-labeled?",
              a: "Yes. All client proofing links, video annotation canvases, and reporting scorecards can be served on your agency's custom subdomain (e.g. portal.yourbrand.com) with zero DigiVigee branding.",
            },
            {
              q: "How does DigiVigee prevent ad budget overspends?",
              a: "Our Performance Ad Ops Engine executes automated pacing rules that scan Meta, Google, and TikTok spend every 15 minutes, throttling campaigns instantly if daily thresholds are reached.",
            },
            {
              q: "Can we mix and match different delivery engines?",
              a: "Yes. Most scaling agencies deploy a compound pod consisting of Performance Ad Ops + Creative Production + Next.js Web Systems for unified cross-channel compounding.",
            },
          ].map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl bg-white border border-slate-200/80 p-5 transition-all open:shadow-xs"
            >
              <summary className="flex items-center justify-between font-bold text-slate-800 cursor-pointer list-none text-sm">
                <span>{item.q}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-3" />
              </summary>
              <p className="mt-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed pt-2.5 border-t border-slate-100">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}
