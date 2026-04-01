import type { ProductContent } from "@/features/product/types/product.types";
import { getCommerceProductBySlug } from "@/features/cart/services/commerce-products.service";

export function getProductContent(slug: string): ProductContent {
  const product = getCommerceProductBySlug(slug);

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: undefined,
    description: product.description,
    images: product.gallery.map((image, index) => ({ id: `img-${index + 1}`, url: image, alt: product.name })),
    colors: [
      { id: "rose", name: "Rose", hex: "#F2D2DB", inStock: true },
      { id: "noir", name: "Noir", hex: "#111319", inStock: true },
      { id: "mocha", name: "Mocha", hex: "#8B6E66", inStock: true },
    ],
    sizes: [
      { id: "xs", name: "XS", inStock: true },
      { id: "s", name: "S", inStock: true },
      { id: "m", name: "M", inStock: true },
      { id: "l", name: "L", inStock: true },
    ],
    accordions: [
      {
        id: "desc",
        title: "Mô tả",
        content:
          "Crafted from luminous silk blend with light stretch lining and invisible side zip. Designed to pair with tailored trousers or fluid skirts.",
      },
      {
        id: "material",
        title: "Chất liệu",
        content: "100% Mulberry Silk. Không gây kích ứng da, thoáng khí và thấm hút mồ hôi tốt.",
      },
    ],
    upsellProducts: [
      {
        id: "noir-pants",
        name: "Noir Tapered Pants",
        price: "2.150.000đ",
        image: "/images/product-detail/upsell-pants.png",
        alt: "Noir Tapered Pants",
      },
      {
        id: "blush-heels",
        name: "Blush Point Heels",
        price: "1.890.000đ",
        image: "/images/product-detail/upsell-heels.png",
        alt: "Blush Point Heels",
      },
      {
        id: "mini-bag",
        name: "Mini Sculpt Bag",
        price: "2.790.000đ",
        image: "/images/product-detail/upsell-bag.png",
        alt: "Mini Sculpt Bag",
      },
    ],
    reviews: [
      {
        id: "review-1",
        author: { name: "Minh Anh" },
        rating: 5,
        date: "15/03/2026",
        size: "S",
        height: "168cm",
        content:
          "Form ôm vừa người, phần cổ đổ rất sang và lên hình đẹp. Mình thử AI trước rồi mua thật, size khớp gần như hoàn toàn.",
        helpful: 24,
      },
      {
        id: "review-2",
        author: { name: "Hà Linh" },
        rating: 4,
        date: "10/03/2026",
        size: "M",
        height: "165cm",
        content:
          "Chất silk rất mềm và rủ đẹp. Màu champagne như hình. Cổ đổ hơi rộng nên mình kẹp lại một chút cho gọn.",
        helpful: 18,
      },
    ],
    rating: 4.8,
    reviewCount: 142,
  };
}
