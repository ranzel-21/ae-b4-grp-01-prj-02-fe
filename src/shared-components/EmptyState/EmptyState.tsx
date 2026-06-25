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
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        border: "1px dashed #d0d5dd",
        textAlign: "center"
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ margin: "0.5rem 0 0", color: "#475467" }}>{description}</p>
    </div>
  );
}
