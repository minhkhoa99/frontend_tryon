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
  const fallbackImage =
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80";
  const thumbnailImages = images.slice(1);

  return (
    <div className="flex w-full flex-col gap-4">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-[620px] w-full overflow-hidden rounded-[34px] bg-[#121218]"
      >
        <Image
          src={images[selectedIndex]?.url ?? fallbackImage}
          alt={images[selectedIndex]?.alt ?? "Product image"}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="760px"
          priority
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-3">
        {thumbnailImages.map((image, index) => {
          const imageIndex = index + 1;

          return (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedIndex(imageIndex)}
            className={`relative h-[156px] w-full overflow-hidden rounded-[24px] bg-[#121218] transition-all focus:outline-none focus:ring-2 focus:ring-[#d9afc0] focus:ring-offset-2 focus:ring-offset-[#0A0A0D] ${
              imageIndex === selectedIndex
                ? "opacity-100 ring-2 ring-[#d9afc0]"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={image.url ?? fallbackImage}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 244px, 100vw"
            />
          </button>
        )})}
      </div>
    </div>
  );
}
