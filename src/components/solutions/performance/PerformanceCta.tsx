"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  Award,
  Play
} from "lucide-react";

export default function PerformanceCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-[#0B1528] text-white relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E05C]/40 to-transparent" />

      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,224,92,0.12),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#00E05C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00E05C]" />
            <span>Scale Retained Revenue</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.1]">
            Stop spending Sundays building client decks.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Start scaling your agency.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join 2,350+ digital marketing agencies running high-ticket retainers with zero manual slide decks, automated budget pacing, and complete client transparency.
          </p>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter work email..."
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm backdrop-blur-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00E05C] hover:bg-[#00c952] text-slate-950 font-bold text-sm tracking-tight transition-all shadow-lg hover:shadow-emerald-500/20 shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold max-w-md mx-auto">
              ✓ Invitation sent! Check your inbox to connect your first ad account.
            </div>
          )}

          {/* Micro Proof Guarantees */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              14-Day Full Feature Free Trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Cancel Anytime
            </span>
          </div>

          {/* 4 Verified Rating Badges */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/80">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-xs font-bold text-white">G2 LEADER</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Top Agency Work OS</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-xs font-bold text-white">CAPTERRA 4.9/5</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Best Ease of Use</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-xs font-bold text-white">TRUSTRADIUS</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Top Rated 2026</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-xs font-bold text-white">META PARTNER</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Marketing API Verified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
