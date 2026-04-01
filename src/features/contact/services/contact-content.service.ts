import type { ContactContent } from "@/features/contact/types/contact.types";

export function getContactContent(): ContactContent {
  return {
    breadcrumb: ["Liên hệ", "Hỗ trợ chuyên sâu"],
    title: "Liên hệ & hỗ trợ chuyên sâu",
    description:
      "Dành cho những yêu cầu đặc biệt, hợp tác B2B, đại lý hoặc các trường hợp mà bạn muốn được đội ngũ con người hỗ trợ trực tiếp thay vì chatbot.",
    infoTitle: "Thông tin liên hệ",
    infoItems: [
      { id: "hotline", label: "Hotline: 1900 9999" },
      { id: "email", label: "Email: support@aurelia.ai" },
      { id: "hq", label: "Headquarter: 68 Le Loi, District 1, HCMC" },
    ],
    responseTime: "Thời gian phản hồi: trong vòng 24h",
    socials: [
      { id: "instagram", label: "Instagram" },
      { id: "email", label: "Email" },
      { id: "location", label: "Location" },
    ],
    formTitle: "Gửi tin nhắn cho đội ngũ AURELIA",
    submitLabel: "Send Message",
    replyHint: "Reply in 24h",
    defaults: {
      name: "Nguyen Minh Anh",
      email: "minhanh@example.com",
      subject: "B2B Partnership",
      message: "We would like to explore an AI try-on integration for our retail experience.",
    },
  };
}
