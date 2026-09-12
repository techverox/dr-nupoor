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
  AlertCircle
} from "lucide-react";

/**
 * Single, foolproof source of truth for offer status.
 * Tab counts, tab filtering, and card badges will ALWAYS be 100% in sync.
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

const QUICK_TEMPLATES = [
  {
    icon: "⚡",
    label: "Free Growth Audit",
    title: "Claim Your Free Q1 Performance & SEO Growth Audit",
    description: "Unlock your tailored organic revenue roadmap and high-intent conversion diagnosis with our senior director pod.",
    badge: "LIMITED SLOTS",
    ctaText: "Claim Free Audit",
    ctaLink: "/contact",
    type: "banner" as OfferType,
    targeting: "all" as OfferTargeting,
  },
  {
    icon: "🎁",
    label: "20% Retainer Deal",
    title: "Special 20% Off Growth & Meta Ads Strategy Retainer",
    description: "Full-scale growth engineering, high-ROAS creative sprints & Meta Partner media buying with zero onboarding fee.",
    badge: "EXCLUSIVE 20% DEAL",
    ctaText: "Claim 20% Off",
    ctaLink: "/contact",
    type: "floating_bar" as OfferType,
    targeting: "all" as OfferTargeting,
  },
  {
    icon: "📢",
    label: "RestroMitra Launch",
    title: "New: RestroMitra Cloud POS & WhatsApp Billing Live!",
    description: "Experience instant QR dining, contact-free ordering, live kitchen KDS & automated WhatsApp bills for restaurants.",
    badge: "PRODUCT LAUNCH",
    ctaText: "Explore RestroMitra",
    ctaLink: "/contact?product=restromitra",
    type: "banner" as OfferType,
    targeting: "home_only" as OfferTargeting,
  },
  {
    icon: "🧲",
    label: "Performance Blueprint",
    title: "Performance Marketing Blueprint: 14-Day Risk-Free Pilot",
    description: "Scale paid acquisition with data-driven creative hooks, full conversion tracking setup, and audited CAC benchmarks.",
    badge: "14-DAY SPRINT",
    ctaText: "View Blueprint",
    ctaLink: "/landing/performance-marketing-blueprint",
    type: "popup" as OfferType,
    targeting: "services_only" as OfferTargeting,
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
  const [formCtaText, setFormCtaText] = useState("Claim Offer");
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
      setMessage({ type: "error", text: "Failed to load offers from server." });
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
        channel = new BroadcastChannel("digivigee-cms-sync");
        channel.onmessage = (e) => {
          if (e.data?.type === "CMS_UPDATED") {
            fetchOffers();
          }
        };
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "digivigee_cms_updated") {
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
    setFormCtaText("Claim Offer");
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

  const applyTemplate = (tpl: typeof QUICK_TEMPLATES[0]) => {
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
            new BroadcastChannel("digivigee-cms-sync").postMessage({ type: "CMS_UPDATED" });
          }
          localStorage.setItem("digivigee_cms_updated", Date.now().toString());
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
    if (!window.confirm("Are you sure you want to delete this promotional banner?")) return;
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
            new BroadcastChannel("digivigee-cms-sync").postMessage({ type: "CMS_UPDATED" });
          }
          localStorage.setItem("digivigee_cms_updated", Date.now().toString());
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
          text: "Website Banners & Popups reset to 6 canonical DigiVigee defaults! ✨",
        });
        setTimeout(() => setMessage(null), 3500);
        try {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            new BroadcastChannel("digivigee-cms-sync").postMessage({ type: "CMS_UPDATED" });
          }
          localStorage.setItem("digivigee_cms_updated", Date.now().toString());
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
      setMessage({ type: "error", text: "Please enter a banner title." });
      return;
    }

    const payload: Partial<OfferItem> = {
      title: formTitle.trim(),
      description: formDesc.trim(),
      type: formType,
      badgeText: formBadge.trim() || undefined,
      imageUrl: formImageUrl.trim() || undefined,
      ctaText: formCtaText.trim() || "Claim Offer",
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
          text: editingOffer ? "Banner updated successfully! ✨" : "New banner published to website! 🚀",
        });
        setTimeout(() => setMessage(null), 3000);
        fetchOffers();
        try {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            new BroadcastChannel("digivigee-cms-sync").postMessage({ type: "CMS_UPDATED" });
          }
          localStorage.setItem("digivigee_cms_updated", Date.now().toString());
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
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-[#008744] dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Banner Engine: Active
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Turant Update & 100% Real Sync
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C1628] dark:text-zinc-100 tracking-tight">
              Website Banners & Popups
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Create, edit, and control notice bars, discount banners, sticky bottom alerts, and lead capture popups shown to your website visitors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* 1-Click Reset to Defaults Button */}
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-zinc-700 cursor-pointer shadow-xs"
              title="Reset all banners to canonical DigiVigee defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#008744]" />
              <span>Reset to Defaults</span>
            </button>

            {/* UTM Campaign Link Builder */}
            <button
              type="button"
              onClick={() => setIsUtmModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 dark:bg-zinc-800/80 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-300 transition-colors shadow-xs cursor-pointer"
              title="Generate custom tracking links for marketing campaigns"
            >
              <LinkIcon className="w-3.5 h-3.5 text-purple-600" />
              <span>UTM Link Builder</span>
            </button>

            {/* Create New Banner Button */}
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#008744] hover:bg-[#007038] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Banner / Popup</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 BENTO KPI CARDS (Big, Clean, Easy for a 10-year-old child) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Banners */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Total Banners & Popups
            </div>
            <div className="text-3xl font-black text-[#0C1628] dark:text-zinc-100 mt-1">
              {offers.length}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
              All configured marketing campaigns
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Active on Website */}
        <div className="bg-white dark:bg-zinc-900 border border-emerald-300/60 dark:border-emerald-800/60 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Showing Live on Website
            </div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {activeCount}
            </div>
            <div className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-1">
              Visible right now to visitors
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[#008744] dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Scheduled Campaigns */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Scheduled Campaigns
            </div>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {scheduledCount}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
              Starts automatically on set date
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Turned Off / Paused */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              Turned Off / Paused
            </div>
            <div className="text-3xl font-black text-slate-600 dark:text-zinc-300 mt-1">
              {disabledCount}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
              Safely stored in drafts
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400 flex items-center justify-center shrink-0">
            <Megaphone className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* QUICK 1-CLICK PRESETS STRIP */}
      <div className="p-4 bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-slate-50/70 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-zinc-900/60 border border-emerald-200/80 dark:border-emerald-800/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#008744] text-white flex items-center justify-center text-xs font-bold shrink-0">
            ⚡
          </div>
          <div>
            <span className="text-xs font-bold text-[#0C1628] dark:text-zinc-100 block">
              1-Click Ready Marketing Templates
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              Click any button to immediately launch a high-converting announcement.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {QUICK_TEMPLATES.map((tpl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                openCreateModal();
                setTimeout(() => applyTemplate(tpl), 50);
              }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800/80 text-xs font-bold text-slate-800 dark:text-zinc-200 hover:border-[#008744] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{tpl.icon}</span>
              <span>{tpl.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH AND FILTER TOOLBAR */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search banners, offers, badges, or target pages..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
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
            <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mr-1 hidden sm:inline">
              Format:
            </span>
            <button
              type="button"
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-950"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              All Formats
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("banner")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "banner"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-950"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              📢 Notice Bars
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("floating_bar")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "floating_bar"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-950"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              📌 Sticky Bars
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("popup")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "popup"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-950"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              💬 Popups
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("modal")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === "modal"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-950"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              🪟 Modals
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-[#008744] text-white shadow-xs"
                : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            All ({offers.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("active")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              statusFilter === "active"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 dark:text-zinc-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
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
                ? "bg-slate-700 text-white shadow-xs"
                : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
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
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
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
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 dark:text-zinc-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Expired ({expiredCount})</span>
          </button>
        </div>
      </div>

      {/* OFFERS GRID */}
      {loading ? (
        <div className="p-16 text-center text-slate-500 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs">
          <div className="animate-spin w-8 h-8 border-3 border-slate-200 border-t-emerald-600 rounded-full mx-auto mb-3" />
          <p className="text-sm font-semibold">Connecting to live banner engine...</p>
        </div>
      ) : filteredOffers.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-zinc-900 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center shadow-xs">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center mb-4 text-[#008744]">
            <Megaphone className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#0C1628] dark:text-zinc-100 mb-1">
            {searchQuery ? "No matching banners found" : "No banners configured yet!"}
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-md mb-6 leading-relaxed">
            {searchQuery
              ? `No campaigns match "${searchQuery}". Clear your search or create a new banner.`
              : "Restore canonical DigiVigee banners in 1 click, or build your own custom notice."}
          </p>
          <div className="flex items-center gap-3">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-4 py-2.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
              >
                Clear Search Filter
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(true)}
                className="px-5 py-2.5 bg-[#008744] hover:bg-[#007038] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Load 6 Canonical Banners</span>
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
                className={`bg-white dark:bg-zinc-900 rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
                  isLive
                    ? "border-emerald-500/40 hover:border-emerald-500/70"
                    : "border-slate-200 dark:border-zinc-800 opacity-95"
                }`}
              >
                {/* Card Top / Body */}
                <div className="p-5 space-y-3.5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {status === "active" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live on Site
                        </span>
                      )}
                      {status === "disabled" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          Turned Off
                        </span>
                      )}
                      {status === "scheduled" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Scheduled
                        </span>
                      )}
                      {status === "expired" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Expired
                        </span>
                      )}

                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                        {formatLabel}
                      </span>
                    </div>

                    <span className="text-[11px] font-medium text-slate-500 bg-slate-50 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-zinc-700 shrink-0">
                      {targetLabel}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0C1628] dark:text-zinc-100 leading-snug line-clamp-2">
                      {offer.title}
                    </h3>
                    {offer.description && (
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-normal">
                        {offer.description}
                      </p>
                    )}
                  </div>

                  {/* Live Mini Visual Preview Frame */}
                  <div className="p-3.5 rounded-xl bg-slate-950 text-white border border-slate-800 shadow-inner space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-wider">
                        <Eye className="w-3 h-3" /> Live Preview
                      </span>
                      <span className="truncate max-w-[140px] text-slate-500 font-mono">
                        {offer.ctaLink}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2.5 pt-1.5 border-t border-slate-800/80">
                      <div className="min-w-0 flex-1">
                        {offer.badgeText && (
                          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 mb-1">
                            {offer.badgeText}
                          </span>
                        )}
                        <div className="text-xs font-bold truncate text-white leading-snug">
                          {offer.title}
                        </div>
                      </div>

                      <span className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 shadow-xs whitespace-nowrap">
                        {offer.ctaText || "Claim"} →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom / Actions */}
                <div className="p-4 bg-slate-50/80 dark:bg-zinc-800/40 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-3">
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
                        offer.isActive ? "bg-emerald-500" : "bg-slate-300 dark:bg-zinc-700"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                          offer.isActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-bold ${
                      offer.isActive ? "text-[#008744] dark:text-emerald-400" : "text-slate-500 dark:text-zinc-400"
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
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white dark:hover:bg-zinc-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-zinc-700 transition-all cursor-pointer"
                      title="Preview how visitors see this banner"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(offer)}
                      className="p-2 text-slate-500 hover:text-[#008744] hover:bg-white dark:hover:bg-zinc-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-zinc-700 transition-all cursor-pointer"
                      title="Edit banner content"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(offer.id)}
                      disabled={actionLoading === offer.id}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg border border-transparent hover:border-red-200 transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center bg-slate-50/80 dark:bg-zinc-800/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#008744] dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0C1628] dark:text-zinc-100">
                    {editingOffer ? "Edit Website Promotion" : "Create New Website Promotion"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Live keystroke sync — watch the preview on the right update in real-time.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Two-Column Layout */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-zinc-800">
              {/* LEFT COLUMN: The Simple Form */}
              <div className="lg:col-span-7 p-6 space-y-5">
                {/* 1-Click Preset Bar */}
                {!editingOffer && (
                  <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#008744] dark:text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>1-Click Quick Presets (Click to autofill):</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_TEMPLATES.map((tpl, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => applyTemplate(tpl)}
                          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-slate-800 dark:text-zinc-200 hover:border-[#008744] hover:shadow-xs transition-all flex items-center gap-1 cursor-pointer"
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
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      1. Promotion Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Claim Your Free Q1 Growth & SEO Audit"
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-normal text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      2. Subtext / Short Details
                    </label>
                    <input
                      type="text"
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="e.g. Unlock your tailored organic revenue roadmap today."
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-normal text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                    />
                  </div>

                  {/* Step 2: Format Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      3. Where does it appear on screen?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormType("banner")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          formType === "banner"
                            ? "bg-emerald-50/70 dark:bg-emerald-950/50 border-[#008744] text-[#0C1628] dark:text-zinc-100 shadow-xs ring-1 ring-emerald-500"
                            : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-lg">📢</div>
                        <div>
                          <div className="text-xs font-bold">Top Notice</div>
                          <div className="text-[10px] text-slate-500 dark:text-zinc-400">Page header</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormType("floating_bar")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          formType === "floating_bar"
                            ? "bg-emerald-50/70 dark:bg-emerald-950/50 border-[#008744] text-[#0C1628] dark:text-zinc-100 shadow-xs ring-1 ring-emerald-500"
                            : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-lg">📌</div>
                        <div>
                          <div className="text-xs font-bold">Sticky Bar</div>
                          <div className="text-[10px] text-slate-500 dark:text-zinc-400">Bottom edge</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormType("popup")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          formType === "popup"
                            ? "bg-emerald-50/70 dark:bg-emerald-950/50 border-[#008744] text-[#0C1628] dark:text-zinc-100 shadow-xs ring-1 ring-emerald-500"
                            : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-lg">💬</div>
                        <div>
                          <div className="text-xs font-bold">Popup Card</div>
                          <div className="text-[10px] text-slate-500 dark:text-zinc-400">Floating box</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormType("modal")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          formType === "modal"
                            ? "bg-emerald-50/70 dark:bg-emerald-950/50 border-[#008744] text-[#0C1628] dark:text-zinc-100 shadow-xs ring-1 ring-emerald-500"
                            : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-lg">🪟</div>
                        <div>
                          <div className="text-xs font-bold">Full Modal</div>
                          <div className="text-[10px] text-slate-500 dark:text-zinc-400">Center dialog</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Button Text & Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        4. Button Text
                      </label>
                      <input
                        type="text"
                        value={formCtaText}
                        onChange={(e) => setFormCtaText(e.target.value)}
                        placeholder="e.g. Claim Free Audit"
                        className="w-full px-3.5 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-normal text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        5. Where Button Goes
                      </label>
                      <select
                        value={formCtaLink}
                        onChange={(e) => setFormCtaLink(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-normal text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                      >
                        <option value="/contact">Contact & Strategy Desk (/contact)</option>
                        <option value="/services">Services Overview (/services)</option>
                        <option value="/services/meta-partner">Meta Partner Ads (/services/meta-partner)</option>
                        <option value="/contact?product=restromitra">RestroMitra Inquiry</option>
                        <option value="/landing/performance-marketing-blueprint">Marketing Blueprint Pilot</option>
                        <option value="/forms/vip-partner">VIP Partner Form</option>
                        <option value="https://wa.me/919081145178">WhatsApp Direct (+91 90811 45178)</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Tag & Page Targeting */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        6. Highlight Badge Tag
                      </label>
                      <input
                        type="text"
                        value={formBadge}
                        onChange={(e) => setFormBadge(e.target.value)}
                        placeholder="e.g. LIMITED SLOTS or 20% OFF"
                        className="w-full px-3.5 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-normal text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                        7. Which Website Pages
                      </label>
                      <select
                        value={formTargeting}
                        onChange={(e) => setFormTargeting(e.target.value as OfferTargeting)}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-normal text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                      >
                        <option value="all">🌐 Show on All Website Pages</option>
                        <option value="home_only">🏠 Homepage Only</option>
                        <option value="services_only">💼 Service Pages Only</option>
                        <option value="blog_only">📝 Blog Pages Only</option>
                      </select>
                    </div>
                  </div>

                  {/* Immediate Live Switch */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-[#0C1628] dark:text-zinc-100">
                        Show on Website Immediately
                      </div>
                      <div className="text-[11px] text-slate-500">
                        When enabled, visitors will see this banner immediately upon saving.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFormIsActive(!formIsActive)}
                      className="flex items-center gap-2 cursor-pointer focus:outline-none"
                    >
                      <div
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                          formIsActive ? "bg-emerald-500" : "bg-slate-300 dark:bg-zinc-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                            formIsActive ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </button>
                  </div>

                  {/* Advanced Settings Accordion */}
                  <div className="border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-800/50 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-purple-600" />
                        <span>Advanced Settings (Dates, Image & UTM tags)</span>
                      </span>
                      {showAdvancedSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showAdvancedSettings && (
                      <div className="p-4 bg-white dark:bg-zinc-900 space-y-3.5 border-t border-slate-200 dark:border-zinc-800">
                        {/* Optional Banner Image */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                            Optional Banner Image URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={formImageUrl}
                              onChange={(e) => setFormImageUrl(e.target.value)}
                              placeholder="Paste image link or choose from media"
                              className="flex-1 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs font-normal"
                            />
                            <button
                              type="button"
                              onClick={() => setIsMediaPickerOpen(true)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <ImageIcon className="w-3.5 h-3.5" /> Media
                            </button>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                              Auto-Start Date (Optional)
                            </label>
                            <input
                              type="datetime-local"
                              value={formStartDate}
                              onChange={(e) => setFormStartDate(e.target.value)}
                              className="w-full px-3 py-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs font-normal"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                              Auto-Expire Date (Optional)
                            </label>
                            <input
                              type="datetime-local"
                              value={formEndDate}
                              onChange={(e) => setFormEndDate(e.target.value)}
                              className="w-full px-3 py-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs font-normal"
                            />
                          </div>
                        </div>

                        {/* UTM tags */}
                        <div className="p-3 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/40 rounded-xl space-y-2">
                          <div className="text-xs font-bold text-purple-900 dark:text-purple-300">
                            🎯 Marketing Campaign Tags (UTM)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={formUtmCampaign}
                              onChange={(e) => setFormUtmCampaign(e.target.value)}
                              placeholder="Campaign (e.g. q1_growth)"
                              className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-purple-200 dark:border-zinc-700 rounded-lg text-xs"
                            />
                            <input
                              type="text"
                              value={formUtmSource}
                              onChange={(e) => setFormUtmSource(e.target.value)}
                              placeholder="Source (e.g. banner)"
                              className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-purple-200 dark:border-zinc-700 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* RIGHT COLUMN: Side-by-side Real-time Keystroke Live Preview */}
              <div className="lg:col-span-5 p-6 bg-slate-50/70 dark:bg-zinc-950/50 flex flex-col justify-between space-y-4">
                <div>
                  {/* Preview Toolbar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-[#0C1628] dark:text-zinc-100 uppercase tracking-wider">
                        Live Keystroke Preview
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-slate-200 dark:border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setModalPreviewDevice("desktop")}
                        className={`p-1.5 rounded-md text-xs transition-colors ${
                          modalPreviewDevice === "desktop"
                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-[#008744] dark:text-emerald-400 font-bold"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                        title="Desktop Preview"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalPreviewDevice("mobile")}
                        className={`p-1.5 rounded-md text-xs transition-colors ${
                          modalPreviewDevice === "mobile"
                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-[#008744] dark:text-emerald-400 font-bold"
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
                    <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white shadow-xl overflow-hidden p-4 space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pb-2 border-b border-slate-800">
                        <span className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {formType === "banner" && "Top Notice Bar"}
                          {formType === "floating_bar" && "Bottom Sticky Bar"}
                          {formType === "popup" && "Center Popup Card"}
                          {formType === "modal" && "Takeover Modal"}
                        </span>
                        <span>{formTargeting === "all" ? "Everywhere" : formTargeting}</span>
                      </div>

                      <div className="space-y-2">
                        {formBadge && (
                          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950">
                            {formBadge}
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-white leading-snug">
                          {formTitle || "Your High-Converting Headline Here"}
                        </h4>
                        {formDesc && (
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {formDesc}
                          </p>
                        )}

                        <div className="pt-2 flex items-center justify-between gap-3">
                          <span className="text-[10px] text-slate-500 font-mono truncate">
                            {formCtaLink}
                          </span>
                          <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 shadow-md whitespace-nowrap">
                            {formCtaText || "Claim"} →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>When published, this banner will sync to your website in real-time.</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-800/40 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
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
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Toolbar */}
            <div className="px-6 py-3.5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-slate-400 font-mono ml-2">
                  https://digivigee.com{previewOffer.targetPages === "services_only" ? "/services" : ""}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("desktop")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    previewDevice === "desktop"
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 inline mr-1" /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    previewDevice === "mobile"
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 inline mr-1" /> Mobile
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated Website Frame with Banner Overlay */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-950 flex items-center justify-center min-h-[350px]">
              <div
                className={`transition-all duration-300 relative rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between ${
                  previewDevice === "mobile" ? "w-[340px] min-h-[480px]" : "w-full min-h-[340px]"
                }`}
              >
                {/* Mock Website Navbar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
                  <div className="font-bold text-white text-sm">DigiVigee</div>
                  <div className="flex items-center gap-4 text-[11px] hidden sm:flex">
                    <span>Services</span>
                    <span>Case Studies</span>
                    <span>About</span>
                    <span className="text-emerald-400">Contact</span>
                  </div>
                </div>

                {/* Simulated Content */}
                <div className="my-auto py-6 text-center space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    India's Premier Digital Growth Engineering Pod
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Full-funnel digital architecture, paid media acceleration & enterprise conversions.
                  </p>
                </div>

                {/* The Simulated Offer Element */}
                <div className="w-full bg-slate-950/95 text-white backdrop-blur-md rounded-2xl border border-emerald-500/40 p-4 shadow-2xl space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {previewOffer.badgeText && (
                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full bg-emerald-500 text-slate-950 shrink-0">
                          {previewOffer.badgeText}
                        </span>
                      )}
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">
                          {previewOffer.title}
                        </div>
                        {previewOffer.description && (
                          <div className="text-[10px] text-slate-400 truncate">
                            {previewOffer.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-lg shrink-0">
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
        title="Reset Website Banners & Popups to Defaults?"
        message={`This will restore all 6 canonical DigiVigee banners and popups:
• Free Q1 Performance & SEO Audit (Top Notice Bar)
• Special 20% Off Strategy Retainer (Bottom Sticky Bar)
• RestroMitra Cloud POS Launch (Notice Bar)
• Performance Marketing Blueprint Pilot (Center Popup)
• High-ROAS Meta Ads Creative Audit (Sticky Bar)
• VIP Agency Partner White-Label Program (Modal)

Old custom banners will be replaced and synced immediately.`}
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
          className={`fixed bottom-6 right-6 z-[300] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 border ${
            message.type === "success"
              ? "bg-[#0C1628] text-white border-emerald-500/50"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              message.type === "success" ? "bg-emerald-500 text-white" : "bg-red-100 text-red-600"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </div>
          <span className="text-xs sm:text-sm font-bold">{message.text}</span>
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
