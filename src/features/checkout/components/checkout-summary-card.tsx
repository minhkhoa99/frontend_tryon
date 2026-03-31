"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import type { CheckoutContent } from "@/features/checkout/types/checkout.types";

type CheckoutSummaryCardProps = {
  content: CheckoutContent;
};

export function CheckoutSummaryCard({ content }: CheckoutSummaryCardProps) {
  const [promoCode, setPromoCode] = useState(content.promoCode);
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
    <motion.aside
      {...motionProps}
      className="flex w-full flex-col gap-[18px] xl:max-w-[544px] xl:flex-1 xl:self-start xl:pt-1"
    >
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.05] px-[14px] py-[10px] text-[11px] font-semibold text-[#E4B8C8] backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-[#F1C6D4] shadow-[0_0_16px_rgba(241,198,212,0.6)]" />
        <span className="font-[family-name:var(--font-mono)]">{content.summaryBadge}</span>
      </div>

      <div className="flex flex-col gap-[18px] rounded-[34px] border border-white/[0.09] bg-[#15141CD9] p-[22px] shadow-[0_18px_48px_rgba(0,0,0,0.3)] backdrop-blur-[20px] xl:sticky xl:top-28">
        <h2 className="font-[family-name:var(--font-playfair)] text-[32px] font-bold leading-[1.05] text-[#FFF7F2]">
          {content.summaryTitle}
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

        <div className="flex gap-[10px]">
          <label className="flex flex-1 flex-col gap-1.5 rounded-[18px] border border-transparent bg-white/[0.05] px-4 py-[14px] outline-none ring-0 shadow-none focus:outline-none focus:ring-0">
            <span className="text-[11px] font-semibold text-[#9A918B]">Mã giảm giá</span>
            <input
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value.toUpperCase())}
              placeholder="Nhập mã giảm giá"
              className="w-full border-0 border-transparent bg-transparent p-0 font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[#F4ECE7] outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-[#8F8884]"
            />
          </label>
          <button
            type="button"
            className="rounded-[18px] bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] px-5 py-4 text-[14px] font-bold text-[#140E12] shadow-[0_16px_32px_rgba(241,196,214,0.2)]"
          >
            {content.promoCta}
          </button>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          {content.breakdownLines.map((line) => (
            <div key={line.id} className="flex items-center justify-between gap-4 text-[14px]">
              <span className="text-[#BEB5B0]">{line.label}</span>
              <span
                className={cn(
                  "font-[family-name:var(--font-mono)] font-semibold",
                  line.tone === "positive" ? "text-[#D8ECCA]" : "text-[#F4ECE7]",
                )}
              >
                {line.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
          <span className="text-[16px] font-bold text-[#FFF7F2]">{content.totalLabel}</span>
          <span className="font-[family-name:var(--font-mono)] text-[18px] font-bold text-[#E5B6C7]">{content.totalValue}</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {content.trustItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-1.5 rounded-[18px] border border-white/[0.06] bg-[#17161D] p-3">
              <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#E4B8C8]">
                {item.label}
              </span>
              <span className="text-[12px] font-medium text-[#CFC6C1]">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
