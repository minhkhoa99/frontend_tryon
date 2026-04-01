"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getWishlistContent } from "@/features/wishlist/services/wishlist-content.service";
import { getCommerceProductById } from "@/features/cart/services/commerce-products.service";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useWishlistStore } from "@/features/wishlist/store/wishlist-store";
import { useToastStore } from "@/shared/store/toast-store";

function WishlistBreadcrumb({ items }: { items: string[] }) {
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

export function WishlistPage() {
  const content = getWishlistContent();
  const addItem = useCartStore((state) => state.addItem);
  const productIds = useWishlistStore((state) => state.productIds);
  const showToast = useToastStore((state) => state.showToast);
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

  const products = productIds.map((id) => getCommerceProductById(id)).filter(Boolean);
  const columns = [products.slice(0, 2), products.slice(2, 4), products.slice(4, 6)];

  return (
    <main className="min-h-screen bg-[#09090C]">
      <div className="mx-auto w-full max-w-[1440px]">
        <WishlistBreadcrumb items={content.breadcrumb} />

        <motion.section {...motionProps} className="flex flex-col gap-4 px-4 pb-6 pt-7 md:px-8 xl:px-12">
          <h1 className="font-[family-name:var(--font-playfair)] text-[44px] font-bold leading-[1.05] text-[#FFF7F2]">
            {content.title}
          </h1>
          <p className="max-w-[500px] text-[16px] leading-[1.5] text-[#CEC6C1]">{content.description}</p>
        </motion.section>

        <section className="flex flex-col gap-7 px-4 pb-8 pt-0 md:px-8 xl:px-12">
          <motion.div {...motionProps} className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {columns.map((column, index) => (
              <div key={`column-${index + 1}`} className="flex flex-col gap-[18px]">
                {column.map((product) => (
                  <div key={product!.id} className="flex flex-col gap-[14px] rounded-[28px] border border-white/[0.06] bg-[#121219] p-[18px]">
                    <Link href={`/products/${product!.slug}`} className="relative block h-[260px] overflow-hidden rounded-[22px] bg-[#1b1a22]">
                      <Image src={product!.image} alt={product!.name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                    </Link>
                    <Link href={`/products/${product!.slug}`} className="text-[20px] font-semibold text-[#FFF4EF] hover:text-white">
                      {product!.name}
                    </Link>
                    <p className="font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[#D9AFC0]">{product!.price}</p>
                    <div className="flex items-center justify-between gap-5">
                      <button
                        type="button"
                        onClick={() => {
                          if (!product) {
                            showToast({
                              title: "Không thể thêm vào giỏ",
                              description: "Sản phẩm hiện không khả dụng. Vui lòng thử lại.",
                              tone: "error",
                            });
                            return;
                          }
                          addItem(product!.id);
                          showToast({
                            title: "Đã thêm vào giỏ hàng",
                            description: `${product!.name} đã được thêm vào giỏ của bạn.`,
                            tone: "success",
                          });
                        }}
                        className="rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] px-6 py-[14px] text-[12px] font-bold text-[#140E12] shadow-[0_16px_28px_rgba(248,212,220,0.18)]"
                      >
                        Add to Cart
                      </button>
                      <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.05]">
                        <Image src={product!.wishlistThumbImage} alt="thumb" fill className="object-cover" sizes="32px" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          <motion.div
            {...motionProps}
            className="flex flex-col gap-[18px] rounded-[34px] border border-white/[0.08] bg-[#13131ACC] p-6 backdrop-blur-[18px]"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-[36px] font-bold text-[#FFF7F2]">{content.mixTitle}</h2>
            <div className="flex flex-col gap-[18px] md:flex-row md:items-stretch">
              <div className="flex w-full flex-col gap-3 md:w-[280px] md:flex-none">
                {content.mixLookImages.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative h-[120px] overflow-hidden rounded-[22px] bg-[#1b1a22]">
                    <Image src={image} alt={`Mix look ${index + 1}`} fill className="object-cover" sizes="280px" />
                  </div>
                ))}
              </div>

              <div className="relative h-[360px] w-full overflow-hidden rounded-[28px] bg-[#1b1a22]">
                <Image src={content.mixHeroImage} alt="AI mix and match" fill className="object-cover" sizes="(min-width: 768px) 70vw, 100vw" />
              </div>
            </div>
            <button
              type="button"
              className="w-fit rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] px-6 py-4 text-[15px] font-bold text-[#140E12] shadow-[0_18px_38px_rgba(241,196,214,0.26)]"
            >
              {content.mixButtonLabel}
            </button>
            <p className="max-w-[700px] text-[15px] leading-[1.5] text-[#CEC6C1]">{content.mixDescription}</p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
