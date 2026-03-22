"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import {
  getProgressBarFill,
  getProgressBarColor,
  getWorkingOnText,
  getRecencyLabel,
} from "@/lib/parent-summary";
import { getChildLevelPerArea, getP1ReadinessSnapshot } from "@/lib/selectors";
import { LEARNING_AREAS, LEVEL_LABELS, type LevelId } from "@/lib/types";

const LEVEL_BADGE: Record<LevelId, { bg: string; text: string }> = {
  B: { bg: "#FAECE7", text: "#712B13" },
  D: { bg: "#FAEEDA", text: "#633806" },
  S: { bg: "#EAF3DE", text: "#27500A" },
};

export default function AreaIndexPage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
        <Link
          href="/parent"
          className="mt-4 inline-block text-sm"
          style={{ color: "var(--color-primary)" }}
        >
          ← Back
        </Link>
      </div>
    );
  }

  const childName = getChildDisplayName(child);
  const levels = getChildLevelPerArea(childId, store);

  const { achieved: achievedCount, total: totalMilestones } =
    getP1ReadinessSnapshot(childId, store);

  return (
    <div className="px-4 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Link
          href={`/parent/${childId}`}
          className="text-sm"
          style={{ color: "var(--color-primary)" }}
        >
          ← Back
        </Link>
        <h1
          className="font-medium"
          style={{ fontSize: 18, color: "var(--color-text-dark)" }}
        >
          {`${childName}'s progress`}
        </h1>
      </div>

      {/* P1 summary */}
      <div
        className="rounded-2xl border px-4 py-3 mb-5 flex items-center justify-between"
        style={{
          background: "var(--color-primary-wash)",
          borderColor: "var(--color-primary)",
        }}
      >
        <p style={{ fontSize: 13, color: "var(--color-text-dark)" }}>
          <span className="font-semibold">{achievedCount}</span> of{" "}
          {totalMilestones} milestones achieved
        </p>
        <Link
          href={`/parent/${childId}/p1`}
          style={{ fontSize: 12, color: "var(--color-primary)" }}
        >
          P1 readiness →
        </Link>
      </div>

      {/* Area cards */}
      <div className="flex flex-col gap-3 mb-5">
        {LEARNING_AREAS.map((area) => {
          const level = levels[area.id];
          const badge = LEVEL_BADGE[level];
          const fill = getProgressBarFill(
            store.milestones,
            store.progress,
            childId,
            area.id,
          );
          const barColor = getProgressBarColor(level);
          const workingOn = getWorkingOnText(
            store.milestones,
            store.progress,
            store.sessions,
            store.observations,
            childId,
            area.id,
          );
          const recency = getRecencyLabel(
            store.sessions,
            store.observations,
            store.milestones,
            childId,
            area.id,
          );

          return (
            <Link
              key={area.id}
              href={`/parent/${childId}/area/${area.id}`}
              className="block rounded-2xl border p-4 transition-colors active:opacity-80"
              style={{
                background: "white",
                borderColor: "var(--color-border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--color-bg-cream)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "white";
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-medium"
                  style={{ fontSize: 14, color: "var(--color-text-dark)" }}
                >
                  {area.name}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: badge.bg, color: badge.text }}
                >
                  {LEVEL_LABELS[level]}
                </span>
              </div>

              <div
                className="w-full rounded-full overflow-hidden mb-3"
                style={{ height: 6, background: "var(--color-bg-deep)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${fill}%`, background: barColor }}
                />
              </div>

              <p
                className="text-xs mb-1 leading-relaxed"
                style={{ color: "var(--color-text-mid)" }}
              >
                <span
                  className="font-medium"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  Working on:{" "}
                </span>
                {workingOn}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                Last activity: {recency}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
