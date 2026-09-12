"use client";

import React, { useState } from "react";
import { MediaItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Check, Copy, Info, CheckCircle2, AlertTriangle } from "lucide-react";

export interface MediaCardProps {
  item: MediaItem;
  onSelect?: (item: MediaItem) => void;
  onOpenDetails?: (item: MediaItem) => void;
  isPickerMode?: boolean;
}

export function MediaCard({
  item,
  onSelect,
  onOpenDetails,
  isPickerMode = false,
}: MediaCardProps) {
  const [copied, setCopied] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClick = () => {
    if (isPickerMode && onSelect) {
      onSelect(item);
    } else if (onOpenDetails) {
      onOpenDetails(item);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-sm hover:shadow-md"
    >
      {/* Thumbnail Area */}
      <div className="relative w-full h-40 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.url}
          alt={item.altText || item.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          {item.altText ? (
            <span
              title="Accessible Alt Text is configured"
              className="inline-flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm shadow-sm"
            >
              <CheckCircle2 className="w-3 h-3" /> ALT
            </span>
          ) : (
            <span
              title="Alt Text is missing — add alt text for accessibility & SEO"
              className="inline-flex items-center gap-1 bg-amber-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm shadow-sm"
            >
              <AlertTriangle className="w-3 h-3" /> NO ALT
            </span>
          )}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3 flex flex-col gap-1.5 flex-1 bg-white dark:bg-zinc-900">
        <div
          className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate"
          title={item.name || item.fileName}
        >
          {item.name || item.fileName}
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <span>{formatFileSize(item.fileSize)}</span>
          <span className="uppercase tracking-wider">{item.mimeType?.replace("image/", "") || "IMG"}</span>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={handleCopyUrl}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-zinc-400 dark:focus:ring-offset-zinc-900 ${
              copied 
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" 
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy URL</>}
          </button>

          {isPickerMode ? (
            <span className="inline-flex items-center px-2 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold rounded">
              Select &rarr;
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
              <Info className="w-3.5 h-3.5" /> Details
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
