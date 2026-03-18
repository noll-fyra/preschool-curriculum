"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/lib/store";
import type { NurtureStore } from "@/lib/store";
import type { CalendarHoliday, ClassSchedule, YearLevelId, RecurrenceType, ScheduleScope } from "@/lib/types";
import {
  holidaysOnDate, schedulesOnDate, schedulesForClass,
  holidayColor, scheduleColor,
  toISO, fromISO, addDays, getMondayOf, parseTime,
  MONTH_NAMES, DAY_SHORT,
  YEAR_LEVEL_COLORS, CLASS_SCHED_COLOR, HOLIDAY_ORG_COLOR, HOLIDAY_SCHOOL_COLOR,
  CURRENT_YEAR, WEEKDAYS, CalendarView, DetailEvent, clampToYear,
} from "@/lib/calendar-utils";
import { TimeGrid } from "@/components/calendar/TimeGrid";
import type { TimeColumn, TimedEvent, AllDayEvent } from "@/components/calendar/TimeGrid";
import { CalendarToolbar } from "@/components/calendar/CalendarToolbar";
import { MonthView } from "@/components/calendar/MonthView";

// ─── Constants ────────────────────────────────────────────────────────────────

const ORG_ID = "org-1";
const SCHOOL_ID = "school-1";
const YEAR_LEVELS: YearLevelId[] = ["N1", "N2", "K1", "K2"];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminCalendarPage() {
  const store = useStore();
  const { calendarHolidays, classSchedules, classes, school } = store;

  const todayISO = toISO(new Date());
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  const [calView, setCalView] = useState<CalendarView>("month");
  const [selectedDate, setSelectedDate] = useState(clampToYear(todayISO));
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [detailEvent, setDetailEvent] = useState<DetailEvent | null>(null);
  const [editEvent, setEditEvent] = useState<DetailEvent | null>(null);

  // Month view: toggle school events
  const [showSchool1, setShowSchool1] = useState(true);

  // Week view: one class
  const [weekClassId, setWeekClassId] = useState(classes[0]?.id ?? "");

  // Day view: multiple classes
  const [dayClassIds, setDayClassIds] = useState<string[]>(
    classes.length > 0 ? [classes[0].id] : []
  );

  const selDateObj = fromISO(selectedDate);
  const weekMonday = getMondayOf(selDateObj);
  const year = selDateObj.getFullYear();
  const month = selDateObj.getMonth();
  const todayClamped = clampToYear(todayISO);

  // ── Month view data ──────────────────────────────────────────────────────────

  const monthHolidays = useMemo(
    () => calendarHolidays.filter(h => !h.schoolId || (showSchool1 && h.schoolId === SCHOOL_ID)),
    [calendarHolidays, showSchool1]
  );
  const monthSchedules = useMemo(
    () => showSchool1 ? classSchedules.filter(s => s.schoolId === SCHOOL_ID) : [],
    [classSchedules, showSchool1]
  );

  function eventsForDate(date: string) {
    return {
      holidays: holidaysOnDate(date, monthHolidays),
      scheds: schedulesOnDate(date, monthSchedules),
    };
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
      <div className="flex items-center justify-between gap-3 mb-5 shrink-0 flex-wrap">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          Calendar
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHolidayModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border"
            style={{ borderColor: "#C0392B", color: "#C0392B", background: "#FDE8EA" }}
          >
            + Holiday
          </button>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            + Schedule
          </button>
        </div>
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

      {/* Month view: school filter pills */}
      {calView === "month" && (
        <div className="flex items-center gap-2 mb-4 shrink-0 flex-wrap">
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Show:</span>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: HOLIDAY_ORG_COLOR.bg, color: HOLIDAY_ORG_COLOR.text }}
          >
            Org-wide (always)
          </span>
          <button
            onClick={() => setShowSchool1(v => !v)}
            className="px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors"
            style={{
              background: showSchool1 ? "var(--color-primary)" : "white",
              color: showSchool1 ? "white" : "var(--color-text-mid)",
              borderColor: showSchool1 ? "var(--color-primary)" : "var(--color-border)",
            }}
          >
            {school.name}
          </button>
        </div>
      )}

      {/* Week view: class selector */}
      {calView === "week" && (
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Class:</span>
          <select
            value={weekClassId}
            onChange={e => setWeekClassId(e.target.value)}
            className="rounded-lg border px-2 py-1 text-sm bg-white"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      )}

      {/* Day view: class multi-picker */}
      {calView === "day" && (
        <div className="flex items-center gap-2 mb-4 shrink-0 flex-wrap">
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Classes:</span>
          {classes.map(cls => (
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
        {calView === "day" && dayColumns.length === 0 && (
          <div className="rounded-2xl border border-dashed px-6 py-12 text-center" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>No classes selected</p>
          </div>
        )}
      </div>

      {/* Event detail modal */}
      {detailEvent && (
        <AdminEventDetailModal
          event={detailEvent}
          classes={classes}
          onEdit={() => { setEditEvent(detailEvent); setDetailEvent(null); }}
          onDelete={() => {
            if (detailEvent.kind === "holiday") store.deleteHoliday(detailEvent.item.id);
            else store.deleteSchedule(detailEvent.item.id);
            setDetailEvent(null);
          }}
          onClose={() => setDetailEvent(null)}
        />
      )}

      {/* Create holiday modal */}
      {showHolidayModal && (
        <HolidayModal
          orgId={ORG_ID} schoolId={SCHOOL_ID} year={CURRENT_YEAR}
          onSave={(h) => { store.createHoliday(h); setShowHolidayModal(false); }}
          onClose={() => setShowHolidayModal(false)}
        />
      )}

      {/* Edit holiday modal */}
      {editEvent?.kind === "holiday" && (
        <HolidayModal
          orgId={ORG_ID} schoolId={SCHOOL_ID} year={CURRENT_YEAR}
          existingItem={editEvent.item}
          onSave={(h) => { store.updateHoliday(editEvent.item.id, h); setEditEvent(null); }}
          onClose={() => setEditEvent(null)}
        />
      )}

      {/* Create schedule modal */}
      {showScheduleModal && (
        <ScheduleModal
          orgId={ORG_ID} schoolId={SCHOOL_ID} year={CURRENT_YEAR} classes={classes}
          onSave={(s) => { store.createSchedule(s); setShowScheduleModal(false); }}
          onClose={() => setShowScheduleModal(false)}
        />
      )}

      {/* Edit schedule modal */}
      {editEvent?.kind === "schedule" && (
        <ScheduleModal
          orgId={ORG_ID} schoolId={SCHOOL_ID} year={CURRENT_YEAR} classes={classes}
          existingItem={editEvent.item}
          onSave={(s) => { store.updateSchedule(editEvent.item.id, s); setEditEvent(null); }}
          onClose={() => setEditEvent(null)}
        />
      )}
    </div>
  );
}

// ─── Admin event detail modal ─────────────────────────────────────────────────

function AdminEventDetailModal({
  event, classes, onEdit, onDelete, onClose,
}: {
  event: DetailEvent;
  classes: NurtureStore["classes"];
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isHoliday = event.kind === "holiday";
  const c = isHoliday
    ? (event.item.schoolId ? HOLIDAY_SCHOOL_COLOR : HOLIDAY_ORG_COLOR)
    : event.kind === "schedule" && event.item.scope === "year_level" && event.item.yearLevel
      ? YEAR_LEVEL_COLORS[event.item.yearLevel]
      : CLASS_SCHED_COLOR;

  let typeLabel = "";
  let details: React.ReactNode = null;

  if (isHoliday) {
    const h = event.item;
    typeLabel = h.schoolId ? "School closure" : "Org-wide holiday";
    details = (
      <div className="space-y-1 text-xs" style={{ color: c.text, opacity: 0.75 }}>
        <p>{h.startDate === h.endDate ? h.startDate : `${h.startDate} – ${h.endDate}`}</p>
        <p>{typeLabel}</p>
      </div>
    );
  } else {
    const s = event.item;
    const cls = classes.find(x => x.id === s.classId);
    const scopeLabel = s.scope === "year_level" ? `Year level: ${s.yearLevel}` : `Class: ${cls?.name ?? s.classId}`;
    const recLabel = s.recurrence === "weekly"
      ? `Weekly — ${(s.daysOfWeek ?? []).map(d => WEEKDAYS.find(w => w.value === d)?.label).join(", ")}`
      : `Monthly — day ${s.dayOfMonth}`;
    typeLabel = s.scope === "year_level" ? "Year-level schedule" : "Class schedule";
    details = (
      <div className="space-y-1 text-xs" style={{ color: c.text, opacity: 0.75 }}>
        <p>{scopeLabel}</p>
        <p>{recLabel}</p>
        <p>{s.startDate} – {s.endDate}</p>
        {(s.startTime || s.endTime) && (
          <p>{s.startTime ?? "—"}{s.endTime ? ` – ${s.endTime}` : ""}</p>
        )}
        {s.description && <p>{s.description}</p>}
      </div>
    );
  }

  return (
    <ModalOverlay onClose={onClose}>
      {/* Type badge */}
      <span
        className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-3"
        style={{ background: c.bg, color: c.text }}
      >
        {typeLabel}
      </span>

      {/* Title */}
      <h2 className="text-lg font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>
        {event.item.title}
      </h2>

      {/* Details */}
      <div className="mb-6">{details}</div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors"
          style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)", background: "var(--color-primary-wash)" }}
        >
          Edit
        </button>
        {confirmDelete ? (
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={onDelete}
              className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#C0392B" }}
            >
              Confirm delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-3 py-2 rounded-xl text-sm border"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="px-4 py-2 rounded-xl text-sm font-semibold border"
            style={{ borderColor: "#C0392B", color: "#C0392B" }}
          >
            Delete
          </button>
        )}
      </div>
    </ModalOverlay>
  );
}

// ─── Holiday modal (create + edit) ───────────────────────────────────────────

function HolidayModal({
  orgId, schoolId, year, existingItem, onSave, onClose,
}: {
  orgId: string;
  schoolId: string;
  year: number;
  existingItem?: CalendarHoliday;
  onSave: (h: Omit<CalendarHoliday, "id" | "createdAt">) => void;
  onClose: () => void;
}) {
  const isEdit = !!existingItem;
  const [title, setTitle] = useState(existingItem?.title ?? "");
  const [startDate, setStartDate] = useState(existingItem?.startDate ?? `${year}-01-01`);
  const [endDate, setEndDate] = useState(existingItem?.endDate ?? `${year}-01-01`);
  const [scope, setScope] = useState<"org" | "school">(existingItem?.schoolId ? "school" : "org");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      organisationId: orgId,
      schoolId: scope === "school" ? schoolId : null,
      title: title.trim(),
      startDate,
      endDate: endDate < startDate ? startDate : endDate,
    });
  }

  return (
    <ModalOverlay onClose={onClose}>
      <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-text-dark)" }}>
        {isEdit ? "Edit Holiday" : "Add Holiday"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Title">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
            value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Chinese New Year" required
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start date">
            <input type="date" className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "var(--color-border)" }}
              value={startDate} min={`${year}-01-01`} max={`${year}-12-31`}
              onChange={(e) => setStartDate(e.target.value)} />
          </Field>
          <Field label="End date">
            <input type="date" className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "var(--color-border)" }}
              value={endDate} min={startDate} max={`${year}-12-31`}
              onChange={(e) => setEndDate(e.target.value)} />
          </Field>
        </div>
        <Field label="Applies to">
          <RadioGroup
            options={[
              { label: "All schools (org-wide)", value: "org" },
              { label: "This school only", value: "school" },
            ]}
            value={scope}
            onChange={(v) => setScope(v as "org" | "school")}
          />
        </Field>
        <ModalActions onClose={onClose} submitLabel={isEdit ? "Save Changes" : "Add Holiday"} />
      </form>
    </ModalOverlay>
  );
}

// ─── Schedule modal (create + edit) ──────────────────────────────────────────

function ScheduleModal({
  orgId, schoolId, year, classes, existingItem, onSave, onClose,
}: {
  orgId: string;
  schoolId: string;
  year: number;
  classes: NurtureStore["classes"];
  existingItem?: ClassSchedule;
  onSave: (s: Omit<ClassSchedule, "id" | "createdAt">) => void;
  onClose: () => void;
}) {
  const isEdit = !!existingItem;
  const [title, setTitle] = useState(existingItem?.title ?? "");
  const [description, setDescription] = useState(existingItem?.description ?? "");
  const [scope, setScope] = useState<ScheduleScope>(existingItem?.scope ?? "year_level");
  const [yearLevel, setYearLevel] = useState<YearLevelId>(existingItem?.yearLevel ?? "K1");
  const [classId, setClassId] = useState(existingItem?.classId ?? classes[0]?.id ?? "");
  const [recurrence, setRecurrence] = useState<RecurrenceType>(existingItem?.recurrence ?? "weekly");
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>(existingItem?.daysOfWeek ?? [1, 2, 3, 4, 5]);
  const [dayOfMonth, setDayOfMonth] = useState(existingItem?.dayOfMonth ?? 1);
  const [startDate, setStartDate] = useState(existingItem?.startDate ?? `${year}-01-01`);
  const [endDate, setEndDate] = useState(existingItem?.endDate ?? `${year}-12-31`);
  const [startTime, setStartTime] = useState(existingItem?.startTime ?? "");
  const [endTime, setEndTime] = useState(existingItem?.endTime ?? "");

  function toggleWeekday(v: number) {
    setDaysOfWeek((prev) =>
      prev.includes(v) ? prev.filter((d) => d !== v) : [...prev, v].sort()
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      organisationId: orgId,
      schoolId,
      scope,
      ...(scope === "year_level" ? { yearLevel } : { classId }),
      title: title.trim(),
      description: description.trim() || undefined,
      recurrence,
      ...(recurrence === "weekly" ? { daysOfWeek } : { dayOfMonth }),
      startDate,
      endDate: endDate < startDate ? startDate : endDate,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
    });
  }

  return (
    <ModalOverlay onClose={onClose}>
      <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-text-dark)" }}>
        {isEdit ? "Edit Schedule" : "Add Schedule"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Title">
          <input className="w-full rounded-xl border px-3 py-2 text-sm"
            style={{ borderColor: "var(--color-border)" }}
            value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Swimming" required />
        </Field>
        <Field label="Description (optional)">
          <input className="w-full rounded-xl border px-3 py-2 text-sm"
            style={{ borderColor: "var(--color-border)" }}
            value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Location or notes" />
        </Field>
        <Field label="Applies to">
          <RadioGroup
            options={[{ label: "Year level", value: "year_level" }, { label: "Specific class", value: "class" }]}
            value={scope}
            onChange={(v) => setScope(v as ScheduleScope)}
          />
        </Field>
        {scope === "year_level" ? (
          <Field label="Year level">
            <select className="w-full rounded-xl border px-3 py-2 text-sm bg-white"
              style={{ borderColor: "var(--color-border)" }}
              value={yearLevel} onChange={(e) => setYearLevel(e.target.value as YearLevelId)}>
              {YEAR_LEVELS.map((yl) => <option key={yl} value={yl}>{yl}</option>)}
            </select>
          </Field>
        ) : (
          <Field label="Class">
            <select className="w-full rounded-xl border px-3 py-2 text-sm bg-white"
              style={{ borderColor: "var(--color-border)" }}
              value={classId} onChange={(e) => setClassId(e.target.value)}>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
        )}
        <Field label="Recurrence">
          <RadioGroup
            options={[{ label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }]}
            value={recurrence}
            onChange={(v) => setRecurrence(v as RecurrenceType)}
          />
        </Field>
        {recurrence === "weekly" ? (
          <Field label="Days of week">
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((wd) => (
                <button key={wd.value} type="button" onClick={() => toggleWeekday(wd.value)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors"
                  style={{
                    background: daysOfWeek.includes(wd.value) ? "var(--color-primary)" : "white",
                    color: daysOfWeek.includes(wd.value) ? "white" : "var(--color-text-mid)",
                    borderColor: daysOfWeek.includes(wd.value) ? "var(--color-primary)" : "var(--color-border)",
                  }}>
                  {wd.label}
                </button>
              ))}
            </div>
          </Field>
        ) : (
          <Field label="Day of month">
            <input type="number" min={1} max={31} className="w-24 rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "var(--color-border)" }}
              value={dayOfMonth} onChange={(e) => setDayOfMonth(Number(e.target.value))} />
          </Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start date">
            <input type="date" className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "var(--color-border)" }}
              value={startDate} min={`${year}-01-01`} max={`${year}-12-31`}
              onChange={(e) => setStartDate(e.target.value)} />
          </Field>
          <Field label="End date">
            <input type="date" className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "var(--color-border)" }}
              value={endDate} min={startDate} max={`${year}-12-31`}
              onChange={(e) => setEndDate(e.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start time (optional)">
            <input type="time" className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "var(--color-border)" }}
              value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </Field>
          <Field label="End time (optional)">
            <input type="time" className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "var(--color-border)" }}
              value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </Field>
        </div>
        <ModalActions onClose={onClose} submitLabel={isEdit ? "Save Changes" : "Add Schedule"} />
      </form>
    </ModalOverlay>
  );
}

// ─── Shared form primitives ───────────────────────────────────────────────────

function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg max-h-[92vh] overflow-auto rounded-2xl bg-white shadow-2xl p-5">
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-mid)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function RadioGroup({
  options, value, onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"
          style={{
            background: value === opt.value ? "var(--color-primary)" : "white",
            color: value === opt.value ? "white" : "var(--color-text-mid)",
            borderColor: value === opt.value ? "var(--color-primary)" : "var(--color-border)",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ModalActions({ onClose, submitLabel }: { onClose: () => void; submitLabel: string }) {
  return (
    <div className="flex gap-2 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold border"
        style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold text-white"
        style={{ background: "var(--color-primary)" }}
      >
        {submitLabel}
      </button>
    </div>
  );
}
