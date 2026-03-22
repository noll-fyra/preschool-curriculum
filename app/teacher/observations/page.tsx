"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { LEARNING_AREAS } from "@/lib/types";
import type { LearningAreaId } from "@/lib/types";
import { getWeeklyDomainCoverage } from "@/lib/dashboard-utils";
import { getWeekStart } from "@/lib/assignments";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { DomainTag } from "@/components/teacher/DomainTag";
import { getChildDisplayName } from "@/lib/display-name";

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)
    return date.toLocaleDateString("en-SG", { weekday: "long" });
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Insight panel ────────────────────────────────────────────────────────────

function InsightPanel({ childId }: { childId: string }) {
  const { children, observations, sessions, milestones, openQuickLog } =
    useStore();
  const child = children.find((c) => c.id === childId);
  const weekStart = getWeekStart(new Date());
  const today = new Date().toISOString().slice(0, 10);

  const coverage = useMemo(() => {
    return getWeeklyDomainCoverage(
      childId,
      observations,
      sessions,
      milestones,
      weekStart,
    );
  }, [childId, observations, sessions, milestones, weekStart]);

  const childObs = observations.filter((o) => o.childId === childId);
  const totalObs = childObs.length;

  // Last observed per domain
  const lastPerDomain = useMemo(() => {
    const map = new Map<LearningAreaId, string>();
    const milestoneArea = new Map<string, LearningAreaId>();
    for (const m of milestones) milestoneArea.set(m.id, m.areaId);
    for (const obs of childObs) {
      const area = milestoneArea.get(obs.milestoneId);
      if (!area) continue;
      const current = map.get(area);
      if (!current || obs.observedAt > current) map.set(area, obs.observedAt);
    }
    return map;
  }, [childObs, milestones]);

  if (!child) return null;

  const AREA_COLORS: Record<LearningAreaId, string> = {
    LL: "#7BA3D4",
    NUM: "#F5A623",
    SED: "#4A9B6F",
    ACE: "#E8745A",
    DOW: "#9B6B9B",
    HMS: "#6BA3A3",
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--color-border)",
        borderRadius: 14,
        padding: 16,
        position: "sticky",
        top: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <ChildAvatar name={child.firstName} size="sm" />
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--color-text-dark)",
            }}
          >
            {getChildDisplayName(child)}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            {totalObs} observations total
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--color-text-muted)",
          marginBottom: 8,
        }}
      >
        THIS WEEK
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginBottom: 14,
        }}
      >
        {LEARNING_AREAS.map((area) => {
          const last = lastPerDomain.get(area.id);
          const days = last
            ? Math.round(
                (new Date(today).getTime() - new Date(last).getTime()) /
                  (1000 * 60 * 60 * 24),
              )
            : null;
          return (
            <div
              key={area.id}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: coverage[area.id]
                    ? AREA_COLORS[area.id]
                    : "var(--color-border)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "var(--color-text-mid)",
                  flex: 1,
                }}
              >
                {area.id}
              </span>
              <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                {days === null
                  ? "Never"
                  : days === 0
                    ? "Today"
                    : `${days}d ago`}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={openQuickLog}
        style={{
          width: "100%",
          padding: "8px 0",
          borderRadius: 8,
          background: "var(--color-primary)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          marginBottom: 8,
        }}
      >
        Log observation for {child.firstName}
      </button>

      <button
        onClick={() => window.print()}
        style={{
          width: "100%",
          padding: "8px 0",
          borderRadius: 8,
          background: "var(--color-bg-warm)",
          color: "var(--color-text-mid)",
          fontSize: 12,
          fontWeight: 600,
          border: "1px solid var(--color-border)",
          cursor: "pointer",
        }}
      >
        Export {child.firstName}'s log
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ObservationsPage() {
  const { observations, children, milestones, employees, activeClassId } =
    useStore();

  const today = new Date().toISOString().slice(0, 10);

  const [childFilter, setChildFilter] = useState<string[]>([]);
  const [areaFilter, setAreaFilter] = useState<LearningAreaId | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [teacherFilter, setTeacherFilter] = useState<string | null>(null);
  const [untaggedOnly, setUntaggedOnly] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [childPickerOpen, setChildPickerOpen] = useState(false);

  const classChildren = useMemo(
    () => children.filter((c) => c.classId === activeClassId),
    [children, activeClassId],
  );

  const classChildIds = useMemo(
    () => new Set(classChildren.map((c) => c.id)),
    [classChildren],
  );

  const milestoneMap = useMemo(
    () => new Map(milestones.map((m) => [m.id, m])),
    [milestones],
  );

  const employeeMap = useMemo(
    () =>
      new Map(
        employees.map((e) => [e.id, `${e.firstName} ${e.lastName}`.trim()]),
      ),
    [employees],
  );

  // Filter observations
  const filtered = useMemo(() => {
    let list = observations.filter((o) => classChildIds.has(o.childId));

    if (childFilter.length > 0) {
      list = list.filter((o) => childFilter.includes(o.childId));
    }

    if (areaFilter) {
      list = list.filter(
        (o) => milestoneMap.get(o.milestoneId)?.areaId === areaFilter,
      );
    }

    if (dateFrom) list = list.filter((o) => o.observedAt >= dateFrom);
    if (dateTo) list = list.filter((o) => o.observedAt <= dateTo);

    if (teacherFilter) list = list.filter((o) => o.teacherId === teacherFilter);

    if (untaggedOnly)
      list = list.filter((o) => !o.note || o.note.trim() === "");

    // Sort: most recent first
    return [...list].sort((a, b) => b.observedAt.localeCompare(a.observedAt));
  }, [
    observations,
    classChildIds,
    childFilter,
    areaFilter,
    dateFrom,
    dateTo,
    teacherFilter,
    untaggedOnly,
    milestoneMap,
  ]);

  const unnotedCount = useMemo(
    () =>
      observations.filter(
        (o) =>
          classChildIds.has(o.childId) && (!o.note || o.note.trim() === ""),
      ).length,
    [observations, classChildIds],
  );

  // Unique teachers who have logged observations for this class
  const activeTeachers = useMemo(() => {
    const ids = new Set(
      observations
        .filter((o) => classChildIds.has(o.childId) && o.teacherId)
        .map((o) => o.teacherId!),
    );
    return Array.from(ids).map((id) => ({
      id,
      name: employeeMap.get(id) ?? id,
    }));
  }, [observations, classChildIds, employeeMap]);

  const showInsightPanel = childFilter.length === 1;

  return (
    <div className="flex min-h-0 w-full flex-1 overflow-hidden">
      {/* Main content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          overflowY: "auto",
          padding: "20px 20px 40px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--color-text-dark)",
              marginBottom: 4,
            }}
          >
            Observations
          </h1>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
            {filtered.length} of{" "}
            {observations.filter((o) => classChildIds.has(o.childId)).length}{" "}
            observations shown
          </p>
        </div>

        {/* Quality control banner */}
        {unnotedCount > 0 && !untaggedOnly && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "#FEF3D7",
              border: "1px solid #F5A623",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 13, color: "#A06010", flex: 1 }}>
              {unnotedCount} observation{unnotedCount !== 1 ? "s" : ""} have no
              note — tap to review.
            </span>
            <button
              onClick={() => setUntaggedOnly(true)}
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                background: "#F5A623",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Review
            </button>
          </div>
        )}

        {/* Filter bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          {/* Child filter */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setChildPickerOpen(!childPickerOpen)}
              style={{
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                background:
                  childFilter.length > 0
                    ? "var(--color-primary-wash)"
                    : "var(--color-bg-warm)",
                border:
                  childFilter.length > 0
                    ? "1.5px solid var(--color-primary)"
                    : "1px solid var(--color-border)",
                color:
                  childFilter.length > 0
                    ? "var(--color-primary)"
                    : "var(--color-text-mid)",
                cursor: "pointer",
              }}
            >
              {childFilter.length === 0
                ? "All children"
                : childFilter.length === 1
                  ? (classChildren.find((c) => c.id === childFilter[0])
                      ?.firstName ?? "1 child")
                  : `${childFilter.length} children`}
            </button>
            {childPickerOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 20,
                  background: "#fff",
                  border: "1px solid var(--color-border)",
                  borderRadius: 10,
                  padding: 8,
                  minWidth: 200,
                  maxHeight: 260,
                  overflowY: "auto",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  marginTop: 4,
                }}
              >
                <button
                  onClick={() => {
                    setChildFilter([]);
                    setChildPickerOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    fontSize: 13,
                    cursor: "pointer",
                    color: "var(--color-text-mid)",
                  }}
                >
                  All children
                </button>
                {classChildren.map((c) => {
                  const isSelected = childFilter.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setChildFilter(
                          isSelected
                            ? childFilter.filter((id) => id !== c.id)
                            : [...childFilter, c.id],
                        );
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%",
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: "none",
                        background: isSelected
                          ? "var(--color-primary-wash)"
                          : "none",
                        textAlign: "left",
                        fontSize: 13,
                        cursor: "pointer",
                        color: isSelected
                          ? "var(--color-primary)"
                          : "var(--color-text-dark)",
                        fontWeight: isSelected ? 600 : 400,
                      }}
                    >
                      <ChildAvatar name={c.firstName} size="xs" />
                      {getChildDisplayName(c)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Domain filter pills */}
          {LEARNING_AREAS.map((area) => (
            <button
              key={area.id}
              onClick={() =>
                setAreaFilter(areaFilter === area.id ? null : area.id)
              }
              style={{
                padding: "5px 10px",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                background:
                  areaFilter === area.id
                    ? "var(--color-text-dark)"
                    : "var(--color-bg-warm)",
                border: "1px solid var(--color-border)",
                color:
                  areaFilter === area.id ? "#fff" : "var(--color-text-mid)",
                cursor: "pointer",
              }}
            >
              {area.id}
            </button>
          ))}

          {/* Date range */}
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={{
              padding: "5px 8px",
              borderRadius: 8,
              fontSize: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-warm)",
              color: "var(--color-text-mid)",
            }}
            placeholder="From"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={{
              padding: "5px 8px",
              borderRadius: 8,
              fontSize: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-warm)",
              color: "var(--color-text-mid)",
            }}
            placeholder="To"
          />

          {/* Teacher filter */}
          {activeTeachers.length > 0 && (
            <select
              value={teacherFilter ?? ""}
              onChange={(e) => setTeacherFilter(e.target.value || null)}
              style={{
                padding: "5px 10px",
                borderRadius: 8,
                fontSize: 12,
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-warm)",
                color: "var(--color-text-mid)",
              }}
            >
              <option value="">All teachers</option>
              {activeTeachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          )}

          {/* Untagged toggle */}
          <button
            onClick={() => setUntaggedOnly(!untaggedOnly)}
            style={{
              padding: "5px 12px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              background: untaggedOnly ? "#FEF3D7" : "var(--color-bg-warm)",
              border: untaggedOnly
                ? "1px solid #F5A623"
                : "1px solid var(--color-border)",
              color: untaggedOnly ? "#A06010" : "var(--color-text-muted)",
              cursor: "pointer",
            }}
          >
            No note only
          </button>

          {/* Clear filters */}
          {(childFilter.length > 0 ||
            areaFilter ||
            dateFrom ||
            dateTo ||
            teacherFilter ||
            untaggedOnly) && (
            <button
              onClick={() => {
                setChildFilter([]);
                setAreaFilter(null);
                setDateFrom("");
                setDateTo("");
                setTeacherFilter(null);
                setUntaggedOnly(false);
              }}
              style={{
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 12,
                background: "none",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Observation feed */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "var(--color-text-muted)",
            }}
          >
            No observations match the current filters.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map((obs) => {
              const child = children.find((c) => c.id === obs.childId);
              const milestone = milestoneMap.get(obs.milestoneId);
              if (!child || !milestone) return null;

              const isExpanded = expandedIds.has(obs.id);
              const hasNote = obs.note && obs.note.trim().length > 0;
              const noteExcerpt = hasNote ? obs.note!.slice(0, 120) : null;
              const needsExpand = obs.note && obs.note.length > 120;
              const teacherName = obs.teacherId
                ? employeeMap.get(obs.teacherId)
                : null;

              return (
                <div
                  key={obs.id}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    padding: "12px 14px",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  {/* Avatar */}
                  <Link
                    href={`/teacher/child/${child.id}`}
                    style={{ flexShrink: 0, textDecoration: "none" }}
                  >
                    <ChildAvatar name={child.firstName} size="sm" />
                  </Link>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 4,
                      }}
                    >
                      <Link
                        href={`/teacher/child/${child.id}`}
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--color-text-dark)",
                          textDecoration: "none",
                        }}
                      >
                        {getChildDisplayName(child)}
                      </Link>
                      <DomainTag areaId={milestone.areaId} size="sm" />
                      {!hasNote && (
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "#F5A623",
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                          title="No note"
                        />
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--color-text-dark)",
                        lineHeight: 1.5,
                        marginBottom: 4,
                      }}
                    >
                      {milestone.statement}
                    </div>

                    {hasNote && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--color-text-mid)",
                          lineHeight: 1.5,
                          marginBottom: 4,
                        }}
                      >
                        {isExpanded ? obs.note : noteExcerpt}
                        {needsExpand && !isExpanded && "…"}
                        {needsExpand && (
                          <button
                            onClick={() => {
                              const next = new Set(expandedIds);
                              if (isExpanded) next.delete(obs.id);
                              else next.add(obs.id);
                              setExpandedIds(next);
                            }}
                            style={{
                              marginLeft: 4,
                              fontSize: 12,
                              color: "var(--color-primary)",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            {isExpanded ? "Show less" : "Show more"}
                          </button>
                        )}
                      </div>
                    )}

                    <div
                      style={{ fontSize: 11, color: "var(--color-text-muted)" }}
                    >
                      {formatRelativeDate(obs.observedAt)}
                      {teacherName && ` · ${teacherName}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Insight panel (desktop only) */}
      {showInsightPanel && (
        <div
          className="hidden min-h-0 lg:block"
          style={{
            width: 260,
            flexShrink: 0,
            padding: "20px 16px 20px 0",
            overflowY: "auto",
          }}
          onClick={() => childPickerOpen && setChildPickerOpen(false)}
        >
          <InsightPanel childId={childFilter[0]} />
        </div>
      )}

      {/* Close child picker on backdrop click */}
      {childPickerOpen && (
        <div
          onClick={() => setChildPickerOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 10 }}
        />
      )}
    </div>
  );
}
