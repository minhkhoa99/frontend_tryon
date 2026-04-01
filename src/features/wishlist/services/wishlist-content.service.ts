import type { WishlistContent } from "@/features/wishlist/types/wishlist.types";

export function getWishlistContent(): WishlistContent {
  return {
    breadcrumb: ["Tài khoản", "Wishlist"],
    title: "Tủ đồ yêu thích của bạn",
    description: "Lưu giữ những bộ trang phục bạn yêu thích và khám phá thêm những gợi ý phối đồ hoàn hảo từ AI.",
    columns: [
      {
        id: "col-1",
        products: [
          {
            id: "velvet-aura-dress",
            name: "Velvet Aura Dress",
            price: "3.490.000đ",
            image: "/images/home/product-velvet.jpg",
            buttonLabel: "Add to Cart",
            thumbImage: "/images/home/product-velvet.jpg",
          },
          {
            id: "silk-evening-gown",
            name: "Silk Evening Gown",
            price: "5.200.000đ",
            image: "/images/home/category-street.jpg",
            buttonLabel: "Add to Cart",
            thumbImage: "/images/home/category-street.jpg",
          },
        ],
      },
      {
        id: "col-2",
        products: [
          {
            id: "noir-tech-blazer",
            name: "Noir Tech Blazer",
            price: "2.890.000đ",
            image: "/images/home/product-blazer.jpg",
            buttonLabel: "Add to Cart",
            thumbImage: "/images/home/product-blazer.jpg",
          },
          {
            id: "pearl-accent-blouse",
            name: "Pearl Accent Blouse",
            price: "1.890.000đ",
            image: "/images/home/category-evening.jpg",
            buttonLabel: "Add to Cart",
            thumbImage: "/images/home/category-evening.jpg",
          },
        ],
      },
      {
        id: "col-3",
        products: [
          {
            id: "nude-flow-trench",
            name: "Nude Flow Trench",
            price: "4.150.000đ",
            image: "/images/home/product-trench.jpg",
            buttonLabel: "Add to Cart",
            thumbImage: "/images/home/product-trench.jpg",
          },
          {
            id: "wool-blend-coat",
            name: "Wool Blend Coat",
            price: "6.500.000đ",
            image: "/images/home/category-tailoring.jpg",
            buttonLabel: "Add to Cart",
            thumbImage: "/images/home/category-tailoring.jpg",
          },
        ],
      },
    ],
    mixTitle: "AI Mix and Match",
    mixDescription: "AI suggests complementary pieces based on your wishlist items. Complete the look with curated additions.",
    mixLookImages: ["/images/home/category-evening.jpg", "/images/home/category-tailoring.jpg"],
    mixHeroImage: "/images/wishlist/mix-avatar.png",
    mixButtonLabel: "Buy full look",
  };
}
