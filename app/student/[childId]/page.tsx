"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getActivityConfig } from "@/lib/activity-data";
import { autoSelectAssignments } from "@/lib/assignments";
import { getChildLevelPerArea } from "@/lib/selectors";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { LEVEL_LABELS } from "@/lib/types";
import type { LevelId } from "@/lib/types";

const LEVEL_COLORS: Record<LevelId, { bg: string; text: string }> = {
  B: { bg: "#FEE9E5", text: "#C0432A" },
  D: { bg: "#FEF3D7", text: "#A06010" },
  S: { bg: "#E8F5EE", text: "#2D7A4F" },
};

export default function StudentActivityHomePage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
        <Link href="/student" className="mt-4 inline-block text-sm" style={{ color: "var(--color-primary)" }}>
          ← Back
        </Link>
      </div>
    );
  }

  // Get milestones for this child (LL + NUM + SED) then filter to only digital activities
  const allAssigned = autoSelectAssignments(
    childId,
    store.milestones,
    store.progress,
    store.sessions,
    store.observations
  );

  // Only LL and NUM have digital tap-to-select activities
  const digitalActivities = allAssigned.filter((m) => m.areaId !== "SED");

  const levels = getChildLevelPerArea(childId, store);

  // Check if child has a passing session today for a milestone
  const today = new Date().toISOString().slice(0, 10);
  const passedTodayIds = new Set(
    store.sessions
      .filter(
        (s) =>
          s.childId === childId &&
          s.passed &&
          s.attemptedAt.slice(0, 10) === today
      )
      .map((s) => s.milestoneId)
  );

  return (
    <div className="px-5 py-8 max-w-md mx-auto">
      {/* Back link */}
      <Link
        href="/student"
        className="inline-flex items-center gap-1 text-sm mb-6"
        style={{ color: "var(--color-text-muted)" }}
      >
        ← Back
      </Link>

      {/* Child header */}
      <div className="flex items-center gap-4 mb-6">
        <ChildAvatar name={child.name} size="lg" />
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            Hi {child.name}! 👋
          </h1>
          <div className="flex gap-2 mt-1">
            {(["LL", "NUM"] as const).map((area) => {
              const level = levels[area];
              const colors = LEVEL_COLORS[level];
              return (
                <span
                  key={area}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {area}: {LEVEL_LABELS[level]}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activities section */}
      <div>
        <h2
          className="text-sm font-semibold uppercase tracking-wide mb-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          Your activities this week
        </h2>

        {digitalActivities.length === 0 ? (
          <div
            className="rounded-xl p-5 text-center border"
            style={{
              background: "var(--color-bg-cream)",
              borderColor: "var(--color-border)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              No activities yet — check back soon!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {digitalActivities.map((milestone) => {
              const config = getActivityConfig(milestone.id);
              if (!config) return null;

              const donedToday = passedTodayIds.has(milestone.id);
              const areaColors = milestone.areaId === "LL"
                ? { bg: "#E8EFF8", text: "#3A5EA0" }
                : { bg: "#E8F5EE", text: "#2D7A4F" };

              return (
                <div
                  key={milestone.id}
                  className="rounded-2xl border overflow-hidden"
                  style={{ background: "white", borderColor: "var(--color-border)" }}
                >
                  <div className="px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{config.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="font-semibold text-base"
                              style={{ color: "var(--color-text-dark)" }}
                            >
                              {config.name}
                            </span>
                            {donedToday && (
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{ background: "#E8F5EE", color: "#2D7A4F" }}
                              >
                                ✓ Done!
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ background: areaColors.bg, color: areaColors.text }}
                            >
                              {milestone.areaId === "LL" ? "Language" : "Numeracy"}
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{
                                background: LEVEL_COLORS[milestone.levelId].bg,
                                color: LEVEL_COLORS[milestone.levelId].text,
                              }}
                            >
                              {LEVEL_LABELS[milestone.levelId]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <Link
                      href={`/student/${childId}/play/${milestone.id}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                      style={{
                        background: donedToday ? "var(--color-bg-deep)" : "var(--color-primary)",
                        color: donedToday ? "var(--color-text-mid)" : "white",
                      }}
                    >
                      {donedToday ? "Play again" : "Play →"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Encouragement footer */}
      <p
        className="text-center text-sm mt-8"
        style={{ color: "var(--color-text-muted)" }}
      >
        Keep going — you're doing great! 🌟
      </p>
    </div>
  );
}
