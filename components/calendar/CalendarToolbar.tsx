"use client";

import type { CalendarView } from "@/lib/calendar-utils";

export function CalendarToolbar({
  calView,
  setCalView,
  periodLabel,
  onPrev,
  onNext,
  showToday,
  onToday,
  compact = false,
}: {
  calView: CalendarView;
  setCalView: (v: CalendarView) => void;
  periodLabel: string;
  onPrev: () => void;
  onNext: () => void;
  showToday: boolean;
  onToday: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"} mb-4 shrink-0 flex-wrap`}>
      {/* View switcher */}
      <div
        className="flex rounded-xl gap-0.5"
        style={{ background: "var(--color-bg-deep)", padding: compact ? "2px" : "4px" }}
      >
        {(["month", "week", "day"] as CalendarView[]).map((v) => (
          <button
            key={v}
            onClick={() => setCalView(v)}
            className={`rounded-lg font-medium capitalize transition-all ${compact ? "px-3 py-1 text-xs" : "px-3.5 py-1 text-sm"}`}
            style={{
              background: calView === v ? "white" : "transparent",
              color: calView === v ? "var(--color-text-dark)" : "var(--color-text-muted)",
              boxShadow: calView === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Prev / label / Next */}
      <div className={`flex items-center gap-1 ${compact ? "flex-1 justify-center" : ""}`}>
        <button onClick={onPrev} className="p-1.5 rounded-lg" aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span
          className="text-sm font-semibold text-center"
          style={{
            color: "var(--color-text-dark)",
            minWidth: compact ? 160 : 200,
            paddingInline: compact ? 4 : 8,
          }}
        >
          {periodLabel}
        </span>
        <button onClick={onNext} className="p-1.5 rounded-lg" aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Today shortcut */}
      {showToday && (
        <button
          onClick={onToday}
          className={`rounded-lg text-xs font-medium ${compact ? "px-2.5 py-1" : "px-3 py-1"}`}
          style={{ background: "var(--color-primary-wash)", color: "var(--color-primary)" }}
        >
          Today
        </button>
      )}
    </div>
  );
}
