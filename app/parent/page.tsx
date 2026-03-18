"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";

export default function ParentHomePage() {
  const { children, studentParentLinks, demoPersona } = useStore();

  // Show only children linked to the active parent persona
  const linkedChildIds = studentParentLinks
    .filter((l) => l.parentId === demoPersona.parentId)
    .map((l) => l.childId);
  const visibleChildren = children.filter((c) => linkedChildIds.includes(c.id));

  return (
    <div className="px-5 py-8 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">👨‍👩‍👧</div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          Which child would you like to follow?
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Tap a name to see their progress
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {visibleChildren.map((child) => (
          <Link
            key={child.id}
            href={`/parent/${child.id}`}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all active:scale-95"
            style={{
              background: "white",
              borderColor: "var(--color-border)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-primary)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-primary-wash)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLAnchorElement).style.background = "white";
            }}
          >
            <ChildAvatar name={getChildDisplayName(child)} size="lg" />
            <span className="font-semibold text-base" style={{ color: "var(--color-text-dark)" }}>
              {getChildDisplayName(child)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
