"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import type { Child, ChildAttendance, LearningAreaId, AttendanceStatus } from "@/lib/types";
import { LEARNING_AREAS } from "@/lib/types";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { DomainDot } from "@/components/teacher/DomainDot";

interface ChildrenGridProps {
  children: Child[];
  attendance: ChildAttendance[];
  weeklyDomainCoverage: Record<string, Record<LearningAreaId, boolean>>;
  flaggedChildIds: Set<string>;
  today: string;
}

const STATUS_COLOR: Record<AttendanceStatus, string> = {
  pending: "#3B82F6",
  present: "#4A9B6F",
  late:    "#F5A623",
  absent:  "#9CA3AF",
};

const STATUS_LABEL: Record<AttendanceStatus, string> = {
  pending: "Pending",
  present: "Present",
  late:    "Late",
  absent:  "Absent",
};

const ALL_STATUSES: AttendanceStatus[] = ["present", "late", "absent", "pending"];

export function ChildrenGrid({
  children: classChildren,
  attendance,
  weeklyDomainCoverage,
  flaggedChildIds,
  today,
}: ChildrenGridProps) {
  const router = useRouter();
  const { markAttendance } = useStore();

  const [pickerOpenFor, setPickerOpenFor] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<AttendanceStatus | "all">("all");

  const attendanceMap = new Map<string, AttendanceStatus>();
  const reasonMap = new Map<string, string>();
  for (const a of attendance) {
    if (a.date === today) {
      attendanceMap.set(a.childId, a.status);
      if (a.absentReason) reasonMap.set(a.childId, a.absentReason);
    }
  }

  function handleStatusChange(childId: string, status: AttendanceStatus) {
    markAttendance(childId, today, status);
    setPickerOpenFor(null);
  }

  const sorted = [...classChildren].sort((a, b) => a.firstName.localeCompare(b.firstName));
  const filtered = filterStatus === "all"
    ? sorted
    : sorted.filter((c) => (attendanceMap.get(c.id) ?? "pending") === filterStatus);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--color-text-mid)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {filterStatus === "all" ? classChildren.length : filtered.length} children
          {filterStatus !== "all" && (
            <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
              {" "}· {STATUS_LABEL[filterStatus]}
            </span>
          )}
        </h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as AttendanceStatus | "all")}
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "var(--color-text-mid)",
            background: "var(--color-bg-warm)",
            border: "1px solid var(--color-border)",
            borderRadius: 7,
            padding: "4px 8px",
            cursor: "pointer",
          }}
        >
          <option value="all">All</option>
          <option value="present">Present</option>
          <option value="late">Late</option>
          <option value="absent">Absent</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {filtered.map((child) => {
          const status = attendanceMap.get(child.id) ?? "pending";
          const reason = reasonMap.get(child.id);
          const domainCoverage = weeklyDomainCoverage[child.id] ?? {};
          const isFlagged = flaggedChildIds.has(child.id);
          const isPickerOpen = pickerOpenFor === child.id;
          const showStatusText = status === "absent" || status === "late";

          return (
            <div key={child.id} style={{ position: "relative" }}>
              <button
                onClick={() => router.push(`/teacher/child/${child.id}`)}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                  padding: "10px 6px",
                  borderRadius: 10,
                  background: status === "absent" ? "var(--color-bg-warm)" : "#fff",
                  border: "1px solid var(--color-border)",
                  cursor: "pointer",
                  textAlign: "center",
                  opacity: status === "absent" ? 0.6 : 1,
                  position: "relative",
                }}
              >
                {/* Flag icon */}
                {isFlagged && (
                  <span
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--color-primary)",
                    }}
                    title="Needs attention"
                  />
                )}

                {/* Avatar with attendance dot overlay */}
                <div style={{ position: "relative" }}>
                  <ChildAvatar name={child.firstName} size="sm" />
                  <span
                    style={{
                      position: "absolute",
                      bottom: -1,
                      right: -1,
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      backgroundColor: STATUS_COLOR[status],
                      border: "1.5px solid #fff",
                    }}
                    title={STATUS_LABEL[status]}
                  />
                </div>

                {/* Name */}
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--color-text-dark)",
                    lineHeight: 1.2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                  }}
                >
                  {child.firstName}
                </span>

                {/* Status text for absent/late */}
                {showStatusText && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: STATUS_COLOR[status],
                      lineHeight: 1,
                    }}
                  >
                    {STATUS_LABEL[status]}
                  </span>
                )}

                {/* Domain dots */}
                <div style={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
                  {LEARNING_AREAS.map((area) => (
                    <DomainDot
                      key={area.id}
                      areaId={area.id}
                      filled={domainCoverage[area.id] ?? false}
                      title={`${area.name}: ${domainCoverage[area.id] ? "observed this week" : "not yet this week"}`}
                    />
                  ))}
                </div>
              </button>

              {/* Attendance picker trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPickerOpenFor(isPickerOpen ? null : child.id);
                }}
                title={`Attendance: ${STATUS_LABEL[status]}`}
                style={{
                  position: "absolute",
                  bottom: 6,
                  right: 6,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: STATUS_COLOR[status],
                  border: "2px solid #fff",
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={`Change attendance for ${child.firstName}`}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                  <path d="M2 3l2 2 2-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Attendance picker popover */}
              {isPickerOpen && (
                <>
                  {/* Click-away backdrop */}
                  <div
                    style={{ position: "fixed", inset: 0, zIndex: 99 }}
                    onClick={() => setPickerOpenFor(null)}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 6px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#fff",
                      border: "1px solid var(--color-border)",
                      borderRadius: 10,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                      zIndex: 100,
                      minWidth: 140,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "8px 10px 4px",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--color-text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {child.firstName}
                    </div>
                    {ALL_STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(child.id, s);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          width: "100%",
                          padding: "7px 10px",
                          background: status === s ? "var(--color-bg-warm)" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          fontWeight: status === s ? 700 : 400,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: STATUS_COLOR[s],
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 13, color: "var(--color-text-dark)" }}>
                          {STATUS_LABEL[s]}
                        </span>
                        {status === s && (
                          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--color-text-muted)" }}>✓</span>
                        )}
                      </button>
                    ))}
                    {reason && (
                      <div
                        style={{
                          padding: "6px 10px 8px",
                          fontSize: 11,
                          color: "var(--color-text-muted)",
                          borderTop: "1px solid var(--color-border)",
                          fontStyle: "italic",
                        }}
                      >
                        {reason}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
