"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ContentRevision, AuditResourceType } from "@/types/rbac";

interface AdminRevisionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: AuditResourceType;
  resourceId: string;
  resourceTitle?: string;
  onRestored?: () => void;
}

export const AdminRevisionDrawer: React.FC<AdminRevisionDrawerProps> = ({
  isOpen,
  onClose,
  resourceType,
  resourceId,
  resourceTitle,
  onRestored,
}) => {
  const [revisions, setRevisions] = useState<ContentRevision[]>([]);
  const [selectedRevision, setSelectedRevision] = useState<ContentRevision | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "json">("summary");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmRestore, setConfirmRestore] = useState(false);

  const fetchRevisions = useCallback(async () => {
    if (!resourceType || !resourceId) return;
    setIsLoading(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/revisions?resourceType=${resourceType}&resourceId=${encodeURIComponent(resourceId)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.revisions)) {
        setRevisions(data.revisions);
        if (data.revisions.length > 0) {
          setSelectedRevision(data.revisions[0]);
        } else {
          setSelectedRevision(null);
        }
      } else {
        setRevisions([]);
        setSelectedRevision(null);
      }
    } catch (err) {
      console.error("[AdminRevisionDrawer] Failed to fetch revisions:", err);
    } finally {
      setIsLoading(false);
    }
  }, [resourceType, resourceId]);

  useEffect(() => {
    if (isOpen) {
      fetchRevisions();
      setConfirmRestore(false);
      setFeedback(null);
    }
  }, [isOpen, fetchRevisions]);

  const handleRestore = async () => {
    if (!selectedRevision) return;
    setIsRestoring(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/revisions/${selectedRevision.id}/restore`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          message: data.message || `Successfully restored Version ${selectedRevision.version}! A new sequential version was generated.`,
        });
        setConfirmRestore(false);
        await fetchRevisions();
        if (onRestored) {
          onRestored();
        }
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Failed to restore content version.",
        });
      }
    } catch (err) {
      console.error("[AdminRevisionDrawer] Restore error:", err);
      setFeedback({ type: "error", message: "Network error while restoring revision snapshot." });
    } finally {
      setIsRestoring(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-2xl bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90 sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Revision History
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700 font-mono">
                    {resourceType}
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 truncate max-w-md">
                  {resourceTitle || resourceId}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Feedback message banner */}
          {feedback && (
            <div
              className={`p-4 border-b text-sm flex items-start gap-3 ${
                feedback.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
              }`}
            >
              <div className="flex-1">{feedback.message}</div>
              <button
                onClick={() => setFeedback(null)}
                className="text-xs opacity-70 hover:opacity-100 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Body Content: Split into Version List & Detail Inspector */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            
            {/* Version List Sidebar */}
            <div className="md:col-span-2 p-4 space-y-3 bg-neutral-950/40">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider px-1">
                <span>Versions ({revisions.length})</span>
                <button
                  onClick={fetchRevisions}
                  title="Refresh revisions"
                  className="hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isLoading ? "animate-spin" : ""}>
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                </button>
              </div>

              {isLoading && revisions.length === 0 && (
                <div className="p-8 text-center text-xs text-neutral-500">
                  Loading version timeline...
                </div>
              )}

              {!isLoading && revisions.length === 0 && (
                <div className="p-6 text-center text-xs text-neutral-500 bg-neutral-900/50 rounded-xl border border-neutral-800/80">
                  No prior revisions recorded yet. Revisions are created automatically upon each edit.
                </div>
              )}

              <div className="space-y-2">
                {revisions.map((rev, index) => {
                  const isSelected = selectedRevision?.id === rev.id;
                  const isLatest = index === 0;

                  return (
                    <button
                      key={rev.id}
                      onClick={() => {
                        setSelectedRevision(rev);
                        setConfirmRestore(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500/40 shadow-sm"
                          : "bg-neutral-900/60 border-neutral-800/80 hover:bg-neutral-800/60 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                          isSelected ? "bg-amber-500/20 text-amber-300" : "bg-neutral-800 text-neutral-300"
                        }`}>
                          v{rev.version}
                        </span>
                        {isLatest && (
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Current
                          </span>
                        )}
                        {rev.restoredFromVersion && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            From v{rev.restoredFromVersion}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-neutral-200 font-medium truncate">
                        {rev.changeSummary || `Version ${rev.version}`}
                      </p>

                      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-neutral-400">
                        <span className="truncate">{rev.createdBy?.email || "Admin"}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">
                        {new Date(rev.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Version Detail Inspector */}
            <div className="md:col-span-3 p-6 flex flex-col justify-between">
              {selectedRevision ? (
                <div className="space-y-6">
                  {/* Version Header Meta */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-mono">
                          Version {selectedRevision.version}
                        </h3>
                        {revisions[0]?.id === selectedRevision.id && (
                          <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Active Live State
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">
                        Captured {new Date(selectedRevision.createdAt).toLocaleString()} by{" "}
                        <strong className="text-neutral-300">{selectedRevision.createdBy?.email}</strong>
                      </p>
                    </div>

                    {/* Restore Trigger */}
                    {revisions[0]?.id !== selectedRevision.id && (
                      <div>
                        {!confirmRestore ? (
                          <button
                            onClick={() => setConfirmRestore(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs shadow-md transition-all"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="1 4 1 10 7 10" />
                              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                            </svg>
                            Restore This Version
                          </button>
                        ) : (
                          <div className="p-3 bg-amber-950/40 border border-amber-500/50 rounded-xl space-y-2 text-right">
                            <p className="text-[11px] text-amber-200 font-semibold">
                              Revert live content to Version {selectedRevision.version}?
                            </p>
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setConfirmRestore(false)}
                                className="px-2 py-1 text-xs text-neutral-400 hover:text-white"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleRestore}
                                disabled={isRestoring}
                                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg disabled:opacity-50"
                              >
                                {isRestoring ? "Restoring..." : "Yes, Restore"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Inspector Tabs */}
                  <div className="flex border-b border-neutral-800 gap-4 text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab("summary")}
                      className={`pb-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                        activeTab === "summary"
                          ? "border-amber-500 text-amber-400"
                          : "border-transparent text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      Summary
                    </button>
                    <button
                      onClick={() => setActiveTab("json")}
                      className={`pb-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                        activeTab === "json"
                          ? "border-amber-500 text-amber-400"
                          : "border-transparent text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      Snapshot Payload
                    </button>
                  </div>

                  {/* Tab Contents */}
                  {activeTab === "summary" && (
                    <div className="space-y-4 text-xs">
                      <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                        <div className="text-neutral-400 font-semibold">Change Description:</div>
                        <div className="text-white text-sm">
                          {selectedRevision.changeSummary || "No description provided."}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-3">
                        <div className="text-neutral-400 font-semibold">Metadata Summary:</div>
                        <div className="grid grid-cols-2 gap-2 text-neutral-300">
                          <div>
                            <span className="text-neutral-500">Resource:</span> {selectedRevision.resourceType}
                          </div>
                          <div>
                            <span className="text-neutral-500">Version:</span> #{selectedRevision.version}
                          </div>
                          <div>
                            <span className="text-neutral-500">Actor Role:</span> {selectedRevision.createdBy?.role || "Admin"}
                          </div>
                          <div>
                            <span className="text-neutral-500">Fields Saved:</span>{" "}
                            {Object.keys(selectedRevision.snapshot || {}).length}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-[11px] text-neutral-400">
                        🛡️ <strong>Safety Guarantee:</strong> Restoring this version will not erase revision history. A brand new version will be appended to ensure a continuous, auditable trail.
                      </div>
                    </div>
                  )}

                  {activeTab === "json" && (
                    <div className="relative">
                      <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[11px] overflow-x-auto max-h-96 leading-relaxed">
                        {JSON.stringify(selectedRevision.snapshot, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-neutral-500">
                  Select a version to inspect snapshot details.
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-900/90 flex items-center justify-between text-xs text-neutral-400">
            <span>DigiVigee Content Snapshot Engine</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
