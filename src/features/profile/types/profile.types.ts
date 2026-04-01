export type BodyMetricKey = "height" | "weight" | "bust" | "waist" | "hips" | "shoulder" | "thigh";

export type ProfileSidebarItem = {
  id: string;
  label: string;
  href: string;
  active?: boolean;
};

export type BodyMetricField = {
  key: BodyMetricKey;
  label: string;
  unit: string;
  value: number;
  max: number;
};

export type FitPreference = {
  id: string;
  label: string;
  active?: boolean;
};

export type BodyShapeCard = {
  id: string;
  label: string;
  image: string;
  active?: boolean;
};

export type BodyInsight = {
  title: string;
  description: string;
  tags: string[];
};

export type BodyMetricsContent = {
  breadcrumb: string[];
  sidebarTitle: string;
  sidebarItems: ProfileSidebarItem[];
  title: string;
  description: string;
  metricsTitle: string;
  shapeTitle: string;
  saveLabel: string;
  savedMessage: string;
  metricFields: BodyMetricField[];
  fitPreferences: FitPreference[];
  bodyShapes: BodyShapeCard[];
  bodyModelImage: string;
  insight: BodyInsight;
};
