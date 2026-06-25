import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { AppButton } from "../AppButton/AppButton";

export interface AppShellLink {
  label: string;
  to: string;
}

export interface AppShellProps {
  actions?: ReactNode;
  children: ReactNode;
  links: AppShellLink[];
  onLogout?: () => void;
  subtitle: string;
  title: string;
}

export function AppShell({ actions, children, links, onLogout, subtitle, title }: AppShellProps) {
  return (
    <div style={{ minHeight: "100vh", padding: "1rem", display: "grid", gap: "1rem" }}>
      <header
        style={{
          backgroundColor: "rgba(255,255,255,0.94)",
          border: "1px solid rgba(208, 213, 221, 0.9)",
          borderRadius: "1.5rem",
          padding: "1.25rem",
          display: "grid",
          gap: "1rem"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#175cd3", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.08em" }}>
              VENDOR CATALOG SYSTEM
            </div>
            <h1 style={{ margin: "0.35rem 0 0", fontSize: "1.7rem" }}>{title}</h1>
            <p style={{ margin: "0.35rem 0 0", color: "#475467" }}>{subtitle}</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
            {actions}
            {onLogout ? (
              <AppButton onClick={onLogout} variant="secondary">
                Logout
              </AppButton>
            ) : null}
          </div>
        </div>
        <nav style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                padding: "0.7rem 1rem",
                borderRadius: "999px",
                border: "1px solid #d0d5dd",
                backgroundColor: isActive ? "#dbe8ff" : "#ffffff",
                fontWeight: 700
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
