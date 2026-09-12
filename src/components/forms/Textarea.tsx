import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError = false, className = "", style, disabled, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        aria-invalid={hasError}
        rows={rows}
        className={`digivigee-textarea ${className}`}
        style={{
          width: "100%",
          padding: "0.875rem 1rem",
          fontSize: "1rem", // 16px prevents iOS zoom
          color: "var(--text-heading)",
          backgroundColor: "var(--surface-white)",
          border: hasError ? "1.5px solid var(--status-error)" : "1px solid var(--surface-border)",
          borderRadius: "var(--radius-md)",
          outline: "none",
          resize: "vertical",
          minHeight: "120px",
          transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "text",
          fontFamily: "var(--font-sans)",
          lineHeight: 1.6,
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = hasError
            ? "var(--status-error)"
            : "var(--brand-green-500)";
          e.currentTarget.style.boxShadow = hasError
            ? "0 0 0 3px var(--status-error-bg)"
            : "0 0 0 3px var(--brand-green-50)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = hasError
            ? "var(--status-error)"
            : "var(--surface-border)";
          e.currentTarget.style.boxShadow = "none";
        }}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
