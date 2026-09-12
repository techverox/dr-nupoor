"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { RedirectItem, RedirectStatusCode } from "@/types";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  ArrowRightLeft,
  ArrowRight,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  X,
  Check,
  Edit2,
  Trash2,
  Link as LinkIcon,
  StickyNote,
  Hash,
  RotateCcw,
  Sparkles,
  Copy,
  ExternalLink,
  ShieldCheck,
  Layers,
  Globe,
  Activity,
  MousePointerClick,
  Sliders,
  AlertTriangle
} from "lucide-react";

const QUICK_REDIRECT_PRESETS = [
  {
    label: "⚡ /audit",
    sourcePath: "/audit",
    destinationPath: "/contact",
    statusCode: 301 as RedirectStatusCode,
    note: "Quick shortlink for Free Q1 Growth & SEO Audit",
  },
  {
    label: "💬 /whatsapp",
    sourcePath: "/whatsapp",
    destinationPath: "https://wa.me/919081145178",
    statusCode: 302 as RedirectStatusCode,
    note: "Direct WhatsApp Growth Desk shortlink (+91 90811 45178)",
  },
  {
    label: "📊 /blueprint",
    sourcePath: "/blueprint",
    destinationPath: "/landing/performance-marketing-blueprint",
    statusCode: 301 as RedirectStatusCode,
    note: "Shortlink for 14-Day Performance Marketing Blueprint Pilot",
  },
  {
    label: "🍕 /pos",
    sourcePath: "/pos",
    destinationPath: "/contact?product=restromitra",
    statusCode: 301 as RedirectStatusCode,
    note: "RestroMitra Cloud POS & QR dining product inquiry",
  },
];

export default function AdminRedirectsPage() {
  const [redirects, setRedirects] = useState<RedirectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "301" | "302">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRedirect, setEditingRedirect] = useState<RedirectItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [sourcePath, setSourcePath] = useState("");
  const [destinationPath, setDestinationPath] = useState("");
  const [destinationType, setDestinationType] = useState<"internal" | "custom">("internal");
  const [statusCode, setStatusCode] = useState<RedirectStatusCode>(301);
  const [isActive, setIsActive] = useState(true);
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const fetchRedirects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/redirects");
      const data = await res.json();
      if (data.success) {
        setRedirects(data.redirects || []);
      }
    } catch (err) {
      console.error("Failed to load redirects:", err);
      setMessage({ type: "error", text: "Failed to load redirects from server." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRedirects();
  }, [fetchRedirects]);

  const openCreateModal = () => {
    setEditingRedirect(null);
    setSourcePath("");
    setDestinationPath("/services");
    setDestinationType("internal");
    setStatusCode(301);
    setIsActive(true);
    setNote("");
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: RedirectItem) => {
    setEditingRedirect(item);
    setSourcePath(item.sourcePath);
    setDestinationPath(item.destinationPath);
    setDestinationType(
      item.destinationPath.startsWith("http") ||
      !["/services", "/portfolio", "/contact", "/blog", "/landing/performance-marketing-blueprint"].includes(item.destinationPath)
        ? "custom"
        : "internal"
    );
    setStatusCode(item.statusCode);
    setIsActive(item.isActive);
    setNote(item.note || "");
    setFormError(null);
    setIsModalOpen(true);
  };

  const applyPreset = (preset: typeof QUICK_REDIRECT_PRESETS[0]) => {
    setSourcePath(preset.sourcePath);
    setDestinationPath(preset.destinationPath);
    setDestinationType(preset.destinationPath.startsWith("http") ? "custom" : "internal");
    setStatusCode(preset.statusCode);
    setNote(preset.note);
    setMessage({ type: "success", text: `Loaded preset: ${preset.label}` });
    setTimeout(() => setMessage(null), 2500);
  };

  const handleToggleStatus = async (item: RedirectItem) => {
    const nextActive = !item.isActive;
    setActionLoading(item.id);

    // Optimistic UI update
    setRedirects((prev) =>
      prev.map((r) => (r.id === item.id ? { ...r, isActive: nextActive } : r))
    );

    try {
      const res = await fetch(`/api/admin/redirects/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle" }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({
          type: "success",
          text: nextActive ? "Redirect rule is now active! 🚀" : "Redirect rule paused.",
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        // Revert on failure
        setRedirects((prev) =>
          prev.map((r) => (r.id === item.id ? item : r))
        );
        setMessage({ type: "error", text: data.error || "Failed to toggle redirect." });
      }
    } catch {
      setRedirects((prev) =>
        prev.map((r) => (r.id === item.id ? item : r))
      );
      setMessage({ type: "error", text: "Failed to toggle redirect." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this URL redirect rule?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/redirects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setRedirects((prev) => prev.filter((r) => r.id !== id));
        setMessage({ type: "success", text: "Redirect rule deleted." });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to delete redirect." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to delete redirect." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetToDefaults = async () => {
    setIsResetLoading(true);
    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (data.success) {
        setRedirects(data.redirects || []);
        setIsResetConfirmOpen(false);
        setMessage({
          type: "success",
          text: "URL Redirect Manager reset to 8 canonical DigiVigee rules! ✨",
        });
        setTimeout(() => setMessage(null), 3500);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to reset defaults." });
      }
    } catch (err) {
      console.error("Reset error:", err);
      setMessage({ type: "error", text: "Failed to reset defaults. Please check server." });
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleCopyLink = (path: string, id: string) => {
    const fullUrl = `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanSource = sourcePath.trim().toLowerCase();
    const cleanDest = destinationPath.trim();

    if (!cleanSource) {
      setFormError("Source incoming path is required.");
      return;
    }
    if (!cleanSource.startsWith("/")) {
      setFormError("Source path must start with a slash (e.g. /old-page).");
      return;
    }
    if (!cleanDest) {
      setFormError("Destination path or URL is required.");
      return;
    }
    if (cleanSource === cleanDest) {
      setFormError("Source path cannot be identical to destination (creates a self-redirect loop).");
      return;
    }

    const payload = {
      sourcePath: cleanSource,
      destinationPath: cleanDest,
      statusCode,
      isActive,
      note: note.trim() || undefined,
    };

    try {
      const url = editingRedirect ? `/api/admin/redirects/${editingRedirect.id}` : "/api/admin/redirects";
      const method = editingRedirect ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setMessage({
          type: "success",
          text: editingRedirect ? "Redirect rule updated successfully! ✨" : "New redirect rule is active! 🚀",
        });
        setTimeout(() => setMessage(null), 3000);
        fetchRedirects();
      } else {
        setFormError(data.error || "Failed to save redirect rule.");
      }
    } catch {
      setFormError("Network error occurred while saving.");
    }
  };

  // Precomputed Bento KPIs
  const totalRules = redirects.length;
  const activeRules = useMemo(() => redirects.filter((r) => r.isActive).length, [redirects]);
  const pausedRules = totalRules - activeRules;
  const totalHits = useMemo(() => redirects.reduce((sum, r) => sum + (r.hitCount || 0), 0), [redirects]);
  const permanentCount = useMemo(() => redirects.filter((r) => r.statusCode === 301).length, [redirects]);
  const temporaryCount = useMemo(() => redirects.filter((r) => r.statusCode === 302).length, [redirects]);

  // Filtered redirects
  const filtered = useMemo(() => {
    return redirects.filter((r) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.sourcePath.toLowerCase().includes(q) ||
        r.destinationPath.toLowerCase().includes(q) ||
        (r.note && r.note.toLowerCase().includes(q));

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && r.isActive) ||
        (statusFilter === "inactive" && !r.isActive) ||
        (statusFilter === "301" && r.statusCode === 301) ||
        (statusFilter === "302" && r.statusCode === 302);

      return matchSearch && matchStatus;
    });
  }, [redirects, search, statusFilter]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* Top Banner & Hero Header */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-[#008744] dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Redirect Engine: Active
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Edge Middleware & SEO Equity
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C1628] dark:text-zinc-100 tracking-tight">
              URL Redirect Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Create, monitor, and manage 301 Permanent and 302 Temporary redirects to preserve Google SEO ranking equity, fix 404 broken links, and create clean marketing shortlinks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* 1-Click Reset to Defaults */}
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-zinc-700 cursor-pointer shadow-xs"
              title="Reset all redirects to canonical DigiVigee defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#008744]" />
              <span>Reset to Defaults</span>
            </button>

            {/* Create Redirect Button */}
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#008744] hover:bg-[#007038] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Redirect Rule</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 BENTO KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Rules */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Total Redirect Rules
            </div>
            <div className="text-3xl font-black text-[#0C1628] dark:text-zinc-100 mt-1">
              {totalRules}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
              Configured traffic routing paths
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Active Rules */}
        <div className="bg-white dark:bg-zinc-900 border border-emerald-300/60 dark:border-emerald-800/60 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Actively Redirecting
            </div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {activeRules}
            </div>
            <div className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-1">
              Forwarding live site traffic
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[#008744] dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Total Redirect Hits */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Total Traffic Hits
            </div>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {totalHits.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
              Visitors successfully rerouted
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <MousePointerClick className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Paused / Inactive */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              Paused Rules
            </div>
            <div className="text-3xl font-black text-slate-600 dark:text-zinc-300 mt-1">
              {pausedRules}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
              Temporarily disabled
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400 flex items-center justify-center shrink-0">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* QUICK 1-CLICK PRESETS STRIP */}
      <div className="p-4 bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-slate-50/70 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-zinc-900/60 border border-emerald-200/80 dark:border-emerald-800/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#008744] text-white flex items-center justify-center text-xs font-bold shrink-0">
            ⚡
          </div>
          <div>
            <span className="text-xs font-bold text-[#0C1628] dark:text-zinc-100 block">
              Quick Shortlink Presets
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              Click any button to create or verify standard high-converting DigiVigee shortlinks.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {QUICK_REDIRECT_PRESETS.map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                openCreateModal();
                setTimeout(() => applyPreset(preset), 50);
              }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800/80 text-xs font-bold text-slate-800 dark:text-zinc-200 hover:border-[#008744] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 hover:shadow-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH AND FILTER TOOLBAR */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by source path (/old), destination (/new), or note..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-950"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              All ({totalRules})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("active")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                statusFilter === "active"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Active ({activeRules})</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("inactive")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                statusFilter === "inactive"
                  ? "bg-slate-700 text-white"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Paused ({pausedRules})</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("301")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === "301"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              301 Permanent ({permanentCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("302")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === "302"
                  ? "bg-amber-600 text-white"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              302 Temporary ({temporaryCount})
            </button>
          </div>
        </div>
      </div>

      {/* REDIRECT RULES VISUAL CARDS LIST */}
      {loading ? (
        <div className="p-16 text-center text-slate-500 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs">
          <div className="animate-spin w-8 h-8 border-3 border-slate-200 border-t-emerald-600 rounded-full mx-auto mb-3" />
          <p className="text-sm font-semibold">Loading URL redirect architecture...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-zinc-900 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center shadow-xs">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center mb-4 text-[#008744]">
            <ArrowRightLeft className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#0C1628] dark:text-zinc-100 mb-1">
            {search ? "No matching redirects found" : "No redirect rules configured yet!"}
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-md mb-6 leading-relaxed">
            {search
              ? `No redirect rules match "${search}". Try clearing your search query.`
              : "Restore the 8 canonical DigiVigee redirects in 1 click, or add a custom rule."}
          </p>
          <div className="flex items-center gap-3">
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="px-4 py-2.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
              >
                Clear Search Filter
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(true)}
                className="px-5 py-2.5 bg-[#008744] hover:bg-[#007038] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Load 8 Canonical Redirects</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isExternal = item.destinationPath.startsWith("http");

            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-zinc-900 rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
                  item.isActive
                    ? "border-slate-200 dark:border-zinc-800 hover:border-emerald-500/50"
                    : "border-slate-200 dark:border-zinc-800/80 opacity-75 bg-slate-50/50 dark:bg-zinc-900/40"
                }`}
              >
                {/* Left / Center: Visual Path Diagram */}
                <div className="flex-1 w-full space-y-3">
                  {/* Path Visualizer Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                    {/* Source Box */}
                    <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 shrink-0 min-w-0 sm:max-w-xs">
                      <div className="flex items-center gap-2 min-w-0 truncate">
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.sourcePath}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(item.sourcePath, item.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors rounded cursor-pointer"
                        title="Copy full incoming URL"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Middle Status Pill with Arrow */}
                    <div className="flex items-center gap-1.5 shrink-0 self-center sm:self-auto">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        item.statusCode === 301
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900"
                      }`}>
                        <Hash className="w-3 h-3" />
                        {item.statusCode === 301 ? "301 Permanent" : "302 Temporary"}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:inline" />
                    </div>

                    {/* Destination Box */}
                    <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 font-mono text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300 min-w-0 flex-1">
                      <div className="flex items-center gap-2 min-w-0 truncate">
                        {isExternal ? (
                          <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                        <span className="truncate">{item.destinationPath}</span>
                      </div>
                      <a
                        href={item.destinationPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-emerald-600 hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors rounded shrink-0"
                        title="Test redirect in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Sub-meta row: Note + Hit count badge */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-zinc-400 flex-wrap">
                    {item.note && (
                      <span className="flex items-center gap-1 font-medium">
                        <StickyNote className="w-3 h-3 text-slate-400" />
                        <span>{item.note}</span>
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-semibold text-[11px]">
                      <MousePointerClick className="w-3 h-3 text-blue-500" />
                      <span>{item.hitCount || 0} clicks forwarded</span>
                    </span>
                  </div>
                </div>

                {/* Right: Actions & iOS Switch */}
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-zinc-800 shrink-0">
                  {/* Apple iOS-Style Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(item)}
                    disabled={actionLoading === item.id}
                    className="flex items-center gap-2 group cursor-pointer focus:outline-none"
                    title={item.isActive ? "Click to pause redirect rule" : "Click to activate redirect rule"}
                  >
                    <div
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shadow-inner ${
                        item.isActive ? "bg-emerald-500" : "bg-slate-300 dark:bg-zinc-700"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                          item.isActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-bold ${
                      item.isActive ? "text-[#008744] dark:text-emerald-400" : "text-slate-500 dark:text-zinc-400"
                    }`}>
                      {item.isActive ? "Active" : "Paused"}
                    </span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-2 text-slate-500 hover:text-[#008744] hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                      title="Edit rule"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={actionLoading === item.id}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Delete rule"
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

      {/* =================================================================== */}
      {/* CREATE / EDIT MODAL WITH LIVE PATH VISUALIZER                       */}
      {/* =================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center bg-slate-50/80 dark:bg-zinc-800/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#008744] dark:text-emerald-400 flex items-center justify-center font-bold">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0C1628] dark:text-zinc-100">
                    {editingRedirect ? "Edit URL Redirect Rule" : "Create URL Redirect Rule"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Routing incoming links safely without losing search engine equity.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Live Visual Path Card */}
              <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800 shadow-lg space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Live Path Simulator
                  </span>
                  <span>{statusCode === 301 ? "301 Permanent (SEO Safe)" : "302 Temporary"}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1 text-xs font-mono">
                  <div className="w-full sm:flex-1 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 truncate">
                    <span className="text-slate-500">https://...</span>
                    <span className="font-bold text-white">{sourcePath || "/incoming-path"}</span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 rotate-90 sm:rotate-0" />

                  <div className="w-full sm:flex-1 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 truncate">
                    <span className="font-bold">{destinationPath || "/destination-target"}</span>
                  </div>
                </div>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Source Path */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    1. Incoming Old Path <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={sourcePath}
                    onChange={(e) => setSourcePath(e.target.value)}
                    placeholder="e.g. /growth-services or /audit"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-mono text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                    Must start with a slash (/). System routes like /admin and /api are protected.
                  </p>
                </div>

                {/* 2. Destination Path or URL */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
                      2. Destination Target <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setDestinationType("internal");
                          setDestinationPath("/services");
                        }}
                        className={`font-semibold cursor-pointer ${
                          destinationType === "internal"
                            ? "text-[#008744] underline"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        Site Page
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          setDestinationType("custom");
                          setDestinationPath("");
                        }}
                        className={`font-semibold cursor-pointer ${
                          destinationType === "custom"
                            ? "text-[#008744] underline"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        Custom / External URL
                      </button>
                    </div>
                  </div>

                  {destinationType === "internal" ? (
                    <select
                      value={destinationPath}
                      onChange={(e) => setDestinationPath(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-mono text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                    >
                      <option value="/services">Services Overview (/services)</option>
                      <option value="/portfolio">Portfolio Case Studies (/portfolio)</option>
                      <option value="/contact">Free Growth Audit Desk (/contact)</option>
                      <option value="/blog">Knowledge Hub (/blog)</option>
                      <option value="/services/meta-partner">Meta Partner Ads (/services/meta-partner)</option>
                      <option value="/landing/performance-marketing-blueprint">Performance Marketing Blueprint</option>
                      <option value="/forms/vip-partner">VIP Partner Form (/forms/vip-partner)</option>
                      <option value="/contact?product=restromitra">RestroMitra Inquiry</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      required
                      value={destinationPath}
                      onChange={(e) => setDestinationPath(e.target.value)}
                      placeholder="e.g. /custom-page or https://wa.me/919081145178"
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-mono text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                    />
                  )}
                </div>

                {/* 3. HTTP Status Code & Active Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      3. Redirect Type
                    </label>
                    <select
                      value={statusCode}
                      onChange={(e) => setStatusCode(Number(e.target.value) as RedirectStatusCode)}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                    >
                      <option value={301}>301 Permanent (Passes SEO Equity)</option>
                      <option value={302}>302 Temporary (Marketing & Testing)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      Status State
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsActive(!isActive)}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-700 rounded-xl flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                        {isActive ? "Active (Forwarding)" : "Paused"}
                      </span>
                      <div
                        className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                          isActive ? "bg-emerald-500" : "bg-slate-300 dark:bg-zinc-700"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                            isActive ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </button>
                  </div>
                </div>

                {/* 4. Internal Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    4. Internal Note / Reason (Optional)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Migration from old website, or Instagram bio shortlink"
                    className="w-full px-3.5 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-800/40 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{editingRedirect ? "Save & Update Rule" : "Activate Redirect Rule"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1-CLICK RESET TO DEFAULTS CONFIRMATION DIALOG */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetToDefaults}
        title="Reset URL Redirects to Canonical Defaults?"
        message={`This will restore the 8 official DigiVigee URL redirect rules:
• /growth-services -> /services (301 Permanent)
• /case-studies -> /portfolio (301 Permanent)
• /audit -> /contact (301 Permanent)
• /whatsapp -> https://wa.me/919081145178 (302 Temporary)
• /blueprint -> /landing/performance-marketing-blueprint (301)
• /pos -> /contact?product=restromitra (301)
• /partner -> /forms/vip-partner (301)
• /careers -> /contact?subject=careers (302)

Old rules will be replaced and synced with Edge middleware immediately.`}
        confirmLabel="Yes, Reset to Defaults"
        isLoading={isResetLoading}
        isDestructive={false}
      />

      {/* Toast Feedback */}
      {message && (
        <div
          className={`fixed bottom-6 right-6 z-[300] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 border ${
            message.type === "success"
              ? "bg-[#0C1628] text-white border-emerald-500/50"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              message.type === "success" ? "bg-emerald-500 text-white" : "bg-red-100 text-red-600"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </div>
          <span className="text-xs sm:text-sm font-bold">{message.text}</span>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="ml-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
