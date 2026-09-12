"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FormField, Input, Textarea, Select } from "@/components/forms";
import { Button } from "@/components/ui/Button";
import { SERVICES_DATA } from "@/data/services";
import { LeadSource } from "@/types";

export interface ContactFormProps {
  initialService?: string;
  source?: LeadSource;
  formType?: string;
  className?: string;
}

function ContactFormInner({
  initialService = "",
  source = "contact_form",
  formType = "contact",
  className = "",
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const paramService = searchParams.get("service") || "";
  const paramPackage = searchParams.get("package") || "";

  // Match slug or title from query param
  const matchedServiceFromParam = SERVICES_DATA.find(
    (s) => s.slug === paramService || s.title.toLowerCase() === paramService.toLowerCase()
  )?.title || initialService;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: matchedServiceFromParam,
    message: paramPackage ? `Interested in the ${paramPackage.toUpperCase()} plan. ` : "",
    website_hp: "", // Honeypot field for bot spam trap
  });

  const [formStartTime, setFormStartTime] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  // Update service if search params change
  useEffect(() => {
    if (paramService) {
      const matched = SERVICES_DATA.find(
        (s) => s.slug === paramService || s.title.toLowerCase() === paramService.toLowerCase()
      )?.title;
      if (matched) {
        setFormData((prev) => ({
          ...prev,
          service: matched,
          message: paramPackage ? `Interested in the ${paramPackage.toUpperCase()} plan. ` : prev.message,
        }));
      }
    }
  }, [paramService, paramPackage]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your full name.";
    } else if (formData.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters long.";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid business email address.";
    }

    if (formData.phone.trim() && !/^[0-9+()\-\s]{7,20}$/.test(formData.phone.trim())) {
      errs.phone = "Please enter a valid phone number.";
    }

    if (!formData.service) {
      errs.service = "Please select the service you are interested in.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const combinedMessage = formData.company.trim()
        ? `[Company: ${formData.company.trim()}] ${formData.message.trim()}`
        : formData.message.trim();

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          service: formData.service,
          message: combinedMessage || undefined,
          source,
          sourceUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
          formType,
          website_hp: formData.website_hp,
          formStartTime,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        }
        setServerError(data.error || "Unable to submit your inquiry. Please try again or reach us on WhatsApp.");
        setIsSubmitting(false);
        return;
      }

      // Success
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error("[ContactForm] Submit error:", err);
      setServerError("Network error. Please check your connection or contact us via WhatsApp.");
      setIsSubmitting(false);
    }
  };

  const serviceOptions = SERVICES_DATA.map((s) => ({
    value: s.title,
    label: s.title,
  }));

  if (isSuccess) {
    return (
      <div
        id="inquiry-success"
        style={{
          padding: "var(--space-10) var(--space-8)",
          backgroundColor: "var(--brand-green-50)",
          border: "1.5px solid #A7F3D0",
          borderRadius: "var(--radius-xl)",
          textAlign: "center",
          boxShadow: "var(--shadow-lg)",
        }}
        role="alert"
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--brand-green-500)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto var(--space-4) auto",
            fontSize: "2rem",
          }}
        >
          ✓
        </div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--brand-navy-900)", marginBottom: "0.5rem" }}>
          Inquiry Received, {formData.name}!
        </h3>
        <p style={{ color: "var(--brand-green-950)", fontSize: "1rem", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto 1.5rem auto" }}>
          Thank you for reaching out. Our growth strategists are reviewing your requirements and will contact you within <strong>24 business hours</strong> with initial recommendations.
        </p>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid #A7F3D0",
            maxWidth: "420px",
            margin: "0 auto 1.5rem auto",
            fontSize: "0.875rem",
            color: "var(--brand-navy-900)",
            textAlign: "left",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Selected Service:</div>
          <div>{formData.service}</div>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              name: "",
              company: "",
              email: "",
              phone: "",
              service: matchedServiceFromParam,
              message: "",
              website_hp: "",
            });
            setFormStartTime(Date.now());
          }}
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
      className={`digivigee-contact-form ${className}`}
      style={{
        backgroundColor: "var(--surface-card)",
        padding: "clamp(1.75rem, 4vw, 2.5rem)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--surface-border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div style={{ marginBottom: "var(--space-6)" }}>
        <h3 style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--brand-navy-900)", marginBottom: "0.25rem" }}>
          Request a Free Growth Consultation
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          Fill in your details below and our team will analyze your requirements.
        </p>
      </div>

      {/* Honeypot field for bot spam detection */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="website_hp">Leave this field blank</label>
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          value={formData.website_hp}
          onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {serverError && (
        <div
          role="alert"
          style={{
            padding: "0.875rem 1rem",
            backgroundColor: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "var(--radius-md)",
            color: "#B91C1C",
            fontSize: "0.875rem",
            marginBottom: "var(--space-4)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{serverError}</span>
        </div>
      )}

      {/* Row 1: Name & Business Name */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        <FormField label="Your Name" htmlFor="contact-name" required error={errors.name}>
          <Input
            id="contact-name"
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            hasError={Boolean(errors.name)}
            disabled={isSubmitting}
            autoComplete="name"
            aria-required="true"
          />
        </FormField>

        <FormField label="Business / Company Name" htmlFor="contact-company">
          <Input
            id="contact-company"
            placeholder="e.g. Acme Enterprises"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            disabled={isSubmitting}
            autoComplete="organization"
          />
        </FormField>
      </div>

      {/* Row 2: Email & Phone */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        <FormField label="Work Email" htmlFor="contact-email" required error={errors.email}>
          <Input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="rahul@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            hasError={Boolean(errors.email)}
            disabled={isSubmitting}
            aria-required="true"
          />
        </FormField>

        <FormField label="Phone Number" htmlFor="contact-phone" error={errors.phone}>
          <Input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 99999 99999"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            hasError={Boolean(errors.phone)}
            disabled={isSubmitting}
          />
        </FormField>
      </div>

      {/* Service Selection */}
      <FormField label="What service do you need?" htmlFor="contact-service" required error={errors.service}>
        <Select
          id="contact-service"
          placeholder="Select a core capability..."
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          options={serviceOptions}
          hasError={Boolean(errors.service)}
          disabled={isSubmitting}
        />
      </FormField>

      {/* Requirement / Message */}
      <FormField
        label="Tell us about your requirement"
        htmlFor="contact-message"
        hint="What is your business goal or the main problem you'd like DigiVigee to solve?"
      >
        <Textarea
          id="contact-message"
          placeholder="e.g. We are looking to scale our lead generation, improve our local Google rankings, and lower our customer acquisition cost..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          disabled={isSubmitting}
        />
      </FormField>

      <div style={{ marginTop: "var(--space-4)" }}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          disabled={isSubmitting}
          rightIcon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          }
        >
          {isSubmitting ? "Sending Inquiry..." : "Get Free Consultation"}
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          justifyContent: "center",
          marginTop: "var(--space-4)",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>100% Confidential • Dedicated Strategist • Response within 24h</span>
      </div>
    </form>
  );
}

export function ContactForm(props: ContactFormProps) {
  return (
    <Suspense
      fallback={
        <div
          style={{
            padding: "var(--space-10)",
            backgroundColor: "var(--surface-card)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--surface-border)",
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          Loading consultation form...
        </div>
      }
    >
      <ContactFormInner {...props} />
    </Suspense>
  );
}
