import React from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "brand"
  | "blue"
  | "secondary"
  | "outline"
  | "outline-glow"
  | "ghost"
  | "glass"
  | "dark"
  | "light"
  | "whatsapp";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

export interface LinkButtonProps
  extends BaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  href: string;
  isExternal?: boolean;
}

const getVariantStyles = (variant: ButtonVariant): React.CSSProperties => {
  switch (variant) {
    case "brand":
      return {
        background: "var(--gradient-brand)",
        color: "#ffffff",
        border: "none",
        boxShadow: "var(--shadow-glow-brand)",
      };
    case "blue":
      return {
        background: "var(--gradient-blue)",
        color: "#ffffff",
        border: "none",
        boxShadow: "var(--shadow-glow-blue)",
      };
    case "primary":
      return {
        background: "var(--gradient-green)",
        color: "#ffffff",
        border: "none",
        boxShadow: "var(--shadow-glow-green)",
      };
    case "secondary":
      return {
        backgroundColor: "var(--brand-green-50)",
        color: "var(--brand-green-700)",
        border: "1px solid var(--brand-green-200)",
        boxShadow: "none",
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        color: "var(--brand-navy-900)",
        border: "1.5px solid var(--surface-border)",
        boxShadow: "none",
      };
    case "outline-glow":
      return {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        color: "var(--brand-blue-600)",
        border: "1.5px solid var(--brand-blue-300)",
        boxShadow: "0 0 16px rgba(0, 82, 255, 0.15)",
      };
    case "glass":
      return {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "var(--brand-navy-900)",
        border: "1px solid rgba(226, 232, 240, 0.9)",
        boxShadow: "var(--shadow-sm)",
      };
    case "ghost":
      return {
        backgroundColor: "transparent",
        color: "var(--text-body)",
        border: "1px solid transparent",
        boxShadow: "none",
      };
    case "dark":
      return {
        backgroundColor: "var(--brand-navy-900)",
        color: "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        boxShadow: "0 8px 24px rgba(7, 15, 38, 0.25)",
      };
    case "light":
      return {
        backgroundColor: "var(--surface-white)",
        color: "var(--brand-navy-900)",
        border: "1px solid var(--surface-border)",
        boxShadow: "var(--shadow-sm)",
      };
    case "whatsapp":
      return {
        backgroundColor: "var(--whatsapp)",
        color: "#ffffff",
        border: "none",
        boxShadow: "var(--shadow-glow-whatsapp)",
      };
  }
};

const getSizeStyles = (size: ButtonSize): React.CSSProperties => {
  switch (size) {
    case "sm":
      return {
        height: "38px",
        padding: "0 1.125rem",
        fontSize: "0.875rem",
        borderRadius: "var(--radius-sm)",
        gap: "0.375rem",
      };
    case "md":
      return {
        height: "46px",
        padding: "0 1.5rem",
        fontSize: "0.9375rem",
        borderRadius: "var(--radius-md)",
        gap: "0.5rem",
      };
    case "lg":
      return {
        height: "54px",
        padding: "0 2rem",
        fontSize: "1.0625rem",
        borderRadius: "var(--radius-md)",
        gap: "0.625rem",
      };
    case "xl":
      return {
        height: "60px",
        padding: "0 2.25rem",
        fontSize: "1.125rem",
        borderRadius: "var(--radius-lg)",
        gap: "0.75rem",
      };
  }
};

function Spinner({ size }: { size: ButtonSize }) {
  const dim = size === "sm" ? 14 : size === "lg" || size === "xl" ? 18 : 16;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: "spin 0.8s linear infinite",
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
        style={{ opacity: 0.25 }}
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="15.7 47.1"
      />
    </svg>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = "",
      style,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyle = getVariantStyles(variant);
    const sizeStyle = getSizeStyles(size);

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`digivigee-btn ${className}`}
        style={{
          display: fullWidth ? "flex" : "inline-flex",
          width: fullWidth ? "100%" : "auto",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontFamily: "var(--font-sans)",
          cursor: disabled || isLoading ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          outline: "none",
          ...variantStyle,
          ...sizeStyle,
          ...style,
        }}
        {...props}
      >
        {isLoading && <Spinner size={size} />}
        {!isLoading && leftIcon && (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      href,
      isExternal = false,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      style,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyle = getVariantStyles(variant);
    const sizeStyle = getSizeStyles(size);

    const content = (
      <>
        {isLoading && <Spinner size={size} />}
        {!isLoading && leftIcon && (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {rightIcon}
          </span>
        )}
      </>
    );

    const mergedStyles: React.CSSProperties = {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : "auto",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontFamily: "var(--font-sans)",
      cursor: "pointer",
      textDecoration: "none",
      outline: "none",
      ...variantStyle,
      ...sizeStyle,
      ...style,
    };

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`digivigee-btn ${className}`}
          style={mergedStyles}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        ref={ref}
        href={href}
        className={`digivigee-btn ${className}`}
        style={mergedStyles}
        {...props}
      >
        {content}
      </Link>
    );
  }
);
LinkButton.displayName = "LinkButton";
