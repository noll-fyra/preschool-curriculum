import type { CalendarHoliday, ClassSchedule, Class, YearLevelId } from "./types";

// ─── Shared calendar types ─────────────────────────────────────────────────────

export type CalendarView = "month" | "week" | "day";

export type DetailEvent =
  | { kind: "holiday"; item: CalendarHoliday }
  | { kind: "schedule"; item: ClassSchedule };

export const CURRENT_YEAR = new Date().getFullYear();

export const WEEKDAYS = [
  { label: "Mon", value: 1 }, { label: "Tue", value: 2 }, { label: "Wed", value: 3 },
  { label: "Thu", value: 4 }, { label: "Fri", value: 5 }, { label: "Sat", value: 6 },
  { label: "Sun", value: 7 },
];

export function clampToYear(iso: string): string {
  const min = `${CURRENT_YEAR}-01-01`;
  const max = `${CURRENT_YEAR}-12-31`;
  if (iso < min) return min;
  if (iso > max) return max;
  return iso;
}

// ─── Time constants ────────────────────────────────────────────────────────────

export const DAY_START = 7 * 60;  // 7:00 AM in minutes from midnight
export const DAY_END   = 19 * 60; // 7:00 PM in minutes from midnight

// ─── Date utilities ────────────────────────────────────────────────────────────

export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromISO(s: string): Date {
  return new Date(s + "T00:00:00");
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function getMondayOf(d: Date): Date {
  const r = new Date(d);
  const day = r.getDay();
  r.setDate(r.getDate() - (day === 0 ? 6 : day - 1));
  return r;
}

export function buildMonthGrid(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const start = getMondayOf(firstDay);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

/** Parse "HH:MM" to minutes from midnight. */
export function parseTime(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Format an hour integer as "7 AM", "12 PM", "3 PM", etc. */
export function formatHour(h: number): string {
  if (h === 0)  return "12 AM";
  if (h === 12) return "12 PM";
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

// ─── Display labels ────────────────────────────────────────────────────────────

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Colour palette ────────────────────────────────────────────────────────────

export const YEAR_LEVEL_COLORS: Record<YearLevelId, { bg: string; text: string }> = {
  N1: { bg: "#FEF3D7", text: "#A06010" },
  N2: { bg: "#FDE8C8", text: "#8B4A0A" },
  K1: { bg: "#E8F5EE", text: "#2D7A4F" },
  K2: { bg: "#D9F0E5", text: "#1A6040" },
};

export const CLASS_SCHED_COLOR = { bg: "#E8F0FE", text: "#3B5AC6" };
export const HOLIDAY_ORG_COLOR   = { bg: "#FDE8EA", text: "#C0392B" };
export const HOLIDAY_SCHOOL_COLOR = { bg: "#FDECEA", text: "#A93226" };

/** Pick the display colour for a ClassSchedule. */
export function scheduleColor(
  s: ClassSchedule,
  classes: Class[]
): { bg: string; text: string } {
  if (s.scope === "year_level" && s.yearLevel) return YEAR_LEVEL_COLORS[s.yearLevel];
  // class-scope: colour by the class's year level
  const cls = classes.find((c) => c.id === s.classId);
  if (cls?.preschoolYear) return YEAR_LEVEL_COLORS[cls.preschoolYear];
  return CLASS_SCHED_COLOR;
}

/** Colour for a holiday. */
export function holidayColor(h: CalendarHoliday): { bg: string; text: string } {
  return h.schoolId ? HOLIDAY_SCHOOL_COLOR : HOLIDAY_ORG_COLOR;
}

// ─── Event lookup helpers ──────────────────────────────────────────────────────

/**
 * ISO weekday for a YYYY-MM-DD string: 1=Mon … 7=Sun
 */
function isoWeekday(date: string): number {
  const d = new Date(date + "T00:00:00");
  const day = d.getDay(); // 0=Sun … 6=Sat
  return day === 0 ? 7 : day;
}

/** Returns the CalendarHoliday whose range includes `date`, or undefined. */
export function holidayOnDate(
  date: string,
  holidays: CalendarHoliday[]
): CalendarHoliday | undefined {
  return holidays.find((h) => h.startDate <= date && date <= h.endDate);
}

/** Returns all CalendarHolidays whose range includes `date`. */
export function holidaysOnDate(
  date: string,
  holidays: CalendarHoliday[]
): CalendarHoliday[] {
  return holidays.filter((h) => h.startDate <= date && date <= h.endDate);
}

/**
 * Returns all ClassSchedules that have an occurrence on `date`.
 *
 * Weekly: the schedule's daysOfWeek includes the ISO weekday of `date`
 *          AND `date` falls within [startDate, endDate].
 * Monthly: the day-of-month of `date` equals schedule.dayOfMonth
 *           AND `date` falls within [startDate, endDate].
 */
export function schedulesOnDate(
  date: string,
  schedules: ClassSchedule[]
): ClassSchedule[] {
  const weekday   = isoWeekday(date);
  const dayOfMonth = new Date(date + "T00:00:00").getDate();

  return schedules.filter((s) => {
    if (date < s.startDate || date > s.endDate) return false;
    if (s.recurrence === "weekly")  return s.daysOfWeek?.includes(weekday) ?? false;
    return s.dayOfMonth === dayOfMonth;
  });
}

/**
 * Filter classSchedules that are relevant for a given class:
 * year-level schedules matching the class's preschoolYear, plus class-specific schedules.
 */
export function schedulesForClass(
  classId: string,
  allSchedules: ClassSchedule[],
  classes: Class[]
): ClassSchedule[] {
  const cls = classes.find((c) => c.id === classId);
  if (!cls) return [];
  return allSchedules.filter(
    (s) =>
      s.schoolId === cls.schoolId &&
      ((s.scope === "year_level" && s.yearLevel === cls.preschoolYear) ||
        (s.scope === "class" && s.classId === classId))
  );
}
