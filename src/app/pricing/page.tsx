"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import SocialProofBar from "@/components/SocialProofBar";
import {
  Check,
  ArrowRight,
  HelpCircle,
  Building2,
  ShieldCheck,
  Zap,
  Globe,
  Star,
  Layers,
  ChevronDown,
} from "lucide-react";

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [activeTab, setActiveTab] = useState<"saas" | "agency">("saas");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const saasPlans = [
    {
      name: "Starter Agency",
      desc: "Perfect for boutique agencies & solo marketers launching their system.",
      monthlyPrice: 49,
      annualPrice: 39,
      badge: null,
      ctaText: "Start 14-Day Free Trial",
      ctaHref: "/dashboard",
      popular: false,
      features: [
        "Up to 5 Team Seats",
        "15 Active Client Workspaces",
        "Social Media Hub & Calendar (8 Channels)",
        "Basic Agency CRM & Lead Pipeline",
        "Client Approval Portal (Email Only)",
        "Automated Multi-Channel ROAS Dashboard",
        "Standard Email & Community Support",
      ],
    },
    {
      name: "Growth Agency",
      desc: "For scaling agencies needing white-label branding & unlimited client retainers.",
      monthlyPrice: 149,
      annualPrice: 119,
      badge: "Most Popular",
      ctaText: "Start 14-Day Free Trial",
      ctaHref: "/dashboard",
      popular: true,
      features: [
        "Up to 20 Team Seats",
        "50 Active Client Workspaces",
        "Full White-Label Branding (Custom CNAME & Logo)",
        "1-Click WhatsApp & SMS Client Approvals",
        "Google Business Profile 7x7 Geo-Grid Rank Tracker",
        "Stripe Recurring Retainer Auto-Billing",
        "Client Churn & Health Score Predictor",
        "Priority 24/7 Slack Concierge Support",
      ],
    },
    {
      name: "Scale Enterprise",
      desc: "For full-service multi-department agencies managing 50+ retainers.",
      monthlyPrice: 299,
      annualPrice: 239,
      badge: "Enterprise Scale",
      ctaText: "Start Free Enterprise Trial",
      ctaHref: "/dashboard",
      popular: false,
      features: [
        "Unlimited Team Seats",
        "Unlimited Client Workspaces",
        "Full White-Label Multi-Tenant Custom Domains",
        "Direct REST API & Custom Webhooks Engine",
        "Automated Multi-Location Local SEO Audits",
        "Retainer Profitability & Margin Radar",
        "Dedicated Engineering Account Architect",
        "99.9% Uptime SLA & Custom MSA Contract",
      ],
    },
  ];

  const agencyPackages = [
    {
      name: "Performance Paid Media",
      desc: "Full-funnel Meta & Google ad management built for explosive ROAS.",
      price: "$2,500",
      period: "/month + ad spend",
      popular: true,
      features: [
        "Dedicated Senior Media Buyer & Creative Strategist",
        "Daily Ad Budget Pacing & Bid Management",
        "Meta, Google & TikTok Ad Creative Batching (15 ads/mo)",
        "Real-Time Digivigee Live ROAS Dashboard",
        "Weekly Strategy Synchronization Call",
        "Full 1-Click WhatsApp Creative Approval Workflow",
      ],
    },
    {
      name: "Local SEO & 3-Pack Dominance",
      desc: "Guaranteed organic visibility and top rankings for multi-location businesses.",
      price: "$1,800",
      period: "/month",
      popular: false,
      features: [
        "GBP Geo-Grid 7x7 Local Heatmap Optimization",
        "Automated 5-Star Review Generation Flow",
        "Local Citation Cleanup & Directory Syndication",
        "On-Page Technical SEO & Content Optimization",
        "Monthly Digivigee White-Label Executive Report",
      ],
    },
    {
      name: "Full-Stack Growth Retainer",
      desc: "End-to-end digital agency: Paid Media, SEO, Social, Web & Funnels.",
      price: "$4,500",
      period: "/month",
      popular: false,
      features: [
        "Omni-channel marketing engine across all paid & organic channels",
        "Dedicated Full Team: Media Buyer, Copywriter, Designer & Dev",
        "Custom High-Converting Next.js Landing Page Builds",
        "CRM Pipeline Sync & B2B Lead Automation",
        "Live 24/7 Slack Channel with Agency Founders",
      ],
    },
  ];

  const faqs = [
    {
      q: "Can I try Digivigee before committing?",
      a: "Yes! Every SaaS plan comes with a 14-day fully-featured free trial. No credit card is required to sign up and start building your agency workspaces.",
    },
    {
      q: "How does the White-Label feature work?",
      a: "On the Growth and Scale plans, you can map your custom domain (e.g., app.youragency.com) with automatic SSL. Your clients will only see your agency's logo, colors, and branding.",
    },
    {
      q: "Can I upgrade or downgrade anytime?",
      a: "Absolutely. You can change plans at any time in your dashboard billing settings. Prorated adjustments are calculated automatically.",
    },
    {
      q: "What is the difference between SaaS Plans and Agency Packages?",
      a: "SaaS Plans give your team access to our software platform to run your own marketing agency. Agency Packages are done-for-you agency retainer services delivered by DigiVigee's in-house senior growth team for businesses seeking managed marketing.",
    },
    {
      q: "Do you offer migration support from other agency tools?",
      a: "Yes! Our concierge team provides free data migration from ClickUp, Asana, Buffer, BrightLocal, and Looker Studio on all annual Growth and Scale subscriptions.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900 overflow-x-hidden">
      <GlobalSpotlightGrid />
      <Navbar />

      {/* Pricing Header */}
      <section className="relative pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-14 sm:pb-16 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] mb-5">
          Simple, Transparent Pricing. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600">
            Scale Retainers Without Hidden Fees.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Choose between our SaaS Platform subscriptions to run your agency OS, or partner with our in-house Growth Team for done-for-you client delivery.
        </p>

        {/* Tab Switcher: SaaS Platform vs Agency Delivery */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-200/80 rounded-full max-w-md mx-auto mb-6">
          <button
            onClick={() => setActiveTab("saas")}
            className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === "saas"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            SaaS Platform Plans
          </button>
          <button
            onClick={() => setActiveTab("agency")}
            className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === "agency"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Agency Retainer Packages
          </button>
        </div>

        {/* Monthly vs Annual Toggle (Only for SaaS tab) */}
        {activeTab === "saas" && (
          <div className="flex items-center justify-center gap-3">
            <span className={`text-xs sm:text-sm font-semibold ${!annualBilling ? "text-slate-950" : "text-slate-500"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative w-12 h-6 rounded-full bg-slate-300 p-0.5 transition-colors duration-200 cursor-pointer focus:outline-hidden"
              style={{ backgroundColor: annualBilling ? "#00E05C" : "#CBD5E1" }}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                  annualBilling ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${annualBilling ? "text-slate-950" : "text-slate-500"}`}>
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700">
                SAVE 20%
              </span>
            </span>
          </div>
        )}
      </section>

      {/* Social Proof */}
      <SocialProofBar />

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* TAB 1: SaaS Plans */}
        {activeTab === "saas" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {saasPlans.map((plan, idx) => {
              const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;

              return (
                <div
                  key={idx}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                    plan.popular
                      ? "bg-white border-2 border-emerald-500 shadow-[0_20px_50px_rgba(0,224,92,0.12)] scale-[1.02]"
                      : "bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-lg"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-extrabold text-slate-950">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 min-h-[32px]">
                      {plan.desc}
                    </p>

                    <div className="my-6 pb-6 border-b border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-slate-950">
                          ${price}
                        </span>
                        <span className="text-slate-500 text-xs font-semibold">
                          / month
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {annualBilling ? "Billed annually ($" + price * 12 + "/yr)" : "Billed monthly"}
                      </div>
                    </div>

                    <div className="space-y-3 mb-8 text-left">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Included Platform Modules:
                      </div>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={plan.ctaHref}
                    className={`inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#00E05C] via-[#00B4D8] to-[#0070F3] text-white shadow-md shadow-blue-500/20 hover:scale-[1.02]"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Agency Delivery Packages */}
        {activeTab === "agency" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {agencyPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between bg-white border ${
                  pkg.popular
                    ? "border-2 border-emerald-500 shadow-[0_20px_50px_rgba(0,224,92,0.12)] scale-[1.02]"
                    : "border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    Most Requested Retainer
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-extrabold text-slate-950">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 min-h-[32px]">
                    {pkg.desc}
                  </p>

                  <div className="my-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-950">
                        {pkg.price}
                      </span>
                      <span className="text-slate-500 text-xs font-semibold">
                        {pkg.period}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 text-left">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Deliverables Included:
                    </div>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    pkg.popular
                      ? "bg-gradient-to-r from-[#00E05C] via-[#00B4D8] to-[#0070F3] text-white shadow-md shadow-blue-500/20 hover:scale-[1.02]"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  <span>Book Consultation Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Enterprise Feature Matrix Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Agency Security & Custom Rollouts</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Need a Custom White-Label Solution for 100+ Clients?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We provide custom dedicated AWS/GCP clusters, custom API endpoints, SOC2 compliance guarantees, and dedicated onboarding engineering for large agencies.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-slate-100 transition-colors shrink-0 shadow-md"
          >
            <span>Talk with Solution Architect</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-left">
        <div className="text-center mb-12">
          <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 mb-2">
            Got Questions?
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left font-bold text-sm text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
