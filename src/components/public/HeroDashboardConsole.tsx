"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  format = "en-IN",
  duration = 1600,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  const formattedValue = new Intl.NumberFormat(format, { maximumFractionDigits: 0 }).format(count);
  return (
    <>
      {prefix}
      {formattedValue}
      {suffix}
    </>
  );
}

interface ChartPoint {
  label: string;
  value: number;
  baseline: number;
  displayVal: string;
  info: string;
}

interface CoordinatePoint extends ChartPoint {
  x: number;
  y: number;
  baselineY: number;
}

type ChannelType = "ads" | "seo" | "funnels";

interface ChannelData {
  id: ChannelType;
  label: string;
  shortLabel: string;
  icon: string;
  badge: string;
  satelliteBadge: string;
  metricMain: string;
  metricValue: number;
  metricPrefix: string;
  metricSuffix: string;
  metricFormat: string;
  metricLabel: string;
  metricChange: string;
  stat1: { label: string; value: string; color: string };
  stat2: { label: string; value: string; color: string };
  stat3: { label: string; value: string; color: string };
  points: ChartPoint[];
  liveEvent: string;
  eventTime: string;
}

const CHANNELS: ChannelData[] = [
  {
    id: "ads",
    label: "Meta & Google Ads",
    shortLabel: "Paid Scaling",
    icon: "🔥",
    badge: "ROAS Scaling Engine",
    satelliteBadge: "⚡ 4.8x Avg ROAS • Verified",
    metricMain: "₹1,42,85,000",
    metricValue: 14285000,
    metricPrefix: "₹",
    metricSuffix: "",
    metricFormat: "en-IN",
    metricLabel: "Attributed Revenue Pipeline",
    metricChange: "+420% ROI",
    stat1: { label: "⚡ BLENDED ROAS", value: "4.82x", color: "#059669" },
    stat2: { label: "🎯 AVG. CAC", value: "₹142", color: "#0EA5E9" },
    stat3: { label: "📈 QUALIFIED PIPELINE", value: "98.4%", color: "#0F172A" },
    points: [
      { label: "May", value: 32, baseline: 25, displayVal: "₹24.5L", info: "Campaign Setup & A/B Testing" },
      { label: "Jun", value: 52, baseline: 28, displayVal: "₹42.8L", info: "Audience Segmentation (3.2x ROAS)" },
      { label: "Jul", value: 72, baseline: 32, displayVal: "₹71.2L", info: "Creative Optimization Scaling" },
      { label: "Aug", value: 96, baseline: 35, displayVal: "₹1.15 Cr", info: "High-Intent Retargeting Funnel" },
      { label: "Sep", value: 128, baseline: 38, displayVal: "₹1.42 Cr", info: "Peak 4.82x Blended ROAS ⚡" },
    ],
    liveEvent: "Meta Ad Creative #04 scaled to 5.4x ROAS — ₹18.4K spend / ₹99.3K revenue",
    eventTime: "2s ago",
  },
  {
    id: "seo",
    label: "AI SEO & Search",
    shortLabel: "Organic Capture",
    icon: "🚀",
    badge: "Organic Market Capture",
    satelliteBadge: "🚀 #1 Google Rank • Top 3% Traffic",
    metricMain: "485,200+",
    metricValue: 485200,
    metricPrefix: "",
    metricSuffix: "+",
    metricFormat: "en-US",
    metricLabel: "Monthly Organic Impressions",
    metricChange: "+680% YoY",
    stat1: { label: "📈 ORGANIC ROI", value: "9.4x LTV", color: "#059669" },
    stat2: { label: "🎯 COST / VISITOR", value: "₹0.38", color: "#0EA5E9" },
    stat3: { label: "📊 SEARCH CTR", value: "18.6%", color: "#0F172A" },
    points: [
      { label: "May", value: 24, baseline: 18, displayVal: "65K", info: "Technical SEO Audit & Schema Fixes" },
      { label: "Jun", value: 46, baseline: 22, displayVal: "140K", info: "Semantic Cluster Indexing in Top 10" },
      { label: "Jul", value: 78, baseline: 26, displayVal: "280K", info: "High-Intent Commercial Keyword Rank #1" },
      { label: "Aug", value: 104, baseline: 30, displayVal: "395K", info: "Featured Snippets & AI Search Dominance" },
      { label: "Sep", value: 134, baseline: 34, displayVal: "485K+", info: "Top 3% Search Dominance 🚀" },
    ],
    liveEvent: "Keyword 'Top D2C Growth Agency' ranked #1 on Google Search",
    eventTime: "12s ago",
  },
  {
    id: "funnels",
    label: "Lead Automation",
    shortLabel: "Auto Pipeline",
    icon: "⚡",
    badge: "Full-Funnel Pipeline",
    satelliteBadge: "⚡ 99.1% Inbound Dispatch • Live",
    metricMain: "3,842",
    metricValue: 3842,
    metricPrefix: "",
    metricSuffix: "",
    metricFormat: "en-US",
    metricLabel: "High-Intent Inquiries",
    metricChange: "+350% Inquiries",
    stat1: { label: "⚡ PIPELINE VELOCITY", value: "12.2x", color: "#059669" },
    stat2: { label: "🎯 COST / INQUIRY", value: "₹85", color: "#0EA5E9" },
    stat3: { label: "🚀 INSTANT DISPATCH", value: "99.1%", color: "#0F172A" },
    points: [
      { label: "May", value: 28, baseline: 20, displayVal: "420", info: "Landing Page Speed & Tracking Setup" },
      { label: "Jun", value: 50, baseline: 24, displayVal: "980", info: "WhatsApp & CRM Routing Automation" },
      { label: "Jul", value: 82, baseline: 28, displayVal: "1,850", info: "Instant SMS/Call Lead Qualification" },
      { label: "Aug", value: 108, baseline: 32, displayVal: "2,940", info: "Automated Calendar Booking Engine" },
      { label: "Sep", value: 138, baseline: 36, displayVal: "3,842", info: "Compounding Inbound Velocity 🔥" },
    ],
    liveEvent: "Enterprise Founder in Bengaluru booked Confidential Growth Audit",
    eventTime: "just now",
  },
];

const LIVE_STREAM_MESSAGES = [
  { text: "D2C Healthcare Founder booked Strategy Call", time: "just now", tag: "CRM", color: "#00D053" },
  { text: "Meta Ad Creative #04 scaled to 5.4x ROAS", time: "8s ago", tag: "META", color: "#38BDF8" },
  { text: "Google Ranking: 'Real Estate Growth Partner' hit #1 Position", time: "22s ago", tag: "SEO", color: "#F59E0B" },
  { text: "Attribution Sync: ₹4.8L pipeline attributed via Google Ads", time: "45s ago", tag: "DATA", color: "#A855F7" },
];

export function HeroDashboardConsole() {
  const [activeChannel, setActiveChannel] = useState<ChannelType>("ads");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(4); // Default to last point
  const [streamIndex, setStreamIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const currentChannel = CHANNELS.find((c) => c.id === activeChannel) || CHANNELS[0];

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % LIVE_STREAM_MESSAGES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // SVG Chart path calculation
  const width = 520;
  const height = 150;
  const paddingX = 42;
  const paddingY = 22;

  const pointsCount = currentChannel.points.length;
  const stepX = (width - paddingX * 2) / (pointsCount - 1);
  const maxVal = 150;

  const coordinates: CoordinatePoint[] = currentChannel.points.map((p: ChartPoint, i: number) => {
    const x = paddingX + i * stepX;
    const y = height - paddingY - (p.value / maxVal) * (height - paddingY * 2);
    const baselineY = height - paddingY - (p.baseline / maxVal) * (height - paddingY * 2);
    return { x, y, baselineY, ...p };
  });

  // Generate smooth curve for Scaled line
  const pathD = coordinates.reduce((acc: string, curr: CoordinatePoint, i: number, arr: CoordinatePoint[]) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, "");

  // Generate baseline curve
  const baselineD = coordinates.reduce((acc: string, curr: CoordinatePoint, i: number, arr: CoordinatePoint[]) => {
    if (i === 0) return `M ${curr.x} ${curr.baselineY}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.baselineY;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.baselineY;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.baselineY}`;
  }, "");

  const areaD = `${pathD} L ${coordinates[coordinates.length - 1].x} ${height} L ${coordinates[0].x} ${height} Z`;

  // Dynamic calculation for tooltip horizontal positioning & triangle pointer anchor
  const getTooltipStyle = (pointIndex: number) => {
    if (pointIndex === coordinates.length - 1) {
      return {
        wrapper: {
          right: "12px",
          left: "auto",
          transform: "none",
        },
        pointer: {
          right: "30px",
          left: "auto",
          transform: "rotate(45deg)",
        },
      };
    }
    if (pointIndex === 0) {
      return {
        wrapper: {
          left: "12px",
          right: "auto",
          transform: "none",
        },
        pointer: {
          left: "30px",
          right: "auto",
          transform: "rotate(45deg)",
        },
      };
    }
    return {
      wrapper: {
        left: `${coordinates[pointIndex].x}px`,
        right: "auto",
        transform: "translateX(-50%)",
      },
      pointer: {
        left: "50%",
        right: "auto",
        transform: "translateX(-50%) rotate(45deg)",
      },
    };
  };

  const activeTooltipStyle = hoveredPoint !== null ? getTooltipStyle(hoveredPoint) : getTooltipStyle(4);

  return (
    <>
      {/* Global Subtle Noise Texture for Premium Organic Feel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="hero-dashboard-console-wrapper"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "620px",
          margin: "0 auto",
        }}
      >
        {/* Floating Ambient Mesh Spotlight behind Console */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 208, 83, 0.15) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 70%)",
            filter: "blur(55px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Dynamic Floating Satellite Badge (Top-Right synced with active channel) */}
        <div
          className="satellite-badge satellite-top-right"
          style={{
            position: "absolute",
            top: "-18px",
            right: "16px",
            zIndex: 10,
            backgroundColor: "#ffffff",
            border: "1.5px solid rgba(0, 208, 83, 0.28)",
            borderRadius: "9999px",
            padding: "0.42rem 0.95rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 8px 24px -4px rgba(15, 23, 42, 0.08), 0 0 16px rgba(0, 208, 83, 0.12)",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#00D053",
              boxShadow: "0 0 8px #00D053",
              animation: "pulseGlow 2s infinite",
            }}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={currentChannel.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#0F172A",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.01em",
              }}
            >
              {currentChannel.satelliteBadge}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Main Glassmorphic HUD Console Frame */}
        <div
          className="dashboard-main-frame"
          style={{
            position: "relative",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backgroundImage: `
              radial-gradient(ellipse 100% 50% at 50% -10%, rgba(0, 208, 83, 0.06), transparent 70%),
              radial-gradient(ellipse 60% 40% at 100% 100%, rgba(56, 189, 248, 0.04), transparent 70%),
              radial-gradient(circle, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
              radial-gradient(circle, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 100% 100%, 22px 22px, 22px 22px",
            backgroundPosition: "0 0, 0 0, 0 0, 11px 11px",
            backdropFilter: "blur(32px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "1.5rem",
            overflow: "hidden",
            boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.08), 0 0 40px -5px rgba(0, 208, 83, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* 1. macOS Cyber Window Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.85rem 1.35rem",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Traffic Lights + Cluster Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FF5F56", display: "inline-block" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FFBD2E", display: "inline-block" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27C93F", display: "inline-block" }} />
              <span
                style={{
                  marginLeft: "0.6rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#64748B",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.02em",
                }}
              >
                digivigee-engine // prod-cluster-01
              </span>
            </div>

            {/* Live Attribution Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  color: "#059669",
                  backgroundColor: "rgba(0, 208, 83, 0.12)",
                  border: "1px solid rgba(0, 208, 83, 0.25)",
                  padding: "0.22rem 0.65rem",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#00D053",
                    boxShadow: "0 0 6px rgba(0, 208, 83, 0.5)",
                  }}
                />
                <span>Live Attribution</span>
              </div>
            </div>
          </div>

          {/* 2. Linear / macOS Segmented Control Tabs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              padding: "0.5rem 0.65rem",
              gap: "0.45rem",
              backgroundColor: "rgba(241, 245, 249, 0.75)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            {CHANNELS.map((channel) => {
              const isActive = activeChannel === channel.id;
              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => {
                    setActiveChannel(channel.id);
                    setHoveredPoint(4);
                  }}
                  className="channel-tab-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.55rem 0.4rem",
                    minHeight: "48px",
                    borderRadius: "0.65rem",
                    border: isActive ? "1.5px solid rgba(0, 208, 83, 0.35)" : "1px solid transparent",
                    backgroundColor: isActive ? "#ffffff" : "transparent",
                    color: isActive ? "#0F172A" : "#64748B",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    outline: "none",
                    boxShadow: isActive ? "0 2px 8px rgba(15, 23, 42, 0.06), 0 0 1px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>{channel.icon}</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", lineHeight: 1.15 }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        fontFamily: "var(--font-sans)",
                        color: isActive ? "#0F172A" : "#475569",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {channel.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: isActive ? "#059669" : "#94A3B8",
                        letterSpacing: "0.01em",
                        marginTop: "0.15rem",
                      }}
                    >
                      {channel.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3. Main Metric Header Block */}
          <div
            style={{
              padding: "1.25rem 1.5rem 0.35rem 1.5rem",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "0.3rem",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {currentChannel.metricLabel}
              </div>
              <div
                key={activeChannel}
                className="animate-slide-up-fade"
                style={{
                  fontSize: "clamp(1.85rem, 3.4vw, 2.35rem)",
                  fontWeight: 900,
                  color: "#0F172A",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.05,
                  fontFamily: "var(--font-sans)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {isMounted ? (
                  <AnimatedCounter
                    value={currentChannel.metricValue}
                    prefix={currentChannel.metricPrefix}
                    suffix={currentChannel.metricSuffix}
                    format={currentChannel.metricFormat}
                  />
                ) : (
                  currentChannel.metricMain
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "0.25rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  backgroundColor: "rgba(0, 208, 83, 0.12)",
                  border: "1px solid rgba(0, 208, 83, 0.25)",
                  borderRadius: "9999px",
                  padding: "0.3rem 0.75rem",
                  color: "#059669",
                  fontWeight: 800,
                  fontSize: "0.8125rem",
                  fontFamily: "var(--font-sans)",
                  boxShadow: "0 0 10px rgba(0, 208, 83, 0.15)",
                }}
              >
                <span>↗</span>
                <span>{currentChannel.metricChange}</span>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#94A3B8",
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                }}
              >
                vs. Prior Baseline
              </span>
            </div>
          </div>

          {/* 4. Live Interactive SVG Performance Chart with Padded Tooltip */}
          <div key={`graph-${activeChannel}`} style={{ position: "relative", padding: "0 0.5rem", margin: "0.4rem 0 0.85rem 0" }}>
            {/* Tooltip Box over Active Point */}
            <AnimatePresence>
              {hoveredPoint !== null && coordinates[hoveredPoint] && (
                <motion.div
                  key={`tooltip-${activeChannel}-${hoveredPoint}`}
                  initial={{ opacity: 0, y: 8, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  style={{
                    position: "absolute",
                    top: `${coordinates[hoveredPoint].y - 52}px`,
                    ...activeTooltipStyle.wrapper,
                    backgroundColor: "#ffffff",
                    border: "1.5px solid rgba(0, 208, 83, 0.35)",
                    borderRadius: "0.75rem",
                    padding: "0.48rem 0.85rem",
                    color: "#0F172A",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-sans)",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    boxShadow: "0 12px 24px -6px rgba(15, 23, 42, 0.15), 0 0 14px rgba(0, 208, 83, 0.18)",
                    pointerEvents: "none",
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ color: "#059669", fontWeight: 900, fontSize: "0.8125rem" }}>
                    {coordinates[hoveredPoint].displayVal}
                  </div>
                  <div style={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 600, marginTop: "0.12rem" }}>
                    {coordinates[hoveredPoint].info}
                  </div>
                  {/* Tooltip Triangle Pointer (Calculated exact node anchor) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-6px",
                      ...activeTooltipStyle.pointer,
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#ffffff",
                      borderRight: "1.5px solid rgba(0, 208, 83, 0.35)",
                      borderBottom: "1.5px solid rgba(0, 208, 83, 0.35)",
                      zIndex: -1,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <svg
              viewBox={`0 0 ${width} ${height}`}
              style={{ width: "100%", height: "135px", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D053" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00D053" />
                  <stop offset="60%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Subtle Gridlines */}
              <line x1={paddingX} y1={30} x2={width - paddingX} y2={30} stroke="rgba(0, 0, 0, 0.06)" strokeDasharray="4 4" />
              <line x1={paddingX} y1={70} x2={width - paddingX} y2={70} stroke="rgba(0, 0, 0, 0.06)" strokeDasharray="4 4" />
              <line x1={paddingX} y1={110} x2={width - paddingX} y2={110} stroke="rgba(0, 0, 0, 0.06)" strokeDasharray="4 4" />

              {/* Baseline Curve (Dotted Prior Performance) */}
              <path
                d={baselineD}
                fill="none"
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Area Fill */}
              <motion.path
                key={`area-${activeChannel}`}
                d={areaD}
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              />

              {/* Main Growth Curve Stroke Line - Animated Draw */}
              <motion.path
                key={`line-${activeChannel}`}
                d={pathD}
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Interactive Data Point Dots */}
              {coordinates.map((pt: CoordinatePoint, i: number) => {
                const isHovered = hoveredPoint === i;
                return (
                  <g key={`pt-${activeChannel}-${i}`} style={{ cursor: "pointer" }} onMouseEnter={() => setHoveredPoint(i)}>
                    <motion.circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6.5 : 4.5}
                      fill={isHovered ? "#ffffff" : "#00D053"}
                      stroke={isHovered ? "#00D053" : "#ffffff"}
                      strokeWidth={isHovered ? 3 : 2}
                      filter={isHovered ? "url(#glow)" : undefined}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + i * 0.28,
                        ease: [0.175, 0.885, 0.32, 1.275],
                      }}
                      style={{ transition: "r 0.2s ease, stroke-width 0.2s ease" }}
                    />
                    {/* Month Label */}
                    <motion.text
                      x={pt.x}
                      y={height - 2}
                      textAnchor="middle"
                      fill={isHovered ? "#0F172A" : "#94A3B8"}
                      fontSize="10"
                      fontWeight={isHovered ? 800 : 600}
                      fontFamily="var(--font-sans)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.28 }}
                    >
                      {pt.label}
                    </motion.text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 5. 3-Stat Metric Ribbon (Dynamic per channel) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              padding: "1.1rem 1.25rem",
              margin: "0.5rem 1rem 0.85rem 1rem",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderRadius: "0.875rem",
              gap: "0.75rem",
            }}
          >
            {/* Stat 1 */}
            <div>
              <div style={{ fontSize: "0.6875rem", color: "#64748B", fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "0.02em" }}>
                {currentChannel.stat1.label}
              </div>
              <div style={{ fontSize: "1.15rem", fontWeight: 900, color: currentChannel.stat1.color, marginTop: "0.15rem", fontFamily: "var(--font-sans)" }}>
                {currentChannel.stat1.value}
              </div>
            </div>

            {/* Stat 2 */}
            <div>
              <div style={{ fontSize: "0.6875rem", color: "#64748B", fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "0.02em" }}>
                {currentChannel.stat2.label}
              </div>
              <div style={{ fontSize: "1.15rem", fontWeight: 900, color: currentChannel.stat2.color, marginTop: "0.15rem", fontFamily: "var(--font-sans)" }}>
                {currentChannel.stat2.value}
              </div>
            </div>

            {/* Stat 3 */}
            <div>
              <div style={{ fontSize: "0.6875rem", color: "#64748B", fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "0.02em" }}>
                {currentChannel.stat3.label}
              </div>
              <div style={{ fontSize: "1.15rem", fontWeight: 900, color: currentChannel.stat3.color, marginTop: "0.15rem", fontFamily: "var(--font-sans)" }}>
                {currentChannel.stat3.value}
              </div>
            </div>
          </div>

          {/* 6. Live Streaming Activity Feed Bar (Unibody Glass Corner Integration) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1.35rem",
              backgroundColor: "rgba(248, 250, 252, 0.95)",
              borderTop: "1px solid rgba(0, 0, 0, 0.05)",
              borderBottomLeftRadius: "1.45rem",
              borderBottomRightRadius: "1.45rem",
              fontSize: "0.75rem",
              fontFamily: "var(--font-sans)",
              position: "relative",
              zIndex: 5,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0, overflow: "hidden" }}>
              <span
                style={{
                  backgroundColor: "rgba(0, 208, 83, 0.12)",
                  color: "#059669",
                  fontWeight: 900,
                  padding: "0.22rem 0.55rem",
                  borderRadius: "0.4rem",
                  fontSize: "0.625rem",
                  letterSpacing: "0.06em",
                  flexShrink: 0,
                  border: "1px solid rgba(0, 208, 83, 0.25)",
                }}
              >
                {LIVE_STREAM_MESSAGES[streamIndex].tag}
              </span>
              <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                <span
                  key={streamIndex}
                  className="animate-fade-in"
                  style={{
                    color: "#1E293B",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    display: "block",
                    fontSize: "0.75rem",
                  }}
                >
                  {LIVE_STREAM_MESSAGES[streamIndex].text}
                </span>
              </div>
            </div>

            <span
              style={{
                color: "#94A3B8",
                fontWeight: 600,
                fontSize: "0.6875rem",
                flexShrink: 0,
                marginLeft: "0.85rem",
              }}
            >
              {LIVE_STREAM_MESSAGES[streamIndex].time}
            </span>
          </div>
        </div>

        <style>{`
          @keyframes satelliteFloat1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          .satellite-top-right {
            animation: satelliteFloat1 4.2s ease-in-out infinite;
          }
          .dashboard-main-frame:hover {
            border-color: rgba(0, 208, 83, 0.3) !important;
            box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 0 50px -5px rgba(0, 208, 83, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
          }
          @media (max-width: 640px) {
            .satellite-badge {
              display: none !important;
            }
          }
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up-fade {
            animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    </>
  );
}

