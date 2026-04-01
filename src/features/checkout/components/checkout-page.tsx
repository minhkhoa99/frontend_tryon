"use client";

import { useRouter } from "next/navigation";
import { CheckoutBreadcrumb } from "@/features/checkout/components/checkout-breadcrumb";
import { CheckoutFormCard } from "@/features/checkout/components/checkout-form-card";
import { CheckoutSummaryCard } from "@/features/checkout/components/checkout-summary-card";
import { useCheckoutForm } from "@/features/checkout/hooks/use-checkout-form";
import { getCheckoutContent } from "@/features/checkout/services/checkout-content.service";
import type { CheckoutSchema } from "@/features/checkout/schemas/checkout.schema";

export function CheckoutPage() {
  const content = getCheckoutContent();
  const form = useCheckoutForm(content.defaultValues);
  const router = useRouter();

  const handleSubmit = async (_values: CheckoutSchema) => {
    void _values;
    await new Promise((resolve) => setTimeout(resolve, 200));
    router.push("/checkout/success");
  };

  return (
    <main className="min-h-screen bg-[#0A0A0D]">
      <div className="mx-auto w-full max-w-[1440px]">
        <CheckoutBreadcrumb items={content.breadcrumb} />

        <section className="flex flex-col gap-7 px-4 py-6 md:px-8 xl:flex-row xl:items-start xl:gap-[28px] xl:px-12">
          <CheckoutFormCard content={content} form={form} onSubmit={handleSubmit} />
          <CheckoutSummaryCard content={content} />
        </section>
      </div>
    </main>
  );
}
