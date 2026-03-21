"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getActiveClassChildren } from "@/lib/selectors";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  const map: Record<ConfidenceLevel, { label: string; className: string }> = {
    rich: {
      label: "Rich",
      className: "bg-emerald-100 text-emerald-800 border-emerald-200/80",
    },
    thin: {
      label: "Thin",
      className: "bg-amber-100 text-amber-900 border-amber-200/80",
    },
    incomplete: {
      label: "Incomplete",
      className: "bg-red-100 text-red-800 border-red-200/80",
    },
  };
  const s = map[level];
  return (
    <Badge
      variant="outline"
      className={cn("shrink-0 font-medium", s.className)}
    >
      {s.label}
    </Badge>
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
    <div className="mx-auto max-w-2xl px-4 py-6 md:px-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Developmental Reports</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          End-of-term summaries for families
        </p>
      </div>

      {/* Progress bar */}
      <Card className="mb-6 shadow-none">
        <CardContent className="flex items-center gap-4 pt-4">
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                {sentCount} of {totalChildren} sent
              </span>
              <span
                className={cn(
                  "text-xs",
                  daysLeft <= 7 ? "text-destructive font-medium" : "text-muted-foreground"
                )}
              >
                {daysLeft === 0
                  ? "Due today"
                  : `Due in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`}
              </span>
            </div>
            <div className="bg-muted h-2 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{
                  width:
                    totalChildren > 0 ? `${(sentCount / totalChildren) * 100}%` : "0%",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 1 — Drafts */}
      {draftChildren.length > 0 && (
        <Section title="Not started" count={draftChildren.length}>
          {draftChildren.map(({ child, obsCount, areasCovered }) => {
            const level = getConfidence(obsCount, areasCovered);
            return (
              <Card key={child.id} className="shadow-none">
                <CardContent className="flex items-center gap-3 py-4">
                  <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {getChildDisplayName(child)}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {obsCount} observation{obsCount !== 1 ? "s" : ""} ·{" "}
                      {areasCovered}/6 areas
                    </p>
                  </div>
                  <ConfidenceBadge level={level} />
                  {level !== "rich" ? (
                    <Link
                      href={`/teacher/observations?child=${child.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "shrink-0 whitespace-nowrap text-xs font-semibold"
                      )}
                    >
                      Add obs →
                    </Link>
                  ) : null}
                  <Button
                    type="button"
                    size="sm"
                    className="shrink-0 text-xs font-semibold"
                    onClick={() => generateReport(child.id)}
                  >
                    Generate
                  </Button>
                </CardContent>
              </Card>
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
              <Card key={child.id} className="shadow-none">
                <CardContent className="flex items-center gap-3 py-4">
                  <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {getChildDisplayName(child)}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {obsCount} obs
                      {generatedDate ? ` · Generated ${generatedDate}` : ""}
                    </p>
                  </div>
                  <ConfidenceBadge level={level} />
                  <Badge
                    variant="outline"
                    className="shrink-0 border-amber-200 bg-amber-100 text-amber-900"
                  >
                    Draft
                  </Badge>
                  <Link
                    href={`/teacher/reports/${child.id}`}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                      "shrink-0 text-xs font-semibold"
                    )}
                  >
                    Review
                  </Link>
                </CardContent>
              </Card>
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
              <Card key={child.id} className="shadow-none">
                <CardContent className="flex items-center gap-3 py-4">
                  <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {getChildDisplayName(child)}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {obsCount} obs
                      {publishedDate ? ` · Sent ${publishedDate}` : ""}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="flex shrink-0 items-center gap-1 border-emerald-200 bg-emerald-100 text-emerald-800"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Delivered
                  </Badge>
                  <Link
                    href={`/teacher/reports/${child.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "shrink-0 text-xs font-semibold"
                    )}
                  >
                    View
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </Section>
      )}

      {activeChildren.length === 0 && (
        <p className="text-muted-foreground py-12 text-center text-sm">
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
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
          {title}
        </h2>
        <Badge variant="secondary" className="font-semibold tabular-nums">
          {count}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
