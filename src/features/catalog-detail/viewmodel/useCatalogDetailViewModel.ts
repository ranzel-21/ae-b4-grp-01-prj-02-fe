import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { createInquiry, getCatalogItem, getVendor } from "../../../services/api";
import type { CatalogItem } from "../../../types/catalog";
import type { Vendor } from "../../../types/vendor";
import { hasErrors, validateInquiry } from "../../../utils/validation";
import { defaultInquiryValues } from "../model/catalog-detail.model";

export function useCatalogDetailViewModel() {
  const { itemId = "" } = useParams();
  const [catalogItem, setCatalogItem] = useState<CatalogItem | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [formValues, setFormValues] = useState(defaultInquiryValues);
  const [formErrors, setFormErrors] = useState(validateInquiry(defaultInquiryValues));
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      setFeedback("");

      try {
        const item = await getCatalogItem(itemId);
        setCatalogItem(item);
        const vendorDetails = await getVendor(item.vendorId);
        setVendor(vendorDetails);
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : "Unable to load catalog item.");
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [itemId]);

  const onChange =
    (field: keyof typeof formValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((current) => ({ ...current, [field]: event.target.value }));
      setFormErrors((current) => ({ ...current, [field]: "" }));
      setFeedback("");
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!catalogItem) {
      return;
    }

    const nextErrors = validateInquiry(formValues);
    setFormErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setFeedback("");

    try {
      await createInquiry({
        vendorId: catalogItem.vendorId,
        catalogItemId: catalogItem.id,
        customerName: formValues.customerName.trim(),
        customerEmail: formValues.customerEmail.trim(),
        customerPhone: formValues.customerPhone.trim(),
        eventType: formValues.eventType.trim(),
        eventDate: formValues.eventDate,
        message: formValues.message.trim()
      });
      setFeedback("Inquiry submitted successfully.");
      setFormValues(defaultInquiryValues);
      setFormErrors(validateInquiry(defaultInquiryValues));
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to submit inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    catalogItem,
    feedback,
    formErrors,
    formValues,
    isLoading,
    isSubmitting,
    onChange,
    onSubmit,
    vendor
  };
}
