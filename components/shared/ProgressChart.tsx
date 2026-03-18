"use client";

import { useState, useMemo } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useStore } from "@/lib/store";
import { LEARNING_AREAS, type LearningAreaId } from "@/lib/types";
import {
  getAchievementTimeline,
  buildChartSeries,
  buildReferenceSeries,
  type MilestoneAchievement,
  type ChartDataPoint,
} from "@/lib/chart-utils";

// ─── Constants ──────────────────────────────────────────────────────────────

const AREA_COLORS: Record<LearningAreaId, string> = {
  LL:  "#F5A623",
  NUM: "#7BA3D4",
  SED: "#E8745A",
  ACE: "#4A9B6F",
  DOW: "#9B84D4",
  HMS: "#4ABDB5",
};

const AREA_SHORT: Record<LearningAreaId, string> = {
  LL:  "LL",
  NUM: "NUM",
  SED: "SED",
  ACE: "ACE",
  DOW: "DOW",
  HMS: "HMS",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toYYYYMMDD(iso: string): string {
  return iso.slice(0, 10);
}

function formatXTick(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-SG", { month: "short" });
}

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Custom tooltip ──────────────────────────────────────────────────────────

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length || !label) return null;

  return (
    <div
      className="rounded-xl shadow-lg px-3 py-2 text-sm"
      style={{ background: "#fff", border: "1px solid #E5E5E5", minWidth: 140 }}
    >
      <p className="font-semibold mb-1" style={{ color: "#1A1A1A" }}>
        {formatFullDate(label)}
      </p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ background: p.color }}
          />
          <span style={{ color: "#444" }}>
            {p.name}: <strong>{p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Milestone detail popup ──────────────────────────────────────────────────

function MilestonePopup({
  milestone,
  onClose,
}: {
  milestone: MilestoneAchievement;
  onClose: () => void;
}) {
  const area = LEARNING_AREAS.find((a) => a.id === milestone.areaId);
  const color = AREA_COLORS[milestone.areaId];

  return (
    <div
      className="mt-3 rounded-xl p-4 flex gap-3 items-start relative"
      style={{ background: "#F5F5F5", border: `1.5px solid ${color}20` }}
    >
      <div
        className="w-2 self-stretch rounded-full shrink-0"
        style={{ background: color }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium mb-0.5" style={{ color }}>
          {area?.name ?? milestone.areaId} · Achieved {formatFullDate(milestone.date)}
        </p>
        <p className="text-sm" style={{ color: "#1A1A1A" }}>
          {milestone.statement}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-xs shrink-0 mt-0.5"
        style={{ color: "#707070" }}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Custom dot ──────────────────────────────────────────────────────────────

interface DotProps {
  cx?: number;
  cy?: number;
  payload?: ChartDataPoint;
  areaId: LearningAreaId;
  color: string;
  achievements: MilestoneAchievement[];
  onSelect: (m: MilestoneAchievement) => void;
}

function AchievementDot({
  cx,
  cy,
  payload,
  areaId,
  color,
  achievements,
  onSelect,
}: DotProps) {
  if (cx == null || cy == null || !payload) return null;

  // Only show a dot if a milestone was achieved on this exact date for this area
  const match = achievements.find(
    (a) => a.date === payload.date && a.areaId === areaId
  );
  if (!match) return null;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill={color}
      stroke="#fff"
      strokeWidth={2}
      style={{ cursor: "pointer" }}
      onClick={() => onSelect(match)}
    />
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

interface ProgressChartProps {
  childId: string;
  academicYear: number;
}

export function ProgressChart({ childId, academicYear }: ProgressChartProps) {
  const { milestones, sessions, observations } = useStore();

  const [activeAreas, setActiveAreas] = useState<Set<LearningAreaId>>(
    new Set(["LL", "NUM", "SED", "ACE", "DOW", "HMS"])
  );
  const [selectedMilestone, setSelectedMilestone] =
    useState<MilestoneAchievement | null>(null);

  const achievements = useMemo(
    () => getAchievementTimeline(childId, milestones, sessions, observations),
    [childId, milestones, sessions, observations]
  );

  const startDate = `${academicYear}-01-01`;

  const chartData = useMemo(
    () => buildChartSeries(achievements, startDate),
    [achievements, startDate]
  );

  const referencePoints = useMemo(
    () => buildReferenceSeries(academicYear),
    [academicYear]
  );

  // Merge reference into chart data for rendering
  const mergedData = useMemo(() => {
    const refMap = new Map(referencePoints.map((r) => [r.date, r.reference]));
    // Build a unified date set from both series
    const allDates = new Set([
      ...chartData.map((d) => d.date),
      ...referencePoints.map((r) => r.date),
    ]);
    const sorted = [...allDates].sort();

    // Interpolate reference value linearly between start and end
    const refStart = referencePoints[0];
    const refEnd = referencePoints[referencePoints.length - 1];
    const totalMs =
      new Date(refEnd.date).getTime() - new Date(refStart.date).getTime();

    return sorted.map((date) => {
      const chartPoint = chartData.find((d) => d.date === date) ?? {
        date,
        LL: 0, NUM: 0, SED: 0, ACE: 0, DOW: 0, HMS: 0, total: 0,
      };
      // Fill forward for area counts
      const prev = sorted
        .slice(0, sorted.indexOf(date))
        .reverse()
        .map((d) => chartData.find((cd) => cd.date === d))
        .find(Boolean);

      const filled = prev
        ? {
            ...chartPoint,
            LL: chartPoint.LL || prev.LL,
            NUM: chartPoint.NUM || prev.NUM,
            SED: chartPoint.SED || prev.SED,
            ACE: chartPoint.ACE || prev.ACE,
            DOW: chartPoint.DOW || prev.DOW,
            HMS: chartPoint.HMS || prev.HMS,
          }
        : chartPoint;

      // Compute interpolated reference
      const elapsed =
        new Date(date).getTime() - new Date(refStart.date).getTime();
      const progress = totalMs > 0 ? Math.max(0, Math.min(1, elapsed / totalMs)) : 0;
      const reference = parseFloat(
        (refStart.reference + progress * (refEnd.reference - refStart.reference)).toFixed(2)
      );

      return { ...filled, reference: refMap.has(date) ? refMap.get(date) : reference };
    });
  }, [chartData, referencePoints]);

  function toggleArea(id: LearningAreaId) {
    setActiveAreas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const maxY = Math.max(
    9,
    ...mergedData.map((d) =>
      Math.max(...LEARNING_AREAS.map((a) => {
        const v = d[a.id as keyof typeof d];
        return typeof v === "number" ? v : 0;
      }))
    )
  );

  return (
    <div>
      {/* Area toggle pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {LEARNING_AREAS.map((area) => {
          const active = activeAreas.has(area.id);
          const color = AREA_COLORS[area.id];
          return (
            <button
              key={area.id}
              onClick={() => toggleArea(area.id)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                background: active ? color : "#F5F5F5",
                color: active ? "#fff" : "#707070",
                border: `1.5px solid ${active ? color : "#E5E5E5"}`,
              }}
            >
              {AREA_SHORT[area.id]} — {area.name.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart
          data={mergedData}
          margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatXTick}
            tick={{ fontSize: 11, fill: "#707070" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, maxY]}
            tickCount={maxY + 1}
            tick={{ fontSize: 11, fill: "#707070" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<ChartTooltip />} />

          {/* Reference line — dashed, labelled */}
          <Line
            type="linear"
            dataKey="reference"
            stroke="#C0C0C0"
            strokeDasharray="6 3"
            strokeWidth={1.5}
            dot={false}
            name="On track"
            connectNulls
          />

          {/* One line per active learning area */}
          {LEARNING_AREAS.filter((a) => activeAreas.has(a.id)).map((area) => (
            <Line
              key={area.id}
              type="stepAfter"
              dataKey={area.id}
              stroke={AREA_COLORS[area.id]}
              strokeWidth={2}
              dot={(props: unknown) => {
                const p = props as { cx?: number; cy?: number; payload?: ChartDataPoint; index?: number };
                return (
                  <AchievementDot
                    key={`dot-${area.id}-${p.index}`}
                    cx={p.cx}
                    cy={p.cy}
                    payload={p.payload}
                    areaId={area.id}
                    color={AREA_COLORS[area.id]}
                    achievements={achievements}
                    onSelect={setSelectedMilestone}
                  />
                );
              }}
              activeDot={false}
              name={area.name}
              connectNulls
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>

      {/* Reference line legend */}
      <div className="flex items-center gap-1.5 mt-1 mb-1">
        <svg width="20" height="8">
          <line
            x1="0" y1="4" x2="20" y2="4"
            stroke="#C0C0C0" strokeWidth="1.5" strokeDasharray="5 3"
          />
        </svg>
        <span className="text-xs" style={{ color: "#707070" }}>On track (linear)</span>
      </div>

      {/* Milestone detail popup */}
      {selectedMilestone && (
        <MilestonePopup
          milestone={selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      )}

      {achievements.length === 0 && (
        <p className="text-sm text-center mt-6" style={{ color: "#707070" }}>
          No milestones achieved yet this year.
        </p>
      )}
    </div>
  );
}
