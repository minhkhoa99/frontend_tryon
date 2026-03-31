import { ProductCard } from "@/features/home/components/product-card";
import type { TrendingProduct } from "@/features/home/types/home.types";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { SectionHeading } from "@/shared/components/ui/section-heading";

type TrendingSectionProps = {
  products: TrendingProduct[];
};

export function TrendingSection({ products }: TrendingSectionProps) {
  return (
    <section id="trending" className="scroll-mt-28 bg-[#0b0b10] py-16 md:py-20">
      <SiteShell>
        <div className="flex flex-col gap-6 px-2 md:px-4 xl:px-16">
          <SectionHeading
            eyebrow="TRENDING PRODUCTS"
            title="Những item đang được thử nhiều nhất tuần này."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </SiteShell>
    </section>
  );
}
