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

// ─── Month-based x-axis (Jan → this month + 1, capped at December) ───────────

/** First day of each month YYYY-MM-DD from January of `academicYear` through the end month. */
export function getChartMonthStarts(
  academicYear: number,
  now: Date = new Date()
): string[] {
  const cy = now.getFullYear();
  const cm = now.getMonth();

  let endIdx: number;
  if (cy > academicYear) {
    endIdx = 11;
  } else if (cy < academicYear) {
    endIdx = 0;
  } else {
    endIdx = Math.min(cm + 1, 11);
  }

  const out: string[] = [];
  for (let m = 0; m <= endIdx; m++) {
    out.push(
      `${academicYear}-${String(m + 1).padStart(2, "0")}-01`
    );
  }
  return out;
}

function isoEndOfMonth(monthStartYYYYMM01: string): string {
  const y = Number(monthStartYYYYMM01.slice(0, 4));
  const mo = Number(monthStartYYYYMM01.slice(5, 7));
  const d = new Date(y, mo, 0);
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${String(mo).padStart(2, "0")}-${dd}`;
}

/** One row per month start: cumulative milestone counts from 1 Jan of academic year through end of that month. */
export function buildMonthlyChartSeries(
  achievements: MilestoneAchievement[],
  academicYear: number,
  monthStarts: string[]
): ChartDataPoint[] {
  const yearStart = `${academicYear}-01-01`;
  const yearEnd = `${academicYear}-12-31`;
  const filtered = achievements.filter(
    (a) => a.date >= yearStart && a.date <= yearEnd
  );

  const points: ChartDataPoint[] = [];
  for (const monthStart of monthStarts) {
    const periodEnd = isoEndOfMonth(monthStart);
    const counts: Record<LearningAreaId, number> = {
      LL: 0,
      NUM: 0,
      SED: 0,
      ACE: 0,
      DOW: 0,
      HMS: 0,
    };
    for (const a of filtered) {
      if (a.date <= periodEnd) {
        counts[a.areaId]++;
      }
    }
    points.push({
      date: monthStart,
      ...counts,
      total: AREA_IDS.reduce((s, id) => s + counts[id], 0),
    });
  }
  return points;
}
