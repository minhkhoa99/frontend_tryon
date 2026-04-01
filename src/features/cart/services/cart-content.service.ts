import type { CartPageContent } from "@/features/cart/types/cart.types";

export function getCartPageContent(): CartPageContent {
  return {
    breadcrumb: ["Giỏ hàng"],
    title: "Giỏ hàng của bạn",
    description: "Kiểm tra lại các sản phẩm, tinh chỉnh số lượng và tiếp tục tới checkout khi sẵn sàng.",
    freeShippingMessage: "Mua thêm 350.000đ để được Miễn phí giao hàng",
    subtotalLabel: "Tạm tính",
    subtotalValue: "",
    orderNoteLabel: "Ghi chú đơn hàng",
    checkoutLabel: "Tiến hành Thanh toán",
  };
}
