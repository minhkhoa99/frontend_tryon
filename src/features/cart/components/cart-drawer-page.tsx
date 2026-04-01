"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getCartDrawerContent } from "@/features/cart/services/cart-content.service";

function CartBreadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-2.5 px-4 pt-[18px] text-xs md:px-8 xl:px-12" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2.5">
        {items.map((item) => (
          <li key={item} className="font-semibold text-[#F2E4EA]">
            {item}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CartDrawerPage() {
  const content = getCartDrawerContent();
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
    <main className="min-h-screen bg-[#090A0D]">
      <div className="mx-auto w-full max-w-[1440px]">
        <CartBreadcrumb items={content.breadcrumb} />

        <section className="px-4 pb-8 pt-6 md:px-8 xl:px-12">
          <div className="relative min-h-[920px] overflow-hidden rounded-[34px] border border-white/[0.06] bg-[#070709CC]">
            <div className="flex flex-col gap-7 p-6 xl:flex-row xl:items-start xl:gap-4 xl:p-9">
              <motion.div
                {...motionProps}
                className="flex h-full w-full max-w-[760px] flex-col gap-[18px] rounded-[34px] border border-white/[0.06] p-7"
              >
                <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#E4B8C8]">
                  {content.backdropLabel}
                </span>
                <div className="relative h-[220px] overflow-hidden rounded-[24px]">
                  <Image src={content.backdropHero} alt="Website backdrop hero" fill className="object-cover" sizes="760px" />
                </div>
                <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
                  {content.backdropImages.map((item) => (
                    <div key={item.id} className="relative overflow-hidden rounded-[24px]" style={{ height: item.height }}>
                      <Image src={item.image} alt={item.id} fill className="object-cover" sizes="(min-width: 768px) 360px, 100vw" />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.aside
                {...motionProps}
                className="w-full max-w-[472px] rounded-[32px] border border-white/[0.09] bg-[#17161CCC] p-[22px] shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-[22px] xl:ml-auto"
              >
                <div className="flex items-center justify-between gap-3">
                  <h1 className="font-[family-name:var(--font-playfair)] text-[32px] font-bold text-[#FFF7F2]">
                    {content.title}
                  </h1>
                  <span className="text-[18px] font-semibold text-[#F4ECE7]">✕</span>
                </div>

                <div className="mt-[18px] flex flex-col gap-[10px] rounded-[24px] border border-white/[0.06] bg-[#121218CC] p-4">
                  <p className="text-[14px] font-semibold text-[#F4ECE7]">{content.freeShippingMessage}</p>
                  <div className="h-[10px] rounded-full bg-white/[0.06] p-0">
                    <div className="h-[10px] w-[260px] rounded-full bg-linear-to-r from-[#F6D2DB] to-[#D89AAE] shadow-[0_0_14px_rgba(241,196,214,0.28)]" />
                  </div>
                </div>

                <div className="mt-[18px] flex flex-col gap-[18px]">
                  {content.items.map((item) => (
                    <div key={item.id} className="flex gap-3 rounded-[22px] border border-white/[0.06] bg-[#17161D] p-3">
                      <div className="relative h-[92px] w-[78px] flex-none overflow-hidden rounded-[16px] bg-[#221f28]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="78px" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <p className="text-[15px] font-semibold text-[#FFF4EF]">{item.name}</p>
                        <p className="text-[12px] font-medium text-[#BEB5B0]">{item.meta}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[#F4ECE7]">−</span>
                          <span className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[#FFF4EF]">{item.quantity}</span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[#F4ECE7]">+</span>
                        </div>
                        <p className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[#E5B6C7]">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-[18px] flex flex-col gap-3 pt-2">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#BEB5B0]">{content.subtotalLabel}</span>
                    <span className="font-[family-name:var(--font-mono)] font-semibold text-[#FFF4EF]">{content.subtotalValue}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-[18px] flex w-full items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] px-[22px] py-[18px] text-[15px] font-bold text-[#140E12] shadow-[0_18px_38px_rgba(241,196,214,0.26)]"
                >
                  {content.checkoutLabel}
                </Link>
              </motion.aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
