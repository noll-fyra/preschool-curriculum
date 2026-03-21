"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import type { CurriculumContext } from "@/lib/ai-prompts";
import type { LearningAreaId } from "@/lib/types";
import { LEARNING_AREAS } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    <div className="mx-auto max-w-2xl px-5 py-6 md:px-8 md:py-8">
      <Link
        href="/teacher/documents"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Documents
      </Link>

      <h1 className="mb-1 text-2xl font-bold text-foreground">Curriculum Plan</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Generate a term-long curriculum plan for {activeClass.name}
      </p>

      <Card className="mb-5">
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Term</p>
            <div className="flex flex-wrap gap-2">
              {TERMS.map((t) => (
                <Button
                  key={t}
                  type="button"
                  size="xs"
                  variant={term === t ? "secondary" : "outline"}
                  className={cn(
                    "rounded-full font-semibold",
                    term === t && "border-primary/30 bg-primary/10 text-primary",
                  )}
                  onClick={() => setTerm(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Focus learning areas
            </p>
            <div className="flex flex-wrap gap-2">
              {LEARNING_AREAS.map((area) => {
                const active = focusAreas.includes(area.id);
                return (
                  <Button
                    key={area.id}
                    type="button"
                    size="xs"
                    variant={active ? "secondary" : "outline"}
                    className={cn(
                      "rounded-full font-semibold",
                      active && "border-primary/30 bg-primary/10 text-primary",
                    )}
                    onClick={() => toggleArea(area.id)}
                  >
                    {area.id}
                  </Button>
                );
              })}
            </div>
          </div>

          <Button
            type="button"
            className="w-full font-semibold"
            onClick={handleGenerate}
            disabled={generating || focusAreas.length === 0}
          >
            {generating ? "Generating…" : content ? "Regenerate" : "Generate curriculum plan"}
          </Button>
        </CardContent>
      </Card>

      {(generating || content) && (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-3">
            <h2 className="text-sm font-semibold text-foreground">
              {term} · {activeClass.name}
            </h2>
            {content && !generating && (
              <Button
                type="button"
                size="xs"
                variant={saved ? "secondary" : "outline"}
                className="font-semibold"
                onClick={handleSave}
              >
                {saved ? "Saved ✓" : "Save"}
              </Button>
            )}
          </div>

          <CardContent className="px-5 py-4">
            {generating ? (
              <div className="flex flex-col gap-2">
                {[90, 70, 80, 60, 85, 75].map((w, i) => (
                  <div
                    key={i}
                    className="h-3.5 animate-pulse rounded bg-muted"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            ) : (
              content?.split("\n").map((line, i) => {
                if (line.startsWith("## ")) {
                  return (
                    <h3 key={i} className="mt-5 mb-2 text-sm font-bold text-foreground first:mt-0">
                      {line.replace("## ", "")}
                    </h3>
                  );
                }
                if (line.startsWith("# ")) {
                  return (
                    <h2 key={i} className="mt-0 mb-3 text-base font-bold text-foreground">
                      {line.replace("# ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("| ")) {
                  return (
                    <p
                      key={i}
                      className="border-b border-border py-1 font-mono text-xs leading-relaxed text-muted-foreground"
                    >
                      {line}
                    </p>
                  );
                }
                if (line.trim() === "") return <div key={i} className="h-2" />;
                return (
                  <p key={i} className="text-sm leading-relaxed text-foreground">
                    {line}
                  </p>
                );
              })
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
