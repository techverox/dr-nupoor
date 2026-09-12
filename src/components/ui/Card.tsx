import React from "react";

export type CardVariant =
  | "default"
  | "bordered"
  | "flat"
  | "dark"
  | "glass"
  | "glow-border"
  | "dark-glow";

export type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  featured?: boolean;
  glowAccent?: "blue" | "green" | "brand";
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  padding = "md",
  hoverable = false,
  featured = false,
  glowAccent = "brand",
  className = "",
  style,
  children,
  ...props
}: CardProps) {
  const getGlowBorder = () => {
    if (glowAccent === "blue") return "linear-gradient(135deg, rgba(0, 82, 255, 0.6) 0%, rgba(59, 130, 246, 0.2) 100%)";
    if (glowAccent === "green") return "linear-gradient(135deg, rgba(0, 208, 83, 0.6) 0%, rgba(16, 185, 129, 0.2) 100%)";
    return "var(--gradient-border-glow)";
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "default":
        return {
          backgroundColor: "var(--surface-card)",
          border: featured ? "2px solid var(--brand-blue-500)" : "1px solid var(--surface-border)",
          boxShadow: featured ? "var(--shadow-glow-blue)" : "var(--shadow-card)",
          color: "var(--text-heading)",
        };
      case "glass":
        return {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: featured ? "2px solid var(--brand-green-500)" : "1px solid rgba(226, 232, 240, 0.9)",
          boxShadow: featured ? "var(--shadow-glow-green)" : "var(--shadow-card)",
          color: "var(--text-heading)",
        };
      case "glow-border":
        return {
          backgroundColor: "var(--surface-card)",
          border: "1.5px solid transparent",
          backgroundImage: `linear-gradient(var(--surface-card), var(--surface-card)), ${getGlowBorder()}`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow: "var(--shadow-card)",
          color: "var(--text-heading)",
        };
      case "dark-glow":
        return {
          backgroundColor: "var(--brand-navy-900)",
          border: "1.5px solid transparent",
          backgroundImage: `linear-gradient(var(--brand-navy-900), var(--brand-navy-900)), ${getGlowBorder()}`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
          color: "#ffffff",
        };
      case "bordered":
        return {
          backgroundColor: "var(--surface-card)",
          border: featured ? "2px solid var(--brand-blue-500)" : "1.5px solid #CBD5E1",
          boxShadow: "none",
          color: "var(--text-heading)",
        };
      case "flat":
        return {
          backgroundColor: "var(--surface-subtle)",
          border: featured ? "2px solid var(--brand-green-500)" : "1px solid var(--surface-border)",
          boxShadow: "none",
          color: "var(--text-heading)",
        };
      case "dark":
        return {
          backgroundColor: "var(--surface-dark-card)",
          border: featured ? "2px solid var(--brand-green-500)" : "1px solid var(--border-dark)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          color: "var(--text-inverted)",
        };
    }
  };

  const getPaddingStyles = (): React.CSSProperties => {
    switch (padding) {
      case "none":
        return { padding: 0 };
      case "sm":
        return { padding: "var(--space-4)" };
      case "md":
        return { padding: "var(--space-6)" };
      case "lg":
        return { padding: "var(--space-8)" };
      case "xl":
        return { padding: "var(--space-10)" };
    }
  };

  return (
    <div
      className={`digivigee-card ${hoverable ? "hoverable" : ""} ${className}`}
      style={{
        borderRadius: "var(--radius-lg)",
        position: "relative",
        overflow: "hidden",
        ...getVariantStyles(),
        ...getPaddingStyles(),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
