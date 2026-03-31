import { CategoryCard } from "@/features/home/components/category-card";
import type { CategoryCard as CategoryCardType } from "@/features/home/types/home.types";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { SectionHeading } from "@/shared/components/ui/section-heading";

type CategoriesSectionProps = {
  categories: CategoryCardType[];
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section id="categories" className="scroll-mt-28 bg-[#090a0f] py-16 md:py-20">
      <SiteShell>
        <div className="flex flex-col gap-6 px-2 md:px-4 xl:px-16">
          <SectionHeading eyebrow="CATEGORIES" title="Danh mục curated cho từng mood thời trang." />
          <div className="grid gap-[22px] lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </SiteShell>
    </section>
  );
}
