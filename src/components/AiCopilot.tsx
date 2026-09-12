"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Search,
  FileText,
  Share2,
  Megaphone,
  Copy,
  Check,
  Send,
  Bot,
  ArrowRight,
} from "lucide-react";

export default function AiCopilot() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [copied, setCopied] = useState(false);

  const prompts = [
    {
      id: 0,
      label: "SEO Keyword Clusters",
      icon: Search,
      query: "Analyze high-intent keyword opportunities for our B2B FinTech client targeting CFOs.",
      output: `High-Commercial Intent Keyword Opportunities:
1. "Automated accounts payable for enterprise" (Vol: 6,400/mo • KD: 36% • High Intent)
2. "Multi-entity ERP reconciliation software" (Vol: 4,100/mo • KD: 41% • Solution Buyers)
3. "Real-time treasury management platform" (Vol: 5,200/mo • KD: 32% • CFO Query)

Strategic Recommendation:
Deploy a comparison matrix targeting "Monolithic ERP vs Real-Time Treasury API". Projected Organic Inbound Pipeline: +32% in 90 days.`,
    },
    {
      id: 1,
      label: "Thought Leadership Outline",
      icon: FileText,
      query: "Draft a high-converting pillar outline on why modern CMOs are retiring monolithic CMS platforms.",
      output: `Title: The Modern CMO's Guide to Headless Architecture: Why Monoliths Waste Ad Dollars

H1: The Hidden Speed Tax: How a 1.2s Delay Halves Your Paid Ad ROAS
- Section 1: Edge Rendering vs Traditional Server Lag (The Core Web Vitals Reality)
- Section 2: Omnichannel Velocity (Single Content API for Web, Apps & Landing Pages)
- Section 3: Cost Modeling (Eliminating 14 Plugin Licenses and Continuous Vulnerability Patches)
- Section 4: 3-Week Staged Migration Blueprint for Marketing Teams

Executive CTA: Request a Technical Speed Audit with Digivigee Architects.`,
    },
    {
      id: 2,
      label: "Viral LinkedIn Carousel",
      icon: Share2,
      query: "Create a 6-slide LinkedIn carousel script for our agency founder discussing tool consolidation.",
      output: `LinkedIn Carousel Script:

Slide 1: We fired 5 disconnected agency tools last quarter. Here is what happened to our margin: 🧵👇
Slide 2: Tool #1: Asana ($32/seat). Replaced with centralized client boards.
Slide 3: Tool #2: Hootsuite ($249/mo). Replaced with integrated social publishing.
Slide 4: Tool #3: Disconnected manual PDF reporting (costing 16 billable hours per week).
Slide 5: The outcome? 34% increase in team delivery capacity and ZERO missed deadlines.
Slide 6: Stop running an agency on digital duct tape. Build a unified operating system.`,
    },
    {
      id: 3,
      label: "Ad Campaign Strategy",
      icon: Megaphone,
      query: "Design an omni-channel acquisition campaign for a $50,000/mo client ad spend allocation.",
      output: `Budget Allocation ($50,000/mo):
- 60% Google Ads ($30k): High-intent branded search + Performance Max bottom-funnel
- 30% Meta Ads ($15k): Founder video testimonials + dynamic product retargeting
- 10% LinkedIn Ads ($5k): Account-based targeting for top 200 dream accounts

Projected Blended Metrics:
- Blended CAC Target: $420
- Target ROAS: 4.6x
- Estimated Closed Revenue: $230,000/mo`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(prompts[activePrompt].output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-copilot" className="py-28 sm:py-36 bg-transparent text-white border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-neutral-300 text-xs font-semibold shadow-xs">
            <Bot className="w-3.5 h-3.5 text-neutral-800" />
            <span>Autonomous Agency Intelligence</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.98]">
            Your agency.<br />
            <span className="text-neutral-400">With an intelligence layer.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed pt-1">
            Not another generic chatbot. A specialized AI system that understands your clients' data, keyword rankings, ad creatives, and historical deliverables.
          </p>
        </div>

        {/* Compelling Single Product Visual (Copilot Studio Workspace) */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0b0e14]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 sm:p-10 text-left">
          
          {/* Prompt Selector Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pb-6 border-b border-neutral-100">
            {prompts.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePrompt(p.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activePrompt === p.id
                      ? "bg-white text-neutral-950 font-bold shadow-md"
                      : "bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Prompt Query Input */}
          <div className="mt-6 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/10 text-cyan-400 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              DV
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">AGENCY PROMPT</div>
              <div className="text-sm font-medium text-white mt-0.5">
                {prompts[activePrompt].query}
              </div>
            </div>
          </div>

          {/* Generated AI Intelligence Output */}
          <div className="mt-5 rounded-2xl bg-[#06080e] text-white p-6 sm:p-8 border border-white/10 space-y-4 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">Digivigee Intelligence Engine</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-neutral-300 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Output"}</span>
              </button>
            </div>

            <pre className="text-xs sm:text-sm text-neutral-200 font-mono whitespace-pre-wrap leading-relaxed">
              {prompts[activePrompt].output}
            </pre>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <span>Trained on 400,000+ top-performing agency deliverables and campaign structures</span>
            <button className="flex items-center gap-1.5 text-cyan-400 font-bold hover:text-cyan-300 transition">
              <span>Insert directly into Client Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
