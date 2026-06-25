import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AppShell } from "../../../shared-components/AppShell/AppShell";
import { FormField } from "../../../shared-components/FormField/FormField";
import { SectionCard } from "../../../shared-components/SectionCard/SectionCard";
import { useProfileViewModel } from "../viewmodel/useProfileViewModel";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" },
  { label: "Manage Catalog", to: "/vendor/catalog" },
  { label: "Inquiries", to: "/vendor/inquiries" },
  { label: "Browse Catalog", to: "/catalog" }
];

export default function ProfileView() {
  const { errors, feedback, isLoading, isSubmitting, onChange, onLogout, onSubmit, values } =
    useProfileViewModel();

  return (
    <AppShell links={links} onLogout={onLogout} subtitle="Keep your public-facing business details accurate." title="Vendor Profile">
      <SectionCard title="Edit vendor profile">
        {feedback ? <AlertBanner message={feedback} tone={feedback.includes("success") ? "success" : "error"} /> : null}
        {isLoading ? (
          <p>Loading vendor profile...</p>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>
            <FormField
              label="Business Name"
              value={values.businessName}
              onChange={onChange("businessName")}
              error={errors.businessName}
            />
            <FormField
              as="textarea"
              label="Description"
              value={values.description}
              onChange={onChange("description")}
              error={errors.description}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              <FormField label="Location" value={values.location} onChange={onChange("location")} error={errors.location} />
              <FormField
                label="Contact Email"
                type="email"
                value={values.contactEmail}
                onChange={onChange("contactEmail")}
                error={errors.contactEmail}
              />
            </div>
            <FormField
              label="Contact Phone"
              value={values.contactPhone}
              onChange={onChange("contactPhone")}
              error={errors.contactPhone}
            />
            <AppButton disabled={isSubmitting} type="submit">
              {isSubmitting ? "Saving..." : "Save changes"}
            </AppButton>
          </form>
        )}
      </SectionCard>
    </AppShell>
  );
}
