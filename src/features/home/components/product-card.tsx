"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { TrendingProduct } from "@/features/home/types/home.types";

type ProductCardProps = {
  product: TrendingProduct;
};

export function ProductCard({ product }: ProductCardProps) {
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
      className="flex flex-col gap-[14px] rounded-[28px] border border-white/8 bg-[#121219] p-[18px] pb-[22px]"
    >
      <div className="relative aspect-[1/1] overflow-hidden rounded-[22px] md:aspect-[0.95/1]">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1280px) 417px, (min-width: 1024px) calc((100vw - 164px) / 3), (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-[#fff4ef]">{product.name}</h3>
      <p className="font-[family-name:var(--font-mono)] text-sm font-semibold text-[#d9afc0]">
        {product.price}
      </p>
    </motion.article>
  );
}
