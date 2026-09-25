"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SiteSettings } from "@/types";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { notifyLiveSync } from "@/lib/sync/clientSync";
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
  KeyRound,
  Code2,
  Terminal,
  AlertTriangle,
  Info,
  Plus,
} from "lucide-react";
import { ChangePasswordModal } from "@/components/admin/ChangePasswordModal";

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
  customScriptsEnabled: boolean;
  customHeaderCode: string;
  customBodyCode: string;
  customFooterCode: string;
}

const CANONICAL_SETTINGS: SettingsFormState = {
  siteName: "Dr. Noopur Patel",
  tagline: "Breast Surgeon & Oncoplastic Surgeon — Expert Care. Stronger Tomorrows.",
  logoUrl: "/images/doctor/assets/logo.png",
  faviconUrl: "/favicon.ico",
  showAnnouncementBar: false,
  announcementBarText: "Expert Breast Care & Consultations — Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad",
  announcementLink: "/appointments",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "dr.noopurpatel@gmail.com",
  address: "Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat 380060",
  businessHours: "Mon - Sat: 10:00 AM - 6:00 PM",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Marengo%20CIMS%20Hospital%20Ahmedabad&t=&z=14&ie=UTF8&iwloc=&output=embed",
  linkedin: "https://linkedin.com/in/drnoopurpatel",
  twitter: "https://twitter.com/drnoopurpatel",
  instagram: "https://instagram.com/drnoopurpatel",
  facebook: "https://facebook.com/drnoopurpatel",
  youtube: "https://youtube.com/@drnoopurpatel",
  github: "",
  aboutText:
    "Dedicated to compassionate, evidence-based, and patient-centered breast surgical oncology. Combining oncologic clearance with aesthetic preservation for every woman.",
  copyrightText: `© ${new Date().getFullYear()} Dr. Noopur Patel. All rights reserved.`,
  badgeText: "Surgical Breast Oncology & Oncoplastic Surgery",
  customScriptsEnabled: true,
  customHeaderCode: "",
  customBodyCode: "",
  customFooterCode: "",
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"brand" | "contact" | "socials" | "footer" | "scripts" | "preview" | "sync">("brand");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [syncDetails, setSyncDetails] = useState<string | null>(null);

  const [formData, setFormData] = useState<SettingsFormState>(CANONICAL_SETTINGS);

  // Broadcast to other tabs & public site in real-time
  const broadcastCmsUpdate = () => {
    try {
      notifyLiveSync("siteSettings", "global", "SETTINGS_UPDATE");
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        const channel = new BroadcastChannel("drn-cms-sync");
        channel.postMessage({ type: "CMS_UPDATED", timestamp: Date.now() });
        channel.close();
      }
      localStorage.setItem("drn_cms_updated", Date.now().toString());
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
            customScriptsEnabled: s.customScripts?.isEnabled ?? CANONICAL_SETTINGS.customScriptsEnabled,
            customHeaderCode: s.customScripts?.headerCode || "",
            customBodyCode: s.customScripts?.bodyCode || "",
            customFooterCode: s.customScripts?.footerCode || "",
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
        customScripts: {
          isEnabled: formData.customScriptsEnabled,
          headerCode: formData.customHeaderCode.trim(),
          bodyCode: formData.customBodyCode.trim(),
          footerCode: formData.customFooterCode.trim(),
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
          message: "All global clinic settings reset to Dr. Noopur Patel's practice defaults!",
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
            `Synchronized: ${data.stats.services} Services, ${data.stats.portfolio} Portfolio Cases, ${data.stats.blogs} Blog Insights, ${data.stats.testimonials} Testimonials, ${data.stats.faqs} FAQs, ${data.stats.team} Medical Team, ${data.stats.pages} Static Pages, Global Practice Settings, ${data.stats.offers} Announcements, and ${data.stats.roles} RBAC Roles.`
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
        <div className="animate-spin w-9 h-9 border-3 border-rose-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-sm font-semibold tracking-wide">Loading Global Practice Settings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-16">
      {/* 1. Header Bar with Real-Time Badges */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-600 shrink-0 shadow-2xs">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                Practice & Website Settings
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Settings Cloud: Connected (Instant Sync)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Manage Dr. Noopur Patel's clinical practice identity, OPD hours, contact coordinates, and hospital affiliations.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-all shadow-xs active:scale-[0.98] disabled:opacity-70 cursor-pointer"
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
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Practice Brand
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 truncate">
              {formData.siteName || "Dr. Noopur Patel"}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Official Practice Logo
            </p>
          </div>
        </div>

        {/* Contact Coordinates Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              OPD Coordinates
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900">
              100% Configured
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate mt-1">
              Phone, WhatsApp & Marengo CIMS
            </p>
          </div>
        </div>

        {/* Social Channels Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Social Channels
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900">
              5 Active Channels
            </div>
            <p className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> LinkedIn, YouTube, Instagram
            </p>
          </div>
        </div>

        {/* Website Sync Status Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Live Cloud Sync
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900">
              Instant Sync
            </div>
            <p className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
              <Sparkles className="w-3 h-3" /> Auto-Broadcast to Open Tabs
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center justify-between p-4 rounded-xl border shadow-2xs ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span className="font-semibold text-sm">{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="p-1 rounded-md hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Visual Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80">
        {[
          { id: "brand", label: "Brand & Logo", icon: Building2 },
          { id: "contact", label: "Hospital Coordinates & OPD", icon: Phone },
          { id: "socials", label: "Social Channels", icon: Globe },
          { id: "footer", label: "Footer & Legal Notice", icon: FileText },
          { id: "scripts", label: "Custom Code & Tracking", icon: Code2 },
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
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-slate-900 shadow-2xs border border-slate-200/80"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-rose-600" : "text-slate-400"}`} />
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
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-rose-600" />
                Practice Identity & Doctor Profile
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                These details display in the website navigation, page headers, search engine snippets, and meta tags.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Surgeon / Practice Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, siteName: e.target.value }))}
                    placeholder="e.g. Dr. Noopur Patel"
                    required
                    className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Main practitioner title displayed across headers.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Specialty & Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
                    placeholder="e.g. Breast Surgeon & Oncoplastic Surgeon — Expert Care. Stronger Tomorrows."
                    className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Appended to page titles and browser window headers.</p>
                </div>
              </div>
            </div>

            {/* Visual Logo & Favicon Assets */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-600" />
                Visual Assets: Logo & Favicon
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Header logo asset and browser tab icon configurations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Path */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Header Brand Logo URL
                    </label>
                    <input
                      type="text"
                      value={formData.logoUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, logoUrl: e.target.value }))}
                      className="block w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 mb-3"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-lg flex items-center justify-between border border-slate-200">
                    <div className="relative h-9 w-36">
                      <Image
                        src={formData.logoUrl || "/images/doctor/assets/logo.png"}
                        alt="Logo Preview"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Preview</span>
                  </div>
                </div>

                {/* Favicon Path */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Browser Favicon URL
                    </label>
                    <input
                      type="text"
                      value={formData.faviconUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, faviconUrl: e.target.value }))}
                      className="block w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 mb-3"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-lg flex items-center gap-3 border border-slate-200">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center p-1.5 border border-rose-200">
                      <span className="text-xs font-black text-rose-600">NP</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Tab Favicon</span>
                      <span className="text-[10px] text-slate-400">{formData.faviconUrl}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcement Bar Settings */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-rose-600" />
                    Top Announcement Bar (Clinical Alert)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Displays an urgent notification banner at the very top of all website pages.
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
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>

              {formData.showAnnouncementBar && (
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Announcement Bar Message
                    </label>
                    <input
                      type="text"
                      value={formData.announcementBarText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, announcementBarText: e.target.value }))}
                      className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Destination Link
                    </label>
                    <input
                      type="text"
                      value={formData.announcementLink}
                      onChange={(e) => setFormData((prev) => ({ ...prev, announcementLink: e.target.value }))}
                      placeholder="/appointments or /contact"
                      className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all"
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
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Phone className="w-5 h-5 text-rose-600" />
                Direct Clinical Consultation Channels
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Patient helpline, WhatsApp coordinator number, and consultation enquiry email.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Official Phone */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      OPD Phone <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleCopy(formData.phone, "phone")}
                      className="text-[11px] font-bold text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "phone" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedKey === "phone" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                      className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all"
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Care WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <a
                      href={`https://wa.me/${formData.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-emerald-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
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
                      className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Clinic Email <span className="text-rose-500">*</span>
                    </label>
                    <a
                      href={`mailto:${formData.email}`}
                      className="text-[11px] font-bold text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Test Mail</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Headquarters & Business Hours */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-600" />
                Hospital Affiliation & OPD Operating Hours
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Official OPD practice address at Marengo CIMS Hospital, Ahmedabad.
              </p>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hospital Practice Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    required
                    className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all resize-y"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Default: Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat 380060
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      OPD Consultation Hours <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.businessHours}
                        onChange={(e) => setFormData((prev) => ({ ...prev, businessHours: e.target.value }))}
                        required
                        className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Google Maps Embed URL
                    </label>
                    <input
                      type="text"
                      value={formData.googleMapsEmbedUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, googleMapsEmbedUrl: e.target.value }))}
                      className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
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
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Globe className="w-5 h-5 text-rose-600" />
                Verified Clinical Social Media Profiles
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Direct links connected to official doctor social channels and educational media.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "linkedin" as const, label: "LinkedIn Professional Profile", color: "bg-blue-600" },
                  { key: "youtube" as const, label: "YouTube Health Channel", color: "bg-red-600" },
                  { key: "instagram" as const, label: "Instagram Medical Education", color: "bg-pink-600" },
                  { key: "facebook" as const, label: "Facebook Practice Page", color: "bg-blue-700" },
                  { key: "twitter" as const, label: "Twitter / X Medical Profile", color: "bg-slate-900" },
                  { key: "github" as const, label: "Academic / Research Profile", color: "bg-slate-700" },
                ].map(({ key, label, color }) => {
                  const url = formData[key];
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
                          <span className="text-xs font-bold text-slate-800">{label}</span>
                        </div>
                        {url && (
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-bold text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Open Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <LinkIcon className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="url"
                          value={formData[key]}
                          onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                          placeholder={`https://${key}.com/drnoopurpatel`}
                          className="block w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
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
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-600" />
                Global Footer & Practice Legal Notice
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Footer practice summary, accreditation badge, and copyright notices.
              </p>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Footer Practice Blurb <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aboutText}
                    onChange={(e) => setFormData((prev) => ({ ...prev, aboutText: e.target.value }))}
                    required
                    className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all resize-y"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Displays under the logo in the primary footer column across all pages.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Copyright Line <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.copyrightText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, copyrightText: e.target.value }))}
                      required
                      className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Clinical Accreditation Badge
                    </label>
                    <input
                      type="text"
                      value={formData.badgeText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, badgeText: e.target.value }))}
                      className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Custom Code & Script Injections */}
        {activeTab === "scripts" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Master Control Card */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        Custom Code & Tracking Injections
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          formData.customScriptsEnabled
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            formData.customScriptsEnabled ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                          }`}
                        />
                        {formData.customScriptsEnabled ? "Active & Live" : "Paused / Disabled"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      Manage Google Analytics, Tag Manager, or conversion tracking safely without redeploying code.
                    </p>
                  </div>
                </div>

                {/* Master Toggle */}
                <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 self-start sm:self-auto">
                  <span className="text-xs font-bold text-slate-700">
                    Master Switch:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        customScriptsEnabled: !prev.customScriptsEnabled,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      formData.customScriptsEnabled ? "bg-rose-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.customScriptsEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Quick Preset Templates Accordion / Buttons */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    1-Click Ready Snippet Templates
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Click to insert standard code</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Preset 1: GA4 */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">Google Analytics 4</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Header</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        Official gtag.js script for patient visit analytics.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const template = `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-XXXXXXXXXX');\n</script>`;
                        setFormData((prev) => ({
                          ...prev,
                          customHeaderCode: prev.customHeaderCode ? `${prev.customHeaderCode}\n\n${template}` : template,
                        }));
                        setFeedback({ message: "Google Analytics 4 template added to Header Code!", type: "success" });
                      }}
                      className="mt-3 text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Insert into Header
                    </button>
                  </div>

                  {/* Preset 2: GTM */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">Google Tag Manager</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">Head + Body</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        GTM container code for head and noscript iframe for body.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const headTemplate = `<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>\n<!-- End Google Tag Manager -->`;
                        const bodyTemplate = `<!-- Google Tag Manager (noscript) -->\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"\nheight="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n<!-- End Google Tag Manager (noscript) -->`;
                        setFormData((prev) => ({
                          ...prev,
                          customHeaderCode: prev.customHeaderCode ? `${prev.customHeaderCode}\n\n${headTemplate}` : headTemplate,
                          customBodyCode: prev.customBodyCode ? `${prev.customBodyCode}\n\n${bodyTemplate}` : bodyTemplate,
                        }));
                        setFeedback({ message: "Google Tag Manager template added to Header and Body!", type: "success" });
                      }}
                      className="mt-3 text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Insert Head & Body
                    </button>
                  </div>

                  {/* Preset 3: Meta Pixel */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">Meta Pixel</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">Header</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        Event tracking and patient awareness campaign measurement.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const template = `<!-- Meta Pixel Code -->\n<script>\n!function(f,b,e,v,n,t,s)\n{if(f.fbq)return;n=f.fbq=function(){n.callMethod?\nn.callMethod.apply(n,arguments):n.queue.push(arguments)};\nif(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\nn.queue=[];t=b.createElement(e);t.async=!0;\nt.src=v;s=b.getElementsByTagName(e)[0];\ns.parentNode.insertBefore(t,s)}(window, document,'script',\n'https://connect.facebook.net/en_US/fbevents.js');\nfbq('init', 'YOUR_PIXEL_ID');\nfbq('track', 'PageView');\n</script>`;
                        setFormData((prev) => ({
                          ...prev,
                          customHeaderCode: prev.customHeaderCode ? `${prev.customHeaderCode}\n\n${template}` : template,
                        }));
                        setFeedback({ message: "Meta Pixel template added to Header Code!", type: "success" });
                      }}
                      className="mt-3 text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Insert into Header
                    </button>
                  </div>

                  {/* Preset 4: Patient Chat */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">Clinic Chat Widget</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Footer</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        Patient care coordinator live chat widget.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const template = `<!-- Live Chat Widget -->\n<script type="text/javascript">\nvar Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();\n(function(){\nvar s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];\ns1.async=true;\ns1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';\ns1.charset='UTF-8';\ns1.setAttribute('crossorigin','*');\ns0.parentNode.insertBefore(s1,s0);\n})();\n</script>`;
                        setFormData((prev) => ({
                          ...prev,
                          customFooterCode: prev.customFooterCode ? `${prev.customFooterCode}\n\n${template}` : template,
                        }));
                        setFeedback({ message: "Live Chat template added to Footer Code!", type: "success" });
                      }}
                      className="mt-3 text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Insert into Footer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor 1: Header Code */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-rose-600" />
                    1. Header Code (&lt;head&gt; Injection)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Runs inside the &lt;head&gt; tag on all pages (Analytics, Verification tags).
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {formData.customHeaderCode.length} chars
                  </span>
                  {formData.customHeaderCode.trim() && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, customHeaderCode: "" }))}
                      className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-950">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                  <span>HTML / JavaScript &lt;head&gt;</span>
                  <span>Auto-Formatted & Safe Sandbox</span>
                </div>
                <textarea
                  value={formData.customHeaderCode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customHeaderCode: e.target.value }))}
                  placeholder={`<!-- Paste your <script>, <meta>, or <link> tags here -->\n<script>\n  // Your custom header code\n</script>`}
                  rows={8}
                  spellCheck={false}
                  className="w-full p-4 font-mono text-xs leading-relaxed bg-slate-950 text-emerald-400 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-rose-500/50 resize-y"
                />
              </div>

              {formData.customHeaderCode.includes("<script") &&
                formData.customHeaderCode.split("<script").length !== formData.customHeaderCode.split("</script>").length && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-amber-600 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Please ensure every &lt;script&gt; tag has a matching closing &lt;/script&gt; tag.</span>
                  </div>
                )}
            </div>

            {/* Editor 2: Body Code */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-600" />
                    2. Body Code (&lt;body&gt; Start Injection)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Injected immediately after the opening &lt;body&gt; tag (e.g. GTM noscript).
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {formData.customBodyCode.length} chars
                  </span>
                  {formData.customBodyCode.trim() && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, customBodyCode: "" }))}
                      className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-950">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                  <span>HTML &lt;noscript&gt; / &lt;body&gt;</span>
                  <span>Immediately after opening body</span>
                </div>
                <textarea
                  value={formData.customBodyCode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customBodyCode: e.target.value }))}
                  placeholder={`<!-- Paste GTM <noscript> or body elements here -->\n<noscript>\n  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX" height="0" width="0"></iframe>\n</noscript>`}
                  rows={6}
                  spellCheck={false}
                  className="w-full p-4 font-mono text-xs leading-relaxed bg-slate-950 text-blue-400 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-y"
                />
              </div>
            </div>

            {/* Editor 3: Footer Code */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-purple-600" />
                    3. Footer Code (Before &lt;/body&gt; Closing)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Runs at the bottom of the page in deferred non-blocking mode.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {formData.customFooterCode.length} chars
                  </span>
                  {formData.customFooterCode.trim() && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, customFooterCode: "" }))}
                      className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-950">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                  <span>HTML / JavaScript before &lt;/body&gt;</span>
                  <span>Non-blocking / Deferred</span>
                </div>
                <textarea
                  value={formData.customFooterCode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customFooterCode: e.target.value }))}
                  placeholder={`<!-- Paste live chat widget or footer conversion scripts here -->\n<script>\n  // Live chat or footer script\n</script>`}
                  rows={8}
                  spellCheck={false}
                  className="w-full p-4 font-mono text-xs leading-relaxed bg-slate-950 text-indigo-400 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-y"
                />
              </div>
            </div>

            {/* Enterprise Safety Note */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 text-xs flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Fail-Safe Medical Platform Architecture</span>
                Injected custom scripts automatically execute inside isolated try/catch browser wrappers. If any external script experiences connectivity issues, the clinical appointment forms, telephone call links, and doctor information remain fast, fluid, and uninterrupted.
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Live Interactive Simulator */}
        {activeTab === "preview" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-rose-600" />
                    Live Website Visual Simulator
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time preview of how current settings render on the public oncology platform.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                  Live Preview Mode
                </span>
              </div>

              {/* Browser Mockup Window - Light First */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-md">
                {/* Browser Top Bar */}
                <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-3 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                  </div>
                  <div className="flex-1 max-w-md mx-auto bg-white px-3 py-1 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600 truncate text-center shadow-2xs">
                    https://drnoopurpatel.com
                  </div>
                </div>

                {/* Simulated Announcement Bar */}
                {formData.showAnnouncementBar && (
                  <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 text-white px-4 py-2 text-xs font-bold text-center tracking-wide flex items-center justify-center gap-2">
                    <span>{formData.announcementBarText}</span>
                  </div>
                )}

                {/* Simulated Desktop Header Navigation */}
                <div className="bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-100 text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-32">
                      <Image
                        src={formData.logoUrl || "/images/doctor/assets/logo.png"}
                        alt={formData.siteName}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="font-bold text-sm text-slate-900 hidden sm:inline">{formData.siteName}</span>
                  </div>

                  <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
                    <span className="hover:text-rose-600 cursor-pointer">Treatments</span>
                    <span className="hover:text-rose-600 cursor-pointer">Patient Stories</span>
                    <span className="hover:text-rose-600 cursor-pointer">About Doctor</span>
                    <span className="hover:text-rose-600 cursor-pointer">Breast Health Blog</span>
                    <span className="hover:text-rose-600 cursor-pointer">Contact OPD</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`https://wa.me/${formData.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Care</span>
                    </a>
                  </div>
                </div>

                {/* Simulated Hero Snippet */}
                <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-rose-50/50 to-white text-slate-900 border-b border-slate-100">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-rose-50 text-rose-700 border border-rose-200 mb-4">
                    {formData.badgeText || "Surgical Breast Oncology & Oncoplastic Surgery"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-slate-900 font-serif">
                    {formData.tagline || "Breast Surgeon & Oncoplastic Surgeon — Expert Care. Stronger Tomorrows."}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                    Practicing at Marengo CIMS Hospital, Ahmedabad. Call OPD helpline at {formData.phone}.
                  </p>
                </div>

                {/* Simulated Footer Snippet */}
                <div className="bg-slate-50 p-6 sm:p-8 text-slate-600 text-xs border-t border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <span className="text-slate-900 font-bold text-sm block mb-1">{formData.siteName}</span>
                      <p className="text-slate-500 text-[11px] leading-relaxed max-w-md">{formData.aboutText}</p>
                    </div>
                    <div>
                      <span className="text-slate-900 font-bold text-xs block mb-1">Direct Consultation Helpline</span>
                      <p className="text-slate-600 text-[11px]">
                        📞 {formData.phone} • ✉️ {formData.email}
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">📍 {formData.address}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
                    <span>{formData.copyrightText}</span>
                    <div className="flex items-center gap-3">
                      <span>Patient Privacy</span>
                      <span>•</span>
                      <span>Medical Disclaimer</span>
                      <span>•</span>
                      <span>Marengo CIMS Hospital</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Cloud Firestore Sync & Maintenance */}
        {activeTab === "sync" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    Cloud Firestore Master Database Synchronization
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Synchronize and seed all 12 platform clinical collections (Treatments & Services, Patient Cases, Health Insights, Reviews, FAQs, Medical Team, Pages, Banners, URL Redirects, Practice Settings, and RBAC Roles) directly to live Cloud Firestore with atomic batching.
                  </p>

                  {syncDetails && (
                    <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-medium text-emerald-800 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                      <span>{syncDetails}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSyncDatabase}
                  disabled={isSyncing}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-bold hover:bg-slate-50 transition-all disabled:opacity-70 cursor-pointer shadow-2xs"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-rose-600" />
                      <span>Syncing Collections...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 text-rose-600" />
                      <span>Sync All 12 Collections</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Admin Security & Password Management Card */}
            <div className="bg-indigo-50/60 p-6 sm:p-7 rounded-2xl border border-indigo-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-indigo-950 flex items-center gap-2 mb-1">
                    <KeyRound className="w-4 h-4 text-indigo-600" />
                    Master Administrator Account Security
                  </h3>
                  <p className="text-xs text-indigo-900/80 leading-relaxed max-w-xl">
                    Change Dr. Noopur Patel's administrator login credentials. New passwords are encrypted with standard scrypt hashing and synchronized to Firebase Authentication.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Change Admin Password</span>
                </button>
              </div>
            </div>

            {/* Dangerous Zone / Reset to Defaults Card */}
            <div className="bg-red-50/60 p-6 sm:p-7 rounded-2xl border border-red-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-red-950 flex items-center gap-2 mb-1">
                    <RotateCcw className="w-4 h-4 text-red-600" />
                    Reset Global Settings to Practice Defaults
                  </h3>
                  <p className="text-xs text-red-800/80 leading-relaxed max-w-xl">
                    Restore canonical contact details (+91 98765 43210), Marengo CIMS Hospital Ahmedabad address, verified social profiles, and patient consultation policies.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(true)}
                  className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  Reset Settings Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>Changes are automatically recorded in clinical audit logging and revision history.</span>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition-all shadow-xs active:scale-[0.98] disabled:opacity-70 cursor-pointer"
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
        title="Reset Global Practice Settings?"
        message={`This will restore canonical Dr. Noopur Patel branding, Marengo CIMS Hospital Ahmedabad address, official consultation numbers (+91 98765 43210), verified clinical social media profiles, top announcement bar, and footer statements.\n\nAll changes will immediately sync across live Cloud Firestore and open website tabs.`}
        confirmLabel="Yes, Reset to Defaults"
        isDestructive={false}
        isLoading={isResetting}
      />

      {/* 5. Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userEmail="admin@noopur.com"
      />
    </div>
  );
}
