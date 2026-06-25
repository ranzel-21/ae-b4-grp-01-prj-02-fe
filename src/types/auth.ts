import type { Vendor } from "./vendor";

export interface AuthResult {
  accessToken: string;
  vendor: Vendor;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  businessName: string;
  description: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
}
