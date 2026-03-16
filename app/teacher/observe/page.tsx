"use client";

import { useStore } from "@/lib/store";
import {
  getActiveClassChildren,
  getSEDMilestones,
  getTodayObservationMilestoneIds,
  getSEDObservationCount,
} from "@/lib/selectors";
import { ObservationLogger } from "@/components/teacher/ObservationLogger";

export default function ObservePage() {
  const store = useStore();
  const { logObservation } = store;
  const activeChildren = getActiveClassChildren(store);

  const sedMilestones = getSEDMilestones(store);

  // Build today's log map: childId → milestoneId[]
  const todayLog: Record<string, string[]> = {};
  for (const child of activeChildren) {
    todayLog[child.id] = getTodayObservationMilestoneIds(child.id, store);
  }

  // Build observation counts: `${childId}:${milestoneId}` → count
  const obsCounts: Record<string, number> = {};
  for (const child of activeChildren) {
    for (const milestone of sedMilestones) {
      obsCounts[`${child.id}:${milestone.id}`] = getSEDObservationCount(
        child.id,
        milestone.id,
        store
      );
    }
  }

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-text-dark)" }}
        >
          Log Observation
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Social & Emotional Development — tap the behaviour you observed today
        </p>
      </div>

      <ObservationLogger
        children={activeChildren}
        sedMilestones={sedMilestones}
        todayLog={todayLog}
        obsCounts={obsCounts}
        onLog={logObservation}
      />
    </div>
  );
}
