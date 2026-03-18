"use client";

import { DAY_START, DAY_END, formatHour } from "@/lib/calendar-utils";

// ─── Layout constants ─────────────────────────────────────────────────────────

const HOUR_PX    = 64;  // pixels per hour
const TOTAL_PX   = ((DAY_END - DAY_START) / 60) * HOUR_PX; // 768 px (7 AM–7 PM)
const HEADER_H   = 48;  // column header height
const ALLDAY_H   = 36;  // all-day row height
const GUTTER_W   = 64;  // left time-label gutter width
const COL_MIN_W  = 130; // minimum column width

const HOURS: number[] = Array.from(
  { length: (DAY_END - DAY_START) / 60 + 1 },
  (_, i) => DAY_START / 60 + i
);

const BORDER = "var(--color-border)";
const BG     = "white";

function minutesToPx(minutes: number): number {
  return ((minutes - DAY_START) / 60) * HOUR_PX;
}

// ─── Public types ─────────────────────────────────────────────────────────────

export interface TimedEvent {
  id: string;
  title: string;
  subtitle?: string;
  /** Minutes from midnight (e.g. 9 * 60 = 540 for 9:00 AM) */
  startMinutes: number;
  endMinutes: number;
  color: { bg: string; text: string };
  onClick?: () => void;
}

export interface AllDayEvent {
  id: string;
  title: string;
  color: { bg: string; text: string };
  onClick?: () => void;
}

export interface TimeColumn {
  key: string;
  /** Primary label, e.g. "Mon 16" or "Kingfisher K1" */
  label: string;
  /** Secondary label, e.g. month abbreviation or year level */
  sublabel?: string;
  isToday?: boolean;
  /** When true, draws the "now" line regardless of todayKey match */
  showNow?: boolean;
  allDayEvents: AllDayEvent[];
  timedEvents: TimedEvent[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TimeGrid({
  columns,
  /** Key of the column that should display the "now" line (today's ISO date or class id) */
  todayKey,
  /** Current time in minutes from midnight */
  nowMinutes,
}: {
  columns: TimeColumn[];
  todayKey?: string;
  nowMinutes?: number;
}) {
  const hasAllDay = columns.some((c) => c.allDayEvents.length > 0);
  const totalAllDayH = hasAllDay ? ALLDAY_H : 0;

  return (
    <div
      style={{
        overflowX: "auto",
        overflowY: "auto",
        maxHeight: "calc(100vh - 260px)",
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
        background: BG,
      }}
    >
      <div style={{ display: "flex", minWidth: columns.length * COL_MIN_W + GUTTER_W }}>

        {/* ── Left gutter ─────────────────────────────────────────────── */}
        <div
          style={{
            width: GUTTER_W,
            flexShrink: 0,
            position: "sticky",
            left: 0,
            zIndex: 10,
            background: BG,
            borderRight: `1px solid ${BORDER}`,
          }}
        >
          {/* Header spacer */}
          <div style={{ height: HEADER_H, borderBottom: `1px solid ${BORDER}` }} />

          {/* "All day" label */}
          {hasAllDay && (
            <div
              style={{
                height: totalAllDayH,
                borderBottom: `1px solid ${BORDER}`,
                display: "flex",
                alignItems: "center",
                paddingLeft: 6,
              }}
            >
              <span style={{ fontSize: 9, color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                All day
              </span>
            </div>
          )}

          {/* Hour labels */}
          <div style={{ position: "relative", height: TOTAL_PX }}>
            {HOURS.map((h) => (
              <div
                key={h}
                style={{
                  position: "absolute",
                  top: minutesToPx(h * 60) - 7,
                  right: 8,
                  fontSize: 10,
                  color: "var(--color-text-muted)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                {formatHour(h)}
              </div>
            ))}
          </div>
        </div>

        {/* ── Columns ──────────────────────────────────────────────────── */}
        {columns.map((col, colIdx) => (
          <div
            key={col.key}
            style={{
              flex: 1,
              minWidth: COL_MIN_W,
              borderLeft: colIdx > 0 ? `1px solid ${BORDER}` : undefined,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Column header */}
            <div
              style={{
                height: HEADER_H,
                borderBottom: `1px solid ${BORDER}`,
                background: BG,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 8px",
                gap: 1,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: col.isToday ? "var(--color-primary)" : "var(--color-text-dark)",
                  lineHeight: 1.2,
                }}
              >
                {col.label}
              </span>
              {col.sublabel && (
                <span style={{ fontSize: 10, color: "var(--color-text-muted)", lineHeight: 1.2 }}>
                  {col.sublabel}
                </span>
              )}
            </div>

            {/* All-day events */}
            {hasAllDay && (
              <div
                style={{
                  height: totalAllDayH,
                  borderBottom: `1px solid ${BORDER}`,
                  background: BG,
                  padding: "3px 4px",
                  overflow: "hidden",
                }}
              >
                {col.allDayEvents.slice(0, 2).map((e) => (
                  <div
                    key={e.id}
                    onClick={e.onClick}
                    style={{
                      background: e.color.bg,
                      color: e.color.text,
                      fontSize: 10,
                      lineHeight: "14px",
                      borderRadius: 4,
                      padding: "1px 5px",
                      marginBottom: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      cursor: e.onClick ? "pointer" : "default",
                    }}
                  >
                    {e.title}
                  </div>
                ))}
                {col.allDayEvents.length > 2 && (
                  <div style={{ fontSize: 9, color: "var(--color-text-muted)", paddingLeft: 4 }}>
                    +{col.allDayEvents.length - 2} more
                  </div>
                )}
              </div>
            )}

            {/* Timed area */}
            <div style={{ position: "relative", height: TOTAL_PX, background: BG }}>

              {/* Hour grid lines */}
              {HOURS.map((h) => (
                <div
                  key={h}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: minutesToPx(h * 60),
                    borderTop: `1px solid ${BORDER}`,
                    opacity: 0.45,
                    pointerEvents: "none",
                  }}
                />
              ))}

              {/* "Now" line */}
              {(col.key === todayKey || col.showNow === true) &&
                nowMinutes !== undefined &&
                nowMinutes >= DAY_START &&
                nowMinutes <= DAY_END && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: minutesToPx(nowMinutes),
                      zIndex: 6,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#E74C3C",
                        marginLeft: -4,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, height: 2, background: "#E74C3C" }} />
                  </div>
                )}

              {/* Timed events */}
              {col.timedEvents.map((e) => {
                const clampedStart = Math.max(e.startMinutes, DAY_START);
                const clampedEnd   = Math.min(e.endMinutes, DAY_END);
                const top    = minutesToPx(clampedStart);
                const height = Math.max(minutesToPx(clampedEnd) - top, 22);
                return (
                  <div
                    key={e.id}
                    onClick={e.onClick}
                    style={{
                      position: "absolute",
                      top,
                      height,
                      left: 4,
                      right: 4,
                      background: e.color.bg,
                      borderRadius: 8,
                      padding: "4px 7px",
                      overflow: "hidden",
                      zIndex: 3,
                      cursor: e.onClick ? "pointer" : "default",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: e.color.text,
                        lineHeight: "14px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {e.title}
                    </div>
                    {height > 32 && e.subtitle && (
                      <div
                        style={{
                          fontSize: 10,
                          color: e.color.text,
                          opacity: 0.7,
                          lineHeight: "13px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {e.subtitle}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
