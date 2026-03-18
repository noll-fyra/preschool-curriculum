"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getActivityConfig } from "@/lib/activity-data";
import type { ActivityConfig, ActivityQuestion } from "@/lib/activity-data";

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
        <p style={{ color: "var(--color-text-muted)" }}>Activity not found.</p>
        <Link href="/school/activities" className="text-sm font-medium mt-2 inline-block" style={{ color: "var(--color-primary)" }}>
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
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      <Link
        href="/school/activities"
        className="inline-flex items-center gap-1 text-sm font-medium mb-6"
        style={{ color: "var(--color-text-mid)" }}
      >
        ← Back to activities
      </Link>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-dark)" }}>
        Edit activity
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
              Name
            </span>
            <input
              type="text"
              value={config.name}
              onChange={(e) => setConfig((c) => (c ? { ...c, name: e.target.value } : c))}
              className="w-full px-4 py-2.5 rounded-lg border text-sm"
              style={{ borderColor: "var(--color-border)" }}
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
              Emoji
            </span>
            <input
              type="text"
              value={config.emoji}
              onChange={(e) => setConfig((c) => (c ? { ...c, emoji: e.target.value } : c))}
              className="w-full px-4 py-2.5 rounded-lg border text-sm"
              style={{ borderColor: "var(--color-border)" }}
              placeholder="e.g. 🔤"
            />
          </label>
          {config.isDynamic && (
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              This activity is dynamic (questions generated from the child’s name). Question text is not editable here.
            </p>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-2" style={{ color: "var(--color-text-dark)" }}>
            Skills this activity trains
          </h2>
          <p className="text-xs mb-3" style={{ color: "var(--color-text-muted)" }}>
            Select which milestones this activity helps develop (used for reporting and assignment).
          </p>
          <div className="flex flex-wrap gap-2">
            {milestones.map((m) => (
              <label
                key={m.id}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm"
                style={{
                  borderColor: skillIds.includes(m.id) ? "var(--color-primary)" : "var(--color-border)",
                  background: skillIds.includes(m.id) ? "var(--color-primary-wash)" : "transparent",
                }}
              >
                <input
                  type="checkbox"
                  checked={skillIds.includes(m.id)}
                  onChange={() => toggleSkill(m.id)}
                  className="rounded border-gray-300"
                />
                <span style={{ color: "var(--color-text-dark)" }}>{m.id}</span>
              </label>
            ))}
          </div>
        </div>

        {!config.isDynamic && config.questions.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-dark)" }}>
              Questions
            </h2>
            <div className="flex flex-col gap-4">
              {config.questions.map((q, i) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl border space-y-3"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-bg-warm)" }}
                >
                  <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                    Question {i + 1}
                  </span>
                  <label className="block">
                    <span className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-mid)" }}>
                      Prompt
                    </span>
                    <input
                      type="text"
                      value={q.prompt}
                      onChange={(e) => updateQuestion(i, { prompt: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                      style={{ borderColor: "var(--color-border)" }}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-mid)" }}>
                      Feedback (correct)
                    </span>
                    <input
                      type="text"
                      value={q.feedbackCorrect}
                      onChange={(e) => updateQuestion(i, { feedbackCorrect: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                      style={{ borderColor: "var(--color-border)" }}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-mid)" }}>
                      Feedback (wrong)
                    </span>
                    <input
                      type="text"
                      value={q.feedbackWrong}
                      onChange={(e) => updateQuestion(i, { feedbackWrong: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                      style={{ borderColor: "var(--color-border)" }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Save changes
          </button>
          {hasOverride && (
            <button
              type="button"
              onClick={handleRevert}
              className="px-4 py-2.5 rounded-lg text-sm font-medium border"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
            >
              Revert to default
            </button>
          )}
          <Link
            href="/school/activities"
            className="px-4 py-2.5 rounded-lg text-sm font-medium border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
          >
            Cancel
          </Link>
        </div>
        {saved && (
          <p className="text-sm" style={{ color: "var(--color-primary)" }}>
            Saved. Student play will use this version.
          </p>
        )}
      </form>
    </div>
  );
}
