"use client";

import { useState } from "react";
import type { Child, Milestone, WeeklyAssignment } from "@/lib/types";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "./ChildAvatar";
import { getSwapOptions } from "@/lib/assignments";

interface AssignmentWeekViewProps {
  children: Child[];
  milestones: Milestone[];
  assignments: WeeklyAssignment[];
  allMilestoneProgress: Record<
    string,
    { milestoneId: string; status: string }[]
  >;
  weekStart: string;
  weekLabel: string;
  onSwap: (
    childId: string,
    currentId: string,
    replacementId: string,
    weekStart: string
  ) => void;
}

const AREA_LABELS: Record<string, string> = {
  LL: "Literacy",
  NUM: "Numeracy",
  SED: "Social",
};

const AREA_COLORS: Record<string, { bg: string; text: string }> = {
  LL: { bg: "#E8EFF8", text: "#3A5EA0" },
  NUM: { bg: "#FEF3D7", text: "#A06010" },
  SED: { bg: "#E8F5EE", text: "#2D7A4F" },
};

export function AssignmentWeekView({
  children,
  milestones,
  assignments,
  allMilestoneProgress,
  weekStart,
  weekLabel,
  onSwap,
}: AssignmentWeekViewProps) {
  const [swapState, setSwapState] = useState<{
    childId: string;
    milestoneId: string;
  } | null>(null);

  const milestoneMap = new Map(milestones.map((m) => [m.id, m]));

  function getChildAssignments(childId: string): Milestone[] {
    return assignments
      .filter((a) => a.childId === childId && a.weekStart === weekStart)
      .map((a) => milestoneMap.get(a.milestoneId))
      .filter((m): m is Milestone => m !== undefined);
  }

  function getSwapList(childId: string, currentMilestoneId: string) {
    const progress = allMilestoneProgress[childId] ?? [];
    const weekAssignmentIds = assignments
      .filter((a) => a.childId === childId && a.weekStart === weekStart)
      .map((a) => a.milestoneId);

    return getSwapOptions(
      currentMilestoneId,
      childId,
      milestones,
      progress as { childId: string; milestoneId: string; status: import("@/lib/types").MilestoneStatus }[],
      weekAssignmentIds
    );
  }

  return (
    <div>
      <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
        Week of {weekLabel}
      </p>

      <div className="flex flex-col gap-3">
        {children.map((child) => {
          const childAssignments = getChildAssignments(child.id);

          return (
            <div
              key={child.id}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                <span
                  className="font-semibold text-sm"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {getChildDisplayName(child)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {childAssignments.length === 0 && (
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    No assignments
                  </span>
                )}

                {childAssignments.map((milestone) => {
                  const { bg, text } = AREA_COLORS[milestone.areaId] ?? {
                    bg: "#f0f0f0",
                    text: "#666",
                  };
                  const isSwapping =
                    swapState?.childId === child.id &&
                    swapState?.milestoneId === milestone.id;

                  return (
                    <div key={milestone.id} className="relative">
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: bg, color: text }}
                      >
                        <span className="text-[10px] font-bold opacity-60">
                          {AREA_LABELS[milestone.areaId]}
                        </span>
                        <span className="max-w-[140px] truncate">
                          {milestone.statement}
                        </span>
                        <button
                          onClick={() =>
                            setSwapState(
                              isSwapping
                                ? null
                                : { childId: child.id, milestoneId: milestone.id }
                            )
                          }
                          className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity"
                          title="Swap activity"
                          aria-label="Swap activity"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 4h8M8 2l2 2-2 2M10 8H2M4 6l-2 2 2 2"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Swap dropdown */}
                      {isSwapping && (
                        <div
                          className="absolute top-full mt-1 left-0 z-10 rounded-xl border border-[var(--color-border)] bg-white shadow-lg p-2 min-w-[240px]"
                          style={{ maxWidth: "min(280px, calc(100vw - 2rem))" }}
                        >
                          <p
                            className="text-xs font-semibold px-2 pb-1.5 mb-1 border-b border-[var(--color-border)]"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            Swap with:
                          </p>
                          {getSwapList(child.id, milestone.id).length === 0 ? (
                            <p
                              className="text-xs px-2 py-1"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              No alternatives available
                            </p>
                          ) : (
                            getSwapList(child.id, milestone.id).map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  onSwap(
                                    child.id,
                                    milestone.id,
                                    opt.id,
                                    weekStart
                                  );
                                  setSwapState(null);
                                }}
                                className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-[var(--color-bg-cream)] transition-colors"
                                style={{ color: "var(--color-text-dark)" }}
                              >
                                {opt.statement}
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Click-outside to close swap dropdown */}
      {swapState && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setSwapState(null)}
        />
      )}
    </div>
  );
}
