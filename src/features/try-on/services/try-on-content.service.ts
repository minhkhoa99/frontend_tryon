import type { TryOnContent } from "@/features/try-on/types/try-on.types";

export function getTryOnContent(): TryOnContent {
  return {
    product: {
      id: "silk-contour-top",
      name: "Silk Contour Top",
      description: "Draped neckline, satin sheen, optimized for slim-to-regular fit silhouettes.",
      image: "/images/try-on/product-top.jpg",
      alt: "Silk Contour Top product card",
      fitMatchPercent: 95,
    },
    swatches: [
      { id: "rose", hex: "#F2D2DB", selected: true },
      { id: "dark", hex: "#14161B", selected: false },
      { id: "brown", hex: "#8E6E5B", selected: false },
      { id: "blue", hex: "#6D8298", selected: false },
    ],
    sizes: [
      { id: "xs", label: "XS", selected: false },
      { id: "s", label: "S", selected: true },
      { id: "m", label: "M", selected: false },
      { id: "l", label: "L", selected: false },
    ],
    pairings: [
      {
        id: "noir-tapered-pants",
        name: "Noir Tapered Pants",
        price: "2.150.000đ",
        image: "/images/try-on/pairing-pants.jpg",
        alt: "Noir Tapered Pants pairing suggestion",
      },
      {
        id: "blush-point-heels",
        name: "Blush Point Heels",
        price: "1.890.000đ",
        image: "/images/try-on/pairing-heels.jpg",
        alt: "Blush Point Heels pairing suggestion",
      },
    ],
    fitNote: {
      confidence: 92,
      recommendation: "Khuyến nghị size S - ôm vừa vai, gọn ngực và rơi nhẹ ở eo.",
      measurements: [
        { label: "Vai", value: "38 cm" },
        { label: "Ngực", value: "84 cm" },
        { label: "Eo", value: "66 cm" },
      ],
    },
    viewerImage: "/images/try-on/viewer-avatar.jpg",
    viewerImageAlt: "Virtual try-on avatar canvas with AI silhouette scanning",
  };
}
