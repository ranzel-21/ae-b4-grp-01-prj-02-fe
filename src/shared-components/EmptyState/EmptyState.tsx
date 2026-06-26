export interface EmptyStateProps {
  description: string;
  title: string;
}

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "1.25rem",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px dashed var(--color-text-tertiary)",
        textAlign: "center"
      }}
    >
      <h3 style={{ margin: 0, color: "var(--color-text-primary)" }}>{title}</h3>
      <p style={{ margin: "0.5rem 0 0", color: "var(--color-text-secondary)" }}>{description}</p>
    </div>
  );
}