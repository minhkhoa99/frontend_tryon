"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import { getCatalogContent } from "@/features/catalog/services/catalog-content.service";

function CatalogBreadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-2.5 px-4 pt-[18px] text-xs md:px-8 xl:px-12" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item}-${index}`} className="flex items-center gap-2.5">
              <span className={isLast ? "font-semibold text-[#4A3B44]" : "font-medium text-[#8F8884]"}>{item}</span>
              {!isLast ? <span className="font-medium text-[#B4ABA5]">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function CatalogPage() {
  const content = getCatalogContent();
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
    <main className="min-h-screen bg-[#F6F1EC] text-[#2B1E26]">
      <div className="mx-auto w-full max-w-[1440px]">
        <CatalogBreadcrumb items={content.breadcrumb} />

        <motion.section {...motionProps} className="flex flex-col gap-6 px-4 pb-6 pt-7 md:px-8 xl:flex-row xl:px-12">
          <div className="flex w-full flex-col gap-[14px] xl:w-[620px] xl:flex-none">
            <h1 className="whitespace-pre-line font-[family-name:var(--font-playfair)] text-[34px] font-bold leading-[1.08] text-[#2B1E26] md:text-[38px]">
              {content.title}
            </h1>
            <p className="max-w-[620px] text-[16px] leading-[1.6] text-[#6F6560]">{content.description}</p>
            <div className="flex flex-wrap gap-[10px]">
              {content.heroTags.map((tag) => (
                <div key={tag.id} className="rounded-full border border-[#E6DDD7] bg-white/70 px-[14px] py-[10px] font-[family-name:var(--font-mono)] text-[11px] font-semibold text-[#8C5F72]">
                  {tag.label}
                </div>
              ))}
            </div>
          </div>

          <div className="h-[260px] w-full rounded-[32px] border border-[#E1D6CF] bg-[#EDE6E0]" />
        </motion.section>

        <section className="flex flex-col gap-7 px-4 pb-8 pt-2 md:px-8 xl:flex-row xl:items-start xl:gap-[28px] xl:px-12">
          <motion.aside
            {...motionProps}
            className="flex w-full flex-col gap-4 rounded-[28px] border border-[#E7DDD7] bg-[#FBF8F5] p-5 xl:w-[280px] xl:flex-none"
          >
            <h2 className="text-[18px] font-semibold text-[#2B1E26]">{content.filterTitle}</h2>

            <div className="flex flex-col gap-[10px] border-b border-[#E8DED8] pb-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#3A3130]">{content.priceLabel}</span>
                <span className="font-[family-name:var(--font-mono)] text-[16px] font-semibold text-[#8C5F72]">−</span>
              </div>
              <div className="h-2 rounded-full bg-[#E9DFD8]" />
              <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#7D726C]">{content.priceValue}</span>
            </div>

            <div className="flex flex-col gap-3 border-b border-[#E8DED8] pb-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#3A3130]">{content.colorLabel}</span>
                <span className="font-[family-name:var(--font-mono)] text-[16px] font-semibold text-[#8C5F72]">−</span>
              </div>
              <div className="flex items-center gap-[10px]">
                {content.colors.map((color) => (
                  <span
                    key={color.id}
                    className={cn("h-[22px] w-[22px] rounded-full", color.selected && "ring-2 ring-white")}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-[#E8DED8] pb-[10px]">
              <span className="text-[14px] font-semibold text-[#3A3130]">{content.sizeLabel}</span>
              <span className="font-[family-name:var(--font-mono)] text-[16px] font-semibold text-[#8C5F72]">+</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#3A3130]">{content.materialLabel}</span>
              <span className="font-[family-name:var(--font-mono)] text-[16px] font-semibold text-[#8C5F72]">+</span>
            </div>
          </motion.aside>

          <motion.div {...motionProps} className="flex w-full flex-col gap-[18px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="rounded-full border border-[#E6DDD7] bg-white/80 px-[18px] py-[14px] text-[13px] font-medium text-[#8F8884] md:w-[420px]">
                {content.searchPlaceholder}
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-full border border-[#E6DDD7] bg-white/80 px-4 py-3 text-[13px] font-semibold text-[#3A3130]">
                  {content.sortLabel}
                </div>
                <div className="rounded-full border border-[#E6DDD7] bg-white/80 px-4 py-3 font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#8C5F72]">
                  {content.resultCount}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
              {content.columns.map((column) => (
                <div key={column.id} className="flex flex-col gap-[18px]">
                  {column.products.map((product) => (
                    <div key={product.id} className="flex flex-col gap-3">
                      <Link href={`/products/${product.id}`} className="relative block overflow-hidden rounded-[26px]" style={{ height: product.imageHeight }}>
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                      </Link>
                      <Link href={`/products/${product.id}`} className="font-[family-name:var(--font-playfair)] text-[24px] font-bold leading-[1.08] text-[#2B1E26] hover:text-[#8C5F72]">
                        {product.name}
                      </Link>
                      <p className="text-[14px] font-semibold text-[#6F6560]">{product.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-[10px] pt-4">
              {content.pagination.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className={cn(
                    "rounded-full border border-[#E6DDD7] px-[14px] py-[10px] font-[family-name:var(--font-mono)] text-[12px]",
                    index === 0 ? "bg-white/80 font-bold text-[#8C5F72]" : "bg-[#FBF8F5] font-semibold text-[#6F6560]",
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
