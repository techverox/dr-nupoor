"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { TestimonialItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { notifyLiveSync, subscribeLiveSync } from "@/lib/sync/clientSync";
import PatientStoryQRCode from "@/components/doctor/PatientStoryQRCode";
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
  User,
  Quote,
  ShieldCheck,
  Check,
  QrCode,
  Printer,
  Heart,
  Video,
  Camera,
  MapPin,
  Clock,
  Phone,
  Mail,
  AlertTriangle,
  FileText,
  BadgeAlert,
} from "lucide-react";

const FILTER_TABS = [
  { id: "pending", label: "Pending Review" },
  { id: "approved", label: "Approved & Live" },
  { id: "all", label: "All Submissions" },
  { id: "featured", label: "Featured on Homepage" },
  { id: "five_star", label: "5-Star Ratings" },
  { id: "video", label: "Video Stories" },
];

const CATEGORIES = [
  "Breast Cancer",
  "Oncoplastic Surgery",
  "Breast Reconstruction",
  "Benign Conditions",
  "Early Detection",
  "General Care",
];

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // QR Standee Modal State
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    clientName: "",
    realName: "",
    isAnonymous: false,
    city: "Ahmedabad",
    category: "Early Detection",
    rating: 5,
    testimonial: "",
    serviceReceived: "Early Detection",
    order: 1,
    isFeatured: true,
    isPublished: true,
    status: "approved" as "approved" | "pending" | "rejected",
    videoUrl: "",
    photoUrl: "",
    phone: "",
    email: "",
    verifiedConsent: true,
    adminNotes: "",
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

    // Real-time synchronization: updates live when a patient scans QR and submits!
    const unsub = subscribeLiveSync((event) => {
      if (event.collection === "testimonials" || event.type === "CMS_MUTATION") {
        fetchTestimonials();
      }
    });

    return () => unsub();
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
      realName: "",
      isAnonymous: false,
      city: "Ahmedabad",
      category: "Early Detection",
      rating: 5,
      testimonial: "",
      serviceReceived: "Early Detection",
      order: items.length + 1,
      isFeatured: true,
      isPublished: true,
      status: "approved",
      videoUrl: "",
      photoUrl: "",
      phone: "",
      email: "",
      verifiedConsent: true,
      adminNotes: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      clientName: item.clientName || "",
      realName: item.realName || "",
      isAnonymous: item.isAnonymous ?? false,
      city: item.city || "Ahmedabad",
      category: item.category || item.clientRole || "Breast Cancer",
      rating: item.rating || 5,
      testimonial: item.testimonial || "",
      serviceReceived: item.serviceReceived || item.category || "Clinical Care",
      order: item.order || 1,
      isFeatured: item.isFeatured ?? true,
      isPublished: item.isPublished ?? true,
      status: (item.status as "approved" | "pending" | "rejected") || (item.isPublished ? "approved" : "pending"),
      videoUrl: item.videoUrl || "",
      photoUrl: item.photoUrl || item.clientAvatar || "",
      phone: item.phone || "",
      email: item.email || "",
      verifiedConsent: item.verifiedConsent ?? true,
      adminNotes: item.adminNotes || "",
    });
    setIsModalOpen(true);
  };

  // 1-Click Approve Action
  const handleApprove = async (item: TestimonialItem) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "approve",
          id: item.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("testimonials", item.id);
        setFeedback({
          message: `Story from "${item.clientName}" is approved and published live to website!`,
          type: "success",
        });
        fetchTestimonials();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Approval failed.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error approving story.", type: "error" });
    }
  };

  // 1-Click Reject Action
  const handleReject = async (item: TestimonialItem) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reject",
          id: item.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("testimonials", item.id);
        setFeedback({
          message: `Story from "${item.clientName}" has been rejected and archived.`,
          type: "success",
        });
        fetchTestimonials();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch {
      setFeedback({ message: "Network error rejecting story.", type: "error" });
    }
  };

  // Toggle Live Published Status
  const handleTogglePublish = async (item: TestimonialItem) => {
    try {
      const nextStatus = !item.isPublished;
      setItems((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, isPublished: nextStatus } : t))
      );

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "togglePublish",
          id: item.id,
          isPublished: nextStatus,
        }),
      });

      if (res.ok) {
        notifyLiveSync("testimonials", item.id);
        setFeedback({
          message: `"${item.clientName}" is now ${nextStatus ? "Published Live" : "Unpublished (Draft)"}.`,
          type: "success",
        });
        setTimeout(() => setFeedback(null), 3000);
      }
      fetchTestimonials();
    } catch (e) {
      console.error("[AdminTestimonials] Toggle error:", e);
      fetchTestimonials();
    }
  };

  // Toggle Featured on Homepage
  const handleToggleFeatured = async (item: TestimonialItem) => {
    try {
      const nextFeatured = !item.isFeatured;
      setItems((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, isFeatured: nextFeatured } : t))
      );

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggleFeatured",
          id: item.id,
          isFeatured: nextFeatured,
        }),
      });

      if (res.ok) {
        notifyLiveSync("testimonials", item.id);
        setFeedback({
          message: `"${item.clientName}" ${nextFeatured ? "featured on homepage" : "removed from homepage feature"}.`,
          type: "success",
        });
        setTimeout(() => setFeedback(null), 3000);
      }
      fetchTestimonials();
    } catch (e) {
      console.error("[AdminTestimonials] Toggle featured error:", e);
      fetchTestimonials();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.testimonial.trim()) {
      setFeedback({ message: "Patient name and review text are required.", type: "error" });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        id: editingItem ? editingItem.id : undefined,
        clientName: formData.clientName.trim(),
        realName: formData.realName.trim() || undefined,
        isAnonymous: formData.isAnonymous,
        city: formData.city.trim(),
        category: formData.category,
        clientRole: formData.category,
        companyName: "Patient Care Journey",
        rating: Number(formData.rating),
        testimonial: formData.testimonial.trim(),
        serviceReceived: formData.serviceReceived.trim() || formData.category,
        order: Number(formData.order) || 1,
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished,
        status: formData.status,
        videoUrl: formData.videoUrl.trim() || undefined,
        photoUrl: formData.photoUrl.trim() || undefined,
        mediaType: formData.videoUrl.trim() ? "video" : formData.photoUrl ? "photo" : "text",
        phone: formData.phone.trim() || undefined,
        email: formData.email.trim() || undefined,
        verifiedConsent: formData.verifiedConsent,
        adminNotes: formData.adminNotes.trim() || undefined,
      };

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        notifyLiveSync("testimonials", data.id || payload.id);
        setFeedback({
          message: editingItem ? "Patient story updated & synced live!" : "New story created & saved successfully!",
          type: "success",
        });
        setIsModalOpen(false);
        fetchTestimonials();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to save story.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminTestimonials] Save error:", e);
      setFeedback({ message: "An unexpected network error occurred.", type: "error" });
    } finally {
      setIsSaving(false);
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
        notifyLiveSync("testimonials", deleteTarget.id);
        setFeedback({ message: `Review "${deleteTarget.clientName}" deleted successfully.`, type: "success" });
        setDeleteTarget(null);
        fetchTestimonials();
        setTimeout(() => setFeedback(null), 3500);
      } else {
        setFeedback({ message: data.error || "Delete failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminTestimonials] Delete error:", e);
      setFeedback({ message: "Failed to delete review.", type: "error" });
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
        notifyLiveSync("testimonials", "all");
        setFeedback({
          message: "All patient stories successfully reset to clinical live defaults!",
          type: "success",
        });
        setIsResetConfirmOpen(false);
        fetchTestimonials();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to reset.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminTestimonials] Reset error:", e);
      setFeedback({ message: "Failed to reset stories.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    const total = items.length;
    const pending = items.filter((i) => i.status === "pending" || (!i.status && !i.isPublished)).length;
    const published = items.filter((i) => i.isPublished && i.status !== "pending" && i.status !== "rejected").length;
    const featured = items.filter((i) => i.isFeatured && i.isPublished).length;
    const videos = items.filter((i) => Boolean(i.videoUrl) || i.mediaType === "video").length;
    const avgRating = total > 0 ? (items.reduce((acc, curr) => acc + (curr.rating || 5), 0) / total).toFixed(1) : "5.0";
    return { total, pending, published, featured, videos, avgRating };
  }, [items]);

  // Filtered Stories
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Tab Filter
      if (activeTab === "pending") {
        if (item.status !== "pending" && (item.isPublished || item.status === "rejected")) return false;
      } else if (activeTab === "approved") {
        if (!item.isPublished || item.status === "pending" || item.status === "rejected") return false;
      } else if (activeTab === "featured" && !item.isFeatured) {
        return false;
      } else if (activeTab === "five_star" && item.rating !== 5) {
        return false;
      } else if (activeTab === "video" && !item.videoUrl && item.mediaType !== "video") {
        return false;
      }

      // 2. Category Filter
      if (selectedCategoryFilter !== "all") {
        const itemCat = (item.category || item.clientRole || "").toLowerCase();
        if (!itemCat.includes(selectedCategoryFilter.toLowerCase())) return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = (item.clientName || "").toLowerCase().includes(query);
        const matchReal = (item.realName || "").toLowerCase().includes(query);
        const matchCity = (item.city || "").toLowerCase().includes(query);
        const matchText = (item.testimonial || "").toLowerCase().includes(query);
        const matchRole = (item.clientRole || item.category || "").toLowerCase().includes(query);
        return matchName || matchReal || matchCity || matchText || matchRole;
      }

      return true;
    });
  }, [items, activeTab, selectedCategoryFilter, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all transform animate-in slide-in-from-bottom duration-300 ${
            feedback.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
          <button
            onClick={() => setFeedback(null)}
            className="ml-2 hover:opacity-80 p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D84C70] to-[#BE3A5C] flex items-center justify-center text-white shadow-sm">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Patient Reviews &amp; Stories Management
              </h1>
              <p className="text-sm text-slate-500">
                Moderate, approve, edit, and publish patient reviews submitted via QR code and website.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* QR Standee Button */}
          <button
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#8B2346] bg-[#FFF0F3] hover:bg-rose-100 border border-[#F5D6DE] transition-colors cursor-pointer shadow-xs"
          >
            <QrCode className="w-4 h-4 text-[#D84C70]" />
            <span>Clinic QR Standee</span>
          </button>

          {/* Reset Canonical */}
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
            title="Reset stories to live defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>

          {/* View Public Live Page */}
          <Link
            href="/patient-stories"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-[#D84C70] bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>Live Stories Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          {/* Add New Story */}
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Patient Story</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* 1. Pending Moderation (High Priority Alert) */}
        <div
          onClick={() => setActiveTab("pending")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            metrics.pending > 0
              ? "bg-amber-50/70 border-amber-200 hover:border-amber-400 shadow-xs"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-amber-800 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Pending Review</span>
            </span>
            {metrics.pending > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            )}
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {metrics.pending}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {metrics.pending > 0 ? "Awaiting your approval" : "All reviews moderated"}
          </div>
        </div>

        {/* 2. Live on Website */}
        <div
          onClick={() => setActiveTab("approved")}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Published Live</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {metrics.published}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Active on website
          </div>
        </div>

        {/* 3. Featured on Homepage */}
        <div
          onClick={() => setActiveTab("featured")}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium text-[#D84C70] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D84C70]" />
              <span>Homepage Feature</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {metrics.featured}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            On main homepage carousel
          </div>
        </div>

        {/* 4. Average Rating */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium text-amber-700 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Average Rating</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {metrics.avgRating} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Across {metrics.total} submissions
          </div>
        </div>

        {/* 5. Video Stories */}
        <div
          onClick={() => setActiveTab("video")}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium text-indigo-700 flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-indigo-600" />
              <span>Video Stories</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {metrics.videos}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Patient video reflections
          </div>
        </div>

      </div>

      {/* Tabs & Search Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {FILTER_TABS.map((tab) => {
              const isPending = tab.id === "pending";
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#D84C70] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isPending && metrics.pending > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-200 text-rose-900 text-[10px] font-bold">
                      {metrics.pending}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient, city, review..."
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#D84C70] text-slate-800"
            />
          </div>

        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 mr-1 text-[11px] font-medium">Category:</span>
          <button
            type="button"
            onClick={() => setSelectedCategoryFilter("all")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
              selectedCategoryFilter === "all"
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                selectedCategoryFilter === cat
                  ? "bg-[#D84C70] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stories / Testimonials Moderation List */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-[#D84C70] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Connecting to live patient stories database...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquareQuote className="w-8 h-8 text-[#D84C70]" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">No reviews found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed">
            {searchQuery
              ? `No stories matched "${searchQuery}". Try a different keyword.`
              : activeTab === "pending"
              ? "All submitted reviews have been moderated. New QR submissions will appear here automatically."
              : "No reviews found in this view. Click below to add a manual story or scan the QR code."}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Story</span>
            </button>
            <button
              type="button"
              onClick={() => setIsQrModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Show QR Code</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isPending = item.status === "pending" || (!item.status && !item.isPublished);
            const isApproved = item.isPublished && item.status !== "pending" && item.status !== "rejected";
            const isRejected = item.status === "rejected";

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all shadow-xs hover:shadow-md ${
                  isPending
                    ? "border-amber-300 bg-amber-50/20"
                    : "border-slate-200 hover:border-[#D84C70]"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  
                  {/* Left Story Information */}
                  <div className="flex-1 space-y-3">
                    
                    {/* Header: Badges & Rating */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      
                      {/* Moderation Status Badge */}
                      {isPending ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending Approval</span>
                        </span>
                      ) : isApproved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Approved &amp; Live</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          <XCircle className="w-3 h-3 text-slate-500" />
                          <span>Rejected / Archived</span>
                        </span>
                      )}

                      {/* Category Badge */}
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF0F3] text-[#D84C70] border border-[#F5D6DE]">
                        {item.category || item.clientRole || "Breast Care"}
                      </span>

                      {/* City Badge */}
                      {item.city && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{item.city}</span>
                        </span>
                      )}

                      {/* Featured Star */}
                      {item.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-[#D84C70]">
                          <Sparkles className="w-3 h-3" />
                          <span>Homepage Featured</span>
                        </span>
                      )}

                      {/* Video Story Indicator */}
                      {(item.videoUrl || item.mediaType === "video") && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                          <Video className="w-3 h-3 text-indigo-600" />
                          <span>Video Story</span>
                        </span>
                      )}

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 ml-auto">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= (item.rating || 5)
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200 fill-slate-100"
                            }`}
                          />
                        ))}
                      </div>

                    </div>

                    {/* Patient Name & Real Identity info */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.photoUrl || item.clientAvatar || "/images/doctor/assets/patient-avatar-1.png"}
                          alt={item.clientName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-[15px] font-bold text-slate-900 leading-tight">
                            {item.clientName}
                          </h4>
                          {item.isAnonymous && item.realName && (
                            <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              Real: <span className="font-semibold text-slate-700">{item.realName}</span> (Confidential)
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[11.5px] text-slate-500 mt-0.5">
                          {item.verifiedConsent && (
                            <span className="inline-flex items-center gap-1 text-emerald-700">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Verified Patient Consent</span>
                            </span>
                          )}
                          {item.phone && (
                            <span className="inline-flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{item.phone}</span>
                            </span>
                          )}
                          {item.email && (
                            <span className="inline-flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span>{item.email}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Review Quote */}
                    <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                      <p className="text-[13.5px] text-slate-700 leading-relaxed italic">
                        &ldquo;{item.testimonial}&rdquo;
                      </p>
                      {item.videoUrl && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center gap-2">
                          <a
                            href={item.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1 rounded-lg transition-colors"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Watch Video Story ({item.videoUrl})</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Admin Notes if present */}
                    {item.adminNotes && (
                      <div className="text-[12px] text-slate-600 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200">
                        <span className="font-semibold text-amber-900">Dr. Patel Notes: </span>
                        <span>{item.adminNotes}</span>
                      </div>
                    )}

                  </div>

                  {/* Right Actions Bar */}
                  <div className="flex lg:flex-col items-center lg:items-end gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    
                    {/* Primary Decision Action for Pending Reviews */}
                    {isPending ? (
                      <div className="flex items-center gap-2 w-full lg:w-auto">
                        <button
                          type="button"
                          onClick={() => handleApprove(item)}
                          className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve &amp; Publish</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(item)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      /* Live Publish Toggle */
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(item)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          item.isPublished
                            ? "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        }`}
                      >
                        {item.isPublished ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                            <span>Unpublish (Draft)</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Publish Live</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Secondary Actions: Feature on Homepage, Edit, Delete */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(item)}
                        className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                          item.isFeatured
                            ? "bg-rose-50 text-[#D84C70] border border-rose-200"
                            : "bg-slate-50 text-slate-400 hover:text-slate-600"
                        }`}
                        title={item.isFeatured ? "Featured on homepage" : "Feature on homepage"}
                      >
                        <Star className={`w-4 h-4 ${item.isFeatured ? "fill-[#D84C70]" : ""}`} />
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-xl text-slate-600 hover:text-[#D84C70] hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Edit Story"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 1. CLINICAL STORY EDITOR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingItem ? "Edit Patient Story / Review" : "Add Patient Story"}
                </h3>
                <p className="text-xs text-slate-500">
                  Configure clinical category, verified consent, patient identity, and moderation status.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form id="testimonial-editor-form" onSubmit={handleSave} className="space-y-5">
              
              {/* Patient Display Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Public Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Patient from Ahmedabad or Priya S."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#D84C70]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Ahmedabad, Surat, Rajkot"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#D84C70]"
                  />
                </div>
              </div>

              {/* Real Name & Anonymous Flag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Confidential Real Name (Private)
                  </label>
                  <input
                    type="text"
                    value={formData.realName}
                    onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
                    placeholder="e.g. Priya Shah (Only Dr. Patel sees this)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#D84C70]"
                  />
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="modal-anonymous"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    className="rounded text-[#D84C70] focus:ring-[#D84C70] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="modal-anonymous" className="text-xs text-slate-700 font-medium cursor-pointer">
                    Display Anonymously on Website
                  </label>
                </div>
              </div>

              {/* Category & Star Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Clinical Care Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, serviceReceived: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#D84C70] bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Star Rating (1 to 5)
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-200 fill-slate-100"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">
                      {formData.rating} / 5 Stars
                    </span>
                  </div>
                </div>
              </div>

              {/* Story Narrative Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Story / Review Narrative *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  placeholder="The patient's journey, feedback, or recovery story..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#D84C70] leading-relaxed"
                />
              </div>

              {/* Video URL & Photo URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Video Story Link (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#D84C70]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-[#D84C70]" />
                    <span>Photo URL or Avatar (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    placeholder="/images/doctor/assets/patient-avatar-1.png"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#D84C70]"
                  />
                </div>
              </div>

              {/* Status & Governance Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FFF8F9] p-4 rounded-2xl border border-[#F5D6DE]">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Moderation Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => {
                      const nextStatus = e.target.value as "approved" | "pending" | "rejected";
                      setFormData({
                        ...formData,
                        status: nextStatus,
                        isPublished: nextStatus === "approved",
                      });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-semibold"
                  >
                    <option value="approved">Approved &amp; Live</option>
                    <option value="pending">Pending Review</option>
                    <option value="rejected">Rejected / Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="modal-featured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-[#D84C70] focus:ring-[#D84C70] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="modal-featured" className="text-xs text-slate-700 font-semibold cursor-pointer">
                    Feature on Homepage
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="modal-consent"
                    checked={formData.verifiedConsent}
                    onChange={(e) => setFormData({ ...formData, verifiedConsent: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-600 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="modal-consent" className="text-xs text-slate-700 font-semibold cursor-pointer">
                    Verified Consent Confirmed
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save &amp; Sync Live</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 2. CLINIC QR STANDEE PRINT & DOWNLOAD MODAL */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100">
            
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Standee Content Ready to Print */}
            <div id="clinic-standee-printable" className="text-center p-4 rounded-2xl border border-[#F5D6DE] bg-gradient-to-b from-[#FFF8F9] to-white">
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#D84C70] flex items-center justify-center text-white text-xs font-bold">
                  DP
                </div>
                <span className="text-[12px] font-bold tracking-widest uppercase text-[#D84C70]">
                  DR. NOOPUR PATEL
                </span>
              </div>

              <h3 className="font-serif text-[22px] font-bold text-slate-900 leading-tight">
                Share Your Healing Journey
              </h3>
              <p className="text-[11.5px] text-slate-500 mb-4">
                Consultant Breast Cancer &amp; Oncoplastic Surgeon • Marengo CIMS Hospital
              </p>

              {/* Scannable High-Res QR Code */}
              <div className="flex justify-center mb-4">
                <PatientStoryQRCode
                  size={210}
                  showCardWrapper={false}
                />
              </div>

              <div className="space-y-1 text-slate-700 text-xs">
                <p className="font-semibold text-slate-900">
                  Scan this QR code with any smartphone camera
                </p>
                <p className="text-slate-500 text-[11px]">
                  Write your review or record your experience. Option to stay anonymous is available.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-100 text-[10px] text-slate-400">
                Official Patient Experience Portal • drnoopurpatel.com/share-story
              </div>

            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Print Standee</span>
              </button>

              <Link
                href="/share-story"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Submission Page</span>
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* 3. DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 text-center mb-1">
              Delete Patient Review?
            </h3>
            <p className="text-xs text-slate-500 text-center mb-6 leading-relaxed">
              Are you sure you want to permanently delete the review from &ldquo;{deleteTarget.clientName}&rdquo;? 
              This will remove it from both admin and website.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. RESET TO CANONICAL DEFAULTS MODAL */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 text-center mb-1">
              Restore Clinical Patient Stories?
            </h3>
            <p className="text-xs text-slate-500 text-center mb-6 leading-relaxed">
              This action restores the curated medical patient stories (Early Detection, Benign Conditions, Oncoplastic Surgery, Breast Reconstruction, Video Journey) to live defaults.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isResetting}
                onClick={() => setIsResetConfirmOpen(false)}
                className="py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isResetting}
                onClick={handleResetToDefaults}
                className="py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-sm"
              >
                {isResetting ? "Restoring..." : "Restore Defaults"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
