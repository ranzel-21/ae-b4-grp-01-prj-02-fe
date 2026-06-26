import type { ReactNode } from "react";

export interface SectionCardProps {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
}

export function SectionCard({ children, title, action }: SectionCardProps) {
  return (
    <section
      style={{
        backgroundColor: "var(--color-surface)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        padding: "2.5rem",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {(title || action) && (
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "1.5rem"
        }}>
          {title && (
            <h2 style={{ 
              margin: 0, 
              fontSize: "1.25rem", 
              fontWeight: 700, 
              color: "var(--color-text-primary)",
              letterSpacing: "-0.01em"
            }}>
              {title}
            </h2>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}