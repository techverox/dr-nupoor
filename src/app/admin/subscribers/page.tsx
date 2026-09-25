"use client";

import React, { useState, useEffect, useCallback } from "react";
import { NewsletterSubscriber } from "@/types";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  Users,
  UserCheck,
  UserMinus,
  Search,
  Download,
  Trash2,
  CheckCircle2,
  X,
  Mail,
  RotateCcw,
  RefreshCw,
  UserPlus,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Layers,
  Activity,
  Loader2,
  HeartPulse,
} from "lucide-react";

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // New Subscriber Form State
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newSource, setNewSource] = useState("Admin Manual Enrollment");
  const [formError, setFormError] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/subscribers?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers || []);
      }
    } catch (err) {
      console.error("Failed to load subscribers:", err);
      setErrorMessage("Failed to load subscribers from server.");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  // 1-Click Status Toggle (Active <-> Unsubscribed)
  const handleToggleStatus = async (sub: NewsletterSubscriber) => {
    setActionLoading(sub.id);
    const newStatus = sub.status === "active" ? "unsubscribed" : "active";
    try {
      const res = await fetch(`/api/admin/subscribers/${sub.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) =>
          prev.map((s) => (s.id === sub.id ? { ...s, status: newStatus } : s))
        );
        showToast(
          newStatus === "active"
            ? `✅ ${sub.email} reactivated as Active Subscriber!`
            : `⏸️ ${sub.email} marked as Unsubscribed.`
        );
      } else {
        alert(data.error || "Failed to update subscriber.");
      }
    } catch {
      alert("Network error occurred.");
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Subscriber
  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
        setDeleteConfirmId(null);
        showToast("🗑️ Subscriber removed successfully.");
      } else {
        alert(data.error || "Failed to delete subscriber.");
      }
    } catch {
      alert("Network error occurred.");
    } finally {
      setActionLoading(null);
    }
  };

  // 1-Click Reset to Defaults
  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers || []);
        setShowResetModal(false);
        showToast("✅ Audience Contacts Restored to Dr. Noopur Patel's Clinical Baseline!");
      } else {
        alert(data.error || "Failed to reset subscribers.");
      }
    } catch {
      alert("Failed to connect to reset endpoint.");
    } finally {
      setIsResetting(false);
    }
  };

  // Add Subscriber Form Submission
  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setFormError("");
    setIsAdding(true);

    try {
      const res = await fetch("/api/admin/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          subscriber: {
            email: newEmail.trim(),
            name: newName.trim() || undefined,
            source: newSource,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewName("");
        setNewEmail("");
        fetchSubscribers();
        showToast(`🎉 ${newEmail} enrolled into Breast Care & Health Bulletins!`);
      } else {
        setFormError(data.error || "Failed to add subscriber.");
      }
    } catch {
      setFormError("Network error occurred.");
    } finally {
      setIsAdding(false);
    }
  };

  const totalActive = subscribers.filter((s) => s.status === "active").length;
  const totalUnsub = subscribers.filter((s) => s.status === "unsubscribed").length;
  const totalCount = subscribers.length;
  const retentionRate = totalCount > 0 ? Math.round((totalActive / totalCount) * 100) : 100;

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[350] max-w-md bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 font-bold text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="leading-snug">{toastMessage}</p>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-black text-[11px] tracking-wider uppercase">
                Patient Outreach & Awareness
              </span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Audience Synced (Real Patient & Website Data)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Newsletter Subscribers
            </h1>

            <p className="text-sm text-slate-600 max-w-2xl">
              Manage verified reader and patient subscribers, screening awareness recipients, and health bulletin broadcasts.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Refresh Button */}
            <button
              onClick={() => {
                fetchSubscribers();
                showToast("🔄 Subscriber list refreshed with latest live events!");
              }}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh subscribers"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-rose-600" : ""}`} />
              <span>Refresh</span>
            </button>

            {/* 1-Click Reset to Defaults Button */}
            <button
              onClick={() => setShowResetModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 font-bold text-xs hover:bg-amber-100 shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
              <span>Reset to Defaults</span>
            </button>

            {/* Add Subscriber Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm shadow-rose-200 transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Enroll Subscriber</span>
            </button>

            {/* 1-Click Export CSV Button */}
            <a
              href="/api/admin/subscribers?export=csv"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Bento Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Audience */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between gap-3 hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Total Audience
            </span>
            <div className="p-2 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {totalCount}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">
              Registered subscribers receiving breast health updates
            </p>
          </div>
        </div>

        {/* Card 2: Active Recipients */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between gap-3 hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Active Recipients
            </span>
            <div className="p-2 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-700 tracking-tight">
              {totalActive}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">
              Receiving Breast Cancer Care & Screening bulletins
            </p>
          </div>
        </div>

        {/* Card 3: Unsubscribed */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between gap-3 hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Unsubscribed
            </span>
            <div className="p-2 rounded-2xl bg-slate-100 text-slate-600 border border-slate-200">
              <UserMinus className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-700 tracking-tight">
              {totalUnsub}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">
              Contacts who opted out of newsletter updates
            </p>
          </div>
        </div>

        {/* Card 4: Audience Retention */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between gap-3 hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Audience Health
            </span>
            <div className="p-2 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
              <HeartPulse className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-rose-700 tracking-tight">
              {retentionRate}%
            </div>
            <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">
              Active retention rate across clinical outreach lifecycle
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Instant Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by email, name, source, or campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-900 transition-all"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Contacts", count: totalCount },
            { id: "active", label: "Active", count: totalActive },
            { id: "unsubscribed", label: "Unsubscribed", count: totalUnsub },
          ].map((pill) => {
            const isActive = statusFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setStatusFilter(pill.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-rose-600 text-white shadow-sm shadow-rose-200"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{pill.label}</span>
                <span className="ml-1.5 opacity-80">({pill.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subscribers Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-rose-600" />
            <p className="text-xs font-bold">Loading verified subscribers...</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No subscribers found matching your filter
            </h3>
            <p className="text-xs max-w-sm mx-auto text-slate-500">
              Try changing your search keywords or click &quot;Reset to Defaults&quot; to restore clinical audience data.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50">
                  <th className="py-3.5 pl-6 pr-4">Subscriber</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Acquisition Source</th>
                  <th className="py-3.5 px-4">Campaign Attribution</th>
                  <th className="py-3.5 px-4">Subscribed At</th>
                  <th className="py-3.5 pr-6 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.map((sub) => {
                  const isActive = sub.status === "active";
                  const dateFormatted = new Date(sub.subscribedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Subscriber Contact */}
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                            {sub.name ? sub.name[0].toUpperCase() : sub.email[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{sub.email}</span>
                            </div>
                            {sub.name && (
                              <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                                {sub.name}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase ${
                            isActive
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                            }`}
                          />
                          <span>{isActive ? "ACTIVE" : "UNSUBSCRIBED"}</span>
                        </span>
                      </td>

                      {/* Source */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800">
                          {sub.source || "Website Footer"}
                        </div>
                        {sub.landingPageSlug && (
                          <div className="text-[10px] font-mono text-rose-600 mt-0.5">
                            /{sub.landingPageSlug}
                          </div>
                        )}
                      </td>

                      {/* Campaign */}
                      <td className="py-4 px-4">
                        {sub.utmCampaign ? (
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md font-bold text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                              {sub.utmCampaign}
                            </span>
                            {sub.utmSource && (
                              <div className="text-[10px] text-slate-500 mt-1">
                                {sub.utmSource} {sub.utmMedium && `• ${sub.utmMedium}`}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-medium">Direct / Organic</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-slate-600 font-medium">
                        {dateFormatted}
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          {/* 1-Click Status Toggle */}
                          <button
                            onClick={() => handleToggleStatus(sub)}
                            disabled={actionLoading === sub.id}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50 ${
                              isActive
                                ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {actionLoading === sub.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin mx-2" />
                            ) : isActive ? (
                              "Pause Broadcast"
                            ) : (
                              "Reactivate"
                            )}
                          </button>

                          {/* Delete */}
                          {deleteConfirmId === sub.id ? (
                            <div className="inline-flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150">
                              <button
                                onClick={() => handleDelete(sub.id)}
                                disabled={actionLoading === sub.id}
                                className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(sub.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                              title="Delete Contact"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 1-Click Reset to Defaults Confirm Dialog */}
      <ConfirmDialog
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleResetToDefaults}
        title="Restore Clinical Audience Baseline?"
        message={`This will reset newsletter subscribers to Dr. Noopur Patel's verified clinical audience baseline across all breast care guides, health journals, and consultation desks.\n\nAll subscriber records, attribution sources, and statuses will be immediately synchronized.`}
        confirmLabel="Reset Audience Data"
        isLoading={isResetting}
      />

      {/* Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Enroll New Subscriber
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubscriber} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. patient@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Acquisition Source
                </label>
                <select
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-900 cursor-pointer"
                >
                  <option value="Admin Manual Enrollment">Admin Manual Enrollment</option>
                  <option value="Website Footer Newsletter">Website Footer Newsletter</option>
                  <option value="Breast Health Journal: Article Subscriber">Breast Health Journal: Article Subscriber</option>
                  <option value="Homepage Breast Health Bulletin">Homepage Breast Health Bulletin</option>
                  <option value="Self-Breast Exam Guide Download">Self-Breast Exam Guide Download</option>
                  <option value="Second Opinion Consultation Desk">Second Opinion Consultation Desk</option>
                </select>
              </div>

              {formError && (
                <p className="text-xs text-rose-600 font-bold">{formError}</p>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm shadow-rose-200 cursor-pointer flex items-center gap-2 transition-all"
                >
                  {isAdding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Enroll Contact</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
