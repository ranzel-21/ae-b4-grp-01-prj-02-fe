import { Link } from "react-router-dom";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AuthCard } from "../../../shared-components/AuthCard/AuthCard";
import { FormField } from "../../../shared-components/FormField/FormField";
import { useLoginViewModel } from "../viewmodel/useLoginViewModel";

export default function LoginView() {
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

  return (
    <AuthCard
      footer={<Link to="/signup">Create a vendor account</Link>}
      subtitle="Sign in to manage your vendor profile, catalog, and inquiries."
      title="Vendor Login"
    >
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>
        <FormField label="Email" type="email" value={email} onChange={onEmailChange} error={errors.email} />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          error={errors.password}
        />
        {feedback ? <AlertBanner message={feedback} tone="error" /> : null}
        <AppButton disabled={isSubmitting} fullWidth type="submit">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </AppButton>
      </form>
    </AuthCard>
  );
}
