"use client";

import Link from "next/link";
import type { HomeFeedItem } from "@/lib/parent-summary";
import { formatParentFeedTimestamp } from "@/lib/parent-summary";

const FEED_ICON_BG = {
  activity: "#7BA3D4",
  milestone: "#639922",
  note: "#F5A623",
  observation: "#F5A623",
} as const;

function FeedIcon({ variant }: { variant: HomeFeedItem["icon"] }) {
  const bg = FEED_ICON_BG[variant];
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: bg }}
      aria-hidden
    >
      {variant === "activity" && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )}
      {variant === "milestone" && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" />
        </svg>
      )}
      {(variant === "note" || variant === "observation") && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      )}
    </div>
  );
}

export function ParentActivityFeedRow({ item }: { item: HomeFeedItem }) {
  const meta = formatParentFeedTimestamp(item.timestamp, item.location);
  return (
    <Link
      href={item.href}
      className="flex gap-3 rounded-xl border px-3 py-3 transition-colors active:opacity-80"
      style={{
        background: "white",
        borderColor: "var(--color-border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-bg-cream)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "white";
      }}
    >
      <FeedIcon variant={item.icon} />
      <div className="flex-1 min-w-0">
        <p className="font-medium leading-snug" style={{ fontSize: 14, color: "var(--color-text-dark)" }}>
          {item.title}
        </p>
        <p className="mt-0.5 leading-relaxed" style={{ fontSize: 13, color: "var(--color-text-mid)", lineHeight: 1.45 }}>
          {item.subtitle}
        </p>
        <p className="mt-1.5" style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
          {meta}
        </p>
      </div>
    </Link>
  );
}
