import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AuthCard } from "../../../shared-components/AuthCard/AuthCard";
import { FormField } from "../../../shared-components/FormField/FormField";
import { useLoginViewModel } from "../viewmodel/useLoginViewModel";

export default function LoginView() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    email,
    errors,
    feedback,
    isSubmitting,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    password
  } = useLoginViewModel();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (onSubmit as any)(e);
  };

  return (
    <AuthCard
      footer={<Link to="/signup">Create a vendor account</Link>}
      subtitle="Sign in to manage your vendor profile, catalog, and inquiries."
      title="Vendor Login"
    >
      <form onSubmit={handleFormSubmit} style={{ display: "grid", gap: "1.5rem" }}>
        <FormField label="Email" type="email" value={email} onChange={onEmailChange} error={hasSubmitted ? errors.email : undefined} />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          error={hasSubmitted ? errors.password : undefined}
        />
        {feedback && hasSubmitted ? <AlertBanner message={feedback} tone="error" /> : null}
        <div style={{ marginTop: "0.5rem" }}>
          <AppButton disabled={isSubmitting} fullWidth type="submit">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </AppButton>
        </div>
      </form>
    </AuthCard>
  );
}