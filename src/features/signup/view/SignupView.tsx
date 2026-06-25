import { Link } from "react-router-dom";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AuthCard } from "../../../shared-components/AuthCard/AuthCard";
import { FormField } from "../../../shared-components/FormField/FormField";
import { useSignupViewModel } from "../viewmodel/useSignupViewModel";

export default function SignupView() {
  const { errors, feedback, isSubmitting, onChange, onSubmit, values } = useSignupViewModel();

  return (
    <AuthCard
      footer={<Link to="/login">Already have an account? Sign in</Link>}
      subtitle="Create a vendor account and immediately start publishing catalog items."
      title="Vendor Signup"
    >
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          <FormField label="Email" type="email" value={values.email} onChange={onChange("email")} error={errors.email} />
          <FormField
            label="Password"
            type="password"
            value={values.password}
            onChange={onChange("password")}
            error={errors.password}
          />
        </div>
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
        {feedback ? <AlertBanner message={feedback} tone="error" /> : null}
        <AppButton disabled={isSubmitting} fullWidth type="submit">
          {isSubmitting ? "Creating account..." : "Create account"}
        </AppButton>
      </form>
    </AuthCard>
  );
}
