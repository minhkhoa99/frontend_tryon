import type { CatalogContent } from "@/features/catalog/types/catalog.types";

export function getCatalogContent(): CatalogContent {
  return {
    breadcrumb: ["Cửa hàng", "Danh sách sản phẩm"],
    title: "Bộ sưu tập tối giản\ncho nhịp sống hiện đại",
    description:
      "Khám phá các thiết kế ready-to-wear được tuyển chọn với phom dáng gọn, bảng màu tinh tế và khả năng phối linh hoạt cho nhiều hoàn cảnh.",
    heroTags: [
      { id: "new", label: "New arrivals" },
      { id: "best", label: "Best seller" },
    ],
    filterTitle: "Bộ lọc",
    priceLabel: "Khoảng giá",
    priceValue: "1.500.000đ — 5.000.000đ",
    colorLabel: "Màu sắc",
    colors: [
      { id: "blush", hex: "#F2D2DB", selected: true },
      { id: "noir", hex: "#13151A" },
      { id: "sand", hex: "#B8977E" },
      { id: "steel", hex: "#8FA2B1" },
    ],
    sizeLabel: "Kích cỡ",
    materialLabel: "Chất liệu",
    searchPlaceholder: "Omni-search: váy lụa, blazer, nude heels...",
    sortLabel: "Sắp xếp: Nổi bật",
    resultCount: "36 sản phẩm",
    columns: [
      {
        id: "col-1",
        products: [
          {
            id: "velvet-aura-dress",
            name: "Velvet Aura Dress",
            price: "3.490.000đ",
            image: "/images/catalog/velvet-aura-dress.png",
            imageHeight: 320,
          },
          {
            id: "soft-contour-knit",
            name: "Soft Contour Knit",
            price: "2.250.000đ",
            image: "/images/catalog/soft-contour-knit.png",
            imageHeight: 380,
          },
        ],
      },
      {
        id: "col-2",
        products: [
          {
            id: "noir-tech-blazer",
            name: "Noir Tech Blazer",
            price: "2.890.000đ",
            image: "/images/catalog/noir-tech-blazer.png",
            imageHeight: 410,
          },
          {
            id: "mini-sculpt-bag",
            name: "Mini Sculpt Bag",
            price: "2.790.000đ",
            image: "/images/catalog/mini-sculpt-bag.png",
            imageHeight: 300,
          },
        ],
      },
      {
        id: "col-3",
        products: [
          {
            id: "nude-flow-trench",
            name: "Nude Flow Trench",
            price: "4.150.000đ",
            image: "/images/catalog/nude-flow-trench.png",
            imageHeight: 280,
          },
          {
            id: "linear-nude-heels",
            name: "Linear Nude Heels",
            price: "1.890.000đ",
            image: "/images/catalog/linear-nude-heels.png",
            imageHeight: 360,
          },
        ],
      },
    ],
    pagination: ["1", "2", "→"],
  };
}
