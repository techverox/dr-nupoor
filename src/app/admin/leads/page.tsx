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
  Layers,
  Stethoscope
} from "lucide-react";

const STATUS_CONFIG: Record<LeadStatus, { label: string; badgeClass: string; dotClass: string }> = {
  new: {
    label: "New Inquiry",
    badgeClass: "bg-blue-50 text-blue-800 border border-blue-200",
    dotClass: "bg-blue-500",
  },
  contacted: {
    label: "Contacted",
    badgeClass: "bg-indigo-50 text-indigo-800 border border-indigo-200",
    dotClass: "bg-indigo-500",
  },
  follow_up: {
    label: "Follow-up",
    badgeClass: "bg-amber-50 text-amber-800 border border-amber-200",
    dotClass: "bg-amber-500",
  },
  qualified: {
    label: "Qualified",
    badgeClass: "bg-teal-50 text-teal-800 border border-teal-200",
    dotClass: "bg-teal-500",
  },
  converted: {
    label: "Confirmed Consultation",
    badgeClass: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    dotClass: "bg-emerald-500",
  },
  lost: {
    label: "Archived",
    badgeClass: "bg-slate-100 text-slate-700 border border-slate-200",
    dotClass: "bg-slate-500",
  },
};

const CLINICAL_SERVICES_OPTIONS = [
  "Breast Cancer Consultation & Diagnosis",
  "Oncoplastic Breast Surgery",
  "Breast Conservation Surgery (BCS)",
  "Breast Reconstruction Consultation",
  "Benign Breast Lumps & Pain Evaluation",
  "High-Risk Screening & Genetic Surveillance",
  "General Clinical Appointment",
];

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
  const [newLeadService, setNewLeadService] = useState(CLINICAL_SERVICES_OPTIONS[0]);
  const [newLeadMessage, setNewLeadMessage] = useState("");
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
      }
    } catch (e) {
      console.error("[AdminLeads] Fetch error:", e);
      setFeedback({ message: "Failed to load consultation inquiries.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleUpdateLead = async (leadId: string, updates: Partial<LeadItem> & { note?: string }) => {
    setIsUpdatingLead(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, ...updates }),
      });
      const data = await res.json();

      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        if (activeLead && activeLead.id === leadId) {
          setActiveLead(data.lead);
        }
        setNewNoteText("");
        setFeedback({ message: "Patient inquiry updated successfully.", type: "success" });
        setTimeout(() => setFeedback(null), 3000);
      } else {
        setFeedback({ message: data.error || "Failed to update record.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminLeads] Update error:", e);
      setFeedback({ message: "An unexpected error occurred.", type: "error" });
    } finally {
      setIsUpdatingLead(false);
    }
  };

  const handleCreateLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadEmail.trim()) {
      setAddLeadError("Please provide patient name and email.");
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
          email: newLeadEmail.trim().toLowerCase(),
          phone: newLeadPhone.trim(),
          serviceInterestedIn: newLeadService,
          message: newLeadMessage.trim(),
          source: "Manual Clinic Intake",
          status: "new",
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
        setFeedback({ message: "New consultation inquiry added successfully!", type: "success" });
        setTimeout(() => setFeedback(null), 3000);
      } else {
        setAddLeadError(data.error || "Failed to add inquiry.");
      }
    } catch (e) {
      console.error("[AdminLeads] Add lead error:", e);
      setAddLeadError("Network error. Please try again.");
    } finally {
      setIsSubmittingNewLead(false);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();

      if (data.success) {
        await fetchLeads();
        setIsResetModalOpen(false);
        setFeedback({ message: "Inquiries reset to canonical clinical defaults.", type: "success" });
        setTimeout(() => setFeedback(null), 3500);
      } else {
        setFeedback({ message: data.error || "Reset failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminLeads] Reset error:", e);
      setFeedback({ message: "Failed to reset inquiries.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
        if (activeLead && activeLead.id === deleteTarget.id) {
          setActiveLead(null);
        }
        setDeleteTarget(null);
        setFeedback({ message: `Inquiry for "${deleteTarget.name}" deleted.`, type: "success" });
        setTimeout(() => setFeedback(null), 3000);
      } else {
        setFeedback({ message: data.error || "Delete failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminLeads] Delete error:", e);
      setFeedback({ message: "Network error during delete.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.phone || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.serviceInterestedIn || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedStatus === "all") return true;
      return l.status === selectedStatus;
    });
  }, [leads, searchQuery, selectedStatus]);

  // Counts
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified").length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-16 font-sans">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-200/80 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                Consultation Bookings &amp; Inquiries
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                100% Real-Time Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage patient consultation requests, triage inquiries, and coordinate clinical appointments.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 shadow-2xs transition-all"
            title="Restore canonical prospective patient inquiries"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <Link
            href="/admin/forms"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Patient Forms</span>
          </Link>

          <a
            href="/api/admin/leads?format=csv"
            download
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={() => {
              setAddLeadError("");
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Inquiry</span>
          </button>
        </div>
      </div>

      {/* Bento Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900">{totalLeads} Inquiries</div>
            <div className="text-xs text-slate-500 font-medium">All-time Inquiries</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-blue-700">{newLeads} New</div>
            <div className="text-xs text-slate-500 font-medium">Awaiting Outreach</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-200/60 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-teal-700">{qualifiedLeads} Qualified</div>
            <div className="text-xs text-slate-500 font-medium">Clinical Triage Done</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-emerald-700">{convertedLeads} Confirmed</div>
            <div className="text-xs text-slate-500 font-medium">OPD / Surgery Scheduled</div>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in duration-200 shadow-2xs ${
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
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient name, email, phone, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap w-full lg:w-auto">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
              Status:
            </span>
            {(["all", "new", "contacted", "follow_up", "qualified", "converted", "lost"] as const).map((st) => {
              const isSelected = selectedStatus === st;
              const count = st === "all" ? leads.length : leads.filter((l) => l.status === st).length;

              return (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{st.replace("_", " ")}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-emerald-600 mb-3" />
            <p className="text-sm font-bold text-slate-500">Loading consultation telemetry...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center px-4">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No matching inquiries found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
              Try adjusting your filter or click &ldquo;Reset Defaults&rdquo; to restore canonical test inquiries.
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
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/90 text-[11px] uppercase tracking-wider font-bold text-slate-500">
                  <th className="px-6 py-4">Patient / Contact</th>
                  <th className="px-6 py-4">Clinical Concern &amp; Scope</th>
                  <th className="px-6 py-4">Acquisition Channel</th>
                  <th className="px-6 py-4">Submitted At</th>
                  <th className="px-6 py-4">Workflow Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
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
                      className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                      onClick={() => setActiveLead(lead)}
                    >
                      {/* Patient Contact */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900">
                              {lead.name}
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span>{lead.email}</span>
                            </div>
                            {lead.phone && (
                              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span>{lead.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Service Interest */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-xs text-slate-900">
                          {lead.serviceInterestedIn || "General Clinical Consultation"}
                        </div>
                        {lead.message && (
                          <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs mt-0.5">
                            {lead.message}
                          </div>
                        )}
                      </td>

                      {/* Acquisition Source */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {lead.landingPageSlug ? `/landing/${lead.landingPageSlug}` : lead.source}
                        </span>
                      </td>

                      {/* Date & Follow-Up */}
                      <td className="px-6 py-4">
                        <div className="text-xs font-medium text-slate-600 font-mono">
                          {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        {lead.followUpDate && (
                          <div className="text-[11px] text-amber-700 font-bold flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>Follow-up: {lead.followUpDate}</span>
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
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          )}

                          <button
                            onClick={() => setActiveLead(lead)}
                            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Inspect Details"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteTarget(lead)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-start bg-slate-50/70">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-extrabold text-base shadow-2xs">
                  {activeLead.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-lg font-bold text-slate-900">
                      {activeLead.name}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_CONFIG[activeLead.status]?.badgeClass}`}>
                      {STATUS_CONFIG[activeLead.status]?.label}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {activeLead.email}</span>
                    {activeLead.phone && (
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {activeLead.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveLead(null)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
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
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-2xs transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Send Email</span>
                </a>

                {activeLead.phone && (
                  <>
                    <a
                      href={`tel:${activeLead.phone}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-2xs transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>Call Patient</span>
                    </a>

                    <a
                      href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold hover:bg-[#20bd5a] shadow-2xs transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Chat</span>
                    </a>
                  </>
                )}
              </div>

              {/* Status & Follow-Up Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Workflow Stage
                  </label>
                  <select
                    value={activeLead.status}
                    onChange={(e) => handleUpdateLead(activeLead.id, { status: e.target.value as LeadStatus })}
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-900 cursor-pointer"
                  >
                    {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((st) => (
                      <option key={st} value={st}>
                        {STATUS_CONFIG[st].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={activeLead.followUpDate || ""}
                    onChange={(e) => handleUpdateLead(activeLead.id, { followUpDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-900 cursor-pointer"
                  />
                </div>
              </div>

              {/* Client Message */}
              {activeLead.message && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Clinical Symptoms &amp; Inquiry Scope
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
                    {activeLead.message}
                  </div>
                </div>
              )}

              {/* Attribution Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Attribution Telemetry
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Source:</span>{" "}
                    <strong className="text-slate-900">{activeLead.source}</strong>
                  </div>
                  {activeLead.landingPageSlug && (
                    <div>
                      <span className="text-slate-500">Landing Page:</span>{" "}
                      <strong className="text-slate-900">/landing/{activeLead.landingPageSlug}</strong>
                    </div>
                  )}
                  {activeLead.serviceInterestedIn && (
                    <div className="col-span-2">
                      <span className="text-slate-500">Service:</span>{" "}
                      <strong className="text-slate-900">{activeLead.serviceInterestedIn}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Internal Notes Timeline */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Clinical Care Notes ({activeLead.notes?.length || 0})
                </h4>

                <div className="space-y-2 mb-3">
                  {(activeLead.notes || []).map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    >
                      <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
                        <strong className="text-slate-700">{note.author}</strong>
                        <span className="font-mono">{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed">{note.note}</p>
                    </div>
                  ))}
                </div>

                {/* Add Note Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a clinical triage or follow-up note..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newNoteText.trim()) {
                        handleUpdateLead(activeLead.id, { note: newNoteText.trim() });
                      }
                    }}
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                  />
                  <button
                    onClick={() => {
                      if (newNoteText.trim()) {
                        handleUpdateLead(activeLead.id, { note: newNoteText.trim() });
                      }
                    }}
                    disabled={!newNoteText.trim() || isUpdatingLead}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold disabled:opacity-40 transition-all cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/70 flex justify-between items-center text-xs text-slate-500">
              <span className="font-mono">Created {new Date(activeLead.createdAt).toLocaleString()}</span>
              <button
                onClick={() => setActiveLead(null)}
                className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add Patient Consultation
                </h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Record a consultation request manually from a phone call, WhatsApp conversation, or walk-in appointment.
              </p>

              {addLeadError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {addLeadError}
                </div>
              )}

              <form onSubmit={handleCreateLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Patient Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anjali Sharma"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="anjali@example.com"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={newLeadPhone}
                      onChange={(e) => setNewLeadPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Clinical Concern / Service
                  </label>
                  <select
                    value={newLeadService}
                    onChange={(e) => setNewLeadService(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white cursor-pointer"
                  >
                    {CLINICAL_SERVICES_OPTIONS.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Clinical Symptoms / Background Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Chief complaints, prior imaging, or physician referral details..."
                    value={newLeadMessage}
                    onChange={(e) => setNewLeadMessage(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingNewLead}
                    className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl disabled:opacity-50 transition-all shadow-sm active:scale-95 cursor-pointer"
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
        message="Are you sure you want to restore the official prospective patient inquiries? This will repopulate canonical clinical consultation requests."
        confirmLabel="Yes, Reset Defaults"
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
        title="Delete Patient Inquiry?"
        message={`Are you sure you want to delete the inquiry for "${deleteTarget?.name}"? This record will be permanently removed.`}
        confirmLabel="Delete Inquiry"
        isDestructive
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
