export interface ClientBrand {
  id: string;
  name: string;
  category: string;
  logoText: string;
  accentColor: string;
}

export const CLIENT_BRANDS: ClientBrand[] = [
  {
    id: "ayush",
    name: "Ayush Wellness",
    category: "Health & Wellness",
    logoText: "ayush",
    accentColor: "#10b981",
  },
  {
    id: "kalpvruksh",
    name: "Kalpvruksh Wellness",
    category: "Wellness & Ayurvedic",
    logoText: "KALPVRUKSH",
    accentColor: "#059669",
  },
  {
    id: "mahalaxmi",
    name: "Mahalaxmi Jewellers",
    category: "Luxury & Retail",
    logoText: "MAHALAXMI",
    accentColor: "#d97706",
  },
  {
    id: "the-printing-wala",
    name: "The Printing Wala",
    category: "Custom Printing & Packaging",
    logoText: "THE PRINTING WALA",
    accentColor: "#dc2626",
  },
  {
    id: "riddhi-siddhi",
    name: "Riddhi Siddhi Foods",
    category: "FMCG & Food Products",
    logoText: "Riddhi Siddhi FOODS",
    accentColor: "#ea580c",
  },
  {
    id: "fit-and-fine",
    name: "Fit & Fine Gym",
    category: "Fitness & Health",
    logoText: "Fit & Fine GYM",
    accentColor: "#2563eb",
  },
  {
    id: "shreeji",
    name: "Shreeji Enterprise",
    category: "Manufacturing & B2B",
    logoText: "Shreeji ENTERPRISE",
    accentColor: "#7c3aed",
  },
];
