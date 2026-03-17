// Rule-engine utilities for the parent dashboard.
// Pure functions — no side effects, no store imports.

import type {
  Milestone,
  ChildMilestoneProgress,
  ActivitySession,
  TeacherObservation,
  TeacherUpdate,
  LearningAreaId,
  LevelId,
  Pronoun,
} from "./types";
import { getCurrentLevel, evaluateSkillMastery, evaluateSEDMastery } from "./mastery";
import { getActivityConfig } from "./activity-data";

// ─── Pronoun helpers ──────────────────────────────────────────────────────

function subj(p: Pronoun) { return p === "he" ? "he" : p === "she" ? "she" : "they"; }
function poss(p: Pronoun) { return p === "he" ? "his" : p === "she" ? "her" : "their"; }
function obj(p: Pronoun)  { return p === "he" ? "him" : p === "she" ? "her" : "them"; }
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
    areaId === "SED"
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

  if (areaId === "SED") {
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

// ─── Feed items ───────────────────────────────────────────────────────────

export interface FeedItem {
  id: string;
  type: "activity_completed" | "milestone_achieved" | "teacher_update";
  title: string;
  subtitle: string;
  timestamp: string; // ISO string
  icon: "activity" | "milestone" | "teacher_update";
  /** For teacher_update: media URLs for display */
  media?: { type: "photo" | "video"; url: string }[];
}

export function getFeedItems(
  childId: string,
  classId: string,
  sessions: ActivitySession[],
  progress: ChildMilestoneProgress[],
  milestones: Milestone[],
  teacherUpdates: TeacherUpdate[],
  teachers: { id: string; firstName: string; lastName: string }[]
): FeedItem[] {
  const items: FeedItem[] = [];

  // Activity completions — deduplicate to 1 per milestone per day (most recent result)
  const childSessions = sessions.filter((s) => s.childId === childId);
  const sessionMap = new Map<string, ActivitySession>();
  for (const s of childSessions) {
    const key = `${s.milestoneId}::${s.attemptedAt.slice(0, 10)}`;
    const existing = sessionMap.get(key);
    if (!existing || new Date(s.attemptedAt) > new Date(existing.attemptedAt)) {
      sessionMap.set(key, s);
    }
  }

  for (const s of sessionMap.values()) {
    const milestone = milestones.find((m) => m.id === s.milestoneId);
    if (!milestone) continue;
    const config = getActivityConfig(s.milestoneId);
    const activityName = config?.name ?? milestone.statement;

    const scoreGloss =
      s.score === 3 ? "excellent!" :
      s.score === 2 ? "well done!" :
      s.score === 1 ? "keep practising" :
      "needs a bit more practice";

    items.push({
      id: s.id,
      type: "activity_completed",
      title: `Completed: ${activityName}`,
      subtitle: `Got ${s.score} out of 3 right — ${scoreGloss}`,
      timestamp: s.attemptedAt,
      icon: "activity",
    });
  }

  // Milestone achievements
  for (const p of progress) {
    if (p.childId !== childId || p.status !== "achieved" || !p.achievedAt) continue;
    const milestone = milestones.find((m) => m.id === p.milestoneId);
    if (!milestone) continue;
    items.push({
      id: `achieved-${p.milestoneId}`,
      type: "milestone_achieved",
      title: "Milestone reached!",
      subtitle: milestone.parentDescription,
      timestamp: p.achievedAt,
      icon: "milestone",
    });
  }

  // Teacher updates (class-level or tagging this child)
  const visibleUpdates = teacherUpdates.filter(
    (u) =>
      u.classId === classId &&
      (u.childIds.length === 0 || u.childIds.includes(childId))
  );
  for (const u of visibleUpdates) {
    const teacher = teachers.find((t) => t.id === u.teacherId);
    const teacherName = teacher
      ? [teacher.firstName, teacher.lastName].filter(Boolean).join(" ").trim() || "Teacher"
      : "Teacher";
    const subtitle = u.text.length > 80 ? u.text.slice(0, 80) + "…" : u.text;
    items.push({
      id: u.id,
      type: "teacher_update",
      title: `Update from ${teacherName}`,
      subtitle,
      timestamp: u.createdAt,
      icon: "teacher_update",
      media: u.media,
    });
  }

  // Sort by timestamp descending
  items.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Demote milestone achievements older than 7 days below more recent items
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = items.filter(
    (it) => it.type !== "milestone_achieved" || new Date(it.timestamp).getTime() > sevenDaysAgo
  );
  const old = items.filter(
    (it) => it.type === "milestone_achieved" && new Date(it.timestamp).getTime() <= sevenDaysAgo
  );

  return [...recent, ...old].slice(0, 3);
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
  weekStart: string // YYYY-MM-DD
): string {
  const p = pronoun;
  const childSessions = sessions.filter((s) => s.childId === childId);

  const thisWeekSessions = childSessions.filter(
    (s) => s.attemptedAt.slice(0, 10) >= weekStart
  );

  const achievedThisWeek = progress.filter(
    (pr) =>
      pr.childId === childId &&
      pr.status === "achieved" &&
      pr.achievedAt &&
      pr.achievedAt.slice(0, 10) >= weekStart
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

  // Rule 1: milestone achieved this week — most celebratory
  if (achievedThisWeek.length > 0) {
    const milestone = milestones.find((m) => m.id === achievedThisWeek[0].milestoneId);
    const desc = milestone?.parentDescription ?? "a new skill";
    const lower = desc[0].toLowerCase() + desc.slice(1);
    return `${childName} reached a big milestone this week — ${lower} ${Subj(p)} is making wonderful progress!`;
  }

  // Rule 2: active week (3+ sessions)
  if (thisWeekSessions.length >= 3) {
    return `${childName} had a great week — ${subj(p)} completed ${thisWeekSessions.length} activities and is building ${poss(p)} skills steadily. Keep it up!`;
  }

  // Rule 3: brand new (no sessions ever)
  if (childSessions.length === 0) {
    return `${childName} is just getting started — ${poss(p)} personalised learning journey begins this week. We can't wait to see what ${subj(p)} discovers!`;
  }

  // Rule 4: quiet period (5+ days since last session)
  if (daysSinceLast >= 5) {
    return `It's been a few days since ${childName}'s last activity. A quick session this weekend could help keep ${poss(p)} momentum going.`;
  }

  // Rule 5: some activity this week
  const n = thisWeekSessions.length;
  if (n > 0) {
    return `${childName} is making steady progress this week — ${n} ${n === 1 ? "activity" : "activities"} completed. ${Subj(p)} is on the right track.`;
  }

  // Default
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
