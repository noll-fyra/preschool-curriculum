"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getChildAgeInYears } from "@/lib/child";
import type { YearLevelId } from "@/lib/types";

const YEAR_LEVELS: { id: YearLevelId | ""; label: string }[] = [
  { id: "", label: "All grades" },
  { id: "N1", label: "N1" },
  { id: "N2", label: "N2" },
  { id: "K1", label: "K1" },
  { id: "K2", label: "K2" },
];

const AGE_OPTIONS: { value: "" | "3" | "4" | "5" | "6+"; label: string }[] = [
  { value: "", label: "All ages" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6+", label: "6+" },
];

function matchesAge(ageYears: number | undefined, ageFilter: string): boolean {
  if (!ageFilter) return true;
  if (ageYears === undefined) return false;
  if (ageFilter === "6+") return ageYears >= 6;
  return ageYears === parseInt(ageFilter, 10);
}

export default function AdminStudentsPage() {
  const { children, classes } = useStore();
  const [classFilter, setClassFilter] = useState<string>("");
  const [gradeFilter, setGradeFilter] = useState<YearLevelId | "">("");
  const [ageFilter, setAgeFilter] = useState<"" | "3" | "4" | "5" | "6+">("");

  const filtered = children.filter((c) => {
    if (classFilter && c.classId !== classFilter) return false;
    if (gradeFilter && c.yearLevel !== gradeFilter) return false;
    const ageYears = getChildAgeInYears(c);
    if (!matchesAge(ageYears, ageFilter)) return false;
    return true;
  });

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          Students
        </h1>
        <Link
          href="/admin/students/new"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: "var(--color-primary)" }}
        >
          Add student
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Age</span>
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value as typeof ageFilter)}
            className="px-2.5 py-1.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            {AGE_OPTIONS.map((o) => (
              <option key={o.value || "all"} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Grade</span>
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value as YearLevelId | "")}
            className="px-2.5 py-1.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            {YEAR_LEVELS.map((o) => (
              <option key={o.id || "all"} value={o.id}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Class</span>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            <option value="">All classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden bg-white" style={{ borderColor: "var(--color-border)" }}>
        <ul className="divide-y divide-[var(--color-border)]">
          {filtered
            .sort((a, b) => getChildDisplayName(a).localeCompare(getChildDisplayName(b)))
            .map((child) => {
              const cls = child.classId ? classes.find((c) => c.id === child.classId) : null;
              return (
                <li key={child.id}>
                  <Link
                    href={`/admin/students/${child.id}/edit`}
                    className="flex items-center justify-between px-4 py-4 hover:bg-bg-cream transition-colors"
                  >
                    <div>
                      <p className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                        {getChildDisplayName(child)}
                      </p>
                      <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                        {cls?.name ?? "Unassigned"} · {child.yearLevel ?? "—"}
                      </p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-40">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
