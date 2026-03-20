"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getTeacherDisplayName } from "@/lib/display-name";

export default function AdminTeachersPage() {
  const { teachers, classes } = useStore();
  const [filter, setFilter] = useState<"all" | "assigned" | "unassigned">("all");

  const filtered = teachers.filter((t) => {
    if (filter === "assigned")   return t.classIds.length > 0;
    if (filter === "unassigned") return t.classIds.length === 0;
    return true;
  });

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          Teachers
        </h1>
        <Link
          href="/school/teachers/new"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: "var(--color-primary)" }}
        >
          Add teacher
        </Link>
      </div>

      <div className="flex gap-2 mb-4">
        {(["all", "assigned", "unassigned"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all capitalize"
            style={{
              background: filter === f ? "var(--color-primary)" : "white",
              color: filter === f ? "white" : "var(--color-text-mid)",
              borderColor: filter === f ? "var(--color-primary)" : "var(--color-border)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border overflow-hidden bg-white" style={{ borderColor: "var(--color-border)" }}>
        <ul className="divide-y divide-[var(--color-border)]">
          {filtered.map((teacher) => {
            const assignedClasses = classes.filter((c) => teacher.classIds.includes(c.id));
            return (
              <li key={teacher.id}>
                <Link
                  href={`/school/teachers/${teacher.id}/edit`}
                  className="flex items-center justify-between px-4 py-4 hover:bg-bg-cream transition-colors"
                >
                  <div>
                    <p className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                      {getTeacherDisplayName(teacher)}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                      {teacher.email ?? "—"}
                      {assignedClasses.length > 0 && (
                        <> · {assignedClasses.map((c) => c.name).join(", ")}</>
                      )}
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
