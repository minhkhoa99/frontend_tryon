export type WishlistProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  buttonLabel: string;
  thumbImage: string;
};

export type WishlistColumn = {
  id: string;
  products: WishlistProduct[];
};

export type WishlistContent = {
  breadcrumb: string[];
  title: string;
  description: string;
  columns: WishlistColumn[];
  mixTitle: string;
  mixDescription: string;
  mixLookImages: string[];
  mixHeroImage: string;
  mixButtonLabel: string;
};
