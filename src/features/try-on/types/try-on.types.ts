export type ViewerMode = "before-after" | "zoom";

export type TryOnProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  fitMatchPercent: number;
};

export type ColorSwatch = {
  id: string;
  hex: string;
  selected: boolean;
};

export type SizeOption = {
  id: string;
  label: string;
  selected: boolean;
};

export type StylePairing = {
  id: string;
  name: string;
  price: string;
  image: string;
  alt: string;
};

export type FitMeasurement = {
  label: string;
  value: string;
};

export type FitNote = {
  confidence: number;
  recommendation: string;
  measurements: FitMeasurement[];
};

export type TryOnContent = {
  product: TryOnProduct;
  swatches: ColorSwatch[];
  sizes: SizeOption[];
  pairings: StylePairing[];
  fitNote: FitNote;
  viewerImage: string;
  viewerImageAlt: string;
};
