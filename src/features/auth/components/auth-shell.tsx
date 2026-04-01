"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type { AuthShellContent } from "@/features/auth/types/auth.types";

type AuthShellProps = {
  content: AuthShellContent;
  activeTab: AuthShellContent["tabs"][number]["id"];
  children: React.ReactNode;
};

export function AuthShell({ content, activeTab, children }: AuthShellProps) {
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
    <main className="min-h-screen bg-[#070709]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] xl:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-linear-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] xl:block">
          <div className="absolute left-8 top-12 h-[400px] w-[400px] rounded-full bg-radial from-[#F6D2DB] to-transparent blur-[80px]" />
          <div className="absolute left-[240px] top-10 h-[300px] w-[300px] rounded-full bg-radial from-[#D89AAE] to-transparent blur-[60px]" />
          <div className="absolute left-[420px] top-12 h-[250px] w-[250px] rounded-full bg-radial from-[#C68EA0] to-transparent blur-[50px]" />
          <div className="absolute right-[120px] top-10 font-[family-name:var(--font-playfair)] text-[72px] font-bold tracking-[0.5rem] text-white">
            AURELIA
          </div>
        </section>

        <section className="flex min-h-screen flex-col bg-[#070709]">
          <div className="flex flex-1 items-center justify-center p-6 md:p-10 xl:p-20">
            <motion.div
              {...motionProps}
              className="w-full max-w-[520px] rounded-[24px] border border-white/[0.08] bg-white/[0.05] p-[34px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-[40px]"
            >
              {children}

              <div className="mt-6 grid grid-cols-3 gap-2">
                {content.tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={cn(
                      "flex h-[42px] items-center justify-center rounded-full text-[13px] font-semibold",
                      tab.id === activeTab
                        ? "bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[#140E12]"
                        : "border border-white/[0.08] bg-white/[0.05] text-[#E8E0DB]",
                    )}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
