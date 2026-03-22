import type {
  ActivitySession,
  TeacherObservation,
  Milestone,
  ChildMilestoneProgress,
  MilestoneStatus,
  LearningAreaId,
  LevelId,
} from "./types";

// Areas assessed via teacher observation rather than digital activities
export function isBehaviourBased(areaId: LearningAreaId): boolean {
  return areaId === "SED" || areaId === "ACE" || areaId === "DOW" || areaId === "HMS";
}

// ─── Skill-based mastery (LL, NUM) ─────────────────────────────────────────
// Achieved if: last 3 sessions are all passes (consecutive)
//           OR 5 of the last 7 sessions are passes

export function evaluateSkillMastery(
  allSessions: ActivitySession[],
  childId: string,
  milestoneId: string
): MilestoneStatus {
  const sessions = allSessions
    .filter((s) => s.childId === childId && s.milestoneId === milestoneId)
    .sort(
      (a, b) =>
        new Date(a.attemptedAt).getTime() - new Date(b.attemptedAt).getTime()
    );

  if (sessions.length === 0) return "not_started";

  // Check 3 consecutive passes (most recent 3)
  if (sessions.length >= 3) {
    const last3 = sessions.slice(-3);
    if (last3.every((s) => s.passed)) return "achieved";
  }

  // Check 5/7 passes (most recent 7)
  if (sessions.length >= 5) {
    const last7 = sessions.slice(-7);
    const passCount = last7.filter((s) => s.passed).length;
    if (passCount >= 5) return "achieved";
  }

  return "in_progress";
}

// ─── Behaviour-based mastery (SED) ─────────────────────────────────────────
// Achieved if: ≥ 5 observations on 5 separate calendar days

export function evaluateSEDMastery(
  allObservations: TeacherObservation[],
  childId: string,
  milestoneId: string
): MilestoneStatus {
  const observations = allObservations.filter(
    (o) => o.childId === childId && o.milestoneId === milestoneId
  );

  const uniqueDays = new Set(observations.map((o) => o.observedAt)).size;

  if (uniqueDays === 0) return "not_started";
  if (uniqueDays >= 5) return "achieved";
  return "in_progress";
}

// ─── Mastery count for UI display ──────────────────────────────────────────
// Returns { count, total } — e.g. { count: 2, total: 3 } for "2/3 sessions"

export function getMasteryCount(
  milestone: Milestone,
  childId: string,
  allSessions: ActivitySession[],
  allObservations: TeacherObservation[]
): { count: number; total: number } {
  if (isBehaviourBased(milestone.areaId)) {
    const observations = allObservations.filter(
      (o) => o.childId === childId && o.milestoneId === milestone.id
    );
    const uniqueDays = new Set(observations.map((o) => o.observedAt)).size;
    return { count: uniqueDays, total: 5 };
  }

  // Skill-based: count passing sessions (towards 3 consecutive goal)
  const sessions = allSessions
    .filter((s) => s.childId === childId && s.milestoneId === milestone.id)
    .sort(
      (a, b) =>
        new Date(a.attemptedAt).getTime() - new Date(b.attemptedAt).getTime()
    );

  // Count consecutive passes from end
  let consecutive = 0;
  for (let i = sessions.length - 1; i >= 0; i--) {
    if (sessions[i].passed) {
      consecutive++;
    } else {
      break;
    }
  }

  return { count: consecutive, total: 3 };
}

// ─── Current level for a child in a learning area ──────────────────────────
// = highest level where at least one milestone is in_progress
// Fallback: lowest level where any milestone is not_started
// Default: "B"

export function getCurrentLevel(
  milestones: Milestone[],
  progress: ChildMilestoneProgress[],
  childId: string,
  areaId: LearningAreaId
): LevelId {
  const progressMap = new Map(
    progress
      .filter((p) => p.childId === childId)
      .map((p) => [p.milestoneId, p.status])
  );
  return getCurrentLevelFromStatusMap(milestones, areaId, progressMap);
}

/**
 * Next milestone the child is working toward in this area (aligned with weekly assignment pick):
 * first `in_progress` at {@link getCurrentLevel}, else first `not_started` (or missing row) there;
 * if none, the first such milestone at a higher level. `null` when every milestone in the area is achieved.
 */
export function getNextFocusMilestone(
  milestones: Milestone[],
  progress: ChildMilestoneProgress[],
  childId: string,
  areaId: LearningAreaId
): Milestone | null {
  const progressMap = new Map(
    progress
      .filter((p) => p.childId === childId)
      .map((p) => [p.milestoneId, p.status])
  );
  return getNextFocusMilestoneFromStatusMap(milestones, areaId, progressMap);
}

// ─── Historical achievement date from raw data ─────────────────────────────
// Replays events chronologically to find the exact point mastery was first reached

export function computeSkillAchievedAt(
  allSessions: ActivitySession[],
  childId: string,
  milestoneId: string
): string | undefined {
  const sessions = allSessions
    .filter((s) => s.childId === childId && s.milestoneId === milestoneId)
    .sort(
      (a, b) =>
        new Date(a.attemptedAt).getTime() - new Date(b.attemptedAt).getTime()
    );

  for (let i = 0; i < sessions.length; i++) {
    const prefix = sessions.slice(0, i + 1);
    if (prefix.length >= 3 && prefix.slice(-3).every((s) => s.passed))
      return sessions[i].attemptedAt;
    if (
      prefix.length >= 5 &&
      prefix.slice(-7).filter((s) => s.passed).length >= 5
    )
      return sessions[i].attemptedAt;
  }
  return undefined;
}

export function computeBehaviourAchievedAt(
  allObservations: TeacherObservation[],
  childId: string,
  milestoneId: string
): string | undefined {
  const obs = allObservations
    .filter((o) => o.childId === childId && o.milestoneId === milestoneId)
    .sort((a, b) => a.observedAt.localeCompare(b.observedAt));

  const seen = new Set<string>();
  for (const o of obs) {
    seen.add(o.observedAt);
    if (seen.size >= 5) return o.observedAt;
  }
  return undefined;
}

// ─── Compute progress status from raw data ─────────────────────────────────
// Used when rebuilding progress after a mutation

export function computeStatus(
  milestone: Milestone,
  childId: string,
  sessions: ActivitySession[],
  observations: TeacherObservation[]
): MilestoneStatus {
  if (isBehaviourBased(milestone.areaId)) {
    return evaluateSEDMastery(observations, childId, milestone.id);
  }
  return evaluateSkillMastery(sessions, childId, milestone.id);
}

/** Per-milestone status from sessions + observations (matches child profile / selectors). */
export function computeStatusMapForChild(
  childId: string,
  milestones: Milestone[],
  sessions: ActivitySession[],
  observations: TeacherObservation[]
): Map<string, MilestoneStatus> {
  const map = new Map<string, MilestoneStatus>();
  for (const m of milestones) {
    map.set(m.id, computeStatus(m, childId, sessions, observations));
  }
  return map;
}

export function getCurrentLevelFromStatusMap(
  milestones: Milestone[],
  areaId: LearningAreaId,
  statusByMilestoneId: Map<string, MilestoneStatus>
): LevelId {
  const levelOrder: LevelId[] = ["B", "D", "S"];
  const areaMilestones = milestones.filter((m) => m.areaId === areaId);

  const get = (milestoneId: string) => statusByMilestoneId.get(milestoneId);

  for (const level of [...levelOrder].reverse()) {
    const levelMilestones = areaMilestones.filter((m) => m.levelId === level);
    const hasInProgress = levelMilestones.some((m) => get(m.id) === "in_progress");
    if (hasInProgress) return level;
  }

  for (const level of levelOrder) {
    const levelMilestones = areaMilestones.filter((m) => m.levelId === level);
    const hasNotStarted = levelMilestones.some((m) => {
      const s = get(m.id);
      return s === "not_started" || s === undefined;
    });
    if (hasNotStarted) return level;
  }

  return "S";
}

export function getNextFocusMilestoneFromStatusMap(
  milestones: Milestone[],
  areaId: LearningAreaId,
  statusByMilestoneId: Map<string, MilestoneStatus>
): Milestone | null {
  const currentLevel = getCurrentLevelFromStatusMap(milestones, areaId, statusByMilestoneId);
  const levelOrder: LevelId[] = ["B", "D", "S"];
  const get = (id: string) => statusByMilestoneId.get(id);

  const pickFromLevel = (level: LevelId): Milestone | null => {
    const levelMilestones = milestones
      .filter((m) => m.areaId === areaId && m.levelId === level)
      .sort((a, b) => a.sequence - b.sequence);

    const inProgress = levelMilestones.find((m) => get(m.id) === "in_progress");
    if (inProgress) return inProgress;

    const notStarted = levelMilestones.find(
      (m) => get(m.id) === "not_started" || get(m.id) === undefined
    );
    return notStarted ?? null;
  };

  let next = pickFromLevel(currentLevel);
  if (next) return next;

  const startIdx = levelOrder.indexOf(currentLevel);
  for (let i = startIdx + 1; i < levelOrder.length; i++) {
    next = pickFromLevel(levelOrder[i]);
    if (next) return next;
  }

  return null;
}
