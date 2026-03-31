import { ProductPage } from "@/features/product/components/product-page";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProductPage slug={(await params).slug} />;
}