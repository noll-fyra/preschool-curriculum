import type {
  Milestone,
  ActivitySession,
  TeacherObservation,
  LearningAreaId,
} from "./types";
import {
  computeSkillAchievedAt,
  computeBehaviourAchievedAt,
  isBehaviourBased,
} from "./mastery";

export interface MilestoneAchievement {
  date: string; // YYYY-MM-DD
  milestoneId: string;
  statement: string;
  areaId: LearningAreaId;
}

export interface ChartDataPoint {
  date: string; // YYYY-MM-DD
  LL: number;
  NUM: number;
  SED: number;
  ACE: number;
  DOW: number;
  HMS: number;
  total: number;
}

export interface ReferencePoint {
  date: string; // YYYY-MM-DD
  reference: number;
}

const AREA_IDS: LearningAreaId[] = ["LL", "NUM", "SED", "ACE", "DOW", "HMS"];

// ─── Build sorted list of milestone achievements with dates ─────────────────

export function getAchievementTimeline(
  childId: string,
  milestones: Milestone[],
  sessions: ActivitySession[],
  observations: TeacherObservation[]
): MilestoneAchievement[] {
  const results: MilestoneAchievement[] = [];

  for (const milestone of milestones) {
    const achievedAt = isBehaviourBased(milestone.areaId)
      ? computeBehaviourAchievedAt(observations, childId, milestone.id)
      : computeSkillAchievedAt(sessions, childId, milestone.id);

    if (achievedAt) {
      results.push({
        date: achievedAt.slice(0, 10), // normalise to YYYY-MM-DD
        milestoneId: milestone.id,
        statement: milestone.statement,
        areaId: milestone.areaId,
      });
    }
  }

  return results.sort((a, b) => a.date.localeCompare(b.date));
}

// ─── Build cumulative step-chart series ─────────────────────────────────────
// Returns one data point per unique date where at least one milestone was achieved.
// Each point carries cumulative counts per area up to and including that date.
// A leading zero-point at startDate and a trailing point at today are always included.

export function buildChartSeries(
  achievements: MilestoneAchievement[],
  startDate: string
): ChartDataPoint[] {
  const today = new Date().toISOString().slice(0, 10);

  // Group achievements by date
  const byDate = new Map<string, MilestoneAchievement[]>();
  for (const a of achievements) {
    if (a.date < startDate || a.date > today) continue;
    const list = byDate.get(a.date) ?? [];
    list.push(a);
    byDate.set(a.date, list);
  }

  const sortedDates = [...byDate.keys()].sort();

  // Running totals
  const counts: Record<LearningAreaId, number> = {
    LL: 0, NUM: 0, SED: 0, ACE: 0, DOW: 0, HMS: 0,
  };

  const points: ChartDataPoint[] = [];

  // Leading zero point
  points.push({ date: startDate, ...counts, total: 0 });

  for (const date of sortedDates) {
    const achieved = byDate.get(date)!;
    for (const a of achieved) {
      counts[a.areaId]++;
    }
    points.push({
      date,
      ...counts,
      total: AREA_IDS.reduce((s, id) => s + counts[id], 0),
    });
  }

  // Trailing "today" point (only if today isn't already in the series)
  const last = points[points.length - 1];
  if (last.date !== today) {
    points.push({ date: today, ...counts, total: last.total });
  }

  return points;
}

// ─── Build linear reference series ──────────────────────────────────────────
// milestonesPerArea defaults to 9 (3 levels × 3 milestones).
// Returns just start + end points; Recharts draws the straight line between them.

export function buildReferenceSeries(
  academicYear: number,
  milestonesPerArea = 9
): ReferencePoint[] {
  return [
    { date: `${academicYear}-01-01`, reference: 0 },
    { date: `${academicYear}-12-31`, reference: milestonesPerArea },
  ];
}
