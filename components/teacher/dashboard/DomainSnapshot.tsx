import type { Child, TeacherObservation, ActivitySession, Milestone, LearningAreaId } from "@/lib/types";
import { LEARNING_AREAS } from "@/lib/types";

const AREA_VARS: Record<LearningAreaId, string> = {
  LL:  "var(--color-area-ll)",
  NUM: "var(--color-area-num)",
  SED: "var(--color-area-sed)",
  ACE: "var(--color-area-ace)",
  DOW: "var(--color-area-dow)",
  HMS: "var(--color-area-hms)",
};

interface DomainSnapshotProps {
  classChildren: Child[];
  observations: TeacherObservation[];
  sessions: ActivitySession[];
  milestones: Milestone[];
  weekStart: string;
}

function getWeekEnd(weekStart: string): string {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 6);
  return d.toISOString().slice(0, 10);
}

export function DomainSnapshot({
  classChildren,
  observations,
  sessions,
  milestones,
  weekStart,
}: DomainSnapshotProps) {
  const weekEnd = getWeekEnd(weekStart);
  const classChildIds = new Set(classChildren.map((c) => c.id));
  const total = classChildren.length;

  const milestoneArea = new Map<string, LearningAreaId>();
  for (const m of milestones) milestoneArea.set(m.id, m.areaId);

  // For each child, determine which areas they've been observed in this week
  const childAreaCoverage = new Map<string, Set<LearningAreaId>>();
  for (const childId of classChildIds) childAreaCoverage.set(childId, new Set());

  for (const obs of observations) {
    if (!classChildIds.has(obs.childId)) continue;
    if (obs.observedAt < weekStart || obs.observedAt > weekEnd) continue;
    const area = milestoneArea.get(obs.milestoneId);
    if (area) childAreaCoverage.get(obs.childId)?.add(area);
  }

  for (const ses of sessions) {
    if (!classChildIds.has(ses.childId)) continue;
    const date = ses.attemptedAt.slice(0, 10);
    if (date < weekStart || date > weekEnd) continue;
    const area = milestoneArea.get(ses.milestoneId);
    if (area) childAreaCoverage.get(ses.childId)?.add(area);
  }

  // Count children covered per area
  const areaCounts: Record<LearningAreaId, number> = {
    LL: 0, NUM: 0, SED: 0, ACE: 0, DOW: 0, HMS: 0,
  };
  for (const covered of childAreaCoverage.values()) {
    for (const area of covered) areaCounts[area]++;
  }

  return (
    <div>
      <h2
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "var(--color-text-mid)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 10,
        }}
      >
        Domain Coverage This Week
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {LEARNING_AREAS.map((area) => {
          const count = areaCounts[area.id];
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const color = AREA_VARS[area.id];

          return (
            <div key={area.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 8,
                  marginBottom: 3,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--color-text-dark)",
                    flex: 1,
                    minWidth: 0,
                    overflowWrap: "break-word",
                  }}
                >
                  {area.name}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {count} / {total}
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "var(--color-border)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    borderRadius: 3,
                    background: color,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
