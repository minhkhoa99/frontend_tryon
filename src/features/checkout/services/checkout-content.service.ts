import type { CheckoutContent } from "@/features/checkout/types/checkout.types";

export function getCheckoutContent(): CheckoutContent {
  return {
    breadcrumb: ["Giỏ hàng", "Giỏ hàng / Thanh toán"],
    title: "Hoàn tất đơn hàng",
    description:
      "Thanh toán một trang giúp hoàn tất đơn nhanh, rõ ràng và tạo cảm giác an tâm ở từng bước.",
    submitLabel: "Thanh toán",
    promoCode: "AURELIA10",
    promoCta: "Áp dụng",
    shippingTitle: "Thông tin giao hàng",
    paymentTitle: "Phương thức thanh toán",
    summaryBadge: "Sticky order summary",
    summaryTitle: "Tóm tắt đơn hàng",
    paymentMethods: [
      { id: "card", label: "Credit / Debit Card", detail: "Visa · Mastercard" },
      { id: "cod", label: "Cash on Delivery" },
      { id: "wallet", label: "E-wallet", detail: "MoMo · ZaloPay" },
    ],
    summaryItems: [
      {
        id: "top",
        image: "/images/checkout/item-top.png",
        name: "Silk Contour Top",
        meta: "Size S · Blush Rose",
        price: "3.490.000đ",
      },
      {
        id: "heels",
        image: "/images/checkout/item-heels.png",
        name: "Blush Point Heels",
        meta: "Size 37",
        price: "1.890.000đ",
      },
    ],
    breakdownLines: [
      { id: "subtotal", label: "Tạm tính", value: "5.380.000đ" },
      { id: "shipping", label: "Phí vận chuyển", value: "30.000đ" },
      { id: "discount", label: "Ưu đãi", value: "-538.000đ", tone: "positive" },
    ],
    totalLabel: "Tổng thanh toán",
    totalValue: "4.872.000đ",
    trustItems: [
      { id: "ssl", label: "SSL bảo mật", detail: "Thanh toán mã hóa" },
      { id: "returns", label: "Đổi trả 7 ngày", detail: "Đổi size dễ dàng" },
      { id: "authentic", label: "Chính hãng", detail: "Cam kết thương hiệu" },
    ],
    defaultValues: {
      fullName: "Linh Nguyen",
      phone: "090 123 4567",
      email: "linh@example.com",
      address: "12 Nguyen Hue, Ben Nghe Ward, District 1",
      city: "Ho Chi Minh City / D1",
      postalCode: "700000",
      paymentMethod: "card",
    },
  };
}
