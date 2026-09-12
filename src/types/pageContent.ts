import { BaseEntity } from "./common";

export interface HomePageContent extends BaseEntity {
  heroBadge: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  whyUsTitle: string;
  whyUsSubtitle: string;
  ctaSectionHeadline: string;
  ctaSectionSubtitle: string;
}

export interface AboutPageContent extends BaseEntity {
  heroBadge?: string;
  heroHeadline: string;
  heroHeadlineHighlight?: string;
  heroSubheadline: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export interface ContactPageContent extends BaseEntity {
  heroBadge?: string;
  heroHeadline: string;
  heroHeadlineHighlight?: string;
  heroSubheadline: string;
  formTitle: string;
  formSubtitle: string;
  infoTitle: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  workingHours: string;
}

export type PageContentData = HomePageContent | AboutPageContent | ContactPageContent;
