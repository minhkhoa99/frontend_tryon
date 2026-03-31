"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ProductImage } from "@/features/product/types/product.types";

type ProductGalleryProps = {
  images: ProductImage[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex w-full flex-col gap-4">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-[620px] w-full overflow-hidden rounded-[34px] bg-[#121218]"
      >
        <Image
          src={images[selectedIndex]?.url ?? "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80"}
          alt={images[selectedIndex]?.alt ?? "Product image"}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="760px"
          priority
        />
      </motion.div>

      <div className="flex gap-[14px] overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`relative h-[156px] w-[156px] flex-shrink-0 overflow-hidden rounded-[24px] bg-[#121218] transition-all focus:outline-none focus:ring-2 focus:ring-[#d9afc0] focus:ring-offset-2 focus:ring-offset-[#0A0A0D] ${
              index === selectedIndex
                ? "opacity-100 ring-2 ring-[#d9afc0]"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="156px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
