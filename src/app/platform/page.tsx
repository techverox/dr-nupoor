"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";
import Integrations from "@/components/Integrations";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  Counter,
  MagneticButton,
  ShimmerButton,
} from "@/components/motion";
import {
  UserCheck,
  Calendar,
  Search,
  CheckCircle2,
  Building2,
  BarChart3,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Layers,
  Receipt,
  FolderLock,
  ArrowRight,
  Clock,
  Zap,
  Check,
  Play,
  Users,
  Award,
  Smartphone,
  Lock,
  Globe,
  Database,
  DollarSign,
  FileText,
  Star,
  ChevronRight,
  X,
  Laptop,
} from "lucide-react";

// ============================================================================
// VERIFIED ENTERPRISE PARTNER LOGOS (Vector SVG)
// ============================================================================
function GooglePartnerLogo() {
  return (
    <div className="flex items-center gap-2 select-none group">
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
      <div className="text-left">
        <div className="text-[13px] font-black tracking-tight text-slate-800 leading-none">Google</div>
        <div className="text-[10px] font-bold tracking-widest text-[#4285F4] uppercase leading-none mt-0.5">Premier Partner</div>
      </div>
    </div>
  );
}

function MetaPartnerLogo() {
  return (
    <div className="flex items-center gap-2 select-none group">
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#0668E1">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
      <div className="text-left">
        <div className="text-[13px] font-black tracking-tight text-slate-800 leading-none">Meta</div>
        <div className="text-[10px] font-bold tracking-widest text-[#0668E1] uppercase leading-none mt-0.5">Business Partner</div>
      </div>
    </div>
  );
}

function StripeVerifiedLogo() {
  return (
    <div className="flex items-center gap-2 select-none group">
      <span className="text-[22px] font-black tracking-tighter text-[#635BFF] leading-none">stripe</span>
      <div className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">Verified Partner</div>
    </div>
  );
}

function TikTokPartnerLogo() {
  return (
    <div className="flex items-center gap-2 select-none group">
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.86-4.51V8.34a8.18 8.18 0 0 0 4.88 1.6V6.5a4.85 4.85 0 0 1-1.11-.2z" />
      </svg>
      <div className="text-left">
        <div className="text-[13px] font-black tracking-tight text-slate-800 leading-none">TikTok</div>
        <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-none mt-0.5">For Business</div>
      </div>
    </div>
  );
}

function HubSpotLogo() {
  return (
    <div className="flex items-center gap-2 select-none group">
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#FF7A59">
        <path d="M18.8 8.4V5.7c.6-.3 1.1-.9 1.1-1.7 0-1-.8-1.9-1.9-1.9s-1.9.8-1.9 1.9c0 .7.4 1.4 1.1 1.7v2.7c-1.3.4-2.3 1.4-2.8 2.7l-4.7-3.6c.1-.3.1-.7.1-1 0-1.8-1.5-3.3-3.3-3.3S3.1 4.7 3.1 6.5s1.5 3.3 3.3 3.3c.6 0 1.2-.2 1.7-.5l4.6 3.5c-.3.7-.4 1.5-.4 2.3 0 1.4.5 2.7 1.4 3.7l-1.8 1.8c-.3-.1-.6-.2-.9-.2-1 0-1.9.8-1.9 1.9s.8 1.9 1.9 1.9 1.9-.8 1.9-1.9c0-.3-.1-.6-.2-.9l1.8-1.8c1.1.7 2.4 1.1 3.8 1.1 3.8 0 6.8-3.1 6.8-6.8 0-3.1-2.1-5.7-5-6.5zm-1.8 9.4c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2z" />
      </svg>
      <div className="text-left">
        <div className="text-[13px] font-black tracking-tight text-slate-800 leading-none">HubSpot</div>
        <div className="text-[10px] font-bold tracking-widest text-[#FF7A59] uppercase leading-none mt-0.5">Certified</div>
      </div>
    </div>
  );
}

function ShopifyPlusLogo() {
  return (
    <div className="flex items-center gap-2 select-none group">
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M19.5 7.5L16 4.5H13L11.5 5.5V7.5H9.5C9.5 7.5 8 18 8 19.5C8 21 15 22 15 22C15 22 20.5 20.5 20.5 19C20.5 17.5 19.5 7.5 19.5 7.5Z" fill="#95BF47" />
        <path d="M13.5 11C13.5 10 14 9.5 14.5 9.5C15 9.5 15.5 10 15.5 10.5C15.5 12 13 13 13 14.5C13 16 14.5 16.5 15.5 16.5C16 16.5 17 16 17 16L16.5 14.5C16.5 14.5 16 15 15.5 15C15 15 14.5 14.5 14.5 14C14.5 12.5 17 11.5 17 10C17 8.5 15.5 7.5 14 7.5C12.5 7.5 12 9 12 9.5L13.5 11Z" fill="white" />
      </svg>
      <div className="text-left">
        <div className="text-[13px] font-black tracking-tight text-slate-800 leading-none">Shopify Plus</div>
        <div className="text-[10px] font-bold tracking-widest text-[#95BF47] uppercase leading-none mt-0.5">Partner</div>
      </div>
    </div>
  );
}

// ============================================================================
// 20 CORE MODULES DATA MATRIX (Plain English & Linear Tier)
// ============================================================================
interface ModuleItem {
  id: string;
  num: string;
  category: "crm" | "social" | "seo" | "ops";
  categoryName: string;
  title: string;
  plainBenefit: string;
  pillText: string;
  pillColor: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  modalPreview: string;
}

const ALL_MODULES: ModuleItem[] = [
  // Group 1: CRM & Sales (01 - 05)
  {
    id: "mod-01",
    num: "01",
    category: "crm",
    categoryName: "Client CRM & Sales",
    title: "Lead Tracker & Pipelines",
    plainBenefit: "See every new client lead and know exactly what to do next to close them.",
    pillText: "Instant Lead Alerts",
    pillColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: UserCheck,
    iconBg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    modalPreview: "Organizes incoming website inquiries into deal stages ($3k/mo, $5k/mo, $10k/mo). Sends instant WhatsApp alerts to your phone the second a high-budget lead fills out your form.",
  },
  {
    id: "mod-02",
    num: "02",
    category: "crm",
    categoryName: "Client CRM & Sales",
    title: "48-Hour Client Onboarding",
    plainBenefit: "Automatically collect client logins, logos, and ad access without sending 20 emails.",
    pillText: "Zero Email Chaos",
    pillColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Zap,
    iconBg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    modalPreview: "A guided 4-step wizard that connects Meta, Google Ads, TikTok, and brand kits in 1 click. Clients complete it in 8 minutes on their phone, so your team starts running ads on Day 1.",
  },
  {
    id: "mod-03",
    num: "03",
    category: "crm",
    categoryName: "Client CRM & Sales",
    title: "High-Converting Pitch Funnels",
    plainBenefit: "Show prospective clients interactive competitor audits that make signing up a no-brainer.",
    pillText: "Close on Call 1",
    pillColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Sparkles,
    iconBg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    modalPreview: "Interactive audit pitch decks that reveal a prospect's ad waste, broken tracking, and competitors' top-performing creative angles. Closes $5k+ retainers on the first discovery call.",
  },
  {
    id: "mod-04",
    num: "04",
    category: "crm",
    categoryName: "Client CRM & Sales",
    title: "Automated Competitor Audits",
    plainBenefit: "Generate deep marketing reports on any competitor in 10 seconds flat.",
    pillText: "10s AI Audit",
    pillColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Search,
    iconBg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    modalPreview: "Enter any company domain to scrape their active Meta Ad Library ads, Google keyword bids, and traffic sources into an executive PDF ready to present to your client.",
  },
  {
    id: "mod-05",
    num: "05",
    category: "crm",
    categoryName: "Client CRM & Sales",
    title: "1-Click Contracts & E-Sign",
    plainBenefit: "Clients sign service agreements directly from their phone with automated Stripe mandates.",
    pillText: "Phone E-Sign",
    pillColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: FileText,
    iconBg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    modalPreview: "Legally-binding contracts with embedded recurring retainer payment mandates. When the client e-signs on their mobile screen, their first month deposit is collected automatically.",
  },

  // Group 2: Content & Social (06 - 10)
  {
    id: "mod-06",
    num: "06",
    category: "social",
    categoryName: "Content & Social",
    title: "Multi-Channel Social Hub",
    plainBenefit: "Schedule and post to Instagram, TikTok, LinkedIn, and YouTube from one single calendar.",
    pillText: "8 Networks Synced",
    pillColor: "bg-pink-50 text-pink-700 border-pink-200",
    icon: Calendar,
    iconBg: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600",
    modalPreview: "Batch plan 30 days of multi-format content. Drag and drop posts across dates with automatic aspect ratio resizing and direct API publishing to 8 major social networks.",
  },
  {
    id: "mod-07",
    num: "07",
    category: "social",
    categoryName: "Content & Social",
    title: "AI Marketing Copilot",
    plainBenefit: "Generates viral video hooks, ad scripts, and captions proven to grab attention.",
    pillText: "Viral Ad Hooks",
    pillColor: "bg-pink-50 text-pink-700 border-pink-200",
    icon: Sparkles,
    iconBg: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600",
    modalPreview: "Trained on 100,000+ top-performing TikTok, Meta, and YouTube ad scripts. Generates 3-second hook variations, objection handlers, and caption copy tailored to your client's niche.",
  },
  {
    id: "mod-08",
    num: "08",
    category: "social",
    categoryName: "Content & Social",
    title: "Client Brand Assets Vault",
    plainBenefit: "Keep all client logos, fonts, photos, and high-res video b-roll organized in one cloud space.",
    pillText: "Zero Lost Files",
    pillColor: "bg-pink-50 text-pink-700 border-pink-200",
    icon: FolderLock,
    iconBg: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600",
    modalPreview: "Ultra-fast cloud storage for client video footage, high-resolution brand guidelines, vector logos, and fonts. Never lose another video file in email threads or broken Google Drive links.",
  },
  {
    id: "mod-09",
    num: "09",
    category: "social",
    categoryName: "Content & Social",
    title: "1-Tap WhatsApp Approvals",
    plainBenefit: "Send a preview link to your client's WhatsApp. They tap 'Approve' on their phone in 14 seconds.",
    pillText: "14s Mobile Sign-Off",
    pillColor: "bg-pink-50 text-pink-700 border-pink-200",
    icon: Smartphone,
    iconBg: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600",
    modalPreview: "Clients never remember passwords. Send an encrypted magic link straight to WhatsApp. The client previews the reel video, taps 'Approve All', and it's instantly scheduled to publish.",
  },
  {
    id: "mod-10",
    num: "10",
    category: "social",
    categoryName: "Content & Social",
    title: "Video Frame Timestamp Notes",
    plainBenefit: "Clients leave feedback on the exact second of a video draft, cutting revision rounds by 75%.",
    pillText: "Zero Missed Notes",
    pillColor: "bg-pink-50 text-pink-700 border-pink-200",
    icon: Play,
    iconBg: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600",
    modalPreview: "Clients can pause the video and type feedback directly on frame 00:04.2: 'Make the logo bigger here'. Eliminates endless revision meetings and subjective feedback confusion.",
  },

  // Group 3: Paid Ads & Local SEO (11 - 15)
  {
    id: "mod-11",
    num: "11",
    category: "seo",
    categoryName: "Paid Ads & SEO",
    title: "Ad Budget Guard (Meta & Google)",
    plainBenefit: "Monitors your clients' ad spend and turns ads off before they can ever overspend.",
    pillText: "0% Budget Overspend",
    pillColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: ShieldCheck,
    iconBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    modalPreview: "Tracks monthly ad budgets down to the second. Automatically pauses runaway Meta, Google, or TikTok campaigns if pacing exceeds 102% of the agreed client budget limit.",
  },
  {
    id: "mod-12",
    num: "12",
    category: "seo",
    categoryName: "Paid Ads & SEO",
    title: "Google Maps 7x7 Local Ranker",
    plainBenefit: "See exactly where your client ranks on Google Maps across their entire city.",
    pillText: "Google #1 Rank Radar",
    pillColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: Globe,
    iconBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    modalPreview: "A 49-pin geo-grid that proves to local business clients that they dominate the Google Local 3-Pack within a 15-mile radius. Perfect for dentists, lawyers, roofers, and clinics.",
  },
  {
    id: "mod-13",
    num: "13",
    category: "seo",
    categoryName: "Paid Ads & SEO",
    title: "Real-Time Blended ROAS",
    plainBenefit: "Shows clients their true sales return on investment so they never question your ad fee.",
    pillText: "Verified ROAS",
    pillColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: TrendingUp,
    iconBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    modalPreview: "Automatically joins Shopify and Stripe sales data with Meta and Google ad spend to display true 4.8x blended ROAS, eliminating attribution disputes with agency clients.",
  },
  {
    id: "mod-14",
    num: "14",
    category: "seo",
    categoryName: "Paid Ads & SEO",
    title: "5-Star Review Flow Engine",
    plainBenefit: "Automatically texts happy customers to leave 5-star Google reviews for your clients.",
    pillText: "Automated Reviews",
    pillColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: Star,
    iconBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    modalPreview: "Automated SMS and WhatsApp follow-ups that filter out negative feedback privately and direct happy customers straight to Google Maps to leave glowing 5-star verified reviews.",
  },
  {
    id: "mod-15",
    num: "15",
    category: "seo",
    categoryName: "Paid Ads & SEO",
    title: "Automated Client PDF Reports",
    plainBenefit: "Generates beautiful, white-label weekly performance reports without making PowerPoint slides.",
    pillText: "0 Slide Decks Needed",
    pillColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: BarChart3,
    iconBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    modalPreview: "Every Monday morning at 8:00 AM, DigiVigee compiles cross-network metrics, creative winners, and spend pacing into a gorgeous PDF branded with your agency logo.",
  },

  // Group 4: Billing & Agency Ops (16 - 20)
  {
    id: "mod-16",
    num: "16",
    category: "ops",
    categoryName: "Billing & Finance",
    title: "Automated 1st-of-Month Retainers",
    plainBenefit: "Charges client credit cards automatically on the 1st at 12:01 AM—no more chasing wires.",
    pillText: "100% On-Time Pay",
    pillColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Receipt,
    iconBg: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    modalPreview: "Connects directly with your Stripe account. On the 1st of each month, all client retainers are charged automatically. Failed cards are retried with smart dunning emails.",
  },
  {
    id: "mod-17",
    num: "17",
    category: "ops",
    categoryName: "Billing & Finance",
    title: "100% White-Label Portal",
    plainBenefit: "Your clients log in at app.youragency.com with your logo, colors, and zero DigiVigee branding.",
    pillText: "Your Brand Only",
    pillColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Building2,
    iconBg: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    modalPreview: "Complete CNAME domain setup with custom favicon, logo, and brand color theme. Clients never see DigiVigee, making your agency look like an enterprise tech company.",
  },
  {
    id: "mod-18",
    num: "18",
    category: "ops",
    categoryName: "Billing & Finance",
    title: "Client Profit Margin Radar",
    plainBenefit: "See exactly how many hours your team spent and which clients make you the most money.",
    pillText: "Live Net Margin",
    pillColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: DollarSign,
    iconBg: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    modalPreview: "Calculates staff hourly cost vs monthly retainer fee to reveal net gross margin per client account. Instantly know which clients are highly profitable and which are draining team hours.",
  },
  {
    id: "mod-19",
    num: "19",
    category: "ops",
    categoryName: "Billing & Finance",
    title: "Isolated Private Client Portals",
    plainBenefit: "Each client has their own private space. They only see their own work and never other clients' data.",
    pillText: "100% Data Privacy",
    pillColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Lock,
    iconBg: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    modalPreview: "Zero risk of client data mixing. Each client account has an isolated database partition with dedicated permissions, custom report links, and secure Stripe billing receipts.",
  },
  {
    id: "mod-20",
    num: "20",
    category: "ops",
    categoryName: "Billing & Finance",
    title: "Team Roles & Activity Vault",
    plainBenefit: "Control who on your team can see client budgets, publish ads, or edit contracts.",
    pillText: "Role Security",
    pillColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Users,
    iconBg: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    modalPreview: "Granular permissions for account managers, copywriters, media buyers, and finance leads. Restrict contractor access to specific client ad accounts with full audit logs.",
  },
];

// ============================================================================
// MAIN PLATFORM COMPONENT (100% Light-First, Kid-Simple, $10B Stripe/Linear Tier)
// ============================================================================
export default function PlatformPage() {
  // Hero Cockpit Active Tab: "money" | "approvals" | "budget"
  const [cockpitTab, setCockpitTab] = useState<"money" | "approvals" | "budget">("money");
  const [isCockpitHovered, setIsCockpitHovered] = useState(false);

  // Auto-cycle Hero Cockpit every 4.5s if not hovered (Homepage parity)
  useEffect(() => {
    if (isCockpitHovered) return;
    const tabs: Array<"money" | "approvals" | "budget"> = ["money", "approvals", "budget"];
    const interval = setInterval(() => {
      setCockpitTab((prev) => {
        const nextIndex = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isCockpitHovered]);

  // Workflows Studio Active Tab: "crm" | "social" | "ads" | "billing"
  const [workflowTab, setWorkflowTab] = useState<"crm" | "social" | "ads" | "billing">("crm");

  // 20 Modules Directory Category Filter & Search
  const [moduleFilter, setModuleFilter] = useState<"all" | "crm" | "social" | "seo" | "ops">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Selected Module for Interactive Snapshot Modal
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);

  // Filtered modules calculation
  const displayedModules = useMemo(() => {
    return ALL_MODULES.filter((m) => {
      const matchesCategory = moduleFilter === "all" || m.category === moduleFilter;
      const matchesSearch =
        searchQuery.trim() === "" ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.plainBenefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.pillText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [moduleFilter, searchQuery]);

  // ROI Calculator Client Count Slider (5, 15, 35, 60, 100)
  const [clientCount, setClientCount] = useState<number>(15);

  // Dynamic ROI Calculations
  const oldStackMonthly = clientCount * 110; // ~$110/client in fragmented SaaS
  const digivigeeMonthly = 299; // flat enterprise tier
  const monthlySavings = Math.max(0, oldStackMonthly - digivigeeMonthly);
  const annualSavings = monthlySavings * 12;
  const hoursSavedWeekly = Math.round(clientCount * 0.95);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-900 relative">
      {/* 1. Global Interactive Crosshair Grid & Fluid Ambient Light Canvas (Matches Homepage 1:1) */}
      <GlobalSpotlightGrid />

      {/* Global Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="relative z-10">

        {/* =========================================================================
            1. HERO SECTION: UNIFIED AGENCY OPERATING SYSTEM
            ========================================================================= */}
        <section id="overview" className="relative pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-16 sm:pb-20 overflow-hidden">
          {/* 1. Overhead Radiant Luminous Spotlight Beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,224,92,0.18),rgba(0,112,243,0.08),transparent_75%)] pointer-events-none -z-10" />

          {/* 2. Dual Atmospheric Color Halos (Mint Emerald & Azure Sky) */}
          <div className="absolute top-12 -left-28 w-[480px] h-[480px] bg-gradient-to-br from-emerald-400/18 via-teal-300/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute top-12 -right-28 w-[480px] h-[480px] bg-gradient-to-bl from-blue-400/16 via-indigo-300/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[720px] h-[260px] bg-gradient-to-t from-emerald-400/15 via-emerald-100/10 to-transparent rounded-full blur-[80px] pointer-events-none -z-10" />

          {/* 3. Concentric Architectural Precision Orbit Arcs */}
          <div className="absolute -top-[240px] left-1/2 -translate-x-1/2 w-[860px] h-[860px] rounded-full border border-emerald-500/10 pointer-events-none -z-10" />
          <div className="absolute -top-[360px] left-1/2 -translate-x-1/2 w-[1180px] h-[1180px] rounded-full border border-blue-500/5 pointer-events-none -z-10" />

          {/* 4. Minimalist SVG Precision Crosshairs (+) */}
          <div className="absolute top-24 left-10 text-emerald-500/35 text-xl font-light select-none pointer-events-none hidden lg:block">+</div>
          <div className="absolute top-24 right-10 text-blue-500/35 text-xl font-light select-none pointer-events-none hidden lg:block">+</div>
          <div className="absolute bottom-36 left-16 text-slate-400/35 text-xl font-light select-none pointer-events-none hidden lg:block">+</div>
          <div className="absolute bottom-36 right-16 text-emerald-500/35 text-xl font-light select-none pointer-events-none hidden lg:block">+</div>

          {/* 5. Tactile Ambient Capability Chips in Wide Peripheral Margins with Living Radar Pulse */}
          <div className="absolute top-36 left-6 xl:left-12 hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm text-xs font-mono text-slate-700 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E05C]" />
            </span>
            <span className="font-bold text-slate-900">99.98%</span>
            <span className="text-[10px] text-slate-400">On-Time Retainers</span>
          </div>
          <div className="absolute top-36 right-6 xl:right-12 hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm text-xs font-mono text-slate-700 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-bold text-slate-900">14s</span>
            <span className="text-[10px] text-slate-400">WhatsApp Sign-Off</span>
          </div>
          <div className="absolute top-[490px] left-4 xl:left-8 hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-purple-200/80 shadow-2xs text-[11px] font-mono text-purple-800 select-none">
            <Lock className="w-3 h-3 text-purple-600" />
            <span>0% Data Leakage</span>
          </div>
          <div className="absolute top-[490px] right-4 xl:right-8 hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-blue-200/80 shadow-2xs text-[11px] font-mono text-blue-800 select-none">
            <TrendingUp className="w-3 h-3 text-blue-600" />
            <span>4.80x Blended ROAS</span>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            
            {/* Grand Headline (Kicker beacon removed as requested) */}
            <FadeIn direction="up" delay={0.05}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-black text-slate-950 tracking-[-0.04em] leading-[1.08] max-w-5xl mx-auto mb-6">
                The Operating System for{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#008744] via-[#00A86B] to-[#0070F3]">
                  Modern Marketing Agencies.
                </span>
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn direction="up" delay={0.15}>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-[1.65] mb-8 font-normal">
                Replace 8 messy tools with 1 clean dashboard. Win clients, get video ads approved on WhatsApp in seconds, and collect monthly retainers on autopilot.
              </p>
            </FadeIn>

            {/* Dual CTAs & Trust Badges */}
            <FadeIn direction="up" delay={0.25}>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <Link
                  href="/dashboard"
                  className="group shimmer-sweep inline-flex items-center justify-center gap-2 px-8 py-3.5 h-[52px] rounded-full text-[14px] font-bold text-white bg-[#008744] hover:bg-[#007038] shadow-[0_4px_20px_rgba(0,135,68,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="relative z-10">Start Free 14-Day Trial</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform relative z-10" />
                </Link>

                <a
                  href="#workflows"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 h-[52px] rounded-full text-[14px] font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>See How It Works</span>
                  <span className="inline-block group-hover:translate-y-1 transition-transform">↓</span>
                </a>
              </div>
            </FadeIn>

            {/* Ratings Sub-Bar */}
            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-[11px] font-mono">
                  <span className="text-amber-500 font-bold">★★★★★</span>
                  <span className="font-bold text-slate-900">4.9/5</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-medium">420+ Agency Partners</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-[11px] font-mono text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No credit card required</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SOC-2 Certified • Setup in 60s</span>
                </div>
              </div>
            </FadeIn>

            {/* =========================================================================
                LIVE COCKPIT: 3 VISUAL MINI MOCKUPS (Kid Simple & Stripe Tier)
                ========================================================================= */}
            <div
              className="relative max-w-5xl mx-auto mt-6"
              onMouseEnter={() => setIsCockpitHovered(true)}
              onMouseLeave={() => setIsCockpitHovered(false)}
            >
              
              {/* Pop-Out Widget 1 (Top-Right): Auto Retainer Success */}
              <div className="absolute -top-5 -right-2 sm:-right-4 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-md hover:scale-105 transition-all">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 font-bold">
                  $
                </div>
                <div className="text-left font-mono">
                  <div className="text-[10px] uppercase font-bold text-slate-400">1st of Month Auto-Debit</div>
                  <div className="text-xs font-black text-slate-900">+$142,500.00 Collected ✓</div>
                </div>
              </div>

              {/* Pop-Out Widget 2 (Bottom-Left): WhatsApp Approvals */}
              <div className="absolute -bottom-5 -left-2 sm:-left-4 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-md hover:scale-105 transition-all">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-left font-mono">
                  <div className="text-[10px] uppercase font-bold text-slate-400">WhatsApp Push</div>
                  <div className="text-xs font-black text-emerald-700">Reel Approved in 14 Seconds ✓</div>
                </div>
              </div>

              {/* Elevated Mac Software Window */}
              <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl overflow-hidden text-left relative z-20">
                
                {/* Mac Titlebar */}
                <div className="bg-slate-100/90 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-2xs" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-2xs" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-2xs" />
                    <span className="ml-3 font-mono text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      app.youragency.com
                    </span>
                  </div>

                  {/* 3 Outcome View Tabs */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 relative">
                    <button
                      onClick={() => setCockpitTab("money")}
                      className={`relative z-10 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        cockpitTab === "money"
                          ? "text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {cockpitTab === "money" && (
                        <motion.div
                          layoutId="cockpitActiveTab"
                          className="absolute inset-0 bg-[#008744] rounded-lg -z-10 shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      💰 Money &amp; Retainers
                    </button>
                    <button
                      onClick={() => setCockpitTab("approvals")}
                      className={`relative z-10 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        cockpitTab === "approvals"
                          ? "text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {cockpitTab === "approvals" && (
                        <motion.div
                          layoutId="cockpitActiveTab"
                          className="absolute inset-0 bg-[#008744] rounded-lg -z-10 shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      📱 1-Tap Approvals
                    </button>
                    <button
                      onClick={() => setCockpitTab("budget")}
                      className={`relative z-10 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        cockpitTab === "budget"
                          ? "text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {cockpitTab === "budget" && (
                        <motion.div
                          layoutId="cockpitActiveTab"
                          className="absolute inset-0 bg-[#008744] rounded-lg -z-10 shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      🎯 Ad Budget Guard
                    </button>
                  </div>
                </div>

                {/* Cockpit Window Content with Visual Mockups */}
                <div className="p-6 sm:p-8 bg-white min-h-[360px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={cockpitTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {/* VIEW 1: Visual Stripe Auto-Debit Invoice Slip */}
                      {cockpitTab === "money" && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">1st of Month Total Collection</div>
                          <div className="text-3xl sm:text-4xl font-black text-slate-950 font-mono mt-0.5">$142,500.00</div>
                          <div className="text-xs text-emerald-700 font-bold mt-1 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>28 of 28 client retainers debited automatically at 12:01 AM. Zero chasing.</span>
                          </div>
                        </div>
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-right">
                          <div className="text-[11px] font-bold text-emerald-800">Direct Stripe Payout</div>
                          <div className="text-sm font-black text-emerald-700 font-mono">100% On-Time ✓</div>
                        </div>
                      </div>

                      {/* Visual Client Payment Slips */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-300 shrink-0">
                              <Image src="/images/showcase/marcus_vance.jpg" alt="Acme" fill className="object-cover" sizes="28px" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">Acme Brands DTC</div>
                              <div className="text-[10px] text-slate-400">#INV-2026-881</div>
                            </div>
                          </div>
                          <div className="text-lg font-black text-slate-900">$8,500 / mo</div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            <Check className="w-3 h-3 text-emerald-600" /> Stripe Auto-Debited ✓
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-300 shrink-0">
                              <Image src="/images/showcase/elena_rostova.jpg" alt="Apex" fill className="object-cover" sizes="28px" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">Apex Dental Group</div>
                              <div className="text-[10px] text-slate-400">#INV-2026-882</div>
                            </div>
                          </div>
                          <div className="text-lg font-black text-slate-900">$12,000 / mo</div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            <Check className="w-3 h-3 text-emerald-600" /> Stripe Auto-Debited ✓
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-300 shrink-0">
                              <Image src="/images/showcase/david_sterling.jpg" alt="Nova" fill className="object-cover" sizes="28px" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">Nova Athletics</div>
                              <div className="text-[10px] text-slate-400">#INV-2026-883</div>
                            </div>
                          </div>
                          <div className="text-lg font-black text-slate-900">$5,500 / mo</div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            <Check className="w-3 h-3 text-emerald-600" /> Stripe Auto-Debited ✓
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VIEW 2: Smartphone WhatsApp Approvals Mockup */}
                  {cockpitTab === "approvals" && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">WhatsApp Client Gateway</div>
                          <div className="text-xl sm:text-2xl font-black text-slate-950 mt-0.5">Passwordless Phone Sign-Offs</div>
                          <p className="text-xs text-slate-500 mt-1">Clients tap the magic link on their phone, preview video frames, and approve in seconds.</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                          Avg Turnaround: 14s
                        </span>
                      </div>

                      {/* Visual Phone / WhatsApp Review Card */}
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-xl mx-auto space-y-4">
                        <div className="flex items-center gap-3">
                          {/* Mini 9:16 Video Reel Thumbnail */}
                          <div className="w-16 h-24 rounded-xl bg-gradient-to-b from-slate-800 to-slate-950 relative overflow-hidden flex items-center justify-center shrink-0 border border-slate-300 shadow-sm">
                            <Play className="w-6 h-6 text-white/90 fill-white" />
                            <span className="absolute bottom-1 right-1 text-[8px] text-white font-mono bg-black/60 px-1 rounded">0:15</span>
                          </div>

                          {/* WhatsApp Chat Bubble */}
                          <div className="flex-1 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700">
                              <span className="flex items-center gap-1">
                                <Smartphone className="w-3.5 h-3.5" /> WhatsApp Push • 9:00 AM
                              </span>
                              <span className="text-slate-400 font-normal">Just now</span>
                            </div>
                            <div className="text-xs font-bold text-slate-900">Instagram Reel: 3 Secrets to 4x ROAS</div>
                            <p className="text-[11px] text-slate-500">Scheduled for Friday 9:00 AM. Tap below to approve.</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button className="flex-1 py-2.5 rounded-xl bg-[#008744] hover:bg-[#007038] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer">
                            <Check className="w-3.5 h-3.5" />
                            <span>1-Tap Approve All ✓</span>
                          </button>
                          <button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer">
                            Add Note
                          </button>
                        </div>
                        <div className="text-center text-[10px] text-slate-400 font-mono">
                          Sign-off is timestamped to eliminate revision disputes permanently.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VIEW 3: Visual Ad Budget Guard Gauge */}
                  {cockpitTab === "budget" && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Meta &amp; Google Cross-Network Radar</div>
                          <div className="text-3xl sm:text-4xl font-black text-slate-950 font-mono mt-0.5">$84,200.00 Active Spend</div>
                          <div className="text-xs text-emerald-700 font-bold mt-1 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>0% Budget Overspend. Speedometer automatically pauses ads at limit.</span>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-right">
                          <div className="text-[11px] font-bold text-blue-800">Blended Agency ROAS</div>
                          <div className="text-sm font-black text-blue-700 font-mono">4.80x Verified ✓</div>
                        </div>
                      </div>

                      {/* Visual Pacing Gauge Bars */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold font-mono">
                            <span className="flex items-center gap-1.5 text-blue-700">
                              <span className="w-2 h-2 rounded-full bg-blue-500" /> Meta Ads Pacing
                            </span>
                            <span className="text-slate-900">$48,200 / $50k</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: "96.4%" }} />
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>ROAS: 4.9x</span>
                            <span className="text-emerald-700 font-bold">On Target ✓</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold font-mono">
                            <span className="flex items-center gap-1.5 text-emerald-700">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Google Ads Pacing
                            </span>
                            <span className="text-slate-900">$36,000 / $35k</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#008744] rounded-full" style={{ width: "100%" }} />
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>ROAS: 4.6x</span>
                            <span className="text-emerald-700 font-bold">Auto-Capped ✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            2. OFFICIAL PARTNER LOGO STRIP
            ========================================================================= */}
        <section className="relative py-10 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
                OFFICIALLY VERIFIED PLATFORM PARTNERS
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-90">
              <GooglePartnerLogo />
              <MetaPartnerLogo />
              <StripeVerifiedLogo />
              <TikTokPartnerLogo />
              <HubSpotLogo />
              <ShopifyPlusLogo />
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. 3-TIER MULTI-TENANT ARCHITECTURE (With Visual Interface Diagrams)
            ========================================================================= */}
        <section id="architecture" className="py-20 sm:py-24 relative bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <FadeIn direction="up">
              <div className="max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold uppercase tracking-[0.14em] mb-4 shadow-2xs">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3 SIMPLE LEVELS OF CONTROL</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[1.12]">
                  One engine. Total peace of mind for you and your clients.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-[1.65] max-w-2xl mx-auto font-normal">
                  Your agency stays in command, your brand stays front-and-center, and your clients get a private login where their data is 100% safe.
                </p>
              </div>
            </FadeIn>

            {/* 3 Level Cards with Visual Diagrams */}
            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
              
              {/* Level 1: Master Admin Diagram */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5 h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-mono text-[11px] font-bold uppercase text-slate-400">LEVEL 1 • YOUR HQ</span>
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        Master Admin
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-950">Your Agency Command</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      You see all your clients, team members, active ad spend, and total monthly retainer revenue in one place.
                    </p>

                    {/* Visual Console Diagram */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold border-b border-slate-200 pb-1.5">
                        <Laptop className="w-3 h-3 text-blue-600" />
                        <span>admin.digivigee.com/hq</span>
                      </div>
                      <div className="flex justify-between"><span>Connected Portals:</span> <span className="font-bold text-slate-900">28 Accounts</span></div>
                      <div className="flex justify-between"><span>Monthly MRR:</span> <span className="font-bold text-emerald-700">$142,500</span></div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-700 font-semibold flex items-center gap-1.5 pt-2 border-t border-slate-100">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Complete agency command
                  </div>
                </motion.div>
              </StaggerItem>

              {/* Level 2: White-Label Custom Domain Diagram */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-7 rounded-3xl bg-emerald-50/40 border-2 border-emerald-500/50 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between space-y-5 relative h-full"
                >
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#008744] text-white font-mono text-[10px] font-black uppercase tracking-wider">
                    100% Your Brand
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                      <span className="font-mono text-[11px] font-bold uppercase text-emerald-800">LEVEL 2 • WHITE-LABEL</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Custom CNAME
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-950">Zero DigiVigee Branding</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Clients log into your portal with your custom logo, your brand colors, and your domain. You look like a $100M firm.
                    </p>

                    {/* Visual Domain URL Bar Diagram */}
                    <div className="p-3 bg-white rounded-2xl border border-emerald-200 text-xs font-mono space-y-2 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-bold border-b border-emerald-100 pb-1.5">
                        <Globe className="w-3 h-3 text-emerald-600" />
                        <span>https://app.youragency.com</span>
                      </div>
                      <div className="flex justify-between"><span>Logo &amp; Styling:</span> <span className="font-bold text-emerald-700">100% Agency Kit</span></div>
                      <div className="flex justify-between"><span>DigiVigee Badge:</span> <span className="font-bold text-slate-400 line-through">Hidden</span></div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-700 font-semibold flex items-center gap-1.5 pt-2 border-t border-emerald-100">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Elevates client trust instantly
                  </div>
                </motion.div>
              </StaggerItem>

              {/* Level 3: Isolated Client Login Diagram */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5 h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-mono text-[11px] font-bold uppercase text-slate-400">LEVEL 3 • CLIENT PORTAL</span>
                      <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        100% Private
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-950">Isolated Client Logins</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Each client gets their own login. They only see their own ad reports, video approvals, and invoices. Zero data leakage.
                    </p>

                    {/* Visual Private Partition Diagram */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-purple-700 font-bold border-b border-slate-200 pb-1.5">
                        <Lock className="w-3 h-3 text-purple-600" />
                        <span>client.youragency.com/login</span>
                      </div>
                      <div className="flex justify-between"><span>Data Access:</span> <span className="font-bold text-slate-900">Client Isolated</span></div>
                      <div className="flex justify-between"><span>Cross-Leakage:</span> <span className="font-bold text-emerald-700">0% Risk</span></div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-700 font-semibold flex items-center gap-1.5 pt-2 border-t border-slate-100">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Client data is 100% protected
                  </div>
                </motion.div>
              </StaggerItem>

            </StaggerContainer>

          </div>
        </section>

        {/* =========================================================================
            4. 4 CORE WORKFLOWS STUDIO (With Interactive Software Stages)
            ========================================================================= */}
        <section id="workflows" className="py-20 sm:py-24 relative bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <FadeIn direction="up">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-mono text-[11px] font-bold uppercase tracking-[0.14em] mb-4 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>THE 4 CONNECTED WORKFLOWS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[1.12]">
                  Everything your agency does. Handled in 4 clean steps.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-[1.65] max-w-2xl mx-auto font-normal">
                  From winning the client to getting paid on the 1st of every month—without 8 different software passwords.
                </p>
              </div>
            </FadeIn>

            {/* 4 Interactive Tabs with Magnetic Active Glider */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10">
              <button
                onClick={() => setWorkflowTab("crm")}
                className={`relative z-10 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  workflowTab === "crm"
                    ? "text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {workflowTab === "crm" && (
                  <motion.div
                    layoutId="platformWorkflowTab"
                    className="absolute inset-0 bg-slate-950 rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                1. Win &amp; Onboard Clients
              </button>
              <button
                onClick={() => setWorkflowTab("social")}
                className={`relative z-10 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  workflowTab === "social"
                    ? "text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {workflowTab === "social" && (
                  <motion.div
                    layoutId="platformWorkflowTab"
                    className="absolute inset-0 bg-slate-950 rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                2. Fast WhatsApp Approvals
              </button>
              <button
                onClick={() => setWorkflowTab("ads")}
                className={`relative z-10 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  workflowTab === "ads"
                    ? "text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {workflowTab === "ads" && (
                  <motion.div
                    layoutId="platformWorkflowTab"
                    className="absolute inset-0 bg-slate-950 rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                3. Ad Budget Safety &amp; ROAS
              </button>
              <button
                onClick={() => setWorkflowTab("billing")}
                className={`relative z-10 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  workflowTab === "billing"
                    ? "text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {workflowTab === "billing" && (
                  <motion.div
                    layoutId="platformWorkflowTab"
                    className="absolute inset-0 bg-slate-950 rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                4. Automatic Retainer Billing
              </button>
            </div>

            {/* Workflow Tab Card with Rich Application Preview Stage */}
            <div className="max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={workflowTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
              
              {/* WORKFLOW 1: Kanban Pipeline Stage */}
              {workflowTab === "crm" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
                  <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold font-mono">
                      Step 1 • Close More Retainers
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      Win clients fast and onboard them in 48 hours.
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Stop losing leads in messy spreadsheets. DigiVigee captures prospects, generates competitor audits that close retainers, and collects client ad logins without 20 back-and-forth emails.
                    </p>
                    <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Forms alert your phone within 15 seconds of an inquiry.</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Proposals with 1-click mobile e-signature.</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Automated intake wizard for Facebook and Google ad permissions.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Rich Kanban Board Mockup */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm font-mono text-xs space-y-3">
                    <div className="flex justify-between items-center text-slate-400 font-bold border-b border-slate-100 pb-2">
                      <span className="flex items-center gap-1.5 text-blue-700">
                        <span className="w-2 h-2 rounded-full bg-blue-500" /> LIVE PIPELINE
                      </span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">+$24.5k/mo Closed</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900">Dr. Sterling (Dental)</div>
                          <div className="text-[10px] text-blue-600">Audit Pitch Deck Sent</div>
                        </div>
                        <span className="font-bold text-slate-900">$6,500/mo</span>
                      </div>

                      <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900">Aura Apparel DTC</div>
                          <div className="text-[10px] text-emerald-700 font-bold">Contract E-Signed ✓</div>
                        </div>
                        <span className="font-bold text-emerald-700">$10,000/mo</span>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900">Vanguard Solar</div>
                          <div className="text-[10px] text-purple-600">Onboarding Wizard 4/4</div>
                        </div>
                        <span className="font-bold text-slate-900">$8,000/mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WORKFLOW 2: WhatsApp Reel Video Preview Stage */}
              {workflowTab === "social" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
                  <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold font-mono">
                      Step 2 • Content &amp; Video Review
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      Get client video approvals in 14 seconds on WhatsApp.
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Clients never remember passwords. Send a magic link directly to their WhatsApp. They watch the reel, tap &apos;Approve&apos; on their phone, and it automatically publishes to Instagram and TikTok.
                    </p>
                    <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>No login required for busy founders. 1-tap sign-off.</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Clients can leave notes on the exact second of a video.</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Auto-publishes to 8 social networks once approved.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Rich WhatsApp Video Player Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm font-mono text-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-[11px]">
                      <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <Smartphone className="w-3.5 h-3.5" /> WhatsApp Magic Link
                      </span>
                      <span className="text-slate-400">14s Avg Sign-Off</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-16 h-24 rounded-xl bg-slate-900 relative overflow-hidden flex items-center justify-center shrink-0 border border-slate-300">
                        <Play className="w-6 h-6 text-white fill-white" />
                        <span className="absolute bottom-1 right-1 text-[8px] text-white bg-black/60 px-1 rounded">0:15</span>
                      </div>
                      <div className="flex-1 space-y-1 text-left">
                        <div className="font-bold text-slate-900 text-xs">Reel: 3 Secrets to 4x ROAS</div>
                        <div className="text-[11px] text-slate-500 font-sans">Batch scheduled for Meta &amp; TikTok. Tap below to approve.</div>
                        <div className="text-[10px] text-emerald-700 font-bold pt-0.5">Approved by Elena (Prism Creative) ✓</div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button className="flex-1 py-2 rounded-xl bg-[#008744] text-white font-bold text-xs shadow-xs cursor-pointer">
                        Approved ✓
                      </button>
                      <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* WORKFLOW 3: Ad Pacing Telemetry Stage */}
              {workflowTab === "ads" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
                  <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                      Step 3 • Paid Media &amp; SEO
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      Never overspend a client ad budget again.
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Connect Meta, Google, and TikTok ads in seconds. DigiVigee monitors daily spend pacing and automatically alerts your team before budgets blow past limits.
                    </p>
                    <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Live spend pacing radar stops budget accidents.</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Shows true blended ROAS directly to clients.</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Automated weekly reports with zero manual PowerPoint slides.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Rich Cross-Network Ad Radar */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm font-mono text-xs space-y-3">
                    <div className="flex justify-between font-bold border-b border-slate-100 pb-2">
                      <span className="text-slate-700">Cross-Network Radar</span>
                      <span className="text-emerald-700 font-black">4.80x Blended ROAS</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span>Monthly Spend Pacing:</span>
                        <span className="font-bold text-slate-900">$28,400 / $30,000</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#008744] rounded-full" style={{ width: "94%" }} />
                      </div>
                    </div>

                    <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Budget Guard active: 0% risk of overspend.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* WORKFLOW 4: Stripe Payout Slip Stage */}
              {workflowTab === "billing" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
                  <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold font-mono">
                      Step 4 • Automated Retainers
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      Retainers clear at 12:01 AM on the 1st of the month.
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Stop sending manual PDF invoices and waiting 30 days for payment. DigiVigee automatically debits client cards via Stripe and deposits revenue directly into your agency bank account.
                    </p>
                    <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Automatic credit card debit on the 1st of every month.</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant profit margin calculation per client account.</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Automated receipts and accounting sync with QuickBooks.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Rich Stripe Receipt Slip */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm font-mono text-xs space-y-3">
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                      <div className="text-[10px] text-emerald-800 font-bold uppercase">Stripe Connect Auto-Debit</div>
                      <div className="text-2xl font-black text-slate-900">$142,500 Collected</div>
                      <div className="text-[11px] text-emerald-700 font-bold">28 of 28 Retainers Cleared at 12:01 AM ✓</div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                      <span>Late Payment Calls:</span>
                      <span className="font-bold text-emerald-700">0 Hours Wasted</span>
                    </div>
                  </div>
                </div>
              )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* =========================================================================
            5. THE 20 CORE MODULES DIRECTORY (Bento Elevation & Visual Snapshot)
            ========================================================================= */}
        <section id="modules" className="py-20 sm:py-24 relative bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <FadeIn direction="up">
              <div className="max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold uppercase tracking-[0.14em] mb-4 shadow-2xs">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>THE 20 CONNECTED CORE MODULES</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[1.12]">
                  All 20 modules. Zero bloat. One clean system.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-[1.65] max-w-2xl mx-auto font-normal">
                  Every tool your agency needs to scale—explained in simple plain English so you know exactly how it helps you grow.
                </p>
              </div>
            </FadeIn>

            {/* Category Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-10">
              {/* Category Pills with Sliding Glider */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs relative">
                <button
                  onClick={() => setModuleFilter("all")}
                  className={`relative z-10 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    moduleFilter === "all" ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {moduleFilter === "all" && (
                    <motion.div
                      layoutId="platformModuleFilter"
                      className="absolute inset-0 bg-slate-900 rounded-xl -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  All (20)
                </button>
                <button
                  onClick={() => setModuleFilter("crm")}
                  className={`relative z-10 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    moduleFilter === "crm" ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {moduleFilter === "crm" && (
                    <motion.div
                      layoutId="platformModuleFilter"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  CRM &amp; Sales (5)
                </button>
                <button
                  onClick={() => setModuleFilter("social")}
                  className={`relative z-10 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    moduleFilter === "social" ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {moduleFilter === "social" && (
                    <motion.div
                      layoutId="platformModuleFilter"
                      className="absolute inset-0 bg-pink-600 rounded-xl -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  Content &amp; Social (5)
                </button>
                <button
                  onClick={() => setModuleFilter("seo")}
                  className={`relative z-10 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    moduleFilter === "seo" ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {moduleFilter === "seo" && (
                    <motion.div
                      layoutId="platformModuleFilter"
                      className="absolute inset-0 bg-emerald-600 rounded-xl -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  Paid Ads &amp; SEO (5)
                </button>
                <button
                  onClick={() => setModuleFilter("ops")}
                  className={`relative z-10 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    moduleFilter === "ops" ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {moduleFilter === "ops" && (
                    <motion.div
                      layoutId="platformModuleFilter"
                      className="absolute inset-0 bg-purple-600 rounded-xl -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  Billing &amp; Finance (5)
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword..."
                  className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Bento-Style 4-Column Responsive Capability Cards */}
            <StaggerContainer
              key={`${moduleFilter}-${searchQuery}`}
              staggerDelay={0.03}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto text-left"
            >
              {displayedModules.map((module) => {
                const IconComp = module.icon;
                return (
                  <StaggerItem key={module.id} className="h-full">
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.18 } }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedModule(module)}
                      className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-500/50 transition-colors duration-200 flex flex-col justify-between space-y-3 group cursor-pointer h-full"
                    >
                      <div className="space-y-2.5">
                        {/* Header: Distinct Category Accent Container */}
                        <div className="flex items-center justify-between">
                          <div className={`w-9 h-9 rounded-2xl ${module.iconBg} border flex items-center justify-center ${module.iconColor} shadow-2xs group-hover:scale-105 transition-transform`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            #{module.num}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {module.title}
                        </h4>

                        {/* 1 Plain-English Benefit Sentence */}
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {module.plainBenefit}
                        </p>
                      </div>

                      {/* Micro Outcome Pill + Preview Link */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${module.pillColor}`}>
                          {module.pillText}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-700 flex items-center gap-0.5 transition-colors">
                          Preview <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

          </div>
        </section>

        {/* =========================================================================
            INTERACTIVE VISUAL SNAPSHOT MODAL (When any module is clicked)
            ========================================================================= */}
        <AnimatePresence>
          {selectedModule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm"
              onClick={() => setSelectedModule(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 16 }}
                transition={{ type: "spring", damping: 26, stiffness: 360 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-5 text-left relative"
              >
                <button
                  onClick={() => setSelectedModule(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl ${selectedModule.iconBg} border flex items-center justify-center ${selectedModule.iconColor} shadow-2xs`}>
                    {React.createElement(selectedModule.icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                      MODULE #{selectedModule.num} • {selectedModule.categoryName}
                    </span>
                    <h3 className="text-lg font-black text-slate-950">{selectedModule.title}</h3>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-emerald-800 font-mono flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>How it helps your agency:</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedModule.modalPreview}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border ${selectedModule.pillColor}`}>
                    {selectedModule.pillText}
                  </span>
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 active:scale-95 transition cursor-pointer"
                  >
                    Got It ✓
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            6. FINANCIAL RADAR: ROI & STACK REPLACEMENT CALCULATOR (With Scale Presets)
            ========================================================================= */}
        <section id="roi-calculator" className="py-20 sm:py-24 relative bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <FadeIn direction="up">
              <div className="max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold uppercase tracking-[0.14em] mb-4 shadow-2xs">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>STACK REPLACEMENT &amp; ROI CALCULATOR</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[1.12]">
                  See how much money and time DigiVigee saves you.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-[1.65] max-w-2xl mx-auto font-normal">
                  Stop paying for 8 separate tools. One unified operating system cuts your software bills by 80% and saves your team 14 hours every week.
                </p>
              </div>
            </FadeIn>

            {/* Interactive Calculator Card with Scale Presets */}
            <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm text-left">
              
              {/* Quick Scale Presets (Homepage Standard) */}
              <div className="mb-6 space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">SELECT YOUR AGENCY TIER:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setClientCount(5)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                      clientCount === 5
                        ? "bg-[#008744] text-white border-[#008744] shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div>Boutique</div>
                    <div className="text-[10px] opacity-80 font-normal">5 Clients</div>
                  </button>

                  <button
                    onClick={() => setClientCount(15)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                      clientCount === 15
                        ? "bg-[#008744] text-white border-[#008744] shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div>Growth • Popular</div>
                    <div className="text-[10px] opacity-80 font-normal">15 Clients</div>
                  </button>

                  <button
                    onClick={() => setClientCount(35)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                      clientCount === 35
                        ? "bg-[#008744] text-white border-[#008744] shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div>Scale</div>
                    <div className="text-[10px] opacity-80 font-normal">35 Clients</div>
                  </button>

                  <button
                    onClick={() => setClientCount(60)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                      clientCount === 60
                        ? "bg-[#008744] text-white border-[#008744] shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div>Enterprise</div>
                    <div className="text-[10px] opacity-80 font-normal">60+ Clients</div>
                  </button>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="space-y-3 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-sm font-black text-slate-900 font-mono">
                    ADJUST ACTIVE CLIENT COUNT:
                  </label>
                  <span className="text-xl font-black text-emerald-700 font-mono bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
                    {clientCount} Clients
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={clientCount}
                  onChange={(e) => setClientCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#008744]"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>5 Clients</span>
                  <span>25 Clients</span>
                  <span>50 Clients</span>
                  <span>100+ Clients</span>
                </div>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Old Fragmented Stack */}
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3 font-mono">
                  <div className="flex justify-between items-center text-xs font-bold text-rose-800 uppercase">
                    <span>Old Fragmented Stack</span>
                    <span className="bg-rose-100 px-2 py-0.5 rounded">8 Subscriptions</span>
                  </div>
                  <div className="text-2xl font-black text-rose-900">
                    ${oldStackMonthly.toLocaleString()} <span className="text-xs font-normal text-rose-700">/ month</span>
                  </div>
                  <p className="text-xs text-rose-700 font-sans leading-relaxed">
                    Paying separate bills for Slack, Asana, HubSpot, TripleWhale, Frame.io, Stripe, and DashThis.
                  </p>
                  <div className="text-[11px] text-rose-600 font-sans font-semibold pt-1 border-t border-rose-200">
                    ⚠️ ~{hoursSavedWeekly} hours wasted every week chasing spreadsheets &amp; logins.
                  </div>
                </div>

                {/* DigiVigee Unified OS */}
                <div className="p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-500/60 space-y-3 font-mono shadow-sm">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-800 uppercase">
                    <span>DigiVigee Unified OS</span>
                    <span className="bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">All 20 Modules</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-800">
                    ${digivigeeMonthly.toLocaleString()} <span className="text-xs font-normal text-emerald-700">/ month</span>
                  </div>
                  <p className="text-xs text-emerald-800 font-sans leading-relaxed">
                    Everything included under your custom domain. One flat bill. Unlimited client access.
                  </p>
                  <div className="text-[11px] text-emerald-700 font-sans font-bold pt-1 border-t border-emerald-200 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>0 hours lost on busywork. Automated workflows.</span>
                  </div>
                </div>

              </div>

              {/* Bottom Net Annual Profit Recovery Badge */}
              <div className="mt-8 p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">NET RECOVERED ANNUAL PROFIT</div>
                  <div className="text-3xl font-black text-emerald-700 mt-0.5">
                    +${annualSavings.toLocaleString()} / year
                  </div>
                  <div className="text-xs text-slate-600 font-sans mt-0.5">
                    Plus ~{hoursSavedWeekly * 52} billable agency hours recovered annually.
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="group px-6 py-3 rounded-full bg-[#008744] hover:bg-[#007038] text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
                >
                  <span>Claim Your Savings</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            7. SPECIALIZED AGENCY BLUEPRINTS (Niche Workflows)
            ========================================================================= */}
        <section id="blueprints" className="py-20 sm:py-24 relative bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <FadeIn direction="up">
              <div className="max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-mono text-[11px] font-bold uppercase tracking-[0.14em] mb-4 shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>TAILORED AGENCY BLUEPRINTS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[1.12]">
                  Built for your exact agency business model.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-[1.65] max-w-2xl mx-auto font-normal">
                  Whether you run performance ads, create viral social video, rank local businesses, or offer full-service marketing.
                </p>
              </div>
            </FadeIn>

            {/* 4 Agency Blueprint Cards */}
            <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
              
              {/* Blueprint 1: Performance Ads */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-400">
                      <span>BLUEPRINT 01</span>
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">Ads &amp; ROAS</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-950">Paid Ads Agencies</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Stop budget overspends. Monitor Meta &amp; Google spend live and prove blended ROAS with automated weekly reporting.
                    </p>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-emerald-700 pt-2 border-t border-slate-100">
                    ✓ 0% Budget Overspend Guarantee
                  </div>
                </motion.div>
              </StaggerItem>

              {/* Blueprint 2: Creative & Social */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-400">
                      <span>BLUEPRINT 02</span>
                      <span className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded">Social &amp; Reels</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-950">Content &amp; Social Agencies</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Batch 30 days of TikToks &amp; Reels. Send 1-tap WhatsApp preview links to clients for 14-second sign-offs.
                    </p>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-pink-700 pt-2 border-t border-slate-100">
                    ✓ 14-Second Client Sign-Offs
                  </div>
                </motion.div>
              </StaggerItem>

              {/* Blueprint 3: Local SEO */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-400">
                      <span>BLUEPRINT 03</span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Maps &amp; Local</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-950">Local SEO Agencies</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Rank clients in Google Maps 3-Pack with 7x7 geo-grid heatmaps and automate 5-star review collection via SMS.
                    </p>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-blue-700 pt-2 border-t border-slate-100">
                    ✓ Google Maps #1 Dominance
                  </div>
                </motion.div>
              </StaggerItem>

              {/* Blueprint 4: Full Service */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-400">
                      <span>BLUEPRINT 04</span>
                      <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded">All-In-One</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-950">Full-Service Agencies</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Run lead pipelines, staff delivery hours, white-label client portals, and automated retainers under your custom domain.
                    </p>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-purple-700 pt-2 border-t border-slate-100">
                    ✓ 100% White-Label Portal
                  </div>
                </motion.div>
              </StaggerItem>

            </StaggerContainer>

          </div>
        </section>

        {/* =========================================================================
            8. VERIFIED SOCIAL PROOF & ENTERPRISE TRUST
            ========================================================================= */}
        <section id="proof" className="py-20 sm:py-24 relative bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <FadeIn direction="up">
              <div className="max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold uppercase tracking-[0.14em] mb-4 shadow-2xs">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>VERIFIED SOCIAL PROOF</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[1.12]">
                  Trusted by 420+ agencies managing $84M+ in ad spend.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-[1.65] max-w-2xl mx-auto font-normal">
                  Hear from agency founders who cut their software bills and stopped chasing client feedback.
                </p>
              </div>
            </FadeIn>

            {/* Testimonial Cards */}
            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left mb-12">
              
              {/* Testimonial 1 */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between h-full"
                >
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &ldquo;Before DigiVigee, our account managers spent 14 hours every Monday compiling spreadsheets across Meta and Google. Now spend pacing is live and our clients get WhatsApp alerts. We scaled from $45k to $180k MRR without hiring extra staff.&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0">
                      <Image src="/images/showcase/marcus_vance.jpg" alt="Marcus Vance" fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-950">Marcus Vance</div>
                      <div className="text-[10px] text-slate-500 font-medium">Founder &amp; CEO, Vance Digital</div>
                      <div className="text-[9px] font-mono text-emerald-700 font-bold">Saved 14 hrs/week</div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>

              {/* Testimonial 2 */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between h-full"
                >
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &ldquo;Getting client feedback on vertical video was a total nightmare of Slack pings and lost emails. DigiVigee&apos;s passwordless WhatsApp magic link changed everything. Clients tap &apos;Approve&apos; in under 15 seconds. Revision cycles dropped by 74%.&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500 shrink-0">
                      <Image src="/images/showcase/elena_rostova.jpg" alt="Elena Rostova" fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-950">Elena Rostova</div>
                      <div className="text-[10px] text-slate-500 font-medium">Managing Director, Prism Creative</div>
                      <div className="text-[9px] font-mono text-pink-700 font-bold">14s Video Approvals</div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>

              {/* Testimonial 3 */}
              <StaggerItem className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between h-full"
                >
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &ldquo;The 1st of the month used to be our biggest headache—chasing wire transfers and dealing with failed card invoices. With DigiVigee&apos;s direct Stripe auto-debit, retainers clear automatically at 12:01 AM. It paid for itself in 48 hours.&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shrink-0">
                      <Image src="/images/showcase/david_sterling.jpg" alt="David Sterling" fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-950">David Sterling</div>
                      <div className="text-[10px] text-slate-500 font-medium">COO, Apex Growth</div>
                      <div className="text-[9px] font-mono text-blue-700 font-bold">100% On-Time Retainers</div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>

            </StaggerContainer>

            {/* Clean Light Enterprise Metric Ribbon ($84.2M+, 420+, 14.2 hrs, 99.98%) */}
            <FadeIn direction="up">
              <div className="rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-2xs p-6 sm:p-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono">
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 tracking-tight">
                      <Counter to={84.2} prefix="$" suffix="M+" decimals={1} />
                    </div>
                    <div className="text-[11px] text-slate-600 uppercase tracking-wider font-bold">Ad Spend Managed</div>
                  </div>
                  <div className="space-y-1 sm:border-l border-slate-200/80">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 tracking-tight">
                      <Counter to={420} suffix="+" />
                    </div>
                    <div className="text-[11px] text-slate-600 uppercase tracking-wider font-bold">Verified Agency Partners</div>
                  </div>
                  <div className="space-y-1 border-t sm:border-t-0 md:border-l border-slate-200/80 pt-4 sm:pt-0">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-600 tracking-tight">
                      <Counter to={14.2} suffix=" hrs" decimals={1} />
                    </div>
                    <div className="text-[11px] text-slate-600 uppercase tracking-wider font-bold">Saved / Pod / Week</div>
                  </div>
                  <div className="space-y-1 border-t sm:border-t-0 md:border-l border-slate-200/80 pt-4 sm:pt-0">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 tracking-tight">
                      <Counter to={99.98} suffix="%" decimals={2} />
                    </div>
                    <div className="text-[11px] text-slate-600 uppercase tracking-wider font-bold">Retainer Collection Rate</div>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* =========================================================================
            9. INTEGRATIONS ECOSYSTEM
            ========================================================================= */}
        <Integrations />

        {/* =========================================================================
            10. HIGH-CONVERSION FINAL CALL TO ACTION LAUNCHPAD WITH 6 AWARD SHIELDS
            ========================================================================= */}
        <section className="py-20 sm:py-24 relative bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[36px] sm:rounded-[44px] bg-gradient-to-b from-white via-emerald-50/30 to-slate-50 border border-emerald-500/20 text-slate-900 text-center p-8 sm:p-14 lg:p-16 shadow-xl shadow-emerald-500/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,224,92,0.08),transparent_60%)] pointer-events-none" />

              <div className="relative max-w-4xl mx-auto z-10">
                <FadeIn direction="up">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200/90 shadow-sm inline-flex items-center hover:scale-105 transition-transform">
                      <Image
                        src="/images/digivigee_logo.png"
                        alt="DigiVigee OS"
                        width={138}
                        height={46}
                        className="h-8 sm:h-9 w-auto object-contain"
                      />
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] font-mono text-[11px] font-bold uppercase tracking-[0.14em] mb-4 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#008744]" />
                    <span>EXPERIENCE DIGIVIGEE OS</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[1.08]">
                    Scale faster than ever before.
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-[1.65] mt-4 mb-8 max-w-2xl mx-auto font-normal">
                    Eliminate tool sprawl and give your team the unified agency operating system trusted by 420+ agencies managing $84M+ in recurring retainers worldwide.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                    <Link
                      href="/dashboard"
                      className="group shimmer-sweep inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#008744] hover:bg-[#007038] shadow-lg shadow-emerald-600/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="relative z-10">Start Free 14-Day Trial</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform relative z-10" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-300/80 shadow-xs hover:border-slate-400 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Book a Guided Demo</span>
                    </Link>
                  </div>

                  <div className="text-[12px] text-slate-600 flex flex-wrap items-center justify-center gap-6 font-medium mb-10">
                    <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> 14-day free trial</span>
                    <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> No credit card required</span>
                    <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Instant 1-click workspace setup</span>
                  </div>
                </FadeIn>

                {/* 6 AUTHENTIC METALLIC AWARD SHIELDS (Exact 1:1 Homepage Standard) */}
                <div className="pt-8 border-t border-slate-200/70 grid grid-cols-3 sm:grid-cols-6 items-center justify-items-center gap-4 sm:gap-6 max-w-4xl mx-auto">
                  {/* Award 1 */}
                  <div title="G2 2026 Best Software Top 50" className="group cursor-pointer hover:scale-110 transition-all">
                    <div className="relative w-[70px] h-[88px] sm:w-[82px] sm:h-[102px] filter drop-shadow-sm group-hover:drop-shadow-md transition-all">
                      <Image src="/images/awards/g2_top50_trans.png" alt="G2 Best Software Top 50" fill sizes="90px" className="object-contain" />
                    </div>
                  </div>

                  {/* Award 2 */}
                  <div title="The 2026 AI Tech Awards Winner" className="group cursor-pointer hover:scale-110 transition-all">
                    <div className="relative w-[76px] h-[88px] sm:w-[88px] sm:h-[102px] filter drop-shadow-sm group-hover:drop-shadow-md transition-all">
                      <Image src="/images/awards/ai_tech_trans.png" alt="AI Tech Awards Winner" fill sizes="90px" className="object-contain" />
                    </div>
                  </div>

                  {/* Award 3 */}
                  <div title="Artificial Intelligence Excellence Award 2026" className="group cursor-pointer hover:scale-110 transition-all">
                    <div className="relative w-[72px] h-[88px] sm:w-[84px] sm:h-[102px] filter drop-shadow-sm group-hover:drop-shadow-md transition-all">
                      <Image src="/images/awards/ai_excellence_trans.png" alt="AI Excellence Award" fill sizes="90px" className="object-contain" />
                    </div>
                  </div>

                  {/* Award 4 */}
                  <div title="Capterra Best Value 2026" className="group cursor-pointer hover:scale-110 transition-all">
                    <div className="relative w-[72px] h-[88px] sm:w-[84px] sm:h-[102px] filter drop-shadow-sm group-hover:drop-shadow-md transition-all">
                      <Image src="/images/awards/capterra_trans.png" alt="Capterra Best Value" fill sizes="90px" className="object-contain" />
                    </div>
                  </div>

                  {/* Award 5 */}
                  <div title="TrustRadius Buyer's Choice 2026" className="group cursor-pointer hover:scale-110 transition-all">
                    <div className="relative w-[72px] h-[88px] sm:w-[84px] sm:h-[102px] filter drop-shadow-sm group-hover:drop-shadow-md transition-all">
                      <Image src="/images/awards/buyers_choice_trans.png" alt="TrustRadius Buyer's Choice" fill sizes="90px" className="object-contain" />
                    </div>
                  </div>

                  {/* Award 6 */}
                  <div title="Enterprise Security & Compliance Seals" className="group cursor-pointer hover:scale-110 transition-all">
                    <div className="relative w-[76px] h-[88px] sm:w-[88px] sm:h-[102px] filter drop-shadow-sm group-hover:drop-shadow-md transition-all">
                      <Image src="/images/awards/compliance_seals_trans.png" alt="Compliance Seals" fill sizes="90px" className="object-contain" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
