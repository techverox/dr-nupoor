export const SITE_CONFIG = {
  name: "Dr. Noopur Patel",
  tagline: "Breast Surgeon & Oncoplastic Surgeon — Expert Care. Stronger Tomorrows.",
  positioning:
    "Specialised breast cancer surgery and oncoplastic care in Ahmedabad, Gujarat. Compassionate, evidence-based and personalised breast care from diagnosis to recovery and beyond.",
  description:
    "Dr. Noopur Patel is a Breast Cancer Surgeon and Associate Consultant in Surgical Breast Oncology at Marengo CIMS Hospital, Ahmedabad. Dedicated to comprehensive, compassionate care for women at every stage.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://drnoopurpatel.com",
  ogImage: "/images/doctor/assets/hero-doctor.png",
  contact: {
    phone: "+91 98765 43210",
    phoneFormatted: "+91 98765 43210",
    whatsappNumber: "919876543210",
    whatsappDisplay: "+91 98765 43210",
    email: "dr.noopurpatel@gmail.com",
    address: "Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat 380060",
    workingHours: "Mon - Sat: 10:00 AM - 6:00 PM",
  },
  socials: {
    instagram: "https://instagram.com/drnoopurpatel",
    facebook: "https://facebook.com/drnoopurpatel",
    youtube: "https://youtube.com/@drnoopurpatel",
    linkedin: "https://linkedin.com/in/drnoopurpatel",
    twitter: "https://twitter.com/drnoopurpatel",
  },
  cta: {
    primaryText: "Book an Appointment",
    primaryHref: "/appointments",
    whatsappText: "Consult on WhatsApp",
  },
} as const;
