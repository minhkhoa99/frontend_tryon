export type CheckoutPaymentMethodId = "card" | "cod" | "wallet";

export type CheckoutFormValues = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: CheckoutPaymentMethodId;
};

export type CheckoutPaymentMethod = {
  id: CheckoutPaymentMethodId;
  label: string;
  detail?: string;
};

export type CheckoutSummaryItem = {
  id: string;
  image: string;
  name: string;
  meta: string;
  price: string;
};

export type CheckoutBreakdownLine = {
  id: string;
  label: string;
  value: string;
  tone?: "default" | "positive";
};

export type CheckoutTrustItem = {
  id: string;
  label: string;
  detail: string;
};

export type CheckoutContent = {
  breadcrumb: string[];
  title: string;
  description: string;
  submitLabel: string;
  promoCode: string;
  promoCta: string;
  shippingTitle: string;
  paymentTitle: string;
  summaryBadge: string;
  summaryTitle: string;
  paymentMethods: CheckoutPaymentMethod[];
  summaryItems: CheckoutSummaryItem[];
  breakdownLines: CheckoutBreakdownLine[];
  totalLabel: string;
  totalValue: string;
  trustItems: CheckoutTrustItem[];
  defaultValues: CheckoutFormValues;
};
