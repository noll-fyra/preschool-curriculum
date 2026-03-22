"use client";

import { useEffect, useState } from "react";
import type { DayPhase, InsightStats } from "@/lib/dashboard-utils";
import { getInsightText } from "@/lib/dashboard-utils";

interface AIInsightCardProps {
  phase: DayPhase;
  stats: InsightStats;
  teacherName: string;
}

const PHASE_LABELS: Record<DayPhase, string> = {
  before_school: "Before school",
  morning_arrival: "Morning arrival",
  active_teaching: "Active teaching",
  rest_time: "Rest time",
  end_of_day: "End of day",
};

export function AIInsightCard({ phase, stats, teacherName }: AIInsightCardProps) {
  const fallback = getInsightText(phase, stats);
  const [insight, setInsight] = useState(fallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset to fallback and fetch fresh insight when phase changes
    setInsight(getInsightText(phase, stats));
    setLoading(true);

    fetch("/api/generate/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phase, stats, teacherName }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.content) setInsight(data.content);
      })
      .catch(() => {
        // Keep fallback on error — no UI error state needed
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div
      className="min-w-0"
      style={{
        background: "var(--color-secondary-wash, #E5F4F1)",
        borderRadius: 12,
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
          marginBottom: 8,
          minWidth: 0,
        }}
      >
        <span style={{ fontSize: 14, flexShrink: 0 }}>✦</span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--color-secondary-dark, #1C2B29)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            minWidth: 0,
            flex: "1 1 auto",
            overflowWrap: "break-word",
          }}
        >
          Insight · {PHASE_LABELS[phase]}
        </span>
        {loading && (
          <span
            style={{
              marginLeft: "auto",
              fontSize: 11,
              color: "var(--color-text-muted)",
              fontStyle: "italic",
              flexShrink: 0,
            }}
          >
            updating…
          </span>
        )}
      </div>
      <p
        className="wrap-break-word"
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--color-secondary-dark, #1C2B29)",
          margin: 0,
        }}
      >
        {insight}
      </p>
    </div>
  );
}
