"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getAllChildrenWithLevels } from "@/lib/selectors";
import { ChildStatusCard } from "@/components/teacher/ChildStatusCard";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import type { LearningAreaId, LevelId, ChildWithLevels } from "@/lib/types";
import { LEARNING_AREAS } from "@/lib/types";

const FILTERS: { id: LearningAreaId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "LL", label: "Language & Literacy" },
  { id: "NUM", label: "Numeracy" },
  { id: "SED", label: "Social & Emotional" },
];

const LEVELS: { id: LevelId; label: string; bg: string; text: string; border: string }[] = [
  { id: "B", label: "Beginning", bg: "#FEE9E5", text: "#C0432A", border: "#F5C4BB" },
  { id: "D", label: "Developing", bg: "#FEF3D7", text: "#A06010", border: "#F5E0A0" },
  { id: "S", label: "Secure",    bg: "#E8F5EE", text: "#2D7A4F", border: "#B8DEC8" },
];

export default function ClassPage() {
  const store = useStore();
  const activeClass = store.classes.find((c) => c.id === store.activeClassId) ?? store.classes[0];
  const children = getAllChildrenWithLevels(store).sort((a, b) => a.name.localeCompare(b.name));
  const [activeFilter, setActiveFilter] = useState<LearningAreaId | "all">("all");

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-4xl">
      <div className="mb-5">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          {activeClass.name}
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
          {children.length} children · {activeClass.termLabel}
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map((f) => {
          const active = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all"
              style={{
                background: active ? "var(--color-primary)" : "white",
                color: active ? "white" : "var(--color-text-mid)",
                borderColor: active ? "var(--color-primary)" : "var(--color-border)",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* ── All view ─────────────────────────────────────────────────────── */}
      {activeFilter === "all" && (
        <>
          <div className="flex gap-3 mb-5 flex-wrap">
            {LEVELS.map(({ label, bg, text }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: bg, border: `1.5px solid ${text}` }} />
                {label}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {children.map((child) => (
              <ChildStatusCard key={child.id} child={child} />
            ))}
          </div>
        </>
      )}

      {/* ── Grouped by proficiency ───────────────────────────────────────── */}
      {activeFilter !== "all" && (
        <GroupedView
          children={children}
          areaId={activeFilter}
          areaName={LEARNING_AREAS.find((a) => a.id === activeFilter)!.name}
        />
      )}
    </div>
  );
}

function GroupedView({
  children,
  areaId,
  areaName,
}: {
  children: ChildWithLevels[];
  areaId: LearningAreaId;
  areaName: string;
}) {
  const grouped = LEVELS.map((level) => ({
    ...level,
    children: children.filter((c) => c.levels[areaId] === level.id).sort((a, b) => a.name.localeCompare(b.name)),
  }));

  return (
    <div>
      <p className="text-sm mb-5" style={{ color: "var(--color-text-muted)" }}>
        Students grouped by their current level in{" "}
        <span className="font-medium" style={{ color: "var(--color-text-dark)" }}>{areaName}</span>
      </p>

      {/* Three columns on md+, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {grouped.map(({ id, label, bg, text, border, children: groupChildren }) => (
          <div key={id} className="rounded-2xl overflow-hidden border" style={{ borderColor: border }}>
            {/* Group header */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: bg }}>
              <span className="text-sm font-semibold" style={{ color: text }}>{label}</span>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.6)", color: text }}
              >
                {groupChildren.length}
              </span>
            </div>

            {/* Children in this group */}
            <div className="bg-white divide-y divide-border">
              {groupChildren.length === 0 ? (
                <p className="px-4 py-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
                  No students at this level
                </p>
              ) : (
                groupChildren.map((child) => (
                  <Link
                    key={child.id}
                    href={`/teacher/child/${child.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-bg-cream transition-colors"
                  >
                    <ChildAvatar name={child.name} size="sm" />
                    <span className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
                      {child.name}
                    </span>
                    <svg className="ml-auto opacity-30" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
