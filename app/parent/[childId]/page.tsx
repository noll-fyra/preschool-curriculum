"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import {
  getProgressBarFill,
  getProgressBarColor,
  getWorkingOnText,
  getRecencyLabel,
  getFeedItems,
  getHeroSummary,
} from "@/lib/parent-summary";
import { getChildLevelPerArea } from "@/lib/selectors";
import { getWeekStart } from "@/lib/assignments";
import { LEARNING_AREAS, LEVEL_LABELS, type LearningAreaId, type LevelId } from "@/lib/types";

// ─── Spec colour system ───────────────────────────────────────────────────────

const LEVEL_BADGE: Record<LevelId, { bg: string; text: string }> = {
  B: { bg: "#FAECE7", text: "#712B13" },
  D: { bg: "#FAEEDA", text: "#633806" },
  S: { bg: "#EAF3DE", text: "#27500A" },
};

// ─── Greeting ─────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// ─── Feed item icon ───────────────────────────────────────────────────────────

function FeedIcon({ type }: { type: "activity" | "milestone" }) {
  if (type === "milestone") {
    return (
      <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-sm"
        style={{ background: "#EAF3DE" }}>
        ⭐
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-sm"
      style={{ background: "#E6F1FB" }}>
      ✅
    </div>
  );
}

// ─── Feed timestamp ───────────────────────────────────────────────────────────

function formatFeedTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const then = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.floor((today.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));

  const time = d.toLocaleTimeString("en-SG", { hour: "numeric", minute: "2-digit", hour12: true });
  if (diff === 0) return `Today, ${time}`;
  if (diff === 1) return `Yesterday, ${time}`;
  return d.toLocaleDateString("en-SG", { day: "numeric", month: "short" }) + `, ${time}`;
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

  const levels = getChildLevelPerArea(childId, store);
  const weekStart = getWeekStart();
  const feedItems = getFeedItems(childId, store.sessions, store.progress, store.milestones);
  const heroText = getHeroSummary(
    child.name,
    child.pronoun,
    childId,
    store.sessions,
    store.progress,
    store.milestones,
    weekStart
  );

  const totalMilestones = store.milestones.length;
  const achievedCount = store.progress.filter(
    (p) => p.childId === childId && p.status === "achieved"
  ).length;

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">

      {/* 1. Greeting */}
      <div className="mb-5">
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {getGreeting()}
        </p>
        <h1
          className="font-medium leading-tight mt-0.5"
          style={{ fontSize: 22, color: "var(--color-text-dark)" }}
        >
          {child.name}&apos;s dashboard
        </h1>
      </div>

      {/* 2. Hero card — emotional headline first */}
      <div
        className="rounded-2xl border p-4 mb-5"
        style={{ background: "#EAF3DE", borderColor: "#97C459" }}
      >
        <p
          className="font-medium uppercase tracking-wide mb-2"
          style={{ fontSize: 11, letterSpacing: "0.06em", color: "#3B6D11" }}
        >
          This week
        </p>
        <p style={{ fontSize: 14, color: "#27500A", lineHeight: 1.6 }}>
          {heroText}
        </p>
      </div>

      {/* 3. Learning areas */}
      <p
        className="font-medium uppercase tracking-wide mb-3"
        style={{ fontSize: 11, letterSpacing: "0.06em", color: "var(--color-text-muted)" }}
      >
        Learning areas
      </p>

      <div className="flex flex-col gap-3 mb-5">
        {LEARNING_AREAS.map((area) => {
          const level = levels[area.id];
          const badge = LEVEL_BADGE[level];
          const fill = getProgressBarFill(store.milestones, store.progress, childId, area.id);
          const barColor = getProgressBarColor(level);
          const workingOn = getWorkingOnText(
            store.milestones,
            store.progress,
            store.sessions,
            store.observations,
            childId,
            area.id
          );
          const recency = getRecencyLabel(
            store.sessions,
            store.observations,
            store.milestones,
            childId,
            area.id
          );

          return (
            <Link
              key={area.id}
              href={`/parent/${childId}/area/${area.id}`}
              className="block rounded-2xl border p-4 transition-colors active:opacity-80"
              style={{ background: "white", borderColor: "var(--color-border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-bg-cream)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "white";
              }}
            >
              {/* Area name + level badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium" style={{ fontSize: 14, color: "var(--color-text-dark)" }}>
                  {area.name}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: badge.bg, color: badge.text }}
                >
                  {LEVEL_LABELS[level]}
                </span>
              </div>

              {/* Gestural progress bar — no percentage label */}
              <div
                className="w-full rounded-full overflow-hidden mb-3"
                style={{ height: 6, background: "var(--color-bg-deep)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${fill}%`, background: barColor }}
                />
              </div>

              {/* Working on + recency */}
              <p className="text-xs mb-1 leading-relaxed" style={{ color: "var(--color-text-mid)" }}>
                <span className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                  Working on:{" "}
                </span>
                {workingOn}
              </p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Last activity: {recency}
              </p>
            </Link>
          );
        })}
      </div>

      {/* 4. Activity feed */}
      <p
        className="font-medium uppercase tracking-wide mb-3"
        style={{ fontSize: 11, letterSpacing: "0.06em", color: "var(--color-text-muted)" }}
      >
        This week
      </p>

      {feedItems.length === 0 ? (
        <div
          className="rounded-2xl border p-5 mb-5 text-center"
          style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
        >
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.6 }}>
            Nothing logged yet this week. {child.name}&apos;s activity queue is ready whenever{" "}
            {child.pronoun === "they" ? "they are" : `${child.pronoun === "he" ? "he" : "she"} is`}.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mb-5">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-xl border px-3 py-3"
              style={{ background: "white", borderColor: "var(--color-border)" }}
            >
              <FeedIcon type={item.icon} />
              <div className="flex-1 min-w-0">
                <p className="font-medium" style={{ fontSize: 13, color: "var(--color-text-dark)" }}>
                  {item.title}
                </p>
                <p
                  className="mt-0.5 leading-snug"
                  style={{ fontSize: 12, color: "var(--color-text-mid)" }}
                >
                  {item.subtitle}
                </p>
                <p className="mt-1" style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                  {formatFeedTime(item.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. P1 readiness banner */}
      <Link
        href={`/parent/${childId}/p1`}
        className="flex items-center justify-between rounded-xl border px-4 py-3 transition-colors active:opacity-80"
        style={{ background: "white", borderColor: "var(--color-border)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-bg-cream)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "white";
        }}
      >
        <div>
          <p className="font-medium uppercase tracking-wide" style={{ fontSize: 11, letterSpacing: "0.06em", color: "var(--color-text-muted)" }}>
            P1 readiness
          </p>
          <p className="font-medium mt-0.5" style={{ fontSize: 13, color: "var(--color-text-dark)" }}>
            {achievedCount} of {totalMilestones} milestones achieved
          </p>
        </div>
        <span style={{ fontSize: 13, color: "var(--color-primary)" }}>
          See details →
        </span>
      </Link>

    </div>
  );
}
