"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    <div className="mx-auto max-w-2xl px-5 py-6 md:px-8 md:py-8">
      <Link
        href="/teacher/documents"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Documents
      </Link>

      <h1 className="mb-1 text-2xl font-bold text-foreground">Student Evaluation</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Generate a formal developmental evaluation for a student
      </p>

      <Card className="mb-5">
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Select student
            </p>
            <div className="flex flex-wrap gap-2">
              {classChildren.map((child) => {
                const selected = selectedChildId === child.id;
                return (
                  <Button
                    key={child.id}
                    type="button"
                    size="xs"
                    variant={selected ? "secondary" : "outline"}
                    className={cn(
                      "gap-1.5 rounded-full font-medium",
                      selected && "border-primary/30 bg-primary/10 text-primary",
                    )}
                    onClick={() => {
                      setSelectedChildId(child.id);
                      setContent(null);
                      setSaved(false);
                    }}
                  >
                    <ChildAvatar name={getChildDisplayName(child)} size="xs" />
                    {child.firstName}
                  </Button>
                );
              })}
            </div>
          </div>

          <Button
            type="button"
            className="w-full font-semibold"
            onClick={handleGenerate}
            disabled={generating || !selectedChildId}
          >
            {generating ? "Generating…" : content ? "Regenerate" : "Generate evaluation"}
          </Button>
        </CardContent>
      </Card>

      {(generating || content) && (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-3">
            <h2 className="text-sm font-semibold text-foreground">
              {selectedChild ? getChildDisplayName(selectedChild) : ""} — Evaluation
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
                {[85, 65, 80, 55, 75, 70].map((w, i) => (
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
                if (line.startsWith("- ")) {
                  return (
                    <p key={i} className="pl-3 text-sm leading-relaxed text-foreground">
                      • {line.slice(2)}
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
