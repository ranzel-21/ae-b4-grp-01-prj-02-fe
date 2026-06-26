import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export function AppButton({
  children,
  fullWidth = false,
  style,
  variant = "primary",
  ...buttonProps
}: AppButtonProps) {
  const getStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          color: "var(--color-text-primary)",
          border: "2px solid rgba(115, 92, 64, 0.4)",
          boxShadow: "var(--shadow-sm)"
        };
      case "danger":
        return {
          backgroundColor: "#fef2f2",
          color: "var(--color-error)",
          border: "2px solid #fecaca",
          boxShadow: "none"
        };
      default:
        return {
          backgroundColor: "var(--color-accent)",
          color: "#ffffff",
          border: "2px solid var(--color-accent)",
          boxShadow: "var(--shadow-md)"
        };
    }
  };

  const baseStyles = getStyles();

  return (
    <button
      {...buttonProps}
      style={{
        width: fullWidth ? "100%" : undefined,
        borderRadius: "var(--radius-sm)",
        padding: "0.85rem 1.75rem",
        fontSize: "0.95rem",
        fontWeight: 700,
        cursor: buttonProps.disabled ? "not-allowed" : "pointer",
        opacity: buttonProps.disabled ? 0.6 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        ...baseStyles,
        ...style
      }}
      onMouseEnter={(e) => {
        if (!buttonProps.disabled) {
          e.currentTarget.style.transform = "translateY(-1px)";
          if (variant === "primary") {
            e.currentTarget.style.backgroundColor = "var(--color-accent-hover)";
            e.currentTarget.style.borderColor = "var(--color-accent-hover)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          } else if (variant === "secondary") {
            e.currentTarget.style.borderColor = "var(--color-border-hover)";
            e.currentTarget.style.backgroundColor = "var(--color-surface-muted)";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!buttonProps.disabled) {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.backgroundColor = baseStyles.backgroundColor;
          e.currentTarget.style.borderColor = baseStyles.border.split(" ")[2];
          e.currentTarget.style.boxShadow = baseStyles.boxShadow;
        }
      }}
    >
      {children}
    </button>
  );
}