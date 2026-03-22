"use client";

import { useMemo } from "react";
import { useStore } from "@/lib/store";
import {
  getCurrentPhase,
  getAttendanceSummary,
  getFlaggedChildren,
  getScheduleForToday,
  getWeeklyObservationCount,
} from "@/lib/dashboard-utils";
import { getWeekStart } from "@/lib/assignments";
import type { ObservationFeedItem } from "@/components/teacher/dashboard/ObservationsFeed";

import { TeacherClassDashboardLayout } from "@/components/teacher/dashboard/TeacherClassDashboardLayout";
import {
  ClassDashboardInsightsColumn,
  ClassDashboardMainColumn,
  ClassDashboardScheduleColumn,
} from "@/components/teacher/dashboard/ClassDashboardColumnContent";

export default function TeacherDashboard() {
  const {
    children,
    classes,
    activeClassId,
    observations,
    sessions,
    chatMessages,
    attendance,
    classSchedules,
    milestones,
    employees,
    demoPersona,
  } = useStore();

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const weekStart = getWeekStart(now);
  const phase = getCurrentPhase(now);
  const classChildren = useMemo(
    () => children.filter((c) => c.classId === activeClassId),
    [children, activeClassId]
  );

  const activeEmployee = employees.find(
    (e) => e.id === demoPersona.teacherEmployeeId
  );
  const teacherName = activeEmployee
    ? `${activeEmployee.firstName} ${activeEmployee.lastName}`.trim()
    : "Teacher";

  const attendanceSummary = useMemo(
    () => getAttendanceSummary(children, attendance, activeClassId, today),
    [children, attendance, activeClassId, today]
  );

  const flaggedChildIds = useMemo(
    () =>
      getFlaggedChildren(
        classChildren,
        observations,
        chatMessages,
        milestones,
        today
      ),
    [classChildren, observations, chatMessages, milestones, today]
  );

  const scheduleActivities = useMemo(
    () =>
      getScheduleForToday(
        classSchedules,
        classes,
        activeClassId,
        classChildren.length,
        today,
        now
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [classSchedules, classes, activeClassId, classChildren.length, today]
  );

  const observationsThisWeek = useMemo(
    () =>
      getWeeklyObservationCount(
        observations,
        children,
        activeClassId,
        weekStart
      ),
    [observations, children, activeClassId, weekStart]
  );

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
        return {
          observation: o,
          child,
          milestone,
          teacherName,
        } as ObservationFeedItem;
      })
      .filter((x): x is ObservationFeedItem => x !== null);
  }, [observations, classChildIds, children, milestoneMap, teacherName]);

  const insightStats = {
    presentCount: attendanceSummary.present,
    totalCount: attendanceSummary.total,
    activitiesToday: scheduleActivities.length,
    observationsThisWeek,
    flaggedCount: flaggedChildIds.size,
    absentNames: attendanceSummary.absentNames,
  };

  return (
    <TeacherClassDashboardLayout
      schedule={
        <ClassDashboardScheduleColumn
          scheduleActivities={scheduleActivities}
          classChildren={classChildren}
          milestones={milestones}
          sessions={sessions}
          observations={observations}
        />
      }
      main={
        <ClassDashboardMainColumn
          attendance={attendanceSummary}
          classChildren={classChildren}
          observationsThisWeek={observationsThisWeek}
        />
      }
      insights={
        <ClassDashboardInsightsColumn
          phase={phase}
          insightStats={insightStats}
          teacherName={teacherName}
          classChildren={classChildren}
          observations={observations}
          sessions={sessions}
          milestones={milestones}
          weekStart={weekStart}
          recentObservationItems={recentObservationItems}
        />
      }
    />
  );
}
