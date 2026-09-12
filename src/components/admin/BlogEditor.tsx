"use client";

import React, { useState, useRef } from "react";
import { calculateReadingTime } from "@/lib/utils/blogUtils";
import { Heading } from "@/components/ui/Heading";
import { MediaPickerModal } from "./MediaPickerModal";

export interface BlogEditorProps {
  value: string;
  onChange: (content: string) => void;
  minHeight?: string;
}

export function BlogEditor({ value, onChange, minHeight = "400px" }: BlogEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview" | "split">("write");
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const readingTime = calculateReadingTime(value);
  const wordCount = value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = value.length;

  const insertFormatting = (prefix: string, suffix: string = "", defaultPlaceholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(start, end) || defaultPlaceholder;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newText = text.substring(0, start) + replacement + text.substring(end);
    onChange(newText);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter link destination URL:", "https://");
    if (!url) return;
    const text = prompt("Enter anchor text (optional):", "") || "Link";
    insertFormatting(`[${text}](${url})`);
  };

  const handleInsertImage = () => {
    setIsMediaPickerOpen(true);
  };

  const insertOutlineTemplate = () => {
    if (value.trim() && !confirm("Replace current content with a structured blog outline template?")) {
      return;
    }
    const template = `## Introduction

Provide a strong opening hook explaining the business challenge, market context, or opportunity your readers face.

---

## Key Strategy 1: Strategic Foundation

Explain the first core concept with practical examples, metrics, and actionable takeaways for the reader.

### Tactical Implementation Steps
- Step 1: Conduct target audience analysis
- Step 2: Establish baseline KPI tracking
- Step 3: Implement conversion-optimized workflows

---

## Key Strategy 2: Execution & Scaling

Detail the second major strategy. Emphasize data-driven decision making and commercial ROI.

> "Consistency and rapid experimentation are the two greatest competitive advantages in modern digital marketing."

---

## Conclusion & Next Steps

Summarize the key takeaways and provide a clear call-to-action for readers wanting to scale their brand.`;
    onChange(template);
  };

  return (
    <div
      style={{
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--bg-primary)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 0.75rem",
          backgroundColor: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-subtle)",
          gap: "0.5rem",
        }}
      >
        {/* Formatting Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem" }}>
          <button
            type="button"
            onClick={() => insertFormatting("## ", "\n", "Heading 2")}
            title="Heading 2 (H2)"
            style={toolbarBtnStyle}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("### ", "\n", "Heading 3")}
            title="Heading 3 (H3)"
            style={toolbarBtnStyle}
          >
            H3
          </button>
          <div style={separatorStyle} />

          <button
            type="button"
            onClick={() => insertFormatting("**", "**", "bold text")}
            title="Bold (**text**)"
            style={{ ...toolbarBtnStyle, fontWeight: 800 }}
          >
            B
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*", "italic text")}
            title="Italic (*text*)"
            style={{ ...toolbarBtnStyle, fontStyle: "italic" }}
          >
            I
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("~~", "~~", "strikethrough")}
            title="Strikethrough (~~text~~)"
            style={{ ...toolbarBtnStyle, textDecoration: "line-through" }}
          >
            S
          </button>
          <div style={separatorStyle} />

          <button
            type="button"
            onClick={() => insertFormatting("- ", "\n", "List item")}
            title="Bullet List"
            style={toolbarBtnStyle}
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("1. ", "\n", "Numbered item")}
            title="Numbered List"
            style={toolbarBtnStyle}
          >
            1. List
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("> ", "\n", "Important insight quote")}
            title="Blockquote"
            style={toolbarBtnStyle}
          >
            “ Quote
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("`", "`", "code_snippet")}
            title="Inline Code"
            style={{ ...toolbarBtnStyle, fontFamily: "monospace" }}
          >
            &lt;/&gt;
          </button>
          <div style={separatorStyle} />

          <button
            type="button"
            onClick={handleInsertLink}
            title="Insert Link"
            style={toolbarBtnStyle}
          >
            🔗 Link
          </button>
          <button
            type="button"
            onClick={handleInsertImage}
            title="Insert Image"
            style={toolbarBtnStyle}
          >
            🖼️ Image
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n---\n\n")}
            title="Horizontal Divider"
            style={toolbarBtnStyle}
          >
            — Divider
          </button>
          <button
            type="button"
            onClick={insertOutlineTemplate}
            title="Insert Standard Article Outline Template"
            style={{ ...toolbarBtnStyle, color: "var(--brand-primary-hover)", fontWeight: 700 }}
          >
            📋 Outline Template
          </button>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {(["write", "split", "preview"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setActiveTab(mode)}
              style={{
                padding: "0.3rem 0.6rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.75rem",
                fontWeight: activeTab === mode ? 700 : 500,
                backgroundColor: activeTab === mode ? "var(--brand-primary)" : "transparent",
                color: activeTab === mode ? "#ffffff" : "var(--text-secondary)",
                border: "none",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Content Area */}
      <div
        style={{
          display: activeTab === "split" ? "grid" : "block",
          gridTemplateColumns: activeTab === "split" ? "1fr 1fr" : undefined,
          minHeight,
        }}
      >
        {/* Write Pane */}
        {(activeTab === "write" || activeTab === "split") && (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your article in formatted markdown... Use ## for section headings, - for lists, and > for quotes."
            style={{
              width: "100%",
              height: "100%",
              minHeight,
              padding: "1.25rem",
              border: "none",
              borderRight: activeTab === "split" ? "1px solid var(--border-subtle)" : "none",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              fontFamily: "var(--font-mono, monospace)",
              resize: "vertical",
              outline: "none",
            }}
          />
        )}

        {/* Rendered Preview Pane */}
        {(activeTab === "preview" || activeTab === "split") && (
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "var(--bg-primary)",
              overflowY: "auto",
              minHeight,
              maxHeight: activeTab === "split" ? "650px" : undefined,
            }}
          >
            {value.trim() ? (
              <RenderedMarkdownContent content={value} />
            ) : (
              <div style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "0.875rem" }}>
                Live rendered preview will appear here as you type...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-subtle)",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <span><strong>{wordCount}</strong> Words</span>
          <span><strong>{charCount}</strong> Characters</span>
          <span>⏱️ <strong>~{readingTime} min</strong> Read Time</span>
        </div>
        <div>
          <span>Markdown Supported (H2, H3, Lists, Quotes, Links, Images)</span>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        title="Insert Image into Blog Article"
        onSelect={(selected) => {
          const alt = selected.altText || selected.title || "Illustration";
          insertFormatting(`\n![${alt}](${selected.url})\n`);
        }}
      />
    </div>
  );
}

/**
 * Pure React/TypeScript safe markdown renderer for article body text.
 */
export function RenderedMarkdownContent({ content }: { content: string }) {
  if (!content) return null;

  const blocks = content.split("\n\n");

  return (
    <div className="blog-content-body" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-primary)" }}>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Heading 2
        if (trimmed.startsWith("## ")) {
          return (
            <Heading
              key={idx}
              level="h2"
              color="navy"
              style={{ marginTop: "1.75rem", marginBottom: "0.75rem", fontSize: "1.5rem" }}
            >
              {trimmed.replace("## ", "")}
            </Heading>
          );
        }

        // Heading 3
        if (trimmed.startsWith("### ")) {
          return (
            <Heading
              key={idx}
              level="h3"
              color="navy"
              style={{ marginTop: "1.25rem", marginBottom: "0.5rem", fontSize: "1.2rem" }}
            >
              {trimmed.replace("### ", "")}
            </Heading>
          );
        }

        // Horizontal Rule
        if (trimmed.startsWith("---") || trimmed.startsWith("***")) {
          return (
            <hr
              key={idx}
              style={{ border: "none", borderTop: "1px solid var(--border-subtle)", margin: "1.5rem 0" }}
            />
          );
        }

        // Blockquote
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={idx}
              style={{
                borderLeft: "4px solid var(--brand-primary)",
                paddingLeft: "1rem",
                margin: "1rem 0",
                fontStyle: "italic",
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-secondary)",
                padding: "0.75rem 1rem",
                borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
              }}
            >
              {trimmed.replace(/^>\s*/, "")}
            </blockquote>
          );
        }

        // Bullet List
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed.split("\n").filter((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "));
          return (
            <ul key={idx} style={{ paddingLeft: "1.5rem", marginBottom: "1rem", color: "var(--text-secondary)" }}>
              {items.map((item, itemIdx) => (
                <li key={itemIdx} style={{ marginBottom: "0.25rem" }}>
                  {item.replace(/^[-*]\s+/, "")}
                </li>
              ))}
            </ul>
          );
        }

        // Numbered List
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed.split("\n").filter((l) => /^\d+\.\s+/.test(l.trim()));
          return (
            <ol key={idx} style={{ paddingLeft: "1.5rem", marginBottom: "1rem", color: "var(--text-secondary)" }}>
              {items.map((item, itemIdx) => (
                <li key={itemIdx} style={{ marginBottom: "0.25rem" }}>
                  {item.replace(/^\d+\.\s+/, "")}
                </li>
              ))}
            </ol>
          );
        }

        // Code Block
        if (trimmed.startsWith("```")) {
          const cleanCode = trimmed.replace(/^```[a-z]*\n?/, "").replace(/```$/, "");
          return (
            <pre
              key={idx}
              style={{
                backgroundColor: "#0b132b",
                color: "#e2e8f0",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                overflowX: "auto",
                fontFamily: "monospace",
                fontSize: "0.875rem",
                margin: "1rem 0",
              }}
            >
              <code>{cleanCode}</code>
            </pre>
          );
        }

        // Image ![alt](url)
        const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imageMatch) {
          return (
            <div key={idx} style={{ margin: "1.5rem 0", textAlign: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageMatch[2]}
                alt={imageMatch[1]}
                style={{
                  maxWidth: "100%",
                  maxHeight: "450px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                }}
              />
              {imageMatch[1] && (
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                  {imageMatch[1]}
                </div>
              )}
            </div>
          );
        }

        // Regular Paragraph
        return (
          <p key={idx} style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

const toolbarBtnStyle: React.CSSProperties = {
  padding: "0.25rem 0.5rem",
  borderRadius: "var(--radius-sm)",
  fontSize: "0.75rem",
  fontWeight: 600,
  backgroundColor: "var(--bg-primary)",
  color: "var(--text-primary)",
  border: "1px solid var(--border-subtle)",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1.2,
};

const separatorStyle: React.CSSProperties = {
  width: "1px",
  height: "18px",
  backgroundColor: "var(--border-subtle)",
  margin: "0 0.25rem",
};
