"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getActivityConfig } from "@/lib/activity-data";
import type { ActivityConfig, ActivityQuestion } from "@/lib/activity-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function deepCloneConfig(config: ActivityConfig): ActivityConfig {
  return {
    ...config,
    skillMilestoneIds: config.skillMilestoneIds ? [...config.skillMilestoneIds] : undefined,
    questions: config.questions.map((q) => ({
      ...q,
      options: q.options.map((o) => ({ ...o })),
    })),
  };
}

export default function EditActivityPage() {
  const params = useParams();
  const milestoneId = params.milestoneId as string;
  const { activityConfigOverrides, setActivityConfig, clearActivityConfigOverride, milestones } = useStore();
  const [config, setConfig] = useState<ActivityConfig | null>(() => {
    const base = activityConfigOverrides[milestoneId] ?? getActivityConfig(milestoneId);
    return base ? deepCloneConfig(base) : null;
  });
  const [saved, setSaved] = useState(false);

  if (!config) {
    return (
      <div className="px-5 py-8">
        <p className="text-muted-foreground">Activity not found.</p>
        <Link href="/school/activities" className="mt-2 inline-block text-sm font-medium text-primary">
          ← Back to activities
        </Link>
      </div>
    );
  }

  const hasOverride = !!activityConfigOverrides[milestoneId];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivityConfig(milestoneId, config);
    setSaved(true);
  };

  const handleRevert = () => {
    clearActivityConfigOverride(milestoneId);
    const base = getActivityConfig(milestoneId);
    if (base) setConfig(deepCloneConfig(base));
    setSaved(false);
  };

  const updateQuestion = (index: number, patch: Partial<ActivityQuestion>) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const questions = [...prev.questions];
      questions[index] = { ...questions[index], ...patch };
      return { ...prev, questions };
    });
  };

  const skillIds = config.skillMilestoneIds ?? [config.milestoneId];
  const toggleSkill = (id: string) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const current = prev.skillMilestoneIds ?? [prev.milestoneId];
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      return { ...prev, skillMilestoneIds: next.length > 0 ? next : [prev.milestoneId] };
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-6 md:px-8 md:py-8">
      <Link
        href="/school/activities"
        className="mb-6 inline-flex text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to activities
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Edit activity</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="act-name">Name</Label>
                <Input
                  id="act-name"
                  value={config.name}
                  onChange={(e) => setConfig((c) => (c ? { ...c, name: e.target.value } : c))}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="act-emoji">Emoji</Label>
                <Input
                  id="act-emoji"
                  value={config.emoji}
                  onChange={(e) => setConfig((c) => (c ? { ...c, emoji: e.target.value } : c))}
                  className="h-10"
                  placeholder="e.g. 🔤"
                />
              </div>
              {config.isDynamic && (
                <p className="text-sm text-muted-foreground">
                  This activity is dynamic (questions generated from the child’s name). Question text is not
                  editable here.
                </p>
              )}
            </div>

            <div>
              <h2 className="mb-2 text-sm font-semibold text-foreground">Skills this activity trains</h2>
              <p className="mb-3 text-xs text-muted-foreground">
                Select which milestones this activity helps develop (used for reporting and assignment).
              </p>
              <div className="flex flex-wrap gap-2">
                {milestones.map((m) => (
                  <label
                    key={m.id}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                      skillIds.includes(m.id)
                        ? "border-primary/40 bg-primary/10"
                        : "border-border bg-transparent",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={skillIds.includes(m.id)}
                      onChange={() => toggleSkill(m.id)}
                      className="size-4 rounded border-input accent-primary"
                    />
                    <span className="text-foreground">{m.id}</span>
                  </label>
                ))}
              </div>
            </div>

            {!config.isDynamic && config.questions.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-foreground">Questions</h2>
                <div className="flex flex-col gap-4">
                  {config.questions.map((q, i) => (
                    <div
                      key={q.id}
                      className="space-y-3 rounded-xl border border-border bg-muted/30 p-4"
                    >
                      <span className="text-xs font-medium text-muted-foreground">Question {i + 1}</span>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Prompt</Label>
                        <Input
                          value={q.prompt}
                          onChange={(e) => updateQuestion(i, { prompt: e.target.value })}
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Feedback (correct)</Label>
                        <Input
                          value={q.feedbackCorrect}
                          onChange={(e) => updateQuestion(i, { feedbackCorrect: e.target.value })}
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Feedback (wrong)</Label>
                        <Input
                          value={q.feedbackWrong}
                          onChange={(e) => updateQuestion(i, { feedbackWrong: e.target.value })}
                          className="h-9"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" className="font-semibold">
                Save changes
              </Button>
              {hasOverride && (
                <Button type="button" variant="outline" className="font-medium" onClick={handleRevert}>
                  Revert to default
                </Button>
              )}
              <Link href="/school/activities" className={cn(buttonVariants({ variant: "outline" }), "font-medium")}>
                Cancel
              </Link>
            </div>
            {saved && <p className="text-sm font-medium text-primary">Saved. Student play will use this version.</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
