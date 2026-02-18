import type { CatalogPhone } from "@modules/catalog";

export interface PhoneColorOption {
  code: string;
  name: string;
  imageUrl: string;
}

export interface PhoneStorageOption {
  code: string;
  name: string;
  price: number;
}

export interface PhoneDetail {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
  description: string;
  specs: Record<string, string>;
  colorOptions: PhoneColorOption[];
  storageOptions: PhoneStorageOption[];
  similarProducts: CatalogPhone[];
}
