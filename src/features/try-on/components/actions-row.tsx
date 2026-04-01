"use client";

import { useCartStore } from "@/features/cart/store/cart-store";
import { getCommerceProductById } from "@/features/cart/services/commerce-products.service";
import { useToastStore } from "@/shared/store/toast-store";

type ActionsRowProps = {
  productId: string;
};

export function ActionsRow({ productId }: ActionsRowProps) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  return (
    <div className="flex flex-col gap-3.5 sm:flex-row">
      <button
        type="button"
        onClick={() => {
          const product = getCommerceProductById(productId);
          if (!product) {
            showToast({
              title: "Không thể thêm vào giỏ",
              description: "Sản phẩm hiện không khả dụng. Vui lòng thử lại.",
              tone: "error",
            });
            return;
          }
          addItem(productId);
          showToast({
            title: "Đã thêm vào giỏ hàng",
            description: `${product.name} đã được thêm vào giỏ của bạn.`,
            tone: "success",
          });
        }}
        className="w-full min-w-0 rounded-full bg-linear-to-b from-[#f6d2db] to-[#d89aae] px-6 py-4 text-[15px] font-bold text-[#140e12] shadow-[0_20px_40px_rgba(241,196,214,0.22)] transition hover:scale-[1.02] sm:flex-1"
      >
        Thêm vào giỏ hàng
      </button>
      <button type="button" className="w-full rounded-full border border-white/[0.1] bg-white/[0.05] px-6 py-4 text-[15px] font-semibold text-[#f4ece7] transition hover:bg-white/[0.09] sm:w-auto sm:flex-none">
        AI gợi ý phối thêm
      </button>
    </div>
  );
}
