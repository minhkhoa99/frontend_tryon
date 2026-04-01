import type { BodyMetricsContent } from "@/features/profile/types/profile.types";

export function getBodyMetricsContent(): BodyMetricsContent {
  return {
    breadcrumb: ["Tài khoản", "Số đo cá nhân AI"],
    sidebarTitle: "Tài khoản của tôi",
    sidebarItems: [
      { id: "profile", label: "Hồ sơ", href: "/profile" },
      { id: "metrics", label: "Số đo cá nhân", href: "/profile/body-metrics", active: true },
      { id: "orders", label: "Đơn hàng", href: "/orders" },
      { id: "wishlist", label: "Wishlist", href: "/wishlist" },
    ],
    title: "AI Body Metrics Lab",
    description:
      "Lưu số đo để AI Stylist ghi nhớ vóc dáng, tự động ưu tiên size chuẩn và gợi ý fit theo sở thích mặc của bạn.",
    metricsTitle: "Thông số cơ thể",
    shapeTitle: "Body shape lab",
    saveLabel: "Lưu hồ sơ AI Stylist",
    savedMessage: "AI Stylist đã ghi nhớ số đo của bạn",
    metricFields: [
      { key: "height", label: "Chiều cao", unit: "cm", value: 168, max: 220 },
      { key: "weight", label: "Cân nặng", unit: "kg", value: 54, max: 100 },
      { key: "bust", label: "Ngực", unit: "cm", value: 84, max: 120 },
      { key: "waist", label: "Eo", unit: "cm", value: 66, max: 110 },
      { key: "hips", label: "Hông", unit: "cm", value: 92, max: 130 },
      { key: "shoulder", label: "Vai", unit: "cm", value: 38, max: 70 },
      { key: "thigh", label: "Đùi", unit: "cm", value: 52, max: 90 },
    ],
    fitPreferences: [
      { id: "om", label: "Ôm" },
      { id: "regular", label: "Regular", active: true },
      { id: "oversized", label: "Oversized" },
    ],
    bodyShapes: [
      { id: "hourglass", label: "Hourglass", image: "/images/profile/shape-hourglass.png", active: true },
      { id: "pear", label: "Pear", image: "/images/profile/shape-pear.png" },
      { id: "rectangle", label: "Rectangle", image: "/images/profile/shape-rectangle.png" },
      { id: "apple", label: "Apple", image: "/images/profile/shape-apple.png" },
    ],
    bodyModelImage: "/images/profile/body-model.png",
    insight: {
      title: "AI Stylist insight",
      description: "Dáng đồng hồ cát và fit regular đang cho độ tương thích cao nhất với váy ôm eo và blazer chiết nhẹ.",
      tags: ["Vai 38cm", "Ngực 84cm", "Eo 66cm"],
    },
  };
}
