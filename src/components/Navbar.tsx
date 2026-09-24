"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  UserCheck,
  Calendar,
  Search,
  CheckCircle2,
  Building2,
  BarChart3,
  Globe,
  Share2,
  TrendingUp,
  Cpu,
  FileText,
  BookOpen,
  Sparkles,
  Zap,
  Layers,
  Palette,
  Code2,
  HelpCircle,
  Users,
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileSubmenu = (name: string) => {
    setMobileExpanded(mobileExpanded === name ? null : name);
  };

  // 1. Platform Items (SaaS / Software Core Modules)
  const platformItems = [
    {
      title: "Agency CRM & Leads",
      desc: "Pipeline & Lead tracking",
      icon: UserCheck,
      color: "text-blue-500",
      href: "/platform#crm",
    },
    {
      title: "Social Media Hub & Calendar",
      desc: "Multi-channel scheduling",
      icon: Calendar,
      color: "text-pink-500",
      href: "/platform#social",
    },
    {
      title: "Google Business Profile & SEO",
      desc: "Rank tracker & reviews",
      icon: Search,
      color: "text-amber-500",
      href: "/platform#gbp",
    },
    {
      title: "Client Approval Portal",
      desc: "1-click post & creative approvals",
      icon: CheckCircle2,
      color: "text-emerald-500",
      href: "/platform#portal",
    },
    {
      title: "White-Label Workspaces",
      desc: "Client branded portal",
      icon: Building2,
      color: "text-indigo-500",
      href: "/platform#white-label",
    },
    {
      title: "Automated Reports & Billing",
      desc: "Live ROAS & Stripe invoices",
      icon: BarChart3,
      color: "text-cyan-500",
      href: "/platform#billing",
    },
  ];

  // 2. Services Items (Agency Delivery Side - Pre-Configured Workflows)
  const servicesItems = [
    {
      title: "All Workflows & Delivery Engines",
      desc: "Pre-configured modules to scale agency retainers",
      icon: Layers,
      color: "text-blue-600",
      href: "/services",
    },
    {
      title: "Social Media Delivery Engine",
      desc: "Multi-client visual calendars & 1-click approvals",
      icon: Share2,
      color: "text-pink-500",
      href: "/services/social-media-marketing",
    },
    {
      title: "Performance Ad Ops Engine",
      desc: "Multi-account pacing & automated CAPI telemetry",
      icon: TrendingUp,
      color: "text-emerald-500",
      href: "/services/performance-marketing",
    },
    {
      title: "Creative Production & Proofing",
      desc: "Collaborative asset library & client markup canvas",
      icon: Palette,
      color: "text-purple-500",
      href: "/services/content-creation",
    },
    {
      title: "High-Speed Client Web Engines",
      desc: "Next.js performance stacks & conversion architecture",
      icon: Code2,
      color: "text-indigo-500",
      href: "/services/website-design-and-development",
    },
    {
      title: "SEO & Local Rank Architecture",
      desc: "Automated GBP audit scorecards & rank tracking",
      icon: Globe,
      color: "text-amber-500",
      href: "/services/seo-and-local-seo",
    },
    {
      title: "Lead Flow & Retainer Automation",
      desc: "Multi-client CRM sync & automated billing rules",
      icon: Zap,
      color: "text-orange-500",
      href: "/services/lead-generation-and-automation",
    },
  ];

  // 3. Solutions Items (Target Audience - Kiske Liye Hai)
  const solutionsItems = [
    {
      title: "For Performance Agencies",
      desc: "Scale retained ROAS, ad ops & automated reporting",
      icon: TrendingUp,
      color: "text-emerald-500",
      href: "/solutions/performance-agencies",
    },
    {
      title: "For Social Media Agencies",
      desc: "Content pipelines, visual post calendars & client approvals",
      icon: Share2,
      color: "text-pink-500",
      href: "/solutions/social-media-agencies",
    },
    {
      title: "For Local SEO & GBP Agencies",
      desc: "GBP audit scorecards, review automation & rank tracking",
      icon: Globe,
      color: "text-amber-500",
      href: "/solutions/local-seo-agencies",
    },
    {
      title: "For Full-Service Scaling Agencies",
      desc: "Connected all-in-one OS for CRM, tasks, marketing & billing",
      icon: Cpu,
      color: "text-blue-500",
      href: "/solutions/scaling-agencies",
    },
  ];

  // 5. Resources Items (Content & Company)
  const resourcesItems = [
    {
      title: "Agency Blog",
      desc: "Industry trends, agency scaling playbooks & SaaS tips",
      icon: FileText,
      color: "text-emerald-500",
      href: "/blog",
    },
    {
      title: "Integrations (120+ Tools)",
      desc: "Ad platforms, CRMs, Stripe & webhook connections",
      icon: BookOpen,
      color: "text-blue-500",
      href: "/#integrations",
    },
    {
      title: "About DigiVigee",
      desc: "Our mission, leadership & engineering story",
      icon: Users,
      color: "text-indigo-500",
      href: "/about",
    },
    {
      title: "Contact & Support",
      desc: "24/7 dedicated engineering & client concierge",
      icon: HelpCircle,
      color: "text-purple-500",
      href: "/contact",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_15px_rgba(15,23,42,0.04)]"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      {/* Container aligned with page grid — Microsoft Standard 54px Height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[54px] relative flex items-center justify-between">
        
        {/* Left: Official Dr. Noopur Patel Logo */}
        <div className="flex items-center shrink-0 z-10 relative">
          <Link href="/" className="flex items-center group relative z-10">
            <img
              src="/images/doctor/assets/logo.png"
              alt="Dr. Noopur Patel"
              className="h-[32px] sm:h-[36px] w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
            />
          </Link>
        </div>

        {/* Center: Clean 6-Menu Navbar Structure */}
        <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 absolute left-1/2 -translate-x-1/2 z-10">
          
          {/* 1. Platform Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("platform")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === "platform" ? null : "platform")}
              className={`group flex items-center gap-1.5 py-1 text-[13.5px] font-semibold transition-colors duration-150 cursor-pointer ${
                activeDropdown === "platform"
                  ? "text-slate-950"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <span>Platform</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 transition-transform duration-200 ${
                  activeDropdown === "platform" ? "rotate-180 text-slate-950" : ""
                }`}
              />
            </button>

            {/* Platform Dropdown Menu */}
            {activeDropdown === "platform" && (
              <div className="absolute top-full left-0 pt-2 w-[410px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="relative p-2.5 rounded-2xl bg-white/98 backdrop-blur-3xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden text-left">
                  <div className="space-y-1">
                    {platformItems.map((item, idx) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors duration-150"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-100/80 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform mt-0.5">
                            <IconComp className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-slate-900 group-hover/item:text-[#008744] transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[11.5px] text-slate-500 leading-snug mt-0.5 font-normal">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  {/* Bottom Link: View All 20 Core Modules */}
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <Link
                      href="/platform"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 hover:bg-emerald-50/80 transition-colors group/link"
                    >
                      <span>View All 20 Core Modules</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
              className={`group flex items-center gap-1.5 py-1 text-[13.5px] font-semibold transition-colors duration-150 cursor-pointer ${
                activeDropdown === "services"
                  ? "text-slate-950"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 transition-transform duration-200 ${
                  activeDropdown === "services" ? "rotate-180 text-slate-950" : ""
                }`}
              />
            </button>

            {/* Services Dropdown Menu */}
            {activeDropdown === "services" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[430px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="relative p-2.5 rounded-2xl bg-white/98 backdrop-blur-3xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden text-left">
                  <div className="space-y-1">
                    {servicesItems.map((item, idx) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className={`group/item flex items-start gap-3 p-2.5 rounded-xl transition-colors duration-150 ${
                            idx === 0
                              ? "bg-slate-50/80 hover:bg-slate-100/90 border border-slate-100"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-100/80 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform mt-0.5">
                            <IconComp className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-slate-900 group-hover/item:text-[#008744] transition-colors flex items-center gap-1.5">
                              <span>{item.title}</span>
                              {idx === 0 && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded-md">
                                  All
                                </span>
                              )}
                            </div>
                            <div className="text-[11.5px] text-slate-500 leading-snug mt-0.5 font-normal">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("solutions")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")}
              className={`group flex items-center gap-1.5 py-1 text-[13.5px] font-semibold transition-colors duration-150 cursor-pointer ${
                activeDropdown === "solutions"
                  ? "text-slate-950"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 transition-transform duration-200 ${
                  activeDropdown === "solutions" ? "rotate-180 text-slate-950" : ""
                }`}
              />
            </button>

            {/* Solutions Dropdown Menu */}
            {activeDropdown === "solutions" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[410px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="relative p-2.5 rounded-2xl bg-white/98 backdrop-blur-3xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden text-left">
                  <div className="space-y-1">
                    {solutionsItems.map((item, idx) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors duration-150"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-100/80 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform mt-0.5">
                            <IconComp className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-slate-900 group-hover/item:text-[#008744] transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[11.5px] text-slate-500 leading-snug mt-0.5 font-normal">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Case Studies (Direct Link) */}
          <Link
            href="/portfolio"
            className="py-1 text-[13.5px] font-semibold text-slate-600 hover:text-slate-950 transition-colors duration-150"
          >
            Case Studies
          </Link>

          {/* 5. Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
              className={`group flex items-center gap-1.5 py-1 text-[13.5px] font-semibold transition-colors duration-150 cursor-pointer ${
                activeDropdown === "resources"
                  ? "text-slate-950"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 transition-transform duration-200 ${
                  activeDropdown === "resources" ? "rotate-180 text-slate-950" : ""
                }`}
              />
            </button>

            {/* Resources Dropdown Menu */}
            {activeDropdown === "resources" && (
              <div className="absolute top-full right-0 pt-2 w-[390px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="relative p-2.5 rounded-2xl bg-white/98 backdrop-blur-3xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden text-left">
                  <div className="space-y-1">
                    {resourcesItems.map((item, idx) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors duration-150"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-100/80 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform mt-0.5">
                            <IconComp className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-slate-900 group-hover/item:text-[#008744] transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[11.5px] text-slate-500 leading-snug mt-0.5 font-normal">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side: Electric Green/Blue Gradient CTA (Shifted slightly left) */}
        <div className="hidden lg:flex items-center justify-end z-10 relative mr-4 sm:mr-6">
          {/* Electric Green & Royal Blue Gradient CTA Button */}
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center justify-center gap-1.5 px-4.5 py-1.5 h-8 rounded-full text-[12px] font-bold text-white bg-gradient-to-r from-[#00E05C] via-[#00B4D8] to-[#0070F3] hover:from-[#00C952] hover:via-[#009FC0] hover:to-[#005CD0] shadow-[0_2px_10px_rgba(0,129,251,0.2)] hover:shadow-[0_4px_14px_rgba(0,224,92,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shimmer-sweep"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-6 py-5 space-y-4 max-h-[85vh] overflow-y-auto text-left animate-in slide-in-from-top-4 duration-200 shadow-xl">
          {/* Mobile Top Brand Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center">
              <img
                src="/images/doctor/assets/logo.png"
                alt="Dr. Noopur Patel"
                className="h-[30px] w-auto object-contain"
              />
            </Link>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Agency OS
            </span>
          </div>

          <div className="space-y-2">
            
            {/* 1. Mobile Platform */}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("platform")}
                className="flex items-center justify-between w-full py-2.5 text-sm font-bold text-slate-900"
              >
                <span>1. Platform</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "platform" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "platform" && (
                <div className="pl-3 py-1 space-y-2 border-l-2 border-emerald-500/40 my-1">
                  {platformItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-slate-700 hover:text-emerald-600 py-1.5"
                    >
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-normal leading-snug">{item.desc}</div>
                    </Link>
                  ))}
                  <Link
                    href="/platform"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-bold text-emerald-600 hover:text-emerald-700 py-1.5"
                  >
                    View All 20 Core Modules ➔
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Mobile Services */}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("services")}
                className="flex items-center justify-between w-full py-2.5 text-sm font-bold text-slate-900"
              >
                <span>2. Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "services" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "services" && (
                <div className="pl-3 py-1 space-y-2 border-l-2 border-blue-500/40 my-1">
                  {servicesItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-slate-700 hover:text-blue-600 py-1.5"
                    >
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-normal leading-snug">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Mobile Solutions */}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("solutions")}
                className="flex items-center justify-between w-full py-2.5 text-sm font-bold text-slate-900"
              >
                <span>3. Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "solutions" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "solutions" && (
                <div className="pl-3 py-1 space-y-2 border-l-2 border-cyan-500/40 my-1">
                  {solutionsItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-slate-700 hover:text-cyan-600 py-1.5"
                    >
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-normal leading-snug">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Mobile Case Studies (Direct Link) */}
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm font-bold text-slate-900 hover:text-emerald-600"
            >
              4. Case Studies
            </Link>

            {/* 5. Mobile Resources */}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("resources")}
                className="flex items-center justify-between w-full py-2.5 text-sm font-bold text-slate-900"
              >
                <span>5. Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "resources" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "resources" && (
                <div className="pl-3 py-1 space-y-2 border-l-2 border-purple-500/40 my-1">
                  {resourcesItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-slate-600 hover:text-purple-600 py-1.5"
                    >
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-normal leading-snug">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#00E05C] via-[#00B4D8] to-[#0070F3] shadow-md"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
