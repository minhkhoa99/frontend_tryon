"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getProductViewModel } from "@/features/product/mappers/product.mapper";
import { ProductGallery } from "@/features/product/components/product-gallery";
import { ProductInfo } from "@/features/product/components/product-info";
import { ProductUpsell } from "@/features/product/components/product-upsell";
import { ProductReviews } from "@/features/product/components/product-reviews";

type ProductPageProps = {
  slug: string;
};

export function ProductPage({ slug }: ProductPageProps) {
  const product = getProductViewModel(slug);

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
    <main className="min-h-screen bg-[#0A0A0D]">
      <motion.nav
        {...motionProps}
        className="flex items-center gap-2.5 pt-[18px] px-12 text-xs"
      >
        <ol className="flex items-center gap-2.5">
          <li>
            <a
              href="/"
              className="font-medium text-[#AFA7A2] transition-colors hover:text-[#d9afc0]"
            >
              Trang chủ
            </a>
          </li>
          <li className="font-medium text-[#756F6A]">/</li>
          <li>
            <a
              href="/nu"
              className="font-medium text-[#AFA7A2] transition-colors hover:text-[#d9afc0]"
            >
              Nữ
            </a>
          </li>
          <li className="font-medium text-[#756F6A]">/</li>
          <li className="font-semibold text-[#F2E4EA]">
            Shop / {product.name}
          </li>
        </ol>
      </motion.nav>

      <section className="flex gap-7 px-12 py-6">
        <motion.div {...motionProps} className="w-[760px] flex-shrink-0">
          <ProductGallery images={product.images} />
        </motion.div>
        <ProductInfo
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          description={product.description}
          colors={product.colors}
          sizes={product.sizes}
          accordions={product.accordions}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </section>

      <ProductUpsell products={product.upsellProducts} />

      <ProductReviews
        reviews={product.reviews}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />
    </main>
  );
}
