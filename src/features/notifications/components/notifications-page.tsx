"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bell } from "lucide-react";
import { getNotificationsContent } from "@/features/notifications/services/notifications-content.service";
import { cn } from "@/shared/lib/cn";

export function NotificationsPage() {
  const content = getNotificationsContent();
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
    <main className="min-h-screen bg-[#090A0F] text-[#FFF7F2]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 md:px-8 xl:px-12">
        <div className="mb-10 flex items-start justify-between gap-6">
          <div className="max-w-[620px] space-y-3">
            <h1 className="font-[family-name:var(--font-playfair)] text-[42px] font-bold leading-[1.05] text-[#FFF7F2]">
              {content.title}
            </h1>
            <p className="text-[15px] leading-[1.6] text-[#CEC6C1]">{content.subtitle}</p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] md:flex">
            <Bell className="h-[18px] w-[18px] text-[#F4ECE7]" />
          </div>
        </div>

        <section className="grid gap-7 lg:grid-cols-[440px_minmax(0,1fr)]">
          <motion.div
            {...motionProps}
            className="flex flex-col gap-3 rounded-[32px] border border-white/[0.08] bg-[#17161CCC] p-5 backdrop-blur-[22px]"
          >
            {content.notifications.map((item) => (
              <div key={item.id} className="rounded-[22px] border border-white/[0.06] bg-[#121218CC] p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-[15px] font-semibold text-[#FFF4EF]">{item.title}</p>
                  <span className="text-[12px] font-medium text-[#A79F9A]">{item.time}</span>
                </div>
                <p className="text-[13px] leading-[1.55] text-[#CEC6C1]">{item.message}</p>
                {item.unread ? <span className="mt-3 inline-flex h-2.5 w-2.5 rounded-full bg-[#F6D2DB] shadow-[0_0_10px_rgba(246,210,219,0.6)]" /> : null}
              </div>
            ))}
          </motion.div>

          <motion.div {...motionProps} className="flex flex-col gap-4">
            {content.toastPreviews.map((toast, index) => (
              <div
                key={toast.id}
                className={cn(
                  "rounded-[28px] border border-white/[0.08] p-5 backdrop-blur-[18px]",
                  index === 0 ? "bg-[#17161CCC]" : "bg-[#14131ACC]",
                )}
              >
                <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#E4B8C8]">{toast.label}</p>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#F4ECE7]">{toast.description}</p>
              </div>
            ))}
          </motion.div>
        </section>
      </div>
    </main>
  );
}
