"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Activity,
  Users,
  UserCheck,
  Target,
  CreditCard,
  Calendar,
  MapPin,
  Search,
  FileText,
  Globe,
  Layers,
  CheckSquare,
  ShieldCheck,
  Sparkles,
  BarChart3,
  UserPlus,
  Settings,
  ChevronDown,
  Plus,
  ArrowLeft,
  X,
  Check,
  ExternalLink,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Workspace, NavSection } from "../types";

interface SidebarProps {
  currentModule: string;
  onSelectModule: (module: string) => void;
  currentWorkspace: Workspace;
  onSelectWorkspace: (workspace: Workspace) => void;
  workspaces: Workspace[];
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  currentModule,
  onSelectModule,
  currentWorkspace,
  onSelectWorkspace,
  workspaces,
  isMobileOpen = false,
  onCloseMobile,
  theme = "light",
  onToggleTheme,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);

  // Grouped Navigation Items matching Enterprise $10B Architecture
  const navigationSections: NavSection[] = [
    {
      groupTitle: "OVERVIEW",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "health", label: "Multi-Client Health", icon: Activity },
      ],
    },
    {
      groupTitle: "CLIENTS & GROWTH",
      items: [
        { id: "clients", label: "Clients", icon: Users },
        { id: "crm", label: "CRM Pipeline", icon: UserCheck, badge: "12" },
        { id: "leads", label: "Leads", icon: Target },
        { id: "billing", label: "Billing & Retainers", icon: CreditCard },
      ],
    },
    {
      groupTitle: "MARKETING ENGINE",
      items: [
        { id: "social", label: "Social Media Hub", icon: Calendar },
        { id: "gbp", label: "Google Business (GBP)", icon: MapPin },
        { id: "seo", label: "SEO Management", icon: Search },
        { id: "content", label: "Content & Blog", icon: FileText },
        { id: "websites", label: "Websites & CMS", icon: Globe, isNew: true },
      ],
    },
    {
      groupTitle: "WORK & COLLABORATION",
      items: [
        { id: "projects", label: "Projects & Campaigns", icon: Layers },
        { id: "tasks", label: "Tasks", icon: CheckSquare },
        {
          id: "approvals",
          label: "Client Approvals",
          icon: ShieldCheck,
          badge: "24",
          badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
        },
        { id: "automation", label: "Automation & AI", icon: Sparkles },
      ],
    },
    {
      groupTitle: "MANAGEMENT",
      items: [
        { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
        { id: "team", label: "Team & Roles", icon: UserPlus },
        { id: "settings", label: "Settings", icon: Settings },
      ],
    },
  ];

  const isDark = theme === "dark";

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Container with Theme Cohesion (Fixing Khami 1 & 21) */}
      <aside
        className={`fixed lg:relative top-0 left-0 bottom-0 h-full shrink-0 border-r flex flex-col z-50 lg:z-auto transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[68px]" : "w-[260px]"
        } ${
          isDark
            ? "bg-[#090D16] text-slate-300 border-slate-800/80"
            : "bg-white text-slate-700 border-slate-200/80"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header: Digivigee Brand Mark & Panel Badge */}
        <div
          className={`h-[56px] px-3.5 border-b flex items-center justify-between shrink-0 ${
            isDark ? "bg-[#090D16] border-slate-800/80" : "bg-white border-slate-200/80"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Link href="/" className="flex items-center group shrink-0">
              <img
                src="/images/doctor/assets/logo.png"
                alt="Dr. Noopur Patel"
                className={`h-[28px] w-auto object-contain transition-all ${
                  isCollapsed ? "max-w-[32px] overflow-hidden" : ""
                }`}
              />
            </Link>
            {!isCollapsed && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 truncate">
                Agency OS
              </span>
            )}
          </div>

          {/* Close Button on Mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Workspace Switcher Component with Health Score & MRR (Fixing Khami 20) */}
        <div
          className={`p-2.5 border-b relative ${
            isDark ? "border-slate-800/60" : "border-slate-200/70"
          }`}
        >
          <button
            onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
            title={isCollapsed ? `${currentWorkspace.name} (${currentWorkspace.type === "agency" ? "Agency HQ" : "Client Portal"})` : undefined}
            className={`w-full rounded-xl border transition flex items-center text-left group cursor-pointer ${
              isCollapsed ? "p-1.5 justify-center" : "p-2 justify-between"
            } ${
              isDark
                ? "bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-slate-700"
                : "bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 shadow-xs ${
                  currentWorkspace.type === "agency"
                    ? "bg-gradient-to-tr from-emerald-500 to-teal-500 text-white"
                    : "bg-indigo-600 text-white"
                }`}
              >
                {currentWorkspace.initials}
              </div>

              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <div
                    className={`text-[12.5px] font-bold truncate leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {currentWorkspace.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium truncate">
                    {currentWorkspace.type === "agency" ? "Agency Master HQ" : "Client Workspace"}
                  </div>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <ChevronDown
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                  workspaceDropdownOpen ? "rotate-180 text-emerald-500" : ""
                }`}
              />
            )}
          </button>

          {/* Workspace Switcher Dropdown Popover */}
          {workspaceDropdownOpen && (
            <div
              className={`absolute top-full mt-1.5 p-2 rounded-2xl shadow-2xl border z-50 animate-in fade-in duration-150 ${
                isCollapsed ? "left-2 w-64" : "left-2.5 right-2.5"
              } ${
                isDark ? "bg-[#0B1120] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Switch Workspace
              </div>

              <div className="space-y-1 my-1 max-h-60 overflow-y-auto">
                {workspaces.map((ws) => {
                  const isSelected = ws.id === currentWorkspace.id;
                  return (
                    <button
                      key={ws.id}
                      onClick={() => {
                        onSelectWorkspace(ws);
                        setWorkspaceDropdownOpen(false);
                      }}
                      className={`w-full p-2 rounded-xl transition flex items-center justify-between text-left cursor-pointer group ${
                        isSelected
                          ? isDark
                            ? "bg-slate-800 border border-slate-700/60"
                            : "bg-emerald-50/70 border border-emerald-200/80 text-emerald-900"
                          : isDark
                          ? "hover:bg-slate-800/60"
                          : "hover:bg-slate-100/70"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                            ws.type === "agency"
                              ? "bg-emerald-500 text-white"
                              : "bg-indigo-600 text-white"
                          }`}
                        >
                          {ws.initials}
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-xs font-extrabold truncate ${
                              isSelected
                                ? isDark ? "text-emerald-400" : "text-emerald-700"
                                : isDark ? "text-slate-200" : "text-slate-800"
                            }`}
                          >
                            {ws.name}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                            <span>{ws.type === "agency" ? "Agency HQ" : "Client Portal"}</span>
                            {ws.mrr && <span>• {ws.mrr}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {ws.healthScore && (
                          <span
                            className={`text-[9.5px] font-black px-1.5 py-0.5 rounded-full ${
                              ws.healthScore >= 90
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                : ws.healthScore >= 80
                                ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                                : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {ws.healthScore}% Health
                          </span>
                        )}
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={`pt-1.5 mt-1.5 border-t text-center ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                <button
                  onClick={() => {
                    alert("Add new Client Workspace modal opened");
                    setWorkspaceDropdownOpen(false);
                  }}
                  className="w-full py-1.5 px-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Connect New Client Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Navigation Groups */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4 text-left scrollbar-thin">
          {navigationSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-0.5">
              {/* Section Header */}
              {!isCollapsed && (
                <div
                  className={`px-3 py-1 text-[10px] font-black tracking-wider uppercase select-none ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {section.groupTitle}
                </div>
              )}

              {/* Navigation Items */}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentModule === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectModule(item.id);
                        if (onCloseMobile) onCloseMobile();
                      }}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center rounded-xl transition-all cursor-pointer group text-xs relative ${
                        isCollapsed ? "justify-center p-2.5" : "px-3 py-2 justify-between"
                      } ${
                        isActive
                          ? isDark
                            ? "bg-emerald-500/10 text-emerald-400 font-extrabold border border-emerald-500/20"
                            : "bg-emerald-500/10 text-emerald-800 font-extrabold border border-emerald-500/20 shadow-2xs"
                          : isDark
                          ? "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                          : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/80"
                      }`}
                    >
                      {/* Active Indicator Edge Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-500 rounded-r-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      )}

                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? isDark ? "text-emerald-400" : "text-emerald-600"
                              : isDark ? "text-slate-400 group-hover:text-slate-200" : "text-slate-500 group-hover:text-slate-900"
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>

                      {/* Badges */}
                      {!isCollapsed && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge && (
                            <span
                              className={`text-[9.5px] font-black px-1.5 py-0.2 rounded-full border ${
                                item.badgeColor ||
                                (isDark
                                  ? "bg-slate-800 text-slate-300 border-slate-700"
                                  : "bg-slate-100 text-slate-700 border-slate-200")
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {item.isNew && (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                              NEW
                            </span>
                          )}
                        </div>
                      )}

                      {/* Small notification dot in collapsed mode */}
                      {isCollapsed && item.badge && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile & Collapsible Rail Footer (Fixing Khami 21) */}
        <div
          className={`p-2.5 border-t shrink-0 flex flex-col gap-2 ${
            isDark ? "border-slate-800/80 bg-[#0B1120]" : "border-slate-200/80 bg-slate-50/70"
          }`}
        >
          {/* User Profile Tile */}
          <div
            className={`flex items-center gap-2 rounded-xl transition ${
              isCollapsed ? "justify-center p-1" : "p-1.5 justify-between"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative shrink-0">
                <div className="w-7 h-7 rounded-full bg-slate-800 dark:bg-emerald-500 text-white font-black text-xs flex items-center justify-center">
                  R
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>

              {!isCollapsed && (
                <div className="min-w-0 text-left leading-tight">
                  <div className={`text-xs font-bold truncate ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                    Rahul Sharma
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    Admin • Digivigee
                  </div>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <Link
                href="/"
                title="Return to Public Website"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Bottom Actions: Theme Toggle & Sidebar Collapse Toggle (Cmd + B) */}
          <div
            className={`flex items-center gap-1 pt-1 border-t ${
              isCollapsed ? "justify-center" : "justify-between"
            } ${isDark ? "border-slate-800/60" : "border-slate-200/60"}`}
          >
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                title={isCollapsed ? "Expand Sidebar (Cmd + B)" : "Collapse to Rail (Cmd + B)"}
                className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4" />
                ) : (
                  <>
                    <PanelLeftClose className="w-3.5 h-3.5" />
                    <span>Collapse Rail</span>
                    <kbd className="text-[9px] px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-500">⌘B</kbd>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
