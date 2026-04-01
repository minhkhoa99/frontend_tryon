export type OrderSidebarItem = {
  id: string;
  label: string;
  href: string;
  active?: boolean;
};

export type OrderStatusStep = {
  id: string;
  label: string;
  state: "done" | "current" | "upcoming";
};

export type OrderTrackingAction = {
  id: string;
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type OrderItem = {
  id: string;
  image: string;
  name: string;
  meta: string;
  price: string;
};

export type OrderHelpCard = {
  id: string;
  label: string;
  detail: string;
};

export type OrderTrackingContent = {
  breadcrumb: string[];
  sidebarTitle: string;
  sidebarItems: OrderSidebarItem[];
  title: string;
  statusLine: string;
  statusSteps: OrderStatusStep[];
  actions: OrderTrackingAction[];
  itemsTitle: string;
  items: OrderItem[];
  helpCards: OrderHelpCard[];
};
