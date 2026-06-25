import { Link } from "react-router-dom";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AppShell } from "../../../shared-components/AppShell/AppShell";
import { EmptyState } from "../../../shared-components/EmptyState/EmptyState";
import { FormField } from "../../../shared-components/FormField/FormField";
import { SectionCard } from "../../../shared-components/SectionCard/SectionCard";
import { StatusChip } from "../../../shared-components/StatusChip/StatusChip";
import { formatCurrency } from "../../../utils/formatting";
import { usePublicCatalogViewModel } from "../viewmodel/usePublicCatalogViewModel";

const links = [
  { label: "Browse Catalog", to: "/catalog" },
  { label: "Vendor Login", to: "/login" },
  { label: "Vendor Signup", to: "/signup" }
];

export default function PublicCatalogView() {
  const { catalogItems, error, filters, isLoading, onFilterChange } = usePublicCatalogViewModel();

  return (
    <AppShell links={links} subtitle="Discover vendors, offerings, and event-ready catalog items." title="Public Catalog">
      <div style={{ display: "grid", gap: "1rem" }}>
        {error ? <AlertBanner message={error} tone="error" /> : null}
        <SectionCard title="Find catalog items">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            <FormField label="Search" value={filters.search} onChange={onFilterChange("search")} />
            <FormField label="Category" value={filters.category} onChange={onFilterChange("category")} />
            <FormField label="Location" value={filters.location} onChange={onFilterChange("location")} />
            <FormField
              label="Availability Tag"
              value={filters.availabilityTag}
              onChange={onFilterChange("availabilityTag")}
            />
          </div>
        </SectionCard>
        {isLoading ? (
          <SectionCard>
            <p>Loading catalog items...</p>
          </SectionCard>
        ) : catalogItems.length ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {catalogItems.map((item) => (
              <SectionCard key={item.id}>
                <div style={{ display: "grid", gap: "0.8rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", alignItems: "start" }}>
                    <div>
                      <h3 style={{ margin: 0 }}>{item.name}</h3>
                      <p style={{ margin: "0.35rem 0 0", color: "#475467" }}>
                        {item.category} • {item.location}
                      </p>
                    </div>
                    <StatusChip value={item.status} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "1.2rem" }}>{formatCurrency(item.priceFrom)}</div>
                  <p style={{ margin: 0, color: "#475467" }}>{item.description}</p>
                  <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                    {item.availabilityTags.map((tag) => (
                      <span
                        key={tag}
                        style={{ backgroundColor: "#f2f4f7", borderRadius: "999px", padding: "0.3rem 0.65rem", fontSize: "0.85rem" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/catalog/${item.id}`}>
                    <AppButton fullWidth>View details</AppButton>
                  </Link>
                </div>
              </SectionCard>
            ))}
          </div>
        ) : (
          <EmptyState description="Try adjusting the filters or search text." title="No catalog items found" />
        )}
      </div>
    </AppShell>
  );
}
