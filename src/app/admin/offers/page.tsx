"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { OfferItem, OfferType, OfferTargeting, OfferFrequency, OfferStatus } from "@/types";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import { UtmCampaignBuilderModal } from "@/components/admin/marketing/UtmCampaignBuilderModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { 
  Megaphone, 
  Link as LinkIcon, 
  Plus, 
  CheckCircle, 
  X, 
  Image as ImageIcon,
  Calendar,
  Trash2,
  Edit2,
  Sparkles,
  Eye,
  RotateCcw,
  Search,
  ChevronDown,
  ChevronUp,
  Globe,
  Home,
  Briefcase,
  BookOpen,
  ArrowRight,
  Sliders,
  Monitor,
  Smartphone,
  Layers,
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HeartPulse
} from "lucide-react";

/**
 * Single source of truth for announcement and banner status.
 */
export function getOfferStatus(offer: { isActive: boolean; startDate?: string; endDate?: string }): "active" | "scheduled" | "expired" | "disabled" {
  if (!offer.isActive) return "disabled";
  const now = new Date();
  if (offer.startDate) {
    const start = new Date(offer.startDate);
    if (!isNaN(start.getTime()) && start > now) return "scheduled";
  }
  if (offer.endDate) {
    const end = new Date(offer.endDate);
    if (!isNaN(end.getTime()) && end < now) return "expired";
  }
  return "active";
}

const CLINICAL_TEMPLATES = [
  {
    icon: "🌸",
    label: "Screening Camp",
    title: "Pink October: Annual Mammogram & Clinical Breast Screening Drive",
    description: "Special screening awareness slots available at Marengo CIMS Hospital, Ahmedabad. Early detection saves lives.",
    badge: "AWARENESS DRIVE",
    ctaText: "Book Screening Slot",
    ctaLink: "/contact?intent=screening",
    type: "banner" as OfferType,
    targeting: "all" as OfferTargeting,
  },
  {
    icon: "🩺",
    label: "Second Opinion",
    title: "Urgent Breast Biopsy or Second Opinion Consultation",
    description: "Received an abnormal mammogram or ultrasound report? Consult Dr. Noopur Patel for prompt surgical second opinions within 24-48 hours.",
    badge: "PRIORITY CARE",
    ctaText: "Request Second Opinion",
    ctaLink: "/contact?intent=second-opinion",
    type: "floating_bar" as OfferType,
    targeting: "services_only" as OfferTargeting,
  },
  {
    icon: "📖",
    label: "Self-Exam Guide",
    title: "Download Free Guide: Monthly Breast Self-Examination Checklist",
    description: "Learn step-by-step techniques to detect unusual lumps, skin dimpling, or nipple discharge at home.",
    badge: "PATIENT GUIDE",
    ctaText: "Download Guide",
    ctaLink: "/contact?intent=guide",
    type: "popup" as OfferType,
    targeting: "home_only" as OfferTargeting,
  },
  {
    icon: "🔬",
    label: "Oncoplastic Surgery",
    title: "Oncoplastic & Scar-Sparing Breast Surgery Clinic",
    description: "Learn about breast-conserving surgery options combining complete oncologic tumor excision with aesthetic reconstruction.",
    badge: "SURGICAL EXCELLENCE",
    ctaText: "Explore Treatments",
    ctaLink: "/services/oncoplastic-breast-surgery",
    type: "banner" as OfferType,
    targeting: "all" as OfferTargeting,
  },
];

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewOffer, setPreviewOffer] = useState<OfferItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [isUtmModalOpen, setIsUtmModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "scheduled" | "expired" | "disabled">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | OfferType>("all");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [modalPreviewDevice, setModalPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formType, setFormType] = useState<OfferType>("banner");
  const [formBadge, setFormBadge] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formCtaText, setFormCtaText] = useState("Book Consultation");
  const [formCtaLink, setFormCtaLink] = useState("/contact");
  const [formTargeting, setFormTargeting] = useState<OfferTargeting>("all");
  const [formPriority, setFormPriority] = useState(1);
  const [formFrequency, setFormFrequency] = useState<OfferFrequency>("once_per_session");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formUtmCampaign, setFormUtmCampaign] = useState("");
  const [formUtmSource, setFormUtmSource] = useState("");
  const [formUtmMedium, setFormUtmMedium] = useState("");

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/offers");
      const data = await res.json();
      if (data.success) {
        setOffers(data.offers || []);
      }
    } catch (err) {
      console.error("Failed to load offers:", err);
      setMessage({ type: "error", text: "Failed to load announcements from server." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  // Listen for broadcast sync
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("drn-cms-sync");
        channel.onmessage = (e) => {
          if (e.data?.type === "CMS_UPDATED") {
            fetchOffers();
          }
        };
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "drn_cms_updated") {
        fetchOffers();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      channel?.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, [fetchOffers]);

  const openCreateModal = () => {
    setEditingOffer(null);
    setFormTitle("");
    setFormDesc("");
    setFormType("banner");
    setFormBadge("");
    setFormImageUrl("");
    setFormCtaText("Book Consultation");
    setFormCtaLink("/contact");
    setFormTargeting("all");
    setFormPriority(1);
    setFormFrequency("once_per_session");
    setFormStartDate("");
    setFormEndDate("");
    setFormIsActive(true);
    setFormUtmCampaign("");
    setFormUtmSource("");
    setFormUtmMedium("");
    setShowAdvancedSettings(false);
    setModalPreviewDevice("desktop");
    setIsModalOpen(true);
  };

  const openEditModal = (offer: OfferItem) => {
    setEditingOffer(offer);
    setFormTitle(offer.title);
    setFormDesc(offer.description);
    setFormType(offer.type);
    setFormBadge(offer.badgeText || "");
    setFormImageUrl(offer.imageUrl || "");
    setFormCtaText(offer.ctaText);
    setFormCtaLink(offer.ctaLink);
    setFormTargeting(offer.targetPages);
    setFormPriority(offer.priority || 1);
    setFormFrequency(offer.displayFrequency || "once_per_session");
    setFormStartDate(offer.startDate ? offer.startDate.slice(0, 16) : "");
    setFormEndDate(offer.endDate ? offer.endDate.slice(0, 16) : "");
    setFormIsActive(offer.isActive);
    setFormUtmCampaign(offer.utmCampaign || "");
    setFormUtmSource(offer.utmSource || "");
    setFormUtmMedium(offer.utmMedium || "");
    setShowAdvancedSettings(Boolean(offer.startDate || offer.endDate || offer.utmCampaign || offer.imageUrl));
    setModalPreviewDevice("desktop");
    setIsModalOpen(true);
  };

  const applyTemplate = (tpl: typeof CLINICAL_TEMPLATES[0]) => {
    setFormTitle(tpl.title);
    setFormDesc(tpl.description);
    setFormBadge(tpl.badge);
    setFormCtaText(tpl.ctaText);
    setFormCtaLink(tpl.ctaLink);
    setFormType(tpl.type);
    setFormTargeting(tpl.targeting);
    setMessage({ type: "success", text: `Loaded template: ${tpl.label}` });
    setTimeout(() => setMessage(null), 2500);
  };

  const handleToggleStatus = async (offer: OfferItem) => {
    const nextActive = !offer.isActive;
    setActionLoading(offer.id);

    // Optimistic UI update
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === offer.id) {
          const updated = { ...o, isActive: nextActive };
          return {
            ...updated,
            computedStatus: getOfferStatus(updated),
          };
        }
        return o;
      })
    );

    try {
      const res = await fetch(`/api/admin/offers/${offer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle", isActive: nextActive }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({
          type: "success",
          text: nextActive ? "Banner is now LIVE on your website! 🚀" : "Banner is now turned OFF.",
        });
        setTimeout(() => setMessage(null), 3000);
        try {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            new BroadcastChannel("drn-cms-sync").postMessage({ type: "CMS_UPDATED" });
          }
          localStorage.setItem("drn_cms_updated", Date.now().toString());
        } catch {}
      } else {
        // Revert on failure
        setOffers((prev) =>
          prev.map((o) => (o.id === offer.id ? offer : o))
        );
        setMessage({ type: "error", text: data.error || "Failed to toggle status." });
      }
    } catch {
      setOffers((prev) =>
        prev.map((o) => (o.id === offer.id ? offer : o))
      );
      setMessage({ type: "error", text: "Failed to toggle status." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this announcement banner?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOffers((prev) => prev.filter((o) => o.id !== id));
        setMessage({ type: "success", text: "Banner removed successfully." });
        setTimeout(() => setMessage(null), 3000);
        try {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            new BroadcastChannel("drn-cms-sync").postMessage({ type: "CMS_UPDATED" });
          }
          localStorage.setItem("drn_cms_updated", Date.now().toString());
        } catch {}
      } else {
        setMessage({ type: "error", text: data.error || "Failed to delete banner." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to delete banner." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetLoading(true);
    try {
      const res = await fetch("/api/admin/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        setOffers(data.offers || []);
        setIsResetConfirmOpen(false);
        setMessage({
          type: "success",
          text: "Website Banners & Announcements reset to Dr. Noopur Patel's canonical clinical defaults! ✨",
        });
        setTimeout(() => setMessage(null), 3500);
        try {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            new BroadcastChannel("drn-cms-sync").postMessage({ type: "CMS_UPDATED" });
          }
          localStorage.setItem("drn_cms_updated", Date.now().toString());
        } catch {}
      } else {
        setMessage({ type: "error", text: data.error || "Failed to reset defaults." });
      }
    } catch (err) {
      console.error("Reset error:", err);
      setMessage({ type: "error", text: "Failed to reset defaults. Please check server." });
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setMessage({ type: "error", text: "Please enter an announcement title." });
      return;
    }

    const payload: Partial<OfferItem> = {
      title: formTitle.trim(),
      description: formDesc.trim(),
      type: formType,
      badgeText: formBadge.trim() || undefined,
      imageUrl: formImageUrl.trim() || undefined,
      ctaText: formCtaText.trim() || "Book Consultation",
      ctaLink: formCtaLink.trim() || "/contact",
      targetPages: formTargeting,
      priority: Number(formPriority) || 1,
      displayFrequency: formFrequency,
      startDate: formStartDate ? new Date(formStartDate).toISOString() : undefined,
      endDate: formEndDate ? new Date(formEndDate).toISOString() : undefined,
      isActive: formIsActive,
      utmCampaign: formUtmCampaign.trim() || undefined,
      utmSource: formUtmSource.trim() || undefined,
      utmMedium: formUtmMedium.trim() || undefined,
    };

    try {
      const url = editingOffer ? `/api/admin/offers/${editingOffer.id}` : "/api/admin/offers";
      const method = editingOffer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setMessage({
          type: "success",
          text: editingOffer ? "Banner updated successfully! ✨" : "New announcement published to website! 🚀",
        });
        setTimeout(() => setMessage(null), 3000);
        fetchOffers();
        try {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            new BroadcastChannel("drn-cms-sync").postMessage({ type: "CMS_UPDATED" });
          }
          localStorage.setItem("drn_cms_updated", Date.now().toString());
        } catch {}
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save banner." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred while saving." });
    }
  };

  // Precomputed counts using canonical status engine
  const activeCount = useMemo(() => offers.filter((o) => getOfferStatus(o) === "active").length, [offers]);
  const disabledCount = useMemo(() => offers.filter((o) => getOfferStatus(o) === "disabled").length, [offers]);
  const scheduledCount = useMemo(() => offers.filter((o) => getOfferStatus(o) === "scheduled").length, [offers]);
  const expiredCount = useMemo(() => offers.filter((o) => getOfferStatus(o) === "expired").length, [offers]);

  // Filtered offers by search query, status, and type
  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      // 1. Status Filter
      if (statusFilter !== "all" && getOfferStatus(offer) !== statusFilter) {
        return false;
      }
      // 2. Type Filter
      if (typeFilter !== "all" && offer.type !== typeFilter) {
        return false;
      }
      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = offer.title.toLowerCase().includes(q);
        const descMatch = (offer.description || "").toLowerCase().includes(q);
        const badgeMatch = (offer.badgeText || "").toLowerCase().includes(q);
        const ctaMatch = (offer.ctaText || "").toLowerCase().includes(q);
        const linkMatch = (offer.ctaLink || "").toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !badgeMatch && !ctaMatch && !linkMatch) {
          return false;
        }
      }
      return true;
    });
  }, [offers, statusFilter, typeFilter, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* Top Banner & Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                Live Announcement Engine: Active
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Instant Public Sync
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Website Announcements & Notice Banners
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Create, edit, and control screening camp notice bars, second opinion alerts, sticky consult banners, and patient guide popups shown to website visitors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* 1-Click Reset to Defaults Button */}
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold transition-all border border-amber-200 cursor-pointer shadow-sm"
              title="Reset all banners to Dr. Noopur Patel's clinical defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
              <span>Reset to Defaults</span>
            </button>

            {/* UTM Campaign Link Builder */}
            <button
              type="button"
              onClick={() => setIsUtmModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer"
              title="Generate custom tracking links for oncology campaigns"
            >
              <LinkIcon className="w-3.5 h-3.5 text-rose-600" />
              <span>UTM Link Builder</span>
            </button>

            {/* Create New Banner Button */}
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm shadow-rose-200 hover:shadow cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Banner / Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 BENTO KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Banners */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Announcements
            </div>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {offers.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              All configured clinical notices
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Active on Website */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Showing Live on Website
            </div>
            <div className="text-3xl font-black text-emerald-700 mt-1">
              {activeCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Visible right now to patients
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Scheduled Campaigns */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Scheduled Campaigns
            </div>
            <div className="text-3xl font-black text-blue-700 mt-1">
              {scheduledCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Starts automatically on set date
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Turned Off / Paused */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Turned Off / Paused
            </div>
            <div className="text-3xl font-black text-slate-700 mt-1">
              {disabledCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Safely stored in clinic drafts
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0">
            <Megaphone className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* QUICK 1-CLICK PRESETS STRIP */}
      <div className="p-4 bg-rose-50/60 border border-rose-200/80 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
            🌸
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              1-Click Clinical Announcement Templates
            </span>
            <span className="text-[11px] text-slate-600">
              Click any template to quickly launch a screening camp notice or second opinion banner.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {CLINICAL_TEMPLATES.map((tpl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                openCreateModal();
                setTimeout(() => applyTemplate(tpl), 50);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-bold text-slate-800 hover:border-rose-400 hover:bg-rose-50/70 hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{tpl.icon}</span>
              <span>{tpl.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH AND FILTER TOOLBAR */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements, badges, or target pages..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Format:
            </span>
            <button
              type="button"
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "all"
                  ? "bg-rose-600 text-white shadow-sm shadow-rose-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Formats
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("banner")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "banner"
                  ? "bg-rose-600 text-white shadow-sm shadow-rose-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📢 Notice Bars
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("floating_bar")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "floating_bar"
                  ? "bg-rose-600 text-white shadow-sm shadow-rose-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📌 Sticky Bars
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("popup")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "popup"
                  ? "bg-rose-600 text-white shadow-sm shadow-rose-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              💬 Popups
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("modal")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "modal"
                  ? "bg-rose-600 text-white shadow-sm shadow-rose-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              🪟 Modals
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All ({offers.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("active")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              statusFilter === "active"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-emerald-50"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live on Site ({activeCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("disabled")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              statusFilter === "disabled"
                ? "bg-slate-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>Turned Off ({disabledCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("scheduled")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              statusFilter === "scheduled"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-blue-50"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Scheduled ({scheduledCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("expired")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              statusFilter === "expired"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-amber-50"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Expired ({expiredCount})</span>
          </button>
        </div>
      </div>

      {/* OFFERS GRID */}
      {loading ? (
        <div className="p-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="animate-spin w-8 h-8 border-3 border-slate-200 border-t-rose-600 rounded-full mx-auto mb-3" />
          <p className="text-sm font-semibold">Connecting to live announcement engine...</p>
        </div>
      ) : filteredOffers.length === 0 ? (
        <div className="p-16 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center shadow-sm">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-4 text-rose-600">
            <Megaphone className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {searchQuery ? "No matching announcements found" : "No announcements configured yet!"}
          </h3>
          <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
            {searchQuery
              ? `No campaigns match "${searchQuery}". Clear your search or create a new announcement.`
              : "Restore canonical Dr. Noopur Patel announcements in 1 click, or build your own custom notice."}
          </p>
          <div className="flex items-center gap-3">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
              >
                Clear Search Filter
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(true)}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm shadow-rose-200 hover:shadow cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Load Canonical Clinical Announcements</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => {
            const status = getOfferStatus(offer);
            const isLive = status === "active";

            // Human-friendly format label
            let formatLabel = "📢 Top Notice Bar";
            if (offer.type === "floating_bar") formatLabel = "📌 Bottom Sticky Bar";
            if (offer.type === "popup") formatLabel = "💬 Center Popup";
            if (offer.type === "modal") formatLabel = "🪟 Full Modal";

            // Human-friendly targeting label
            let targetLabel = "🌐 All Pages";
            if (offer.targetPages === "home_only") targetLabel = "🏠 Homepage Only";
            if (offer.targetPages === "services_only") targetLabel = "💼 Services Only";
            if (offer.targetPages === "blog_only") targetLabel = "📝 Blog Only";
            if (offer.targetPages === "custom") targetLabel = "⚙️ Custom Paths";

            return (
              <div
                key={offer.id}
                className={`bg-white rounded-3xl border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden ${
                  isLive
                    ? "border-rose-300 ring-1 ring-rose-200"
                    : "border-slate-200"
                }`}
              >
                {/* Card Top / Body */}
                <div className="p-5 space-y-3.5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {status === "active" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live on Site
                        </span>
                      )}
                      {status === "disabled" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          Turned Off
                        </span>
                      )}
                      {status === "scheduled" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Scheduled
                        </span>
                      )}
                      {status === "expired" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Expired
                        </span>
                      )}

                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {formatLabel}
                      </span>
                    </div>

                    <span className="text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                      {targetLabel}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                      {offer.title}
                    </h3>
                    {offer.description && (
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-normal">
                        {offer.description}
                      </p>
                    )}
                  </div>

                  {/* Live Mini Visual Preview Frame (Clinical Light Design) */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="flex items-center gap-1 text-rose-600 font-bold uppercase tracking-wider">
                        <Eye className="w-3 h-3" /> Live Preview
                      </span>
                      <span className="truncate max-w-[140px] text-slate-500 font-mono text-[10px]">
                        {offer.ctaLink}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-slate-200">
                      <div className="min-w-0 flex-1">
                        {offer.badgeText && (
                          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 mb-1">
                            {offer.badgeText}
                          </span>
                        )}
                        <div className="text-xs font-bold truncate text-slate-900 leading-snug">
                          {offer.title}
                        </div>
                      </div>

                      <span className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-600 text-white shadow-sm whitespace-nowrap">
                        {offer.ctaText || "Book"} →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom / Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  {/* Apple iOS-Style Live Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(offer)}
                    disabled={actionLoading === offer.id}
                    className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
                    title={offer.isActive ? "Click to hide from website" : "Click to show live on website"}
                  >
                    <div
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shadow-inner ${
                        offer.isActive ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                          offer.isActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-bold ${
                      offer.isActive ? "text-emerald-700" : "text-slate-500"
                    }`}>
                      {offer.isActive ? "Showing Live" : "Turned Off"}
                    </span>
                  </button>

                  {/* Action Icons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewOffer(offer);
                        setPreviewDevice("desktop");
                        setIsPreviewModalOpen(true);
                      }}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                      title="Preview how patients see this banner"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(offer)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                      title="Edit banner content"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(offer.id)}
                      disabled={actionLoading === offer.id}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200 transition-all cursor-pointer"
                      title="Delete banner"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =================================================================== */}
      {/* SIDE-BY-SIDE LIVE PREVIEW CREATE / EDIT MODAL                      */}
      {/* =================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {editingOffer ? "Edit Website Announcement" : "Create New Clinical Announcement"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Live keystroke sync — watch the preview on the right update in real-time.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Two-Column Layout */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {/* LEFT COLUMN: The Simple Form */}
              <div className="lg:col-span-7 p-6 space-y-5">
                {/* 1-Click Preset Bar */}
                {!editingOffer && (
                  <div className="p-3.5 bg-rose-50/70 border border-rose-200/80 rounded-2xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>1-Click Clinical Presets (Click to autofill):</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {CLINICAL_TEMPLATES.map((tpl, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => applyTemplate(tpl)}
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-rose-200 text-xs font-semibold text-slate-800 hover:border-rose-400 hover:shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>{tpl.icon}</span>
                          <span>{tpl.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Step 1: Title & Subtext */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      1. Announcement Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Pink October: Annual Mammogram & Clinical Breast Screening Drive"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      2. Subtext / Clinical Details
                    </label>
                    <input
                      type="text"
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="e.g. Special screening slots available at Marengo CIMS Hospital, Ahmedabad."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/15 transition-all"
                    />
                  </div>

                  {/* Step 2: Format Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      3. Where does it appear on screen?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormType("banner")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          formType === "banner"
                            ? "bg-rose-50 border-rose-500 text-slate-900 shadow-sm ring-1 ring-rose-500"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-lg">📢</div>
                        <div>
                          <div className="text-xs font-bold">Top Notice</div>
                          <div className="text-[10px] text-slate-500">Page header</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormType("floating_bar")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          formType === "floating_bar"
                            ? "bg-rose-50 border-rose-500 text-slate-900 shadow-sm ring-1 ring-rose-500"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-lg">📌</div>
                        <div>
                          <div className="text-xs font-bold">Sticky Bar</div>
                          <div className="text-[10px] text-slate-500">Bottom edge</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormType("popup")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          formType === "popup"
                            ? "bg-rose-50 border-rose-500 text-slate-900 shadow-sm ring-1 ring-rose-500"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-lg">💬</div>
                        <div>
                          <div className="text-xs font-bold">Popup Card</div>
                          <div className="text-[10px] text-slate-500">Floating box</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormType("modal")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          formType === "modal"
                            ? "bg-rose-50 border-rose-500 text-slate-900 shadow-sm ring-1 ring-rose-500"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-lg">🪟</div>
                        <div>
                          <div className="text-xs font-bold">Full Modal</div>
                          <div className="text-[10px] text-slate-500">Center dialog</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Button Text & Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        4. Button Text
                      </label>
                      <input
                        type="text"
                        value={formCtaText}
                        onChange={(e) => setFormCtaText(e.target.value)}
                        placeholder="e.g. Book Screening Slot"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        5. Where Button Goes
                      </label>
                      <select
                        value={formCtaLink}
                        onChange={(e) => setFormCtaLink(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/15 transition-all cursor-pointer"
                      >
                        <option value="/contact">Consultation Booking (/contact)</option>
                        <option value="/contact?intent=screening">Screening Appointment Desk</option>
                        <option value="/contact?intent=second-opinion">Second Opinion Desk</option>
                        <option value="/services">Treatments Overview (/services)</option>
                        <option value="/services/oncoplastic-breast-surgery">Oncoplastic Breast Surgery</option>
                        <option value="/services/breast-cancer-surgery">Breast Cancer Surgery</option>
                        <option value="/contact?intent=guide">Patient Self-Exam Guide</option>
                        <option value="https://wa.me/919876543210">Marengo CIMS Hospital WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Tag & Page Targeting */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        6. Highlight Badge Tag
                      </label>
                      <input
                        type="text"
                        value={formBadge}
                        onChange={(e) => setFormBadge(e.target.value)}
                        placeholder="e.g. AWARENESS DRIVE or PRIORITY CARE"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        7. Which Website Pages
                      </label>
                      <select
                        value={formTargeting}
                        onChange={(e) => setFormTargeting(e.target.value as OfferTargeting)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-500/15 transition-all cursor-pointer"
                      >
                        <option value="all">🌐 Show on All Website Pages</option>
                        <option value="home_only">🏠 Homepage Only</option>
                        <option value="services_only">💼 Service Pages Only</option>
                        <option value="blog_only">📝 Blog Pages Only</option>
                      </select>
                    </div>
                  </div>

                  {/* Immediate Live Switch */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Show on Website Immediately
                      </div>
                      <div className="text-[11px] text-slate-500">
                        When enabled, patients and visitors will see this banner immediately upon saving.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFormIsActive(!formIsActive)}
                      className="flex items-center gap-2 cursor-pointer focus:outline-none"
                    >
                      <div
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                          formIsActive ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                            formIsActive ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </button>
                  </div>

                  {/* Advanced Settings Accordion */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                      className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-rose-600" />
                        <span>Advanced Settings (Dates, Image & UTM tags)</span>
                      </span>
                      {showAdvancedSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showAdvancedSettings && (
                      <div className="p-4 bg-white space-y-3.5 border-t border-slate-200">
                        {/* Optional Banner Image */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Optional Banner Image URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={formImageUrl}
                              onChange={(e) => setFormImageUrl(e.target.value)}
                              placeholder="Paste image link or choose from clinical media"
                              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                            />
                            <button
                              type="button"
                              onClick={() => setIsMediaPickerOpen(true)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <ImageIcon className="w-3.5 h-3.5" /> Media
                            </button>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Auto-Start Date (Optional)
                            </label>
                            <input
                              type="datetime-local"
                              value={formStartDate}
                              onChange={(e) => setFormStartDate(e.target.value)}
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Auto-Expire Date (Optional)
                            </label>
                            <input
                              type="datetime-local"
                              value={formEndDate}
                              onChange={(e) => setFormEndDate(e.target.value)}
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal"
                            />
                          </div>
                        </div>

                        {/* UTM tags */}
                        <div className="p-3 bg-rose-50/50 border border-rose-200/60 rounded-xl space-y-2">
                          <div className="text-xs font-bold text-rose-900">
                            🎯 Campaign Attribution Tags (UTM)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={formUtmCampaign}
                              onChange={(e) => setFormUtmCampaign(e.target.value)}
                              placeholder="Campaign (e.g. pink_october_drive)"
                              className="px-3 py-1.5 bg-white border border-rose-200 rounded-xl text-xs"
                            />
                            <input
                              type="text"
                              value={formUtmSource}
                              onChange={(e) => setFormUtmSource(e.target.value)}
                              placeholder="Source (e.g. header_banner)"
                              className="px-3 py-1.5 bg-white border border-rose-200 rounded-xl text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* RIGHT COLUMN: Side-by-side Real-time Keystroke Live Preview */}
              <div className="lg:col-span-5 p-6 bg-slate-50/70 flex flex-col justify-between space-y-4">
                <div>
                  {/* Preview Toolbar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-rose-600" />
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Live Preview
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setModalPreviewDevice("desktop")}
                        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          modalPreviewDevice === "desktop"
                            ? "bg-rose-50 text-rose-700 font-bold border border-rose-200"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                        title="Desktop Preview"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalPreviewDevice("mobile")}
                        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          modalPreviewDevice === "mobile"
                            ? "bg-rose-50 text-rose-700 font-bold border border-rose-200"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                        title="Mobile Phone Preview"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Device Frame */}
                  <div className={`mx-auto transition-all ${
                    modalPreviewDevice === "mobile" ? "max-w-[280px]" : "w-full"
                  }`}>
                    <div className="rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-lg overflow-hidden p-4 space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 border-b border-slate-100">
                        <span className="flex items-center gap-1 text-rose-600 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          {formType === "banner" && "Top Notice Bar"}
                          {formType === "floating_bar" && "Bottom Sticky Bar"}
                          {formType === "popup" && "Center Popup Card"}
                          {formType === "modal" && "Takeover Modal"}
                        </span>
                        <span>{formTargeting === "all" ? "Everywhere" : formTargeting}</span>
                      </div>

                      <div className="space-y-2">
                        {formBadge && (
                          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
                            {formBadge}
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {formTitle || "Your Clinical Announcement Headline"}
                        </h4>
                        {formDesc && (
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {formDesc}
                          </p>
                        )}

                        <div className="pt-2 flex items-center justify-between gap-3">
                          <span className="text-[10px] text-slate-400 font-mono truncate">
                            {formCtaLink}
                          </span>
                          <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-600 shadow-sm whitespace-nowrap">
                            {formCtaText || "Book"} →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                  <span className="text-rose-600 font-bold">✓</span>
                  <span>When published, this announcement will sync to your public site immediately.</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm shadow-rose-200 hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{editingOffer ? "Save & Update Banner" : "Publish to Website"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* DEVICE MOCKUP FULL PREVIEW MODAL                                   */}
      {/* =================================================================== */}
      {isPreviewModalOpen && previewOffer && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Toolbar */}
            <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-500 font-mono ml-2">
                  https://drnoopurpatel.com{previewOffer.targetPages === "services_only" ? "/services" : ""}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("desktop")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    previewDevice === "desktop"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 inline mr-1" /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    previewDevice === "mobile"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 inline mr-1" /> Mobile
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 ml-2 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated Website Frame with Banner Overlay */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-100/60 flex items-center justify-center min-h-[350px]">
              <div
                className={`transition-all duration-300 relative rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-md ${
                  previewDevice === "mobile" ? "w-[340px] min-h-[480px]" : "w-full min-h-[340px]"
                }`}
              >
                {/* Mock Website Navbar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-500">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-rose-600" />
                    <span>Dr. Noopur Patel</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] hidden sm:flex font-semibold">
                    <span>Treatments</span>
                    <span>Patient Stories</span>
                    <span>About Doctor</span>
                    <span className="text-rose-600">Contact</span>
                  </div>
                </div>

                {/* Simulated Content */}
                <div className="my-auto py-6 text-center space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] uppercase tracking-wider border border-rose-200">
                    Marengo CIMS Hospital, Ahmedabad
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Advanced Breast Cancer & Oncoplastic Surgery
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Evidence-based surgical excellence, breast conservation techniques & compassionate oncology care.
                  </p>
                </div>

                {/* The Simulated Offer Element */}
                <div className="w-full bg-slate-50 text-slate-900 rounded-2xl border border-rose-200 p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {previewOffer.badgeText && (
                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-rose-600 text-white shrink-0">
                          {previewOffer.badgeText}
                        </span>
                      )}
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {previewOffer.title}
                        </div>
                        {previewOffer.description && (
                          <div className="text-[10px] text-slate-500 truncate">
                            {previewOffer.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 rounded-xl shrink-0 shadow-sm">
                      {previewOffer.ctaText} →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1-CLICK RESET TO DEFAULTS CONFIRMATION DIALOG */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetToDefaults}
        title="Reset Announcements & Banners to Defaults?"
        message={`This will restore canonical clinical announcements for Dr. Noopur Patel's practice:
• Pink October: Annual Mammogram & Clinical Breast Screening Drive (Top Notice Bar)
• Urgent Breast Biopsy or Second Opinion Consultation (Bottom Sticky Bar)
• Download Free Guide: Monthly Breast Self-Examination Checklist (Center Popup)
• Oncoplastic & Scar-Sparing Breast Surgery Clinic (Top Notice Bar)

All records will be synchronized across website routes immediately.`}
        confirmLabel="Yes, Reset to Defaults"
        isLoading={isResetLoading}
        isDestructive={false}
      />

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(item) => {
          setFormImageUrl(item.url);
          setIsMediaPickerOpen(false);
        }}
      />

      {/* UTM Campaign Link Builder Tool */}
      <UtmCampaignBuilderModal
        isOpen={isUtmModalOpen}
        onClose={() => setIsUtmModalOpen(false)}
      />

      {/* Toast Feedback */}
      {message && (
        <div
          className={`fixed bottom-6 right-6 z-[300] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl animate-in slide-in-from-bottom-5 border font-bold text-xs sm:text-sm ${
            message.type === "success"
              ? "bg-slate-900 text-white border-slate-800"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
              message.type === "success" ? "bg-emerald-500 text-white" : "bg-red-100 text-red-600"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </div>
          <span>{message.text}</span>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="ml-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
