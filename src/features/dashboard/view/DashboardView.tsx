import { Link } from "react-router-dom";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AppShell } from "../../../shared-components/AppShell/AppShell";
import { EmptyState } from "../../../shared-components/EmptyState/EmptyState";
import { SectionCard } from "../../../shared-components/SectionCard/SectionCard";
import { StatusChip } from "../../../shared-components/StatusChip/StatusChip";
import { formatDate } from "../../../utils/formatting";
import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" },
  { label: "Manage Catalog", to: "/vendor/catalog" },
  { label: "Inquiries", to: "/vendor/inquiries" },
  { label: "Browse Catalog", to: "/catalog" }
];

export default function DashboardView() {
  const { businessName, error, inquiryPreview, isLoading, onLogout, summaryCards } = useDashboardViewModel();

  return (
    <AppShell
      links={links}
      onLogout={onLogout}
      subtitle="Overview of your catalog inventory and incoming customer inquiries."
      title={businessName}
    >
      <div style={{ display: "grid", gap: "1rem" }}>
        {error ? <AlertBanner message={error} tone="error" /> : null}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
          {summaryCards.map((card) => (
            <SectionCard key={card.label}>
              <div style={{ color: "#475467", fontSize: "0.9rem" }}>{card.label}</div>
              <div style={{ marginTop: "0.4rem", fontWeight: 800, fontSize: "1.8rem" }}>{card.value}</div>
            </SectionCard>
          ))}
        </div>
        <SectionCard title="Recent inquiries">
          {isLoading ? (
            <p>Loading dashboard data...</p>
          ) : inquiryPreview.length ? (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {inquiryPreview.map((inquiry) => (
                <div
                  key={inquiry.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                    padding: "1rem",
                    borderRadius: "1rem",
                    border: "1px solid #eaecf0"
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{inquiry.customerName}</div>
                    <div style={{ color: "#475467" }}>{inquiry.eventType}</div>
                    <div style={{ color: "#667085", fontSize: "0.9rem" }}>{formatDate(inquiry.createdAt)}</div>
                  </div>
                  <StatusChip value={inquiry.status} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState description="New customer inquiries will appear here." title="No inquiries yet" />
          )}
          <div style={{ marginTop: "1rem" }}>
            <Link to="/vendor/inquiries">
              <AppButton variant="secondary">Open inquiry management</AppButton>
            </Link>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
