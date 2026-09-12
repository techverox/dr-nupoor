"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Sparkles,
  Check
} from "lucide-react";

export default function FinalCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="pt-16 sm:pt-24 pb-14 sm:pb-20 bg-gradient-to-b from-[#F8FAFC] via-white to-emerald-50/25 text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
            
            {/* Visual Anchor Kicker Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#008744]" />
              <span>CHOOSE YOUR GROWTH PATH</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0A2248] leading-[1.12]">
              Accelerate Your Revenue With DigiVigee
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal">
              Whether you need senior digital marketing experts to scale your business or the enterprise AI platform to run your agency—start scaling with complete clarity today.
            </p>

            {/* Dual High-Converting Paths Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-6 text-left items-stretch max-w-3xl mx-auto">
              
              {/* Path 1: Done-For-You Agency Services */}
              <div className="rounded-2xl p-6 sm:p-7 bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#008744] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                      FOR BRANDS & BUSINESSES
                    </span>
                    <span className="text-xs font-semibold text-slate-400">Services</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0A2248] mb-2 group-hover:text-emerald-700 transition-colors">
                    Done-For-You Marketing
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5 font-normal">
                    Let our seasoned growth strategists handle your Meta & Google Ads, organic SEO rankings, and conversion web architecture.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-[#00C853] shrink-0" />
                      <span>Custom Growth Strategy & Full Funnel Audit</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-[#00C853] shrink-0" />
                      <span>24/7 Live AI Client Portal with Real-Time ROAS</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-[#00C853] shrink-0" />
                      <span>Dedicated Senior Account Strategist</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#00C853] hover:bg-[#00B448] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Book Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Path 2: SaaS Platform For Agencies */}
              <div className="rounded-2xl p-6 sm:p-7 bg-[#0A2248] text-white border border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-600 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      FOR MARKETING AGENCIES
                    </span>
                    <span className="text-xs font-semibold text-slate-400">SaaS Platform</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    DigiVigee AI Platform
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-5 font-normal">
                    Automate manual reporting, scale client retainers, deploy autonomous AI media buyers, and give clients white-labeled dashboards.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-[#00C853] shrink-0" />
                      <span>14-Day Free Trial (Zero Credit Card Required)</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-[#00C853] shrink-0" />
                      <span>100% White-Label Client Workspaces</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-[#00C853] shrink-0" />
                      <span>120+ Automated Ad & CRM Integrations</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/dashboard"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white hover:bg-slate-100 text-[#0A2248] font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4 text-[#00C853]" />
                </Link>
              </div>

            </div>

            {/* Micro Social Proof Subtext */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1 text-slate-700 font-semibold">
                <div className="flex text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span>4.9/5 Rating</span>
              </div>
              <span className="text-slate-300">•</span>
              <span>Trusted by 2,350+ Scaling Brands & Agencies</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="hidden sm:inline">Zero Credit Card Required</span>
            </div>

          {/* ================================================================
              AUTHENTIC METALLIC AWARD SHIELDS ON LIGHT-FIRST CANVAS
              ================================================================ */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200/70 grid grid-cols-3 sm:grid-cols-6 items-center justify-items-center gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
              
              {/* Award 1: G2 Best Software Top 50 Shield */}
              <div 
                title="G2 2026 Best Software Top 50"
                className="group cursor-pointer transition-spring duration-500 hover:scale-110 active:scale-95"
              >
                <div className="relative w-[78px] h-[98px] sm:w-[90px] sm:h-[110px] filter drop-shadow-[0_4px_12px_rgba(255,73,44,0.14)] group-hover:drop-shadow-[0_8px_20px_rgba(255,73,44,0.25)] transition-all">
                  <Image
                    src="/images/awards/g2_top50_trans.png"
                    alt="G2 Best Software Top 50 2026"
                    fill
                    sizes="(max-width: 640px) 90px, 110px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Award 2: The 2026 AI Tech Awards Winner */}
              <div 
                title="The 2026 AI Tech Awards Winner — Digivigee"
                className="group cursor-pointer transition-spring duration-500 hover:scale-110 active:scale-95"
              >
                <div className="relative w-[84px] h-[98px] sm:w-[96px] sm:h-[110px] filter drop-shadow-[0_4px_12px_rgba(0,102,255,0.16)] group-hover:drop-shadow-[0_8px_20px_rgba(0,102,255,0.3)] transition-all">
                  <Image
                    src="/images/awards/ai_tech_trans.png"
                    alt="The 2026 AI Tech Awards Winner - Digivigee"
                    fill
                    sizes="(max-width: 640px) 96px, 110px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Award 3: Artificial Intelligence Excellence Award 2026 */}
              <div 
                title="Artificial Intelligence Excellence Award 2026"
                className="group cursor-pointer transition-spring duration-500 hover:scale-110 active:scale-95"
              >
                <div className="relative w-[80px] h-[98px] sm:w-[92px] sm:h-[110px] filter drop-shadow-[0_4px_12px_rgba(0,180,216,0.15)] group-hover:drop-shadow-[0_8px_20px_rgba(0,180,216,0.3)] transition-all">
                  <Image
                    src="/images/awards/ai_excellence_trans.png"
                    alt="Artificial Intelligence Excellence Award 2026"
                    fill
                    sizes="(max-width: 640px) 92px, 110px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Award 4: Capterra Best Value 2026 Shield */}
              <div 
                title="Capterra Best Value 2026"
                className="group cursor-pointer transition-spring duration-500 hover:scale-110 active:scale-95"
              >
                <div className="relative w-[80px] h-[98px] sm:w-[92px] sm:h-[110px] filter drop-shadow-[0_4px_12px_rgba(0,102,204,0.15)] group-hover:drop-shadow-[0_8px_20px_rgba(0,102,204,0.3)] transition-all">
                  <Image
                    src="/images/awards/capterra_trans.png"
                    alt="Capterra Best Value 2026"
                    fill
                    sizes="(max-width: 640px) 92px, 110px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Award 5: TrustRadius Buyer's Choice 2026 Hexagon Medal */}
              <div 
                title="TrustRadius Buyer's Choice 2026"
                className="group cursor-pointer transition-spring duration-500 hover:scale-110 active:scale-95"
              >
                <div className="relative w-[80px] h-[98px] sm:w-[92px] sm:h-[110px] filter drop-shadow-[0_4px_12px_rgba(0,191,165,0.15)] group-hover:drop-shadow-[0_8px_20px_rgba(0,191,165,0.3)] transition-all">
                  <Image
                    src="/images/awards/buyers_choice_trans.png"
                    alt="TrustRadius Buyer's Choice 2026"
                    fill
                    sizes="(max-width: 640px) 92px, 110px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Award 6: Enterprise Security & Compliance 2x2 Seals */}
              <div 
                title="SOC-2 Type II, BSI ISO/IEC 27001, CSA STAR, US-EU Privacy Shield"
                className="group cursor-pointer transition-spring duration-500 hover:scale-110 active:scale-95"
              >
                <div className="relative w-[84px] h-[98px] sm:w-[96px] sm:h-[110px] filter drop-shadow-[0_4px_12px_rgba(15,23,42,0.1)] group-hover:drop-shadow-[0_8px_20px_rgba(15,23,42,0.2)] transition-all">
                  <Image
                    src="/images/awards/compliance_seals_trans.png"
                    alt="SOC-2 Type II, BSI, CSA STAR, US-EU Privacy Shield"
                    fill
                    sizes="(max-width: 640px) 96px, 110px"
                    className="object-contain"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
  );
}
