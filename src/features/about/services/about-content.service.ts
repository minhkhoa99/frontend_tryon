import type { AboutContent } from "@/features/about/types/about.types";

export function getAboutContent(): AboutContent {
  return {
    breadcrumb: ["Thương hiệu", "About Us"],
    heroTitle: "Shaping the Future\nof Style",
    heroDescription:
      "AURELIA kết nối sự tinh tế của couture với trí tuệ nhân tạo, biến hành trình chọn đồ thành một trải nghiệm chuẩn xác, cảm xúc và mang tính cá nhân sâu sắc.",
    heroHint: "Cuộn xuống để khám phá công nghệ phía sau.",
    heroImage: "/images/about/hero-visual.png",
    visionEyebrow: "Our Vision",
    visionTitle: "Chúng tôi tin rằng thời trang tương lai phải vừa đẹp, vừa thông minh, vừa hiểu cơ thể người mặc.",
    visionParagraphs: [
      "AURELIA không chỉ bán sản phẩm. Chúng tôi xây một hệ sinh thái nơi AI học từ số đo, sở thích mặc, lịch sử thử đồ và hành vi mua sắm để đề xuất lựa chọn phù hợp nhất cho từng cá nhân.",
      "Từ đó, người dùng không còn mua quần áo bằng phỏng đoán, mà bằng dữ liệu, cảm nhận và sự tự tin.",
    ],
    techTitle: "The Tech Behind",
    techSubtitle: "Công nghệ phía sau trải nghiệm thử đồ chuẩn xác 99%",
    techCards: [
      {
        id: "stylist",
        image: "/images/about/tech-stylist.png",
        title: "AI Stylist Engine",
        description: "Phân tích style, dịp sử dụng và hành vi chọn đồ để gợi ý outfit đúng ngữ cảnh hơn mỗi lần truy cập.",
      },
      {
        id: "metrics",
        image: "/images/about/tech-metrics.png",
        title: "Body Metrics Intelligence",
        description: "Hệ thống ghi nhớ số đo, fit preference và body shape để giảm sai lệch size và tăng tự tin khi mua hàng.",
      },
      {
        id: "fit",
        image: "/images/about/tech-fit.png",
        title: "Fit Prediction Layer",
        description: "Mô hình dự đoán độ tương thích giữa cơ thể, chất liệu và phom dáng để đưa ra khuyến nghị vừa vặn hơn.",
      },
    ],
    ctaLabel: "Explore fashion + AI",
    ctaAction: "Trải nghiệm AI ngay",
  };
}
