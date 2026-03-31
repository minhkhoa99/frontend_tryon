export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  inStock: boolean;
};

export type ProductSize = ProductVariant;

export type ProductColor = ProductVariant & {
  hex: string;
};

export type ProductAccordionItem = {
  id: string;
  title: string;
  content: string;
};

export type UpsellProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  alt: string;
};

export type ReviewAuthor = {
  name: string;
  avatar?: string;
};

export type Review = {
  id: string;
  author: ReviewAuthor;
  rating: number;
  date: string;
  size: string;
  height: string;
  images?: ProductImage[];
  content: string;
  helpful: number;
};

export type ProductContent = {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  accordions: ProductAccordionItem[];
  upsellProducts: UpsellProduct[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
};