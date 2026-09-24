import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import SocialProofBar from "@/components/SocialProofBar";
import { SOLUTIONS_DATA } from "@/data/solutions";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Share2,
  Globe,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Clinical Solutions & Surgical Care | Dr. Noopur Patel",
  description:
    "Explore comprehensive breast oncology procedures, surgical oncoplastic solutions, and personalized care frameworks by Dr. Noopur Patel.",
  openGraph: {
    title: "Clinical Solutions & Care Pathways | Dr. Noopur Patel",
    description: "Purpose-built oncologic and surgical care pathways for patients in Ahmedabad.",
    type: "website",
  },
};

export default function SolutionsHubPage() {
  const solutionsList = Object.values(SOLUTIONS_DATA);

  const getIcon = (slug: string) => {
    switch (slug) {
      case "performance-agencies":
        return TrendingUp;
      case "social-media-agencies":
        return Share2;
      case "local-seo-agencies":
        return Globe;
      default:
        return Cpu;
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FCFDFD] text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900 font-sans overflow-x-hidden">
      <GlobalSpotlightGrid />
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-16 sm:pb-20 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0C1628] mb-5 leading-[1.1]">
            Specialized Operating Systems for Scaling Agencies
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Tailored delivery stacks and automated client portals engineered specifically for your agency business model.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#008744] hover:bg-[#009A4E] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span>Book Architecture Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm shadow-2xs hover:border-slate-300 transition-all"
            >
              <span>Explore Delivery Engines</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Solutions Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutionsList.map((sol) => {
            const Icon = getIcon(sol.slug);
            return (
              <Link
                key={sol.slug}
                href={`/solutions/${sol.slug}`}
                className="group p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#008744] flex items-center justify-center font-bold border border-emerald-100 group-hover:scale-105 group-hover:bg-[#008744] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {sol.badgeSla}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#0C1628] group-hover:text-[#008744] transition-colors mb-2">
                    {sol.title}
                  </h2>
                  <div className="text-sm font-semibold text-emerald-700 mb-4">
                    {sol.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {sol.heroDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6 pt-4 border-t border-slate-100">
                    {sol.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-lg font-black text-slate-900">{m.value}</div>
                        <div className="text-[10.5px] text-slate-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#008744] group-hover:text-[#009A4E]">
                  <span>Explore Full Solution OS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SocialProofBar />
      <Footer />
    </main>
  );
}
