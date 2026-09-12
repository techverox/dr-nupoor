import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import {
  Share2,
  ShieldCheck,
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Cpu,
  Check,
  ChevronRight,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  Counter,
  ShimmerButton,
} from "@/components/motion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  return resolveDynamicPageMetadata("/services/meta-partner", {
    title: "Official Meta Business Partner | Facebook & Instagram Growth | DigiVigee",
    description:
      "Digivigee is an official Meta Partner. We help businesses scale across Facebook & Instagram with strategy, audience segmentation, creative production, and server-side CAPI telemetry.",
    path: "/services/meta-partner",
    keywords: [
      "Meta Business Partner",
      "official Meta agency partner",
      "Facebook ads agency",
      "Instagram advertising partner",
      "server-side CAPI telemetry",
      "Digivigee Meta partner",
    ],
  });
}

export default function MetaPartnerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Official Meta Business Partner Services",
    provider: {
      "@type": "Organization",
      name: "DigiVigee",
      url: "https://digivigee.com",
    },
    description:
      "Official Meta Partner performance advertising services across Facebook and Instagram with first-party CAPI telemetry and high-velocity creative production.",
    areaServed: "Global",
  };

  const capabilities = [
    {
      icon: Target,
      title: "Strategic Audience & Persona Clustering",
      tagline: "High-Intent Buyers",
      description:
        "Building algorithmic lookalikes, custom customer list retargeting, and interest clusters that minimize CPMs and maximize qualified conversion volume.",
    },
    {
      icon: Cpu,
      title: "Server-Side CAPI Telemetry",
      tagline: "First-Party Data Hygiene",
      description:
        "Custom server-to-server Meta Conversion API infrastructure that bypasses browser ad blockers and iOS privacy restrictions to recover up to 42% lost signals.",
    },
    {
      icon: Sparkles,
      title: "High-Velocity Creative Sprints",
      tagline: "Beat Creative Fatigue",
      description:
        "Weekly production of UGC videos, static hooks, and motion graphics tested systematically to uncover runaway winning creatives before ad fatigue sets in.",
    },
    {
      icon: Zap,
      title: "Automated Budget Pacing & Guardrails",
      tagline: "Zero Spend Waste",
      description:
        "Automated rules that cut non-performing ad sets in real time while pushing ad spend aggressively into validated ROAS winners.",
    },
    {
      icon: BarChart3,
      title: "Blended Multi-Touch Attribution",
      tagline: "Live Auditability",
      description:
        "Live conversion dashboards reconciling Meta in-platform ROAS with Shopify/Stripe/CRM actual revenue for 100% transparent financial reporting.",
    },
    {
      icon: ShieldCheck,
      title: "Direct Meta Technical Support & Alpha Access",
      tagline: "Partner Tier Benefits",
      description:
        "Fast-track ad account reviews, policy compliance assistance, and early access to Meta's newest advertising alpha features and AI Advantage+ tools.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-[#0C1628] selection:bg-blue-500/20 selection:text-blue-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <GlobalSpotlightGrid />
      <Navbar />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_80%_45%_at_50%_-10%,rgba(37,99,235,0.08),transparent)]"
      />

      <main className="relative z-10 pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0C1628] leading-[1.08] mb-6">
              Official Meta Partner for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">
                High-Impact Advertising.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Digivigee is an official Meta Partner. We help businesses make better use of Meta&apos;s business and advertising ecosystem across platforms such as Facebook and Instagram—focusing on strategy, audience, creative, campaign execution, and business objectives.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?service=meta">
                <ShimmerButton
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/20 cursor-pointer"
                  shimmerColor="rgba(255, 255, 255, 0.4)"
                >
                  <span>Request Meta Account Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center gap-2"
              >
                <span>View ROAS Case Studies</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Metrics Ribbon */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-lg shadow-slate-900/5 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 mb-20">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">
                <Counter from={0} to={4.2} decimals={1} suffix="x" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Average Retained ROAS</div>
              <div className="text-[11px] text-slate-500">Across active eCommerce &amp; B2B</div>
            </div>
            <div className="text-center pl-0 sm:pl-4">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">
                <Counter from={0} to={42} decimals={0} suffix="%" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Signal Recovery Lift</div>
              <div className="text-[11px] text-slate-500">Through server-side CAPI pipelines</div>
            </div>
            <div className="text-center pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">
                <Counter from={0} to={180} decimals={0} prefix="$" suffix="M+" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Managed Ad Spend Pipeline</div>
              <div className="text-[11px] text-slate-500">Verifiable commercial attribution</div>
            </div>
            <div className="text-center pt-4 lg:pt-0 pl-0 sm:pl-4">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">
                <Counter from={0} to={100} decimals={0} suffix="%" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Client Account Ownership</div>
              <div className="text-[11px] text-slate-500">Zero markups, direct admin access</div>
            </div>
          </div>

          {/* Core Capabilities Grid */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                OFFICIAL PARTNER CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight mt-3 mb-3">
                Full-Funnel Meta Advertising Architecture
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Moving beyond simple button clicking into rigorous data telemetry and creative engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white p-7 border border-slate-200/80 hover:border-blue-500/40 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {item.tagline}
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0C1628] group-hover:text-blue-600 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Meta Verified Capability</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Audit Banner */}
          <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50 p-8 sm:p-14 border border-slate-200/90 shadow-2xl text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="max-w-xl mx-auto space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs font-bold uppercase tracking-wider">
                COMPLIMENTARY AUDIT
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight">
                Request an In-Depth Meta Ad Account Audit
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our senior media buyers will inspect your pixel/CAPI match rate, audience overlap, creative fatigue score, and ROAS leaks with zero sales fluff.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact?service=meta">
                  <ShimmerButton
                    className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/20 cursor-pointer"
                    shimmerColor="rgba(255, 255, 255, 0.4)"
                  >
                    <span>Request Free Account Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </ShimmerButton>
                </Link>
                <Link
                  href="/about"
                  className="px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Back to About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
