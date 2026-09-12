"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceItem } from "@/types";

export interface ServiceCardProps {
  service: ServiceItem;
  variant?: "default" | "grid";
  index?: number;
  className?: string;
}

export function ServiceCard({
  service,
  index = 0,
  className = "",
}: ServiceCardProps) {
  const [sliderVal, setSliderVal] = useState(3.8);

  const renderIcon = () => {
    switch (service.slug) {
      case "social-media-marketing":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        );
      case "performance-marketing":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
      case "content-creation":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        );
      case "website-design-and-development":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case "seo-and-local-seo":
      case "search-engine-optimization-seo":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <polyline points="11 8 11 11 14 11" />
          </svg>
        );
      case "lead-generation-and-automation":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
    }
  };

  const getServicePills = () => {
    switch (service.slug) {
      case "social-media-marketing":
        return ["Instagram & Reels", "Brand Authority", "Community DMs"];
      case "performance-marketing":
        return ["Meta & Google Ads", "ROAS Scaling", "CAC Reduction"];
      case "content-creation":
        return ["Cinematic Video", "Visual Design", "Copywriting"];
      case "website-design-and-development":
        return ["Next.js Fast Web", "High-Converting UI", "SEO-Engineered"];
      case "seo-and-local-seo":
      case "search-engine-optimization-seo":
        return ["Google Top Ranks", "Local Maps Pack", "Organic Authority"];
      case "lead-generation-and-automation":
        return ["Multi-Channel Funnels", "CRM Integration", "Auto Lead Routing"];
      default:
        return ["Data-Driven", "ROI Focused", "Custom Strategy"];
    }
  };

  const getCapabilityHighlight = () => {
    switch (service.slug) {
      case "performance-marketing":
        return "⚡ 4.8X ROAS ENGINE";
      case "seo-and-local-seo":
      case "search-engine-optimization-seo":
        return "⚡ #1 GOOGLE RANK";
      case "lead-generation-and-automation":
        return "⚡ <1.2S CRM SYNC";
      case "website-design-and-development":
        return "⚡ 99/100 CWV SPEED";
      case "social-media-marketing":
        return "⚡ +1.4M VIRAL REACH";
      case "content-creation":
        return "⚡ +48% CTR SCALE";
      default:
        return "⚡ SCALE ENGINE";
    }
  };

  // Interactive Micro-UI Widget per Service
  const renderMicroWidget = () => {
    switch (service.slug) {
      case "performance-marketing":
        return (
          <div style={{ backgroundColor: "rgba(0, 208, 83, 0.05)", border: "1px solid rgba(0, 208, 83, 0.22)", borderRadius: "0.875rem", padding: "0.65rem 0.85rem", marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--brand-navy-800)", fontFamily: "var(--font-sans)" }}>
                TARGET BLENDED ROAS
              </span>
              <span style={{ fontSize: "0.8125rem", fontWeight: 900, color: "#00D053", fontFamily: "var(--font-sans)" }}>
                {sliderVal.toFixed(1)}x ROAS
              </span>
            </div>
            <input
              type="range"
              min="2.0"
              max="6.5"
              step="0.1"
              value={sliderVal}
              onChange={(e) => setSliderVal(parseFloat(e.target.value))}
              style={{ width: "100%", height: "4px", accentColor: "#00D053", cursor: "pointer" }}
            />
          </div>
        );
      case "seo-and-local-seo":
      case "search-engine-optimization-seo":
        return (
          <div style={{ backgroundColor: "rgba(0, 82, 255, 0.04)", border: "1px solid rgba(0, 82, 255, 0.18)", borderRadius: "0.875rem", padding: "0.6rem 0.85rem", marginTop: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "0.625rem", color: "#2563eb", fontWeight: 800 }}>google.com/search</span>
              <span style={{ fontSize: "0.625rem", color: "#16a34a", fontWeight: 800, backgroundColor: "rgba(22, 163, 74, 0.1)", padding: "0.05rem 0.35rem", borderRadius: "4px" }}>#1 SERP</span>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--brand-navy-900)", lineHeight: 1.2 }}>
              Best Performance Marketing Agency →
            </div>
          </div>
        );
      case "lead-generation-and-automation":
        return (
          <div style={{ backgroundColor: "rgba(124, 58, 237, 0.04)", border: "1px solid rgba(124, 58, 237, 0.18)", borderRadius: "0.875rem", padding: "0.6rem 0.85rem", marginTop: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#7c3aed" }}>Meta Ad Lead Form</span>
              <span style={{ fontSize: "0.6875rem", color: "#6b7280" }}>⚡ &lt;1.2s</span>
              <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#059669" }}>CRM + WhatsApp Sync</span>
            </div>
          </div>
        );
      case "website-design-and-development":
        return (
          <div style={{ backgroundColor: "rgba(16, 185, 129, 0.04)", border: "1px solid rgba(16, 185, 129, 0.18)", borderRadius: "0.875rem", padding: "0.6rem 0.85rem", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--brand-navy-800)" }}>PageSpeed Insights</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "#059669", backgroundColor: "rgba(5, 150, 105, 0.1)", padding: "0.15rem 0.5rem", borderRadius: "9999px" }}>
              99/100 Core Web Vitals
            </span>
          </div>
        );
      case "social-media-marketing":
        return (
          <div style={{ backgroundColor: "rgba(236, 72, 153, 0.04)", border: "1px solid rgba(236, 72, 153, 0.18)", borderRadius: "0.875rem", padding: "0.6rem 0.85rem", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#be185d" }}>Reel Viral Reach</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "#db2777" }}>+1.4M Organic Views</span>
          </div>
        );
      case "content-creation":
        return (
          <div style={{ backgroundColor: "rgba(245, 158, 11, 0.04)", border: "1px solid rgba(245, 158, 11, 0.18)", borderRadius: "0.875rem", padding: "0.6rem 0.85rem", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#b45309" }}>Creative A/B Split</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "#d97706" }}>+48% Higher CTR</span>
          </div>
        );
      default:
        return null;
    }
  };

  const pills = getServicePills();
  const capabilityTag = getCapabilityHighlight();
  const indexFormatted = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`service-card ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        border: "1.5px solid rgba(0, 208, 83, 0.22)",
        borderRadius: "1.5rem",
        padding: "clamp(1.5rem, 3vw, 2rem)",
        position: "relative",
        boxShadow: "0 14px 34px -8px rgba(15, 23, 42, 0.06), 0 2px 8px -2px rgba(0, 208, 83, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)",
        minHeight: "390px",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Top Header Row: Icon + Capability Tag & Sequence Marker */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "var(--space-5)",
          }}
        >
          {/* Icon Box */}
          <div
            className="service-icon-box"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "0.875rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 208, 83, 0.1)",
              border: "1px solid rgba(0, 208, 83, 0.28)",
              color: "#00D053",
              transition: "all 0.3s ease",
            }}
          >
            {renderIcon()}
          </div>

          {/* Top Right Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span
              style={{
                fontSize: "0.625rem",
                fontWeight: 900,
                color: "#00D053",
                backgroundColor: "rgba(0, 208, 83, 0.08)",
                border: "1px solid rgba(0, 208, 83, 0.25)",
                padding: "0.2rem 0.5rem",
                borderRadius: "9999px",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.04em",
              }}
            >
              {capabilityTag}
            </span>

            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                fontFamily: "var(--font-sans)",
                color: "var(--brand-navy-600)",
                backgroundColor: "rgba(15, 23, 42, 0.04)",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                padding: "0.2rem 0.45rem",
                borderRadius: "9999px",
              }}
            >
              {indexFormatted}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="service-title"
          style={{
            fontSize: "clamp(1.2rem, 1.8vw, 1.35rem)",
            fontWeight: 800,
            color: "var(--text-heading)",
            letterSpacing: "-0.02em",
            lineHeight: "1.25",
            marginBottom: "var(--space-3)",
            fontFamily: "var(--font-sans)",
            transition: "color 0.25s ease",
          }}
        >
          <Link
            href={`/services/${service.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {service.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p
          className="service-desc"
          style={{
            fontSize: "var(--text-body-sm)",
            color: "var(--text-body)",
            lineHeight: "1.6",
            marginBottom: "var(--space-4)",
            fontFamily: "var(--font-sans)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {service.shortDescription}
        </p>

        {/* Interactive Micro-UI Widget */}
        {renderMicroWidget()}
      </div>

      {/* Bottom Footer: Capability Tags + Link */}
      <div style={{ marginTop: "var(--space-6)", paddingTop: "var(--space-4)", borderTop: "1px solid rgba(0, 208, 83, 0.12)" }}>
        {/* Capability Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem",
            marginBottom: "var(--space-4)",
          }}
        >
          {pills.map((pill, pIdx) => (
            <span
              key={pIdx}
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--brand-navy-800)",
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                padding: "0.2rem 0.5rem",
                borderRadius: "var(--radius-full)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* CTA Link with 44px Accessible Hit Target */}
        <Link
          href={`/services/${service.slug}`}
          className="service-cta-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            minHeight: "44px",
            padding: "0.6rem 1rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(0, 208, 83, 0.06)",
            border: "1px solid rgba(0, 208, 83, 0.2)",
            fontSize: "0.875rem",
            fontWeight: 800,
            color: "var(--brand-green-700)",
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            transition: "all 0.2s ease",
          }}
        >
          <span>Explore Capabilities</span>
          <span className="arrow" style={{ transition: "transform 0.2s ease" }}>→</span>
        </Link>
      </div>

      <style>{`
        .service-card:hover {
          border-color: #00D053 !important;
          box-shadow: 0 24px 50px -10px rgba(0, 208, 83, 0.22), 0 0 20px rgba(0, 208, 83, 0.1) !important;
          transform: translateY(-6px) !important;
        }
        .service-card:hover .service-icon-box {
          background-color: #00D053 !important;
          color: #ffffff !important;
          border-color: #00D053 !important;
          box-shadow: 0 0 16px rgba(0, 208, 83, 0.4) !important;
        }
        .service-card:hover .service-cta-link {
          color: #00D053 !important;
          gap: 0.6rem !important;
        }
        .service-card:hover .arrow {
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
}
