import { useState, useEffect } from "react";
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

export default function CatalogManagementView() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "draft" | "archived">("all");
  
  const {
    catalogItems,
    feedback,
    filters,
    formErrors,
    formValues,
    isEditing,
    isLoading,
    isSubmitting,
    onDelete,
    onFilterChange,
    onFormChange,
    onSubmit,
    resetForm,
    startEdit
  } = useCatalogManagementViewModel();

  // Handles hiding the alert banner after 5 seconds and resets submit states on success
  useEffect(() => {
    if (feedback) {
      setShowBanner(true);
      
      if (feedback.toLowerCase().includes("success")) {
        setHasSubmitted(false);
      }

      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (onSubmit as any)(e);
  };

  const handleResetForm = () => {
    setHasSubmitted(false);
    resetForm();
  };

  const handleTabChange = (tab: "all" | "active" | "draft" | "archived") => {
    setActiveTab(tab);
    setHasSubmitted(false); // Clear error display status when pivoting context view tabs
  };

  const displayedItems = catalogItems.filter((item) => {
    if (activeTab === "all") return true;
    return item.status?.toLowerCase() === activeTab;
  });

  return (
    <AppShell subtitle="Manage, monitor, and organize your product catalog and service offerings." title="Catalog Inventory">
      <div style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "minmax(0, 1fr) minmax(340px, 420px)", width: "100%" }}>
        
        {/* LEFT COLUMN: Main Inventory List & Status Tabs Filters */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", order: 1 }}>
          <SectionCard title="Inventory Registry">
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <FormField label="Search Items" placeholder="Filter by name..." value={filters.search} onChange={onFilterChange("search")} />
              <FormField label="Category" placeholder="Filter by class..." value={filters.category} onChange={onFilterChange("category")} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>Filter by Status</label>
              <div style={{ 
                display: "flex", 
                gap: "0.35rem", 
                backgroundColor: "rgba(15, 23, 42, 0.04)", 
                padding: "0.35rem", 
                borderRadius: "var(--radius-md)",
                width: "100%",
                maxWidth: "500px"
              }}>
                {(["all", "active", "draft", "archived"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    style={{
                      flex: 1,
                      border: "none",
                      padding: "0.55rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textTransform: "capitalize",
                      cursor: "pointer",
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      background: activeTab === tab ? "var(--gradient-primary)" : "transparent",
                      color: activeTab === tab ? "#ffffff" : "var(--color-text-secondary)",
                      boxShadow: activeTab === tab ? "0 4px 12px rgba(99, 102, 241, 0.2)" : "none",
                    }}
                  >
                    {tab === "all" ? "All Items" : tab}
                  </button>
                ))}
              </div>
            </div>
            
            {isLoading ? (
              <p style={{ color: "var(--color-text-secondary)" }}>Retrieving manifest database...</p>
            ) : displayedItems.length ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {displayedItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "1.75rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      background: "var(--color-surface-muted)",
                      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.transform = "translateX(6px)"; 
                      e.currentTarget.style.borderColor = "var(--color-border-hover)";
                      e.currentTarget.style.boxShadow = "var(--shadow-sm)"; 
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.transform = "none"; 
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.boxShadow = "none"; 
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{item.name}</h3>
                          <StatusChip value={item.status} />
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
                          <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>{formatCurrency(item.priceFrom)}</span>
                          <span style={{ color: "var(--color-text-tertiary)" }}> • </span>
                          {item.category}
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <AppButton type="button" variant="secondary" onClick={() => { setHasSubmitted(false); startEdit(item); }} style={{ padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 600 }}>
                          Edit
                        </AppButton>
                        <AppButton type="button" variant="danger" onClick={() => onDelete(item.id)} style={{ padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 600 }}>
                          Delete
                        </AppButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState description="No inventory items match the currently specified filters." title="No Items Found" />
            )}
          </SectionCard>
        </div>

        {/* RIGHT COLUMN: Creation Side Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", order: 2 }}>
          {showBanner && feedback && !isEditing ? (
            <div style={{ animation: "fadeIn 0.3s ease-out" }}>
              <AlertBanner message={feedback} tone={feedback.includes("success") ? "success" : "error"} />
            </div>
          ) : null}
          <SectionCard title="Add New Item">
            {isEditing ? (
              <div style={{ padding: "2rem 0", textAlign: "center", color: "var(--color-text-tertiary)" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📝</div>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>You are currently editing an item in the dialog. Finish editing to create a new one.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <FormField label="Item Name" placeholder="e.g. Grand Ballroom" value={formValues.name} onChange={onFormChange("name")} error={hasSubmitted ? formErrors.name : undefined} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <FormField label="Category" placeholder="e.g. Venues" value={formValues.category} onChange={onFormChange("category")} error={hasSubmitted ? formErrors.category : undefined} />
                  <SelectField
                    label="Initial Status"
                    value={formValues.status}
                    onChange={onFormChange("status")}
                    options={[{ label: "Draft (Private)", value: "draft" }, { label: "Active (Public)", value: "active" }]}
                  />
                </div>
                <FormField as="textarea" label="Description" value={formValues.description} onChange={onFormChange("description")} error={hasSubmitted ? formErrors.description : undefined} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <FormField label="Base Price" type="number" min="0" value={formValues.priceFrom} onChange={onFormChange("priceFrom")} error={hasSubmitted ? formErrors.priceFrom : undefined} />
                  <FormField label="Location / Zone" value={formValues.location} onChange={onFormChange("location")} error={hasSubmitted ? formErrors.location : undefined} />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  style={{
                    marginTop: "0.5rem", width: "100%", border: "none", padding: "0.85rem 1.5rem",
                    color: "#ffffff", background: "var(--gradient-primary)", borderRadius: "var(--radius-sm)",
                    fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(99, 102, 241, 0.15)",
                  }}
                >
                  {isSubmitting ? "Adding..." : "Create Inventory Item"}
                </button>
              </form>
            )}
          </SectionCard>
        </div>
      </div>

      {/* COMPACT & AESTHETIC GLASSMORPHIC MODAL */}
      {isEditing && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem",
          animation: "fadeIn 0.2s ease-out forwards"
        }}>
          <div style={{
            backgroundColor: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-lg), 0 20px 50px rgba(99, 102, 241, 0.15)",
            width: "100%", maxWidth: "720px",
            padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem"
          }}>
            
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: "1rem" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-primary)" }}>Edit Inventory Item</h2>
              </div>
              <button 
                type="button" 
                onClick={handleResetForm} 
                style={{ 
                  background: "rgba(15, 23, 42, 0.05)", border: "none", cursor: "pointer", color: "var(--color-text-secondary)",
                  width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {showBanner && feedback && (
              <div style={{ animation: "fadeIn 0.3s ease-out" }}>
                <AlertBanner message={feedback} tone={feedback.includes("success") ? "success" : "error"} />
              </div>
            )}

            {/* Compact Grid Layout Form */}
            <form onSubmit={handleFormSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              
              <div style={{ gridColumn: "span 2" }}>
                <FormField label="Item Name" value={formValues.name} onChange={onFormChange("name")} error={hasSubmitted ? formErrors.name : undefined} />
              </div>
              <div style={{ gridColumn: "span 1" }}>
                <FormField label="Category" value={formValues.category} onChange={onFormChange("category")} error={hasSubmitted ? formErrors.category : undefined} />
              </div>

              <div style={{ gridColumn: "span 1" }}>
                <SelectField
                  label="Publish Status"
                  value={formValues.status}
                  onChange={onFormChange("status")}
                  options={[
                    { label: "Draft", value: "draft" },
                    { label: "Active", value: "active" },
                    { label: "Archived", value: "archived" }
                  ]}
                />
              </div>
              <div style={{ gridColumn: "span 1" }}>
                <FormField label="Base Price" type="number" min="0" value={formValues.priceFrom} onChange={onFormChange("priceFrom")} error={hasSubmitted ? formErrors.priceFrom : undefined} />
              </div>
              <div style={{ gridColumn: "span 1" }}>
                <FormField label="Location / Zone" value={formValues.location} onChange={onFormChange("location")} error={hasSubmitted ? formErrors.location : undefined} />
              </div>

              <div style={{ gridColumn: "span 3" }}>
                <FormField as="textarea" label="Item Description" value={formValues.description} onChange={onFormChange("description")} error={hasSubmitted ? formErrors.description : undefined} />
              </div>

              <div style={{ gridColumn: "span 3" }}>
                <FormField label="Tags & Options (CSV)" value={formValues.availabilityTags} onChange={onFormChange("availabilityTags")} error={hasSubmitted ? formErrors.availabilityTags : undefined} />
              </div>

              {/* Modal Actions */}
              <div style={{ gridColumn: "span 3", display: "flex", gap: "0.75rem", marginTop: "0.5rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.25rem" }}>
                <button
                  type="button"
                  onClick={handleResetForm}
                  style={{
                    flex: 1, background: "var(--color-surface-muted)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)",
                    padding: "0.65rem 1rem", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  style={{
                    flex: 3, border: "none", padding: "0.65rem 1rem", color: "#ffffff", background: "var(--gradient-primary)",
                    borderRadius: "var(--radius-sm)", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(99, 102, 241, 0.15)",
                  }}
                >
                  {isSubmitting ? "Saving changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}