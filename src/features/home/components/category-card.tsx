"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { CategoryCard as CategoryCardType } from "@/features/home/types/home.types";

type CategoryCardProps = {
  category: CategoryCardType;
};

export function CategoryCard({ category }: CategoryCardProps) {
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
    <motion.article
      {...motionProps}
      className="group relative min-h-[240px] overflow-hidden rounded-[30px]"
    >
      <Image
        src={category.image}
        alt={category.alt}
        fill
        sizes="(min-width: 1280px) 416px, (min-width: 1024px) calc((100vw - 172px) / 3), (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#fff6f2]">
          {category.title}
        </h3>
        <p className="max-w-[32ch] text-[15px] leading-7 text-[#e5d7d2]">{category.description}</p>
      </div>
    </motion.article>
  );
}
