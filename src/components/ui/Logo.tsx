import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  tagline?: string;
  className?: string;
  asLink?: boolean;
}

export function Logo({
  variant = "light",
  size = "md",
  className = "",
  asLink = true,
}: LogoProps) {
  const isDark = variant === "dark";

  const scaleMap = {
    sm: { height: 26, width: 124, gap: "0.4rem" },
    md: { height: 34, width: 162, gap: "0.5rem" },
    lg: { height: 44, width: 209, gap: "0.6rem" },
  };

  const currentScale = scaleMap[size];

  const content = (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: currentScale.gap,
        textDecoration: "none",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: currentScale.gap }}>
        <Image 
          src="/images/digivigee_logo.png" 
          alt="DigiVigee Logo" 
          width={currentScale.width} 
          height={currentScale.height} 
          style={{ objectFit: "contain", ...(isDark ? { filter: "brightness(0) invert(1)" } : {}) }} 
          priority
        />
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="DigiVigee — Home" style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }

  return content;
}
