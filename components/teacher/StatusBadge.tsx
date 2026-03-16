import type { LevelId } from "@/lib/types";

const BADGE_STYLES: Record<LevelId, { bg: string; text: string; label: string }> = {
  B: { bg: "#FEE9E5", text: "#C0432A", label: "Beginning" },
  D: { bg: "#FEF3D7", text: "#A06010", label: "Developing" },
  S: { bg: "#E8F5EE", text: "#2D7A4F", label: "Secure" },
};

interface StatusBadgeProps {
  level: LevelId;
  short?: boolean; // show "B" / "D" / "S" instead of full label
}

export function StatusBadge({ level, short = false }: StatusBadgeProps) {
  const { bg, text, label } = BADGE_STYLES[level];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ background: bg, color: text }}
    >
      {short ? level : label}
    </span>
  );
}
