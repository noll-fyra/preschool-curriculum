interface StatCardProps {
  value: string | number;
  label: string;
  subtext?: string;
  accent?: boolean;
}

export function StatCard({ value, label, subtext, accent }: StatCardProps) {
  return (
    <div
      style={{
        background: accent ? "var(--color-primary)" : "#fff",
        borderRadius: 12,
        padding: "14px 16px",
        border: accent ? "none" : "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <span
        style={{
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1.1,
          color: accent ? "#fff" : "var(--color-text-dark)",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: accent ? "rgba(255,255,255,0.85)" : "var(--color-text-mid)",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
      {subtext && (
        <span
          style={{
            fontSize: 11,
            color: accent ? "rgba(255,255,255,0.65)" : "var(--color-text-muted)",
            marginTop: 2,
            lineHeight: 1.3,
          }}
        >
          {subtext}
        </span>
      )}
    </div>
  );
}
