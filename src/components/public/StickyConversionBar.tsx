"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function StickyConversionBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (scrollTotal > 0 && currentScroll / scrollTotal > 0.25) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="sticky-conversion-bar animate-fade-in"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 998,
        backgroundColor: "rgba(5, 11, 24, 0.92)",
        backdropFilter: "blur(20px)",
        border: "1.5px solid rgba(0, 208, 83, 0.45)",
        borderRadius: "9999px",
        padding: "0.5rem 0.6rem 0.5rem 1.25rem",
        boxShadow: "0 20px 45px -8px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 208, 83, 0.25)",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        maxWidth: "92vw",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Live Availability Pill */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#00D053",
            boxShadow: "0 0 10px #00D053",
            animation: "pulseGlow 2s infinite",
          }}
        />
        <span
          style={{
            fontSize: "0.8125rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "var(--font-sans)",
            whiteSpace: "nowrap",
          }}
        >
          ⚡ 2 Audit Slots Open This Week
        </span>
      </div>

      {/* CTA Button */}
      <Link
        href="/contact"
        style={{
          background: "linear-gradient(135deg, #00D053 0%, #059669 100%)",
          color: "#ffffff",
          fontWeight: 800,
          fontSize: "0.8125rem",
          padding: "0.5rem 1.15rem",
          borderRadius: "9999px",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          boxShadow: "0 4px 14px rgba(0, 208, 83, 0.4)",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-sans)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <span>Claim Free Audit</span>
        <span>→</span>
      </Link>

      <style>{`
        @media (max-width: 640px) {
          .sticky-conversion-bar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
