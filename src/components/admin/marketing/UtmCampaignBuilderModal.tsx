"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/config/site";

interface UtmCampaignBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UtmCampaignBuilderModal({ isOpen, onClose }: UtmCampaignBuilderModalProps) {
  const [baseUrlOption, setBaseUrlOption] = useState("/");
  const [customBaseUrl, setCustomBaseUrl] = useState("");
  const [source, setSource] = useState("google");
  const [customSource, setCustomSource] = useState("");
  const [medium, setMedium] = useState("cpc");
  const [customMedium, setCustomMedium] = useState("");
  const [campaign, setCampaign] = useState("q1_growth_acceleration");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const resolvedBase = baseUrlOption === "custom"
    ? (customBaseUrl.trim() || SITE_CONFIG.url)
    : `${SITE_CONFIG.url}${baseUrlOption === "/" ? "" : baseUrlOption}`;

  const resolvedSource = source === "custom" ? customSource.trim() : source;
  const resolvedMedium = medium === "custom" ? customMedium.trim() : medium;
  const resolvedCampaign = campaign.trim();

  const params = new URLSearchParams();
  if (resolvedSource) params.set("utm_source", resolvedSource);
  if (resolvedMedium) params.set("utm_medium", resolvedMedium);
  if (resolvedCampaign) params.set("utm_campaign", resolvedCampaign);
  if (term.trim()) params.set("utm_term", term.trim());
  if (content.trim()) params.set("utm_content", content.trim());

  const queryString = params.toString();
  const finalUrl = queryString ? `${resolvedBase}?${queryString}` : resolvedBase;

  const handleCopy = () => {
    navigator.clipboard.writeText(finalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-lg)",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--brand-navy)", margin: 0 }}>
              UTM Campaign Link Generator 🔗
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", margin: "0.2rem 0 0" }}>
              Build trackable campaign URLs. Inquiries and clicks are automatically captured in First-Party Analytics.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.25rem",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "0.25rem",
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Base URL */}
          <div>
            <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
              1. Destination Landing Page *
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <select
                value={baseUrlOption}
                onChange={(e) => setBaseUrlOption(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-strong)",
                  fontSize: "0.875rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="/">Home Page (/)</option>
                <option value="/contact">Free Growth Audit (/contact)</option>
                <option value="/services">Services Directory (/services)</option>
                <option value="/services/performance-marketing">Performance Marketing</option>
                <option value="/services/seo-services">SEO Services</option>
                <option value="/portfolio">Portfolio Case Studies (/portfolio)</option>
                <option value="/blog">Blog (/blog)</option>
                <option value="custom">Custom URL or Landing Page...</option>
              </select>

              {baseUrlOption === "custom" && (
                <input
                  type="text"
                  value={customBaseUrl}
                  onChange={(e) => setCustomBaseUrl(e.target.value)}
                  placeholder="https://digivigee.com/landing/blueprint"
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-strong)",
                    fontSize: "0.875rem",
                  }}
                />
              )}
            </div>
          </div>

          {/* Source & Medium Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {/* Source */}
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
                2. Campaign Source (utm_source) *
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-strong)",
                  fontSize: "0.875rem",
                  backgroundColor: "#ffffff",
                  marginBottom: source === "custom" ? "0.5rem" : 0,
                }}
              >
                <option value="google">Google</option>
                <option value="facebook">Facebook / Meta</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="whatsapp">WhatsApp Direct</option>
                <option value="email_newsletter">Email Newsletter</option>
                <option value="partner">Partner Referral</option>
                <option value="custom">Other / Custom...</option>
              </select>
              {source === "custom" && (
                <input
                  type="text"
                  value={customSource}
                  onChange={(e) => setCustomSource(e.target.value)}
                  placeholder="e.g. twitter, youtube"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-strong)",
                    fontSize: "0.8125rem",
                  }}
                />
              )}
            </div>

            {/* Medium */}
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
                3. Campaign Medium (utm_medium) *
              </label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-strong)",
                  fontSize: "0.875rem",
                  backgroundColor: "#ffffff",
                  marginBottom: medium === "custom" ? "0.5rem" : 0,
                }}
              >
                <option value="cpc">CPC / Paid Search</option>
                <option value="paid_social">Paid Social Ads</option>
                <option value="organic_social">Organic Social Post</option>
                <option value="email">Email Campaign</option>
                <option value="broadcast">WhatsApp Broadcast</option>
                <option value="display_ad">Display Banner</option>
                <option value="custom">Other / Custom...</option>
              </select>
              {medium === "custom" && (
                <input
                  type="text"
                  value={customMedium}
                  onChange={(e) => setCustomMedium(e.target.value)}
                  placeholder="e.g. webinar, qr_code"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-strong)",
                    fontSize: "0.8125rem",
                  }}
                />
              )}
            </div>
          </div>

          {/* Campaign Name */}
          <div>
            <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
              4. Campaign Name (utm_campaign) *
            </label>
            <input
              type="text"
              required
              value={campaign}
              onChange={(e) => setCampaign(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
              placeholder="e.g. q1_growth_acceleration"
              style={{
                width: "100%",
                padding: "0.6rem 0.85rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-strong)",
                fontSize: "0.875rem",
              }}
            />
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              Use lowercase with underscores (e.g. <code>spring_audit_2026</code>). Matches Analytics UTM filters.
            </div>
          </div>

          {/* Optional Term & Content */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                Keyword / Term (utm_term - Optional)
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g. digital marketing agency"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "0.8125rem",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                Ad Content / Variant (utm_content - Optional)
              </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="e.g. blue_button_v1"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "0.8125rem",
                }}
              />
            </div>
          </div>

          {/* Generated URL Box */}
          <div
            style={{
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-strong)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--brand-navy)" }}>
                Generated Trackable Campaign URL:
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--brand-primary)", fontWeight: 600 }}>
                First-Party Attributed
              </span>
            </div>

            <div
              style={{
                padding: "0.6rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "#ffffff",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.8125rem",
                fontFamily: "monospace",
                color: "var(--brand-navy)",
                wordBreak: "break-all",
                userSelect: "all",
              }}
            >
              {finalUrl}
            </div>

            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
              <a
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  border: "1px solid var(--border-strong)",
                  backgroundColor: "#ffffff",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                Test Link ↗
              </a>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  border: "none",
                  backgroundColor: copied ? "var(--brand-primary-hover)" : "var(--brand-primary)",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                {copied ? "Copied to Clipboard! ✓" : "Copy Campaign Link 📋"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              fontWeight: 600,
              backgroundColor: "#ffffff",
              color: "var(--text-primary)",
              border: "1px solid var(--border-strong)",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
