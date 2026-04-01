import type { CommerceProduct } from "@/features/cart/types/commerce.types";

const commerceProducts: CommerceProduct[] = [
  {
    id: "silk-contour-top",
    slug: "silk-contour-top",
    name: "Silk Contour Top",
    price: "3.490.000đ",
    priceValue: 3490000,
    image: "/images/product-detail/hero.png",
    gallery: [
      "/images/product-detail/hero.png",
      "/images/product-detail/thumb-1.png",
      "/images/product-detail/thumb-2.png",
      "/images/product-detail/thumb-3.png",
    ],
    description: "A sculpted silk essential with fluid drape, luminous finish and a silhouette designed to elevate tailored separates.",
    cartMeta: "Size S · Hồng phấn",
    wishlistThumbImage: "/images/product-detail/hero.png",
  },
  {
    id: "velvet-aura-dress",
    slug: "velvet-aura-dress",
    name: "Velvet Aura Dress",
    price: "3.490.000đ",
    priceValue: 3490000,
    image: "/images/catalog/velvet-aura-dress.png",
    gallery: ["/images/catalog/velvet-aura-dress.png"],
    description: "Evening silhouette with liquid drape and high-impact editorial movement.",
    cartMeta: "Size S · Rose satin",
    wishlistThumbImage: "/images/catalog/velvet-aura-dress.png",
  },
  {
    id: "noir-tech-blazer",
    slug: "noir-tech-blazer",
    name: "Noir Tech Blazer",
    price: "2.890.000đ",
    priceValue: 2890000,
    image: "/images/catalog/noir-tech-blazer.png",
    gallery: ["/images/catalog/noir-tech-blazer.png"],
    description: "Structured tailoring with a sleek monochrome finish for sharp day-to-night styling.",
    cartMeta: "Size M · Noir",
    wishlistThumbImage: "/images/catalog/noir-tech-blazer.png",
  },
  {
    id: "nude-flow-trench",
    slug: "nude-flow-trench",
    name: "Nude Flow Trench",
    price: "4.150.000đ",
    priceValue: 4150000,
    image: "/images/catalog/nude-flow-trench.png",
    gallery: ["/images/catalog/nude-flow-trench.png"],
    description: "Fluid outerwear with soft structure, neutral depth, and elegant movement.",
    cartMeta: "Size M · Sand",
    wishlistThumbImage: "/images/catalog/nude-flow-trench.png",
  },
  {
    id: "soft-contour-knit",
    slug: "soft-contour-knit",
    name: "Soft Contour Knit",
    price: "2.250.000đ",
    priceValue: 2250000,
    image: "/images/catalog/soft-contour-knit.png",
    gallery: ["/images/catalog/soft-contour-knit.png"],
    description: "Second-skin knitwear engineered for clean layering and daily polish.",
    cartMeta: "Size S · Cream",
    wishlistThumbImage: "/images/catalog/soft-contour-knit.png",
  },
  {
    id: "mini-sculpt-bag",
    slug: "mini-sculpt-bag",
    name: "Mini Sculpt Bag",
    price: "2.790.000đ",
    priceValue: 2790000,
    image: "/images/catalog/mini-sculpt-bag.png",
    gallery: ["/images/catalog/mini-sculpt-bag.png"],
    description: "Compact statement bag with sculptural shape and polished finish.",
    cartMeta: "One size · Bone",
    wishlistThumbImage: "/images/catalog/mini-sculpt-bag.png",
  },
  {
    id: "linear-nude-heels",
    slug: "linear-nude-heels",
    name: "Linear Nude Heels",
    price: "1.890.000đ",
    priceValue: 1890000,
    image: "/images/catalog/linear-nude-heels.png",
    gallery: ["/images/catalog/linear-nude-heels.png"],
    description: "Minimal heels with elongated shape and warm nude finish for elevated styling.",
    cartMeta: "Size 37",
    wishlistThumbImage: "/images/catalog/linear-nude-heels.png",
  },
  {
    id: "silk-evening-gown",
    slug: "silk-evening-gown",
    name: "Silk Evening Gown",
    price: "5.200.000đ",
    priceValue: 5200000,
    image: "/images/home/category-street.jpg",
    gallery: ["/images/home/category-street.jpg"],
    description: "Silk evening dress with sculpted drape and luminous finish for formal occasions.",
    cartMeta: "Size M · Midnight",
    wishlistThumbImage: "/images/home/category-street.jpg",
  },
  {
    id: "pearl-accent-blouse",
    slug: "pearl-accent-blouse",
    name: "Pearl Accent Blouse",
    price: "1.890.000đ",
    priceValue: 1890000,
    image: "/images/home/category-evening.jpg",
    gallery: ["/images/home/category-evening.jpg"],
    description: "Polished blouse elevated with pearl detailing and soft editorial texture.",
    cartMeta: "Size S · Pearl",
    wishlistThumbImage: "/images/home/category-evening.jpg",
  },
  {
    id: "wool-blend-coat",
    slug: "wool-blend-coat",
    name: "Wool Blend Coat",
    price: "6.500.000đ",
    priceValue: 6500000,
    image: "/images/home/category-tailoring.jpg",
    gallery: ["/images/home/category-tailoring.jpg"],
    description: "Longline coat with warm wool texture and refined silhouette for winter layering.",
    cartMeta: "Size M · Camel",
    wishlistThumbImage: "/images/home/category-tailoring.jpg",
  },
  {
    id: "blush-point-heels",
    slug: "blush-point-heels",
    name: "Blush Point Heels",
    price: "1.890.000đ",
    priceValue: 1890000,
    image: "/images/product-detail/upsell-heels.png",
    gallery: ["/images/product-detail/upsell-heels.png"],
    description: "Pointed heels with blush finish for clean, elevated evening looks.",
    cartMeta: "Size 37",
    wishlistThumbImage: "/images/product-detail/upsell-heels.png",
  },
];

export function getCommerceProducts() {
  return commerceProducts;
}

export function getCommerceProductById(id: string) {
  return commerceProducts.find((product) => product.id === id);
}

export function getCommerceProductBySlug(slug: string) {
  return commerceProducts.find((product) => product.slug === slug) ?? commerceProducts[0];
}

export function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}
