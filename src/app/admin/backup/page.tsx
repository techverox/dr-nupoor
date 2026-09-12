"use client";

import React, { useState, useEffect } from "react";
import { AdminPermissionGuard } from "@/components/admin/AdminPermissionGuard";
import { ExportableCollectionDef } from "@/lib/services/backupService";

export default function BackupPage() {
  return (
    <AdminPermissionGuard permission="backup.view">
      <BackupDashboard />
    </AdminPermissionGuard>
  );
}

function BackupDashboard() {
  const [statusData, setStatusData] = useState<{
    totalEntities: number;
    collections: { id: string; name: string; count: number; category: string }[];
    health: string;
    disasterRecoveryGuide: {
      title: string;
      description: string;
      command: string;
    };
  } | null>(null);

  const [exportableCollections, setExportableCollections] = useState<ExportableCollectionDef[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/backup/status");
      const data = await res.json();
      if (data.success) {
        setStatusData(data.status);
        setExportableCollections(data.exportableCollections || []);
        if (Array.isArray(data.exportableCollections)) {
          setSelectedCollections(data.exportableCollections.map((c: ExportableCollectionDef) => c.id));
        }
      }
    } catch (err) {
      console.error("[BackupDashboard] Error loading status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleToggleCollection = (id: string) => {
    setSelectedCollections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedCollections(exportableCollections.map((c) => c.id));
  };

  const handleDeselectAll = () => {
    setSelectedCollections([]);
  };

  const handleExportFull = async () => {
    setIsExporting(true);
    setExportMessage(null);
    try {
      const res = await fetch("/api/admin/backup/export", {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to generate backup bundle.");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `digivigee-full-backup-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      setExportMessage("Full application backup archive successfully downloaded.");
    } catch (err) {
      console.error("[handleExportFull] Error:", err);
      alert("Failed to download database backup. Please check your network connection.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSelected = async () => {
    if (selectedCollections.length === 0) {
      alert("Please select at least one collection to export.");
      return;
    }

    setIsExporting(true);
    setExportMessage(null);
    try {
      const res = await fetch("/api/admin/backup/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collections: selectedCollections }),
      });
      if (!res.ok) throw new Error("Failed to generate custom export.");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `digivigee-custom-backup-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      setExportMessage(`Export of ${selectedCollections.length} collections completed successfully.`);
    } catch (err) {
      console.error("[handleExportSelected] Error:", err);
      alert("Failed to export selected collections.");
    } finally {
      setIsExporting(false);
    }
  };

  const copyCommand = () => {
    if (statusData?.disasterRecoveryGuide?.command) {
      navigator.clipboard.writeText(statusData.disasterRecoveryGuide.command);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2500);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Data Backup & Storage Safeguards
            </h1>
            <p className="text-xs text-neutral-400">
              Structured database JSON exports, sanitized archive downloads, and disaster recovery configurations
            </p>
          </div>
        </div>

        <button
          onClick={fetchStatus}
          className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors self-start md:self-auto"
          title="Refresh storage inventory"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isLoading ? "animate-spin" : ""}>
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>

      {/* Success Notification Banner */}
      {exportMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span>{exportMessage}</span>
          </div>
          <button
            onClick={() => setExportMessage(null)}
            className="text-xs opacity-70 hover:opacity-100 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">
              {statusData?.totalEntities ?? "--"}
            </div>
            <div className="text-xs text-neutral-400 font-medium">Total Database Documents</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400 font-mono">
              {exportableCollections.length}
            </div>
            <div className="text-xs text-neutral-400 font-medium">Whitelisted Collections</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
              Sanitized & Protected
            </div>
            <div className="text-[11px] text-neutral-400 font-medium mt-0.5">
              Zero Passwords or Secrets in Exports
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Selective Export Matrix (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  Selective Collection Export
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Select specific data collections to export as a structured JSON bundle
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={handleSelectAll}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={handleDeselectAll}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  Deselect All
                </button>
              </div>
            </div>

            {/* Collection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportableCollections.map((col) => {
                const isSelected = selectedCollections.includes(col.id);
                const count = statusData?.collections.find((c) => c.id === col.id)?.count ?? 0;

                return (
                  <div
                    key={col.id}
                    onClick={() => handleToggleCollection(col.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 select-none ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500/40 shadow-sm"
                        : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-amber-500 bg-neutral-800 border-neutral-700 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-white">{col.name}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 pl-6 leading-relaxed">
                        {col.description}
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 shrink-0">
                      {count} docs
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Export Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-800/80">
              <div className="text-xs text-neutral-400">
                Selected: <strong className="text-white">{selectedCollections.length}</strong> of{" "}
                {exportableCollections.length} collections
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleExportSelected}
                  disabled={isExporting || selectedCollections.length === 0}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {isExporting ? "Generating Export..." : "Export Selected (JSON)"}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Quick Backup & Disaster Recovery Guide */}
        <div className="space-y-6">
          
          {/* Quick Full Backup Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Full Application Data Bundle</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Download a complete, consolidated JSON archive of all CMS content, forms, leads, and configuration.
              </p>
            </div>
            <button
              onClick={handleExportFull}
              disabled={isExporting}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs border border-neutral-700 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              Download Full JSON Bundle
            </button>
          </div>

          {/* Infrastructure Disaster Recovery Guide Card */}
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-4">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <h3 className="text-sm font-bold text-white">
                GCP Automated Disaster Recovery
              </h3>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              For complete infrastructure-level backup with Point-in-Time Recovery (PITR), configure Google Cloud Scheduled Firestore Exports to a Cloud Storage Bucket:
            </p>

            <div className="relative group">
              <pre className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-amber-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                {statusData?.disasterRecoveryGuide?.command || "gcloud firestore export gs://digivigee-backup-bucket --async"}
              </pre>
              <button
                onClick={copyCommand}
                className="absolute right-2.5 top-2.5 p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                title="Copy Command"
              >
                {copiedCommand ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80 text-[11px] text-neutral-400 space-y-1.5">
              <div className="font-semibold text-neutral-300">
                Data Export vs Cloud Infrastructure Backup:
              </div>
              <p>
                <strong>Application Data Export:</strong> Portable JSON/CSV of business content for auditing and selective import.
              </p>
              <p>
                <strong>GCP Storage Snapshot:</strong> Byte-level database backup used for complete cloud disaster recovery.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
