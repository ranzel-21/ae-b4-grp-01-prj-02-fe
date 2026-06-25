import type { CatalogFilters, CatalogItemFormValues } from "../../../types/catalog";

export const defaultCatalogFilters: CatalogFilters = {
  search: "",
  category: "",
  location: "",
  availabilityTag: ""
};

export const defaultCatalogItemValues: CatalogItemFormValues = {
  name: "",
  category: "",
  description: "",
  priceFrom: "0",
  location: "",
  availabilityTags: "",
  status: "draft"
};
