"use client";

import React, { useState, useEffect } from "react";
import { FormDefinition } from "@/types/form";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { getAttributionContext } from "@/lib/tracking/attribution";
import { trackEvent } from "@/lib/tracking/events";

export interface FormRendererProps {
  form?: FormDefinition;
  formId?: string;
  landingPageId?: string;
  landingPageSlug?: string;
  source?: string;
  className?: string;
  isTestMode?: boolean;
  onSuccess?: () => void;
}

export function FormRenderer({
  form: initialForm,
  formId,
  landingPageId,
  landingPageSlug,
  source,
  className = "",
  isTestMode = false,
  onSuccess,
}: FormRendererProps) {
  const [form, setForm] = useState<FormDefinition | null>(initialForm || null);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(!initialForm && !!formId);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Form State
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Honeypot & Timing anti-bot protection
  const [websiteHp, setWebsiteHp] = useState<string>("");
  const [formStartTime, setFormStartTime] = useState<number>(0);

  // Load Form Definition if not passed directly
  useEffect(() => {
    if (initialForm) {
      setForm(initialForm);
      return;
    }

    if (formId) {
      let isMounted = true;
      setIsLoadingForm(true);
      setLoadError(null);

      fetch(`/api/admin/forms/${formId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          if (data.success && data.form) {
            setForm(data.form);
          } else {
            setLoadError(data.error || "Form is unavailable.");
          }
        })
        .catch(() => {
          if (isMounted) setLoadError("Unable to load form.");
        })
        .finally(() => {
          if (isMounted) setIsLoadingForm(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [initialForm, formId]);

  // Initialize start time and default values
  useEffect(() => {
    setFormStartTime(Date.now());

    if (form && form.fields) {
      const initialValues: Record<string, unknown> = {};
      form.fields.forEach((f) => {
        if (f.defaultValue !== undefined) {
          initialValues[f.name] = f.defaultValue;
        } else if (f.type === "checkbox") {
          initialValues[f.name] = [];
        } else {
          initialValues[f.name] = "";
        }
      });
      setValues(initialValues);
    }
  }, [form]);

  // Client-Side Validation
  const validate = (): boolean => {
    if (!form || !form.fields) return true;

    const newErrors: Record<string, string> = {};
    form.fields.forEach((field) => {
      if (!field.isVisible) return;

      const val = values[field.name];

      if (field.required) {
        if (val === undefined || val === null || val === "") {
          newErrors[field.name] = `${field.label} is required.`;
          return;
        }
        if (Array.isArray(val) && val.length === 0) {
          newErrors[field.name] = `Please select at least one ${field.label}.`;
          return;
        }
      }

      if (val && typeof val === "string") {
        if (field.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val.trim())) {
            newErrors[field.name] = "Please enter a valid email address.";
          }
        } else if (field.validation?.minLength && val.length < field.validation.minLength) {
          newErrors[field.name] = `${field.label} must be at least ${field.validation.minLength} characters.`;
        } else if (field.validation?.maxLength && val.length > field.validation.maxLength) {
          newErrors[field.name] = `${field.label} cannot exceed ${field.validation.maxLength} characters.`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on edit
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxToggle = (name: string, optionValue: string) => {
    const current = Array.isArray(values[name]) ? (values[name] as string[]) : [];
    const next = current.includes(optionValue)
      ? current.filter((item) => item !== optionValue)
      : [...current, optionValue];

    handleFieldChange(name, next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;
    if (!form) return;

    setIsSubmitting(true);

    try {
      const attr = getAttributionContext();
      const payload = {
        values,
        landingPageId,
        landingPageSlug,
        source: source || form.leadSource || "custom_form",
        pageUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
        referrer: attr.referrer || (typeof document !== "undefined" ? document.referrer : undefined),
        website_hp: websiteHp,
        formStartTime,
        utmSource: attr.utmSource,
        utmMedium: attr.utmMedium,
        utmCampaign: attr.utmCampaign,
        utmContent: attr.utmContent,
        utmTerm: attr.utmTerm,
        sessionId: attr.sessionId,
        visitorId: attr.visitorId,
      };

      const response = await fetch(`/api/forms/${form.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        }
        setServerError(data.error || "Submission failed. Please check the fields and try again.");
        setIsSubmitting(false);
        return;
      }

      // Track successful form conversion
      trackEvent("form_submission", {
        formId: form.id,
        formName: form.name,
        landingPageSlug,
      });

      // Handle Success
      if (data.successAction === "redirect" && data.redirectUrl) {
        // Safe relative redirection
        window.location.href = data.redirectUrl;
        return;
      }

      setIsSuccess(true);
      setSuccessMessage(data.successMessage || form.successMessage || "Thank you! Your submission has been received.");
      if (onSuccess) onSuccess();
    } catch {
      setServerError("A network error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingForm) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center", color: "var(--text-muted)" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏳</div>
        <div>Loading form...</div>
      </div>
    );
  }

  if (loadError || !form) {
    return (
      <div
        style={{
          padding: "2rem 1.5rem",
          textAlign: "center",
          borderRadius: "var(--radius-md)",
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#991b1b",
          fontSize: "0.875rem",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>⚠️ Form Unavailable</div>
        <div>{loadError || "The requested form is currently inactive or deleted."}</div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div
        style={{
          padding: "3rem 1.5rem",
          textAlign: "center",
          backgroundColor: "#ecfdf5",
          borderRadius: "var(--radius-md)",
          border: "1px solid #a7f3d0",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "var(--brand-primary)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.75rem",
            margin: "0 auto 1.25rem auto",
            boxShadow: "0 10px 20px rgba(22, 163, 74, 0.2)",
          }}
        >
          ✓
        </div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
          Submission Received!
        </h3>
        <p style={{ color: "#166534", fontSize: "0.9375rem", maxWidth: "460px", margin: "0 auto", lineHeight: 1.5 }}>
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={`digivigee-dynamic-form ${className}`} style={{ position: "relative" }}>
      {isTestMode && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.4rem 0.75rem",
            borderRadius: "var(--radius-md)",
            backgroundColor: "#fef3c7",
            border: "1px solid #fde68a",
            color: "#92400e",
            fontSize: "0.75rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span>🧪</span>
          <span>PREVIEW / TEST MODE ACTIVE</span>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius-md)",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            fontSize: "0.875rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>⚠️</span>
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Anti-Bot Honeypot Field (Hidden from humans, bots populate it) */}
        <div
          aria-hidden="true"
          style={{
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            height: 0,
            width: 0,
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <label htmlFor="website_hp_input">Do not fill this field</label>
          <input
            type="text"
            id="website_hp_input"
            name="website_hp"
            tabIndex={-1}
            value={websiteHp}
            onChange={(e) => setWebsiteHp(e.target.value)}
            autoComplete="off"
          />
        </div>

        {/* Dynamic Fields Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "1rem",
            rowGap: "0.25rem",
          }}
        >
          {(form.fields || [])
            .filter((f) => f.isVisible)
            .sort((a, b) => a.order - b.order)
            .map((field) => {
              const isHalf = field.width === "half";
              const gridSpan = isHalf ? "span 1" : "span 2";
              const error = errors[field.name];
              const val = values[field.name];

              // 1. Hidden Field
              if (field.type === "hidden") {
                return (
                  <input
                    key={field.id}
                    type="hidden"
                    name={field.name}
                    value={String(val || field.defaultValue || "")}
                  />
                );
              }

              // 2. Text / Email / Phone
              if (field.type === "text" || field.type === "email" || field.type === "phone") {
                return (
                  <div key={field.id} style={{ gridColumn: gridSpan }}>
                    <FormField
                      label={field.label}
                      htmlFor={`field-${field.id}`}
                      required={field.required}
                      hint={field.helpText}
                      error={error}
                    >
                      <Input
                        id={`field-${field.id}`}
                        type={field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text"}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={String(val || "")}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        hasError={!!error}
                        required={field.required}
                      />
                    </FormField>
                  </div>
                );
              }

              // 3. Textarea
              if (field.type === "textarea") {
                return (
                  <div key={field.id} style={{ gridColumn: gridSpan }}>
                    <FormField
                      label={field.label}
                      htmlFor={`field-${field.id}`}
                      required={field.required}
                      hint={field.helpText}
                      error={error}
                    >
                      <Textarea
                        id={`field-${field.id}`}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={String(val || "")}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        rows={4}
                        hasError={!!error}
                        required={field.required}
                      />
                    </FormField>
                  </div>
                );
              }

              // 4. Select Dropdown
              if (field.type === "select") {
                const options = (field.options || []).map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }));

                return (
                  <div key={field.id} style={{ gridColumn: gridSpan }}>
                    <FormField
                      label={field.label}
                      htmlFor={`field-${field.id}`}
                      required={field.required}
                      hint={field.helpText}
                      error={error}
                    >
                      <Select
                        id={`field-${field.id}`}
                        name={field.name}
                        options={options}
                        value={String(val || "")}
                        placeholder={field.placeholder || "Select an option..."}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        hasError={!!error}
                        required={field.required}
                      />
                    </FormField>
                  </div>
                );
              }

              // 5. Radio Group
              if (field.type === "radio") {
                return (
                  <div key={field.id} style={{ gridColumn: gridSpan }}>
                    <FormField
                      label={field.label}
                      required={field.required}
                      hint={field.helpText}
                      error={error}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.25rem" }}>
                        {(field.options || []).map((opt, idx) => (
                          <label
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              fontSize: "0.875rem",
                              color: "var(--brand-navy)",
                              cursor: "pointer",
                            }}
                          >
                            <input
                              type="radio"
                              name={field.name}
                              value={opt.value}
                              checked={val === opt.value}
                              onChange={() => handleFieldChange(field.name, opt.value)}
                              style={{ width: "16px", height: "16px", accentColor: "var(--brand-primary)" }}
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </FormField>
                  </div>
                );
              }

              // 6. Checkbox Group
              if (field.type === "checkbox") {
                const selectedValues = Array.isArray(val) ? (val as string[]) : [];

                return (
                  <div key={field.id} style={{ gridColumn: gridSpan }}>
                    <FormField
                      label={field.label}
                      required={field.required}
                      hint={field.helpText}
                      error={error}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.25rem" }}>
                        {(field.options || []).map((opt, idx) => (
                          <label
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              fontSize: "0.875rem",
                              color: "var(--brand-navy)",
                              cursor: "pointer",
                            }}
                          >
                            <input
                              type="checkbox"
                              name={field.name}
                              value={opt.value}
                              checked={selectedValues.includes(opt.value)}
                              onChange={() => handleCheckboxToggle(field.name, opt.value)}
                              style={{ width: "16px", height: "16px", accentColor: "var(--brand-primary)" }}
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </FormField>
                  </div>
                );
              }

              return null;
            })}
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: "1rem" }}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing Inquiry..." : form.submitButtonText || "Submit Inquiry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
