"use client";

import Link from "next/link";
import { useState } from "react";

import type {
  Child,
  TeacherObservation,
  ActivitySession,
  Milestone,
} from "@/lib/types";
import type {
  AttendanceSummary,
  DayPhase,
  InsightStats,
  ScheduleActivity,
} from "@/lib/dashboard-utils";
import type { ObservationFeedItem } from "@/components/teacher/dashboard/ObservationsFeed";

import { StatStrip } from "@/components/teacher/dashboard/StatStrip";
import { ChildrenGrid } from "@/components/teacher/dashboard/ChildrenGrid";
import { ScheduleTimeline } from "@/components/teacher/dashboard/ScheduleTimeline";
import { AIInsightCard } from "@/components/teacher/dashboard/AIInsightCard";
import { DomainSnapshot } from "@/components/teacher/dashboard/DomainSnapshot";
import { ObservationsFeed } from "@/components/teacher/dashboard/ObservationsFeed";
import { DashboardSectionCard } from "@/components/teacher/dashboard/DashboardSectionCard";
import { StartPersonalisedLessonsModal } from "@/components/teacher/dashboard/StartPersonalisedLessonsModal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COLUMN_STACK = "flex flex-col gap-4";

// ─── Schedule column ───────────────────────────────────────────────────────────

export type ClassDashboardScheduleColumnProps = {
  scheduleActivities: ScheduleActivity[];
  classChildren: Child[];
  milestones: Milestone[];
  sessions: ActivitySession[];
  observations: TeacherObservation[];
};

export function ClassDashboardScheduleColumn({
  scheduleActivities,
  classChildren,
  milestones,
  sessions,
  observations,
}: ClassDashboardScheduleColumnProps) {
  const [personalisedOpen, setPersonalisedOpen] = useState(false);

  return (
    <div className={COLUMN_STACK}>
      <DashboardSectionCard>
        <div className="flex min-w-0 flex-col gap-3">
          <button
            type="button"
            onClick={() => setPersonalisedOpen(true)}
            className={cn(
              buttonVariants({ variant: "secondary", size: "default" }),
              "flex h-9 w-full min-w-0 shrink-0 items-center justify-center"
            )}
          >
            Start personalised lessons
          </button>
          <Link
            href="/teacher/calendar"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "flex h-9 w-full min-w-0 shrink-0 items-center justify-center no-underline"
            )}
          >
            Plan a lesson
          </Link>
          <ScheduleTimeline activities={scheduleActivities} />
        </div>
      </DashboardSectionCard>
      <StartPersonalisedLessonsModal
        open={personalisedOpen}
        onClose={() => setPersonalisedOpen(false)}
        classChildren={classChildren}
        milestones={milestones}
        sessions={sessions}
        observations={observations}
      />
    </div>
  );
}

// ─── Main column ─────────────────────────────────────────────────────────────

export type ClassDashboardMainColumnProps = {
  attendance: AttendanceSummary;
  classChildren: Child[];
  observationsThisWeek: number;
};

export function ClassDashboardMainColumn({
  attendance,
  classChildren,
  observationsThisWeek,
}: ClassDashboardMainColumnProps) {
  return (
    <div className={COLUMN_STACK}>
      <DashboardSectionCard>
        <StatStrip
          present={attendance.present}
          total={attendance.total}
          pending={attendance.pending}
          observationsThisWeek={observationsThisWeek}
          absentNames={attendance.absentNames}
        />
      </DashboardSectionCard>
      <DashboardSectionCard>
        <ChildrenGrid students={classChildren} />
      </DashboardSectionCard>
    </div>
  );
}

// ─── Insights column ─────────────────────────────────────────────────────────

export type ClassDashboardInsightsColumnProps = {
  phase: DayPhase;
  insightStats: InsightStats;
  teacherName: string;
  classChildren: Child[];
  observations: TeacherObservation[];
  sessions: ActivitySession[];
  milestones: Milestone[];
  weekStart: string;
  recentObservationItems: ObservationFeedItem[];
};

export function ClassDashboardInsightsColumn({
  phase,
  insightStats,
  teacherName,
  classChildren,
  observations,
  sessions,
  milestones,
  weekStart,
  recentObservationItems,
}: ClassDashboardInsightsColumnProps) {
  return (
    <div className={COLUMN_STACK}>
      <DashboardSectionCard>
        <AIInsightCard phase={phase} stats={insightStats} teacherName={teacherName} />
      </DashboardSectionCard>
      <DashboardSectionCard>
        <DomainSnapshot
          classChildren={classChildren}
          observations={observations}
          sessions={sessions}
          milestones={milestones}
          weekStart={weekStart}
        />
      </DashboardSectionCard>
      <DashboardSectionCard>
        <ObservationsFeed items={recentObservationItems} />
      </DashboardSectionCard>
    </div>
  );
}
