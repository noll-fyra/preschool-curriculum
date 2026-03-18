"use client";

import type { NurtureStore } from "@/lib/store";
import type { DetailEvent } from "@/lib/calendar-utils";
import {
  WEEKDAYS, YEAR_LEVEL_COLORS, CLASS_SCHED_COLOR, HOLIDAY_ORG_COLOR, HOLIDAY_SCHOOL_COLOR,
} from "@/lib/calendar-utils";

/**
 * Read-only event detail modal used by teacher and parent.
 *
 * variant="teacher" — shows scope label on schedules; labels org holiday as "Org-wide holiday"
 * variant="parent"  — hides scope label; labels org holiday as "Public holiday"
 */
export function ReadOnlyEventDetailModal({
  event, classes, variant, onClose,
}: {
  event: DetailEvent;
  classes: NurtureStore["classes"];
  variant: "teacher" | "parent";
  onClose: () => void;
}) {
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
    typeLabel = h.schoolId ? "School closure" : (variant === "teacher" ? "Org-wide holiday" : "Public holiday");
    details = (
      <div className="space-y-1 text-xs" style={{ color: c.text, opacity: 0.75 }}>
        <p>{h.startDate === h.endDate ? h.startDate : `${h.startDate} – ${h.endDate}`}</p>
        {variant === "teacher" && <p>{typeLabel}</p>}
      </div>
    );
  } else {
    const s = event.item;
    const cls = classes.find(x => x.id === s.classId);
    const recLabel = s.recurrence === "weekly"
      ? `Weekly — ${(s.daysOfWeek ?? []).map(d => WEEKDAYS.find(w => w.value === d)?.label).join(", ")}`
      : `Monthly — day ${s.dayOfMonth}`;

    if (variant === "teacher") {
      const scopeLabel = s.scope === "year_level" ? `Year level: ${s.yearLevel}` : `Class: ${cls?.name ?? s.classId}`;
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
    } else {
      typeLabel = s.scope === "year_level" ? `Year ${s.yearLevel} schedule` : `${cls?.name ?? "Class"} schedule`;
      details = (
        <div className="space-y-1 text-xs" style={{ color: c.text, opacity: 0.75 }}>
          <p>{recLabel}</p>
          {(s.startTime || s.endTime) && (
            <p>{s.startTime ?? "—"}{s.endTime ? ` – ${s.endTime}` : ""}</p>
          )}
          {s.description && <p>{s.description}</p>}
        </div>
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-5">
        <span
          className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-3"
          style={{ background: c.bg, color: c.text }}
        >
          {typeLabel}
        </span>
        <h2 className="text-lg font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>
          {event.item.title}
        </h2>
        <div className="mb-5">{details}</div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 rounded-xl text-sm font-semibold border"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
