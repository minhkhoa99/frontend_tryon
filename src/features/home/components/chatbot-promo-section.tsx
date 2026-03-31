"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ChatMessage } from "@/features/home/types/home.types";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { GlassPanel } from "@/shared/components/ui/glass-panel";
import { PremiumButton } from "@/shared/components/ui/premium-button";
import { SectionHeading } from "@/shared/components/ui/section-heading";

type ChatbotPromoSectionProps = {
  messages: ChatMessage[];
};

export function ChatbotPromoSection({ messages }: ChatbotPromoSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const previewRef = useRef<HTMLDivElement>(null);
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
    <section id="chat-stylist" className="scroll-mt-28 bg-[#090a0f] py-16 md:py-20">
      <SiteShell>
        <div className="grid gap-8 px-2 md:px-4 xl:grid-cols-[minmax(0,1fr)_420px] xl:px-16">
          <div className="flex flex-col justify-center gap-[18px]">
            <SectionHeading
              eyebrow="CHATBOT PROMO"
              title="AI Stylist đồng hành từ chọn size đến chốt outfit."
              description="Chatbot hỗ trợ tư vấn chất liệu, phối đồ, kiểm tra đơn hàng và đề xuất look mới dựa trên lịch sử thử đồ của bạn."
            />
            <div>
              <PremiumButton
                onClick={() => {
                  previewRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "nearest" });
                  previewRef.current?.focus();
                }}
              >
                Mở Chat Stylist
              </PremiumButton>
            </div>
          </div>

          <motion.div
            {...motionProps}
          >
            <GlassPanel
              ref={previewRef}
              id="chat-preview"
              tabIndex={-1}
              className="flex flex-col gap-[14px] rounded-[30px] p-6"
            >
              <p className="text-[15px] font-semibold text-[#fff4ef]">AI Stylist</p>
              <ul aria-label="Tin nhắn xem trước từ AI Stylist" className="flex flex-col gap-[14px]">
                {messages.map((message) => {
                  const senderLabel = message.role === "assistant" ? "AI Stylist" : "Bạn";

                  return (
                    <li
                      key={message.id}
                      aria-label={senderLabel}
                      className={
                        message.role === "assistant"
                          ? "rounded-[22px] bg-[#17161c] px-4 py-[14px]"
                          : "rounded-[22px] bg-[#f0d0d7] px-4 py-[14px]"
                      }
                    >
                      <p
                        className={
                          message.role === "assistant"
                            ? "text-[15px] font-medium text-[#fff4ef]"
                            : "text-[15px] font-medium text-[#1a1216]"
                        }
                      >
                        <span className="sr-only">{senderLabel}: </span>
                        {message.message}
                      </p>
                      {message.role === "assistant" && message.hint ? (
                        <p className="mt-2 text-[13px] leading-6 text-[#cfc6c1]">{message.hint}</p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </GlassPanel>
          </motion.div>
        </div>
      </SiteShell>
    </section>
  );
}
