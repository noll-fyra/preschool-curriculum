"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import type { Report } from "@/lib/types";

function formatPublishedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ReportCard({ report }: { report: Report }) {
  const [expanded, setExpanded] = useState(false);

  // Split report content into paragraphs for display
  const paragraphs = report.draftContent
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const preview = paragraphs[0] ?? "";

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "white", borderColor: "var(--color-border)" }}
    >
      {/* Card header */}
      <div
        className="px-4 py-3 flex items-center justify-between gap-3"
        style={{ background: "var(--color-primary-wash)" }}
      >
        <div className="min-w-0">
          <p
            className="font-semibold text-sm leading-tight"
            style={{ color: "var(--color-primary)" }}
          >
            Developmental Report
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-text-mid)" }}>
            Published {formatPublishedDate(report.publishedAt!)}
          </p>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
          style={{ background: "#E8F5EE", color: "#2D7A4F" }}
        >
          Published
        </span>
      </div>

      {/* Report body */}
      <div className="px-4 py-4">
        {expanded ? (
          <div className="flex flex-col gap-3">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="leading-relaxed"
                style={{ fontSize: 13, color: "var(--color-text-dark)" }}
              >
                {para}
              </p>
            ))}
            {report.teacherNotes && (
              <div
                className="mt-2 rounded-xl p-3 border-l-4"
                style={{
                  background: "var(--color-bg-cream)",
                  borderLeftColor: "var(--color-primary)",
                }}
              >
                <p
                  className="font-semibold text-xs uppercase tracking-wide mb-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Teacher&apos;s note
                </p>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: 13, color: "var(--color-text-dark)" }}
                >
                  {report.teacherNotes}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p
            className="leading-relaxed line-clamp-3"
            style={{ fontSize: 13, color: "var(--color-text-mid)" }}
          >
            {preview}
          </p>
        )}

        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          {expanded ? "Show less" : "Read full report →"}
        </button>
      </div>
    </div>
  );
}

export default function ParentReportsPage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();

  const publishedReports = store.reports
    .filter((r) => r.childId === childId && r.status === "published")
    .sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bTime - aTime; // most recent first
    });

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <div className="mb-5">
        <h1
          className="font-medium"
          style={{ fontSize: 22, color: "var(--color-text-dark)" }}
        >
          Reports
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
          End-of-term developmental summaries from the teacher
        </p>
      </div>

      {publishedReports.length === 0 ? (
        <div
          className="rounded-2xl border p-8 text-center"
          style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
            style={{ background: "var(--color-primary-wash)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <path d="M9 7h6M9 11h6M9 15h4" />
            </svg>
          </div>
          <p
            className="font-medium mb-1"
            style={{ fontSize: 14, color: "var(--color-text-dark)" }}
          >
            No reports yet
          </p>
          <p
            className="leading-relaxed"
            style={{ fontSize: 13, color: "var(--color-text-muted)" }}
          >
            Your teacher will publish end-of-term developmental reports here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {publishedReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
