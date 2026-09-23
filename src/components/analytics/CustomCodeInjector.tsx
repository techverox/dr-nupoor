"use client";

import { useEffect, useState, useRef } from "react";
import { CustomScriptsSettings } from "@/types";

interface CustomCodeInjectorProps {
  initialScripts?: CustomScriptsSettings;
}

/**
 * Safely parses an HTML snippet and injects scripts, meta tags, styles, and markup
 * into the DOM with proper tag execution, error handling, and clean teardown.
 */
function applyCustomCodeSnippet(
  html: string,
  section: "header" | "body" | "footer",
  targetElement: HTMLElement
) {
  // 1. Remove all previously injected tags for this section
  const existing = document.querySelectorAll(`[data-digivigee-custom="${section}"]`);
  existing.forEach((node) => node.remove());

  const cleanHtml = (html || "").trim();
  if (!cleanHtml) return;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<body>${cleanHtml}</body>`, "text/html");
    const elements = Array.from(doc.body.childNodes);

    elements.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;

        if (el.tagName.toLowerCase() === "script") {
          // Re-create the script element so the browser executes it
          const scriptEl = document.createElement("script");
          scriptEl.setAttribute("data-digivigee-custom", section);

          // Copy all script attributes (src, async, defer, type, crossorigin, etc.)
          Array.from(el.attributes).forEach((attr) => {
            scriptEl.setAttribute(attr.name, attr.value);
          });

          // If it has inline script code, wrap in safe execution block
          if (el.textContent && el.textContent.trim()) {
            scriptEl.text = `
try {
${el.textContent}
} catch (customScriptError) {
  console.warn("[DigiVigee Custom Code Error in ${section}]:", customScriptError);
}
`;
          }

          targetElement.appendChild(scriptEl);
        } else {
          // For non-script nodes (<style>, <link>, <meta>, <noscript>, <div>, etc.)
          const clone = el.cloneNode(true) as HTMLElement;
          clone.setAttribute("data-digivigee-custom", section);
          targetElement.appendChild(clone);
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const span = document.createElement("span");
        span.setAttribute("data-digivigee-custom", section);
        span.textContent = node.textContent;
        targetElement.appendChild(span);
      }
    });
  } catch (err) {
    console.warn(`[DigiVigee CustomCodeInjector] Error injecting ${section} code:`, err);
  }
}

/**
 * Remove all injected custom code elements from document
 */
function removeAllCustomCode() {
  const customNodes = document.querySelectorAll("[data-digivigee-custom]");
  customNodes.forEach((node) => node.remove());
}

export function CustomCodeInjector({ initialScripts }: CustomCodeInjectorProps) {
  const [scripts, setScripts] = useState<CustomScriptsSettings | undefined>(initialScripts);
  const mountedRef = useRef(false);

  // Sync / fetch latest scripts from API
  const refreshScripts = async () => {
    try {
      const res = await fetch("/api/settings?_t=" + Date.now(), {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.settings?.customScripts) {
        setScripts(data.settings.customScripts);
      }
    } catch {
      // Ignore background network transient errors
    }
  };

  // Inject or remove code whenever scripts state changes
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    if (!scripts || !scripts.isEnabled) {
      removeAllCustomCode();
      return;
    }

    // 1. Injected into <head>
    if (scripts.headerCode) {
      applyCustomCodeSnippet(scripts.headerCode, "header", document.head);
    } else {
      document.querySelectorAll('[data-digivigee-custom="header"]').forEach((n) => n.remove());
    }

    // 2. Injected into <body> (Top)
    const bodyContainer = document.getElementById("digivigee-custom-body") || document.body;
    if (scripts.bodyCode) {
      applyCustomCodeSnippet(scripts.bodyCode, "body", bodyContainer);
    } else {
      document.querySelectorAll('[data-digivigee-custom="body"]').forEach((n) => n.remove());
    }

    // 3. Injected into <body> (Footer / End)
    const footerContainer = document.getElementById("digivigee-custom-footer") || document.body;
    if (scripts.footerCode) {
      applyCustomCodeSnippet(scripts.footerCode, "footer", footerContainer);
    } else {
      document.querySelectorAll('[data-digivigee-custom="footer"]').forEach((n) => n.remove());
    }

    return () => {
      // Teardown when component unmounts
      removeAllCustomCode();
    };
  }, [scripts]);

  // Setup Real-time Listener (BroadcastChannel + LocalStorage storage events)
  useEffect(() => {
    if (typeof window === "undefined") return;

    mountedRef.current = true;

    // Initial fetch if initialScripts was not provided or empty
    if (!initialScripts) {
      refreshScripts();
    }

    let channel: BroadcastChannel | null = null;
    try {
      if ("BroadcastChannel" in window) {
        channel = new BroadcastChannel("digivigee-cms-sync");
        channel.onmessage = (event) => {
          if (event.data?.type === "CMS_UPDATED") {
            refreshScripts();
          }
        };
      }
    } catch {
      // BroadcastChannel not available fallback
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "digivigee_cms_updated") {
        refreshScripts();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      if (channel) {
        channel.close();
      }
      window.removeEventListener("storage", handleStorage);
    };
  }, [initialScripts]);

  return (
    <>
      {/* Structural anchors for body and footer script locations */}
      <div id="digivigee-custom-body" style={{ display: "none" }} aria-hidden="true" />
      <div id="digivigee-custom-footer" style={{ display: "none" }} aria-hidden="true" />
    </>
  );
}
