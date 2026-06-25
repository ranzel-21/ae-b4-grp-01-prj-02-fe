import type { AuthResult } from "../types/auth";

const AUTH_STORAGE_KEY = "vendor_catalog_auth";

export function readStoredAuth(): AuthResult | null {
  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as AuthResult;
  } catch {
    return null;
  }
}

export function writeStoredAuth(auth: AuthResult) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function clearStoredAuth() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export { AUTH_STORAGE_KEY };
