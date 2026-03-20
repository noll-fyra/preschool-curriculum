"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { LEARNING_AREAS } from "@/lib/types";
import type { LearningAreaId, Child, AttendanceStatus } from "@/lib/types";
import {
  getWeeklyDomainCoverage,
  getFlaggedChildren,
} from "@/lib/dashboard-utils";
import { getWeekStart } from "@/lib/assignments";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { AttendanceDot } from "@/components/teacher/AttendanceDot";
import { getChildDisplayName } from "@/lib/display-name";

type PresenceFilter = "all" | "present" | "absent";
type SortBy = "alpha" | "last_observed";
type ViewMode = "grid" | "list";

// ─── Contact sheet modal ──────────────────────────────────────────────────────

function ContactSheet({ child, onClose }: { child: Child; onClose: () => void }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 50 }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 51,
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          padding: "24px 20px 40px",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text-dark)" }}>
              {getChildDisplayName(child)}
            </div>
            <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 2 }}>Contact & emergency details</div>
          </div>
          <button
            onClick={onClose}
            style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--color-bg-warm)", border: "none", cursor: "pointer", fontSize: 18, color: "var(--color-text-mid)" }}
          >
            ×
          </button>
        </div>

        {child.primaryGuardian ? (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", marginBottom: 8 }}>PRIMARY GUARDIAN</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-dark)" }}>{child.primaryGuardian.name}</div>
            {child.primaryGuardian.phone && (
              <div style={{ fontSize: 13, color: "var(--color-text-mid)", marginTop: 3 }}>{child.primaryGuardian.phone}</div>
            )}
            {child.primaryGuardian.email && (
              <div style={{ fontSize: 13, color: "var(--color-text-mid)", marginTop: 2 }}>{child.primaryGuardian.email}</div>
            )}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 16 }}>No guardian details on record.</p>
        )}

        {child.flags && (Object.values(child.flags).some(Boolean)) && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", marginBottom: 8 }}>NOTES & ALERTS</div>
            {child.flags.allergy && (
              <div style={{ padding: "8px 12px", borderRadius: 8, background: "#FDECEA", color: "#B91C1C", fontSize: 13, marginBottom: 6, fontWeight: 600 }}>
                Allergy: {child.flags.allergy}
              </div>
            )}
            {child.flags.medicalNote && (
              <div style={{ padding: "8px 12px", borderRadius: 8, background: "#FEF3D7", color: "#A06010", fontSize: 13, marginBottom: 6 }}>
                Medical: {child.flags.medicalNote}
              </div>
            )}
            {child.flags.specialNeed && (
              <div style={{ padding: "8px 12px", borderRadius: 8, background: "#EFF6FF", color: "#1D4ED8", fontSize: 13, marginBottom: 6 }}>
                Special need: {child.flags.specialNeed}
              </div>
            )}
            {child.flags.welfareConcern && (
              <div style={{ padding: "8px 12px", borderRadius: 8, background: "#FDECEA", color: "#B91C1C", fontSize: 13 }}>
                Welfare: {child.flags.welfareConcern}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ─── Domain dots row ──────────────────────────────────────────────────────────

function DomainDotsRow({ coverage }: { coverage: Record<LearningAreaId, boolean> }) {
  const AREA_COLORS: Record<LearningAreaId, string> = {
    LL: "#7BA3D4",
    NUM: "#F5A623",
    SED: "#4A9B6F",
    ACE: "#E8745A",
    DOW: "#9B6B9B",
    HMS: "#6BA3A3",
  };

  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {LEARNING_AREAS.map((area) => (
        <span
          key={area.id}
          title={area.name}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: coverage[area.id] ? AREA_COLORS[area.id] : "var(--color-border)",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

// ─── Grid card ────────────────────────────────────────────────────────────────

function ChildGridCard({
  child,
  attendanceStatus,
  coverage,
  isFlagged,
  lastObservedLabel,
  onViewContacts,
}: {
  child: Child;
  attendanceStatus: AttendanceStatus;
  coverage: Record<LearningAreaId, boolean>;
  isFlagged: boolean;
  lastObservedLabel: string;
  onViewContacts: () => void;
}) {
  const strongAreas = LEARNING_AREAS.filter((a) => coverage[a.id]).map((a) => a.id);
  const statusLine = strongAreas.length > 0
    ? `Active in ${strongAreas.join(", ")} this week`
    : lastObservedLabel;

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${isFlagged ? "#F5A623" : "var(--color-border)"}`,
        borderRadius: 14,
        padding: "14px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
      }}
    >
      {/* Flag indicator */}
      {isFlagged && (
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#F5A623",
          }}
          title="Needs attention"
        />
      )}

      {/* Avatar + attendance */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <ChildAvatar name={child.firstName} size="sm" />
          <span style={{ position: "absolute", bottom: -1, right: -1 }}>
            <AttendanceDot status={attendanceStatus} size={8} />
          </span>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-dark)", lineHeight: 1.2 }}>
            {child.firstName}
          </div>
          <div style={{ fontSize: 11, color: "var(--color-text-muted)", lineHeight: 1.2, marginTop: 1 }}>
            {child.lastName}
          </div>
        </div>
      </div>

      {/* Domain dots */}
      <DomainDotsRow coverage={coverage} />

      {/* Status line */}
      <div style={{ fontSize: 11, color: "var(--color-text-muted)", lineHeight: 1.4 }}>
        {statusLine}
      </div>

      {/* Actions row */}
      <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
        <Link
          href={`/teacher/child/${child.id}`}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "5px 0",
            borderRadius: 7,
            background: "var(--color-primary-wash)",
            color: "var(--color-primary)",
            fontSize: 11,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Profile
        </Link>
        <button
          onClick={onViewContacts}
          style={{
            flex: 1,
            padding: "5px 0",
            borderRadius: 7,
            background: "var(--color-bg-warm)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-mid)",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Contacts
        </button>
      </div>
    </div>
  );
}

// ─── List row ─────────────────────────────────────────────────────────────────

function ChildListRow({
  child,
  attendanceStatus,
  coverage,
  isFlagged,
  lastObservedLabel,
  onViewContacts,
}: {
  child: Child;
  attendanceStatus: AttendanceStatus;
  coverage: Record<LearningAreaId, boolean>;
  isFlagged: boolean;
  lastObservedLabel: string;
  onViewContacts: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        background: "#fff",
        border: `1px solid ${isFlagged ? "#F5A623" : "var(--color-border)"}`,
        borderRadius: 12,
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <ChildAvatar name={child.firstName} size="sm" />
        <span style={{ position: "absolute", bottom: -1, right: -1 }}>
          <AttendanceDot status={attendanceStatus} size={8} />
        </span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-dark)" }}>
          {getChildDisplayName(child)}
        </div>
        <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>
          {lastObservedLabel}
        </div>
      </div>

      <DomainDotsRow coverage={coverage} />

      {isFlagged && (
        <span
          style={{ width: 8, height: 8, borderRadius: "50%", background: "#F5A623", flexShrink: 0 }}
          title="Needs attention"
        />
      )}

      <div style={{ display: "flex", gap: 6 }}>
        <Link
          href={`/teacher/child/${child.id}`}
          style={{
            padding: "5px 12px",
            borderRadius: 7,
            background: "var(--color-primary-wash)",
            color: "var(--color-primary)",
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Profile
        </Link>
        <button
          onClick={onViewContacts}
          style={{
            padding: "5px 12px",
            borderRadius: 7,
            background: "var(--color-bg-warm)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-mid)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Contacts
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ChildrenPage() {
  const {
    children,
    activeClassId,
    observations,
    sessions,
    milestones,
    attendance,
    chatMessages,
    markAttendance,
    broadcastChatMessage,
    demoPersona,
  } = useStore();

  const today = new Date().toISOString().slice(0, 10);
  const weekStart = getWeekStart(new Date());

  const [presenceFilter, setPresenceFilter] = useState<PresenceFilter>("all");
  const [domainGapFilter, setDomainGapFilter] = useState<LearningAreaId | null>(null);
  const [flaggedFirst, setFlaggedFirst] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("alpha");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [contactChild, setContactChild] = useState<Child | null>(null);
  const [archiveConfirm, setArchiveConfirm] = useState<string | null>(null);

  const classChildren = useMemo(
    () => children.filter((c) => c.classId === activeClassId),
    [children, activeClassId]
  );

  // Attendance map
  const attendanceMap = useMemo(() => {
    const map = new Map<string, AttendanceStatus>();
    for (const a of attendance) {
      if (a.date === today) map.set(a.childId, a.status);
    }
    return map;
  }, [attendance, today]);

  // Weekly domain coverage per child
  const weeklyDomainCoverage = useMemo(() => {
    const result: Record<string, Record<LearningAreaId, boolean>> = {};
    for (const child of classChildren) {
      result[child.id] = getWeeklyDomainCoverage(
        child.id, observations, sessions, milestones, weekStart
      );
    }
    return result;
  }, [classChildren, observations, sessions, milestones, weekStart]);

  // Flagged children
  const flaggedChildIds = useMemo(
    () => getFlaggedChildren(classChildren, observations, chatMessages, milestones, today),
    [classChildren, observations, chatMessages, milestones, today]
  );

  // Last observed date per child
  const lastObservedMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const obs of observations) {
      const current = map.get(obs.childId);
      if (!current || obs.observedAt > current) {
        map.set(obs.childId, obs.observedAt);
      }
    }
    return map;
  }, [observations]);

  function getLastObservedLabel(childId: string): string {
    const last = lastObservedMap.get(childId);
    if (!last) return "Never observed";
    const days = Math.round((new Date(today).getTime() - new Date(last).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Observed today";
    if (days === 1) return "Observed yesterday";
    if (days < 7) return `Observed ${days} days ago`;
    if (days < 14) return "Observed last week";
    return `Observed ${Math.floor(days / 7)} weeks ago`;
  }

  // Filter + sort
  const filteredChildren = useMemo(() => {
    let list = [...classChildren];

    if (presenceFilter !== "all") {
      list = list.filter((c) => {
        const status = attendanceMap.get(c.id) ?? "pending";
        if (presenceFilter === "present") return status === "present" || status === "late";
        if (presenceFilter === "absent") return status === "absent";
        return true;
      });
    }

    if (domainGapFilter) {
      list = list.filter((c) => !weeklyDomainCoverage[c.id]?.[domainGapFilter]);
    }

    list.sort((a, b) => {
      if (sortBy === "last_observed") {
        const aLast = lastObservedMap.get(a.id) ?? "";
        const bLast = lastObservedMap.get(b.id) ?? "";
        return aLast.localeCompare(bLast); // least recently observed first
      }
      return a.firstName.localeCompare(b.firstName);
    });

    if (flaggedFirst) {
      list.sort((a, b) => {
        const aFlag = flaggedChildIds.has(a.id) ? 0 : 1;
        const bFlag = flaggedChildIds.has(b.id) ? 0 : 1;
        return aFlag - bFlag;
      });
    }

    return list;
  }, [classChildren, presenceFilter, domainGapFilter, sortBy, flaggedFirst, attendanceMap, weeklyDomainCoverage, flaggedChildIds, lastObservedMap]);

  function handleMarkAllPresent() {
    for (const child of classChildren) {
      markAttendance(child.id, today, "present");
    }
  }

  function handleMessageAll() {
    broadcastChatMessage(activeClassId, demoPersona.teacherEmployeeId, "teacher", "message", "Good morning! Just a quick update from the class today.", []);
  }

  return (
    <div style={{ padding: "20px 20px 40px", maxWidth: 1280, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text-dark)", marginBottom: 4 }}>
          Children
        </h1>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          {classChildren.length} children · {filteredChildren.length} shown
        </p>
      </div>

      {/* Filter + sort bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        {/* Presence filter */}
        <div style={{ display: "flex", gap: 4, background: "var(--color-bg-cream)", borderRadius: 10, padding: 3 }}>
          {(["all", "present", "absent"] as PresenceFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setPresenceFilter(f)}
              style={{
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                background: presenceFilter === f ? "#fff" : "transparent",
                border: presenceFilter === f ? "1px solid var(--color-border)" : "none",
                color: presenceFilter === f ? "var(--color-text-dark)" : "var(--color-text-muted)",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {f === "all" ? "All" : f === "present" ? "Present" : "Absent"}
            </button>
          ))}
        </div>

        {/* Domain gap filter */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {LEARNING_AREAS.map((area) => (
            <button
              key={area.id}
              onClick={() => setDomainGapFilter(domainGapFilter === area.id ? null : area.id)}
              style={{
                padding: "5px 10px",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                background: domainGapFilter === area.id ? "var(--color-text-dark)" : "var(--color-bg-warm)",
                border: "1px solid var(--color-border)",
                color: domainGapFilter === area.id ? "#fff" : "var(--color-text-mid)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              title={`Show children with no ${area.name} observation this week`}
            >
              No {area.id}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          style={{
            padding: "5px 10px",
            borderRadius: 8,
            fontSize: 12,
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-warm)",
            color: "var(--color-text-mid)",
            cursor: "pointer",
          }}
        >
          <option value="alpha">Sort: A–Z</option>
          <option value="last_observed">Sort: Least recently observed</option>
        </select>

        {/* Flagged first toggle */}
        <button
          onClick={() => setFlaggedFirst(!flaggedFirst)}
          style={{
            padding: "5px 12px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            background: flaggedFirst ? "#FEF3D7" : "var(--color-bg-warm)",
            border: flaggedFirst ? "1px solid #F5A623" : "1px solid var(--color-border)",
            color: flaggedFirst ? "#A06010" : "var(--color-text-muted)",
            cursor: "pointer",
          }}
        >
          Flagged first
        </button>

        {/* View toggle */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4, background: "var(--color-bg-cream)", borderRadius: 10, padding: 3 }}>
          {(["grid", "list"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setViewMode(v)}
              style={{
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                background: viewMode === v ? "#fff" : "transparent",
                border: viewMode === v ? "1px solid var(--color-border)" : "none",
                color: viewMode === v ? "var(--color-text-dark)" : "var(--color-text-muted)",
                cursor: "pointer",
              }}
            >
              {v === "grid" ? "Grid" : "List"}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk actions */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          onClick={handleMarkAllPresent}
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            background: "var(--color-bg-warm)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-mid)",
            cursor: "pointer",
          }}
        >
          Mark all present
        </button>
        <button
          onClick={handleMessageAll}
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            background: "var(--color-bg-warm)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-mid)",
            cursor: "pointer",
          }}
        >
          Message all parents
        </button>
        <a
          href="/school"
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            background: "var(--color-bg-warm)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-mid)",
            textDecoration: "none",
          }}
        >
          Add child (Admin)
        </a>
      </div>

      {/* Children grid / list */}
      {filteredChildren.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-muted)" }}>
          No children match the current filters.
        </div>
      ) : viewMode === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {filteredChildren.map((child) => (
            <ChildGridCard
              key={child.id}
              child={child}
              attendanceStatus={attendanceMap.get(child.id) ?? "pending"}
              coverage={weeklyDomainCoverage[child.id] ?? { LL: false, NUM: false, SED: false, ACE: false, DOW: false, HMS: false }}
              isFlagged={flaggedChildIds.has(child.id)}
              lastObservedLabel={getLastObservedLabel(child.id)}
              onViewContacts={() => setContactChild(child)}
            />
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filteredChildren.map((child) => (
            <ChildListRow
              key={child.id}
              child={child}
              attendanceStatus={attendanceMap.get(child.id) ?? "pending"}
              coverage={weeklyDomainCoverage[child.id] ?? { LL: false, NUM: false, SED: false, ACE: false, DOW: false, HMS: false }}
              isFlagged={flaggedChildIds.has(child.id)}
              lastObservedLabel={getLastObservedLabel(child.id)}
              onViewContacts={() => setContactChild(child)}
            />
          ))}
        </div>
      )}

      {/* Contact sheet */}
      {contactChild && (
        <ContactSheet child={contactChild} onClose={() => setContactChild(null)} />
      )}
    </div>
  );
}
