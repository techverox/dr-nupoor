"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminPermissionGuard } from "@/components/admin/AdminPermissionGuard";
import { AuditLogEntry, AuditAction, AuditResourceType } from "@/types/rbac";

export default function ActivityLogsPage() {
  return (
    <AdminPermissionGuard permission="audit_logs.view">
      <ActivityLogsDashboard />
    </AdminPermissionGuard>
  );
}

function ActivityLogsDashboard() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState<AuditAction | "all">("all");
  const [selectedResourceType, setSelectedResourceType] = useState<AuditResourceType | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "success" | "failure">("all");
  const [page, setPage] = useState(0);
  const limit = 25;

  // Detail Modal State
  const [activeLog, setActiveLog] = useState<AuditLogEntry | null>(null);

  // Stats
  const [stats, setStats] = useState<{
    totalCount: number;
    past24HoursCount: number;
    successRate: number;
  }>({
    totalCount: 0,
    past24HoursCount: 0,
    successRate: 100,
  });

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        limit: String(limit),
        offset: String(page * limit),
      });

      if (searchQuery.trim()) queryParams.set("search", searchQuery.trim());
      if (selectedAction !== "all") queryParams.set("action", selectedAction);
      if (selectedResourceType !== "all") queryParams.set("resourceType", selectedResourceType);
      if (selectedStatus !== "all") queryParams.set("status", selectedStatus);

      const [logsRes, statsRes] = await Promise.all([
        fetch(`/api/admin/audit-logs?${queryParams.toString()}`),
        fetch(`/api/admin/audit-logs?stats=true`),
      ]);

      const logsData = await logsRes.json();
      const statsData = await statsRes.json();

      if (logsData.success) {
        setLogs(logsData.logs || []);
        setTotalLogs(logsData.total || 0);
      }

      if (statsData.success && statsData.stats) {
        setStats(statsData.stats);
      }
    } catch (err) {
      console.error("[ActivityLogs] Error fetching logs:", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery, selectedAction, selectedResourceType, selectedStatus]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleExport = (format: "csv" | "json") => {
    const queryParams = new URLSearchParams({ format });
    if (selectedAction !== "all") queryParams.set("action", selectedAction);
    if (selectedResourceType !== "all") queryParams.set("resourceType", selectedResourceType);
    if (selectedStatus !== "all") queryParams.set("status", selectedStatus);

    window.open(`/api/admin/audit-logs/export?${queryParams.toString()}`, "_blank");
  };

  const getActionBadgeColor = (action: AuditAction) => {
    if (action.includes("DELETE") || action.includes("FAILED")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }
    if (action.includes("CREATE") || action.includes("INVITE")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    }
    if (action.includes("RESTORE")) {
      return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    }
    if (action.includes("PUBLISH")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
    if (action.includes("ROLE") || action.includes("PERMISSION")) {
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
    return "bg-neutral-800 text-neutral-300 border-neutral-700";
  };

  const totalPages = Math.ceil(totalLogs / limit);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Activity & Audit Logs
              </h1>
              <p className="text-xs text-neutral-400">
                Immutable, append-only operational telemetry and administrative audit trail
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchLogs()}
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Refresh logs"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isLoading ? "animate-spin" : ""}>
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>

          <button
            onClick={() => handleExport("csv")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>

          <button
            onClick={() => handleExport("json")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export JSON
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">{stats.totalCount}</div>
            <div className="text-xs text-neutral-400 font-medium">Total Recorded Events</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400 font-mono">{stats.past24HoursCount}</div>
            <div className="text-xs text-neutral-400 font-medium">Past 24 Hours Activity</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">{stats.successRate}%</div>
            <div className="text-xs text-neutral-400 font-medium">Execution Success Rate</div>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-1 relative">
            <input
              type="text"
              placeholder="Search summary or actor..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              className="w-full pl-3 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Action Filter */}
          <div>
            <select
              value={selectedAction}
              onChange={(e) => {
                setSelectedAction(e.target.value as AuditAction | "all");
                setPage(0);
              }}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Action Types</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
              <option value="PUBLISH">PUBLISH</option>
              <option value="UNPUBLISH">UNPUBLISH</option>
              <option value="RESTORE">RESTORE</option>
              <option value="LOGIN">LOGIN</option>
              <option value="LOGOUT">LOGOUT</option>
              <option value="ROLE_CHANGE">ROLE_CHANGE</option>
              <option value="SEO_UPDATE">SEO_UPDATE</option>
              <option value="SETTINGS_UPDATE">SETTINGS_UPDATE</option>
              <option value="BACKUP_EXPORT">BACKUP_EXPORT</option>
            </select>
          </div>

          {/* Resource Filter */}
          <div>
            <select
              value={selectedResourceType}
              onChange={(e) => {
                setSelectedResourceType(e.target.value as AuditResourceType | "all");
                setPage(0);
              }}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Resource Types</option>
              <option value="page">Pages</option>
              <option value="blog">Blogs</option>
              <option value="service">Services</option>
              <option value="portfolio">Portfolio</option>
              <option value="lead">Leads</option>
              <option value="seo">SEO Settings</option>
              <option value="settings">Site Settings</option>
              <option value="user">Admin Users</option>
              <option value="role">Roles & Permissions</option>
              <option value="auth">Authentication</option>
              <option value="backup">Backups & Exports</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value as "all" | "success" | "failure");
                setPage(0);
              }}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Statuses</option>
              <option value="success">Success Only</option>
              <option value="failure">Failures / Errors Only</option>
            </select>
          </div>

        </div>
      </div>

      {/* Logs Table Area */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">Status</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Resource</th>
                <th className="py-3.5 px-4">Summary Description</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    Querying audit events...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No audit records match the current filter criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const isSuccess = log.status === "success";

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-neutral-800/40 transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-center">
                        {isSuccess ? (
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"
                            title="Success"
                          />
                        ) : (
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"
                            title="Failure"
                          />
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-400 whitespace-nowrap font-mono text-[11px]">
                        {new Date(log.timestamp).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white truncate max-w-[160px]">
                          {log.actor.email}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono">
                          {log.actor.role}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${getActionBadgeColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-[11px] font-medium text-neutral-300 capitalize">
                          {log.resourceType}
                        </span>
                        {log.resourceTitle && (
                          <div className="text-[10px] text-neutral-500 truncate max-w-[140px]">
                            {log.resourceTitle}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="text-neutral-200 line-clamp-1 max-w-md">
                          {log.summary}
                        </p>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setActiveLog(log)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-medium transition-colors"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/40 flex items-center justify-between text-xs text-neutral-400">
          <div>
            Showing <strong className="text-white">{logs.length}</strong> of{" "}
            <strong className="text-white">{totalLogs}</strong> audit records
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0 || isLoading}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white disabled:opacity-40"
            >
              Previous
            </button>
            <span className="font-mono text-neutral-400">
              Page {page + 1} of {Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page + 1 >= totalPages || isLoading}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log Detail Modal */}
      {activeLog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Audit Event Details
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    ID: {activeLog.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveLog(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 bg-neutral-950/60 border border-neutral-800 rounded-xl space-y-1">
                <span className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                  Summary
                </span>
                <p className="text-white font-medium text-sm leading-relaxed">
                  {activeLog.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-neutral-950/40 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] uppercase font-semibold">
                    Timestamp
                  </span>
                  <div className="text-neutral-200 font-mono text-[11px]">
                    {new Date(activeLog.timestamp).toISOString()}
                  </div>
                </div>

                <div className="p-3 bg-neutral-950/40 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] uppercase font-semibold">
                    Execution Status
                  </span>
                  <div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        activeLog.status === "success"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {activeLog.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-950/40 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] uppercase font-semibold">
                    Action Type
                  </span>
                  <div className="font-mono text-neutral-200">{activeLog.action}</div>
                </div>

                <div className="p-3 bg-neutral-950/40 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] uppercase font-semibold">
                    Target Resource
                  </span>
                  <div className="text-neutral-200 capitalize">
                    {activeLog.resourceType}{" "}
                    {activeLog.resourceId && (
                      <span className="text-neutral-400 font-mono text-[10px]">
                        ({activeLog.resourceId})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actor Box */}
              <div className="p-3.5 bg-neutral-950/40 border border-neutral-800 rounded-xl space-y-2">
                <span className="text-neutral-500 text-[10px] uppercase font-semibold">
                  Actor Authentication Identity
                </span>
                <div className="grid grid-cols-2 gap-2 text-neutral-300">
                  <div>
                    <span className="text-neutral-500">Email:</span> {activeLog.actor.email}
                  </div>
                  <div>
                    <span className="text-neutral-500">Role:</span> {activeLog.actor.role}
                  </div>
                  <div>
                    <span className="text-neutral-500">UID:</span>{" "}
                    <span className="font-mono text-[10px]">{activeLog.actor.uid}</span>
                  </div>
                  {activeLog.actor.ipAddress && (
                    <div>
                      <span className="text-neutral-500">IP:</span> {activeLog.actor.ipAddress}
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata JSON Inspector */}
              {activeLog.metadata && Object.keys(activeLog.metadata).length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-neutral-500 text-[10px] uppercase font-semibold">
                    Sanitized Payload Metadata
                  </span>
                  <pre className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[10px] overflow-x-auto max-h-48 leading-relaxed">
                    {JSON.stringify(activeLog.metadata, null, 2)}
                  </pre>
                </div>
              )}

              {activeLog.errorMessage && (
                <div className="p-3 bg-rose-950/30 border border-rose-500/40 rounded-xl text-rose-300">
                  <strong>Error Trace:</strong> {activeLog.errorMessage}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-950/40 flex justify-end">
              <button
                onClick={() => setActiveLog(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
