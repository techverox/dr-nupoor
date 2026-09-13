"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  Database,
  Server,
  Share2,
  Check,
  Info,
  Layers,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  UserCheck,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS: Section[] = [
  { id: "overview", title: "1. Overview & Commitment", icon: ShieldCheck },
  { id: "information-collected", title: "2. Information We Collect", icon: Database },
  { id: "purpose-of-processing", title: "3. How We Use Information", icon: Layers },
  { id: "ad-telemetry", title: "4. Marketing & Ad Telemetry", icon: Sparkles },
  { id: "data-sharing", title: "5. Third-Party Processors", icon: Server },
  { id: "security-standards", title: "6. Security & Encryption", icon: Lock },
  { id: "retention-policy", title: "7. Data Retention & Erasure", icon: Clock },
  { id: "privacy-rights", title: "8. Your Fundamental Rights", icon: UserCheck },
  { id: "cookies-telemetry", title: "9. Cookies & Telemetry", icon: Eye },
  { id: "contact-dpo", title: "10. Grievance & DPO Office", icon: Mail },
];

export default function PrivacyPolicyClient() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      
      {/* Ambient Radial Header Halo */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.12),rgba(6,182,212,0.05),transparent_70%)] pointer-events-none -z-10" />

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
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Privacy Policy</span>
          </nav>

          {/* Verification Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>DPDP ACT 2023 & GDPR ALIGNED • VERSION 2.4</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]">
            Privacy & Data Protection Charter
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            At DigiVigee, data stewardship is built on transparency, zero-data-monetization, and strict encryption. Here is exactly how your information is handled, secured, and respected.
          </p>

          {/* Metadata Audit Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Last Revised: September 2026</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Est. Read Time: ~6 Minutes</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>TLS 1.3 & AES-256 Vault</span>
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
                  <span>Share Policy</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}?subject=Data%20Privacy%20Inquiry`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Privacy Team</span>
            </a>
          </div>

        </div>

        {/* =========================================================================
            3 TOP PILLARS: ZERO MONETIZATION, ENCRYPTION, COMPLETE CONTROL
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Zero Data Monetization
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We never sell, rent, broker, or commercialize your personal information, client lead lists, or campaign telemetry to data brokers or advertising syndicates. Period.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-105 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Bank-Grade Encryption
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every connection is secured with TLS 1.3 in-transit. Stored databases and confidential client credentials are protected with salted Scrypt hashing and AES-256 rest encryption.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-105 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Full Erasure & Rights
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Complete autonomy over your digital footprint. Exercise your Right to Access, Rectification, or complete Permanent Erasure (&ldquo;Right to be Forgotten&rdquo;) within 30 business days.
            </p>
          </div>

        </div>

        {/* =========================================================================
            MAIN DUAL-COLUMN GRID: STICKY TOC SIDEBAR + DETAILED SECTIONS
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* -------------------------------------------------------------
              LEFT COLUMN: STICKY TABLE OF CONTENTS & QUICK CONTACT (4 cols)
              ------------------------------------------------------------- */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6 hidden lg:block">
            
            {/* Navigation Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" />
                  Table of Contents
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  10 Clauses
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

            {/* Direct Grievance Help Desk Mini-Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-md border border-slate-800 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10.5px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Data Protection Officer</span>
              </div>
              <h4 className="text-sm font-bold text-white leading-tight">
                Have specific privacy requests?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our designated Grievance Officer responds to all statutory subject-access and deletion queries within 48 hours.
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
                  href="/terms-and-conditions"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>Read Terms & Conditions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </aside>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: DETAILED CLAUSES & VISUAL MATRICES (8 cols)
              ------------------------------------------------------------- */}
          <main className="lg:col-span-8 space-y-10">
            
            {/* =========================================================
                SECTION 1: OVERVIEW & COMMITMENT
                ========================================================= */}
            <section
              id="overview"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Clause 1.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Overview & Scope of Policy
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                This Privacy Policy (&ldquo;Policy&rdquo;) outlines the standards and methodologies by which <strong>DigiVigee</strong> (&ldquo;DigiVigee&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), registered in Gujarat, India, collects, safeguards, utilizes, processes, and disposes of personal data and commercial telemetry.
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                This Charter applies to all interactions across:
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Our primary public website (<strong>digivigee.com</strong>) and subdomains.</span>
                </li>
                <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Performance marketing, SEO consulting, and web engineering client engagements.</span>
                </li>
                <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Client strategy portals, reporting dashboards, and lead-generation funnels.</span>
                </li>
                <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Communication via WhatsApp Business API, corporate email, and voice calls.</span>
                </li>
              </ul>
            </section>

            {/* =========================================================
                SECTION 2: INFORMATION WE COLLECT (WITH VISUAL MATRIX)
                ========================================================= */}
            <section
              id="information-collected"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Clause 2.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Categories of Information Collected
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We strictly adhere to data minimization principles. We only collect information that is strictly essential to deliver, evaluate, and scale our client marketing partnerships.
              </p>

              {/* Structured Visual Matrix Table */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                      <th className="p-3">Data Classification</th>
                      <th className="p-3">Specific Elements Collected</th>
                      <th className="p-3 hidden sm:table-cell">Legal Justification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 align-top">
                        Direct Identifiers
                      </td>
                      <td className="p-3 align-top leading-relaxed">
                        Full Name, official business email, direct telephone/WhatsApp number, company name, registered business address.
                      </td>
                      <td className="p-3 align-top text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        Contract execution & service delivery
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 align-top">
                        Commercial & Billing
                      </td>
                      <td className="p-3 align-top leading-relaxed">
                        GSTIN / Tax ID, enterprise invoicing details, bank wire records. <em>(We do NOT store raw credit/debit card numbers).</em>
                      </td>
                      <td className="p-3 align-top text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        Statutory fiscal compliance & GST laws
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 align-top">
                        Campaign & Ad Telemetry
                      </td>
                      <td className="p-3 align-top leading-relaxed">
                        Anonymized conversion events, ad spend logs, Meta Ads Manager identifiers, Google Ads asset logs, ROAS calculation signals.
                      </td>
                      <td className="p-3 align-top text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        Legitimate interest & explicit retainer authorization
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 align-top">
                        Technical & Device Logs
                      </td>
                      <td className="p-3 align-top leading-relaxed">
                        IP address, browser version, device viewport, session cookies, referrers, UTM attribution tracking context.
                      </td>
                      <td className="p-3 align-top text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        Infrastructure security & brute-force audit logging
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* =========================================================
                SECTION 3: HOW WE USE INFORMATION
                ========================================================= */}
            <section
              id="purpose-of-processing"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase">Clause 3.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Legal Basis & Purpose of Processing
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Under the Indian Digital Personal Data Protection (DPDP) Act 2023, EU GDPR (Regulation 2016/679), and international best practices, DigiVigee processes data only on designated legal grounds:
              </p>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    1. Fulfilling Contractual Retainers
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    To build tailored marketing roadmaps, audit ad funnels, engineer landing pages, deploy programmatic Meta/Google campaigns, and communicate deliverable milestones.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    2. Legitimate Commercial Interests
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    To safeguard our website infrastructure against automated spam, credential stuffing, and bot attacks; to evaluate marketing channel efficacy; and to maintain client service continuity.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    3. Explicit Opt-In Consent
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    When you voluntarily submit your email for our Agency Growth Newsletter or request a custom growth audit. You retain the absolute right to withdraw consent at any time via 1-click unsubscribe links.
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================
                SECTION 4: MARKETING & AD TELEMETRY (META & GOOGLE PARTNER)
                ========================================================= */}
            <section
              id="ad-telemetry"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Clause 4.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Campaign & Advertising Telemetry Safeguards
                  </h2>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <Info className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
                  <strong>Official Meta Business Partner Principle:</strong> As an official Meta Partner, DigiVigee follows strict tenant isolation. Your audience lists, customer match CSVs, and ad account pixels are NEVER commingled, shared, or matched across client boundaries.
                </p>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When managing campaigns across Google Ads, Meta Business Manager, or LinkedIn Marketing Solutions:
              </p>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Granular Partner Access:</strong> We request partner-level or agency access through your native Business Manager. We never request or retain raw user passwords for third-party advertising accounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Hashed Custom Audiences:</strong> Any first-party customer audience uploads are normalized and SHA-256 encrypted prior to transmission to ad network endpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span><strong>Post-Termination Revocation:</strong> Upon retainer completion, all agency partner permissions are severed and localized reporting caches are sanitized within 30 days.</span>
                </li>
              </ul>
            </section>

            {/* =========================================================
                SECTION 5: THIRD-PARTY PROCESSORS
                ========================================================= */}
            <section
              id="data-sharing"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 tracking-wider uppercase">Clause 5.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Authorized Third-Party Service Providers
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                DigiVigee engages trusted sub-processors exclusively to host, secure, and deliver enterprise-grade services. Each processor is contractually bound by rigorous Data Processing Addendums (DPAs):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Google Cloud / Firebase</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Primary hosting, encrypted Firestore database storage, and secure authentication services.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Meta Platforms, Inc.</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Official Meta Business Partner API integration for authorized performance ad execution.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Google Ads & GA4</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Conversion tracking, organic search console telemetry, and performance reporting.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Cloudflare CDN & Edge</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Edge caching, DDoS mitigation, and global TLS cryptographic termination.</p>
                </div>
              </div>
            </section>

            {/* =========================================================
                SECTION 6: SECURITY & ENCRYPTION ARCHITECTURE
                ========================================================= */}
            <section
              id="security-standards"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Clause 6.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Security & Cryptographic Standards
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We implement multi-tiered defense-in-depth security engineered to prevent unauthorized access, alteration, or interception:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">TLS 1.3 Transport Security</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">All HTTP transmissions are strictly forced over HTTPS with modern cipher suites and HSTS enabled.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Salted Scrypt Hashing</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">Admin portal authentication utilizes computationally expensive salted Scrypt hashes resistant to GPU attacks.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Role-Based Access (RBAC)</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">Least-privilege permission model ensuring personnel only access records essential to their assigned pod.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Immutable Audit Trails</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">Every administrative action, permission modification, and login event is logged with forensic timestamps.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================
                SECTION 7: DATA RETENTION & ERASURE
                ========================================================= */}
            <section
              id="retention-policy"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">Clause 7.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Data Retention & Automated Disinfection
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We store personal and commercial data only for as long as necessary to achieve the stated business purpose or satisfy regulatory obligations:
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Prospective Inquiries & Leads:</strong> Retained for 12 months following last recorded contact. Inactive inquiries are permanently purged from active pipelines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Active Client Account Telemetry:</strong> Retained throughout the duration of the master service agreement plus 90 calendar days following formal offboarding.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Invoicing & Tax Records:</strong> Retained for 7 fiscal years to comply with Indian statutory requirements under the Companies Act and GST mandates.</span>
                </li>
              </ul>
            </section>

            {/* =========================================================
                SECTION 8: YOUR FUNDAMENTAL RIGHTS
                ========================================================= */}
            <section
              id="privacy-rights"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">Clause 8.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Your Fundamental Statutory Privacy Rights
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Regardless of your geographic location, DigiVigee provides universal data subject autonomy. You have the direct right to:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Right to Access & Inspection
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Request an itemized digital export of all personal records we hold concerning you.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Right to Rectification
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Request immediate correction or completion of inaccurate, outdated, or incomplete records.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Right to Complete Erasure
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Demand irrevocable deletion of your digital contact footprint (&ldquo;Right to be Forgotten&rdquo;).</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Right to Data Portability
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Obtain your raw campaign and business records in structured, machine-readable JSON/CSV format.</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}?subject=Statutory%20Privacy%20Rights%20Request`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-slate-900 text-xs font-bold transition-all shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Submit Formal Rights Request →</span>
                </a>
              </div>
            </section>

            {/* =========================================================
                SECTION 9: COOKIES & TELEMETRY
                ========================================================= */}
            <section
              id="cookies-telemetry"
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 tracking-wider uppercase">Clause 9.0</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Cookies & Digital Telemetry Policy
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Our web applications use modern cookies, local browser storage tokens, and web beacons strictly to maintain platform stability and measure attribution:
              </p>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <p><strong>1. Essential / Operational Cookies:</strong> Required for secure session persistence, CSRF protection, and dark/light theme state. These cannot be disabled.</p>
                <p><strong>2. Performance & Attribution Cookies:</strong> Anonymously measure which acquisition channel (SEO, Meta, Google, LinkedIn) introduced you to DigiVigee, allowing us to evaluate marketing efficiency.</p>
                <p><strong>3. Managing Preferences:</strong> You can block or delete cookies via your browser settings anytime without breaking core website browsing.</p>
              </div>
            </section>

            {/* =========================================================
                SECTION 10: GRIEVANCE REDRESSAL & DPO OFFICE
                ========================================================= */}
            <section
              id="contact-dpo"
              className="p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 space-y-5 text-left scroll-mt-28"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">Clause 10.0</span>
                  <h2 className="text-xl font-bold text-white">
                    Designated Grievance Redressal & DPO Office
                  </h2>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                In adherence to Section 10 of India&apos;s Digital Personal Data Protection Act 2023 and global privacy accords, DigiVigee has appointed a dedicated Data Protection & Grievance Officer. If you believe your data has been handled inconsistently with this policy, please reach out directly:
              </p>

              {/* Official Coordinates Card */}
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-mono">Designated Officer:</span>
                    <span className="font-bold text-white text-sm">Grievance & Data Protection Officer</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-mono">Resolution Window:</span>
                    <span className="font-bold text-emerald-400 text-sm">Formal Response within 48 Hours</span>
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
                  href={`mailto:${SITE_CONFIG.contact.email}?subject=URGENT:%20Privacy%20Grievance%20Redressal`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Legal Notice</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all"
                >
                  <span>Visit Contact Desk →</span>
                </Link>
              </div>
            </section>

          </main>

        </div>

      </div>

    </div>
  );
}
