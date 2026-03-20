"use client";

import type { Class } from "@/lib/types";

interface DashboardTopBarProps {
  teacherName: string;
  today: Date;
  classes: Class[];
  activeClassId: string;
  onClassChange: (classId: string) => void;
  onQuickLogOpen: () => void;
  onNotificationsOpen?: () => void;
  notificationCount?: number;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(d: Date): string {
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}


export function DashboardTopBar({
  teacherName,
  today,
  classes,
  activeClassId,
  onClassChange,
  onQuickLogOpen,
  onNotificationsOpen,
  notificationCount = 0,
}: DashboardTopBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 20px",
        borderBottom: "1px solid var(--color-border)",
        background: "#fff",
        flexShrink: 0,
      }}
    >
      {/* Left: teacher name + date */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--color-text-dark)" }}>
          {teacherName}
        </div>
        <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
          {formatDate(today)}
        </div>
      </div>

      {/* Centre: class selector */}
      <div style={{ flex: "0 0 auto" }}>
        <select
          value={activeClassId}
          onChange={(e) => onClassChange(e.target.value)}
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--color-text-dark)",
            background: "var(--color-bg-warm)",
            border: "1.5px solid var(--color-border)",
            borderRadius: 10,
            padding: "8px 14px",
            cursor: "pointer",
          }}
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.preschoolYear})
            </option>
          ))}
        </select>
      </div>

      {/* Right: notifications + quick-log */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
        {/* Notifications bell */}
        {onNotificationsOpen && (
          <button
            onClick={onNotificationsOpen}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "var(--color-bg-warm)",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              color: "var(--color-text-mid)",
              flexShrink: 0,
            }}
            aria-label="Open notifications"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.5A4.5 4.5 0 003.5 6v2.5L2 10h12l-1.5-1.5V6A4.5 4.5 0 008 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M6.5 12a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {notificationCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -3,
                  right: -3,
                  minWidth: 16,
                  height: 16,
                  borderRadius: 8,
                  background: "#E8745A",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 3px",
                  lineHeight: 1,
                }}
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>
        )}

        {/* Quick-log CTA */}
        <button
          onClick={onQuickLogOpen}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 8,
            background: "var(--color-primary)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Log observation
        </button>
      </div>
    </div>
  );
}
