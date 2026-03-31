import { getProductContent } from "@/features/product/services/product-content.service";
import type { ProductContent } from "@/features/product/types/product.types";

export function getProductViewModel(slug: string): ProductContent {
  return getProductContent(slug);
}