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
    <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text-secondary)" }}>{label}</span>
      <select
        {...selectProps}
        style={{
          padding: "0.85rem 1.25rem",
          borderRadius: "var(--radius-sm)",
          border: `1px solid ${error ? "var(--color-error)" : "var(--color-border)"}`,
          outline: "none",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.95rem",
          color: "var(--color-text-primary)",
          fontWeight: 500,
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
          appearance: "none",
          /* Changed chevron color to match --color-text-secondary (#4a4d46) for better visibility */
          backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234a4d46%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem top 50%",
          backgroundSize: "0.65rem auto",
          transition: "all 0.2s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--color-border-hover)";
          e.target.style.backgroundColor = "var(--color-surface)";
          e.target.style.boxShadow = "0 0 0 4px rgba(139, 115, 85, 0.15)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? "var(--color-error)" : "var(--color-border)";
          e.target.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
          e.target.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.05)";
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} style={{ background: "var(--color-surface)", color: "var(--color-text-primary)" }}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span style={{ color: "var(--color-error)", fontSize: "0.85rem", fontWeight: 600, marginTop: "0.25rem" }}>{error}</span>}
    </label>
  );
}