"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { TestimonialItem } from "@/types";
import { Card } from "@/components/ui/Card";
import {
  MessageSquareQuote,
  Search,
  Plus,
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
  Star,
  Building2,
  User,
  Quote,
  ShieldCheck,
  Check,
} from "lucide-react";

const FILTER_TABS = [
  { id: "all", label: "All Reviews" },
  { id: "published", label: "Published Live" },
  { id: "draft", label: "Drafts" },
  { id: "featured", label: "Featured" },
  { id: "five_star", label: "5-Star Ratings" },
];

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "Managing Partner",
    companyName: "",
    rating: 5,
    testimonial: "",
    serviceReceived: "Performance Ad Ops & Billing",
    order: 1,
    isFeatured: true,
    isPublished: true,
  });

  // Reset to Defaults Confirmation Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.success && data.items) {
        setItems(data.items);
      }
    } catch (e) {
      console.error("[AdminTestimonials] Fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Keyboard shortcut: Ctrl+S to save modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && isModalOpen) {
        e.preventDefault();
        const form = document.getElementById("testimonial-editor-form") as HTMLFormElement | null;
        if (form) form.requestSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      clientName: "",
      clientRole: "Managing Partner",
      companyName: "",
      rating: 5,
      testimonial: "",
      serviceReceived: "Performance Marketing & Ad Ops",
      order: items.length + 1,
      isFeatured: true,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      clientName: item.clientName || "",
      clientRole: item.clientRole || "",
      companyName: item.companyName || "",
      rating: item.rating || 5,
      testimonial: item.testimonial || "",
      serviceReceived: item.serviceReceived || "Verified Agency Client",
      order: item.order || 1,
      isFeatured: item.isFeatured ?? true,
      isPublished: item.isPublished ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.testimonial.trim()) {
      setFeedback({ message: "Client name and testimonial quote are required.", type: "error" });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        id: editingItem ? editingItem.id : undefined,
        clientName: formData.clientName.trim(),
        clientRole: formData.clientRole.trim(),
        companyName: formData.companyName.trim(),
        rating: Number(formData.rating),
        testimonial: formData.testimonial.trim(),
        serviceReceived: formData.serviceReceived.trim(),
        order: Number(formData.order),
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished,
      };

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          message: editingItem ? "Testimonial updated & synced live!" : "New testimonial created & published live!",
          type: "success",
        });
        setIsModalOpen(false);
        fetchTestimonials();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to save testimonial.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminTestimonials] Save error:", e);
      setFeedback({ message: "An unexpected network error occurred.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (item: TestimonialItem) => {
    try {
      const nextStatus = !item.isPublished;
      // Optimistic update
      setItems((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, isPublished: nextStatus } : t))
      );

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          clientName: item.clientName,
          testimonial: item.testimonial,
          isPublished: nextStatus,
        }),
      });

      if (res.ok) {
        setFeedback({
          message: `"${item.clientName}" is now ${nextStatus ? "Published Live" : "Unpublished (Draft)"}.`,
          type: "success",
        });
        setTimeout(() => setFeedback(null), 3000);
      } else {
        fetchTestimonials();
      }
    } catch (e) {
      console.error("[AdminTestimonials] Toggle error:", e);
      fetchTestimonials();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/testimonials?id=${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ message: `Testimonial "${deleteTarget.clientName}" deleted successfully.`, type: "success" });
        setDeleteTarget(null);
        fetchTestimonials();
        setTimeout(() => setFeedback(null), 3500);
      } else {
        setFeedback({ message: data.error || "Delete failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminTestimonials] Delete error:", e);
      setFeedback({ message: "Failed to delete testimonial.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          message: "All 5 client testimonials successfully reset to live canonical defaults!",
          type: "success",
        });
        setIsResetConfirmOpen(false);
        fetchTestimonials();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to reset testimonials.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminTestimonials] Reset error:", e);
      setFeedback({ message: "Network error during reset.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Filtered Testimonials
  const filteredItems = useMemo(() => {
    return items.filter((t) => {
      const matchesSearch =
        (t.clientName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.companyName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.serviceReceived || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.testimonial || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === "published") return t.isPublished;
      if (activeTab === "draft") return !t.isPublished;
      if (activeTab === "featured") return t.isFeatured;
      if (activeTab === "five_star") return (t.rating || 5) >= 5;

      return true;
    });
  }, [items, searchQuery, activeTab]);

  // Metrics
  const metrics = useMemo(() => {
    const total = items.length;
    const published = items.filter((i) => i.isPublished).length;
    const featured = items.filter((i) => i.isFeatured).length;
    const avgRating = total > 0
      ? (items.reduce((acc, i) => acc + (i.rating || 5), 0) / total).toFixed(1)
      : "5.0";
    return { total, published, featured, avgRating };
  }, [items]);

  // Initials generator
  const getInitials = (name: string) => {
    if (!name) return "CL";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#008744] flex items-center justify-center shrink-0 border border-emerald-100">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                Client Testimonials CMS
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#008744] border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008744] animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Manage verified client testimonials, star ratings, and company proof displayed on the homepage social proof wall.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Reset to Live Defaults Button */}
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
            title="Reset all 5 testimonials to pristine live defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>

          {/* View Live on Website */}
          <Link
            href="/#testimonials"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>View on Site</span>
          </Link>

          {/* Add Testimonial CTA */}
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C1628] text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Reviews</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{metrics.total}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <Quote className="w-4 h-4" />
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
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Featured Badges</div>
            <div className="text-2xl font-black text-amber-600 mt-0.5">{metrics.featured}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Avg Rating</div>
            <div className="text-2xl font-black text-amber-500 mt-0.5 flex items-center gap-1">
              <span>{metrics.avgRating}</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
            <ShieldCheck className="w-4 h-4" />
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

      {/* Main Content Area */}
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
              placeholder="Search by client, company, quote..."
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

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count =
                tab.id === "all"
                  ? items.length
                  : tab.id === "published"
                  ? items.filter((i) => i.isPublished).length
                  : tab.id === "draft"
                  ? items.filter((i) => !i.isPublished).length
                  : tab.id === "featured"
                  ? items.filter((i) => i.isFeatured).length
                  : items.filter((i) => (i.rating || 5) >= 5).length;

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

        {/* Testimonials List */}
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            <div className="inline-block animate-spin w-6 h-6 border-2 border-[#008744] border-t-transparent rounded-full mb-3" />
            <p className="font-medium">Connecting to live testimonials database...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Quote className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <div className="text-base font-bold text-slate-800 mb-1">No testimonials found</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {searchQuery
                ? `No reviews matching "${searchQuery}". Try clearing search.`
                : "No testimonials in this tab. Click below to add a new client review."}
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Clear Search
              </button>
            ) : (
              <button
                onClick={openCreateModal}
                className="px-4 py-2 rounded-xl bg-[#0C1628] text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
              >
                Create Testimonial
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Client Initials Avatar */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                    {getInitials(item.clientName)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Top Row: Client Name, Company, Stars, Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                        {item.clientName}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-600">
                        {item.clientRole ? `${item.clientRole}, ` : ""}
                        <span className="text-slate-900 font-bold">{item.companyName}</span>
                      </span>

                      {/* 5-Star Rating */}
                      <div className="flex items-center gap-0.5 ml-1">
                        {[...Array(5)].map((_, sIdx) => (
                          <Star
                            key={sIdx}
                            className={`w-3 h-3 ${
                              sIdx < (item.rating || 5)
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Status Pills */}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.isPublished
                            ? "bg-emerald-50 text-[#008744] border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isPublished ? "bg-[#008744]" : "bg-slate-400"
                          }`}
                        />
                        {item.isPublished ? "Published" : "Draft"}
                      </span>

                      {item.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}

                      <span className="text-[10px] font-mono text-slate-400 font-medium">
                        Order #{item.order || idx + 1}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-2 leading-relaxed italic">
                      &ldquo;{item.testimonial}&rdquo;
                    </p>

                    {/* Service Received / Verification Pill */}
                    {item.serviceReceived && (
                      <div className="pt-0.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#008744] bg-emerald-50/70 border border-emerald-200/80 px-2.5 py-0.5 rounded-md">
                          <Check className="w-3 h-3 text-[#008744]" />
                          <span>{item.serviceReceived}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(item)}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      item.isPublished
                        ? "border-emerald-200 bg-emerald-50 text-[#008744] hover:bg-emerald-100"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                    title={item.isPublished ? "Unpublish to Draft" : "Publish to Live Website"}
                  >
                    {item.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer shadow-2xs"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                    title="Delete Testimonial"
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
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    {editingItem ? `Edit: ${editingItem.clientName}` : "Create New Client Testimonial"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Changes reflect live across the public homepage testimonial wall instantly upon saving.
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
                id="testimonial-editor-form"
                onSubmit={handleSave}
                className="lg:col-span-7 space-y-4 text-left"
              >
                {/* Client Name & Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Client Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Company / Agency Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Apex Performance Labs"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                  </div>
                </div>

                {/* Client Role & Service Received */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Client Role / Title
                    </label>
                    <input
                      type="text"
                      value={formData.clientRole}
                      onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                      placeholder="e.g. Managing Partner"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Service Received / Verified Pill
                    </label>
                    <input
                      type="text"
                      value={formData.serviceReceived}
                      onChange={(e) => setFormData({ ...formData, serviceReceived: e.target.value })}
                      placeholder="e.g. Performance Ad Ops & Billing"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                  </div>
                </div>

                {/* Rating & Display Order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Star Rating (1 to 5)
                    </label>
                    <div className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= formData.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-auto text-xs font-bold text-slate-700">
                        {formData.rating}.0 / 5.0
                      </span>
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Testimonial Quote <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.testimonial}
                    onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                    placeholder="Enter the full verified client review or quote..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>Keep quotes punchy and focused on agency ROI or time saved.</span>
                    <span>{formData.testimonial.length} characters</span>
                  </div>
                </div>

                {/* Visibility Toggles */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isPublishedToggle"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded text-[#008744] focus:ring-[#008744] cursor-pointer"
                    />
                    <label htmlFor="isPublishedToggle" className="cursor-pointer">
                      <div className="text-xs font-bold text-slate-900">Publish Live on Website</div>
                      <div className="text-[11px] text-slate-500">
                        When enabled, review is visible immediately on the homepage and review walls.
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                    <input
                      type="checkbox"
                      id="isFeaturedToggle"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 cursor-pointer"
                    />
                    <label htmlFor="isFeaturedToggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                      Featured Badge
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
                      Live Website Card Preview
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#008744] border border-emerald-200">
                      Exact Public Replica
                    </span>
                  </div>

                  {/* Public Card Mockup */}
                  <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-lg relative flex flex-col justify-between text-left group">
                    <div>
                      {/* Top Row: Client Initials Avatar + 5 Stars */}
                      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#0C1628] text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                            {getInitials(formData.clientName)}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 tracking-tight">
                              {formData.clientName || "Client Name"}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {formData.companyName || "Client Agency"}
                            </div>
                          </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className={`w-3.5 h-3.5 ${
                                sIdx < (formData.rating || 5)
                                  ? "fill-current"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Direct Quote */}
                      <p className="text-xs sm:text-[13px] font-medium text-slate-700 leading-relaxed italic mb-5">
                        &ldquo;{formData.testimonial || "Enter testimonial quote in the left form to preview in real-time..."}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Row: Verified Metric Badge */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#008744] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <Check className="w-3 h-3 text-[#008744]" />
                        <span>{formData.serviceReceived || "Verified Client Review"}</span>
                      </div>

                      <span className="text-[10px] font-mono text-slate-400">
                        Order #{formData.order}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#008744] shrink-0 mt-0.5" />
                    <span>
                      This preview updates live as you type. Once published, it synchronizes with the Homepage Social Proof Carousel and client proof widgets across the website.
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
                  type="submit"
                  form="testimonial-editor-form"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#008744] text-white text-xs font-bold hover:bg-[#007038] transition-all cursor-pointer shadow-sm disabled:opacity-50"
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
              Restore Canonical Testimonials?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              This action will safely restore the 5 canonical live client reviews (Marcus Vance, Elena Rostova, Arjun Mehta, David Sterling, and Sophie Laurent) to their factory defaults. Any custom edits or draft testimonials will be replaced.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-6 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                <span>Restores 5 Verified Enterprise Agency Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pl-6">
                <span>100% synchronized with the live homepage social proof wall.</span>
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
              Delete Testimonial?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Are you sure you want to remove the testimonial from{" "}
              <strong className="text-slate-900">{deleteTarget.clientName}</strong> ({deleteTarget.companyName})? This will unpublish it from the live website.
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
                {isDeleting ? "Deleting..." : "Delete Testimonial"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
