"use client";

import { useState } from "react";
import type { PlannedActivity, ActivityFeedback, Child, Milestone } from "@/lib/types";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "./ChildAvatar";

const AREA_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  LL:  { bg: "#E8F0FE", text: "#3B5AC6", label: "Language & Literacy" },
  NUM: { bg: "#FEF3D7", text: "#A06010", label: "Numeracy" },
  SED: { bg: "#E8F5EE", text: "#2D7A4F", label: "Social & Emotional" },
};

interface ActivityCardProps {
  activity: PlannedActivity;
  children: Child[];
  milestones: Milestone[];
  feedback: ActivityFeedback[];
  onDelete: (activityId: string) => void;
  onSaveFeedback: (activityId: string, childId: string, note: string) => void;
  onDeleteFeedback: (activityId: string, childId: string) => void;
}

export function ActivityCard({
  activity,
  children,
  milestones,
  feedback,
  onDelete,
  onSaveFeedback,
  onDeleteFeedback,
}: ActivityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [feedbackChildId, setFeedbackChildId] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState("");

  const area = AREA_STYLES[activity.areaId];
  const linkedMilestone = activity.milestoneId
    ? milestones.find((m) => m.id === activity.milestoneId)
    : null;
  const assignedChildren = children.filter((c) => activity.childIds.includes(c.id));

  function openFeedback(childId: string) {
    const existing = feedback.find(
      (f) => f.activityId === activity.id && f.childId === childId
    );
    setDraftNote(existing?.note ?? "");
    setFeedbackChildId(childId);
  }

  function handleSave(childId: string) {
    if (draftNote.trim()) {
      onSaveFeedback(activity.id, childId, draftNote.trim());
    } else {
      onDeleteFeedback(activity.id, childId);
    }
    setFeedbackChildId(null);
    setDraftNote("");
  }

  return (
    <div
      className="rounded-2xl border bg-white overflow-hidden"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Header */}
      <div className="px-4 py-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ background: area.bg, color: area.text }}
              >
                {area.label}
              </span>
              {linkedMilestone && (
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {linkedMilestone.id}
                </span>
              )}
            </div>
            <h3
              className="font-semibold text-base leading-snug"
              style={{ color: "var(--color-text-dark)" }}
            >
              {activity.title}
            </h3>
            <p
              className="text-sm mt-1 leading-relaxed"
              style={{ color: "var(--color-text-mid)" }}
            >
              {activity.description}
            </p>
          </div>

          <button
            onClick={() => onDelete(activity.id)}
            className="shrink-0 p-1.5 rounded-lg opacity-40 hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-text-dark)" }}
            aria-label="Delete activity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 4h10M6 4V3h4v1M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Children chips + toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-2 w-full group"
        >
          <div className="flex items-center gap-1 flex-wrap flex-1">
            {assignedChildren.slice(0, 5).map((child) => (
              <span key={child.id} className="flex items-center gap-1">
                <ChildAvatar name={getChildDisplayName(child)} size="xs" />
              </span>
            ))}
            {assignedChildren.length > 5 && (
              <span
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                +{assignedChildren.length - 5} more
              </span>
            )}
          </div>
          <span
            className="text-xs shrink-0 flex items-center gap-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            {feedback.filter((f) => f.activityId === activity.id).length > 0 && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
            )}
            Feedback
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </div>

      {/* Expanded feedback panel */}
      {expanded && (
        <div
          className="border-t divide-y"
          style={{ borderColor: "var(--color-border)" }}
        >
          {assignedChildren.map((child) => {
            const childFeedback = feedback.find(
              (f) => f.activityId === activity.id && f.childId === child.id
            );
            const isEditing = feedbackChildId === child.id;

            return (
              <div key={child.id} className="px-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {getChildDisplayName(child)}
                  </span>
                  {!isEditing && (
                    <button
                      onClick={() => openFeedback(child.id)}
                      className="ml-auto text-xs"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {childFeedback ? "Edit" : "+ Add note"}
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={draftNote}
                      onChange={(e) => setDraftNote(e.target.value)}
                      placeholder="Note about this child's engagement…"
                      rows={2}
                      className="w-full text-sm rounded-lg border px-3 py-2 resize-none focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-dark)",
                        // @ts-expect-error CSS variable
                        "--tw-ring-color": "var(--color-primary)",
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(child.id)}
                        className="px-3 py-1 text-xs font-medium rounded-lg text-white"
                        style={{ background: "var(--color-primary)" }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setFeedbackChildId(null)}
                        className="px-3 py-1 text-xs font-medium rounded-lg"
                        style={{ color: "var(--color-text-muted)", background: "var(--color-bg-deep)" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : childFeedback ? (
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-mid)" }}
                  >
                    {childFeedback.note}
                  </p>
                ) : (
                  <p
                    className="text-sm italic"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    No notes yet
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
