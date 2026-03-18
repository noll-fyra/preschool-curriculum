"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/lib/store";
import type { ClassSchedule } from "@/lib/types";
import {
  holidaysOnDate, schedulesOnDate, schedulesForClass,
  holidayColor, scheduleColor,
  toISO, fromISO, addDays, getMondayOf, parseTime,
  MONTH_NAMES, DAY_SHORT,
  CURRENT_YEAR, WEEKDAYS, CalendarView, DetailEvent, clampToYear,
} from "@/lib/calendar-utils";
import { TimeGrid } from "@/components/calendar/TimeGrid";
import type { TimeColumn, TimedEvent, AllDayEvent } from "@/components/calendar/TimeGrid";
import { CalendarToolbar } from "@/components/calendar/CalendarToolbar";
import { MonthView } from "@/components/calendar/MonthView";
import { ReadOnlyEventDetailModal } from "@/components/calendar/ReadOnlyEventDetailModal";

export default function TeacherCalendarPage() {
  const store = useStore();
  const { calendarHolidays, classSchedules, classes, classTeacherAssignments, demoPersona } = store;

  // Derive teacher's classes
  const teacherClassIds = useMemo(
    () => classTeacherAssignments
      .filter(a => a.employeeId === demoPersona.teacherEmployeeId)
      .map(a => a.classId),
    [classTeacherAssignments, demoPersona.teacherEmployeeId]
  );
  const teacherClasses = useMemo(
    () => classes.filter(c => teacherClassIds.includes(c.id)),
    [classes, teacherClassIds]
  );

  const todayISO = toISO(new Date());
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  const [calView, setCalView] = useState<CalendarView>("month");
  const [selectedDate, setSelectedDate] = useState(clampToYear(todayISO));
  const [detailEvent, setDetailEvent] = useState<DetailEvent | null>(null);

  // Week view: one class (default to teacher's first class)
  const [weekClassId, setWeekClassId] = useState(teacherClasses[0]?.id ?? "");

  // Day view: multi-select from teacher's classes
  const [dayClassIds, setDayClassIds] = useState<string[]>(
    teacherClasses.length > 0 ? [teacherClasses[0].id] : []
  );

  const selDateObj = fromISO(selectedDate);
  const weekMonday = getMondayOf(selDateObj);
  const year = selDateObj.getFullYear();
  const month = selDateObj.getMonth();
  const todayClamped = clampToYear(todayISO);

  // ── Month view data ──────────────────────────────────────────────────────────

  function eventsForDate(date: string) {
    const holidays = holidaysOnDate(date, calendarHolidays);
    const scheds = teacherClassIds.flatMap(classId => {
      const relevant = schedulesForClass(classId, classSchedules, classes);
      return schedulesOnDate(date, relevant);
    }).filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i);
    return { holidays, scheds };
  }

  // ── Week view: TimeColumns ───────────────────────────────────────────────────

  const weekColumns = useMemo((): TimeColumn[] => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekMonday, i));
    const classScheds = weekClassId ? schedulesForClass(weekClassId, classSchedules, classes) : [];

    return days.map((day, i) => {
      const iso = toISO(day);
      const dayHolidays = holidaysOnDate(iso, calendarHolidays);
      const dayScheds = schedulesOnDate(iso, classScheds);

      const allDayEvents: AllDayEvent[] = [
        ...dayHolidays.map(h => ({
          id: h.id, title: h.title, color: holidayColor(h),
          onClick: () => setDetailEvent({ kind: "holiday", item: h }),
        })),
        ...dayScheds.filter((s: ClassSchedule) => !s.startTime).map(s => ({
          id: s.id, title: s.title, color: scheduleColor(s, classes),
          onClick: () => setDetailEvent({ kind: "schedule", item: s }),
        })),
      ];

      const timedEvents: TimedEvent[] = dayScheds
        .filter((s: ClassSchedule) => !!s.startTime)
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
  }, [weekMonday, weekClassId, calendarHolidays, classSchedules, classes, todayISO]);

  // ── Day view: TimeColumns ────────────────────────────────────────────────────

  const dayColumns = useMemo((): TimeColumn[] => {
    const dayHolidays = holidaysOnDate(selectedDate, calendarHolidays);

    return dayClassIds.map(classId => {
      const cls = classes.find(c => c.id === classId);
      const dayScheds = schedulesOnDate(selectedDate, schedulesForClass(classId, classSchedules, classes));

      const allDayEvents: AllDayEvent[] = [
        ...dayHolidays.map(h => ({
          id: `${h.id}-${classId}`, title: h.title, color: holidayColor(h),
          onClick: () => setDetailEvent({ kind: "holiday", item: h }),
        })),
        ...dayScheds.filter((s: ClassSchedule) => !s.startTime).map(s => ({
          id: s.id, title: s.title, color: scheduleColor(s, classes),
          onClick: () => setDetailEvent({ kind: "schedule", item: s }),
        })),
      ];

      const timedEvents: TimedEvent[] = dayScheds
        .filter((s: ClassSchedule) => !!s.startTime)
        .map(s => ({
          id: s.id, title: s.title, subtitle: s.description,
          startMinutes: parseTime(s.startTime!),
          endMinutes: s.endTime ? parseTime(s.endTime) : parseTime(s.startTime!) + 60,
          color: scheduleColor(s, classes),
          onClick: () => setDetailEvent({ kind: "schedule", item: s }),
        }));

      return {
        key: classId,
        label: cls?.name ?? classId,
        sublabel: cls?.preschoolYear,
        showNow: selectedDate === todayISO,
        allDayEvents,
        timedEvents,
      };
    });
  }, [selectedDate, dayClassIds, calendarHolidays, classSchedules, classes, todayISO]);

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

  function toggleDayClass(classId: string) {
    setDayClassIds(prev =>
      prev.includes(classId)
        ? prev.length > 1 ? prev.filter(id => id !== classId) : prev
        : [...prev, classId]
    );
  }

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 flex flex-col" style={{ minHeight: 0 }}>
      {/* Header */}
      <div className="mb-5 shrink-0">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>Calendar</h1>
      </div>

      <CalendarToolbar
        calView={calView}
        setCalView={setCalView}
        periodLabel={periodLabel()}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        showToday={selectedDate !== todayClamped}
        onToday={() => setSelectedDate(todayClamped)}
      />

      {/* Week view: class selector */}
      {calView === "week" && teacherClasses.length > 0 && (
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Class:</span>
          <select
            value={weekClassId}
            onChange={e => setWeekClassId(e.target.value)}
            className="rounded-lg border px-2 py-1 text-sm bg-white"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
          >
            {teacherClasses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      )}

      {/* Day view: class multi-picker (teacher's classes) */}
      {calView === "day" && teacherClasses.length > 1 && (
        <div className="flex items-center gap-2 mb-4 shrink-0 flex-wrap">
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Classes:</span>
          {teacherClasses.map(cls => (
            <button
              key={cls.id}
              onClick={() => toggleDayClass(cls.id)}
              className="px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors"
              style={{
                background: dayClassIds.includes(cls.id) ? "var(--color-primary)" : "white",
                color: dayClassIds.includes(cls.id) ? "white" : "var(--color-text-mid)",
                borderColor: dayClassIds.includes(cls.id) ? "var(--color-primary)" : "var(--color-border)",
              }}
            >
              {cls.name}
            </button>
          ))}
        </div>
      )}

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
        {calView === "day" && dayColumns.length > 0 && (
          <TimeGrid columns={dayColumns} nowMinutes={selectedDate === todayISO ? nowMinutes : undefined} />
        )}
      </div>

      {detailEvent && (
        <ReadOnlyEventDetailModal
          event={detailEvent}
          classes={classes}
          variant="teacher"
          onClose={() => setDetailEvent(null)}
        />
      )}
    </div>
  );
}
