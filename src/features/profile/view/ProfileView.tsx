import { useState } from "react";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AppShell } from "../../../shared-components/AppShell/AppShell";
import { FormField } from "../../../shared-components/FormField/FormField";
import { SectionCard } from "../../../shared-components/SectionCard/SectionCard";
import { useProfileViewModel } from "../viewmodel/useProfileViewModel";

export default function ProfileView() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { errors, feedback, isLoading, isSubmitting, onChange, onSubmit, values } =
    useProfileViewModel();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (onSubmit as any)(e);
  };

  return (
    <AppShell subtitle="Keep your public-facing business details accurate." title="Vendor Profile">
      <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        <SectionCard title="Edit vendor profile">
          {feedback && hasSubmitted ? <AlertBanner message={feedback} tone={feedback.includes("success") ? "success" : "error"} /> : null}
          {isLoading ? (
            <p style={{ color: "var(--color-text-secondary)" }}>Loading vendor profile...</p>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: "grid", gap: "1.5rem" }}>
              <FormField
                label="Business Name"
                value={values.businessName}
                onChange={onChange("businessName")}
                error={hasSubmitted ? errors.businessName : undefined}
              />
              <FormField
                as="textarea"
                label="Description"
                value={values.description}
                onChange={onChange("description")}
                error={hasSubmitted ? errors.description : undefined}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                <FormField label="Location" value={values.location} onChange={onChange("location")} error={hasSubmitted ? errors.location : undefined} />
                <FormField
                  label="Contact Email"
                  type="email"
                  value={values.contactEmail}
                  onChange={onChange("contactEmail")}
                  error={hasSubmitted ? errors.contactEmail : undefined}
                />
              </div>
              <FormField
                label="Contact Phone"
                value={values.contactPhone}
                onChange={onChange("contactPhone")}
                error={hasSubmitted ? errors.contactPhone : undefined}
              />
              <div style={{ marginTop: "0.5rem" }}>
                <AppButton disabled={isSubmitting} type="submit" fullWidth>
                  {isSubmitting ? "Saving..." : "Save changes"}
                </AppButton>
              </div>
            </form>
          )}
        </SectionCard>
      </div>
    </AppShell>
  );
}