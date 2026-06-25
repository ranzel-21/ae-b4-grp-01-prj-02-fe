import type { AuthResult, LoginPayload, SignupPayload } from "../types/auth";
import type { CatalogFilters, CatalogItem } from "../types/catalog";
import type { Inquiry, InquiryStatus } from "../types/inquiry";
import { ApiError, type ApiErrorShape, type ApiSuccessResponse } from "../types/api";
import type { Vendor, VendorFormValues } from "../types/vendor";

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:4000";

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  token?: string | null;
}

function createQueryString(params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value && value.trim()) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

async function apiRequest<TData>(path: string, options: RequestOptions = {}): Promise<TData> {
  const { body, headers, token, ...init } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {})
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiSuccessResponse<TData>
    | { error: ApiErrorShape }
    | null;

  if (!response.ok) {
    const fallbackError: ApiErrorShape = {
      code: "request_failed",
      message: "Request failed."
    };
    throw new ApiError(payload && "error" in payload ? payload.error : fallbackError);
  }

  return payload && "data" in payload ? payload.data : (null as TData);
}

export async function getHealth() {
  return apiRequest<{ status?: string }>("/health");
}

export async function signupVendor(payload: SignupPayload) {
  return apiRequest<AuthResult>("/api/auth/signup", {
    method: "POST",
    body: payload
  });
}

export async function loginVendor(payload: LoginPayload) {
  return apiRequest<AuthResult>("/api/auth/login", {
    method: "POST",
    body: payload
  });
}

export async function listVendors(token?: string | null) {
  return apiRequest<Vendor[]>("/api/vendors", { method: "GET", token });
}

export async function getVendor(vendorId: string, token?: string | null) {
  return apiRequest<Vendor>(`/api/vendors/${vendorId}`, { method: "GET", token });
}

export async function createVendor(payload: VendorFormValues, token?: string | null) {
  return apiRequest<Vendor>("/api/vendors", { method: "POST", body: payload, token });
}

export async function updateVendor(vendorId: string, payload: VendorFormValues, token?: string | null) {
  return apiRequest<Vendor>(`/api/vendors/${vendorId}`, {
    method: "PATCH",
    body: payload,
    token
  });
}

export async function deleteVendor(vendorId: string, token?: string | null) {
  return apiRequest<{ success: boolean }>(`/api/vendors/${vendorId}`, { method: "DELETE", token });
}

export async function listCatalogItems(
  filters: Partial<CatalogFilters> & { vendorId?: string },
  token?: string | null
) {
  return apiRequest<CatalogItem[]>(
    `/api/catalog-items${createQueryString({
      vendorId: filters.vendorId,
      search: filters.search,
      category: filters.category,
      location: filters.location,
      availabilityTag: filters.availabilityTag
    })}`,
    { method: "GET", token }
  );
}

export async function getCatalogItem(itemId: string, token?: string | null) {
  return apiRequest<CatalogItem>(`/api/catalog-items/${itemId}`, { method: "GET", token });
}

export async function createCatalogItem(
  payload: Omit<CatalogItem, "id" | "createdAt" | "updatedAt">,
  token?: string | null
) {
  return apiRequest<CatalogItem>("/api/catalog-items", { method: "POST", body: payload, token });
}

export async function updateCatalogItem(
  itemId: string,
  payload: Partial<Omit<CatalogItem, "id" | "createdAt" | "updatedAt">>,
  token?: string | null
) {
  return apiRequest<CatalogItem>(`/api/catalog-items/${itemId}`, {
    method: "PATCH",
    body: payload,
    token
  });
}

export async function deleteCatalogItem(itemId: string, token?: string | null) {
  return apiRequest<{ success: boolean }>(`/api/catalog-items/${itemId}`, {
    method: "DELETE",
    token
  });
}

export async function listInquiries(
  filters: { vendorId?: string; status?: InquiryStatus | ""; catalogItemId?: string },
  token?: string | null
) {
  return apiRequest<Inquiry[]>(
    `/api/inquiries${createQueryString({
      vendorId: filters.vendorId,
      status: filters.status,
      catalogItemId: filters.catalogItemId
    })}`,
    { method: "GET", token }
  );
}

export async function getInquiry(inquiryId: string, token?: string | null) {
  return apiRequest<Inquiry>(`/api/inquiries/${inquiryId}`, { method: "GET", token });
}

export async function createInquiry(
  payload: Omit<Inquiry, "id" | "status" | "createdAt" | "updatedAt"> & { status?: InquiryStatus },
  token?: string | null
) {
  return apiRequest<Inquiry>("/api/inquiries", { method: "POST", body: payload, token });
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: InquiryStatus,
  token?: string | null
) {
  return apiRequest<Inquiry>(`/api/inquiries/${inquiryId}`, {
    method: "PATCH",
    body: { status },
    token
  });
}

export async function deleteInquiry(inquiryId: string, token?: string | null) {
  return apiRequest<{ success: boolean }>(`/api/inquiries/${inquiryId}`, {
    method: "DELETE",
    token
  });
}

export { API_BASE_URL };
