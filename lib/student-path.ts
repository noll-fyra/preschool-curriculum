import type { ActivitySession } from "./types";

/** Number of steps on each place path (Duolingo-style). */
export const PATH_STEP_COUNT = 20;

const LEVEL_RANK: Record<string, number> = { B: 0, D: 1, S: 2 };

export function pathSlotStorageKey(
  childId: string,
  placeId: string,
  slotIndex: number
): string {
  return `${childId}|${placeId}|${slotIndex}`;
}

/**
 * Per-slot completion (supports repeated milestones on the path).
 * `completed` is typically `store.pathSlotCompleted` — truthy values mark a slot done.
 */
export function computePathSlotStatuses(
  slotCount: number,
  childId: string,
  placeId: string,
  completed: Record<string, boolean | undefined>
): ("done" | "current" | "locked")[] {
  let seenCurrent = false;
  return Array.from({ length: slotCount }, (_, i) => {
    const key = pathSlotStorageKey(childId, placeId, i);
    if (completed[key]) return "done";
    if (!seenCurrent) {
      seenCurrent = true;
      return "current";
    }
    return "locked";
  });
}

/** @deprecated Use computePathSlotStatuses + path slots for multi-step paths */
export function computeSequentialStepStatuses(
  milestoneIds: string[],
  childId: string,
  sessions: ActivitySession[]
): ("done" | "current" | "locked")[] {
  const passed = (mid: string) =>
    sessions.some((s) => s.childId === childId && s.milestoneId === mid && s.passed);

  let seenCurrent = false;
  return milestoneIds.map((id) => {
    if (passed(id)) return "done";
    if (!seenCurrent) {
      seenCurrent = true;
      return "current";
    }
    return "locked";
  });
}

export function compareMilestonesForPath(
  a: { levelId: string; sequence: number },
  b: { levelId: string; sequence: number }
): number {
  const ra = LEVEL_RANK[a.levelId] ?? 99;
  const rb = LEVEL_RANK[b.levelId] ?? 99;
  if (ra !== rb) return ra - rb;
  return a.sequence - b.sequence;
}
