"use client";

import { useState, useMemo } from "react";
import { TeacherNav } from "@/components/teacher/TeacherNav";
import { DemoRoleBar } from "@/components/shared/DemoRoleBar";
import { DemoPersonaBar } from "@/components/shared/DemoPersonaBar";
import { StudentSearch } from "@/components/teacher/StudentSearch";
import { QuickLogSheet } from "@/components/teacher/QuickLogSheet";
import { NotificationsPanel } from "@/components/teacher/NotificationsPanel";
import { DashboardTopBar } from "@/components/teacher/dashboard/DashboardTopBar";
import { useStore } from "@/lib/store";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const {
    notificationsOpen,
    closeNotifications,
    classes,
    activeClassId,
    setActiveClass,
    employees,
    demoPersona,
    chatMessages,
    children: classChildren,
    openQuickLog,
    openNotifications,
  } = useStore();

  const activeEmployee = employees.find((e) => e.id === demoPersona.teacherEmployeeId);
  const teacherName = activeEmployee
    ? `${activeEmployee.firstName} ${activeEmployee.lastName}`.trim()
    : "Teacher";

  const notificationCount = useMemo(() => {
    const classChildIds = new Set(
      classChildren.filter((c) => c.classId === activeClassId).map((c) => c.id)
    );
    const unreadThreads = new Set<string>();
    for (const m of chatMessages) {
      if (m.senderType === "parent" && !m.readAt && classChildIds.has(m.childId)) {
        unreadThreads.add(m.childId);
      }
    }
    return unreadThreads.size;
  }, [chatMessages, classChildren, activeClassId]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DemoRoleBar activeRole="teacher" />
      <DemoPersonaBar role="teacher" />

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setMobileSearchOpen(false)}
        >
          <div
            className="bg-white px-4 pt-4 pb-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <StudentSearch
                  autoFocus
                  onClose={() => setMobileSearchOpen(false)}
                />
              </div>
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="text-sm font-medium shrink-0"
                style={{ color: "var(--color-text-mid)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <DashboardTopBar
        teacherName={teacherName}
        today={new Date()}
        classes={classes}
        activeClassId={activeClassId}
        onClassChange={setActiveClass}
        onQuickLogOpen={openQuickLog}
        onNotificationsOpen={openNotifications}
        notificationCount={notificationCount}
      />

      <div className="flex min-h-0 flex-1 items-stretch bg-background">
        <TeacherNav />
        {/*
          Outer main: no document scroll — height is capped so nested columns can use overflow-y-auto.
          Inner: default scroll for single-column pages; split layouts use flex-1 min-h-0 to fill.
        */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pb-20 md:pb-0">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            {children}
          </div>
        </main>
      </div>

      {/* Global quick-log sheet — accessible from any teacher route */}
      <QuickLogSheet />

      {/* Global notifications panel */}
      <NotificationsPanel open={notificationsOpen} onClose={closeNotifications} />
    </div>
  );
}
