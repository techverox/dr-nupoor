export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Discover",
    description: "We understand your business model, competitive landscape, target audience, and growth objectives.",
    iconName: "search",
  },
  {
    stepNumber: 2,
    title: "Plan",
    description: "We craft a customized, data-backed digital roadmap tailored to your specific budget and timeline.",
    iconName: "document",
  },
  {
    stepNumber: 3,
    title: "Execute",
    description: "Our dedicated specialists implement high-impact creatives, campaigns, and technical architectures with precision.",
    iconName: "gear",
  },
  {
    stepNumber: 4,
    title: "Optimize",
    description: "We continuously monitor live performance, run A/B split tests, and refine campaigns for maximum conversion efficiency.",
    iconName: "chart",
  },
  {
    stepNumber: 5,
    title: "Deliver Results",
    description: "We deliver measurable business growth, transparent analytics reports, and long-term sustainable revenue scaling.",
    iconName: "trophy",
  },
];
