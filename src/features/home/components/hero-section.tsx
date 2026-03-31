"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { HeroAction } from "@/features/home/types/home.types";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { cn } from "@/shared/lib/cn";

type HeroSectionProps = {
  actions: HeroAction[];
};

function getActionClassName(variant: HeroAction["variant"]) {
  return cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300",
    variant === "primary"
      ? "bg-linear-to-b from-[#f6d2db] to-[#d89aae] text-[#140e12] shadow-[0_20px_40px_rgba(241,196,214,0.22)] hover:scale-[1.02]"
      : "border border-white/12 bg-white/6 text-[#f4ece7] backdrop-blur-md hover:bg-white/10",
  );
}

export function HeroSection({ actions }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };
  const motionProps = shouldReduceMotion === false
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
        variants: reveal,
        transition: { duration: 0.6, ease: "easeOut" as const },
      }
    : { initial: false as const };

  return (
    <section id="top" className="scroll-mt-28 overflow-hidden px-0 py-10 md:py-12">
      <SiteShell>
        <div className="grid min-h-[760px] gap-10 px-2 md:px-4 xl:grid-cols-[820px_minmax(0,1fr)] xl:gap-9 xl:px-16">
          <div className="flex flex-col justify-center gap-6 py-12 xl:py-0">
            <p className="text-[13px] font-semibold tracking-[0.22em] text-[#d7afc0]">LUXURY FASHION x AI</p>
            <h1 className="max-w-[8ch] font-[family-name:var(--font-playfair)] text-6xl leading-[0.95] text-[#fff7f2] md:text-[78px]">
              Thử Đồ Ảo - Trải Nghiệm Phong Cách Thật
            </h1>
            <p className="max-w-[560px] text-lg leading-8 text-[#d6cdc7]">
              Công nghệ AI Stylist cá nhân hóa giúp bạn thử outfit theo thời gian thực, khám phá bộ sưu tập cao cấp và chốt món đồ phù hợp chỉ trong vài chạm.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {actions.map((action) => (
                <Link key={`${action.href}-${action.label}`} href={action.href} className={getActionClassName(action.variant)}>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          <motion.div
            {...motionProps}
            className="relative flex min-h-[420px] items-center justify-center py-8 xl:min-h-full"
          >
            <div className="absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(240,184,199,0.2)_0%,_rgba(240,184,199,0)_68%)] blur-2xl" />
            <div className="relative h-[420px] w-[320px] rounded-[180px_180px_140px_140px] bg-linear-to-b from-[#20161c] via-[#2b1d25] to-[#130f14] shadow-[0_20px_80px_rgba(240,184,199,0.2)] blur-[0.2px] md:h-[560px] md:w-[430px]" />
            <div className="absolute h-[140px] w-[300px] rotate-[-12deg] rounded-[999px] bg-linear-to-r from-[#fff2f7aa] via-[#d999af55] to-transparent blur-md md:h-[180px] md:w-[420px]" />
            <div className="absolute inset-y-14 right-[10%] w-px bg-linear-to-b from-transparent via-white/35 to-transparent" />
          </motion.div>
        </div>
      </SiteShell>
    </section>
  );
}
