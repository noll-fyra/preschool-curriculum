"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import {
  getMilestoneProgressForChild,
  getSEDMilestones,
  getTodayObservationMilestoneIds,
  getSEDObservationBreakdown,
} from "@/lib/selectors";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { StatusBadge } from "@/components/teacher/StatusBadge";
import { MilestoneProgressGroup } from "@/components/teacher/MilestoneProgressGroup";
import { ReportEditor } from "@/components/teacher/ReportEditor";
import { getCurrentLevel } from "@/lib/mastery";
import { LEARNING_AREAS } from "@/lib/types";
import { ChildProfileHeader } from "@/components/teacher/ChildProfileHeader";

type Tab = "progress" | "observations" | "reports";

export default function ChildProfilePage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const { childId } = use(params);
  const store = useStore();
  const {
    logObservation,
    undoObservation,
    generateReport,
    saveReportNotes,
    publishReport,
  } = store;

  const [activeTab, setActiveTab] = useState<Tab>("progress");
  const [lastLogged, setLastLogged] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
      </div>
    );
  }

  const allProgress = getMilestoneProgressForChild(childId, store);
  const sedMilestones = getSEDMilestones(store);
  const todayLogged = getTodayObservationMilestoneIds(childId, store);
  const report = store.reports.find((r) => r.childId === childId);

  function handleObserve(milestoneId: string) {
    logObservation(childId, milestoneId);
    const milestone = sedMilestones.find((m) => m.id === milestoneId);
    setLastLogged(milestone?.statement ?? milestoneId);
    setTimeout(() => setLastLogged(null), 3000);
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "progress", label: "Progress" },
    { id: "observations", label: "Observations" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      {/* Toast */}
      {lastLogged && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2"
          style={{
            background: "var(--color-primary)",
            color: "white",
            maxWidth: "calc(100vw - 2rem)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.25)" />
            <path
              d="M5 8l2 2 4-4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Observation logged
        </div>
      )}

      {/* Back link */}
      <Link
        href="/teacher/class"
        className="inline-flex items-center gap-1.5 text-sm mb-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 11L5 7l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Class
      </Link>

      {/* Child header */}
      <ChildProfileHeader child={child} />
      <div className="flex gap-2 mb-5 flex-wrap">
        {LEARNING_AREAS.map((area) => {
          const level = getCurrentLevel(
            store.milestones,
            store.progress,
            childId,
            area.id,
          );
          return (
            <div key={area.id} className="flex items-center gap-1">
              <span
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {area.id}
              </span>
              <StatusBadge level={level} short />
            </div>
          );
        })}
      </div>

      {/* Teacher note */}
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-mid)" }}>
          Teacher note
        </label>
        <p className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>
          Capture a quick snapshot of this child’s personality, quirks, and anything that helps you teach them well.
        </p>
        <textarea
          value={child.teacherNote ?? ""}
          onChange={(e) => store.setChildTeacherNote(childId, e.target.value)}
          rows={3}
          className="w-full rounded-2xl border px-3 py-2 text-sm resize-none"
          style={{
            borderColor: "var(--color-border)",
            background: "white",
            color: "var(--color-text-dark)",
          }}
          placeholder="E.g. warms up slowly in the morning but loves being helper; responds well to visual cues and gentle one-on-one check-ins."
        />
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6"
        style={{ background: "var(--color-bg-cream)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.id ? "white" : "transparent",
              color:
                activeTab === tab.id
                  ? "var(--color-text-dark)"
                  : "var(--color-text-muted)",
              boxShadow:
                activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Progress ─────────────────────────────────────────────────── */}
      {activeTab === "progress" && (
        <div className="flex flex-col gap-4">
          {LEARNING_AREAS.map((area) => (
            <MilestoneProgressGroup
              key={area.id}
              areaId={area.id}
              areaName={area.name}
              milestones={allProgress.filter((m) => m.areaId === area.id)}
            />
          ))}
        </div>
      )}

      {/* ── Tab: Observations ─────────────────────────────────────────────── */}
      {activeTab === "observations" && (
        <div>
          <p
            className="text-sm mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Log observed Social &amp; Emotional behaviours. One observation per
            milestone per day.
          </p>

          {/* Dot legend */}
          <div className="flex items-center gap-4 mb-4">
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
              Previous days
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#F5A623" }}
              />
              Logged today
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border"
                style={{
                  background: "white",
                  borderColor: "var(--color-border)",
                }}
              />
              Not yet
            </span>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden bg-white">
            <div className="divide-y divide-border">
              {sedMilestones.map((milestone) => {
                const alreadyToday = todayLogged.includes(milestone.id);
                const { previousDays, hasToday } = getSEDObservationBreakdown(
                  childId,
                  milestone.id,
                  store,
                );
                const totalCount = previousDays + (hasToday ? 1 : 0);
                const achieved = totalCount >= 5;

                return (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-4 px-4 py-3.5"
                    style={{
                      background:
                        alreadyToday && !achieved ? "#FFFBF2" : undefined,
                      opacity: achieved ? 0.55 : 1,
                    }}
                  >
                    {/* Dots */}
                    <div className="shrink-0 flex flex-col items-center gap-1">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const isFilled = i < totalCount;
                          const isToday =
                            isFilled && i === previousDays && hasToday;
                          return (
                            <span
                              key={i}
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                background: isFilled
                                  ? isToday
                                    ? "#F5A623" // amber — today
                                    : "var(--color-primary)" // green — previous
                                  : "transparent",
                                border: isFilled
                                  ? "none"
                                  : "1.5px solid var(--color-border)",
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {milestone.statement}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {totalCount}/5 observations
                        {hasToday && !achieved && " · logged today"}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="shrink-0">
                      {achieved ? (
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: "#E8F5EE", color: "#2D7A4F" }}
                        >
                          Achieved
                        </span>
                      ) : alreadyToday ? (
                        <button
                          onClick={() => undoObservation(childId, milestone.id)}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors"
                          style={{
                            color: "#A06010",
                            borderColor: "#F5A623",
                            background: "#FFFBF2",
                          }}
                        >
                          Undo
                        </button>
                      ) : (
                        <button
                          onClick={() => handleObserve(milestone.id)}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors"
                          style={{
                            color: "var(--color-primary)",
                            borderColor: "var(--color-primary)",
                            background: "var(--color-primary-wash)",
                          }}
                        >
                          Log
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Report ───────────────────────────────────────────────────── */}
      {activeTab === "reports" && (
        <div>
          {!report ? (
            <div className="text-center py-12">
              <p
                className="text-sm mb-4"
                style={{ color: "var(--color-text-muted)" }}
              >
                No report generated yet for {child.name}.
              </p>
              <button
                onClick={() => generateReport(childId)}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "var(--color-primary)" }}
              >
                Generate draft
              </button>
            </div>
          ) : (
            <ReportEditor
              report={report}
              childName={child.name}
              onSaveNotes={saveReportNotes}
              onPublish={publishReport}
            />
          )}
        </div>
      )}
    </div>
  );
}
