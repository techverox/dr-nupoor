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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span>Growth &amp; Operations</span>
            <span>/</span>
            <span className="text-slate-900 font-bold">Clinical Forms &amp; Inquiries</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D84C70] to-[#C23B5E] flex items-center justify-center text-white shadow-md shadow-rose-900/10">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Clinical Forms &amp; Inquiries
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Engine
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Dynamic patient consultation forms with 100% CRM inquiry sync, spam shield, and live multi-device preview.
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
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs transition-all cursor-pointer"
            title="Restore canonical clinical patient forms to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset to Defaults</span>
          </button>

          {/* View Leads Link */}
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all shadow-xs"
          >
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>View All Inquiries</span>
          </Link>

          {/* Create Form Button */}
          <button
            onClick={() => {
              setCreateError("");
              setIsCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D84C70] to-[#C23B5E] text-white hover:brightness-105 rounded-xl text-xs font-black transition-all shadow-md shadow-rose-900/10 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Form</span>
          </button>
        </div>
      </div>

      {/* Bento Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#D84C70] flex items-center justify-center shrink-0 border border-rose-100">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{totalForms} Forms</div>
            <div className="text-xs text-slate-500 font-medium">Production Ready</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-emerald-600">{activeForms} Active</div>
            <div className="text-xs text-slate-500 font-medium">Accepting Inquiries</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{totalSubmissions} Submissions</div>
            <div className="text-xs text-slate-500 font-medium">Patient Submissions</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">Protected</div>
            <div className="text-xs text-slate-500 font-medium">Spam Shield &amp; SSL</div>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in duration-200 shadow-xs ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
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
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Status Filter Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search forms by name, slug, or fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#D84C70] focus:ring-2 focus:ring-[#D84C70]/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
              Status:
            </span>
            {(["all", "active", "inactive"] as const).map((status) => {
              const isSelected = selectedStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
        <div className="py-24 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#D84C70] border-t-transparent mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading forms engine...</p>
        </div>
      ) : filteredForms.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 shadow-xs px-4">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">
            {searchQuery || selectedStatus !== "all" ? "No matching forms found" : "No forms created yet"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
            Try modifying your search or click &ldquo;Reset to Defaults&rdquo; to restore canonical patient forms.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedStatus("all");
            }}
            className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
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
                className={`bg-white border rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between gap-4 relative ${
                  isHomepageForm
                    ? "border-[#D84C70]/60 ring-2 ring-[#D84C70]/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Top Status & Sync Bar */}
                  <div className="flex justify-between items-center mb-3">
                    <button
                      onClick={() => handleToggleStatus(form)}
                      title={`Click to mark as ${form.status === "active" ? "Inactive" : "Active"}`}
                      className="focus:outline-none cursor-pointer"
                    >
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                        form.status === "active"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${form.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {form.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {isHomepageForm && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-[#D84C70] border border-rose-200">
                          ⭐ Main Consultation
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono">
                        {form.slug}
                      </span>
                    </div>
                  </div>

                  {/* Form Name & Description */}
                  <h3 className="text-base font-black text-slate-900 mb-1 leading-snug">
                    {form.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3.5 leading-relaxed min-h-[32px]">
                    {form.description || "Patient consultation intake and inquiry funnel."}
                  </p>

                  {/* Fields Breakdown Chips */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(form.fields || []).slice(0, 5).map((f) => (
                      <span
                        key={f.id}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600"
                      >
                        {f.label}
                      </span>
                    ))}
                    {(form.fields || []).length > 5 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-600">
                        +{(form.fields || []).length - 5}
                      </span>
                    )}
                  </div>

                  {/* Meta Badges */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-semibold">
                      <FileText className="w-3 h-3 text-slate-500" />
                      {form.fields?.length || 0} Fields
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-[#D84C70] rounded-lg text-[11px] font-bold border border-rose-100">
                      <Inbox className="w-3 h-3 text-[#D84C70]" />
                      {form.totalSubmissions || 0} Inquiries
                    </span>

                    {form.createLead && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-bold border border-emerald-100">
                        <Users className="w-3 h-3 text-emerald-500" />
                        CRM Sync
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Visual Builder */}
                    <Link
                      href={`/admin/forms/${form.id}/builder`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-[#D84C70] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      title="Test Interactive Form in Live Studio"
                    >
                      <Eye className="w-3 h-3 text-[#D84C70]" />
                      <span>Live Studio</span>
                    </button>

                    {/* Submissions Data */}
                    <Link
                      href={`/admin/forms/${form.id}/submissions`}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteTarget(form)}
                      title="Delete Form"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
          className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Top Bar */}
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-[#D84C70] border border-rose-200">
                    Live Form Studio
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    id: {previewForm.id}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                  {previewForm.name}
                </h2>
              </div>

              {/* Viewport Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === "desktop"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Desktop Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>

                <button
                  onClick={() => setPreviewDevice("tablet")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === "tablet"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Tablet Preview (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>

                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === "mobile"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-[#D84C70] text-white text-xs font-bold shadow-xs transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit in Builder</span>
                </Link>
                <button
                  onClick={() => setPreviewForm(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Interactive Form Canvas */}
            <div className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6 flex justify-center items-start">
              <div
                className={`transition-all duration-300 w-full ${
                  previewDevice === "desktop"
                    ? "max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200"
                    : previewDevice === "tablet"
                    ? "max-w-[768px] border-4 border-slate-300 rounded-3xl p-6 bg-white shadow-2xl"
                    : "max-w-[390px] border-8 border-slate-300 rounded-[3rem] p-5 bg-white shadow-2xl"
                }`}
              >
                {/* Mobile notch */}
                {previewDevice === "mobile" && (
                  <div className="w-24 h-3.5 bg-slate-300 rounded-full mx-auto mb-5" />
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-black text-slate-900">
                    {previewForm.name}
                  </h3>
                  {previewForm.description && (
                    <p className="text-xs text-slate-500 mt-1">
                      {previewForm.description}
                    </p>
                  )}
                </div>

                {/* Interactive Live Form Component */}
                <FormRenderer form={previewForm} isTestMode={true} />
              </div>
            </div>

            {/* Studio Footer */}
            <div className="px-5 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Test mode active: submissions in this preview will not trigger patient WhatsApp notifications.</span>
              </div>
              <button
                onClick={() => setPreviewForm(null)}
                className="px-3 py-1 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#D84C70] flex items-center justify-center border border-rose-100">
                  <Plus className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black text-slate-900">
                  Create New Clinical Form
                </h2>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
                Give your form a clinical title. It will instantly launch in the Visual Form Builder where you can add, arrange, and customize fields easily.
              </p>

              {createError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {createError}
                </div>
              )}

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Form Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Breast Cancer Second Opinion Intake"
                    value={newFormName}
                    onChange={(e) => setNewFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#D84C70] focus:ring-2 focus:ring-[#D84C70]/10 text-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the clinical objective or intake requirements for this form..."
                    value={newFormDesc}
                    onChange={(e) => setNewFormDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#D84C70] focus:ring-2 focus:ring-[#D84C70]/10 text-slate-900 transition-all"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingCreate}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D84C70] to-[#C23B5E] text-white font-black text-xs rounded-xl hover:brightness-105 disabled:opacity-50 transition-all shadow-md shadow-rose-900/10 cursor-pointer"
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
        message="Are you sure you want to reset all clinical forms to defaults? This will restore canonical blueprints (Initial Consultation, Second Opinion Intake, Breast Screening Request, Post-Op Follow-up, Oncology Advisory) to clinical factory state. Existing patient lead records in the database will remain 100% safe and intact."
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
