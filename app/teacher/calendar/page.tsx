"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/lib/store";
import type { ClassSchedule, LearningAreaId } from "@/lib/types";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AREA_LABELS: Record<LearningAreaId, string> = {
  LL: "Language & Literacy",
  NUM: "Numeracy",
  SED: "Social & Emotional",
  ACE: "Aesthetics",
  DOW: "Discovery",
  HMS: "Health & Motor",
};

type CalTab = "schedule" | "activity_library";

export default function TeacherCalendarPage() {
  const store = useStore();
  const { calendarHolidays, classSchedules, classes, classTeacherAssignments, demoPersona, plannedActivities, milestones, activeClassId } = store;

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

  const [calTab, setCalTab] = useState<CalTab>("schedule");
  const [libAreaFilter, setLibAreaFilter] = useState<LearningAreaId | null>(null);
  const [libSearch, setLibSearch] = useState("");

  const [calView, setCalView] = useState<CalendarView>("week");
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

  const classItems = Object.fromEntries(
    teacherClasses.map((c) => [c.id, c.name])
  );

  // ── Activity Library ─────────────────────────────────────────────────────────

  const milestoneMap = useMemo(() => new Map(milestones.map((m) => [m.id, m])), [milestones]);

  const libraryActivities = useMemo(() => {
    return plannedActivities
      .filter((a) => a.classId === activeClassId)
      .filter((a) => !libAreaFilter || a.areaId === libAreaFilter)
      .filter((a) => {
        if (!libSearch.trim()) return true;
        const q = libSearch.toLowerCase();
        return a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [plannedActivities, activeClassId, libAreaFilter, libSearch]);

  return (
    <div className="flex min-h-0 flex-col px-4 py-6 md:px-6">
      {/* Header */}
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
      </div>

      {/* Top-level tab row */}
      <div
        className="mb-5 flex shrink-0 gap-1 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        {(["schedule", "activity_library"] as CalTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setCalTab(t)}
            className="px-4 py-2 text-sm font-medium"
            style={{
              color: calTab === t ? "var(--color-primary)" : "var(--color-text-muted)",
              borderBottom: calTab === t ? "2px solid var(--color-primary)" : "2px solid transparent",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {t === "schedule" ? "Schedule" : "Activity Library"}
          </button>
        ))}
      </div>

      {calTab === "activity_library" ? (
        <ActivityLibrary
          activities={libraryActivities}
          milestoneMap={milestoneMap}
          areaFilter={libAreaFilter}
          onAreaFilter={setLibAreaFilter}
          search={libSearch}
          onSearch={setLibSearch}
        />
      ) : (
        <>
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
        <div className="mb-4 flex shrink-0 items-center gap-2">
          <span className="text-muted-foreground text-xs font-medium">Class:</span>
          <Select
            value={weekClassId}
            onValueChange={(v) => v != null && setWeekClassId(String(v))}
            items={classItems}
          >
            <SelectTrigger size="sm" className="min-w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {teacherClasses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Day view: class multi-picker (teacher's classes) */}
      {calView === "day" && teacherClasses.length > 1 && (
        <div className="mb-4 flex shrink-0 flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-xs font-medium">Classes:</span>
          {teacherClasses.map((cls) => (
            <Button
              key={cls.id}
              type="button"
              size="sm"
              variant={dayClassIds.includes(cls.id) ? "default" : "outline"}
              className="rounded-full text-xs font-semibold"
              onClick={() => toggleDayClass(cls.id)}
            >
              {cls.name}
            </Button>
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
        </>
      )}
    </div>
  );
}

// ── Activity Library ──────────────────────────────────────────────────────────

import type { PlannedActivity, Milestone } from "@/lib/types";

function ActivityLibrary({
  activities,
  milestoneMap,
  areaFilter,
  onAreaFilter,
  search,
  onSearch,
}: {
  activities: PlannedActivity[];
  milestoneMap: Map<string, Milestone>;
  areaFilter: LearningAreaId | null;
  onAreaFilter: (area: LearningAreaId | null) => void;
  search: string;
  onSearch: (s: string) => void;
}) {
  const areaColors: Record<LearningAreaId, string> = {
    LL: "#7BA3D4",
    NUM: "#F5A623",
    SED: "#E8745A",
    ACE: "#9B7DD4",
    DOW: "#4A9B6F",
    HMS: "#D47B7B",
  };

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-4 overflow-y-auto">
      {/* Search */}
      <input
        type="search"
        placeholder="Search activities…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
        style={{ borderColor: "var(--color-border)", background: "#fff" }}
      />

      {/* Domain filter pills */}
      <div className="flex flex-wrap gap-2 shrink-0">
        <button
          onClick={() => onAreaFilter(null)}
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: !areaFilter ? "var(--color-primary)" : "var(--color-bg-warm)",
            color: !areaFilter ? "#fff" : "var(--color-text-mid)",
            border: "1px solid var(--color-border)",
          }}
        >
          All
        </button>
        {(Object.keys(AREA_LABELS) as LearningAreaId[]).map((area) => (
          <button
            key={area}
            onClick={() => onAreaFilter(areaFilter === area ? null : area)}
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: areaFilter === area ? areaColors[area] : "var(--color-bg-warm)",
              color: areaFilter === area ? "#fff" : "var(--color-text-mid)",
              border: "1px solid var(--color-border)",
            }}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Activity cards */}
      {activities.length === 0 ? (
        <p className="py-10 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
          No activities found
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {activities.map((activity) => {
            const milestone = activity.milestoneId ? milestoneMap.get(activity.milestoneId) : undefined;
            return (
              <div
                key={activity.id}
                className="rounded-2xl border bg-white p-4"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 h-3 w-3 shrink-0 rounded-full"
                    style={{ background: areaColors[activity.areaId] }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
                      {activity.title}
                    </p>
                    {activity.description && (
                      <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {activity.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{ background: `${areaColors[activity.areaId]}22`, color: areaColors[activity.areaId] }}
                      >
                        {AREA_LABELS[activity.areaId]}
                      </span>
                      {milestone && (
                        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                          {milestone.id} · {milestone.statement.slice(0, 60)}{milestone.statement.length > 60 ? "…" : ""}
                        </span>
                      )}
                      <span className="ml-auto text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {activity.date}
                        {activity.startTime ? ` · ${activity.startTime}` : ""}
                        {activity.durationMins ? ` (${activity.durationMins}m)` : ""}
                      </span>
                    </div>
                    {activity.childIds.length > 0 && (
                      <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {activity.childIds.length} child{activity.childIds.length !== 1 ? "ren" : ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
