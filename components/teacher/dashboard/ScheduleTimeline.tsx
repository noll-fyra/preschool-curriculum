"use client";

import { useState } from "react";
import type { ScheduleActivity } from "@/lib/dashboard-utils";
import { DomainTag } from "@/components/teacher/DomainTag";

interface ScheduleTimelineProps {
  activities: ScheduleActivity[];
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h < 12 ? "am" : "pm";
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")}${ampm}`;
}

function formatTimeRange(start?: string, end?: string): string {
  if (!start) return "";
  return end ? `${formatTime(start)} – ${formatTime(end)}` : formatTime(start);
}

const STATUS_STYLES = {
  done: {
    background: "var(--color-bg-warm)",
    border: "1px solid var(--color-border)",
    opacity: 0.45,
  },
  in_progress: {
    background: "var(--color-primary-wash)",
    border: "2px solid var(--color-primary)",
    opacity: 1,
  },
  upcoming: {
    background: "#fff",
    border: "1px solid var(--color-border)",
    opacity: 1,
  },
};

export function ScheduleTimeline({ activities }: ScheduleTimelineProps) {
  const [selected, setSelected] = useState<ScheduleActivity | null>(null);

  if (activities.length === 0) {
    return (
      <div>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--color-text-mid)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 10,
          }}
        >
          Today&apos;s Schedule
        </h2>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          No activities planned for today.
        </p>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--color-text-mid)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 10,
          }}
        >
          Today&apos;s Schedule
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {activities.map((activity) => {
            const style = STATUS_STYLES[activity.status];
            return (
              <button
                key={activity.id}
                onClick={() => setSelected(activity)}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  padding: "9px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  ...style,
                }}
              >
                {/* Time gutter */}
                <div
                  style={{
                    flexShrink: 0,
                    width: 52,
                    fontSize: 11,
                    color:
                      activity.status === "in_progress"
                        ? "var(--color-primary)"
                        : "var(--color-text-muted)",
                    fontWeight: activity.status === "in_progress" ? 700 : 400,
                    paddingTop: 1,
                    lineHeight: 1.3,
                  }}
                >
                  {activity.startTime ? formatTime(activity.startTime) : "TBD"}
                  {activity.durationMins && (
                    <div style={{ fontSize: 10, fontWeight: 400 }}>
                      {activity.durationMins}min
                    </div>
                  )}
                </div>

                {/* Activity content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--color-text-dark)",
                      textDecoration: activity.status === "done" ? "line-through" : "none",
                      marginBottom: activity.areaId ? 4 : 0,
                    }}
                  >
                    {activity.title}
                    {activity.status === "in_progress" && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 10,
                          fontWeight: 700,
                          background: "var(--color-primary)",
                          color: "#fff",
                          padding: "1px 5px",
                          borderRadius: 4,
                          verticalAlign: "middle",
                        }}
                      >
                        Now
                      </span>
                    )}
                  </div>
                  {activity.areaId && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <DomainTag areaId={activity.areaId} size="sm" />
                      {activity.childCount > 0 && (
                        <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                          {activity.childCount} {activity.childCount === 1 ? "child" : "children"}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-5">
            {/* Status badge */}
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-3"
              style={{
                background:
                  selected.status === "in_progress"
                    ? "var(--color-primary-wash)"
                    : selected.status === "done"
                    ? "var(--color-bg-deep)"
                    : "var(--color-bg-cream)",
                color:
                  selected.status === "in_progress"
                    ? "var(--color-primary)"
                    : "var(--color-text-mid)",
              }}
            >
              {selected.status === "in_progress"
                ? "Happening now"
                : selected.status === "done"
                ? "Completed"
                : "Upcoming"}
            </span>

            <h2
              className="text-lg font-bold mb-2"
              style={{ color: "var(--color-text-dark)" }}
            >
              {selected.title}
            </h2>

            {/* Time */}
            <p
              className="text-sm mb-1"
              style={{ color: "var(--color-text-mid)" }}
            >
              {formatTimeRange(selected.startTime, selected.endTime)}
              {selected.durationMins && (
                <span style={{ color: "var(--color-text-muted)", marginLeft: 6 }}>
                  · {selected.durationMins} min
                </span>
              )}
            </p>

            {/* Domain tag */}
            {selected.areaId && (
              <div className="mb-3">
                <DomainTag areaId={selected.areaId} />
              </div>
            )}

            {/* Description */}
            {selected.description && (
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--color-text-mid)" }}
              >
                {selected.description}
              </p>
            )}

            <button
              onClick={() => setSelected(null)}
              className="w-full px-4 py-2 rounded-xl text-sm font-semibold border mt-2"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-mid)",
                background: "white",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
