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
      <SectionCard>
        <AIInsightCard phase={phase} stats={insightStats} teacherName={teacherName} />
      </SectionCard>
      <SectionCard>
        <DomainSnapshot
          classChildren={classChildren}
          observations={observations}
          sessions={sessions}
          milestones={milestones}
          weekStart={weekStart}
        />
      </SectionCard>
      <SectionCard>
        <ObservationsFeed items={recentObservationItems} />
      </SectionCard>
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {/* Quick actions — full-width single row */}
        <div style={{ maxWidth: 1280, margin: "0 auto 16px" }}>
          <QuickActionsGrid onLogObservation={openQuickLog} />
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          {/* Left column (~65%) — always visible */}
          <div
            style={{
              flex: "65 1 0%",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <SectionCard>
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
            </SectionCard>

            <SectionCard>
              <ChildrenGrid
                children={classChildren}
                attendance={attendance}
                weeklyDomainCoverage={weeklyDomainCoverage}
                flaggedChildIds={flaggedChildIds}
                today={today}
              />
            </SectionCard>

            <SectionCard>
              <ScheduleTimeline activities={scheduleActivities} />
            </SectionCard>

            {/* Mobile: right column stacked below left column */}
            <div className="lg:hidden flex flex-col gap-4">
              {rightColumnContent}
            </div>
          </div>

          {/* Right column (~35%) — desktop only */}
          <div
            className="hidden lg:flex"
            style={{
              flex: "35 1 0%",
              minWidth: 0,
              flexDirection: "column",
              gap: 16,
            }}
          >
            {rightColumnContent}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: "16px",
        border: "1px solid var(--color-border)",
      }}
    >
      {children}
    </div>
  );
}
