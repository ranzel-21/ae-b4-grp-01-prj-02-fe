export interface Vendor {
  id: string;
  ownerUserId: string;
  businessName: string;
  description: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorFormValues {
  businessName: string;
  description: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
}
