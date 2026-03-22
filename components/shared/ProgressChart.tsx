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
} from "recharts";
import { useStore } from "@/lib/store";
import { LEARNING_AREAS, type LearningAreaId } from "@/lib/types";
import {
  getAchievementTimeline,
  getChartMonthStarts,
  buildMonthlyChartSeries,
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

function formatXTick(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-SG", { month: "short" });
}

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
}

/** Chart x-axis points are month starts (YYYY-MM-01). */
function formatMonthLabel(monthStart: string): string {
  const d = new Date(monthStart + "T00:00:00");
  return d.toLocaleDateString("en-SG", { month: "long", year: "numeric" });
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
        {formatMonthLabel(label)}
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
  academicYear: number;
  onSelect: (m: MilestoneAchievement) => void;
}

function AchievementDot({
  cx,
  cy,
  payload,
  areaId,
  color,
  achievements,
  academicYear,
  onSelect,
}: DotProps) {
  if (cx == null || cy == null || !payload) return null;

  const yearStart = `${academicYear}-01-01`;
  const yearEnd = `${academicYear}-12-31`;
  const ym = payload.date.slice(0, 7);
  const inMonth = achievements.filter(
    (a) =>
      a.areaId === areaId &&
      a.date.slice(0, 7) === ym &&
      a.date >= yearStart &&
      a.date <= yearEnd
  );
  if (inMonth.length === 0) return null;
  const match = [...inMonth].sort((a, b) => b.date.localeCompare(a.date))[0];

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
  /** When set, shows only this area (no toggles). */
  focusAreaId?: LearningAreaId;
}

export function ProgressChart({
  childId,
  academicYear,
  focusAreaId,
}: ProgressChartProps) {
  const { milestones, sessions, observations } = useStore();

  const milestonesInFocusArea = useMemo(() => {
    if (!focusAreaId) return 9;
    return milestones.filter((m) => m.areaId === focusAreaId).length;
  }, [milestones, focusAreaId]);

  const [activeAreas, setActiveAreas] = useState<Set<LearningAreaId>>(
    () =>
      focusAreaId
        ? new Set([focusAreaId])
        : new Set(["LL", "NUM", "SED", "ACE", "DOW", "HMS"])
  );

  const displayAreas = focusAreaId ? new Set<LearningAreaId>([focusAreaId]) : activeAreas;
  const [selectedMilestone, setSelectedMilestone] =
    useState<MilestoneAchievement | null>(null);

  const achievements = useMemo(
    () => getAchievementTimeline(childId, milestones, sessions, observations),
    [childId, milestones, sessions, observations]
  );

  const monthStarts = useMemo(
    () => getChartMonthStarts(academicYear, new Date()),
    [academicYear]
  );

  const mergedData = useMemo(
    () => buildMonthlyChartSeries(achievements, academicYear, monthStarts),
    [achievements, academicYear, monthStarts]
  );

  const xTicks = useMemo(
    () => mergedData.map((d) => d.date),
    [mergedData]
  );

  function toggleArea(id: LearningAreaId) {
    if (focusAreaId) return;
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

  const maxY = focusAreaId
    ? Math.max(
        3,
        milestonesInFocusArea,
        ...mergedData.map((d) => {
          const v = d[focusAreaId as keyof typeof d];
          return typeof v === "number" ? v : 0;
        })
      )
    : Math.max(
        9,
        ...mergedData.map((d) =>
          Math.max(
            ...LEARNING_AREAS.map((a) => {
              const v = d[a.id as keyof typeof d];
              return typeof v === "number" ? v : 0;
            })
          )
        )
      );

  return (
    <div>
      {/* Area toggle pills (full progress view only) */}
      {!focusAreaId && (
        <div className="flex flex-wrap gap-2 mb-4">
          {LEARNING_AREAS.map((area) => {
            const active = activeAreas.has(area.id);
            const color = AREA_COLORS[area.id];
            return (
              <button
                key={area.id}
                type="button"
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
      )}

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart
          data={mergedData}
          margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
          <XAxis
            dataKey="date"
            type="category"
            ticks={xTicks}
            tickFormatter={formatXTick}
            tick={{ fontSize: 11, fill: "#707070" }}
            axisLine={false}
            tickLine={false}
            interval={0}
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

          {/* One line per active learning area */}
          {LEARNING_AREAS.filter((a) => displayAreas.has(a.id)).map((area) => (
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
                    academicYear={academicYear}
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

      {/* Milestone detail popup */}
      {selectedMilestone && (
        <MilestonePopup
          milestone={selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      )}

      {achievements.filter((a) => !focusAreaId || a.areaId === focusAreaId).length ===
        0 && (
        <p className="text-sm text-center mt-6" style={{ color: "#707070" }}>
          {focusAreaId
            ? "No milestones achieved in this area yet this year."
            : "No milestones achieved yet this year."}
        </p>
      )}
    </div>
  );
}
