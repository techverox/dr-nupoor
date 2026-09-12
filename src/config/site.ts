export const SITE_CONFIG = {
  name: "DigiVigee",
  tagline: "Professional Solutions For Your Digital Growth",
  positioning: "We help businesses build a powerful digital presence, generate quality leads and achieve measurable growth through result-driven digital marketing solutions.",
  description:
    "DigiVigee is a premier digital marketing agency driving exponential growth through high-performance SEO, performance marketing, web design, and conversion optimization.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://digivigee.com",
  ogImage: "/images/og-image.jpg",
  contact: {
    phone: "+91 90811 45178",
    phoneFormatted: "+91 90811 45178",
    whatsappNumber: "919081145178",
    whatsappDisplay: "+91 90811 45178",
    email: "Contact@digivigee.com",
    address: "Orchid Complex, Office No. B, Door No. D-23, Approach Road / Pirojpura Road, Chhapi, Banaskantha, Gujarat - 385210",
    workingHours: "24/7 Priority Support & Strategy Pods",
  },
  socials: {
    facebook: "https://facebook.com/digivigee",
    instagram: "https://instagram.com/digivigee",
    linkedin: "https://linkedin.com/company/digivigee",
    twitter: "https://twitter.com/digivigee",
    youtube: "https://youtube.com/@digivigee",
  },
  cta: {
    primaryText: "Get Free Consultation",
    primaryHref: "/contact",
    whatsappText: "Chat on WhatsApp",
  },
} as const;
