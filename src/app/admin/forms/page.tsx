"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormDefinition, FormStatus } from "@/types/form";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { FormRenderer } from "@/components/forms/FormRenderer";
import { 
  FileText, 
  Users, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  X, 
  Edit2, 
  Inbox, 
  Copy, 
  Trash2,
  Activity,
  RotateCcw,
  Eye,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight
} from "lucide-react";

export default function AdminFormsPage() {
  const router = useRouter();
  const [forms, setForms] = useState<FormDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "inactive">("all");

  // Create Form Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFormName, setNewFormName] = useState("");
  const [newFormDesc, setNewFormDesc] = useState("");
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  const [createError, setCreateError] = useState("");

  // Delete Form Modal State
  const [deleteTarget, setDeleteTarget] = useState<FormDefinition | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1-Click Reset to Defaults State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Side-by-Side Live Preview Studio State
  const [previewForm, setPreviewForm] = useState<FormDefinition | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Duplicating State
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  // Toast feedback
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchForms = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/forms");
      const data = await res.json();
      if (data.success && Array.isArray(data.forms)) {
        setForms(data.forms);
      } else {
        setFeedback({ message: data.error || "Failed to load forms.", type: "error" });
      }
    } catch (err) {
      console.error("Error loading forms:", err);
      setFeedback({ message: "Network error loading forms.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormName.trim()) {
      setCreateError("Form name is required.");
      return;
    }

    setIsSubmittingCreate(true);
    setCreateError("");

    try {
      const res = await fetch("/api/admin/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newFormName.trim(),
          description: newFormDesc.trim(),
          status: "active",
        }),
      });

      const data = await res.json();
      if (data.success && data.form) {
        setIsCreateModalOpen(false);
        setNewFormName("");
        setNewFormDesc("");
        // Route directly to visual form builder
        router.push(`/admin/forms/${data.form.id}/builder`);
      } else {
        setCreateError(data.error || "Failed to create form.");
      }
    } catch {
      setCreateError("A network error occurred.");
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  const handleToggleStatus = async (form: FormDefinition) => {
    const nextStatus: FormStatus = form.status === "active" ? "inactive" : "active";
    try {
      const res = await fetch(`/api/admin/forms/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setForms((prev) =>
          prev.map((f) => (f.id === form.id ? { ...f, status: nextStatus } : f))
        );
        setFeedback({
          message: `Form "${form.name}" marked as ${nextStatus.toUpperCase()}.`,
          type: "success",
        });
      }
    } catch {
      setFeedback({ message: "Failed to toggle form status.", type: "error" });
    }
  };

  const handleDuplicate = async (form: FormDefinition) => {
    setDuplicatingId(form.id);
    try {
      const res = await fetch(`/api/admin/forms/${form.id}/duplicate`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success && data.form) {
        setForms((prev) => [data.form, ...prev]);
        setFeedback({
          message: `Duplicated form as "${data.form.name}".`,
          type: "success",
        });
      } else {
        setFeedback({ message: data.error || "Failed to duplicate form.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error duplicating form.", type: "error" });
    } finally {
      setDuplicatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/forms/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setForms((prev) => prev.filter((f) => f.id !== deleteTarget.id));
        setFeedback({
          message: `Deleted form "${deleteTarget.name}".`,
          type: "success",
        });
        setDeleteTarget(null);
      } else {
        setFeedback({ message: data.error || "Failed to delete form.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error deleting form.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // 1-Click Reset to Defaults
  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.forms)) {
        setForms(data.forms);
        setFeedback({
          message: data.message || "All 6 official forms and lead funnels reset to defaults!",
          type: "success",
        });
        setIsResetModalOpen(false);
      } else {
        setFeedback({ message: data.error || "Failed to reset forms.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error resetting forms.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  const filteredForms = useMemo(() => {
    return forms.filter((f) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.slug.toLowerCase().includes(q) ||
        (f.description && f.description.toLowerCase().includes(q));

      const matchesStatus =
        selectedStatus === "all" || f.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [forms, searchQuery, selectedStatus]);

  const totalForms = forms.length;
  const activeForms = forms.filter((f) => f.status === "active").length;
  const totalSubmissions = forms.reduce((acc, f) => acc + (f.totalSubmissions || 0), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div>
          <div className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span>Growth & Operations</span>
            <span>/</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">Forms & Lead Funnels</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
                Forms & Lead Funnels
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Live Engine
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Dynamic conversion forms with 100% CRM lead sync, honeypot spam shield, and live multi-device preview.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* 1-Click Reset to Defaults */}
          <button
            type="button"
            id="reset-forms-defaults-btn"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/40 shadow-sm transition-all active:scale-95"
            title="Restore all 6 canonical DigiVigee forms and lead funnels to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
            <span>Reset to Defaults</span>
          </button>

          {/* View Leads Link */}
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all shadow-sm"
          >
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            <span>View All Leads</span>
          </Link>

          {/* Create Form Button */}
          <button
            onClick={() => {
              setCreateError("");
              setIsCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-black transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>Create New Form</span>
          </button>
        </div>
      </div>

      {/* Bento Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">{totalForms} Funnels</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Production Ready</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{activeForms} Active</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Accepting Leads</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">{totalSubmissions} Inquiries</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Direct Inquiries</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">100% Shield</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Honeypot & Rate Limit</div>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in duration-200 shadow-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
              : "bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-semibold">{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Status Filter Strip */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search forms by name, slug, or fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-2">
              Status:
            </span>
            {(["all", "active", "inactive"] as const).map((status) => {
              const isSelected = selectedStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                    isSelected
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      {isLoading ? (
        <div className="py-24 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-zinc-900 dark:border-zinc-100 border-t-transparent mb-3" />
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Loading forms engine...</p>
        </div>
      ) : filteredForms.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm px-4">
          <FileText className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {searchQuery || selectedStatus !== "all" ? "No matching forms found" : "No forms created yet"}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mt-1">
            Try modifying your search or click &ldquo;Reset to Defaults&rdquo; to restore all 6 canonical lead funnels.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedStatus("all");
            }}
            className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form) => {
            const isHomepageForm = form.id === "form-consultation-default";

            return (
              <div
                key={form.id}
                className={`bg-white dark:bg-zinc-900 border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between gap-4 relative ${
                  isHomepageForm
                    ? "border-blue-500/60 dark:border-blue-500/50 ring-2 ring-blue-500/10"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <div>
                  {/* Top Status & Sync Bar */}
                  <div className="flex justify-between items-center mb-3">
                    <button
                      onClick={() => handleToggleStatus(form)}
                      title={`Click to mark as ${form.status === "active" ? "Inactive" : "Active"}`}
                      className="focus:outline-none"
                    >
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                        form.status === "active"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${form.status === "active" ? "bg-emerald-500" : "bg-zinc-400"}`} />
                        {form.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {isHomepageForm && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          ⭐ Homepage Core
                        </span>
                      )}
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {form.slug}
                      </span>
                    </div>
                  </div>

                  {/* Form Name & Description */}
                  <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 mb-1 leading-snug">
                    {form.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3.5 leading-relaxed min-h-[32px]">
                    {form.description || "Conversion-optimized dynamic lead capture funnel."}
                  </p>

                  {/* Fields Breakdown Chips */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(form.fields || []).slice(0, 5).map((f) => (
                      <span
                        key={f.id}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                      >
                        {f.label}
                      </span>
                    ))}
                    {(form.fields || []).length > 5 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
                        +{(form.fields || []).length - 5}
                      </span>
                    )}
                  </div>

                  {/* Meta Badges */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-[11px] font-semibold">
                      <FileText className="w-3 h-3 text-zinc-500" />
                      {form.fields?.length || 0} Fields
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 rounded-lg text-[11px] font-bold border border-blue-100 dark:border-blue-900/50">
                      <Inbox className="w-3 h-3 text-blue-500" />
                      {form.totalSubmissions || 0} Subs
                    </span>

                    {form.createLead && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 rounded-lg text-[11px] font-bold border border-emerald-100 dark:border-emerald-900/50">
                        <Users className="w-3 h-3 text-emerald-500" />
                        CRM Sync
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Visual Builder */}
                    <Link
                      href={`/admin/forms/${form.id}/builder`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Builder</span>
                    </Link>

                    {/* Live Preview Button */}
                    <button
                      onClick={() => {
                        setPreviewForm(form);
                        setPreviewDevice("desktop");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-xl text-xs font-bold transition-all"
                      title="Test Interactive Form in Live Studio"
                    >
                      <Eye className="w-3 h-3 text-blue-500" />
                      <span>Live Studio</span>
                    </button>

                    {/* Submissions Data */}
                    <Link
                      href={`/admin/forms/${form.id}/submissions`}
                      className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                      title="View Captured Submissions"
                    >
                      <Inbox className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicate(form)}
                      disabled={duplicatingId === form.id}
                      title="Duplicate Form"
                      className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteTarget(form)}
                      title="Delete Form"
                      className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
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

      {/* ========================================================================= */}
      {/* SIDE-BY-SIDE LIVE PREVIEW STUDIO MODAL */}
      {/* ========================================================================= */}
      {previewForm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
            {/* Modal Top Bar */}
            <div className="px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 shrink-0 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                    Live Form Studio
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    id: {previewForm.id}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {previewForm.name}
                </h2>
              </div>

              {/* Viewport Switcher */}
              <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    previewDevice === "desktop"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                  title="Desktop Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>

                <button
                  onClick={() => setPreviewDevice("tablet")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    previewDevice === "tablet"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                  title="Tablet Preview (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>

                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    previewDevice === "mobile"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                  title="Mobile Preview (390px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/forms/${previewForm.id}/builder`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-xs font-bold shadow-sm transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit in Builder</span>
                </Link>
                <button
                  onClick={() => setPreviewForm(null)}
                  className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Interactive Form Canvas */}
            <div className="flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-6 flex justify-center items-start">
              <div
                className={`transition-all duration-300 w-full ${
                  previewDevice === "desktop"
                    ? "max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-zinc-200 dark:border-zinc-800"
                    : previewDevice === "tablet"
                    ? "max-w-[768px] border-4 border-zinc-800 rounded-3xl p-6 bg-white dark:bg-zinc-900 shadow-2xl"
                    : "max-w-[390px] border-8 border-zinc-800 rounded-[3rem] p-5 bg-white dark:bg-zinc-900 shadow-2xl"
                }`}
              >
                {/* Mobile notch */}
                {previewDevice === "mobile" && (
                  <div className="w-24 h-3.5 bg-zinc-800 rounded-full mx-auto mb-5" />
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                    {previewForm.name}
                  </h3>
                  {previewForm.description && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {previewForm.description}
                    </p>
                  )}
                </div>

                {/* Interactive Live Form Component */}
                <FormRenderer form={previewForm} isTestMode={true} />
              </div>
            </div>

            {/* Studio Footer */}
            <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Test mode active: submissions in this preview will not trigger live ad spend alerts.</span>
              </div>
              <button
                onClick={() => setPreviewForm(null)}
                className="px-3 py-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold"
              >
                Close Studio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1-CLICK CREATE FORM MODAL */}
      {/* ========================================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                  Create New Form
                </h2>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">
                Give your form a title. It will instantly launch in the Visual Form Builder where you can add, arrange, and customize fields easily.
              </p>

              {createError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs border border-rose-200 dark:border-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {createError}
                </div>
              )}

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                    Form Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Real Estate Project Inquiries"
                    value={newFormName}
                    onChange={(e) => setNewFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                    Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the campaign or objective for this form..."
                    value={newFormDesc}
                    onChange={(e) => setNewFormDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-100 transition-all"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingCreate}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black text-xs rounded-xl hover:bg-zinc-800 dark:hover:bg-white disabled:opacity-50 transition-all shadow-md active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isSubmittingCreate ? "Creating..." : "Create & Launch Builder"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1-CLICK RESET TO DEFAULTS CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      <ConfirmDialog
        isOpen={isResetModalOpen}
        title="Reset All Forms to Defaults?"
        message="Are you sure you want to reset all forms and lead funnels to official DigiVigee defaults? This will restore all 6 canonical blueprints (Strategic Consultation, Paid Ads Audit, SEO Review, Quick Quote, Enterprise Discovery, and Partner Program) to factory state. Existing customer lead records in the database will remain 100% safe and intact."
        confirmLabel="Yes, Reset to Defaults"
        isDestructive
        isLoading={isResetting}
        onConfirm={handleResetToDefaults}
        onClose={() => setIsResetModalOpen(false)}
      />

      {/* ========================================================================= */}
      {/* CONFIRM DELETE DIALOG */}
      {/* ========================================================================= */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Form?"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? Any landing pages referencing this form will gracefully fall back to the default contact form.`}
        confirmLabel="Delete Form"
        isDestructive
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
