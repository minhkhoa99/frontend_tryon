export type CommerceProduct = {
  id: string;
  slug: string;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  gallery: string[];
  description: string;
  cartMeta: string;
  wishlistThumbImage: string;
};

export type CartLineItem = {
  productId: string;
  quantity: number;
};
