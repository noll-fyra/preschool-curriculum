"use client";

import { useState } from "react";
import { SegmentControl } from "@/components/shared/SegmentControl";

type Tab = "coverage" | "progress" | "quality" | "reports";

// ── Demo data ──────────────────────────────────────────────────────────────

const DOMAINS = [
  "Language & Literacy",
  "Numeracy",
  "Social & Emotional",
  "Motor Skills",
  "Discovery of World",
  "Creative Arts",
];
const DOMAIN_SHORT = ["LL", "NUM", "SED", "MOT", "DOW", "CA"];

const COVERAGE_DATA = [
  // [LL, NUM, SED, MOT, DOW, CA] — 0–100 coverage strength
  { class: "Kingfisher N1", values: [85, 70, 90, 60, 45, 20] },
  { class: "Sparrow K2", values: [75, 80, 85, 55, 60, 35] },
];

const PROGRESS_DATA = [
  { domain: "Language & Literacy", onTrack: 78, developing: 16, support: 6 },
  { domain: "Numeracy", onTrack: 74, developing: 20, support: 6 },
  { domain: "Social & Emotional", onTrack: 82, developing: 14, support: 4 },
  { domain: "Motor Skills", onTrack: 71, developing: 23, support: 6 },
  { domain: "Discovery of World", onTrack: 68, developing: 26, support: 6 },
  { domain: "Creative Arts", onTrack: 65, developing: 28, support: 7 },
];

const QUALITY_DATA = [
  {
    teacher: "Siti Binte Rahmat",
    class: "Kingfisher N1",
    obsPerChild: 2.4,
    domainSpread: "5 / 6",
    milestoneLinked: 84,
    reportQuality: "Rich",
  },
  {
    teacher: "Lim Wei Ling",
    class: "Sparrow K2",
    obsPerChild: 1.8,
    domainSpread: "4 / 6",
    milestoneLinked: 71,
    reportQuality: "Standard",
  },
];

const REPORTS_DATA = [
  {
    class: "Kingfisher N1",
    total: 20,
    draft: 12,
    review: 5,
    approved: 2,
    sentRead: 1,
  },
  {
    class: "Sparrow K2",
    total: 5,
    draft: 0,
    review: 2,
    approved: 2,
    sentRead: 1,
  },
];

// ── Heatmap cell ───────────────────────────────────────────────────────────

function HeatCell({ value, label }: { value: number; label: string }) {
  const alpha = value / 100;
  const bg = `rgba(74, 155, 111, ${0.1 + alpha * 0.85})`;
  const textColor = alpha > 0.5 ? "white" : "var(--color-text-dark)";
  return (
    <td className="px-3 py-3 text-center">
      <div
        className="rounded-lg px-2 py-2 text-xs font-semibold tabular-nums cursor-pointer transition-opacity hover:opacity-80"
        style={{ background: bg, color: textColor }}
        title={`${label}: ${value}%`}
      >
        {value}%
      </div>
    </td>
  );
}

// ── Sub-views ──────────────────────────────────────────────────────────────

function CoverageView() {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-x-auto">
        <div className="px-5 py-3 border-b border-[var(--color-border)]">
          <h3
            className="font-semibold text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            Domain coverage — this term
          </h3>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--color-text-mid)" }}
          >
            Darker = stronger coverage. Tap a cell to flag a gap.
          </p>
        </div>
        <table className="w-full">
          <thead>
            <tr
              className="border-b border-[var(--color-border)]"
              style={{ background: "var(--color-bg-cream)" }}
            >
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Class
              </th>
              {DOMAIN_SHORT.map((d, i) => (
                <th
                  key={d}
                  className="text-center px-3 py-2.5 font-medium text-xs"
                  style={{ color: "var(--color-text-mid)" }}
                  title={DOMAINS[i]}
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COVERAGE_DATA.map((row) => (
              <tr
                key={row.class}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                <td
                  className="px-5 py-3 font-medium text-sm"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {row.class}
                </td>
                {row.values.map((v, i) => (
                  <HeatCell key={i} value={v} label={DOMAINS[i]} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Low-coverage callout */}
      <div className="bg-white rounded-xl border border-[#fca5a5] p-5">
        <div className="flex items-start gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] mt-0.5 flex-shrink-0" />
          <div>
            <div
              className="font-semibold text-sm mb-1"
              style={{ color: "var(--color-text-dark)" }}
            >
              Creative Arts — consistently underserved (2 weeks)
            </div>
            <p
              className="text-xs mb-3"
              style={{ color: "var(--color-text-mid)" }}
            >
              Neither class has had Creative Arts activities scheduled for 2+
              weeks. This is below the programme's minimum coverage target.
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                className="text-xs font-medium px-3 py-1.5 rounded-lg"
                style={{
                  background: "var(--color-primary-wash)",
                  color: "var(--color-primary)",
                }}
              >
                Suggest activities to teachers
              </button>
              <button
                className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-mid)",
                }}
              >
                Send nudge to both teachers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Domain key */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {DOMAINS.map((d, i) => (
          <div
            key={d}
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--color-text-mid)" }}
          >
            <span
              className="font-bold"
              style={{ color: "var(--color-text-dark)" }}
            >
              {DOMAIN_SHORT[i]}
            </span>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressView() {
  return (
    <div className="space-y-4">
      {/* School-wide summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "On track", value: "74%", color: "var(--color-primary)" },
          { label: "Developing", value: "21%", color: "#f59e0b" },
          { label: "Needs support", value: "5%", color: "#ef4444" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-[var(--color-border)] p-4 text-center"
          >
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: "var(--color-text-mid)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Per domain */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--color-border)]">
          <h3
            className="font-semibold text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            Progress by domain — school-wide cohort
          </h3>
        </div>
        {PROGRESS_DATA.map((row) => (
          <div
            key={row.domain}
            className="px-5 py-4 border-b border-[var(--color-border)] last:border-0"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-text-dark)" }}
              >
                {row.domain}
              </span>
              <span
                className="text-xs tabular-nums"
                style={{ color: "var(--color-text-mid)" }}
              >
                {row.onTrack}% on track
              </span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden gap-px">
              <div
                style={{
                  width: `${row.onTrack}%`,
                  background: "var(--color-primary)",
                }}
              />
              <div
                style={{ width: `${row.developing}%`, background: "#fbbf24" }}
              />
              <div
                style={{ width: `${row.support}%`, background: "#ef4444" }}
              />
            </div>
            <div
              className="flex gap-4 mt-1.5 text-xs"
              style={{ color: "var(--color-text-mid)" }}
            >
              <span>
                <span
                  className="font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  {row.onTrack}%
                </span>{" "}
                on track
              </span>
              <span>
                <span className="font-medium" style={{ color: "#f59e0b" }}>
                  {row.developing}%
                </span>{" "}
                developing
              </span>
              <span>
                <span className="font-medium" style={{ color: "#ef4444" }}>
                  {row.support}%
                </span>{" "}
                support
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl border border-[var(--color-border)] p-4"
        style={{ background: "var(--color-bg-cream)" }}
      >
        <p className="text-xs" style={{ color: "var(--color-text-mid)" }}>
          Cohort data only — no individual child data at this level. Drill down
          to class level to see individual names and status.
        </p>
      </div>
    </div>
  );
}

function QualityView() {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-x-auto">
        <div className="px-5 py-3 border-b border-[var(--color-border)]">
          <h3
            className="font-semibold text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            Observation quality by teacher
          </h3>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--color-text-mid)" }}
          >
            Used for support and development — not performance management.
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-[var(--color-border)]"
              style={{ background: "var(--color-bg-cream)" }}
            >
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Teacher
              </th>
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Obs / child / wk
              </th>
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Domain spread
              </th>
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Milestone-linked
              </th>
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Report quality
              </th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {QUALITY_DATA.map((row) => (
              <tr
                key={row.teacher}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                <td className="px-5 py-3">
                  <div
                    className="font-medium"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {row.teacher}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--color-text-mid)" }}
                  >
                    {row.class}
                  </div>
                </td>
                <td
                  className="px-4 py-3 text-center tabular-nums"
                  style={{
                    color:
                      row.obsPerChild < 2
                        ? "#f59e0b"
                        : "var(--color-text-dark)",
                  }}
                >
                  {row.obsPerChild}
                </td>
                <td
                  className="px-4 py-3 text-center"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {row.domainSpread}
                </td>
                <td
                  className="px-4 py-3 text-center tabular-nums"
                  style={{
                    color:
                      row.milestoneLinked < 75
                        ? "#f59e0b"
                        : "var(--color-primary)",
                  }}
                >
                  {row.milestoneLinked}%
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background:
                        row.reportQuality === "Rich"
                          ? "var(--color-primary-wash)"
                          : "var(--color-bg-cream)",
                      color:
                        row.reportQuality === "Rich"
                          ? "var(--color-primary)"
                          : "var(--color-text-mid)",
                    }}
                  >
                    {row.reportQuality}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="text-xs font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Schedule coaching
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="rounded-xl border border-[var(--color-border)] p-4"
        style={{ background: "var(--color-bg-cream)" }}
      >
        <p className="text-xs" style={{ color: "var(--color-text-mid)" }}>
          A teacher with fewer observations may be managing workload, be newer
          to digital documentation, or need help with the quick-log flow. The
          data prompts a conversation — it does not trigger a disciplinary
          process.
        </p>
      </div>
    </div>
  );
}

function ReportsView() {
  const daysRemaining = 11;
  const totalChildren = REPORTS_DATA.reduce((s, r) => s + r.total, 0);
  const totalApproved = REPORTS_DATA.reduce(
    (s, r) => s + r.approved + r.sentRead,
    0,
  );
  const completionPct = Math.round((totalApproved / totalChildren) * 100);

  return (
    <div className="space-y-5">
      {/* Timeline */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div
              className="font-semibold text-sm"
              style={{ color: "var(--color-text-dark)" }}
            >
              Term 2 Reports
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: "var(--color-text-mid)" }}
            >
              Due 31 March 2026 · {daysRemaining} days remaining
            </div>
          </div>
          <span
            className="text-lg font-bold tabular-nums"
            style={{ color: "var(--color-text-dark)" }}
          >
            {completionPct}%
          </span>
        </div>
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ background: "var(--color-bg-cream)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${completionPct}%`,
              background: "var(--color-primary)",
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--color-text-mid)" }}>
          {totalApproved} of {totalChildren} reports approved or sent
        </p>
      </div>

      {/* Per class */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-[var(--color-border)]"
              style={{ background: "var(--color-bg-cream)" }}
            >
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Class
              </th>
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Draft
              </th>
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                In review
              </th>
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Approved
              </th>
              <th
                className="text-center px-4 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Sent & read
              </th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {REPORTS_DATA.map((row) => (
              <tr
                key={row.class}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                <td
                  className="px-5 py-3 font-medium"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {row.class}
                </td>
                <td
                  className="px-4 py-3 text-center tabular-nums"
                  style={{
                    color: row.draft > 0 ? "#f59e0b" : "var(--color-text-mid)",
                  }}
                >
                  {row.draft}
                </td>
                <td
                  className="px-4 py-3 text-center tabular-nums"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {row.review}
                </td>
                <td
                  className="px-4 py-3 text-center tabular-nums"
                  style={{ color: "var(--color-primary)" }}
                >
                  {row.approved}
                </td>
                <td
                  className="px-4 py-3 text-center tabular-nums"
                  style={{ color: "var(--color-primary)" }}
                >
                  {row.sentRead}
                </td>
                <td className="px-4 py-3 text-right">
                  {row.draft > 0 && (
                    <button
                      className="text-xs font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Send reminder
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <button
          className="text-sm font-medium px-4 py-2 rounded-lg border"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-mid)",
          }}
        >
          Extend deadline for a class
        </button>
        <button
          className="text-sm font-medium px-4 py-2 rounded-lg"
          style={{
            background: "var(--color-primary-wash)",
            color: "var(--color-primary)",
          }}
        >
          Remind all teachers behind
        </button>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "coverage", label: "Coverage" },
  { id: "progress", label: "Progress" },
  { id: "quality", label: "Obs Quality" },
  { id: "reports", label: "Reports" },
];

export default function OutcomesPage() {
  const [tab, setTab] = useState<Tab>("coverage");

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Learning Outcomes</h1>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Programme-level view of whether the school&apos;s curriculum is working.
        </p>
      </div>

      <SegmentControl value={tab} onChange={setTab} options={TABS} />

      {tab === "coverage" && <CoverageView />}
      {tab === "progress" && <ProgressView />}
      {tab === "quality" && <QualityView />}
      {tab === "reports" && <ReportsView />}
    </div>
  );
}
