"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type { Review } from "@/features/product/types/product.types";

type ProductReviewsProps = {
  reviews: Review[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating ? "text-[#d9afc0]" : "text-white/12",
          )}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
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
    <motion.section {...motionProps} className="px-7 py-16">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="font-[family-name:var(--font-playfair)] text-[34px] font-bold text-[#fff7f2]">
          Đánh giá
        </h2>
        <p className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#bdaaae]">
          Filter: có ảnh / size S / chiều cao 168-172cm
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
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
            className="rounded-[24px] border border-white/[0.07] bg-[#111118cc] p-[18px] backdrop-blur-[14px]"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9afc0]/20 text-sm font-semibold text-[#d9afc0]">
                  {review.author.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#fff7f2]">
                    {review.author.name}
                  </span>
                  <span className="text-xs text-[#cec6c1]/60">
                    {review.date}
                  </span>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <div className="mb-2 flex gap-3">
              <span className="rounded-full border border-white/8 px-2.5 py-1 text-xs text-[#cec6c1]">
                Size: {review.size}
              </span>
              <span className="rounded-full border border-white/8 px-2.5 py-1 text-xs text-[#cec6c1]">
                {review.height}
              </span>
            </div>

            <p className="text-[14px] leading-[1.55] text-[#cec6c1]">
              {review.content}
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-[#cec6c1]/50">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span>Hữu ích ({review.helpful})</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
