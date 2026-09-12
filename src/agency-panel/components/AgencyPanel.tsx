"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardOverview from "./views/DashboardOverview";
import InteractiveModules from "./views/InteractiveModules";
import ClientWorkspaceView from "./views/ClientWorkspaceView";
import CommandPalette from "./CommandPalette";
import LayoutCustomizerDrawer from "./LayoutCustomizerDrawer";
import DrilldownDrawer from "./DrilldownDrawer";
import { useAgencyPanel } from "../hooks/useAgencyPanel";
import { DEFAULT_LAYOUT_CONFIG } from "../database/initial-data";
import { Workflow } from "lucide-react";
import LoginScreen from "./LoginScreen";

export default function AgencyPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    db,
    currentWorkspace,
    activeModule,
    setActiveModule,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    switchWorkspace,
    approveDeliverable,
    requestChangesDeliverable,
    addCommentToDeliverable,
    fixGbpIssue,
    theme,
    toggleTheme,
    isSidebarCollapsed,
    toggleSidebarCollapse,
    currency,
    setCurrency,
    formatMoney,
    layoutConfig,
    toggleWidget,
    layoutCustomizerOpen,
    setLayoutCustomizerOpen,
    activeDrilldownMetric,
    openDrilldown,
    closeDrilldown,
    isLoadingShimmer,
  } = useAgencyPanel();

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global shortcuts: Cmd+K / Ctrl+K (Command Palette) & Cmd+B / Ctrl+B (Sidebar Rail Mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K" || e.key === "/")) {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        toggleSidebarCollapse();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebarCollapse]);

  const moduleTitles: Record<string, string> = {
    dashboard: "Agency Executive Dashboard",
    health: "Multi-Client Health Monitor",
    clients: "Clients Directory & Portals",
    crm: "CRM Sales Pipeline",
    leads: "Inbound & Outbound Leads",
    billing: "Billing & Retainer Engine",
    social: "Social Media Hub & Calendar",
    gbp: "Google Business Profile (GBP) Audit",
    seo: "SEO Rank & Backlink Tracker",
    content: "Content & Copywriting Lab",
    websites: "Websites & Landing Pages CMS",
    projects: "Campaign Projects & Roadmaps",
    tasks: "Agency Tasks & Kanban",
    approvals: "Client Approval Portal",
    automation: "Automation & AI Copilot",
    reports: "Executive Performance Reports",
    team: "Team Roles & Permissions",
    settings: "Workspace Settings & Integrations",
  };

  if (!isAuthenticated) {
    return (
      <div className={theme === "dark" ? "dark" : ""}>
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div
      className={`h-screen flex flex-row overflow-hidden font-sans transition-colors duration-200 ${
        theme === "dark" ? "dark bg-[#090D16] text-slate-100" : "bg-[#F8FAFC] text-slate-900"
      }`}
    >
      {/* Global Cmd + K Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectModule={(mod) => setActiveModule(mod)}
        onSelectWorkspace={switchWorkspace}
        workspaces={db.workspaces}
      />

      {/* Real "+ Customize" Layout Drawer (Fix 19) */}
      <LayoutCustomizerDrawer
        isOpen={layoutCustomizerOpen}
        onClose={() => setLayoutCustomizerOpen(false)}
        config={layoutConfig}
        onToggle={toggleWidget}
        onReset={() => {
          localStorage.removeItem("digivigee_layout_config");
          window.location.reload();
        }}
      />

      {/* KPI Card Drilldown Slide-over Sheet (Fix 13) */}
      <DrilldownDrawer
        metricId={activeDrilldownMetric}
        onClose={closeDrilldown}
        onNavigateModule={(mod) => setActiveModule(mod)}
      />

      {/* 1. Categorized Left Sidebar with Theme Cohesion & 68px Rail Mode (Fix 1, 2, 20, 21) */}
      <Sidebar
        currentModule={activeModule}
        onSelectModule={(mod) => setActiveModule(mod)}
        currentWorkspace={currentWorkspace}
        onSelectWorkspace={switchWorkspace}
        workspaces={db.workspaces}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* 2. Main Application Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header with Multi-Currency, Date Presets, Customize, and Search (Fix 17, 18, 19, 24) */}
        <Header
          currentWorkspace={currentWorkspace}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          activeModuleTitle={
            currentWorkspace.type === "client"
              ? `${currentWorkspace.name} Client Workspace`
              : moduleTitles[activeModule] || "Dashboard"
          }
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          currency={currency}
          onSelectCurrency={setCurrency}
          onOpenLayoutCustomizer={() => setLayoutCustomizerOpen(true)}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto space-y-6">
          {currentWorkspace.type === "client" ? (
            <ClientWorkspaceView
              workspace={currentWorkspace}
              activities={db.activities}
              onBackToAgency={() => {
                const agencyHq = db.workspaces.find((w) => w.type === "agency");
                if (agencyHq) switchWorkspace(agencyHq);
              }}
            />
          ) : (
            <>
              {/* Primary Agency Overview & Charts (Controlled by LayoutConfig) */}
              {layoutConfig.showOverviewGraph && (
                <DashboardOverview
                  metrics={db.metrics}
                  topClients={db.topClients}
                  tasksDue={db.tasksDue}
                  onNavigateModule={(mod) => setActiveModule(mod)}
                  currency={currency}
                  formatMoney={formatMoney}
                  onOpenDrilldown={openDrilldown}
                  isLoadingShimmer={isLoadingShimmer}
                  approvals={db.approvals}
                  onApprove={approveDeliverable}
                  onRequestChanges={requestChangesDeliverable}
                  onAddComment={addCommentToDeliverable}
                />
              )}

              {/* Connected Live Modules (Social Media, GBP, CRM, Approvals) */}
              {(layoutConfig.showSocialCalendar ||
                layoutConfig.showGbpAudit ||
                layoutConfig.showCrmKanban ||
                layoutConfig.showApprovals) && (
                <InteractiveModules
                  leads={db.leads}
                  gbpIssues={db.gbpIssues}
                  approvals={db.approvals}
                  onApprove={approveDeliverable}
                  onRequestChanges={requestChangesDeliverable}
                  onAddComment={addCommentToDeliverable}
                  onFixGbpIssue={fixGbpIssue}
                />
              )}

              {/* Section 7 & 8: User Flow Banner & Architecture Summary */}
              {layoutConfig.showUserFlow && (
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs space-y-4 text-left transition-colors">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                        Standard Digivigee Agency User Flow
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400">
                      Enterprise Multi-Tenant Engine
                    </span>
                  </div>

                  {/* Step Flow Indicators matching Section 7 in prototype */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                    {[
                      { step: "1", title: "Login", desc: "Secure Auth" },
                      { step: "2", title: "Select Workspace", desc: "Agency / Client" },
                      { step: "3", title: "Dashboard Overview", desc: "Live Pacing" },
                      { step: "4", title: "Choose Module", desc: "CRM / SEO / Social" },
                      { step: "5", title: "Perform Action", desc: "Schedule & Post" },
                      { step: "6", title: "Review & Approve", desc: "Client Portal" },
                      { step: "7", title: "Reports & Analytics", desc: "ROAS & Invoicing" },
                    ].map((s, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition"
                      >
                        <div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center mx-auto mb-1.5 shadow-2xs">
                          {s.step}
                        </div>
                        <div className="font-extrabold text-slate-800 dark:text-slate-200 text-[11px] leading-tight">{s.title}</div>
                        <div className="text-[9.5px] text-slate-400 dark:text-slate-400 mt-0.5">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
