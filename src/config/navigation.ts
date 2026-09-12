export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}

export const HEADER_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Social Media Marketing",
        href: "/services/social-media-marketing",
        description: "Engage your audience and grow organic brand awareness.",
      },
      {
        label: "Performance Marketing",
        href: "/services/performance-marketing",
        description: "Data-driven ROI campaigns on Google Ads & Meta.",
      },
      {
        label: "Content Creation",
        href: "/services/content-creation",
        description: "High-impact creative content that converts target clients.",
      },
      {
        label: "Website Design & Development",
        href: "/services/website-design-and-development",
        description: "High-speed, responsive, conversion-focused websites.",
      },
      {
        label: "SEO & Local SEO",
        href: "/services/seo-and-local-seo",
        description: "Rank higher on Google and dominate local search rankings.",
      },
      {
        label: "Lead Generation & Automation",
        href: "/services/lead-generation-and-automation",
        description: "Automate lead capture, qualification, and sales CRM pipelines.",
      },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "Social Media Marketing", href: "/services/social-media-marketing" },
      { label: "Performance Marketing", href: "/services/performance-marketing" },
      { label: "Content Creation", href: "/services/content-creation" },
      { label: "Website Design & Development", href: "/services/website-design-and-development" },
      { label: "SEO & Local SEO", href: "/services/seo-and-local-seo" },
      { label: "Lead Generation", href: "/services/lead-generation-and-automation" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "FAQs", href: "/services#faqs" },
    ],
  },
];
