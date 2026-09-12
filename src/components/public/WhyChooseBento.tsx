"use client";

import React, { useState } from "react";

export function WhyChooseBento() {
  const [activeNode, setActiveNode] = useState(1);

  return (
    <div className="why-choose-bento-container" style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
      {/* 2-Row Asymmetrical Bento Grid */}
      <div
        className="bento-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "1.25rem",
        }}
      >
        {/* ================================================================
            CARD 1: ANCHOR FEATURE (Span 8 Cols) — AI Full-Funnel Attribution
            ================================================================ */}
        <div
          className="bento-card bento-anchor-card"
          style={{
            gridColumn: "span 8",
            backgroundColor: "#050B18",
            backgroundImage: `
              radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0, 208, 83, 0.16), transparent 70%),
              radial-gradient(circle, rgba(0, 208, 83, 0.12) 1px, transparent 1px),
              radial-gradient(circle, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 22px 22px, 22px 22px",
            backgroundPosition: "0 0, 0 0, 11px 11px",
            border: "1.5px solid rgba(0, 208, 83, 0.35)",
            borderRadius: "1.5rem",
            padding: "clamp(1.5rem, 3vw, 2.25rem)",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 50px -10px rgba(5, 11, 24, 0.5), 0 0 30px rgba(0, 208, 83, 0.15)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "440px",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Top Header */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {/* Circular Category Icon Anchor */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "0.85rem",
                    backgroundColor: "rgba(0, 208, 83, 0.15)",
                    border: "1px solid rgba(0, 208, 83, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    boxShadow: "0 0 16px rgba(0, 208, 83, 0.2)",
                  }}
                >
                  ⚡
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#00D053",
                    backgroundColor: "rgba(0, 208, 83, 0.12)",
                    border: "1px solid rgba(0, 208, 83, 0.35)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "9999px",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <span>PROPRIETARY TECH</span>
                </div>
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255, 255, 255, 0.5)", fontFamily: "var(--font-sans)" }}>
                01 // ATTRIBUTION
              </span>
            </div>

            <h3
              style={{
                fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
                marginBottom: "0.6rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              Full-Funnel AI Attribution &amp; Revenue Engine
            </h3>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: 1.6,
                maxWidth: "580px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Never guess which ad made the sale. We connect Meta Ads, Google Ads, SEO clicks, and CRM pipeline into a single verified attribution stream.
            </p>
          </div>

          {/* Interactive Node Pipeline Preview with Consistent Neutral Styling */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.75rem",
              marginTop: "1.5rem",
            }}
          >
            {[
              { id: 1, title: "1. Multi-Touch Attribution", desc: "Pixel-accurate click-to-revenue mapping", metric: "99.8% Verified" },
              { id: 2, title: "2. Predictive Bidding", desc: "Automated real-time budget scaling", metric: "+420% ROAS" },
              { id: 3, title: "3. Clean CRM Routing", desc: "Instant sync to sales pipeline", metric: "<1.2s Sync" },
            ].map((node) => {
              const isSelected = activeNode === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  style={{
                    backgroundColor: isSelected ? "rgba(0, 208, 83, 0.12)" : "rgba(255, 255, 255, 0.04)",
                    border: isSelected ? "1.5px solid rgba(0, 208, 83, 0.6)" : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "1rem",
                    padding: "0.85rem 1rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: isSelected ? "#00D053" : "#ffffff", fontFamily: "var(--font-sans)" }}>
                      {node.title}
                    </span>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#38BDF8", backgroundColor: "rgba(56, 189, 248, 0.12)", padding: "0.1rem 0.35rem", borderRadius: "4px" }}>
                      {node.metric}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.7)", margin: 0, lineHeight: 1.4, fontFamily: "var(--font-sans)" }}>
                    {node.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================
            CARD 2: (Span 4 Cols) — Zero-Waste Ad Spend
            ================================================================ */}
        <div
          className="bento-card bento-light-card"
          style={{
            gridColumn: "span 4",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid rgba(0, 208, 83, 0.22)",
            borderRadius: "1.5rem",
            padding: "clamp(1.5rem, 3vw, 2rem)",
            boxShadow: "0 14px 34px -8px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "380px",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "0.85rem",
                  backgroundColor: "rgba(0, 208, 83, 0.1)",
                  border: "1px solid rgba(0, 208, 83, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                }}
              >
                🎯
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--brand-navy-600)", fontFamily: "var(--font-sans)" }}>
                02 // EFFICIENCY
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--text-heading)",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                marginBottom: "0.5rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              Zero-Waste Ad Spend
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-body)",
                lineHeight: 1.6,
                fontFamily: "var(--font-sans)",
              }}
            >
              We eliminate non-converting keywords and bot clicks. Every single rupee is allocated only toward high-intent audiences.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(0, 208, 83, 0.06)",
              border: "1px dashed rgba(0, 208, 83, 0.35)",
              borderRadius: "0.875rem",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--brand-green-800)", fontFamily: "var(--font-sans)" }}>
              Budget Efficiency
            </span>
            <span style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#00D053", fontFamily: "var(--font-sans)" }}>
              +38% Saved
            </span>
          </div>
        </div>

        {/* ================================================================
            CARD 3: (Span 4 Cols) — 48-Hour Rapid Sprint
            ================================================================ */}
        <div
          className="bento-card bento-light-card"
          style={{
            gridColumn: "span 4",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid rgba(0, 208, 83, 0.22)",
            borderRadius: "1.5rem",
            padding: "clamp(1.5rem, 3vw, 2rem)",
            boxShadow: "0 14px 34px -8px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "320px",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "0.85rem",
                  backgroundColor: "rgba(56, 189, 248, 0.1)",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                }}
              >
                ⏱️
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--brand-navy-600)", fontFamily: "var(--font-sans)" }}>
                03 // VELOCITY
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--text-heading)",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                marginBottom: "0.5rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              Rapid 48-Hour Sprints
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-body)",
                lineHeight: 1.6,
                fontFamily: "var(--font-sans)",
              }}
            >
              No multi-week delays. New ad creatives, landing page tests, and campaign tweaks launch inside 48-hour development cycles.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.06)",
              border: "1px dashed rgba(56, 189, 248, 0.35)",
              borderRadius: "0.875rem",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--brand-blue-700)", fontFamily: "var(--font-sans)" }}>
              Execution SLA
            </span>
            <span style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#0284C7", fontFamily: "var(--font-sans)" }}>
              48 Hours Max
            </span>
          </div>
        </div>

        {/* ================================================================
            CARD 4: (Span 4 Cols) — Dedicated Growth Strategist
            ================================================================ */}
        <div
          className="bento-card bento-light-card"
          style={{
            gridColumn: "span 4",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid rgba(0, 208, 83, 0.22)",
            borderRadius: "1.5rem",
            padding: "clamp(1.5rem, 3vw, 2rem)",
            boxShadow: "0 14px 34px -8px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "320px",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "0.85rem",
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                }}
              >
                👥
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--brand-navy-600)", fontFamily: "var(--font-sans)" }}>
                04 // PARTNERSHIP
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--text-heading)",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                marginBottom: "0.5rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              Senior Strategist Pod
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-body)",
                lineHeight: 1.6,
                fontFamily: "var(--font-sans)",
              }}
            >
              Direct Slack/WhatsApp access to dedicated performance directors, media buyers, and UI engineers — not junior account managers.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.06)",
              border: "1px dashed rgba(245, 158, 11, 0.35)",
              borderRadius: "0.875rem",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#92400e", fontFamily: "var(--font-sans)" }}>
              Direct Response
            </span>
            <span style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#D97706", fontFamily: "var(--font-sans)" }}>
              &lt; 15 Mins
            </span>
          </div>
        </div>

        {/* ================================================================
            CARD 5: (Span 4 Cols) — Predictable Growth Model
            ================================================================ */}
        <div
          className="bento-card bento-light-card"
          style={{
            gridColumn: "span 4",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid rgba(0, 208, 83, 0.22)",
            borderRadius: "1.5rem",
            padding: "clamp(1.5rem, 3vw, 2rem)",
            boxShadow: "0 14px 34px -8px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "320px",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "0.85rem",
                  backgroundColor: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                }}
              >
                📈
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--brand-navy-600)", fontFamily: "var(--font-sans)" }}>
                05 // SCALE
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--text-heading)",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                marginBottom: "0.5rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              Predictable Compounding
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-body)",
                lineHeight: 1.6,
                fontFamily: "var(--font-sans)",
              }}
            >
              Scientific multivariate creative testing and audience expansion models designed for sustained month-over-month compounding.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(124, 58, 237, 0.06)",
              border: "1px dashed rgba(124, 58, 237, 0.35)",
              borderRadius: "0.875rem",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#6b21a8", fontFamily: "var(--font-sans)" }}>
              Average Scaling
            </span>
            <span style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#7C3AED", fontFamily: "var(--font-sans)" }}>
              4.2x - 6.8x
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .bento-anchor-card:hover {
          border-color: rgba(0, 208, 83, 0.7) !important;
          box-shadow: 0 30px 70px -12px rgba(5, 11, 24, 0.6), 0 0 45px rgba(0, 208, 83, 0.3) !important;
          transform: translateY(-6px);
        }
        .bento-light-card:hover {
          border-color: #00D053 !important;
          box-shadow: 0 24px 50px -10px rgba(0, 208, 83, 0.22), 0 0 20px rgba(0, 208, 83, 0.08) !important;
          transform: translateY(-6px);
        }
        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-anchor-card,
          .bento-light-card {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
