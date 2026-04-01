"use client";

import { create } from "zustand";

type WishlistStore = {
  productIds: string[];
  toggleItem: (productId: string) => void;
};

export const useWishlistStore = create<WishlistStore>((set) => ({
  productIds: [
    "velvet-aura-dress",
    "silk-evening-gown",
    "noir-tech-blazer",
    "pearl-accent-blouse",
    "nude-flow-trench",
    "wool-blend-coat",
  ],
  toggleItem: (productId) =>
    set((state) => ({
      productIds: state.productIds.includes(productId)
        ? state.productIds.filter((id) => id !== productId)
        : [...state.productIds, productId],
    })),
}));
