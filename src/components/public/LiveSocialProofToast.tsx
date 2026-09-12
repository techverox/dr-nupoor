"use client";

import React, { useState, useEffect } from "react";

interface SocialProofEvent {
  title: string;
  location: string;
  metric: string;
  timeAgo: string;
  tag: string;
}

const EVENTS: SocialProofEvent[] = [
  {
    title: "D2C Brand Founder",
    location: "Bengaluru",
    metric: "Booked 1-on-1 Growth Audit",
    timeAgo: "2m ago",
    tag: "🔥 High Intent",
  },
  {
    title: "Healthcare Clinic Chain",
    location: "Mumbai",
    metric: "Scaled to 4.8x Meta ROAS",
    timeAgo: "8m ago",
    tag: "⚡ ROAS Scale",
  },
  {
    title: "B2B SaaS Enterprise",
    location: "Gurugram",
    metric: "Launched SEO Cluster Pipeline",
    timeAgo: "14m ago",
    tag: "🚀 SEO Rank #1",
  },
  {
    title: "Real Estate Developer",
    location: "Ahmedabad",
    metric: "Acquired 184 Qualified Inquiries",
    timeAgo: "22m ago",
    tag: "🎯 Lead Velocity",
  },
];

export function LiveSocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if previously dismissed in session
    if (typeof window !== "undefined" && sessionStorage.getItem("toast_dismissed")) {
      setIsDismissed(true);
      return;
    }

    // Show first toast only after 6.5 seconds so hero message has full initial focus
    const initialTimer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 6500);

    // Rotate every 9 seconds
    const intervalTimer = setInterval(() => {
      if (isDismissed) return;
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % EVENTS.length);
        setIsVisible(true);
      }, 600);
    }, 9000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const event = EVENTS[currentIndex];

  return (
    <div
      className={`live-social-proof-toast ${isVisible ? "toast-visible" : "toast-hidden"}`}
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 999,
        backgroundColor: "#050B18",
        border: "1.5px solid rgba(0, 208, 83, 0.4)",
        borderRadius: "1rem",
        padding: "0.75rem 1rem",
        boxShadow: "0 16px 36px -6px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 208, 83, 0.25)",
        maxWidth: "340px",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Glowing Pulse Avatar Icon */}
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 208, 83, 0.15)",
          border: "1px solid rgba(0, 208, 83, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: "1.1rem",
          position: "relative",
        }}
      >
        <span>⚡</span>
        <span
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#00D053",
            boxShadow: "0 0 8px #00D053",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#00D053", letterSpacing: "0.02em", fontFamily: "var(--font-sans)" }}>
            {event.tag}
          </span>
          <span style={{ fontSize: "0.625rem", color: "rgba(255, 255, 255, 0.45)", fontFamily: "var(--font-sans)" }}>
            {event.timeAgo}
          </span>
        </div>

        <div style={{ fontSize: "0.78125rem", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-sans)", lineHeight: 1.25, marginTop: "0.15rem" }}>
          {event.metric}
        </div>

        <div style={{ fontSize: "0.6875rem", color: "rgba(255, 255, 255, 0.6)", fontFamily: "var(--font-sans)", marginTop: "0.1rem" }}>
          {event.title} • {event.location}
        </div>
      </div>

      {/* Close/Dismiss Button */}
      <button
        type="button"
        onClick={() => {
          setIsDismissed(true);
          if (typeof window !== "undefined") sessionStorage.setItem("toast_dismissed", "true");
        }}
        aria-label="Dismiss Notification"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "none",
          borderRadius: "50%",
          color: "rgba(255, 255, 255, 0.8)",
          cursor: "pointer",
          width: "28px",
          height: "28px",
          padding: "0",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          marginLeft: "0.5rem",
        }}
      >
        ✕
      </button>

      <style>{`
        .toast-visible {
          opacity: 1 !important;
          transform: translateY(0px) scale(1) !important;
          pointer-events: auto !important;
        }
        .toast-hidden {
          opacity: 0 !important;
          transform: translateY(16px) scale(0.95) !important;
          pointer-events: none !important;
        }
        @media (max-width: 640px) {
          .live-social-proof-toast {
            left: 16px !important;
            right: 16px !important;
            bottom: 16px !important;
            max-width: calc(100% - 32px) !important;
          }
        }
      `}</style>
    </div>
  );
}
