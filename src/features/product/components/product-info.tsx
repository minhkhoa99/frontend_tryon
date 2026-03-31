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
    <div className="relative z-0 flex w-full self-start overflow-visible pt-1 flex-col gap-6 md:gap-7 xl:max-w-[556px] xl:h-[792px] xl:pt-0">
      <div className="relative z-0 flex-1 overflow-visible rounded-[32px] border border-white/[0.078] bg-[#121218cc] p-6 backdrop-blur-[18px]">
        <motion.div {...motionProps} className="flex flex-col gap-4">
          <h1 className="font-[family-name:var(--font-playfair)] text-[42px] font-bold leading-[1.1] text-[#fff7f2]">
            {name}
          </h1>

          <span className="font-[family-name:var(--font-mono)] text-[22px] font-semibold text-[#e5b6c7]">
            {price}
          </span>

          <p className="text-[15px] leading-[1.55] text-[#cec6c1]">{description}</p>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-white/[0.047] px-3 py-2 text-[12px] font-semibold leading-none font-[family-name:var(--font-mono)] text-[#f4ece7] ring-1 ring-white/[0.086]">
              {rating} / 5
            </span>
            <span className="rounded-full bg-white/[0.047] px-3 py-2 text-[12px] font-semibold text-[#f4ece7] ring-1 ring-white/[0.086]">
              {reviewCount} reviews
            </span>
            <span className="rounded-full bg-white/[0.047] px-3 py-2 text-[12px] font-semibold text-[#d8ecca] ring-1 ring-white/[0.086]">
              In stock
            </span>
          </div>
        </motion.div>

        <motion.div {...motionProps} className="mt-6 flex flex-col gap-5 overflow-visible md:gap-6">
          <div className="flex flex-col gap-3 overflow-visible">
            <span className="text-[14px] font-semibold text-[#f4ece7]">Color</span>
            <div className="flex flex-wrap items-center gap-3 overflow-visible py-1">
              {colors.map((color) => {
                const baseClasses = "h-6 w-6 flex-shrink-0 rounded-full transition-all";
                const ringClasses = cn(
                  !color.inStock && "cursor-not-allowed opacity-40",
                  selectedColor === color.id
                    ? "ring-2 ring-[#FFF8FB]"
                    : color.id === "noir"
                      ? "ring-1 ring-white/[0.094]"
                      : color.id === "mocha"
                        ? ""
                        : "ring-1 ring-white/[0.024]"
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

          <div className="flex flex-col gap-3">
            <span className="text-[14px] font-semibold text-[#f4ece7]">Size</span>
            <div className="flex flex-wrap gap-[10px]">
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
                        : "bg-white/[0.047] text-[#e7deda] ring-1 ring-white/[0.086]",
                    )}
                  >
                    {size.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-[13px] font-medium text-[#beb5b0]">Size guide available</span>
            <button
              type="button"
              className="text-[13px] font-semibold text-[#f1c6d4]"
            >
              Open size chatbot
            </button>
          </div>
        </motion.div>

        <motion.div {...motionProps} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="flex-1 rounded-full bg-gradient-to-r from-[#f6d2db] to-[#d89aae] px-6 py-4 text-[15px] font-bold text-[#140e12] transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Thử áo này bằng AI
          </button>
          <button
            type="button"
            className="flex-1 rounded-full bg-white/[0.047] px-6 py-4 text-[15px] font-bold text-[#f4ece7] ring-1 ring-white/[0.086] transition-all hover:bg-white/[0.06] active:scale-[0.98]"
          >
            Thêm vào giỏ
          </button>
        </motion.div>
      </div>

      <motion.div
        {...motionProps}
        className="relative z-0 mt-1 rounded-[28px] border border-white/[0.071] bg-[#111118cc] p-5 backdrop-blur-[16px]"
      >
        <div className="mb-3 text-[16px] font-semibold text-[#f4ece7]">Chi tiết sản phẩm</div>
        {accordions.map((item) => {
          const isOpen = openAccordion === item.id;
          return (
            <div key={item.id} className="flex flex-col">
              <button
                type="button"
                onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-[14px] font-semibold text-[#f4ece7]">
                  {item.title}
                </span>
                <span
                  className={cn(
                    "font-[family-name:var(--font-mono)] text-[16px] font-semibold",
                    isOpen ? "text-[#e8b9c9]" : "text-[#beb5b0]",
                  )}
                >
                  {isOpen ? "−" : "+"}
                </span>
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
