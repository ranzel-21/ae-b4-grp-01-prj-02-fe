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
  const { error, label } = props;

  return (
    <label style={{ display: "grid", gap: "0.45rem" }}>
      <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#344054" }}>{label}</span>
      {props.as === "textarea" ? (
        <textarea
          {...props}
          style={{
            minHeight: "112px",
            padding: "0.95rem 1rem",
            borderRadius: "0.85rem",
            border: `1px solid ${error ? "#d92d20" : "#d0d5dd"}`,
            outline: "none",
            backgroundColor: "#ffffff",
            resize: "vertical"
          }}
        />
      ) : (
        <input
          {...props}
          style={{
            padding: "0.95rem 1rem",
            borderRadius: "0.85rem",
            border: `1px solid ${error ? "#d92d20" : "#d0d5dd"}`,
            outline: "none",
            backgroundColor: "#ffffff"
          }}
        />
      )}
      {error ? <span style={{ color: "#d92d20", fontSize: "0.85rem" }}>{error}</span> : null}
    </label>
  );
}
