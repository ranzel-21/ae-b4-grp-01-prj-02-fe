import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AuthCard } from "../../../shared-components/AuthCard/AuthCard";
import { FormField } from "../../../shared-components/FormField/FormField";
import { useSignupViewModel } from "../viewmodel/useSignupViewModel";

export default function SignupView() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { errors, feedback, isSubmitting, onChange, onSubmit, values } = useSignupViewModel();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (onSubmit as any)(e);
  };

  return (
    <AuthCard
      maxWidth="750px"
      footer={<Link to="/login">Already have an account? Sign in</Link>}
      subtitle="Complete your profile details to establish your vendor presence."
      title="Vendor Registration"
    >
      <form onSubmit={handleFormSubmit} style={{ display: "grid", gap: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <FormField label="Email Address" type="email" value={values.email} onChange={onChange("email")} error={hasSubmitted ? errors.email : undefined} />
            <FormField label="Password" type="password" value={values.password} onChange={onChange("password")} error={hasSubmitted ? errors.password : undefined} />
            <FormField label="Business Name" value={values.businessName} onChange={onChange("businessName")} error={hasSubmitted ? errors.businessName : undefined} />
            <FormField label="Location" value={values.location} onChange={onChange("location")} error={hasSubmitted ? errors.location : undefined} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <FormField label="Contact Email" type="email" value={values.contactEmail} onChange={onChange("contactEmail")} error={hasSubmitted ? errors.contactEmail : undefined} />
            <FormField label="Contact Phone" value={values.contactPhone} onChange={onChange("contactPhone")} error={hasSubmitted ? errors.contactPhone : undefined} />
            <FormField 
              as="textarea" 
              label="Business Description" 
              value={values.description} 
              onChange={onChange("description")} 
              error={hasSubmitted ? errors.description : undefined} 
              style={{ minHeight: "135px" }} 
            />
          </div>
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          {feedback && hasSubmitted ? <AlertBanner message={feedback} tone="error" /> : null}
          <div style={{ marginTop: (feedback && hasSubmitted) ? "1rem" : "0" }}>
            <AppButton disabled={isSubmitting} fullWidth type="submit">
              {isSubmitting ? "Processing..." : "Register Now"}
            </AppButton>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}