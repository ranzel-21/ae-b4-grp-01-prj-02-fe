export type CatalogItemStatus = "active" | "draft" | "archived";

export interface CatalogItem {
  id: string;
  vendorId: string;
  name: string;
  category: string;
  description: string;
  priceFrom: number;
  location: string;
  availabilityTags: string[];
  status: CatalogItemStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogFilters {
  search: string;
  category: string;
  location: string;
  availabilityTag: string;
}

export interface CatalogItemFormValues {
  name: string;
  category: string;
  description: string;
  priceFrom: string;
  location: string;
  availabilityTags: string;
  status: CatalogItemStatus;
}
