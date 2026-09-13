"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  Scale,
  CreditCard,
  Building2,
  Clock,
  Printer,
  Share2,
  Check,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Lock,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS: Section[] = [
  { id: "acceptance", title: "1. Acceptance & Engagement Scope", icon: FileText },
  { id: "services-scope", title: "2. Agency Services & Retainers", icon: Layers },
  { id: "ad-spend-accounts", title: "3. Ad Accounts & Media Spend", icon: Sparkles },
  { id: "intellectual-property", title: "4. Intellectual Property Rights", icon: ShieldCheck },
  { id: "payment-terms", title: "5. Invoicing, GST & Payment", icon: CreditCard },
  { id: "client-obligations", title: "6. Client Responsibilities & SLAs", icon: Clock },
  { id: "liability-disclaimer", title: "7. Warranties & Liability Limits", icon: Scale },
  { id: "term-termination", title: "8. Term, Offboarding & Notice", icon: AlertCircle },
  { id: "confidentiality-nda", title: "9. Confidentiality & Non-Disclosure", icon: Lock },
  { id: "governing-law", title: "10. Governing Law & Jurisdiction", icon: Building2 },
];

export default function TermsAndConditionsClient() {
  const [activeSection, setActiveSection] = useState<string>("acceptance");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 text-slate-800 dark:text-slate-200">
      
      {/* Ambient Header Glow Halo */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.12),rgba(59,130,246,0.06),transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            HEADER BREADCRUMB & HERO CHARTER TITLE
            ========================================================================= */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Legal & Governance</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Terms of Service</span>
          </nav>

          {/* Verification Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-2xs">
            <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>MASTER CLIENT SERVICE AGREEMENT • VERSION 2.4</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]">
            Master Terms of Service
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            These terms govern all performance digital marketing, SEO engineering, web systems development, and strategic agency retainers provided by DigiVigee.
          </p>

          {/* Metadata Audit Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Effective Date: September 2026</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Standard Enterprise Terms</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Jurisdiction: Gujarat, India</span>
            </span>
          </div>

          {/* Utility Action Bar */}
          <div className="pt-3 flex items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
              title="Print document or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
              title="Copy link to clipboard"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share Agreement</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}?subject=Contractual%20or%20Terms%20Inquiry`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Legal Desk Inquiry</span>
            </a>
          </div>

        </div>

        {/* =========================================================================
            3 TOP GUARANTEE PILLARS: IP OWNERSHIP, TRANSPARENT AD SPEND, CLEAR SLAS
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              100% Client Asset Ownership
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Upon settlement of fees, all deliverables produced specifically for your account—creatives, copy, code, and landing pages—become your exclusive intellectual property.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Direct Media Spend Billing
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              You always retain complete ownership of your Meta and Google Ad accounts. Third-party ad spend is paid directly to the platforms by your payment method with 0% hidden markup.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Predictable Retainers & Notice
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No predatory lock-ins. Standard monthly retainers operate with a simple 30-day written cancellation window and structured offboarding handover protocols.
            </p>
          </div>

        </div>

        {/* =========================================================================
            MAIN DUAL-COLUMN GRID: STICKY TOC SIDEBAR + DETAILED CLAUSES
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* -------------------------------------------------------------
              LEFT COLUMN: STICKY TABLE OF CONTENTS & QUICK ASSIST (4 cols)
              ------------------------------------------------------------- */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6 hidden lg:block">
            
            {/* Navigation Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-emerald-500" />
                  Agreement Clauses
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  10 Articles
                </span>
              </div>

              <div className="space-y-1 pt-1 max-h-[50vh] overflow-y-auto pr-1 text-xs">
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800 shadow-2xs"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`} />
                      <span className="truncate">{section.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contract Support Mini-Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-md border border-slate-800 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10.5px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Legal & Contract Pod</span>
              </div>
              <h4 className="text-sm font-bold text-white leading-tight">
                Need a Custom Master Service Agreement (MSA)?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                For enterprise retainers, custom deliverables, or vendor NDA review, contact our corporate legal desk directly.
              </p>
              <div className="pt-2 space-y-1.5 text-xs text-slate-300">
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{SITE_CONFIG.contact.email}</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{SITE_CONFIG.contact.phone}</span>
                </a>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>Review Privacy Policy</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </aside>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: DETAILED ARTICLES & VISUAL MATRICES (8 cols)
              ------------------------------------------------------------- */}
          <main className="lg:col-span-8 space-y-10">
            
            {/* =========================================================
                ARTICLE 1: ACCEPTANCE & SCOPE
                ========================================================= */}
            <section
              id="acceptance"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Article 1.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Acceptance of Terms & Engagement Scope
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                These Master Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement entered into by and between <strong>DigiVigee</strong> (&ldquo;Agency&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, or &ldquo;us&rdquo;), registered in Gujarat, India, and the entity or individual (&ldquo;Client&rdquo;, &ldquo;you&rdquo;) who accesses our website, retains our growth marketing pods, or signs an associated Statement of Work (SOW) or proposal.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <p><strong>1.1 Mutual Agreement:</strong> By engaging DigiVigee, initiating payment for an invoice, or issuing a formal purchase order, you signify full and unconditional assent to these terms.</p>
                <p><strong>1.2 Priority of Documents:</strong> In the event of an express conflict between a customized Statement of Work (SOW) signed by both parties and these general terms, the provisions of the signed SOW shall prevail solely for that specific engagement.</p>
              </div>
            </section>

            {/* =========================================================
                ARTICLE 2: AGENCY SERVICES & RETAINERS
                ========================================================= */}
            <section
              id="services-scope"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Article 2.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Agency Services, Deliverables & Retainers
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                DigiVigee delivers professional digital growth architecture spanning five core disciplines:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">1. Performance Marketing & Ads</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Paid media management on Meta (Facebook/Instagram), Google Search & Shopping, YouTube, and LinkedIn Ads.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">2. Technical & Local SEO</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Search architecture, Google Business Profile scaling, on-page optimization, and authoritative backlink strategies.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">3. Web Design & Development</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">High-converting landing pages, corporate web applications, Next.js engineering, and CRO funnels.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">4. Lead Automation & CRM</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">WhatsApp Business automation, webhook integrations, lead routing, and customized client reporting pods.</p>
                </div>
              </div>
            </section>

            {/* =========================================================
                ARTICLE 3: CLIENT AD SPEND & MEDIA ACCOUNTS
                ========================================================= */}
            <section
              id="ad-spend-accounts"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Article 3.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Ad Accounts, Media Spend & Official Meta Partner Status
                  </h2>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
                  <strong>Zero Media Spend Custody Rule:</strong> Client ad spend is billed directly by advertising platforms (Meta Platforms, Inc., Google LLC) to the Client&apos;s own credit card or billing profile. DigiVigee charges purely for management and strategy; we never markup, broker, or hold media funds in custody.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Partner Access Protocol:</strong> The Client grants DigiVigee administrative agency partner access through their native Meta Business Manager or Google Ads MCC. Client remains sole master owner of the asset.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Ad Platform Compliance:</strong> The Client warrants that their products, claims, and landing pages comply with Meta Advertising Policies, Google Ads Policies, and applicable regulatory frameworks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>No Ad Spend Guarantees:</strong> While DigiVigee deploys senior media buyers to maximize ROAS and minimize CPA, digital advertising performance involves dynamic market auctions. We do not offer unconditional conversion guarantees.</span>
                </li>
              </ul>
            </section>

            {/* =========================================================
                ARTICLE 4: INTELLECTUAL PROPERTY MATRIX
                ========================================================= */}
            <section
              id="intellectual-property"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase">Article 4.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Intellectual Property Ownership Matrix
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We believe in total creative ownership for our clients. Here is the formal allocation of intellectual property rights upon complete financial settlement:
              </p>

              {/* Visual IP Matrix Table */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                      <th className="p-3">Asset Classification</th>
                      <th className="p-3">Ownership Assignment</th>
                      <th className="p-3 hidden sm:table-cell">Usage Rights & Transfer Condition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 align-top">
                        Client Specific Deliverables
                      </td>
                      <td className="p-3 align-top leading-relaxed text-emerald-700 dark:text-emerald-400 font-bold">
                        100% Client Ownership
                      </td>
                      <td className="p-3 align-top text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        Final ad creatives, copy, bespoke landing pages, brand graphics, and custom source code transfer upon invoice payment.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 align-top">
                        Pre-Existing Agency Frameworks
                      </td>
                      <td className="p-3 align-top leading-relaxed">
                        Retained by DigiVigee
                      </td>
                      <td className="p-3 align-top text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        Internal software boilerplates, optimization scripts, and agency automation frameworks remain DigiVigee proprietary IP. Client receives perpetual royalty-free operational license.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 align-top">
                        Client Brand Marks & Assets
                      </td>
                      <td className="p-3 align-top leading-relaxed text-emerald-700 dark:text-emerald-400 font-bold">
                        100% Client Ownership
                      </td>
                      <td className="p-3 align-top text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        Client trademarks, logos, customer data, and product imagery remain exclusively the property of Client.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 align-top">
                        Agency Portfolio Showcase
                      </td>
                      <td className="p-3 align-top leading-relaxed">
                        Limited Marketing License
                      </td>
                      <td className="p-3 align-top text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        Unless Client requests a strict NDA in writing, DigiVigee reserves the right to display high-level case study metrics and public creative assets in our marketing portfolio.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* =========================================================
                ARTICLE 5: INVOICING, GST & PAYMENT TERMS
                ========================================================= */}
            <section
              id="payment-terms"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 tracking-wider uppercase">Article 5.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Invoicing, GST & Payment Protocols
                  </h2>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    5.1 Monthly Retainer Billing
                  </h3>
                  <p>
                    Ongoing performance marketing, SEO, and maintenance retainers are invoiced monthly in advance. Payment is due within 7 calendar days of invoice date unless specified otherwise in writing.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    5.2 Milestone-Based Project Development
                  </h3>
                  <p>
                    Fixed-scope website engineering, mobile apps, or custom CRO builds follow a structured milestone structure (e.g. 50% kick-off deposit, 30% development preview sign-off, 20% production deployment handover).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    5.3 Statutory Taxes & GST Compliance
                  </h3>
                  <p>
                    All quotes are exclusive of applicable Indian Goods and Services Tax (GST at 18%). GST invoices with formal HSN/SAC codes are issued for valid input tax credit reconciliation.
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================
                ARTICLE 6: CLIENT RESPONSIBILITIES & SLAS
                ========================================================= */}
            <section
              id="client-obligations"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">Article 6.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Client Responsibilities & Service Level Agreements (SLAs)
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Compound growth requires active collaboration. The Client agrees to:
              </p>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Timely Creative Feedback:</strong> Provide creative sign-offs, content approvals, or revision requests within 48 to 72 business hours to prevent campaign launch stalls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Technical Asset Access:</strong> Grant necessary domain DNS, Tag Manager, Google Analytics, or CMS credentials required to install conversion pixels and tracking architecture.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Guaranteed Agency Support Pod SLA:</strong> DigiVigee guarantees a maximum 24-hour response window on business days for all priority campaign inquiries.</span>
                </li>
              </ul>
            </section>

            {/* =========================================================
                ARTICLE 7: WARRANTIES & LIMITATION OF LIABILITY
                ========================================================= */}
            <section
              id="liability-disclaimer"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">Article 7.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Warranties, Disclaimers & Limitation of Liability
                  </h2>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <p>
                  <strong>7.1 Professional Standard:</strong> DigiVigee warrants that all agency services will be performed in a professional, diligent manner in accordance with prevailing industry standards.
                </p>
                <p>
                  <strong>7.2 Third-Party Algorithmic Independence:</strong> The Client acknowledges that search engine rankings (Google, Bing) and social ad delivery auctions (Meta, TikTok, LinkedIn) depend on proprietary third-party algorithms. DigiVigee shall not be liable for ranking fluctuations, policy updates, or account restrictions imposed autonomously by third-party platforms.
                </p>
                <p>
                  <strong>7.3 Cap on Liability:</strong> To the maximum extent permitted under applicable law, DigiVigee&apos;s aggregate liability arising out of or related to any engagement shall not exceed the total management fees paid by the Client to DigiVigee during the three (3) months immediately preceding the event giving rise to liability.
                </p>
              </div>
            </section>

            {/* =========================================================
                ARTICLE 8: TERM, SUSPENSION & OFFBOARDING
                ========================================================= */}
            <section
              id="term-termination"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 tracking-wider uppercase">Article 8.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Term, Suspension & Clean Offboarding
                  </h2>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <p>
                  <strong>8.1 Monthly Retainer Cancellation:</strong> Either party may cancel an active monthly marketing retainer by providing thirty (30) days advance written notice via official email to the designated account lead.
                </p>
                <p>
                  <strong>8.2 Termination for Cause:</strong> Either party may immediately terminate an engagement if the other party breaches any material term and fails to cure such breach within fourteen (14) calendar days of written notice.
                </p>
                <p>
                  <strong>8.3 Clean Offboarding Handover:</strong> Upon conclusion of services and settlement of all outstanding invoices, DigiVigee will provide an orderly transition: revoking agency partner credentials, delivering high-resolution master creative files, and transferring full ownership of custom domains or code repositories.
                </p>
              </div>
            </section>

            {/* =========================================================
                ARTICLE 9: CONFIDENTIALITY & NON-DISCLOSURE
                ========================================================= */}
            <section
              id="confidentiality-nda"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Article 9.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Confidentiality & Non-Disclosure (NDA)
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Both parties agree to treat all commercial, financial, and strategic information exchanged during the course of collaboration as strictly confidential.
              </p>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Scope of Protection:</strong> Client customer records, profit margins, sales conversion funnels, and proprietary marketing playbooks shall not be disclosed to any unauthorized third party.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Duration:</strong> The duty of confidentiality survives for a period of three (3) years following the termination or expiration of the service agreement.</span>
                </li>
              </ul>
            </section>

            {/* =========================================================
                ARTICLE 10: GOVERNING LAW & JURISDICTION
                ========================================================= */}
            <section
              id="governing-law"
              className="p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 space-y-5 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">Article 10.0</span>
                  <h2 className="text-xl font-bold text-white">
                    Governing Law, Dispute Escalation & Official Coordinates
                  </h2>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>10.1 Governing Law:</strong> These Terms shall be governed by, interpreted, and enforced in accordance with the substantive laws of the Republic of India.
                </p>
                <p>
                  <strong>10.2 Amicable Negotiation & Arbitration:</strong> Any dispute, controversy, or claim shall first be submitted to mutual executive negotiation for thirty (30) days. Failing amicable resolution, the dispute shall be referred to and finally resolved by sole arbitration under the Indian Arbitration and Conciliation Act, 1996. The seat of arbitration shall be Gujarat, India.
                </p>
                <p>
                  <strong>10.3 Exclusive Jurisdiction:</strong> Subject to arbitration, the competent courts situated in Banaskantha or Ahmedabad, Gujarat, India shall possess exclusive jurisdiction.
                </p>
              </div>

              {/* Official Corporate Contracting Notice Card */}
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-mono">Contracting Agency:</span>
                    <span className="font-bold text-white text-sm">DigiVigee Platform & Digital Marketing</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-mono">Official Legal Inquiries:</span>
                    <span className="font-bold text-emerald-400 text-sm">Legal & Contracts Desk</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/60 space-y-2">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Email:</strong> {SITE_CONFIG.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Direct Phone:</strong> {SITE_CONFIG.contact.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-200">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed"><strong>Registered Corporate Office:</strong> {SITE_CONFIG.contact.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}?subject=Contractual%20Notice%20or%20Terms%20Request`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Contractual Inquiry</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all"
                >
                  <span>Schedule Legal Consultation →</span>
                </Link>
              </div>
            </section>

          </main>

        </div>

      </div>

    </div>
  );
}
