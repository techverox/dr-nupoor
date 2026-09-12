"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * High-performance, clean React Markdown renderer for DigiVigee articles.
 * Safely parses headings, paragraphs, lists, blockquotes, bold/italic inline text, and links.
 */
export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content) return null;

  // Split into structural blocks separated by two or more newlines
  const blocks = content.split(/\n\s*\n/);

  const renderInline = (text: string): React.ReactNode => {
    // Process links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // Process bold **text**
    const boldRegex = /\*\*([^*]+)\*\*/g;
    // Process italics *text*
    const italicRegex = /(?<!\*)\*([^*]+)\*(?!\*)/g;
    // Process inline code `code`
    const codeRegex = /`([^`]+)`/g;

    // Simple replacement token technique to render React nodes
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Combined regex for all inline entities
    const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|(?<!\*)\*([^*]+)\*(?!\*)|`([^`]+)`)/g;
    let match: RegExpExecArray | null;

    while ((match = combinedRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      if (match[2] && match[3]) {
        // Link
        parts.push(
          <a
            key={match.index}
            href={match[3]}
            target={match[3].startsWith("http") ? "_blank" : undefined}
            rel={match[3].startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-emerald-600 hover:text-emerald-700 underline font-medium underline-offset-2 transition-colors"
          >
            {match[2]}
          </a>
        );
      } else if (match[4]) {
        // Bold
        parts.push(
          <strong key={match.index} className="font-bold text-slate-900">
            {match[4]}
          </strong>
        );
      } else if (match[5]) {
        // Italic
        parts.push(
          <em key={match.index} className="italic text-slate-800">
            {match[5]}
          </em>
        );
      } else if (match[6]) {
        // Inline code
        parts.push(
          <code
            key={match.index}
            className="px-1.5 py-0.5 rounded bg-slate-100 text-emerald-800 font-mono text-xs font-semibold"
          >
            {match[6]}
          </code>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <article className={`space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed ${className}`}>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headings
        if (trimmed.startsWith("### ")) {
          const text = trimmed.replace(/^###\s+/, "");
          return (
            <h3
              key={idx}
              className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 tracking-tight"
            >
              {renderInline(text)}
            </h3>
          );
        }

        if (trimmed.startsWith("## ")) {
          const text = trimmed.replace(/^##\s+/, "");
          return (
            <h2
              key={idx}
              className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-10 mb-4 tracking-tight border-b border-slate-100 pb-3"
            >
              {renderInline(text)}
            </h2>
          );
        }

        if (trimmed.startsWith("# ")) {
          const text = trimmed.replace(/^#\s+/, "");
          return (
            <h1
              key={idx}
              className="text-3xl sm:text-4xl font-black text-slate-950 mt-10 mb-4 tracking-tight"
            >
              {renderInline(text)}
            </h1>
          );
        }

        // Horizontal Rules
        if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
          return <hr key={idx} className="my-8 border-slate-200" />;
        }

        // Blockquotes
        if (trimmed.startsWith(">")) {
          const quoteLines = trimmed
            .split("\n")
            .map((l) => l.replace(/^>\s?/, ""))
            .join(" ");
          return (
            <blockquote
              key={idx}
              className="my-6 pl-5 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl py-3.5 pr-4 text-slate-800 italic font-medium"
            >
              {renderInline(quoteLines)}
            </blockquote>
          );
        }

        // Unordered Bullet Lists
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed
            .split("\n")
            .map((line) => line.replace(/^[-*]\s+/, "").trim())
            .filter(Boolean);
          return (
            <ul key={idx} className="my-4 space-y-2 list-disc list-outside pl-6 marker:text-emerald-500">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-relaxed">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }

        // Numbered Lists
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed
            .split("\n")
            .map((line) => line.replace(/^\d+\.\s+/, "").trim())
            .filter(Boolean);
          return (
            <ol key={idx} className="my-4 space-y-2 list-decimal list-outside pl-6 marker:text-emerald-600 marker:font-bold">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-relaxed">
                  {renderInline(item)}
                </li>
              ))}
            </ol>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="leading-relaxed text-slate-700">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </article>
  );
}
