"use client";

import { getCommerceProductById, formatCurrency } from "@/features/cart/services/commerce-products.service";
import { useCartStore } from "@/features/cart/store/cart-store";

export function useCartProducts() {
  const items = useCartStore((state) => state.items);

  const products = items
    .map((item) => {
      const product = getCommerceProductById(item.productId);
      if (!product) return null;
      return {
        ...item,
        product,
        lineTotal: product.priceValue * item.quantity,
      };
    })
    .filter(Boolean);

  const subtotalValue = products.reduce((total, item) => total + item!.lineTotal, 0);

  return {
    items: products as NonNullable<(typeof products)[number]>[],
    subtotalValue,
    subtotalLabel: formatCurrency(subtotalValue),
  };
}
