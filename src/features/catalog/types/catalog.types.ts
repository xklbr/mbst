export interface CatalogPhone {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
}

export interface CatalogQuery {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface CatalogResult {
  items: CatalogPhone[];
  total: number;
}
