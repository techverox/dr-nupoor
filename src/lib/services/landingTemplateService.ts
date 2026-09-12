import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import {
  LandingPage,
  LandingPageTemplate,
  CreateLandingPageTemplateInput,
  LandingPageSection,
} from "@/types/landingPage";
import { createLandingPage } from "@/lib/services/landingPageService";

// Pre-structured canonical starter templates matching DigiVigee 1:1
const SEED_LANDING_TEMPLATES: LandingPageTemplate[] = [
  {
    id: "tpl-homepage-os",
    name: "DigiVigee Agency Operating System (1:1 Homepage Clone)",
    description:
      "Exact 1:1 canonical replica of the DigiVigee homepage with 8 sections: Enterprise Hero + Logos Ribbon, Bento Role Pillars, Capabilities Suite, Proof Counter, Dual Split Testimonial Wall, Objection Clearance FAQ, Lead Form, and Final CTA Banner.",
    category: "Enterprise OS",
    badge: "Homepage Clone",
    tags: ["homepage", "agency-os", "full-funnel", "enterprise"],
    sections: [
      {
        id: "sec-os-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Enterprise Agency Growth OS",
          headline: "Scale 10x Client Retainers. Burn Out 0 Teams.",
          description:
            "Stop wasting your best agency talent on manual reporting and fragmented spreadsheets that Digivigee handles in seconds.",
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
        id: "sec-os-features",
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
              tag: "Speed & Scale",
              title: "Omnichannel Blueprints",
              desc: "Deploy pre-approved creative architectures across Meta, Google PMax, and LinkedIn in under 24 hours.",
            },
            {
              tag: "Team Health",
              title: "Zero Team Burnout",
              desc: "Automate repetitive data collation so senior strategists spend 100% of their energy driving creative strategy.",
            },
            {
              tag: "Client Retention",
              title: "Executive Proof Portals",
              desc: "Give clients real-time white-labeled dashboards that update 24/7 without manual CSV export.",
            },
            {
              tag: "Predictable Growth",
              title: "Scalable Agency Framework",
              desc: "Transform erratic monthly project income into high-margin, predictable recurring retainers.",
            },
          ],
        },
        styling: {
          backgroundColor: "#F8FAFC",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-services",
        type: "services",
        order: 2,
        isVisible: true,
        content: {
          sectionTitle: "Full-Funnel Growth Capabilities Suite",
          sectionSubtitle:
            "From top-of-funnel demand capture to retention systems, every capability is tuned for enterprise ROI.",
          services: [
            {
              icon: "🎯",
              title: "Performance Paid Media",
              desc: "High-ROAS acquisition across Meta Ads, Google Performance Max, and LinkedIn Ads.",
            },
            {
              icon: "⚡",
              title: "CRO & Funnel Engineering",
              desc: "Silicon Valley-grade landing pages and rigorous A/B experimentation engines.",
            },
            {
              icon: "📈",
              title: "SEO Scaling Engine",
              desc: "Topical authority blueprints and programmatic search dominance strategies.",
            },
            {
              icon: "💼",
              title: "B2B Outbound Lead Gen",
              desc: "Account-based prospecting and verified executive appointment scheduling.",
            },
            {
              icon: "🔄",
              title: "Lifecycle Marketing",
              desc: "Automated email sequences, SMS remarketing, and customer lifetime value expansion.",
            },
            {
              icon: "🤖",
              title: "AI Growth Automations",
              desc: "Custom Zapier, Make, and AI agents automating lead routing and performance digests.",
            },
          ],
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-statistics",
        type: "statistics",
        order: 3,
        isVisible: true,
        content: {
          stats: [
            { value: "2,350+", label: "Retainers Scaled" },
            { value: "$142M+", label: "Ad Spend Managed" },
            { value: "99.8%", label: "Client Retention" },
            { value: "3.8x", label: "Average ROAS Lift" },
          ],
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#ffffff",
          paddingY: "lg",
        },
      },
      {
        id: "sec-os-testimonials",
        type: "testimonials",
        order: 4,
        isVisible: true,
        content: {
          quote:
            "DigiVigee completely restructured our acquisition pipeline. We achieved a 3.4x lift in qualified inbound enterprise inquiries within 90 days while reducing our blended customer acquisition cost by 42%.",
          author: "Rajesh Patel",
          role: "Managing Director, Kalpvruksh Group",
        },
        styling: {
          backgroundColor: "#F8FAFC",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-faq",
        type: "faq",
        order: 5,
        isVisible: true,
        content: {
          sectionTitle: "Frequently Asked Questions",
          items: [
            {
              question: "How quickly can we launch our first campaign sprint?",
              answer:
                "Typically within 5 to 7 business days following our initial technical tracking audit and creative blueprint signoff.",
            },
            {
              question: "What monthly ad spend budgets do you work with?",
              answer:
                "We manage campaigns across a broad spectrum, from high-growth businesses spending $3,000/mo to large enterprise accounts deploying $100k+/month.",
            },
            {
              question: "How is performance tracked and verified?",
              answer:
                "You receive access to a 24/7 real-time telemetry dashboard integrated directly with your ad accounts and CRM.",
            },
            {
              question: "Are there long-term lock-in contracts?",
              answer:
                "No. All our standard retainers operate on flexible 90-day growth sprints with transparent monthly milestones.",
            },
          ],
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-form",
        type: "form",
        order: 6,
        isVisible: true,
        content: {
          headline: "Claim Your Free Strategic Growth Proposal",
          subheadline:
            "Receive a complimentary 15-minute acquisition audit, competitor gap analysis, and tailored 90-day roadmap.",
          leadSourceTag: "landing-page:homepage-os",
        },
        styling: {
          backgroundColor: "#F8FAFC",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-cta",
        type: "cta",
        order: 7,
        isVisible: true,
        content: {
          headline: "Ready to Scale 10x Client Retainers?",
          subheadline:
            "Join 2,350+ agencies and enterprise leaders growing predictably with DigiVigee. Zero lock-in contracts.",
          buttonLabel: "Request Strategic Consultation",
          buttonTarget: "#lead-form",
        },
        styling: {
          backgroundColor: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          textColor: "#ffffff",
          paddingY: "xl",
        },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Claim Your Free Proposal",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Claim Your Free Strategic Growth Proposal",
      formSubtitle: "Fill in your details and an agency strategist will review your market within 24 hours.",
      submitButtonText: "Claim Free Proposal",
      leadSourceTag: "landing-page:homepage-os",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-agency-lead-gen",
    name: "Performance Marketing Enterprise Lead Gen",
    description:
      "Engineered for high-ticket acquisition: Hero header, feature advantages, service cards, metrics, pricing, FAQ, and in-page lead form.",
    category: "Lead Generation",
    badge: "Most Popular",
    tags: ["b2b", "agency", "lead-gen", "growth"],
    sections: [
      {
        id: "sec-tpl-hero-1",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Proven Marketing Strategy",
          headline: "Accelerate Your Qualified Inquiries with Performance Marketing",
          description:
            "Data-backed acquisition campaigns, high-converting design, and revenue-driven growth frameworks.",
          primaryCtaLabel: "Request Free Consultation",
          primaryCtaTarget: "#lead-form",
          secondaryCtaLabel: "Explore Services",
          secondaryCtaTarget: "#services",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-feat-1",
        type: "features",
        order: 1,
        isVisible: true,
        content: {
          sectionTitle: "Why Forward-Thinking Brands Choose Us",
          sectionSubtitle: "Built on analytical precision, transparent reporting, and verified client outcomes.",
          features: [
            { title: "Transparent Attribution", desc: "No vanity metrics. Every dollar is tracked to pipeline revenue." },
            { title: "Senior Specialists", desc: "Direct access to experienced growth buyers, not junior coordinators." },
            { title: "Rapid Iteration", desc: "Weekly creative sprints, landing page experiments, and copy testing." },
          ],
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-serv-1",
        type: "services",
        order: 2,
        isVisible: true,
        content: {
          sectionTitle: "Specialized Marketing Capabilities",
          services: [
            { title: "Paid Search & Meta Ads", desc: "Targeted campaigns built for strict ROAS targets.", icon: "📈" },
            { title: "Conversion Optimization", desc: "Frictionless landing pages that maximize inquiry rates.", icon: "🎯" },
            { title: "Analytics Architecture", desc: "Server-side tracking and full attribution modeling.", icon: "🔍" },
          ],
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-stat-1",
        type: "statistics",
        order: 3,
        isVisible: true,
        content: {
          stats: [
            { value: "250+", label: "Happy Clients" },
            { value: "500+", label: "Projects Completed" },
            { value: "5+ Years", label: "Industry Experience" },
            { value: "98%", label: "Client Satisfaction" },
          ],
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "lg" },
      },
      {
        id: "sec-tpl-test-1",
        type: "testimonials",
        order: 4,
        isVisible: true,
        content: {
          sectionTitle: "Client Success Proof",
          quote:
            "DigiVigee completely restructured our acquisition pipeline. We achieved a 3x lift in qualified leads while lowering our effective cost per acquisition.",
          author: "Rajesh Patel",
          role: "Managing Director, Kalpvruksh Group",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "lg" },
      },
      {
        id: "sec-tpl-price-1",
        type: "pricing",
        order: 5,
        isVisible: true,
        content: {
          sectionTitle: "Flexible Campaign Packages",
          tiers: [
            {
              name: "Growth Starter",
              price: "$950",
              period: "/month",
              highlighted: false,
              features: ["2 Ad Platforms", "Bi-Weekly Performance Reviews", "Custom Conversion Dashboard"],
              ctaLabel: "Get Started",
              ctaTarget: "#lead-form",
            },
            {
              name: "Scale Accelerator",
              price: "$1,850",
              period: "/month",
              highlighted: true,
              badge: "Most Popular",
              features: ["Omnichannel Ads", "Weekly Strategy Sprints", "Full Funnel A/B Testing", "Slack Support"],
              ctaLabel: "Claim Accelerator",
              ctaTarget: "#lead-form",
            },
            {
              name: "Enterprise Custom",
              price: "Custom",
              period: "Retainer",
              highlighted: false,
              features: ["Dedicated Team", "Custom Conversion Funnels", "Full Attribution Modeling"],
              ctaLabel: "Contact Enterprise",
              ctaTarget: "#lead-form",
            },
          ],
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-faq-1",
        type: "faq",
        order: 6,
        isVisible: true,
        content: {
          sectionTitle: "Frequently Asked Questions",
          items: [
            { question: "How quickly can we launch?", answer: "Typically within 5 to 7 business days." },
            { question: "What ad spend budgets do you manage?", answer: "From targeted local budgets to enterprise ad spend." },
          ],
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-form-1",
        type: "form",
        order: 7,
        isVisible: true,
        content: {
          headline: "Request Your Custom Growth Blueprint",
          subheadline: "Share your acquisition goals and a strategist will audit your competitive market.",
          submitButtonText: "Submit Inquiry Now",
          leadSourceTag: "landing-page:agency-lead-gen",
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-foot-1",
        type: "footer",
        order: 8,
        isVisible: true,
        content: {
          copyrightText: "© 2026 DigiVigee Platform. All Rights Reserved.",
          showLegalLinks: true,
        },
        styling: { backgroundColor: "#0b132b", textColor: "#ffffff", paddingY: "md" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Request Free Consultation",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Request Your Custom Growth Blueprint",
      formSubtitle: "Fill in your details and an agency strategist will review your market.",
      submitButtonText: "Submit Inquiry Now",
      leadSourceTag: "landing-page:agency-lead-gen",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-service-growth",
    name: "B2B Professional Services & Consulting Accelerator",
    description:
      "Structured for consulting, agencies, and professional firms: Process workflow, service breakdown, authority logos, and contact section.",
    category: "Service",
    badge: "High Conversion",
    tags: ["consulting", "b2b", "services", "process"],
    sections: [
      {
        id: "sec-tpl-serv-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Strategic Advisory",
          headline: "Modern Digital Growth for Professional B2B Services",
          description: "Elevate your market positioning and generate qualified high-value commercial relationships.",
          primaryCtaLabel: "Schedule Advisory Call",
          primaryCtaTarget: "#lead-form",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-serv-proc",
        type: "process",
        order: 1,
        isVisible: true,
        content: {
          heading: "Our 4-Step Engagement Model",
          steps: [
            { step: "01", title: "Diagnostic Audit", desc: "Assess baseline acquisition metrics and competitive whitespace." },
            { step: "02", title: "Blueprint Formulation", desc: "Architect full-funnel media allocations and high-intent targeting." },
            { step: "03", title: "Campaign Execution", desc: "Launch verified search, display, and social acquisition funnels." },
            { step: "04", title: "Scale & Retention", desc: "Continuous ROAS expansion and customer lifetime value optimization." },
          ],
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-serv-logos",
        type: "client-logos",
        order: 2,
        isVisible: true,
        content: {
          heading: "Trusted by Recognized Industry Leaders",
          logos: [{ name: "Kalpvruksh Group" }, { name: "The Printing Wala" }, { name: "Ayush Wellness" }],
        },
        styling: { backgroundColor: "#ffffff", paddingY: "md" },
      },
      {
        id: "sec-tpl-serv-form",
        type: "form",
        order: 3,
        isVisible: true,
        content: {
          headline: "Schedule Your Advisory Consultation",
          subheadline: "Let our growth team evaluate your commercial acquisition goals.",
          submitButtonText: "Book Discovery Session",
          leadSourceTag: "landing-page:b2b-services",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-serv-foot",
        type: "footer",
        order: 4,
        isVisible: true,
        content: { copyrightText: "© 2026 DigiVigee Platform.", showLegalLinks: true },
        styling: { backgroundColor: "#0b132b", textColor: "#ffffff", paddingY: "md" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Schedule Advisory Call",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Schedule Your Advisory Consultation",
      submitButtonText: "Book Discovery Session",
      leadSourceTag: "landing-page:b2b-services",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-ecommerce-scale",
    name: "Omnichannel E-Commerce & D2C Scaling Funnel",
    description:
      "Fast-paced campaign funnel with countdown urgency banner, video presentation, pricing comparison, and frictionless lead form.",
    category: "Product",
    badge: "D2C Focus",
    tags: ["product", "countdown", "offer", "video"],
    sections: [
      {
        id: "sec-tpl-prod-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Exclusive Early Access",
          headline: "The Complete Performance Growth Toolkit",
          description: "Transform your brand's digital presence with verified acquisition frameworks.",
          primaryCtaLabel: "Claim Special Offer",
          primaryCtaTarget: "#lead-form",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-prod-count",
        type: "countdown",
        order: 1,
        isVisible: true,
        content: {
          badge: "Limited Spots Available",
          headline: "Early-Bird Strategy Audit Package",
          description: "Only 10 complimentary audits remaining this calendar quarter.",
          ctaLabel: "Lock In Your Spot",
          ctaTarget: "#lead-form",
        },
        styling: { backgroundColor: "#1e293b", textColor: "#ffffff", paddingY: "lg" },
      },
      {
        id: "sec-tpl-prod-vid",
        type: "video",
        order: 2,
        isVisible: true,
        content: {
          heading: "See How The Methodology Operates",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-prod-form",
        type: "form",
        order: 3,
        isVisible: true,
        content: {
          headline: "Claim Your Special Launch Offer",
          submitButtonText: "Claim Exclusive Offer",
          leadSourceTag: "landing-page:product-launch",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-prod-foot",
        type: "footer",
        order: 4,
        isVisible: true,
        content: { copyrightText: "© 2026 DigiVigee Platform.", showLegalLinks: true },
        styling: { backgroundColor: "#0b132b", textColor: "#ffffff", paddingY: "md" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Claim Special Offer",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Claim Your Special Launch Offer",
      submitButtonText: "Claim Exclusive Offer",
      leadSourceTag: "landing-page:product-launch",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-saas-demand",
    name: "B2B SaaS Demand Generation & Demo Pipeline",
    description:
      "High-intent software pipeline funnel: Live product feature highlights, customer ROI metrics, 3-tier pricing comparison, and demo booking form.",
    category: "Lead Generation",
    badge: "SaaS Focus",
    tags: ["saas", "software", "demo", "b2b", "pipeline"],
    sections: [
      {
        id: "sec-tpl-saas-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Next-Gen Software Growth",
          headline: "Automate Pipeline Velocity for Modern SaaS Teams",
          description: "Connect telemetry, capture high-intent inquiries, and close enterprise deals faster.",
          primaryCtaLabel: "Book Interactive Demo",
          primaryCtaTarget: "#lead-form",
          secondaryCtaLabel: "View Pricing Plans",
          secondaryCtaTarget: "#pricing",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-saas-feat",
        type: "features",
        order: 1,
        isVisible: true,
        content: {
          sectionTitle: "Engineered for Product-Led Expansion",
          features: [
            { title: "Automated Lead Routing", desc: "Instant CRM qualification based on firmographic signals." },
            { title: "Real-Time Attribution", desc: "Track every software sign-up back to the initial ad click." },
            { title: "Interactive Software Mockups", desc: "Give prospects an authentic glimpse into the product UI." },
          ],
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-saas-stat",
        type: "statistics",
        order: 2,
        isVisible: true,
        content: {
          stats: [
            { value: "3.4x", label: "Pipeline Velocity" },
            { value: "48%", label: "Lower CAC" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "500+", label: "SaaS Integrations" },
          ],
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "lg" },
      },
      {
        id: "sec-tpl-saas-form",
        type: "form",
        order: 3,
        isVisible: true,
        content: {
          headline: "Schedule Your 15-Minute Software Demo",
          subheadline: "See how DigiVigee automates your acquisition and reporting pipelines.",
          submitButtonText: "Confirm Demo Time",
          leadSourceTag: "landing-page:saas-demand",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Book Interactive Demo",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Schedule Your 15-Minute Software Demo",
      submitButtonText: "Confirm Demo Time",
      leadSourceTag: "landing-page:saas-demand",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-local-business",
    name: "Local Business Growth & Maps Acceleration",
    description:
      "Designed for local service establishments: Direct WhatsApp chat action, local phone/address contact block, client testimonials, and inquiry form.",
    category: "Campaign",
    badge: "Local Focus",
    tags: ["local", "maps", "whatsapp", "inquiries"],
    sections: [
      {
        id: "sec-tpl-loc-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Local Market Domination",
          headline: "Attract High-Intent Local Customers Every Single Week",
          description: "Dominate Google Maps, local search results, and targeted neighborhood social ads.",
          primaryCtaLabel: "Chat on WhatsApp",
          primaryCtaTarget: "#whatsapp",
          secondaryCtaLabel: "Request In-Depth Audit",
          secondaryCtaTarget: "#lead-form",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-loc-whats",
        type: "whatsapp",
        order: 1,
        isVisible: true,
        content: {
          headline: "Chat Directly with an Agency Specialist",
          subheadline: "Get immediate answers, service quotes, and local campaign estimates.",
          buttonLabel: "Open WhatsApp Chat",
          phoneNumber: "+919876543210",
        },
        styling: { backgroundColor: "#ecfdf5", textColor: "#065f46", paddingY: "lg" },
      },
      {
        id: "sec-tpl-loc-contact",
        type: "contact",
        order: 2,
        isVisible: true,
        content: {
          heading: "Our Agency Headquarters",
          phone: "+91 98765 43210",
          email: "hello@digivigee.com",
          address: "Digital Marketing Agency Hub, Surat, Gujarat, India",
        },
        styling: { backgroundColor: "#ffffff", paddingY: "lg" },
      },
      {
        id: "sec-tpl-loc-form",
        type: "form",
        order: 3,
        isVisible: true,
        content: {
          headline: "Request Your Local Market Review",
          submitButtonText: "Submit Local Inquiry",
          leadSourceTag: "landing-page:local-growth",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-loc-foot",
        type: "footer",
        order: 4,
        isVisible: true,
        content: { copyrightText: "© 2026 DigiVigee Platform.", showLegalLinks: true },
        styling: { backgroundColor: "#0b132b", textColor: "#ffffff", paddingY: "md" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Chat on WhatsApp",
      primaryCtaType: "whatsapp",
      primaryCtaTarget: "+919876543210",
    },
    defaultForm: {
      formTitle: "Request Your Local Market Review",
      submitButtonText: "Submit Local Inquiry",
      leadSourceTag: "landing-page:local-growth",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
];

/**
 * Retrieves all landing page templates for the Admin Template Gallery.
 */
export async function getAllLandingTemplatesAdmin(): Promise<LandingPageTemplate[]> {
  const adminDb = getAdminFirestore();

  if (!adminDb) {
    return [...SEED_LANDING_TEMPLATES];
  }

  try {
    const snapshot = await adminDb
      .collection(COLLECTIONS.LANDING_TEMPLATES)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      // Seed default templates
      const batch = adminDb.batch();
      for (const tpl of SEED_LANDING_TEMPLATES) {
        const docRef = adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).doc(tpl.id);
        const { id: _, ...data } = tpl;
        void _;
        batch.set(docRef, data);
      }
      await batch.commit();
      return [...SEED_LANDING_TEMPLATES];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<LandingPageTemplate, "id">),
    }));
  } catch (error) {
    console.error("[landingTemplateService] Error fetching templates:", error);
    return [...SEED_LANDING_TEMPLATES];
  }
}

/**
 * Retrieves a single landing page template by ID.
 */
export async function getLandingTemplateByIdAdmin(id: string): Promise<LandingPageTemplate | null> {
  const adminDb = getAdminFirestore();

  if (!adminDb) {
    return SEED_LANDING_TEMPLATES.find((t) => t.id === id) || null;
  }

  try {
    const doc = await adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).doc(id).get();
    if (!doc.exists) {
      return SEED_LANDING_TEMPLATES.find((t) => t.id === id) || null;
    }

    return {
      id: doc.id,
      ...(doc.data() as Omit<LandingPageTemplate, "id">),
    };
  } catch (error) {
    console.error(`[landingTemplateService] Error fetching template ${id}:`, error);
    return SEED_LANDING_TEMPLATES.find((t) => t.id === id) || null;
  }
}

/**
 * Saves a new template definition (e.g. exported from an existing landing page).
 */
export async function createLandingTemplate(
  input: CreateLandingPageTemplateInput
): Promise<LandingPageTemplate> {
  if (!input.name || !input.name.trim()) {
    throw new Error("Template name is required.");
  }
  if (!input.category || !input.category.trim()) {
    throw new Error("Template category is required.");
  }

  const now = new Date().toISOString();

  // Perform deep cloning of sections to create a clean template snapshot
  const clonedSections: LandingPageSection[] = JSON.parse(JSON.stringify(input.sections || []));

  const payload = {
    name: input.name.trim(),
    description: input.description?.trim() || "",
    category: input.category.trim(),
    tags: Array.isArray(input.tags) ? input.tags.map((t) => t.trim().toLowerCase()) : [],
    thumbnailUrl: input.thumbnailUrl || "",
    badge: input.badge || "",
    sections: clonedSections,
    defaultCta: input.defaultCta ? JSON.parse(JSON.stringify(input.defaultCta)) : undefined,
    defaultForm: input.defaultForm ? JSON.parse(JSON.stringify(input.defaultForm)) : undefined,
    createdAt: now,
    updatedAt: now,
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    const docRef = await adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).add(payload);
    return {
      id: docRef.id,
      ...payload,
    };
  }

  const mockTemplate: LandingPageTemplate = {
    id: `tpl-${Date.now()}`,
    ...payload,
  };
  SEED_LANDING_TEMPLATES.unshift(mockTemplate);
  return mockTemplate;
}

/**
 * Deletes a template master.
 */
export async function deleteLandingTemplate(id: string): Promise<boolean> {
  const adminDb = getAdminFirestore();

  if (adminDb) {
    const docRef = adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`Template with ID "${id}" does not exist.`);
    }
    await docRef.delete();
    return true;
  }

  const idx = SEED_LANDING_TEMPLATES.findIndex((t) => t.id === id);
  if (idx !== -1) {
    SEED_LANDING_TEMPLATES.splice(idx, 1);
    return true;
  }

  return false;
}

/**
 * Instantiates a brand new LandingPage from a template master.
 * CRITICAL: Clones template sections into independent Page Copies with freshly generated section IDs.
 */
export async function instantiateLandingPageFromTemplate(
  templateId: string,
  input: { title: string; slug: string }
): Promise<LandingPage> {
  const template = await getLandingTemplateByIdAdmin(templateId);
  if (!template) {
    throw new Error(`Template with ID "${templateId}" not found.`);
  }

  // Deep clone sections and assign fresh unique section IDs to guarantee Page Copy independence
  const independentSections: LandingPageSection[] = (template.sections || []).map((sec, idx) => ({
    ...JSON.parse(JSON.stringify(sec)),
    id: `sec-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
    order: idx,
  }));

  // Create independent landing page document using existing landingPageService
  return createLandingPage({
    title: input.title,
    slug: input.slug,
    templateId: template.id,
    status: "draft",
    sections: independentSections,
    cta: template.defaultCta ? JSON.parse(JSON.stringify(template.defaultCta)) : undefined,
    form: template.defaultForm ? JSON.parse(JSON.stringify(template.defaultForm)) : undefined,
  });
}

/**
 * Resets all landing page templates back to canonical seed defaults.
 * Wipes existing template records and batch re-inserts all 6 canonical blueprints.
 */
export async function resetLandingTemplatesAdmin(): Promise<LandingPageTemplate[]> {
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      const snapshot = await adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).get();
      const deleteBatch = adminDb.batch();
      snapshot.docs.forEach((doc) => {
        deleteBatch.delete(doc.ref);
      });
      await deleteBatch.commit();

      const insertBatch = adminDb.batch();
      for (const tpl of SEED_LANDING_TEMPLATES) {
        const docRef = adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).doc(tpl.id);
        const { id: _, ...data } = tpl;
        void _;
        insertBatch.set(docRef, data);
      }
      await insertBatch.commit();

      return JSON.parse(JSON.stringify(SEED_LANDING_TEMPLATES));
    } catch (error) {
      console.error("[landingTemplateService] Error resetting templates in Firestore:", error);
      return JSON.parse(JSON.stringify(SEED_LANDING_TEMPLATES));
    }
  }

  return JSON.parse(JSON.stringify(SEED_LANDING_TEMPLATES));
}
