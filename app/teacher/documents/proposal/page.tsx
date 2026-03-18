"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import type { ProposalContext } from "@/lib/ai-prompts";

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
        Event / Activity Proposal
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
        Draft a professional proposal for school admin approval
      </p>

      {/* Form */}
      <div
        className="rounded-2xl border p-5 mb-5 flex flex-col gap-4"
        style={{ borderColor: "var(--color-border)", background: "white" }}
      >
        {/* Event title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Event / Activity title
          </label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="e.g. Garden to Table Learning Journey"
            className="w-full text-sm rounded-lg border px-3 py-2 focus:outline-none"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
          />
        </div>

        {/* Event type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Type
          </label>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setEventType(t)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  background: eventType === t ? "var(--color-primary-wash)" : "white",
                  color: eventType === t ? "var(--color-primary)" : "var(--color-text-mid)",
                  borderColor: eventType === t ? "var(--color-primary)" : "var(--color-border)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Target audience */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Target audience
          </label>
          <div className="flex flex-wrap gap-2">
            {AUDIENCES.map((a) => (
              <button
                key={a}
                onClick={() => setAudience(a)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  background: audience === a ? "var(--color-primary-wash)" : "white",
                  color: audience === a ? "var(--color-primary)" : "var(--color-text-mid)",
                  borderColor: audience === a ? "var(--color-primary)" : "var(--color-border)",
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Learning objectives */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Learning objectives
          </label>
          <textarea
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            placeholder="What will children learn or experience? Which NEL areas does this support?"
            rows={3}
            className="w-full text-sm rounded-lg border px-3 py-2 resize-none focus:outline-none"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
          />
        </div>

        {/* Date (optional) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Proposed date <span className="font-normal normal-case">(optional)</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-sm rounded-lg border px-3 py-2 focus:outline-none"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
          />
        </div>

        {/* Additional notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Additional notes <span className="font-normal normal-case">(optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific requirements, budget constraints, or context for admin…"
            rows={2}
            className="w-full text-sm rounded-lg border px-3 py-2 resize-none focus:outline-none"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating || !isValid}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          style={{ background: "var(--color-primary)" }}
        >
          {generating ? "Generating…" : content ? "Regenerate" : "Generate proposal"}
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
              {eventTitle || "Proposal"}
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
                {[80, 65, 90, 55, 75].map((w, i) => (
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
