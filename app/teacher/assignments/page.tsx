"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import type { NurtureStore } from "@/lib/store";
import { getActiveClassChildren } from "@/lib/selectors";
import type { PlannedActivity } from "@/lib/types";
import { ActivityCard } from "@/components/teacher/ActivityCard";
import { ActivityCreator } from "@/components/teacher/ActivityCreator";

type CalendarView = "month" | "week" | "day";

// ─── Date helpers ─────────────────────────────────────────────────────────────

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromISO(s: string): Date {
  return new Date(s + "T00:00:00");
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function getMondayOf(d: Date): Date {
  const r = new Date(d);
  const day = r.getDay();
  r.setDate(r.getDate() - (day === 0 ? 6 : day - 1));
  return r;
}

function buildMonthGrid(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const start = getMondayOf(firstDay);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Area colours ─────────────────────────────────────────────────────────────

const AREA_BG: Record<string, string> = {
  LL:  "#E8F0FE",
  NUM: "#FEF3D7",
  SED: "#E8F5EE",
};
const AREA_TEXT: Record<string, string> = {
  LL:  "#3B5AC6",
  NUM: "#A06010",
  SED: "#2D7A4F",
};

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ActivitiesPage() {
  const store = useStore();
  const activeChildren = getActiveClassChildren(store);
  const todayISO = toISO(new Date());

  const [calView, setCalView] = useState<CalendarView>("week");
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [showCreator, setShowCreator] = useState(false);

  const selDateObj = fromISO(selectedDate);
  const weekMonday = getMondayOf(selDateObj);
  const year = selDateObj.getFullYear();
  const month = selDateObj.getMonth();

  function periodLabel(): string {
    if (calView === "day") {
      return selDateObj.toLocaleDateString("en-SG", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });
    }
    if (calView === "week") {
      const sun = addDays(weekMonday, 6);
      if (weekMonday.getMonth() === sun.getMonth()) {
        return `${weekMonday.getDate()}–${sun.getDate()} ${MONTH_NAMES[month]} ${year}`;
      }
      return `${weekMonday.getDate()} ${MONTH_NAMES[weekMonday.getMonth()]} – ${sun.getDate()} ${MONTH_NAMES[sun.getMonth()]} ${year}`;
    }
    return `${MONTH_NAMES[month]} ${year}`;
  }

  function navigate(dir: -1 | 1) {
    const d = fromISO(selectedDate);
    if (calView === "day") d.setDate(d.getDate() + dir);
    else if (calView === "week") d.setDate(d.getDate() + 7 * dir);
    else d.setMonth(d.getMonth() + dir);
    setSelectedDate(toISO(d));
  }

  function activitiesFor(date: string): PlannedActivity[] {
    return store.plannedActivities.filter(
      (a) => a.classId === store.activeClassId && a.date === date
    );
  }

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 flex flex-col" style={{ minHeight: 0 }}>
      {/* Page header */}
      <div className="flex items-center justify-between gap-3 mb-5 shrink-0">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          Activities
        </h1>
        <button
          onClick={() => setShowCreator(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white shrink-0"
          style={{ background: "var(--color-primary)" }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New
        </button>
      </div>

      {/* View switcher + navigation */}
      <div className="flex items-center gap-3 mb-5 shrink-0 flex-wrap">
        {/* Segmented control */}
        <div
          className="flex rounded-xl p-1 gap-0.5"
          style={{ background: "var(--color-bg-deep)" }}
        >
          {(["month", "week", "day"] as CalendarView[]).map((v) => (
            <button
              key={v}
              onClick={() => setCalView(v)}
              className="px-3.5 py-1 rounded-lg text-sm font-medium capitalize transition-all"
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

        {/* Prev / label / next */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-lg hover:bg-bg-cream transition-colors"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span
            className="text-sm font-semibold px-2 min-w-[180px] text-center"
            style={{ color: "var(--color-text-dark)" }}
          >
            {periodLabel()}
          </span>
          <button
            onClick={() => navigate(1)}
            className="p-1.5 rounded-lg hover:bg-bg-cream transition-colors"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {selectedDate !== todayISO && (
          <button
            onClick={() => setSelectedDate(todayISO)}
            className="px-3 py-1 rounded-lg text-xs font-medium"
            style={{ background: "var(--color-primary-wash)", color: "var(--color-primary)" }}
          >
            Today
          </button>
        )}
      </div>

      {/* Calendar content */}
      <div className="flex-1 overflow-auto">
        {calView === "month" && (
          <MonthView
            year={year}
            month={month}
            today={todayISO}
            selectedDate={selectedDate}
            activitiesFor={activitiesFor}
            onSelectDay={(d) => { setSelectedDate(d); setCalView("day"); }}
          />
        )}
        {calView === "week" && (
          <WeekView
            weekMonday={weekMonday}
            today={todayISO}
            selectedDate={selectedDate}
            activitiesFor={activitiesFor}
            onSelectDay={(d) => { setSelectedDate(d); setCalView("day"); }}
          />
        )}
        {calView === "day" && (
          <DayView
            activities={activitiesFor(selectedDate)}
            store={store}
            students={activeChildren}
          />
        )}
      </div>

      {/* Activity creator — modal overlay */}
      {showCreator && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowCreator(false); }}
        >
          <div className="w-full max-w-lg max-h-[92vh] overflow-auto rounded-2xl bg-white shadow-2xl">
            <div className="p-5">
              <ActivityCreator
                students={activeChildren}
                milestones={store.milestones}
                defaultDate={selectedDate}
                onSave={(activity) => {
                  store.createActivity(activity);
                  setSelectedDate(activity.date);
                  setCalView("day");
                  setShowCreator(false);
                }}
                onCancel={() => setShowCreator(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Month view ───────────────────────────────────────────────────────────────

function MonthView({
  year, month, today, selectedDate, activitiesFor, onSelectDay,
}: {
  year: number;
  month: number;
  today: string;
  selectedDate: string;
  activitiesFor: (d: string) => PlannedActivity[];
  onSelectDay: (d: string) => void;
}) {
  const grid = buildMonthGrid(year, month);

  return (
    <div className="max-w-3xl">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_SHORT.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold py-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-7 gap-px rounded-2xl overflow-hidden border"
        style={{ background: "var(--color-border)", borderColor: "var(--color-border)" }}
      >
        {grid.map((day) => {
          const iso = toISO(day);
          const inMonth = day.getMonth() === month;
          const isToday = iso === today;
          const isSelected = iso === selectedDate;
          const acts = activitiesFor(iso);

          return (
            <button
              key={iso}
              onClick={() => onSelectDay(iso)}
              className="bg-white text-left px-1.5 pt-1.5 pb-2 min-h-[76px] flex flex-col hover:bg-bg-cream transition-colors"
              style={{ opacity: inMonth ? 1 : 0.28 }}
            >
              <span
                className="text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mb-1 shrink-0"
                style={{
                  background: isToday
                    ? "var(--color-primary)"
                    : isSelected
                    ? "var(--color-primary-wash)"
                    : "transparent",
                  color: isToday
                    ? "white"
                    : isSelected
                    ? "var(--color-primary)"
                    : "var(--color-text-mid)",
                }}
              >
                {day.getDate()}
              </span>

              <div className="flex flex-col gap-0.5 w-full overflow-hidden">
                {acts.slice(0, 2).map((a) => (
                  <span
                    key={a.id}
                    className="block w-full truncate rounded px-1"
                    style={{
                      background: AREA_BG[a.areaId],
                      color: AREA_TEXT[a.areaId],
                      fontSize: "10px",
                      lineHeight: "16px",
                    }}
                  >
                    {a.title}
                  </span>
                ))}
                {acts.length > 2 && (
                  <span style={{ color: "var(--color-text-muted)", fontSize: "10px" }}>
                    +{acts.length - 2} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Week view ────────────────────────────────────────────────────────────────

function WeekView({
  weekMonday, today, selectedDate, activitiesFor, onSelectDay,
}: {
  weekMonday: Date;
  today: string;
  selectedDate: string;
  activitiesFor: (d: string) => PlannedActivity[];
  onSelectDay: (d: string) => void;
}) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekMonday, i));

  return (
    <div className="overflow-x-auto pb-4">
      <div className="grid grid-cols-7 gap-2 min-w-[560px]">
        {days.map((day, i) => {
          const iso = toISO(day);
          const isToday = iso === today;
          const isSelected = iso === selectedDate;
          const acts = activitiesFor(iso);

          return (
            <div key={iso} className="flex flex-col">
              {/* Day header */}
              <button
                onClick={() => onSelectDay(iso)}
                className="flex flex-col items-center py-2 rounded-xl mb-2 transition-colors hover:bg-bg-cream"
                style={{
                  background: isSelected && !isToday ? "var(--color-primary-wash)" : "transparent",
                }}
              >
                <span
                  className="text-xs font-medium mb-0.5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {DAY_SHORT[i]}
                </span>
                <span
                  className="text-base font-bold w-8 h-8 flex items-center justify-center rounded-full"
                  style={{
                    background: isToday ? "var(--color-primary)" : "transparent",
                    color: isToday
                      ? "white"
                      : isSelected
                      ? "var(--color-primary)"
                      : "var(--color-text-dark)",
                  }}
                >
                  {day.getDate()}
                </span>
              </button>

              {/* Activity chips */}
              <div className="space-y-1.5 flex-1">
                {acts.length === 0 ? (
                  <div
                    className="rounded-xl border border-dashed"
                    style={{ minHeight: 48, borderColor: "var(--color-border)" }}
                  />
                ) : (
                  acts.map((activity) => (
                    <div
                      key={activity.id}
                      className="rounded-lg px-2 py-2"
                      style={{ background: AREA_BG[activity.areaId] }}
                    >
                      <p
                        className="text-xs font-semibold leading-tight truncate"
                        style={{ color: AREA_TEXT[activity.areaId] }}
                      >
                        {activity.title}
                      </p>
                      <p
                        className="text-xs mt-0.5 line-clamp-2 leading-snug"
                        style={{ color: AREA_TEXT[activity.areaId], opacity: 0.7 }}
                      >
                        {activity.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Day view ─────────────────────────────────────────────────────────────────

function DayView({
  activities,
  store,
  students,
}: {
  activities: PlannedActivity[];
  store: NurtureStore;
  students: ReturnType<typeof getActiveClassChildren>;
}) {
  if (activities.length === 0) {
    return (
      <div
        className="rounded-2xl border border-dashed px-6 py-12 text-center max-w-2xl"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
          No activities scheduled for this day
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
          Tap <strong>New</strong> to add one
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-2xl">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          students={students}
          milestones={store.milestones}
          feedback={store.activityFeedback}
          onDelete={store.deleteActivity}
          onSaveFeedback={store.saveFeedback}
          onDeleteFeedback={store.deleteFeedback}
        />
      ))}
    </div>
  );
}
