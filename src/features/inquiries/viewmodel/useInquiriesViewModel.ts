import { useEffect, useState, type ChangeEvent } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { listInquiries, updateInquiryStatus } from "../../../services/api";
import type { Inquiry, InquiryStatus } from "../../../types/inquiry";

export function useInquiriesViewModel() {
  const { accessToken, signOut, vendor } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "">("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadInquiries = async () => {
    if (!vendor) {
      return;
    }

    setIsLoading(true);
    setFeedback("");

    try {
      const result = await listInquiries({ vendorId: vendor.id, status: statusFilter }, accessToken);
      setInquiries(result);
      setSelectedInquiry((current) => result.find((item) => item.id === current?.id) ?? result[0] ?? null);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to load inquiries.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadInquiries();
  }, [accessToken, statusFilter, vendor]);

  const onFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value as InquiryStatus | "");
  };

  const onStatusUpdate = async (status: InquiryStatus) => {
    if (!selectedInquiry) {
      return;
    }

    try {
      await updateInquiryStatus(selectedInquiry.id, status, accessToken);
      setFeedback("Inquiry status updated successfully.");
      await loadInquiries();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to update inquiry status.");
    }
  };

  return {
    feedback,
    inquiries,
    isLoading,
    onFilterChange,
    onLogout: signOut,
    onStatusUpdate,
    selectInquiry: setSelectedInquiry,
    selectedInquiry,
    statusFilter
  };
}
