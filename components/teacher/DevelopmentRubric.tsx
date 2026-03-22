"use client";

import { useMemo } from "react";
import {
  LEARNING_AREAS,
  DEVELOPMENTAL_LEVELS,
  LEVEL_LABELS,
  type LearningAreaId,
  type MilestoneWithProgress,
  type MilestoneStatus,
} from "@/lib/types";

const AREA_ACCENT: Record<LearningAreaId, string> = {
  LL: "#F5A623",
  NUM: "#7BA3D4",
  SED: "#E8745A",
  ACE: "#4A9B6F",
  DOW: "#9B84D4",
  HMS: "#4ABDB5",
};

function statusLabel(status: MilestoneStatus): { label: string; bg: string; text: string } {
  switch (status) {
    case "achieved":
      return { label: "Observed", bg: "#E8F5EE", text: "#2D7A4F" };
    case "in_progress":
      return { label: "In progress", bg: "#EFF6FF", text: "#1D4ED8" };
    default:
      return { label: "Not yet observed", bg: "var(--color-bg-deep)", text: "var(--color-text-muted)" };
  }
}

export function DevelopmentRubric({ progress }: { progress: MilestoneWithProgress[] }) {
  const byArea = useMemo(() => {
    const map = new Map<LearningAreaId, MilestoneWithProgress[]>();
    for (const area of LEARNING_AREAS) {
      map.set(
        area.id,
        progress.filter((p) => p.areaId === area.id).sort((a, b) => {
          const lo = DEVELOPMENTAL_LEVELS.find((l) => l.id === a.levelId)?.sortOrder ?? 0;
          const ro = DEVELOPMENTAL_LEVELS.find((l) => l.id === b.levelId)?.sortOrder ?? 0;
          if (lo !== ro) return lo - ro;
          return a.sequence - b.sequence;
        })
      );
    }
    return map;
  }, [progress]);

  return (
    <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
      <h3 className="text-sm font-bold mb-1" style={{ color: "var(--color-text-dark)" }}>
        Development rubric
      </h3>
      <p className="text-xs mb-5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Full NEL-aligned milestone map for this child. Status reflects logged sessions (LL, NUM) or
        teacher observations (other domains).
      </p>
      <div className="flex flex-col gap-6">
        {LEARNING_AREAS.map((area) => {
          const rows = byArea.get(area.id) ?? [];
          const accent = AREA_ACCENT[area.id];
          let lastLevel: string | null = null;
          return (
            <section
              key={area.id}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--color-border)", background: "white" }}
            >
              <div
                className="px-4 py-3 flex items-center gap-2 border-b"
                style={{
                  borderColor: "var(--color-border)",
                  background: `linear-gradient(90deg, ${accent}12 0%, var(--color-bg-cream) 100%)`,
                }}
              >
                <span
                  className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                  style={{ background: `${accent}22`, color: accent }}
                >
                  {area.id}
                </span>
                <h4 className="text-sm font-bold" style={{ color: "var(--color-text-dark)" }}>
                  {area.name}
                </h4>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                {rows.map((m) => {
                  const levelHeader = m.levelId !== lastLevel;
                  if (levelHeader) lastLevel = m.levelId;
                  const st = statusLabel(m.status);
                  const masteryHint =
                    m.status === "in_progress" && m.masteryTotal > 0
                      ? `${m.masteryCount}/${m.masteryTotal} ${area.assessmentType === "skill" ? "sessions" : "obs. days"}`
                      : null;
                  return (
                    <div key={m.id}>
                      {levelHeader && (
                        <div
                          className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide"
                          style={{
                            background: "var(--color-bg-warm)",
                            color: "var(--color-text-mid)",
                          }}
                        >
                          {LEVEL_LABELS[m.levelId]}
                        </div>
                      )}
                      <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                        <div className="shrink-0 flex items-center gap-2 sm:flex-col sm:items-start sm:min-w-22">
                          <code
                            className="text-[11px] font-semibold px-1.5 py-0.5 rounded"
                            style={{ background: "var(--color-bg-deep)", color: "var(--color-text-mid)" }}
                          >
                            {m.id}
                          </code>
                          <span
                            className="text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                            style={{ background: st.bg, color: st.text }}
                          >
                            {st.label}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-snug" style={{ color: "var(--color-text-dark)" }}>
                            {m.statement}
                          </p>
                          {m.teacherNotes && (
                            <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                              <span className="font-semibold" style={{ color: "var(--color-text-mid)" }}>
                                Look for:{" "}
                              </span>
                              {m.teacherNotes}
                            </p>
                          )}
                          {masteryHint && (
                            <p className="text-xs mt-1 font-medium" style={{ color: "#1D4ED8" }}>
                              {masteryHint}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
