"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName, getPronounFromGender } from "@/lib/display-name";
import { getMilestoneProgressForChild } from "@/lib/selectors";
import { getMilestoneContent } from "@/lib/milestone-content";
import { getTimeAgoLabel } from "@/lib/parent-summary";
import { LEARNING_AREAS, LEVEL_LABELS, type LearningAreaId, type LevelId } from "@/lib/types";

// ─── Spec colours ──────────────────────────────────────────────────────────────

const LEVEL_BADGE: Record<LevelId, { bg: string; text: string }> = {
  B: { bg: "#FAECE7", text: "#712B13" },
  D: { bg: "#FAEEDA", text: "#633806" },
  S: { bg: "#EAF3DE", text: "#27500A" },
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MilestoneDetailPage() {
  const params = useParams();
  const childId = params.childId as string;
  const areaId = params.areaId as LearningAreaId;
  const milestoneId = params.milestoneId as string;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  const allProgress = getMilestoneProgressForChild(childId, store);
  const milestone = allProgress.find((m) => m.id === milestoneId);
  const area = LEARNING_AREAS.find((a) => a.id === areaId);
  const content = getMilestoneContent(milestoneId);

  if (!child || !milestone || !area) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Milestone not found.</p>
        <Link href={`/parent/${childId}/area/${areaId}`} style={{ color: "var(--color-primary)" }}>
          ← Back
        </Link>
      </div>
    );
  }

  const isSED = areaId === "SED";
  const isAchieved = milestone.status === "achieved";
  const isInProgress = milestone.status === "in_progress";
  const badge = LEVEL_BADGE[milestone.levelId];

  // Recent sessions for skill milestones (last 4, most recent first)
  const recentSessions = !isSED
    ? [...store.sessions]
        .filter((s) => s.childId === childId && s.milestoneId === milestoneId)
        .sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime())
        .slice(0, 4)
    : [];

  // Next milestone in sequence (for "now that X, working on Y" connection)
  const areaMilestones = store.milestones
    .filter((m) => m.areaId === areaId)
    .sort((a, b) => {
      const levelOrder = { B: 0, D: 1, S: 2 };
      return (
        levelOrder[a.levelId] - levelOrder[b.levelId] ||
        a.sequence - b.sequence
      );
    });
  const currentIndex = areaMilestones.findIndex((m) => m.id === milestoneId);
  const nextMilestone = areaMilestones[currentIndex + 1];

  // Remaining sessions needed (skill only)
  const remaining =
    !isSED && isInProgress
      ? Math.max(0, milestone.masteryTotal - milestone.masteryCount)
      : 0;

  function formatSessionDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-SG", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      {/* Back */}
      <Link
        href={`/parent/${childId}/area/${areaId}`}
        className="inline-flex items-center gap-1 text-sm mb-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        ← {area.name}
      </Link>

      {/* Header block */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: "var(--color-text-muted)", letterSpacing: "0.06em" }}
          >
            {area.name}
          </span>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>·</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: badge.bg, color: badge.text }}
          >
            {LEVEL_LABELS[milestone.levelId]}
          </span>
        </div>

        <h1
          className="font-medium leading-snug mb-3"
          style={{ fontSize: 18, color: "var(--color-text-dark)" }}
        >
          {milestone.statement}
        </h1>

        {/* Status */}
        {isAchieved && milestone.achievedAt && (
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "#EAF3DE", border: "1px solid #97C459" }}
          >
            <span style={{ fontSize: 12, color: "#27500A", fontWeight: 500 }}>
              ✓ Achieved · {getTimeAgoLabel(milestone.achievedAt)}
            </span>
          </div>
        )}

        {/* Mastery progress for in-progress */}
        {isInProgress && (
          <div>
            {isSED ? (
              // SED: bar only, no count shown to parents
              <div>
                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{ height: 6, background: "var(--color-bg-deep)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(milestone.masteryCount / milestone.masteryTotal) * 100}%`,
                      background: "#EF9F27",
                    }}
                  />
                </div>
                <p className="mt-1 text-xs" style={{ color: "#633806" }}>
                  In progress
                </p>
              </div>
            ) : (
              // Skill: dots + count label
              <div className="flex items-center gap-1.5 flex-wrap">
                {Array.from({ length: milestone.masteryTotal }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      background: i < milestone.masteryCount ? "#EF9F27" : "var(--color-bg-deep)",
                    }}
                  />
                ))}
                <span
                  className="ml-1 text-xs font-medium"
                  style={{ color: "#633806" }}
                >
                  {milestone.masteryCount} of {milestone.masteryTotal} passing sessions
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* "Why this matters" card — always shown */}
      {content && (
        <div
          className="rounded-2xl border p-4 mb-4"
          style={{ background: "#E6F1FB", borderColor: "#85B7EB" }}
        >
          <p
            className="font-medium uppercase tracking-wide mb-2"
            style={{ fontSize: 11, letterSpacing: "0.06em", color: "#0C447C" }}
          >
            Why this matters
          </p>
          <p style={{ fontSize: 13, color: "#042C53", lineHeight: 1.6 }}>
            {content.whyMatters}
          </p>
        </div>
      )}

      {/* "Try at home" card — in-progress only */}
      {content && !isAchieved && (
        <div
          className="rounded-2xl border p-4 mb-4"
          style={{ background: "#FAEEDA", borderColor: "#EF9F27" }}
        >
          <p
            className="font-medium uppercase tracking-wide mb-2"
            style={{ fontSize: 11, letterSpacing: "0.06em", color: "#633806" }}
          >
            Try at home
          </p>
          <p style={{ fontSize: 13, color: "#412402", lineHeight: 1.6 }}>
            {content.tryAtHome}
          </p>
        </div>
      )}

      {/* Contextual next-milestone connection — achieved only */}
      {isAchieved && nextMilestone && (
        <div
          className="rounded-2xl border p-4 mb-4"
          style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
        >
          <p style={{ fontSize: 13, color: "var(--color-text-mid)", lineHeight: 1.6 }}>
            Now that {getChildDisplayName(child)} has achieved this, {getPronounFromGender(child.gender) === "they" ? "they are" : getPronounFromGender(child.gender) === "he" ? "he is" : "she is"} ready to start working on:{" "}
            <span style={{ color: "var(--color-text-dark)", fontWeight: 500 }}>
              {nextMilestone.parentDescription}
            </span>
          </p>
        </div>
      )}

      {/* Session history — skill milestones only, never for SED */}
      {!isSED && recentSessions.length > 0 && (
        <div
          className="rounded-2xl border p-4 mb-4"
          style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
        >
          <p
            className="font-medium uppercase tracking-wide mb-3"
            style={{ fontSize: 11, letterSpacing: "0.06em", color: "var(--color-text-muted)" }}
          >
            Recent activity results
          </p>
          <div className="flex flex-col gap-2">
            {recentSessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <span style={{ fontSize: 12, color: "var(--color-text-mid)" }}>
                  {formatSessionDate(s.attemptedAt)}
                </span>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 12, color: "var(--color-text-mid)" }}>
                    {s.score}/3
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={
                      s.passed
                        ? { background: "#EAF3DE", color: "#27500A" }
                        : { background: "#FAEEDA", color: "#633806" }
                    }
                  >
                    {s.passed ? "✓ Pass" : "· Retry"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer note — in-progress skill milestones only */}
      {!isSED && isInProgress && remaining > 0 && (
        <p
          className="text-center"
          style={{ fontSize: 13, color: "var(--color-text-muted)" }}
        >
          {remaining} more passing {remaining === 1 ? "session" : "sessions"} will achieve this milestone
          {nextMilestone ? ` and unlock: ${nextMilestone.parentDescription.toLowerCase()}` : ""}.
        </p>
      )}
    </div>
  );
}
