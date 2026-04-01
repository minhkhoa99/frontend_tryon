export type AboutTechCard = {
  id: string;
  image: string;
  title: string;
  description: string;
};

export type AboutContent = {
  breadcrumb: string[];
  heroTitle: string;
  heroDescription: string;
  heroHint: string;
  heroImage: string;
  visionEyebrow: string;
  visionTitle: string;
  visionParagraphs: string[];
  techTitle: string;
  techSubtitle: string;
  techCards: AboutTechCard[];
  ctaLabel: string;
  ctaAction: string;
};
