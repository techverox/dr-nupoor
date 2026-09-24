import { LandingPageSection, LandingPageSectionStyling } from "@/types/landingPage";

export type SectionCategory =
  | "Basic"
  | "Business"
  | "Conversion"
  | "Trust"
  | "Site"
  | "Advanced";

export interface SectionDefinition {
  type: string;
  name: string;
  category: SectionCategory;
  description: string;
  icon: string;
  defaultContent: Record<string, unknown>;
  defaultStyling?: LandingPageSectionStyling;
}

export const SECTION_REGISTRY: SectionDefinition[] = [
  // 1. BASIC
  {
    type: "hero",
    name: "Hero Header",
    category: "Basic",
    description: "High-impact visual headline, value proposition, and primary conversion buttons.",
    icon: "🌟",
    defaultContent: {
      eyebrow: "Proven Marketing Strategy",
      headline: "Accelerate Your Business Growth with Performance Marketing",
      description:
        "Data-backed acquisition campaigns, high-converting design, and revenue-driven growth frameworks.",
      primaryCtaLabel: "Request Free Consultation",
      primaryCtaTarget: "#lead-form",
      secondaryCtaLabel: "Explore Services",
      secondaryCtaTarget: "#services",
      imageUrl: "",
    },
    defaultStyling: {
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      paddingY: "xl",
    },
  },
  {
    type: "text",
    name: "Text / Rich Text",
    category: "Basic",
    description: "Rich editorial copy, headings, and detailed storytelling blocks.",
    icon: "📝",
    defaultContent: {
      heading: "Engineered for Measurable ROI",
      body: "In today's competitive landscape, generic marketing fails. We specialize in building targeted campaigns that identify your most profitable customers, reduce acquisition costs, and scale sustainable pipeline revenue.",
    },
    defaultStyling: {
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      paddingY: "lg",
    },
  },
  {
    type: "image",
    name: "Visual Media",
    category: "Basic",
    description: "Full-width or framed responsive visual media asset.",
    icon: "🖼️",
    defaultContent: {
      imageUrl: "",
      altText: "Dr. Noopur Patel Clinical Visual",
      caption: "Clinical practice and breast oncology care at Marengo CIMS Hospital.",
      aspectRatio: "16/9",
    },
    defaultStyling: {
      backgroundColor: "#f8fafc",
      paddingY: "md",
    },
  },
  {
    type: "video",
    name: "Video Showcase",
    category: "Basic",
    description: "Engaging video presentation (YouTube, Vimeo, or MP4) with poster thumbnail.",
    icon: "🎥",
    defaultContent: {
      heading: "See How We Drive Tangible Results",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      posterUrl: "",
      caption: "Watch an overview of our agency methodology.",
    },
    defaultStyling: {
      backgroundColor: "#ffffff",
      paddingY: "lg",
    },
  },
  {
    type: "cta",
    name: "CTA Banner",
    category: "Basic",
    description: "Focused conversion section with compelling headline and action button.",
    icon: "⚡",
    defaultContent: {
      headline: "Ready to Scale Your Digital Acquisitions?",
      subheadline: "Schedule a 30-minute discovery call with our performance specialists.",
      buttonLabel: "Claim Your Strategy Call",
      buttonTarget: "#lead-form",
    },
    defaultStyling: {
      backgroundColor: "#16a34a",
      textColor: "#ffffff",
      paddingY: "lg",
    },
  },
  {
    type: "spacer",
    name: "Spacer / Divider",
    category: "Basic",
    description: "Visual whitespace breathing room with optional subtle divider rule.",
    icon: "➖",
    defaultContent: {
      height: "md", // sm, md, lg, xl
      showDivider: true,
    },
    defaultStyling: {
      paddingY: "sm",
    },
  },

  // 2. BUSINESS
  {
    type: "services",
    name: "Services Grid",
    category: "Business",
    description: "Showcase core capabilities with iconography, descriptions, and links.",
    icon: "💼",
    defaultContent: {
      sectionTitle: "Specialized Marketing Capabilities",
      sectionSubtitle: "Comprehensive solutions engineered to scale every stage of your customer funnel.",
      services: [
        {
          title: "Performance Marketing",
          desc: "Targeted Google & Meta ad campaigns configured for strict ROAS targets.",
          icon: "📈",
        },
        {
          title: "Search Engine Optimization",
          desc: "Technical site architecture and content optimization that drives qualified organic traffic.",
          icon: "🔍",
        },
        {
          title: "Social Media Strategy",
          desc: "Engaging brand presence and community funnels that nurture high-intent buyers.",
          icon: "📱",
        },
      ],
    },
    defaultStyling: {
      backgroundColor: "#f8fafc",
      paddingY: "xl",
    },
  },
  {
    type: "features",
    name: "Feature Cards",
    category: "Business",
    description: "Highlight key advantages, differentiators, or deliverables in a multi-card grid.",
    icon: "✨",
    defaultContent: {
      sectionTitle: "Why Forward-Thinking Brands Partner With Us",
      sectionSubtitle: "Built on engineering precision, real-time analytics, and verified client outcomes.",
      features: [
        {
          title: "Transparent Reporting",
          desc: "No vanity metrics. Every dollar spent is mapped directly to pipeline conversions.",
        },
        {
          title: "Dedicated Specialists",
          desc: "Direct access to senior media buyers and growth strategists, not junior account managers.",
        },
        {
          title: "Agile Experimentation",
          desc: "Continuous creative iteration, landing page testing, and copy refinement.",
        },
      ],
    },
    defaultStyling: {
      backgroundColor: "#ffffff",
      paddingY: "xl",
    },
  },
  {
    type: "pricing",
    name: "Pricing Tiers",
    category: "Business",
    description: "Transparent package comparison with feature lists and targeted CTA buttons.",
    icon: "🏷️",
    defaultContent: {
      sectionTitle: "Flexible Campaign Packages",
      sectionSubtitle: "Transparent structures designed to scale with your monthly acquisition budget.",
      tiers: [
        {
          name: "Growth Starter",
          price: "$950",
          period: "/month",
          highlighted: false,
          features: ["2 Ad Platforms (Meta + Google)", "Bi-Weekly Performance Reviews", "Custom Conversion Dashboard"],
          ctaLabel: "Get Started",
          ctaTarget: "#lead-form",
        },
        {
          name: "Scale Accelerator",
          price: "$1,850",
          period: "/month",
          highlighted: true,
          badge: "Most Popular",
          features: ["Omnichannel Ad Campaigns", "Weekly Strategy Sprints", "Full Funnel A/B Testing", "Priority Slack Support"],
          ctaLabel: "Claim Accelerator",
          ctaTarget: "#lead-form",
        },
        {
          name: "Enterprise Custom",
          price: "Custom",
          period: "Retainer",
          highlighted: false,
          features: ["Dedicated Media Buying Team", "Custom Conversion Funnels", "Full Attribution Modeling"],
          ctaLabel: "Contact Enterprise",
          ctaTarget: "#lead-form",
        },
      ],
    },
    defaultStyling: {
      backgroundColor: "#f8fafc",
      paddingY: "xl",
    },
  },
  {
    type: "portfolio",
    name: "Portfolio Showcase",
    category: "Business",
    description: "Visual case studies showcasing past campaigns and quantified client milestones.",
    icon: "📂",
    defaultContent: {
      sectionTitle: "Featured Client Engagements",
      sectionSubtitle: "Recent case studies demonstrating repeatable performance frameworks.",
      projects: [
        {
          title: "Kalpvruksh Group",
          category: "Real Estate & Infrastructure",
          metric: "+180% Inquiries",
          summary: "Complete re-architecture of local search and targeted lead generation.",
        },
        {
          title: "The Printing Wala",
          category: "Commercial B2B",
          metric: "4.2x ROAS",
          summary: "Omnichannel performance marketing driving high-volume commercial print inquiries.",
        },
      ],
    },
    defaultStyling: {
      backgroundColor: "#ffffff",
      paddingY: "xl",
    },
  },
  {
    type: "testimonials",
    name: "Client Testimonial",
    category: "Business",
    description: "Authentic client review cards with attribution, quotes, and trust badges.",
    icon: "💬",
    defaultContent: {
      sectionTitle: "Patient Experiences & Care Journeys",
      quote:
        "Dr. Noopur Patel's surgical care and guidance provided peace of mind, exceptional oncological safety, and compassionate recovery at Marengo CIMS Hospital.",
      author: "Patient Care Journey",
      role: "Ahmedabad, Gujarat",
    },
    defaultStyling: {
      backgroundColor: "#f8fafc",
      paddingY: "lg",
    },
  },
  {
    type: "statistics",
    name: "Metrics & Statistics",
    category: "Business",
    description: "Quantified impact metrics highlighting credibility and historical track record.",
    icon: "📊",
    defaultContent: {
      stats: [
        { value: "250+", label: "Happy Clients" },
        { value: "500+", label: "Projects Completed" },
        { value: "5+ Years", label: "Industry Experience" },
        { value: "98%", label: "Client Satisfaction" },
      ],
    },
    defaultStyling: {
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      paddingY: "lg",
    },
  },
  {
    type: "faq",
    name: "FAQ Accordion",
    category: "Business",
    description: "Common prospect questions and objections addressed in collapsible accordions.",
    icon: "❓",
    defaultContent: {
      sectionTitle: "Frequently Asked Questions",
      sectionSubtitle: "Everything you need to know before launching your campaign.",
      items: [
        {
          question: "How quickly can we launch our first campaign?",
          answer:
            "Typically within 5 to 7 business days following our initial discovery sprint and technical tracking audit.",
        },
        {
          question: "What ad spend budgets do you work with?",
          answer:
            "We manage campaigns across a broad spectrum, from high-growth local businesses to large enterprise acquisition budgets.",
        },
        {
          question: "How is performance tracked and reported?",
          answer:
            "You receive access to a 24/7 real-time analytics dashboard along with weekly performance digests.",
        },
      ],
    },
    defaultStyling: {
      backgroundColor: "#ffffff",
      paddingY: "xl",
    },
  },

  // 3. CONVERSION
  {
    type: "form",
    name: "Lead Capture Form",
    category: "Conversion",
    description: "High-converting inquiry form wired to the platform lead management system.",
    icon: "📬",
    defaultContent: {
      headline: "Request Your Custom Growth Blueprint",
      subheadline: "Tell us about your acquisition goals and an agency growth strategist will review your market.",
      submitButtonText: "Submit Inquiry Now",
      leadSourceTag: "landing-page:lead-form",
    },
    defaultStyling: {
      backgroundColor: "#f8fafc",
      paddingY: "xl",
    },
  },
  {
    type: "whatsapp",
    name: "WhatsApp Direct CTA",
    category: "Conversion",
    description: "Frictionless direct WhatsApp chat conversion prompt with pre-filled greeting.",
    icon: "🟢",
    defaultContent: {
      headline: "Need Immediate Clinical Guidance?",
      subheadline: "Chat directly with Dr. Noopur Patel's consultation coordination desk on WhatsApp for appointment scheduling and reports review.",
      buttonLabel: "Chat on WhatsApp Now",
      phoneNumber: "+919876543210",
      prefilledMessage: "Hello Dr. Noopur Patel's clinic desk, I would like to schedule a breast consultation.",
    },
    defaultStyling: {
      backgroundColor: "#ecfdf5",
      textColor: "#065f46",
      paddingY: "lg",
    },
  },
  {
    type: "countdown",
    name: "Countdown & Urgency Offer",
    category: "Conversion",
    description: "Limited-time campaign promotional banner with urgency badge and CTA button.",
    icon: "⏱️",
    defaultContent: {
      badge: "Limited Opportunity",
      headline: "Complimentary Comprehensive Growth Audit",
      description: "Available for the first 10 qualifying brands this quarter. Reserve your audit before spots close.",
      ctaLabel: "Claim Free Audit",
      ctaTarget: "#lead-form",
    },
    defaultStyling: {
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      paddingY: "lg",
    },
  },
  {
    type: "contact",
    name: "Contact Information",
    category: "Conversion",
    description: "Direct agency contact channels including office address, email, phone, and business hours.",
    icon: "📍",
    defaultContent: {
      heading: "Clinical Consultation Location",
      email: "dr.noopurpatel@gmail.com",
      phone: "+91 98765 43210",
      address: "Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat 380060",
      hours: "Monday – Saturday: 9:00 AM – 6:00 PM",
    },
    defaultStyling: {
      backgroundColor: "#ffffff",
      paddingY: "lg",
    },
  },

  // 4. TRUST
  {
    type: "client-logos",
    name: "Client Logo Strip",
    category: "Trust",
    description: "Row of recognized partner brand logos establishing immediate authority and credibility.",
    icon: "🏢",
    defaultContent: {
      heading: "Trusted by Ambitious Growth Brands",
      logos: [
        { name: "Kalpvruksh Group" },
        { name: "The Printing Wala" },
        { name: "Ayush Wellness" },
        { name: "TechNext Labs" },
      ],
    },
    defaultStyling: {
      backgroundColor: "#ffffff",
      paddingY: "md",
    },
  },
  {
    type: "process",
    name: "Process / Steps",
    category: "Trust",
    description: "Clear 4-step execution roadmap explaining how client engagements work.",
    icon: "🛣️",
    defaultContent: {
      heading: "Our Proven 4-Step Methodology",
      steps: [
        { step: "01", title: "Discover & Audit", desc: "We analyze your audience, competitors, and conversion funnel." },
        { step: "02", title: "Strategy Architecture", desc: "Design custom media plans, target CPA models, and creative angles." },
        { step: "03", title: "Execute & Launch", desc: "Deploy campaigns with tracking across verified ad channels." },
        { step: "04", title: "Optimize & Scale", desc: "Continuous iteration to lower acquisition costs and maximize ROAS." },
      ],
    },
    defaultStyling: {
      backgroundColor: "#f8fafc",
      paddingY: "xl",
    },
  },

  // 5. SITE & ADVANCED
  {
    type: "footer",
    name: "Landing Page Footer",
    category: "Site",
    description: "Clean minimalist landing-page footer with copyright, disclaimer, and privacy links.",
    icon: "⚓",
    defaultContent: {
      copyrightText: "© 2026 Dr. Noopur Patel. All Rights Reserved.",
      disclaimer: "Dr. Noopur Patel is an Associate Consultant in Surgical Breast Oncology at Marengo CIMS Hospital, Ahmedabad.",
      showLegalLinks: true,
    },
    defaultStyling: {
      backgroundColor: "#0b132b",
      textColor: "#ffffff",
      paddingY: "md",
    },
  },
  {
    type: "custom-html",
    name: "Custom HTML / Embed",
    category: "Advanced",
    description: "Restricted custom markup with automated XSS sanitization.",
    icon: "💻",
    defaultContent: {
      html: "<div style=\"text-align: center; padding: 2rem;\"><p style=\"font-size: 1.125rem; color: #475569;\">Custom container element ready for specialized embeds.</p></div>",
    },
    defaultStyling: {
      paddingY: "md",
    },
  },
];

/**
 * Creates a new LandingPageSection instance with unique ID, order, and default configuration.
 */
export function createSectionInstance(type: string, order: number): LandingPageSection {
  const definition = SECTION_REGISTRY.find((s) => s.type === type);

  const baseDef = definition || {
    type,
    name: "Custom Section",
    category: "Basic" as SectionCategory,
    description: "Custom section block",
    icon: "📦",
    defaultContent: {},
    defaultStyling: { paddingY: "md" as const },
  };

  return {
    id: `sec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: baseDef.type,
    order,
    isVisible: true,
    content: JSON.parse(JSON.stringify(baseDef.defaultContent)),
    styling: baseDef.defaultStyling ? JSON.parse(JSON.stringify(baseDef.defaultStyling)) : { paddingY: "md" },
  };
}
