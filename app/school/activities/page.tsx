"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { ACTIVITY_CONFIGS } from "@/lib/activity-data";
import { LEARNING_AREAS } from "@/lib/types";
import type { LearningAreaId, LevelId } from "@/lib/types";
import { useMemo } from "react";

const LEVEL_ORDER: Record<LevelId, number> = { B: 1, D: 2, S: 3 };

export default function AdminActivitiesPage() {
  const { activityConfigOverrides, milestones } = useStore();

  const bySubject = useMemo(() => {
    const withMeta = ACTIVITY_CONFIGS.map((config) => {
      const overridden = activityConfigOverrides[config.milestoneId];
      const display = overridden ?? config;
      const milestone = milestones.find((m) => m.id === config.milestoneId);
      const areaId = (milestone?.areaId ?? "LL") as LearningAreaId;
      const levelId = (milestone?.levelId ?? "B") as LevelId;
      const sequence = milestone?.sequence ?? 0;
      const skills = display.skillMilestoneIds ?? [config.milestoneId];
      return {
        milestoneId: config.milestoneId,
        name: display.name,
        emoji: display.emoji,
        isDynamic: display.isDynamic,
        questionCount: display.questions?.length ?? 0,
        hasOverride: !!overridden,
        areaId,
        levelId,
        sequence,
        skills,
      };
    });
    const sorted = [...withMeta].sort((a, b) => {
      if (a.areaId !== b.areaId) return a.areaId.localeCompare(b.areaId);
      if (a.levelId !== b.levelId) return LEVEL_ORDER[a.levelId] - LEVEL_ORDER[b.levelId];
      return a.sequence - b.sequence;
    });
    const groups: { areaId: LearningAreaId; label: string; activities: typeof sorted }[] = [];
    for (const area of LEARNING_AREAS) {
      const activities = sorted.filter((a) => a.areaId === area.id);
      if (activities.length > 0) {
        groups.push({ areaId: area.id, label: area.name, activities });
      }
    }
    return groups;
  }, [activityConfigOverrides, milestones]);

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-dark)" }}>
        Activities
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
        NEL-aligned tap-to-select activities, grouped by subject and sorted by proficiency. Edit name, emoji, skills trained, and question content.
      </p>

      <div className="flex flex-col gap-8">
        {bySubject.map(({ areaId, label, activities }) => (
          <div key={areaId}>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--color-text-muted)" }}>
              {label}
            </h2>
            <div className="rounded-2xl border overflow-hidden bg-white" style={{ borderColor: "var(--color-border)" }}>
              <ul className="divide-y divide-border">
                {activities.map((a) => (
                  <li key={a.milestoneId}>
                    <Link
                      href={`/school/activities/${a.milestoneId}/edit`}
                      className="flex items-center gap-4 px-4 py-4 hover:bg-bg-cream transition-colors"
                    >
                      <span className="text-2xl shrink-0">{a.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                          {a.name}
                        </p>
                        <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                          {a.milestoneId}
                          {a.isDynamic ? " · Dynamic (name-based)" : ` · ${a.questionCount} questions`}
                          {a.skills.length > 1 && ` · Trains: ${a.skills.join(", ")}`}
                          {a.hasOverride && " · Edited"}
                        </p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-40">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
