"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { LeadItem, LeadStatus } from "@/types/lead";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { 
  FileText, 
  Download, 
  Users, 
  UserPlus, 
  CheckCircle2, 
  Trophy, 
  Search, 
  X, 
  Mail, 
  Phone, 
  MessageCircle, 
  Trash2, 
  Calendar,
  ChevronRight,
  RotateCcw,
  Plus,
  Clock,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ArrowUpRight,
  Layers
} from "lucide-react";

const STATUS_CONFIG: Record<LeadStatus, { label: string; badgeClass: string; dotClass: string }> = {
  new: {
    label: "New Inquiry",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
    dotClass: "bg-blue-500",
  },
  contacted: {
    label: "Contacted",
    badgeClass: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800",
    dotClass: "bg-indigo-500",
  },
  follow_up: {
    label: "Follow-up",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
    dotClass: "bg-amber-500",
  },
  qualified: {
    label: "Qualified",
    badgeClass: "bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-400 border border-teal-200 dark:border-teal-800",
    dotClass: "bg-teal-500",
  },
  converted: {
    label: "Converted Client",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800",
    dotClass: "bg-emerald-500",
  },
  lost: {
    label: "Archived / Lost",
    badgeClass: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800",
    dotClass: "bg-rose-500",
  },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Selected Lead Modal / Side-by-Side Drawer
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>("");
  const [isUpdatingLead, setIsUpdatingLead] = useState<boolean>(false);

  // Quick Add Lead Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadService, setNewLeadService] = useState("Performance Marketing & Paid Ads");
  const [newLeadMessage, setNewLeadMessage] = useState("");
  const [newLeadStatus, setNewLeadStatus] = useState<LeadStatus>("new");
  const [isSubmittingNewLead, setIsSubmittingNewLead] = useState(false);
  const [addLeadError, setAddLeadError] = useState("");

  // 1-Click Reset to Defaults State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Delete Lead Dialog
  const [deleteTarget, setDeleteTarget] = useState<LeadItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Toast feedback
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      } else {
        setFeedback({ message: data.error || "Failed to load leads.", type: "error" });
      }
    } catch (err) {
      console.error("Error loading leads:", err);
      setFeedback({ message: "Network error loading inquiries.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Update lead status, follow up date, or internal note
  const handleUpdateLead = async (
    leadId: string,
    updates: { status?: LeadStatus; followUpDate?: string; note?: string }
  ) => {
    setIsUpdatingLead(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        if (activeLead?.id === leadId) {
          setActiveLead(data.lead);
        }
        if (updates.note) {
          setNewNoteText("");
        }
        setFeedback({ message: "Lead updated in real-time.", type: "success" });
      } else {
        setFeedback({ message: data.error || "Failed to update lead.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error updating lead.", type: "error" });
    } finally {
      setIsUpdatingLead(false);
    }
  };

  // 1-Click Reset to Defaults
  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
        setFeedback({
          message: data.message || "All 6 canonical inquiries have been reset to defaults!",
          type: "success",
        });
        setIsResetModalOpen(false);
      } else {
        setFeedback({ message: data.error || "Failed to reset inquiries.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error resetting inquiries.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Submit Quick Add Lead
  const handleCreateLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadEmail.trim()) {
      setAddLeadError("Name and valid email are required.");
      return;
    }

    setIsSubmittingNewLead(true);
    setAddLeadError("");

    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLeadName.trim(),
          email: newLeadEmail.trim(),
          phone: newLeadPhone.trim(),
          serviceInterestedIn: newLeadService,
          message: newLeadMessage.trim(),
          status: newLeadStatus,
        }),
      });

      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => [data.lead, ...prev]);
        setIsAddModalOpen(false);
        setNewLeadName("");
        setNewLeadEmail("");
        setNewLeadPhone("");
        setNewLeadMessage("");
        setFeedback({
          message: `Inquiry for "${data.lead.name}" added successfully.`,
          type: "success",
        });
      } else {
        setAddLeadError(data.error || "Failed to create lead.");
      }
    } catch {
      setAddLeadError("Network error adding lead.");
    } finally {
      setIsSubmittingNewLead(false);
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
        if (activeLead?.id === deleteTarget.id) {
          setActiveLead(null);
        }
        setDeleteTarget(null);
        setFeedback({ message: "Inquiry deleted successfully.", type: "success" });
      } else {
        setFeedback({ message: data.error || "Failed to delete lead.", type: "error" });
      }
    } catch {
      setFeedback({ message: "Network error deleting lead.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.phone && l.phone.toLowerCase().includes(q)) ||
        (l.serviceInterestedIn && l.serviceInterestedIn.toLowerCase().includes(q)) ||
        (l.source && l.source.toLowerCase().includes(q));

      const matchesStatus = selectedStatus === "all" || l.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, selectedStatus]);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified").length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div>
          <div className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span>Growth & Operations</span>
            <span>/</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">Leads & Inquiries</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
                Leads & Inquiries
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Live Telemetry
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Real-time CRM pipeline captured from website forms, landing pages, and marketing audits.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* 1-Click Reset to Defaults */}
          <button
            type="button"
            id="reset-leads-defaults-btn"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/40 shadow-sm transition-all active:scale-95"
            title="Restore all 6 canonical DigiVigee prospective inquiries"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
            <span>Reset to Defaults</span>
          </button>

          {/* Manage Forms link */}
          <Link
            href="/admin/forms"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-500" />
            <span>Manage Forms</span>
          </Link>

          {/* Export CSV */}
          <a
            href="/api/admin/leads?format=csv"
            download
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-zinc-500" />
            <span>Export CSV</span>
          </a>

          {/* Quick Add Lead Button */}
          <button
            onClick={() => {
              setAddLeadError("");
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-black transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>Add Inquiry</span>
          </button>
        </div>
      </div>

      {/* Bento KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">{totalLeads} Inquiries</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">All-time Pipeline</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-blue-600 dark:text-blue-400">{newLeads} New</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Awaiting Outreach</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-teal-600 dark:text-teal-400">{qualifiedLeads} Qualified</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">High Intent Budget</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{convertedLeads} Converted</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Closed Retainers</div>
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
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by client name, email, phone, or service..."
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

          <div className="flex items-center gap-1.5 flex-wrap w-full lg:w-auto">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-2">
              Status:
            </span>
            {(["all", "new", "contacted", "follow_up", "qualified", "converted", "lost"] as const).map((st) => {
              const isSelected = selectedStatus === st;
              const count = st === "all" ? leads.length : leads.filter((l) => l.status === st).length;

              return (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  <span>{st.replace("_", " ")}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-zinc-900 dark:border-zinc-100 border-t-transparent mb-3" />
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Loading inquiry telemetry...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center px-4">
            <Users className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">No matching inquiries found</h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mt-1">
              Try adjusting your filter or click &ldquo;Reset to Defaults&rdquo; to populate the 6 canonical inquiries.
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
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-zinc-50/80 dark:bg-zinc-800/40 border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase tracking-wider font-bold text-zinc-400">
                  <th className="px-6 py-4">Prospective Client</th>
                  <th className="px-6 py-4">Service & Scope</th>
                  <th className="px-6 py-4">Acquisition Funnel</th>
                  <th className="px-6 py-4">Captured At</th>
                  <th className="px-6 py-4">Workflow Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filteredLeads.map((lead) => {
                  const statusConf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                  const initials = lead.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors group cursor-pointer"
                      onClick={() => setActiveLead(lead)}
                    >
                      {/* Client Contact */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                              {lead.name}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5">
                              <Mail className="w-3 h-3 text-zinc-400" />
                              <span>{lead.email}</span>
                            </div>
                            {lead.phone && (
                              <div className="text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 mt-0.5">
                                <Phone className="w-3 h-3 text-zinc-400" />
                                <span>{lead.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Service Interest */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-200">
                          {lead.serviceInterestedIn || "Strategic Growth Review"}
                        </div>
                        {lead.message && (
                          <div className="text-[11px] text-zinc-400 line-clamp-1 max-w-xs mt-0.5">
                            {lead.message}
                          </div>
                        )}
                      </td>

                      {/* Acquisition Source */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {lead.landingPageSlug ? `/landing/${lead.landingPageSlug}` : lead.source}
                        </span>
                      </td>

                      {/* Date & Follow-Up */}
                      <td className="px-6 py-4">
                        <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                          {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        {lead.followUpDate && (
                          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>Follow up: {lead.followUpDate}</span>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLead(lead.id, { status: e.target.value as LeadStatus })}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${statusConf.badgeClass}`}
                        >
                          {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((st) => (
                            <option key={st} value={st}>
                              {STATUS_CONFIG[st].label}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          )}

                          <button
                            onClick={() => setActiveLead(lead)}
                            className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            title="Inspect Details"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteTarget(lead)}
                            className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                            title="Delete Inquiry"
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
      </div>

      {/* ========================================================================= */}
      {/* SIDE-BY-SIDE LEAD INSPECTION DRAWER / MODAL */}
      {/* ========================================================================= */}
      {activeLead && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start bg-zinc-50/50 dark:bg-zinc-800/20">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-base shadow-md">
                  {activeLead.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                      {activeLead.name}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_CONFIG[activeLead.status]?.badgeClass}`}>
                      {STATUS_CONFIG[activeLead.status]?.label}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-zinc-400" /> {activeLead.email}</span>
                    {activeLead.phone && (
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-zinc-400" /> {activeLead.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveLead(null)}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {/* 1-Click Outreach Buttons */}
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${activeLead.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-sm transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Send Email</span>
                </a>

                {activeLead.phone && (
                  <>
                    <a
                      href={`tel:${activeLead.phone}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-sm transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Call Client</span>
                    </a>

                    <a
                      href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold hover:bg-[#20bd5a] shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Chat</span>
                    </a>
                  </>
                )}
              </div>

              {/* Status & Follow-Up Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Workflow Stage
                  </label>
                  <select
                    value={activeLead.status}
                    onChange={(e) => handleUpdateLead(activeLead.id, { status: e.target.value as LeadStatus })}
                    className="w-full px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-100"
                  >
                    {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((st) => (
                      <option key={st} value={st}>
                        {STATUS_CONFIG[st].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={activeLead.followUpDate || ""}
                    onChange={(e) => handleUpdateLead(activeLead.id, { followUpDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Client Message */}
              {activeLead.message && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Inquiry Scope & Challenges
                  </h4>
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {activeLead.message}
                  </div>
                </div>
              )}

              {/* Attribution Card */}
              <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Attribution Telemetry
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-zinc-400">Source:</span>{" "}
                    <strong className="text-zinc-800 dark:text-zinc-200">{activeLead.source}</strong>
                  </div>
                  {activeLead.landingPageSlug && (
                    <div>
                      <span className="text-zinc-400">Landing Page:</span>{" "}
                      <strong className="text-zinc-800 dark:text-zinc-200">/landing/{activeLead.landingPageSlug}</strong>
                    </div>
                  )}
                  {activeLead.serviceInterestedIn && (
                    <div className="col-span-2">
                      <span className="text-zinc-400">Service:</span>{" "}
                      <strong className="text-zinc-800 dark:text-zinc-200">{activeLead.serviceInterestedIn}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Internal Notes Timeline */}
              <div>
                <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2.5">
                  Internal Agency Notes ({activeLead.notes?.length || 0})
                </h4>

                <div className="space-y-2 mb-3">
                  {(activeLead.notes || []).map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
                    >
                      <div className="flex justify-between items-center text-[11px] text-zinc-400 mb-1">
                        <strong>{note.author}</strong>
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-200 leading-relaxed">{note.note}</p>
                    </div>
                  ))}
                </div>

                {/* Add Note Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an internal progress note..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newNoteText.trim()) {
                        handleUpdateLead(activeLead.id, { note: newNoteText.trim() });
                      }
                    }}
                    className="flex-1 px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (newNoteText.trim()) {
                        handleUpdateLead(activeLead.id, { note: newNoteText.trim() });
                      }
                    }}
                    disabled={!newNoteText.trim() || isUpdatingLead}
                    className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-bold disabled:opacity-40 transition-all"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-between items-center text-xs text-zinc-400">
              <span>Created {new Date(activeLead.createdAt).toLocaleString()}</span>
              <button
                onClick={() => setActiveLead(null)}
                className="px-4 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK ADD LEAD MODAL */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                  Add Client Inquiry
                </h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">
                Record an inquiry manually from a phone call, WhatsApp conversation, or offline agency meeting.
              </p>

              {addLeadError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs border border-rose-200 dark:border-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {addLeadError}
                </div>
              )}

              <form onSubmit={handleCreateLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                    Client Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@brand.com"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98765..."
                      value={newLeadPhone}
                      onChange={(e) => setNewLeadPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                    Service of Interest
                  </label>
                  <select
                    value={newLeadService}
                    onChange={(e) => setNewLeadService(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Performance Marketing & Paid Ads">Performance Marketing & Paid Ads</option>
                    <option value="Social Media Marketing (SMM)">Social Media Marketing (SMM)</option>
                    <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                    <option value="Custom Website & Landing Pages">Custom Website & Landing Pages</option>
                    <option value="Omnichannel Growth Retainer">Omnichannel Growth Retainer</option>
                    <option value="Enterprise Multi-State Scale">Enterprise Multi-State Scale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                    Project Notes or Scope
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Key objectives, budget discuss, or meeting summary..."
                    value={newLeadMessage}
                    onChange={(e) => setNewLeadMessage(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingNewLead}
                    className="inline-flex items-center gap-2 px-5 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black text-xs rounded-xl hover:bg-zinc-800 dark:hover:bg-white disabled:opacity-50 transition-all shadow-md active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isSubmittingNewLead ? "Saving..." : "Save Inquiry"}</span>
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
        title="Reset All Inquiries to Defaults?"
        message="Are you sure you want to restore the official prospective client inquiries? This will repopulate the 6 canonical inquiries from the DigiVigee homepage, audit funnels, and enterprise expansion funnels. You can safely manage, test, and convert them."
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
        title="Delete Client Inquiry?"
        message={`Are you sure you want to delete the inquiry for "${deleteTarget?.name}"? This record will be permanently removed from the CRM pipeline.`}
        confirmLabel="Delete Inquiry"
        isDestructive
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
