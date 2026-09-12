"use client";

import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/types";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Search,
  Share2,
  Code,
  Zap,
  Globe,
  Layers,
} from "lucide-react";
import InteractiveCard from "@/components/InteractiveCard";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "seo-and-local-seo": Search,
  "search-engine-optimization-seo": Search,
  "search-engine-optimization": Search,
  "performance-marketing": TrendingUp,
  "social-media-marketing": Share2,
  "content-creation": Sparkles,
  "website-design-and-development": Code,
  "lead-generation-and-automation": Zap,
};

export interface LiveServicesShowcaseProps {
  services: ServiceItem[];
}

export default function LiveServicesShowcase({ services }: LiveServicesShowcaseProps) {
  const displayServices = services.filter((s) => s.isPublished !== false).slice(0, 6);

  return (
    <section id="services" className="py-14 sm:py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-3">
            <Layers className="w-3 h-3 text-[#008744]" />
            <span>FULL-SERVICE DIGITAL MARKETING & EXECUTION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-[-0.03em] text-[#0A2248] leading-[1.15] mb-3">
            Full-Funnel Marketing Services Engineered for Measurable Growth
          </h2>
          <p className="text-sm sm:text-base text-[#3E4D64] font-normal leading-relaxed max-w-2xl mx-auto">
            From high-ROAS Meta & Google ad scaling to organic SEO dominance and high-converting web architecture—executed by senior specialists and backed by DigiVigee 24/7 client portals.
          </p>
        </div>

        {/* Services Bento Grid (High Density) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {displayServices.map((service, idx) => {
            const Icon = SERVICE_ICONS[service.slug] || Globe;
            const deliverables = service.deliverables?.slice(0, 3) || [
              "End-to-end execution by dedicated senior marketing team",
              "Autonomous ad spend pacing & conversion telemetry",
              "24/7 transparent client portal access with live metrics",
            ];

            return (
              <InteractiveCard key={service.id || service.slug || idx} maxTilt={2} glowEffect={true} className="h-full">
                <div className="h-full rounded-2xl bg-[#F8FAFC] hover:bg-white p-5 sm:p-6 border border-slate-200/80 hover:border-emerald-500/40 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
                  
                  <div>
                    {/* Top Icon & Order Pill */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#008744] flex items-center justify-center group-hover:bg-[#00C853] group-hover:text-white transition-colors shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10.5px] font-semibold text-[#008744] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Includes AI Portal
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#0A2248] tracking-tight mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#475569] leading-relaxed mb-4 line-clamp-2 font-normal">
                      {service.shortDescription || service.detailedDescription}
                    </p>

                    {/* Deliverable Checkmarks */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-200/60 mb-4">
                      {deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-[11.5px] text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008744] hover:text-[#00C853] transition-colors group/link"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[10.5px] font-semibold text-slate-400 font-mono">Live Telemetry</span>
                  </div>

                </div>
              </InteractiveCard>
            );
          })}
        </div>

        {/* View All Services Footer Link */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A2248] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all"
          >
            <span>Explore All Digital Marketing Solutions</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00C853]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
