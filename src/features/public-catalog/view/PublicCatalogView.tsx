import { Link } from "react-router-dom";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppShell } from "../../../shared-components/AppShell/AppShell";
import { EmptyState } from "../../../shared-components/EmptyState/EmptyState";
import { FormField } from "../../../shared-components/FormField/FormField";
import { SectionCard } from "../../../shared-components/SectionCard/SectionCard";
import { StatusChip } from "../../../shared-components/StatusChip/StatusChip";
import { formatCurrency } from "../../../utils/formatting";
import { usePublicCatalogViewModel } from "../viewmodel/usePublicCatalogViewModel";

export default function PublicCatalogView() {
  const { catalogItems, error, filters, isLoading, onFilterChange } = usePublicCatalogViewModel();

  return (
    <AppShell subtitle="Find the perfect services and rentals for your next event." title="Discover Offerings">
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {error ? <AlertBanner message={error} tone="error" /> : null}
        
        <SectionCard>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            <FormField label="Search" value={filters.search} onChange={onFilterChange("search")} placeholder="What are you looking for?" />
            <FormField label="Category" value={filters.category} onChange={onFilterChange("category")} placeholder="e.g. Photography, Catering" />
            <FormField label="Location" value={filters.location} onChange={onFilterChange("location")} placeholder="City or Region" />
            <FormField
              label="Keywords"
              value={filters.availabilityTag}
              onChange={onFilterChange("availabilityTag")}
              placeholder="Indoor, weekend, outdoor..."
            />
          </div>
        </SectionCard>

        {isLoading ? (
          <div style={{ color: "var(--color-text-secondary)", textAlign: "center", fontSize: "1.1rem" }}>Searching the catalog...</div>
        ) : catalogItems.length ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {catalogItems.map((item) => (
              <Link key={item.id} to={`/catalog/${item.id}`} style={{ display: "block" }}>
                <div style={{ 
                  backgroundColor: "var(--color-surface)", 
                  border: "1px solid var(--color-border)", 
                  borderRadius: "var(--radius-lg)", 
                  padding: "2rem", 
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-primary)" }}>{item.name}</h3>
                      <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginTop: "0.25rem", fontWeight: 500 }}>
                        {item.category} • {item.location}
                      </div>
                    </div>
                    <StatusChip value={item.status} />
                  </div>
                  
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, margin: "1rem 0", color: "var(--color-text-primary)" }}>
                    {formatCurrency(item.priceFrom)} <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>/ starting</span>
                  </div>
                  
                  <p style={{ margin: 0, fontSize: "1rem", color: "var(--color-text-secondary)", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                  
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "2rem" }}>
                    {item.availabilityTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{ backgroundColor: "var(--color-surface-muted)", borderRadius: "var(--radius-sm)", padding: "0.4rem 0.75rem", fontSize: "0.8rem", color: "var(--color-text-tertiary)", fontWeight: 600 }}
                      >
                        {tag}
                      </span>
                    ))}
                    {item.availabilityTags.length > 3 && (
                       <span style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>+{item.availabilityTags.length - 3}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState description="Try adjusting your filters to find what you need." title="No matching items found" />
        )}
      </div>
    </AppShell>
  );
}