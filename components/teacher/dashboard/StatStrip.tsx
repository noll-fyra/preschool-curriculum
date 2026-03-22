import { StatCard } from "@/components/teacher/StatCard";

interface StatStripProps {
  present: number;
  total: number;
  pending: number;
  observationsThisWeek: number;
  absentNames: string[];
}

export function StatStrip({
  present,
  total,
  pending,
  observationsThisWeek,
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
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        value={`${present} / ${total}`}
        label="Children present"
        subtext={absentSubtext}
        href="/teacher/attendance"
      />
      <StatCard
        value={observationsThisWeek}
        label="Observations this week"
        subtext={
          observationsThisWeek < 8
            ? "Keep it up — aim for 10+"
            : "Strong week so far"
        }
      />
    </div>
  );
}
