import type { ReactNode } from "react";

export interface SectionCardProps {
  children: ReactNode;
  title?: string;
}

export function SectionCard({ children, title }: SectionCardProps) {
  return (
    <section
      style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: "1.4rem",
        border: "1px solid #d0d5dd",
        padding: "1.25rem",
        boxShadow: "0 18px 44px rgba(15, 23, 42, 0.08)"
      }}
    >
      {title ? <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.15rem" }}>{title}</h2> : null}
      {children}
    </section>
  );
}
