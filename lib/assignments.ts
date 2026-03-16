import type {
  Milestone,
  ChildMilestoneProgress,
  ActivitySession,
  TeacherObservation,
  LearningAreaId,
} from "./types";
import { getCurrentLevel } from "./mastery";

// Returns the Monday of the week containing the given date
export function getWeekStart(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

// Auto-selects 2–3 milestones for a child for the week:
// - For LL and NUM: pick the first in_progress milestone at current level,
//   then fallback to first not_started if needed
// - For SED: pick first in_progress; fallback to first not_started
// Returns the selected milestones (one per area, max 3 total)

export function autoSelectAssignments(
  childId: string,
  milestones: Milestone[],
  progress: ChildMilestoneProgress[],
  sessions: ActivitySession[],
  observations: TeacherObservation[]
): Milestone[] {
  const areas: LearningAreaId[] = ["LL", "NUM", "SED"];
  const selected: Milestone[] = [];

  const progressMap = new Map(
    progress
      .filter((p) => p.childId === childId)
      .map((p) => [p.milestoneId, p.status])
  );

  for (const areaId of areas) {
    const currentLevel = getCurrentLevel(
      milestones,
      progress,
      childId,
      areaId
    );

    const levelMilestones = milestones
      .filter((m) => m.areaId === areaId && m.levelId === currentLevel)
      .sort((a, b) => a.sequence - b.sequence);

    // Prefer in_progress milestones
    const inProgress = levelMilestones.filter(
      (m) => progressMap.get(m.id) === "in_progress"
    );

    if (inProgress.length > 0) {
      selected.push(inProgress[0]);
      continue;
    }

    // Fallback to first not_started at current level
    const notStarted = levelMilestones.filter(
      (m) =>
        progressMap.get(m.id) === "not_started" ||
        progressMap.get(m.id) === undefined
    );

    if (notStarted.length > 0) {
      selected.push(notStarted[0]);
    }

    // Suppress unused variables warning
    void sessions;
    void observations;
  }

  return selected;
}

// Returns alternative milestones the teacher can swap in for a given milestone
// (same area + level, not currently assigned, not already achieved)
export function getSwapOptions(
  currentMilestoneId: string,
  childId: string,
  milestones: Milestone[],
  progress: ChildMilestoneProgress[],
  currentWeekAssignmentIds: string[]
): Milestone[] {
  const current = milestones.find((m) => m.id === currentMilestoneId);
  if (!current) return [];

  const progressMap = new Map(
    progress
      .filter((p) => p.childId === childId)
      .map((p) => [p.milestoneId, p.status])
  );

  return milestones.filter(
    (m) =>
      m.areaId === current.areaId &&
      m.levelId === current.levelId &&
      m.id !== currentMilestoneId &&
      !currentWeekAssignmentIds.includes(m.id) &&
      progressMap.get(m.id) !== "achieved"
  );
}
