import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import {
  UtensilsCrossed,
  Receipt,
  MessageSquare,
  Clock,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Smartphone,
  Layers,
  Database,
  BarChart3,
  Check,
  Play,
  Zap,
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
  return resolveDynamicPageMetadata("/products/restromitra", {
    title: "RestroMitra | Cloud Restaurant Management Software & POS (SaaS)",
    description:
      "Make restaurant management smarter and simpler. Smart cloud billing, Kitchen Display System (KDS), automated WhatsApp receipts, and table inventory built by Digivigee.",
    path: "/products/restromitra",
    keywords: [
      "RestroMitra",
      "restaurant management software",
      "restaurant POS SaaS",
      "cloud billing for restaurants",
      "kitchen display system KDS",
      "WhatsApp restaurant billing",
      "Digivigee SaaS",
    ],
  });
}

export default function RestroMitraPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RestroMitra",
    operatingSystem: "Cloud Web / Android / iOS / Windows",
    applicationCategory: "BusinessApplication",
    description:
      "Restaurant-focused SaaS solution designed to help restaurants simplify management, improve operational efficiency and adopt modern digital technology.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      category: "Free Trial Available",
    },
    publisher: {
      "@type": "Organization",
      name: "DigiVigee",
      url: "https://digivigee.com",
    },
  };

  const capabilities = [
    {
      icon: Receipt,
      title: "Smart Cloud Billing & POS",
      tagline: "Sub-Second Invoicing",
      description:
        "Lightning-fast touchscreen billing compatible with thermal printers, barcode scanners, and handheld tablets. Works online and offline.",
    },
    {
      icon: MessageSquare,
      title: "Automated WhatsApp Digital Receipts",
      tagline: "Zero Paper Waste",
      description:
        "Instantly deliver branded, GST-compliant digital bills directly to customer WhatsApp numbers upon checkout—cutting paper roll costs by 60%.",
    },
    {
      icon: Clock,
      title: "Kitchen Display System (KDS)",
      tagline: "Zero Order Confusion",
      description:
        "Real-time kitchen order tickets (KOT) routed instantly to chef monitors with color-coded timers, item modifications, and dispatch alerts.",
    },
    {
      icon: Layers,
      title: "Dynamic Table & Floor Management",
      tagline: "Faster Table Turnovers",
      description:
        "Visual floor plan mapper with live occupied, reserved, and vacant status indicators. Split bills and transfer tables with a single tap.",
    },
    {
      icon: Database,
      title: "Real-Time Recipe & Stock Inventory",
      tagline: "Stop Pilferage",
      description:
        "Automated raw ingredient deductions per dish sold. Receive low-stock WhatsApp notifications before critical ingredients run out.",
    },
    {
      icon: BarChart3,
      title: "Multi-Outlet Central Analytics",
      tagline: "Live Owner Dashboard",
      description:
        "Monitor live sales, best-selling dishes, server performance, and gross margins across all outlets from your phone anywhere in the world.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-[#0C1628] selection:bg-emerald-500/20 selection:text-emerald-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <GlobalSpotlightGrid />
      <Navbar />

      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_80%_45%_at_50%_-10%,rgba(0,135,68,0.08),transparent)]"
      />

      <main className="relative z-10 pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0C1628] leading-[1.08] mb-6">
              Make Restaurant Management{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008744] via-emerald-600 to-[#008744]">
                Smarter &amp; Simpler.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              RestroMitra is a restaurant-focused SaaS solution designed to help restaurants simplify management, improve operational efficiency, automate WhatsApp billing, and adopt modern digital technology.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?product=restromitra">
                <ShimmerButton
                  className="px-8 py-4 rounded-xl bg-[#008744] hover:bg-[#007038] text-white font-bold text-sm shadow-xl shadow-emerald-500/20 cursor-pointer"
                  shimmerColor="rgba(255, 255, 255, 0.4)"
                >
                  <span>Book Live Restaurant Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
              <Link
                href="/contact?product=restromitra&type=trial"
                className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center gap-2"
              >
                <span>Start 14-Day Free Trial</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </Link>
            </div>
          </div>

          {/* Key Metrics Ribbon */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-lg shadow-slate-900/5 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 mb-20">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#008744]">
                <Counter from={0} to={99.98} decimals={2} suffix="%" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Uptime SLA</div>
              <div className="text-[11px] text-slate-500">Zero cloud billing downtime</div>
            </div>
            <div className="text-center pl-0 sm:pl-4">
              <div className="text-3xl sm:text-4xl font-black text-[#008744]">
                <Counter from={0} to={3.2} decimals={1} suffix="x" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Faster Table Turns</div>
              <div className="text-[11px] text-slate-500">Speedy order-to-kitchen flow</div>
            </div>
            <div className="text-center pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-[#008744]">
                <Counter from={0} to={60} decimals={0} suffix="%" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Paper Costs Eliminated</div>
              <div className="text-[11px] text-slate-500">Automated WhatsApp receipts</div>
            </div>
            <div className="text-center pt-4 lg:pt-0 pl-0 sm:pl-4">
              <div className="text-3xl sm:text-4xl font-black text-[#008744]">
                <Counter from={0} to={500} decimals={0} suffix="+" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Outlets Powered</div>
              <div className="text-[11px] text-slate-500">Cafes, QSRs &amp; Fine Dining</div>
            </div>
          </div>

          {/* Interactive Cloud POS Interface Mockup Section */}
          <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 to-[#0C1628] p-6 sm:p-12 text-white border border-slate-800 shadow-2xl mb-24 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-[#00E05C] text-xs font-bold uppercase tracking-wider">
                  LIVE RESTROMITRA CLOUD CONSOLE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Designed for High-Speed Rush Hours
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>TERMINAL ACTIVE • OUTLET 01</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Mock POS Left: Floor Plan */}
              <div className="lg:col-span-7 bg-slate-950/60 rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>GROUND FLOOR DINING</span>
                  <span>14 / 16 TABLES OCCUPIED</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {[
                    { id: "T-01", status: "Occupied", bill: "₹1,450", time: "24m" },
                    { id: "T-02", status: "Bill Printed", bill: "₹2,890", time: "45m" },
                    { id: "T-03", status: "Vacant", bill: "-", time: "Free" },
                    { id: "T-04", status: "Occupied", bill: "₹820", time: "12m" },
                    { id: "T-05", status: "Occupied", bill: "₹3,400", time: "38m" },
                    { id: "T-06", status: "Kitchen Prep", bill: "₹1,150", time: "8m" },
                    { id: "T-07", status: "Occupied", bill: "₹2,100", time: "19m" },
                    { id: "T-08", status: "Vacant", bill: "-", time: "Free" },
                  ].map((table) => (
                    <div
                      key={table.id}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        table.status === "Vacant"
                          ? "bg-slate-900/40 border-slate-800 text-slate-400"
                          : table.status === "Bill Printed"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      }`}
                    >
                      <div className="text-xs font-black">{table.id}</div>
                      <div className="text-[10px] font-bold uppercase mt-0.5">{table.status}</div>
                      <div className="text-xs font-extrabold text-white mt-2">{table.bill}</div>
                      <div className="text-[9px] text-slate-400">{table.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock POS Right: Live KOT & WhatsApp Receipt */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      AUTOMATED WHATSAPP BILL
                    </span>
                    <span className="text-[10px] text-slate-500">SENT • 2 SEC AGO</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
                    <div className="text-white font-bold">The Royal Bistro • Table 02</div>
                    <div className="text-slate-400 text-[11px]">Invoice #RM-84920 • 2026-09-10</div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between">
                      <span>Paneer Tikka Platter x2</span>
                      <span>₹760</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dal Makhani Special x1</span>
                      <span>₹340</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Garlic Butter Naan x4</span>
                      <span>₹240</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-[#00E05C]">
                      <span>TOTAL PAID (UPI)</span>
                      <span>₹1,407 (Incl. GST)</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Delivered directly to customer phone without paper</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Core Capabilities Bento */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008744] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                BUILT FOR HOSPITALITY LEADERS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight mt-3 mb-3">
                Everything You Need to Run a Smarter Restaurant
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Engineered to eliminate order bottlenecks, stop stock pilferage, and delight dining guests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white p-7 border border-slate-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#008744] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {item.tagline}
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0C1628] group-hover:text-[#008744] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#008744]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Included in Cloud SaaS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing / Demo CTA Section */}
          <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50 p-8 sm:p-14 border border-slate-200/90 shadow-2xl text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="max-w-xl mx-auto space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-xs font-bold uppercase tracking-wider">
                GET STARTED IN UNDER 24 HOURS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight">
                Ready to Upgrade Your Restaurant Operations?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Schedule a 20-minute live demonstration with a RestroMitra hospitality specialist. We will configure your menu and show you how to streamline your service immediately.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact?product=restromitra">
                  <ShimmerButton
                    className="px-8 py-4 rounded-xl bg-[#008744] hover:bg-[#007038] text-white font-bold text-sm shadow-xl shadow-emerald-500/20 cursor-pointer"
                    shimmerColor="rgba(255, 255, 255, 0.4)"
                  >
                    <span>Schedule Free Demo</span>
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
