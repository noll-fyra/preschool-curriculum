import type { MilestoneWithProgress, LevelId } from "@/lib/types";
import { DEVELOPMENTAL_LEVELS, LEVEL_LABELS } from "@/lib/types";
import { MasteryBar } from "./MasteryBar";

interface MilestoneProgressGroupProps {
  areaName: string;
  areaId: string;
  milestones: MilestoneWithProgress[];
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  achieved: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="Achieved">
      <circle cx="8" cy="8" r="7" fill="#E8F5EE"/>
      <path d="M5 8l2 2 4-4" stroke="#2D7A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  in_progress: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="In progress">
      <circle cx="8" cy="8" r="7" fill="#FEF3D7"/>
      <path d="M8 5v3l2 1.5" stroke="#A06010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  not_started: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="Not started">
      <circle cx="8" cy="8" r="7" stroke="#D8E8DC" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
};

const LEVEL_HEADER_COLORS: Record<LevelId, { bg: string; text: string }> = {
  B: { bg: "#FEE9E5", text: "#C0432A" },
  D: { bg: "#FEF3D7", text: "#A06010" },
  S: { bg: "#E8F5EE", text: "#2D7A4F" },
};

export function MilestoneProgressGroup({
  areaName,
  milestones,
}: MilestoneProgressGroupProps) {
  const levelOrder: LevelId[] = ["B", "D", "S"];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden bg-white">
      {/* Area header */}
      <div
        className="px-5 py-3 border-b border-[var(--color-border)]"
        style={{ background: "var(--color-bg-cream)" }}
      >
        <h2
          className="font-bold text-base"
          style={{ color: "var(--color-text-dark)" }}
        >
          {areaName}
        </h2>
      </div>

      {levelOrder.map((levelId) => {
        const levelMilestones = milestones
          .filter((m) => m.levelId === levelId)
          .sort((a, b) => a.sequence - b.sequence);

        if (levelMilestones.length === 0) return null;

        const { bg, text } = LEVEL_HEADER_COLORS[levelId];
        const achievedCount = levelMilestones.filter(
          (m) => m.status === "achieved"
        ).length;

        return (
          <div key={levelId}>
            {/* Level sub-header */}
            <div
              className="px-5 py-2 flex items-center justify-between border-b border-[var(--color-border)]"
              style={{ background: bg }}
            >
              <span className="text-xs font-semibold" style={{ color: text }}>
                {LEVEL_LABELS[levelId]}
              </span>
              <span className="text-xs" style={{ color: text, opacity: 0.7 }}>
                {achievedCount}/{levelMilestones.length}
              </span>
            </div>

            {/* Milestones */}
            <div className="divide-y divide-[var(--color-border)]">
              {levelMilestones.map((m) => (
                <div key={m.id} className="px-5 py-3 flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0">
                    {STATUS_ICONS[m.status]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm leading-snug"
                      style={{
                        color:
                          m.status === "achieved"
                            ? "var(--color-text-muted)"
                            : "var(--color-text-dark)",
                        textDecoration:
                          m.status === "achieved" ? "none" : undefined,
                      }}
                    >
                      {m.statement}
                    </p>
                    {m.status === "in_progress" && (
                      <div className="mt-1.5">
                        <MasteryBar
                          count={m.masteryCount}
                          total={m.masteryTotal}
                          label={m.areaId === "SED" ? "observations" : "sessions"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
