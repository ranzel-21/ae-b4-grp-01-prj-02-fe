export type InquiryStatus = "new" | "reviewed" | "closed";

export interface Inquiry {
  id: string;
  vendorId: string;
  catalogItemId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryFormValues {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  message: string;
}
