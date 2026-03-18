"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import type { NurtureStore } from "@/lib/store";
import type { CalendarHoliday, ClassSchedule, YearLevelId } from "@/lib/types";
import {
  holidaysOnDate, schedulesOnDate, schedulesForClass,
  holidayColor, scheduleColor,
  toISO, fromISO, addDays, getMondayOf, buildMonthGrid, parseTime,
  MONTH_NAMES, DAY_SHORT,
  YEAR_LEVEL_COLORS, CLASS_SCHED_COLOR, HOLIDAY_ORG_COLOR,
  WEEKDAYS, CalendarView, DetailEvent, clampToYear,
} from "@/lib/calendar-utils";
import { TimeGrid } from "@/components/calendar/TimeGrid";
import type { TimeColumn, TimedEvent, AllDayEvent } from "@/components/calendar/TimeGrid";
import { CalendarToolbar } from "@/components/calendar/CalendarToolbar";
import { ReadOnlyEventDetailModal } from "@/components/calendar/ReadOnlyEventDetailModal";

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ParentCalendarPage() {
  const params = useParams();
  const childId = params.childId as string;
  const { calendarHolidays, classSchedules, children, classes } = useStore();

  const child = children.find((c) => c.id === childId);
  const activeClass = classes.find((c) => c.id === child?.classId);

  // Schedules relevant to this child (locked, no picker)
  const childScheds = useMemo(
    () => activeClass ? schedulesForClass(activeClass.id, classSchedules, classes) : [],
    [activeClass, classSchedules, classes]
  );

  const todayISO = toISO(new Date());
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  const [calView, setCalView] = useState<CalendarView>("month");
  const [selectedDate, setSelectedDate] = useState(clampToYear(todayISO));
  const [detailEvent, setDetailEvent] = useState<DetailEvent | null>(null);

  const selDateObj = fromISO(selectedDate);
  const weekMonday = getMondayOf(selDateObj);
  const year = selDateObj.getFullYear();
  const month = selDateObj.getMonth();
  const todayClamped = clampToYear(todayISO);

  // ── Month view data ──────────────────────────────────────────────────────────

  function eventsForDate(date: string) {
    return {
      holidays: holidaysOnDate(date, calendarHolidays),
      scheds: schedulesOnDate(date, childScheds),
    };
  }

  // ── Week view: 7 TimeColumns (locked to child's class) ───────────────────────

  const weekColumns = useMemo((): TimeColumn[] => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekMonday, i));

    return days.map((day, i) => {
      const iso = toISO(day);
      const dayHolidays = holidaysOnDate(iso, calendarHolidays);
      const dayScheds = schedulesOnDate(iso, childScheds);

      const allDayEvents: AllDayEvent[] = [
        ...dayHolidays.map(h => ({
          id: h.id, title: h.title, color: holidayColor(h),
          onClick: () => setDetailEvent({ kind: "holiday", item: h }),
        })),
        ...dayScheds.filter(s => !s.startTime).map(s => ({
          id: s.id, title: s.title, color: scheduleColor(s, classes),
          onClick: () => setDetailEvent({ kind: "schedule", item: s }),
        })),
      ];

      const timedEvents: TimedEvent[] = dayScheds
        .filter(s => !!s.startTime)
        .map(s => ({
          id: s.id, title: s.title, subtitle: s.description,
          startMinutes: parseTime(s.startTime!),
          endMinutes: s.endTime ? parseTime(s.endTime) : parseTime(s.startTime!) + 60,
          color: scheduleColor(s, classes),
          onClick: () => setDetailEvent({ kind: "schedule", item: s }),
        }));

      return {
        key: iso,
        label: `${DAY_SHORT[i]} ${day.getDate()}`,
        sublabel: MONTH_NAMES[day.getMonth()].slice(0, 3),
        isToday: iso === todayISO,
        allDayEvents,
        timedEvents,
      };
    });
  }, [weekMonday, calendarHolidays, childScheds, classes, todayISO]);

  // ── Day view: single TimeColumn (child's class) ──────────────────────────────

  const dayColumn = useMemo((): TimeColumn => {
    const dayHolidays = holidaysOnDate(selectedDate, calendarHolidays);
    const dayScheds = schedulesOnDate(selectedDate, childScheds);

    const allDayEvents: AllDayEvent[] = [
      ...dayHolidays.map(h => ({
        id: h.id, title: h.title, color: holidayColor(h),
        onClick: () => setDetailEvent({ kind: "holiday", item: h }),
      })),
      ...dayScheds.filter(s => !s.startTime).map(s => ({
        id: s.id, title: s.title, color: scheduleColor(s, classes),
        onClick: () => setDetailEvent({ kind: "schedule", item: s }),
      })),
    ];

    const timedEvents: TimedEvent[] = dayScheds
      .filter(s => !!s.startTime)
      .map(s => ({
        id: s.id, title: s.title, subtitle: s.description,
        startMinutes: parseTime(s.startTime!),
        endMinutes: s.endTime ? parseTime(s.endTime) : parseTime(s.startTime!) + 60,
        color: scheduleColor(s, classes),
        onClick: () => setDetailEvent({ kind: "schedule", item: s }),
      }));

    return {
      key: "child",
      label: activeClass?.name ?? "My Class",
      sublabel: activeClass?.preschoolYear,
      showNow: selectedDate === todayISO,
      allDayEvents,
      timedEvents,
    };
  }, [selectedDate, calendarHolidays, childScheds, classes, activeClass, todayISO]);

  // ── Navigation ───────────────────────────────────────────────────────────────

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
    setSelectedDate(clampToYear(toISO(d)));
  }

  return (
    <div className="px-4 py-5 flex flex-col" style={{ minHeight: 0 }}>
      {/* Header */}
      <div className="mb-4 shrink-0">
        <h1 className="text-xl font-bold" style={{ color: "var(--color-text-dark)" }}>Calendar</h1>
        {activeClass && (
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            {activeClass.name}
          </p>
        )}
      </div>

      <CalendarToolbar
        calView={calView}
        setCalView={setCalView}
        periodLabel={periodLabel()}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        showToday={selectedDate !== todayClamped}
        onToday={() => setSelectedDate(todayClamped)}
        compact
      />

      {/* Calendar area */}
      <div className="flex-1 min-h-0">
        {calView === "month" && (
          <MonthView
            year={year}
            month={month}
            today={todayISO}
            selectedDate={selectedDate}
            eventsForDate={eventsForDate}
            classes={classes}
            onSelectDay={(d) => { setSelectedDate(clampToYear(d)); setCalView("day"); }}
            onEventClick={setDetailEvent}
          />
        )}
        {calView === "week" && (
          <TimeGrid columns={weekColumns} todayKey={todayISO} nowMinutes={nowMinutes} />
        )}
        {calView === "day" && (
          <TimeGrid columns={[dayColumn]} nowMinutes={selectedDate === todayISO ? nowMinutes : undefined} />
        )}
      </div>

      {detailEvent && (
        <ReadOnlyEventDetailModal
          event={detailEvent}
          classes={classes}
          variant="parent"
          onClose={() => setDetailEvent(null)}
        />
      )}
    </div>
  );
}

// ─── Month view ───────────────────────────────────────────────────────────────

function MonthView({
  year, month, today, selectedDate, eventsForDate, classes, onSelectDay, onEventClick,
}: {
  year: number;
  month: number;
  today: string;
  selectedDate: string;
  eventsForDate: (date: string) => { holidays: CalendarHoliday[]; scheds: ClassSchedule[] };
  classes: NurtureStore["classes"];
  onSelectDay: (d: string) => void;
  onEventClick: (e: DetailEvent) => void;
}) {
  const grid = buildMonthGrid(year, month);

  const { holidays: dayHolidays, scheds: dayScheds } = eventsForDate(selectedDate);
  const hasDayEvents = dayHolidays.length > 0 || dayScheds.length > 0;

  return (
    <div>
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_SHORT.map((d) => (
          <div key={d} className="text-center text-xs font-semibold py-1" style={{ color: "var(--color-text-muted)" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Month grid */}
      <div
        className="grid grid-cols-7 gap-px rounded-2xl overflow-hidden border mb-5"
        style={{ background: "var(--color-border)", borderColor: "var(--color-border)" }}
      >
        {grid.map((day) => {
          const iso = toISO(day);
          const inMonth = day.getMonth() === month;
          const isToday = iso === today;
          const isSelected = iso === selectedDate;
          const { holidays, scheds } = eventsForDate(iso);
          const dotCount = holidays.length + scheds.length;

          return (
            <button
              key={iso}
              onClick={() => onSelectDay(iso)}
              className="bg-white pt-2 pb-2.5 flex flex-col items-center hover:bg-bg-cream transition-colors"
              style={{ opacity: inMonth ? 1 : 0.28 }}
            >
              <span
                className="text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full"
                style={{
                  background: isToday ? "var(--color-primary)" : isSelected ? "var(--color-primary-wash)" : "transparent",
                  color: isToday ? "white" : isSelected ? "var(--color-primary)" : "var(--color-text-mid)",
                }}
              >
                {day.getDate()}
              </span>
              {dotCount > 0 && (
                <div className="flex gap-0.5 mt-1">
                  {holidays.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: HOLIDAY_ORG_COLOR.text }} />
                  )}
                  {scheds.length > 0 && (() => {
                    const s = scheds[0];
                    const c = s.scope === "year_level" && s.yearLevel
                      ? YEAR_LEVEL_COLORS[s.yearLevel as YearLevelId]
                      : CLASS_SCHED_COLOR;
                    return <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.text }} />;
                  })()}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day detail */}
      <div>
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--color-text-dark)" }}>
          {fromISO(selectedDate).toLocaleDateString("en-SG", {
            weekday: "long", day: "numeric", month: "long",
          })}
        </p>
        {!hasDayEvents ? (
          <div
            className="rounded-2xl border border-dashed px-4 py-8 text-center"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>No events</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dayHolidays.map((h) => {
              const c = holidayColor(h);
              return (
                <button
                  key={h.id}
                  onClick={() => onEventClick({ kind: "holiday", item: h })}
                  className="w-full text-left rounded-xl px-3 py-3 hover:opacity-90 transition-opacity"
                  style={{ background: c.bg }}
                >
                  <p className="text-sm font-semibold" style={{ color: c.text }}>{h.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: c.text, opacity: 0.7 }}>
                    {h.schoolId ? "School closure" : "Public holiday"}
                  </p>
                </button>
              );
            })}
            {dayScheds.map((s) => {
              const c = scheduleColor(s, classes);
              return (
                <button
                  key={s.id}
                  onClick={() => onEventClick({ kind: "schedule", item: s })}
                  className="w-full text-left rounded-xl px-3 py-3 hover:opacity-90 transition-opacity"
                  style={{ background: c.bg }}
                >
                  <p className="text-sm font-semibold" style={{ color: c.text }}>{s.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: c.text, opacity: 0.7 }}>
                    {s.startTime ? `${s.startTime}${s.endTime ? `–${s.endTime}` : ""}` : "All day"}
                  </p>
                  {s.description && (
                    <p className="text-xs mt-0.5" style={{ color: c.text, opacity: 0.55 }}>{s.description}</p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

