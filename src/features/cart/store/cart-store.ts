"use client";

import { create } from "zustand";
import type { CartLineItem } from "@/features/cart/types/commerce.types";

type CartStore = {
  items: CartLineItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [
    { productId: "silk-contour-top", quantity: 1 },
    { productId: "blush-point-heels", quantity: 1 },
  ],
  addItem: (productId) =>
    set((state) => {
      const existing = state.items.find((item) => item.productId === productId);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return { items: [...state.items, { productId, quantity: 1 }] };
    }),
  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
  setQuantity: (productId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((item) => item.productId !== productId)
          : state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    })),
}));
