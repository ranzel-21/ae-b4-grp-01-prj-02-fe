import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { signupVendor } from "../../../services/api";
import { hasErrors, validateSignup } from "../../../utils/validation";
import { defaultSignupValues } from "../model/signup.model";

export function useSignupViewModel() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [values, setValues] = useState(defaultSignupValues);
  const [errors, setErrors] = useState(validateSignup(defaultSignupValues));
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (field: keyof typeof values) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setFeedback("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateSignup(values);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setFeedback("");

    try {
      const result = await signupVendor(values);
      setAuth(result);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to create vendor account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    feedback,
    isSubmitting,
    onChange,
    onSubmit,
    values
  };
}
