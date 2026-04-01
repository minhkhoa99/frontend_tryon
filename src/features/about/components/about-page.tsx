"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getAboutContent } from "@/features/about/services/about-content.service";

function AboutBreadcrumb({ items }: { items: string[] }) {
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

export function AboutPage() {
  const content = getAboutContent();
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
    <main className="min-h-screen bg-[#09090C]">
      <div className="mx-auto w-full max-w-[1440px]">
        <AboutBreadcrumb items={content.breadcrumb} />

        <motion.section
          {...motionProps}
          className="flex flex-col gap-7 px-4 pb-6 pt-[34px] md:px-8 xl:h-[760px] xl:flex-row xl:items-center xl:px-12"
        >
          <div className="flex w-full flex-col gap-[18px] xl:w-[620px] xl:flex-none">
            <h1 className="whitespace-pre-line font-[family-name:var(--font-playfair)] text-[48px] font-bold leading-[0.92] text-[#FFF7F2] md:text-[64px]">
              {content.heroTitle}
            </h1>
            <p className="max-w-[620px] text-[16px] leading-[1.65] text-[#CEC6C1]">{content.heroDescription}</p>
            <p className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#E4B8C8]">{content.heroHint}</p>
          </div>

          <div className="relative h-[520px] w-full overflow-hidden rounded-[36px] border border-white/[0.06] xl:h-full">
            <Image src={content.heroImage} alt="About hero visual" fill className="object-cover" sizes="(min-width: 1280px) 700px, 100vw" />
          </div>
        </motion.section>

        <motion.section
          {...motionProps}
          className="flex flex-col gap-7 px-4 pb-2 pt-6 md:px-8 xl:flex-row xl:items-start xl:px-12"
        >
          <div className="flex w-full flex-col gap-[10px] xl:w-[500px] xl:flex-none">
            <p className="text-[14px] font-semibold tracking-[0.114em] text-[#D7AFC0]">{content.visionEyebrow}</p>
            <h2 className="text-[28px] font-bold leading-[1.18] text-[#FFF7F2] font-[family-name:var(--font-playfair)]">
              {content.visionTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-[14px]">
            {content.visionParagraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[720px] text-[15px] leading-[1.6] text-[#CEC6C1]">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>

        <motion.section {...motionProps} className="flex flex-col gap-5 px-4 py-[34px] md:px-8 xl:px-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-[38px] font-bold text-[#FFF7F2]">{content.techTitle}</h2>
          <p className="text-[15px] font-medium text-[#CEC6C1]">{content.techSubtitle}</p>

          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
            {content.techCards.map((card) => (
              <div key={card.id} className="flex flex-col gap-[14px] rounded-[28px] border border-white/[0.08] bg-[#17161CCC] p-5 backdrop-blur-[18px]">
                <div className="relative h-[88px] w-[88px] overflow-hidden rounded-[22px] bg-[#1b1a22]">
                  <Image src={card.image} alt={card.title} fill className="object-cover" sizes="88px" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#F4ECE7]">{card.title}</h3>
                <p className="text-[14px] leading-[1.55] text-[#CEC6C1]">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-1 md:flex-row md:items-center md:justify-between">
            <p className="text-[15px] font-medium text-[#CEC6C1]">{content.ctaLabel}</p>
            <Link
              href="/try-on"
              className="w-fit rounded-full border border-[#F0C1D255] bg-white/[0.03] px-6 py-4 text-[15px] font-bold text-[#F4ECE7]"
            >
              {content.ctaAction}
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
