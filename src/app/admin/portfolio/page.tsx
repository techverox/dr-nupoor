"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortfolioItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { notifyLiveSync } from "@/lib/sync/clientSync";
import {
  FolderGit2,
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
  BarChart3,
  Building2,
  Tag,
} from "lucide-react";

const CATEGORY_TABS = [
  { id: "all", label: "All Studies" },
  { id: "performance", label: "Performance" },
  { id: "social", label: "Social & Creative" },
  { id: "localseo", label: "Local SEO" },
  { id: "fullservice", label: "Full-Service" },
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
    industry: "",
    category: "Ad Ops & Pacing Automation",
    categoryKey: "performance",
    shortDescription: "",
    heroImage: "/images/showcase/pillar_roas_command.jpg",
    metric1Label: "MRR Growth",
    metric1Value: "+420%",
    metric2Label: "Time Saved",
    metric2Value: "14 hrs/wk",
    order: 1,
    isFeatured: true,
    isPublished: true,
  });

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
      industry: "Performance Marketing Agency",
      category: "Ad Ops & Pacing Automation",
      categoryKey: "performance",
      shortDescription: "",
      heroImage: "/images/showcase/pillar_roas_command.jpg",
      metric1Label: "MRR Growth",
      metric1Value: "+350%",
      metric2Label: "Time Saved",
      metric2Value: "12 hrs/wk",
      order: items.length + 1,
      isFeatured: true,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      clientName: item.clientName,
      industry: item.industry || "General Agency",
      category: item.category || "Ad Ops & Pacing Automation",
      categoryKey: item.categoryKey || "performance",
      shortDescription: item.shortDescription || "",
      heroImage: item.heroImage || "/images/showcase/pillar_roas_command.jpg",
      metric1Label: item.metrics?.[0]?.label || "Metric 1",
      metric1Value: item.metrics?.[0]?.value || "+300%",
      metric2Label: item.metrics?.[1]?.label || "Metric 2",
      metric2Value: item.metrics?.[1]?.value || "10 hrs/wk",
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
        categoryKey: formData.categoryKey,
        shortDescription: formData.shortDescription.trim(),
        heroImage: formData.heroImage.trim(),
        order: Number(formData.order) || 1,
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished,
        metrics,
        seo: {
          title: `${formData.title.trim()} | Dr. Noopur Patel Patient Care Journey`,
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
          message: `Patient journey "${item.clientName}" is now ${newStatus ? "Published (Live)" : "Draft (Hidden)"}.`,
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
          message: "All patient care journeys successfully reset to canonical website defaults!",
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
      setFeedback({ message: "Failed to reset patient care journeys.", type: "error" });
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
        setFeedback({ message: `Patient journey "${deleteTarget.title}" deleted.`, type: "success" });
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
        (p.industry || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (categoryFilter === "all") return true;
      return p.categoryKey === categoryFilter;
    });
  }, [items, searchQuery, categoryFilter]);

  const publishedCount = useMemo(() => items.filter((p) => p.isPublished !== false).length, [items]);
  const draftCount = useMemo(() => items.filter((p) => p.isPublished === false).length, [items]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-12 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-[#008744] rounded-xl flex items-center justify-center shrink-0">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
                Portfolio &amp; Case Studies CMS
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync Active
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Manage audited agency client results and metrics. Changes immediately reflect on /portfolio and homepage.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700/60 hover:text-zinc-900 transition-all shadow-2xs cursor-pointer"
            title="Restore canonical website copy"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-xs font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Case Study</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {feedback && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center justify-between p-4 rounded-xl border ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/40 dark:border-red-800 dark:text-red-300"
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
              className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Case Studies</div>
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-0.5">{items.length}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
            <BarChart3 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Published &amp; Live
            </div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">{publishedCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Hidden / Draft
            </div>
            <div className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-0.5">{draftCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
            <EyeOff className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Case Studies Table Card */}
      <Card padding="none" className="bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 shadow-sm rounded-2xl overflow-hidden flex flex-col">
        {/* Search & Category Tabs */}
        <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="relative w-full sm:max-w-md">
            <Search className="h-4 w-4 text-zinc-400 absolute inset-y-0 my-auto left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by client, title, or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200/70 dark:border-zinc-700 overflow-x-auto scrollbar-none">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === tab.id
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Body */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <div className="animate-spin w-8 h-8 border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100 rounded-full mb-3" />
            <p className="text-xs font-semibold">Loading case studies...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-3 text-zinc-400">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">No case studies found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-4">
              {searchQuery ? "Try adjusting your search query." : "Create your first case study or reset to defaults."}
            </p>
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Live Defaults
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[880px]">
              <thead>
                <tr className="bg-zinc-50/70 dark:bg-zinc-800/40 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  <th className="px-5 py-3 w-16 text-center">Order</th>
                  <th className="px-5 py-3">Client &amp; Case Study</th>
                  <th className="px-5 py-3">Industry &amp; Category</th>
                  <th className="px-5 py-3">Audited Metrics</th>
                  <th className="px-5 py-3">Website Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800 text-xs">
                {filteredItems.map((item, idx) => {
                  const topMetric = item.metrics?.[0];
                  return (
                    <tr
                      key={item.id || item.slug || idx}
                      className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors group"
                    >
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 font-mono font-bold text-[11px] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                          #{String(item.order || idx + 1).padStart(2, "0")}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">
                          {item.clientName}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono mt-1">
                          <LinkIcon className="w-3 h-3 text-zinc-400" />
                          <span>/portfolio/{item.slug}</span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{item.industry || "Agency"}</span>
                        </div>
                        <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                          <Tag className="w-2.5 h-2.5" />
                          <span>{item.category || "General"}</span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        {topMetric ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-[#008744]">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-bold text-xs">{topMetric.value}</span>
                            <span className="text-[10px] text-zinc-500">({topMetric.label})</span>
                          </div>
                        ) : (
                          <span className="text-zinc-400 italic text-[11px]">No metrics set</span>
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                            item.isPublished !== false
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
                              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                          }`}
                          title="Click to toggle publish status"
                        >
                          {item.isPublished !== false ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Live on Website</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                              <span>Draft (Hidden)</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/portfolio/${item.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            title="View case study on live website"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            title="Edit Case Study"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div
            className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in slide-in-from-bottom-4 duration-300 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200/80 dark:border-zinc-800 shrink-0 bg-zinc-50/50 dark:bg-zinc-800/30">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#008744] flex items-center justify-center border border-emerald-500/20">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {editingItem ? `Edit: ${editingItem.clientName}` : "Create New Case Study"}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Interactive split-screen editor with real-time website card preview.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Screen Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 custom-scrollbar">
              {/* Left Form (7 cols) */}
              <div className="lg:col-span-7">
                <form id="portfolio-form" onSubmit={handleSave} className="space-y-4">
                  {/* Client Name & Category Key */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                        Client / Agency Name <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => {
                          const client = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            clientName: client,
                            slug: editingItem
                              ? prev.slug
                              : client
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/^-|-$/g, ""),
                          }));
                        }}
                        placeholder="e.g. Apex Digital Media"
                        required
                        className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                        Category Tab Filter
                      </label>
                      <select
                        value={formData.categoryKey}
                        onChange={(e) => setFormData((prev) => ({ ...prev, categoryKey: e.target.value }))}
                        className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                      >
                        <option value="performance">Performance &amp; Paid Media</option>
                        <option value="social">Social Media &amp; Creative</option>
                        <option value="localseo">Local SEO &amp; GBP</option>
                        <option value="fullservice">Full-Service Retainers</option>
                      </select>
                    </div>
                  </div>

                  {/* Case Study Title */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                      Case Study Headline / Title <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. How Apex Scaled from 15 to 68 Enterprise Retainers"
                      required
                      className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                    />
                  </div>

                  {/* Slug & Order */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                        URL Slug <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs text-zinc-400 font-mono">
                          /portfolio/
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
                          placeholder="apex-digital-media"
                          required
                          className="block w-full pl-22 pr-3 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                        Display Order
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={formData.order}
                        onChange={(e) => setFormData((prev) => ({ ...prev, order: Number(e.target.value) }))}
                        className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  {/* Industry & Sub-Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                        Industry / Team Size
                      </label>
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                        placeholder="e.g. Performance Ad Agency (45 FTEs)"
                        className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g. Ad Ops & Pacing Automation"
                        className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  {/* Short Summary */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                      Executive Summary / Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                      placeholder="Automated ad pacing guardrails and live CAPI telemetry enabled 45 media buyers to manage $14M+ monthly spend."
                      className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                    />
                  </div>

                  {/* Top Metric Highlight (Pair) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase mb-1">
                        Primary Metric Value &amp; Label
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.metric1Value}
                          onChange={(e) => setFormData((prev) => ({ ...prev, metric1Value: e.target.value }))}
                          placeholder="+420%"
                          className="w-1/2 px-2.5 py-2 text-xs font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-emerald-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={formData.metric1Label}
                          onChange={(e) => setFormData((prev) => ({ ...prev, metric1Label: e.target.value }))}
                          placeholder="MRR Growth"
                          className="w-1/2 px-2.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase mb-1">
                        Secondary Metric Value &amp; Label
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.metric2Value}
                          onChange={(e) => setFormData((prev) => ({ ...prev, metric2Value: e.target.value }))}
                          placeholder="14 hrs/wk"
                          className="w-1/2 px-2.5 py-2 text-xs font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-emerald-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={formData.metric2Label}
                          onChange={(e) => setFormData((prev) => ({ ...prev, metric2Label: e.target.value }))}
                          placeholder="Time Saved"
                          className="w-1/2 px-2.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Live Website Visibility</div>
                      <div className="text-[11px] text-zinc-500">
                        {formData.isPublished ? "Visible on /portfolio archive and homepage showcase." : "Hidden from public view (Draft mode)."}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, isPublished: !prev.isPublished }))}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        formData.isPublished ? "bg-emerald-600" : "bg-zinc-300 dark:bg-zinc-700"
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
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Live Website Preview
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    Real-time
                  </span>
                </div>

                {/* Simulated Public Card (matches PortfolioClientView) */}
                <div className="rounded-3xl bg-white dark:bg-zinc-900 p-6 border border-slate-200/90 dark:border-zinc-700 shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
                  <div>
                    {/* Visual Media Header with Floating Metric */}
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 bg-slate-100 dark:bg-zinc-800 border border-slate-200/70 dark:border-zinc-700">
                      <Image
                        src={formData.heroImage || "/images/showcase/pillar_roas_command.jpg"}
                        alt="Preview"
                        fill
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                      {/* Primary Metric Badge */}
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-md flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#008744]" />
                        <div>
                          <div className="text-sm font-black text-slate-900 leading-none">
                            {formData.metric1Value || "+420%"}
                          </div>
                          <div className="text-[10px] font-medium text-slate-500">
                            {formData.metric1Label || "Growth"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Meta: Client & Industry */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5">
                      <span>{formData.clientName || "Client Name"}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 text-[11px] font-normal truncate">
                        {formData.industry || "Agency"}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-base font-extrabold text-[#0C1628] dark:text-zinc-100 tracking-tight leading-snug mb-2 line-clamp-2">
                      {formData.title || "Case study headline preview goes here"}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {formData.shortDescription || "Short summary of the agency's verified results."}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#008744] flex items-center gap-1">
                      Read Audited Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-zinc-800 px-2 py-0.5 rounded border border-slate-200 dark:border-zinc-700">
                      POD #{String(formData.order || 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 mt-3 text-center">
                  Preview mirrors card styles on <span className="font-mono">/portfolio</span> and homepage.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200/80 dark:border-zinc-800 shrink-0 bg-zinc-50/50 dark:bg-zinc-800/30">
              <span className="text-xs text-zinc-400">
                Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-[10px] font-mono">Ctrl+S</kbd> to save immediately
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="portfolio-form"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#008744] hover:bg-[#00743a] text-white text-xs font-bold transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 cursor-pointer"
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
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
              Reset All 6 Case Studies to Live Defaults?
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-6">
              This will safely restore all 6 canonical agency case studies (Apex, Vanguard, Catalyst, Acuity, OmniScale, and Zenith) to their exact original live copy, metrics, and order.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                disabled={isResetting}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 border border-red-200 dark:border-red-800 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
              Delete Case Study?
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">&quot;{deleteTarget.title}&quot;</span>? You can restore canonical case studies anytime with &quot;Reset to Defaults&quot;.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
    </div>
  );
}
