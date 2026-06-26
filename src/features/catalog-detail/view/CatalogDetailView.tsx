import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AppShell } from "../../../shared-components/AppShell/AppShell";
import { EmptyState } from "../../../shared-components/EmptyState/EmptyState";
import { FormField } from "../../../shared-components/FormField/FormField";
import { SectionCard } from "../../../shared-components/SectionCard/SectionCard";
import { StatusChip } from "../../../shared-components/StatusChip/StatusChip";
import { formatCurrency } from "../../../utils/formatting";
import { useCatalogDetailViewModel } from "../viewmodel/useCatalogDetailViewModel";

export default function CatalogDetailView() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { catalogItem, feedback, formErrors, formValues, isLoading, isSubmitting, onChange, onSubmit, vendor } =
    useCatalogDetailViewModel();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setHasSubmitted(true);
    (onSubmit as any)(e);
  };

  return (
    <AppShell subtitle="Browse item details and contact the vendor with an inquiry." title="Catalog Item Details">
      {isLoading ? (
        <SectionCard>
          <p style={{ color: "var(--color-text-secondary)" }}>Loading item details...</p>
        </SectionCard>
      ) : !catalogItem ? (
        <EmptyState description="The requested catalog item could not be found." title="Item unavailable" />
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {feedback && hasSubmitted ? (
            <AlertBanner message={feedback} tone={feedback.includes("success") ? "success" : "error"} />
          ) : null}
          <SectionCard>
            <div style={{ display: "grid", gap: "0.8rem" }}>
              <Link to="/catalog">Back to catalog</Link>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
                <div>
                  <h2 style={{ margin: 0, color: "var(--color-text-primary)", fontSize: "1.75rem" }}>{catalogItem.name}</h2>
                  <p style={{ margin: "0.35rem 0 0", color: "var(--color-text-secondary)", fontWeight: 500 }}>
                    {catalogItem.category} • {catalogItem.location}
                  </p>
                </div>
                <StatusChip value={catalogItem.status} />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--color-text-primary)", margin: "0.5rem 0" }}>{formatCurrency(catalogItem.priceFrom)}</div>
              <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{catalogItem.description}</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                {catalogItem.availabilityTags.map((tag) => (
                  <span
                    key={tag}
                    style={{ background: "var(--color-surface-muted)", borderRadius: "var(--radius-sm)", padding: "0.4rem 0.85rem", fontSize: "0.85rem", color: "var(--color-text-secondary)", fontWeight: 600 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionCard>
          {vendor ? (
            <SectionCard title="Vendor information">
              <div style={{ display: "grid", gap: "0.5rem", color: "var(--color-text-secondary)" }}>
                <div style={{ fontWeight: 700, color: "var(--color-text-primary)", fontSize: "1.1rem" }}>{vendor.businessName}</div>
                <div>{vendor.location}</div>
                <div>{vendor.contactEmail}</div>
                <div>{vendor.contactPhone}</div>
                <p style={{ marginBottom: 0, marginTop: "0.5rem", lineHeight: 1.6 }}>{vendor.description}</p>
              </div>
            </SectionCard>
          ) : null}
          <SectionCard title="Submit an inquiry">
            <form onSubmit={handleFormSubmit} style={{ display: "grid", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                <FormField
                  label="Customer Name"
                  value={formValues.customerName}
                  onChange={onChange("customerName")}
                  error={hasSubmitted ? formErrors.customerName : undefined}
                />
                <FormField
                  label="Customer Email"
                  type="email"
                  value={formValues.customerEmail}
                  onChange={onChange("customerEmail")}
                  error={hasSubmitted ? formErrors.customerEmail : undefined}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                <FormField
                  label="Customer Phone"
                  value={formValues.customerPhone}
                  onChange={onChange("customerPhone")}
                  error={hasSubmitted ? formErrors.customerPhone : undefined}
                />
                <FormField
                  label="Event Type"
                  value={formValues.eventType}
                  onChange={onChange("eventType")}
                  error={hasSubmitted ? formErrors.eventType : undefined}
                />
              </div>
              <FormField
                label="Event Date"
                type="date"
                value={formValues.eventDate}
                onChange={onChange("eventDate")}
                error={hasSubmitted ? formErrors.eventDate : undefined}
              />
              <FormField
                as="textarea"
                label="Message"
                value={formValues.message}
                onChange={onChange("message")}
                error={hasSubmitted ? formErrors.message : undefined}
              />
              <div style={{ marginTop: "0.5rem" }}>
                <AppButton disabled={isSubmitting} type="submit" fullWidth>
                  {isSubmitting ? "Submitting..." : "Send inquiry"}
                </AppButton>
              </div>
            </form>
          </SectionCard>
        </div>
      )}
    </AppShell>
  );
}