import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type CommonProps = {
  error?: string;
  label: string;
};

type InputProps = CommonProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextareaProps = CommonProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

export type FormFieldProps = InputProps | TextareaProps;

export function FormField(props: FormFieldProps) {
  const { error, label, style: customStyle, ...rest } = props;

  const baseStyle = {
    padding: "0.85rem 1.25rem",
    borderRadius: "var(--radius-sm)",
    border: `2px solid ${error ? "var(--color-error)" : "rgba(115, 92, 64, 0.3)"}`,
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    fontSize: "0.95rem",
    color: "var(--color-text-primary)",
    transition: "all 0.2s ease",
    width: "100%",
    fontWeight: 600,
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
  };

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text-secondary)" }}>{label}</span>
      {props.as === "textarea" ? (
        <textarea
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          style={{
            ...baseStyle,
            minHeight: "120px",
            resize: "vertical",
            ...customStyle
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--color-accent)";
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.boxShadow = "0 0 0 4px rgba(115, 92, 64, 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? "var(--color-error)" : "rgba(115, 92, 64, 0.3)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
            e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)";
          }}
        />
      ) : (
        <input
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          style={{
            ...baseStyle,
            ...customStyle
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--color-accent)";
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.boxShadow = "0 0 0 4px rgba(115, 92, 64, 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? "var(--color-error)" : "rgba(115, 92, 64, 0.3)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
            e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)";
          }}
        />
      )}
      {error && <span style={{ color: "var(--color-error)", fontSize: "0.85rem", fontWeight: 600, marginTop: "0.15rem" }}>{error}</span>}
    </label>
  );
}