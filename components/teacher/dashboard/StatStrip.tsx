import { StatCard } from "@/components/teacher/StatCard";

interface StatStripProps {
  present: number;
  total: number;
  pending: number;
  activitiesCompleted: number;
  activitiesRemaining: number;
  observationsThisWeek: number;
  needsAttentionCount: number;
  absentNames: string[];
}

export function StatStrip({
  present,
  total,
  pending,
  activitiesCompleted,
  activitiesRemaining,
  observationsThisWeek,
  needsAttentionCount,
  absentNames,
}: StatStripProps) {
  const absentSubtext =
    absentNames.length > 0 && pending > 0
      ? `Absent: ${absentNames.join(", ")} · ${pending} pending`
      : absentNames.length > 0
      ? `Absent: ${absentNames.join(", ")}`
      : pending > 0
      ? `${pending} not yet checked in`
      : "All accounted for";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard
        value={`${present} / ${total}`}
        label="Children present"
        subtext={absentSubtext}
      />
      <StatCard
        value={activitiesCompleted + activitiesRemaining}
        label="Activities today"
        subtext={`${activitiesCompleted} done · ${activitiesRemaining} remaining`}
      />
      <StatCard
        value={observationsThisWeek}
        label="Observations this week"
        subtext={observationsThisWeek < 8 ? "Keep it up — aim for 10+" : "Strong week so far"}
      />
      <StatCard
        value={needsAttentionCount}
        label="Need attention"
        subtext="Flagged by system"
        accent={needsAttentionCount > 0}
      />
    </div>
  );
}
