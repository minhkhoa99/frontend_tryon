"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { UseFormReturn } from "react-hook-form";
import { cn } from "@/shared/lib/cn";
import { PremiumButton } from "@/shared/components/ui/premium-button";
import type { CheckoutContent, CheckoutPaymentMethod } from "@/features/checkout/types/checkout.types";
import type { CheckoutSchema } from "@/features/checkout/schemas/checkout.schema";

type CheckoutFormCardProps = {
  content: CheckoutContent;
  form: UseFormReturn<CheckoutSchema>;
  onSubmit: (values: CheckoutSchema) => void | Promise<void>;
};

type FieldCardProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function FieldCard({ label, error, children }: FieldCardProps) {
  void error;

  return (
    <label className="flex w-full flex-col gap-2 rounded-[18px] border border-transparent bg-white px-4 py-[14px] outline-none ring-0 shadow-none focus:outline-none focus:ring-0">
      <span className="text-[11px] font-semibold text-[#9A918B]">{ label }</span>
      { children }
    </label>
  );
}

function PaymentMethodCard({
  method,
  checked,
  onChange,
}: {
  method: CheckoutPaymentMethod;
  checked: boolean;
  onChange: (id: CheckoutPaymentMethod["id"]) => void;
}) {
  return (
    <label
      className={ cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-[20px] border bg-white px-[18px] py-4 transition",
        checked ? "border-[#E8B9C9] ring-1 ring-[#E8B9C9]" : "border-[#E6DDD7] hover:border-[#dccdc6]",
      ) }
    >
      <input
        type="radio"
        className="sr-only"
        name="paymentMethod"
        checked={ checked }
        onChange={ () => onChange(method.id) }
      />
      <span
        className={ cn(
          "h-4 w-4 rounded-full border flex-shrink-0",
          checked ? "border-[4px] border-[#C77993] bg-[#F3D2DB]" : "border border-[#CFC4BD] bg-white",
        ) }
      />
      <span className="text-[15px] font-semibold text-[#171218]">{ method.label }</span>
      { method.detail ? (
        <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#9A918B]">
          { method.detail }
        </span>
      ) : null }
    </label>
  );
}

export function CheckoutFormCard({ content, form, onSubmit }: CheckoutFormCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };
  const motionProps =
    shouldReduceMotion === false
      ? ({
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
        variants: reveal,
        transition: { duration: 0.6, ease: "easeOut" as const },
      } as const)
      : ({ initial: false as const } as const);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const selectedPaymentMethod = watch("paymentMethod");

  return (
    <motion.div { ...motionProps } className="flex w-full flex-col gap-5 xl:w-[820px] xl:flex-none">
      <div className="flex flex-col gap-[10px]">
        <h1 className="font-[family-name:var(--font-playfair)] text-[42px] font-bold leading-[1.05] text-[#FFF7F2]">
          { content.title }
        </h1>
        <p className="max-w-[620px] text-[15px] leading-[1.55] text-[#BEB5B0]">{ content.description }</p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={ handleSubmit(onSubmit) } noValidate>
        <section className="flex flex-col gap-4 rounded-[30px] border border-[#E7DDD7] bg-[#F7F2EE] p-[22px]">
          <h2 className="text-[18px] font-semibold text-[#171218]">{ content.shippingTitle }</h2>

          <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
            <FieldCard label="Họ và tên" error={ errors.fullName?.message }>
              <input
                { ...register("fullName") }
                className="w-full border-0 border-transparent bg-transparent p-0 text-[15px] font-medium text-[#151117] outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-[#B6ABA4]"
              />
            </FieldCard>
            <FieldCard label="Số điện thoại" error={ errors.phone?.message }>
              <input
                { ...register("phone") }
                className="w-full border-0 border-transparent bg-transparent p-0 text-[15px] font-medium text-[#151117] outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-[#B6ABA4]"
              />
            </FieldCard>
          </div>

          <FieldCard label="Email" error={ errors.email?.message }>
            <input
              { ...register("email") }
              className="w-full border-0 border-transparent bg-transparent p-0 text-[15px] font-medium text-[#151117] outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-[#B6ABA4]"
            />
          </FieldCard>

          <FieldCard label="Địa chỉ nhận hàng" error={ errors.address?.message }>
            <input
              { ...register("address") }
              className="w-full border-0 border-transparent bg-transparent p-0 text-[15px] font-medium text-[#151117] outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-[#B6ABA4]"
            />
          </FieldCard>

          <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
            <FieldCard label="Tỉnh / Quận" error={ errors.city?.message }>
              <input
                { ...register("city") }
                className="w-full border-0 border-transparent bg-transparent p-0 text-[15px] font-medium text-[#151117] outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-[#B6ABA4]"
              />
            </FieldCard>
            <FieldCard label="Mã bưu chính" error={ errors.postalCode?.message }>
              <input
                { ...register("postalCode") }
                className="w-full border-0 border-transparent bg-transparent p-0 text-[15px] font-medium text-[#151117] outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-[#B6ABA4]"
              />
            </FieldCard>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-[30px] border border-[#E7DDD7] bg-[#F7F2EE] p-[22px]">
          <h2 className="text-[18px] font-semibold text-[#171218]">{ content.paymentTitle }</h2>
          <div className="flex flex-col gap-3">
            { content.paymentMethods.map((method) => (
              <PaymentMethodCard
                key={ method.id }
                method={ method }
                checked={ selectedPaymentMethod === method.id }
                onChange={ (id) => setValue("paymentMethod", id, { shouldValidate: true, shouldDirty: true }) }
              />
            )) }
          </div>
        </section>

        <PremiumButton
          type="submit"
          className="w-fit min-w-[144px] px-7 py-[18px] text-[15px] font-bold shadow-[0_20px_40px_rgba(241,196,214,0.26)]"
          disabled={ isSubmitting }
        >
          { content.submitLabel }
        </PremiumButton>
      </form>
    </motion.div>
  );
}
