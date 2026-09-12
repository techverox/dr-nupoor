"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Users,
  Building2,
  ShieldCheck,
  Kanban,
  Target,
  FileText,
  Globe,
  Search,
  MapPin,
  Share2,
  Filter,
  CheckCircle2,
  FolderLock,
  BarChart3,
  Cpu,
  Zap,
  UserCheck,
  CreditCard,
  Sparkles,
  ArrowRight,
  Lock,
  Headphones,
  Check,
} from "lucide-react";

export default function EcosystemArchitecture() {
  const [activeCategory, setActiveCategory] = useState<"all" | "operations" | "marketing" | "automation">("all");

  const modules = [
    {
      id: 1,
      name: "CRM & Sales",
      category: "operations",
      color: "emerald",
      icon: Users,
      badge: "CORE CRM",
      features: [
        "Leads & Contact Management",
        "Visual Sales Pipeline & Deals",
        "Automated Follow-ups & Reminders",
        "Notes, Activities & Lead Sources",
      ],
    },
    {
      id: 2,
      name: "Client Onboarding",
      category: "operations",
      color: "emerald",
      icon: UserCheck,
      badge: "WORKFLOW",
      features: [
        "Automated Onboarding Forms",
        "Secure Access & Credential Vault",
        "Brand Assets & Competitor Setup",
        "Client Goals & SLA Milestones",
      ],
    },
    {
      id: 3,
      name: "Projects & Tasks",
      category: "operations",
      color: "blue",
      icon: Kanban,
      badge: "AGILE DELIVERY",
      features: [
        "Kanban, List & Timeline Views",
        "Task Delegation & Assignments",
        "Deadlines, Checklists & Sprints",
        "Optional Team Time Tracking",
      ],
    },
    {
      id: 4,
      name: "Campaign Management",
      category: "marketing",
      color: "cyan",
      icon: Target,
      badge: "PAID ADS",
      features: [
        "Multi-Channel Campaign Creation",
        "Audience & Objective Targeting",
        "Budget Pacing & Timeline Control",
        "Cross-Platform Ad Performance",
      ],
    },
    {
      id: 5,
      name: "Content & Blogs",
      category: "marketing",
      color: "purple",
      icon: FileText,
      badge: "EDITORIAL",
      features: [
        "Multi-Client Blog CMS",
        "SEO Optimization & Keyword Density",
        "Rich Visual Content Editor",
        "Version History & Auto Publishing",
      ],
    },
    {
      id: 6,
      name: "Website CMS",
      category: "marketing",
      color: "cyan",
      icon: Globe,
      badge: "NO-CODE BUILDER",
      features: [
        "Visual Drag & Drop Page Builder",
        "Custom Menus & Navigation",
        "Global Headers & Footers",
        "Technical SEO & OpenGraph Meta",
      ],
    },
    {
      id: 7,
      name: "SEO Management",
      category: "marketing",
      color: "emerald",
      icon: Search,
      badge: "ORGANIC SUITE",
      features: [
        "Real-Time Keyword Rank Tracking",
        "Comprehensive On-Page Audits",
        "Technical Health & Core Web Vitals",
        "Backlink Profile Monitoring",
      ],
    },
    {
      id: 8,
      name: "Google Business Profile",
      category: "marketing",
      color: "amber",
      icon: MapPin,
      badge: "LOCAL SEO",
      features: [
        "Direct Google Business API Sync",
        "Audit & Health Optimization Score",
        "Automated Local Post Management",
        "Customer Review Sync & Replies",
      ],
    },
    {
      id: 9,
      name: "Social Media Hub",
      category: "marketing",
      color: "purple",
      icon: Share2,
      badge: "MULTI-CHANNEL",
      features: [
        "Unified Multi-Network Composer",
        "Interactive Visual Calendar View",
        "Queue & Scheduled Automated Posts",
        "Omni-Channel Engagement Analytics",
      ],
    },
    {
      id: 10,
      name: "Leads & Forms",
      category: "marketing",
      color: "emerald",
      icon: Filter,
      badge: "INBOUND FUNNELS",
      features: [
        "High-Converting Lead Capture Forms",
        "Dynamic Landing Page Engine",
        "Auto Lead Routing & Scoring",
        "WhatsApp & Email Auto-Sync",
      ],
    },
    {
      id: 11,
      name: "Client Approval Portal",
      category: "operations",
      color: "cyan",
      icon: CheckCircle2,
      badge: "WHITE-LABEL",
      features: [
        "One-Click Content & Ad Approvals",
        "Timestamped Request Changes",
        "Client Comments & Threaded Notes",
        "Complete Version History Tracking",
      ],
    },
    {
      id: 12,
      name: "Files & Assets Library",
      category: "operations",
      color: "amber",
      icon: FolderLock,
      badge: "MEDIA VAULT",
      features: [
        "Client-Specific Media Libraries",
        "Brand Kits (Logos, Colors, Fonts)",
        "Contract & Document Storage",
        "Reusable Template Management",
      ],
    },
    {
      id: 13,
      name: "Reports & Analytics",
      category: "marketing",
      color: "blue",
      icon: BarChart3,
      badge: "AUTOMATED BI",
      features: [
        "Automated White-Label Client Reports",
        "Unified Social, Ads & SEO Analytics",
        "Scheduled Weekly/Monthly PDF Emailing",
        "Custom KPI Executive Dashboards",
      ],
    },
    {
      id: 14,
      name: "AI Marketing Copilot",
      category: "automation",
      color: "cyan",
      icon: Cpu,
      badge: "GENERATIVE AI",
      features: [
        "AI Ad Copy & Caption Generator",
        "Algorithmic SEO Strategy Ideas",
        "Competitor Gap & Keyword Insights",
        "Intelligent Campaign Recommendations",
      ],
    },
    {
      id: 15,
      name: "Automation Engine",
      category: "automation",
      color: "emerald",
      icon: Zap,
      badge: "NO-CODE LOGIC",
      features: [
        "Multi-Step Visual Workflow Builder",
        "Task Triggering upon Deal Stage Change",
        "Instant WhatsApp & Email Sequences",
        "Webhook & Zapier Bridge Connectors",
      ],
    },
    {
      id: 16,
      name: "Team & Roles (RBAC)",
      category: "operations",
      color: "emerald",
      icon: Users,
      badge: "SECURITY",
      features: [
        "Granular Role-Based Permissions",
        "Department-Wise Account Isolation",
        "Full Audit Logs & Activity History",
        "Multi-Account Member Access Control",
      ],
    },
    {
      id: 17,
      name: "Billing & Invoices",
      category: "operations",
      color: "blue",
      icon: CreditCard,
      badge: "FINANCE",
      features: [
        "Recurring Client Retainer Billing",
        "Professional Estimates & Quotes",
        "Stripe, PayPal & Razorpay Gateways",
        "Automated Overdue Payment Reminders",
      ],
    },
    {
      id: 18,
      name: "Subscriptions & Plans",
      category: "operations",
      color: "purple",
      icon: Sparkles,
      badge: "SAAS LICENSING",
      features: [
        "Multi-Tier Agency SaaS Packaging",
        "Usage Limits (Seats, Workspaces, Storage)",
        "Self-Serve Plan Upgrades & Add-ons",
        "Automated Renewal Invoicing",
      ],
    },
    {
      id: 19,
      name: "100% White Label",
      category: "operations",
      color: "cyan",
      icon: ShieldCheck,
      badge: "RESELLER READY",
      features: [
        "Custom Agency Domain (app.youragency.com)",
        "Custom Logo, Favicon & Color Theme",
        "Branded Client Portal Login Page",
        "White-Labeled Automated Client Reports",
      ],
    },
    {
      id: 20,
      name: "Support & Helpdesk",
      category: "operations",
      color: "emerald",
      icon: Headphones,
      badge: "CLIENT CARE",
      features: [
        "Internal & Client Ticket System",
        "Priority Tagging & SLA Routing",
        "Dedicated Agent Assignments",
        "Custom Agency Knowledge Base",
      ],
    },
  ];

  const filteredModules = activeCategory === "all"
    ? modules
    : modules.filter((m) => m.category === activeCategory);

  return (
    <section id="architecture" className="py-28 sm:py-36 bg-transparent text-white border-t border-white/[0.08] relative overflow-hidden">
      
      {/* Background Soft Glow Caustic Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-emerald-500/[0.05] via-cyan-500/[0.06] to-blue-600/[0.05] blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] backdrop-blur-md text-emerald-400 text-xs font-semibold shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>COMPLETE ECOSYSTEM ARCHITECTURE & RELATIONSHIP MODEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.02]">
            20 Connected Modules.<br />
            <span className="bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#2563eb] bg-clip-text text-transparent">
              One Unified Agency OS.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            Digivigee replaces 10+ disjointed SaaS subscriptions with an enterprise multi-tenant platform. Manage leads, client portals, ad campaigns, SEO, automated retainers, and white-label delivery in one place.
          </p>
        </div>

        {/* 1. Multi-Tenant Hierarchy Visual Card (From User Diagram) */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#06080c]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs uppercase tracking-wider font-bold text-white">
                  Multi-Tenant Hierarchy & Reseller Model
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                True enterprise multi-tenancy: Complete data, billing, and permission isolation per client.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium text-neutral-300 bg-white/[0.05] px-3 py-1 rounded-full border border-white/[0.08]">
                Isolated Data
              </span>
              <span className="text-[11px] font-medium text-neutral-300 bg-white/[0.05] px-3 py-1 rounded-full border border-white/[0.08]">
                Isolated Settings
              </span>
              <span className="text-[11px] font-medium text-neutral-300 bg-white/[0.05] px-3 py-1 rounded-full border border-white/[0.08]">
                Isolated Billing
              </span>
              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                100% White Label
              </span>
            </div>
          </div>

          {/* 3-Tier Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            
            {/* Level 1: Super Admin */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] relative group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  Level 1: Platform Core
                </span>
                <Lock className="w-3.5 h-3.5 text-neutral-500" />
              </div>
              <div className="text-sm font-bold text-white mb-1">Super Admin (Digivigee)</div>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
                Global infrastructure, agency account management, global pricing tiers, audit logs & system limits.
              </p>
              <div className="text-[10px] text-neutral-400 space-y-1">
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Global Security & Tenant Isolation</div>
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> System-wide Analytics</div>
              </div>
            </div>

            {/* Level 2: Agency Account */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-emerald-500/30 relative group hover:border-emerald-500/60 transition-all shadow-[0_0_20px_rgba(34,197,94,0.08)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Level 2: Your Agency
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-sm font-bold text-white mb-1">Agency / Reseller Workspace</div>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
                Your agency headquarters. Custom domain, custom brand colors, team assignments, and client billing.
              </p>
              <div className="text-[10px] text-neutral-400 space-y-1">
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Custom Domain (app.youragency.com)</div>
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Multi-Team Member RBAC</div>
              </div>
            </div>

            {/* Level 3: Client Workspaces */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] relative group hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                  Level 3: Client Tenants
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-sm font-bold text-white mb-1">Client Workspaces (1 ... N)</div>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
                Clients log into their private, branded portal to review campaigns, approve creatives, and pay invoices.
              </p>
              <div className="text-[10px] text-neutral-400 space-y-1">
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-cyan-400" /> Zero Cross-Client Data Leakage</div>
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-cyan-400" /> Branded Approval Workflows</div>
              </div>
            </div>

          </div>

        </div>

        {/* 2. Interactive Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-white text-black shadow-lg shadow-white/10"
                : "bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            All 20 Core Modules
          </button>
          <button
            onClick={() => setActiveCategory("operations")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "operations"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                : "bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            CRM, Clients & Operations (10)
          </button>
          <button
            onClick={() => setActiveCategory("marketing")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "marketing"
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                : "bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            Marketing, SEO & Campaigns (7)
          </button>
          <button
            onClick={() => setActiveCategory("automation")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "automation"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            AI & Automation Engine (3)
          </button>
        </div>

        {/* 3. The 20 Modules Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredModules.map((mod) => {
            const IconComp = mod.icon;
            return (
              <div
                key={mod.id}
                className="group p-5 rounded-2xl bg-[#080b12]/80 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.20] transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-[9.5px] font-mono font-bold tracking-wider uppercase text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                      {mod.badge}
                    </span>
                  </div>

                  <div className="text-[14.5px] font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {mod.id}. {mod.name}
                  </div>

                  <ul className="space-y-1.5 text-[11px] text-neutral-400">
                    {mod.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5 leading-snug">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] text-neutral-400 group-hover:text-neutral-200 transition-colors">
                  <span>Module {mod.id} of 20</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Infrastructure & Security Trust Footer */}
        <div className="mt-14 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Enterprise Cloud Architecture & Data Protection</div>
              <div className="text-[11px] text-neutral-400">
                Tenant-Wise Isolation, 2FA, RBAC Permissions, Redis In-Memory Speed & Continuous Encrypted Backups.
              </div>
            </div>
          </div>

          <Link
            href="#contact"
            className="shrink-0 px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#00c950] via-[#00a6ff] to-[#0070f3] hover:brightness-110 shadow-lg transition-all"
          >
            Start Free Agency Trial →
          </Link>
        </div>

      </div>
    </section>
  );
}
