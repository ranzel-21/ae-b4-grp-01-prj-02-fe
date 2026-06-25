import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}

export function AppButton({
  children,
  fullWidth = false,
  style,
  variant = "primary",
  ...buttonProps
}: AppButtonProps) {
  const backgroundColor = variant === "primary" ? "#175cd3" : "#ffffff";
  const color = variant === "primary" ? "#ffffff" : "#344054";
  const border = variant === "primary" ? "1px solid transparent" : "1px solid #d0d5dd";

  return (
    <button
      {...buttonProps}
      style={{
        width: fullWidth ? "100%" : undefined,
        borderRadius: "0.95rem",
        padding: "0.9rem 1.1rem",
        border,
        backgroundColor,
        color,
        fontWeight: 700,
        cursor: buttonProps.disabled ? "not-allowed" : "pointer",
        opacity: buttonProps.disabled ? 0.75 : 1,
        boxShadow: "0 10px 20px rgba(23, 92, 211, 0.12)",
        ...style
      }}
    >
      {children}
    </button>
  );
}
