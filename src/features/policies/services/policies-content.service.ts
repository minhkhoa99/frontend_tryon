import type { PoliciesContent } from "@/features/policies/types/policies.types";

export function getPoliciesContent(): PoliciesContent {
  return {
    breadcrumb: ["Chính sách", "FAQ"],
    sidebarTitle: "Chính sách & FAQ",
    sidebarItems: [
      { id: "shipping", label: "Shipping", active: true },
      { id: "returns", label: "Returns" },
      { id: "privacy", label: "Privacy" },
      { id: "terms", label: "Terms" },
      { id: "faq", label: "FAQ" },
    ],
    intro: "Minh bạch, dễ tra cứu và luôn có hỗ trợ khi bạn cần.",
    policyCards: [
      {
        id: "shipping",
        title: "Chính sách giao hàng",
        description:
          "Đơn hàng được xử lý trong 24 giờ làm việc. Thời gian giao hàng tiêu chuẩn từ 2-4 ngày nội thành và 3-6 ngày với khu vực ngoại thành hoặc liên tỉnh.",
      },
      {
        id: "returns",
        title: "Đổi trả & hoàn tiền",
        description:
          "AURELIA hỗ trợ đổi size trong 7 ngày, miễn là sản phẩm chưa qua sử dụng và còn đầy đủ tag. Các trường hợp hoàn tiền được xử lý theo chính sách minh bạch và thông báo rõ qua email.",
      },
    ],
    faqTitle: "Câu hỏi thường gặp",
    faqItems: [
      { id: "faq-1", question: "FAQ 01", answer: "Noi dung tra loi cho cau hoi mau.", expanded: true },
      { id: "faq-2", question: "FAQ 02" },
      { id: "faq-3", question: "FAQ 03" },
    ],
    ctaLabel: "Ask AI Support",
  };
}
