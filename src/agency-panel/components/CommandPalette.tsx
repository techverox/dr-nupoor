"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  LayoutDashboard,
  Activity,
  Users,
  UserCheck,
  Calendar,
  MapPin,
  FileText,
  CreditCard,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Workspace } from "../types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (moduleId: string) => void;
  onSelectWorkspace: (workspace: Workspace) => void;
  workspaces: Workspace[];
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectModule,
  onSelectWorkspace,
  workspaces,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Navigation commands
  const navCommands = [
    { id: "dashboard", label: "Executive Dashboard", category: "Navigation", icon: LayoutDashboard },
    { id: "health", label: "Multi-Client Health Monitor", category: "Navigation", icon: Activity },
    { id: "clients", label: "Clients Directory & Portals", category: "Navigation", icon: Users },
    { id: "crm", label: "CRM Sales Pipeline", category: "Navigation", icon: UserCheck },
    { id: "social", label: "Social Media Hub & Calendar", category: "Navigation", icon: Calendar },
    { id: "gbp", label: "Google Business Profile (GBP)", category: "Navigation", icon: MapPin },
    { id: "billing", label: "Billing & Retainers", category: "Navigation", icon: CreditCard },
  ].filter((item) => !q || item.label.toLowerCase().includes(q) || item.id.includes(q));

  // Workspace commands
  const workspaceCommands = workspaces.filter(
    (ws) => !q || ws.name.toLowerCase().includes(q) || (ws.clientName && ws.clientName.toLowerCase().includes(q))
  );

  // Quick Action commands
  const actionCommands = [
    { id: "act-post", label: "Schedule New Social Post", icon: Plus, action: () => alert("Schedule Post opened") },
    { id: "act-lead", label: "Add New Client Lead", icon: Plus, action: () => alert("New Lead modal opened") },
    { id: "act-report", label: "Generate Executive PDF Report", icon: FileText, action: () => alert("Generating PDF Report...") },
    { id: "act-ai", label: "Run AI Copilot Audit", icon: Sparkles, action: () => alert("AI Audit running...") },
  ].filter((item) => !q || item.label.toLowerCase().includes(q));

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/80 dark:border-slate-800 ring-1 ring-slate-900/[0.05] dark:ring-white/[0.08] shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Command Input */}
        <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-[#0B1120]/50">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search client, or jump to module..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <kbd
            onClick={onClose}
            className="px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200"
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4 text-xs">
          {/* Workspaces Section */}
          {workspaceCommands.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Workspaces & Clients
              </div>
              <div className="space-y-0.5">
                {workspaceCommands.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      onSelectWorkspace(ws);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/70 transition cursor-pointer text-slate-800 dark:text-slate-200 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-[10px] flex items-center justify-center shrink-0 border border-emerald-500/30">
                        {ws.initials}
                      </span>
                      <span className="font-bold truncate">{ws.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {ws.type === "agency" ? "Agency Master HQ" : "Client Portal"}
                      </span>
                    </div>
                    {ws.healthScore && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                        {ws.healthScore}% Health
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Section */}
          {navCommands.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Navigation Modules
              </div>
              <div className="space-y-0.5">
                {navCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        onSelectModule(cmd.id);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/70 transition cursor-pointer text-slate-800 dark:text-slate-200 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 transition-colors" />
                        <span className="font-medium truncate">{cmd.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Actions Section */}
          {actionCommands.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Quick Actions
              </div>
              <div className="space-y-0.5">
                {actionCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/70 transition cursor-pointer text-slate-800 dark:text-slate-200 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-semibold truncate">{cmd.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Action</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {workspaceCommands.length === 0 && navCommands.length === 0 && actionCommands.length === 0 && (
            <div className="p-8 text-center text-slate-400 space-y-1">
              <p className="font-semibold text-sm">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs">Try searching for &ldquo;CRM&rdquo;, &ldquo;ABC Clinic&rdquo;, or &ldquo;Schedule&rdquo;</p>
            </div>
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="p-2.5 px-4 bg-slate-50 dark:bg-[#0B1120] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigation: Click to jump</span>
          </div>
          <div>
            <span>Press <kbd className="font-mono bg-white dark:bg-slate-800 border px-1 rounded">ESC</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
