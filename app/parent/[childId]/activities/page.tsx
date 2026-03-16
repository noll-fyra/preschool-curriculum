"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { autoSelectAssignments } from "@/lib/assignments";
import { getActivityConfig } from "@/lib/activity-data";
import { LEVEL_LABELS, type LevelId } from "@/lib/types";

const LEVEL_COLORS: Record<LevelId, { bg: string; text: string }> = {
  B: { bg: "#FAECE7", text: "#712B13" },
  D: { bg: "#FAEEDA", text: "#633806" },
  S: { bg: "#EAF3DE", text: "#27500A" },
};

const AREA_COLORS: Record<string, { bg: string; text: string }> = {
  LL:  { bg: "#E8EFF8", text: "#3A5EA0" },
  NUM: { bg: "#E8F5EE", text: "#2D7A4F" },
};

export default function ParentActivitiesPage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
      </div>
    );
  }

  const allAssigned = autoSelectAssignments(
    childId,
    store.milestones,
    store.progress,
    store.sessions,
    store.observations
  );
  const digitalActivities = allAssigned.filter((m) => m.areaId !== "SED");

  const today = new Date().toISOString().slice(0, 10);
  const passedTodayIds = new Set(
    store.sessions
      .filter((s) => s.childId === childId && s.passed && s.attemptedAt.slice(0, 10) === today)
      .map((s) => s.milestoneId)
  );

  const himHer =
    child.pronoun === "he" ? "him" : child.pronoun === "she" ? "her" : "them";

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1
          className="font-medium"
          style={{ fontSize: 22, color: "var(--color-text-dark)" }}
        >
          Activities
        </h1>
        <p className="mt-1" style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          {child.name}&apos;s personalised queue — updated weekly by the class teacher.
        </p>
      </div>

      {digitalActivities.length === 0 ? (
        <div
          className="rounded-2xl border p-5 text-center"
          style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
        >
          <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
            No activities assigned yet — check back soon.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {digitalActivities.map((milestone) => {
            const config = getActivityConfig(milestone.id);
            if (!config) return null;

            const doneToday = passedTodayIds.has(milestone.id);
            const areaColors = AREA_COLORS[milestone.areaId] ?? { bg: "#E8F5EE", text: "#2D7A4F" };
            const levelColors = LEVEL_COLORS[milestone.levelId];

            return (
              <div
                key={milestone.id}
                className="rounded-2xl border overflow-hidden"
                style={{
                  background: doneToday ? "#EAF3DE" : "white",
                  borderColor: doneToday ? "#97C459" : "var(--color-border)",
                }}
              >
                <div className="px-4 py-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{config.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="font-medium"
                          style={{ fontSize: 14, color: "var(--color-text-dark)" }}
                        >
                          {config.name}
                        </span>
                        {doneToday && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: "#EAF3DE", color: "#27500A" }}
                          >
                            ✓ Completed today
                          </span>
                        )}
                        {!doneToday && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: "var(--color-bg-deep)", color: "var(--color-text-muted)" }}
                          >
                            Ready to play
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: areaColors.bg, color: areaColors.text }}
                        >
                          {milestone.areaId === "LL" ? "Language" : "Numeracy"}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: levelColors.bg, color: levelColors.text }}
                        >
                          {LEVEL_LABELS[milestone.levelId]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <Link
                    href={`/student/${childId}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
                    style={{
                      background: doneToday ? "var(--color-bg-deep)" : "var(--color-primary)",
                      color: doneToday ? "var(--color-text-mid)" : "white",
                      fontSize: 14,
                    }}
                  >
                    {doneToday ? "Play again" : `Let ${child.name} play →`}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tone note */}
      <p
        className="text-center mt-5"
        style={{ fontSize: 13, color: "var(--color-text-muted)" }}
      >
        Tap an activity to start it with {child.name}, or let {himHer} tap it alone.
      </p>
    </div>
  );
}
