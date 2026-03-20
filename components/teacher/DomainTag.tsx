import type { LearningAreaId } from "@/lib/types";

const AREA_VARS: Record<LearningAreaId, string> = {
  LL:  "var(--color-area-ll)",
  NUM: "var(--color-area-num)",
  SED: "var(--color-area-sed)",
  ACE: "var(--color-area-ace)",
  DOW: "var(--color-area-dow)",
  HMS: "var(--color-area-hms)",
};

const AREA_LABELS: Record<LearningAreaId, string> = {
  LL:  "Language",
  NUM: "Numeracy",
  SED: "Social",
  ACE: "Creative",
  DOW: "Discovery",
  HMS: "Motor",
};

interface DomainTagProps {
  areaId: LearningAreaId;
  size?: "sm" | "md";
}

export function DomainTag({ areaId, size = "sm" }: DomainTagProps) {
  const color = AREA_VARS[areaId];
  const fontSize = size === "sm" ? 10 : 12;
  const padding = size === "sm" ? "2px 6px" : "3px 8px";

  return (
    <span
      style={{
        display: "inline-block",
        fontSize,
        fontWeight: 600,
        padding,
        borderRadius: 4,
        backgroundColor: color,
        color: "#fff",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}
    >
      {AREA_LABELS[areaId]}
    </span>
  );
}
