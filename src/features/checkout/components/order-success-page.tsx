"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { CheckoutBreadcrumb } from "@/features/checkout/components/checkout-breadcrumb";
import { getOrderSuccessContent } from "@/features/checkout/services/order-success-content.service";
import { cn } from "@/shared/lib/cn";

export function OrderSuccessPage() {
  const content = getOrderSuccessContent();
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

  return (
    <main className="min-h-screen bg-[#0A0A0D]">
      <div className="mx-auto w-full max-w-[1440px]">
        <CheckoutBreadcrumb items={content.breadcrumb} />

        <motion.section {...motionProps} className="flex flex-col items-center gap-[22px] px-4 pb-6 pt-[34px] text-center md:px-8 xl:px-12">
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[46px] font-bold text-[#140E12] shadow-[0_0_36px_rgba(241,196,214,0.35)]">
            ✓
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] text-[38px] font-bold leading-[1.08] text-[#FFF7F2] md:text-[46px]">
            {content.title}
          </h1>

          <p className="max-w-[760px] text-[16px] leading-[1.6] text-[#CEC6C1]">{content.description}</p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {content.metas.map((meta) => (
              <div
                key={meta.id}
                className="rounded-full border border-white/[0.08] bg-white/[0.05] px-4 py-[10px] text-[12px] font-semibold"
              >
                <span
                  className={cn(
                    meta.tone === "success" && "text-[#D8ECCA]",
                    meta.tone === "accent" && "text-[#E4B8C8]",
                    !meta.tone && "font-[family-name:var(--font-mono)] text-[#F4ECE7]",
                  )}
                >
                  {meta.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-[14px]">
            {content.actions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className={cn(
                  "rounded-full px-6 py-4 text-[15px] font-semibold transition",
                  action.variant === "primary"
                    ? "bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[#140E12] shadow-[0_20px_40px_rgba(241,196,214,0.24)]"
                    : "border border-white/[0.08] bg-white/[0.05] text-[#F4ECE7] backdrop-blur-md",
                )}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section {...motionProps} className="px-4 pb-6 pt-2 md:px-8 xl:px-12">
          <div className="flex flex-col gap-[22px] rounded-[32px] border border-white/[0.08] bg-[#13131ACC] p-[22px] backdrop-blur-[18px] xl:flex-row">
            <div className="flex flex-1 flex-col gap-[14px]">
              <h2 className="font-[family-name:var(--font-playfair)] text-[34px] font-bold leading-[1.05] text-[#FFF7F2]">
                {content.orderSummaryTitle}
              </h2>

              {content.summaryItems.map((item) => (
                <div key={item.id} className="flex gap-[14px] rounded-[22px] border border-white/[0.06] bg-[#17161D] p-[14px]">
                  <div className="relative h-24 w-[84px] overflow-hidden rounded-2xl bg-[#221f28]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="84px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <p className="text-[16px] font-semibold text-[#FFF4EF]">{item.name}</p>
                    <p className="text-[13px] font-medium text-[#BEB5B0]">{item.meta}</p>
                    <p className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[#E5B6C7]">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col gap-[14px] xl:w-[360px] xl:flex-none">
              <h3 className="text-[16px] font-semibold text-[#F4ECE7]">{content.nextStepsTitle}</h3>
              {content.nextSteps.map((step) => (
                <div key={step.id} className="flex flex-col gap-2 rounded-[22px] border border-white/[0.06] bg-[#17161D] p-4">
                  <p className="text-[14px] font-semibold text-[#F4ECE7]">{step.title}</p>
                  <p className="text-[12px] leading-[1.5] text-[#BEB5B0]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...motionProps} className="px-4 pb-9 pt-0 md:px-8 xl:px-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {content.trustItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-1.5 rounded-[24px] border border-white/[0.07] bg-[#121218CC] p-4">
                <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#E4B8C8]">
                  {item.label}
                </span>
                <span className="text-[13px] font-medium text-[#CFC6C1]">{item.detail}</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
