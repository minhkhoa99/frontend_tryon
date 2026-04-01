import type { CartDrawerContent } from "@/features/cart/types/cart.types";

export function getCartDrawerContent(): CartDrawerContent {
  return {
    breadcrumb: ["Giỏ hàng"],
    title: "Giỏ hàng của bạn",
    description: "Kiểm tra lại các sản phẩm, tinh chỉnh số lượng và tiếp tục tới checkout khi sẵn sàng.",
    freeShippingMessage: "Mua thêm 350.000đ để được Miễn phí giao hàng",
    subtotalLabel: "Tạm tính",
    subtotalValue: "5.380.000đ",
    orderNoteLabel: "Ghi chú đơn hàng",
    checkoutLabel: "Tiến hành Thanh toán",
    items: [
      {
        id: "top",
        image: "/images/cart/item-top.png",
        name: "Silk Contour Top",
        meta: "Size S · Hồng phấn",
        quantity: 1,
        price: "3.490.000đ",
      },
      {
        id: "heels",
        image: "/images/cart/item-heels.png",
        name: "Blush Point Heels",
        meta: "Size 37",
        quantity: 1,
        price: "1.890.000đ",
      },
    ],
    backdropLabel: "Backdrop website state",
    backdropHero: "/images/cart/backdrop-hero.png",
    backdropImages: [
      { id: "look", image: "/images/cart/backdrop-look.png", height: 320 },
      { id: "shoe", image: "/images/cart/backdrop-shoe.png", height: 320 },
    ],
  };
}
