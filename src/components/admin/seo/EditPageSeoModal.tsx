"use client";

import React, { useState, useEffect } from "react";
import { PageSeoSummary, CustomPageSeo } from "@/types";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";

interface EditPageSeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: PageSeoSummary | null;
  canonicalBaseUrl: string;
  defaultOgImage: string;
  onSaved: () => void;
}

export function EditPageSeoModal({
  isOpen,
  onClose,
  page,
  canonicalBaseUrl,
  defaultOgImage,
  onSaved,
}: EditPageSeoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [keywordsText, setKeywordsText] = useState("");

  const [activeSubTab, setActiveSubTab] = useState<"general" | "social" | "preview">("general");
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (page && isOpen) {
      setTitle(page.seoTitle || "");
      setDescription(page.metaDescription || "");
      setCanonicalUrl(page.canonicalUrl || "");
      setRobotsIndex(page.isIndexable);
      setRobotsFollow(page.robotsFollow !== undefined ? page.robotsFollow : true);
      setOgTitle(page.seoTitle || "");
      setOgDescription(page.metaDescription || "");
      setOgImage(page.ogImageUrl || defaultOgImage || "");
      setTwitterTitle(page.seoTitle || "");
      setTwitterDescription(page.metaDescription || "");
      setKeywordsText((page.keywords || []).join(", "));
      setErrorMessage(null);
    }
  }, [page, isOpen, defaultOgImage]);

  if (!isOpen || !page) return null;

  const baseUrl = (canonicalBaseUrl || "https://drnoopurpatel.com").replace(/\/+$/, "");
  const simulatedCanonical = canonicalUrl.trim() || `${baseUrl}${page.routePath === "/" ? "" : page.routePath}`;

  // Character length evaluation
  const titleLen = title.length;
  const titleOptimal = titleLen >= 35 && titleLen <= 65;
  const titleColor = titleLen === 0 ? "var(--status-error)" : titleOptimal ? "var(--brand-primary-hover)" : "#d97706";

  const descLen = description.length;
  const descOptimal = descLen >= 120 && descLen <= 165;
  const descColor = descLen === 0 ? "var(--status-error)" : descOptimal ? "var(--brand-primary-hover)" : "#d97706";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);

    const keywords = keywordsText
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const payload: Partial<CustomPageSeo> = {
      routePath: page.routePath,
      title: title.trim(),
      description: description.trim(),
      canonicalUrl: canonicalUrl.trim() || undefined,
      robotsIndex,
      robotsFollow,
      ogTitle: ogTitle.trim() || title.trim(),
      ogDescription: ogDescription.trim() || description.trim(),
      ogImage: ogImage.trim() || undefined,
      twitterTitle: twitterTitle.trim() || title.trim(),
      twitterDescription: twitterDescription.trim() || description.trim(),
      keywords,
    };

    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_page_seo",
          routePath: page.routePath,
          data: payload,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onSaved();
        onClose();
      } else {
        setErrorMessage(data.error || "Failed to save page SEO.");
      }
    } catch {
      setErrorMessage("Network error saving page SEO.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-lg)",
          width: "100%",
          maxWidth: "800px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--brand-navy)", margin: 0 }}>
              Edit SEO Metadata: {page.pageName}
            </h2>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", fontFamily: "monospace", marginTop: "0.2rem" }}>
              Target Route: {page.routePath}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.25rem",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "0.25rem",
            }}
          >
            ✕
          </button>
        </div>

        {/* Sub-Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            backgroundColor: "#f8fafc",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveSubTab("general")}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.8125rem",
              fontWeight: activeSubTab === "general" ? 700 : 500,
              backgroundColor: activeSubTab === "general" ? "var(--brand-primary)" : "transparent",
              color: activeSubTab === "general" ? "#ffffff" : "var(--text-secondary)",
              border: "none",
              cursor: "pointer",
            }}
          >
            1. Title, Description &amp; Robots
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("social")}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.8125rem",
              fontWeight: activeSubTab === "social" ? 700 : 500,
              backgroundColor: activeSubTab === "social" ? "var(--brand-primary)" : "transparent",
              color: activeSubTab === "social" ? "#ffffff" : "var(--text-secondary)",
              border: "none",
              cursor: "pointer",
            }}
          >
            2. Social Cards (OG &amp; Twitter)
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("preview")}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.8125rem",
              fontWeight: activeSubTab === "preview" ? 700 : 500,
              backgroundColor: activeSubTab === "preview" ? "var(--brand-primary)" : "transparent",
              color: activeSubTab === "preview" ? "#ffffff" : "var(--text-secondary)",
              border: "none",
              cursor: "pointer",
            }}
          >
            3. Google SERP Simulator
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {errorMessage && (
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "#fee2e2",
                color: "var(--status-error)",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              {errorMessage}
            </div>
          )}

          <form id="page-seo-form" onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* SUB-TAB 1: GENERAL */}
            {activeSubTab === "general" && (
              <>
                {/* Title */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)" }}>
                      SEO Page Title <span style={{ color: "var(--status-error)" }}>*</span>
                    </label>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: titleColor }}>
                      {titleLen} / 60 characters {titleOptimal ? "✓ Optimal" : titleLen > 65 ? "⚠️ Truncated" : "(Expand to 35+)"}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-strong)",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                    placeholder="e.g. Dr. Noopur Patel | Breast Cancer Surgeon Ahmedabad"
                  />
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    Recommended 40–60 characters. This appears as the blue clickable headline in Google SERPs.
                  </div>
                </div>

                {/* Meta Description */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <label style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)" }}>
                      Meta Description <span style={{ color: "var(--status-error)" }}>*</span>
                    </label>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: descColor }}>
                      {descLen} / 160 characters {descOptimal ? "✓ Optimal" : descLen > 165 ? "⚠️ Truncated" : "(Expand to 120+)"}
                    </span>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    required
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-strong)",
                      fontSize: "0.875rem",
                      outline: "none",
                      resize: "vertical",
                    }}
                    placeholder="e.g. Discover our data-driven growth framework that scales qualified pipeline revenue..."
                  />
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    Recommended 120–160 characters. Compelling commercial summary to maximize organic click-through rates.
                  </div>
                </div>

                {/* Canonical URL */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
                    Canonical URL Override (Optional)
                  </label>
                  <input
                    type="url"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-strong)",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                    placeholder={simulatedCanonical}
                  />
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    Leave blank to inherit the canonical URL: <code>{simulatedCanonical}</code>
                  </div>
                </div>

                {/* Robots Directives */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
                  <div
                    style={{
                      padding: "0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-subtle)",
                      backgroundColor: "var(--bg-secondary)",
                    }}
                  >
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={robotsIndex}
                        onChange={(e) => setRobotsIndex(e.target.checked)}
                        style={{ width: "1.1rem", height: "1.1rem", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)" }}>
                        Allow Search Indexing (Index)
                      </span>
                    </label>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", paddingLeft: "1.6rem" }}>
                      When unchecked, search engines are instructed NOT to index this page (adds <code>noindex</code>).
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-subtle)",
                      backgroundColor: "var(--bg-secondary)",
                    }}
                  >
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={robotsFollow}
                        onChange={(e) => setRobotsFollow(e.target.checked)}
                        style={{ width: "1.1rem", height: "1.1rem", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)" }}>
                        Allow Link Following (Follow)
                      </span>
                    </label>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", paddingLeft: "1.6rem" }}>
                      When unchecked, crawlers will not follow links on this page (adds <code>nofollow</code>).
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
                    Target Keywords (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={keywordsText}
                    onChange={(e) => setKeywordsText(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-strong)",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                    placeholder="e.g. SEO services Surat, performance marketing India, lead generation"
                  />
                </div>
              </>
            )}

            {/* SUB-TAB 2: SOCIAL */}
            {activeSubTab === "social" && (
              <>
                {/* OG Image */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
                    Open Graph Share Image (1200×630px)
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="text"
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      style={{
                        flex: 1,
                        padding: "0.6rem 0.85rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-strong)",
                        fontSize: "0.875rem",
                        outline: "none",
                      }}
                      placeholder="/images/og-image.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => setIsMediaPickerOpen(true)}
                      style={{
                        padding: "0.6rem 1rem",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-strong)",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Browse Media 📁
                    </button>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    This image will appear when sharing this URL on WhatsApp, LinkedIn, Twitter/X, and Facebook.
                  </div>
                </div>

                {/* OG Title & Description */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
                    Custom Open Graph Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-strong)",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                    placeholder={title || "Inherit SEO page title"}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
                    Custom Open Graph Description (Optional)
                  </label>
                  <textarea
                    value={ogDescription}
                    onChange={(e) => setOgDescription(e.target.value)}
                    rows={2}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-strong)",
                      fontSize: "0.875rem",
                      outline: "none",
                      resize: "vertical",
                    }}
                    placeholder={description || "Inherit SEO meta description"}
                  />
                </div>

                {/* Twitter Title & Description */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.35rem" }}>
                    Twitter/X Card Headline (Optional)
                  </label>
                  <input
                    type="text"
                    value={twitterTitle}
                    onChange={(e) => setTwitterTitle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-strong)",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                    placeholder={ogTitle || title || "Inherit title"}
                  />
                </div>
              </>
            )}

            {/* SUB-TAB 3: PREVIEW */}
            {activeSubTab === "preview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Google SERP Snippet Preview */}
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                    Google Desktop Search Snippet Simulator
                  </h4>
                  <div
                    style={{
                      padding: "1.25rem",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "#ffffff",
                      border: "1px solid #dadce0",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: "#e8f0fe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                        }}
                      >
                        🌐
                      </div>
                      <div style={{ fontSize: "14px", color: "#202124" }}>
                        <span style={{ fontWeight: 500 }}>Dr. Noopur Patel</span>
                        <span style={{ color: "#5f6368", fontSize: "12px", marginLeft: "4px" }}>
                          {simulatedCanonical.replace(/^https?:\/\//, "")}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: "1.25rem",
                        color: "#1a0dab",
                        lineHeight: 1.3,
                        fontWeight: 400,
                        cursor: "pointer",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {title || page.pageName}
                    </div>

                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#4d5156",
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                      }}
                    >
                      {description || "No description provided yet."}
                    </div>
                  </div>
                </div>

                {/* Social Share Card Simulator */}
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.5rem" }}>
                    Social Share Card Mockup (LinkedIn / WhatsApp)
                  </h4>
                  <div
                    style={{
                      borderRadius: "var(--radius-md)",
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                      backgroundColor: "#f8fafc",
                      maxWidth: "500px",
                    }}
                  >
                    <div
                      style={{
                        height: "220px",
                        backgroundColor: "#cbd5e1",
                        backgroundImage: ogImage ? `url(${ogImage})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#64748b",
                        fontSize: "0.875rem",
                      }}
                    >
                      {!ogImage && "No OG Visual Card Selected (Will use Site Default)"}
                    </div>
                    <div style={{ padding: "0.85rem 1rem" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                        drnoopurpatel.com
                      </div>
                      <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--brand-navy)", marginTop: "0.25rem" }}>
                        {ogTitle || title || page.pageName}
                      </div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                        {ogDescription || description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.75rem",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              fontWeight: 600,
              backgroundColor: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-strong)",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="page-seo-form"
            disabled={isSaving}
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              fontWeight: 700,
              backgroundColor: "var(--brand-primary)",
              color: "#ffffff",
              border: "none",
              cursor: isSaving ? "not-allowed" : "pointer",
              opacity: isSaving ? 0.7 : 1,
            }}
          >
            {isSaving ? "Saving Metadata..." : "Save Page SEO 💾"}
          </button>
        </div>
      </div>

      {/* Media Picker Modal for OG Image */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        title={`Select Social Share Card for ${page.pageName}`}
        onSelect={(selected) => {
          setOgImage(selected.url);
        }}
      />
    </div>
  );
}
