"use client";

import React, { useState } from "react";
import {
  UserPlus,
  Briefcase,
  ShieldCheck,
  FolderKanban,
  Globe,
  Megaphone,
  CheckCircle2,
  BarChart4,
  CreditCard,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Check,
} from "lucide-react";

export default function AgencyWorkflow() {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      id: 0,
      number: "01",
      title: "LEAD",
      role: "Inbound & Outbound",
      desc: "Multi-channel lead forms, Google Ad conversions, and cold outreach automatically flow into your CRM inbox.",
      icon: UserPlus,
      metric: "< 2 min response time",
      details: [
        "Instant webhook capture from client landing pages",
        "Automated lead enrichment with LinkedIn data",
        "Real-time agency Slack & mobile push alerts",
      ],
    },
    {
      id: 1,
      number: "02",
      title: "CRM",
      role: "Sales & Proposals",
      desc: "Send interactive, branded fee proposals with integrated digital signatures and custom scope locks.",
      icon: Briefcase,
      metric: "4.2x Faster Deal Velocity",
      details: [
        "Visual deal pipeline with weighted forecasting",
        "1-Click dynamic proposal generation",
        "Built-in Stripe deposit & credit card capture",
      ],
    },
    {
      id: 2,
      number: "03",
      title: "CLIENT ONBOARDING",
      role: "Account Management",
      desc: "Instant workspace provisioning, automated brand intake questionnaires, and custom SLA agreements.",
      icon: ShieldCheck,
      metric: "100% Automated Hand-off",
      details: [
        "White-label client portal auto-created on custom domain",
        "Asset intake folder synced with Google Drive",
        "Automated welcome email & onboarding checklist",
      ],
    },
    {
      id: 3,
      number: "04",
      title: "PROJECT",
      role: "Production & Delivery",
      desc: "Agency production templates auto-generate Kanban boards, sprint assignments, and deliverable milestones.",
      icon: FolderKanban,
      metric: "Zero Missed Deadlines",
      details: [
        "Pre-built standard operating procedure (SOP) templates",
        "Cross-department team capacity planning",
        "Automated deadline notifications and status gates",
      ],
    },
    {
      id: 4,
      number: "05",
      title: "WEBSITE / SEO / SOCIAL",
      role: "Creative & Specialists",
      desc: "Execute SEO audits, schedule multi-platform social posts, and deploy visual Next.js landing pages.",
      icon: Globe,
      metric: "Centralized Production",
      details: [
        "Visual page builder with 100/100 Lighthouse performance",
        "Daily Google rank tracker for thousands of keywords",
        "Visual social media calendar for Instagram, LinkedIn & TikTok",
      ],
    },
    {
      id: 5,
      number: "06",
      title: "CAMPAIGN",
      role: "Paid Media Buyers",
      desc: "Orchestrate Google Search, Meta Ads, and TikTok campaigns with unified ROAS tracking and budget pacing.",
      icon: Megaphone,
      metric: "4.6x Blended ROAS",
      details: [
        "Multi-network ad spend aggregation in one place",
        "Automated budget pace warnings to prevent overspend",
        "Creative fatigue detection before conversion drops",
      ],
    },
    {
      id: 6,
      number: "07",
      title: "CLIENT APPROVAL",
      role: "Stakeholder Signoff",
      desc: "Clients review ad creative, blog copies, and landing pages with 1-click mobile approval and visual pins.",
      icon: CheckCircle2,
      metric: "No Chaotic Email Chains",
      details: [
        "Mobile-optimized client review without login friction",
        "Point-and-click feedback pins directly on design files",
        "Cryptographically timestamped signoff audit trail",
      ],
    },
    {
      id: 7,
      number: "08",
      title: "REPORT",
      role: "Executive Telemetry",
      desc: "Automated white-label reporting pulling live data from Google Ads, Meta, SEO rank trackers, and GA4.",
      icon: BarChart4,
      metric: "Automated 1st-of-Month Send",
      details: [
        "Live interactive client URL + downloadable PDF report",
        "AI executive summary explaining ROI and wins",
        "Custom branding with agency logo and domain",
      ],
    },
    {
      id: 8,
      number: "09",
      title: "BILLING",
      role: "Finance & Operations",
      desc: "Auto-charge retainer fees, track ad spend disbursements, and calculate project gross profit margins.",
      icon: CreditCard,
      metric: "Predictable Cash Flow",
      details: [
        "Automated recurring Stripe retainer billing",
        "Ad spend vs budget reconciliation telemetry",
        "Real-time agency gross margin & client profitability",
      ],
    },
  ];

  const currentStep = steps[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <section id="workflow" className="py-24 sm:py-32 bg-[#060709] relative border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-emerald-500/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            The Complete Agency Operating System
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            One Connected{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
              Agency Workflow.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
            From the first cold lead to ongoing monthly retainer billing, every stage runs seamlessly in one unified architecture.
          </p>
        </div>

        {/* 9-Stage Interactive Pipeline Ribbon */}
        <div className="mt-16 relative">
          {/* Desktop 9-Step Bar */}
          <div className="hidden lg:grid grid-cols-9 gap-1.5 p-1.5 rounded-2xl bg-[#0b0e15] border border-white/[0.08] shadow-2xl">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-2.5 rounded-xl text-left transition-all duration-200 flex flex-col justify-between relative group ${
                    isActive
                      ? "bg-gradient-to-b from-emerald-500/20 to-cyan-500/10 border border-emerald-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                      : "hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold ${isActive ? "text-emerald-400" : "text-neutral-500"}`}>
                      {step.number}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                  </div>
                  <div className={`mt-3 text-[11px] font-bold truncate ${isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Step Switcher */}
          <div className="lg:hidden flex items-center justify-between p-3 rounded-xl bg-[#0b0e15] border border-white/10 mb-6">
            <span className="text-xs text-neutral-400">Step {activeStep + 1} of 9:</span>
            <div className="flex gap-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                className="px-3 py-1 rounded-lg bg-white/5 text-xs text-white disabled:opacity-30"
              >
                Prev
              </button>
              <button
                disabled={activeStep === 8}
                onClick={() => setActiveStep(Math.min(8, activeStep + 1))}
                className="px-3 py-1 rounded-lg bg-emerald-500 text-xs text-black font-bold disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>

          {/* Active Stage Deep-Dive Card */}
          <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-[#090c13] border border-white/[0.08] shadow-2xl text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md">
                    <CurrentIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                      STAGE {currentStep.number} • {currentStep.role}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {currentStep.title}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-neutral-300 leading-relaxed">
                  {currentStep.desc}
                </p>

                <div className="space-y-2 pt-2">
                  {currentStep.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-[#111622] border border-white/10 space-y-4">
                  <div className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
                    Agency Performance Metric
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono text-emerald-400">
                    {currentStep.metric}
                  </div>
                  <div className="text-xs text-neutral-400 leading-relaxed border-t border-white/10 pt-3">
                    Automated data propagation ensures downstream stages inherit all client assets, contract terms, and deliverables without redundant friction.
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
