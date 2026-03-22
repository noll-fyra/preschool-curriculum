"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { PARENT_GROUP_ACTIVITIES } from "@/lib/parent-group-activities";
import { LEARNING_AREAS } from "@/lib/types";

const AREA_CHIP: Record<string, { bg: string; text: string }> = {
  LL: { bg: "#E8EFF8", text: "#3A5EA0" },
  NUM: { bg: "#E8F5EE", text: "#2D7A4F" },
  SED: { bg: "#F5E8F0", text: "#6B3A5C" },
  ACE: { bg: "#F0EDFF", text: "#4A3FA8" },
  DOW: { bg: "#E8F7F5", text: "#1F6B5C" },
  HMS: { bg: "#FFF4E5", text: "#8B5A16" },
};

export default function ParentGroupActivitiesPage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-5">
      <Link
        href={`/parent/${childId}/activities`}
        className="inline-flex items-center gap-1 text-sm mb-4"
        style={{ color: "var(--color-text-muted)" }}
      >
        ← Activities
      </Link>

      <h1
        className="font-medium mb-1"
        style={{ fontSize: 22, color: "var(--color-text-dark)" }}
      >
        Group activities
      </h1>
      <p
        className="mb-5 leading-relaxed"
        style={{ fontSize: 13, color: "var(--color-text-mid)" }}
      >
        Do these with {getChildDisplayName(child)}. Each idea links to a
        learning milestone so teachers can see home practice in Observations
        when you tap &quot;We did this!&quot;
      </p>

      <div className="flex flex-col gap-3">
        {PARENT_GROUP_ACTIVITIES.map((act) => {
          const milestone = store.milestones.find(
            (m) => m.id === act.milestoneId
          );
          const area = LEARNING_AREAS.find(
            (a) => a.id === milestone?.areaId
          );
          const chip =
            AREA_CHIP[milestone?.areaId ?? ""] ?? {
              bg: "var(--color-bg-deep)",
              text: "var(--color-text-muted)",
            };

          return (
            <Link
              key={act.id}
              href={`/parent/${childId}/activities/group/${act.id}`}
              className="block rounded-2xl border p-4 transition-colors active:opacity-80"
              style={{
                background: "white",
                borderColor: "var(--color-border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--color-bg-cream)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "white";
              }}
            >
              <p
                className="font-medium mb-2"
                style={{ fontSize: 15, color: "var(--color-text-dark)" }}
              >
                {act.title}
              </p>
              {milestone && (
                <div className="flex flex-col gap-1.5">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium self-start"
                    style={{ background: chip.bg, color: chip.text }}
                  >
                    {area?.name ?? milestone.areaId}
                  </span>
                  <p
                    className="leading-snug"
                    style={{ fontSize: 13, color: "var(--color-text-mid)" }}
                  >
                    <span className="font-medium text-[var(--color-text-dark)]">
                      Milestone:{" "}
                    </span>
                    {milestone.statement}
                  </p>
                </div>
              )}
              {!milestone && (
                <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                  Milestone data unavailable
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
