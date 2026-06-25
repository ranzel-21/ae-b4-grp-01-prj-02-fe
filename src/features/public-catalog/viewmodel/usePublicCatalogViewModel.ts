import { useEffect, useState, type ChangeEvent } from "react";
import { listCatalogItems } from "../../../services/api";
import type { CatalogItem } from "../../../types/catalog";
import { defaultPublicCatalogFilters } from "../model/public-catalog.model";

export function usePublicCatalogViewModel() {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [filters, setFilters] = useState(defaultPublicCatalogFilters);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      setError("");

      try {
        const items = await listCatalogItems(filters);
        setCatalogItems(items);
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "Unable to load catalog.");
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [filters.search, filters.category, filters.location, filters.availabilityTag]);

  const onFilterChange =
    (field: keyof typeof filters) => (event: ChangeEvent<HTMLInputElement>) => {
      setFilters((current) => ({ ...current, [field]: event.target.value }));
    };

  return {
    catalogItems,
    error,
    filters,
    isLoading,
    onFilterChange
  };
}
