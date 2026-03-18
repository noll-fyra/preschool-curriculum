"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";

export default function EvaluationPage() {
  const store = useStore();
  const classChildren = store.children.filter((c) => c.classId === store.activeClassId);

  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  const selectedChild = classChildren.find((c) => c.id === selectedChildId);

  async function handleGenerate() {
    if (!selectedChildId || !selectedChild) return;
    setGenerating(true);
    setSaved(false);
    try {
      const res = await fetch("/api/generate/evaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          child: selectedChild,
          milestones: store.milestones,
          progress: store.progress,
          sessions: store.sessions,
          observations: store.observations,
          notes: store.teacherNotes.filter((n) => n.childId === selectedChildId && !n.deletedAt).slice(0, 8),
          snapshot: store.personalitySnapshots.find((s) => s.childId === selectedChildId),
          strategies: store.teacherStrategies.find((s) => s.childId === selectedChildId),
          familyContext: store.familyContexts.find((f) => f.childId === selectedChildId),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setContent(data.content ?? null);
      }
    } finally {
      setGenerating(false);
    }
  }

  function handleSave() {
    if (!content || !selectedChild) return;
    store.saveGeneratedDocument({
      type: "evaluation",
      childId: selectedChildId ?? undefined,
      title: `${getChildDisplayName(selectedChild)} — Developmental Evaluation`,
      content,
    });
    setSaved(true);
  }

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      <Link
        href="/teacher/documents"
        className="inline-flex items-center gap-1.5 text-sm mb-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Documents
      </Link>

      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text-dark)" }}>
        Student Evaluation
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
        Generate a formal developmental evaluation for a student
      </p>

      {/* Student selector */}
      <div
        className="rounded-2xl border p-5 mb-5 flex flex-col gap-4"
        style={{ borderColor: "var(--color-border)", background: "white" }}
      >
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Select student
          </label>
          <div className="flex flex-wrap gap-2">
            {classChildren.map((child) => {
              const selected = selectedChildId === child.id;
              return (
                <button
                  key={child.id}
                  onClick={() => { setSelectedChildId(child.id); setContent(null); setSaved(false); }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-medium transition-all"
                  style={{
                    background: selected ? "var(--color-primary-wash)" : "white",
                    borderColor: selected ? "var(--color-primary)" : "var(--color-border)",
                    color: selected ? "var(--color-primary)" : "var(--color-text-mid)",
                  }}
                >
                  <ChildAvatar name={getChildDisplayName(child)} size="xs" />
                  {child.firstName}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating || !selectedChildId}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          style={{ background: "var(--color-primary)" }}
        >
          {generating ? "Generating…" : content ? "Regenerate" : "Generate evaluation"}
        </button>
      </div>

      {/* Output */}
      {(generating || content) && (
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div
            className="px-5 py-3 border-b flex items-center justify-between"
            style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "var(--color-text-dark)" }}>
              {selectedChild ? getChildDisplayName(selectedChild) : ""} — Evaluation
            </h2>
            {content && !generating && (
              <button
                onClick={handleSave}
                className="text-xs px-3 py-1 rounded-lg border font-medium transition-colors"
                style={{
                  borderColor: saved ? "var(--color-primary)" : "var(--color-border)",
                  color: saved ? "var(--color-primary)" : "var(--color-text-mid)",
                  background: "white",
                }}
              >
                {saved ? "Saved ✓" : "Save"}
              </button>
            )}
          </div>

          <div className="px-5 py-4">
            {generating ? (
              <div className="flex flex-col gap-2">
                {[85, 65, 80, 55, 75, 70].map((w, i) => (
                  <div key={i} className="h-3.5 rounded animate-pulse" style={{ background: "var(--color-bg-deep)", width: `${w}%` }} />
                ))}
              </div>
            ) : (
              content?.split("\n").map((line, i) => {
                if (line.startsWith("## ")) return <h3 key={i} className="text-sm font-bold mt-5 mb-2 first:mt-0" style={{ color: "var(--color-text-dark)" }}>{line.replace("## ", "")}</h3>;
                if (line.startsWith("- ")) return <p key={i} className="text-sm leading-relaxed pl-3" style={{ color: "var(--color-text-dark)" }}>• {line.slice(2)}</p>;
                if (line.trim() === "") return <div key={i} className="h-2" />;
                return <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--color-text-dark)" }}>{line}</p>;
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
