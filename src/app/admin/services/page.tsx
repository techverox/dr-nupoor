"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { ServiceItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { AdminRevisionDrawer } from "@/components/admin/AdminRevisionDrawer";
import { notifyLiveSync } from "@/lib/sync/clientSync";
import {
  Stethoscope,
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
  HeartPulse,
  Activity,
  ShieldCheck,
  ClipboardList,
  History,
} from "lucide-react";

// Canonical icons for clinical oncologic care & services
const SERVICE_ICONS: Record<string, React.ElementType> = {
  "breast-cancer-diagnosis-and-treatment": Stethoscope,
  "oncoplastic-breast-surgery": Sparkles,
  "breast-conservation-surgery-bcs": ShieldCheck,
  "breast-reconstruction-surgery": HeartPulse,
  "benign-breast-conditions": Activity,
  "follow-up-and-long-term-care": ClipboardList,
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
    subtitle: "",
    slug: "",
    shortDescription: "",
    detailedDescription: "",
    order: 1,
    isPublished: true,
    deliverablesText: "",
  });

  // Revisions Drawer State
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);
  const [revisionTarget, setRevisionTarget] = useState<{ id: string; title: string } | null>(null);

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
      subtitle: "",
      slug: "",
      shortDescription: "",
      detailedDescription: "",
      order: services.length + 1,
      isPublished: true,
      deliverablesText:
        "Triple Assessment & Diagnostic Correlation\nIndividualized Surgical Oncologic Planning\nDedicated Post-Operative Rehabilitation Guidance",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingItem(service);
    // Extract deliverables from either deliverables array or capabilities titles
    const deliverablesList =
      service.deliverables && service.deliverables.length > 0
        ? service.deliverables
        : (service.capabilities || []).map((c) => c.title);

    setFormData({
      title: service.title,
      subtitle: service.subtitle || "",
      slug: service.slug,
      shortDescription: service.shortDescription || "",
      detailedDescription: service.detailedDescription || "",
      order: service.order || 1,
      isPublished: service.isPublished !== false,
      deliverablesText: deliverablesList.join("\n"),
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

      // Preserve existing capabilities if present, or construct from deliverables
      const capabilities =
        editingItem?.capabilities && editingItem.capabilities.length > 0
          ? editingItem.capabilities
          : deliverables.map((d) => ({ title: d, description: d }));

      const payload = {
        id: editingItem ? editingItem.id : undefined,
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        slug: formData.slug.trim().toLowerCase(),
        shortDescription: formData.shortDescription.trim(),
        detailedDescription: formData.detailedDescription.trim(),
        order: Number(formData.order) || 1,
        isPublished: formData.isPublished,
        deliverables,
        capabilities,
        seo: {
          title: `${formData.title.trim()} | Dr. Noopur Patel Clinic`,
          description: formData.shortDescription.trim() || formData.subtitle.trim(),
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
          message: `All ${data.count || 6} clinical oncology services reset to canonical website defaults!`,
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
        setFeedback({ message: `Service "${deleteTarget.title}" deleted successfully.`, type: "success" });
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
        (s.subtitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const PreviewIcon = SERVICE_ICONS[formData.slug] || Stethoscope;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-16 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-200/80 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                Treatments &amp; Services CMS
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                100% Real-Time Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage clinical breast oncology and surgical services. Edits immediately reflect live across the patient portal.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
          <Link
            href="/services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <span>View Live Services</span>
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
              setRevisionTarget({ id: "all", title: "All Treatments & Services" });
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

      {/* Metrics & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Services</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{services.length}</div>
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

      {/* Services Table Card */}
      <Card padding="none" className="bg-white border-slate-200/90 shadow-xs rounded-2xl overflow-hidden flex flex-col">
        {/* Search and Tabs Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50/60">
          <div className="relative w-full sm:max-w-md">
            <Search className="h-4 w-4 text-slate-400 absolute inset-y-0 my-auto left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search clinical procedures by title, slug, or summary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === "all"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({services.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("published")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === "published"
                  ? "bg-white text-emerald-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("draft")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === "draft"
                  ? "bg-white text-amber-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="animate-spin w-8 h-8 border-2 border-slate-200 border-t-emerald-600 rounded-full mb-3" />
            <p className="text-xs font-bold">Loading clinical services catalog...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-3 text-slate-400">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No services found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {searchQuery ? "Try adjusting your search query or filters." : "Create your first clinical service or reset to canonical defaults."}
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
                  <th className="px-5 py-3.5">Procedure &amp; URL</th>
                  <th className="px-5 py-3.5">Clinical Focus &amp; Summary</th>
                  <th className="px-5 py-3.5">Website Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredServices.map((service, idx) => {
                  const Icon = SERVICE_ICONS[service.slug] || Stethoscope;
                  const deliverablesCount =
                    service.deliverables?.length || service.capabilities?.length || 0;

                  return (
                    <tr
                      key={service.id || service.slug || idx}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-slate-100 font-mono font-bold text-[11px] text-slate-700 border border-slate-200">
                          #{String(service.order || idx + 1).padStart(2, "0")}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm leading-snug">
                              {service.title}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                              <LinkIcon className="w-3 h-3 text-slate-400" />
                              <span>/services/{service.slug}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {service.subtitle && (
                          <div className="text-xs font-semibold text-emerald-700 mb-0.5">
                            {service.subtitle}
                          </div>
                        )}
                        <div className="max-w-[340px] text-slate-600 line-clamp-2 leading-relaxed">
                          {service.shortDescription || service.detailedDescription || "No clinical summary specified."}
                        </div>
                        {deliverablesCount > 0 && (
                          <div className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                            <ListOrdered className="w-3 h-3" />
                            <span>{deliverablesCount} Capabilities</span>
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(service)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                            service.isPublished !== false
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200"
                          }`}
                          title="Click to toggle website publish status"
                        >
                          {service.isPublished !== false ? (
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
                            href={`/services#${service.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Open live section on website"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setRevisionTarget({ id: service.id, title: service.title });
                              setIsRevisionOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="View Revisions"
                          >
                            <History className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(service)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(service)}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
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
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingItem ? `Edit: ${editingItem.title}` : "Create New Clinical Procedure"}
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
                <form id="service-form" onSubmit={handleSave} className="space-y-4">
                  {/* Service Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Clinical Procedure / Service Title <span className="text-emerald-600">*</span>
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
                      placeholder="e.g. Breast Cancer Diagnosis & Treatment"
                      required
                      className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                    />
                  </div>

                  {/* Subtitle / Clinical Focus */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Clinical Focus / Subtitle Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="e.g. Precision oncologic evaluation & comprehensive surgical care"
                      className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                    />
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
                          placeholder="breast-cancer-diagnosis-and-treatment"
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

                  {/* Short Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Clinical Overview / Summary
                    </label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                      placeholder="Accurate diagnostic assessment, mammography & biopsy evaluation, and individualized surgical management for breast malignancies."
                      className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                    />
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Comprehensive Clinical Narrative
                    </label>
                    <textarea
                      rows={3}
                      value={formData.detailedDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, detailedDescription: e.target.value }))}
                      placeholder="Detailed explanation of clinical stages, surgical oncology considerations, and patient recovery milestones."
                      className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                    />
                  </div>

                  {/* Key Capabilities / Deliverables */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Key Capabilities &amp; Clinical Procedures (1 per line)
                      </label>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {previewDeliverables.length} bullet points active
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={formData.deliverablesText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, deliverablesText: e.target.value }))}
                      placeholder="Triple Assessment & Diagnostic Correlation&#10;Multidisciplinary Tumor Board Planning&#10;Sentinel Lymph Node Biopsy (SLNB)"
                      className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-slate-900 transition-all"
                    />
                  </div>

                  {/* Publish Status Toggle */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Live Website Visibility</div>
                      <div className="text-[11px] text-slate-500">
                        {formData.isPublished ? "Visible to patients on /services and homepage." : "Hidden from public view (Draft mode)."}
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

                {/* Simulated Public Clinical Card */}
                <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
                  <div>
                    {/* Top Icon & Pod Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs">
                        <PreviewIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                        CLINICAL #{String(formData.order || 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Dynamic Title */}
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-1 leading-snug">
                      {formData.title || "Procedure Title Preview"}
                    </h3>

                    {/* Subtitle / Focus */}
                    {formData.subtitle && (
                      <p className="text-xs font-semibold text-emerald-700 mb-2">
                        {formData.subtitle}
                      </p>
                    )}

                    {/* Tagline */}
                    <p className="text-xs font-medium text-slate-500 leading-relaxed mb-4">
                      {formData.shortDescription || "Clinical summary of oncologic surgical care and patient management."}
                    </p>

                    {/* Capabilities Checklist */}
                    <div className="space-y-1.5 pt-3.5 border-t border-slate-100 mb-4">
                      {previewDeliverables.length > 0 ? (
                        previewDeliverables.slice(0, 4).map((d, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{d}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-400 italic">No capabilities added yet.</div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Link */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-slate-900">Dr. Noopur Patel</div>
                      <div className="text-[10px] font-medium text-slate-400">Consultant Breast Surgeon</div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <span>View Procedure</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-3 text-center">
                  Preview mirrors card aesthetics and clinical typography on <span className="font-mono">/services</span>.
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
                  form="service-form"
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
              Reset Services to Canonical Defaults?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              This will safely restore all clinical oncology services to their canonical medical defaults, order, and capabilities.
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
              Delete Clinical Service?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-bold text-slate-900">&quot;{deleteTarget.title}&quot;</span>? You can restore canonical services anytime with &quot;Reset to Defaults&quot;.
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
          resourceType="service"
          resourceId={revisionTarget.id}
          resourceTitle={revisionTarget.title}
          onRestored={() => {
            fetchServices();
            notifyLiveSync("services", revisionTarget.id);
          }}
        />
      )}
    </div>
  );
}
