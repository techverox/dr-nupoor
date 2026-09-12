"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Smartphone,
  Laptop,
  ArrowRight,
  Eye,
  MessageSquare,
  Sparkles,
  Layers,
  FileCheck,
  Check,
  Clock,
  Download,
  Folder,
} from "lucide-react";

export default function ClientExperience() {
  const [activeClient, setActiveClient] = useState("apex");

  const clients = [
    { id: "apex", name: "Apex Health Clinics", logo: "A", domain: "portal.apexhealth.com", retainer: "$14k/mo", status: "All Green" },
    { id: "lumina", name: "Lumina SaaS Inc.", logo: "L", domain: "clients.lumina.io", retainer: "$18k/mo", status: "Reviewing Ads" },
    { id: "horizon", name: "Horizon E-Commerce", logo: "H", domain: "brand.horizon.com", retainer: "$22k/mo", status: "SEO Delivered" },
  ];

  return (
    <section id="client-experience" className="py-24 sm:py-32 bg-[#060709] relative border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            White-Label Client Architecture
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Your Clients See Progress.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
              Your Team Gets Things Done.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
            Give every client a branded, white-label portal with instant mobile approvals, transparent performance reports, and direct task visibility.
          </p>
        </div>

        {/* Client Portal Showcase Mockup */}
        <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-[1px] bg-gradient-to-b from-cyan-500/40 via-emerald-500/20 to-white/5 shadow-2xl">
          <div className="bg-[#0b0e15] rounded-3xl overflow-hidden border border-white/10 text-left">
            
            {/* Top Portal Switcher Bar */}
            <div className="p-4 bg-[#0e121a] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              {/* Account Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-400 uppercase mr-1">Switch Client:</span>
                <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10">
                  {clients.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveClient(c.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        activeClient === c.id
                          ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold shadow-md"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-black/30 text-current flex items-center justify-center text-[10px]">
                        {c.logo}
                      </span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* White Label Indicator */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Custom Domain: <strong className="text-white font-mono">{clients.find(c => c.id === activeClient)?.domain}</strong></span>
              </div>
            </div>

            {/* Client Portal Interior View */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Approvals, Reports, Campaigns */}
              <div className="md:col-span-8 space-y-4">
                {/* Pending Approvals Header */}
                <div className="p-4 rounded-2xl bg-[#121622] border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-amber-400" />
                      Pending Client Approval (2 Items)
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Please review creative deliverables submitted by your account team</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 font-mono">
                    Action Needed
                  </span>
                </div>

                {/* Approval Card 1 */}
                <div className="p-4 rounded-2xl bg-[#10141f] border border-emerald-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Q4 Black Friday Retargeting Ad Reels (6 Assets)</div>
                      <div className="text-[11px] text-neutral-400">Uploaded 2 hours ago by Creative Lead • High Resolution 4K</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                      Meta & TikTok
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center justify-center gap-1.5 transition">
                      <Check className="w-3.5 h-3.5" /> 1-Click Approve Assets
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition">
                      Add Visual Comment
                    </button>
                  </div>
                </div>

                {/* Live Campaign Status */}
                <div className="p-4 rounded-2xl bg-[#10141f] border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-white">Live Paid Campaigns</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="text-[10px] text-neutral-400">Google Ads</div>
                      <div className="font-bold text-white font-mono">$18,400 Spend</div>
                      <div className="text-[10px] text-emerald-400 font-bold">5.2x ROAS</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="text-[10px] text-neutral-400">Meta Video Reels</div>
                      <div className="font-bold text-white font-mono">$24,100 Spend</div>
                      <div className="text-[10px] text-emerald-400 font-bold">4.4x ROAS</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="text-[10px] text-neutral-400">SEO Inbound</div>
                      <div className="font-bold text-emerald-400 font-mono">+38 Top Ranks</div>
                      <div className="text-[10px] text-neutral-400">48k Organic Clicks</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Reports, Files & Activity */}
              <div className="md:col-span-4 space-y-4">
                {/* Download Latest Report */}
                <div className="p-4 rounded-2xl bg-[#121622] border border-white/5 space-y-2.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    Monthly Executive Reports
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-white font-semibold">November Growth Audit.pdf</div>
                      <div className="text-[10px] text-neutral-400">Generated automatically on 1st</div>
                    </div>
                    <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] text-white font-mono">
                      PDF
                    </button>
                  </div>
                </div>

                {/* Brand Files Vault */}
                <div className="p-4 rounded-2xl bg-[#121622] border border-white/5 space-y-2.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <Folder className="w-3.5 h-3.5 text-emerald-400" />
                    Shared Brand Assets (18 files)
                  </div>
                  <div className="space-y-1.5 text-[11px] text-neutral-300">
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span>Brand Guideline 2026.pdf</span>
                      <span className="text-neutral-500 font-mono">4.2 MB</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span>Vector Logos & Icons.zip</span>
                      <span className="text-neutral-500 font-mono">18.4 MB</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span>4K Raw Video Footage</span>
                      <span className="text-neutral-500 font-mono">1.2 GB</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
