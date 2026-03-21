"use client";

import { useState } from "react";
import { TeacherNav } from "@/components/teacher/TeacherNav";
import { DemoRoleBar } from "@/components/shared/DemoRoleBar";
import { DemoPersonaBar } from "@/components/shared/DemoPersonaBar";
import { StudentSearch } from "@/components/teacher/StudentSearch";
import { QuickLogSheet } from "@/components/teacher/QuickLogSheet";
import { NotificationsPanel } from "@/components/teacher/NotificationsPanel";
import { useStore } from "@/lib/store";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { notificationsOpen, closeNotifications } = useStore();

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

      <div className="flex min-h-0 flex-1 bg-background">
        <TeacherNav />
        <main className="flex-1 min-w-0 overflow-y-auto pb-20 md:pb-0">{children}</main>
      </div>

      {/* Global quick-log sheet — accessible from any teacher route */}
      <QuickLogSheet />

      {/* Global notifications panel */}
      <NotificationsPanel open={notificationsOpen} onClose={closeNotifications} />
    </div>
  );
}
