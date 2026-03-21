"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { SegmentControl } from "@/components/shared/SegmentControl";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getChildDisplayName } from "@/lib/display-name";
import { getChildAgeInYears } from "@/lib/child";
import type { Class, Child } from "@/lib/types";

// ── Helpers ────────────────────────────────────────────────────────────────

function getWeekStart(): string {
  const d = new Date("2026-03-16"); // fixed demo date (Monday of demo week)
  return d.toISOString().slice(0, 10);
}

function isProfileComplete(child: Child): boolean {
  return !!(child.dateOfBirth && child.primaryGuardian?.email);
}

function formatLastObs(date: string | undefined): string {
  if (!date) return "Never";
  // Demo date is 2026-03-20
  const today = new Date("2026-03-20");
  const obs = new Date(date);
  const days = Math.round((today.getTime() - obs.getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

// ── Status dot ─────────────────────────────────────────────────────────────

function Dot({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-mid)" }}>
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: on ? "#22c55e" : "#e2e8f0" }}
        title={label}
      />
      {label}
    </span>
  );
}

// ── Profile completeness indicator ─────────────────────────────────────────

function ProfileDot({ complete }: { complete: boolean }) {
  return (
    <span
      className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: complete ? "#22c55e" : "#f59e0b" }}
      title={complete ? "Profile complete" : "Profile incomplete"}
    />
  );
}

// ── Class detail panel ─────────────────────────────────────────────────────

function ClassDetail({ cls, onClose }: { cls: Class; onClose: () => void }) {
  const { children, employees, classTeacherAssignments, observations } = useStore();

  const weekStart = getWeekStart();
  const classChildren = children.filter((c) => c.classId === cls.id);

  const assignments = classTeacherAssignments.filter((a) => a.classId === cls.id);
  const lead = assignments.find((a) => a.isPrimary);
  const coTeachers = assignments.filter((a) => !a.isPrimary);

  const leadEmp = lead ? employees.find((e) => e.id === lead.employeeId) : null;
  const coEmps = coTeachers.map((a) => employees.find((e) => e.id === a.employeeId)).filter(Boolean);

  const obsThisWeek = observations.filter((o) => o.observedAt >= weekStart);
  const childrenObservedIds = new Set(obsThisWeek.map((o) => o.childId));
  const observedThisWeek = classChildren.filter((c) => childrenObservedIds.has(c.id)).length;

  // Per-child last obs
  const lastObsByChild = useMemo(() => {
    const map: Record<string, string> = {};
    for (const o of observations) {
      if (!map[o.childId] || o.observedAt > map[o.childId]) {
        map[o.childId] = o.observedAt;
      }
    }
    return map;
  }, [observations]);

  return (
    <div className="mt-3 rounded-xl border bg-white overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
      {/* Detail header */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-cream)" }}>
        <span className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
          {cls.name} — detail
        </span>
        <Button type="button" variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: "var(--color-border)" }}>
        {/* Teachers */}
        <div className="px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "var(--color-text-mid)" }}>Teachers</p>
          {leadEmp ? (
            <div className="mb-1">
              <span className="font-medium text-sm" style={{ color: "var(--color-text-dark)" }}>
                {leadEmp.firstName} {leadEmp.lastName}
              </span>
              <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--color-primary-wash)", color: "var(--color-primary)" }}>Lead</span>
            </div>
          ) : (
            <p className="text-sm" style={{ color: "#ef4444" }}>No lead assigned</p>
          )}
          {coEmps.map((e) => e && (
            <div key={e.id} className="text-sm" style={{ color: "var(--color-text-mid)" }}>
              {e.firstName} {e.lastName}
              <span className="ml-2 text-xs">Co-teacher</span>
            </div>
          ))}
        </div>

        {/* This week */}
        <div className="px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "var(--color-text-mid)" }}>This week</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "var(--color-text-mid)" }}>Children observed</span>
              <span className="font-medium tabular-nums" style={{ color: observedThisWeek === classChildren.length ? "var(--color-primary)" : "#f59e0b" }}>
                {observedThisWeek} / {classChildren.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--color-text-mid)" }}>Schedule</span>
              <span className="font-medium" style={{ color: cls.id === "class-2" ? "var(--color-primary)" : "#f59e0b" }}>
                {cls.id === "class-2" ? "Complete" : "Gaps"}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--color-text-mid)" }}>Updates sent</span>
              <span className="font-medium" style={{ color: "var(--color-primary)" }}>Yes</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "var(--color-text-mid)" }}>Actions</p>
          <div className="space-y-2">
            <Link href="/school/calendar" className="block text-sm font-medium" style={{ color: "var(--color-primary)" }}>
              View schedule →
            </Link>
            <Link href="/school/outcomes" className="block text-sm font-medium" style={{ color: "var(--color-primary)" }}>
              View outcomes →
            </Link>
            <Link href={`/school/classes/${cls.id}/edit`} className="block text-sm font-medium" style={{ color: "var(--color-primary)" }}>
              Edit class →
            </Link>
          </div>
        </div>
      </div>

      {/* Student list */}
      <div className="border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: "var(--color-border)" }}>
          <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-text-mid)" }}>
            Students ({classChildren.length})
          </span>
        </div>
        <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
          {classChildren.map((child) => {
            const complete = isProfileComplete(child);
            const lastObs = lastObsByChild[child.id];
            const hasFlag = !!(child.flags?.allergy || child.flags?.medicalNote || child.flags?.specialNeed);
            return (
              <li key={child.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-2">
                  <ProfileDot complete={complete} />
                  <div>
                    <span className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
                      {getChildDisplayName(child)}
                    </span>
                    {hasFlag && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ background: "#fef9c3", color: "#a16207" }}>
                        Flag
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: "var(--color-text-mid)" }}>
                  <span>Last obs: {formatLastObs(lastObs)}</span>
                  <Link href={`/school/students/${child.id}/edit`} style={{ color: "var(--color-primary)" }}>
                    Profile →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// ── Classes tab ────────────────────────────────────────────────────────────

function ClassesTab() {
  const { classes, children, employees, classTeacherAssignments } = useStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const CAPACITY = 20;

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Link
          href="/school/classes/new"
          className={cn(buttonVariants(), "font-semibold")}
        >
          Add class
        </Link>
      </div>

      {classes.map((cls) => {
        const enrolled = children.filter((c) => c.classId === cls.id).length;
        const assignments = classTeacherAssignments.filter((a) => a.classId === cls.id);
        const leadAssign = assignments.find((a) => a.isPrimary);
        const leadEmp = leadAssign ? employees.find((e) => e.id === leadAssign.employeeId) : null;
        const coAssigns = assignments.filter((a) => !a.isPrimary);
        const coEmps = coAssigns.map((a) => employees.find((e) => e.id === a.employeeId)).filter(Boolean);

        const scheduleOk = cls.id === "class-2"; // demo: Sparrow has a complete schedule
        const observationsActive = true;
        const updatesRunning = true;
        const isExpanded = expandedId === cls.id;

        return (
          <div key={cls.id}>
            <button
              onClick={() => setExpandedId(isExpanded ? null : cls.id)}
              className="w-full text-left rounded-xl border bg-white p-5 hover:shadow-sm transition-shadow"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-base" style={{ color: "var(--color-text-dark)" }}>
                      {cls.name}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--color-bg-cream)", color: "var(--color-text-mid)" }}>
                      {cls.preschoolYear}
                    </span>
                  </div>
                  <div className="mt-1 text-sm" style={{ color: "var(--color-text-mid)" }}>
                    {leadEmp ? (
                      <>
                        <span className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                          {leadEmp.firstName} {leadEmp.lastName}
                        </span>
                        {" "}· Lead
                      </>
                    ) : (
                      <span style={{ color: "#ef4444" }}>No lead teacher</span>
                    )}
                    {coEmps.length > 0 && (
                      <span> · {coEmps.map((e) => `${e!.firstName} ${e!.lastName}`).join(", ")} (co)</span>
                    )}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold tabular-nums" style={{ color: enrolled >= CAPACITY ? "#ef4444" : "var(--color-text-dark)" }}>
                    {enrolled}
                  </div>
                  <div className="text-xs" style={{ color: "var(--color-text-mid)" }}>of {CAPACITY} places</div>
                </div>
              </div>

              <div className="mt-3 flex gap-4 flex-wrap">
                <Dot on={scheduleOk} label="Schedule" />
                <Dot on={observationsActive} label="Observations" />
                <Dot on={updatesRunning} label="Updates" />
              </div>
            </button>

            {isExpanded && (
              <ClassDetail cls={cls} onClose={() => setExpandedId(null)} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Students tab ───────────────────────────────────────────────────────────

type ProfileFilter = "all" | "complete" | "incomplete";
type AttendanceFilter = "all" | "present" | "absent" | "no-checkin";
type SupportFilter = "all" | "flagged";

function StudentsTab() {
  const { children, classes, employees, classTeacherAssignments, observations } = useStore();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [profileFilter, setProfileFilter] = useState<ProfileFilter>("all");
  const [attendanceFilter, setAttendanceFilter] = useState<AttendanceFilter>("all");
  const [supportFilter, setSupportFilter] = useState<SupportFilter>("all");

  // Demo attendance data
  const ABSENT_TODAY = new Set(["child-rayan", "child-fatimah", "child-dev"]);
  const NO_CHECKIN = new Set(["child-fatimah"]);

  // Lead teacher per class
  const leadByClass = useMemo(() => {
    const map: Record<string, string> = {};
    for (const a of classTeacherAssignments) {
      if (a.isPrimary) {
        const emp = employees.find((e) => e.id === a.employeeId);
        if (emp) map[a.classId] = `${emp.firstName} ${emp.lastName}`;
      }
    }
    return map;
  }, [classTeacherAssignments, employees]);

  // Last observation per child
  const lastObsByChild = useMemo(() => {
    const map: Record<string, string> = {};
    for (const o of observations) {
      if (!map[o.childId] || o.observedAt > map[o.childId]) {
        map[o.childId] = o.observedAt;
      }
    }
    return map;
  }, [observations]);

  const filtered = useMemo(() => {
    return children.filter((c) => {
      if (classFilter && c.classId !== classFilter) return false;
      const name = getChildDisplayName(c).toLowerCase();
      if (search && !name.includes(search.toLowerCase())) return false;
      if (profileFilter === "complete" && !isProfileComplete(c)) return false;
      if (profileFilter === "incomplete" && isProfileComplete(c)) return false;
      if (attendanceFilter === "present" && ABSENT_TODAY.has(c.id)) return false;
      if (attendanceFilter === "absent" && !ABSENT_TODAY.has(c.id)) return false;
      if (attendanceFilter === "no-checkin" && !NO_CHECKIN.has(c.id)) return false;
      if (supportFilter === "flagged" && !c.flags?.specialNeed && !c.flags?.welfareConcern) return false;
      return true;
    }).sort((a, b) => getChildDisplayName(a).localeCompare(getChildDisplayName(b)));
  }, [children, search, classFilter, profileFilter, attendanceFilter, supportFilter]);

  const incompleteCount = children.filter((c) => !isProfileComplete(c)).length;

  return (
    <div className="space-y-4">
      {/* Search + add */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <Input
            type="text"
            placeholder="Search students…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Link
          href="/school/students/new"
          className={cn(buttonVariants(), "shrink-0 font-semibold")}
        >
          Add student
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg border text-sm"
          style={{ borderColor: "var(--color-border)" }}
        >
          <option value="">All classes</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select
          value={profileFilter}
          onChange={(e) => setProfileFilter(e.target.value as ProfileFilter)}
          className="px-2.5 py-1.5 rounded-lg border text-sm"
          style={{ borderColor: "var(--color-border)" }}
        >
          <option value="all">All profiles</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <select
          value={attendanceFilter}
          onChange={(e) => setAttendanceFilter(e.target.value as AttendanceFilter)}
          className="px-2.5 py-1.5 rounded-lg border text-sm"
          style={{ borderColor: "var(--color-border)" }}
        >
          <option value="all">All attendance</option>
          <option value="present">Present today</option>
          <option value="absent">Absent today</option>
          <option value="no-checkin">No check-in</option>
        </select>

        <select
          value={supportFilter}
          onChange={(e) => setSupportFilter(e.target.value as SupportFilter)}
          className="px-2.5 py-1.5 rounded-lg border text-sm"
          style={{ borderColor: "var(--color-border)" }}
        >
          <option value="all">All students</option>
          <option value="flagged">Needs support</option>
        </select>
      </div>

      {/* Count + bulk actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm" style={{ color: "var(--color-text-mid)" }}>
          {filtered.length} student{filtered.length !== 1 ? "s" : ""}
          {incompleteCount > 0 && (
            <span className="ml-2" style={{ color: "#f59e0b" }}>· {incompleteCount} incomplete profiles</span>
          )}
        </span>
        <div className="flex gap-2">
          <button
            className="text-xs font-medium px-3 py-1.5 rounded-lg border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
          >
            Export list
          </button>
          {incompleteCount > 0 && (
            <button
              className="text-xs font-medium px-3 py-1.5 rounded-lg"
              style={{ background: "var(--color-primary-wash)", color: "var(--color-primary)" }}
            >
              Request missing info ({incompleteCount})
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border overflow-hidden bg-white" style={{ borderColor: "var(--color-border)" }}>
        {/* Column headers */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 border-b text-xs font-medium" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-cream)", color: "var(--color-text-mid)" }}>
          <span>Student</span>
          <span className="hidden sm:block">Lead teacher</span>
          <span>Last obs</span>
        </div>
        <ul className="divide-y divide-[var(--color-border)]">
          {filtered.map((child) => {
            const cls = child.classId ? classes.find((c) => c.id === child.classId) : null;
            const ageYears = getChildAgeInYears(child);
            const complete = isProfileComplete(child);
            const lastObs = lastObsByChild[child.id];
            const isAbsent = ABSENT_TODAY.has(child.id);
            const leadName = child.classId ? (leadByClass[child.classId] ?? "—") : "—";

            return (
              <li key={child.id}>
                <Link
                  href={`/school/students/${child.id}/edit`}
                  className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-4 py-3.5 hover:bg-[var(--color-bg-cream)] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ProfileDot complete={complete} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm" style={{ color: "var(--color-text-dark)" }}>
                          {getChildDisplayName(child)}
                        </span>
                        {ageYears !== undefined && (
                          <span className="text-xs" style={{ color: "var(--color-text-mid)" }}>{ageYears}y</span>
                        )}
                        {isAbsent && (
                          <Badge
                            variant="outline"
                            className="border-red-200 bg-red-50 text-xs text-red-800"
                          >
                            Absent
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs truncate" style={{ color: "var(--color-text-mid)" }}>
                        {cls?.name ?? "Unassigned"}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block text-xs text-right" style={{ color: "var(--color-text-mid)" }}>
                    {leadName}
                  </div>
                  <div className="text-xs text-right tabular-nums" style={{ color: lastObs ? "var(--color-text-mid)" : "#ef4444" }}>
                    {formatLastObs(lastObs)}
                  </div>
                </Link>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-sm" style={{ color: "var(--color-text-mid)" }}>
              No students match the current filters.
            </li>
          )}
        </ul>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs" style={{ color: "var(--color-text-mid)" }}>
        <span className="flex items-center gap-1.5"><ProfileDot complete={true} /> Profile complete</span>
        <span className="flex items-center gap-1.5"><ProfileDot complete={false} /> Profile incomplete</span>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

type Tab = "classes" | "students";

const CLASS_STUDENT_TABS: { id: Tab; label: string }[] = [
  { id: "classes", label: "Classes" },
  { id: "students", label: "Students" },
];

export default function AdminClassesPage() {
  const [tab, setTab] = useState<Tab>("classes");

  return (
    <div className="max-w-4xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Classes & Students</h1>
      </div>

      <SegmentControl
        value={tab}
        onChange={setTab}
        options={CLASS_STUDENT_TABS}
      />

      {tab === "classes"  && <ClassesTab />}
      {tab === "students" && <StudentsTab />}
    </div>
  );
}
