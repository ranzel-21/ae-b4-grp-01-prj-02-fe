import type { ReactNode } from "react";

export interface AuthCardProps {
  children: ReactNode;
  footer?: ReactNode;
  subtitle: string;
  title: string;
}

export function AuthCard({ children, footer, subtitle, title }: AuthCardProps) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "rgba(255,255,255,0.96)",
          borderRadius: "1.5rem",
          border: "1px solid rgba(208, 213, 221, 0.9)",
          padding: "2rem",
          boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)"
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ color: "#175cd3", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.08em" }}>
            VENDOR CATALOG SYSTEM
          </div>
          <h1 style={{ margin: "0.45rem 0", fontSize: "2rem" }}>{title}</h1>
          <p style={{ margin: 0, color: "#475467" }}>{subtitle}</p>
        </div>
        {children}
        {footer ? <div style={{ marginTop: "1rem" }}>{footer}</div> : null}
      </div>
    </div>
  );
}
