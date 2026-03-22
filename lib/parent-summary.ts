// Rule-engine utilities for the parent dashboard.
// Pure functions — no side effects, no store imports.

import type {
  Milestone,
  ChildMilestoneProgress,
  ActivitySession,
  TeacherObservation,
  ChatMessage,
  LearningAreaId,
  LevelId,
  Pronoun,
  DailyUpdate,
  Report,
} from "./types";
import { LEARNING_AREAS } from "./types";
import { getCurrentLevel, evaluateSkillMastery, evaluateSEDMastery, isBehaviourBased } from "./mastery";
import { getActivityConfig } from "./activity-data";

// ─── Pronoun helpers ──────────────────────────────────────────────────────

function subj(p: Pronoun) { return p === "he" ? "he" : p === "she" ? "she" : "they"; }
function poss(p: Pronoun) { return p === "he" ? "his" : p === "she" ? "her" : "their"; }
function Subj(p: Pronoun) { const s = subj(p); return s[0].toUpperCase() + s.slice(1); }
function Poss(p: Pronoun) { const s = poss(p); return s[0].toUpperCase() + s.slice(1); }

// ─── Progress bar fill (0–100, gestural — no percentage label) ───────────
// Beginning 0-33%, Developing 34-66%, Secure 67-100%.
// Within each level fill moves as milestones are achieved.

export function getProgressBarFill(
  milestones: Milestone[],
  progress: ChildMilestoneProgress[],
  childId: string,
  areaId: LearningAreaId
): number {
  const am = milestones.filter((m) => m.areaId === areaId);
  const bM = am.filter((m) => m.levelId === "B");
  const dM = am.filter((m) => m.levelId === "D");
  const sM = am.filter((m) => m.levelId === "S");

  const achieved = new Set(
    progress
      .filter((p) => p.childId === childId && p.status === "achieved")
      .map((p) => p.milestoneId)
  );

  const ab = bM.filter((m) => achieved.has(m.id)).length;
  const ad = dM.filter((m) => achieved.has(m.id)).length;
  const as_ = sM.filter((m) => achieved.has(m.id)).length;

  const fill =
    (bM.length > 0 ? (ab / bM.length) * 33 : 0) +
    (dM.length > 0 ? (ad / dM.length) * 33 : 0) +
    (sM.length > 0 ? (as_ / sM.length) * 34 : 0);

  return Math.round(fill);
}

// ─── Progress bar fill colour (reflects current level, not score) ─────────

export function getProgressBarColor(level: LevelId): string {
  if (level === "B") return "#D85A30";
  if (level === "D") return "#EF9F27";
  return "#639922";
}

// ─── "Working on" text ────────────────────────────────────────────────────
// Returns parentDescription of the current in-progress milestone (or first not_started).

export function getWorkingOnText(
  milestones: Milestone[],
  progress: ChildMilestoneProgress[],
  sessions: ActivitySession[],
  observations: TeacherObservation[],
  childId: string,
  areaId: LearningAreaId
): string {
  const areaMilestones = milestones.filter((m) => m.areaId === areaId);
  const currentLevel = getCurrentLevel(milestones, progress, childId, areaId);
  const levelMilestones = areaMilestones.filter((m) => m.levelId === currentLevel);

  const evaluate = (milestoneId: string) =>
    isBehaviourBased(areaId)
      ? evaluateSEDMastery(observations, childId, milestoneId)
      : evaluateSkillMastery(sessions, childId, milestoneId);

  const inProgress = levelMilestones.find((m) => evaluate(m.id) === "in_progress");
  if (inProgress) return inProgress.parentDescription;

  const notStarted = levelMilestones.find((m) => evaluate(m.id) === "not_started");
  if (notStarted) return notStarted.parentDescription;

  return "All current milestones complete — moving to the next level.";
}

// ─── "Last activity" recency label ────────────────────────────────────────
// LL/NUM use sessions; SED uses teacher observations.

export function getRecencyLabel(
  sessions: ActivitySession[],
  observations: TeacherObservation[],
  milestones: Milestone[],
  childId: string,
  areaId: LearningAreaId
): string {
  const ids = new Set(milestones.filter((m) => m.areaId === areaId).map((m) => m.id));

  let latestDate: Date | null = null;

  if (isBehaviourBased(areaId)) {
    const relevant = observations.filter(
      (o) => o.childId === childId && ids.has(o.milestoneId)
    );
    if (relevant.length > 0) {
      const latest = [...relevant].sort((a, b) =>
        b.observedAt.localeCompare(a.observedAt)
      )[0];
      latestDate = new Date(latest.observedAt + "T00:00:00");
    }
  } else {
    const relevant = sessions.filter(
      (s) => s.childId === childId && ids.has(s.milestoneId)
    );
    if (relevant.length > 0) {
      const latest = [...relevant].sort(
        (a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
      )[0];
      latestDate = new Date(latest.attemptedAt);
    }
  }

  if (!latestDate) return "No activity yet";

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const then = new Date(
    latestDate.getFullYear(),
    latestDate.getMonth(),
    latestDate.getDate()
  );
  const diffDays = Math.floor((today.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
      latestDate.getDay()
    ];
  }
  return `${diffDays} days ago`;
}

// ─── Home activity feed (parent dashboard spec) ───────────────────────────

export type HomeFeedItem =
  | {
      id: string;
      type: "activity_completed";
      timestamp: string;
      href: string;
      title: string;
      subtitle: string;
      icon: "activity";
      location: "home" | "school";
    }
  | {
      id: string;
      type: "milestone_achieved";
      timestamp: string;
      href: string;
      title: string;
      subtitle: string;
      icon: "milestone";
      location: "school";
    }
  | {
      id: string;
      type: "teacher_note";
      timestamp: string;
      href: string;
      title: string;
      subtitle: string;
      icon: "note";
      location: "school";
    }
  | {
      id: string;
      type: "class_update";
      timestamp: string;
      href: string;
      title: string;
      subtitle: string;
      icon: "note";
      location: "school";
    }
  | {
      id: string;
      type: "behaviour_observation";
      timestamp: string;
      href: string;
      title: string;
      subtitle: string;
      icon: "observation";
      location: "school";
    }
  | {
      id: string;
      type: "report_published";
      timestamp: string;
      href: string;
      title: string;
      subtitle: string;
      icon: "note";
      location: "school";
    };

const FEED_CANDIDATE_MS = 120 * 24 * 60 * 60 * 1000;
const OLD_MILESTONE_DAYS = 7;
const NOTE_TRUNCATE = 80;

function areaName(id: LearningAreaId): string {
  return LEARNING_AREAS.find((a) => a.id === id)?.name ?? id;
}

function truncateNote(text: string, max = NOTE_TRUNCATE): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

function qualitativeGloss(score: number): string {
  if (score >= 3) return "Strong work — keep it up!";
  if (score === 2) return "Good effort — a little more practice will help.";
  return "Keep practising — every try counts.";
}

function nowChildStatement(firstName: string, parentDescription: string): string {
  const p = parentDescription.trim();
  if (!p) return `${firstName} has reached this milestone.`;
  const rest = p.charAt(0).toLowerCase() + p.slice(1);
  return `${firstName} now ${rest.replace(/\.$/, "")}.`;
}

/** Timestamp line: "Today, 3:45 pm · at home" */
export function formatParentFeedTimestamp(
  iso: string,
  location: "home" | "school"
): string {
  const d = new Date(iso);
  const today = new Date();
  const yDay = new Date(today);
  yDay.setDate(yDay.getDate() - 1);
  const d0 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const y0 = new Date(yDay.getFullYear(), yDay.getMonth(), yDay.getDate());

  let dayPart: string;
  if (d0.getTime() === t0.getTime()) dayPart = "Today";
  else if (d0.getTime() === y0.getTime()) dayPart = "Yesterday";
  else {
    dayPart = d.toLocaleDateString("en-SG", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  const timePart = d.toLocaleTimeString("en-SG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const place = location === "home" ? "at home" : "at school";
  return `${dayPart}, ${timePart} · ${place}`;
}

function dedupeSessionsByMilestoneDay(
  sessions: ActivitySession[],
  childId: string
): ActivitySession[] {
  const mine = sessions.filter((s) => s.childId === childId);
  const sorted = [...mine].sort(
    (a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
  );
  const seen = new Set<string>();
  const out: ActivitySession[] = [];
  for (const s of sorted) {
    const day = s.attemptedAt.slice(0, 10);
    const key = `${s.milestoneId}|${day}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

function isOldMilestoneAchievement(item: HomeFeedItem): boolean {
  if (item.type !== "milestone_achieved") return false;
  const ageMs = Date.now() - new Date(item.timestamp).getTime();
  return ageMs > OLD_MILESTONE_DAYS * 24 * 60 * 60 * 1000;
}

function compareFeedItems(a: HomeFeedItem, b: HomeFeedItem): number {
  const aOld = isOldMilestoneAchievement(a);
  const bOld = isOldMilestoneAchievement(b);
  if (aOld && !bOld) return 1;
  if (!aOld && bOld) return -1;
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
}

type CollectFeedOptions = {
  /** Home preview: SED only. Full feed: all behaviour-based areas. */
  sedOnlyObservations: boolean;
  /** Include published developmental reports (term / periodic summaries). */
  includeReports: boolean;
};

/**
 * Raw candidate rows for parent feeds (not sorted / limited).
 */
function collectParentFeedItems(
  childId: string,
  childFirstName: string,
  sessions: ActivitySession[],
  progress: ChildMilestoneProgress[],
  milestones: Milestone[],
  chatMessages: ChatMessage[],
  teachers: { id: string; firstName: string; lastName: string }[],
  dailyUpdates: DailyUpdate[],
  observations: TeacherObservation[],
  reports: Report[],
  options: CollectFeedOptions
): HomeFeedItem[] {
  const cutoff = Date.now() - FEED_CANDIDATE_MS;
  const items: HomeFeedItem[] = [];

  const teacherFirst = (id: string) =>
    teachers.find((t) => t.id === id)?.firstName?.trim() || "Teacher";

  // Activity completions (skill milestones only)
  for (const s of dedupeSessionsByMilestoneDay(sessions, childId)) {
    if (new Date(s.attemptedAt).getTime() < cutoff) continue;
    const milestone = milestones.find((m) => m.id === s.milestoneId);
    if (!milestone || isBehaviourBased(milestone.areaId)) continue;
    const cfg = getActivityConfig(s.milestoneId);
    const activityTitle = cfg?.name ?? milestone.parentDescription;
    const loc: "home" | "school" = s.location ?? "school";
    items.push({
      id: `activity-${s.id}`,
      type: "activity_completed",
      timestamp: s.attemptedAt,
      href: `/parent/${childId}/area/${milestone.areaId}/milestone/${s.milestoneId}`,
      title: `Completed: ${activityTitle}`,
      subtitle: `Got ${s.score} out of 3 right — ${qualitativeGloss(s.score)} · ${areaName(milestone.areaId)}`,
      icon: "activity",
      location: loc,
    });
  }

  // Milestone achieved
  for (const p of progress) {
    if (p.childId !== childId || p.status !== "achieved" || !p.achievedAt) continue;
    if (new Date(p.achievedAt).getTime() < cutoff) continue;
    const milestone = milestones.find((m) => m.id === p.milestoneId);
    if (!milestone) continue;
    const ts =
      p.achievedAt.length > 10
        ? p.achievedAt
        : `${p.achievedAt}T12:00:00`;
    items.push({
      id: `milestone-${p.milestoneId}`,
      type: "milestone_achieved",
      timestamp: ts,
      href: `/parent/${childId}/area/${milestone.areaId}/milestone/${p.milestoneId}`,
      title: "Milestone reached!",
      subtitle: nowChildStatement(childFirstName, milestone.parentDescription),
      icon: "milestone",
      location: "school",
    });
  }

  // Teacher notes (progress updates in thread) — highlights
  for (const m of chatMessages) {
    if (
      m.childId !== childId ||
      m.senderType !== "teacher" ||
      m.kind !== "progress_update"
    ) {
      continue;
    }
    if (new Date(m.createdAt).getTime() < cutoff) continue;
    const first = teacherFirst(m.senderId);
    items.push({
      id: `note-${m.id}`,
      type: "teacher_note",
      timestamp: m.createdAt,
      href: `/parent/${childId}/messages`,
      title: `Note from ${first}`,
      subtitle: truncateNote(m.text),
      icon: "note",
      location: "school",
    });
  }

  // Daily / class updates (teacher feed)
  for (const du of dailyUpdates) {
    if (du.childId !== childId) continue;
    if (new Date(du.createdAt).getTime() < cutoff) continue;
    const first = teacherFirst(du.teacherId);
    items.push({
      id: `class-${du.id}`,
      type: "class_update",
      timestamp: du.createdAt,
      href: `/parent/${childId}/messages`,
      title: `Update from ${first}`,
      subtitle: truncateNote(du.text),
      icon: "note",
      location: "school",
    });
  }

  // Behaviour observations (home: SED only; full feed: ACE, DOW, HMS, SED)
  for (const o of observations) {
    if (o.childId !== childId) continue;
    const milestone = milestones.find((m) => m.id === o.milestoneId);
    if (!milestone) continue;
    if (options.sedOnlyObservations) {
      if (milestone.areaId !== "SED") continue;
    } else if (!isBehaviourBased(milestone.areaId)) {
      continue;
    }
    const ts = `${o.observedAt}T12:00:00`;
    if (new Date(ts).getTime() < cutoff) continue;
    const msName = o.teacherId ? teacherFirst(o.teacherId) : "Teacher";
    const subtitle = truncateNote(
      o.note?.trim() || milestone.statement || milestone.parentDescription
    );
    const title =
      milestone.areaId === "SED"
        ? `${msName} noticed something`
        : `Observation · ${areaName(milestone.areaId)}`;
    items.push({
      id: `obs-${o.id}`,
      type: "behaviour_observation",
      timestamp: ts,
      href: `/parent/${childId}/area/${milestone.areaId}/milestone/${o.milestoneId}`,
      title,
      subtitle,
      icon: "observation",
      location: "school",
    });
  }

  // Published developmental reports (term / periodic)
  if (options.includeReports) {
    for (const r of reports) {
      if (r.childId !== childId || r.status !== "published" || !r.publishedAt) continue;
      if (new Date(r.publishedAt).getTime() < cutoff) continue;
      const firstLine =
        r.draftContent
          .split(/\n+/)
          .map((p) => p.trim())
          .find(Boolean) ?? r.draftContent;
      const periodLabel = new Date(r.publishedAt).toLocaleDateString("en-SG", {
        month: "long",
        year: "numeric",
      });
      items.push({
        id: `report-${r.id}`,
        type: "report_published",
        timestamp: r.publishedAt,
        href: `/parent/${childId}/reports`,
        title: "Developmental report",
        subtitle: `Term summary · ${periodLabel} — ${truncateNote(firstLine, 100)}`,
        icon: "note",
        location: "school",
      });
    }
  }

  return items;
}

/**
 * Up to `limit` most recent feed rows (spec: interleaved, milestone >7d demoted).
 * Activity completions: one row per milestone per calendar day (most recent session).
 */
export function getHomeActivityFeed(
  childId: string,
  childFirstName: string,
  sessions: ActivitySession[],
  progress: ChildMilestoneProgress[],
  milestones: Milestone[],
  chatMessages: ChatMessage[],
  teachers: { id: string; firstName: string; lastName: string }[],
  dailyUpdates: DailyUpdate[],
  observations: TeacherObservation[],
  limit = 3
): HomeFeedItem[] {
  const items = collectParentFeedItems(
    childId,
    childFirstName,
    sessions,
    progress,
    milestones,
    chatMessages,
    teachers,
    dailyUpdates,
    observations,
    [],
    { sedOnlyObservations: true, includeReports: false }
  );
  items.sort(compareFeedItems);
  return items.slice(0, limit);
}

/**
 * Full parent feed: activities, milestones, teacher highlights, daily updates,
 * behaviour observations (all observation-based domains), and published reports.
 */
export function getParentUnifiedFeed(
  childId: string,
  childFirstName: string,
  sessions: ActivitySession[],
  progress: ChildMilestoneProgress[],
  milestones: Milestone[],
  chatMessages: ChatMessage[],
  teachers: { id: string; firstName: string; lastName: string }[],
  dailyUpdates: DailyUpdate[],
  observations: TeacherObservation[],
  reports: Report[],
  limit = 100
): HomeFeedItem[] {
  const items = collectParentFeedItems(
    childId,
    childFirstName,
    sessions,
    progress,
    milestones,
    chatMessages,
    teachers,
    dailyUpdates,
    observations,
    reports,
    { sedOnlyObservations: false, includeReports: true }
  );
  items.sort(compareFeedItems);
  return items.slice(0, limit);
}

// ─── Calendar helpers (local date, Monday week start) ──────────────────────

/** Today's calendar date in local timezone, YYYY-MM-DD. */
export function getTodayLocalISO(ref: Date = new Date()): string {
  const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Monday of the ISO week containing `ref`, in local timezone, YYYY-MM-DD. */
export function getISOWeekStartMonday(ref: Date = new Date()): string {
  const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  const dow = d.getDay();
  const offset = dow === 0 ? -6 : 1 - dow;
  d.setDate(d.getDate() + offset);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDaysISO(iso: string, delta: number): string {
  const [y, mo, da] = iso.split("-").map(Number);
  const d = new Date(y, mo - 1, da + delta);
  const yy = d.getFullYear();
  const mm = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function sessionDate(s: ActivitySession): string {
  return s.attemptedAt.slice(0, 10);
}

// ─── Hero card summary ────────────────────────────────────────────────────
// Returns a 1–2 sentence warm summary. Always green — never alarming.

export function getHeroSummary(
  childName: string,
  pronoun: Pronoun,
  childId: string,
  sessions: ActivitySession[],
  progress: ChildMilestoneProgress[],
  milestones: Milestone[],
  weekStart: string, // YYYY-MM-DD (Monday)
  todayISO: string = getTodayLocalISO()
): string {
  const p = pronoun;
  const childSessions = sessions.filter((s) => s.childId === childId);
  const lastWeekStart = addDaysISO(weekStart, -7);

  const thisWeekSessions = childSessions.filter((s) => {
    const day = sessionDate(s);
    return day >= weekStart && day <= todayISO;
  });

  const lastWeekSessionCount = childSessions.filter((s) => {
    const day = sessionDate(s);
    return day >= lastWeekStart && day < weekStart;
  }).length;

  const achievedThisWeek = progress.filter(
    (pr) =>
      pr.childId === childId &&
      pr.status === "achieved" &&
      pr.achievedAt &&
      pr.achievedAt.slice(0, 10) >= weekStart &&
      pr.achievedAt.slice(0, 10) <= todayISO
  );

  const sorted = [...childSessions].sort(
    (a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
  );
  const lastSession = sorted[0];
  const daysSinceLast = lastSession
    ? Math.floor(
        (Date.now() - new Date(lastSession.attemptedAt).getTime()) / (1000 * 60 * 60 * 24)
      )
    : Infinity;

  const milestoneIds = milestones.map((m) => m.id);
  const achievedIds = new Set(
    progress
      .filter((pr) => pr.childId === childId && pr.status === "achieved")
      .map((pr) => pr.milestoneId)
  );
  const allMilestonesAchieved =
    milestoneIds.length > 0 && milestoneIds.every((id) => achievedIds.has(id));

  // All P1-readiness milestones done (spec: special hero variant)
  if (allMilestonesAchieved) {
    const ready =
      p === "they"
        ? "They're ready for Primary 1!"
        : p === "he"
          ? "He's ready for Primary 1!"
          : "She's ready for Primary 1!";
    return `${childName} has achieved all ${poss(p)} P1-readiness milestones. ${ready}`;
  }

  // Milestone achieved this week — celebratory, two short sentences
  if (achievedThisWeek.length > 0) {
    const latest = [...achievedThisWeek].sort((a, b) =>
      (b.achievedAt ?? "").localeCompare(a.achievedAt ?? "")
    )[0];
    const milestone = milestones.find((m) => m.id === latest.milestoneId);
    const desc = milestone?.parentDescription ?? "a new skill";
    return `${childName} reached a big milestone this week — ${desc}. ${Subj(p)}'s ready for the next step on ${poss(p)} journey.`;
  }

  // Brand new (no sessions ever)
  if (childSessions.length === 0) {
    return `${childName} is just getting started — ${poss(p)} personalised learning journey begins this week.`;
  }

  // Active week (3+ sessions in the current week)
  if (thisWeekSessions.length >= 3) {
    const n = thisWeekSessions.length;
    return `${childName} had a great week — ${subj(p)} completed ${n} ${n === 1 ? "activity" : "activities"}. Keep it up!`;
  }

  // Quieter week: nothing this week but had activity before (incl. last week)
  if (thisWeekSessions.length === 0 && lastWeekSessionCount >= 1) {
    return `It's been a quieter week for ${childName} — no activities completed this week. A quick session when you can would help keep ${poss(p)} momentum going.`;
  }

  // No completions this week, gap in rhythm (spec: 5+ days)
  if (daysSinceLast >= 5) {
    return `It's been a few days since ${childName}'s last activity. A quick session this weekend could help keep ${poss(p)} momentum going.`;
  }

  const n = thisWeekSessions.length;
  if (n > 0) {
    return `${childName} is making steady progress this week — ${n} ${n === 1 ? "activity" : "activities"} completed. ${Subj(p)}'s on the right track.`;
  }

  return `${childName} is on ${poss(p)} learning journey. ${Poss(p)} personalised activities are ready whenever ${subj(p)} is.`;
}

// ─── Area summary paragraph ───────────────────────────────────────────────

export function getAreaSummaryText(
  childName: string,
  pronoun: Pronoun,
  areaId: LearningAreaId,
  currentLevel: LevelId
): string {
  const levelName =
    currentLevel === "B" ? "Beginning" : currentLevel === "D" ? "Developing" : "Secure";
  const levelDesc =
    currentLevel === "B"
      ? "exploring the foundations"
      : currentLevel === "D"
      ? "working through the core skills"
      : "approaching Primary 1 readiness";

  if (areaId === "LL") {
    return `${childName} is building the reading and language skills ${subj(pronoun)} needs for school. ${Subj(pronoun)} is currently at the ${levelName} level — ${levelDesc}.`;
  }
  if (areaId === "NUM") {
    return `${childName} is developing the number sense and early maths skills that Primary 1 builds on. ${Subj(pronoun)} is currently at the ${levelName} level — ${levelDesc}.`;
  }
  if (areaId === "ACE") {
    return `${childName} is exploring creativity through art, music, movement, and imaginative play. These milestones are assessed by the class teacher through observation. ${Subj(pronoun)} is currently at the ${levelName} level — ${levelDesc}.`;
  }
  if (areaId === "DOW") {
    return `${childName} is developing curiosity and early scientific thinking — noticing the world, asking questions, and discovering how things work. These milestones are assessed by the class teacher through observation. ${Subj(pronoun)} is currently at the ${levelName} level — ${levelDesc}.`;
  }
  if (areaId === "HMS") {
    return `${childName} is building the physical skills and health habits that support active, confident school participation. These milestones are assessed by the class teacher through observation. ${Subj(pronoun)} is currently at the ${levelName} level — ${levelDesc}.`;
  }
  // SED — special copy explaining observation-based assessment
  return `${childName} is growing in how ${subj(pronoun)} understands and manages ${poss(pronoun)} own feelings and those of ${poss(pronoun)} friends. Social and emotional development is assessed by the class teacher through observation in the classroom — not through digital activities. These milestones show what ${childName} demonstrates consistently in real interactions with friends and teachers. You can reinforce these skills at home through everyday moments: talking about feelings during stories, modelling turn-taking in games, and noticing kind behaviour when you see it.`;
}

// ─── Relative time string for achieved milestones ─────────────────────────

export function getTimeAgoLabel(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}
