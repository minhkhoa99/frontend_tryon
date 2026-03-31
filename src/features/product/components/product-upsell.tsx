"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { UpsellProduct } from "@/features/product/types/product.types";

type ProductUpsellProps = {
  products: UpsellProduct[];
};

export function ProductUpsell({ products }: ProductUpsellProps) {
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
    <motion.section
      {...motionProps}
      className="px-4 pb-0 pt-2 md:px-8 xl:px-12"
    >
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="font-[family-name:var(--font-playfair)] text-[36px] font-bold text-[#fff7f2]">
          Phối cùng AI
        </h2>
        <p className="text-[15px] font-medium text-[#beb5b0]">
          AI Stylist gợi ý phối cùng bộ này
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[18px] pb-4 md:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            {...(shouldReduceMotion === false
              ? {
                  initial: { opacity: 0, y: 14 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut" as const,
                  },
                }
              : { initial: false })}
            className="flex w-full flex-col gap-3 rounded-[26px] border border-white/[0.06] bg-[#121219] p-[14px] pb-[18px]"
          >
            <div className="relative h-[210px] overflow-hidden rounded-[22px] bg-[#121218]">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <h3 className="text-[18px] font-semibold text-[#fff4ef]">
              {product.name}
            </h3>
            <p className="font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[#d9afc0]">
              {product.price}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
