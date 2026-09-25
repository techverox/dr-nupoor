"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { FAQItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { notifyLiveSync } from "@/lib/sync/clientSync";
import {
  HelpCircle,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Edit2,
  X,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Layers,
  FolderOpen,
  Check,
  ShieldCheck,
} from "lucide-react";

const CATEGORY_PRESETS = [
  "General Awareness",
  "Symptoms & Diagnosis",
  "Oncoplastic Surgery",
  "Screening & Mammography",
  "Consultation & Booking",
  "Recovery & Post-Op",
];

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    order: 1,
    isPublished: true,
  });

  // Preview interactive state
  const [previewAccordionOpen, setPreviewAccordionOpen] = useState(true);

  // Reset to Defaults Confirmation Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<FAQItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchFaqs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      if (data.success && data.items) {
        setFaqs(data.items);
      }
    } catch (e) {
      console.error("[AdminFaqs] Fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  // Keyboard shortcut: Ctrl+S to save modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && isModalOpen) {
        e.preventDefault();
        const form = document.getElementById("faq-editor-form") as HTMLFormElement | null;
        if (form) form.requestSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      question: "",
      answer: "",
      category: "General",
      order: faqs.length + 1,
      isPublished: true,
    });
    setPreviewAccordionOpen(true);
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FAQItem) => {
    setEditingItem(faq);
    setFormData({
      question: faq.question || "",
      answer: faq.answer || "",
      category: faq.category || "General",
      order: faq.order || 1,
      isPublished: faq.isPublished ?? true,
    });
    setPreviewAccordionOpen(true);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      setFeedback({ message: "Question and answer are required.", type: "error" });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        id: editingItem ? editingItem.id : undefined,
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category.trim() || "General",
        order: Number(formData.order),
        isPublished: formData.isPublished,
      };

      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("faqs", data.id || payload.id);
        setFeedback({
          message: editingItem ? "FAQ updated & synced live!" : "New FAQ created & published live!",
          type: "success",
        });
        setIsModalOpen(false);
        fetchFaqs();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to save FAQ.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminFaqs] Save error:", e);
      setFeedback({ message: "An unexpected network error occurred.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (faq: FAQItem) => {
    try {
      const nextStatus = !faq.isPublished;
      // Optimistic update
      setFaqs((prev) =>
        prev.map((f) => (f.id === faq.id ? { ...f, isPublished: nextStatus } : f))
      );

      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          category: faq.category,
          order: faq.order,
          isPublished: nextStatus,
        }),
      });

      if (res.ok) {
        notifyLiveSync("faqs", faq.id);
        setFeedback({
          message: `"${faq.question.slice(0, 35)}..." is now ${nextStatus ? "Published Live" : "Unpublished (Draft)"}.`,
          type: "success",
        });
        setTimeout(() => setFeedback(null), 3000);
      } else {
        fetchFaqs();
      }
    } catch (e) {
      console.error("[AdminFaqs] Toggle error:", e);
      fetchFaqs();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/faqs?id=${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("faqs", deleteTarget.id);
        setFeedback({ message: `FAQ "${deleteTarget.question.slice(0, 35)}..." deleted.`, type: "success" });
        setDeleteTarget(null);
        fetchFaqs();
        setTimeout(() => setFeedback(null), 3500);
      } else {
        setFeedback({ message: data.error || "Delete failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminFaqs] Delete error:", e);
      setFeedback({ message: "Failed to delete FAQ.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("faqs", "all");
        setFeedback({
          message: "All 6 canonical clinical FAQs successfully reset to live factory defaults!",
          type: "success",
        });
        setIsResetConfirmOpen(false);
        fetchFaqs();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to reset FAQs.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminFaqs] Reset error:", e);
      setFeedback({ message: "Network error during reset.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Extract unique categories from items
  const uniqueCategories = useMemo(() => {
    const cats = Array.from(new Set(faqs.map((f) => f.category).filter(Boolean)));
    return cats;
  }, [faqs]);

  // Filter tabs list
  const filterTabs = useMemo(() => {
    return [
      { id: "all", label: "All FAQs" },
      { id: "published", label: "Published Live" },
      { id: "draft", label: "Drafts" },
      ...uniqueCategories.map((c) => ({ id: `cat_${c.toLowerCase()}`, label: c, categoryVal: c })),
    ];
  }, [uniqueCategories]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const matchesSearch =
        (f.question || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.answer || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.category || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === "published") return f.isPublished;
      if (activeTab === "draft") return !f.isPublished;
      if (activeTab.startsWith("cat_")) {
        const cat = filterTabs.find((t) => t.id === activeTab)?.label;
        if (cat) return f.category.toLowerCase() === cat.toLowerCase();
      }

      return true;
    });
  }, [faqs, searchQuery, activeTab, filterTabs]);

  // Metrics
  const metrics = useMemo(() => {
    const total = faqs.length;
    const published = faqs.filter((f) => f.isPublished).length;
    const categoriesCount = uniqueCategories.length;
    const topCategory = uniqueCategories[0] || "General";
    return { total, published, categoriesCount, topCategory };
  }, [faqs, uniqueCategories]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#008744] flex items-center justify-center shrink-0 border border-emerald-100">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                FAQs Management CMS
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#008744] border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008744] animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Manage clinical breast health questions, diagnostic FAQs, surgical oncology guidance, and post-op care answers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Reset to Live Defaults Button */}
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
            title="Reset all FAQs to pristine clinical defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>

          {/* View Live on Website */}
          <Link
            href="/#faqs"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>View on Site</span>
          </Link>

          {/* Add FAQ CTA */}
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] text-white text-xs font-bold hover:opacity-95 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Questions</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{metrics.total}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Published Live</div>
            <div className="text-2xl font-black text-[#008744] mt-0.5">{metrics.published}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-[#008744]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Topic Categories</div>
            <div className="text-2xl font-black text-indigo-600 mt-0.5">{metrics.categoriesCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <FolderOpen className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Top Category</div>
            <div className="text-lg font-black text-slate-800 mt-1 truncate">{metrics.topCategory}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <Layers className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center justify-between p-4 rounded-xl border ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-[#008744] shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span className="font-semibold text-xs sm:text-sm">{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="p-1 rounded-md hover:bg-black/5 text-slate-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <Card padding="none" className="bg-white border-slate-200/80 shadow-xs rounded-2xl overflow-hidden">
        {/* Controls Bar: Search & Category Tabs */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/50 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
          {/* Search Input */}
          <div className="relative w-full lg:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by question, answer, category..."
              className="block w-full pl-9 pr-8 py-2 border border-slate-200 rounded-xl bg-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const count =
                tab.id === "all"
                  ? faqs.length
                  : tab.id === "published"
                  ? faqs.filter((f) => f.isPublished).length
                  : tab.id === "draft"
                  ? faqs.filter((f) => !f.isPublished).length
                  : faqs.filter((f) => f.category?.toLowerCase() === tab.label.toLowerCase()).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#0C1628] text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/80"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQs List Table */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-500 text-xs">
            <div className="w-6 h-6 border-2 border-[#008744] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading FAQs from real-time store...
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="py-16 text-center">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">No FAQs match your search</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">Try adjusting your search query or category filter tabs.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
              >
                {/* Left: Priority Order + Question & Answer */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-200/60">
                    #{faq.order}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                        {faq.question}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80">
                        {faq.category || "General"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 pr-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Right: Publish Toggle & Actions */}
                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  {/* Status Badge Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(faq)}
                    className="cursor-pointer group/toggle focus:outline-none"
                    title="Click to toggle live website visibility"
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                        faq.isPublished
                          ? "bg-emerald-50 text-[#008744] border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          faq.isPublished ? "bg-[#008744]" : "bg-slate-400"
                        }`}
                      />
                      <span>{faq.isPublished ? "Live on Site" : "Draft (Hidden)"}</span>
                    </span>
                  </button>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => openEditModal(faq)}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
                    title="Edit FAQ"
                  >
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(faq)}
                    className="p-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer shadow-2xs"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Editor Modal with Side-by-Side Live Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#008744] flex items-center justify-center border border-emerald-100">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    {editingItem ? "Edit FAQ Question" : "Create New FAQ Question"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Changes reflect live across the public FAQ accordion instantly upon saving.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Split 2-Column (Form on Left, Live Preview on Right) */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Controls (7 cols) */}
              <form
                id="faq-editor-form"
                onSubmit={handleSave}
                className="lg:col-span-7 space-y-4 text-left"
              >
                {/* Question Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Question Headline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="e.g. When should I get my first screening mammogram?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] transition-all"
                  />
                </div>

                {/* Category & Display Order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Topic Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Screening, Diagnosis, Surgery, Recovery"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] transition-all mb-2"
                    />
                    {/* Quick Category Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORY_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: preset })}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                            formData.category.toLowerCase() === preset.toLowerCase()
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Display Priority Order
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Lower numbers appear first on the public accordion.
                    </span>
                  </div>
                </div>

                {/* Answer Text Area */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Clear Answer Explanation <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    placeholder="Provide a clear, reassuring clinical explanation regarding diagnosis, procedure, recovery timeline..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/10 focus:border-[#D84C70] transition-all leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>Keep answers compassionate, clinically accurate, and patient-friendly.</span>
                    <span>{formData.answer.length} characters</span>
                  </div>
                </div>

                {/* Publish Toggle */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isFaqPublishedToggle"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded text-[#008744] focus:ring-[#008744] cursor-pointer"
                    />
                    <label htmlFor="isFaqPublishedToggle" className="cursor-pointer">
                      <div className="text-xs font-bold text-slate-900">Publish Live on Website</div>
                      <div className="text-[11px] text-slate-500">
                        When enabled, question appears immediately in the homepage FAQ section and schema markup.
                      </div>
                    </label>
                  </div>
                </div>
              </form>

              {/* Right Column: Interactive Side-by-Side Live Preview (5 cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="sticky top-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#008744]" />
                      Live Website Accordion Preview
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#008744] border border-emerald-200">
                      Exact Public Replica
                    </span>
                  </div>

                  {/* Public Accordion Item Mockup */}
                  <div className="rounded-xl border border-emerald-500/40 bg-[#F8FAFC] shadow-sm overflow-hidden text-left transition-all">
                    {/* Accordion Question Header */}
                    <button
                      type="button"
                      onClick={() => setPreviewAccordionOpen(!previewAccordionOpen)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left gap-3 cursor-pointer"
                    >
                      <span className="text-sm font-bold text-[#0C1628] tracking-tight leading-snug">
                        {formData.question || "Enter your question title on the left..."}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          previewAccordionOpen
                            ? "bg-emerald-500/15 text-emerald-700 rotate-180"
                            : "bg-slate-200/80 text-slate-500"
                        }`}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    {/* Accordion Answer Content */}
                    {previewAccordionOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-xs leading-relaxed border-t border-slate-200/50">
                        <p className="whitespace-pre-line">
                          {formData.answer || "Answer preview will appear here dynamically in real-time as you type..."}
                        </p>
                        {formData.category && (
                          <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center gap-1.5 text-[10.5px] font-semibold text-emerald-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Topic: {formData.category}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Schema & Sync Guarantee Note */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#008744] shrink-0 mt-0.5" />
                    <span>
                      Live Sync Active: Questions and answers entered here automatically update both the visual accordion on the homepage and Google FAQPage JSON-LD rich snippets.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200/80 bg-slate-50/70 flex items-center justify-between">
              <div className="text-xs text-slate-400 hidden sm:block">
                Press <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded">Ctrl+S</kbd> to save immediately
              </div>

              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] text-white text-xs font-bold hover:opacity-95 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Syncing Live...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingItem ? "Publish Updates" : "Create & Publish"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safety Confirmation Modal: Reset to Defaults */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">
              Reset All FAQs to Clinical Defaults?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              This action will safely restore all verified clinical breast health and oncoplastic surgery FAQs (covering Screening, Diagnosis, Surgery, Recovery, and Genetic Counseling) to their pristine live defaults. Any unsaved drafts will be reset.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-6 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                <span>Restores Verified Breast Care Clinical FAQs</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pl-6">
                <span>100% synchronized with the live homepage accordion and schema.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                disabled={isResetting}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetToDefaults}
                disabled={isResetting}
                className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isResetting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Resetting...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Yes, Reset to Defaults</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">
              Delete FAQ Question?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Are you sure you want to remove the question:{" "}
              <strong className="text-slate-900">&ldquo;{deleteTarget.question}&rdquo;</strong>? This will unpublish it from the live website immediately.
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
