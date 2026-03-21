"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
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
    <div className="max-w-4xl px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-2 text-2xl font-bold text-foreground">Activities</h1>
      <p className="text-muted-foreground mb-6 text-sm">
        NEL-aligned tap-to-select activities, grouped by subject and sorted by proficiency. Edit name, emoji, skills trained, and question content.
      </p>

      <div className="flex flex-col gap-8">
        {bySubject.map(({ areaId, label, activities }) => (
          <div key={areaId}>
            <h2 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
              {label}
            </h2>
            <Card className="overflow-hidden p-0 shadow-none">
              <ul className="divide-border divide-y">
                {activities.map((a) => (
                  <li key={a.milestoneId}>
                    <Link
                      href={`/school/activities/${a.milestoneId}/edit`}
                      className="hover:bg-accent/50 flex items-center gap-4 px-4 py-4 transition-colors"
                    >
                      <span className="shrink-0 text-2xl">{a.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground">{a.name}</p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                          {a.milestoneId}
                          {a.isDynamic ? " · Dynamic (name-based)" : ` · ${a.questionCount} questions`}
                          {a.skills.length > 1 && ` · Trains: ${a.skills.join(", ")}`}
                          {a.hasOverride && " · Edited"}
                        </p>
                      </div>
                      <ChevronRight className="text-muted-foreground size-4 shrink-0 opacity-50" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
