"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getPoliciesContent } from "@/features/policies/services/policies-content.service";
import { cn } from "@/shared/lib/cn";

function PoliciesBreadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-2.5 px-4 pt-[18px] text-xs md:px-8 xl:px-12" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item}-${index}`} className="flex items-center gap-2.5">
              <span className={isLast ? "font-semibold text-[#4A3B44]" : "font-medium text-[#8F8884]"}>{item}</span>
              {!isLast ? <span className="font-medium text-[#B4ABA5]">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PoliciesPage() {
  const content = getPoliciesContent();
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
    <main className="min-h-screen bg-[#F7F3EF] text-[#2B1E26]">
      <div className="mx-auto w-full max-w-[1440px]">
        <PoliciesBreadcrumb items={content.breadcrumb} />

        <section className="flex flex-col gap-7 px-4 py-6 md:px-8 xl:flex-row xl:items-start xl:gap-[28px] xl:px-12">
          <motion.aside
            {...motionProps}
            className="flex w-full flex-col gap-3 rounded-[28px] border border-[#E7DDD7] bg-[#FBF8F5] p-5 xl:w-[300px] xl:flex-none"
          >
            <h1 className="text-[18px] font-semibold text-[#2B1E26]">{content.sidebarTitle}</h1>
            {content.sidebarItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "rounded-[18px] px-[14px] py-3 text-[14px]",
                  item.active
                    ? "border border-[#E6DDD7] bg-white font-semibold text-[#2B1E26]"
                    : "bg-[#F7F3EF] font-medium text-[#6F6560]",
                )}
              >
                {item.label}
              </div>
            ))}
          </motion.aside>

          <motion.div {...motionProps} className="flex w-full flex-col gap-5">
            <p className="text-[18px] font-medium text-[#6F6560]">{content.intro}</p>

            {content.policyCards.map((card) => (
              <div key={card.id} className="flex flex-col gap-[14px] rounded-[28px] border border-[#E7DDD7] bg-white p-[22px]">
                <h2 className="text-[24px] font-bold text-[#2B1E26]">{card.title}</h2>
                <p className="max-w-[880px] text-[15px] leading-[1.7] text-[#4A4440]">{card.description}</p>
              </div>
            ))}

            <div className="flex flex-col gap-[14px] rounded-[28px] border border-[#E7DDD7] bg-white p-[22px]">
              <h2 className="text-[24px] font-bold text-[#2B1E26]">{content.faqTitle}</h2>

              {content.faqItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-[14px]">
                  <div className="flex items-center justify-between rounded-[20px] border border-[#E7DDD7] bg-[#FBF8F5] px-[18px] py-4">
                    <span className="text-[15px] font-semibold text-[#2B1E26]">{item.question}</span>
                    <span className="font-[family-name:var(--font-mono)] text-[16px] font-semibold text-[#8C5F72]">
                      {item.expanded ? "-" : "+"}
                    </span>
                  </div>
                  {item.answer ? <p className="text-[15px] leading-[1.7] text-[#4A4440]">{item.answer}</p> : null}
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Link
                href="/chatbot"
                className="rounded-full border border-[#E7DDD7] bg-white px-6 py-4 text-[15px] font-bold text-[#4A3B44]"
              >
                {content.ctaLabel}
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
