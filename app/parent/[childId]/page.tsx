"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getPronounFromGender } from "@/lib/display-name";
import {
  getHeroSummary,
  getHomeActivityFeed,
  getISOWeekStartMonday,
  getProgressBarFill,
  getProgressBarColor,
  getWorkingOnText,
  getRecencyLabel,
} from "@/lib/parent-summary";
import { ParentActivityFeedRow } from "@/components/parent/ParentActivityFeedRow";
import { getChildLevelPerArea, getP1ReadinessSnapshot } from "@/lib/selectors";
import {
  LEARNING_AREAS,
  LEVEL_LABELS,
  type ActivitySession,
  type ChildMilestoneProgress,
  type LearningAreaId,
  type LevelId,
  type Milestone,
  type TeacherObservation,
} from "@/lib/types";
import { PARENT_HOME_SPOTLIGHT_GROUP_ACTIVITY_ID } from "@/lib/parent-group-activities";

// ─── Greeting ─────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const LEVEL_BADGE: Record<LevelId, { bg: string; text: string }> = {
  B: { bg: "#FAECE7", text: "#712B13" },
  D: { bg: "#FAEEDA", text: "#633806" },
  S: { bg: "#EAF3DE", text: "#27500A" },
};

function ParentHeroCard({ summary }: { summary: string }) {
  return (
    <div
      className="rounded-2xl px-4 py-3.5 mb-5"
      style={{
        background: "#EAF3DE",
        border: "1px solid #97C459",
      }}
    >
      <p
        className="font-medium uppercase mb-2"
        style={{
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "#3B6D11",
        }}
      >
        This week
      </p>
      <p
        className="leading-relaxed"
        style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.55,
          color: "#27500A",
        }}
      >
        {summary}
      </p>
    </div>
  );
}

function ParentLearningAreaGrid({
  childId,
  milestones,
  progress,
  sessions,
  observations,
  levels,
}: {
  childId: string;
  milestones: Milestone[];
  progress: ChildMilestoneProgress[];
  sessions: ActivitySession[];
  observations: TeacherObservation[];
  levels: Record<LearningAreaId, LevelId>;
}) {
  return (
    <section className="mb-5">
      <p
        className="font-medium uppercase mb-2"
        style={{
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "var(--color-text-muted)",
        }}
      >
        Learning areas
      </p>
      <div className="grid grid-cols-2 gap-2">
        {LEARNING_AREAS.map((area) => {
          const level = levels[area.id];
          const badge = LEVEL_BADGE[level];
          const fill = getProgressBarFill(milestones, progress, childId, area.id);
          const barColor = getProgressBarColor(level);
          const workingOn = getWorkingOnText(
            milestones,
            progress,
            sessions,
            observations,
            childId,
            area.id
          );
          const recency = getRecencyLabel(
            sessions,
            observations,
            milestones,
            childId,
            area.id
          );

          return (
            <Link
              key={area.id}
              href={`/parent/${childId}/area/${area.id}`}
              className="flex h-full min-w-0 flex-col rounded-xl border p-2.5 transition-colors active:opacity-80"
              style={{
                background: "white",
                borderColor: "var(--color-border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--color-bg-cream)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "white";
              }}
            >
              <p
                className="font-medium leading-snug mb-1.5 line-clamp-3"
                style={{ fontSize: 14, color: "var(--color-text-dark)" }}
              >
                {area.name}
              </p>
              <span
                className="self-start rounded-full font-medium px-1.5 py-0.5 mb-2 max-w-full truncate"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.02em",
                  background: badge.bg,
                  color: badge.text,
                }}
              >
                {LEVEL_LABELS[level]}
              </span>
              <div
                className="w-full rounded-full overflow-hidden mb-2 shrink-0"
                style={{ height: 6, background: "var(--color-bg-deep)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${fill}%`, background: barColor }}
                />
              </div>
              <p
                className="leading-snug flex-1 min-h-0 mb-1"
                style={{ fontSize: 12, color: "var(--color-text-mid)" }}
              >
                <span className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                  Working on:{" "}
                </span>
                <span className="line-clamp-3">{workingOn}</span>
              </p>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", lineHeight: 1.35 }}>
                Last activity: {recency}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function HomeLearningCard({ childId }: { childId: string }) {
  return (
    <Link
      href={`/parent/${childId}/activities/group/${PARENT_HOME_SPOTLIGHT_GROUP_ACTIVITY_ID}`}
      className="block rounded-2xl border p-4 mb-5 transition-colors active:opacity-80"
      style={{ background: "#F0F7FF", borderColor: "#BDD8F5" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ fontSize: 18 }}>🏠</span>
        <p
          className="font-semibold uppercase tracking-wide"
          style={{ fontSize: 11, letterSpacing: "0.06em", color: "#1A5FA8" }}
        >
          Activity for today
        </p>
      </div>

      <p className="font-medium mb-1" style={{ fontSize: 14, color: "#0D3B6E" }}>
        Tell me a story about your day
      </p>
      <p style={{ fontSize: 13, color: "#2D6CB5", lineHeight: 1.55 }}>
        Supports language &amp; early literacy · About 10 minutes · No materials needed
      </p>

      <div className="mt-4 flex justify-end">
        <span
          className="rounded-full px-4 py-1.5 font-medium"
          style={{ background: "#1A5FA8", color: "white", fontSize: 13 }}
        >
          See full activity
        </span>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ParentHomePage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
        <Link href="/parent" className="mt-4 inline-block text-sm" style={{ color: "var(--color-primary)" }}>
          ← Back
        </Link>
      </div>
    );
  }

  const pronoun = getPronounFromGender(child.gender);
  const dashboardTitle = `${child.firstName}'s dashboard`;
  const heroSummary = getHeroSummary(
    child.firstName,
    pronoun,
    childId,
    store.sessions,
    store.progress,
    store.milestones,
    getISOWeekStartMonday()
  );
  const levelsByArea = getChildLevelPerArea(childId, store);
  const p1Snapshot = getP1ReadinessSnapshot(childId, store);

  const activityFeed = getHomeActivityFeed(
    childId,
    child.firstName,
    store.sessions,
    store.progress,
    store.milestones,
    store.chatMessages,
    store.teachers,
    store.dailyUpdates,
    store.observations,
    3
  );

  return (
    <div className="px-4 py-5">

      {/* Greeting + hero (parent dashboard spec) */}
      <div className="mb-4">
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          {getGreeting()}
        </p>
        <h1
          className="font-medium leading-tight mt-0.5"
          style={{ fontSize: 22, color: "var(--color-text-dark)" }}
        >
          {dashboardTitle}
        </h1>
      </div>

      <ParentHeroCard summary={heroSummary} />

      <HomeLearningCard childId={childId} />

      <ParentLearningAreaGrid
        childId={childId}
        milestones={store.milestones}
        progress={store.progress}
        sessions={store.sessions}
        observations={store.observations}
        levels={levelsByArea}
      />

      {/* P1 readiness (spec: below learning areas, before feed) */}
      <Link
        href={`/parent/${childId}/p1`}
        className="flex items-center justify-between rounded-2xl border px-4 py-3 mb-5 transition-colors active:opacity-80"
        style={{
          background: "var(--color-primary-wash)",
          borderColor: "var(--color-primary)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "#DCEEE4";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background =
            "var(--color-primary-wash)";
        }}
      >
        <div>
          <p
            className="font-medium uppercase mb-0.5"
            style={{
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--color-text-muted)",
            }}
          >
            P1 readiness
          </p>
          <p style={{ fontSize: 13, color: "var(--color-text-dark)" }}>
            <span className="font-medium">{p1Snapshot.achieved}</span>
            {" of "}
            {p1Snapshot.total} milestones achieved
          </p>
        </div>
        <span style={{ fontSize: 13, color: "var(--color-primary)" }}>
          See details →
        </span>
      </Link>

      {/* Activity feed (spec: section label + up to 3 items) */}
      <section className="mb-5">
        <div className="flex items-end justify-between gap-3 mb-2">
          <p
            className="font-medium uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--color-text-muted)",
            }}
          >
            This week
          </p>
          <Link
            href={`/parent/${childId}/feed`}
            className="shrink-0 text-xs font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            See all
          </Link>
        </div>
        {activityFeed.length === 0 ? (
          <div
            className="rounded-xl border px-4 py-5"
            style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
          >
            <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.6 }}>
              {`Nothing logged yet this week. ${child.firstName}'s activity queue is ready whenever they are.`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {activityFeed.map((item) => (
              <ParentActivityFeedRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
