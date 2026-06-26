import { AlertBanner } from "../../../shared-components/AlertBanner/AlertBanner";
import { AppButton } from "../../../shared-components/AppButton/AppButton";
import { AppShell } from "../../../shared-components/AppShell/AppShell";
import { EmptyState } from "../../../shared-components/EmptyState/EmptyState";
import { SectionCard } from "../../../shared-components/SectionCard/SectionCard";
import { SelectField } from "../../../shared-components/SelectField/SelectField";
import { StatusChip } from "../../../shared-components/StatusChip/StatusChip";
import { formatDate } from "../../../utils/formatting";
import { inquiryStatusOptions } from "../model/inquiries.model";
import { useInquiriesViewModel } from "../viewmodel/useInquiriesViewModel";

export default function InquiriesView() {
  const {
    feedback,
    inquiries,
    isLoading,
    onFilterChange,
    onStatusUpdate,
    selectInquiry,
    selectedInquiry,
    statusFilter
  } = useInquiriesViewModel();

  return (
    <AppShell subtitle="Review and update inquiry statuses from your vendors." title="Inquiry Management">
      <div style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 400px)" }}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", order: 2 }}>
          <SectionCard title="Inquiry details">
            {selectedInquiry ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <div style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Customer Information</div>
                  <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--color-text-primary)" }}>{selectedInquiry.customerName}</div>
                  <div style={{ color: "var(--color-text-secondary)", fontWeight: 500 }}>{selectedInquiry.customerEmail}</div>
                  <div style={{ color: "var(--color-text-secondary)", fontWeight: 500 }}>{selectedInquiry.customerPhone}</div>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ display: "grid", gap: "0.25rem" }}>
                    <div style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Event Type</div>
                    <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{selectedInquiry.eventType}</div>
                  </div>
                  <div style={{ display: "grid", gap: "0.25rem" }}>
                    <div style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Event Date</div>
                    <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{formatDate(selectedInquiry.eventDate)}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: "0.5rem" }}>
                  <div style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</div>
                  <p style={{ margin: 0, padding: "1rem", backgroundColor: "rgba(255,255,255,0.5)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", lineHeight: 1.6 }}>
                    {selectedInquiry.message}
                  </p>
                </div>
                
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
                  <AppButton type="button" onClick={() => onStatusUpdate("new")}>
                    Mark New
                  </AppButton>
                  <AppButton type="button" variant="secondary" onClick={() => onStatusUpdate("reviewed")}>
                    Mark Reviewed
                  </AppButton>
                  <AppButton type="button" variant="secondary" onClick={() => onStatusUpdate("closed")}>
                    Mark Closed
                  </AppButton>
                </div>
              </div>
            ) : (
              <EmptyState description="Select an inquiry from the list to inspect it." title="No inquiry selected" />
            )}
          </SectionCard>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", order: 1 }}>
          {feedback ? <AlertBanner message={feedback} tone={feedback.includes("success") ? "success" : "error"} /> : null}
          <SectionCard title="Inquiry list">
            <div style={{ marginBottom: "1.5rem" }}>
              <SelectField label="Filter by status" value={statusFilter} onChange={onFilterChange} options={[...inquiryStatusOptions]} />
            </div>
            {isLoading ? (
              <p style={{ color: "var(--color-text-secondary)" }}>Loading inquiries...</p>
            ) : inquiries.length ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {inquiries.map((inquiry) => (
                  <button
                    key={inquiry.id}
                    onClick={() => selectInquiry(inquiry)}
                    style={{
                      textAlign: "left",
                      padding: "1.25rem",
                      borderRadius: "var(--radius-md)",
                      border: selectedInquiry?.id === inquiry.id ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                      backgroundColor: selectedInquiry?.id === inquiry.id ? "var(--color-surface)" : "rgba(255, 255, 255, 0.6)",
                      cursor: "pointer",
                      boxShadow: selectedInquiry?.id === inquiry.id ? "var(--shadow-sm)" : "none",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--color-text-primary)" }}>{inquiry.customerName}</div>
                        <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem", fontWeight: 500 }}>{inquiry.eventType}</div>
                      </div>
                      <StatusChip value={inquiry.status} />
                    </div>
                    <div style={{ marginTop: "0.75rem", color: "var(--color-text-tertiary)", fontSize: "0.85rem", fontWeight: 600 }}>
                      {formatDate(inquiry.eventDate)}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <EmptyState description="Incoming customer inquiries will appear here." title="No inquiries found" />
            )}
          </SectionCard>
        </div>

      </div>
    </AppShell>
  );
}