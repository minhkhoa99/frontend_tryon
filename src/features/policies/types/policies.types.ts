export type PolicySidebarItem = {
  id: string;
  label: string;
  active?: boolean;
};

export type PolicyCard = {
  id: string;
  title: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer?: string;
  expanded?: boolean;
};

export type PoliciesContent = {
  breadcrumb: string[];
  sidebarTitle: string;
  sidebarItems: PolicySidebarItem[];
  intro: string;
  policyCards: PolicyCard[];
  faqTitle: string;
  faqItems: FaqItem[];
  ctaLabel: string;
};
