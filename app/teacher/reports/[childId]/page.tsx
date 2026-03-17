"use client";

import { use } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { ReportEditor } from "@/components/teacher/ReportEditor";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";

export default function ReportDetailPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const { childId } = use(params);
  const store = useStore();
  const { generateReport, saveReportNotes, publishReport } = store;

  const child = store.children.find((c) => c.id === childId);
  const report = store.reports.find((r) => r.childId === childId);

  if (!child) {
    return (
      <div className="px-5 py-8">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      {/* Back */}
      <Link
        href="/teacher/reports"
        className="inline-flex items-center gap-1.5 text-sm mb-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 11L5 7l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Reports
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ChildAvatar name={getChildDisplayName(child)} size="lg" />
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-dark)" }}
          >
            {getChildDisplayName(child)}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Developmental Report · Term 2, 2026
          </p>
        </div>
      </div>

      {/* No report yet */}
      {!report && (
        <div className="text-center py-12">
          <p
            className="text-sm mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            No report generated yet for {getChildDisplayName(child)}.
          </p>
          <button
            onClick={() => generateReport(childId)}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Generate draft
          </button>
        </div>
      )}

      {/* Report editor */}
      {report && (
        <ReportEditor
          report={report}
          childName={getChildDisplayName(child)}
          onSaveNotes={saveReportNotes}
          onPublish={publishReport}
        />
      )}
    </div>
  );
}
