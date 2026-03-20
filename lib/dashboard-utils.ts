import type {
  Child,
  Milestone,
  TeacherObservation,
  ActivitySession,
  ChatMessage,
  PlannedActivity,
  ChildAttendance,
  ClassSchedule,
  Class,
  LearningAreaId,
  AttendanceStatus,
} from "./types";
import { getWeekStart } from "./assignments";
import { schedulesForClass, schedulesOnDate, parseTime } from "./calendar-utils";

// ─── Day phase ────────────────────────────────────────────────────────────────

export type DayPhase =
  | "before_school"   // < 08:30
  | "morning_arrival" // 08:30–09:00
  | "active_teaching" // 09:00–12:30
  | "rest_time"       // 12:30–15:00
  | "end_of_day";     // >= 15:00

export function getCurrentPhase(now: Date = new Date()): DayPhase {
  const h = now.getHours();
  const m = now.getMinutes();
  const mins = h * 60 + m;

  if (mins < 8 * 60 + 30) return "before_school";
  if (mins < 9 * 60) return "morning_arrival";
  if (mins < 12 * 60 + 30) return "active_teaching";
  if (mins < 15 * 60) return "rest_time";
  return "end_of_day";
}

// ─── Attendance summary ───────────────────────────────────────────────────────

export interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  pending: number;
  total: number;
  absentNames: string[];
}

export function getAttendanceSummary(
  children: Child[],
  attendance: ChildAttendance[],
  classId: string,
  date: string
): AttendanceSummary {
  const classChildren = children.filter((c) => c.classId === classId);
  const total = classChildren.length;

  const todayMap = new Map<string, AttendanceStatus>();
  for (const a of attendance) {
    if (a.date === date) todayMap.set(a.childId, a.status);
  }

  let present = 0, absent = 0, late = 0, pending = 0;
  const absentNames: string[] = [];

  for (const child of classChildren) {
    const status = todayMap.get(child.id) ?? "pending";
    if (status === "present") present++;
    else if (status === "absent") { absent++; absentNames.push(child.firstName); }
    else if (status === "late") late++;
    else pending++;
  }

  return { present, absent, late, pending, total, absentNames };
}

// ─── Weekly domain coverage (per child) ──────────────────────────────────────

export function getWeeklyDomainCoverage(
  childId: string,
  observations: TeacherObservation[],
  sessions: ActivitySession[],
  milestones: Milestone[],
  weekStart: string
): Record<LearningAreaId, boolean> {
  const weekEnd = getWeekEnd(weekStart);

  // Build milestoneId → areaId map
  const milestoneArea = new Map<string, LearningAreaId>();
  for (const m of milestones) milestoneArea.set(m.id, m.areaId);

  const covered = new Set<LearningAreaId>();

  // Observations (behaviour-based: SED, ACE, DOW, HMS)
  for (const obs of observations) {
    if (obs.childId !== childId) continue;
    if (obs.observedAt < weekStart || obs.observedAt > weekEnd) continue;
    const area = milestoneArea.get(obs.milestoneId);
    if (area) covered.add(area);
  }

  // Sessions (skill-based: LL, NUM) — count passing sessions only
  for (const ses of sessions) {
    if (ses.childId !== childId) continue;
    const date = ses.attemptedAt.slice(0, 10);
    if (date < weekStart || date > weekEnd) continue;
    const area = milestoneArea.get(ses.milestoneId);
    if (area) covered.add(area);
  }

  return {
    LL:  covered.has("LL"),
    NUM: covered.has("NUM"),
    SED: covered.has("SED"),
    ACE: covered.has("ACE"),
    DOW: covered.has("DOW"),
    HMS: covered.has("HMS"),
  };
}

function getWeekEnd(weekStart: string): string {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 6);
  return d.toISOString().slice(0, 10);
}

// ─── Flagged children ─────────────────────────────────────────────────────────

export function getFlaggedChildren(
  children: Child[],
  observations: TeacherObservation[],
  chatMessages: ChatMessage[],
  milestones: Milestone[],
  today: string
): Set<string> {
  const flagged = new Set<string>();
  const milestoneArea = new Map<string, LearningAreaId>();
  for (const m of milestones) milestoneArea.set(m.id, m.areaId);

  for (const child of children) {
    const childObs = observations.filter((o) => o.childId === child.id);

    // Rule 1: no observation in any domain for 5+ days
    if (childObs.length > 0) {
      const mostRecent = childObs.reduce((max, o) =>
        o.observedAt > max ? o.observedAt : max, childObs[0].observedAt
      );
      const daysSince = daysBetween(mostRecent, today);
      if (daysSince >= 5) flagged.add(child.id);
    } else {
      // Never observed — flag
      flagged.add(child.id);
    }

    // Rule 2: unread parent message (heuristic: parent message in last 7 days)
    const hasUnreadParentMsg = chatMessages.some(
      (m) =>
        m.childId === child.id &&
        m.senderType === "parent" &&
        daysBetween(m.createdAt.slice(0, 10), today) <= 7
    );
    if (hasUnreadParentMsg) flagged.add(child.id);

    // Rule 3: a specific domain not observed for 10+ days
    if (childObs.length > 0) {
      const areaLastSeen = new Map<LearningAreaId, string>();
      for (const obs of childObs) {
        const area = milestoneArea.get(obs.milestoneId);
        if (!area) continue;
        const existing = areaLastSeen.get(area);
        if (!existing || obs.observedAt > existing) areaLastSeen.set(area, obs.observedAt);
      }
      for (const [, lastDate] of areaLastSeen) {
        if (daysBetween(lastDate, today) >= 10) {
          flagged.add(child.id);
          break;
        }
      }
    }
  }

  return flagged;
}

function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA).getTime();
  const b = new Date(dateB).getTime();
  return Math.round(Math.abs(b - a) / (1000 * 60 * 60 * 24));
}

// ─── Today's activities ───────────────────────────────────────────────────────

export type ActivityStatus = "done" | "in_progress" | "upcoming";

export interface ScheduleActivity {
  id: string;
  title: string;
  description?: string;
  areaId?: LearningAreaId;
  startTime: string | undefined;
  endTime: string | undefined;
  durationMins: number | undefined;
  status: ActivityStatus;
  childCount: number;
}

export function getTodayActivities(
  activities: PlannedActivity[],
  classId: string,
  today: string,
  now: Date = new Date()
): ScheduleActivity[] {
  const todayActivities = activities
    .filter((a) => a.classId === classId && a.date === today)
    .sort((a, b) => {
      if (!a.startTime && !b.startTime) return 0;
      if (!a.startTime) return 1;
      if (!b.startTime) return -1;
      return a.startTime.localeCompare(b.startTime);
    });

  const nowMins = now.getHours() * 60 + now.getMinutes();

  return todayActivities.map((a) => {
    let status: ActivityStatus = "upcoming";
    if (a.startTime) {
      const [sh, sm] = a.startTime.split(":").map(Number);
      const startMins = sh * 60 + sm;
      const endMins = startMins + (a.durationMins ?? 30);
      if (nowMins >= endMins) status = "done";
      else if (nowMins >= startMins) status = "in_progress";
    }
    return {
      id: a.id,
      title: a.title,
      areaId: a.areaId,
      startTime: a.startTime,
      endTime: a.startTime ? (() => {
        const [sh, sm] = a.startTime.split(":").map(Number);
        const endMins = sh * 60 + sm + (a.durationMins ?? 30);
        return `${String(Math.floor(endMins / 60)).padStart(2, "0")}:${String(endMins % 60).padStart(2, "0")}`;
      })() : undefined,
      durationMins: a.durationMins,
      status,
      childCount: a.childIds.length,
    };
  });
}

// ─── Today's schedule from ClassSchedule recurring entries ───────────────────

export function getScheduleForToday(
  classSchedules: ClassSchedule[],
  classes: Class[],
  classId: string,
  classChildCount: number,
  today: string,
  now: Date = new Date()
): ScheduleActivity[] {
  const relevant = schedulesForClass(classId, classSchedules, classes);
  const todayScheds = schedulesOnDate(today, relevant)
    .filter((s) => !!s.startTime)
    .sort((a, b) => parseTime(a.startTime!) - parseTime(b.startTime!));

  const nowMins = now.getHours() * 60 + now.getMinutes();

  return todayScheds.map((s) => {
    const startMins = parseTime(s.startTime!);
    const endMins = s.endTime ? parseTime(s.endTime) : startMins + 60;
    let status: ActivityStatus = "upcoming";
    if (nowMins >= endMins) status = "done";
    else if (nowMins >= startMins) status = "in_progress";
    return {
      id: s.id,
      title: s.title,
      description: s.description,
      startTime: s.startTime,
      endTime: s.endTime,
      durationMins: endMins - startMins,
      status,
      childCount: classChildCount,
    };
  });
}

// ─── Weekly observation count ─────────────────────────────────────────────────

export function getWeeklyObservationCount(
  observations: TeacherObservation[],
  children: Child[],
  classId: string,
  weekStart: string
): number {
  const classChildIds = new Set(
    children.filter((c) => c.classId === classId).map((c) => c.id)
  );
  const weekEnd = getWeekEnd(weekStart);
  return observations.filter(
    (o) =>
      classChildIds.has(o.childId) &&
      o.observedAt >= weekStart &&
      o.observedAt <= weekEnd
  ).length;
}

// ─── AI insight (rule-based fallback) ────────────────────────────────────────

export interface InsightStats {
  presentCount: number;
  totalCount: number;
  activitiesToday: number;
  observationsThisWeek: number;
  flaggedCount: number;
  absentNames: string[];
}

export function getInsightText(phase: DayPhase, stats: InsightStats): string {
  const { flaggedCount, observationsThisWeek, absentNames, totalCount, presentCount } = stats;

  if (phase === "before_school") {
    if (flaggedCount >= 3)
      return `${flaggedCount} children haven't had a developmental observation recently — a good set of priorities for today's sessions.`;
    if (absentNames.length > 0)
      return `Expecting ${absentNames.length} absent today (${absentNames.join(", ")}). Good time to review the plan and check for any parent messages.`;
    return "Morning prep time. Review today's schedule and check if activity materials are ready before the children arrive.";
  }

  if (phase === "morning_arrival") {
    const arriving = totalCount - absentNames.length;
    return `${arriving} children expected today. Tap a child's card to mark them present, absent, or late as they arrive.`;
  }

  if (phase === "active_teaching") {
    if (flaggedCount > 0)
      return `${flaggedCount} ${flaggedCount === 1 ? "child needs" : "children need"} your attention today — check the flagged cards in the grid.`;
    if (observationsThisWeek < 5)
      return "Quiet observation week so far. Today's activities are a good opportunity to log a few notes — even one line per child adds up.";
    return `${observationsThisWeek} observations logged this week. You're keeping up a strong rhythm — look out for spontaneous moments to capture.`;
  }

  if (phase === "rest_time") {
    if (observationsThisWeek > 10)
      return `Great morning — ${observationsThisWeek} observations logged this week. Use this window to tag any unconfirmed domain labels or draft a parent update.`;
    return "Quiet window for admin. Check for untagged observations, draft parent updates, or review tomorrow's schedule.";
  }

  // end_of_day
  if (presentCount > 0)
    return `${presentCount} children in today. Before you go, approve the auto-drafted parent updates and log any handover notes for tomorrow.`;
  return "End of day. Review today's observations, send parent updates, and set up tomorrow's activities.";
}

// ─── Milestone keyword suggestion (for quick-log) ─────────────────────────────

export function suggestMilestoneFromText(
  text: string,
  milestones: Milestone[]
): Milestone | null {
  const lower = text.toLowerCase();

  const keywords: Record<LearningAreaId, string[]> = {
    LL:  ["letter", "word", "read", "sound", "alphabet", "book", "story", "print", "phonics", "sight", "name"],
    NUM: ["count", "number", "number", "shape", "pattern", "sort", "measure", "math", "more", "less", "add", "subtract"],
    SED: ["feel", "emotion", "friend", "share", "cooperate", "turn", "upset", "happy", "sad", "angry", "calm", "conflict"],
    ACE: ["draw", "paint", "art", "create", "craft", "colour", "music", "sing", "dance", "drama", "imaginative"],
    DOW: ["discover", "science", "nature", "explore", "question", "observe", "plant", "animal", "world"],
    HMS: ["run", "jump", "climb", "balance", "catch", "throw", "scissor", "grip", "fine motor", "gross motor", "body", "healthy"],
  };

  let bestArea: LearningAreaId | null = null;
  let bestScore = 0;

  for (const [area, words] of Object.entries(keywords) as [LearningAreaId, string[]][]) {
    const score = words.filter((w) => lower.includes(w)).length;
    if (score > bestScore) { bestScore = score; bestArea = area; }
  }

  if (!bestArea) return null;

  // Return first in-progress or not-started milestone in that area
  const areaMilestones = milestones.filter((m) => m.areaId === bestArea);
  return areaMilestones[0] ?? null;
}
