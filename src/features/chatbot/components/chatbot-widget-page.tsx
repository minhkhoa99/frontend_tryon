"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import { getChatbotWidgetContent } from "@/features/chatbot/services/chatbot-content.service";

function ChatbotBreadcrumb({ items }: { items: string[] }) {
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

export function ChatbotWidgetPage() {
  const content = getChatbotWidgetContent();
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
        <ChatbotBreadcrumb items={content.breadcrumb} />

        <section className="flex flex-col gap-7 px-4 py-7 md:px-8 xl:flex-row xl:items-start xl:gap-[28px] xl:px-12">
          <motion.div {...motionProps} className="flex w-full flex-col gap-[18px] xl:w-[600px] xl:flex-none">
            <h1 className="whitespace-pre-line font-[family-name:var(--font-playfair)] text-[34px] font-bold leading-[1.08] text-[#FFF7F2] md:text-[38px]">
              {content.title}
            </h1>
            <p className="max-w-[560px] text-[16px] leading-[1.6] text-[#CEC6C1]">{content.description}</p>

            <div className="flex max-w-[360px] flex-col gap-[10px] rounded-[28px] border border-white/[0.07] bg-[#121218CC] p-[18px]">
              <h2 className="text-[16px] font-semibold text-[#F4ECE7]">{content.useCasesTitle}</h2>
              <div className="text-[14px] leading-[1.6] text-[#CFC6C1]">
                {content.useCases.map((item) => (
                  <div key={item.id}>• {item.label}</div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...motionProps} className="flex w-full flex-col gap-[18px] rounded-[34px] border border-white/[0.07] p-[22px] xl:flex-1">
            <div className="flex items-center justify-between gap-4">
              <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#E4B8C8]">{content.previewLabel}</span>
              <span className="text-[12px] font-medium text-[#CEC6C1]">{content.previewHint}</span>
            </div>

            <div className="relative h-[780px] overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0E1015] p-[26px]">
              <div className="flex h-full flex-col gap-[18px] rounded-[24px]">
                <div className="h-[220px] rounded-[24px] border border-white/[0.06] bg-[#111118AA]" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="h-[120px] rounded-[22px] bg-[#121219]" />
                  <div className="h-[120px] rounded-[22px] bg-[#121219]" />
                </div>

                <div className="relative mt-auto h-[330px]">
                  <div className="absolute bottom-[18px] right-0 z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/[0.08] bg-[#13131ACC] shadow-[0_10px_24px_rgba(0,0,0,0.3)] backdrop-blur-[14px]">
                    <div className="relative flex h-[26px] w-[26px] items-center justify-center rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[#140E12]">
                      ✦
                      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#F1C6D4] shadow-[0_0_10px_rgba(241,198,212,0.7)]" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-[62px] flex w-full max-w-[360px] flex-col gap-[14px] rounded-[28px] border border-white/[0.08] bg-[#17161CCC] p-[18px] shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-[22px]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[15px] font-semibold text-[#FFF4EF]">{content.widgetTitle}</span>
                      <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#E4B8C8]">{content.widgetStatus}</span>
                    </div>

                    <div className="rounded-[22px] border border-white/[0.06] bg-[#1E1B24] px-4 py-[14px] text-[14px] leading-[1.5] text-[#F4ECE7]">
                      {content.messages[0]?.content}
                    </div>

                    <div className="rounded-[22px] border border-[#F1C6D433] bg-[#F0D0D722] px-4 py-[14px]">
                      <p className="text-[14px] leading-[1.5] text-[#FFF4EF]">{content.messages[1]?.content}</p>

                      <div className="mt-3 flex gap-3 rounded-[18px] border border-white/[0.06] bg-[#17161D] p-[10px]">
                        <div className="relative h-[82px] w-[72px] flex-none overflow-hidden rounded-[14px] bg-[#221f28]">
                          <Image
                            src={content.suggestedProduct.image}
                            alt={content.suggestedProduct.name}
                            fill
                            className="object-cover"
                            sizes="72px"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                          <p className="text-[14px] font-semibold text-[#FFF4EF]">{content.suggestedProduct.name}</p>
                          <p className="text-[12px] leading-[1.45] text-[#CEC6C1]">{content.suggestedProduct.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.05] px-[14px] py-3 text-[14px] font-medium text-[#FFF4EF]">
                      {content.messages[2]?.content}
                    </div>

                    <div className="flex flex-wrap gap-[10px]">
                      {content.quickReplies.map((reply) => (
                        <button
                          key={reply.id}
                          type="button"
                          className={cn(
                            "rounded-full px-4 py-3 text-[13px] font-semibold transition",
                            reply.variant === "primary"
                              ? "bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[#140E12]"
                              : "border border-white/[0.08] bg-white/[0.05] text-[#F4ECE7]",
                          )}
                        >
                          {reply.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
