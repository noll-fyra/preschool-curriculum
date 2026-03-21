"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import {
  getMilestoneProgressForChild,
  getSEDMilestones,
  getTodayObservationMilestoneIds,
  getSEDObservationBreakdown,
} from "@/lib/selectors";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { StatusBadge } from "@/components/teacher/StatusBadge";
// ReportEditor is used in the Reports section (/teacher/reports/[childId])
import { getCurrentLevel } from "@/lib/mastery";
import { LEARNING_AREAS, LEVEL_LABELS } from "@/lib/types";
import type { NoteTag, LevelId } from "@/lib/types";
import { ChildProfileHeader } from "@/components/teacher/ChildProfileHeader";
import { getChildDisplayName } from "@/lib/display-name";
import { ProgressChart } from "@/components/shared/ProgressChart";

type Tab = "overview" | "observations" | "milestones" | "family";

const NOTE_TAG_STYLES: Record<
  NoteTag,
  { label: string; bg: string; text: string }
> = {
  learning: { label: "Learning", bg: "#EFF6FF", text: "#1D4ED8" },
  milestone_moment: {
    label: "Milestone moment",
    bg: "#E8F5EE",
    text: "#2D7A4F",
  },
  behaviour: { label: "Behaviour", bg: "#FFFBF2", text: "#A06010" },
  social: { label: "Social", bg: "#EFF6FF", text: "#1D4ED8" },
  welfare: { label: "Welfare", bg: "#FDECEA", text: "#B91C1C" },
  family: { label: "Family", bg: "#FFFBF2", text: "#A06010" },
};

const ALL_NOTE_TAGS: NoteTag[] = [
  "learning",
  "milestone_moment",
  "behaviour",
  "social",
  "welfare",
  "family",
];

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)
    return date.toLocaleDateString("en-SG", { weekday: "long" });
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ChildProfilePage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const { childId } = use(params);
  const router = useRouter();
  const store = useStore();
  const {
    logObservation,
    undoObservation,
    savePersonalitySnapshot,
    saveTeacherStrategies,
    saveFamilyContext,
    addTeacherNote,
    deleteTeacherNote,
  } = store;

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [lastLogged, setLastLogged] = useState<string | null>(null);

  // Inline edit state
  const [editingSnapshot, setEditingSnapshot] = useState(false);
  const [snapshotDraft, setSnapshotDraft] = useState("");
  const [editingStrategies, setEditingStrategies] = useState(false);
  const [whatWorksDraft, setWhatWorksDraft] = useState("");
  const [whatToWatchDraft, setWhatToWatchDraft] = useState("");
  const [editingContext, setEditingContext] = useState(false);
  const [contextDraft, setContextDraft] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");
  const [noteTags, setNoteTags] = useState<NoteTag[]>([]);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
      </div>
    );
  }

  const displayName = getChildDisplayName(child);
  const allProgress = getMilestoneProgressForChild(childId, store);
  const sedMilestones = getSEDMilestones(store);
  const todayLogged = getTodayObservationMilestoneIds(childId, store);
  // Profile section data
  const snapshot = store.personalitySnapshots.find(
    (s) => s.childId === childId,
  );
  const strategies = store.teacherStrategies.find((s) => s.childId === childId);
  const familyCtx = store.familyContexts.find((f) => f.childId === childId);
  const childNotes = store.teacherNotes
    .filter((n) => n.childId === childId && !n.deletedAt)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  // Profile completeness (weights per spec)
  const whatWorksItems = (strategies?.whatWorks ?? "")
    .split("\n")
    .filter((s) => s.trim().length > 0);
  const whatToWatchItems = (strategies?.whatToWatch ?? "")
    .split("\n")
    .filter((s) => s.trim().length > 0);
  const thirtyDaysAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000,
  ).toISOString();
  const hasRecentNote = childNotes.some((n) => n.createdAt >= thirtyDaysAgo);
  const completeness =
    (snapshot?.content ? 30 : 0) +
    (whatWorksItems.length >= 2 ? 20 : 0) +
    (whatToWatchItems.length >= 1 ? 15 : 0) +
    (familyCtx?.content ? 15 : 0) +
    (child.primaryGuardian?.name && child.primaryGuardian.phone ? 10 : 0) +
    (hasRecentNote ? 10 : 0);

  // Learning snapshot data per area
  function getLearningSnapshotData(areaId: string) {
    const level = getCurrentLevel(
      store.milestones,
      store.progress,
      childId,
      areaId as "LL" | "NUM" | "SED",
    );
    const levelMilestones = store.milestones
      .filter((m) => m.areaId === areaId && m.levelId === level)
      .sort((a, b) => a.sequence - b.sequence);

    const allAreaMilestones = store.milestones.filter(
      (m) => m.areaId === areaId,
    );
    const allAreaAchieved = allAreaMilestones.every(
      (m) => allProgress.find((p) => p.id === m.id)?.status === "achieved",
    );

    const achievedInLevel = levelMilestones.filter(
      (m) => allProgress.find((p) => p.id === m.id)?.status === "achieved",
    ).length;
    const fillPct =
      levelMilestones.length > 0 ? achievedInLevel / levelMilestones.length : 0;

    const inProgressMilestone = levelMilestones.find(
      (m) => allProgress.find((p) => p.id === m.id)?.status === "in_progress",
    );
    const inProgressData = inProgressMilestone
      ? allProgress.find((p) => p.id === inProgressMilestone.id)
      : null;

    return {
      level,
      fillPct,
      allAreaAchieved,
      inProgressMilestone,
      inProgressData,
    };
  }

  // Activity feed (last 14 days, max 5 items)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const activityFeed = useMemo(() => {
    const cutoff = new Date(
      Date.now() - 14 * 24 * 60 * 60 * 1000,
    ).toISOString();
    type FeedItem = {
      id: string;
      date: string;
      type: "session" | "milestone" | "observation" | "note";
      text: string;
      sub?: string;
      color: string;
    };
    const items: FeedItem[] = [];

    // Sessions — deduplicate: keep latest per (milestoneId, day)
    const recentSessions = store.sessions.filter(
      (s) => s.childId === childId && s.attemptedAt >= cutoff,
    );
    const sessionsByKey = new Map<string, (typeof recentSessions)[0]>();
    for (const s of recentSessions) {
      const day = s.attemptedAt.slice(0, 10);
      const key = `${s.milestoneId}|${day}`;
      const existing = sessionsByKey.get(key);
      if (!existing || s.attemptedAt > existing.attemptedAt) {
        sessionsByKey.set(key, s);
      }
    }
    for (const s of sessionsByKey.values()) {
      const milestone = store.milestones.find((m) => m.id === s.milestoneId);
      items.push({
        id: s.id,
        date: s.attemptedAt,
        type: "session",
        text: s.passed
          ? `Completed: ${milestone?.statement ?? s.milestoneId}`
          : `Retry: ${milestone?.statement ?? s.milestoneId}`,
        sub: `${s.score}/3 correct`,
        color: s.passed ? "#2D7A4F" : "#A06010",
      });
    }

    // Milestone achievements
    for (const p of store.progress.filter(
      (p) => p.childId === childId && p.achievedAt && p.achievedAt >= cutoff,
    )) {
      const milestone = store.milestones.find((m) => m.id === p.milestoneId);
      items.push({
        id: `ach-${p.milestoneId}`,
        date: p.achievedAt!,
        type: "milestone",
        text: `Milestone achieved: ${milestone?.statement ?? p.milestoneId}`,
        color: "#2D7A4F",
      });
    }

    // SED observations
    for (const o of store.observations.filter(
      (o) => o.childId === childId && o.observedAt >= cutoff.slice(0, 10),
    )) {
      const milestone = store.milestones.find((m) => m.id === o.milestoneId);
      items.push({
        id: o.id,
        date: o.observedAt + "T00:00:00.000Z",
        type: "observation",
        text: `SED observation: ${milestone?.statement ?? o.milestoneId}`,
        color: "#1D4ED8",
      });
    }

    // Teacher notes
    for (const n of childNotes.filter((n) => n.createdAt >= cutoff)) {
      items.push({
        id: `feed-${n.id}`,
        date: n.createdAt,
        type: "note",
        text: `Note: ${n.content.slice(0, 70)}${n.content.length > 70 ? "…" : ""}`,
        color: "#7C3AED",
      });
    }

    return items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    store.sessions,
    store.observations,
    store.progress,
    store.teacherNotes,
    childId,
  ]);

  // Handlers
  function handleObserve(milestoneId: string) {
    logObservation(childId, milestoneId);
    const milestone = sedMilestones.find((m) => m.id === milestoneId);
    setLastLogged(milestone?.statement ?? milestoneId);
    setTimeout(() => setLastLogged(null), 3000);
  }

  function handleSaveSnapshot() {
    savePersonalitySnapshot(childId, snapshotDraft);
    setEditingSnapshot(false);
  }

  function handleSaveStrategies() {
    saveTeacherStrategies(childId, whatWorksDraft, whatToWatchDraft);
    setEditingStrategies(false);
  }

  function handleSaveContext() {
    saveFamilyContext(childId, contextDraft);
    setEditingContext(false);
  }

  function handleSaveNote() {
    if (!noteDraft.trim()) return;
    addTeacherNote(childId, noteDraft.trim(), noteTags);
    setNoteDraft("");
    setNoteTags([]);
    setAddingNote(false);
  }

  function toggleNoteTag(tag: NoteTag) {
    setNoteTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "observations", label: "Observations" },
    { id: "milestones", label: "Milestones" },
    { id: "family", label: "Family" },
  ];

  // Portfolio generation moved to Documents page

  async function _handleRegenerateReport(): Promise<string | null> {
    try {
      const res = await fetch("/api/generate/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          child,
          milestones: store.milestones,
          progress: store.progress,
          sessions: store.sessions,
          observations: store.observations,
          notes: childNotes.slice(0, 5),
          snapshot,
          strategies,
          familyContext: familyCtx,
        }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.content ?? null;
    } catch {
      return null;
    }
  }

  const childClass = store.classes.find((c) => c.id === child.classId);
  const academicYear = childClass?.academicYear ?? new Date().getFullYear();

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      {/* Toast */}
      {lastLogged && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2"
          style={{
            background: "var(--color-primary)",
            color: "white",
            maxWidth: "calc(100vw - 2rem)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.25)" />
            <path
              d="M5 8l2 2 4-4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Observation logged
        </div>
      )}

      {/* Back */}
      <button
        onClick={() => {
          if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
          } else {
            router.push("/teacher/class");
          }
        }}
        className="inline-flex items-center gap-1.5 text-sm mb-5"
        style={{
          color: "var(--color-text-muted)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 11L5 7l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>

      {/* Section 1: Identity header */}
      <ChildProfileHeader child={child} completenessPercent={completeness} />

      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6"
        style={{ background: "var(--color-bg-cream)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.id ? "white" : "transparent",
              color:
                activeTab === tab.id
                  ? "var(--color-text-dark)"
                  : "var(--color-text-muted)",
              boxShadow:
                activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Overview ─────────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-5">
          {/* Section 2: Personality snapshot */}
          <div
            className="rounded-2xl border px-4 py-3.5"
            style={{ background: "#F0FAF4", borderColor: "#A8D9BC" }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2
                className="text-sm font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Personality snapshot
              </h2>
              {!editingSnapshot && (
                <button
                  onClick={() => {
                    setSnapshotDraft(snapshot?.content ?? "");
                    setEditingSnapshot(true);
                  }}
                  className="text-xs font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  {snapshot?.content ? "Edit ↗" : "Write ↗"}
                </button>
              )}
            </div>

            {editingSnapshot ? (
              <div>
                <p
                  className="text-xs mb-2"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Write 2–4 sentences. How do they approach new things? What
                  settles them? What upsets them? Who are they close to?
                </p>
                <textarea
                  value={snapshotDraft}
                  onChange={(e) => setSnapshotDraft(e.target.value)}
                  rows={4}
                  autoFocus
                  className="w-full rounded-xl border px-3 py-2 text-sm resize-none mb-3"
                  style={{
                    borderColor: "var(--color-border)",
                    background: "white",
                    color: "var(--color-text-dark)",
                  }}
                  placeholder={`Describe ${displayName}'s personality, learning style, what helps them, what upsets them, and who they're close to...`}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveSnapshot}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white"
                    style={{ background: "var(--color-primary)" }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingSnapshot(false)}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : snapshot?.content ? (
              <div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {snapshot.content}
                </p>
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Updated {formatRelativeDate(snapshot.updatedAt)}
                </p>
              </div>
            ) : (
              <p className="text-sm italic" style={{ color: "#4A9B6F" }}>
                No snapshot yet — tap Write to add one. This is the most useful
                thing you can do for a substitute teacher.
              </p>
            )}
          </div>

          {/* Section 3: Learning snapshot */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--color-border)", background: "white" }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg-cream)",
              }}
            >
              <h2
                className="text-sm font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Learning snapshot
              </h2>
            </div>
            <div
              className="divide-y"
              style={{ borderColor: "var(--color-border)" }}
            >
              {LEARNING_AREAS.map((area) => {
                const {
                  level,
                  fillPct,
                  allAreaAchieved,
                  inProgressMilestone,
                  inProgressData,
                } = getLearningSnapshotData(area.id);
                const barColor =
                  level === "S" && fillPct === 1 ? "#2D7A4F" : "#F5A623";

                return (
                  <div key={area.id} className="px-4 py-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {area.id === "SED" ? "Social & Emotional" : area.name}
                      </span>
                      <StatusBadge level={level as LevelId} />
                    </div>
                    <div
                      className="h-1.5 rounded-full mb-2 overflow-hidden"
                      style={{ background: "var(--color-bg-deep)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.round(fillPct * 100)}%`,
                          background: barColor,
                        }}
                      />
                    </div>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {allAreaAchieved ? (
                        <span style={{ color: "#2D7A4F", fontWeight: 600 }}>
                          P1 ready
                        </span>
                      ) : inProgressMilestone ? (
                        <>
                          Working on: {inProgressMilestone.statement}
                          {inProgressData && (
                            <span className="ml-1">
                              · {inProgressData.masteryCount}/
                              {inProgressData.masteryTotal}{" "}
                              {area.assessmentType === "behaviour"
                                ? "observations"
                                : "sessions"}
                            </span>
                          )}
                        </>
                      ) : (
                        `${LEVEL_LABELS[level as LevelId]} — not yet started`
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Recent activity feed */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--color-border)", background: "white" }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg-cream)",
              }}
            >
              <h2
                className="text-sm font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Recent activity
              </h2>
            </div>
            {activityFeed.length === 0 ? (
              <p
                className="px-4 py-4 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                No recent activity in the last 14 days.
              </p>
            ) : (
              <div
                className="divide-y"
                style={{ borderColor: "var(--color-border)" }}
              >
                {activityFeed.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 flex items-start gap-3"
                  >
                    <span
                      className="mt-1.5 inline-block w-2 h-2 rounded-full shrink-0"
                      style={{ background: item.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {item.text}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {formatRelativeDate(item.date)}
                        {item.sub && ` · ${item.sub}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: What works / What to watch */}
          <div
            className="rounded-2xl border px-4 py-3.5"
            style={{ borderColor: "var(--color-border)", background: "white" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2
                className="text-sm font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                What works / What to watch
              </h2>
              {!editingStrategies && (
                <button
                  onClick={() => {
                    setWhatWorksDraft(strategies?.whatWorks ?? "");
                    setWhatToWatchDraft(strategies?.whatToWatch ?? "");
                    setEditingStrategies(true);
                  }}
                  className="text-xs font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  {strategies ? "Edit ↗" : "Write ↗"}
                </button>
              )}
            </div>

            {editingStrategies ? (
              <div className="flex flex-col gap-3">
                <div>
                  <label
                    className="block text-xs font-semibold mb-1"
                    style={{ color: "var(--color-text-mid)" }}
                  >
                    What works
                  </label>
                  <p
                    className="text-xs mb-1.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    One item per line. Specific strategies that help{" "}
                    {displayName} engage or settle.
                  </p>
                  <textarea
                    value={whatWorksDraft}
                    onChange={(e) => setWhatWorksDraft(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border px-3 py-2 text-sm resize-none"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "white",
                      color: "var(--color-text-dark)",
                    }}
                    placeholder={
                      "Give her a helper role at the start of an activity\n2-minute transition warning before switching activities"
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold mb-1"
                    style={{ color: "var(--color-text-mid)" }}
                  >
                    What to watch
                  </label>
                  <p
                    className="text-xs mb-1.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    One item per line. Patterns or signals a new teacher should
                    know about.
                  </p>
                  <textarea
                    value={whatToWatchDraft}
                    onChange={(e) => setWhatToWatchDraft(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border px-3 py-2 text-sm resize-none"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "white",
                      color: "var(--color-text-dark)",
                    }}
                    placeholder="Goes quiet rather than asking for help — check in proactively when stuck"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveStrategies}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white"
                    style={{ background: "var(--color-primary)" }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingStrategies(false)}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <p
                    className="text-xs font-semibold mb-1.5 uppercase tracking-wide"
                    style={{ color: "var(--color-text-mid)" }}
                  >
                    What works
                  </p>
                  {whatWorksItems.length > 0 ? (
                    <ul className="flex flex-col gap-1.5">
                      {whatWorksItems.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "var(--color-primary)" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      className="text-sm italic"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      What strategies help {displayName} engage or settle?
                    </p>
                  )}
                </div>
                <div>
                  <p
                    className="text-xs font-semibold mb-1.5 uppercase tracking-wide"
                    style={{ color: "var(--color-text-mid)" }}
                  >
                    What to watch
                  </p>
                  {whatToWatchItems.length > 0 ? (
                    <ul className="flex flex-col gap-1.5">
                      {whatToWatchItems.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "#F5A623" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      className="text-sm italic"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Are there patterns or signals this child's teacher should
                      know about?
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section 6: Family — see Family tab */}
          <button
            onClick={() => setActiveTab("family")}
            className="rounded-2xl border px-4 py-3.5 flex items-center justify-between w-full text-left"
            style={{ borderColor: "var(--color-border)", background: "white" }}
          >
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Family &amp; contacts
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                Guardian contacts, medical notes, family context, messages
              </p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ opacity: 0.4, flexShrink: 0 }}
            >
              <path
                d="M5 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Section 7: Teacher notes log */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--color-border)", background: "white" }}
          >
            <div
              className="px-4 py-3 border-b flex items-center justify-between"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg-cream)",
              }}
            >
              <h2
                className="text-sm font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Teacher notes
              </h2>
              <button
                onClick={() => setAddingNote((v) => !v)}
                className="text-xs font-semibold px-3 py-1 rounded-lg"
                style={{
                  background: "var(--color-primary-wash)",
                  color: "var(--color-primary)",
                }}
              >
                + Add note
              </button>
            </div>

            {/* Add note inline form */}
            {addingNote && (
              <div
                className="px-4 py-4 border-b"
                style={{
                  borderColor: "var(--color-border)",
                  background: "#FAFFF9",
                }}
              >
                <textarea
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  rows={3}
                  autoFocus
                  className="w-full rounded-xl border px-3 py-2 text-sm resize-none mb-3"
                  style={{
                    borderColor: "var(--color-border)",
                    background: "white",
                    color: "var(--color-text-dark)",
                  }}
                  placeholder={`What did you notice? What happened, how ${displayName} responded, any context that would help a future teacher...`}
                />
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {ALL_NOTE_TAGS.map((tag) => {
                    const s = NOTE_TAG_STYLES[tag];
                    const selected = noteTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleNoteTag(tag)}
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium border transition-all"
                        style={{
                          background: selected ? s.bg : "white",
                          color: selected ? s.text : "var(--color-text-muted)",
                          borderColor: selected
                            ? s.text
                            : "var(--color-border)",
                        }}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
                {noteTags.includes("welfare") && (
                  <p className="text-xs mb-3" style={{ color: "#B91C1C" }}>
                    Welfare notes cannot be deleted once saved.
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveNote}
                    disabled={!noteDraft.trim()}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                    style={{ background: "var(--color-primary)" }}
                  >
                    Save note
                  </button>
                  <button
                    onClick={() => {
                      setAddingNote(false);
                      setNoteDraft("");
                      setNoteTags([]);
                    }}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Notes list */}
            {childNotes.length === 0 && !addingNote ? (
              <p
                className="px-4 py-4 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                No notes yet. Use notes to record observations, behaviour, and
                family updates.
              </p>
            ) : (
              <div
                className="divide-y"
                style={{ borderColor: "var(--color-border)" }}
              >
                {(showAllNotes ? childNotes : childNotes.slice(0, 3)).map(
                  (note) => (
                    <div
                      key={note.id}
                      className="px-4 py-3.5 flex gap-3"
                      style={
                        note.welfare
                          ? { borderLeft: "3px solid #B91C1C" }
                          : undefined
                      }
                    >
                      <div className="flex-1 min-w-0">
                        {note.tags.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                            {note.tags.map((tag) => {
                              const s = NOTE_TAG_STYLES[tag];
                              return (
                                <span
                                  key={tag}
                                  className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                                  style={{ background: s.bg, color: s.text }}
                                >
                                  {s.label}
                                </span>
                              );
                            })}
                          </div>
                        )}
                        <p
                          className="text-sm leading-snug"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          {note.content}
                        </p>
                        <p
                          className="text-xs mt-1.5"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {formatRelativeDate(note.createdAt)}
                        </p>
                      </div>
                      {!note.welfare && (
                        <button
                          onClick={() => deleteTeacherNote(note.id)}
                          className="shrink-0 text-xs mt-0.5 opacity-40 hover:opacity-100 transition-opacity"
                          style={{ color: "var(--color-text-muted)" }}
                          aria-label="Delete note"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ),
                )}
                {childNotes.length > 3 && (
                  <button
                    onClick={() => setShowAllNotes((v) => !v)}
                    className="w-full px-4 py-3 text-sm font-medium text-left"
                    style={{
                      color: "var(--color-primary)",
                      background: "var(--color-bg-cream)",
                    }}
                  >
                    {showAllNotes
                      ? "Show less"
                      : `See all ${childNotes.length} notes`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Tab: Observations ─────────────────────────────────────────────── */}
      {activeTab === "observations" && (
        <div>
          <p
            className="text-sm mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Log observed Social &amp; Emotional behaviours. One observation per
            milestone per day.
          </p>

          <div className="flex items-center gap-4 mb-4">
            {[
              { label: "Previous days", bg: "var(--color-primary)" },
              { label: "Logged today", bg: "#F5A623" },
            ].map(({ label, bg }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: bg }}
                />
                {label}
              </span>
            ))}
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border"
                style={{
                  background: "white",
                  borderColor: "var(--color-border)",
                }}
              />
              Not yet
            </span>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden bg-white">
            <div className="divide-y divide-border">
              {sedMilestones.map((milestone) => {
                const alreadyToday = todayLogged.includes(milestone.id);
                const { previousDays, hasToday } = getSEDObservationBreakdown(
                  childId,
                  milestone.id,
                  store,
                );
                const totalCount = previousDays + (hasToday ? 1 : 0);
                const achieved = totalCount >= 5;

                return (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-4 px-4 py-3.5"
                    style={{
                      background:
                        alreadyToday && !achieved ? "#FFFBF2" : undefined,
                      opacity: achieved ? 0.55 : 1,
                    }}
                  >
                    <div className="shrink-0">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const isFilled = i < totalCount;
                          const isToday =
                            isFilled && i === previousDays && hasToday;
                          return (
                            <span
                              key={i}
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                background: isFilled
                                  ? isToday
                                    ? "#F5A623"
                                    : "var(--color-primary)"
                                  : "transparent",
                                border: isFilled
                                  ? "none"
                                  : "1.5px solid var(--color-border)",
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {milestone.statement}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {totalCount}/5 observations
                        {hasToday && !achieved && " · logged today"}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {achieved ? (
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: "#E8F5EE", color: "#2D7A4F" }}
                        >
                          Achieved
                        </span>
                      ) : alreadyToday ? (
                        <button
                          onClick={() => undoObservation(childId, milestone.id)}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg border"
                          style={{
                            color: "#A06010",
                            borderColor: "#F5A623",
                            background: "#FFFBF2",
                          }}
                        >
                          Undo
                        </button>
                      ) : (
                        <button
                          onClick={() => handleObserve(milestone.id)}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg border"
                          style={{
                            color: "var(--color-primary)",
                            borderColor: "var(--color-primary)",
                            background: "var(--color-primary-wash)",
                          }}
                        >
                          Log
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Family ───────────────────────────────────────────────────── */}
      {activeTab === "family" && (
        <div className="flex flex-col gap-5">
          {/* Guardian contact */}
          {child.primaryGuardian ? (
            <div
              className="rounded-2xl border px-4 py-3.5"
              style={{
                borderColor: "var(--color-border)",
                background: "white",
              }}
            >
              <h2
                className="text-sm font-bold mb-3"
                style={{ color: "var(--color-text-dark)" }}
              >
                Family contacts
              </h2>
              <div className="flex items-center gap-3">
                <ChildAvatar name={child.primaryGuardian.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {child.primaryGuardian.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Primary contact
                  </p>
                </div>
                <div className="flex gap-2 text-xs shrink-0">
                  {child.primaryGuardian.phone && (
                    <a
                      href={`tel:${child.primaryGuardian.phone.replace(/\s+/g, "")}`}
                      className="rounded-full px-2.5 py-1 font-medium"
                      style={{
                        background: "var(--color-primary-wash)",
                        color: "var(--color-primary)",
                      }}
                    >
                      Call
                    </a>
                  )}
                  {child.primaryGuardian.email && (
                    <a
                      href={`mailto:${child.primaryGuardian.email}`}
                      className="rounded-full px-2.5 py-1 font-medium"
                      style={{ background: "#E8EFF8", color: "#3A5EA0" }}
                    >
                      Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl border px-4 py-4"
              style={{
                borderColor: "var(--color-border)",
                background: "white",
              }}
            >
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                No guardian contact details on record.
              </p>
            </div>
          )}

          {/* Allergy / medical flags */}
          {child.flags && Object.values(child.flags).some(Boolean) && (
            <div
              className="rounded-2xl border px-4 py-3.5"
              style={{ borderColor: "#F5A623", background: "#FFFBF2" }}
            >
              <h2
                className="text-sm font-bold mb-2"
                style={{ color: "#A06010" }}
              >
                Medical &amp; welfare notes
              </h2>
              {child.flags.allergy && (
                <p
                  className="text-sm mb-1"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  <strong>Allergy:</strong> {child.flags.allergy}
                </p>
              )}
              {child.flags.medicalNote && (
                <p
                  className="text-sm mb-1"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  <strong>Medical:</strong> {child.flags.medicalNote}
                </p>
              )}
              {child.flags.specialNeed && (
                <p
                  className="text-sm mb-1"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  <strong>Special need:</strong> {child.flags.specialNeed}
                </p>
              )}
              {child.flags.welfareConcern && (
                <p className="text-sm" style={{ color: "#B91C1C" }}>
                  <strong>Welfare:</strong> {child.flags.welfareConcern}
                </p>
              )}
            </div>
          )}

          {/* Family context */}
          <div
            className="rounded-2xl border px-4 py-3.5"
            style={{ background: "#FFFBF2", borderColor: "#F5A623" }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold" style={{ color: "#A06010" }}>
                Family context
              </h2>
              {!editingContext && (
                <button
                  onClick={() => {
                    setContextDraft(familyCtx?.content ?? "");
                    setEditingContext(true);
                  }}
                  className="text-xs font-medium"
                  style={{ color: "#A06010" }}
                >
                  {familyCtx?.content ? "Edit ↗" : "Write ↗"}
                </button>
              )}
            </div>
            {editingContext ? (
              <div>
                <textarea
                  value={contextDraft}
                  onChange={(e) => setContextDraft(e.target.value)}
                  rows={4}
                  autoFocus
                  className="w-full rounded-xl border px-3 py-2 text-sm resize-none mb-3"
                  style={{
                    borderColor: "#F5A623",
                    background: "white",
                    color: "var(--color-text-dark)",
                  }}
                  placeholder="E.g. parents separated, pickup schedule, cultural context, professional support..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveContext}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold"
                    style={{ background: "#F5A623", color: "white" }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingContext(false)}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : familyCtx?.content ? (
              <div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {familyCtx.content}
                </p>
                <p
                  className="text-xs mt-2"
                  style={{ color: "#A06010", opacity: 0.7 }}
                >
                  Updated {formatRelativeDate(familyCtx.updatedAt)}
                </p>
              </div>
            ) : (
              <p className="text-sm italic" style={{ color: "#A06010" }}>
                No family context note yet.
              </p>
            )}
          </div>

          {/* Link to messages */}
          <a
            href={`/teacher/messages/${childId}`}
            className="rounded-2xl border px-4 py-3.5 flex items-center justify-between"
            style={{
              borderColor: "var(--color-border)",
              background: "white",
              textDecoration: "none",
            }}
          >
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Parent messages
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                View full message thread with {displayName}'s family
              </p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ opacity: 0.4, flexShrink: 0 }}
            >
              <path
                d="M5 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      )}

      {/* ── Tab: Milestones ───────────────────────────────────────────────── */}
      {activeTab === "milestones" && (
        <div
          className="rounded-2xl p-5"
          style={{
            background: "white",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-base font-semibold mb-1"
            style={{ color: "var(--color-text-dark)" }}
          >
            Milestone progress
          </h2>
          <p
            className="text-sm mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Cumulative milestones achieved vs. expected linear progress. Tap a
            dot to see which milestone was reached.
          </p>
          <ProgressChart childId={childId} academicYear={academicYear} />
        </div>
      )}
    </div>
  );
}
