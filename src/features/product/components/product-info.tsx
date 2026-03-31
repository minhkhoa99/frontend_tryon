"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type {
  ProductColor,
  ProductSize,
  ProductAccordionItem,
} from "@/features/product/types/product.types";

type ProductInfoProps = {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  accordions: ProductAccordionItem[];
  rating: number;
  reviewCount: number;
};

export function ProductInfo({
  name,
  price,
  originalPrice,
  description,
  colors,
  sizes,
  accordions,
  rating,
  reviewCount,
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(
    colors.find((c) => c.inStock)?.id ?? colors[0]?.id,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>("s");
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    accordions[0]?.id ?? null,
  );

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
    <div className="flex w-full flex-col gap-[18px] rounded-[32px] border border-white/[0.08] bg-[#121218cc] p-6 backdrop-blur-[18px] lg:sticky lg:top-28">
      <motion.div {...motionProps} className="flex flex-col gap-3">
        <h1 className="font-[family-name:var(--font-playfair)] text-[42px] font-bold leading-[1.1] text-[#fff7f2]">
          {name}
        </h1>

        <span className="font-[family-name:var(--font-mono)] text-[22px] font-semibold text-[#e5b6c7]">
          {price}
        </span>

        <p className="text-[15px] leading-[1.55] text-[#cec6c1]">{description}</p>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/[0.05] px-3 py-2 text-[12px] font-semibold leading-none font-[family-name:var(--font-mono)] text-[#f4ece7] ring-1 ring-white/[0.06]">
            {rating} / 5
          </span>
          <span className="rounded-full bg-white/[0.05] px-3 py-2 text-[12px] text-[12px] font-[family-name:var(--font-inter)] text-[#f4ece7] ring-1 ring-white/[0.06]">
            {reviewCount} reviews
          </span>
          <span className="rounded-full bg-white/[0.05] px-3 py-2 text-[12px] font-[family-name:var(--font-inter)] text-[#d8ecca] ring-1 ring-white/[0.06]">
            In stock
          </span>
        </div>
      </motion.div>

      <motion.div {...motionProps} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-semibold text-[#f4ece7]">Color</span>
          <div className="flex gap-3">
            {colors.map((color) => {
              const baseClasses = "h-[22px] w-[22px] flex-shrink-0 rounded-full transition-all";
              const ringClasses = cn(
                !color.inStock && "cursor-not-allowed opacity-40",
                selectedColor === color.id
                  ? "ring-2 ring-[#FFF8FB]"
                  : color.id === "noir"
                    ? "ring-1 ring-white/[0.06]"
                    : color.id === "mocha"
                      ? ""
                      : "ring-1 ring-white/[0.06]"
              );
              return (
                <button
                  key={color.id}
                  type="button"
                  disabled={!color.inStock}
                  onClick={() => setSelectedColor(color.id)}
                  className={cn(baseClasses, ringClasses)}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-semibold text-[#f4ece7]">Size</span>
          <div className="flex gap-[10px]">
            {sizes.map((size) => {
              const isSelected = selectedSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  disabled={!size.inStock}
                  onClick={() => setSelectedSize(size.id)}
                  className={cn(
                    "rounded-full px-4 py-3 text-[13px] font-semibold transition-all",
                    "font-[family-name:var(--font-mono)]",
                    size.inStock
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-40",
                    isSelected
                      ? "bg-gradient-to-r from-[#f6d2db] to-[#d89aae] text-[#140e12] font-bold"
                      : "bg-white/[0.05] text-[#e7deda] ring-1 ring-white/[0.06]",
                  )}
                >
                  {size.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[13px] font-medium text-[#beb5b0]">Size guide available</span>
          <span className="font-[family-name:var(--font-mono)] text-[12px] font-medium text-[#756f6a]">/</span>
          <button
            type="button"
            className="text-[13px] font-semibold text-[#f1c6d4] underline underline-offset-2"
          >
            Open size chatbot
          </button>
        </div>
      </motion.div>

      <motion.div {...motionProps} className="flex gap-3">
        <button
          type="button"
          className="flex-1 rounded-full bg-gradient-to-r from-[#f6d2db] to-[#d89aae] px-6 py-4 text-[15px] font-bold text-[#140e12] transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Thử áo này bằng AI
        </button>
        <button
          type="button"
          className="flex-1 rounded-full bg-white/[0.05] px-6 py-4 text-[15px] font-bold text-[#f4ece7] ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.06] active:scale-[0.98]"
        >
          Thêm vào giỏ
        </button>
      </motion.div>

      <motion.div {...motionProps} className="rounded-[28px] border border-white/[0.08] bg-[#111118cc] p-5 backdrop-blur-[16px]">
        {accordions.map((item) => {
          const isOpen = openAccordion === item.id;
          return (
            <div key={item.id} className="flex flex-col">
              <button
                type="button"
                onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-[16px] font-semibold text-[#fff7f2]">
                  {item.title}
                </span>
                <svg
                  className={cn(
                    "h-4 w-4 text-[#cec6c1] transform",
                    isOpen && "rotate-180",
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isOpen ? "max-h-96 pb-4" : "max-h-0",
                )}
              >
                <p className="text-[14px] leading-[1.55] text-[#cec6c1]">
                  {item.content}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
