"use client";

import type { ReactNode } from "react";

export type TeacherClassDashboardLayoutProps = {
  /** First column: today's schedule */
  schedule: ReactNode;
  /** Second column: stats strip and children grid */
  main: ReactNode;
  /** Third column: AI insight, domain snapshot, observations feed */
  insights: ReactNode;
};

/**
 * Class dashboard shell — rebuilt for predictable scroll regions.
 *
 * - **< md:** One vertical scroll (schedule → main → insights).
 * - **md+:** Three equal columns (1fr / 1fr / 1fr), each with its own vertical scroll.
 */
export function TeacherClassDashboardLayout({
  schedule,
  main,
  insights,
}: TeacherClassDashboardLayoutProps) {
  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden">
      {/* Mobile: single scroller. Desktop: grid with per-column scroll. */}
      <div
        className={
          "flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-4 pt-4 pb-6 " +
          "md:grid md:grid-cols-3 md:grid-rows-[minmax(0,1fr)] " +
          "md:gap-5 md:overflow-hidden md:px-5 md:pt-4 md:pb-5"
        }
      >
        <aside
          className="min-w-0 shrink-0 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:pr-1"
          aria-label="Today's schedule"
        >
          {schedule}
        </aside>

        <div className="min-w-0 shrink-0 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:px-0.5">
          {main}
        </div>

        <aside
          className="min-w-0 shrink-0 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:pl-1"
          aria-label="Class insights"
        >
          {insights}
        </aside>
      </div>
    </div>
  );
}
