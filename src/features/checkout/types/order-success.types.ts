export type OrderSuccessMeta = {
  id: string;
  label: string;
  tone?: "default" | "success" | "accent";
};

export type OrderSuccessAction = {
  id: string;
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type OrderSuccessSummaryItem = {
  id: string;
  image: string;
  name: string;
  meta: string;
  price: string;
};

export type OrderSuccessStep = {
  id: string;
  title: string;
  description: string;
};

export type OrderSuccessTrustItem = {
  id: string;
  label: string;
  detail: string;
};

export type OrderSuccessContent = {
  breadcrumb: string[];
  title: string;
  description: string;
  orderSummaryTitle: string;
  nextStepsTitle: string;
  metas: OrderSuccessMeta[];
  actions: OrderSuccessAction[];
  summaryItems: OrderSuccessSummaryItem[];
  nextSteps: OrderSuccessStep[];
  trustItems: OrderSuccessTrustItem[];
};
