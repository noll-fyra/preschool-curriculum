"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { getActivityConfig } from "@/lib/activity-data";
import { ActivityPlayer } from "@/components/student/ActivityPlayer";
import Link from "next/link";

export default function ActivityPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.childId as string;
  const milestoneId = params.milestoneId as string;

  const store = useStore();
  const { recordSession } = store;

  const child = store.children.find((c) => c.id === childId);
  const config = getActivityConfig(milestoneId);

  if (!child || !config) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Activity not found.</p>
        <Link href="/student" className="mt-4 inline-block text-sm" style={{ color: "var(--color-primary)" }}>
          ← Back
        </Link>
      </div>
    );
  }

  const handleComplete = (score: number) => {
    recordSession(childId, milestoneId, score);
    router.push(`/student/${childId}`);
  };

  return (
    <div>
      {/* Activity header */}
      <div
        className="px-5 py-3 border-b flex items-center gap-3"
        style={{ background: "white", borderColor: "var(--color-border)" }}
      >
        <span className="text-xl">{config.emoji}</span>
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-sm truncate"
            style={{ color: "var(--color-text-dark)" }}
          >
            {config.name}
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            {child.name}
          </p>
        </div>
      </div>

      <ActivityPlayer
        childId={childId}
        childName={child.name}
        config={config}
        onComplete={handleComplete}
      />
    </div>
  );
}
