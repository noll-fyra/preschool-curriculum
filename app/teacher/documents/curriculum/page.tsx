"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import type { CurriculumContext } from "@/lib/ai-prompts";
import type { LearningAreaId } from "@/lib/types";
import { LEARNING_AREAS } from "@/lib/types";

const TERMS = ["Term 1", "Term 2", "Term 3", "Term 4"];

export default function CurriculumPlanPage() {
  const store = useStore();
  const activeClass = store.classes.find((c) => c.id === store.activeClassId) ?? store.classes[0];

  const [term, setTerm] = useState(TERMS[1]);
  const [focusAreas, setFocusAreas] = useState<LearningAreaId[]>(["LL", "NUM", "SED"]);
  const [content, setContent] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  const classChildren = store.children.filter((c) => c.classId === store.activeClassId);

  function toggleArea(areaId: LearningAreaId) {
    setFocusAreas((prev) =>
      prev.includes(areaId) ? prev.filter((a) => a !== areaId) : [...prev, areaId]
    );
  }

  async function handleGenerate() {
    setGenerating(true);
    setSaved(false);
    const ctx: CurriculumContext = {
      className: activeClass.name,
      yearLevel: activeClass.preschoolYear,
      term,
      focusAreas: focusAreas.map((id) => LEARNING_AREAS.find((a) => a.id === id)?.name ?? id),
      classSize: classChildren.length,
    };
    try {
      const res = await fetch("/api/generate/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ctx),
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
    if (!content) return;
    store.saveGeneratedDocument({
      type: "curriculum",
      classId: store.activeClassId,
      title: `${activeClass.name} — ${term} Curriculum Plan`,
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
        Curriculum Plan
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
        Generate a term-long curriculum plan for {activeClass.name}
      </p>

      {/* Config */}
      <div
        className="rounded-2xl border p-5 mb-5 flex flex-col gap-4"
        style={{ borderColor: "var(--color-border)", background: "white" }}
      >
        {/* Term */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Term
          </label>
          <div className="flex gap-2 flex-wrap">
            {TERMS.map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  background: term === t ? "var(--color-primary-wash)" : "white",
                  color: term === t ? "var(--color-primary)" : "var(--color-text-mid)",
                  borderColor: term === t ? "var(--color-primary)" : "var(--color-border)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Focus areas */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Focus learning areas
          </label>
          <div className="flex gap-2 flex-wrap">
            {LEARNING_AREAS.map((area) => {
              const active = focusAreas.includes(area.id);
              return (
                <button
                  key={area.id}
                  onClick={() => toggleArea(area.id)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={{
                    background: active ? "var(--color-primary-wash)" : "white",
                    color: active ? "var(--color-primary)" : "var(--color-text-mid)",
                    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                  }}
                >
                  {area.id}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating || focusAreas.length === 0}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          style={{ background: "var(--color-primary)" }}
        >
          {generating ? "Generating…" : content ? "Regenerate" : "Generate curriculum plan"}
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
              {term} · {activeClass.name}
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
                {[90, 70, 80, 60, 85, 75].map((w, i) => (
                  <div key={i} className="h-3.5 rounded animate-pulse" style={{ background: "var(--color-bg-deep)", width: `${w}%` }} />
                ))}
              </div>
            ) : (
              content?.split("\n").map((line, i) => {
                if (line.startsWith("## ")) {
                  return <h3 key={i} className="text-sm font-bold mt-5 mb-2 first:mt-0" style={{ color: "var(--color-text-dark)" }}>{line.replace("## ", "")}</h3>;
                }
                if (line.startsWith("# ")) {
                  return <h2 key={i} className="text-base font-bold mt-0 mb-3" style={{ color: "var(--color-text-dark)" }}>{line.replace("# ", "")}</h2>;
                }
                if (line.startsWith("| ")) {
                  return <p key={i} className="text-xs font-mono leading-relaxed border-b py-1" style={{ color: "var(--color-text-mid)", borderColor: "var(--color-border)" }}>{line}</p>;
                }
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
