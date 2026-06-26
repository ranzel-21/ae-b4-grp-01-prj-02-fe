import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface AuthCardProps {
  children: ReactNode;
  footer?: ReactNode;
  subtitle: string;
  title: string;
  maxWidth?: string;
}

export function AuthCard({ children, footer, subtitle, title, maxWidth = "480px" }: AuthCardProps) {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "grid", 
      placeItems: "center", 
      padding: "1.5rem",
      position: "relative"
    }}>
      <div style={{ position: "absolute", top: "2rem", left: "2rem", zIndex: 10 }}>
        <Link 
          to="/catalog" 
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            color: "var(--color-text-secondary)",
            fontSize: "0.95rem",
            fontWeight: 600,
            padding: "0.6rem 1.25rem",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-sm)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text-primary)";
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text-secondary)";
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </Link>
      </div>

      <div
        className="animate-fade-in"
        style={{
          width: "100%",
          maxWidth: maxWidth,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          padding: "2.5rem",
          boxShadow: "var(--shadow-lg)"
        }}
      >
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <div style={{ 
            fontWeight: 800, 
            fontSize: "1.1rem",
            color: "var(--color-text-primary)",
            letterSpacing: "-0.03em",
            marginBottom: "0.75rem"
          }}>
            Vendor<span style={{ color: "var(--color-accent)" }}>Flow</span>
          </div>
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--color-text-primary)" }}>
            {title}
          </h1>
          <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.5, fontWeight: 500 }}>
            {subtitle}
          </p>
        </div>
        {children}
        {footer ? (
          <div style={{ 
            marginTop: "1.5rem", 
            textAlign: "center", 
            fontSize: "0.95rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--color-border)"
          }}>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}