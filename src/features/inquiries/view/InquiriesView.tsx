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

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" },
  { label: "Manage Catalog", to: "/vendor/catalog" },
  { label: "Inquiries", to: "/vendor/inquiries" },
  { label: "Browse Catalog", to: "/catalog" }
];

export default function InquiriesView() {
  const {
    feedback,
    inquiries,
    isLoading,
    onFilterChange,
    onLogout,
    onStatusUpdate,
    selectInquiry,
    selectedInquiry,
    statusFilter
  } = useInquiriesViewModel();

  return (
    <AppShell links={links} onLogout={onLogout} subtitle="Review and update inquiry statuses from your vendors." title="Inquiry Management">
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.8fr)" }}>
        <div style={{ display: "grid", gap: "1rem" }}>
          {feedback ? <AlertBanner message={feedback} tone={feedback.includes("success") ? "success" : "error"} /> : null}
          <SectionCard title="Inquiry list">
            <div style={{ maxWidth: "240px", marginBottom: "1rem" }}>
              <SelectField label="Filter by status" value={statusFilter} onChange={onFilterChange} options={[...inquiryStatusOptions]} />
            </div>
            {isLoading ? (
              <p>Loading inquiries...</p>
            ) : inquiries.length ? (
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {inquiries.map((inquiry) => (
                  <button
                    key={inquiry.id}
                    onClick={() => selectInquiry(inquiry)}
                    style={{
                      textAlign: "left",
                      padding: "1rem",
                      borderRadius: "1rem",
                      border: selectedInquiry?.id === inquiry.id ? "1px solid #175cd3" : "1px solid #eaecf0",
                      backgroundColor: "#ffffff",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{inquiry.customerName}</div>
                        <div style={{ color: "#475467" }}>{inquiry.eventType}</div>
                      </div>
                      <StatusChip value={inquiry.status} />
                    </div>
                    <div style={{ marginTop: "0.5rem", color: "#667085", fontSize: "0.9rem" }}>
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
        <SectionCard title="Inquiry details">
          {selectedInquiry ? (
            <div style={{ display: "grid", gap: "0.9rem" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{selectedInquiry.customerName}</div>
                <div>{selectedInquiry.customerEmail}</div>
                <div>{selectedInquiry.customerPhone}</div>
              </div>
              <div>
                <div style={{ color: "#475467" }}>Event Type</div>
                <div>{selectedInquiry.eventType}</div>
              </div>
              <div>
                <div style={{ color: "#475467" }}>Event Date</div>
                <div>{formatDate(selectedInquiry.eventDate)}</div>
              </div>
              <div>
                <div style={{ color: "#475467" }}>Message</div>
                <p style={{ marginBottom: 0 }}>{selectedInquiry.message}</p>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
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
    </AppShell>
  );
}
