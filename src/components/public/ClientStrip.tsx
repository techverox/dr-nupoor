"use client";

import React, { useRef } from "react";
import { CLIENT_BRANDS } from "@/data/clients";

export interface ClientStripProps {
  title?: string;
  className?: string;
}

export function ClientStrip({
  title,
  className = "",
}: ClientStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (!CLIENT_BRANDS || CLIENT_BRANDS.length === 0) {
    return null;
  }

  const renderBrandVisual = (id: string, name: string) => {
    switch (id) {
      case "ayush":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>🌿</span>
            <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#10b981", letterSpacing: "-0.02em" }}>
              ayush
            </span>
          </div>
        );
      case "kalpvruksh":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>🌳</span>
            <span style={{ fontSize: "1rem", fontWeight: 900, color: "#065f46", letterSpacing: "0.05em" }}>
              KALPVRUKSH
            </span>
          </div>
        );
      case "mahalaxmi":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>👑</span>
            <span style={{ fontSize: "1rem", fontWeight: 900, color: "#92400e", letterSpacing: "0.05em" }}>
              MAHALAXMI
            </span>
          </div>
        );
      case "the-printing-wala":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>📦</span>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontSize: "0.625rem", fontWeight: 800, color: "#18181b", letterSpacing: "0.08em" }}>
                THE
              </span>
              <span style={{ fontSize: "0.8125rem", fontWeight: 900, color: "#dc2626", letterSpacing: "0.02em" }}>
                PRINTING WALA
              </span>
            </div>
          </div>
        );
      case "riddhi-siddhi":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>🍲</span>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#ea580c" }}>
                Riddhi Siddhi
              </span>
              <span style={{ fontSize: "0.5625rem", fontWeight: 900, color: "#9a3412", letterSpacing: "0.1em" }}>
                FOODS
              </span>
            </div>
          </div>
        );
      case "fit-and-fine":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>💪</span>
            <span style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#1e40af" }}>
              Fit &amp; Fine <span style={{ fontWeight: 900, color: "#2563eb" }}>GYM</span>
            </span>
          </div>
        );
      case "shreeji":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>💎</span>
            <span style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#6b21a8" }}>
              Shreeji <span style={{ fontSize: "0.5625rem", fontWeight: 900, letterSpacing: "0.08em" }}>ENTERPRISE</span>
            </span>
          </div>
        );
      default:
        return (
          <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--brand-navy-800)" }}>
            {name}
          </span>
        );
    }
  };

  const quadrupledBrands = [
    ...CLIENT_BRANDS,
    ...CLIENT_BRANDS,
    ...CLIENT_BRANDS,
    ...CLIENT_BRANDS,
  ];

  return (
    <section
      aria-label="Client Trust Marquee"
      className={`client-strip-section ${className}`}
      style={{
        position: "relative",
        paddingTop: "clamp(2rem, 3.5vw, 3rem)",
        paddingBottom: "clamp(2rem, 3.5vw, 3rem)",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(0, 208, 83, 0.18)",
        borderBottom: "1px solid rgba(0, 208, 83, 0.18)",
        overflow: "hidden",
      }}
    >
      {/* Top Header Row with Trust Badges */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          marginBottom: "1.75rem",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.75rem",
            fontWeight: 800,
            color: "var(--brand-green-800)",
            backgroundColor: "rgba(0, 208, 83, 0.08)",
            border: "1px solid rgba(0, 208, 83, 0.25)",
            padding: "0.3rem 0.85rem",
            borderRadius: "9999px",
            letterSpacing: "0.02em",
            fontFamily: "var(--font-sans)",
          }}
        >
          <span>⚡</span>
          <span>{title || "Powering 250+ High-Growth Brands Across India & Globally"}</span>
        </div>

        {/* Clutch & G2 Rating Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.75rem",
            fontWeight: 800,
            color: "var(--brand-navy-900)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            padding: "0.3rem 0.85rem",
            borderRadius: "9999px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <span style={{ color: "#F59E0B" }}>★★★★★</span>
          <span>4.9/5 Rating (300+ Audited Reviews)</span>
        </div>
      </div>

      {/* Marquee Track Container */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* Left & Right Glass Gradient Fades */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to right, #F8FAF9 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to left, #F8FAF9 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Marquee Flex Track */}
        <div
          ref={trackRef}
          className="client-marquee-track"
        >
          {quadrupledBrands.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="client-logo-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 2.25rem",
                cursor: "pointer",
                transition: "transform 0.25s ease, filter 0.25s ease",
              }}
            >
              {renderBrandVisual(brand.id, brand.name)}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .client-marquee-track {
          display: flex !important;
          align-items: center !important;
          width: max-content !important;
          animation: marqueeScroll 30s linear infinite !important;
          will-change: transform;
        }
        .client-marquee-track:hover {
          animation-play-state: paused !important;
        }
        .client-logo-item:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}
