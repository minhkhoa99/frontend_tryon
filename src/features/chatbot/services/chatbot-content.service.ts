import type { ChatbotWidgetContent } from "@/features/chatbot/types/chatbot.types";

export function getChatbotWidgetContent(): ChatbotWidgetContent {
  return {
    breadcrumb: ["Hệ thống hỗ trợ", "AI Chatbot Widget"],
    title: "AI support widget\ncho website thời trang cao cấp",
    description:
      "Floating icon tối giản, popup kính mờ và quick replies thông minh giúp tư vấn size, gợi ý outfit và hỗ trợ đơn hàng mà không làm rối giao diện.",
    useCasesTitle: "Use cases chính",
    useCases: [
      { id: "size", label: "Tìm size" },
      { id: "outfit", label: "Gợi ý outfit" },
      { id: "tracking", label: "Theo dõi đơn hàng" },
      { id: "returns", label: "Hỗ trợ thanh toán & đổi trả" },
    ],
    previewLabel: "Preview on live site",
    previewHint: "Widget mở từ góc phải dưới",
    widgetTitle: "AURELIA AI Stylist",
    widgetStatus: "online",
    messages: [
      {
        id: "m1",
        content: "Xin chào, mình có thể giúp bạn tìm size chuẩn hoặc gợi ý outfit phù hợp hôm nay.",
        tone: "assistant",
      },
      {
        id: "m2",
        content: "Bạn muốn một set sang nhưng trẻ trung cho event tối? Mình gợi ý bộ này:",
        tone: "assistant-highlight",
      },
      {
        id: "m3",
        content: "Tôi cần tìm size chuẩn cho váy này.",
        tone: "user",
      },
    ],
    quickReplies: [
      { id: "size", label: "Tìm size của tôi", variant: "primary" },
      { id: "tracking", label: "Theo dõi đơn", variant: "secondary" },
      { id: "outfit", label: "Gợi ý outfit", variant: "secondary" },
    ],
    suggestedProduct: {
      image: "/images/chatbot/suggested-product.png",
      name: "Velvet Aura Dress",
      description: "Đi cùng heels nude và clutch nhỏ để giữ tổng thể sang, gọn và hiện đại.",
    },
  };
}
