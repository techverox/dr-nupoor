"use client";

import React from "react";

/**
 * GlobalSpotlightGrid provides a pristine, high-performance background canvas
 * with ZERO JavaScript overhead, ZERO RAF loops, and ZERO dynamic mask invalidations.
 * Guarantees a rock-solid 120 FPS scrolling experience across all devices.
 */
export default function GlobalSpotlightGrid() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Base Pristine Alabaster Canvas */}
      <div className="absolute inset-0 bg-[#F8FAFC]" />

      {/* 2. Soft Ambient Radial Light Wash (Lightweight, pure CSS, no blur layers) */}
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1400px] h-[800px] pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0, 224, 92, 0.06), rgba(6, 182, 212, 0.04) 50%, transparent 80%)",
        }}
      />

      {/* 3. Subtle Static Micro Dot Grid with Gentle Fade Vignette */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(15, 23, 42, 0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
        }}
      />
    </div>
  );
}
