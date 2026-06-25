import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { listCatalogItems, listInquiries } from "../../../services/api";
import type { CatalogItem } from "../../../types/catalog";
import type { Inquiry } from "../../../types/inquiry";
import type { SummaryCard } from "../model/dashboard.model";

export function useDashboardViewModel() {
  const { accessToken, signOut, vendor } = useAuth();
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!vendor) {
      return;
    }

    const run = async () => {
      setIsLoading(true);
      setError("");

      try {
        const [items, inquiryList] = await Promise.all([
          listCatalogItems({ vendorId: vendor.id }, accessToken),
          listInquiries({ vendorId: vendor.id }, accessToken)
        ]);
        setCatalogItems(items);
        setInquiries(inquiryList);
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "Unable to load dashboard.");
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [accessToken, vendor]);

  const summaryCards = useMemo<SummaryCard[]>(() => {
    const newCount = inquiries.filter((inquiry) => inquiry.status === "new").length;
    const reviewedCount = inquiries.filter((inquiry) => inquiry.status === "reviewed").length;
    const closedCount = inquiries.filter((inquiry) => inquiry.status === "closed").length;

    return [
      { label: "Catalog Items", value: String(catalogItems.length) },
      { label: "Total Inquiries", value: String(inquiries.length) },
      { label: "New", value: String(newCount) },
      { label: "Reviewed", value: String(reviewedCount) },
      { label: "Closed", value: String(closedCount) }
    ];
  }, [catalogItems.length, inquiries]);

  return {
    businessName: vendor?.businessName ?? "Vendor",
    error,
    inquiryPreview: inquiries.slice(0, 5),
    isLoading,
    onLogout: signOut,
    summaryCards
  };
}
