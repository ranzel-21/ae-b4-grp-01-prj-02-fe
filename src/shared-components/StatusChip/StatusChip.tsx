interface StatusChipProps {
  value: string;
}

export function StatusChip({ value }: StatusChipProps) {
  const getPalette = () => {
    switch (value.toLowerCase()) {
      case "active":
      case "reviewed":
        return { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0" };
      case "draft":
      case "new":
        return { bg: "#fef3c7", text: "#d97706", border: "#fde68a" };
      default:
        return { bg: "#f3f4f6", text: "#4b5563", border: "#e5e7eb" };
    }
  };

  const palette = getPalette();

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.35rem 0.85rem",
        borderRadius: "999px",
        backgroundColor: palette.bg,
        color: palette.text,
        border: `1px solid ${palette.border}`,
        fontSize: "0.8rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: palette.text, marginRight: '6px' }} />
      {value}
    </span>
  );
}