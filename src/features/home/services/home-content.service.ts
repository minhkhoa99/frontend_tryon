import type { HomeContent } from "@/features/home/types/home.types";

export function getHomeContent(): HomeContent {
  return {
    navItems: [
      { label: "Cửa hàng", href: "/products" },
      { label: "Khu vực thử đồ", href: "/try-on" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Trợ lý phối đồ", href: "/chatbot" },
    ],
    heroActions: [
      { label: "Trải nghiệm Thử Đồ AI", href: "/try-on", variant: "primary" },
      { label: "Khám phá bộ sưu tập", href: "/products", variant: "secondary" },
    ],
    howSteps: [
      {
        index: "01",
        title: "Tải ảnh hoặc mở camera",
        description: "Upload trong vài giây với khung crop tối ưu cho khuôn dáng toàn thân.",
      },
      {
        index: "02",
        title: "Chọn item và tinh chỉnh fit",
        description: "Lọc size, màu, category và nhận gợi ý AI Stylist theo vóc dáng.",
      },
      {
        index: "03",
        title: "Lưu look hoặc mua ngay",
        description: "Chuyển từ trải nghiệm sang checkout mượt mà với wishlist và cart thông minh.",
      },
    ],
    categories: [
      {
        id: "evening-couture",
        title: "Evening Couture",
        description: "Draped silhouettes, blush metallics, high-drama evening looks.",
        image: "/images/home/category-evening.jpg",
        alt: "Editorial evening couture collection",
      },
      {
        id: "ai-street-lab",
        title: "AI Street Lab",
        description: "Layered utility, futuristic basics and sharp monochrome edits.",
        image: "/images/home/category-street.jpg",
        alt: "Streetwear collection with layered styling",
      },
      {
        id: "soft-tailoring",
        title: "Soft Tailoring",
        description: "Relaxed suiting, neutral palettes and luxe essentials for daily polish.",
        image: "/images/home/category-tailoring.jpg",
        alt: "Soft tailoring neutral fashion look",
      },
    ],
    products: [
      {
        id: "velvet-aura-dress",
        name: "Velvet Aura Dress",
        price: "3.490.000đ",
        image: "/images/home/product-velvet.jpg",
        alt: "Velvet Aura Dress product card",
      },
      {
        id: "noir-tech-blazer",
        name: "Noir Tech Blazer",
        price: "2.890.000đ",
        image: "/images/home/product-blazer.jpg",
        alt: "Noir Tech Blazer product card",
      },
      {
        id: "nude-flow-trench",
        name: "Nude Flow Trench",
        price: "4.150.000đ",
        image: "/images/home/product-trench.jpg",
        alt: "Nude Flow Trench product card",
      },
    ],
    chatMessages: [
      {
        id: "assistant-style-prompt",
        role: "assistant",
        message: "Bạn muốn thử phong cách nào hôm nay?",
        hint: "Gợi ý: elegant party / smart casual / monochrome techwear",
      },
      {
        id: "user-evening-event-request",
        role: "user",
        message: "Tôi muốn outfit sang nhưng trẻ trung để đi event buổi tối.",
      },
    ],
    footerGroups: [
      {
        id: "shop",
        title: "Shop",
        links: [
          { id: "shop-new-arrivals", label: "New arrivals", href: "/products" },
          { id: "shop-trending", label: "Trending", href: "/products" },
          { id: "shop-collections", label: "Collections", href: "/products" },
        ],
      },
      {
        id: "support",
        title: "Support",
        links: [
          { id: "support-size-guide", label: "Size guide", href: "/policies" },
          { id: "support-shipping", label: "Shipping", href: "/policies" },
          { id: "support-returns", label: "Returns", href: "/policies" },
        ],
      },
      {
        id: "company",
        title: "Company",
        links: [
          { id: "company-about", label: "About", href: "/about" },
          { id: "company-privacy", label: "Privacy", href: "/policies" },
          { id: "company-contact", label: "Contact", href: "/contact" },
        ],
      },
    ],
  };
}
