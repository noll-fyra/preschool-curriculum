"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Lock } from "lucide-react";

export interface PathStep {
  slotIndex: number;
  milestoneId: string;
  emoji: string;
  status: "done" | "current" | "locked";
}

interface DuolingoActivityPathProps {
  steps: PathStep[];
  childId: string;
  placeId: string;
  accentColor: string;
}

/**
 * Vertical band in SVG viewBox (0–100). High span + last step near the bottom so the trail
 * ends just above the success block (sibling below this container).
 */
const PATH_TOP_PCT = 5;
const PATH_SPAN_PCT = 88;

/** Horizontal zig-zag: wider spread so the path reads clearly on phones. */
const PATH_X_LEFT = 14;
const PATH_X_RIGHT = 86;

function pathThroughPoints(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    d += ` C ${p0.x} ${p1.y}, ${p1.x} ${p0.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 12.5l3.5 3.5L18 7"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Circular done / locked steps — toolbar buttons on the place page match this size. */
export const PATH_CIRCLE_NODE_PX = 62;
const NODE = PATH_CIRCLE_NODE_PX;
const NODE_CURRENT = 72;

/** Min height per step (px) — generous vertical rhythm so nodes are not stacked. */
const MIN_PX_PER_STEP = 84;

/** Duolingo-style completed trail (matches check nodes). */
const PATH_GREEN = "#58CC02";

function lastConsecutiveDoneIndex(steps: PathStep[]): number {
  let last = -1;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].status === "done") last = i;
    else break;
  }
  return last;
}

function nodePositionStyle(x: number, y: number) {
  return {
    position: "absolute" as const,
    left: `${x}%`,
    top: `${y}%`,
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  };
}

export function DuolingoActivityPath({
  steps,
  childId,
  placeId,
  accentColor,
}: DuolingoActivityPathProps) {
  const n = steps.length;
  const points = useMemo(() => {
    return steps.map((_, i) => ({
      x: i % 2 === 0 ? PATH_X_LEFT : PATH_X_RIGHT,
      y: PATH_TOP_PCT + (n <= 1 ? PATH_SPAN_PCT / 2 : ((i + 0.5) / n) * PATH_SPAN_PCT),
    }));
  }, [n, steps]);

  const pathD = useMemo(() => pathThroughPoints(points), [points]);

  const completedPathD = useMemo(() => {
    const lastDone = lastConsecutiveDoneIndex(steps);
    if (lastDone < 1) return "";
    const seg = points.slice(0, lastDone + 1);
    return pathThroughPoints(seg);
  }, [points, steps]);

  if (n === 0) return null;

  const hasCurrent = steps.some((s) => s.status === "current");

  return (
    <div className="relative w-full">
      {hasCurrent ? <style>{PATH_CURRENT_STEP_CSS}</style> : null}
      <div
        className="relative w-full"
        style={{ minHeight: Math.max(n * MIN_PX_PER_STEP, 280) }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={pathD}
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="1 14"
            vectorEffect="non-scaling-stroke"
          />
          {completedPathD ? (
            <path
              d={completedPathD}
              fill="none"
              stroke={PATH_GREEN}
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeDasharray="1 14"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </svg>

        {steps.map((step, i) => {
          const { x, y } = points[i]!;
          const href = `/student/${childId}/play/${step.milestoneId}?from=${placeId}&slot=${step.slotIndex}`;
          const pos = nodePositionStyle(x, y);

          if (step.status === "locked") {
            return (
              <div
                key={`slot-${step.slotIndex}`}
                className="flex items-center justify-center shadow-sm"
                style={{
                  ...pos,
                  width: NODE,
                  height: NODE,
                  borderRadius: "50%",
                  background: "#E8E8E8",
                  border: "3px solid #CACACA",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.06)",
                }}
                aria-hidden
              >
                <Lock size={24} strokeWidth={2.5} color="#7A7A7A" aria-hidden />
              </div>
            );
          }

          if (step.status === "done") {
            return (
              <Link
                key={`slot-${step.slotIndex}`}
                href={href}
                aria-label="Replay activity"
                title="Replay activity"
                className="flex items-center justify-center shadow-sm transition-transform active:scale-[0.96]"
                style={{
                  ...pos,
                  width: NODE,
                  height: NODE,
                  borderRadius: "50%",
                  background: "#58CC02",
                  border: "3px solid #43C000",
                  boxShadow: "0 3px 0 #3AA902",
                  textDecoration: "none",
                }}
              >
                <CheckIcon />
              </Link>
            );
          }

          return (
            <div key={`slot-${step.slotIndex}`} style={pos}>
              <Link
                href={href}
                aria-label="Current activity"
                title="Current activity"
                className="path-current-step-attention flex items-center justify-center shadow-sm active:opacity-90"
                style={{
                  width: NODE_CURRENT,
                  height: NODE_CURRENT,
                  borderRadius: 12,
                  background: "#FFFFFF",
                  border: `4px solid ${accentColor}`,
                  boxShadow: `0 4px 0 ${accentColor}55`,
                  textDecoration: "none",
                  transformOrigin: "center center",
                  animation: "path-current-step-attention 2.8s ease-in-out infinite",
                }}
              >
                <span aria-hidden="true" style={{ fontSize: 36, lineHeight: 1 }}>
                  {step.emoji}
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Goal — sits directly under the path with a short gap so the trail reads as “ending here”. */}
      <div
        className="mt-4 flex flex-col items-center justify-end pb-2"
        style={{ pointerEvents: "none" }}
        aria-hidden
      >
        <div
          style={{
            borderRadius: 24,
            padding: "16px 28px 20px",
            background: "linear-gradient(180deg, #FFF9E6 0%, #FFE8A3 55%, #FFD54F 100%)",
            border: `3px solid ${accentColor}`,
            boxShadow: `0 8px 0 ${accentColor}40, inset 0 1px 0 rgba(255,255,255,0.7)`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 54, lineHeight: 1.1, filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.12))" }}>
            🏰
          </div>
          <div style={{ fontSize: 32, marginTop: 6, letterSpacing: 4 }}>🌈✨</div>
          <div style={{ fontSize: 28, marginTop: 4 }}>🏆🎁🦉</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Scoped like ActivityPlayer’s celebration / option animations so keyframes always apply.
 * Animate the whole tile (not a shrink-wrapped inner span) so motion matches the success screen’s visibility.
 */
const PATH_CURRENT_STEP_CSS = `
@keyframes path-current-step-attention {
  0%, 36%, 100% { transform: rotate(0deg) scale(1); }
  3% { transform: rotate(-9deg) scale(1.05); }
  6% { transform: rotate(9deg) scale(1.05); }
  9% { transform: rotate(-5deg) scale(1.02); }
  12% { transform: rotate(0deg) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .path-current-step-attention {
    animation: none !important;
  }
}
`;
