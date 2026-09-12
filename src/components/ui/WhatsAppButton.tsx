"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/config/site";
import { trackEvent } from "@/lib/tracking/events";

export interface WhatsAppButtonProps {
  variant?: "inline" | "floating" | "icon-only";
  phoneNumber?: string;
  message?: string;
  label?: string;
  className?: string;
}

export function WhatsAppButton({
  variant = "inline",
  phoneNumber,
  message = "Hello DigiVigee, I'd like to discuss growing my business with digital marketing.",
  label = "WhatsApp Us",
  className = "",
}: WhatsAppButtonProps) {
  const [activeNumber, setActiveNumber] = useState<string>(
    phoneNumber || SITE_CONFIG.contact.whatsappDisplay || SITE_CONFIG.contact.whatsappNumber
  );

  useEffect(() => {
    if (phoneNumber && phoneNumber !== SITE_CONFIG.contact.whatsappNumber) {
      setActiveNumber(phoneNumber);
      return;
    }

    async function fetchLiveWhatsapp() {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.settings?.contact?.whatsapp) {
            setActiveNumber(data.settings.contact.whatsapp);
          }
        }
      } catch {
        // Fallback
      }
    }

    fetchLiveWhatsapp();

    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("digivigee-cms-sync");
        channel.onmessage = (e) => {
          if (e.data?.type === "CMS_UPDATED") {
            fetchLiveWhatsapp();
          }
        };
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "digivigee_cms_updated") {
        fetchLiveWhatsapp();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      channel?.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, [phoneNumber]);

  const targetNumber = phoneNumber || activeNumber || SITE_CONFIG.contact.whatsappNumber;
  let cleanNumber = targetNumber.replace(/[^\d]/g, "");
  if (cleanNumber.length === 10) {
    cleanNumber = "91" + cleanNumber;
  }
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  const handleClick = () => {
    trackEvent("whatsapp_click", { variant, label });
  };

  const iconSvg = (
    <svg
      width={variant === "floating" ? "30" : "20"}
      height={variant === "floating" ? "30" : "20"}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );

  if (variant === "floating") {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with DigiVigee on WhatsApp"
        className={`digivigee-whatsapp-floating ${className}`}
        style={{
          position: "fixed",
          bottom: "max(2rem, env(safe-area-inset-bottom, 2rem))",
          right: "2rem",
          width: "60px",
          height: "60px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "#25D366",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 30px rgba(37, 211, 102, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.3)",
          zIndex: "var(--z-floating)" as unknown as number,
          textDecoration: "none",
        }}
      >
        {iconSvg}
      </a>
    );
  }

  if (variant === "icon-only") {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with DigiVigee on WhatsApp"
        className={`digivigee-whatsapp-icon ${className}`}
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "#25D366",
          color: "#ffffff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(37, 211, 102, 0.25)",
          transition: "all var(--transition-fast)",
        }}
      >
        {iconSvg}
      </a>
    );
  }

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`digivigee-whatsapp-inline ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.625rem",
        padding: "0 1.5rem",
        height: "54px",
        backgroundColor: "#25D366",
        color: "#ffffff",
        borderRadius: "var(--radius-md)",
        fontWeight: 700,
        fontSize: "0.9375rem",
        textDecoration: "none",
        boxShadow: "var(--shadow-glow-whatsapp)",
        transition: "all var(--transition-fast)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {iconSvg}
      <span>{label}</span>
    </a>
  );
}
