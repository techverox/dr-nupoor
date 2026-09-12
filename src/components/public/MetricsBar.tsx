"use client";

import React, { useEffect, useState, useRef } from "react";
import { Container } from "@/components/ui/Container";

export interface MetricItem {
  value: string;
  label: string;
  description?: string;
  trend?: string;
  icon?: React.ReactNode;
}

export interface MetricsBarProps {
  metrics?: MetricItem[];
  variant?: "navy" | "white";
  className?: string;
}

const DEFAULT_METRICS: MetricItem[] = [
  {
    value: "250+",
    label: "Growth Partners",
    description: "High-velocity D2C & B2B brands",
    trend: "+24% YoY ↗",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D053" strokeWidth="2.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "Campaigns Executed",
    description: "Delivered on schedule & ROI target",
    trend: "99.4% On-Time",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D053" strokeWidth="2.5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    value: "4.2x",
    label: "Average Client ROI",
    description: "Data-driven performance attribution",
    trend: "+420% ROI ⚡",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D053" strokeWidth="2.5">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    value: "98%",
    label: "Client Retention",
    description: "Verified satisfaction & revenue impact",
    trend: "Top 1% Agency",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D053" strokeWidth="2.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

function AnimatedNumber({ value, isVisible }: { value: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isVisible) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || "";
    const isDecimal = match[2].includes(".");

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1200;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNum = easeOut * targetNum;

      const formattedNum = isDecimal ? currentNum.toFixed(1) : Math.floor(currentNum).toString();
      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, value]);

  return <span>{displayValue}</span>;
}

export function MetricsBar({
  metrics = DEFAULT_METRICS,
  className = "",
}: MetricsBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`digivigee-metrics-bar-stage ${className}`}
      style={{
        position: "relative",
        paddingTop: "clamp(3.5rem, 5.5vw, 5rem)",
        paddingBottom: "clamp(3.5rem, 5.5vw, 5rem)",
        overflow: "hidden",
      }}
    >
      {/* Top Luminous Ambient Horizon Beam */}
      <div className="luminous-horizon-beam" style={{ marginBottom: "2.5rem", opacity: 0.8 }} />

      {/* Background Soft Spotlight Radial Mesh */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "350px",
          background: "radial-gradient(ellipse, rgba(0, 208, 83, 0.08) 0%, rgba(56, 189, 248, 0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container size="wide">
        <div
          className="metrics-container-box"
          style={{
            backgroundColor: "#050B18",
            backgroundImage: `
              radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0, 208, 83, 0.15), transparent 70%),
              radial-gradient(circle, rgba(0, 208, 83, 0.12) 1px, transparent 1px),
              radial-gradient(circle, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 24px 24px, 24px 24px",
            backgroundPosition: "0 0, 0 0, 12px 12px",
            borderRadius: "1.75rem",
            border: "1.5px solid rgba(0, 208, 83, 0.32)",
            padding: "clamp(2rem, 3.5vw, 2.75rem) clamp(1.5rem, 3vw, 2.5rem)",
            boxShadow: "0 28px 70px -12px rgba(3, 7, 18, 0.7), 0 0 35px -5px rgba(0, 208, 83, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
            position: "relative",
            zIndex: 1,
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Top Live Ticker Line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              paddingBottom: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#00D053",
                  boxShadow: "0 0 8px #00D053",
                }}
              />
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#34D399", letterSpacing: "0.05em", fontFamily: "var(--font-sans)" }}>
                VERIFIED PERFORMANCE METRICS // AUDITED ATTRIBUTION
              </span>
            </div>
            <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "rgba(255, 255, 255, 0.45)", fontFamily: "var(--font-sans)" }}>
              UPDATED REAL-TIME
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))`,
              gap: "var(--space-6)",
              alignItems: "center",
            }}
            className="metrics-grid"
          >
            {metrics.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "0.5rem 0.75rem",
                    borderRight:
                      index !== metrics.length - 1
                        ? "1px solid rgba(255, 255, 255, 0.08)"
                        : "none",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 400ms ease-out ${index * 80}ms, transform 400ms ease-out ${index * 80}ms`,
                  }}
                  className="metric-item"
                >
                  {item.icon && (
                    <div
                      className="metric-icon-wrap"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "0.85rem",
                        backgroundColor: "rgba(0, 208, 83, 0.12)",
                        border: "1px solid rgba(0, 208, 83, 0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 0 16px -2px rgba(0, 208, 83, 0.2)",
                        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {item.icon}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                          fontWeight: 900,
                          letterSpacing: "-0.04em",
                          lineHeight: 1.05,
                          fontFamily: "var(--font-sans)",
                          color: "#ffffff",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <AnimatedNumber value={item.value} isVisible={isVisible} />
                      </span>
                      {item.trend && (
                        <span
                          style={{
                            fontSize: "0.625rem",
                            fontWeight: 800,
                            color: "#00D053",
                            backgroundColor: "rgba(0, 208, 83, 0.15)",
                            border: "1px solid rgba(0, 208, 83, 0.3)",
                            padding: "0.15rem 0.45rem",
                            borderRadius: "9999px",
                            fontFamily: "var(--font-sans)",
                          }}
                        >
                          {item.trend}
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 800,
                        color: "rgba(255, 255, 255, 0.95)",
                        fontFamily: "var(--font-sans)",
                        marginTop: "0.35rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.label}
                    </span>

                    {item.description && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255, 255, 255, 0.55)",
                          fontFamily: "var(--font-sans)",
                          marginTop: "0.2rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Bottom Luminous Ambient Horizon Beam */}
      <div className="luminous-horizon-beam" style={{ marginTop: "2.5rem", opacity: 0.8 }} />

      <style>{`
        .metrics-container-box:hover {
          border-color: rgba(0, 208, 83, 0.55) !important;
          box-shadow: 0 32px 80px -15px rgba(3, 7, 18, 0.8), 0 0 45px -5px rgba(0, 208, 83, 0.3) !important;
        }
        @media (max-width: 1024px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: var(--space-8) !important;
          }
          .metric-item {
            border-right: none !important;
          }
        }
        @media (max-width: 640px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
