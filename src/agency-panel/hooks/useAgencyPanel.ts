"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { createAgencyDatabase, AgencyDatabaseState } from "../database/store";
import { Workspace, Currency, LayoutConfig } from "../types";
import { DEFAULT_LAYOUT_CONFIG, CURRENCY_RATES } from "../database/initial-data";

export type PanelTheme = "light" | "dark";

export function useAgencyPanel() {
  const [db, setDb] = useState<AgencyDatabaseState>(createAgencyDatabase);
  const [activeModule, setActiveModuleState] = useState<string>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<PanelTheme>("light");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(DEFAULT_LAYOUT_CONFIG);
  const [layoutCustomizerOpen, setLayoutCustomizerOpen] = useState<boolean>(false);
  const [activeDrilldownMetric, setActiveDrilldownMetric] = useState<string | null>(null);
  const [isLoadingShimmer, setIsLoadingShimmer] = useState<boolean>(false);

  // Load preferences from localStorage & URL Query on client mount (Light First standard)
  useEffect(() => {
    try {
      const hasInitializedLight = localStorage.getItem("digivigee_theme_light_first_v3");
      if (!hasInitializedLight) {
        localStorage.setItem("digivigee_panel_theme", "light");
        localStorage.setItem("digivigee_theme_light_first_v3", "true");
        setTheme("light");
      } else {
        const savedTheme = localStorage.getItem("digivigee_panel_theme") as PanelTheme;
        if (savedTheme === "dark" || savedTheme === "light") {
          setTheme(savedTheme);
        }
      }

      const savedCollapsed = localStorage.getItem("digivigee_sidebar_collapsed");
      if (savedCollapsed !== null) {
        setIsSidebarCollapsed(savedCollapsed === "true");
      }

      const savedCurrency = localStorage.getItem("digivigee_currency") as Currency;
      if (savedCurrency && ["INR", "USD", "AED", "EUR"].includes(savedCurrency)) {
        setCurrencyState(savedCurrency);
      }

      const savedLayout = localStorage.getItem("digivigee_layout_config");
      if (savedLayout) {
        setLayoutConfig(JSON.parse(savedLayout));
      }

      // URL Query Sync on mount (Deep-linking)
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const wsParam = params.get("workspace");
        const tabParam = params.get("tab");

        if (wsParam) {
          setDb((prev) => {
            const exists = prev.workspaces.some((w) => w.id === wsParam);
            return exists ? { ...prev, activeWorkspaceId: wsParam } : prev;
          });
        }
        if (tabParam) {
          setActiveModuleState(tabParam);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync URL Query whenever workspace or active module changes
  const updateUrlQuery = useCallback((workspaceId: string, moduleName: string) => {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("workspace", workspaceId);
      url.searchParams.set("tab", moduleName);
      window.history.replaceState(null, "", url.toString());
    } catch {
      // ignore
    }
  }, []);

  const setActiveModule = (mod: string) => {
    setActiveModuleState(mod);
    updateUrlQuery(db.activeWorkspaceId, mod);
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("digivigee_panel_theme", next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("digivigee_sidebar_collapsed", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("digivigee_currency", c);
    } catch {
      // ignore
    }
    // Brief shimmer effect on currency change
    triggerShimmer();
  };

  const toggleWidget = (key: keyof LayoutConfig) => {
    setLayoutConfig((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("digivigee_layout_config", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const triggerShimmer = () => {
    setIsLoadingShimmer(true);
    setTimeout(() => {
      setIsLoadingShimmer(false);
    }, 350);
  };

  // Currency Converter Formatter
  const formatMoney = useCallback(
    (amountInInr: number) => {
      const rate = CURRENCY_RATES[currency].rate;
      const symbol = CURRENCY_RATES[currency].symbol;
      const converted = Math.round(amountInInr * rate);

      if (currency === "INR") {
        return `₹${amountInInr.toLocaleString("en-IN")}`;
      } else if (currency === "AED") {
        return `${symbol} ${converted.toLocaleString("en-US")}`;
      } else {
        return `${symbol}${converted.toLocaleString("en-US")}`;
      }
    },
    [currency]
  );

  // Current active workspace object
  const currentWorkspace = useMemo(() => {
    return (
      db.workspaces.find((w) => w.id === db.activeWorkspaceId) ||
      db.workspaces[0]
    );
  }, [db.workspaces, db.activeWorkspaceId]);

  // Actions
  const switchWorkspace = (workspace: Workspace) => {
    triggerShimmer();
    setDb((prev) => ({ ...prev, activeWorkspaceId: workspace.id }));
    const targetTab = workspace.type === "client" ? "dashboard" : activeModule;
    if (workspace.type === "client") {
      setActiveModuleState("dashboard");
    }
    updateUrlQuery(workspace.id, targetTab);
  };

  const approveDeliverable = (id: string) => {
    setDb((prev) => ({
      ...prev,
      approvals: prev.approvals.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      ),
    }));
  };

  const requestChangesDeliverable = (id: string) => {
    setDb((prev) => ({
      ...prev,
      approvals: prev.approvals.map((item) =>
        item.id === id ? { ...item, status: "changes_requested" } : item
      ),
    }));
  };

  const addCommentToDeliverable = (id: string, text: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: "Client (ABC Clinic)",
      text,
      timestamp: "Just now",
    };
    setDb((prev) => ({
      ...prev,
      approvals: prev.approvals.map((item) =>
        item.id === id
          ? { ...item, comments: [...item.comments, newComment] }
          : item
      ),
    }));
  };

  const fixGbpIssue = (issueId: string) => {
    setDb((prev) => ({
      ...prev,
      gbpIssues: prev.gbpIssues.map((iss) =>
        iss.id === issueId ? { ...iss, fixed: true } : iss
      ),
    }));
  };

  return {
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
    openDrilldown: (metricId: string) => setActiveDrilldownMetric(metricId),
    closeDrilldown: () => setActiveDrilldownMetric(null),
    isLoadingShimmer,
    triggerShimmer,
  };
}
