"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Bell,
  Calendar,
  SlidersHorizontal,
  Menu,
  ChevronDown,
  Sun,
  Moon,
  CheckCheck,
  X,
  CreditCard,
  ShieldCheck,
  Target,
  Sparkles,
  Check,
  DollarSign,
  Coins,
  Sliders,
} from "lucide-react";
import { Workspace, NotificationItem, Currency } from "../types";
import { INITIAL_NOTIFICATIONS, CURRENCY_RATES } from "../database/initial-data";

interface HeaderProps {
  currentWorkspace: Workspace;
  onOpenMobileSidebar: () => void;
  activeModuleTitle: string;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
  onOpenCommandPalette?: () => void;
  currency?: Currency;
  onSelectCurrency?: (currency: Currency) => void;
  onOpenLayoutCustomizer?: () => void;
}

export default function Header({
  currentWorkspace,
  onOpenMobileSidebar,
  activeModuleTitle,
  theme = "light",
  onToggleTheme,
  onOpenCommandPalette,
  currency = "INR",
  onSelectCurrency,
  onOpenLayoutCustomizer,
}: HeaderProps) {
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("May 20 – May 26, 2024");
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [notifCategory, setNotifCategory] = useState<"all" | "approvals" | "payments" | "leads">("all");

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifications = notifications.filter(
    (n) => notifCategory === "all" || n.category === notifCategory
  );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Global keyboard shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "/")) {
        e.preventDefault();
        onOpenCommandPalette?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenCommandPalette]);

  return (
    <header className="h-[56px] bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30 transition-colors duration-200">
      {/* Left: Mobile Toggle + Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0 text-left">
          <h1 className="text-[16px] sm:text-[18px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight flex items-center gap-2 truncate">
            <span className="truncate">{activeModuleTitle}</span>
            {currentWorkspace.type === "client" && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 shrink-0">
                {currentWorkspace.name}
              </span>
            )}
          </h1>
          <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 font-normal truncate">
            Enterprise Agency Operations Hub • Pacing active across 32 clients
          </p>
        </div>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Global Search Bar with Keyboard Shortcut (Triggers Command Palette - Fix 17) */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center relative w-48 lg:w-56 h-9 pl-8 pr-12 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-600 dark:hover:text-slate-200 transition shadow-2xs text-left cursor-pointer group"
          aria-label="Open Command Palette"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 group-hover:text-emerald-500 transition-colors" />
          <span className="truncate">Search (Cmd+K)...</span>
          <kbd className="absolute right-2 px-1.5 py-0.2 text-[9px] font-bold text-slate-400 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-2xs pointer-events-none">
            ⌘K
          </kbd>
        </button>

        {/* Real Date Range Selector Popover (Fix 18) */}
        <div className="relative">
          <button
            onClick={() => setDatePickerOpen(!datePickerOpen)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-2xs cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
            <span className="hidden lg:inline">{selectedDateRange}</span>
            <span className="lg:hidden">Presets</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Date Picker Popover Dropdown */}
          {datePickerOpen && (
            <div className="absolute right-0 mt-1.5 w-56 p-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Date Range Presets
              </div>
              <div className="space-y-0.5 my-1">
                {[
                  { label: "Today", value: "Today (26 May 2024)" },
                  { label: "Last 7 Days (Default)", value: "May 20 – May 26, 2024" },
                  { label: "This Month MTD", value: "May 1 – May 26, 2024" },
                  { label: "Last 30 Days", value: "Apr 26 – May 26, 2024" },
                  { label: "Quarter to Date (Q2)", value: "Apr 1 – May 26, 2024" },
                  { label: "Custom Range...", value: "Custom: May 2024" },
                ].map((preset, idx) => {
                  const isSelected = selectedDateRange === preset.value;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDateRange(preset.value);
                        setDatePickerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/50"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70"
                      }`}
                    >
                      <span>{preset.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Multi-Currency Regional Switcher (Fix 24) */}
        {onSelectCurrency && (
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition shadow-2xs cursor-pointer"
              title="Change Display Currency"
            >
              <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{CURRENCY_RATES[currency].label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-40 p-1.5 bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Currency
                </div>
                {(["INR", "USD", "AED", "EUR"] as Currency[]).map((c) => {
                  const isSelected = currency === c;
                  return (
                    <button
                      key={c}
                      onClick={() => {
                        onSelectCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                      }`}
                    >
                      <span>{CURRENCY_RATES[c].label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Layout Customizer Trigger Button (Fix 19) */}
        {onOpenLayoutCustomizer && (
          <button
            onClick={onOpenLayoutCustomizer}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition shadow-2xs cursor-pointer"
            title="Customize Dashboard Layout"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Customize</span>
          </button>
        )}

        {/* Theme Switcher Toggle */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-600 dark:text-amber-300 flex items-center justify-center transition shadow-2xs cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        )}

        {/* Quick '+ Create' Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
            className="h-9 px-3 sm:px-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-sm shadow-emerald-500/25 ring-1 ring-emerald-400/30 flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
            <ChevronDown className="w-3 h-3 text-emerald-100" />
          </button>

          {createDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-48 p-1.5 bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                Quick Actions
              </div>
              {[
                { label: "New Campaign", action: "Campaign" },
                { label: "New Client Lead", action: "Lead" },
                { label: "Schedule Post", action: "Post" },
                { label: "Create Task", action: "Task" },
                { label: "Add Client Workspace", action: "Client" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    alert(`${item.action} creation opened`);
                    setCreateDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon with Ping Badge (Fix 22) */}
        <div className="relative">
          <button
            onClick={() => setNotificationDrawerOpen(!notificationDrawerOpen)}
            className="relative w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 transition cursor-pointer shadow-2xs"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Slide-over Notification Drawer */}
        {notificationDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
              onClick={() => setNotificationDrawerOpen(false)}
            />

            <div className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-500" />
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Agency Notifications
                  </h2>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                  <button
                    onClick={() => setNotificationDrawerOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs">
                {(["all", "approvals", "payments", "leads"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNotifCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg font-bold capitalize transition cursor-pointer text-[11px] ${
                      notifCategory === cat
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs border border-slate-200/80 dark:border-slate-700"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Notification List Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5 text-left">
                {filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      n.unread
                        ? "bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200/70 dark:border-emerald-800/40"
                        : "bg-white dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        {n.category === "approvals" && (
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        )}
                        {n.category === "payments" && (
                          <CreditCard className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        )}
                        {n.category === "leads" && (
                          <Target className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        )}
                        {n.category === "system" && (
                          <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        )}
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                          {n.title}
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-5">
                      {n.description}
                    </p>

                    {n.actionLabel && (
                      <div className="mt-2 pl-5">
                        <button
                          onClick={() => alert(`Triggered: ${n.actionLabel}`)}
                          className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 cursor-pointer"
                        >
                          {n.actionLabel} →
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workspace Chip Pill */}
        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {currentWorkspace.initials}
          </div>
          <div className="text-left leading-tight hidden lg:block">
            <div className="text-[11.5px] font-bold text-slate-900 dark:text-white">{currentWorkspace.name}</div>
            <div className="text-[10px] text-slate-400">
              {currentWorkspace.type === "agency" ? "Agency HQ" : "Client Portal"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
