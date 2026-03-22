"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getParentUnifiedFeed } from "@/lib/parent-summary";
import { ParentActivityFeedRow } from "@/components/parent/ParentActivityFeedRow";

export default function ParentFeedPage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
        <Link href="/parent" className="mt-4 inline-block text-sm" style={{ color: "var(--color-primary)" }}>
          ← Back
        </Link>
      </div>
    );
  }

  const name = getChildDisplayName(child);
  const feed = getParentUnifiedFeed(
    childId,
    child.firstName,
    store.sessions,
    store.progress,
    store.milestones,
    store.chatMessages,
    store.teachers,
    store.dailyUpdates,
    store.observations,
    store.reports,
    100
  );

  return (
    <div className="px-4 py-5">
      <div className="mb-5">
        <h1
          className="font-medium"
          style={{ fontSize: 22, color: "var(--color-text-dark)" }}
        >
          Feed
        </h1>
        <p
          className="mt-1 leading-relaxed"
          style={{ fontSize: 13, color: "var(--color-text-mid)" }}
        >
          Everything in one place for {name}: learning highlights, milestones,
          teacher notes, daily updates, observations, and published reports.
        </p>
      </div>

      {feed.length === 0 ? (
        <div
          className="rounded-xl border px-4 py-8 text-center"
          style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
        >
          <p className="text-2xl mb-2" aria-hidden>
            📋
          </p>
          <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.6 }}>
            No feed items yet. When teachers share updates or {name} completes
            activities, they will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {feed.map((item) => (
            <ParentActivityFeedRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
