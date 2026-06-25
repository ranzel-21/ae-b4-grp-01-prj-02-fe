import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label: string;
  options: SelectOption[];
}

export function SelectField({ error, label, options, ...selectProps }: SelectFieldProps) {
  return (
    <label style={{ display: "grid", gap: "0.45rem" }}>
      <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#344054" }}>{label}</span>
      <select
        {...selectProps}
        style={{
          padding: "0.95rem 1rem",
          borderRadius: "0.85rem",
          border: `1px solid ${error ? "#d92d20" : "#d0d5dd"}`,
          outline: "none",
          backgroundColor: "#ffffff"
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span style={{ color: "#d92d20", fontSize: "0.85rem" }}>{error}</span> : null}
    </label>
  );
}
