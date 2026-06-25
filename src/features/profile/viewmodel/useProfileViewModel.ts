import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { getVendor, updateVendor } from "../../../services/api";
import { hasErrors, validateVendorProfile } from "../../../utils/validation";
import { defaultProfileValues } from "../model/profile.model";

export function useProfileViewModel() {
  const { accessToken, signOut, vendor, setAuth } = useAuth();
  const [values, setValues] = useState(defaultProfileValues);
  const [errors, setErrors] = useState(validateVendorProfile(defaultProfileValues));
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!vendor) {
      return;
    }

    const run = async () => {
      setIsLoading(true);
      setFeedback("");

      try {
        const profile = await getVendor(vendor.id, accessToken);
        setValues({
          businessName: profile.businessName,
          description: profile.description,
          location: profile.location,
          contactEmail: profile.contactEmail,
          contactPhone: profile.contactPhone
        });
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : "Unable to load vendor profile.");
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [accessToken, vendor]);

  const onChange = (field: keyof typeof values) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setFeedback("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!vendor) {
      return;
    }

    const nextErrors = validateVendorProfile(values);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setFeedback("");

    try {
      const updatedVendor = await updateVendor(vendor.id, values, accessToken);
      setAuth({ accessToken: accessToken ?? "", vendor: updatedVendor });
      setFeedback("Vendor profile updated successfully.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    feedback,
    isLoading,
    isSubmitting,
    onChange,
    onLogout: signOut,
    onSubmit,
    values
  };
}
