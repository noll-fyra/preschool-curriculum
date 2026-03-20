"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getActiveClassChildren } from "@/lib/selectors";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import type { LearningAreaId } from "@/lib/types";

const ALL_AREAS: LearningAreaId[] = ["LL", "NUM", "SED", "ACE", "DOW", "HMS"];

// Term end date — hardcoded for demo (end of current Singapore school term)
const TERM_END = new Date("2026-03-28");

type ConfidenceLevel = "rich" | "thin" | "incomplete";

function getConfidence(obsCount: number, areasCovered: number): ConfidenceLevel {
  if (obsCount >= 8 && areasCovered >= 6) return "rich";
  if (obsCount >= 3) return "thin";
  return "incomplete";
}

function daysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const styles: Record<ConfidenceLevel, { bg: string; text: string; label: string }> = {
    rich: { bg: "#E8F5EE", text: "#2D7A4F", label: "Rich" },
    thin: { bg: "#FEF3D7", text: "#A06010", label: "Thin" },
    incomplete: { bg: "#FEE9E5", text: "#B84C3A", label: "Incomplete" },
  };
  const s = styles[level];
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}

export default function ReportsPage() {
  const store = useStore();
  const { generateReport, observations, milestones } = store;
  const activeChildren = getActiveClassChildren(store).sort((a, b) =>
    getChildDisplayName(a).localeCompare(getChildDisplayName(b))
  );

  const milestoneMap = useMemo(
    () => new Map(milestones.map((m) => [m.id, m])),
    [milestones]
  );

  // Per-child observation stats
  const childStats = useMemo(() => {
    return activeChildren.map((child) => {
      const childObs = observations.filter((o) => o.childId === child.id);
      const areasCovered = new Set(
        childObs.map((o) => milestoneMap.get(o.milestoneId)?.areaId).filter(Boolean)
      ).size;
      return { child, obsCount: childObs.length, areasCovered };
    });
  }, [activeChildren, observations, milestoneMap]);

  const draftChildren = childStats.filter(
    ({ child }) => !store.reports.find((r) => r.childId === child.id)
  );
  const inReviewReports = childStats.filter(({ child }) =>
    store.reports.find((r) => r.childId === child.id && r.status === "draft")
  );
  const sentReports = childStats.filter(({ child }) =>
    store.reports.find((r) => r.childId === child.id && r.status === "published")
  );

  const totalChildren = activeChildren.length;
  const sentCount = sentReports.length;
  const daysLeft = daysUntil(TERM_END);

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          Developmental Reports
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          End-of-term summaries for families
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="rounded-2xl p-4 mb-6 flex items-center gap-4"
        style={{ background: "#fff", border: "1px solid var(--color-border)" }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold" style={{ color: "var(--color-text-dark)" }}>
              {sentCount} of {totalChildren} sent
            </span>
            <span className="text-xs" style={{ color: daysLeft <= 7 ? "#B84C3A" : "var(--color-text-muted)" }}>
              {daysLeft === 0 ? "Due today" : `Due in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--color-bg-warm)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: totalChildren > 0 ? `${(sentCount / totalChildren) * 100}%` : "0%",
                background: "var(--color-primary)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Section 1 — Drafts */}
      {draftChildren.length > 0 && (
        <Section title="Not started" count={draftChildren.length}>
          {draftChildren.map(({ child, obsCount, areasCovered }) => {
            const level = getConfidence(obsCount, areasCovered);
            return (
              <div
                key={child.id}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-[var(--color-border)]"
              >
                <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
                    {getChildDisplayName(child)}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {obsCount} observation{obsCount !== 1 ? "s" : ""} · {areasCovered}/6 areas
                  </p>
                </div>
                <ConfidenceBadge level={level} />
                {level !== "rich" ? (
                  <Link
                    href={`/teacher/observations?child=${child.id}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 whitespace-nowrap"
                    style={{ background: "var(--color-bg-warm)", color: "var(--color-text-mid)", border: "1px solid var(--color-border)" }}
                  >
                    Add obs →
                  </Link>
                ) : null}
                <button
                  onClick={() => generateReport(child.id)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{ background: "var(--color-primary)", color: "white" }}
                >
                  Generate
                </button>
              </div>
            );
          })}
        </Section>
      )}

      {/* Section 2 — In Review */}
      {inReviewReports.length > 0 && (
        <Section title="In review" count={inReviewReports.length}>
          {inReviewReports.map(({ child, obsCount, areasCovered }) => {
            const report = store.reports.find((r) => r.childId === child.id)!;
            const level = getConfidence(obsCount, areasCovered);
            const generatedDate = report.generatedAt
              ? new Date(report.generatedAt).toLocaleDateString("en-SG", { day: "numeric", month: "short" })
              : null;
            return (
              <div
                key={child.id}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-[var(--color-border)]"
              >
                <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
                    {getChildDisplayName(child)}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {obsCount} obs{generatedDate ? ` · Generated ${generatedDate}` : ""}
                  </p>
                </div>
                <ConfidenceBadge level={level} />
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: "#FEF3D7", color: "#A06010" }}
                >
                  Draft
                </span>
                <Link
                  href={`/teacher/reports/${child.id}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{ background: "var(--color-primary-wash)", color: "var(--color-primary)" }}
                >
                  Review
                </Link>
              </div>
            );
          })}
        </Section>
      )}

      {/* Section 3 — Sent */}
      {sentReports.length > 0 && (
        <Section title="Sent" count={sentReports.length}>
          {sentReports.map(({ child, obsCount }) => {
            const report = store.reports.find((r) => r.childId === child.id)!;
            const publishedDate = report.publishedAt
              ? new Date(report.publishedAt).toLocaleDateString("en-SG", { day: "numeric", month: "short" })
              : null;
            return (
              <div
                key={child.id}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-[var(--color-border)]"
              >
                <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
                    {getChildDisplayName(child)}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {obsCount} obs{publishedDate ? ` · Sent ${publishedDate}` : ""}
                  </p>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 flex items-center gap-1"
                  style={{ background: "#E8F5EE", color: "#2D7A4F" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Delivered
                </span>
                <Link
                  href={`/teacher/reports/${child.id}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{ background: "var(--color-bg-warm)", color: "var(--color-text-mid)", border: "1px solid var(--color-border)" }}
                >
                  View
                </Link>
              </div>
            );
          })}
        </Section>
      )}

      {activeChildren.length === 0 && (
        <p className="text-sm text-center py-12" style={{ color: "var(--color-text-muted)" }}>
          No children enrolled in this class.
        </p>
      )}
    </div>
  );
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          {title}
        </h2>
        <span
          className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
          style={{ background: "var(--color-bg-warm)", color: "var(--color-text-muted)" }}
        >
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
