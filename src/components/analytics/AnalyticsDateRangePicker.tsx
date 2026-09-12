"use client";

import React, { useState } from "react";
import { AnalyticsTimeframe } from "@/types/analytics";

export interface DateRangeFilterState {
  timeframe: AnalyticsTimeframe;
  startDate?: string;
  endDate?: string;
  compare: boolean;
}

interface AnalyticsDateRangePickerProps {
  currentFilter: DateRangeFilterState;
  onChange: (newFilter: DateRangeFilterState) => void;
  isLoading?: boolean;
}

const PRESETS: Array<{ id: AnalyticsTimeframe; label: string }> = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "90d", label: "Last 90 Days" },
  { id: "this_month", label: "This Month" },
  { id: "previous_month", label: "Last Month" },
  { id: "custom", label: "Custom Range" },
];

export function AnalyticsDateRangePicker({
  currentFilter,
  onChange,
  isLoading = false,
}: AnalyticsDateRangePickerProps) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customStart, setCustomStart] = useState(currentFilter.startDate || "");
  const [customEnd, setCustomEnd] = useState(currentFilter.endDate || "");
  const [customError, setCustomError] = useState("");

  const handleSelectPreset = (presetId: AnalyticsTimeframe) => {
    if (presetId === "custom") {
      setShowCustomModal(true);
      return;
    }
    onChange({
      timeframe: presetId,
      compare: currentFilter.compare,
    });
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStart || !customEnd) {
      setCustomError("Please select both start and end dates.");
      return;
    }
    if (new Date(customStart) > new Date(customEnd)) {
      setCustomError("Start date cannot be after end date.");
      return;
    }
    setCustomError("");
    setShowCustomModal(false);
    onChange({
      timeframe: "custom",
      startDate: customStart,
      endDate: customEnd,
      compare: currentFilter.compare,
    });
  };

  const handleToggleCompare = () => {
    onChange({
      ...currentFilter,
      compare: !currentFilter.compare,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        backgroundColor: "#ffffff",
        padding: "0.85rem 1.25rem",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Preset Pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginRight: "0.35rem", textTransform: "uppercase" }}>
          RANGE:
        </span>
        {PRESETS.map((preset) => {
          const isActive = currentFilter.timeframe === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              disabled={isLoading}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8125rem",
                fontWeight: isActive ? 700 : 500,
                border: "1px solid",
                borderColor: isActive ? "var(--brand-navy)" : "var(--border-subtle)",
                backgroundColor: isActive ? "var(--brand-navy)" : "#ffffff",
                color: isActive ? "#ffffff" : "var(--brand-navy)",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all var(--transition-fast)",
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Comparison Toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8125rem",
            color: "var(--brand-navy)",
            fontWeight: 600,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <input
            type="checkbox"
            checked={currentFilter.compare}
            onChange={handleToggleCompare}
            disabled={isLoading}
            style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "var(--brand-primary)" }}
          />
          <span>Compare previous period</span>
        </label>
      </div>

      {/* Custom Date Modal */}
      {showCustomModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "var(--radius-lg)",
              maxWidth: "420px",
              width: "100%",
              padding: "1.5rem",
              boxShadow: "var(--shadow-2xl)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--brand-navy)", margin: 0 }}>
                Select Custom Date Range
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplyCustom} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--brand-navy)" }}>
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-subtle)",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--brand-navy)" }}>
                  End Date
                </label>
                <input
                  type="date"
                  required
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-subtle)",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              {customError && (
                <div style={{ fontSize: "0.8125rem", color: "#dc2626", fontWeight: 600 }}>
                  {customError}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-subtle)",
                    backgroundColor: "#ffffff",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    border: "none",
                    backgroundColor: "var(--brand-navy)",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Apply Range
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
