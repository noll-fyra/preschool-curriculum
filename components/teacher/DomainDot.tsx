import type { LearningAreaId } from "@/lib/types";

const AREA_VARS: Record<LearningAreaId, string> = {
  LL:  "var(--color-area-ll)",
  NUM: "var(--color-area-num)",
  SED: "var(--color-area-sed)",
  ACE: "var(--color-area-ace)",
  DOW: "var(--color-area-dow)",
  HMS: "var(--color-area-hms)",
};

interface DomainDotProps {
  areaId: LearningAreaId;
  filled: boolean;
  size?: "sm" | "md";
  title?: string;
}

export function DomainDot({ areaId, filled, size = "sm", title }: DomainDotProps) {
  const color = AREA_VARS[areaId];
  const px = size === "sm" ? 8 : 11;

  return (
    <span
      title={title ?? areaId}
      style={{
        display: "inline-block",
        width: px,
        height: px,
        borderRadius: "50%",
        backgroundColor: filled ? color : "transparent",
        border: `1.5px solid ${color}`,
        opacity: filled ? 1 : 0.45,
        flexShrink: 0,
      }}
    />
  );
}
