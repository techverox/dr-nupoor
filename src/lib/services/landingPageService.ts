import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { revalidatePath } from "next/cache";
import {
  LandingPage,
  LandingPageSection,
  CreateLandingPageInput,
  UpdateLandingPageInput,
} from "@/types/landingPage";
import {
  validateLandingPageSlug,
  generateDuplicateSlug,
} from "@/lib/utils/slug";

export function revalidateLandingPages(slug?: string) {
  try {
    revalidatePath("/admin/landing-pages");
    revalidatePath("/landing/[slug]", "page");
    if (slug) {
      revalidatePath(`/landing/${slug}`);
    }
  } catch {
    // Gracefully ignore outside Next.js request context
  }
}

// 3 Canonical Homepage-Grade Blueprints
export const SEED_LANDING_PAGES: LandingPage[] = [
  {
    id: "lp-demo-1",
    title: "High-ROI Performance Marketing Blueprint",
    slug: "performance-marketing-blueprint",
    status: "published",
    templateId: "tpl-agency-lead-gen",
    sections: [
      {
        id: "sec-hero-1",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "High-Growth Acquisition Engine",
          headline: "Scale Your Qualified Inquiries with Performance Marketing",
          description:
            "Data-driven paid search, social campaigns, and conversion rate optimization engineered for tangible pipeline ROAS.",
          primaryCtaLabel: "Request Free Growth Audit",
          primaryCtaTarget: "#lead-form",
          secondaryCtaLabel: "Explore Capabilities",
          secondaryCtaTarget: "#features",
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#ffffff",
          paddingY: "xl",
        },
      },
      {
        id: "sec-features-1",
        type: "features",
        order: 1,
        isVisible: true,
        content: {
          sectionTitle: "Why Patients Trust Dr. Noopur Patel",
          sectionSubtitle: "Enterprise-grade digital acquisition infrastructure built for tangible ROI.",
          features: [
            {
              title: "Transparent Full-Funnel Attribution",
              desc: "Zero vanity metrics. Every rupee invested is tracked to qualified sales pipeline and closed revenue.",
            },
            {
              title: "Omnichannel Acquisition Funnels",
              desc: "Integrated Google Ads, Meta Ads, and LinkedIn campaign funnels that capture high-intent buyers.",
            },
            {
              title: "Continuous A/B Conversion Sprints",
              desc: "Rapid testing of creative angles, landing copy, and frictionless forms for constant CAC reduction.",
            },
          ],
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-services-1",
        type: "services",
        order: 2,
        isVisible: true,
        content: {
          sectionTitle: "Full-Funnel Growth Solutions",
          sectionSubtitle: "Engineered from ad impression to closed client deal.",
          services: [
            {
              icon: "🎯",
              title: "Google Search & Intent Capture",
              desc: "Dominate high-commercial intent keywords with tightly grouped ad sets and hyper-relevant landing funnels.",
            },
            {
              icon: "📱",
              title: "Meta & Instagram Direct Response",
              desc: "Scroll-stopping UGC and lifestyle creatives combined with lookalike and retargeting machine learning.",
            },
            {
              icon: "⚡",
              title: "Conversion Rate Optimization (CRO)",
              desc: "Frictionless form architectures, page speed optimization, and dynamic proof widgets to maximize lead capture.",
            },
          ],
        },
        styling: {
          backgroundColor: "#f8fafc",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-stats-1",
        type: "statistics",
        order: 3,
        isVisible: true,
        content: {
          stats: [
            { value: "3.8x", label: "Average Client ROAS" },
            { value: "+180%", label: "Pipeline Surge in 90 Days" },
            { value: "₹4.5Cr+", label: "Client Revenue Generated" },
            { value: "98.6%", label: "Partner Retention Rate" },
          ],
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#ffffff",
          paddingY: "lg",
        },
      },
      {
        id: "sec-testimonials-1",
        type: "testimonials",
        order: 4,
        isVisible: true,
        content: {
          quote:
            "Dr. Noopur Patel and her clinical team provided immense clarity, surgical expertise, and kindness throughout my treatment.",
          author: "Rajesh Patel",
          role: "Managing Director, Kalpvruksh Group",
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-faq-1",
        type: "faq",
        order: 5,
        isVisible: true,
        content: {
          sectionTitle: "Frequently Asked Questions",
          items: [
            {
              question: "How quickly can I schedule an in-clinic consultation?",
              answer:
                "Most campaigns deliver measurable lead spikes and verified attribution data within the first 14 to 21 days of launching ad sprints.",
            },
            {
              question: "Do you require long-term lock-in contracts?",
              answer:
                "No. We operate on performance milestones and rolling monthly retainers because our results retain our partners, not restrictive paperwork.",
            },
            {
              question: "How is lead quality verified?",
              answer:
                "We integrate directly with your CRM or spreadsheet to review disqualified leads weekly and feed negative signals back to the ad algorithms.",
            },
          ],
        },
        styling: {
          backgroundColor: "#f8fafc",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-form-1",
        type: "form",
        order: 6,
        isVisible: true,
        content: {
          headline: "Claim Your Custom Marketing Growth Blueprint",
          subheadline:
            "Complete the inquiry form below to speak directly with a senior agency growth strategist within 24 hours.",
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-footer-1",
        type: "footer",
        order: 7,
        isVisible: true,
        content: {
          copyrightText: "© 2026 Dr. Noopur Patel. Surgical Breast Oncology & Oncoplastic Care.",
          showLegalLinks: true,
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#94a3b8",
          paddingY: "sm",
        },
      },
    ],
    cta: {
      primaryCtaLabel: "Claim Your Free Audit",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
      secondaryCtaLabel: "WhatsApp Quick Chat",
      secondaryCtaType: "whatsapp",
      secondaryCtaTarget: "+919876543210",
    },
    form: {
      formTitle: "Get Your Custom Growth Strategy",
      formSubtitle: "No generic sales calls. You will receive an actionable campaign roadmap.",
      submitButtonText: "Send Inquiries Now",
      successMessage: "Thank you! An agency strategist will review your goals within 24 hours.",
      includePhone: true,
      includeRequirement: true,
      leadSourceTag: "landing-page:performance-marketing",
    },
    seo: {
      seoTitle: "Breast Cancer Surgery & Oncoplastic Care | Dr. Noopur Patel Ahmedabad",
      metaDescription:
        "Specialized breast cancer surgery and oncoplastic care by Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad.",
      keywords: ["performance marketing", "lead generation agency", "PPC audit"],
      noIndex: false,
    },
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-02-20T12:00:00Z",
    publishedAt: "2026-02-15T12:00:00Z",
  },
  {
    id: "lp-demo-2",
    title: "Enterprise Growth & Dedicated Marketing Retainers",
    slug: "agency-os-retainer-scale",
    status: "published",
    templateId: "tpl-agency-retainer",
    sections: [
      {
        id: "sec-hero-2",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Elite Growth Retainers",
          headline: "Your Complete In-House Growth Team at a Fraction of the Cost",
          description:
            "Dedicated strategists, copywriters, performance media buyers, and UI engineers delivering weekly growth sprints for your enterprise.",
          primaryCtaLabel: "Book Growth Discovery",
          primaryCtaTarget: "#lead-form",
          secondaryCtaLabel: "View Capabilities",
          secondaryCtaTarget: "#features",
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#ffffff",
          paddingY: "xl",
        },
      },
      {
        id: "sec-features-2",
        type: "features",
        order: 1,
        isVisible: true,
        content: {
          sectionTitle: "The Comprehensive Care Advantage",
          sectionSubtitle: "Why patients and families trust Dr. Noopur Patel for surgical breast oncology.",
          features: [
            {
              title: "Dedicated Pod Architecture",
              desc: "No junior account managers. You work directly with veteran media buyers, developers, and creatives.",
            },
            {
              title: "Weekly Sprint Cycles",
              desc: "Constant rapid deployment of creatives, landing experiments, and CRO tests without delays.",
            },
            {
              title: "Full Tech-Stack Integration",
              desc: "We align your CRM, Google Analytics 4, Meta Pixel CAPI, and lead follow-up automation end-to-end.",
            },
          ],
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-stats-2",
        type: "statistics",
        order: 2,
        isVisible: true,
        content: {
          stats: [
            { value: "14 Days", label: "Average Pod Onboarding" },
            { value: "24/7", label: "Direct Slack & WhatsApp Support" },
            { value: "45+", label: "Active Enterprises Scaled" },
            { value: "0 Days", label: "Lock-in Requirement" },
          ],
        },
        styling: {
          backgroundColor: "#047857",
          textColor: "#ffffff",
          paddingY: "lg",
        },
      },
      {
        id: "sec-testimonials-2",
        type: "testimonials",
        order: 3,
        isVisible: true,
        content: {
          quote:
            "Dr. Patel explained every surgical step with so much reassurance. Her skill in oncoplastic surgery preserved my natural breast contour.",
          author: "Sunil Mehta",
          role: "CEO, Apex Logistics & Retail",
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-faq-2",
        type: "faq",
        order: 4,
        isVisible: true,
        content: {
          sectionTitle: "Retainer Sprints & Onboarding FAQ",
          items: [
            {
              question: "What is included in the monthly retainer?",
              answer:
                "End-to-end media buying, creative asset design, landing page optimization, technical tracking, and bi-weekly strategic reviews.",
            },
            {
              question: "Can we upgrade or pause anytime?",
              answer:
                "Yes, you have full flexibility with 14 days notice before any monthly billing cycle.",
            },
          ],
        },
        styling: {
          backgroundColor: "#f8fafc",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-form-2",
        type: "form",
        order: 5,
        isVisible: true,
        content: {
          headline: "Schedule Your Retainer Discovery Call",
          subheadline: "Meet our senior strategists to discuss pipeline expansion and dedicated team allocation.",
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-footer-2",
        type: "footer",
        order: 6,
        isVisible: true,
        content: {
          copyrightText: "© 2026 Dr. Noopur Patel. Marengo CIMS Hospital, Ahmedabad.",
          showLegalLinks: true,
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#94a3b8",
          paddingY: "sm",
        },
      },
    ],
    cta: {
      primaryCtaLabel: "Book Growth Discovery",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    form: {
      formTitle: "Schedule Retainer Discovery Call",
      formSubtitle: "Meet our senior strategists to review pipeline expansion.",
      submitButtonText: "Book Discovery Session",
      includePhone: true,
      includeRequirement: true,
      leadSourceTag: "landing-page:agency-os-retainer",
    },
    seo: {
      seoTitle: "Patient Care Pathways & Oncology Care | Dr. Noopur Patel",
      metaDescription:
        "Dedicated marketing strategists and performance media buyers scaling ambitious businesses with weekly sprints.",
      noIndex: false,
    },
    createdAt: "2026-02-18T09:00:00Z",
    updatedAt: "2026-02-22T15:30:00Z",
    publishedAt: "2026-02-18T10:00:00Z",
  },
  {
    id: "lp-demo-3",
    title: "Local SEO & Google Maps Dominance Blueprint",
    slug: "local-seo-rank-architecture",
    status: "published",
    templateId: "tpl-local-business",
    sections: [
      {
        id: "sec-hero-3",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Local Business Growth",
          headline: "Dominate Local Search & Google Maps in Your Region",
          description:
            "Attract high-intent customers who are actively searching for your services in your immediate market.",
          primaryCtaLabel: "Claim Free Local Audit",
          primaryCtaTarget: "#lead-form",
          secondaryCtaLabel: "See Methodology",
          secondaryCtaTarget: "#features",
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#ffffff",
          paddingY: "xl",
        },
      },
      {
        id: "sec-features-3",
        type: "features",
        order: 1,
        isVisible: true,
        content: {
          sectionTitle: "Our Local Ranking Methodology",
          sectionSubtitle: "Hyper-targeted regional visibility that drives phone calls, walk-ins, and booked appointments.",
          features: [
            {
              title: "Google Business Profile Optimization",
              desc: "Complete geo-tagging, category alignment, and citation consistency across all regional directories.",
            },
            {
              title: "Localized Schema Markup",
              desc: "Structured data that signals verified physical address relevance to Google and Apple search engines.",
            },
            {
              title: "Reputation & Review Automation",
              desc: "Automated customer review flows to build an undeniable wall of authentic 5-star Google ratings.",
            },
          ],
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-stats-3",
        type: "statistics",
        order: 2,
        isVisible: true,
        content: {
          stats: [
            { value: "#1 Rank", label: "Target Map 3-Pack Rate" },
            { value: "+240%", label: "Direct Phone Inquiries" },
            { value: "15,000+", label: "Maps Direction Clicks" },
            { value: "60 Days", label: "Average Ramp Time" },
          ],
        },
        styling: {
          backgroundColor: "#1e293b",
          textColor: "#ffffff",
          paddingY: "lg",
        },
      },
      {
        id: "sec-testimonials-3",
        type: "testimonials",
        order: 3,
        isVisible: true,
        content: {
          quote:
            "The compassionate support and surgical expertise from Dr. Noopur Patel made our patient experience reassuring from day one.",
          author: "Dr. Ananya Sharma",
          role: "Clinical Director, Surat HealthCare",
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-faq-3",
        type: "faq",
        order: 4,
        isVisible: true,
        content: {
          sectionTitle: "Local SEO Questions Answered",
          items: [
            {
              question: "How does Local SEO differ from national SEO?",
              answer:
                "Local SEO targets localized intent, Google Map 3-Pack, regional citations, and nearby customer proximity searches.",
            },
            {
              question: "How long does it take to rank on Google Maps?",
              answer:
                "Most businesses see significant visibility improvements and phone call surges within 30 to 60 days.",
            },
          ],
        },
        styling: {
          backgroundColor: "#f8fafc",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-form-3",
        type: "form",
        order: 5,
        isVisible: true,
        content: {
          headline: "Request Your Comprehensive Local SEO Audit",
          subheadline: "Discover your current Google Maps ranking and immediate competitor gaps.",
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-footer-3",
        type: "footer",
        order: 6,
        isVisible: true,
        content: {
          copyrightText: "© 2026 Dr. Noopur Patel. All rights reserved.",
          showLegalLinks: true,
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#94a3b8",
          paddingY: "sm",
        },
      },
    ],
    cta: {
      primaryCtaLabel: "Audit My Local Search",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    form: {
      formTitle: "Free Local Search Visibility Report",
      formSubtitle: "Discover your current Google Maps ranking and immediate competitor gaps.",
      submitButtonText: "Get My Local Audit",
      leadSourceTag: "landing-page:local-seo",
      includePhone: true,
    },
    seo: {
      seoTitle: "Breast Screening & Consultation | Dr. Noopur Patel",
      metaDescription:
        "Comprehensive breast cancer screening, diagnostic evaluation, and gentle patient care in Ahmedabad.",
      noIndex: false,
    },
    createdAt: "2026-02-18T09:00:00Z",
    updatedAt: "2026-02-22T15:30:00Z",
    publishedAt: "2026-02-18T10:00:00Z",
  },
  {
    id: "lp-demo-homepage",
    title: "Dr. Noopur Patel Breast Care Overview",
    slug: "dr-noopur-patel-overview",
    status: "published",
    templateId: "tpl-agency-homepage",
    theme: {
      pageBackground: "#F8FAFC",
      showAmbientGrid: true,
    },
    sections: [
      {
        id: "sec-home-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Enterprise Agency Growth OS",
          headline: "Scale 10x Client Retainers. Burn Out 0 Teams.",
          description:
            "Compassionate, evidence-based breast cancer diagnosis, oncoplastic breast surgery, and dedicated survivorship care.",
          primaryCtaLabel: "Claim Your Free Proposal",
          primaryCtaTarget: "#lead-form",
          secondaryCtaLabel: "Explore Capabilities",
          secondaryCtaTarget: "#features",
          logosHeading: "Trusted by 2,350+ Scaling Agencies & Enterprises",
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#ffffff",
          paddingY: "xl",
        },
      },
      {
        id: "sec-home-features",
        type: "features",
        order: 1,
        isVisible: true,
        content: {
          badge: "Agency Workflow Automation",
          sectionTitle: "Scale 10x retainers. Burn out 0 teams.",
          sectionSubtitle: "Specialized surgical breast oncology and natural contour preservation at Marengo CIMS Hospital.",
          features: [
            {
              tag: "Autonomous Ops",
              title: "Agency AI Agents",
              desc: "Individualized treatment planning, gentle diagnostics, and dedicated follow-up care for every woman.",
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
      },
      {
        id: "sec-home-services",
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
      },
      {
        id: "sec-home-stats",
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
      },
      {
        id: "sec-home-testi",
        type: "testimonials",
        order: 4,
        isVisible: true,
        content: {
          quote:
            "Dr. Patel and her team provided gentle, reassuring guidance and excellent surgical care throughout my recovery.",
          author: "Rajesh Patel",
          role: "Managing Director, Kalpvruksh Group",
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "lg",
        },
      },
      {
        id: "sec-home-faq",
        type: "faq",
        order: 5,
        isVisible: true,
        content: {
          sectionTitle: "Frequently Asked Questions",
          items: [
            {
              question: "How quickly can I schedule an in-clinic consultation?",
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
      },
      {
        id: "sec-home-form",
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
      },
      {
        id: "sec-home-cta",
        type: "cta",
        order: 7,
        isVisible: true,
        content: {
          headline: "Ready to Scale Your Agency 10x With Zero Burnout?",
          subheadline: "Comprehensive breast health and oncology care tailored to your recovery.",
          buttonLabel: "Claim Your Free Proposal Now",
          buttonTarget: "#lead-form",
        },
        styling: {
          backgroundColor: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
          textColor: "#ffffff",
          paddingY: "xl",
        },
      },
      {
        id: "sec-home-footer",
        type: "footer",
        order: 8,
        isVisible: true,
        content: {
          copyrightText: "© 2026 Dr. Noopur Patel. All rights reserved.",
          showLegalLinks: true,
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#94a3b8",
          paddingY: "sm",
        },
      },
    ],
    cta: {
      primaryCtaLabel: "Claim Your Free Proposal",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
      secondaryCtaLabel: "Explore Capabilities",
      secondaryCtaType: "scroll_to_form",
      secondaryCtaTarget: "#features",
    },
    form: {
      formTitle: "Get Your Custom Growth Strategy",
      formSubtitle: "No generic sales calls. You will receive an actionable campaign roadmap.",
      submitButtonText: "Send Inquiries Now",
      successMessage: "Thank you! An agency strategist will review your goals within 24 hours.",
      includePhone: true,
      includeRequirement: true,
      leadSourceTag: "landing-page:homepage-os",
    },
    seo: {
      seoTitle: "Dr. Noopur Patel | Breast Cancer Surgeon | Ahmedabad",
      metaDescription:
        "Scale 10x client retainers with zero team burnout. Automated campaign pacing, live client telemetry, and cross-channel performance buying.",
      keywords: ["agency operating system", "performance marketing", "growth retainer"],
      noIndex: false,
    },
    createdAt: "2026-02-28T10:00:00Z",
    updatedAt: "2026-02-28T12:00:00Z",
    publishedAt: "2026-02-28T12:00:00Z",
  },
];

// Global persistent dev/runtime store for real-time mutations
const globalForLandingPages = globalThis as unknown as {
  _landingPagesStore?: LandingPage[];
};

function getRuntimeStore(): LandingPage[] {
  if (!globalForLandingPages._landingPagesStore) {
    globalForLandingPages._landingPagesStore = JSON.parse(JSON.stringify(SEED_LANDING_PAGES));
  }
  return globalForLandingPages._landingPagesStore!;
}

/**
 * Retrieves all landing pages for Admin management.
 */
export async function getAllLandingPagesAdmin(): Promise<LandingPage[]> {
  const adminDb = getAdminFirestore();

  if (!adminDb) {
    return getRuntimeStore();
  }

  try {
    const snap = await adminDb
      .collection(COLLECTIONS.LANDING_PAGES)
      .orderBy("updatedAt", "desc")
      .get();

    if (snap.empty) {
      return getRuntimeStore();
    }

    const pages = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<LandingPage, "id">),
    }));

    globalForLandingPages._landingPagesStore = pages;
    return pages;
  } catch (error) {
    console.warn("[getAllLandingPagesAdmin] Query fallback:", error);
    return getRuntimeStore();
  }
}

/**
 * Retrieves a single landing page by ID for admin editing and preview.
 */
export async function getLandingPageByIdAdmin(id: string): Promise<LandingPage | null> {
  const adminDb = getAdminFirestore();

  if (!adminDb) {
    return getRuntimeStore().find((p) => p.id === id) || null;
  }

  try {
    const doc = await adminDb.collection(COLLECTIONS.LANDING_PAGES).doc(id).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...(doc.data() as Omit<LandingPage, "id">),
      };
    }
  } catch (error) {
    console.warn("[getLandingPageByIdAdmin] Query error:", error);
  }

  return getRuntimeStore().find((p) => p.id === id) || null;
}

/**
 * Public resolver: Retrieves a landing page by slug ONLY if status is 'published'.
 * Ensures draft pages NEVER leak to the public.
 */
export async function getPublishedLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  const validation = validateLandingPageSlug(slug);
  if (!validation.isValid) {
    return null;
  }

  const normalizedSlug = validation.normalizedSlug;
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      const snap = await adminDb
        .collection(COLLECTIONS.LANDING_PAGES)
        .where("slug", "==", normalizedSlug)
        .where("status", "==", "published")
        .limit(1)
        .get();

      if (!snap.empty) {
        const doc = snap.docs[0];
        return {
          id: doc.id,
          ...(doc.data() as Omit<LandingPage, "id">),
        };
      }
    } catch (error) {
      console.warn("[getPublishedLandingPageBySlug] Query error:", error);
    }
  }

  // Check runtime store
  const match = getRuntimeStore().find(
    (p) => p.slug === normalizedSlug && p.status === "published"
  );
  return match || null;
}

/**
 * Checks whether a given slug is available or already used by another landing page.
 */
export async function checkSlugAvailability(
  slug: string,
  excludeId?: string
): Promise<{ isAvailable: boolean; error?: string; normalizedSlug: string }> {
  const validation = validateLandingPageSlug(slug);
  if (!validation.isValid) {
    return { isAvailable: false, error: validation.error, normalizedSlug: validation.normalizedSlug };
  }

  const normalizedSlug = validation.normalizedSlug;
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      const snap = await adminDb
        .collection(COLLECTIONS.LANDING_PAGES)
        .where("slug", "==", normalizedSlug)
        .get();

      const conflicting = snap.docs.find((d) => d.id !== excludeId);
      if (conflicting) {
        return {
          isAvailable: false,
          error: `Slug "${normalizedSlug}" is already in use by another landing page.`,
          normalizedSlug,
        };
      }
    } catch (error) {
      console.warn("[checkSlugAvailability] Firestore query error:", error);
    }
  }

  // Check in runtime store
  const seedConflict = getRuntimeStore().find(
    (p) => p.slug === normalizedSlug && p.id !== excludeId
  );
  if (seedConflict) {
    return {
      isAvailable: false,
      error: `Slug "${normalizedSlug}" is already in use by an existing landing page.`,
      normalizedSlug,
    };
  }

  return { isAvailable: true, normalizedSlug };
}

/**
 * Creates a new landing page document.
 */
export async function createLandingPage(input: CreateLandingPageInput): Promise<LandingPage> {
  const now = new Date().toISOString();

  if (!input.title || input.title.trim().length < 3) {
    throw new Error("Landing page title must be at least 3 characters long.");
  }

  const slugCheck = await checkSlugAvailability(input.slug);
  if (!slugCheck.isAvailable) {
    throw new Error(slugCheck.error || "Invalid or unavailable slug.");
  }

  const adminDb = getAdminFirestore();

  let initialSections = input.sections;
  if ((!initialSections || initialSections.length === 0) && input.templateId && input.templateId !== "blank" && adminDb) {
    try {
      const tplDoc = await adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).doc(input.templateId).get();
      if (tplDoc.exists && Array.isArray(tplDoc.data()?.sections)) {
        initialSections = (tplDoc.data()?.sections as LandingPageSection[]).map((sec, idx) => ({
          ...JSON.parse(JSON.stringify(sec)),
          id: `sec-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
          order: idx,
        }));
      }
    } catch (e) {
      console.warn("[createLandingPage] Could not load template sections:", e);
    }
  }

  const defaultSections: LandingPageSection[] = initialSections && initialSections.length > 0
    ? initialSections
    : [
        {
          id: `sec-${Date.now()}-hero`,
          type: "hero",
          order: 0,
          isVisible: true,
          content: {
            eyebrow: "Exclusive Growth Offer",
            headline: input.title,
            description: "Professional digital marketing strategy customized for your enterprise.",
            primaryCtaLabel: "Get Free Consultation",
            primaryCtaTarget: "#lead-form",
          },
          styling: {
            backgroundColor: "#0f172a",
            textColor: "#ffffff",
            paddingY: "xl",
          },
        },
        {
          id: `sec-${Date.now()}-features`,
          type: "features",
          order: 1,
          isVisible: true,
          content: {
            sectionTitle: "Why Choose Dr. Noopur Patel",
            sectionSubtitle: "Engineered for high conversion and tangible revenue growth.",
            features: [
              { title: "Proven ROI Methodology", desc: "Transparent tracking from click to contract." },
              { title: "Rapid Turnaround", desc: "Fast execution with agile weekly delivery cycles." },
              { title: "Dedicated Specialists", desc: "Direct collaboration with senior growth marketers." },
            ],
          },
        },
        {
          id: `sec-${Date.now()}-form`,
          type: "form",
          order: 2,
          isVisible: true,
          content: {
            headline: "Request Consultation",
            subheadline: "Enter your information below to speak with an expert.",
          },
        },
      ];

  const payload: Omit<LandingPage, "id"> = {
    title: input.title.trim(),
    slug: slugCheck.normalizedSlug,
    status: input.status || "draft",
    templateId: input.templateId || "blank",
    sections: defaultSections,
    cta: {
      primaryCtaLabel: input.cta?.primaryCtaLabel || "Get Started",
      primaryCtaType: input.cta?.primaryCtaType || "scroll_to_form",
      primaryCtaTarget: input.cta?.primaryCtaTarget || "#lead-form",
      secondaryCtaLabel: input.cta?.secondaryCtaLabel || "",
      secondaryCtaType: input.cta?.secondaryCtaType || "link",
      secondaryCtaTarget: input.cta?.secondaryCtaTarget || "",
    },
    form: {
      formTitle: input.form?.formTitle || "Inquire With Our Team",
      formSubtitle: input.form?.formSubtitle || "Complete the form below to receive actionable guidance.",
      submitButtonText: input.form?.submitButtonText || "Submit Inquiry",
      successMessage: input.form?.successMessage || "Thank you! We will reach out shortly.",
      redirectUrl: input.form?.redirectUrl || "",
      includePhone: input.form?.includePhone ?? true,
      includeRequirement: input.form?.includeRequirement ?? true,
      leadSourceTag: input.form?.leadSourceTag || `landing-page:${slugCheck.normalizedSlug}`,
    },
    seo: {
      seoTitle: input.seo?.seoTitle || input.title.trim(),
      metaDescription: input.seo?.metaDescription || `Discover specialized clinical care with Dr. Noopur Patel's ${input.title.trim()} services.`,
      canonicalUrl: input.seo?.canonicalUrl || "",
      ogTitle: input.seo?.ogTitle || input.title.trim(),
      ogDescription: input.seo?.ogDescription || "",
      ogImage: input.seo?.ogImage || "",
      keywords: input.seo?.keywords || [],
      noIndex: input.seo?.noIndex ?? false,
    },
    createdAt: now,
    updatedAt: now,
    publishedAt: input.status === "published" ? now : null,
  };

  if (adminDb) {
    const docRef = await adminDb.collection(COLLECTIONS.LANDING_PAGES).add(payload);
    const created = { id: docRef.id, ...payload };
    const store = getRuntimeStore();
    store.unshift(created);
    revalidateLandingPages(created.slug);
    return created;
  }

  const mockPage: LandingPage = {
    id: `lp-${Date.now()}`,
    ...payload,
  };
  const store = getRuntimeStore();
  store.unshift(mockPage);
  revalidateLandingPages(mockPage.slug);
  return mockPage;
}

/**
 * Updates an existing landing page document.
 */
export async function updateLandingPage(
  id: string,
  input: UpdateLandingPageInput
): Promise<LandingPage> {
  const existing = await getLandingPageByIdAdmin(id);
  if (!existing) {
    throw new Error(`Landing page with ID "${id}" was not found.`);
  }

  const now = new Date().toISOString();
  let updatedSlug = existing.slug;

  if (input.slug && input.slug !== existing.slug) {
    const slugCheck = await checkSlugAvailability(input.slug, id);
    if (!slugCheck.isAvailable) {
      throw new Error(slugCheck.error || "Slug is not available.");
    }
    updatedSlug = slugCheck.normalizedSlug;
  }

  const nextStatus = input.status || existing.status;
  const isPublishing = nextStatus === "published" && existing.status !== "published";

  const updatedPage: LandingPage = {
    ...existing,
    title: input.title !== undefined ? input.title.trim() : existing.title,
    slug: updatedSlug,
    status: nextStatus,
    templateId: input.templateId !== undefined ? input.templateId : existing.templateId,
    sections: input.sections !== undefined ? input.sections : existing.sections,
    cta: {
      ...existing.cta,
      ...(input.cta || {}),
    },
    form: {
      ...existing.form,
      ...(input.form || {}),
    },
    seo: {
      ...existing.seo,
      ...(input.seo || {}),
    },
    updatedAt: now,
    publishedAt: isPublishing ? now : (existing.publishedAt || null),
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    const payload = { ...updatedPage } as Partial<LandingPage>;
    delete payload.id;
    await adminDb.collection(COLLECTIONS.LANDING_PAGES).doc(id).set(payload, { merge: true });
  }

  const store = getRuntimeStore();
  const idx = store.findIndex((p) => p.id === id);
  if (idx !== -1) {
    store[idx] = updatedPage;
  }

  revalidateLandingPages(updatedPage.slug);
  if (existing.slug !== updatedPage.slug) {
    revalidateLandingPages(existing.slug);
  }

  return updatedPage;
}

/**
 * Toggles a landing page's publication status.
 */
export async function toggleLandingPagePublication(id: string): Promise<LandingPage> {
  const page = await getLandingPageByIdAdmin(id);
  if (!page) {
    throw new Error(`Landing page with ID "${id}" was not found.`);
  }

  const newStatus = page.status === "published" ? "draft" : "published";

  if (newStatus === "published") {
    if (!page.title || page.title.trim().length < 3) {
      throw new Error("Cannot publish a landing page without a valid title.");
    }
    const slugCheck = await checkSlugAvailability(page.slug, id);
    if (!slugCheck.isAvailable) {
      throw new Error(`Cannot publish page: ${slugCheck.error}`);
    }
  }

  return updateLandingPage(id, { status: newStatus });
}

/**
 * Duplicates an existing landing page safely into a new Draft page.
 */
export async function duplicateLandingPage(id: string): Promise<LandingPage> {
  const original = await getLandingPageByIdAdmin(id);
  if (!original) {
    throw new Error(`Cannot duplicate: Original page with ID "${id}" was not found.`);
  }

  const allPages = await getAllLandingPagesAdmin();
  const existingSlugs = allPages.map((p) => p.slug);

  const duplicateSlug = generateDuplicateSlug(original.slug, existingSlugs);
  const duplicateTitle = `${original.title} (Copy)`;
  const now = new Date().toISOString();

  const payload: Omit<LandingPage, "id"> = {
    title: duplicateTitle,
    slug: duplicateSlug,
    status: "draft",
    templateId: original.templateId,
    sections: JSON.parse(JSON.stringify(original.sections || [])),
    cta: JSON.parse(JSON.stringify(original.cta)),
    form: {
      ...JSON.parse(JSON.stringify(original.form)),
      leadSourceTag: `landing-page:${duplicateSlug}`,
    },
    seo: {
      ...JSON.parse(JSON.stringify(original.seo)),
      seoTitle: `${original.seo.seoTitle || original.title} (Copy)`,
    },
    duplicatedFromId: original.id,
    createdAt: now,
    updatedAt: now,
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    const docRef = await adminDb.collection(COLLECTIONS.LANDING_PAGES).add(payload);
    const duplicated = { id: docRef.id, ...payload };
    getRuntimeStore().unshift(duplicated);
    revalidateLandingPages(duplicated.slug);
    return duplicated;
  }

  const mockPage: LandingPage = {
    id: `lp-copy-${Date.now()}`,
    ...payload,
  };
  getRuntimeStore().unshift(mockPage);
  revalidateLandingPages(mockPage.slug);
  return mockPage;
}

/**
 * Deletes a landing page document safely.
 */
export async function deleteLandingPage(id: string): Promise<boolean> {
  const existing = await getLandingPageByIdAdmin(id);
  const adminDb = getAdminFirestore();

  if (adminDb) {
    const docRef = adminDb.collection(COLLECTIONS.LANDING_PAGES).doc(id);
    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.delete();
    }
  }

  const store = getRuntimeStore();
  const idx = store.findIndex((p) => p.id === id);
  if (idx !== -1) {
    store.splice(idx, 1);
  }

  if (existing) {
    revalidateLandingPages(existing.slug);
  } else {
    revalidateLandingPages();
  }

  return true;
}

/**
 * 1-Click "Reset to Defaults" for all Landing Pages.
 * Restores the 3 canonical homepage-grade blueprints.
 */
export async function resetLandingPagesToDefaults(): Promise<{ success: boolean; count: number }> {
  const adminDb = getAdminFirestore();
  const deepClonedDefaults = JSON.parse(JSON.stringify(SEED_LANDING_PAGES)) as LandingPage[];

  if (adminDb) {
    try {
      const snap = await adminDb.collection(COLLECTIONS.LANDING_PAGES).get();
      const batch = adminDb.batch();
      snap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      deepClonedDefaults.forEach((page) => {
        const { id, ...data } = page;
        const ref = adminDb.collection(COLLECTIONS.LANDING_PAGES).doc(id);
        batch.set(ref, data);
      });
      await batch.commit();
    } catch (e) {
      console.warn("[resetLandingPagesToDefaults] Firestore batch error:", e);
    }
  }

  // Update in-memory store
  globalForLandingPages._landingPagesStore = JSON.parse(JSON.stringify(SEED_LANDING_PAGES));

  revalidateLandingPages();
  deepClonedDefaults.forEach((p) => revalidateLandingPages(p.slug));

  return { success: true, count: deepClonedDefaults.length };
}

/**
 * Resets a single landing page's sections back to its matching canonical blueprint.
 */
export async function resetSingleLandingPageToBlueprint(pageId: string): Promise<LandingPage> {
  const existing = await getLandingPageByIdAdmin(pageId);
  if (!existing) {
    throw new Error(`Landing page "${pageId}" not found.`);
  }

  const matchingBlueprint =
    SEED_LANDING_PAGES.find(
      (b) => b.slug === existing.slug || b.templateId === existing.templateId || b.id === pageId
    ) || SEED_LANDING_PAGES[0];

  const updated = await updateLandingPage(pageId, {
    title: existing.title || matchingBlueprint.title,
    sections: JSON.parse(JSON.stringify(matchingBlueprint.sections)),
    cta: JSON.parse(JSON.stringify(matchingBlueprint.cta)),
    form: JSON.parse(JSON.stringify(matchingBlueprint.form)),
    seo: JSON.parse(JSON.stringify(matchingBlueprint.seo)),
  });

  return updated;
}
