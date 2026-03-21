"use client";

import { useMemo } from "react";
import { useStore } from "@/lib/store";
import {
  getCurrentPhase,
  getAttendanceSummary,
  getWeeklyDomainCoverage,
  getFlaggedChildren,
  getScheduleForToday,
  getWeeklyObservationCount,
} from "@/lib/dashboard-utils";
import { getWeekStart } from "@/lib/assignments";
import type { LearningAreaId } from "@/lib/types";
import type { ObservationFeedItem } from "@/components/teacher/dashboard/ObservationsFeed";

import { DashboardTopBar } from "@/components/teacher/dashboard/DashboardTopBar";
import { StatStrip } from "@/components/teacher/dashboard/StatStrip";
import { ChildrenGrid } from "@/components/teacher/dashboard/ChildrenGrid";
import { ScheduleTimeline } from "@/components/teacher/dashboard/ScheduleTimeline";
import { AIInsightCard } from "@/components/teacher/dashboard/AIInsightCard";
import { QuickActionsGrid } from "@/components/teacher/dashboard/QuickActionsGrid";
import { DomainSnapshot } from "@/components/teacher/dashboard/DomainSnapshot";
import { ObservationsFeed } from "@/components/teacher/dashboard/ObservationsFeed";
import { Card, CardContent } from "@/components/ui/card";

export default function TeacherDashboard() {
  const {
    children,
    classes,
    activeClassId,
    setActiveClass,
    observations,
    sessions,
    chatMessages,
    attendance,
    classSchedules,
    milestones,
    employees,
    demoPersona,
    openQuickLog,
    openNotifications,
  } = useStore();

  // ── Derived state ──────────────────────────────────────────────────────────
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const weekStart = getWeekStart(now);
  const phase = getCurrentPhase(now);
  const classChildren = useMemo(
    () => children.filter((c) => c.classId === activeClassId),
    [children, activeClassId]
  );

  // Active teacher name
  const activeEmployee = employees.find(
    (e) => e.id === demoPersona.teacherEmployeeId
  );
  const teacherName = activeEmployee
    ? `${activeEmployee.firstName} ${activeEmployee.lastName}`.trim()
    : "Teacher";

  // Attendance
  const attendanceSummary = useMemo(
    () => getAttendanceSummary(children, attendance, activeClassId, today),
    [children, attendance, activeClassId, today]
  );

  // Weekly domain coverage per child
  const weeklyDomainCoverage = useMemo(() => {
    const result: Record<string, Record<LearningAreaId, boolean>> = {};
    for (const child of classChildren) {
      result[child.id] = getWeeklyDomainCoverage(
        child.id,
        observations,
        sessions,
        milestones,
        weekStart
      );
    }
    return result;
  }, [classChildren, observations, sessions, milestones, weekStart]);

  // Flagged children
  const flaggedChildIds = useMemo(
    () => getFlaggedChildren(classChildren, observations, chatMessages, milestones, today),
    [classChildren, observations, chatMessages, milestones, today]
  );

  // Today's schedule
  const scheduleActivities = useMemo(
    () => getScheduleForToday(classSchedules, classes, activeClassId, classChildren.length, today, now),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [classSchedules, classes, activeClassId, classChildren.length, today]
  );
  const activitiesCompleted = scheduleActivities.filter((a) => a.status === "done").length;
  const activitiesRemaining = scheduleActivities.filter((a) => a.status !== "done").length;

  // Weekly observation count
  const observationsThisWeek = useMemo(
    () => getWeeklyObservationCount(observations, children, activeClassId, weekStart),
    [observations, children, activeClassId, weekStart]
  );

  // Recent observations feed (last 5 for this class)
  const classChildIds = useMemo(
    () => new Set(classChildren.map((c) => c.id)),
    [classChildren]
  );
  const milestoneMap = useMemo(
    () => new Map(milestones.map((m) => [m.id, m])),
    [milestones]
  );

  const recentObservationItems = useMemo((): ObservationFeedItem[] => {
    return observations
      .filter((o) => classChildIds.has(o.childId))
      .sort((a, b) => b.observedAt.localeCompare(a.observedAt))
      .slice(0, 5)
      .map((o) => {
        const child = children.find((c) => c.id === o.childId);
        const milestone = milestoneMap.get(o.milestoneId);
        if (!child || !milestone) return null;
        return { observation: o, child, milestone, teacherName } as ObservationFeedItem;
      })
      .filter((x): x is ObservationFeedItem => x !== null);
  }, [observations, classChildIds, children, milestoneMap, teacherName]);

  // Notification count (For You: unread messages + flagged children + draft-ready reports)
  const unreadMessageThreads = useMemo(() => {
    const threads = new Set<string>();
    for (const m of chatMessages) {
      if (m.senderType === "parent" && !m.readAt && classChildIds.has(m.childId)) {
        threads.add(m.childId);
      }
    }
    return threads.size;
  }, [chatMessages, classChildIds]);

  const notificationCount = unreadMessageThreads + flaggedChildIds.size;

  // Insight stats
  const insightStats = {
    presentCount: attendanceSummary.present,
    totalCount: attendanceSummary.total,
    activitiesToday: scheduleActivities.length,
    observationsThisWeek,
    flaggedCount: flaggedChildIds.size,
    absentNames: attendanceSummary.absentNames,
  };

  // Right column sections — shared between desktop and mobile renders
  const rightColumnContent = (
    <>
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
    </>
  );

  return (
    <div className="flex h-full flex-col">
      {/* Dashboard-local top bar */}
      <DashboardTopBar
        teacherName={teacherName}
        today={now}
        classes={classes}
        activeClassId={activeClassId}
        onClassChange={setActiveClass}
        onQuickLogOpen={openQuickLog}
        onNotificationsOpen={openNotifications}
        notificationCount={notificationCount}
      />

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5">
        {/* Quick actions — full-width single row */}
        <div className="mx-auto mb-4 max-w-[1280px]">
          <QuickActionsGrid onLogObservation={openQuickLog} />
        </div>

        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
          {/* Left column (~65%) — always visible */}
          <div className="flex min-w-0 flex-[65_1_0%] flex-col gap-4">
            <DashboardSectionCard>
              <StatStrip
                present={attendanceSummary.present}
                total={attendanceSummary.total}
                pending={attendanceSummary.pending}
                activitiesCompleted={activitiesCompleted}
                activitiesRemaining={activitiesRemaining}
                observationsThisWeek={observationsThisWeek}
                needsAttentionCount={flaggedChildIds.size}
                absentNames={attendanceSummary.absentNames}
              />
            </DashboardSectionCard>

            <DashboardSectionCard>
              <ChildrenGrid
                students={classChildren}
                attendance={attendance}
                weeklyDomainCoverage={weeklyDomainCoverage}
                flaggedChildIds={flaggedChildIds}
                today={today}
              />
            </DashboardSectionCard>

            <DashboardSectionCard>
              <ScheduleTimeline activities={scheduleActivities} />
            </DashboardSectionCard>

            {/* Mobile: right column stacked below left column */}
            <div className="flex flex-col gap-4 lg:hidden">{rightColumnContent}</div>
          </div>

          {/* Right column (~35%) — desktop only */}
          <div className="hidden min-w-0 flex-[35_1_0%] flex-col gap-4 lg:flex">
            {rightColumnContent}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSectionCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="shadow-none">
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}
