"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import { getOrderTrackingContent } from "@/features/orders/services/orders-content.service";

function OrderBreadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-2.5 px-4 pt-[18px] text-xs md:px-8 xl:px-12" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item}-${index}`} className="flex items-center gap-2.5">
              <span className={isLast ? "font-semibold text-[#F2E4EA]" : "font-medium text-[#AFA7A2]"}>{item}</span>
              {!isLast ? <span className="font-medium text-[#756F6A]">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function OrderTrackingPage() {
  const content = getOrderTrackingContent();
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
        <OrderBreadcrumb items={content.breadcrumb} />

        <section className="flex flex-col gap-7 px-4 py-6 md:px-8 xl:flex-row xl:items-start xl:gap-[28px] xl:px-12">
          <motion.aside
            {...motionProps}
            className="flex w-full flex-col gap-[14px] rounded-[30px] border border-white/[0.08] bg-[#121218CC] p-[22px] backdrop-blur-[16px] xl:w-[280px] xl:flex-none"
          >
            <h2 className="text-[16px] font-semibold text-[#F4ECE7]">{content.sidebarTitle}</h2>
            {content.sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "text-[14px] font-medium transition",
                  item.active ? "text-[#F2E4EA]" : "text-[#BEB5B0] hover:text-[#F4ECE7]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </motion.aside>

          <div className="flex w-full flex-col gap-5">
            <motion.section
              {...motionProps}
              className="flex flex-col gap-4 rounded-[32px] border border-white/[0.08] bg-[#13131ACC] p-[22px] backdrop-blur-[18px]"
            >
              <h1 className="font-[family-name:var(--font-playfair)] text-[34px] font-bold leading-[1.08] text-[#FFF7F2] md:text-[38px]">
                {content.title}
              </h1>
              <p className="text-[15px] font-medium text-[#CEC6C1]">{content.statusLine}</p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-[14px]">
                {content.statusSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center gap-2 text-center">
                    <div className="flex w-full items-center justify-center gap-2 md:gap-3">
                      {index > 0 ? (
                        <span
                          className={cn(
                            "hidden h-px flex-1 md:block",
                            step.state === "upcoming" ? "bg-[#34343c]" : "bg-[#D89AAE]",
                          )}
                        />
                      ) : (
                        <span className="hidden flex-1 md:block" />
                      )}
                      <span
                        className={cn(
                          "h-[18px] w-[18px] rounded-full flex-none",
                          step.state === "current" && "bg-[#F6D2DB] shadow-[0_0_12px_rgba(241,198,212,0.55)]",
                          step.state === "done" && "bg-[#D89AAE]",
                          step.state === "upcoming" && "bg-[#4B4B55]",
                        )}
                      />
                      {index < content.statusSteps.length - 1 ? (
                        <span
                          className={cn(
                            "hidden h-px flex-1 md:block",
                            step.state === "upcoming" ? "bg-[#34343c]" : "bg-[#D89AAE]",
                          )}
                        />
                      ) : (
                        <span className="hidden flex-1 md:block" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[12px] font-semibold",
                        step.state === "current" ? "text-[#FFF7F2]" : step.state === "upcoming" ? "text-[#8F8884]" : "text-[#F4ECE7]",
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-[14px] pt-1">
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

            <motion.section
              {...motionProps}
              className="flex flex-col gap-4 rounded-[32px] border border-white/[0.07] bg-[#121218CC] p-[22px] backdrop-blur-[16px]"
            >
              <h2 className="text-[18px] font-semibold text-[#F4ECE7]">{content.itemsTitle}</h2>

              {content.items.map((item) => (
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
            </motion.section>

            <motion.section {...motionProps} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {content.helpCards.map((card) => (
                <div key={card.id} className="flex flex-col gap-1.5 rounded-[24px] border border-white/[0.07] bg-[#121218CC] p-4 backdrop-blur-[12px]">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#E4B8C8]">
                    {card.label}
                  </span>
                  <span className="text-[13px] font-medium text-[#CFC6C1]">{card.detail}</span>
                </div>
              ))}
            </motion.section>
          </div>
        </section>
      </div>
    </main>
  );
}
