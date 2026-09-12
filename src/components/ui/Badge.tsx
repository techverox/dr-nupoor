import React from "react";

export type BadgeVariant =
  | "primary-subtle"
  | "primary-solid"
  | "brand-glow"
  | "blue-subtle"
  | "blue-solid"
  | "navy-subtle"
  | "glass"
  | "outline"
  | "warning"
  | "error"
  | "info"
  | "verified"
  | "success"
  | "active"
  | "pending"
  | "draft"
  | "archived"
  | "neutral";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  pulseDot?: boolean;
  pulseColor?: "green" | "blue" | "brand";
  children: React.ReactNode;
}

export function Badge({
  variant = "primary-subtle",
  size = "md",
  icon,
  pulseDot = false,
  pulseColor = "green",
  className = "",
  style,
  children,
  ...props
}: BadgeProps) {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "brand-glow":
        return {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          color: "var(--brand-navy-900)",
          border: "1.5px solid rgba(0, 82, 255, 0.25)",
          boxShadow: "0 0 20px rgba(0, 82, 255, 0.12), 0 0 10px rgba(0, 208, 83, 0.12)",
        };
      case "blue-subtle":
        return {
          backgroundColor: "var(--brand-blue-50)",
          color: "var(--brand-blue-600)",
          border: "1px solid var(--brand-blue-200)",
        };
      case "blue-solid":
        return {
          background: "var(--gradient-blue)",
          color: "#ffffff",
          border: "none",
          boxShadow: "var(--shadow-glow-blue)",
        };
      case "primary-subtle":
      case "success":
      case "active":
        return {
          backgroundColor: "var(--brand-green-50)",
          color: "var(--brand-green-700)",
          border: "1px solid var(--brand-green-200)",
        };
      case "primary-solid":
        return {
          background: "var(--gradient-green)",
          color: "#ffffff",
          border: "none",
          boxShadow: "var(--shadow-glow-green)",
        };
      case "navy-subtle":
        return {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          color: "var(--text-inverted-muted)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        };
      case "glass":
        return {
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: "var(--brand-navy-900)",
          border: "1px solid rgba(226, 232, 240, 0.9)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
        };
      case "outline":
      case "neutral":
        return {
          backgroundColor: "transparent",
          color: "var(--text-heading)",
          border: "1px solid var(--surface-border)",
        };
      case "warning":
      case "pending":
        return {
          backgroundColor: "var(--status-warning-bg)",
          color: "#b45309",
          border: "1px solid #fde68a",
        };
      case "error":
        return {
          backgroundColor: "var(--status-error-bg)",
          color: "var(--status-error)",
          border: "1px solid #fecaca",
        };
      case "info":
        return {
          backgroundColor: "var(--status-info-bg)",
          color: "var(--status-info)",
          border: "1px solid #bfdbfe",
        };
      case "draft":
        return {
          backgroundColor: "#F1F5F9",
          color: "#64748B",
          border: "1px solid #E2E8F0",
        };
      case "archived":
        return {
          backgroundColor: "#F8FAFC",
          color: "#94A3B8",
          border: "1px solid #CBD5E1",
        };
      case "verified":
        return {
          backgroundColor: "var(--brand-green-50)",
          color: "var(--brand-green-700)",
          border: "1px solid var(--brand-green-400)",
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case "sm":
        return {
          padding: "0.22rem 0.65rem",
          fontSize: "0.6875rem",
          gap: "0.35rem",
        };
      case "md":
        return {
          padding: "0.35rem 0.95rem",
          fontSize: "0.75rem",
          gap: "0.45rem",
        };
      case "lg":
        return {
          padding: "0.45rem 1.25rem",
          fontSize: "0.8125rem",
          gap: "0.55rem",
        };
    }
  };

  const getDotColor = () => {
    if (pulseColor === "blue") return "var(--brand-blue-500)";
    if (pulseColor === "brand") return "var(--brand-blue-500)";
    return "var(--brand-green-500)";
  };

  return (
    <span
      className={`digivigee-badge ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 800,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        borderRadius: "var(--radius-full)",
        lineHeight: 1.2,
        userSelect: "none",
        fontFamily: "var(--font-sans)",
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      {...props}
    >
      {pulseDot && (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "var(--radius-full)",
            backgroundColor: getDotColor(),
            boxShadow: `0 0 8px ${getDotColor()}`,
            display: "inline-block",
            flexShrink: 0,
          }}
        />
      )}
      {icon && (
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
