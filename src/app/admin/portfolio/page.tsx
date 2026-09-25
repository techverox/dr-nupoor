"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortfolioItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { AdminRevisionDrawer } from "@/components/admin/AdminRevisionDrawer";
import { notifyLiveSync } from "@/lib/sync/clientSync";
import {
  Award,
  Search,
  Plus,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Trash2,
  Edit2,
  X,
  RotateCcw,
  ExternalLink,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Layers,
  HeartPulse,
  Activity,
  History,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const CLINICAL_CATEGORY_TABS = [
  { id: "all", label: "All Journeys" },
  { id: "oncoplastic", label: "Oncoplastic Surgery" },
  { id: "benign", label: "Benign Breast Care" },
  { id: "reconstruction", label: "Breast Reconstruction" },
];

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    clientName: "",
    industry: "Surgical Oncology",
    category: "Oncoplastic Surgery",
    categoryKey: "oncoplastic",
    shortDescription: "",
    heroImage: "/images/doctor/assets/service-2.png",
    challenge: "",
    strategy: "",
    results: "",
    testimonialQuote: "",
    metric1Label: "Cancer Clearance",
    metric1Value: "100%",
    metric2Label: "Recovery Time",
    metric2Value: "10 Days",
    order: 1,
    isFeatured: true,
    isPublished: true,
  });

  // Revisions Drawer State
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);
  const [revisionTarget, setRevisionTarget] = useState<{ id: string; title: string } | null>(null);

  // Reset to Defaults Confirmation Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.success && data.items) {
        setItems(data.items);
      }
    } catch (e) {
      console.error("[AdminPortfolio] Fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  // Keyboard shortcut: Ctrl+S to save modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && isModalOpen) {
        e.preventDefault();
        const form = document.getElementById("portfolio-form") as HTMLFormElement | null;
        if (form) form.requestSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      slug: "",
      clientName: "",
      industry: "Surgical Oncology",
      category: "Oncoplastic Surgery",
      categoryKey: "oncoplastic",
      shortDescription: "",
      heroImage: "/images/doctor/assets/service-2.png",
      challenge: "",
      strategy: "",
      results: "",
      testimonialQuote: "",
      metric1Label: "Cancer Clearance",
      metric1Value: "100%",
      metric2Label: "Recovery Time",
      metric2Value: "10 Days",
      order: items.length + 1,
      isFeatured: true,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    const m1 = item.metrics?.[0] || { label: "Cancer Clearance", value: "100%" };
    const m2 = item.metrics?.[1] || { label: "Recovery Time", value: "10 Days" };

    setFormData({
      title: item.title,
      slug: item.slug,
      clientName: item.clientName || "",
      industry: item.industry || "Surgical Oncology",
      category: item.category || "Oncoplastic Surgery",
      categoryKey: item.categoryKey || "oncoplastic",
      shortDescription: item.shortDescription || "",
      heroImage: item.heroImage || "/images/doctor/assets/service-2.png",
      challenge: item.challenge || "",
      strategy: item.strategy || "",
      results: item.results || "",
      testimonialQuote: item.testimonialQuote || "",
      metric1Label: m1.label,
      metric1Value: m1.value,
      metric2Label: m2.label,
      metric2Value: m2.value,
      order: item.order || 1,
      isFeatured: item.isFeatured !== false,
      isPublished: item.isPublished !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) return;

    setIsSaving(true);
    try {
      const metrics = [
        { label: formData.metric1Label.trim(), value: formData.metric1Value.trim() },
        { label: formData.metric2Label.trim(), value: formData.metric2Value.trim() },
      ].filter((m) => m.label && m.value);

      const payload = {
        id: editingItem ? editingItem.id : undefined,
        title: formData.title.trim(),
        slug: formData.slug.trim().toLowerCase(),
        clientName: formData.clientName.trim(),
        industry: formData.industry.trim(),
        category: formData.category.trim(),
        categoryKey: formData.categoryKey.trim(),
        shortDescription: formData.shortDescription.trim(),
        heroImage: formData.heroImage,
        challenge: formData.challenge.trim(),
        strategy: formData.strategy.trim(),
        results: formData.results.trim(),
        testimonialQuote: formData.testimonialQuote.trim(),
        metrics,
        order: Number(formData.order) || 1,
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished,
        authorName: "Dr. Noopur Patel",
        authorRole: "Breast Cancer Surgeon",
        authorAvatar: "/images/doctor/assets/hero-doctor.png",
        seo: {
          title: `${formData.title.trim()} | Dr. Noopur Patel Clinic`,
          description: formData.shortDescription.trim(),
        },
      };

      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("portfolio", data.id || payload.id);
        setFeedback({
          message: `Patient journey "${formData.title}" saved successfully & live on website!`,
          type: "success",
        });
        setIsModalOpen(false);
        await fetchPortfolio();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to save patient journey.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminPortfolio] Save error:", e);
      setFeedback({ message: "An unexpected error occurred.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (item: PortfolioItem) => {
    try {
      const newStatus = !item.isPublished;
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          title: item.title,
          slug: item.slug,
          isPublished: newStatus,
        }),
      });

      if (res.ok) {
        notifyLiveSync("portfolio", item.id);
        setItems((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, isPublished: newStatus } : p))
        );
        setFeedback({
          message: `Journey "${item.title}" is now ${newStatus ? "Published (Live)" : "Draft (Hidden)"}.`,
          type: "success",
        });
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error("[AdminPortfolio] Toggle error:", e);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        notifyLiveSync("portfolio", "all");
        setFeedback({
          message: `All ${data.count || 3} clinical case stories reset to canonical website defaults!`,
          type: "success",
        });
        setIsResetConfirmOpen(false);
        await fetchPortfolio();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Reset failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminPortfolio] Reset error:", e);
      setFeedback({ message: "Failed to reset case studies.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/portfolio?id=${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("portfolio", deleteTarget.id);
        setFeedback({ message: `Patient journey "${deleteTarget.title}" deleted successfully.`, type: "success" });
        setDeleteTarget(null);
        await fetchPortfolio();
        setTimeout(() => setFeedback(null), 3000);
      } else {
        setFeedback({ message: data.error || "Delete failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminPortfolio] Delete error:", e);
      setFeedback({ message: "Failed to delete case study.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered case studies
  const filteredItems = useMemo(() => {
    return items.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.industry || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.shortDescription || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (categoryFilter === "all") return true;
      return p.categoryKey === categoryFilter;
    });
  }, [items, searchQuery, categoryFilter]);

  const publishedCount = useMemo(() => items.filter((p) => p.isPublished !== false).length, [items]);
  const draftCount = useMemo(() => items.filter((p) => p.isPublished === false).length, [items]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-16 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-200/80 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                Patient Stories &amp; Clinical Cases CMS
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                100% Real-Time Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage verified patient care journeys, oncologic milestones, and recovery outcomes. Changes immediately reflect live on /portfolio and the homepage.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
          <Link
            href="/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <span>View Live Stories</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-all shadow-2xs cursor-pointer"
            title="Restore canonical website copy"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRevisionTarget({ id: "all", title: "All Patient Stories" });
              setIsRevisionOpen(true);
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span>Revisions</span>
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Patient Story</span>
          </button>
        </div>
      </div>

      {/* Real-Time Notification Banner */}
      {feedback && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center justify-between p-4 rounded-xl border ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
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

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Case Stories</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{items.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Published &amp; Live</div>
            <div className="text-2xl font-black text-emerald-700 mt-0.5">{publishedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Hidden / Draft</div>
            <div className="text-2xl font-black text-amber-700 mt-0.5">{draftCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Case Studies Table Card */}
      <Card padding="none" className="bg-white border-slate-200/90 shadow-xs rounded-2xl overflow-hidden flex flex-col">
        {/* Search & Category Tabs */}
        <div className="p-4 sm:p-5 border-b border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50/60">
          <div className="relative w-full sm:max-w-md">
            <Search className="h-4 w-4 text-slate-400 absolute inset-y-0 my-auto left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by patient moniker, clinical title, or procedure..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 overflow-x-auto scrollbar-none">
            {CLINICAL_CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === tab.id
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="animate-spin w-8 h-8 border-2 border-slate-200 border-t-emerald-600 rounded-full mb-3" />
            <p className="text-xs font-bold">Loading patient care journeys...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-3 text-slate-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No patient stories found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {searchQuery ? "Try adjusting your search query or category filters." : "Create your first clinical case or reset to canonical defaults."}
            </p>
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Canonical Defaults
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[840px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/90 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3.5 w-16 text-center">Order</th>
                  <th className="px-5 py-3.5">Patient &amp; Case Study</th>
                  <th className="px-5 py-3.5">Clinical Speciality</th>
                  <th className="px-5 py-3.5">Verified Outcome</th>
                  <th className="px-5 py-3.5">Website Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredItems.map((item, idx) => {
                  const m1 = item.metrics?.[0];
                  return (
                    <tr
                      key={item.id || item.slug || idx}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-slate-100 font-mono font-bold text-[11px] text-slate-700 border border-slate-200">
                          #{String(item.order || idx + 1).padStart(2, "0")}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center shrink-0">
                            <HeartPulse className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-emerald-700">
                              {item.clientName || "Verified Patient"}
                            </div>
                            <div className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                              {item.title}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                              <LinkIcon className="w-3 h-3 text-slate-400" />
                              <span>/portfolio/{item.slug}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800 text-xs mb-1">
                          {item.industry || "Surgical Oncology"}
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {item.category || "Clinical Case"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {m1 ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{m1.value}</span>
                            <span className="text-[10px] text-emerald-700/80 font-medium">({m1.label})</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">No metrics set</span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                            item.isPublished !== false
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200"
                          }`}
                          title="Click to toggle website publish status"
                        >
                          {item.isPublished !== false ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Live on Website</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                              <span>Draft (Hidden)</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/portfolio/${item.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Open live case story in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setRevisionTarget({ id: item.id, title: item.title });
                              setIsRevisionOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="View Revisions"
                          >
                            <History className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit Case Study"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Case Study"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ========================================================================= */}
      {/* SIDE-BY-SIDE LIVE PREVIEW EDITOR MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div
            className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/80">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingItem ? `Edit: ${editingItem.title}` : "Create New Patient Care Journey"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Interactive split-screen editor with real-time website card preview.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Screen Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 custom-scrollbar">
              {/* Left Column: Form Controls (7 cols) */}
              <div className="lg:col-span-7">
                <form id="portfolio-form" onSubmit={handleSave} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Case Study Title <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          title,
                          slug: editingItem
                            ? prev.slug
                            : title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-|-$/g, ""),
                        }));
                      }}
                      placeholder="e.g. Early Stage Breast Cancer Treated with Oncoplastic Breast Conservation"
                      required
                      className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                    />
                  </div>

                  {/* Patient Moniker & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Patient Moniker / Age <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                        placeholder="e.g. Patient M.S., 42"
                        required
                        className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Clinical Category
                      </label>
                      <select
                        value={formData.categoryKey}
                        onChange={(e) => {
                          const val = e.target.value;
                          const found = CLINICAL_CATEGORY_TABS.find((t) => t.id === val);
                          setFormData((prev) => ({
                            ...prev,
                            categoryKey: val,
                            category: found?.label || "Oncoplastic Surgery",
                          }));
                        }}
                        className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all cursor-pointer"
                      >
                        <option value="oncoplastic">Oncoplastic Surgery</option>
                        <option value="benign">Benign Breast Care</option>
                        <option value="reconstruction">Breast Reconstruction</option>
                        <option value="surgical-oncology">Surgical Oncology</option>
                      </select>
                    </div>
                  </div>

                  {/* Slug & Order Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        URL Slug <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs text-slate-400 font-mono">
                          /
                        </span>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                            }))
                          }
                          placeholder="oncoplastic-bcs-patient-care-journey"
                          required
                          className="block w-full pl-6 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Display Order
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={formData.order}
                        onChange={(e) => setFormData((prev) => ({ ...prev, order: Number(e.target.value) }))}
                        className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                      />
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Verified Clinical Outcomes (Key Metrics)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Metric Label</label>
                        <input
                          type="text"
                          value={formData.metric1Label}
                          onChange={(e) => setFormData((prev) => ({ ...prev, metric1Label: e.target.value }))}
                          placeholder="e.g. Cancer Clearance"
                          className="block w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Metric Value</label>
                        <input
                          type="text"
                          value={formData.metric1Value}
                          onChange={(e) => setFormData((prev) => ({ ...prev, metric1Value: e.target.value }))}
                          placeholder="e.g. 100%"
                          className="block w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Metric Label</label>
                        <input
                          type="text"
                          value={formData.metric2Label}
                          onChange={(e) => setFormData((prev) => ({ ...prev, metric2Label: e.target.value }))}
                          placeholder="e.g. Recovery Time"
                          className="block w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Metric Value</label>
                        <input
                          type="text"
                          value={formData.metric2Value}
                          onChange={(e) => setFormData((prev) => ({ ...prev, metric2Value: e.target.value }))}
                          placeholder="e.g. 10 Days"
                          className="block w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Short Summary */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Clinical Summary / Brief Narrative
                    </label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                      placeholder="Brief overview of the patient diagnosis, surgical intervention, and oncologic result."
                      className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                    />
                  </div>

                  {/* Reassurance Quote */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Patient Testimonial / Reassurance Quote
                    </label>
                    <textarea
                      rows={2}
                      value={formData.testimonialQuote}
                      onChange={(e) => setFormData((prev) => ({ ...prev, testimonialQuote: e.target.value }))}
                      placeholder="Direct words from the patient regarding reassurance, care experience, and surgical recovery."
                      className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all italic"
                    />
                  </div>

                  {/* Publish Status Toggle */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Live Website Visibility</div>
                      <div className="text-[11px] text-slate-500">
                        {formData.isPublished ? "Visible to patients on /portfolio and homepage." : "Hidden from public view (Draft mode)."}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, isPublished: !prev.isPublished }))}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        formData.isPublished ? "bg-emerald-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.isPublished ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Card Preview (5 cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Live Website Card Preview
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Real-Time Sync
                  </span>
                </div>

                {/* Simulated Public Clinical Case Card */}
                <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
                  <div>
                    {/* Top Row: Category Pill & Order */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {formData.category || "Clinical Case"}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                        CASE #{String(formData.order || 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Patient Moniker */}
                    <div className="text-xs font-bold text-emerald-700 mb-1">
                      {formData.clientName || "Verified Patient"}
                    </div>

                    {/* Dynamic Title */}
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-2 leading-snug">
                      {formData.title || "Patient Care Journey Title Preview"}
                    </h3>

                    {/* Tagline / Summary */}
                    <p className="text-xs font-medium text-slate-500 leading-relaxed mb-4">
                      {formData.shortDescription || "Clinical summary of oncologic surgical care and patient management."}
                    </p>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-2 gap-2 pt-3.5 border-t border-slate-100 mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] font-semibold text-slate-500 truncate">{formData.metric1Label}</div>
                        <div className="text-sm font-extrabold text-emerald-700">{formData.metric1Value}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] font-semibold text-slate-500 truncate">{formData.metric2Label}</div>
                        <div className="text-sm font-extrabold text-emerald-700">{formData.metric2Value}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Link */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-slate-900">Dr. Noopur Patel</div>
                      <div className="text-[10px] font-medium text-slate-400">Breast Cancer Surgeon</div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <span>Read Full Journey</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-3 text-center">
                  Preview mirrors card aesthetics and clinical typography on <span className="font-mono">/portfolio</span>.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 shrink-0 bg-slate-50/70">
              <span className="text-xs text-slate-400">
                Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-[10px] font-mono">Ctrl+S</kbd> to save immediately
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="portfolio-form"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving &amp; Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Save &amp; Publish Live</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1-CLICK RESET TO DEFAULTS CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
              Reset Patient Stories to Canonical Defaults?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              This will safely restore all clinical recovery stories to their canonical medical defaults, order, and outcomes.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                disabled={isResetting}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetToDefaults}
                disabled={isResetting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isResetting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Resetting...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Yes, Reset Defaults</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
              Delete Patient Story?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-bold text-slate-900">&quot;{deleteTarget.title}&quot;</span>? You can restore canonical stories anytime with &quot;Reset to Defaults&quot;.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REVISIONS DRAWER */}
      {/* ========================================================================= */}
      {isRevisionOpen && revisionTarget && (
        <AdminRevisionDrawer
          isOpen={isRevisionOpen}
          onClose={() => setIsRevisionOpen(false)}
          resourceType="portfolio"
          resourceId={revisionTarget.id}
          resourceTitle={revisionTarget.title}
          onRestored={() => {
            fetchPortfolio();
            notifyLiveSync("portfolio", revisionTarget.id);
          }}
        />
      )}
    </div>
  );
}
