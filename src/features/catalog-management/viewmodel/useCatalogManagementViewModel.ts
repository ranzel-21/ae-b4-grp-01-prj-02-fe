import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../../../hooks/useAuth";
import {
  createCatalogItem,
  deleteCatalogItem,
  listCatalogItems,
  updateCatalogItem
} from "../../../services/api";
import type { CatalogItem } from "../../../types/catalog";
import { hasErrors, validateCatalogItem } from "../../../utils/validation";
import { defaultCatalogFilters, defaultCatalogItemValues } from "../model/catalog-management.model";

export function useCatalogManagementViewModel() {
  const { accessToken, signOut, vendor } = useAuth();
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [filters, setFilters] = useState(defaultCatalogFilters);
  const [formValues, setFormValues] = useState(defaultCatalogItemValues);
  
  // Initialize with an empty error object instead of pre-validating empty states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadItems = async () => {
    if (!vendor) {
      return;
    }

    setIsLoading(true);

    try {
      const items = await listCatalogItems({ ...filters, vendorId: vendor.id }, accessToken);
      setCatalogItems(items);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to load catalog items.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, [accessToken, vendor, filters.search, filters.category, filters.location, filters.availabilityTag]);

  const onFilterChange =
    (field: keyof typeof filters) => (event: ChangeEvent<HTMLInputElement>) => {
      setFilters((current) => ({ ...current, [field]: event.target.value }));
    };

  const onFormChange =
    (field: keyof typeof formValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormValues((current) => ({ ...current, [field]: event.target.value }));
      // Clear validation message for this field immediately when typing
      setFormErrors((current) => ({ ...current, [field]: "" }));
      setFeedback("");
    };

  const startEdit = (item: CatalogItem) => {
    setEditingItemId(item.id);
    setFormValues({
      name: item.name,
      category: item.category,
      description: item.description,
      priceFrom: String(item.priceFrom),
      location: item.location,
      availabilityTags: item.availabilityTags.join(", "),
      status: item.status
    });
    // Clear all errors when switching items or opening edit state
    setFormErrors({});
    setFeedback("");
  };

  const resetForm = () => {
    setEditingItemId(null);
    setFormValues(defaultCatalogItemValues);
    // Purge validation state so empty fields aren't marked as errors
    setFormErrors({});
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!vendor) {
      return;
    }

    const nextErrors = validateCatalogItem(formValues);
    setFormErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setFeedback("");

    const payload = {
      vendorId: vendor.id,
      name: formValues.name.trim(),
      category: formValues.category.trim(),
      description: formValues.description.trim(),
      priceFrom: Number(formValues.priceFrom),
      location: formValues.location.trim(),
      availabilityTags: formValues.availabilityTags.split(",").map((tag) => tag.trim()).filter(Boolean),
      status: formValues.status
    };

    try {
      if (editingItemId) {
        await updateCatalogItem(editingItemId, payload, accessToken);
        setFeedback("Catalog item updated successfully.");
      } else {
        await createCatalogItem(payload, accessToken);
        setFeedback("Catalog item created successfully.");
      }
      resetForm();
      await loadItems();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to save catalog item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async (itemId: string) => {
    try {
      await deleteCatalogItem(itemId, accessToken);
      setFeedback("Catalog item deleted successfully.");
      await loadItems();
      if (editingItemId === itemId) {
        resetForm();
      }
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to delete catalog item.");
    }
  };

  const filteredCountLabel = useMemo(() => `${catalogItems.length} item${catalogItems.length === 1 ? "" : "s"}`, [catalogItems.length]);

  return {
    catalogItems,
    feedback,
    filteredCountLabel,
    filters,
    formErrors,
    formValues,
    isEditing: Boolean(editingItemId),
    isLoading,
    isSubmitting,
    onDelete,
    onFilterChange,
    onFormChange,
    onLogout: signOut,
    onSubmit,
    resetForm,
    startEdit
  };
}