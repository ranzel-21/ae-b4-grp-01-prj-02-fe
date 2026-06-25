import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AppShell } from "../../../shared-components/AppShell/AppShell";
import { EmptyState } from "../../../shared-components/EmptyState/EmptyState";
import { FormField } from "../../../shared-components/FormField/FormField";
import { SectionCard } from "../../../shared-components/SectionCard/SectionCard";
import { SelectField } from "../../../shared-components/SelectField/SelectField";
import { StatusChip } from "../../../shared-components/StatusChip/StatusChip";
import { formatCurrency } from "../../../utils/formatting";
import { useCatalogManagementViewModel } from "../viewmodel/useCatalogManagementViewModel";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" },
  { label: "Manage Catalog", to: "/vendor/catalog" },
  { label: "Inquiries", to: "/vendor/inquiries" },
  { label: "Browse Catalog", to: "/catalog" }
];

export default function CatalogManagementView() {
  const {
    catalogItems,
    feedback,
    filteredCountLabel,
    filters,
    formErrors,
    formValues,
    isEditing,
    isLoading,
    isSubmitting,
    onDelete,
    onFilterChange,
    onFormChange,
    onLogout,
    onSubmit,
    resetForm,
    startEdit
  } = useCatalogManagementViewModel();

  return (
    <AppShell links={links} onLogout={onLogout} subtitle="Create, edit, and archive your public catalog items." title="Catalog Management">
      <div style={{ display: "grid", gap: "1rem" }}>
        {feedback ? <AlertBanner message={feedback} tone={feedback.includes("success") ? "success" : "error"} /> : null}
        <SectionCard title={isEditing ? "Edit catalog item" : "Create catalog item"}>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              <FormField label="Name" value={formValues.name} onChange={onFormChange("name")} error={formErrors.name} />
              <FormField
                label="Category"
                value={formValues.category}
                onChange={onFormChange("category")}
                error={formErrors.category}
              />
            </div>
            <FormField
              as="textarea"
              label="Description"
              value={formValues.description}
              onChange={onFormChange("description")}
              error={formErrors.description}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
              <FormField
                label="Price From"
                type="number"
                min="0"
                value={formValues.priceFrom}
                onChange={onFormChange("priceFrom")}
                error={formErrors.priceFrom}
              />
              <FormField
                label="Location"
                value={formValues.location}
                onChange={onFormChange("location")}
                error={formErrors.location}
              />
              <SelectField
                label="Status"
                value={formValues.status}
                onChange={onFormChange("status")}
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "Active", value: "active" },
                  { label: "Archived", value: "archived" }
                ]}
              />
            </div>
            <FormField
              label="Availability Tags"
              value={formValues.availabilityTags}
              onChange={onFormChange("availabilityTags")}
              error={formErrors.availabilityTags}
              placeholder="Indoor, Weekend, Metro Manila"
            />
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <AppButton disabled={isSubmitting} type="submit">
                {isSubmitting ? "Saving..." : isEditing ? "Update item" : "Create item"}
              </AppButton>
              {isEditing ? (
                <AppButton type="button" variant="secondary" onClick={resetForm}>
                  Cancel edit
                </AppButton>
              ) : null}
            </div>
          </form>
        </SectionCard>

        <SectionCard title={`Catalog list (${filteredCountLabel})`}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
            <FormField label="Search" value={filters.search} onChange={onFilterChange("search")} />
            <FormField label="Category" value={filters.category} onChange={onFilterChange("category")} />
            <FormField label="Location" value={filters.location} onChange={onFilterChange("location")} />
            <FormField
              label="Availability Tag"
              value={filters.availabilityTag}
              onChange={onFilterChange("availabilityTag")}
            />
          </div>
          {isLoading ? (
            <p>Loading catalog items...</p>
          ) : catalogItems.length ? (
            <div style={{ display: "grid", gap: "0.85rem" }}>
              {catalogItems.map((item) => (
                <article
                  key={item.id}
                  style={{
                    border: "1px solid #eaecf0",
                    borderRadius: "1rem",
                    padding: "1rem",
                    display: "grid",
                    gap: "0.75rem"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    <div>
                      <h3 style={{ margin: 0 }}>{item.name}</h3>
                      <p style={{ margin: "0.4rem 0 0", color: "#475467" }}>
                        {item.category} • {item.location} • {formatCurrency(item.priceFrom)}
                      </p>
                    </div>
                    <StatusChip value={item.status} />
                  </div>
                  <p style={{ margin: 0, color: "#475467" }}>{item.description}</p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {item.availabilityTags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "0.3rem 0.65rem",
                          borderRadius: "999px",
                          backgroundColor: "#f2f4f7",
                          fontSize: "0.85rem"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <AppButton type="button" variant="secondary" onClick={() => startEdit(item)}>
                      Edit
                    </AppButton>
                    <AppButton type="button" onClick={() => onDelete(item.id)}>
                      Delete
                    </AppButton>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState description="Create your first catalog item to start receiving inquiries." title="No catalog items found" />
          )}
        </SectionCard>
      </div>
    </AppShell>
  );
}
