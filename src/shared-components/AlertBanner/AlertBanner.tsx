export interface AlertBannerProps {
  message: string;
  tone?: "error" | "success" | "info";
}

export function AlertBanner({ message, tone = "info" }: AlertBannerProps) {
  const palette = {
    error: {
      background: "#fef3f2",
      border: "#fecdca",
      color: "#b42318"
    },
    success: {
      background: "#ecfdf3",
      border: "#abefc6",
      color: "#027a48"
    },
    info: {
      background: "#eff8ff",
      border: "#b2ddff",
      color: "#175cd3"
    }
  }[tone];

  return (
    <div
      style={{
        backgroundColor: palette.background,
        border: `1px solid ${palette.border}`,
        borderRadius: "1rem",
        color: palette.color,
        padding: "0.9rem 1rem"
      }}
    >
      {message}
    </div>
  );
}
