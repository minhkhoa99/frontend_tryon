import type { OrderSuccessContent } from "@/features/checkout/types/order-success.types";

export function getOrderSuccessContent(): OrderSuccessContent {
  return {
    breadcrumb: ["Giỏ hàng", "Thanh toán", "Đặt hàng thành công"],
    title: "Đơn hàng của bạn đã được xác nhận",
    description:
      "Chúng tôi đã gửi biên nhận và link theo dõi đơn qua email/Zalo. Bạn có thể tiếp tục mua sắm hoặc xem tiến trình vận chuyển ngay bây giờ.",
    orderSummaryTitle: "Tóm tắt đơn hàng",
    nextStepsTitle: "Bước tiếp theo",
    metas: [
      { id: "order-id", label: "Mã đơn: ARL-240318" },
      { id: "paid", label: "Thanh toán thành công", tone: "success" },
      { id: "eta", label: "ETA 2-4 ngày", tone: "accent" },
    ],
    actions: [
      { id: "track", label: "Theo dõi đơn hàng", href: "/orders", variant: "primary" },
      { id: "shop", label: "Tiếp tục mua sắm", href: "/products", variant: "secondary" },
      { id: "chat", label: "Chat với trợ lý AI", href: "/try-on", variant: "secondary" },
    ],
    summaryItems: [
      {
        id: "top",
        image: "/images/order-success/item-top.png",
        name: "Silk Contour Top",
        meta: "Size S · Hồng phấn",
        price: "3.490.000đ",
      },
      {
        id: "heels",
        image: "/images/order-success/item-heels.png",
        name: "Blush Point Heels",
        meta: "Size 37",
        price: "1.890.000đ",
      },
    ],
    nextSteps: [
      {
        id: "sent",
        title: "1. Xác nhận đã gửi qua email & Zalo",
        description: "Bạn sẽ nhận link theo dõi đơn trong vài phút tới.",
      },
      {
        id: "packing",
        title: "2. Đóng gói trong hôm nay",
        description: "Đơn sẽ được chuẩn bị và chuyển sang đơn vị vận chuyển sau khi xác nhận hoàn tất.",
      },
    ],
    trustItems: [
      { id: "tracking", label: "Tracking đã gửi", detail: "Email / Zalo notification active" },
      { id: "returns", label: "Đổi trả 7 ngày", detail: "Hỗ trợ đổi size và bảo hành đơn" },
      { id: "chatbot", label: "Chatbot theo ngữ cảnh", detail: "AI hiểu sẵn mã đơn để hỗ trợ nhanh" },
    ],
  };
}
