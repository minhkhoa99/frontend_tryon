export type CatalogTag = {
  id: string;
  label: string;
};

export type CatalogColor = {
  id: string;
  hex: string;
  selected?: boolean;
};

export type CatalogProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  imageHeight: number;
};

export type CatalogColumn = {
  id: string;
  products: CatalogProduct[];
};

export type CatalogContent = {
  breadcrumb: string[];
  title: string;
  description: string;
  heroTags: CatalogTag[];
  filterTitle: string;
  priceLabel: string;
  priceValue: string;
  colorLabel: string;
  colors: CatalogColor[];
  sizeLabel: string;
  materialLabel: string;
  searchPlaceholder: string;
  sortLabel: string;
  resultCount: string;
  columns: CatalogColumn[];
  pagination: string[];
};
