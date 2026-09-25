"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { LandingPage, LandingPageSection, LandingPageTheme, ReusableComponent } from "@/types/landingPage";
import { SectionRenderer } from "@/components/landing/SectionRenderer";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  RotateCcw,
  Save,
  ExternalLink,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle2,
  Zap,
  Layers,
  Palette,
  Sliders,
  MousePointerClick,
  Check,
  LayoutTemplate,
  Globe,
  Grid,
} from "lucide-react";

interface PresetBlock {
  type: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  createSection: () => LandingPageSection;
}

// 8 Clinical Practice Canonical Blocks matching Dr. Noopur Patel Practice
const PRESET_BLOCKS: PresetBlock[] = [
  {
    type: "hero",
    name: "Clinical Hero + Hospital Credentials",
    icon: "🌟",
    badge: "Clinical Care",
    description: "Rose accent badge, clinical credentials, dual consultation CTAs, and Marengo CIMS hospital accreditation.",
    createSection: () => ({
      id: `sec-hero-${Date.now()}`,
      type: "hero",
      order: 0,
      isVisible: true,
      content: {
        eyebrow: "Consultant Breast Surgeon & Surgical Oncologist",
        headline: "Compassionate, Advanced Breast Cancer Surgery in Ahmedabad",
        description:
          "Evidence-based oncoplastic breast conservation, sentinel lymph node biopsy, and personalized multidisciplinary cancer care at Marengo CIMS Hospital.",
        primaryCtaLabel: "Book OPD Consultation",
        primaryCtaTarget: "#lead-form",
        secondaryCtaLabel: "Explore Clinical Services",
        secondaryCtaTarget: "#features",
        logosHeading: "Affiliated with Leading Healthcare Institutions & Clinical Boards",
      },
      styling: {
        backgroundColor: "#ffffff",
        textColor: "#0f172a",
        paddingY: "xl",
      },
    }),
  },
  {
    type: "features",
    name: "Bento Role Pillars",
    icon: "💎",
    badge: "Homepage OS",
    description: "2x3 or 3x1 sleek bento cards with tag badges, bold titles, and checkmark tags.",
    createSection: () => ({
      id: `sec-features-${Date.now()}`,
      type: "features",
      order: 1,
      isVisible: true,
      content: {
        badge: "Agency Workflow Automation",
        sectionTitle: "Scale 10x retainers. Burn out 0 teams.",
        sectionSubtitle:
          "Stop wasting your best agency talent on manual reporting and fragmented spreadsheets that Digivigee AI handles in seconds.",
        features: [
          {
            tag: "Autonomous Ops",
            title: "Agency AI Agents",
            desc: "Build autonomous marketing workflows with Digivigee agents and let them handle campaign pacing, weekly reporting, and client follow-ups.",
          },
          {
            tag: "Revenue Intelligence",
            title: "Full-Funnel Attribution",
            desc: "Connect your media buying ad accounts directly with client CRM telemetry to prove bottom-line pipeline revenue.",
          },
          {
            tag: "Client Experience",
            title: "Live White-Label Portals",
            desc: "Give every enterprise client a branded real-time telemetry dashboard with custom domain and automatic exports.",
          },
        ],
      },
      styling: {
        backgroundColor: "#ffffff",
        textColor: "#0f172a",
        paddingY: "lg",
      },
    }),
  },
  {
    type: "services",
    name: "Growth Capabilities Suite",
    icon: "💼",
    badge: "Homepage OS",
    description: "Capability cards with modern icons, titles, deliverables checklist, and links.",
    createSection: () => ({
      id: `sec-services-${Date.now()}`,
      type: "services",
      order: 2,
      isVisible: true,
      content: {
        sectionTitle: "Enterprise Growth Capabilities",
        sectionSubtitle: "High-ROI digital acquisition engineered from ad impression to closed client deal.",
        services: [
          {
            icon: "🎯",
            title: "Performance Paid Search",
            desc: "Dominate Google & Bing commercial intent keywords with laser-targeted ad structures and real-time bid adjustments.",
          },
          {
            icon: "📱",
            title: "Social Direct Response",
            desc: "Scroll-stopping video UGC and lifestyle creatives that drastically lower your blended customer acquisition cost.",
          },
          {
            icon: "⚡",
            title: "Conversion Architecture",
            desc: "Ultra-fast Next.js landing funnels with frictionless multi-step lead capture forms designed to double conversion rates.",
          },
        ],
      },
      styling: {
        backgroundColor: "#f8fafc",
        textColor: "#0f172a",
        paddingY: "lg",
      },
    }),
  },
  {
    type: "statistics",
    name: "Homepage Proof Counter",
    icon: "📊",
    badge: "Homepage OS",
    description: "Glowing counter cards displaying verified enterprise scale (2,350+ Agencies, 99.8% Uptime).",
    createSection: () => ({
      id: `sec-stats-${Date.now()}`,
      type: "statistics",
      order: 3,
      isVisible: true,
      content: {
        stats: [
          { value: "2,350+", label: "Scaling Agencies" },
          { value: "₹4.5Cr+", label: "Client Pipeline Generated" },
          { value: "180%", label: "Average 90-Day Surge" },
          { value: "99.8%", label: "Platform Uptime" },
        ],
      },
      styling: {
        backgroundColor: "#047857",
        textColor: "#ffffff",
        paddingY: "lg",
      },
    }),
  },
  {
    type: "testimonials",
    name: "Dynamic Testimonials Wall",
    icon: "💬",
    badge: "Homepage OS",
    description: "Star ratings, verified client quote, author avatar badge, role, and company.",
    createSection: () => ({
      id: `sec-testi-${Date.now()}`,
      type: "testimonials",
      order: 4,
      isVisible: true,
      content: {
        quote:
          "DigiVigee transformed our customer acquisition economics. Inquiries surged by 180% within 90 days and CAC dropped by 42%.",
        author: "Rajesh Patel",
        role: "Managing Director, Kalpvruksh Group",
      },
      styling: {
        backgroundColor: "#ffffff",
        textColor: "#0f172a",
        paddingY: "lg",
      },
    }),
  },
  {
    type: "faq",
    name: "FAQ Objection Clearance",
    icon: "❓",
    badge: "Homepage OS",
    description: "Clean modern FAQ accordion resolving client purchase hesitations.",
    createSection: () => ({
      id: `sec-faq-${Date.now()}`,
      type: "faq",
      order: 5,
      isVisible: true,
      content: {
        sectionTitle: "Frequently Asked Questions",
        items: [
          {
            question: "How quickly do we see results from DigiVigee?",
            answer:
              "Most campaigns deliver measurable lead spikes and verified attribution data within the first 14 to 21 days of launching ad sprints.",
          },
          {
            question: "Do you require long-term lock-in contracts?",
            answer:
              "No. We operate on performance milestones and rolling monthly retainers because our results retain our partners.",
          },
          {
            question: "Can we use our own custom domain and branding?",
            answer:
              "Yes, full 100% white-label support is included for agency clients and enterprise portals.",
          },
        ],
      },
      styling: {
        backgroundColor: "#f8fafc",
        textColor: "#0f172a",
        paddingY: "lg",
      },
    }),
  },
  {
    type: "form",
    name: "Lead Capture Form",
    icon: "📋",
    badge: "Homepage OS",
    description: "Sleek inquiry form card with attribution tags and instant response guarantees.",
    createSection: () => ({
      id: `sec-form-${Date.now()}`,
      type: "form",
      order: 6,
      isVisible: true,
      content: {
        headline: "Claim Your Custom Marketing Growth Blueprint",
        subheadline:
          "Complete the inquiry form below to speak directly with an agency strategist within 24 hours.",
      },
      styling: {
        backgroundColor: "#ffffff",
        textColor: "#0f172a",
        paddingY: "xl",
      },
    }),
  },
  {
    type: "cta",
    name: "Final Conversion Banner",
    icon: "🚀",
    badge: "Homepage OS",
    description: "Deep emerald gradient card with award trust badges and high-urgency button.",
    createSection: () => ({
      id: `sec-cta-${Date.now()}`,
      type: "cta",
      order: 7,
      isVisible: true,
      content: {
        headline: "Ready to Scale Your Agency 10x With Zero Burnout?",
        subheadline: "Join 2,350+ ambitious brands and agency founders growing with DigiVigee today.",
        buttonLabel: "Claim Your Free Proposal Now",
        buttonTarget: "#lead-form",
      },
      styling: {
        backgroundColor: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
        textColor: "#ffffff",
        paddingY: "xl",
      },
    }),
  },
];

// Color & Gradient Palette Swatches
const COLOR_SWATCHES = [
  { name: "Navy", bg: "#0f172a", text: "#ffffff", desc: "Dark Executive" },
  { name: "Midnight", bg: "#0B132B", text: "#ffffff", desc: "Deep Midnight" },
  { name: "Emerald", bg: "#064e3b", text: "#ffffff", desc: "Agency Green" },
  { name: "Indigo", bg: "#1e1b4b", text: "#ffffff", desc: "Royal Indigo" },
  { name: "Charcoal", bg: "#18181B", text: "#ffffff", desc: "Dark Minimal" },
  { name: "Canvas", bg: "#F8FAFC", text: "#0f172a", desc: "Homepage Default" },
  { name: "Soft Ice", bg: "#F1F5F9", text: "#0f172a", desc: "Light Neutral" },
  { name: "White", bg: "#FFFFFF", text: "#0f172a", desc: "Pure White" },
];

const GRADIENT_PRESETS = [
  {
    name: "Dark Ambient Glow",
    value: "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.22) 0%, transparent 75%), #0f172a",
    textColor: "#ffffff",
  },
  {
    name: "Emerald Horizon",
    value: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
    textColor: "#ffffff",
  },
  {
    name: "Midnight Velvet",
    value: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
    textColor: "#ffffff",
  },
  {
    name: "Slate Aurora",
    value: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    textColor: "#ffffff",
  },
  {
    name: "Clean Light Grid",
    value: "#F8FAFC",
    textColor: "#0f172a",
  },
];

export default function LandingPageBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const pageId = resolvedParams.id;

  const [page, setPage] = useState<LandingPage | null>(null);
  const [sections, setSections] = useState<LandingPageSection[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [pageTheme, setPageTheme] = useState<LandingPageTheme>({
    pageBackground: "#F8FAFC",
    showAmbientGrid: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"blocks" | "editor" | "styling" | "reorder">("blocks");
  const [blockSource, setBlockSource] = useState<"presets" | "library">("presets");
  const [libraryComponents, setLibraryComponents] = useState<ReusableComponent[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Auto dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch Reusable Component Library for direct insertion
  useEffect(() => {
    async function fetchLibrary() {
      setIsLoadingLibrary(true);
      try {
        const res = await fetch("/api/admin/landing-pages/components");
        const data = await res.json();
        if (data.success && data.components) {
          setLibraryComponents(data.components);
        }
      } catch {
        // silent fallback
      } finally {
        setIsLoadingLibrary(false);
      }
    }
    fetchLibrary();
  }, []);

  // Load landing page on mount
  useEffect(() => {
    async function loadPage() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/admin/landing-pages/${pageId}`);
        const data = await res.json();
        const pageData = data.page || data.landingPage;
        if (data.success && pageData) {
          setPage(pageData);
          setPageTheme(pageData.theme || { pageBackground: "#F8FAFC", showAmbientGrid: true });
          const initialSections = Array.isArray(pageData.sections)
            ? [...pageData.sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            : [];
          setSections(initialSections);
          if (initialSections.length > 0) {
            setSelectedSectionId(initialSections[0].id);
          }
        } else {
          setToast({ message: data.error || "Failed to load landing page.", type: "error" });
        }
      } catch {
        setToast({ message: "Network error loading builder.", type: "error" });
      } finally {
        setIsLoading(false);
      }
    }
    loadPage();
  }, [pageId]);

  // Selected Section Object
  const selectedSection = sections.find((s) => s.id === selectedSectionId) || null;

  // Add block from Preset
  const handleAddBlock = (preset: PresetBlock) => {
    const newSec = preset.createSection();
    newSec.order = sections.length;
    setSections((prev) => [...prev, newSec]);
    setSelectedSectionId(newSec.id);
    setActiveTab("editor");
    setToast({ message: `Added "${preset.name}" section!`, type: "success" });
  };

  // Add block from Reusable Component Library (1-Click Page Copy)
  const handleAddReusableComponent = (comp: ReusableComponent) => {
    const newSec: LandingPageSection = {
      id: `sec-${comp.sectionType}-${Date.now()}`,
      type: comp.sectionType,
      order: sections.length,
      isVisible: true,
      content: JSON.parse(JSON.stringify(comp.sectionContent || {})),
      styling: comp.sectionStyling
        ? JSON.parse(JSON.stringify(comp.sectionStyling))
        : undefined,
    };
    setSections((prev) => [...prev, newSec]);
    setSelectedSectionId(newSec.id);
    setActiveTab("editor");
    setToast({
      message: `🌟 Inserted "${comp.name}" from Reusable Component Library!`,
      type: "success",
    });
  };

  // 1-Click Load Full Homepage OS Layout
  const handleLoadFullHomepageLayout = () => {
    const newSections = PRESET_BLOCKS.map((preset, idx) => {
      const sec = preset.createSection();
      sec.order = idx;
      return sec;
    });
    setSections(newSections);
    if (newSections.length > 0) {
      setSelectedSectionId(newSections[0].id);
    }
    setPageTheme({ pageBackground: "#F8FAFC", showAmbientGrid: true });
    setToast({
      message: "🌟 Full Homepage OS Layout Loaded (8 Canonical Sections)!",
      type: "success",
    });
  };

  // Move section
  const handleMoveSection = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    updated.forEach((s, idx) => {
      s.order = idx;
    });
    setSections(updated);
  };

  // Toggle Visibility
  const handleToggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s))
    );
  };

  // Delete Section
  const handleDeleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (selectedSectionId === id) {
      const remaining = sections.filter((s) => s.id !== id);
      setSelectedSectionId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Update Section Content Field (0ms keystroke sync)
  const updateContentField = (field: string, value: unknown) => {
    if (!selectedSectionId) return;
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== selectedSectionId) return s;
        return {
          ...s,
          content: {
            ...s.content,
            [field]: value,
          },
        };
      })
    );
  };

  // Update Section Styling Field
  const updateStylingField = (field: string, value: unknown) => {
    if (!selectedSectionId) return;
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== selectedSectionId) return s;
        return {
          ...s,
          styling: {
            ...(s.styling || {}),
            [field]: value,
          },
        };
      })
    );
  };

  // Save Page Changes
  const handleSave = async (publish: boolean = false) => {
    if (!page) return;
    setIsSaving(true);
    try {
      const nextStatus = publish ? "published" : page.status;
      const res = await fetch(`/api/admin/landing-pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sections,
          status: nextStatus,
          theme: pageTheme,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPage(data.landingPage);
        setToast({
          message: publish
            ? "🎉 Landing page published LIVE to the public!"
            : "All changes saved successfully!",
          type: "success",
        });
      } else {
        setToast({ message: data.error || "Save failed.", type: "error" });
      }
    } catch {
      setToast({ message: "Network error saving page.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // 1-Click Reset to Blueprint
  const handleResetToBlueprint = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/landing-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset-single",
          id: pageId,
        }),
      });
      const data = await res.json();
      if (data.success && data.landingPage) {
        setPage(data.landingPage);
        const resetSections = data.landingPage.sections || [];
        setSections(resetSections);
        setPageTheme(data.landingPage.theme || { pageBackground: "#F8FAFC", showAmbientGrid: true });
        if (resetSections.length > 0) {
          setSelectedSectionId(resetSections[0].id);
        }
        setIsResetModalOpen(false);
        setToast({
          message: "Canonical blueprint sections restored successfully!",
          type: "success",
        });
      } else {
        setToast({ message: data.error || "Reset failed.", type: "error" });
      }
    } catch {
      setToast({ message: "Network error resetting blueprint.", type: "error" });
    } finally {
      setIsResetting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
          Loading Visual Builder...
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Preparing 0ms live synchronization pipeline
        </p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 text-center">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Landing Page Not Found
        </h2>
        <p className="text-xs text-zinc-500 mb-4">
          The requested landing page ID does not exist.
        </p>
        <Link
          href="/admin/landing-pages"
          className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold"
        >
          Return to Landing Pages
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* 1. TOP BUILDER TOOLBAR */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 py-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-xs">
        {/* Left: Back & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/admin/landing-pages"
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
            title="Back to Landing Pages"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 truncate">
                {page.title}
              </h1>
              <span
                className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold ${
                  page.status === "published"
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                    : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                }`}
              >
                {page.status === "published" ? "Live" : "Draft"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
              <span className="truncate">/landing/{page.slug}</span>
            </div>
          </div>
        </div>

        {/* Center: Device Switcher & Live Sync Indicator */}
        <div className="hidden md:flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <Zap className="w-3 h-3 text-emerald-500" />
            <span>0ms Live Synced</span>
          </div>

          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/80 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewport === "desktop"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              title="Desktop View (Full Width)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport("tablet")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewport === "tablet"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewport === "mobile"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              title="Mobile Phone View (390px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Reset, View Live, Save & Publish */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
            title="Reset this page to its canonical blueprint"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Blueprint
          </button>

          <a
            href={`/landing/${page.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="View Public Page in New Tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Publish Live
          </button>
        </div>
      </header>

      {/* Floating Toast Feedback */}
      {toast && (
        <div
          className={`fixed top-14 right-6 z-[100] px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg border flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
            toast.type === "success"
              ? "bg-emerald-600 text-white border-emerald-500"
              : "bg-rose-600 text-white border-rose-500"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <span>⚠️</span>}
          <span>{toast.message}</span>
        </div>
      )}

      {/* 2. SPLIT WORKSPACE: LEFT EDITOR PANEL + RIGHT LIVE PREVIEW STAGE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: Controls, Block Tray, Section Editor & Colors Studio */}
        <aside className="w-full lg:w-[440px] xl:w-[480px] flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shrink-0 h-[calc(100vh-53px)] overflow-y-auto">
          {/* Navigation Subtabs */}
          <div className="sticky top-0 z-10 grid grid-cols-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-1.5 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("blocks")}
              className={`py-2 px-1 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === "blocks"
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              Blocks
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`py-2 px-1 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === "editor"
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Content
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("styling")}
              className={`py-2 px-1 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === "styling"
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Colors & BG
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reorder")}
              className={`py-2 px-1 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === "reorder"
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Stack ({sections.length})
            </button>
          </div>

          <div className="p-4 space-y-4 flex-1">
            {/* TAB 1: ADD BLOCKS (Includes 1-Click Homepage OS Layout) */}
            {activeTab === "blocks" && (
              <div className="space-y-3">
                {/* 1-Click Homepage Clone Button */}
                <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border-2 border-emerald-500/40 rounded-2xl shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      1-Click Homepage OS Clone
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                      8 Sections
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-900/80 dark:text-emerald-300/80 mb-3 leading-relaxed">
                    Instantly load the exact components, copy, badges, and layout of the DigiVigee Home Page.
                  </p>
                  <button
                    type="button"
                    onClick={handleLoadFullHomepageLayout}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <LayoutTemplate className="w-4 h-4" />
                    Load Full Homepage Layout Now
                  </button>
                </div>

                <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <button
                    type="button"
                    onClick={() => setBlockSource("presets")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      blockSource === "presets"
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Canonical Presets (8)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlockSource("library")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      blockSource === "library"
                        ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Component Library ({libraryComponents.length})
                  </button>
                </div>

                {blockSource === "presets" ? (
                  <div className="grid grid-cols-1 gap-2.5">
                    {PRESET_BLOCKS.map((preset) => (
                      <button
                        key={preset.type}
                        type="button"
                        onClick={() => handleAddBlock(preset)}
                        className="group flex items-start gap-3 p-3 text-left rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/80 dark:hover:border-emerald-500/80 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all cursor-pointer shadow-2xs"
                      >
                        <span className="text-2xl p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:scale-110 transition-transform shrink-0">
                          {preset.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {preset.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                              {preset.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                            {preset.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {isLoadingLibrary ? (
                      <div className="p-8 text-center text-xs text-zinc-400">
                        Loading library components...
                      </div>
                    ) : libraryComponents.length === 0 ? (
                      <div className="p-6 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-500">
                        No reusable components saved yet.
                      </div>
                    ) : (
                      libraryComponents.map((comp) => (
                        <div
                          key={comp.id}
                          className="group p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/80 hover:bg-emerald-50/10 dark:hover:bg-emerald-950/10 transition-all shadow-2xs flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                              {comp.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 shrink-0">
                              {comp.category}
                            </span>
                          </div>
                          {comp.description && (
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                              {comp.description}
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={() => handleAddReusableComponent(comp)}
                            className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-emerald-600 text-white dark:bg-zinc-100 dark:hover:bg-emerald-600 dark:text-zinc-900 dark:hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Insert Into Page
                          </button>
                        </div>
                      ))
                    )}

                    <div className="pt-2 text-center">
                      <Link
                        href="/admin/landing-pages/components"
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        Manage Master Component Library
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EDIT ACTIVE SECTION CONTENT */}
            {activeTab === "editor" && (
              <div>
                {!selectedSection ? (
                  <div className="p-8 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <MousePointerClick className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                    <h3 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      No Section Selected
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-1 max-w-xs mx-auto">
                      Click any section in the right preview or select one from the Stack tab to edit its text.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Active Section Header Bar */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                          Editing: {selectedSection.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleVisibility(selectedSection.id)}
                          className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                          title={selectedSection.isVisible ? "Hide Section" : "Show Section"}
                        >
                          {selectedSection.isVisible ? (
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSection(selectedSection.id)}
                          className="p-1 rounded text-rose-400 hover:text-rose-600 cursor-pointer"
                          title="Delete Section"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Specific Fields for Hero */}
                    {selectedSection.type === "hero" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Eyebrow Badge Text
                          </label>
                          <input
                            type="text"
                            value={String(selectedSection.content.eyebrow || "")}
                            onChange={(e) => updateContentField("eyebrow", e.target.value)}
                            placeholder="e.g. Enterprise Agency Growth OS"
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Main Headline *
                          </label>
                          <textarea
                            rows={2}
                            value={String(selectedSection.content.headline || "")}
                            onChange={(e) => updateContentField("headline", e.target.value)}
                            placeholder="e.g. Scale 10x Client Retainers. Burn Out 0 Teams."
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Value Proposition / Description
                          </label>
                          <textarea
                            rows={3}
                            value={String(selectedSection.content.description || "")}
                            onChange={(e) => updateContentField("description", e.target.value)}
                            placeholder="Subheadline detailing tangible results..."
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                              Primary Button Label
                            </label>
                            <input
                              type="text"
                              value={String(selectedSection.content.primaryCtaLabel || "")}
                              onChange={(e) => updateContentField("primaryCtaLabel", e.target.value)}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                              Primary Target Anchor
                            </label>
                            <input
                              type="text"
                              value={String(selectedSection.content.primaryCtaTarget || "")}
                              onChange={(e) => updateContentField("primaryCtaTarget", e.target.value)}
                              placeholder="#lead-form"
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Logos Ribbon Heading
                          </label>
                          <input
                            type="text"
                            value={String(selectedSection.content.logosHeading || "")}
                            onChange={(e) => updateContentField("logosHeading", e.target.value)}
                            placeholder="Trusted by 2,350+ Scaling Agencies & Enterprises"
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Specific Fields for Features / Bento */}
                    {selectedSection.type === "features" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Badge Pill
                          </label>
                          <input
                            type="text"
                            value={String(selectedSection.content.badge || "")}
                            onChange={(e) => updateContentField("badge", e.target.value)}
                            placeholder="Agency Workflow Automation"
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Section Headline
                          </label>
                          <input
                            type="text"
                            value={String(selectedSection.content.sectionTitle || "")}
                            onChange={(e) => updateContentField("sectionTitle", e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Section Subtitle
                          </label>
                          <input
                            type="text"
                            value={String(selectedSection.content.sectionSubtitle || "")}
                            onChange={(e) => updateContentField("sectionSubtitle", e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none"
                          />
                        </div>

                        {/* Feature items */}
                        <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                            Pillar Cards (3)
                          </span>
                          {(Array.isArray(selectedSection.content.features)
                            ? (selectedSection.content.features as Array<{ tag?: string; title: string; desc: string }>)
                            : []
                          ).map((feat, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-1.5"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={feat.tag || ""}
                                  placeholder="Tag (e.g. Autonomous Ops)"
                                  onChange={(e) => {
                                    const list = [
                                      ...(selectedSection.content.features as Array<{ tag?: string; title: string; desc: string }>),
                                    ];
                                    list[idx] = { ...list[idx], tag: e.target.value };
                                    updateContentField("features", list);
                                  }}
                                  className="w-1/3 px-2 py-1 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-semibold"
                                />
                                <input
                                  type="text"
                                  value={feat.title}
                                  placeholder="Pillar Title"
                                  onChange={(e) => {
                                    const list = [
                                      ...(selectedSection.content.features as Array<{ tag?: string; title: string; desc: string }>),
                                    ];
                                    list[idx] = { ...list[idx], title: e.target.value };
                                    updateContentField("features", list);
                                  }}
                                  className="w-2/3 px-2.5 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-bold"
                                />
                              </div>
                              <textarea
                                rows={2}
                                value={feat.desc}
                                placeholder="Pillar Description"
                                onChange={(e) => {
                                  const list = [
                                    ...(selectedSection.content.features as Array<{ tag?: string; title: string; desc: string }>),
                                  ];
                                  list[idx] = { ...list[idx], desc: e.target.value };
                                  updateContentField("features", list);
                                }}
                                className="w-full px-2.5 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 resize-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specific Fields for Statistics */}
                    {selectedSection.type === "statistics" && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                          Homepage Stat Metrics
                        </span>
                        {(Array.isArray(selectedSection.content.stats)
                          ? (selectedSection.content.stats as Array<{ value: string; label: string }>)
                          : []
                        ).map((st, idx) => (
                          <div key={idx} className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={st.value}
                              placeholder="e.g. 2,350+"
                              onChange={(e) => {
                                const list = [
                                  ...(selectedSection.content.stats as Array<{ value: string; label: string }>),
                                ];
                                list[idx] = { ...list[idx], value: e.target.value };
                                updateContentField("stats", list);
                              }}
                              className="px-2.5 py-1.5 text-xs font-bold rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                            />
                            <input
                              type="text"
                              value={st.label}
                              placeholder="e.g. Scaling Agencies"
                              onChange={(e) => {
                                const list = [
                                  ...(selectedSection.content.stats as Array<{ value: string; label: string }>),
                                ];
                                list[idx] = { ...list[idx], label: e.target.value };
                                updateContentField("stats", list);
                              }}
                              className="px-2.5 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Specific Fields for Testimonials */}
                    {selectedSection.type === "testimonials" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Client Testimonial Quote
                          </label>
                          <textarea
                            rows={3}
                            value={String(selectedSection.content.quote || "")}
                            onChange={(e) => updateContentField("quote", e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none resize-none italic"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                              Client Name
                            </label>
                            <input
                              type="text"
                              value={String(selectedSection.content.author || "")}
                              onChange={(e) => updateContentField("author", e.target.value)}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                              Role / Organization
                            </label>
                            <input
                              type="text"
                              value={String(selectedSection.content.role || "")}
                              onChange={(e) => updateContentField("role", e.target.value)}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Specific Fields for FAQ */}
                    {selectedSection.type === "faq" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            FAQ Section Title
                          </label>
                          <input
                            type="text"
                            value={String(selectedSection.content.sectionTitle || "")}
                            onChange={(e) => updateContentField("sectionTitle", e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none font-semibold"
                          />
                        </div>

                        <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                            Questions & Answers
                          </span>
                          {(Array.isArray(selectedSection.content.items)
                            ? (selectedSection.content.items as Array<{ question: string; answer: string }>)
                            : []
                          ).map((item, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-1.5"
                            >
                              <input
                                type="text"
                                value={item.question}
                                placeholder="Question"
                                onChange={(e) => {
                                  const list = [
                                    ...(selectedSection.content.items as Array<{ question: string; answer: string }>),
                                  ];
                                  list[idx] = { ...list[idx], question: e.target.value };
                                  updateContentField("items", list);
                                }}
                                className="w-full px-2.5 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-bold"
                              />
                              <textarea
                                rows={2}
                                value={item.answer}
                                placeholder="Answer"
                                onChange={(e) => {
                                  const list = [
                                    ...(selectedSection.content.items as Array<{ question: string; answer: string }>),
                                  ];
                                  list[idx] = { ...list[idx], answer: e.target.value };
                                  updateContentField("items", list);
                                }}
                                className="w-full px-2.5 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 resize-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specific Fields for Lead Form */}
                    {selectedSection.type === "form" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Form Headline
                          </label>
                          <input
                            type="text"
                            value={String(selectedSection.content.headline || "")}
                            onChange={(e) => updateContentField("headline", e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Form Subtitle
                          </label>
                          <textarea
                            rows={2}
                            value={String(selectedSection.content.subheadline || "")}
                            onChange={(e) => updateContentField("subheadline", e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Specific Fields for Final CTA Banner */}
                    {selectedSection.type === "cta" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            CTA Banner Headline
                          </label>
                          <input
                            type="text"
                            value={String(selectedSection.content.headline || "")}
                            onChange={(e) => updateContentField("headline", e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            CTA Subheadline
                          </label>
                          <textarea
                            rows={2}
                            value={String(selectedSection.content.subheadline || "")}
                            onChange={(e) => updateContentField("subheadline", e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                              Button Label
                            </label>
                            <input
                              type="text"
                              value={String(selectedSection.content.buttonLabel || "")}
                              onChange={(e) => updateContentField("buttonLabel", e.target.value)}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                              Target Anchor
                            </label>
                            <input
                              type="text"
                              value={String(selectedSection.content.buttonTarget || "")}
                              onChange={(e) => updateContentField("buttonTarget", e.target.value)}
                              placeholder="#lead-form"
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: COLORS & BACKGROUND STUDIO (Section-Level + Global Canvas) */}
            {activeTab === "styling" && (
              <div className="space-y-5">
                {/* 1. Global Page Background Canvas Setting */}
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      Global Page Canvas
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {pageTheme.pageBackground || "#F8FAFC"}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Set the overall background color of the entire landing page.
                  </p>

                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { name: "Homepage Canvas", bg: "#F8FAFC", text: "#0f172a" },
                      { name: "Pure White", bg: "#FFFFFF", text: "#0f172a" },
                      { name: "Dark Navy", bg: "#0f172a", text: "#ffffff" },
                      { name: "Deep Midnight", bg: "#0B132B", text: "#ffffff" },
                    ].map((theme) => {
                      const isSelected = (pageTheme.pageBackground || "#F8FAFC") === theme.bg;
                      return (
                        <button
                          key={theme.name}
                          type="button"
                          onClick={() => setPageTheme({ ...pageTheme, pageBackground: theme.bg })}
                          className={`p-2 rounded-xl border text-[10px] font-bold text-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                              : "border-zinc-200 dark:border-zinc-700"
                          }`}
                          style={{ backgroundColor: theme.bg, color: theme.text }}
                        >
                          {theme.name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="color"
                      value={pageTheme.pageBackground?.startsWith("#") ? pageTheme.pageBackground : "#F8FAFC"}
                      onChange={(e) => setPageTheme({ ...pageTheme, pageBackground: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-zinc-300 cursor-pointer p-0.5 bg-transparent"
                    />
                    <input
                      type="text"
                      value={pageTheme.pageBackground || "#F8FAFC"}
                      onChange={(e) => setPageTheme({ ...pageTheme, pageBackground: e.target.value })}
                      placeholder="#F8FAFC"
                      className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700/60">
                    <input
                      type="checkbox"
                      id="ambient-grid-toggle"
                      checked={pageTheme.showAmbientGrid !== false}
                      onChange={(e) => setPageTheme({ ...pageTheme, showAmbientGrid: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                    />
                    <label htmlFor="ambient-grid-toggle" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Show Homepage Ambient Spotlight Grid
                    </label>
                  </div>
                </div>

                {/* 2. Active Section Background & Colors */}
                {!selectedSection ? (
                  <div className="p-6 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-500">
                    Select a section to customize its background and text colors.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-emerald-600" />
                        Active Section Background: {selectedSection.type}
                      </span>
                    </div>

                    {/* Quick Swatches */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Quick Swatches
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {COLOR_SWATCHES.map((swatch) => {
                          const isSelected =
                            (selectedSection.styling?.backgroundColor || "#ffffff") === swatch.bg;
                          return (
                            <button
                              key={swatch.name}
                              type="button"
                              onClick={() => {
                                updateStylingField("backgroundColor", swatch.bg);
                                updateStylingField("textColor", swatch.text);
                              }}
                              className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                                isSelected
                                  ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs scale-105"
                                  : "border-zinc-200 dark:border-zinc-700"
                              }`}
                              style={{ backgroundColor: swatch.bg, color: swatch.text }}
                            >
                              <span>{swatch.name}</span>
                              {isSelected && <Check className="w-3 h-3 mt-0.5" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Gradient Presets */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Gradient Backgrounds
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {GRADIENT_PRESETS.map((grad) => {
                          const isSelected = selectedSection.styling?.backgroundColor === grad.value;
                          return (
                            <button
                              key={grad.name}
                              type="button"
                              onClick={() => {
                                updateStylingField("backgroundColor", grad.value);
                                updateStylingField("textColor", grad.textColor);
                              }}
                              className={`p-2.5 rounded-xl border text-[10px] font-bold text-center transition-all cursor-pointer ${
                                isSelected
                                  ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                                  : "border-zinc-200 dark:border-zinc-700"
                              }`}
                              style={{
                                background: grad.value,
                                color: grad.textColor,
                              }}
                            >
                              {grad.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Color Wheel & Hex Input */}
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Custom Color Picker (Hex)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={
                            selectedSection.styling?.backgroundColor?.startsWith("#")
                              ? selectedSection.styling.backgroundColor
                              : "#0f172a"
                          }
                          onChange={(e) => updateStylingField("backgroundColor", e.target.value)}
                          className="w-9 h-9 rounded-xl border border-zinc-300 cursor-pointer p-0.5 bg-transparent"
                        />
                        <input
                          type="text"
                          value={selectedSection.styling?.backgroundColor || ""}
                          onChange={(e) => updateStylingField("backgroundColor", e.target.value)}
                          placeholder="e.g. #0f172a or linear-gradient(...)"
                          className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                        />
                      </div>
                    </div>

                    {/* Text Color Picker */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Text Contrast Color
                      </label>
                      <div className="flex items-center gap-2">
                        {[
                          { label: "White", val: "#ffffff" },
                          { label: "Navy", val: "#0f172a" },
                          { label: "Slate", val: "#475569" },
                        ].map((txt) => (
                          <button
                            key={txt.label}
                            type="button"
                            onClick={() => updateStylingField("textColor", txt.val)}
                            className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                              selectedSection.styling?.textColor === txt.val
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700"
                                : "border-zinc-200 dark:border-zinc-700"
                            }`}
                          >
                            {txt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vertical Padding */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Vertical Spacing (Padding)
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(["sm", "md", "lg", "xl"] as const).map((pad) => (
                          <button
                            key={pad}
                            type="button"
                            onClick={() => updateStylingField("paddingY", pad)}
                            className={`py-1.5 text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                              (selectedSection.styling?.paddingY || "md") === pad
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700"
                                : "border-zinc-200 dark:border-zinc-700"
                            }`}
                          >
                            {pad}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SECTION STACK & REORDER */}
            {activeTab === "reorder" && (
              <div className="space-y-2">
                <div className="text-xs text-zinc-500 mb-2">
                  Drag or use arrows to rearrange the vertical flow of sections.
                </div>

                {sections.map((section, idx) => {
                  const isSelected = section.id === selectedSectionId;
                  return (
                    <div
                      key={section.id}
                      onClick={() => {
                        setSelectedSectionId(section.id);
                        setActiveTab("editor");
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-xs"
                          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 text-center text-xs font-mono font-bold text-zinc-400">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 capitalize truncate">
                            {section.type}
                          </div>
                          <div className="text-[10px] text-zinc-400 truncate">
                            {String(section.content.headline || section.content.sectionTitle || "") ||
                              "Section"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveSection(idx, -1);
                          }}
                          disabled={idx === 0}
                          className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveSection(idx, 1);
                          }}
                          disabled={idx === sections.length - 1}
                          className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleVisibility(section.id);
                          }}
                          className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                        >
                          {section.isVisible ? (
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSection(section.id);
                          }}
                          className="p-1 text-rose-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT COLUMN: REAL-TIME PUBLIC LANDING PAGE STAGE */}
        <main className="flex-1 bg-zinc-200/70 dark:bg-zinc-950 p-3 sm:p-6 overflow-y-auto flex flex-col items-center">
          <div
            className={`w-full transition-all duration-300 ${
              viewport === "desktop"
                ? "max-w-6xl"
                : viewport === "tablet"
                ? "max-w-[768px] border-x border-zinc-300 dark:border-zinc-800 shadow-2xl rounded-2xl overflow-hidden bg-white"
                : "max-w-[390px] border-[10px] border-zinc-900 rounded-[44px] shadow-2xl overflow-hidden bg-white"
            }`}
          >
            {/* Live Interactive Page Mockup with Custom Page Background Canvas */}
            <div
              className="min-h-screen text-slate-900 shadow-sm relative"
              style={{
                background: pageTheme.pageBackground || "#F8FAFC",
              }}
            >
              {/* Quiet Top Public Header */}
              <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    DV
                  </div>
                  <span className="font-black text-sm tracking-tight text-slate-900">
                    DigiVigee
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="#lead-form"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs"
                  >
                    {page.cta?.primaryCtaLabel || "Get Free Proposal"}
                  </a>
                </div>
              </div>

              {/* Render Sections with 0ms Live Sync */}
              {sections.length === 0 ? (
                <div className="p-20 text-center text-slate-400">
                  <Sparkles className="w-10 h-10 mx-auto mb-3 text-emerald-500 opacity-60" />
                  <h3 className="text-base font-bold text-slate-700">Canvas is Empty</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Click any preset in the left panel to begin building your landing page.
                  </p>
                </div>
              ) : (
                sections.map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => {
                      setSelectedSectionId(sec.id);
                      setActiveTab("editor");
                    }}
                    className={`relative transition-all ${
                      sec.id === selectedSectionId
                        ? "ring-3 ring-emerald-500 ring-offset-2 z-10"
                        : "hover:outline-dashed hover:outline-2 hover:outline-emerald-400/60"
                    }`}
                  >
                    <SectionRenderer section={sec} isBuilder={false} />
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* 3. CONFIRM RESET TO BLUEPRINT MODAL */}
      <ConfirmDialog
        isOpen={isResetModalOpen}
        title="Reset to Blueprint Defaults?"
        message="This will restore the canonical sections and high-converting copy of this blueprint. Any uncommitted layout changes will be reset."
        confirmLabel={isResetting ? "Restoring..." : "Yes, Restore Blueprint"}
        isDestructive={false}
        isLoading={isResetting}
        onConfirm={handleResetToBlueprint}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
