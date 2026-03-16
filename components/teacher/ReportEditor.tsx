"use client";

import { useState } from "react";
import type { Report } from "@/lib/types";

interface ReportEditorProps {
  report: Report;
  childName: string;
  onSaveNotes: (reportId: string, notes: string) => void;
  onPublish: (reportId: string) => void;
}

export function ReportEditor({
  report,
  childName,
  onSaveNotes,
  onPublish,
}: ReportEditorProps) {
  const [notes, setNotes] = useState(report.teacherNotes);
  const [saved, setSaved] = useState(false);
  const [published, setPublished] = useState(report.status === "published");

  function handleSave() {
    onSaveNotes(report.id, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handlePublish() {
    onPublish(report.id);
    setPublished(true);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Published banner */}
      {published && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
          style={{ background: "#E8F5EE", color: "#2D7A4F" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#2D7A4F" />
            <path
              d="M5 8l2 2 4-4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Report published to {childName}&apos;s parent
          {report.publishedAt && (
            <span className="ml-auto opacity-70">
              {new Date(report.publishedAt).toLocaleDateString("en-SG", {
                day: "numeric",
                month: "short",
              })}
            </span>
          )}
        </div>
      )}

      {/* Auto-generated draft */}
      <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
        <div
          className="px-5 py-3 border-b border-[var(--color-border)] flex items-center justify-between"
          style={{ background: "var(--color-bg-cream)" }}
        >
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-dark)" }}
          >
            Auto-generated draft
          </h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "#FEF3D7", color: "#A06010" }}
          >
            Review before publishing
          </span>
        </div>
        <div className="px-5 py-4">
          {report.draftContent.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed mb-3 last:mb-0"
              style={{ color: "var(--color-text-dark)" }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Teacher notes */}
      <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
        <div
          className="px-5 py-3 border-b border-[var(--color-border)]"
          style={{ background: "var(--color-bg-cream)" }}
        >
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-dark)" }}
          >
            Teacher notes{" "}
            <span
              className="font-normal"
              style={{ color: "var(--color-text-muted)" }}
            >
              (optional)
            </span>
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            Add qualitative observations, anecdotes, or areas to highlight
          </p>
        </div>
        <div className="px-5 py-4">
          <textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setSaved(false);
            }}
            placeholder="e.g. Rayan showed particular confidence during story time this term…"
            rows={4}
            disabled={published}
            className="w-full text-sm rounded-xl border border-[var(--color-border)] px-3 py-2.5 resize-none outline-none focus:border-[var(--color-primary)] transition-colors"
            style={{
              color: "var(--color-text-dark)",
              background: published ? "var(--color-bg-cream)" : "white",
            }}
          />
        </div>
      </div>

      {/* Action buttons */}
      {!published && (
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all"
            style={{
              borderColor: saved
                ? "var(--color-primary)"
                : "var(--color-border)",
              color: saved ? "var(--color-primary)" : "var(--color-text-mid)",
              background: "white",
            }}
          >
            {saved ? "Saved ✓" : "Save notes"}
          </button>

          <button
            onClick={handlePublish}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "var(--color-primary)" }}
          >
            Publish to parent
          </button>
        </div>
      )}
    </div>
  );
}
