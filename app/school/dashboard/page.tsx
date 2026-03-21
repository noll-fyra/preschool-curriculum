"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type StatusLevel = "green" | "amber" | "red";

const levelRing: Record<StatusLevel, string> = {
  green: "ring-emerald-500/35",
  amber: "ring-amber-500/40",
  red: "ring-destructive/40",
};

const levelDot: Record<StatusLevel, string> = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

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
  return (
    <Link href={href} className="group block h-full">
      <Card
        className={cn(
          "h-full transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md",
          "ring-2",
          levelRing[level],
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <span
              className={cn("size-2.5 shrink-0 rounded-full", levelDot[level])}
            />
            <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">{children}</CardContent>
      </Card>
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
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-sm font-semibold tabular-nums text-foreground",
          flag && "text-destructive",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function FeedItem({ time, text }: { time: string; text: string }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="w-14 shrink-0 pt-px text-xs tabular-nums text-muted-foreground">
        {time}
      </span>
      <span className="text-foreground">{text}</span>
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
    <div className="mx-auto max-w-4xl px-4 py-6 pb-24 md:pb-8">
      <div className="mb-6 space-y-1">
        <div className="flex flex-wrap items-end gap-2">
          <h1 className="text-xl font-bold text-foreground">School Overview</h1>
          <Badge variant="secondary" className="font-normal">
            Live demo
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Yew Tee Campus · Term 2, 2026 ·{" "}
          {new Date().toLocaleDateString("en-SG", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

        <StatusPanel title="Attendance" level="red" href="/school/attendance">
          <Metric label="Present today" value="22 / 25" />
          <Metric label="Absent – notified" value={2} />
          <Metric label="Absent – no notification" value={1} flag />
          <Metric label="Check-in via parent app" value="88%" />
        </StatusPanel>

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

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-semibold">
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <Separator />
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
        </CardContent>
      </Card>
    </div>
  );
}
