"use client";

import { useState } from "react";
import type { LearningAreaId, Child, Milestone, PlannedActivity } from "@/lib/types";
import { ChildAvatar } from "./ChildAvatar";

const AREAS: { id: LearningAreaId; label: string; bg: string; text: string }[] = [
  { id: "LL",  label: "Language & Literacy", bg: "#E8F0FE", text: "#3B5AC6" },
  { id: "NUM", label: "Numeracy",             bg: "#FEF3D7", text: "#A06010" },
  { id: "SED", label: "Social & Emotional",   bg: "#E8F5EE", text: "#2D7A4F" },
];

interface ActivityCreatorProps {
  children: Child[];
  milestones: Milestone[];
  defaultDate: string; // YYYY-MM-DD pre-selected in the date picker
  onSave: (activity: Omit<PlannedActivity, "id" | "createdAt" | "classId">) => void;
  onCancel: () => void;
}

export function ActivityCreator({
  children,
  milestones,
  defaultDate,
  onSave,
  onCancel,
}: ActivityCreatorProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [areaId, setAreaId] = useState<LearningAreaId>("LL");
  const [milestoneId, setMilestoneId] = useState<string>("");
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>(
    children.map((c) => c.id) // default: all children
  );

  const filteredMilestones = milestones.filter((m) => m.areaId === areaId);

  function toggleChild(childId: string) {
    setSelectedChildIds((prev) =>
      prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId]
    );
  }

  function toggleAll() {
    if (selectedChildIds.length === children.length) {
      setSelectedChildIds([]);
    } else {
      setSelectedChildIds(children.map((c) => c.id));
    }
  }

  function handleSubmit() {
    if (!title.trim() || !description.trim() || !date || selectedChildIds.length === 0) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      areaId,
      milestoneId: milestoneId || undefined,
      childIds: selectedChildIds,
      date,
    });
  }

  const isValid = title.trim() && description.trim() && date && selectedChildIds.length > 0;

  return (
    <div
      className="rounded-2xl border bg-white p-5 space-y-5"
      style={{ borderColor: "var(--color-primary)", borderWidth: "1.5px" }}
    >
      <h3 className="font-semibold text-base" style={{ color: "var(--color-text-dark)" }}>
        New Activity
      </h3>

      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Letter Hunt"
          className="w-full text-sm rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
        />
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full text-sm rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what children will do and how…"
          rows={3}
          className="w-full text-sm rounded-lg border px-3 py-2 resize-none focus:outline-none focus:ring-2"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
        />
      </div>

      {/* Subject area */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          Subject area
        </label>
        <div className="flex gap-2 flex-wrap">
          {AREAS.map((area) => {
            const active = areaId === area.id;
            return (
              <button
                key={area.id}
                onClick={() => { setAreaId(area.id); setMilestoneId(""); }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  background: active ? area.bg : "white",
                  color: active ? area.text : "var(--color-text-mid)",
                  borderColor: active ? area.text : "var(--color-border)",
                }}
              >
                {area.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Milestone (optional) */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          Linked milestone <span className="font-normal normal-case">(optional)</span>
        </label>
        <select
          value={milestoneId}
          onChange={(e) => setMilestoneId(e.target.value)}
          className="w-full text-sm rounded-lg border px-3 py-2 focus:outline-none"
          style={{ borderColor: "var(--color-border)", color: milestoneId ? "var(--color-text-dark)" : "var(--color-text-muted)" }}
        >
          <option value="">— No specific milestone —</option>
          {filteredMilestones.map((m) => (
            <option key={m.id} value={m.id}>
              {m.id} · {m.statement}
            </option>
          ))}
        </select>
      </div>

      {/* Children */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Assigned to
          </label>
          <button
            onClick={toggleAll}
            className="text-xs"
            style={{ color: "var(--color-primary)" }}
          >
            {selectedChildIds.length === children.length ? "Deselect all" : "Select all"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {children.map((child) => {
            const selected = selectedChildIds.includes(child.id);
            return (
              <button
                key={child.id}
                onClick={() => toggleChild(child.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-medium transition-all"
                style={{
                  background: selected ? "var(--color-primary-wash)" : "white",
                  borderColor: selected ? "var(--color-primary)" : "var(--color-border)",
                  color: selected ? "var(--color-primary)" : "var(--color-text-mid)",
                }}
              >
                <ChildAvatar name={child.name} size="xs" />
                {child.name.split(" ")[0]}
              </button>
            );
          })}
        </div>
        {selectedChildIds.length === 0 && (
          <p className="text-xs" style={{ color: "#C0432A" }}>
            Select at least one child
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="px-4 py-2 text-sm font-semibold rounded-xl text-white transition-opacity disabled:opacity-40"
          style={{ background: "var(--color-primary)" }}
        >
          Create activity
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium rounded-xl"
          style={{ color: "var(--color-text-muted)", background: "var(--color-bg-deep)" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
