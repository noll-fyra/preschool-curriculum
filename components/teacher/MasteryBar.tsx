interface MasteryBarProps {
  count: number;
  total: number;
  label: string; // e.g. "sessions" or "observations"
}

export function MasteryBar({ count, total, label }: MasteryBarProps) {
  const dots = Array.from({ length: total });

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {dots.map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background:
                i < count
                  ? "var(--color-primary)"
                  : "var(--color-border)",
            }}
          />
        ))}
      </div>
      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
        {count}/{total} {label}
      </span>
    </div>
  );
}
