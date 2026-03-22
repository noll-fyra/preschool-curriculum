"use client";

import { useState, useRef } from "react";
import type { Child, Milestone, LearningAreaId } from "@/lib/types";
import { LEARNING_AREAS } from "@/lib/types";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "./ChildAvatar";

interface ObservationLoggerProps {
  students: Child[];
  sedMilestones: Milestone[];
  todayLog: Record<string, string[]>;
  obsCounts: Record<string, number>;
  onLog: (childId: string, milestoneId: string) => void;
}

const SUGGESTIONS = [
  "Shared materials with a classmate",
  "Asked for help using words",
  "Took turns during group play",
  "Expressed feelings calmly",
  "Included others in play",
  "Showed care for a friend",
  "Listened attentively during circle time",
];

type Screen = "main" | "skill";

export function ObservationLogger({
  students,
  sedMilestones,
  todayLog,
  obsCounts,
  onLog,
}: ObservationLoggerProps) {
  const [screen, setScreen] = useState<Screen>("main");
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [selectedDomainId, setSelectedDomainId] = useState<LearningAreaId>("SED");
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const [lastLogged, setLastLogged] = useState<{
    childName: string;
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedChild = students.find((c) => c.id === selectedChildId);
  const selectedMilestone = sedMilestones.find((m) => m.id === selectedMilestoneId);
  const milestonesForDomain = selectedDomainId === "SED" ? sedMilestones : [];

  function appendSuggestion(suggestion: string) {
    setText((prev) => {
      if (!prev) return suggestion;
      if (prev.endsWith(" ") || prev.endsWith("\n")) return prev + suggestion;
      return prev + " " + suggestion;
    });
    textareaRef.current?.focus();
  }

  function handleLog() {
    if (!selectedChildId || !selectedChild) return;
    if (!text && !selectedMilestoneId) return;

    if (selectedMilestoneId) {
      onLog(selectedChildId, selectedMilestoneId);
    }

    setLastLogged({ childName: getChildDisplayName(selectedChild) });
    setText("");
    setSelectedMilestoneId(null);
    setTimeout(() => setLastLogged(null), 3000);
  }

  function handleMilestoneSelect(milestoneId: string) {
    setSelectedMilestoneId(milestoneId);
    setScreen("main");
  }

  // ─── Skill selection screen ───────────────────────────────────────────────

  if (screen === "skill") {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setScreen("main")}
            className="flex items-center gap-1 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
          <h2
            className="text-base font-semibold"
            style={{ color: "var(--color-text-dark)" }}
          >
            Select domain & skill
          </h2>
        </div>

        {/* Domain chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {LEARNING_AREAS.map((area) => {
            const isSelected = area.id === selectedDomainId;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedDomainId(area.id)}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: isSelected
                    ? "var(--color-primary)"
                    : "var(--color-bg-cream)",
                  color: isSelected ? "white" : "var(--color-text-mid)",
                }}
              >
                {area.id}
              </button>
            );
          })}
        </div>

        <p
          className="text-xs font-semibold uppercase tracking-wide mb-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          {LEARNING_AREAS.find((a) => a.id === selectedDomainId)?.name}
        </p>

        {milestonesForDomain.length > 0 ? (
          <div className="flex flex-col gap-2">
            {milestonesForDomain.map((milestone) => {
              const isSelected = milestone.id === selectedMilestoneId;
              return (
                <button
                  key={milestone.id}
                  onClick={() => handleMilestoneSelect(milestone.id)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all"
                  style={{
                    background: isSelected ? "#E8F5EE" : "white",
                    borderColor: isSelected
                      ? "var(--color-primary)"
                      : "var(--color-border)",
                  }}
                >
                  <p
                    className="text-sm flex-1"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {milestone.statement}
                  </p>
                  {isSelected && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="ml-3 shrink-0"
                    >
                      <circle cx="8" cy="8" r="7" fill="var(--color-primary)" />
                      <path
                        d="M5 8l2 2 4-4"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div
            className="rounded-2xl border border-dashed p-6 text-center"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-muted)",
            }}
          >
            <p className="text-sm">No skills available for this domain yet</p>
          </div>
        )}
      </div>
    );
  }

  // ─── Main screen ──────────────────────────────────────────────────────────

  const canSubmit = !!selectedChildId && (!!text.trim() || !!selectedMilestoneId);

  return (
    <div>
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
          Logged for {lastLogged.childName}
        </div>
      )}

      {/* Child selection */}
      <div className="mb-5">
        <p
          className="text-xs font-semibold uppercase tracking-wide mb-2.5"
          style={{ color: "var(--color-text-muted)" }}
        >
          Child
        </p>
        <div className="flex flex-wrap gap-2">
          {students.map((child) => {
            const isSelected = child.id === selectedChildId;
            return (
              <button
                key={child.id}
                onClick={() =>
                  setSelectedChildId(isSelected ? null : child.id)
                }
                className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all"
                style={{
                  background: isSelected ? "var(--color-primary)" : "white",
                  color: isSelected ? "white" : "var(--color-text-dark)",
                  borderColor: isSelected
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                }}
              >
                <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                {getChildDisplayName(child)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Observation textarea + media */}
      <div className="mb-4">
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--color-border)", background: "white" }}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What did you observe?"
            rows={4}
            className="w-full px-4 pt-4 pb-2 text-sm resize-none outline-none"
            style={{
              color: "var(--color-text-dark)",
              background: "transparent",
            }}
          />

          {/* Media attachment buttons */}
          <div className="flex items-center gap-1 px-3 pb-3 pt-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*,image/*,video/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg transition-colors hover:bg-gray-50"
              style={{ color: "var(--color-text-muted)" }}
              title="Add audio"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="6"
                  y="2"
                  width="6"
                  height="9"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M3 9a6 6 0 0012 0"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M9 15v2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg transition-colors hover:bg-gray-50"
              style={{ color: "var(--color-text-muted)" }}
              title="Add photo"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="2"
                  y="5"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <circle
                  cx="9"
                  cy="10"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M6.5 5l1.5-2h3l1.5 2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg transition-colors hover:bg-gray-50"
              style={{ color: "var(--color-text-muted)" }}
              title="Add video"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="2"
                  y="5"
                  width="10"
                  height="8"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M12 8l4-2v6l-4-2V8z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mb-5">
        <p
          className="text-xs font-medium mb-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          Suggestions
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => appendSuggestion(s)}
              className="px-3 py-1.5 rounded-full text-xs border transition-colors"
              style={{
                background: "white",
                color: "var(--color-text-mid)",
                borderColor: "var(--color-border)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Domain & skill tag */}
      <div className="mb-6">
        {selectedMilestone ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ background: "#E8F5EE", color: "#2D7A4F" }}
            >
              SED · {selectedMilestone.statement}
            </span>
            <button
              onClick={() => setScreen("skill")}
              className="text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              Change
            </button>
            <button
              onClick={() => setSelectedMilestoneId(null)}
              className="text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={() => setScreen("skill")}
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "var(--color-primary)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M8 5v6M5 8h6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            Tag domain & skill
          </button>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={!canSubmit}
        onClick={handleLog}
        className="w-full py-3 rounded-xl text-sm font-semibold transition-opacity"
        style={{
          background: "var(--color-primary)",
          color: "white",
          opacity: canSubmit ? 1 : 0.4,
          cursor: canSubmit ? "pointer" : "default",
        }}
      >
        Log observation
      </button>
    </div>
  );
}
