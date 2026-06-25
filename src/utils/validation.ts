import type { CatalogItemFormValues } from "../types/catalog";
import type { InquiryFormValues } from "../types/inquiry";
import type { SignupPayload } from "../types/auth";
import type { VendorFormValues } from "../types/vendor";

export type FieldErrors<TFields extends string> = Record<TFields, string>;

export function validateLogin(values: { email: string; password: string }) {
  return {
    email: values.email.includes("@") ? "" : "Enter a valid email address.",
    password: values.password.length >= 8 ? "" : "Password must be at least 8 characters."
  };
}

export function validateSignup(values: SignupPayload) {
  return {
    ...validateLogin(values),
    businessName:
      values.businessName.trim().length >= 2 && values.businessName.trim().length <= 180
        ? ""
        : "Business name must be between 2 and 180 characters.",
    description:
      values.description.trim().length >= 10 && values.description.trim().length <= 4000
        ? ""
        : "Description must be between 10 and 4000 characters.",
    location:
      values.location.trim().length >= 2 && values.location.trim().length <= 160
        ? ""
        : "Location must be between 2 and 160 characters.",
    contactEmail: values.contactEmail.includes("@") ? "" : "Enter a valid contact email.",
    contactPhone: values.contactPhone.trim().length >= 7 ? "" : "Enter a valid contact phone."
  };
}

export function validateVendorProfile(values: VendorFormValues) {
  return {
    businessName:
      values.businessName.trim().length >= 2 && values.businessName.trim().length <= 180
        ? ""
        : "Business name must be between 2 and 180 characters.",
    description:
      values.description.trim().length >= 10 && values.description.trim().length <= 4000
        ? ""
        : "Description must be between 10 and 4000 characters.",
    location:
      values.location.trim().length >= 2 && values.location.trim().length <= 160
        ? ""
        : "Location must be between 2 and 160 characters.",
    contactEmail: values.contactEmail.includes("@") ? "" : "Enter a valid contact email.",
    contactPhone: values.contactPhone.trim().length >= 7 ? "" : "Enter a valid contact phone."
  };
}

export function validateCatalogItem(values: CatalogItemFormValues) {
  const parsedPrice = Number(values.priceFrom);

  return {
    name:
      values.name.trim().length >= 2 && values.name.trim().length <= 180
        ? ""
        : "Name must be between 2 and 180 characters.",
    category:
      values.category.trim().length >= 2 && values.category.trim().length <= 120
        ? ""
        : "Category must be between 2 and 120 characters.",
    description:
      values.description.trim().length >= 10 && values.description.trim().length <= 4000
        ? ""
        : "Description must be between 10 and 4000 characters.",
    priceFrom:
      Number.isFinite(parsedPrice) && parsedPrice >= 0 ? "" : "Price must be a non-negative number.",
    location:
      values.location.trim().length >= 2 && values.location.trim().length <= 160
        ? ""
        : "Location must be between 2 and 160 characters.",
    availabilityTags: values.availabilityTags.trim() ? "" : "Provide at least one availability tag."
  };
}

export function validateInquiry(values: InquiryFormValues) {
  return {
    customerName: values.customerName.trim().length >= 2 ? "" : "Enter the customer name.",
    customerEmail: values.customerEmail.includes("@") ? "" : "Enter a valid customer email.",
    customerPhone: values.customerPhone.trim().length >= 7 ? "" : "Enter a valid customer phone.",
    eventType: values.eventType.trim().length >= 2 ? "" : "Enter the event type.",
    eventDate: values.eventDate ? "" : "Select an event date.",
    message:
      values.message.trim().length >= 10 && values.message.trim().length <= 4000
        ? ""
        : "Message must be between 10 and 4000 characters."
  };
}

export function hasErrors(errors: Record<string, string>) {
  return Object.values(errors).some(Boolean);
}
