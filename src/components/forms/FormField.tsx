import React from "react";

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  className = "",
  style,
  children,
}: FormFieldProps) {
  return (
    <div
      className={`digivigee-form-field ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        width: "100%",
        marginBottom: "var(--space-4)",
        ...style,
      }}
    >
      {label && (
        <label
          htmlFor={htmlFor}
          style={{
            fontSize: "var(--text-body-sm)",
            fontWeight: 600,
            color: "var(--text-heading)",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontFamily: "var(--font-sans)",
          }}
        >
          <span>{label}</span>
          {required && (
            <span
              style={{ color: "var(--status-error)", fontWeight: 700 }}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      {children}

      {hint && !error && (
        <span
          style={{
            fontSize: "var(--text-caption)",
            color: "var(--text-muted)",
            lineHeight: 1.4,
            fontFamily: "var(--font-sans)",
          }}
        >
          {hint}
        </span>
      )}

      {error && (
        <span
          role="alert"
          style={{
            fontSize: "var(--text-caption)",
            color: "var(--status-error)",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            lineHeight: 1.4,
            fontFamily: "var(--font-sans)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </span>
      )}
    </div>
  );
}
