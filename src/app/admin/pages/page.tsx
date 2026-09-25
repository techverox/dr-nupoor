"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { HomePageContent, AboutPageContent, ContactPageContent } from "@/types";
import { AdminRevisionDrawer } from "@/components/admin/AdminRevisionDrawer";
import { notifyLiveSync } from "@/lib/sync/clientSync";
import {
  DEFAULT_HOME_PAGE_CONTENT,
  DEFAULT_ABOUT_PAGE_CONTENT,
  DEFAULT_CONTACT_PAGE_CONTENT,
} from "@/data/pagesContent";
import {
  Home,
  Building2,
  PhoneCall,
  ExternalLink,
  RotateCcw,
  History,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Save,
  Check,
  ShieldCheck,
  Zap,
  TrendingUp,
} from "lucide-react";

// Canonical Live Clinical Defaults for Dr. Noopur Patel Clinic
const CANONICAL_DEFAULTS = {
  home: DEFAULT_HOME_PAGE_CONTENT,
  about: DEFAULT_ABOUT_PAGE_CONTENT,
  contact: DEFAULT_CONTACT_PAGE_CONTENT,
};

export default function AdminPagesContentPage() {
  const [activeTab, setActiveTab] = useState<"home" | "about" | "contact">("home");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showRevisions, setShowRevisions] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Home Page State
  const [homeData, setHomeData] = useState<Partial<HomePageContent>>(CANONICAL_DEFAULTS.home);
  // About Page State
  const [aboutData, setAboutData] = useState<Partial<AboutPageContent>>(CANONICAL_DEFAULTS.about);
  // Contact Page State
  const [contactData, setContactData] = useState<Partial<ContactPageContent>>(CANONICAL_DEFAULTS.contact);

  const loadPageContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/pages?pageId=${activeTab}`);
      const data = await res.json();
      if (data.success && data.content) {
        if (activeTab === "home") setHomeData({ ...CANONICAL_DEFAULTS.home, ...data.content });
        if (activeTab === "about") setAboutData({ ...CANONICAL_DEFAULTS.about, ...data.content });
        if (activeTab === "contact") setContactData({ ...CANONICAL_DEFAULTS.contact, ...data.content });
      }
    } catch (e) {
      console.error("[AdminPages] Load error:", e);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadPageContent();
  }, [loadPageContent]);

  // Keyboard shortcut: Cmd/Ctrl + S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        saveCurrentTab();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const saveCurrentTab = async () => {
    setIsSaving(true);
    let contentToSave: Record<string, unknown> = {};
    if (activeTab === "home") contentToSave = homeData;
    if (activeTab === "about") contentToSave = aboutData;
    if (activeTab === "contact") contentToSave = contactData;

    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: activeTab,
          ...contentToSave,
        }),
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("pages", activeTab);
        setFeedback({
          message: `${activeTab.toUpperCase()} content saved & live on website.`,
          type: "success",
        });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to update page content.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminPages] Save error:", e);
      setFeedback({ message: "An unexpected error occurred.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm(`Reset ${activeTab.toUpperCase()} page copy to live website canonical defaults?`)) {
      if (activeTab === "home") setHomeData({ ...CANONICAL_DEFAULTS.home });
      if (activeTab === "about") setAboutData({ ...CANONICAL_DEFAULTS.about });
      if (activeTab === "contact") setContactData({ ...CANONICAL_DEFAULTS.contact });
      setFeedback({
        message: `Restored ${activeTab.toUpperCase()} to canonical live defaults. Remember to click Save.`,
        type: "success",
      });
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const getLivePageUrl = () => {
    if (activeTab === "home") return "/";
    if (activeTab === "about") return "/about";
    return "/contact";
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto font-sans pb-16">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Website Page Content CMS
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#008744] border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008744] animate-pulse" />
              100% Real-Time Sync
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Edit headlines, values, and CTAs across core website pages. Changes reflect live on the site instantly upon save.
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href={getLivePageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
          >
            <span>View Live Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </Link>

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
              showPreview
                ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {showPreview ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showPreview ? "Live Preview On" : "Live Preview Off"}</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefaults}
            title="Reset this tab to live website canonical defaults"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setShowRevisions(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-zinc-400" />
            <span>Revisions</span>
          </button>

          <button
            type="button"
            onClick={saveCurrentTab}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#008744] hover:bg-[#007038] text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Publishing..." : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "home"
              ? "bg-[#0C1628] text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Homepage (/)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "about"
              ? "bg-[#0C1628] text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>About Us (/about)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "contact"
              ? "bg-[#0C1628] text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Contact Desk (/contact)</span>
        </button>
      </div>

      {/* Real-time Feedback Banner */}
      {feedback && (
        <div
          role="alert"
          className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-current opacity-70 hover:opacity-100 font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Area: Split Editor & Live Preview */}
      {isLoading ? (
        <div className="py-20 text-center text-zinc-500 text-sm font-medium">
          Loading page content from CMS...
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${showPreview ? "lg:grid-cols-12 gap-8" : "gap-6"}`}>
          {/* Left Column: Form Fields */}
          <div className={`${showPreview ? "lg:col-span-7" : "w-full"} flex flex-col gap-6`}>
            
            {/* ============================================================ */}
            {/* 1. HOMEPAGE EDITOR                                           */}
            {/* ============================================================ */}
            {activeTab === "home" && (
              <>
                {/* Hero Headline & Messaging */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008744] text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Hero Headline &amp; Core Value Proposition
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Hero Headline (Main Part)
                        </label>
                        <input
                          type="text"
                          value={homeData.heroHeadline || ""}
                          onChange={(e) => setHomeData((prev) => ({ ...prev, heroHeadline: e.target.value }))}
                          placeholder="e.g. Run Your Entire Agency From One"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#008744]/20 focus:border-[#008744]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Highlight Word (Gradient)
                        </label>
                        <input
                          type="text"
                          value={homeData.heroHeadlineHighlight || ""}
                          onChange={(e) => setHomeData((prev) => ({ ...prev, heroHeadlineHighlight: e.target.value }))}
                          placeholder="Platform."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300/80 dark:border-emerald-700/80 bg-emerald-50/30 text-sm font-bold text-[#008744] focus:outline-none focus:ring-2 focus:ring-[#008744]/20 focus:border-[#008744]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Supporting Subheadline Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={homeData.heroSubheadline || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, heroSubheadline: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#008744]/20 focus:border-[#008744] leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Primary CTA Label
                        </label>
                        <input
                          type="text"
                          value={homeData.primaryCtaText || ""}
                          onChange={(e) => setHomeData((prev) => ({ ...prev, primaryCtaText: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Primary CTA Destination Link
                        </label>
                        <input
                          type="text"
                          value={homeData.primaryCtaLink || ""}
                          onChange={(e) => setHomeData((prev) => ({ ...prev, primaryCtaLink: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-600 dark:text-zinc-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Secondary CTA Label
                        </label>
                        <input
                          type="text"
                          value={homeData.secondaryCtaText || ""}
                          onChange={(e) => setHomeData((prev) => ({ ...prev, secondaryCtaText: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Secondary CTA Destination Link
                        </label>
                        <input
                          type="text"
                          value={homeData.secondaryCtaLink || ""}
                          onChange={(e) => setHomeData((prev) => ({ ...prev, secondaryCtaLink: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-600 dark:text-zinc-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Strip */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008744] text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Key Performance &amp; Retention Statistics
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 space-y-2">
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                        Stat 1 (Value / Label)
                      </label>
                      <input
                        type="text"
                        value={homeData.stat1Value || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, stat1Value: e.target.value }))}
                        placeholder="4.8x"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-sm font-bold text-zinc-900"
                      />
                      <input
                        type="text"
                        value={homeData.stat1Label || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, stat1Label: e.target.value }))}
                        placeholder="Avg Blended ROAS"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 space-y-2">
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                        Stat 2 (Value / Label)
                      </label>
                      <input
                        type="text"
                        value={homeData.stat2Value || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, stat2Value: e.target.value }))}
                        placeholder="$84.2M+"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-sm font-bold text-zinc-900"
                      />
                      <input
                        type="text"
                        value={homeData.stat2Label || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, stat2Label: e.target.value }))}
                        placeholder="Verified Ad Spend Managed"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 space-y-2">
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                        Stat 3 (Value / Label)
                      </label>
                      <input
                        type="text"
                        value={homeData.stat3Value || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, stat3Value: e.target.value }))}
                        placeholder="65+ Hrs"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-sm font-bold text-zinc-900"
                      />
                      <input
                        type="text"
                        value={homeData.stat3Label || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, stat3Label: e.target.value }))}
                        placeholder="Monthly Reporting Saved"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 space-y-2">
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                        Stat 4 (Value / Label)
                      </label>
                      <input
                        type="text"
                        value={homeData.stat4Value || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, stat4Value: e.target.value }))}
                        placeholder="0%"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-sm font-bold text-zinc-900"
                      />
                      <input
                        type="text"
                        value={homeData.stat4Label || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, stat4Label: e.target.value }))}
                        placeholder="Ad Spend Overrun Tolerance"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Narratives */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008744] text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Supporting Narratives &amp; Bottom Conversion
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Feature Section Headline
                      </label>
                      <input
                        type="text"
                        value={homeData.whyUsTitle || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, whyUsTitle: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Bottom Conversion CTA Title
                      </label>
                      <input
                        type="text"
                        value={homeData.ctaSectionHeadline || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, ctaSectionHeadline: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Bottom Conversion Subtitle
                      </label>
                      <textarea
                        rows={2}
                        value={homeData.ctaSectionSubtitle || ""}
                        onChange={(e) => setHomeData((prev) => ({ ...prev, ctaSectionSubtitle: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs text-zinc-600"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ============================================================ */}
            {/* 2. ABOUT US EDITOR                                           */}
            {/* ============================================================ */}
            {activeTab === "about" && (
              <>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008744] text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      About Us Hero &amp; Positioning
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Hero Headline (Main Part)
                        </label>
                        <input
                          type="text"
                          value={aboutData.heroHeadline || ""}
                          onChange={(e) => setAboutData((prev) => ({ ...prev, heroHeadline: e.target.value }))}
                          placeholder="Your Digital Partner for"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Highlight Phrase (Gradient)
                        </label>
                        <input
                          type="text"
                          value={aboutData.heroHeadlineHighlight || ""}
                          onChange={(e) => setAboutData((prev) => ({ ...prev, heroHeadlineHighlight: e.target.value }))}
                          placeholder="Technology, Tools & Business Growth."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 text-sm font-bold text-[#008744] bg-emerald-50/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Official Narrative Subheadline
                      </label>
                      <textarea
                        rows={3}
                        value={aboutData.heroSubheadline || ""}
                        onChange={(e) => setAboutData((prev) => ({ ...prev, heroSubheadline: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm text-zinc-700 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008744] text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Company Story &amp; Evolution
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Story Section Title
                      </label>
                      <input
                        type="text"
                        value={aboutData.storyTitle || ""}
                        onChange={(e) => setAboutData((prev) => ({ ...prev, storyTitle: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Story Narrative 1
                        </label>
                        <textarea
                          rows={4}
                          value={aboutData.storyParagraph1 || ""}
                          onChange={(e) => setAboutData((prev) => ({ ...prev, storyParagraph1: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-700 leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Story Narrative 2
                        </label>
                        <textarea
                          rows={4}
                          value={aboutData.storyParagraph2 || ""}
                          onChange={(e) => setAboutData((prev) => ({ ...prev, storyParagraph2: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-700 leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008744] text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Mission &amp; Vision
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Mission Statement
                      </label>
                      <textarea
                        rows={3}
                        value={aboutData.missionDescription || ""}
                        onChange={(e) => setAboutData((prev) => ({ ...prev, missionDescription: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-700 leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Vision Statement
                      </label>
                      <textarea
                        rows={3}
                        value={aboutData.visionDescription || ""}
                        onChange={(e) => setAboutData((prev) => ({ ...prev, visionDescription: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-700 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ============================================================ */}
            {/* 3. CONTACT DESK EDITOR                                       */}
            {/* ============================================================ */}
            {activeTab === "contact" && (
              <>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008744] text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Contact Desk Headline &amp; Form Routing
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Headline (First Part)
                        </label>
                        <input
                          type="text"
                          value={contactData.heroHeadline || ""}
                          onChange={(e) => setContactData((prev) => ({ ...prev, heroHeadline: e.target.value }))}
                          placeholder="Let's Build Something"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Highlight (Second Part)
                        </label>
                        <input
                          type="text"
                          value={contactData.heroHeadlineHighlight || ""}
                          onChange={(e) => setContactData((prev) => ({ ...prev, heroHeadlineHighlight: e.target.value }))}
                          placeholder="Exceptional Together."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 text-sm font-bold text-[#008744] bg-emerald-50/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Consultation Subheadline
                      </label>
                      <textarea
                        rows={2}
                        value={contactData.heroSubheadline || ""}
                        onChange={(e) => setContactData((prev) => ({ ...prev, heroSubheadline: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm text-zinc-700 leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Form Card Header
                        </label>
                        <input
                          type="text"
                          value={contactData.formTitle || ""}
                          onChange={(e) => setContactData((prev) => ({ ...prev, formTitle: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Form Subtitle
                        </label>
                        <input
                          type="text"
                          value={contactData.formSubtitle || ""}
                          onChange={(e) => setContactData((prev) => ({ ...prev, formSubtitle: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs text-zinc-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#008744] text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Verified Direct Contact Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Priority Phone Number
                      </label>
                      <input
                        type="text"
                        value={contactData.phone || ""}
                        onChange={(e) => setContactData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Inquiry Email Address
                      </label>
                      <input
                        type="email"
                        value={contactData.email || ""}
                        onChange={(e) => setContactData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-900"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Office Physical Address
                      </label>
                      <textarea
                        rows={2}
                        value={contactData.address || ""}
                        onChange={(e) => setContactData((prev) => ({ ...prev, address: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs text-zinc-700"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Working Hours SLA
                      </label>
                      <input
                        type="text"
                        value={contactData.workingHours || ""}
                        onChange={(e) => setContactData((prev) => ({ ...prev, workingHours: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs text-zinc-700"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Bottom Save Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-400">
                Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border text-[10px] font-mono">Cmd+S</kbd> to save immediately.
              </span>
              <button
                type="button"
                onClick={saveCurrentTab}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#008744] hover:bg-[#007038] text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Publishing Changes..." : `Save ${activeTab.toUpperCase()} Page Content`}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Preview */}
          {showPreview && (
            <div className="lg:col-span-5">
              <div className="sticky top-6 flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Live Preview &bull; {activeTab.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">Interactive Stage</span>
                </div>

                {/* Preview Browser Window Frame */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-md overflow-hidden">
                  {/* Browser URL Bar Mockup */}
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-zinc-900 border-b border-slate-200/80 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-[11px] font-mono text-slate-500">
                      digivigee.com{getLivePageUrl()}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      SYNCED
                    </span>
                  </div>

                  {/* Preview Body */}
                  <div className="p-6 sm:p-7 bg-[#FCFDFD] dark:bg-zinc-950">
                    {/* HOMEPAGE PREVIEW */}
                    {activeTab === "home" && (
                      <div className="space-y-5 text-left">
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0A2248] leading-[1.12]">
                            {homeData.heroHeadline || "Run Your Entire Agency From One"}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009C35] via-[#00B838] to-[#04BE02]">
                              {homeData.heroHeadlineHighlight || "Platform."}
                            </span>
                          </h3>
                          <p className="text-xs text-[#3E4D64] mt-3 leading-relaxed font-normal">
                            {homeData.heroSubheadline || "Digivigee is the trusted work delivery platform..."}
                          </p>
                        </div>

                        {/* CTA Buttons preview */}
                        <div className="flex flex-wrap items-center gap-2.5 pt-1">
                          <span className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#00E05C] to-[#0070F3] shadow-xs inline-flex items-center gap-1.5">
                            <span>{homeData.primaryCtaText || "Start 14-day free trial"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-xs font-bold text-[#0C1628] px-3 py-2">
                            {homeData.secondaryCtaText || "Digivigee in 3 minutes"}
                          </span>
                        </div>

                        {/* Stats Grid preview */}
                        <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-100">
                          <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs">
                            <div className="text-base font-black text-slate-900">{homeData.stat1Value}</div>
                            <div className="text-[10px] text-slate-500 font-medium">{homeData.stat1Label}</div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs">
                            <div className="text-base font-black text-slate-900">{homeData.stat2Value}</div>
                            <div className="text-[10px] text-slate-500 font-medium">{homeData.stat2Label}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ABOUT US PREVIEW */}
                    {activeTab === "about" && (
                      <div className="space-y-5 text-center">
                        <div className="max-w-md mx-auto">
                          <h3 className="text-2xl font-black text-[#0C1628] tracking-tight leading-[1.15]">
                            {aboutData.heroHeadline || "Your Digital Partner for"}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0C1628] via-[#008744] to-[#0C1628]">
                              {aboutData.heroHeadlineHighlight || "Technology, Tools & Business Growth."}
                            </span>
                          </h3>
                          <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">
                            {aboutData.heroSubheadline}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-2xs text-left space-y-1.5">
                          <div className="text-xs font-bold text-slate-900">{aboutData.storyTitle}</div>
                          <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                            {aboutData.storyParagraph1}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CONTACT DESK PREVIEW */}
                    {activeTab === "contact" && (
                      <div className="space-y-4 text-center">
                        <div>
                          <h3 className="text-xl font-black text-[#0C1628] tracking-tight">
                            {contactData.heroHeadline || "Let's Build Something"}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008744] to-emerald-600">
                              {contactData.heroHeadlineHighlight || "Exceptional Together."}
                            </span>
                          </h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {contactData.heroSubheadline}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-2xs text-left space-y-2 text-xs">
                          <div className="font-bold text-slate-900">{contactData.formTitle}</div>
                          <div className="text-[11px] text-slate-500">{contactData.formSubtitle}</div>
                          <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
                            <span className="font-semibold text-slate-800">Phone: {contactData.phone}</span>
                            <span className="font-semibold text-slate-800">Email: {contactData.email}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-zinc-400 text-center">
                  Changes made here update the live server immediately on save.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Revision History Drawer */}
      <AdminRevisionDrawer
        isOpen={showRevisions}
        onClose={() => setShowRevisions(false)}
        resourceType="page"
        resourceId={activeTab}
        resourceTitle={`${activeTab.toUpperCase()} Page`}
        onRestored={() => {
          loadPageContent();
          setFeedback({
            type: "success",
            message: `Successfully reverted ${activeTab} page to selected revision!`,
          });
        }}
      />
    </div>
  );
}
