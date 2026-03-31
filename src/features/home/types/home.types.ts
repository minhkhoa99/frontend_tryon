export type NavItem = {
  label: string;
  href: string;
};

export type HeroAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type HowStep = {
  index: string;
  title: string;
  description: string;
};

export type CategoryCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type TrendingProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  alt: string;
};

export type AssistantChatMessage = {
  id: string;
  role: "assistant";
  message: string;
  hint?: string;
};

export type UserChatMessage = {
  id: string;
  role: "user";
  message: string;
};

export type ChatMessage = AssistantChatMessage | UserChatMessage;

export type FooterLinkItem = {
  id: string;
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLinkItem[];
};

export type HomeContent = {
  navItems: NavItem[];
  heroActions: HeroAction[];
  howSteps: HowStep[];
  categories: CategoryCard[];
  products: TrendingProduct[];
  chatMessages: ChatMessage[];
  footerGroups: FooterLinkGroup[];
};
