"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getCartDrawerContent } from "@/features/cart/services/cart-content.service";

function CartPageBreadcrumb({ items }: { items: string[] }) {
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

export function CartPage() {
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
    <main className="min-h-screen bg-[#0A0A0D]">
      <div className="mx-auto w-full max-w-[1440px]">
        <CartPageBreadcrumb items={content.breadcrumb} />

        <section className="flex flex-col gap-7 px-4 py-6 md:px-8 xl:flex-row xl:items-start xl:gap-[28px] xl:px-12">
          <motion.div {...motionProps} className="flex w-full flex-col gap-5 xl:w-[840px] xl:flex-none">
            <div className="flex flex-col gap-3">
              <h1 className="font-[family-name:var(--font-playfair)] text-[42px] font-bold leading-[1.05] text-[#FFF7F2]">
                {content.title}
              </h1>
              <p className="max-w-[640px] text-[15px] leading-[1.6] text-[#CEC6C1]">{content.description}</p>
            </div>

            <div className="flex flex-col gap-[10px] rounded-[24px] border border-white/[0.06] bg-[#121218CC] p-4">
              <p className="text-[14px] font-semibold text-[#F4ECE7]">{content.freeShippingMessage}</p>
              <div className="h-[10px] rounded-full bg-white/[0.06] p-0">
                <div className="h-[10px] w-[320px] rounded-full bg-linear-to-r from-[#F6D2DB] to-[#D89AAE] shadow-[0_0_14px_rgba(241,196,214,0.28)]" />
              </div>
            </div>

            {content.items.map((item) => (
              <div key={item.id} className="flex gap-[14px] rounded-[24px] border border-white/[0.06] bg-[#17161D] p-[14px]">
                <div className="relative h-[120px] w-[104px] flex-none overflow-hidden rounded-[18px] bg-[#221f28]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="104px" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <p className="text-[18px] font-semibold text-[#FFF4EF]">{item.name}</p>
                  <p className="text-[13px] font-medium text-[#BEB5B0]">{item.meta} - {item.price}</p>
                  <button type="button" className="w-fit text-[13px] font-semibold text-[#E4B8C8]">Xóa</button>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[#F4ECE7]">-</span>
                    <span className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[#FFF4EF]">{item.quantity}</span>
                    <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[#F4ECE7]">+</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.aside {...motionProps} className="flex w-full flex-col gap-[18px] xl:flex-1 xl:max-w-[476px]">
            <div className="flex flex-col gap-[14px] rounded-[30px] border border-white/[0.08] bg-[#13131ACC] p-5 backdrop-blur-[18px]">
              <h2 className="font-[family-name:var(--font-playfair)] text-[32px] font-bold text-[#FFF7F2]">Tóm tắt đơn hàng</h2>
              <p className="font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[#F4ECE7]">
                {content.subtotalLabel}: {content.subtotalValue}
              </p>
              <p className="text-[13px] font-semibold text-[#BEB5B0]">{content.orderNoteLabel}</p>
              <div className="h-24 rounded-[20px] border border-white/[0.07] bg-white/[0.05]" />
              <Link
                href="/checkout"
                className="flex w-full items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] px-[22px] py-[18px] text-[15px] font-bold text-[#140E12] shadow-[0_18px_38px_rgba(241,196,214,0.26)]"
              >
                {content.checkoutLabel}
              </Link>
            </div>
          </motion.aside>
        </section>
      </div>
    </main>
  );
}
