"use client";

import { useState, useMemo, useCallback } from "react";
import { useStore } from "@/lib/store";
import { LEARNING_AREAS } from "@/lib/types";
import type { LearningAreaId } from "@/lib/types";
import { getWeeklyDomainCoverage, getFlaggedChildren } from "@/lib/dashboard-utils";
import { getWeekStart } from "@/lib/assignments";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildProfileContent } from "@/components/teacher/ChildProfileContent";

const AREA_COLORS: Record<LearningAreaId, string> = {
  LL:  "#7BA3D4",
  NUM: "#F5A623",
  SED: "#4A9B6F",
  ACE: "#E8745A",
  DOW: "#9B6B9B",
  HMS: "#6BA3A3",
};

export default function ChildrenPage() {
  const {
    children,
    activeClassId,
    observations,
    sessions,
    milestones,
    chatMessages,
  } = useStore();

  const today = new Date().toISOString().slice(0, 10);
  const weekStart = getWeekStart(new Date());

  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const classChildren = useMemo(
    () => children.filter((c) => c.classId === activeClassId),
    [children, activeClassId]
  );

  const weeklyDomainCoverage = useMemo(() => {
    const result: Record<string, Record<LearningAreaId, boolean>> = {};
    for (const child of classChildren) {
      result[child.id] = getWeeklyDomainCoverage(child.id, observations, sessions, milestones, weekStart);
    }
    return result;
  }, [classChildren, observations, sessions, milestones, weekStart]);

  const flaggedChildIds = useMemo(
    () => getFlaggedChildren(classChildren, observations, chatMessages, milestones, today),
    [classChildren, observations, chatMessages, milestones, today]
  );

  const lastObservedMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const obs of observations) {
      const current = map.get(obs.childId);
      if (!current || obs.observedAt > current) map.set(obs.childId, obs.observedAt);
    }
    return map;
  }, [observations]);

  const getLastObservedLabel = useCallback((childId: string): string => {
    const last = lastObservedMap.get(childId);
    if (!last) return "Never";
    const days = Math.round((new Date(today).getTime() - new Date(last).getTime()) / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    if (days < 14) return "Last week";
    return `${Math.floor(days / 7)}w ago`;
  }, [lastObservedMap, today]);

  const sorted = useMemo(
    () => [...classChildren].sort((a, b) => a.firstName.localeCompare(b.firstName)),
    [classChildren]
  );

  const thStyle: React.CSSProperties = {
    padding: "8px 12px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 700,
    color: "var(--color-text-mid)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    borderBottom: "1px solid var(--color-border)",
    whiteSpace: "nowrap",
  };

  return (
    <div className="flex min-h-0 w-full flex-1 overflow-hidden">
      {/* Left: table */}
      <div className="min-h-0 w-1/2 shrink-0 overflow-y-auto border-r border-border px-5 py-5 pb-10">
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text-dark)", marginBottom: 4 }}>
            Children
          </h1>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
            {classChildren.length} children
          </p>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-bg-warm)" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Last observed</th>
                <th style={{ ...thStyle, textAlign: "center" }}>This week</th>
                <th style={{ ...thStyle, width: 32 }} />
              </tr>
            </thead>
            <tbody>
              {sorted.map((child, i) => {
                const coverage = weeklyDomainCoverage[child.id] ?? {} as Record<LearningAreaId, boolean>;
                const isFlagged = flaggedChildIds.has(child.id);
                const isLast = i === sorted.length - 1;
                const isSelected = selectedChildId === child.id;

                return (
                  <tr
                    key={child.id}
                    onClick={() => setSelectedChildId(isSelected ? null : child.id)}
                    style={{
                      borderBottom: isLast ? "none" : "1px solid var(--color-border)",
                      cursor: "pointer",
                      background: isSelected ? "var(--color-primary-wash)" : undefined,
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "var(--color-bg-warm)"; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = ""; }}
                  >
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <ChildAvatar name={child.firstName} size="sm" />
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-dark)" }}>
                          {getChildDisplayName(child)}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                      {getLastObservedLabel(child.id)}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                        {LEARNING_AREAS.map((area) => (
                          <span
                            key={area.id}
                            title={area.name}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              flexShrink: 0,
                              background: coverage[area.id] ? AREA_COLORS[area.id] : "var(--color-border)",
                            }}
                          />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "center" }}>
                      {isFlagged && (
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F5A623", display: "inline-block" }} title="Needs attention" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: profile */}
      <div className="min-h-0 w-1/2 shrink-0 overflow-y-auto bg-bg-warm">
        {selectedChildId ? (
          <ChildProfileContent childId={selectedChildId} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--color-text-muted)", fontSize: 14 }}>
            Select a child to view their profile
          </div>
        )}
      </div>
    </div>
  );
}
