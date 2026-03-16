import type {
  LearningAreaId,
  LevelId,
  MilestoneWithProgress,
  ChildWithLevels,
} from "./types";
import type { NurtureStore } from "./store";
import {
  getCurrentLevel,
  evaluateSkillMastery,
  evaluateSEDMastery,
  getMasteryCount,
} from "./mastery";
import { LEARNING_AREAS } from "./types";

// ─── Per-child level for each area ─────────────────────────────────────────

export function getChildLevelPerArea(
  childId: string,
  store: NurtureStore
): Record<LearningAreaId, LevelId> {
  return {
    LL: getCurrentLevel(store.milestones, store.progress, childId, "LL"),
    NUM: getCurrentLevel(store.milestones, store.progress, childId, "NUM"),
    SED: getCurrentLevel(store.milestones, store.progress, childId, "SED"),
  };
}

// ─── Children in the active class ──────────────────────────────────────────

export function getActiveClassChildren(store: NurtureStore) {
  return store.children.filter((c) => c.classId === store.activeClassId);
}

// ─── All children in the active class with their current levels ────────────

export function getAllChildrenWithLevels(store: NurtureStore): ChildWithLevels[] {
  return getActiveClassChildren(store).map((child) => ({
    ...child,
    levels: getChildLevelPerArea(child.id, store),
  }));
}

// ─── Full milestone progress for one child ─────────────────────────────────
// Returns all milestones with computed status + mastery counts

export function getMilestoneProgressForChild(
  childId: string,
  store: NurtureStore
): MilestoneWithProgress[] {
  return store.milestones.map((milestone) => {
    const status =
      milestone.areaId === "SED"
        ? evaluateSEDMastery(store.observations, childId, milestone.id)
        : evaluateSkillMastery(store.sessions, childId, milestone.id);

    const { count, total } = getMasteryCount(
      milestone,
      childId,
      store.sessions,
      store.observations
    );

    const progressRow = store.progress.find(
      (p) => p.childId === childId && p.milestoneId === milestone.id
    );

    return {
      ...milestone,
      status,
      masteryCount: count,
      masteryTotal: total,
      achievedAt: progressRow?.achievedAt,
    };
  });
}

// ─── Today's observations (milestoneIds already logged today for a child) ──

export function getTodayObservationMilestoneIds(
  childId: string,
  store: NurtureStore
): string[] {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return store.observations
    .filter((o) => o.childId === childId && o.observedAt === today)
    .map((o) => o.milestoneId);
}

// ─── SED observation count for one child + milestone ──────────────────────

export function getSEDObservationCount(
  childId: string,
  milestoneId: string,
  store: NurtureStore
): number {
  const uniqueDays = new Set(
    store.observations
      .filter(
        (o) => o.childId === childId && o.milestoneId === milestoneId
      )
      .map((o) => o.observedAt)
  ).size;
  return uniqueDays;
}

// ─── SED observation breakdown: previous days vs today ────────────────────

export function getSEDObservationBreakdown(
  childId: string,
  milestoneId: string,
  store: NurtureStore
): { previousDays: number; hasToday: boolean } {
  const today = new Date().toISOString().slice(0, 10);
  const observations = store.observations.filter(
    (o) => o.childId === childId && o.milestoneId === milestoneId
  );
  const hasToday = observations.some((o) => o.observedAt === today);
  const previousDays = new Set(
    observations.filter((o) => o.observedAt !== today).map((o) => o.observedAt)
  ).size;
  return { previousDays, hasToday };
}

// ─── Activities for a date range (inclusive) ──────────────────────────────

export function getActivitiesForDateRange(
  from: string,
  to: string,
  store: NurtureStore
) {
  return store.plannedActivities.filter(
    (a) => a.classId === store.activeClassId && a.date >= from && a.date <= to
  );
}

// ─── SED milestones only ───────────────────────────────────────────────────

export function getSEDMilestones(store: NurtureStore) {
  return store.milestones.filter((m) => m.areaId === "SED");
}

// ─── All learning areas (constant, re-exported for convenience) ────────────

export { LEARNING_AREAS };
