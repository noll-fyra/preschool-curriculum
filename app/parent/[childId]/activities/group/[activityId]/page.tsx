"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import {
  getParentGroupActivityById,
} from "@/lib/parent-group-activities";
import { LEARNING_AREAS } from "@/lib/types";

export default function ParentGroupActivityDetailPage() {
  const params = useParams();
  const childId = params.childId as string;
  const activityId = params.activityId as string;
  const store = useStore();
  const logParentHomeActivity = useStore((s) => s.logParentHomeActivity);

  const [showThanks, setShowThanks] = useState(false);

  const child = store.children.find((c) => c.id === childId);
  const activity = getParentGroupActivityById(activityId);
  const milestone = activity
    ? store.milestones.find((m) => m.id === activity.milestoneId)
    : undefined;

  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
      </div>
    );
  }

  if (!activity || !milestone) {
    return (
      <div className="px-4 py-5">
        <Link
          href={`/parent/${childId}/activities/group`}
          className="text-sm"
          style={{ color: "var(--color-primary)" }}
        >
          ← Back to ideas
        </Link>
        <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
          This activity could not be found.
        </p>
      </div>
    );
  }

  const act = activity;
  const mile = milestone;

  const areaName =
    LEARNING_AREAS.find((a) => a.id === mile.areaId)?.name ?? mile.areaId;

  const instructionLines = act.instructions
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  function handleWeDidThis() {
    logParentHomeActivity(childId, act.milestoneId, act.title);
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 5000);
  }

  return (
    <div className="px-4 py-5 pb-28">
      <Link
        href={`/parent/${childId}/activities/group`}
        className="inline-flex items-center gap-1 text-sm mb-4"
        style={{ color: "var(--color-text-muted)" }}
      >
        ← Group activities
      </Link>

      <p
        className="text-xs font-semibold uppercase tracking-wide mb-2"
        style={{ color: "var(--color-text-muted)" }}
      >
        {areaName}
      </p>
      <h1
        className="font-medium mb-3"
        style={{ fontSize: 22, color: "var(--color-text-dark)" }}
      >
        {act.title}
      </h1>

      <div
        className="rounded-xl border px-3 py-2 mb-5"
        style={{
          background: "var(--color-primary-wash)",
          borderColor: "var(--color-primary)",
        }}
      >
        <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
          Works toward
        </p>
        <p
          className="font-medium mt-0.5"
          style={{ fontSize: 14, color: "var(--color-text-dark)" }}
        >
          {mile.statement}
        </p>
      </div>

      <section className="mb-5">
        <h2
          className="font-medium mb-2"
          style={{ fontSize: 14, color: "var(--color-text-dark)" }}
        >
          What you&apos;ll do
        </h2>
        <p
          className="leading-relaxed"
          style={{ fontSize: 14, color: "var(--color-text-mid)" }}
        >
          {act.description}
        </p>
      </section>

      <section className="mb-5">
        <h2
          className="font-medium mb-2"
          style={{ fontSize: 14, color: "var(--color-text-dark)" }}
        >
          Why this helps
        </h2>
        <p
          className="leading-relaxed"
          style={{ fontSize: 14, color: "var(--color-text-mid)" }}
        >
          {act.learningRationale}
        </p>
      </section>

      <section className="mb-5">
        <h2
          className="font-medium mb-2"
          style={{ fontSize: 14, color: "var(--color-text-dark)" }}
        >
          How to do it
        </h2>
        <ol
          className="list-decimal pl-5 space-y-2"
          style={{ fontSize: 14, color: "var(--color-text-mid)" }}
        >
          {instructionLines.map((line, i) => (
            <li key={i} className="leading-relaxed pl-1">
              {line.replace(/^\d+\.\s*/, "")}
            </li>
          ))}
        </ol>
      </section>

      {showThanks && (
        <div
          className="rounded-xl border px-3 py-2 mb-4"
          style={{
            background: "#EAF3DE",
            borderColor: "#97C459",
          }}
        >
          <p style={{ fontSize: 13, color: "#27500A" }}>
            Recorded for teachers. {getChildDisplayName(child)}&apos;s teacher
            can see this under Observations with today&apos;s date.
          </p>
        </div>
      )}

      <div
        className="fixed bottom-20 left-0 right-0 px-4 pt-2 pb-2 max-w-lg mx-auto"
        style={{
          background:
            "linear-gradient(to top, var(--color-bg-warm) 85%, transparent)",
        }}
      >
        <button
          type="button"
          onClick={handleWeDidThis}
          className="w-full py-3.5 rounded-xl font-semibold text-base transition-opacity active:opacity-90"
          style={{
            background: "var(--color-primary)",
            color: "white",
          }}
        >
          We did this!
        </button>
      </div>
    </div>
  );
}
