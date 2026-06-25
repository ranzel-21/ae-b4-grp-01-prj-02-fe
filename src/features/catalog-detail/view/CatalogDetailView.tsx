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

const links = [
  { label: "Browse Catalog", to: "/catalog" },
  { label: "Vendor Login", to: "/login" },
  { label: "Vendor Signup", to: "/signup" }
];

export default function CatalogDetailView() {
  const { catalogItem, feedback, formErrors, formValues, isLoading, isSubmitting, onChange, onSubmit, vendor } =
    useCatalogDetailViewModel();

  return (
    <AppShell links={links} subtitle="Browse item details and contact the vendor with an inquiry." title="Catalog Item Details">
      {isLoading ? (
        <SectionCard>
          <p>Loading item details...</p>
        </SectionCard>
      ) : !catalogItem ? (
        <EmptyState description="The requested catalog item could not be found." title="Item unavailable" />
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {feedback ? (
            <AlertBanner message={feedback} tone={feedback.includes("success") ? "success" : "error"} />
          ) : null}
          <SectionCard>
            <div style={{ display: "grid", gap: "0.8rem" }}>
              <Link to="/catalog">Back to catalog</Link>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ margin: 0 }}>{catalogItem.name}</h2>
                  <p style={{ margin: "0.35rem 0 0", color: "#475467" }}>
                    {catalogItem.category} • {catalogItem.location}
                  </p>
                </div>
                <StatusChip value={catalogItem.status} />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.4rem" }}>{formatCurrency(catalogItem.priceFrom)}</div>
              <p style={{ margin: 0, color: "#475467" }}>{catalogItem.description}</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {catalogItem.availabilityTags.map((tag) => (
                  <span
                    key={tag}
                    style={{ backgroundColor: "#f2f4f7", borderRadius: "999px", padding: "0.3rem 0.65rem", fontSize: "0.85rem" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionCard>
          {vendor ? (
            <SectionCard title="Vendor information">
              <div style={{ display: "grid", gap: "0.35rem" }}>
                <div style={{ fontWeight: 700 }}>{vendor.businessName}</div>
                <div>{vendor.location}</div>
                <div>{vendor.contactEmail}</div>
                <div>{vendor.contactPhone}</div>
                <p style={{ marginBottom: 0, color: "#475467" }}>{vendor.description}</p>
              </div>
            </SectionCard>
          ) : null}
          <SectionCard title="Submit an inquiry">
            <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                <FormField
                  label="Customer Name"
                  value={formValues.customerName}
                  onChange={onChange("customerName")}
                  error={formErrors.customerName}
                />
                <FormField
                  label="Customer Email"
                  type="email"
                  value={formValues.customerEmail}
                  onChange={onChange("customerEmail")}
                  error={formErrors.customerEmail}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                <FormField
                  label="Customer Phone"
                  value={formValues.customerPhone}
                  onChange={onChange("customerPhone")}
                  error={formErrors.customerPhone}
                />
                <FormField
                  label="Event Type"
                  value={formValues.eventType}
                  onChange={onChange("eventType")}
                  error={formErrors.eventType}
                />
              </div>
              <FormField
                label="Event Date"
                type="date"
                value={formValues.eventDate}
                onChange={onChange("eventDate")}
                error={formErrors.eventDate}
              />
              <FormField
                as="textarea"
                label="Message"
                value={formValues.message}
                onChange={onChange("message")}
                error={formErrors.message}
              />
              <AppButton disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting..." : "Send inquiry"}
              </AppButton>
            </form>
          </SectionCard>
        </div>
      )}
    </AppShell>
  );
}
