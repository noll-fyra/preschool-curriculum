"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName, getPronounFromGender } from "@/lib/display-name";
import { LEARNING_AREAS } from "@/lib/types";

export default function P1ReadinessPage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
        <Link href="/parent" style={{ color: "var(--color-primary)" }}>
          ← Back
        </Link>
      </div>
    );
  }

  const totalMilestones = store.milestones.length;
  const achievedAll = store.progress.filter(
    (p) => p.childId === childId && p.status === "achieved",
  ).length;

  // Per area breakdown
  const areaStats = LEARNING_AREAS.map((area) => {
    const areaMilestones = store.milestones.filter((m) => m.areaId === area.id);
    const total = areaMilestones.length;
    const achieved = areaMilestones.filter((m) =>
      store.progress.some(
        (p) =>
          p.childId === childId &&
          p.milestoneId === m.id &&
          p.status === "achieved",
      ),
    ).length;
    const inProgress = areaMilestones.filter((m) =>
      store.progress.some(
        (p) =>
          p.childId === childId &&
          p.milestoneId === m.id &&
          p.status === "in_progress",
      ),
    ).length;
    return { area, total, achieved, inProgress };
  });

  // On-track check: ≥50% of total milestones achieved
  const isOnTrack = achievedAll / totalMilestones >= 0.5;

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      {/* Back */}
      <Link
        href={`/parent/${childId}`}
        className="inline-flex items-center gap-1 text-sm mb-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        ← Home
      </Link>

      <h1
        className="font-medium mb-4"
        style={{ fontSize: 22, color: "var(--color-text-dark)" }}
      >
        P1 readiness
      </h1>

      {/* Intro paragraph — "There's no rush" must remain */}
      <p
        className="leading-relaxed mb-5"
        style={{ fontSize: 13, color: "var(--color-text-mid)" }}
      >
        This shows how {getChildDisplayName(child)} is progressing toward the
        skills expected at the start of Primary 1. There's no rush —{" "}
        {getPronounFromGender(child.gender) === "they"
          ? "they have"
          : getPronounFromGender(child.gender) === "he"
            ? "he has"
            : "she has"}{" "}
        time. This is a guide, not a test.
      </p>

      {/* Three area progress cards */}
      <div className="flex flex-col gap-3 mb-5">
        {areaStats.map(({ area, total, achieved, inProgress }) => {
          const fillPct = total > 0 ? Math.round((achieved / total) * 100) : 0;
          return (
            <div
              key={area.id}
              className="rounded-2xl border p-4"
              style={{
                background: "white",
                borderColor: "var(--color-border)",
              }}
            >
              <p
                className="font-medium mb-2"
                style={{ fontSize: 13, color: "var(--color-text-dark)" }}
              >
                {area.name}
              </p>
              <div
                className="w-full rounded-full overflow-hidden mb-2"
                style={{ height: 8, background: "var(--color-bg-deep)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${fillPct}%`, background: "#639922" }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="font-medium"
                  style={{ fontSize: 13, color: "#27500A" }}
                >
                  {achieved} of {total} milestones achieved
                </span>
                {inProgress > 0 && (
                  <span
                    style={{ fontSize: 12, color: "var(--color-text-muted)" }}
                  >
                    {inProgress} in progress
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calibrating note */}
      <div
        className="rounded-2xl border p-4"
        style={{
          background: "var(--color-bg-cream)",
          borderColor: "var(--color-border)",
        }}
      >
        <p
          className="leading-relaxed"
          style={{ fontSize: 13, color: "var(--color-text-mid)" }}
        >
          These milestones represent what children typically know and are able
          to do by the end of Kindergarten 2 — aligned to Singapore's NEL
          Framework.{" "}
          {isOnTrack ? (
            <span style={{ color: "var(--color-text-dark)", fontWeight: 500 }}>
              {getChildDisplayName(child)} is on track.
            </span>
          ) : (
            <span style={{ color: "var(--color-text-mid)" }}>
              Ms Priya can discuss {getChildDisplayName(child)}'s progress in
              more detail at your next check-in.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
