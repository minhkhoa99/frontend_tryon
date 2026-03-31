"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkoutSchema, type CheckoutSchema } from "@/features/checkout/schemas/checkout.schema";
import type { CheckoutFormValues } from "@/features/checkout/types/checkout.types";

export function useCheckoutForm(defaultValues: CheckoutFormValues) {
  return useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
    mode: "onBlur",
  });
}
