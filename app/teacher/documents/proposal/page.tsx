"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import type { ProposalContext } from "@/lib/ai-prompts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const EVENT_TYPES = [
  "Learning Journey",
  "Cultural Celebration",
  "Sports Day",
  "Science Fair",
  "Art Exhibition",
  "Parent Workshop",
  "Community Event",
  "Field Trip",
  "Other",
];

const AUDIENCES = ["Whole class", "Nursery level", "Whole school", "Parents & families", "Specific group"];

export default function ProposalPage() {
  const store = useStore();

  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [objectives, setObjectives] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [content, setContent] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  const isValid = eventTitle.trim() && objectives.trim();

  async function handleGenerate() {
    if (!isValid) return;
    setGenerating(true);
    setSaved(false);
    const ctx: ProposalContext = {
      eventTitle: eventTitle.trim(),
      eventType,
      targetAudience: audience,
      objectives: objectives.trim(),
      date: date || undefined,
      additionalNotes: notes.trim() || undefined,
    };
    try {
      const res = await fetch("/api/generate/proposal", {
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
      type: "proposal",
      title: `${eventTitle} — Proposal`,
      content,
    });
    setSaved(true);
  }

  const taClass =
    "min-h-[4.5rem] w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

  return (
    <div className="mx-auto max-w-2xl px-5 py-6 md:px-8 md:py-8">
      <Link
        href="/teacher/documents"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Documents
      </Link>

      <h1 className="mb-1 text-2xl font-bold text-foreground">Event / Activity Proposal</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Draft a professional proposal for school admin approval
      </p>

      <Card className="mb-5">
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Event / Activity title
            </p>
            <Input
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="e.g. Garden to Table Learning Journey"
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type</p>
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES.map((t) => (
                <Button
                  key={t}
                  type="button"
                  size="xs"
                  variant={eventType === t ? "secondary" : "outline"}
                  className={cn(
                    "rounded-full font-semibold",
                    eventType === t && "border-primary/30 bg-primary/10 text-primary",
                  )}
                  onClick={() => setEventType(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Target audience
            </p>
            <div className="flex flex-wrap gap-2">
              {AUDIENCES.map((a) => (
                <Button
                  key={a}
                  type="button"
                  size="xs"
                  variant={audience === a ? "secondary" : "outline"}
                  className={cn(
                    "rounded-full font-semibold",
                    audience === a && "border-primary/30 bg-primary/10 text-primary",
                  )}
                  onClick={() => setAudience(a)}
                >
                  {a}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Learning objectives
            </p>
            <textarea
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="What will children learn or experience? Which NEL areas does this support?"
              rows={3}
              className={taClass}
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Proposed date <span className="font-normal normal-case">(optional)</span>
            </p>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10" />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Additional notes <span className="font-normal normal-case">(optional)</span>
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific requirements, budget constraints, or context for admin…"
              rows={2}
              className={taClass}
            />
          </div>

          <Button
            type="button"
            className="w-full font-semibold"
            onClick={handleGenerate}
            disabled={generating || !isValid}
          >
            {generating ? "Generating…" : content ? "Regenerate" : "Generate proposal"}
          </Button>
        </CardContent>
      </Card>

      {(generating || content) && (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-3">
            <h2 className="text-sm font-semibold text-foreground">{eventTitle || "Proposal"}</h2>
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
                {[80, 65, 90, 55, 75].map((w, i) => (
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
