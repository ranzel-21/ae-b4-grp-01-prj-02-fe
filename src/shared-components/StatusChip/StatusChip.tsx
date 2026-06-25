interface StatusChipProps {
  value: string;
}

export function StatusChip({ value }: StatusChipProps) {
  const tone =
    value === "active" || value === "reviewed"
      ? { background: "#ecfdf3", color: "#027a48" }
      : value === "draft" || value === "new"
        ? { background: "#eff8ff", color: "#175cd3" }
        : { background: "#f2f4f7", color: "#344054" };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.35rem 0.7rem",
        borderRadius: "999px",
        backgroundColor: tone.background,
        color: tone.color,
        fontSize: "0.85rem",
        fontWeight: 700,
        textTransform: "capitalize"
      }}
    >
      {value}
    </span>
  );
}
