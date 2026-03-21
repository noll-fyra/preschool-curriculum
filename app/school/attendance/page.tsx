"use client";

import { useState } from "react";
import { SegmentControl } from "@/components/shared/SegmentControl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Tab = "today" | "trends" | "absences";

// ── Demo data ──────────────────────────────────────────────────────────────

const TODAY_SUMMARY = {
  present: 22,
  absentNotified: 2,
  absentUnnotified: 1,
  late: 1,
  total: 25,
  checkinApp: 88,
};

const CLASS_TODAY = [
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

const UNNOTIFIED = [
  {
    child: "Fatimah",
    class: "Kingfisher N1",
    parent: "Mdm Siti",
    phone: "+65 9455 6677",
  },
];

const TREND_ROWS = [
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

const ABSENCES = [
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

const STATUS_STYLES = {
  resolved: { bg: "#dcfce7", text: "#15803d", label: "Resolved" },
  ongoing: { bg: "#fef9c3", text: "#a16207", label: "Ongoing" },
  unexplained: { bg: "#fee2e2", text: "#b91c1c", label: "Unexplained" },
};

// ── Sub-views ──────────────────────────────────────────────────────────────

function pct(n: number, total: number) {
  return Math.round((n / total) * 100);
}

function TodayView() {
  return (
    <div className="space-y-5">
      {/* School-wide summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Present", value: TODAY_SUMMARY.present, color: "#22c55e" },
          {
            label: "Absent – notified",
            value: TODAY_SUMMARY.absentNotified,
            color: "#f59e0b",
          },
          {
            label: "Absent – no notice",
            value: TODAY_SUMMARY.absentUnnotified,
            color: "#ef4444",
          },
          { label: "Late", value: TODAY_SUMMARY.late, color: "#94a3b8" },
        ].map((s) => (
          <Card key={s.label} className="shadow-none">
            <CardContent className="p-4">
              <div
                className="text-2xl font-bold tabular-nums"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <div
                className="text-muted-foreground mt-0.5 text-xs"
              >
                {s.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attendance rate */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-dark)" }}
          >
            School-wide attendance today
          </span>
          <span
            className="text-lg font-bold tabular-nums"
            style={{ color: "var(--color-text-dark)" }}
          >
            {pct(TODAY_SUMMARY.present, TODAY_SUMMARY.total)}%
          </span>
        </div>
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ background: "var(--color-bg-cream)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct(TODAY_SUMMARY.present, TODAY_SUMMARY.total)}%`,
              background: "var(--color-primary)",
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--color-text-mid)" }}>
          {TODAY_SUMMARY.checkinApp}% of check-ins completed via parent app
        </p>
      </div>

      {/* Per-class */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--color-border)]">
          <h3
            className="font-semibold text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            By class
          </h3>
        </div>
        {CLASS_TODAY.map((cls) => (
          <div
            key={cls.name}
            className="px-5 py-4 border-b border-[var(--color-border)] last:border-0"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div
                  className="font-medium text-sm"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {cls.name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  {cls.teacher}
                </div>
              </div>
              <span
                className="text-sm font-bold tabular-nums"
                style={{ color: "var(--color-text-dark)" }}
              >
                {cls.present}/{cls.total}
              </span>
            </div>
            <div className="flex gap-3 text-xs">
              <span style={{ color: "#22c55e" }}>{cls.present} present</span>
              {cls.absentNotified > 0 && (
                <span style={{ color: "#f59e0b" }}>
                  {cls.absentNotified} absent (notified)
                </span>
              )}
              {cls.absentUnnotified > 0 && (
                <span style={{ color: "#ef4444" }}>
                  {cls.absentUnnotified} absent (no notice)
                </span>
              )}
              {cls.late > 0 && (
                <span style={{ color: "#94a3b8" }}>{cls.late} late</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Follow-up needed */}
      {UNNOTIFIED.length > 0 && (
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
          {UNNOTIFIED.map((u) => (
            <div
              key={u.child}
              className="px-5 py-4 flex items-center justify-between gap-4"
            >
              <div>
                <div
                  className="font-medium text-sm"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {u.child}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  {u.class} · {u.parent} · {u.phone}
                </div>
              </div>
              <button
                className="text-xs font-medium px-3 py-1.5 rounded-lg flex-shrink-0"
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

function TrendsView() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-x-auto">
        <div className="px-5 py-3 border-b border-[var(--color-border)]">
          <h3
            className="font-semibold text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            This week — attendance rate by class and day
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-[var(--color-border)]"
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
            {TREND_ROWS.map((row) => (
              <tr
                key={row.class}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                <td
                  className="px-5 py-3 font-medium"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {row.class}
                </td>
                {[row.mon, row.tue, row.wed, row.thu, row.fri].map((v, i) => (
                  <td
                    key={i}
                    className="px-4 py-3 text-center tabular-nums text-sm"
                    style={{
                      color: v < 85 ? "#f59e0b" : "var(--color-text-dark)",
                    }}
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
        className="rounded-xl border border-[var(--color-border)] p-4"
        style={{ background: "var(--color-bg-cream)" }}
      >
        <p className="text-xs" style={{ color: "var(--color-text-mid)" }}>
          Attendance patterns can be an early signal of family stress or health
          issues. The admin&apos;s role is to ensure the teacher is aware and can
          have a supportive conversation with the family.
        </p>
      </div>
    </div>
  );
}

function AbsencesView() {
  const [filter, setFilter] = useState<
    "all" | "unexplained" | "ongoing" | "resolved"
  >("all");

  const filtered = ABSENCES.filter(
    (a) => filter === "all" || a.status === filter,
  );

  return (
    <div className="space-y-4">
      {/* Filter */}
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

      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-[var(--color-border)]"
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
              const s = STATUS_STYLES[a.status];
              return (
                <tr
                  key={`${a.child}-${a.date}`}
                  className="border-b border-[var(--color-border)] last:border-0"
                >
                  <td className="px-5 py-3">
                    <div
                      className="font-medium"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {a.child}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-mid)" }}
                    >
                      {a.class}
                    </div>
                  </td>
                  <td
                    className="px-5 py-3 text-xs"
                    style={{ color: "var(--color-text-mid)" }}
                  >
                    {a.date}
                  </td>
                  <td
                    className="px-5 py-3 text-sm"
                    style={{
                      color:
                        a.reason === "—" ? "#ef4444" : "var(--color-text-dark)",
                    }}
                  >
                    {a.reason}
                  </td>
                  <td
                    className="px-5 py-3 text-xs"
                    style={{ color: "var(--color-text-mid)" }}
                  >
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

// ── Main page ──────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "trends", label: "Trends" },
  { id: "absences", label: "Absences" },
];

export default function AttendancePage() {
  const [tab, setTab] = useState<Tab>("today");

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Attendance Overview</h1>
        <p className="text-muted-foreground mt-0.5 text-sm">
          School-wide attendance tracking and absence management.
        </p>
      </div>

      <SegmentControl value={tab} onChange={setTab} options={TABS} />

      {tab === "today" && <TodayView />}
      {tab === "trends" && <TrendsView />}
      {tab === "absences" && <AbsencesView />}
    </div>
  );
}
