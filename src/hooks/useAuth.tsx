import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { AuthResult } from "../types/auth";
import { clearStoredAuth, readStoredAuth, writeStoredAuth } from "../services/storage";

interface AuthContextValue {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (auth: AuthResult) => void;
  signOut: () => void;
  vendor: AuthResult["vendor"] | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthResult | null>(null);

  useEffect(() => {
    setAuthState(readStoredAuth());
  }, []);

  const setAuth = (nextAuth: AuthResult) => {
    writeStoredAuth(nextAuth);
    setAuthState(nextAuth);
  };

  const signOut = () => {
    clearStoredAuth();
    setAuthState(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken: auth?.accessToken ?? null,
      isAuthenticated: Boolean(auth?.accessToken && auth.vendor),
      setAuth,
      signOut,
      vendor: auth?.vendor ?? null
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
