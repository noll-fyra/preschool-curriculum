"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  ActivitySession,
  Child,
  LearningAreaId,
  LevelId,
  Milestone,
  TeacherObservation,
} from "@/lib/types";
import { LEARNING_AREAS, LEVEL_LABELS } from "@/lib/types";
import {
  computeStatusMapForChild,
  getCurrentLevelFromStatusMap,
  getNextFocusMilestoneFromStatusMap,
} from "@/lib/mastery";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function isTabletConnectedDemo(childId: string): boolean {
  let n = 0;
  for (let i = 0; i < childId.length; i++) {
    n = (n + childId.charCodeAt(i) * (i + 1)) % 997;
  }
  return n % 3 !== 0;
}

function levelWithInitial(level: LevelId): string {
  return `${level} — ${LEVEL_LABELS[level]}`;
}

type StartPersonalisedLessonsModalProps = {
  open: boolean;
  onClose: () => void;
  classChildren: Child[];
  milestones: Milestone[];
  sessions: ActivitySession[];
  observations: TeacherObservation[];
};

export function StartPersonalisedLessonsModal({
  open,
  onClose,
  classChildren,
  milestones,
  sessions,
  observations,
}: StartPersonalisedLessonsModalProps) {
  const [domain, setDomain] = useState<LearningAreaId>("LL");

  const domainLabel = useMemo(
    () => LEARNING_AREAS.find((a) => a.id === domain)?.name ?? domain,
    [domain]
  );

  const tabletsNotConnectedCount = useMemo(
    () => classChildren.filter((c) => !isTabletConnectedDemo(c.id)).length,
    [classChildren]
  );

  const rows = useMemo(() => {
    return [...classChildren]
      .sort((a, b) => a.firstName.localeCompare(b.firstName))
      .map((child) => {
        const statusByMilestoneId = computeStatusMapForChild(
          child.id,
          milestones,
          sessions,
          observations
        );
        const level = getCurrentLevelFromStatusMap(milestones, domain, statusByMilestoneId);
        const nextMilestone = getNextFocusMilestoneFromStatusMap(
          milestones,
          domain,
          statusByMilestoneId
        );
        return {
          child,
          levelDisplay: levelWithInitial(level),
          nextSkill: nextMilestone?.statement ?? "All milestones achieved in this domain.",
          tabletConnected: isTabletConnectedDemo(child.id),
        };
      });
  }, [classChildren, milestones, sessions, observations, domain]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="flex w-full max-w-3xl max-h-[92vh] flex-col rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="personalised-lessons-domain-title"
      >
        <div className="shrink-0 border-b border-[var(--color-border)] p-5 pb-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-mid)]">
            Domain to learn
          </p>
          <h2
            id="personalised-lessons-domain-title"
            className="mt-1 text-lg font-bold text-[var(--color-text-dark)]"
          >
            {domainLabel}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEARNING_AREAS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setDomain(a.id)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
                  domain === a.id
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                    : "border-[var(--color-border)] bg-white text-[var(--color-text-mid)] hover:bg-[var(--color-bg-warm)]"
                )}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-5 pt-4">
          {classChildren.length > 0 && (
            <p
              className="mb-3 text-sm font-semibold"
              style={{
                color:
                  tabletsNotConnectedCount > 0
                    ? "var(--color-area-ll)"
                    : "var(--color-area-ace)",
              }}
            >
              {tabletsNotConnectedCount === 0
                ? "All tablets connected"
                : `${tabletsNotConnectedCount} tablet${tabletsNotConnectedCount === 1 ? "" : "s"} not connected`}
            </p>
          )}
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-warm)]">
                  <th className="px-3 py-2.5 font-semibold text-[var(--color-text-dark)]">
                    Child
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-[var(--color-text-dark)]">
                    Current level
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-[var(--color-text-dark)]">
                    Next skill
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-[var(--color-text-dark)]">
                    Tablet
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-3 py-6 text-center text-[var(--color-text-mid)]"
                    >
                      No children in this class.
                    </td>
                  </tr>
                ) : (
                  rows.map(({ child, levelDisplay, nextSkill, tabletConnected }) => (
                    <tr
                      key={child.id}
                      className="border-b border-[var(--color-border)] last:border-b-0 align-top"
                    >
                      <td className="px-3 py-2.5 font-medium text-[var(--color-text-dark)] whitespace-nowrap">
                        {child.firstName} {child.lastName}
                      </td>
                      <td className="px-3 py-2.5 text-[var(--color-text-mid)] whitespace-nowrap">
                        {levelDisplay}
                      </td>
                      <td className="min-w-[200px] max-w-[min(320px,40vw)] px-3 py-2.5 text-[var(--color-text-mid)] leading-snug">
                        {nextSkill}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        {tabletConnected ? (
                          <span
                            className="font-semibold"
                            style={{ color: "var(--color-area-ace)" }}
                          >
                            Connected
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="font-semibold underline underline-offset-2 transition-colors hover:opacity-90"
                            style={{ color: "var(--color-area-ll)" }}
                          >
                            Connect tablet
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="shrink-0 flex flex-row items-center justify-between gap-3 border-t border-[var(--color-border)] p-5 pt-4">
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "h-10 justify-center px-5"
            )}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-10 justify-center px-6"
            )}
            onClick={onClose}
          >
            Start lessons
          </button>
        </div>
      </div>
    </div>
  );
}
