"use client";

import React, { useState } from "react";
import { MediaItem } from "@/types";
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
      className="group flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden cursor-pointer hover:border-rose-300 transition-all shadow-2xs hover:shadow-md"
    >
      {/* Thumbnail Area */}
      <div className="relative w-full h-40 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100 p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.url}
          alt={item.altText || item.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          {item.altText ? (
            <span
              title="Accessible Alt Text configured"
              className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-2xs"
            >
              <CheckCircle2 className="w-3 h-3" /> ALT
            </span>
          ) : (
            <span
              title="Missing Alt Text"
              className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-2xs"
            >
              <AlertTriangle className="w-3 h-3" /> NO ALT
            </span>
          )}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3.5 flex flex-col gap-1.5 flex-1 bg-white justify-between">
        <div>
          <div
            className="text-xs font-bold text-slate-900 truncate"
            title={item.name || item.fileName}
          >
            {item.name || item.fileName}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-medium">
            <span>{formatFileSize(item.fileSize)}</span>
            <span className="uppercase tracking-wider font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
              {item.mimeType?.replace("image/", "") || "IMG"}
            </span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCopyUrl}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              copied
                ? "bg-rose-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy URL</>}
          </button>

          {isPickerMode ? (
            <span className="inline-flex items-center px-2 py-1 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-2xs">
              Select &rarr;
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors">
              <Info className="w-3.5 h-3.5" /> Details
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
