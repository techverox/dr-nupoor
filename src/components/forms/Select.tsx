import React from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  hasError?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, hasError = false, placeholder, className = "", style, disabled, ...props }, ref) => {
    return (
      <div style={{ position: "relative", width: "100%" }}>
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          className={`digivigee-select ${className}`}
          style={{
            width: "100%",
            height: "48px",
            paddingLeft: "1rem",
            paddingRight: "2.75rem",
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
            fontSize: "1rem", // 16px prevents iOS zoom
            color: "var(--text-heading)",
            backgroundColor: "var(--surface-white)",
            border: hasError ? "1.5px solid var(--status-error)" : "1px solid var(--surface-border)",
            borderRadius: "var(--radius-md)",
            outline: "none",
            appearance: "none",
            WebkitAppearance: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom Chevron Indicator */}
        <div
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
