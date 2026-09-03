export interface MeasurementDetail {
  chest: string;
  length: string;
  shoulder: string;
}

export type ProductCategory = "All" | "Hoodies" | "Tees" | "Outerwear" | "Accessories";

export type FitSilhouette =
  | "Regular Street Fit"
  | "Boxy Oversized Fit"
  | "Tokyo Cyber Drop Shoulder";

export interface ProductItem {
  id: string;
  name: string;
  japaneseTitle?: string;
  price: number;
  category: string;
  sizes: string[];
  printType: string;
  gsmRating: string;
  fitType: string;
  stock: number;
  featured?: boolean;
  description: string;
  printDetails?: string;
  measurements?: Record<string, MeasurementDetail | undefined>;
  imageFront: string;
  imageBack: string;
}
