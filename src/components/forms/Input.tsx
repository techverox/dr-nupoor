import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, leftIcon, rightIcon, className = "", style, disabled, ...props }, ref) => {
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {leftIcon && (
          <span
            style={{
              position: "absolute",
              left: "1rem",
              color: "var(--text-muted)",
              display: "inline-flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          className={`digivigee-input ${className}`}
          style={{
            width: "100%",
            height: "48px",
            paddingLeft: leftIcon ? "2.75rem" : "1rem",
            paddingRight: rightIcon ? "2.75rem" : "1rem",
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
            fontSize: "1rem", // 16px to prevent iOS auto-zoom
            color: "var(--text-heading)",
            backgroundColor: "var(--surface-white)",
            border: hasError ? "1.5px solid var(--status-error)" : "1px solid var(--surface-border)",
            borderRadius: "var(--radius-md)",
            outline: "none",
            transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? "not-allowed" : "text",
            fontFamily: "var(--font-sans)",
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

        {rightIcon && (
          <span
            style={{
              position: "absolute",
              right: "1rem",
              color: "var(--text-muted)",
              display: "inline-flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
