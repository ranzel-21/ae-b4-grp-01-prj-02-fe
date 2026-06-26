import { Link } from "react-router-dom";
import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AppShell } from "../../../shared-components/AppShell/AppShell";
import { EmptyState } from "../../../shared-components/EmptyState/EmptyState";
import { SectionCard } from "../../../shared-components/SectionCard/SectionCard";
import { StatusChip } from "../../../shared-components/StatusChip/StatusChip";
import { formatDate } from "../../../utils/formatting";
import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";

export default function DashboardView() {
  const { businessName, error, inquiryPreview, isLoading, summaryCards } = useDashboardViewModel();

  return (
    <AppShell
      subtitle="Here's a summary of your performance and recent client activity."
      title={`Welcome back, ${businessName}`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {error ? <AlertBanner message={error} tone="error" /> : null}
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {summaryCards.map((card) => (
            <div key={card.label} style={{ 
              backgroundColor: "var(--color-surface)", 
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
            >
              <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", fontWeight: 600 }}>
                {card.label}
              </div>
              <div style={{ fontWeight: 800, fontSize: "3rem", color: "var(--color-text-primary)", lineHeight: 1 }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <SectionCard 
          title="Recent Client Inquiries" 
          action={
            <Link to="/vendor/inquiries">
              <AppButton variant="secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>View All</AppButton>
            </Link>
          }
        >
          {isLoading ? (
            <p style={{ color: "var(--color-text-secondary)" }}>Loading recent activity...</p>
          ) : inquiryPreview.length ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {inquiryPreview.map((inquiry, index) => (
                <div
                  key={inquiry.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.5rem 0",
                    borderBottom: index !== inquiryPreview.length - 1 ? "1px solid var(--color-border)" : "none"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{inquiry.customerName}</div>
                    <div style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
                      Event: {inquiry.eventType} • Received {formatDate(inquiry.createdAt)}
                    </div>
                  </div>
                  <StatusChip value={inquiry.status} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState description="When clients reach out, their messages will appear here." title="You're all caught up!" />
          )}
        </SectionCard>
      </div>
    </AppShell>
  );
}