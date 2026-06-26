import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { loginVendor } from "../../../services/api";
import { validateLogin, hasErrors } from "../../../utils/validation";
import { defaultLoginFormValues, type LoginFormValues } from "../model/login.model";

export function useLoginViewModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, isAuthenticated } = useAuth();
  const [values, setValues] = useState<LoginFormValues>(defaultLoginFormValues);
  const [errors, setErrors] = useState(validateLogin(defaultLoginFormValues));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = ((location.state as { from?: string } | null)?.from ?? "/dashboard");
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onChange =
    (field: keyof LoginFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValues = { ...values, [field]: event.target.value };
      setValues(nextValues);
      setErrors((current) => ({ ...current, [field]: "" }));
      setFeedback("");
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setFeedback("");

    try {
      const result = await loginVendor(values);
      setAuth(result);
      const redirectPath = ((location.state as { from?: string } | null)?.from ?? "/dashboard");
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email: values.email,
    errors,
    feedback,
    isSubmitting,
    onEmailChange: onChange("email"),
    onPasswordChange: onChange("password"),
    onSubmit,
    password: values.password
  };
}