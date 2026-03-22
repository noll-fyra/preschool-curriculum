"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getMilestoneProgressForChild } from "@/lib/selectors";
import { getChildDisplayName } from "@/lib/display-name";
import { MILESTONES } from "@/lib/seed-data";
import {
  LEARNING_AREAS,
  DEVELOPMENTAL_LEVELS,
  LEVEL_LABELS,
  type LearningAreaId,
  type LevelId,
  type MilestoneStatus,
} from "@/lib/types";

const LEVEL_BADGE: Record<LevelId, { bg: string; text: string; border: string }> = {
  B: { bg: "#FAECE7", text: "#712B13", border: "#F4C4B2" },
  D: { bg: "#FAEEDA", text: "#633806", border: "#F0D4A4" },
  S: { bg: "#EAF3DE", text: "#27500A", border: "#C0DDA0" },
};

const LEVEL_EXPLAINER: Record<LevelId, string> = {
  B: "Beginning — the earliest skills, building the foundation",
  D: "Developing — consolidating core skills, applying with some support",
  S: "Secure — consistent independent mastery, Primary 1 ready",
};

function StatusDot({ status }: { status: MilestoneStatus | "locked" }) {
  if (status === "achieved") {
    return (
      <div
        className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
        style={{ background: "#EAF3DE" }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#27500A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    );
  }
  if (status === "in_progress") {
    return (
      <div
        className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
        style={{ background: "#FAEEDA" }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: "#EF9F27" }} />
      </div>
    );
  }
  return (
    <div
      className="w-5 h-5 rounded-full shrink-0"
      style={{ background: "var(--color-bg-deep)", border: "1.5px solid var(--color-border)" }}
    />
  );
}

export default function ParentRubricPage() {
  const params = useParams();
  const childId = params.childId as string;
  const areaId = params.areaId as LearningAreaId;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  if (!child) return null;

  const area = LEARNING_AREAS.find((a) => a.id === areaId);
  if (!area) return null;

  const allProgress = getMilestoneProgressForChild(childId, store);
  const progressById = new Map(allProgress.map((p) => [p.id, p.status]));

  const areaMilestones = MILESTONES.filter((m) => m.areaId === areaId);
  const childName = getChildDisplayName(child);

  return (
    <div className="px-4 py-5">
      {/* Back */}
      <Link
        href={`/parent/${childId}/area/${areaId}`}
        className="inline-flex items-center gap-1 text-sm mb-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        ← Back
      </Link>

      {/* Title */}
      <h1
        className="font-semibold mb-1"
        style={{ fontSize: 20, color: "var(--color-text-dark)" }}
      >
        {area.name}
      </h1>
      <p
        className="text-sm mb-5 leading-relaxed"
        style={{ color: "var(--color-text-mid)" }}
      >
        What {childName} is working toward across all three levels in this area.
      </p>

      {/* Legend */}
      <div
        className="flex items-center gap-4 text-xs mb-6 px-3 py-2 rounded-xl"
        style={{ background: "var(--color-bg-cream)", color: "var(--color-text-muted)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#EAF3DE" }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#27500A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          Achieved
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#FAEEDA" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#EF9F27" }} />
          </div>
          In progress
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full" style={{ background: "var(--color-bg-deep)", border: "1.5px solid var(--color-border)" }} />
          Not yet started
        </div>
      </div>

      {/* Levels */}
      {DEVELOPMENTAL_LEVELS.map((level) => {
        const levelMilestones = areaMilestones
          .filter((m) => m.levelId === level.id)
          .sort((a, b) => a.sequence - b.sequence);
        if (levelMilestones.length === 0) return null;

        const badge = LEVEL_BADGE[level.id];

        return (
          <div key={level.id} className="mb-6">
            {/* Level header */}
            <div
              className="rounded-xl px-3 py-2.5 mb-3 border"
              style={{ background: badge.bg, borderColor: badge.border }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: badge.text }}
              >
                {LEVEL_EXPLAINER[level.id]}
              </span>
            </div>

            {/* Milestones */}
            <div className="flex flex-col gap-2">
              {levelMilestones.map((m) => {
                const status = (progressById.get(m.id) ?? "not_started") as MilestoneStatus;

                return (
                  <div
                    key={m.id}
                    className="rounded-xl border bg-white px-3 py-3"
                    style={{
                      borderColor: status === "in_progress" ? "#EF9F27" : "var(--color-border)",
                      background: status === "in_progress" ? "#FFFDF8" : "white",
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <StatusDot status={status} />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium leading-snug mb-1"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          {m.statement}
                        </p>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "var(--color-text-mid)" }}
                        >
                          {m.parentDescription}
                        </p>
                        {status === "in_progress" && (
                          <span
                            className="inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "#FAEEDA", color: "#633806" }}
                          >
                            {childName} is working on this now
                          </span>
                        )}
                        {status === "achieved" && (
                          <span
                            className="inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "#EAF3DE", color: "#27500A" }}
                          >
                            Achieved ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
