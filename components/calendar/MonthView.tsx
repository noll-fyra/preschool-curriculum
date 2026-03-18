"use client";

import type { CalendarHoliday, ClassSchedule, YearLevelId } from "@/lib/types";
import type { NurtureStore } from "@/lib/store";
import type { DetailEvent } from "@/lib/calendar-utils";
import {
  toISO, buildMonthGrid, DAY_SHORT,
  YEAR_LEVEL_COLORS, CLASS_SCHED_COLOR, HOLIDAY_ORG_COLOR, HOLIDAY_SCHOOL_COLOR,
} from "@/lib/calendar-utils";

export function MonthView({
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

  return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-7 mb-1">
        {DAY_SHORT.map((d) => (
          <div key={d} className="text-center text-xs font-semibold py-2" style={{ color: "var(--color-text-muted)" }}>
            {d}
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-7 gap-px rounded-2xl overflow-hidden border"
        style={{ background: "var(--color-border)", borderColor: "var(--color-border)" }}
      >
        {grid.map((day) => {
          const iso = toISO(day);
          const inMonth = day.getMonth() === month;
          const isToday = iso === today;
          const isSelected = iso === selectedDate;
          const { holidays, scheds } = eventsForDate(iso);

          return (
            <button
              key={iso}
              onClick={() => onSelectDay(iso)}
              className="bg-white text-left px-1.5 pt-1.5 pb-2 min-h-[80px] flex flex-col hover:bg-bg-cream transition-colors"
              style={{ opacity: inMonth ? 1 : 0.28 }}
            >
              <span
                className="text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mb-1 shrink-0"
                style={{
                  background: isToday ? "var(--color-primary)" : isSelected ? "var(--color-primary-wash)" : "transparent",
                  color: isToday ? "white" : isSelected ? "var(--color-primary)" : "var(--color-text-mid)",
                }}
              >
                {day.getDate()}
              </span>
              <div className="flex flex-col gap-0.5 w-full overflow-hidden">
                {holidays.slice(0, 2).map(h => (
                  <span
                    key={h.id}
                    onClick={e => { e.stopPropagation(); onEventClick({ kind: "holiday", item: h }); }}
                    className="block w-full truncate rounded px-1 cursor-pointer hover:opacity-80"
                    style={{
                      background: h.schoolId ? HOLIDAY_SCHOOL_COLOR.bg : HOLIDAY_ORG_COLOR.bg,
                      color: h.schoolId ? HOLIDAY_SCHOOL_COLOR.text : HOLIDAY_ORG_COLOR.text,
                      fontSize: "10px", lineHeight: "16px",
                    }}
                  >
                    {h.title}
                  </span>
                ))}
                {scheds.slice(0, Math.max(0, 2 - holidays.length)).map(s => {
                  const c = s.scope === "year_level" && s.yearLevel
                    ? YEAR_LEVEL_COLORS[s.yearLevel as YearLevelId] : CLASS_SCHED_COLOR;
                  const cls = classes.find(x => x.id === s.classId);
                  return (
                    <span
                      key={s.id}
                      onClick={e => { e.stopPropagation(); onEventClick({ kind: "schedule", item: s }); }}
                      className="block w-full truncate rounded px-1 cursor-pointer hover:opacity-80"
                      style={{ background: c.bg, color: c.text, fontSize: "10px", lineHeight: "16px" }}
                    >
                      {s.scope === "year_level" ? `${s.yearLevel} – ` : cls ? `${cls.name} – ` : ""}{s.title}
                    </span>
                  );
                })}
                {holidays.length + scheds.length > 2 && (
                  <span style={{ color: "var(--color-text-muted)", fontSize: "10px" }}>
                    +{holidays.length + scheds.length - 2} more
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
