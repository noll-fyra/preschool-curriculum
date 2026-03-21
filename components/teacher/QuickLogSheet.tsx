"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { AttendanceDot } from "@/components/teacher/AttendanceDot";
import { DomainTag } from "@/components/teacher/DomainTag";
import type { Milestone, Child, LearningAreaId, AttendanceStatus } from "@/lib/types";
import { LEARNING_AREAS } from "@/lib/types";

// ── Step state machine ────────────────────────────────────────────────────────

type Step =
  | { name: "select_child"; multiMode: boolean; selectedIds: string[] }
  | { name: "select_milestone"; childIds: string[] }
  | { name: "add_note"; childIds: string[]; milestone: Milestone }
  | { name: "done"; childIds: string[]; milestoneId: string };

const QUICK_PRESETS = [
  "Demonstrated independently",
  "Demonstrated with prompting",
  "Attempted — needs more practice",
  "First time observed doing this",
];

// ── Main component ────────────────────────────────────────────────────────────

export function QuickLogSheet() {
  const { quickLogOpen, closeQuickLog } = useStore();
  const children = useStore((s) => s.children);
  const milestones = useStore((s) => s.milestones);
  const activeClassId = useStore((s) => s.activeClassId);
  const attendance = useStore((s) => s.attendance);
  const plannedActivities = useStore((s) => s.plannedActivities);
  const logObservation = useStore((s) => s.logObservation);

  const [step, setStep] = useState<Step>({ name: "select_child", multiMode: false, selectedIds: [] });
  const [filterArea, setFilterArea] = useState<LearningAreaId | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const classChildren = [...children.filter((c) => c.classId === activeClassId)]
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  const todayActivities = plannedActivities.filter(
    (a) => a.classId === activeClassId && a.date === today
  );

  const attendanceMap = new Map<string, AttendanceStatus>();
  for (const a of attendance) {
    if (a.date === today) attendanceMap.set(a.childId, a.status);
  }

  useEffect(() => {
    if (!quickLogOpen) {
      const t = setTimeout(() => {
        setStep({ name: "select_child", multiMode: false, selectedIds: [] });
        setFilterArea(null);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [quickLogOpen]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleChildTap(childId: string) {
    if (step.name !== "select_child") return;

    if (!step.multiMode) {
      // Single mode — advance immediately
      setStep({ name: "select_milestone", childIds: [childId] });
    } else {
      // Multi mode — toggle selection
      const next = step.selectedIds.includes(childId)
        ? step.selectedIds.filter((id) => id !== childId)
        : [...step.selectedIds, childId];
      setStep({ ...step, selectedIds: next });
    }
  }

  function handleMultiConfirm() {
    if (step.name !== "select_child" || step.selectedIds.length === 0) return;
    setStep({ name: "select_milestone", childIds: step.selectedIds });
  }

  function handleMilestoneSelect(milestone: Milestone) {
    if (step.name !== "select_milestone") return;
    setStep({ name: "add_note", childIds: step.childIds, milestone });
  }

  function handleLog(childIds: string[], milestoneId: string, note?: string) {
    for (const childId of childIds) {
      logObservation(childId, milestoneId, note || undefined);
    }
    setStep({ name: "done", childIds, milestoneId });
  }

  function reset() {
    setStep({ name: "select_child", multiMode: false, selectedIds: [] });
    setFilterArea(null);
  }

  // ── Derived ─────────────────────────────────────────────────────────────────

  const stepChildIds: string[] =
    step.name === "select_child"
      ? step.selectedIds
      : "childIds" in step
      ? step.childIds
      : [];

  const selectedChildren = classChildren.filter((c) => stepChildIds.includes(c.id));

  const subheading =
    selectedChildren.length === 0
      ? null
      : selectedChildren.length === 1
      ? `for ${selectedChildren[0].firstName}`
      : `for ${selectedChildren.length} children`;

  // ── Render ──────────────────────────────────────────────────────────────────

  if (!quickLogOpen) return null;

  return (
    <>
      {/* Backdrop + centering wrapper */}
      <div
        className="fixed inset-0 z-100 flex items-end justify-center bg-black/40 md:items-center"
        onClick={closeQuickLog}
      >
        {/* Modal panel — stops click propagation so backdrop doesn't close it */}
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
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-dark)" }}>
              Log Observation
            </div>
            {subheading && (
              <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 2 }}>
                {subheading}
              </div>
            )}
          </div>
          <button
            onClick={closeQuickLog}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              padding: 4,
              marginTop: -2,
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Step content */}
        {step.name === "select_child" && (
          <SelectChildStep
            students={classChildren}
            attendanceMap={attendanceMap}
            multiMode={step.multiMode}
            selectedIds={step.selectedIds}
            onToggleMulti={() =>
              setStep({ name: "select_child", multiMode: !step.multiMode, selectedIds: [] })
            }
            onChildTap={handleChildTap}
            onConfirmMulti={handleMultiConfirm}
          />
        )}

        {step.name === "select_milestone" && (
          <SelectMilestoneStep
            milestones={milestones}
            filterArea={filterArea}
            onFilterArea={setFilterArea}
            onSelect={handleMilestoneSelect}
            onBack={() => setStep({ name: "select_child", multiMode: step.childIds.length > 1, selectedIds: step.childIds })}
          />
        )}

        {step.name === "add_note" && (
          <AddNoteStep
            students={selectedChildren}
            milestone={step.milestone}
            todayActivities={todayActivities}
            onLog={(text) => handleLog(step.childIds, step.milestone.id, text)}
            onBack={() => setStep({ name: "select_milestone", childIds: step.childIds })}
          />
        )}

        {step.name === "done" && (
          <DoneStep
            students={classChildren.filter((c) => step.childIds.includes(c.id))}
            onLogAnother={reset}
            onDone={closeQuickLog}
          />
        )}
        </div>
      </div>
    </>
  );
}

// ── Step: Select child ────────────────────────────────────────────────────────

function SelectChildStep({
  students,
  attendanceMap,
  multiMode,
  selectedIds,
  onToggleMulti,
  onChildTap,
  onConfirmMulti,
}: {
  students: Child[];
  attendanceMap: Map<string, AttendanceStatus>;
  multiMode: boolean;
  selectedIds: string[];
  onToggleMulti: () => void;
  onChildTap: (id: string) => void;
  onConfirmMulti: () => void;
}) {
  return (
    <div>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 13, color: "var(--color-text-mid)", margin: 0 }}>
          {multiMode ? "Select children" : "Who did you observe?"}
        </p>
        <button
          onClick={onToggleMulti}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: multiMode ? "var(--color-primary)" : "var(--color-text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 0",
          }}
        >
          {multiMode ? "Single select" : "Select multiple"}
        </button>
      </div>

      {/* Child grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {students.map((child) => {
          const status = attendanceMap.get(child.id) ?? "pending";
          const isSelected = selectedIds.includes(child.id);

          return (
            <button
              key={child.id}
              onClick={() => onChildTap(child.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
                padding: "10px 6px",
                borderRadius: 10,
                background: isSelected ? "var(--color-primary-wash)" : "var(--color-bg-warm)",
                border: isSelected
                  ? "2px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {/* Multi-select checkmark */}
              {multiMode && isSelected && (
                <span
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
              )}

              <div style={{ position: "relative" }}>
                <ChildAvatar name={child.firstName} size="sm" />
                <span style={{ position: "absolute", bottom: -1, right: -1 }}>
                  <AttendanceDot status={status} size={8} />
                </span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-dark)", lineHeight: 1.2 }}>
                {child.firstName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Multi-select confirm */}
      {multiMode && (
        <button
          onClick={onConfirmMulti}
          disabled={selectedIds.length === 0}
          style={{
            ...primaryBtn,
            marginTop: 14,
            opacity: selectedIds.length > 0 ? 1 : 0.4,
          }}
        >
          Continue with {selectedIds.length > 0 ? `${selectedIds.length} selected` : "selection"}
        </button>
      )}
    </div>
  );
}

// ── Step: Select milestone ────────────────────────────────────────────────────

function SelectMilestoneStep({
  milestones,
  filterArea,
  onFilterArea,
  onSelect,
  onBack,
}: {
  milestones: Milestone[];
  filterArea: LearningAreaId | null;
  onFilterArea: (area: LearningAreaId | null) => void;
  onSelect: (m: Milestone) => void;
  onBack: () => void;
}) {
  const visible = filterArea
    ? milestones.filter((m) => m.areaId === filterArea)
    : milestones;

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--color-text-mid)", marginBottom: 10 }}>
        What area did you observe?
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
      <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 300, overflowY: "auto" }}>
        {visible.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: "var(--color-bg-warm)",
              border: "1px solid var(--color-border)",
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
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
              <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      <button onClick={onBack} style={{ ...secondaryBtn, marginTop: 12 }}>
        Back
      </button>
    </div>
  );
}

// ── Step: Add note (optional) ─────────────────────────────────────────────────

function AddNoteStep({
  students,
  milestone,
  todayActivities,
  onLog,
  onBack,
}: {
  students: Child[];
  milestone: Milestone;
  todayActivities: { id: string; title: string }[];
  onLog: (text: string, activityId?: string) => void;
  onBack: () => void;
}) {
  const [note, setNote] = useState("");
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  function applyPreset(text: string) {
    setNote(text);
  }

  return (
    <div>
      {/* Milestone summary */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          borderRadius: 10,
          background: "var(--color-bg-warm)",
          border: "1px solid var(--color-border)",
          marginBottom: 16,
        }}
      >
        <DomainTag areaId={milestone.areaId} />
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-dark)", flex: 1 }}>
          {milestone.statement}
        </span>
      </div>

      {/* Child list (if multiple) */}
      {students.length > 1 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {students.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <ChildAvatar name={c.firstName} size="xs" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-dark)" }}>{c.firstName}</span>
            </div>
          ))}
        </div>
      )}

      {/* Quick presets */}
      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-mid)", marginBottom: 7 }}>
        Quick note
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => applyPreset(preset)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              fontSize: 13,
              textAlign: "left",
              background: note === preset ? "var(--color-primary-wash)" : "var(--color-bg-warm)",
              border: note === preset
                ? "1.5px solid var(--color-primary)"
                : "1px solid var(--color-border)",
              color: note === preset ? "var(--color-primary)" : "var(--color-text-dark)",
              fontWeight: note === preset ? 600 : 400,
              cursor: "pointer",
            }}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Free text (optional) */}
      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-mid)", marginBottom: 7 }}>
        Or write your own <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>(optional)</span>
      </p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add any specific details…"
        rows={3}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1.5px solid var(--color-border)",
          fontSize: 13,
          resize: "none",
          outline: "none",
          lineHeight: 1.5,
          boxSizing: "border-box",
          marginBottom: 14,
        }}
      />

      {/* Activity tag (optional) */}
      {todayActivities.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-mid)", marginBottom: 7 }}>
            During activity <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>(optional)</span>
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {todayActivities.map((act) => {
              const isSelected = selectedActivityId === act.id;
              return (
                <button
                  key={act.id}
                  onClick={() => setSelectedActivityId(isSelected ? null : act.id)}
                  style={{
                    padding: "5px 11px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: isSelected ? 600 : 400,
                    border: "1.5px solid",
                    borderColor: isSelected ? "var(--color-secondary-dark)" : "var(--color-border)",
                    background: isSelected ? "var(--color-secondary-dark)" : "var(--color-bg-warm)",
                    color: isSelected ? "#fff" : "var(--color-text-mid)",
                    cursor: "pointer",
                  }}
                >
                  {act.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onBack} style={secondaryBtn}>
          Back
        </button>
        <button onClick={() => onLog(note, selectedActivityId ?? undefined)} style={primaryBtn}>
          Log it ✓
        </button>
      </div>
    </div>
  );
}

// ── Step: Done ────────────────────────────────────────────────────────────────

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
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-dark)", marginBottom: 4 }}>
        Observation logged!
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
  flex: 1,
  padding: "10px 16px",
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

