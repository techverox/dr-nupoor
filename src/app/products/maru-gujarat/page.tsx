import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import {
  Smartphone,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Store,
  Users,
  Check,
  ExternalLink,
  Download,
  Star,
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
  return resolveDynamicPageMetadata("/products/maru-gujarat", {
    title: "Maru Gujarat | Gujarat Business Listing & Local Directory App (Android)",
    description:
      "Local businesses. Local discovery. Digital visibility. Connect with verified businesses across all 33 districts of Gujarat. Built and powered by Digivigee.",
    path: "/products/maru-gujarat",
    keywords: [
      "Maru Gujarat",
      "Gujarat business directory",
      "local business listing app",
      "Gujarat Android app",
      "local search Gujarat",
      "merchant listing app",
      "Digivigee products",
    ],
  });
}

export default function MaruGujaratPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Maru Gujarat",
    operatingSystem: "Android",
    applicationCategory: "BusinessApplication",
    description:
      "Gujarat-focused business listing and directory platform helping local businesses improve discoverability and giving customers an easy way to discover businesses across Gujarat.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    publisher: {
      "@type": "Organization",
      name: "DigiVigee",
      url: "https://digivigee.com",
    },
  };

  const merchantPillars = [
    {
      icon: Search,
      title: "Hyperlocal District Discovery",
      tagline: "All 33 Districts",
      description:
        "Customers search by city, category, and neighborhood—connecting directly with local manufacturers, doctors, retailers, and service providers.",
    },
    {
      icon: MessageSquare,
      title: "Direct Click-to-WhatsApp Leads",
      tagline: "Zero Intermediaries",
      description:
        "Interested buyers can chat directly with your business on WhatsApp with one tap. No commissions, no middleman delay, no hidden fees.",
    },
    {
      icon: Phone,
      title: "Instant Click-to-Call Connections",
      tagline: "High-Intent Calls",
      description:
        "Customers tap to call your showroom, store, or office directly from the app interface, converting local searches into immediate sales.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Merchant Trust Badge",
      tagline: "Build Credibility",
      description:
        "Every listing undergoes digital verification. Stand out with official verified checkmarks, customer reviews, working hours, and shop photos.",
    },
    {
      icon: MapPin,
      title: "Google Map Navigation Sync",
      tagline: "Foot-Traffic Boost",
      description:
        "Direct 1-click GPS navigation links lead foot traffic right to your physical store, clinic, or showroom entrance.",
    },
    {
      icon: Building2,
      title: "Merchant Growth Analytics",
      tagline: "Track Your Views",
      description:
        "Access a dedicated business dashboard to see how many customers viewed your profile, clicked your phone number, or initiated WhatsApp chats.",
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

      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_80%_45%_at_50%_-10%,rgba(37,99,235,0.08),transparent)]"
      />

      <main className="relative z-10 pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0C1628] leading-[1.08] mb-6">
              Local Businesses. Local Discovery.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">
                Digital Visibility.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Maru Gujarat is an Android application created to connect businesses and customers through a Gujarat-focused business listing and directory platform. It helps local businesses improve discoverability across all 33 districts of Gujarat.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?product=marugujarat&type=listing">
                <ShimmerButton
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/20 cursor-pointer"
                  shimmerColor="rgba(255, 255, 255, 0.4)"
                >
                  <span>List Your Business Free</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
              <Link
                href="/contact?product=marugujarat&type=app"
                className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>Get Android APK / Play Store Link</span>
              </Link>
            </div>
          </div>

          {/* Key Metrics Ribbon */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-lg shadow-slate-900/5 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 mb-20">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">
                <Counter from={0} to={33} decimals={0} duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Districts Covered</div>
              <div className="text-[11px] text-slate-500">Ahmedabad to Surat, Rajkot &amp; Kutch</div>
            </div>
            <div className="text-center pl-0 sm:pl-4">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">
                <Counter from={0} to={50000} decimals={0} suffix="+" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Verified Listings</div>
              <div className="text-[11px] text-slate-500">Retail, Healthcare, Food &amp; Services</div>
            </div>
            <div className="text-center pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">
                <Counter from={0} to={100} decimals={0} suffix="%" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">Direct Leads</div>
              <div className="text-[11px] text-slate-500">0% Commission, 100% Direct to WhatsApp</div>
            </div>
            <div className="text-center pt-4 lg:pt-0 pl-0 sm:pl-4">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">
                <Counter from={0} to={4.8} decimals={1} suffix="★" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-[#0C1628] mt-1">User Satisfaction</div>
              <div className="text-[11px] text-slate-500">Highest rated local Gujarat directory</div>
            </div>
          </div>

          {/* Android App Mockup Preview */}
          <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 to-[#0C1628] p-6 sm:p-12 text-white border border-slate-800 shadow-2xl mb-24 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  NATIVE ANDROID EXPERIENCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Built for Instant Customer Discovery
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>ACTIVE LIVE FEED • ALL GUJARAT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* App UI Left: Search & Category Grid */}
              <div className="lg:col-span-7 bg-slate-950/60 rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>SEARCH ACROSS GUJARAT</span>
                  <span className="text-blue-400">LOCATION: SURAT, GUJARAT</span>
                </div>

                {/* Mock Search Bar */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                  <Search className="w-4 h-4 text-blue-400" />
                  <span>Search restaurants, doctors, cloth markets, industrial tools...</span>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    { title: "Restaurants", count: "4,200+", icon: Store },
                    { title: "Doctors & Clinics", count: "2,800+", icon: Users },
                    { title: "Textiles & Saree", count: "6,400+", icon: Building2 },
                    { title: "Jewellery & Gold", count: "1,900+", icon: Sparkles },
                    { title: "Auto Garage", count: "3,100+", icon: ShieldCheck },
                    { title: "Home Interior", count: "1,450+", icon: Building2 },
                    { title: "Industrial Tools", count: "2,600+", icon: Store },
                    { title: "Education & Classes", count: "3,800+", icon: Users },
                  ].map((cat, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left hover:border-blue-500/40 transition-colors"
                    >
                      <cat.icon className="w-4 h-4 text-blue-400 mb-1" />
                      <div className="text-xs font-bold text-white truncate">{cat.title}</div>
                      <div className="text-[10px] text-slate-400">{cat.count} listings</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* App UI Right: Verified Listing Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/70 rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span className="text-blue-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      VERIFIED MERCHANT PROFILE
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      OPEN NOW
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">
                      Patel Diamond Tools &amp; Machinery
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>Ring Road, Surat, Gujarat • 4.9 ★ (142 reviews)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Manufacturer and supplier of laser cutting tools, diamond polishing wheels, and industrial machinery.
                  </p>

                  <div className="pt-2 flex gap-3">
                    <button className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Inquire</span>
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Merchant</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Merchant Pillars Grid */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                FOR GUJARAT MERCHANTS &amp; RETAILERS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight mt-3 mb-3">
                Why Thousands of Gujarat Businesses Are Listed on Maru Gujarat
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Eliminating third-party commission brokers and bringing direct inquiries straight to your phone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {merchantPillars.map((item, idx) => (
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
                    <span>Included for Merchants</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple 3-Step Listing Flow */}
          <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50 p-8 sm:p-14 border border-slate-200/90 shadow-2xl text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="max-w-xl mx-auto space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs font-bold uppercase tracking-wider">
                100% FREE &amp; FAST VERIFICATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight">
                List Your Business on Maru Gujarat Today
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fill in your business name, contact number, and category. Our verification team will verify your listing within 4 business hours.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact?product=marugujarat">
                  <ShimmerButton
                    className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/20 cursor-pointer"
                    shimmerColor="rgba(255, 255, 255, 0.4)"
                  >
                    <span>Submit Free Business Listing</span>
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
