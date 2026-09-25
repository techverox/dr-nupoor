"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { ServiceItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { notifyLiveSync } from "@/lib/sync/clientSync";
import {
  Briefcase,
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
  ListOrdered,
  RotateCcw,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Layers,
  Share2,
  TrendingUp,
  Palette,
  Code2,
  Globe,
  Zap,
} from "lucide-react";

// Canonical icons for live preview stage
const SERVICE_ICONS: Record<string, React.ElementType> = {
  "social-media-marketing": Share2,
  "performance-marketing": TrendingUp,
  "content-creation": Palette,
  "website-design-and-development": Code2,
  "seo-and-local-seo": Globe,
  "lead-generation-and-automation": Zap,
  "brand-strategy": Sparkles,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    detailedDescription: "",
    order: 1,
    isPublished: true,
    deliverablesText: "",
  });

  // Reset to Defaults Confirmation Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.success && data.items) {
        setServices(data.items);
      }
    } catch (e) {
      console.error("[AdminServices] Fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Keyboard shortcut: Ctrl+S to save modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && isModalOpen) {
        e.preventDefault();
        const form = document.getElementById("service-form") as HTMLFormElement | null;
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
      shortDescription: "",
      detailedDescription: "",
      order: services.length + 1,
      isPublished: true,
      deliverablesText: "Standardized SOPs & Retainer Milestones\nAutomated Telemetry & Live Dashboards\nRole-Based SLA Guardrails",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingItem(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription || service.subtitle || "",
      detailedDescription: service.detailedDescription || "",
      order: service.order || 1,
      isPublished: service.isPublished !== false,
      deliverablesText: (service.deliverables || []).join("\n"),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) return;

    setIsSaving(true);
    try {
      const deliverables = formData.deliverablesText
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean);

      const payload = {
        id: editingItem ? editingItem.id : undefined,
        title: formData.title.trim(),
        slug: formData.slug.trim().toLowerCase(),
        shortDescription: formData.shortDescription.trim(),
        detailedDescription: formData.detailedDescription.trim(),
        order: Number(formData.order) || 1,
        isPublished: formData.isPublished,
        deliverables,
        seo: {
          title: `${formData.title.trim()} | Dr. Noopur Patel Clinic`,
          description: formData.shortDescription.trim(),
        },
      };

      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("services", data.id || payload.id);
        setFeedback({
          message: `Service "${formData.title}" saved successfully & live on website!`,
          type: "success",
        });
        setIsModalOpen(false);
        await fetchServices();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to save service.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminServices] Save error:", e);
      setFeedback({ message: "An unexpected error occurred.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (service: ServiceItem) => {
    try {
      const newStatus = !service.isPublished;
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: service.id,
          title: service.title,
          slug: service.slug,
          isPublished: newStatus,
        }),
      });

      if (res.ok) {
        notifyLiveSync("services", service.id);
        setServices((prev) =>
          prev.map((s) => (s.id === service.id ? { ...s, isPublished: newStatus } : s))
        );
        setFeedback({
          message: `Service "${service.title}" is now ${newStatus ? "Published (Live)" : "Draft (Hidden)"}.`,
          type: "success",
        });
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error("[AdminServices] Toggle error:", e);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        notifyLiveSync("services", "all");
        setFeedback({
          message: "All 7 services successfully reset to canonical website defaults!",
          type: "success",
        });
        setIsResetConfirmOpen(false);
        await fetchServices();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Reset failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminServices] Reset error:", e);
      setFeedback({ message: "Failed to reset services.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/services?id=${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("services", deleteTarget.id);
        setFeedback({ message: `Service "${deleteTarget.title}" deleted.`, type: "success" });
        setDeleteTarget(null);
        await fetchServices();
        setTimeout(() => setFeedback(null), 3000);
      } else {
        setFeedback({ message: data.error || "Delete failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminServices] Delete error:", e);
      setFeedback({ message: "Failed to delete service.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.shortDescription || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (statusFilter === "published") return s.isPublished !== false;
      if (statusFilter === "draft") return s.isPublished === false;
      return true;
    });
  }, [services, searchQuery, statusFilter]);

  const publishedCount = useMemo(() => services.filter((s) => s.isPublished !== false).length, [services]);
  const draftCount = useMemo(() => services.filter((s) => s.isPublished === false).length, [services]);

  // Live preview helpers for the modal
  const previewDeliverables = useMemo(() => {
    return formData.deliverablesText
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);
  }, [formData.deliverablesText]);

  const PreviewIcon = SERVICE_ICONS[formData.slug] || Layers;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-12 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-[#008744] rounded-xl flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
                Services CMS
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync Active
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Manage your 7 core agency delivery engines. Edits immediately reflect live across the website.
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
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Real-Time Notification Toast */}
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

      {/* Metrics & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Services</div>
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-0.5">{services.length}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
            <Layers className="w-4 h-4" />
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

      {/* Services Table Card */}
      <Card padding="none" className="bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 shadow-sm rounded-2xl overflow-hidden flex flex-col">
        {/* Search and Tabs Bar */}
        <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="relative w-full sm:max-w-md">
            <Search className="h-4 w-4 text-zinc-400 absolute inset-y-0 my-auto left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search services by title, slug, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200/70 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === "all"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              All ({services.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("published")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === "published"
                  ? "bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 shadow-2xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("draft")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === "draft"
                  ? "bg-white dark:bg-zinc-900 text-amber-700 dark:text-amber-400 shadow-2xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <div className="animate-spin w-8 h-8 border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100 rounded-full mb-3" />
            <p className="text-xs font-semibold">Loading service offerings...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-3 text-zinc-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">No services found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-4">
              {searchQuery ? "Try adjusting your search filters." : "Create your first service or reset to defaults."}
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
            <table className="w-full text-left border-collapse min-w-[840px]">
              <thead>
                <tr className="bg-zinc-50/70 dark:bg-zinc-800/40 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  <th className="px-5 py-3 w-16 text-center">Order</th>
                  <th className="px-5 py-3">Service Name &amp; URL</th>
                  <th className="px-5 py-3">Summary &amp; Deliverables</th>
                  <th className="px-5 py-3">Website Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800 text-xs">
                {filteredServices.map((service, idx) => {
                  const Icon = SERVICE_ICONS[service.slug] || Layers;
                  return (
                    <tr
                      key={service.id || service.slug || idx}
                      className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors group"
                    >
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 font-mono font-bold text-[11px] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                          #{String(service.order || idx + 1).padStart(2, "0")}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-[#008744] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">
                              {service.title}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono mt-0.5">
                              <LinkIcon className="w-3 h-3 text-zinc-400" />
                              <span>/services/{service.slug}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="max-w-[320px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {service.shortDescription || service.detailedDescription || "No summary specified."}
                        </div>
                        {service.deliverables && service.deliverables.length > 0 && (
                          <div className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/50">
                            <ListOrdered className="w-3 h-3" />
                            <span>{service.deliverables.length} Deliverables</span>
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(service)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                            service.isPublished !== false
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
                              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                          }`}
                          title="Click to toggle publish status"
                        >
                          {service.isPublished !== false ? (
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
                            href={`/services/${service.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Open live page in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => openEditModal(service)}
                            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(service)}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                            title="Delete Service"
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
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200/80 dark:border-zinc-800 shrink-0 bg-zinc-50/50 dark:bg-zinc-800/30">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#008744] flex items-center justify-center border border-emerald-500/20">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {editingItem ? `Edit: ${editingItem.title}` : "Create New Service Offering"}
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
              {/* Left Column: Form Controls (7 cols) */}
              <div className="lg:col-span-7">
                <form id="service-form" onSubmit={handleSave} className="space-y-4">
                  {/* Service Title */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                      Service Title <span className="text-emerald-600">*</span>
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
                      placeholder="e.g. Social Media Delivery Engine"
                      required
                      className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100 transition-shadow"
                    />
                  </div>

                  {/* Slug & Order Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                        URL Slug <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs text-zinc-400 font-mono">
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
                          placeholder="social-media-marketing"
                          required
                          className="block w-full pl-6 pr-3 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
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

                  {/* Short Description / Tagline */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                      Short Tagline / Summary
                    </label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                      placeholder="Multi-client visual calendars & 1-click approvals across all active agency accounts."
                      className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                    />
                  </div>

                  {/* Deliverables */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                        Key Deliverables (1 per line)
                      </label>
                      <span className="text-[11px] text-zinc-400 font-medium">
                        {previewDeliverables.length} bullet points active
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={formData.deliverablesText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, deliverablesText: e.target.value }))}
                      placeholder="Standardized SOPs & Retainer Milestones&#10;1-Click Client Proofing Portal&#10;White-Label Performance Reports"
                      className="block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#008744] dark:text-zinc-100"
                    />
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Each line automatically becomes a verified green checkmark deliverable on the public card.
                    </p>
                  </div>

                  {/* Publish Status Toggle */}
                  <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Live Website Visibility</div>
                      <div className="text-[11px] text-zinc-500">
                        {formData.isPublished ? "Visible to public visitors on /services and homepage." : "Hidden from public view (Draft mode)."}
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

                {/* Simulated Public Card */}
                <div className="rounded-2xl bg-[#FCFDFD] dark:bg-zinc-900 p-6 border border-slate-200/90 dark:border-zinc-700 shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
                  <div>
                    {/* Top Icon & Pod Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#008744] flex items-center justify-center shadow-2xs">
                        <PreviewIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-zinc-700">
                        POD {String(formData.order || 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Dynamic Title */}
                    <h3 className="text-lg font-extrabold text-[#0C1628] dark:text-zinc-100 tracking-tight mb-1.5 leading-snug">
                      {formData.title || "Service Title Preview"}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 leading-relaxed mb-4">
                      {formData.shortDescription || "Short summary of this agency delivery engine."}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-1.5 pt-3.5 border-t border-slate-100 dark:border-zinc-800 mb-4">
                      {previewDeliverables.length > 0 ? (
                        previewDeliverables.slice(0, 4).map((d, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{d}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-zinc-400 italic">No deliverables added yet.</div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Link */}
                  <div className="pt-3.5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-[#0C1628] dark:text-zinc-100">Verified SLA</div>
                      <div className="text-[10px] font-medium text-slate-400">Standard Retainer</div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008744]">
                      <span>Explore Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 mt-3 text-center">
                  Preview mirrors typography and layout on <span className="font-mono">/services</span> and <span className="font-mono">/</span>.
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
                  form="service-form"
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
              Reset All 7 Services to Live Defaults?
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-6">
              This will safely restore all 7 canonical agency engines (Social Media, Performance Ads, Creative Ops, Web Engines, SEO, RevOps, and Brand Strategy) to their exact original live copy, order, and deliverables.
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
              Delete Service Offering?
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">&quot;{deleteTarget.title}&quot;</span>? You can restore canonical services anytime with &quot;Reset to Defaults&quot;.
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
