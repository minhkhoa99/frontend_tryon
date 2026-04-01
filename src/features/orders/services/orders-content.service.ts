import type { OrderTrackingContent } from "@/features/orders/types/orders.types";

export function getOrderTrackingContent(): OrderTrackingContent {
  return {
    breadcrumb: ["Tài khoản", "Đơn hàng", "Theo dõi đơn hàng"],
    sidebarTitle: "Tài khoản của tôi",
    sidebarItems: [
      { id: "overview", label: "Tổng quan", href: "/profile" },
      { id: "orders", label: "Đơn hàng của tôi", href: "/orders", active: true },
      { id: "wishlist", label: "Wishlist", href: "/wishlist" },
      { id: "address", label: "Địa chỉ nhận hàng", href: "/profile" },
    ],
    title: "Đơn ARL-240318 đang trên đường giao tới bạn",
    statusLine: "Trạng thái hiện tại: Đang giao hàng · Cập nhật gần nhất 14:30 hôm nay",
    statusSteps: [
      { id: "pending", label: "Chờ xác nhận", state: "done" },
      { id: "packed", label: "Đã đóng gói", state: "done" },
      { id: "shipping", label: "Đang giao", state: "current" },
      { id: "delivered", label: "Giao thành công", state: "upcoming" },
    ],
    actions: [
      { id: "chat", label: "Chat với AI về đơn này", href: "/try-on", variant: "primary" },
      { id: "support", label: "Yêu cầu đổi trả / bảo hành", href: "/contact", variant: "secondary" },
    ],
    itemsTitle: "Sản phẩm trong đơn",
    items: [
      {
        id: "top",
        image: "/images/orders/item-top.png",
        name: "Silk Contour Top",
        meta: "Size S · Hồng phấn · 1 sản phẩm",
        price: "3.490.000đ",
      },
      {
        id: "heels",
        image: "/images/orders/item-heels.png",
        name: "Blush Point Heels",
        meta: "Size 37 · 1 sản phẩm",
        price: "1.890.000đ",
      },
    ],
    helpCards: [
      {
        id: "chatbot",
        label: "Liên hệ chatbot AI",
        detail: "Chatbot sẽ tự nhận diện đơn ARL-240318 để hỗ trợ nhanh hơn.",
      },
      {
        id: "milestone",
        label: "Mốc vận chuyển",
        detail: "Stepper ngang trên desktop, chuyển dọc trên mobile để dễ theo dõi hơn.",
      },
    ],
  };
}
