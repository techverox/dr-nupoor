"use client";

import React, { useState, useEffect, useRef } from "react";
import { MediaItem } from "@/types";
import { MediaCard } from "@/components/admin/MediaCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";

export interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selected: { url: string; altText: string; title?: string }) => void;
  title?: string;
}

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  title = "Select Media Asset",
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altTextInput, setAltTextInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.success && data.items) {
        setItems(data.items);
      }
    } catch {
      // Ignore background load error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadMedia();
      setSelectedFile(null);
      setAltTextInput("");
      setUploadError(null);
      setActiveTab("library");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectMedia = (item: MediaItem) => {
    onSelect({
      url: item.url,
      altText: item.altText || item.name,
      title: item.title || item.name,
    });
    onClose();
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("altText", altTextInput);
    formData.append("title", selectedFile.name.replace(/\.[^/.]+$/, ""));

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.item) {
        // Auto-select uploaded file
        onSelect({
          url: data.item.url,
          altText: data.item.altText || data.item.name,
          title: data.item.title || data.item.name,
        });
        onClose();
      } else {
        setUploadError(data.error || "Upload failed.");
      }
    } catch {
      setUploadError("Network error during file upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.fileName.toLowerCase().includes(q) ||
      item.altText.toLowerCase().includes(q)
    );
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(11, 19, 43, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 2500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--bg-primary)",
          borderRadius: "var(--radius-lg)",
          maxWidth: "840px",
          width: "100%",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
          border: "1px solid var(--border-subtle)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--brand-navy)", margin: 0 }}>
              {title}
            </h2>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
              Pick an existing website asset or upload a new image
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.25rem",
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-primary)",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("library")}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.8125rem",
              fontWeight: activeTab === "library" ? 700 : 500,
              backgroundColor: activeTab === "library" ? "var(--brand-primary)" : "transparent",
              color: activeTab === "library" ? "#ffffff" : "var(--text-secondary)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Media Library ({items.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.8125rem",
              fontWeight: activeTab === "upload" ? 700 : 500,
              backgroundColor: activeTab === "upload" ? "var(--brand-primary)" : "transparent",
              color: activeTab === "upload" ? "#ffffff" : "var(--text-secondary)",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Upload New Image
          </button>
        </div>

        {/* Tab 1: Library */}
        {activeTab === "library" && (
          <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1, overflow: "hidden" }}>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by file name or alt text..."
            />

            <div style={{ flex: 1, overflowY: "auto", maxHeight: "50vh", paddingRight: "0.25rem" }}>
              {isLoading ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Loading media items...
                </div>
              ) : filteredItems.length === 0 ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                  No media assets found matching &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {filteredItems.map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      isPickerMode
                      onSelect={handleSelectMedia}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Upload New Asset */}
        {activeTab === "upload" && (
          <form onSubmit={handleUploadSubmit} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {uploadError && (
              <div
                role="alert"
                style={{
                  padding: "0.6rem 0.8rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "#fee2e2",
                  color: "var(--status-error)",
                  fontSize: "0.8125rem",
                }}
              >
                {uploadError}
              </div>
            )}

            {/* Drop Zone Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: "2px dashed var(--border-strong)",
                borderRadius: "var(--radius-md)",
                padding: "2rem",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "var(--bg-secondary)",
                transition: "all var(--transition-fast)",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />

              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📁</div>
              {selectedFile ? (
                <div>
                  <div style={{ fontWeight: 700, color: "var(--brand-navy)" }}>{selectedFile.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {(selectedFile.size / 1024).toFixed(1)} KB • Click to change file
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontWeight: 700, color: "var(--brand-navy)", marginBottom: "0.25rem" }}>
                    Click to browse or drag and drop image
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Supports JPEG, PNG, WebP, SVG, GIF up to 5MB
                  </div>
                </div>
              )}
            </div>

            <div>
              <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--brand-navy)", display: "block", marginBottom: "0.25rem" }}>
                Accessible Alt Text (Required)
              </label>
              <input
                type="text"
                value={altTextInput}
                onChange={(e) => setAltTextInput(e.target.value)}
                placeholder="Describe what is visible in the image..."
                required
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "0 0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-strong)",
                  backgroundColor: "var(--bg-primary)",
                  fontSize: "0.875rem",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!selectedFile || !altTextInput.trim()}
                isLoading={isUploading}
              >
                Upload &amp; Select Image 🚀
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
