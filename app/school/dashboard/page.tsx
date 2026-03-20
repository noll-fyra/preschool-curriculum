"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

type StatusLevel = "green" | "amber" | "red";

function StatusBadge({ level }: { level: StatusLevel }) {
  const colors: Record<StatusLevel, string> = {
    green: "#22c55e",
    amber: "#f59e0b",
    red: "#ef4444",
  };
  return (
    <span
      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
      style={{ background: colors[level] }}
    />
  );
}

function StatusPanel({
  title,
  level,
  href,
  children,
}: {
  title: string;
  level: StatusLevel;
  href: string;
  children: React.ReactNode;
}) {
  const borderColors: Record<StatusLevel, string> = {
    green: "rgba(34,197,94,0.3)",
    amber: "rgba(245,158,11,0.3)",
    red: "rgba(239,68,68,0.3)",
  };
  return (
    <Link
      href={href}
      className="block rounded-xl border bg-white p-5 hover:shadow-sm transition-shadow"
      style={{ borderColor: borderColors[level] }}
    >
      <div className="flex items-center gap-2 mb-3">
        <StatusBadge level={level} />
        <h2
          className="font-semibold text-sm"
          style={{ color: "var(--color-text-dark)" }}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-2">{children}</div>
    </Link>
  );
}

function Metric({
  label,
  value,
  flag,
}: {
  label: string;
  value: string | number;
  flag?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-xs" style={{ color: "var(--color-text-mid)" }}>
        {label}
      </span>
      <span
        className="text-sm font-semibold tabular-nums"
        style={{ color: flag ? "#ef4444" : "var(--color-text-dark)" }}
      >
        {value}
      </span>
    </div>
  );
}

function FeedItem({ time, text }: { time: string; text: string }) {
  return (
    <div className="flex gap-3 text-sm">
      <span
        className="text-xs tabular-nums flex-shrink-0 pt-px"
        style={{ color: "var(--color-text-mid)" }}
      >
        {time}
      </span>
      <span style={{ color: "var(--color-text-dark)" }}>{text}</span>
    </div>
  );
}

export default function AdminDashboardPage() {
  const children = useStore((s) => s.children);
  const classes = useStore((s) => s.classes);

  const totalStudents = children.length;
  const class1Count = children.filter((c) => c.classId === "class-1").length;
  const class2Count = children.filter((c) => c.classId === "class-2").length;
  const incompleteProfiles = children.filter(
    (c) => !c.primaryGuardian?.email || !c.dateOfBirth,
  ).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-xl font-bold"
          style={{ color: "var(--color-text-dark)" }}
        >
          School Overview
        </h1>
        <p
          className="text-sm mt-0.5"
          style={{ color: "var(--color-text-mid)" }}
        >
          Yew Tee Campus · Term 2, 2026 ·{" "}
          {new Date().toLocaleDateString("en-SG", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* Status grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Classes & Students */}
        <StatusPanel
          title="Classes & Students"
          level="amber"
          href="/school/classes"
        >
          <Metric label="Total enrolled" value={totalStudents} />
          <Metric label="Kingfisher N1" value={`${class1Count} / 20`} />
          <Metric label="Sparrow K2" value={`${class2Count} / 20`} />
          <Metric
            label="Incomplete profiles"
            value={incompleteProfiles}
            flag={incompleteProfiles > 0}
          />
          <Metric label="New this week" value={2} />
        </StatusPanel>

        {/* Teacher Coverage */}
        <StatusPanel
          title="Teacher Coverage"
          level="green"
          href="/school/assignments"
        >
          <Metric
            label="Classes with lead teacher"
            value={`${classes.length} / ${classes.length}`}
          />
          <Metric label="Classes with co-teacher" value="0 / 2" flag />
          <Metric label="Teachers active this week" value="2 / 2" />
          <Metric label="Pending assignments" value={0} />
        </StatusPanel>

        {/* Curriculum & Schedule */}
        <StatusPanel
          title="Curriculum & Schedule"
          level="amber"
          href="/school/calendar"
        >
          <Metric label="Classes with full schedule" value="1 / 2" flag />
          <Metric label="Domains covered this week" value="5 / 6" />
          <Metric label="Missing domain" value="Creative Arts" flag />
          <Metric label="Activities in library" value={24} />
        </StatusPanel>

        {/* Parent Engagement */}
        <StatusPanel
          title="Parent Engagement"
          level="amber"
          href="/school/engagement"
        >
          <Metric label="Daily update delivery" value="92%" />
          <Metric label="App adoption rate" value="78%" flag />
          <Metric label="Families not yet activated" value={5} flag />
          <Metric label="Unread broadcasts (3d+)" value={1} flag />
        </StatusPanel>

        {/* Attendance */}
        <StatusPanel title="Attendance" level="red" href="/school/attendance">
          <Metric label="Present today" value="22 / 25" />
          <Metric label="Absent – notified" value={2} />
          <Metric label="Absent – no notification" value={1} flag />
          <Metric label="Check-in via parent app" value="88%" />
        </StatusPanel>

        {/* Learning Outcomes */}
        <StatusPanel
          title="Learning Outcomes"
          level="green"
          href="/school/outcomes"
        >
          <Metric label="Children observed this week" value="96%" />
          <Metric label="On track across domains" value="82%" />
          <Metric label="Flagged for support" value={3} flag />
          <Metric label="Outstanding report drafts" value={0} />
        </StatusPanel>
      </div>

      {/* Daily activity feed */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
        <h2
          className="font-semibold text-sm mb-4"
          style={{ color: "var(--color-text-dark)" }}
        >
          Today's Activity
        </h2>
        <div className="space-y-3">
          <FeedItem
            time="9:42am"
            text="Siti logged 4 observations for Kingfisher N1"
          />
          <FeedItem
            time="9:15am"
            text="22 of 25 check-ins completed via parent app"
          />
          <FeedItem
            time="9:01am"
            text="Rayan's parent reported absence — illness"
          />
          <FeedItem
            time="8:55am"
            text="Daily updates sent to all Sparrow K2 families"
          />
          <FeedItem
            time="8:30am"
            text="School calendar updated — PD Day added for 28 March"
          />
          <FeedItem
            time="8:12am"
            text="Lim Wei Ling logged in · Sparrow K2 schedule published"
          />
        </div>
      </div>
    </div>
  );
}
