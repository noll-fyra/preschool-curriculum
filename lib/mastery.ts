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
  const levelOrder: LevelId[] = ["B", "D", "S"];

  const areaMilestones = milestones.filter((m) => m.areaId === areaId);

  const progressMap = new Map(
    progress
      .filter((p) => p.childId === childId)
      .map((p) => [p.milestoneId, p.status])
  );

  // Find highest level with an in_progress milestone
  for (const level of [...levelOrder].reverse()) {
    const levelMilestones = areaMilestones.filter((m) => m.levelId === level);
    const hasInProgress = levelMilestones.some(
      (m) => progressMap.get(m.id) === "in_progress"
    );
    if (hasInProgress) return level;
  }

  // Fallback: lowest level with a not_started milestone
  for (const level of levelOrder) {
    const levelMilestones = areaMilestones.filter((m) => m.levelId === level);
    const hasNotStarted = levelMilestones.some(
      (m) =>
        progressMap.get(m.id) === "not_started" ||
        progressMap.get(m.id) === undefined
    );
    if (hasNotStarted) return level;
  }

  // All achieved — return Secure
  return "S";
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
