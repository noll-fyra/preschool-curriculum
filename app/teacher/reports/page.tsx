"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getActiveClassChildren } from "@/lib/selectors";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";

export default function ReportsPage() {
  const store = useStore();
  const { generateReport } = store;
  const activeChildren = getActiveClassChildren(store).sort((a, b) => getChildDisplayName(a).localeCompare(getChildDisplayName(b)));

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-text-dark)" }}
        >
          Developmental Reports
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Generate and publish end-of-term developmental summaries
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {activeChildren.map((child) => {
          const report = store.reports.find((r) => r.childId === child.id);
          const isPublished = report?.status === "published";
          const hasDraft = !!report;

          return (
            <div
              key={child.id}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-[var(--color-border)]"
            >
              <ChildAvatar name={getChildDisplayName(child)} size="sm" />

              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold text-sm"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {getChildDisplayName(child)}
                </p>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {isPublished
                    ? `Published ${
                        report.publishedAt
                          ? new Date(report.publishedAt).toLocaleDateString(
                              "en-SG",
                              { day: "numeric", month: "short" }
                            )
                          : ""
                      }`
                    : hasDraft
                    ? "Draft ready — review and publish"
                    : "No report yet"}
                </p>
              </div>

              {/* Status badge */}
              {isPublished && (
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: "#E8F5EE", color: "#2D7A4F" }}
                >
                  Published
                </span>
              )}
              {!isPublished && hasDraft && (
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: "#FEF3D7", color: "#A06010" }}
                >
                  Draft
                </span>
              )}

              {/* Action */}
              {hasDraft ? (
                <Link
                  href={`/teacher/reports/${child.id}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{
                    background: "var(--color-primary-wash)",
                    color: "var(--color-primary)",
                  }}
                >
                  {isPublished ? "View" : "Review"}
                </Link>
              ) : (
                <button
                  onClick={() => generateReport(child.id)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{
                    background: "var(--color-primary)",
                    color: "white",
                  }}
                >
                  Generate
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
