"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SiteSettings } from "@/types";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  Settings,
  Building2,
  Phone,
  Globe,
  FileText,
  Save,
  CheckCircle2,
  XCircle,
  X,
  RefreshCw,
  Zap,
  Link as LinkIcon,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Eye,
  MessageSquare,
  Sparkles,
  Layers,
  RotateCcw,
  Sliders,
  CheckCheck,
  ShieldCheck,
  Megaphone,
} from "lucide-react";

interface SettingsFormState {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  showAnnouncementBar: boolean;
  announcementBarText: string;
  announcementLink: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: string;
  googleMapsEmbedUrl: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  youtube: string;
  github: string;
  aboutText: string;
  copyrightText: string;
  badgeText: string;
}

const CANONICAL_SETTINGS: SettingsFormState = {
  siteName: "DigiVigee",
  tagline: "Professional Solutions For Your Digital Growth",
  logoUrl: "/images/digivigee_logo.png",
  faviconUrl: "/favicon.ico",
  showAnnouncementBar: true,
  announcementBarText: "🚀 Special Offer: Scale with DigiVigee Platform — Claim Your Growth Audit Today →",
  announcementLink: "/offers",
  phone: "+91 90811 45178",
  whatsapp: "+91 90811 45178",
  email: "Contact@digivigee.com",
  address: "Orchid Complex, Office No. B, Door No. D-23, Approach Road / Pirojpura Road, Chhapi, Banaskantha, Gujarat - 385210",
  businessHours: "24/7 Priority Support & Strategy Pods",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Chhapi%20Gujarat%20385210&t=&z=13&ie=UTF8&iwloc=&output=embed",
  linkedin: "https://linkedin.com/company/digivigee",
  twitter: "https://twitter.com/digivigee",
  instagram: "https://instagram.com/digivigee",
  facebook: "https://facebook.com/digivigee",
  youtube: "https://youtube.com/@digivigee",
  github: "https://github.com/digivigee",
  aboutText:
    "DigiVigee is an enterprise-grade Agency Operating System and performance digital marketing platform dedicated to powering compounding revenue growth, automated workflows, and high-retention client experiences.",
  copyrightText: `© ${new Date().getFullYear()} DigiVigee Platform. All rights reserved.`,
  badgeText: "Enterprise-Grade Agency Operating System",
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"brand" | "contact" | "socials" | "footer" | "preview" | "sync">("brand");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [syncDetails, setSyncDetails] = useState<string | null>(null);

  const [formData, setFormData] = useState<SettingsFormState>(CANONICAL_SETTINGS);

  // Broadcast to other tabs & public site in real-time
  const broadcastCmsUpdate = () => {
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        const channel = new BroadcastChannel("digivigee-cms-sync");
        channel.postMessage({ type: "CMS_UPDATED", timestamp: Date.now() });
        channel.close();
      }
      localStorage.setItem("digivigee_cms_updated", Date.now().toString());
    } catch {}
  };

  // Load initial settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          const s: SiteSettings = data.settings;
          setFormData({
            siteName: s.siteName || CANONICAL_SETTINGS.siteName,
            tagline: s.tagline || CANONICAL_SETTINGS.tagline,
            logoUrl: s.logoUrl || CANONICAL_SETTINGS.logoUrl,
            faviconUrl: s.faviconUrl || CANONICAL_SETTINGS.faviconUrl,
            showAnnouncementBar: s.headerContent?.showAnnouncementBar ?? CANONICAL_SETTINGS.showAnnouncementBar,
            announcementBarText: s.headerContent?.announcementBarText || CANONICAL_SETTINGS.announcementBarText,
            announcementLink: s.headerContent?.announcementLink || CANONICAL_SETTINGS.announcementLink,
            phone: s.contact?.phone || CANONICAL_SETTINGS.phone,
            whatsapp: s.contact?.whatsapp || CANONICAL_SETTINGS.whatsapp,
            email: s.contact?.email || CANONICAL_SETTINGS.email,
            address: s.contact?.address || CANONICAL_SETTINGS.address,
            businessHours: s.contact?.businessHours || CANONICAL_SETTINGS.businessHours,
            googleMapsEmbedUrl: s.contact?.googleMapsEmbedUrl || CANONICAL_SETTINGS.googleMapsEmbedUrl,
            linkedin: s.socials?.linkedin || CANONICAL_SETTINGS.linkedin,
            twitter: s.socials?.twitter || CANONICAL_SETTINGS.twitter,
            instagram: s.socials?.instagram || CANONICAL_SETTINGS.instagram,
            facebook: s.socials?.facebook || CANONICAL_SETTINGS.facebook,
            youtube: s.socials?.youtube || CANONICAL_SETTINGS.youtube,
            github: s.socials?.github || CANONICAL_SETTINGS.github,
            aboutText: s.footerContent?.aboutText || CANONICAL_SETTINGS.aboutText,
            copyrightText: s.footerContent?.copyrightText || CANONICAL_SETTINGS.copyrightText,
            badgeText: s.footerContent?.badgeText || CANONICAL_SETTINGS.badgeText,
          });
        }
      } catch (e) {
        console.error("[AdminSettings] Load error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      const payload: Partial<SiteSettings> = {
        siteName: formData.siteName.trim(),
        tagline: formData.tagline.trim(),
        logoUrl: formData.logoUrl.trim(),
        faviconUrl: formData.faviconUrl.trim(),
        headerContent: {
          showAnnouncementBar: formData.showAnnouncementBar,
          announcementBarText: formData.announcementBarText.trim(),
          announcementLink: formData.announcementLink.trim(),
        },
        contact: {
          phone: formData.phone.trim(),
          whatsapp: formData.whatsapp.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          businessHours: formData.businessHours.trim(),
          googleMapsEmbedUrl: formData.googleMapsEmbedUrl.trim(),
        },
        socials: {
          linkedin: formData.linkedin.trim() || undefined,
          twitter: formData.twitter.trim() || undefined,
          instagram: formData.instagram.trim() || undefined,
          facebook: formData.facebook.trim() || undefined,
          youtube: formData.youtube.trim() || undefined,
          github: formData.github.trim() || undefined,
        },
        footerContent: {
          aboutText: formData.aboutText.trim(),
          copyrightText: formData.copyrightText.trim(),
          badgeText: formData.badgeText.trim(),
        },
      };

      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        broadcastCmsUpdate();
        setFeedback({ message: "Global website settings updated and broadcast in real-time!", type: "success" });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to update settings.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminSettings] Save error:", e);
      setFeedback({ message: "An error occurred while saving.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        setFormData(CANONICAL_SETTINGS);
        broadcastCmsUpdate();
        setIsResetModalOpen(false);
        setFeedback({
          message: "All global website settings reset to canonical DigiVigee production defaults!",
          type: "success",
        });
        setTimeout(() => setFeedback(null), 5000);
      } else {
        setFeedback({ message: data.error || "Failed to reset settings.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminSettings] Reset error:", e);
      setFeedback({ message: "An unexpected error occurred during reset.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  const handleSyncDatabase = async () => {
    setIsSyncing(true);
    setSyncDetails(null);
    try {
      const res = await fetch("/api/admin/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        broadcastCmsUpdate();
        setFeedback({ message: "All 12 CMS collections synchronized with live Firestore successfully!", type: "success" });
        setTimeout(() => setFeedback(null), 5000);
        if (data.stats) {
          setSyncDetails(
            `Synchronized: ${data.stats.services} Services, ${data.stats.portfolio} Portfolio Items, ${data.stats.blogs} Blog Posts, ${data.stats.testimonials} Testimonials, ${data.stats.faqs} FAQs, ${data.stats.team} Team Members, ${data.stats.pages} Static Pages, Global Settings, ${data.stats.offers} Offers, and ${data.stats.roles} RBAC Roles.`
          );
        }
      } else {
        setFeedback({ message: data.error || "Database synchronization failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminSettings] Sync error:", e);
      setFeedback({ message: "An unexpected error occurred while syncing Firestore.", type: "error" });
    } finally {
      setIsSyncing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-500 dark:text-zinc-400">
        <div className="animate-spin w-9 h-9 border-3 border-emerald-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-sm font-semibold tracking-wide">Loading Global Website Settings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-16">
      {/* 1. Header Bar with Real-Time Badges */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-sm">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
                Global Website Settings
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                🟢 Live Settings Cloud: Connected (Turant Sync)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Control official brand identity, direct phone & WhatsApp coordinates, social networks, and top announcement banner.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Top Bento KPI Cards (Visual Overview) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Brand Card */}
        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Brand Identity
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 truncate">
              {formData.siteName || "DigiVigee"}
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Official Logo Active
            </p>
          </div>
        </div>

        {/* Contact Coordinates Card */}
        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Direct Contact
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
              100% Configured
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium truncate mt-1">
              Phone, WhatsApp & Chhapi HQ
            </p>
          </div>
        </div>

        {/* Social Channels Card */}
        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Social Channels
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
              6 Active Links
            </div>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> LinkedIn, X, IG, YT & More
            </p>
          </div>
        </div>

        {/* Website Sync Status Card */}
        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Live Cloud Sync
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
              Instant Sync
            </div>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 mt-1">
              <Sparkles className="w-3 h-3" /> Auto-Broadcast to Open Tabs
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center justify-between p-4 rounded-xl border shadow-sm ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200"
                : "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
              )}
              <span className="font-semibold text-sm">{feedback.message}</span>
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

      {/* 3. Visual Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        {[
          { id: "brand", label: "Brand & Logo", icon: Building2 },
          { id: "contact", label: "Contact Coordinates & HQ", icon: Phone },
          { id: "socials", label: "Social Channels", icon: Globe },
          { id: "footer", label: "Footer & Legal Notice", icon: FileText },
          { id: "preview", label: "Live Simulator Preview", icon: Eye },
          { id: "sync", label: "Cloud Firestore Sync", icon: Zap },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200/80 dark:border-zinc-700"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-white/50 dark:hover:bg-zinc-900/50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* TAB 1: Brand & Logo */}
        {activeTab === "brand" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Identity Card */}
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Brand Identity & Core Details
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                Yeh details aapki website ke Header, Tab Title aur Meta tags par globally display hoti hain.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Website / Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, siteName: e.target.value }))}
                    placeholder="e.g. DigiVigee"
                    required
                    className="block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1">Website ka main brand name (default: DigiVigee).</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Brand Tagline / Slogan
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
                    placeholder="e.g. Professional Solutions For Your Digital Growth"
                    className="block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1">Header aur SEO title ke saath attach hota hai.</p>
                </div>
              </div>
            </div>

            {/* Visual Logo & Favicon Assets */}
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Visual Assets: Logo & Favicon
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                Website ke public header aur browser tab icon ke paths.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Path */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-800/40 flex flex-col justify-between">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                      Header Brand Logo URL
                    </label>
                    <input
                      type="text"
                      value={formData.logoUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, logoUrl: e.target.value }))}
                      className="block w-full px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono dark:text-zinc-100 mb-3"
                    />
                  </div>
                  <div className="p-3 bg-zinc-900 dark:bg-black rounded-lg flex items-center justify-between border border-zinc-800">
                    <div className="relative h-9 w-32">
                      <Image
                        src={formData.logoUrl || "/images/digivigee_logo.png"}
                        alt="Logo Preview"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Live Preview</span>
                  </div>
                </div>

                {/* Favicon Path */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-800/40 flex flex-col justify-between">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                      Browser Favicon URL
                    </label>
                    <input
                      type="text"
                      value={formData.faviconUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, faviconUrl: e.target.value }))}
                      className="block w-full px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono dark:text-zinc-100 mb-3"
                    />
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg flex items-center gap-3 border border-zinc-200 dark:border-zinc-700">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center p-1.5 border border-zinc-200 dark:border-zinc-700">
                      {/* Favicon icon */}
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">DV</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">Tab Favicon</span>
                      <span className="text-[10px] text-zinc-400">{formData.faviconUrl}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcement Bar Settings */}
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Top Announcement Bar (Offer Banner)
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Website ke bilkul top par special offer ya launch notification bar dikhata hai.
                  </p>
                </div>
                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showAnnouncementBar}
                    onChange={(e) => setFormData((prev) => ({ ...prev, showAnnouncementBar: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {formData.showAnnouncementBar && (
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                      Announcement Bar Message
                    </label>
                    <input
                      type="text"
                      value={formData.announcementBarText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, announcementBarText: e.target.value }))}
                      className="block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                      Click Link / Destination
                    </label>
                    <input
                      type="text"
                      value={formData.announcementLink}
                      onChange={(e) => setFormData((prev) => ({ ...prev, announcementLink: e.target.value }))}
                      placeholder="/offers or /contact"
                      className="block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Contact Coordinates & HQ */}
        {activeTab === "contact" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Direct Communication Channels
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                Aapke clients aur visitors in numbers aur emails se aapke saath seedha connect karte hain.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Official Phone */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Official Phone <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleCopy(formData.phone, "phone")}
                      className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "phone" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedKey === "phone" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                      className="block w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <a
                      href={`https://wa.me/${formData.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Test Chat</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                      required
                      className="block w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Official Email <span className="text-red-500">*</span>
                    </label>
                    <a
                      href={`mailto:${formData.email}`}
                      className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Test Mail</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="block w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Headquarters & Business Hours */}
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Physical Headquarters & Operational Hours
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                Gujarat Headquarters address jo Contact page aur Google Maps embed me reflect hota hai.
              </p>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Full Registered Office Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    required
                    className="block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all resize-y"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Default: Orchid Complex, Office No. B, Door No. D-23, Approach Road / Pirojpura Road, Chhapi, Banaskantha, Gujarat - 385210
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                      Business Working Hours <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.businessHours}
                        onChange={(e) => setFormData((prev) => ({ ...prev, businessHours: e.target.value }))}
                        required
                        className="block w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                      Google Maps Embed URL
                    </label>
                    <input
                      type="text"
                      value={formData.googleMapsEmbedUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, googleMapsEmbedUrl: e.target.value }))}
                      className="block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Social Media Channels */}
        {activeTab === "socials" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Verified Social Media Profiles
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                Ye sabhi links website ke footer aur contact blocks me verified icons ke saath link hoti hain.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "linkedin" as const, label: "LinkedIn Company Profile", color: "bg-blue-600" },
                  { key: "twitter" as const, label: "Twitter / X Profile", color: "bg-zinc-900 dark:bg-zinc-700" },
                  { key: "instagram" as const, label: "Instagram Official Page", color: "bg-pink-600" },
                  { key: "facebook" as const, label: "Facebook Page", color: "bg-blue-700" },
                  { key: "youtube" as const, label: "YouTube Channel", color: "bg-red-600" },
                  { key: "github" as const, label: "GitHub Organization", color: "bg-zinc-800" },
                ].map(({ key, label, color }) => {
                  const url = formData[key];
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{label}</span>
                        </div>
                        {url && (
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Open Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                          <LinkIcon className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="url"
                          value={formData[key]}
                          onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                          placeholder={`https://${key}.com/digivigee`}
                          className="block w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Footer & Legal Notice */}
        {activeTab === "footer" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Global Footer & Legal Notice
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                Website ke har page ke bottom me footer bio aur copyright notice customize karein.
              </p>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Footer About Agency Blurb <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aboutText}
                    onChange={(e) => setFormData((prev) => ({ ...prev, aboutText: e.target.value }))}
                    required
                    className="block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all resize-y"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Footer ke left column me brand logo ke neeche display hone wala statement.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                      Copyright Line <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.copyrightText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, copyrightText: e.target.value }))}
                      required
                      className="block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                      Platform Badge / Category
                    </label>
                    <input
                      type="text"
                      value={formData.badgeText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, badgeText: e.target.value }))}
                      className="block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Live Interactive Simulator (Side-by-Side Live Preview) */}
        {activeTab === "preview" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Live Website Visual Simulator
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Aap jo bhi changes settings me kar rahe hain, wo website par aisi real-time dikhengi (Turant Update).
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  Real-Time Mockup
                </span>
              </div>

              {/* Browser Mockup Window */}
              <div className="rounded-2xl border border-zinc-300 dark:border-zinc-700 overflow-hidden bg-zinc-950 shadow-2xl">
                {/* Browser Top Bar */}
                <div className="bg-zinc-900 px-4 py-2.5 flex items-center gap-3 border-b border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                  </div>
                  <div className="flex-1 max-w-md mx-auto bg-zinc-800 px-3 py-1 rounded-md text-[11px] font-mono text-zinc-400 truncate text-center">
                    https://digivigee.com
                  </div>
                </div>

                {/* Simulated Announcement Bar */}
                {formData.showAnnouncementBar && (
                  <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-4 py-2 text-xs font-bold text-center tracking-wide flex items-center justify-center gap-2">
                    <span>{formData.announcementBarText}</span>
                  </div>
                )}

                {/* Simulated Desktop Header Navigation */}
                <div className="bg-zinc-900/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-zinc-800 text-white">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-28">
                      <Image
                        src={formData.logoUrl || "/images/digivigee_logo.png"}
                        alt={formData.siteName}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="font-bold text-sm text-zinc-200 hidden sm:inline">{formData.siteName}</span>
                  </div>

                  <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-300">
                    <span className="hover:text-white cursor-pointer">Services</span>
                    <span className="hover:text-white cursor-pointer">Case Studies</span>
                    <span className="hover:text-white cursor-pointer">About</span>
                    <span className="hover:text-white cursor-pointer">Blog</span>
                    <span className="hover:text-white cursor-pointer">Contact</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`https://wa.me/${formData.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Simulated Hero Snippet */}
                <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-zinc-900 to-zinc-950 text-white border-b border-zinc-800">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 mb-4">
                    {formData.badgeText || "Official Website"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                    {formData.tagline || "Professional Solutions For Your Digital Growth"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
                    Directly connected to Gujarat HQ at {formData.address.split(",")[0]}. Call us at {formData.phone}.
                  </p>
                </div>

                {/* Simulated Footer Snippet */}
                <div className="bg-zinc-950 p-6 sm:p-8 text-zinc-400 text-xs border-t border-zinc-900">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <span className="text-white font-bold text-sm block mb-1">{formData.siteName}</span>
                      <p className="text-zinc-500 text-[11px] leading-relaxed max-w-md">{formData.aboutText}</p>
                    </div>
                    <div>
                      <span className="text-white font-bold text-xs block mb-1">Direct Support</span>
                      <p className="text-zinc-500 text-[11px]">
                        📞 {formData.phone} • ✉️ {formData.email}
                      </p>
                      <p className="text-zinc-500 text-[11px] mt-0.5">📍 {formData.address}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-500">
                    <span>{formData.copyrightText}</span>
                    <div className="flex items-center gap-3">
                      <span>Privacy</span>
                      <span>•</span>
                      <span>Terms</span>
                      <span>•</span>
                      <span>Security</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Cloud Firestore Sync & Maintenance */}
        {activeTab === "sync" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    Cloud Firestore Master Database Synchronization
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Synchronize and seed all 12 platform CMS collections (Services, Portfolio, Blogs, Testimonials, FAQs, Team Members, Page Content, Offers, Redirects, Site Settings, and RBAC Roles) directly to live Cloud Firestore with atomic batching.
                  </p>

                  {syncDetails && (
                    <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-medium text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                      <span>{syncDetails}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSyncDatabase}
                  disabled={isSyncing}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 text-xs font-bold hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all disabled:opacity-70 cursor-pointer"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Syncing Collections...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>Sync All 12 Collections</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Dangerous Zone / Reset to Defaults Card */}
            <div className="bg-red-50/50 dark:bg-red-950/20 p-6 sm:p-7 rounded-2xl border border-red-200/80 dark:border-red-900/40 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-red-950 dark:text-red-300 flex items-center gap-2 mb-1">
                    <RotateCcw className="w-4 h-4 text-red-600 dark:text-red-400" />
                    Reset Global Settings to Canonical Defaults
                  </h3>
                  <p className="text-xs text-red-700/80 dark:text-red-400/80 leading-relaxed max-w-xl">
                    Agar aap test data clear karna chahte hain aur DigiVigee ke verified production phone (+91 90811 45178), Banaskantha HQ address, aur official social links restore karna chahte hain, toh yahan click karein.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(true)}
                  className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer"
                >
                  Reset Settings Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Changes are automatically recorded in the security audit log and revision history.</span>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Global Settings</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* 4. Reset to Defaults Confirmation Modal */}
      <ConfirmDialog
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetToDefaults}
        title="Reset Global Website Settings?"
        message={`This will restore canonical DigiVigee branding (DigiVigee), Banaskantha Gujarat HQ address, official contact numbers (+91 90811 45178), all 6 verified social media profiles, top announcement bar, and footer statements.\n\nAll changes will immediately sync across live Cloud Firestore and open website tabs.`}
        confirmLabel="Yes, Reset to Defaults"
        isDestructive={false}
        isLoading={isResetting}
      />
    </div>
  );
}
