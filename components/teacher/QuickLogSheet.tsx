"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { DomainTag } from "@/components/teacher/DomainTag";
import type { Milestone, Child, LearningAreaId } from "@/lib/types";
import { LEARNING_AREAS } from "@/lib/types";

type Screen = "children" | "main" | "skill";

const SUGGESTIONS = [
  "Shared materials with a classmate",
  "Asked for help using words",
  "Took turns during group play",
  "Expressed feelings calmly",
  "Included others in play",
  "Showed care for a friend",
  "Listened attentively during circle time",
];

// ── Main component ────────────────────────────────────────────────────────────

export function QuickLogSheet() {
  const { quickLogOpen, closeQuickLog } = useStore();
  const children = useStore((s) => s.children);
  const milestones = useStore((s) => s.milestones);
  const activeClassId = useStore((s) => s.activeClassId);
  const logObservation = useStore((s) => s.logObservation);

  const [screen, setScreen] = useState<Screen>("children");
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [selectedMilestones, setSelectedMilestones] = useState<Milestone[]>([]);
  const [filterArea, setFilterArea] = useState<LearningAreaId | null>(null);
  const [done, setDone] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().slice(0, 10);
  const classChildren = [...children.filter((c) => c.classId === activeClassId)]
    .sort((a, b) => a.firstName.localeCompare(b.firstName));


  useEffect(() => {
    if (!quickLogOpen) {
      const t = setTimeout(() => {
        setScreen("children");
        setSelectedChildIds([]);
        setText("");
        setSelectedMilestones([]);
        setFilterArea(null);
        setDone(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [quickLogOpen]);

  function toggleChild(childId: string) {
    setSelectedChildIds((prev) =>
      prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId]
    );
  }

  function appendSuggestion(suggestion: string) {
    setText((prev) => {
      if (!prev) return suggestion;
      if (prev.endsWith(" ") || prev.endsWith("\n")) return prev + suggestion;
      return prev + " " + suggestion;
    });
    textareaRef.current?.focus();
  }

  function toggleMilestone(milestone: Milestone) {
    setSelectedMilestones((prev) =>
      prev.some((m) => m.id === milestone.id)
        ? prev.filter((m) => m.id !== milestone.id)
        : [...prev, milestone]
    );
  }

  function handleLog() {
    if (selectedChildIds.length === 0) return;
    if (!text.trim() && selectedMilestones.length === 0) return;

    for (const milestone of selectedMilestones) {
      for (const childId of selectedChildIds) {
        logObservation(childId, milestone.id, text.trim() || undefined);
      }
    }
    setDone(true);
  }

  function reset() {
    setSelectedChildIds([]);
    setText("");
    setSelectedMilestones([]);
    setFilterArea(null);
    setDone(false);
    setScreen("children");
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  if (!quickLogOpen) return null;

  const canSubmit = selectedChildIds.length > 0 && (!!text.trim() || selectedMilestones.length > 0);

  return (
    <>
      <div
        className="fixed inset-0 z-100 flex items-end justify-center bg-black/40 md:items-center"
        onClick={closeQuickLog}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Log Observation"
          className="w-full max-h-[88vh] overflow-y-auto rounded-t-[20px] bg-white px-5 pb-8 pt-6 md:w-[500px] md:max-w-[calc(100vw-2rem)] md:rounded-2xl md:shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              {screen === "skill" ? (
                <button
                  onClick={() => setScreen("main")}
                  style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: "var(--color-text-dark)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Log Observation
                </button>
              ) : screen === "main" ? (
                <button
                  onClick={() => setScreen("children")}
                  style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: "var(--color-text-dark)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Log Observation
                </button>
              ) : (
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-dark)" }}>
                  {done ? "Observation logged!" : "Log Observation"}
                </div>
              )}
            </div>
            <button
              onClick={closeQuickLog}
              aria-label="Close"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", padding: 4, marginTop: -2, flexShrink: 0 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Done screen */}
          {done && (
            <DoneStep
              students={classChildren.filter((c) => selectedChildIds.includes(c.id))}
              onLogAnother={reset}
              onDone={closeQuickLog}
            />
          )}

          {/* Child selection screen */}
          {!done && screen === "children" && (
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                Who did you observe?
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
                {classChildren.map((child) => {
                  const isSelected = selectedChildIds.includes(child.id);
                  return (
                    <button
                      key={child.id}
                      onClick={() => toggleChild(child.id)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 5,
                        padding: "10px 6px",
                        borderRadius: 10,
                        background: isSelected ? "var(--color-primary-wash)" : "var(--color-bg-warm)",
                        border: isSelected ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      {isSelected && (
                        <span style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 700 }}>
                          ✓
                        </span>
                      )}
                      <div style={{ position: "relative" }}>
                        <ChildAvatar name={child.firstName} size="sm" />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-dark)", lineHeight: 1.2 }}>
                        {child.firstName}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                disabled={selectedChildIds.length === 0}
                onClick={() => setScreen("main")}
                style={{ ...primaryBtn, opacity: selectedChildIds.length > 0 ? 1 : 0.4, cursor: selectedChildIds.length > 0 ? "pointer" : "default" }}
              >
                Continue{selectedChildIds.length > 0 ? ` with ${selectedChildIds.length} ${selectedChildIds.length === 1 ? "child" : "children"}` : ""}
              </button>
            </div>
          )}

          {/* Skill selection screen */}
          {!done && screen === "skill" && (
            <SkillScreen
              milestones={milestones}
              filterArea={filterArea}
              selectedMilestones={selectedMilestones}
              onFilterArea={setFilterArea}
              onToggle={toggleMilestone}
              onDone={() => setScreen("main")}
            />
          )}

          {/* Main screen */}
          {!done && screen === "main" && (
            <div>
              {/* Selected children summary */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                {classChildren.filter((c) => selectedChildIds.includes(c.id)).map((child) => (
                  <div key={child.id} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px 4px 6px", borderRadius: 20, background: "var(--color-primary-wash)", border: "1px solid var(--color-primary)" }}>
                    <ChildAvatar name={child.firstName} size="xs" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-primary)" }}>{child.firstName}</span>
                  </div>
                ))}
              </div>

              {/* Observation textarea */}
              <div
                style={{
                  borderRadius: 14,
                  border: "1.5px solid var(--color-border)",
                  background: "#fff",
                  overflow: "hidden",
                  marginBottom: 14,
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="What did you observe?"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "14px 14px 8px",
                    fontSize: 14,
                    color: "var(--color-text-dark)",
                    resize: "none",
                    outline: "none",
                    border: "none",
                    background: "transparent",
                    boxSizing: "border-box",
                    lineHeight: 1.5,
                  }}
                />
                {/* Media buttons */}
                <div style={{ display: "flex", gap: 2, padding: "4px 10px 10px" }}>
                  <input ref={fileInputRef} type="file" accept="audio/*,image/*,video/*" style={{ display: "none" }} />
                  {[
                    {
                      label: "Audio",
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <rect x="6" y="2" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.4" />
                          <path d="M3 9a6 6 0 0012 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M9 15v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      ),
                    },
                    {
                      label: "Photo",
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
                          <circle cx="9" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                          <path d="M6.5 5l1.5-2h3l1.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ),
                    },
                    {
                      label: "Video",
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <rect x="2" y="5" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                          <path d="M12 8l4-2v6l-4-2V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                        </svg>
                      ),
                    },
                  ].map(({ label, icon }) => (
                    <button
                      key={label}
                      onClick={() => fileInputRef.current?.click()}
                      title={label}
                      style={{ padding: 6, borderRadius: 8, background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", marginBottom: 7 }}>
                Suggestions
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => appendSuggestion(s)}
                    style={{
                      padding: "5px 11px",
                      borderRadius: 20,
                      fontSize: 12,
                      border: "1px solid var(--color-border)",
                      background: "#fff",
                      color: "var(--color-text-mid)",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Domain & skill tags */}
              <div style={{ marginBottom: 20 }}>
                {selectedMilestones.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                    {selectedMilestones.map((m) => (
                      <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px 4px 6px", borderRadius: 20, background: "#E8F5EE" }}>
                        <DomainTag areaId={m.areaId} size="sm" />
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#2D7A4F" }}>{m.statement}</span>
                        <button
                          onClick={() => toggleMilestone(m)}
                          style={{ marginLeft: 2, background: "none", border: "none", cursor: "pointer", color: "#2D7A4F", padding: 0, lineHeight: 1 }}
                          aria-label={`Remove ${m.statement}`}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setScreen("skill")}
                  style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  {selectedMilestones.length > 0 ? "Add another skill" : "Tag domain & skill"}
                </button>
              </div>

              {/* Submit */}
              <button
                disabled={!canSubmit}
                onClick={handleLog}
                style={{
                  ...primaryBtn,
                  opacity: canSubmit ? 1 : 0.4,
                  cursor: canSubmit ? "pointer" : "default",
                }}
              >
                Log observation
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── Skill selection screen ────────────────────────────────────────────────────

function SkillScreen({
  milestones,
  filterArea,
  selectedMilestones,
  onFilterArea,
  onToggle,
  onDone,
}: {
  milestones: Milestone[];
  filterArea: LearningAreaId | null;
  selectedMilestones: Milestone[];
  onFilterArea: (area: LearningAreaId | null) => void;
  onToggle: (m: Milestone) => void;
  onDone: () => void;
}) {
  const visible = filterArea
    ? milestones.filter((m) => m.areaId === filterArea)
    : milestones;

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--color-text-mid)", marginBottom: 10 }}>
        Select domain & skill
      </p>

      {/* Domain filter pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {LEARNING_AREAS.map((area) => {
          const active = filterArea === area.id;
          return (
            <button
              key={area.id}
              onClick={() => onFilterArea(active ? null : area.id)}
              style={{
                padding: "5px 11px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                border: "1.5px solid",
                borderColor: active ? "var(--color-text-dark)" : "var(--color-border)",
                background: active ? "var(--color-text-dark)" : "var(--color-bg-warm)",
                color: active ? "#fff" : "var(--color-text-mid)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {area.id} · {area.name.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {/* Milestone list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 300, overflowY: "auto", marginBottom: 14 }}>
        {visible.map((m) => {
          const isSelected = selectedMilestones.some((s) => s.id === m.id);
          return (
            <button
              key={m.id}
              onClick={() => onToggle(m)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                background: isSelected ? "#E8F5EE" : "var(--color-bg-warm)",
                border: isSelected ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <DomainTag areaId={m.areaId} size="sm" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-dark)", lineHeight: 1.3 }}>
                  {m.statement}
                </div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1 }}>
                  {m.id} · Level {m.levelId}
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                {isSelected ? (
                  <>
                    <circle cx="8" cy="8" r="7" fill="var(--color-primary)" />
                    <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                ) : (
                  <circle cx="8" cy="8" r="7" stroke="var(--color-border)" strokeWidth="1.5" />
                )}
              </svg>
            </button>
          );
        })}
      </div>

      <button onClick={onDone} style={primaryBtn}>
        Done{selectedMilestones.length > 0 ? ` (${selectedMilestones.length} selected)` : ""}
      </button>
    </div>
  );
}

// ── Done screen ───────────────────────────────────────────────────────────────

function DoneStep({
  students,
  onLogAnother,
  onDone,
}: {
  students: Child[];
  onLogAnother: () => void;
  onDone: () => void;
}) {
  const names =
    students.length === 1
      ? students[0].firstName
      : students.length === 2
      ? `${students[0].firstName} & ${students[1].firstName}`
      : `${students[0].firstName} and ${students.length - 1} others`;

  return (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "var(--color-secondary-wash)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          margin: "0 auto 14px",
        }}
      >
        ✓
      </div>
      <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 22 }}>
        Saved for {names}
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={onLogAnother} style={secondaryBtn}>
          Log another
        </button>
        <button onClick={onDone} style={primaryBtn}>
          Done
        </button>
      </div>
    </div>
  );
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const primaryBtn: React.CSSProperties = {
  width: "100%",
  padding: "11px 16px",
  borderRadius: 10,
  background: "var(--color-primary)",
  color: "#fff",
  fontSize: 13,
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
};

const secondaryBtn: React.CSSProperties = {
  flex: "0 0 auto",
  padding: "10px 16px",
  borderRadius: 10,
  background: "var(--color-bg-warm)",
  color: "var(--color-text-dark)",
  fontSize: 13,
  fontWeight: 600,
  border: "1px solid var(--color-border)",
  cursor: "pointer",
};
