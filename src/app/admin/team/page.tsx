"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { TeamMember } from "@/types";
import { Card } from "@/components/ui/Card";
import {
  Users,
  Search,
  Plus,
  Briefcase,
  User,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Edit2,
  X,
  RotateCcw,
  ExternalLink,
  Check,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  Crown,
} from "lucide-react";

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const CANONICAL_AVATARS = [
  { name: "Vipul Gajjar", url: "/images/team/vipul-gajjar.jpg" },
  { name: "Disha Parmar", url: "/images/team/disha-parmar.jpg" },
  { name: "Meet Patel", url: "/images/team/meet-patel.jpg" },
  { name: "Hetal Shah", url: "/images/team/hetal-shah.jpg" },
  { name: "Krunal Vyas", url: "/images/team/krunal-vyas.jpg" },
];

const ROLE_PRESETS = [
  "Founder & Digital Strategist",
  "Social Media Strategist",
  "Performance Marketing Expert",
  "Content Strategy Lead",
  "Web & SEO Specialist",
];

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "Founder & Digital Strategist",
    bio: "",
    avatar: "/images/team/vipul-gajjar.jpg",
    linkedin: "",
    email: "",
    order: 1,
    isPublished: true,
  });

  // Reset to Defaults Confirmation Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTeam = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (data.success && data.items) {
        setMembers(data.items);
      }
    } catch (e) {
      console.error("[AdminTeam] Fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  // Keyboard shortcut: Ctrl+S to save modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && isModalOpen) {
        e.preventDefault();
        const form = document.getElementById("team-editor-form") as HTMLFormElement | null;
        if (form) form.requestSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "Digital Strategist",
      bio: "",
      avatar: "/images/team/vipul-gajjar.jpg",
      linkedin: "",
      email: "",
      order: members.length + 1,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingItem(member);
    setFormData({
      name: member.name || "",
      role: member.role || "",
      bio: member.bio || "",
      avatar: member.avatar || "/images/team/vipul-gajjar.jpg",
      linkedin: member.socials?.linkedin || "",
      email: member.socials?.email || "",
      order: member.order || 1,
      isPublished: member.isPublished ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) {
      setFeedback({ message: "Specialist name and role are required.", type: "error" });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        id: editingItem ? editingItem.id : undefined,
        name: formData.name.trim(),
        role: formData.role.trim(),
        bio: formData.bio.trim(),
        avatar: formData.avatar || "/images/team/vipul-gajjar.jpg",
        socials: {
          linkedin: formData.linkedin.trim() || undefined,
          email: formData.email.trim() || undefined,
        },
        order: Number(formData.order),
        isPublished: formData.isPublished,
      };

      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          message: editingItem ? "Team specialist updated & synced live!" : "New team specialist created & published live!",
          type: "success",
        });
        setIsModalOpen(false);
        fetchTeam();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to save team member.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminTeam] Save error:", e);
      setFeedback({ message: "An unexpected network error occurred.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (member: TeamMember) => {
    try {
      const nextStatus = !member.isPublished;
      // Optimistic update
      setMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, isPublished: nextStatus } : m))
      );

      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: member.id,
          name: member.name,
          role: member.role,
          bio: member.bio,
          avatar: member.avatar,
          order: member.order,
          isPublished: nextStatus,
        }),
      });

      if (res.ok) {
        setFeedback({
          message: `"${member.name}" is now ${nextStatus ? "Published Live" : "Unpublished (Draft)"}.`,
          type: "success",
        });
        setTimeout(() => setFeedback(null), 3000);
      } else {
        fetchTeam();
      }
    } catch (e) {
      console.error("[AdminTeam] Toggle error:", e);
      fetchTeam();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/team?id=${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ message: `Team member "${deleteTarget.name}" removed successfully.`, type: "success" });
        setDeleteTarget(null);
        fetchTeam();
        setTimeout(() => setFeedback(null), 3500);
      } else {
        setFeedback({ message: data.error || "Delete failed.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminTeam] Delete error:", e);
      setFeedback({ message: "Failed to delete team member.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          message: "All 5 team specialists successfully reset to live canonical defaults!",
          type: "success",
        });
        setIsResetConfirmOpen(false);
        fetchTeam();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ message: data.error || "Failed to reset team.", type: "error" });
      }
    } catch (e) {
      console.error("[AdminTeam] Reset error:", e);
      setFeedback({ message: "Network error during reset.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  // Filter tabs
  const FILTER_TABS = [
    { id: "all", label: "All Specialists" },
    { id: "published", label: "Published Live" },
    { id: "draft", label: "Drafts" },
    { id: "leadership", label: "Leadership" },
    { id: "strategy", label: "Strategy & Performance" },
    { id: "technical", label: "Web & Technical" },
  ];

  // Filtered Members
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        (m.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.role || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.bio || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === "published") return m.isPublished;
      if (activeTab === "draft") return !m.isPublished;
      if (activeTab === "leadership") {
        const role = m.role.toLowerCase();
        return role.includes("founder") || role.includes("lead") || role.includes("head");
      }
      if (activeTab === "strategy") {
        const role = m.role.toLowerCase();
        return role.includes("strategist") || role.includes("performance") || role.includes("media");
      }
      if (activeTab === "technical") {
        const role = m.role.toLowerCase();
        return role.includes("web") || role.includes("seo") || role.includes("content") || role.includes("developer");
      }

      return true;
    });
  }, [members, searchQuery, activeTab]);

  // Metrics
  const metrics = useMemo(() => {
    const total = members.length;
    const published = members.filter((m) => m.isPublished).length;
    const leadershipCount = members.filter((m) => {
      const r = m.role.toLowerCase();
      return r.includes("founder") || r.includes("lead") || r.includes("head") || r.includes("director");
    }).length;
    const activePods = total;
    return { total, published, leadershipCount, activePods };
  }, [members]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#008744] flex items-center justify-center shrink-0 border border-emerald-100">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                Team Specialists CMS
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#008744] border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008744] animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Manage agency leadership, digital marketing specialists, and dedicated pod directors displayed on the About page.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Reset to Live Defaults Button */}
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
            title="Reset all 5 specialists to pristine live defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>

          {/* View Live on Website */}
          <Link
            href="/about#team"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>View on Site</span>
          </Link>

          {/* Add Specialist CTA */}
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C1628] text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Specialist</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Specialists</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{metrics.total}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <Users className="w-4 h-4" />
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
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Leadership Roles</div>
            <div className="text-2xl font-black text-amber-600 mt-0.5">{metrics.leadershipCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <Crown className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Dedicated Pods</div>
            <div className="text-2xl font-black text-indigo-600 mt-0.5">{metrics.activePods}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Award className="w-4 h-4" />
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
              placeholder="Search by name, role, skills..."
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

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count =
                tab.id === "all"
                  ? members.length
                  : tab.id === "published"
                  ? members.filter((m) => m.isPublished).length
                  : tab.id === "draft"
                  ? members.filter((m) => !m.isPublished).length
                  : tab.id === "leadership"
                  ? members.filter((m) => {
                      const r = m.role.toLowerCase();
                      return r.includes("founder") || r.includes("lead") || r.includes("head");
                    }).length
                  : tab.id === "strategy"
                  ? members.filter((m) => {
                      const r = m.role.toLowerCase();
                      return r.includes("strategist") || r.includes("performance") || r.includes("media");
                    }).length
                  : members.filter((m) => {
                      const r = m.role.toLowerCase();
                      return r.includes("web") || r.includes("seo") || r.includes("content") || r.includes("developer");
                    }).length;

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

        {/* Specialists List Table */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-500 text-xs">
            <div className="w-6 h-6 border-2 border-[#008744] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading team specialists from real-time store...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">No team specialists found</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">Try adjusting your search query or filter tabs.</p>
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
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
              >
                {/* Left: Priority Order + Photo Avatar + Name & Role */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-200/60">
                    #{member.order}
                  </div>

                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                        {member.name}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-50 text-[#008744] border border-emerald-200/80">
                        {member.role}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-1 pr-4">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Right: Publish Toggle & Actions */}
                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  {/* Status Badge Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(member)}
                    className="cursor-pointer group/toggle focus:outline-none"
                    title="Click to toggle live website visibility"
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                        member.isPublished
                          ? "bg-emerald-50 text-[#008744] border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          member.isPublished ? "bg-[#008744]" : "bg-slate-400"
                        }`}
                      />
                      <span>{member.isPublished ? "Live on Site" : "Draft (Hidden)"}</span>
                    </span>
                  </button>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => openEditModal(member)}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
                    title="Edit Specialist"
                  >
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(member)}
                    className="p-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer shadow-2xs"
                    title="Delete Specialist"
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
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    {editingItem ? `Edit Specialist: ${editingItem.name}` : "Create New Team Specialist"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Changes reflect live across the About page leadership section instantly upon saving.
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
                id="team-editor-form"
                onSubmit={handleSave}
                className="lg:col-span-7 space-y-4 text-left"
              >
                {/* Full Name & Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vipul Gajjar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Role / Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Founder & Digital Strategist"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                  </div>
                </div>

                {/* Quick Role Preset Chips */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 mb-1.5 block">Quick Role Suggestions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ROLE_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: preset })}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                          formData.role.toLowerCase() === preset.toLowerCase()
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avatar Picker & Display Order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Avatar Image Path
                    </label>
                    <input
                      type="text"
                      value={formData.avatar}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                      placeholder="/images/team/vipul-gajjar.jpg"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all mb-2"
                    />
                    {/* Quick Avatar Suggestions */}
                    <div className="flex items-center gap-1.5">
                      {CANONICAL_AVATARS.map((av) => (
                        <button
                          key={av.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, avatar: av.url })}
                          className={`w-7 h-7 rounded-lg overflow-hidden border-2 transition-transform cursor-pointer relative ${
                            formData.avatar === av.url ? "border-[#008744] scale-110 shadow-xs" : "border-slate-200 opacity-60 hover:opacity-100"
                          }`}
                          title={`Select photo for ${av.name}`}
                        >
                          <Image src={av.url} alt={av.name} fill className="object-cover object-top" sizes="28px" />
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Order #1 appears first in the leadership grid.
                    </span>
                  </div>
                </div>

                {/* Biography */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Professional Biography &amp; Leadership Voice <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Visionary digital strategist leading agency growth and delivering high-ROI marketing ecosystems..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>Highlight core skills, client impact, and strategic role.</span>
                    <span>{formData.bio.length} characters</span>
                  </div>
                </div>

                {/* LinkedIn & Direct Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/vipul-gajjar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Direct Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vipul@digivigee.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C1628]/10 focus:border-[#0C1628] transition-all"
                    />
                  </div>
                </div>

                {/* Publish Toggle */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isTeamPublishedToggle"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded text-[#008744] focus:ring-[#008744] cursor-pointer"
                    />
                    <label htmlFor="isTeamPublishedToggle" className="cursor-pointer">
                      <div className="text-xs font-bold text-slate-900">Publish Live on Website</div>
                      <div className="text-[11px] text-slate-500">
                        When enabled, specialist appears immediately in the About page leadership section and schema markup.
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
                      Live Website Card Preview
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#008744] border border-emerald-200">
                      Exact Public Replica
                    </span>
                  </div>

                  {/* Public Specialist Card Mockup */}
                  <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-5 shadow-lg relative flex flex-col justify-between text-left group">
                    <div>
                      {/* Photo with Overlay Accent */}
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 border border-slate-200/70 bg-slate-100">
                        {formData.avatar ? (
                          <Image
                            src={formData.avatar}
                            alt={formData.name || "Specialist"}
                            fill
                            className="object-cover object-top"
                            sizes="280px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-bold text-2xl">
                            {formData.name ? formData.name.slice(0, 2).toUpperCase() : "SP"}
                          </div>
                        )}
                      </div>

                      {/* Name & Role */}
                      <h3 className="text-base font-extrabold text-[#0C1628] tracking-tight mb-1">
                        {formData.name || "Specialist Full Name"}
                      </h3>
                      <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#008744] text-[11px] font-bold border border-emerald-200/80 mb-3">
                        {formData.role || "Digital Strategist"}
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                        {formData.bio || "Enter professional bio and specialist focus in the left form to preview dynamically in real time..."}
                      </p>
                    </div>

                    {/* Social & Contact Footer */}
                    <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {formData.linkedin && (
                          <div
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#0077b5] shadow-2xs"
                            title="LinkedIn Active"
                          >
                            <LinkedinIcon className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {formData.email && (
                          <div
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#008744] shadow-2xs"
                            title="Email Active"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <span className="text-[10.5px] font-mono text-slate-400">
                        Specialist #{formData.order}
                      </span>
                    </div>
                  </div>

                  {/* Live Sync Guarantee Note */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#008744] shrink-0 mt-0.5" />
                    <span>
                      Live Sync Active: Team profiles entered here automatically reflect on the public About page leadership grid and search engine schema.
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
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0C1628] text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-sm disabled:opacity-50"
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
              Reset All 5 Specialists to Factory Defaults?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              This action will safely restore the 5 canonical agency specialists (Vipul Gajjar, Disha Parmar, Meet Patel, Hetal Shah, and Krunal Vyas) to their pristine live defaults. Any custom edits or draft members will be reset.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-6 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                <span>Restores 5 Verified Leadership Specialists</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pl-6">
                <span>100% synchronized with the live About page leadership grid.</span>
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
              Delete Team Member?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Are you sure you want to remove <strong className="text-slate-900">{deleteTarget.name}</strong> ({deleteTarget.role})? This will unpublish them from the live website immediately.
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
                {isDeleting ? "Deleting..." : "Delete Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
