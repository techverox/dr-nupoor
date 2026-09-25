"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import {
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Heart,
  Sparkles,
  ShieldCheck,
  Camera,
} from "lucide-react";

interface PatientStoryQRCodeProps {
  size?: number;
  showCardWrapper?: boolean;
  className?: string;
  onOpenForm?: () => void;
}

export default function PatientStoryQRCode({
  size = 200,
  showCardWrapper = true,
  className = "",
  onOpenForm,
}: PatientStoryQRCodeProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  useEffect(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://drnoopurpatel.com";
    const fullUrl = `${origin}/share-story`;
    setShareUrl(fullUrl);

    // Generate high-resolution QR Code
    QRCode.toDataURL(fullUrl, {
      width: size * 2, // 2x for retina crispness
      margin: 2,
      color: {
        dark: "#1A202C", // Deep charcoal/black for maximum scan reliability
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H", // High error correction level allows custom framing
    })
      .then((url) => {
        setQrDataUrl(url);
        setIsGenerating(false);
      })
      .catch((err) => {
        console.error("[PatientStoryQRCode] Error generating QR code:", err);
        setIsGenerating(false);
      });
  }, [size]);

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "Dr-Noopur-Patel-Patient-Review-QRCode.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const qrImage = (
    <div className="relative flex flex-col items-center">
      {/* QR Code Container */}
      <div className="relative p-3.5 bg-white rounded-2xl border-2 border-[#F5D6DE] shadow-md group hover:border-[#D84C70] transition-colors duration-300">
        {isGenerating ? (
          <div
            style={{ width: size, height: size }}
            className="flex flex-col items-center justify-center bg-rose-50/50 rounded-xl animate-pulse text-slate-400 text-xs gap-2"
          >
            <QrCode className="w-8 h-8 text-[#D84C70] animate-bounce" />
            <span>Generating QR...</span>
          </div>
        ) : (
          <div className="relative" style={{ width: size, height: size }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt="Scan to share your story with Dr. Noopur Patel"
              className="w-full h-full object-contain rounded-lg"
            />
            {/* Center Heart Ribbon Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-9 h-9 rounded-full bg-white border-2 border-[#D84C70] shadow-sm flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#D84C70] fill-[#D84C70]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Camera Scan Helper */}
      <div className="flex items-center gap-1.5 mt-3 text-[12px] font-semibold text-[#8B2346] bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#F5D6DE]">
        <Camera className="w-3.5 h-3.5 text-[#D84C70]" />
        <span>Scan with Phone Camera</span>
      </div>
    </div>
  );

  if (!showCardWrapper) {
    return <div className={className}>{qrImage}</div>;
  }

  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#F5D6DE] shadow-lg relative overflow-hidden ${className}`}
    >
      {/* Decorative background aura */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-100/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-pink-100/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F5D6DE] text-[11px] font-bold text-[#D84C70] uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Patient Voice & Care</span>
        </div>

        <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-slate-800 leading-tight mb-1.5">
          Share Your Journey
        </h3>
        <p className="text-slate-600 text-[13px] leading-relaxed max-w-xs mb-5">
          Scan this QR code to review Dr. Noopur Patel or share your breast care recovery story.
        </p>

        {/* QR Code */}
        {qrImage}

        {/* Actions Bar */}
        <div className="grid grid-cols-2 gap-2.5 w-full mt-5">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadQr}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Save QR</span>
          </button>
        </div>

        {/* Open Direct Form Link */}
        {onOpenForm ? (
          <button
            type="button"
            onClick={onOpenForm}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-sm transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Open Review Form Now</span>
          </button>
        ) : (
          <a
            href="/share-story"
            className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-sm transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Open Review Form Now</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
          </a>
        )}

        {/* Privacy Note */}
        <div className="flex items-center gap-1.5 mt-4 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span>Verified Patient Privacy & Confidentiality Protected</span>
        </div>
      </div>
    </div>
  );
}
