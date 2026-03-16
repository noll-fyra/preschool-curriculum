export type ParentMode = "passive" | "active";

interface ModeToggleProps {
  mode: ParentMode;
  onChange: (mode: ParentMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div
      className="inline-flex rounded-full p-0.5"
      style={{ background: "var(--color-bg-deep)" }}
    >
      {(["passive", "active"] as const).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              background: active ? "var(--color-primary)" : "transparent",
              color: active ? "white" : "var(--color-text-mid)",
            }}
          >
            {m === "passive" ? "Passive" : "Active"}
          </button>
        );
      })}
    </div>
  );
}
