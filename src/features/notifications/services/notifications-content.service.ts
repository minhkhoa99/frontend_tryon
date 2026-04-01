import type { NotificationsContent } from "@/features/notifications/types/notifications.types";

export function getNotificationsContent(): NotificationsContent {
  return {
    title: "Notification Center",
    subtitle: "Mọi cập nhật về đơn hàng, wishlist và AI stylist được gom về một nơi rõ ràng, tinh gọn.",
    notifications: [
      {
        id: "order-shipping",
        title: "Đơn ARL-240318 đang được giao",
        message: "Shipper dự kiến giao trong hôm nay từ 14:00 - 18:00.",
        time: "5 phút trước",
        unread: true,
      },
      {
        id: "wishlist-price",
        title: "Wishlist alert: Velvet Aura Dress giảm giá",
        message: "Mức giá mới 3.190.000đ. Bạn có thể thêm vào giỏ ngay bây giờ.",
        time: "1 giờ trước",
      },
      {
        id: "ai-style",
        title: "AI Stylist có look mới cho bạn",
        message: "Dựa trên body metrics gần nhất, chúng tôi gợi ý một set soft tailoring mới.",
        time: "Hôm nay",
      },
    ],
    toastPreviews: [
      {
        id: "toast-order",
        label: "Toast: Order update",
        description: "Hiển thị nhỏ gọn khi trạng thái đơn thay đổi hoặc cần xác nhận thêm.",
      },
      {
        id: "toast-ai",
        label: "Toast: AI recommendation",
        description: "Đề xuất outfit mới xuất hiện ngay trong lúc bạn đang duyệt lookbook hoặc catalog.",
      },
      {
        id: "toast-cart",
        label: "Toast: Cart saved",
        description: "Xác nhận thêm vào giỏ hoặc lưu wishlist mà không làm gián đoạn hành trình mua sắm.",
      },
    ],
  };
}
