"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * High-performance, clean React Markdown renderer for Dr. Noopur Patel's clinical articles.
 * Safely parses headings, paragraphs, lists, blockquotes, bold/italic inline text, links, and markdown tables.
 */
export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content) return null;

  // Split into structural blocks separated by two or more newlines
  const blocks = content.split(/\n\s*\n/);

  const renderInline = (text: string): React.ReactNode => {
    // Process links [text](url), bold **text**, italics *text*, and inline code `code`
    const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|(?<!\*)\*([^*]+)\*(?!\*)|`([^`]+)`)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
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
            className="text-[#D84C70] hover:text-[#9B2846] underline font-semibold underline-offset-2 transition-colors"
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
            className="px-1.5 py-0.5 rounded bg-[#FFF0F4] text-[#9B2846] border border-[#F5D6DE] font-mono text-xs font-semibold"
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
              className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 tracking-tight"
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
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 mt-10 mb-4 tracking-tight border-b border-[#F5D6DE]/70 pb-3"
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
              className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 mt-10 mb-4 tracking-tight"
            >
              {renderInline(text)}
            </h1>
          );
        }

        // Horizontal Rules
        if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
          return <hr key={idx} className="my-8 border-[#F5D6DE]" />;
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
              className="my-6 pl-5 border-l-4 border-[#D84C70] bg-[#FFF8F9] rounded-r-2xl py-4 pr-5 text-slate-800 italic font-medium border border-y-[#F5D6DE] border-r-[#F5D6DE]"
            >
              {renderInline(quoteLines)}
            </blockquote>
          );
        }

        // Markdown Tables (| Col 1 | Col 2 |)
        if (trimmed.includes("|") && trimmed.includes("\n") && /\|[\s-:]+\|/.test(trimmed)) {
          const lines = trimmed.split("\n").filter((l) => l.trim().startsWith("|"));
          if (lines.length >= 2) {
            const headerLine = lines[0];
            const separatorIdx = lines.findIndex((l) => /\|[\s-:]+\|/.test(l));
            const dataLines = lines.filter((_, i) => i !== 0 && i !== separatorIdx);

            const parseCells = (line: string) =>
              line
                .replace(/^\|/, "")
                .replace(/\|$/, "")
                .split("|")
                .map((c) => c.trim());

            const headers = parseCells(headerLine);

            return (
              <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-[#F5D6DE] shadow-2xs">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#FFF0F4] border-b border-[#F5D6DE]">
                      {headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-4 py-3 font-bold text-[#9B2846] uppercase tracking-wider text-[11px] sm:text-xs"
                        >
                          {renderInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {dataLines.map((rowLine, rIdx) => {
                      const cells = parseCells(rowLine);
                      return (
                        <tr
                          key={rIdx}
                          className="hover:bg-[#FFF8F9]/50 transition-colors"
                        >
                          {cells.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3 text-slate-700 leading-relaxed">
                              {renderInline(cell)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Unordered Bullet Lists
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed
            .split("\n")
            .map((line) => line.replace(/^[-*]\s+/, "").trim())
            .filter(Boolean);
          return (
            <ul key={idx} className="my-4 space-y-2 list-disc list-outside pl-6 marker:text-[#D84C70]">
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
            <ol key={idx} className="my-4 space-y-2 list-decimal list-outside pl-6 marker:text-[#D84C70] marker:font-bold">
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
