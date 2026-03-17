"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getTeacherDisplayName } from "@/lib/display-name";

export default function AdminClassesPage() {
  const { classes, teachers } = useStore();

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          Classes
        </h1>
        <Link
          href="/admin/classes/new"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: "var(--color-primary)" }}
        >
          Add class
        </Link>
      </div>

      <div className="rounded-2xl border overflow-hidden bg-white" style={{ borderColor: "var(--color-border)" }}>
        <ul className="divide-y divide-[var(--color-border)]">
          {classes.map((cls) => {
            const assignedTeachers = teachers.filter((t) => t.classIds.includes(cls.id));
            return (
              <li key={cls.id}>
                <Link
                  href={`/admin/classes/${cls.id}/edit`}
                  className="flex items-center justify-between px-4 py-4 hover:bg-bg-cream transition-colors"
                >
                  <div>
                    <p className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                      {cls.name}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                      {cls.termLabel}
                      {assignedTeachers.length > 0 && (
                        <> · {assignedTeachers.map((t) => getTeacherDisplayName(t)).join(", ")}</>
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
