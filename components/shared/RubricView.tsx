"use client";

import { useState } from "react";
import { MILESTONES } from "@/lib/seed-data";
import {
  LEARNING_AREAS,
  DEVELOPMENTAL_LEVELS,
  LEVEL_LABELS,
  type LearningAreaId,
  type LevelId,
} from "@/lib/types";

const LEVEL_BADGE: Record<LevelId, { bg: string; text: string; border: string }> = {
  B: { bg: "#FAECE7", text: "#712B13", border: "#F4C4B2" },
  D: { bg: "#FAEEDA", text: "#633806", border: "#F0D4A4" },
  S: { bg: "#EAF3DE", text: "#27500A", border: "#C0DDA0" },
};

const LEVEL_DESCRIPTIONS: Record<LevelId, string> = {
  B: "Earliest observable skills — the foundational concepts children build everything on.",
  D: "Core knowledge consolidating — children are applying skills with support.",
  S: "Consistent independent mastery — children are Primary 1 ready in this area.",
};

const AREA_ICONS: Record<LearningAreaId, string> = {
  LL: "📖",
  NUM: "🔢",
  SED: "💛",
  ACE: "🎨",
  DOW: "🔬",
  HMS: "🏃",
};

export function RubricView() {
  const [activeAreaId, setActiveAreaId] = useState<LearningAreaId>("LL");

  const activeArea = LEARNING_AREAS.find((a) => a.id === activeAreaId)!;
  const areaMilestones = MILESTONES.filter((m) => m.areaId === activeAreaId);

  return (
    <div>
      {/* Area selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {LEARNING_AREAS.map((area) => {
            const active = area.id === activeAreaId;
            return (
              <button
                key={area.id}
                onClick={() => setActiveAreaId(area.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border"
                style={{
                  background: active ? "var(--color-primary)" : "white",
                  color: active ? "white" : "var(--color-text-mid)",
                  borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                }}
              >
                <span>{AREA_ICONS[area.id]}</span>
                <span className="hidden sm:inline">{area.name}</span>
                <span className="sm:hidden">{area.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Area header */}
      <div className="mb-6">
        <h2
          className="text-lg font-semibold mb-1"
          style={{ color: "var(--color-text-dark)" }}
        >
          {AREA_ICONS[activeAreaId]} {activeArea.name}
        </h2>
        <p className="text-sm" style={{ color: "var(--color-text-mid)" }}>
          Assessed via{" "}
          {activeArea.assessmentType === "skill"
            ? "in-app activities (skill-based)"
            : "teacher observation (behaviour-based)"}
          {" · "}{areaMilestones.length} milestones
        </p>
      </div>

      {/* Levels */}
      <div className="flex flex-col gap-6">
        {DEVELOPMENTAL_LEVELS.map((level) => {
          const levelMilestones = areaMilestones
            .filter((m) => m.levelId === level.id)
            .sort((a, b) => a.sequence - b.sequence);
          if (levelMilestones.length === 0) return null;

          const badge = LEVEL_BADGE[level.id];

          return (
            <div key={level.id}>
              {/* Level header */}
              <div
                className="rounded-xl px-4 py-3 mb-3 border"
                style={{ background: badge.bg, borderColor: badge.border }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: badge.text, color: "white" }}
                  >
                    {LEVEL_LABELS[level.id]}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: badge.text }}
                  >
                    {levelMilestones.length} milestone{levelMilestones.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-xs" style={{ color: badge.text, opacity: 0.8 }}>
                  {LEVEL_DESCRIPTIONS[level.id]}
                </p>
              </div>

              {/* Milestones */}
              <div className="flex flex-col gap-2">
                {levelMilestones.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border px-4 py-3 bg-white"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span
                        className="text-xs font-mono px-1.5 py-0.5 rounded shrink-0 mt-0.5"
                        style={{
                          background: "var(--color-bg-deep)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {m.id}
                      </span>
                      <p
                        className="text-sm font-medium leading-snug"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {m.statement}
                      </p>
                    </div>
                    <div
                      className="pl-2 border-l-2 ml-1"
                      style={{ borderColor: badge.border }}
                    >
                      <p
                        className="text-xs font-medium mb-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Look for:
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--color-text-mid)" }}
                      >
                        {m.teacherNotes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
