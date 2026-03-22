"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";

export default function DemoChildHandoffPage() {
  const router = useRouter();
  const activeClassId = useStore((s) => s.activeClassId);
  const classes = useStore((s) => s.classes);
  const allChildren = useStore((s) => s.children);
  const setActiveClass = useStore((s) => s.setActiveClass);
  const setDemoStudent = useStore((s) => s.setDemoStudent);

  const classChildren = useMemo(() => {
    return allChildren
      .filter((c) => c.classId === activeClassId)
      .slice()
      .sort((a, b) =>
        getChildDisplayName(a).localeCompare(getChildDisplayName(b), undefined, {
          sensitivity: "base",
        })
      );
  }, [allChildren, activeClassId]);

  function pickChild(childId: string) {
    setDemoStudent(childId);
    router.push(`/student/${childId}`);
  }

  return (
    <div className="px-5 py-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <p
          className="text-center text-[11px] font-semibold tracking-wide uppercase mb-2"
          style={{ color: "var(--color-text-muted)" }}
          id="demo-class-label"
        >
          Class
        </p>
        <div
          className="flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-labelledby="demo-class-label"
        >
          {classes.map((cls) => {
            const active = cls.id === activeClassId;
            return (
              <button
                key={cls.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveClass(cls.id)}
                className="h-9 px-4 rounded-full text-sm font-medium shrink-0 transition-colors"
                style={{
                  background: active ? "var(--color-primary)" : "white",
                  color: active ? "white" : "var(--color-text-mid)",
                  border: active ? "none" : "1px solid var(--color-border)",
                }}
              >
                {cls.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="text-4xl mb-3" aria-hidden="true">
          📱
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-text-dark)" }}
        >
          Which child is using this tablet?
        </h1>
        <p
          className="text-sm mt-2 max-w-sm mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          Tap a name to open their activities.
        </p>
      </div>

      {classChildren.length === 0 ? (
        <p
          className="text-center text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          No children in this class. Pick another class.
        </p>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          {classChildren.map((child) => {
            const name = getChildDisplayName(child);
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => pickChild(child.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all active:scale-95 text-left w-full min-w-0 cursor-pointer"
                style={{
                  background: "white",
                  borderColor: "var(--color-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.background = "var(--color-primary-wash)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.background = "white";
                }}
              >
                <ChildAvatar name={name} size="md" />
                <span
                  className="font-semibold text-xs sm:text-sm text-center leading-tight line-clamp-2 w-full"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
