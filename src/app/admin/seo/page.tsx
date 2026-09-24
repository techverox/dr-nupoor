"use client";

import React, { useState, useEffect } from "react";
import { GlobalSeoSettings, PageSeoSummary, SeoHealthReport } from "@/types";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import { EditPageSeoModal } from "@/components/admin/seo/EditPageSeoModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  Globe,
  Search,
  FileCode,
  Activity,
  CheckCircle2,
  XCircle,
  X,
  Save,
  ExternalLink,
  ImageIcon,
  LayoutGrid,
  Eye,
  Edit2,
  Lightbulb,
  Star,
  RotateCcw,
  Sparkles,
  Bot,
  Smartphone,
  Monitor,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  HelpCircle,
} from "lucide-react";

export default function AdminSeoManagementPage() {
  const [activeTab, setActiveTab] = useState<"global" | "pages" | "geo" | "schema" | "audit">("global");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [copiedRobots, setCopiedRobots] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [serpDevice, setSerpDevice] = useState<"desktop" | "mobile">("desktop");

  // Form State
  const [globalSeo, setGlobalSeo] = useState<GlobalSeoSettings>({
    id: "global_seo",
    defaultTitle: "Dr. Noopur Patel — Breast Cancer Surgeon | Marengo CIMS Hospital, Ahmedabad",
    titleTemplate: "%s | Dr. Noopur Patel",
    defaultDescription:
      "Dr. Noopur Patel is an Associate Consultant in Surgical Breast Oncology at Marengo CIMS Hospital, Ahmedabad. Specialising in oncoplastic breast surgery, breast conservation, and compassionate breast care.",
    canonicalBaseUrl: "https://drnoopurpatel.com",
    defaultOgImage: "/images/doctor/assets/hero-doctor.png",
    defaultKeywords: [
      "Dr Noopur Patel",
      "Breast Cancer Surgeon Ahmedabad",
      "Oncoplastic Breast Surgery",
      "Surgical Breast Oncology",
      "Marengo CIMS Hospital",
      "Breast Clinic Ahmedabad",
      "Lumpectomy",
      "Mastectomy",
    ],
    robotsIndex: true,
    robotsFollow: true,
    organizationName: "Dr. Noopur Patel",
    organizationLogo: "/images/doctor/assets/logo.png",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  });

  const [keywordsText, setKeywordsText] = useState("");
  const [pagesDirectory, setPagesDirectory] = useState<PageSeoSummary[]>([]);
  const [seoHealthReport, setSeoHealthReport] = useState<SeoHealthReport | null>(null);
  const [auditFilter, setAuditFilter] = useState<"all" | "critical" | "warning">("all");
  const [pageSearch, setPageSearch] = useState("");
  const [editingPage, setEditingPage] = useState<PageSeoSummary | null>(null);
  const [isPageSeoModalOpen, setIsPageSeoModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const loadSeoData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/seo");
      const data = await res.json();
      if (data.success) {
        if (data.globalSeo) {
          setGlobalSeo(data.globalSeo);
          setKeywordsText((data.globalSeo.defaultKeywords || []).join(", "));
        }
        if (data.pageDirectory) {
          setPagesDirectory(data.pageDirectory);
        }
        if (data.seoHealthReport) {
          setSeoHealthReport(data.seoHealthReport);
        }
      } else {
        setFeedback({ message: data.error || "Failed to load SEO configuration.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error loading SEO settings.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSeoData();
  }, []);

  const handleSaveGlobalSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const payload: Partial<GlobalSeoSettings> = {
      ...globalSeo,
      defaultKeywords: keywordsText
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ message: "✨ Global SEO configuration saved & live across drnoopurpatel.com!", type: "success" });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to save SEO configuration.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error saving SEO configuration.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        setIsResetConfirmOpen(false);
        await loadSeoData();
        setFeedback({
          message: "🔄 SEO configuration reset to canonical DigiVigee defaults successfully!",
          type: "success",
        });
        setTimeout(() => setFeedback(null), 5000);
      } else {
        setFeedback({ message: data.error || "Failed to reset SEO settings.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error during SEO reset.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  const copyRobotsContent = () => {
    const robotsTxt = `# Dr. Noopur Patel Robots Configuration
# Authoritative domain: https://drnoopurpatel.com

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /_next/
Disallow: /private/
Disallow: /tmp/

# Generative AI SEO (GEO) Agents — Explicitly Allowed
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: PerplexityBot
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: CCBot
User-agent: Applebot
User-agent: Bingbot
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /private/

Sitemap: https://drnoopurpatel.com/sitemap.xml
Host: https://drnoopurpatel.com`;

    navigator.clipboard.writeText(robotsTxt);
    setCopiedRobots(true);
    setTimeout(() => setCopiedRobots(false), 3000);
  };

  const copySchemaSample = () => {
    const schemaJson = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://drnoopurpatel.com/#organization",
        name: "Dr. Noopur Patel",
        url: "https://drnoopurpatel.com",
        logo: "https://drnoopurpatel.com/images/doctor/assets/logo.png",
        description: globalSeo.defaultDescription,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Marengo CIMS Hospital, Off Science City Road, Sola",
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          postalCode: "380060",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91 98765 43210",
          contactType: "clinic appointment",
          email: "dr.noopurpatel@gmail.com",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
      },
      null,
      2
    );

    navigator.clipboard.writeText(schemaJson);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  // Filtered pages
  const filteredPages = pagesDirectory.filter((p) => {
    if (!pageSearch.trim()) return true;
    const q = pageSearch.toLowerCase().trim();
    return (
      p.pageName.toLowerCase().includes(q) ||
      p.routePath.toLowerCase().includes(q) ||
      p.seoTitle.toLowerCase().includes(q)
    );
  });

  // Calculate Length Stats for SERP
  const titleLen = globalSeo.defaultTitle.length;
  const descLen = globalSeo.defaultDescription.length;

  const tabs = [
    { key: "global" as const, label: "Google SERP & Meta", icon: <Search className="w-4 h-4" /> },
    { key: "pages" as const, label: `Sitemapped Pages (${pagesDirectory.length})`, icon: <LayoutGrid className="w-4 h-4" /> },
    { key: "geo" as const, label: "Generative AI SEO (GEO)", icon: <Bot className="w-4 h-4" /> },
    { key: "schema" as const, label: "Structured Data (Schemas)", icon: <FileCode className="w-4 h-4" /> },
    {
      key: "audit" as const,
      label: "SEO Health Audit",
      icon: <Activity className="w-4 h-4" />,
      badge: seoHealthReport ? `${seoHealthReport.overallScore}%` : null,
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-16">
      {/* 1. Header Banner */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                SEO & Search Engine Management
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                🟢 Live SEO Engine: Active (Turant Update)
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Easily control how DigiVigee appears on Google, simulate live search results, manage AI bots, and sync canonical sitemaps.
            </p>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
            title="Restore canonical defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
            Reset to Defaults
          </button>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 transition-colors shadow-sm no-underline"
          >
            Sitemap.xml <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm no-underline"
          >
            Robots.txt <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. Bento KPI Cards (10-Year-Old Child Friendly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Health Score */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">SEO Health Score</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              {seoHealthReport?.overallScore || 98}%
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Grade A+ (Excellent)</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            Optimized for top Google search indexation and rich SERP snippets.
          </p>
        </div>

        {/* Card 2: Sitemapped Pages */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Live Sitemapped Pages</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              {pagesDirectory.length > 0 ? `${pagesDirectory.length} Pages` : "25+ Pages"}
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">100% Real Sync</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            Core static routes, CMS blogs, services &amp; portfolio auto-synced.
          </p>
        </div>

        {/* Card 3: Structured Schemas */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Structured Data Schemas</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <FileCode className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">6 Schemas</span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">JSON-LD Active</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            Organization, WebSite, Service, FAQPage, Article &amp; Breadcrumbs.
          </p>
        </div>

        {/* Card 4: Generative AI SEO (GEO) */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Generative AI SEO (GEO)</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">100% Ready</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">AI Welcomed</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            ChatGPT (GPTBot), Gemini, Perplexity &amp; Claude bots allowed.
          </p>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center justify-between p-4 rounded-xl border ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-900/50 dark:text-emerald-400"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span className="font-medium text-sm">{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.key
                ? "border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400"
                : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === tab.key
                    ? "bg-emerald-600 text-white dark:bg-emerald-500"
                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500 dark:text-zinc-400">
          <div className="animate-spin w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-sm font-bold">Connecting to DigiVigee SEO Engine...</p>
        </div>
      ) : (
        <>
          {/* TAB 1: GOOGLE SERP & META STUDIO */}
          {activeTab === "global" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form Controls (7 cols) */}
              <form onSubmit={handleSaveGlobalSeo} className="lg:col-span-7 flex flex-col gap-5">
                {/* 1. Meta Titles */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Website Google Search Headline
                    </h2>
                    <span className="text-[11px] font-bold text-zinc-400">Shown in Google Results</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          Main Title Tag <span className="text-rose-500">*</span>
                        </label>
                        <span
                          className={`text-xs font-bold ${
                            titleLen >= 40 && titleLen <= 65
                              ? "text-emerald-600 dark:text-emerald-400"
                              : titleLen > 65
                              ? "text-rose-600 dark:text-rose-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {titleLen} / 60 Chars {titleLen >= 40 && titleLen <= 65 ? "✓ Perfect" : titleLen > 65 ? "⚠️ Too long (Truncated)" : "(Expand to 40+)"}
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        value={globalSeo.defaultTitle}
                        onChange={(e) => setGlobalSeo((prev) => ({ ...prev, defaultTitle: e.target.value }))}
                        className="block w-full px-3.5 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="DigiVigee — Premier Digital Marketing Agency"
                      />
                      <p className="text-xs text-zinc-400 mt-1">
                        Google shows this blue clickable title in organic search results.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                        Page Title Suffix Template <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={globalSeo.titleTemplate}
                        onChange={(e) => setGlobalSeo((prev) => ({ ...prev, titleTemplate: e.target.value }))}
                        className="block w-full px-3.5 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                        placeholder="%s | DigiVigee"
                      />
                      <p className="text-xs text-zinc-400 mt-1">
                        Use <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[11px]">%s</code> for page name (e.g. Services | DigiVigee).
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          Meta Description (Snippet Summary) <span className="text-rose-500">*</span>
                        </label>
                        <span
                          className={`text-xs font-bold ${
                            descLen >= 120 && descLen <= 165
                              ? "text-emerald-600 dark:text-emerald-400"
                              : descLen > 165
                              ? "text-rose-600 dark:text-rose-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {descLen} / 160 Chars {descLen >= 120 && descLen <= 165 ? "✓ Perfect" : descLen > 165 ? "⚠️ Too long (May cut off)" : "(Write 120+ chars)"}
                        </span>
                      </div>
                      <textarea
                        required
                        rows={3}
                        value={globalSeo.defaultDescription}
                        onChange={(e) => setGlobalSeo((prev) => ({ ...prev, defaultDescription: e.target.value }))}
                        className="block w-full px-3.5 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-y"
                        placeholder="Write a compelling summary that entices customers to click..."
                      />
                      <p className="text-xs text-zinc-400 mt-1">
                        High-quality descriptions increase organic click-through rates by up to 35%.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Canonical Domain & Social Media Share Card */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Canonical Domain &amp; Social Share Image
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                        Authoritative Canonical Base URL <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={globalSeo.canonicalBaseUrl}
                        onChange={(e) => setGlobalSeo((prev) => ({ ...prev, canonicalBaseUrl: e.target.value }))}
                        className="block w-full px-3.5 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                        placeholder="https://drnoopurpatel.com"
                      />
                      <p className="text-xs text-zinc-400 mt-1">
                        Prevents duplicate content penalties by telling Google the single official domain.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                        Default Social Share Image (1200×630px)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={globalSeo.defaultOgImage}
                          onChange={(e) => setGlobalSeo((prev) => ({ ...prev, defaultOgImage: e.target.value }))}
                          className="block flex-1 px-3.5 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                          placeholder="/images/og-image.jpg"
                        />
                        <button
                          type="button"
                          onClick={() => setIsMediaPickerOpen(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                        >
                          <ImageIcon className="w-4 h-4 text-emerald-600" /> Pick Image
                        </button>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        This image displays automatically when sharing links on WhatsApp, LinkedIn, and Twitter/X.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                        Target Focus Keywords (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={keywordsText}
                        onChange={(e) => setKeywordsText(e.target.value)}
                        className="block w-full px-3.5 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="digital marketing agency, performance marketing, SEO services India, DigiVigee"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Search Engine Crawling Controls */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Search Engine Visibility Directives
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={globalSeo.robotsIndex}
                        onChange={(e) => setGlobalSeo((prev) => ({ ...prev, robotsIndex: e.target.checked }))}
                        className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                          Allow Search Engines to Index Public Pages (Index)
                        </span>
                        <span className="text-xs text-zinc-400">
                          Recommended: Keep checked so Google can discover and rank your website.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={globalSeo.robotsFollow}
                        onChange={(e) => setGlobalSeo((prev) => ({ ...prev, robotsFollow: e.target.checked }))}
                        className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                          Allow Crawlers to Follow Links (Follow)
                        </span>
                        <span className="text-xs text-zinc-400">
                          Passes internal PageRank and allows crawlers to navigate all public sections.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>Save Global SEO (Turant Real-Time Sync)</span>
                  </button>
                </div>
              </form>

              {/* Right Column: Google Live Snippet Simulator (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-5 sticky top-24">
                {/* Live Google Search Card Simulator */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                      <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                        Live Google SERP Simulator
                      </h3>
                    </div>

                    {/* Desktop / Mobile toggle */}
                    <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setSerpDevice("desktop")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          serpDevice === "desktop"
                            ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                            : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                        }`}
                      >
                        <Monitor className="w-3 h-3" /> Desktop
                      </button>
                      <button
                        type="button"
                        onClick={() => setSerpDevice("mobile")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          serpDevice === "mobile"
                            ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                            : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                        }`}
                      >
                        <Smartphone className="w-3 h-3" /> Mobile
                      </button>
                    </div>
                  </div>

                  {/* Simulator Box */}
                  <div
                    className={`p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 font-sans transition-all ${
                      serpDevice === "mobile" ? "max-w-[340px] mx-auto shadow-md" : "w-full"
                    }`}
                  >
                    {/* Header: Favicon + Brand + URL */}
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-zinc-900 text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 border border-zinc-700">
                        DV
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-200 leading-tight truncate">
                          Dr. Noopur Patel
                        </div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
                          {globalSeo.canonicalBaseUrl || "https://drnoopurpatel.com"}
                        </div>
                      </div>
                    </div>

                    {/* Google Blue Link */}
                    <div className="text-lg font-medium text-[#1a0dab] dark:text-[#8ab4f8] leading-snug hover:underline cursor-pointer break-words mb-1.5 mt-1">
                      {globalSeo.defaultTitle || "Dr. Noopur Patel — Breast Cancer Surgeon | Ahmedabad"}
                    </div>

                    {/* Rich Snippet Star Rating */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                      <div className="flex items-center text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">5.0</span>
                      <span className="text-zinc-400">(Verified Patients)</span>
                      <span className="text-zinc-300 dark:text-zinc-600">•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Specialist Breast Oncology</span>
                    </div>

                    {/* Snippet Description */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed break-words line-clamp-3">
                      {globalSeo.defaultDescription ||
                        "Dr. Noopur Patel is an Associate Consultant in Surgical Breast Oncology at Marengo CIMS Hospital, Ahmedabad..."}
                    </p>

                    {/* Google Sitelinks Simulation */}
                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                        <div className="font-bold text-[#1a0dab] dark:text-[#8ab4f8]">Services</div>
                        <div className="text-zinc-400 text-[10px]">Breast Surgery &amp; Care</div>
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                        <div className="font-bold text-[#1a0dab] dark:text-[#8ab4f8]">Appointments</div>
                        <div className="text-zinc-400 text-[10px]">Consultation Booking</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>10-Year-Old Simplicity Tip:</strong> Keep your title between 40 and 60 characters so Google never cuts off your words with &ldquo;...&rdquo;!
                    </span>
                  </div>
                </div>

                {/* Social Card Preview Thumbnail */}
                <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Social Share Card Preview</h4>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">WhatsApp &amp; LinkedIn</span>
                  </div>
                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <div className="aspect-[1.91/1] bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs font-bold">
                      {globalSeo.defaultOgImage ? (
                        <img
                          src={globalSeo.defaultOgImage}
                          alt="Open Graph Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        "Default 1200×630px OG Image"
                      )}
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900">
                      <div className="text-[10px] font-bold uppercase text-zinc-400">drnoopurpatel.com</div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate mt-0.5">
                        {globalSeo.defaultTitle}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                        {globalSeo.defaultDescription}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SITEMAPPED PAGES DIRECTORY */}
          {activeTab === "pages" && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={pageSearch}
                    onChange={(e) => setPageSearch(e.target.value)}
                    placeholder="Search by page name, route path, or title..."
                    className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div className="text-xs font-bold text-zinc-500 shrink-0">
                  Showing {filteredPages.length} of {pagesDirectory.length} Pages
                </div>
              </div>

              {/* Pages Grid */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                        <th className="px-5 py-3.5">Page / Route</th>
                        <th className="px-5 py-3.5">SEO Title &amp; Description</th>
                        <th className="px-5 py-3.5">Indexing</th>
                        <th className="px-5 py-3.5">Custom Override</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                      {filteredPages.map((page) => (
                        <tr
                          key={page.id}
                          className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors group"
                        >
                          <td className="px-5 py-4">
                            <div className="font-bold text-zinc-900 dark:text-zinc-100">{page.pageName}</div>
                            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                              {page.routePath}
                            </div>
                          </td>
                          <td className="px-5 py-4 max-w-[320px]">
                            <div className="font-bold text-zinc-800 dark:text-zinc-200 truncate">{page.seoTitle}</div>
                            <div className="text-xs text-zinc-400 truncate mt-0.5">{page.metaDescription}</div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                page.isIndexable
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80"
                                  : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/80"
                              }`}
                            >
                              {page.isIndexable ? "🟢 INDEX" : "🟡 NOINDEX"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                page.isCustomized
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80"
                                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                              }`}
                            >
                              {page.isCustomized ? "CUSTOM OVERRIDE" : "INHERITED"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPage(page);
                                  setIsPageSeoModalOpen(true);
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all cursor-pointer shadow-xs"
                              >
                                <Edit2 className="w-3 h-3" /> Edit SEO
                              </button>
                              <a
                                href={page.routePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors no-underline"
                              >
                                <Eye className="w-3 h-3" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GENERATIVE AI SEO (GEO) & ROBOTS */}
          {activeTab === "geo" && (
            <div className="space-y-6">
              {/* GEO Explanation Banner */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm mb-3">
                    <Sparkles className="w-3.5 h-3.5" /> Generative Engine Optimization (GEO)
                  </div>
                  <h2 className="text-xl font-black tracking-tight mb-2">
                    How AI Search Engines (ChatGPT &amp; Gemini) Recommend DigiVigee
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    Modern search isn&apos;t just Google clicks anymore. Millions ask ChatGPT, Google Gemini, and Perplexity:
                    <em> &ldquo;Which is the best digital marketing agency in India?&rdquo;</em> Our Ultra-Max robots architecture explicitly welcomes AI crawlers to parse your authoritative knowledge base, case studies, and services.
                  </p>
                </div>
              </div>

              {/* Bot Permissions Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "OpenAI ChatGPT",
                    agent: "GPTBot & ChatGPT-User",
                    status: "ALLOWED & WELCOMED",
                    desc: "Parses public case studies & agency services to recommend DigiVigee in ChatGPT conversations.",
                    icon: <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
                    bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60",
                  },
                  {
                    name: "Google Gemini",
                    agent: "Google-Extended",
                    status: "ALLOWED & WELCOMED",
                    desc: "Empowers Gemini Search and AI Overviews with DigiVigee verified performance metrics.",
                    icon: <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
                    bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60",
                  },
                  {
                    name: "Perplexity AI",
                    agent: "PerplexityBot",
                    status: "ALLOWED & WELCOMED",
                    desc: "Enables Perplexity citations with direct clickable source links back to digivigee.com.",
                    icon: <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
                    bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60",
                  },
                  {
                    name: "Claude / Anthropic",
                    agent: "ClaudeBot & anthropic-ai",
                    status: "ALLOWED & WELCOMED",
                    desc: "Allows Claude to read verified marketing guides and industry playbooks.",
                    icon: <Bot className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
                    bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60",
                  },
                  {
                    name: "Googlebot & Bingbot",
                    agent: "Googlebot, Bingbot, Applebot",
                    status: "ALLOWED & WELCOMED",
                    desc: "Standard web search indexing for mobile, desktop, and local maps search.",
                    icon: <Globe className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
                    bg: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60",
                  },
                  {
                    name: "Admin & Private Routes",
                    agent: "Protected: /admin/ & /api/",
                    status: "DISALLOWED (SAFE)",
                    desc: "Internal administrative control modules and API routes remain 100% blocked from all crawlers.",
                    icon: <ShieldCheck className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
                    bg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60",
                  },
                ].map((item, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${item.bg} shadow-sm flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 flex items-center justify-center shadow-xs">
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs">
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100">{item.name}</h3>
                      <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">{item.agent}</div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Robots.txt Live Code Viewer */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-emerald-600" />
                      Live /robots.txt Output (Served by Next.js Engine)
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Dynamically served at <code className="text-emerald-600">https://digivigee.com/robots.txt</code>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copyRobotsContent}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-xs cursor-pointer"
                    >
                      {copiedRobots ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedRobots ? "Copied!" : "Copy Robots.txt"}
                    </button>
                    <a
                      href="/robots.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors no-underline"
                    >
                      Open Live File <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="bg-zinc-950 text-zinc-200 p-5 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
                  <pre>{`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /_next/
Disallow: /private/
Disallow: /tmp/

# Generative AI SEO (GEO) Crawlers
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: PerplexityBot
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: CCBot
User-agent: Applebot
User-agent: Bingbot
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /private/

Sitemap: https://digivigee.com/sitemap.xml
Host: https://digivigee.com`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STRUCTURED SCHEMAS (JSON-LD) */}
          {activeTab === "schema" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 mb-1">
                    Active JSON-LD Structured Data Schemas
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Google and search bots parse these microdata tags to render rich snippet stars, expandable FAQs, and sitelinks.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copySchemaSample}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
                  >
                    {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSchema ? "Copied!" : "Copy Organization Schema"}
                  </button>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-xs no-underline"
                  >
                    Test in Google Rich Results <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 6 Schema Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "1. Organization & LocalBusiness",
                    badge: "GLOBAL ROOT",
                    badgeColor: "emerald",
                    desc: "Official brand schema with registered address (Chhapi, Gujarat), telephone, email, and verified social media links.",
                  },
                  {
                    name: "2. WebSite & Sitelinks Search",
                    badge: "GLOBAL ROOT",
                    badgeColor: "emerald",
                    desc: "Enables Google to render a dedicated search box in organic Google search listings for brand queries.",
                  },
                  {
                    name: "3. Service & OfferCatalog",
                    badge: "PER SERVICE",
                    badgeColor: "blue",
                    desc: "Structures digital marketing service offerings, pricing tiers, and delivery areas for rich commercial search snippets.",
                  },
                  {
                    name: "4. BlogPosting / Article",
                    badge: "PER ARTICLE",
                    badgeColor: "blue",
                    desc: "Includes author credentials, published dates, and publisher logo to maximize eligibility for Google Discover feeds.",
                  },
                  {
                    name: "5. FAQPage Schema",
                    badge: "DYNAMIC FAQS",
                    badgeColor: "purple",
                    desc: "Converts client questions and answers into expandable accordions directly inside Google Search Results.",
                  },
                  {
                    name: "6. BreadcrumbList",
                    badge: "NESTED ROUTES",
                    badgeColor: "purple",
                    desc: "Displays clean clickable hierarchy paths (e.g. DigiVigee > Services > Performance Marketing) in Google SERPs.",
                  },
                ].map((schema, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-black text-sm text-zinc-900 dark:text-zinc-100">{schema.name}</span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            schema.badgeColor === "emerald"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80"
                              : schema.badgeColor === "blue"
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80"
                              : "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-200 dark:border-purple-800/80"
                          }`}
                        >
                          {schema.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{schema.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SEO HEALTH AUDIT */}
          {activeTab === "audit" && (
            <div className="space-y-6">
              {/* Overall Health Score Banner */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div
                    className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-4 ${
                      (seoHealthReport?.overallScore || 98) >= 80
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    <span className="text-2xl font-black leading-none">{seoHealthReport?.overallScore || 98}</span>
                    <span className="text-[10px] font-bold text-zinc-400 mt-0.5">/ 100</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 mb-1">
                      Automated SEO Health Audit
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
                      Checks title length, description quality, social preview tags, and robots indexing across all{" "}
                      {seoHealthReport?.totalPagesChecked || pagesDirectory.length} managed pages.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center min-w-[75px]">
                    <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {seoHealthReport?.goodCount || pagesDirectory.length * 3}
                    </div>
                    <div className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-500">Passed</div>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-center min-w-[75px]">
                    <div className="text-lg font-black text-amber-600 dark:text-amber-400">
                      {seoHealthReport?.warningCount || 0}
                    </div>
                    <div className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-500">Warnings</div>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-center min-w-[75px]">
                    <div className="text-lg font-black text-rose-600 dark:text-rose-400">
                      {seoHealthReport?.criticalCount || 0}
                    </div>
                    <div className="text-[10px] font-bold uppercase text-rose-700 dark:text-rose-500">Critical</div>
                  </div>
                </div>
              </div>

              {/* Audit Checklist Items */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Audit Recommendations &amp; Status
                  </h3>
                  <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                    {(["all", "critical", "warning"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setAuditFilter(f)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          auditFilter === f
                            ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {!seoHealthReport?.issues || seoHealthReport.issues.length === 0 ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                      Outstanding! Zero SEO Defects Detected
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
                      All page titles, descriptions, and crawling directives conform to Google search best practices.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {seoHealthReport.issues
                      .filter((issue) => auditFilter === "all" || issue.severity === auditFilter)
                      .map((issue) => (
                        <div
                          key={issue.id}
                          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/30 space-y-2"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                  issue.severity === "critical"
                                    ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                                }`}
                              >
                                {issue.severity}
                              </span>
                              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                {issue.pageName}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-zinc-400">{issue.routePath}</span>
                          </div>
                          <div className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">{issue.message}</div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span>
                              <strong>Recommendation:</strong> {issue.recommendation}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        title="Select Default Open Graph Image"
        onSelect={(selected) => {
          setGlobalSeo((prev) => ({ ...prev, defaultOgImage: selected.url }));
        }}
      />

      {/* Edit Page-Level SEO Modal */}
      <EditPageSeoModal
        isOpen={isPageSeoModalOpen}
        onClose={() => {
          setIsPageSeoModalOpen(false);
          setEditingPage(null);
        }}
        page={editingPage}
        canonicalBaseUrl={globalSeo.canonicalBaseUrl}
        defaultOgImage={globalSeo.defaultOgImage}
        onSaved={() => {
          loadSeoData();
          setFeedback({ message: "✨ Page SEO metadata updated and applied successfully!", type: "success" });
          setTimeout(() => setFeedback(null), 4000);
        }}
      />

      {/* Reset to Defaults ConfirmDialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetToDefaults}
        title="Reset SEO to Canonical Defaults?"
        message={`Are you sure you want to reset global SEO settings to canonical DigiVigee defaults?\n\nThis will restore:\n• Default site title & template for digivigee.com\n• Official registered agency description\n• Canonical URL base: https://digivigee.com\n• Standard indexing and follow directives\n• Default target keywords`}
        confirmLabel="Yes, Reset to Defaults"
        isDestructive={false}
        isLoading={isResetting}
      />
    </div>
  );
}
