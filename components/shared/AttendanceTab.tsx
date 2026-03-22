"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/lib/store";
import { getAttendanceSummary } from "@/lib/dashboard-utils";
import type { AttendanceStatus, Child } from "@/lib/types";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { SegmentControl } from "@/components/shared/SegmentControl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ── Shared constants ──────────────────────────────────────────────────────────

// ── Admin demo data ───────────────────────────────────────────────────────────

const ADMIN_TODAY_SUMMARY = {
  present: 22,
  absentNotified: 2,
  absentUnnotified: 1,
  late: 1,
  total: 25,
  checkinApp: 88,
};

const ADMIN_CLASS_TODAY = [
  {
    name: "Kingfisher N1",
    teacher: "Siti Binte Rahmat",
    present: 17,
    absentNotified: 2,
    absentUnnotified: 1,
    late: 0,
    total: 20,
  },
  {
    name: "Sparrow K2",
    teacher: "Lim Wei Ling",
    present: 5,
    absentNotified: 0,
    absentUnnotified: 0,
    late: 1,
    total: 5,
  },
];

const ADMIN_UNNOTIFIED = [
  {
    child: "Fatimah",
    class: "Kingfisher N1",
    parent: "Mdm Siti",
    phone: "+65 9455 6677",
  },
];

const ADMIN_TREND_ROWS = [
  {
    class: "Kingfisher N1",
    mon: 95,
    tue: 90,
    wed: 85,
    thu: 95,
    fri: 80,
    monthly: 91,
    term: 93,
  },
  {
    class: "Sparrow K2",
    mon: 100,
    tue: 100,
    wed: 100,
    thu: 80,
    fri: 100,
    monthly: 96,
    term: 97,
  },
];

const ADMIN_ABSENCES = [
  {
    child: "Rayan",
    class: "Kingfisher N1",
    date: "20 Mar",
    reason: "Illness",
    return: "21 Mar",
    status: "ongoing" as const,
  },
  {
    child: "Aisha",
    class: "Kingfisher N1",
    date: "18 Mar",
    reason: "Family trip",
    return: "20 Mar",
    status: "resolved" as const,
  },
  {
    child: "Fatimah",
    class: "Kingfisher N1",
    date: "20 Mar",
    reason: "—",
    return: "Unknown",
    status: "unexplained" as const,
  },
  {
    child: "Dev",
    class: "Sparrow K2",
    date: "19 Mar",
    reason: "Doctor appointment",
    return: "20 Mar",
    status: "resolved" as const,
  },
  {
    child: "Omar",
    class: "Kingfisher N1",
    date: "14 Mar",
    reason: "Illness",
    return: "17 Mar",
    status: "resolved" as const,
  },
];

const ABSENCE_STATUS_STYLES = {
  resolved: { bg: "#dcfce7", text: "#15803d", label: "Resolved" },
  ongoing: { bg: "#fef9c3", text: "#a16207", label: "Ongoing" },
  unexplained: { bg: "#fee2e2", text: "#b91c1c", label: "Unexplained" },
};

function pct(n: number, total: number) {
  return Math.round((n / total) * 100);
}

// ── Teacher sub-views ─────────────────────────────────────────────────────────

type AttendanceFilter = AttendanceStatus | "all";

function TeacherSummaryStrip({
  present,
  absent,
  late,
  pending,
  filter,
  onFilter,
}: {
  present: number;
  absent: number;
  late: number;
  pending: number;
  filter: AttendanceFilter;
  onFilter: (f: AttendanceFilter) => void;
}) {
  const stats: { label: string; value: number; color: string; status: AttendanceStatus }[] = [
    { label: "Present", value: present, color: "#22c55e", status: "present" },
    { label: "Absent",  value: absent,  color: "#ef4444", status: "absent"  },
    { label: "Late",    value: late,    color: "#f59e0b", status: "late"    },
    { label: "Pending", value: pending, color: "#94a3b8", status: "pending" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-5">
      {stats.map((s) => {
        const active = filter === s.status;
        return (
          <button
            key={s.label}
            onClick={() => onFilter(active ? "all" : s.status)}
            className="text-left"
          >
            <Card
              className="shadow-none transition-shadow"
              style={active ? { boxShadow: `0 0 0 2px ${s.color}` } : undefined}
            >
              <CardContent className="p-4">
                <div className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--color-text-mid)" }}>
                  {s.label}
                </div>
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}

// ── Contact parent modal ─────────────────────────────────────────────────────

function ContactParentModal({ childName, onClose }: { childName: string; onClose: () => void }) {
  return (
    <>
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200 }}
        onClick={onClose}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          borderRadius: 14,
          padding: "28px 32px",
          zIndex: 201,
          width: "min(400px, 90vw)",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--color-primary-wash)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
              fill="var(--color-primary)"
            />
          </svg>
        </div>
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--color-text-dark)",
            marginBottom: 6,
          }}
        >
          Contacting {childName}&apos;s parent
        </p>
        <p style={{ fontSize: 13, color: "var(--color-text-mid)", marginBottom: 24 }}>
          Our AI caller is contacting the parent now.
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "8px 24px",
            borderRadius: 8,
            background: "var(--color-primary)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Done
        </button>
      </div>
    </>
  );
}

// ── Attendance list row ───────────────────────────────────────────────────────

const STATUS_BADGE: Record<AttendanceStatus, { bg: string; text: string; label: string }> = {
  present: { bg: "#dcfce7", text: "#15803d", label: "Present" },
  absent:  { bg: "#fee2e2", text: "#b91c1c", label: "Absent" },
  late:    { bg: "#fef9c3", text: "#a16207", label: "Late" },
  pending: { bg: "var(--color-bg-deep)", text: "var(--color-text-mid)", label: "Pending" },
};

function AttendanceRow({
  child,
  status,
  absentReason,
  today,
  onMark,
  employeeId,
}: {
  child: Child;
  status: AttendanceStatus;
  absentReason?: string;
  today: string;
  onMark: (childId: string, date: string, status: AttendanceStatus, reason?: string, employeeId?: string) => void;
  employeeId?: string;
}) {
  const [showAbsentInput, setShowAbsentInput] = useState(false);
  const [absentDraft, setAbsentDraft] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showMenuFor, setShowMenuFor] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const badge = STATUS_BADGE[status];
  const fullName = `${child.firstName} ${child.lastName}`.trim();

  function handleCheckIn() {
    onMark(child.id, today, "present", undefined, employeeId);
    setShowAbsentInput(false);
  }

  function handleMarkAbsent() {
    setShowAbsentInput(true);
  }

  function handleSaveAbsent() {
    onMark(child.id, today, "absent", absentDraft.trim() || undefined);
    setShowAbsentInput(false);
    setAbsentDraft("");
  }

  function handleCancelAbsent() {
    setShowAbsentInput(false);
    setAbsentDraft("");
  }

  function handleReset() {
    onMark(child.id, today, "pending");
    setShowResetConfirm(false);
    setShowMenuFor(false);
  }

  return (
    <>
      {showContactModal && (
        <ContactParentModal
          childName={child.firstName}
          onClose={() => setShowContactModal(false)}
        />
      )}

      {/* Main row */}
      <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
        {/* Name — shrinks to content */}
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2.5">
            <ChildAvatar name={child.firstName} size="xs" />
            <span className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
              {fullName}
            </span>
          </div>
        </td>

        {/* Status badge — shrinks to content */}
        <td className="px-4 py-3 whitespace-nowrap">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ background: badge.bg, color: badge.text }}
          >
            {badge.label}
          </span>
        </td>

        {/* Actions — takes all remaining space, right-aligned */}
        <td className="px-4 py-3 w-full text-right">
          <div className="flex items-center justify-end gap-2">
            {(status === "pending" || status === "late") && (
              <>
                <button
                  onClick={handleCheckIn}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap"
                  style={{ background: "#dcfce7", color: "#15803d" }}
                >
                  Check in
                </button>
                <button
                  onClick={handleMarkAbsent}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap"
                  style={{ background: "var(--color-bg-deep)", color: "var(--color-text-mid)" }}
                >
                  Mark absent
                </button>
                {status === "late" && (
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap"
                    style={{ background: "#fef9c3", color: "#a16207" }}
                  >
                    Contact parent
                  </button>
                )}
              </>
            )}

            {(status === "present" || status === "absent") && (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowMenuFor((v) => !v)}
                  className="text-xs font-medium px-2.5 py-1.5 rounded-lg"
                  style={{
                    background: "var(--color-bg-deep)",
                    color: "var(--color-text-mid)",
                    letterSpacing: "0.05em",
                  }}
                  aria-label="More options"
                >
                  •••
                </button>
                {showMenuFor && (
                  <>
                    <div
                      style={{ position: "fixed", inset: 0, zIndex: 99 }}
                      onClick={() => setShowMenuFor(false)}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 4px)",
                        background: "#fff",
                        border: "1px solid var(--color-border)",
                        borderRadius: 10,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                        zIndex: 100,
                        minWidth: 140,
                        overflow: "hidden",
                      }}
                    >
                      {showResetConfirm ? (
                        <div style={{ padding: "12px 14px" }}>
                          <p className="text-xs mb-3" style={{ color: "var(--color-text-dark)" }}>
                            Reset {child.firstName} to pending?
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={handleReset}
                              className="flex-1 text-xs font-medium py-1.5 rounded-lg"
                              style={{ background: "var(--color-primary)", color: "#fff" }}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => { setShowResetConfirm(false); setShowMenuFor(false); }}
                              className="flex-1 text-xs font-medium py-1.5 rounded-lg"
                              style={{ background: "var(--color-bg-deep)", color: "var(--color-text-mid)" }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowResetConfirm(true)}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-bg-warm"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          Reset status
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </td>
      </tr>

      {/* Inline absence reason row */}
      {showAbsentInput && (
        <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
          <td colSpan={3} className="px-4 pb-3 pt-0">
            <div
              className="rounded-lg p-3 flex flex-col gap-2"
              style={{ background: "var(--color-bg-cream)", border: "1px solid var(--color-border)" }}
            >
              <label className="text-xs font-medium" style={{ color: "var(--color-text-mid)" }}>
                Reason for absence (optional)
              </label>
              <input
                autoFocus
                value={absentDraft}
                onChange={(e) => setAbsentDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSaveAbsent(); if (e.key === "Escape") handleCancelAbsent(); }}
                placeholder="e.g. Illness, family trip…"
                className="text-sm rounded-md px-3 py-2 w-full outline-none"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "#fff",
                  color: "var(--color-text-dark)",
                }}
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCancelAbsent}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg"
                  style={{ background: "var(--color-bg-deep)", color: "var(--color-text-mid)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAbsent}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg"
                  style={{ background: "var(--color-primary)", color: "#fff" }}
                >
                  Save
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function TeacherAttendanceGrid({
  children: classChildren,
  filter,
  employeeId,
}: {
  children: Child[];
  filter: AttendanceFilter;
  employeeId: string | undefined;
}) {
  const { attendance, markAttendance } = useStore();

  const today = new Date().toISOString().slice(0, 10);

  const { statusMap, reasonMap } = useMemo(() => {
    const statusMap = new Map<string, AttendanceStatus>();
    const reasonMap = new Map<string, string>();
    for (const a of attendance) {
      if (a.date === today) {
        statusMap.set(a.childId, a.status);
        if (a.absentReason) reasonMap.set(a.childId, a.absentReason);
      }
    }
    return { statusMap, reasonMap };
  }, [attendance, today]);

  const sorted = useMemo(
    () => [...classChildren].sort((a, b) => a.firstName.localeCompare(b.firstName)),
    [classChildren]
  );

  const visible = filter === "all"
    ? sorted
    : sorted.filter((c) => (statusMap.get(c.id) ?? "pending") === filter);

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
      <table className="w-full table-auto">
        <thead>
          <tr style={{ background: "var(--color-bg-cream)", borderBottom: "1px solid var(--color-border)" }}>
            <th className="text-left px-4 py-2.5 text-xs font-medium whitespace-nowrap" style={{ color: "var(--color-text-mid)" }}>
              Child
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-medium whitespace-nowrap" style={{ color: "var(--color-text-mid)" }}>
              Status
            </th>
            {/* Actions header takes all remaining width */}
            <th className="w-full px-4 py-2.5" />
          </tr>
        </thead>
        <tbody style={{ background: "#fff" }}>
          {visible.map((child) => (
            <AttendanceRow
              key={child.id}
              child={child}
              status={statusMap.get(child.id) ?? "pending"}
              absentReason={reasonMap.get(child.id)}
              today={today}
              onMark={markAttendance}
              employeeId={employeeId}
            />
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-sm" style={{ color: "var(--color-text-mid)" }}>
                No children with this status.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TeacherTodayView() {
  const { children, attendance, activeClassId, demoPersona } = useStore();
  const today = new Date().toISOString().slice(0, 10);
  const [filter, setFilter] = useState<AttendanceFilter>("all");

  const classChildren = useMemo(
    () => children.filter((c) => c.classId === activeClassId),
    [children, activeClassId]
  );

  const summary = useMemo(
    () => getAttendanceSummary(children, attendance, activeClassId, today),
    [children, attendance, activeClassId, today]
  );

  return (
    <div className="space-y-4">
      <TeacherSummaryStrip
        present={summary.present}
        absent={summary.absent}
        late={summary.late}
        pending={summary.pending}
        filter={filter}
        onFilter={setFilter}
      />
      <TeacherAttendanceGrid
        children={classChildren}
        filter={filter}
        employeeId={demoPersona.teacherEmployeeId}
      />
    </div>
  );
}

function TeacherAbsencesView() {
  const { children, attendance, activeClassId } = useStore();
  const today = new Date().toISOString().slice(0, 10);

  const absentToday = useMemo(() => {
    const classChildIds = new Set(
      children.filter((c) => c.classId === activeClassId).map((c) => c.id)
    );
    return attendance
      .filter(
        (a) => a.date === today && a.status === "absent" && classChildIds.has(a.childId)
      )
      .map((a) => {
        const child = children.find((c) => c.id === a.childId);
        return child ? { child, reason: a.absentReason } : null;
      })
      .filter((x): x is { child: Child; reason: string | undefined } => x !== null);
  }, [children, attendance, activeClassId, today]);

  if (absentToday.length === 0) {
    return (
      <div
        className="rounded-xl border p-8 text-center"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p className="text-sm" style={{ color: "var(--color-text-mid)" }}>
          No absences recorded for today.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr
            className="border-b"
            style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
          >
            <th
              className="text-left px-5 py-2.5 font-medium text-xs"
              style={{ color: "var(--color-text-mid)" }}
            >
              Child
            </th>
            <th
              className="text-left px-5 py-2.5 font-medium text-xs"
              style={{ color: "var(--color-text-mid)" }}
            >
              Date
            </th>
            <th
              className="text-left px-5 py-2.5 font-medium text-xs"
              style={{ color: "var(--color-text-mid)" }}
            >
              Reason
            </th>
          </tr>
        </thead>
        <tbody>
          {absentToday.map(({ child, reason }) => (
            <tr
              key={child.id}
              className="border-b last:border-0"
              style={{ borderColor: "var(--color-border)" }}
            >
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <ChildAvatar name={child.firstName} size="xs" />
                  <span className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                    {child.firstName} {child.lastName}
                  </span>
                </div>
              </td>
              <td className="px-5 py-3 text-xs" style={{ color: "var(--color-text-mid)" }}>
                {today}
              </td>
              <td
                className="px-5 py-3 text-sm"
                style={{ color: reason ? "var(--color-text-dark)" : "#ef4444" }}
              >
                {reason ?? "No reason provided"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Admin sub-views ───────────────────────────────────────────────────────────

function AdminTodayView() {
  const [classFilter, setClassFilter] = useState("all");
  const classNames = ["all", ...ADMIN_CLASS_TODAY.map((c) => c.name)];
  const filteredClasses =
    classFilter === "all"
      ? ADMIN_CLASS_TODAY
      : ADMIN_CLASS_TODAY.filter((c) => c.name === classFilter);

  return (
    <div className="space-y-5">
      {/* School-wide summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Present", value: ADMIN_TODAY_SUMMARY.present, color: "#22c55e" },
          { label: "Absent – notified", value: ADMIN_TODAY_SUMMARY.absentNotified, color: "#f59e0b" },
          { label: "Absent – no notice", value: ADMIN_TODAY_SUMMARY.absentUnnotified, color: "#ef4444" },
          { label: "Late", value: ADMIN_TODAY_SUMMARY.late, color: "#94a3b8" },
        ].map((s) => (
          <Card key={s.label} className="shadow-none">
            <CardContent className="p-4">
              <div className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-muted-foreground mt-0.5 text-xs">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attendance rate */}
      <div className="bg-white rounded-xl border border-(--color-border) p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: "var(--color-text-dark)" }}>
            School-wide attendance today
          </span>
          <span className="text-lg font-bold tabular-nums" style={{ color: "var(--color-text-dark)" }}>
            {pct(ADMIN_TODAY_SUMMARY.present, ADMIN_TODAY_SUMMARY.total)}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--color-bg-cream)" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct(ADMIN_TODAY_SUMMARY.present, ADMIN_TODAY_SUMMARY.total)}%`,
              background: "var(--color-primary)",
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--color-text-mid)" }}>
          {ADMIN_TODAY_SUMMARY.checkinApp}% of check-ins completed via parent app
        </p>
      </div>

      {/* Per-class breakdown */}
      <div className="bg-white rounded-xl border border-(--color-border) overflow-hidden">
        <div className="px-5 py-3 border-b border-(--color-border) flex items-center justify-between">
          <h3 className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
            By class
          </h3>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
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
            {classNames.map((n) => (
              <option key={n} value={n}>
                {n === "all" ? "All classes" : n}
              </option>
            ))}
          </select>
        </div>
        {filteredClasses.map((cls) => (
          <div
            key={cls.name}
            className="px-5 py-4 border-b border-(--color-border) last:border-0"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-medium text-sm" style={{ color: "var(--color-text-dark)" }}>
                  {cls.name}
                </div>
                <div className="text-xs" style={{ color: "var(--color-text-mid)" }}>
                  {cls.teacher}
                </div>
              </div>
              <span className="text-sm font-bold tabular-nums" style={{ color: "var(--color-text-dark)" }}>
                {cls.present}/{cls.total}
              </span>
            </div>
            <div className="flex gap-3 text-xs">
              <span style={{ color: "#22c55e" }}>{cls.present} present</span>
              {cls.absentNotified > 0 && (
                <span style={{ color: "#f59e0b" }}>{cls.absentNotified} absent (notified)</span>
              )}
              {cls.absentUnnotified > 0 && (
                <span style={{ color: "#ef4444" }}>{cls.absentUnnotified} absent (no notice)</span>
              )}
              {cls.late > 0 && (
                <span style={{ color: "#94a3b8" }}>{cls.late} late</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Follow-up needed */}
      {ADMIN_UNNOTIFIED.length > 0 && (
        <div className="bg-white rounded-xl border border-[#fca5a5] overflow-hidden">
          <div
            className="px-5 py-3 border-b border-[#fca5a5] flex items-center gap-2"
            style={{ background: "#fff1f2" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
            <h3 className="font-semibold text-sm" style={{ color: "#b91c1c" }}>
              Follow-up required — no parent contact
            </h3>
          </div>
          {ADMIN_UNNOTIFIED.map((u) => (
            <div key={u.child} className="px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-medium text-sm" style={{ color: "var(--color-text-dark)" }}>
                  {u.child}
                </div>
                <div className="text-xs" style={{ color: "var(--color-text-mid)" }}>
                  {u.class} · {u.parent} · {u.phone}
                </div>
              </div>
              <button
                className="text-xs font-medium px-3 py-1.5 rounded-lg shrink-0"
                style={{ background: "#fee2e2", color: "#b91c1c" }}
              >
                Send follow-up
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminTrendsView() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-(--color-border) overflow-x-auto">
        <div className="px-5 py-3 border-b border-(--color-border)">
          <h3 className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
            This week — attendance rate by class and day
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-(--color-border)"
              style={{ background: "var(--color-bg-cream)" }}
            >
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Class
              </th>
              {days.map((d) => (
                <th
                  key={d}
                  className="text-center px-4 py-2.5 font-medium text-xs"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  {d}
                </th>
              ))}
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Monthly
              </th>
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Term
              </th>
            </tr>
          </thead>
          <tbody>
            {ADMIN_TREND_ROWS.map((row) => (
              <tr
                key={row.class}
                className="border-b border-(--color-border) last:border-0"
              >
                <td className="px-5 py-3 font-medium" style={{ color: "var(--color-text-dark)" }}>
                  {row.class}
                </td>
                {[row.mon, row.tue, row.wed, row.thu, row.fri].map((v, i) => (
                  <td
                    key={i}
                    className="px-4 py-3 text-center tabular-nums text-sm"
                    style={{ color: v < 85 ? "#f59e0b" : "var(--color-text-dark)" }}
                  >
                    {v}%
                  </td>
                ))}
                <td
                  className="px-4 py-3 text-center tabular-nums text-sm font-medium"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {row.monthly}%
                </td>
                <td
                  className="px-4 py-3 text-center tabular-nums text-sm font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  {row.term}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="rounded-xl border border-(--color-border) p-4"
        style={{ background: "var(--color-bg-cream)" }}
      >
        <p className="text-xs" style={{ color: "var(--color-text-mid)" }}>
          Attendance patterns can be an early signal of family stress or health issues. The
          admin's role is to ensure the teacher is aware and can have a supportive conversation
          with the family.
        </p>
      </div>
    </div>
  );
}

function AdminAbsencesView() {
  const [filter, setFilter] = useState<"all" | "unexplained" | "ongoing" | "resolved">("all");
  const filtered = ADMIN_ABSENCES.filter((a) => filter === "all" || a.status === filter);

  return (
    <div className="space-y-4">
      <div className="bg-muted flex w-fit flex-wrap gap-1 rounded-full p-1">
        {(["all", "unexplained", "ongoing", "resolved"] as const).map((f) => (
          <Button
            key={f}
            type="button"
            size="sm"
            variant={filter === f ? "default" : "ghost"}
            className="h-7 rounded-full px-3 text-xs font-medium capitalize shadow-none"
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-(--color-border) overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-(--color-border)"
              style={{ background: "var(--color-bg-cream)" }}
            >
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Child
              </th>
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Date
              </th>
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Reason
              </th>
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Expected return
              </th>
              <th
                className="text-center px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Status
              </th>
              <th className="px-5 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const s = ABSENCE_STATUS_STYLES[a.status];
              return (
                <tr
                  key={`${a.child}-${a.date}`}
                  className="border-b border-(--color-border) last:border-0"
                >
                  <td className="px-5 py-3">
                    <div className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                      {a.child}
                    </div>
                    <div className="text-xs" style={{ color: "var(--color-text-mid)" }}>
                      {a.class}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--color-text-mid)" }}>
                    {a.date}
                  </td>
                  <td
                    className="px-5 py-3 text-sm"
                    style={{ color: a.reason === "—" ? "#ef4444" : "var(--color-text-dark)" }}
                  >
                    {a.reason}
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--color-text-mid)" }}>
                    {a.return}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: s.bg, color: s.text }}
                    >
                      {s.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {a.status === "unexplained" && (
                      <Button type="button" variant="link" size="sm" className="h-auto p-0 text-xs">
                        Flag teacher
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type TeacherTab = "today" | "absences";
type AdminTab = "today" | "trends" | "absences";

const TEACHER_TABS: { id: TeacherTab; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "absences", label: "Absences" },
];

const ADMIN_TABS: { id: AdminTab; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "trends", label: "Trends" },
  { id: "absences", label: "Absences" },
];

interface AttendanceTabProps {
  mode: "teacher" | "admin";
}

export function AttendanceTab({ mode }: AttendanceTabProps) {
  const [teacherTab, setTeacherTab] = useState<TeacherTab>("today");
  const [adminTab, setAdminTab] = useState<AdminTab>("today");

  if (mode === "teacher") {
    return (
      <div>
        <SegmentControl value={teacherTab} onChange={setTeacherTab} options={TEACHER_TABS} />
        {teacherTab === "today" && <TeacherTodayView />}
        {teacherTab === "absences" && <TeacherAbsencesView />}
      </div>
    );
  }

  return (
    <div>
      <SegmentControl value={adminTab} onChange={setAdminTab} options={ADMIN_TABS} />
      {adminTab === "today" && <AdminTodayView />}
      {adminTab === "trends" && <AdminTrendsView />}
      {adminTab === "absences" && <AdminAbsencesView />}
    </div>
  );
}
