"use client";

import { useState } from "react";
import type { Child, Milestone } from "@/lib/types";
import { ChildAvatar } from "./ChildAvatar";

interface ObservationLoggerProps {
  children: Child[];
  sedMilestones: Milestone[];
  // milestoneIds already logged today: childId → milestoneId[]
  todayLog: Record<string, string[]>;
  // observation counts: `${childId}:${milestoneId}` → count
  obsCounts: Record<string, number>;
  onLog: (childId: string, milestoneId: string) => void;
}

export function ObservationLogger({
  children,
  sedMilestones,
  todayLog,
  obsCounts,
  onLog,
}: ObservationLoggerProps) {
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [lastLogged, setLastLogged] = useState<{
    childName: string;
    milestone: string;
  } | null>(null);

  const selectedChild = children.find((c) => c.id === selectedChildId);

  function handleLog(milestoneId: string) {
    if (!selectedChildId || !selectedChild) return;
    const already = (todayLog[selectedChildId] ?? []).includes(milestoneId);
    if (already) return;

    onLog(selectedChildId, milestoneId);
    const milestone = sedMilestones.find((m) => m.id === milestoneId);
    setLastLogged({
      childName: selectedChild.name,
      milestone: milestone?.statement ?? milestoneId,
    });

    // Auto-clear toast after 3s
    setTimeout(() => setLastLogged(null), 3000);
  }

  return (
    <div>
      {/* Toast */}
      {lastLogged && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2"
          style={{
            background: "var(--color-primary)",
            color: "white",
            maxWidth: "calc(100vw - 2rem)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.25)"/>
            <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Logged for {lastLogged.childName}
        </div>
      )}

      {/* Step 1: Select child */}
      <div className="mb-6">
        <h2
          className="text-sm font-semibold uppercase tracking-wide mb-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          {selectedChildId ? "1. Child selected" : "1. Select a child"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {children.map((child) => {
            const isSelected = child.id === selectedChildId;
            return (
              <button
                key={child.id}
                onClick={() => {
                  setSelectedChildId(isSelected ? null : child.id);
                  setLastLogged(null);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all"
                style={{
                  background: isSelected
                    ? "var(--color-primary)"
                    : "white",
                  color: isSelected ? "white" : "var(--color-text-dark)",
                  borderColor: isSelected
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                }}
              >
                <ChildAvatar name={child.name} size="sm" />
                {child.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select milestone */}
      {selectedChild && (
        <div>
          <h2
            className="text-sm font-semibold uppercase tracking-wide mb-3"
            style={{ color: "var(--color-text-muted)" }}
          >
            2. Select observed behaviour for {selectedChild.name}
          </h2>
          <div className="flex flex-col gap-2">
            {sedMilestones.map((milestone) => {
              const alreadyToday = (
                todayLog[selectedChild.id] ?? []
              ).includes(milestone.id);
              const count =
                obsCounts[`${selectedChild.id}:${milestone.id}`] ?? 0;
              const achieved = count >= 5;

              return (
                <button
                  key={milestone.id}
                  onClick={() => handleLog(milestone.id)}
                  disabled={alreadyToday || achieved}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all"
                  style={{
                    background:
                      alreadyToday || achieved ? "var(--color-bg-cream)" : "white",
                    borderColor:
                      alreadyToday
                        ? "var(--color-primary)"
                        : achieved
                        ? "var(--color-border)"
                        : "var(--color-border)",
                    opacity: achieved ? 0.5 : 1,
                    cursor: alreadyToday || achieved ? "default" : "pointer",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {milestone.statement}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {/* Observation dots */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background:
                              i < count
                                ? alreadyToday && i === count - 1
                                  ? "var(--color-primary)"
                                  : "var(--color-primary)"
                                : "var(--color-border)",
                          }}
                        />
                      ))}
                      <span
                        className="text-xs ml-1"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {count}/5 observations
                      </span>
                    </div>
                  </div>

                  <div className="ml-3 flex-shrink-0">
                    {achieved ? (
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "#E8F5EE", color: "#2D7A4F" }}
                      >
                        Achieved
                      </span>
                    ) : alreadyToday ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <circle cx="9" cy="9" r="8" fill="#E8F5EE" />
                        <path
                          d="M6 9l2 2 4-4"
                          stroke="#2D7A4F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <circle
                          cx="9"
                          cy="9"
                          r="8"
                          stroke="var(--color-border)"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <path
                          d="M9 6v3M9 12v.5"
                          stroke="var(--color-text-muted)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!selectedChild && (
        <div
          className="rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center"
          style={{ color: "var(--color-text-muted)" }}
        >
          <p className="text-sm">
            Select a child above to log an observation
          </p>
        </div>
      )}
    </div>
  );
}
