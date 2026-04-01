export type CartDrawerItem = {
  id: string;
  image: string;
  name: string;
  meta: string;
  quantity: number;
  price: string;
};

export type CartBackdropImage = {
  id: string;
  image: string;
  height: number;
};

export type CartDrawerContent = {
  breadcrumb: string[];
  title: string;
  description: string;
  freeShippingMessage: string;
  subtotalLabel: string;
  subtotalValue: string;
  orderNoteLabel: string;
  checkoutLabel: string;
  items: CartDrawerItem[];
  backdropLabel: string;
  backdropHero: string;
  backdropImages: CartBackdropImage[];
};
