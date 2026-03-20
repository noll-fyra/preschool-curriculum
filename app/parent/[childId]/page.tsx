"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName, getPronounFromGender } from "@/lib/display-name";
import { getFeedItems, type FeedItem } from "@/lib/parent-summary";
import type { MoodType } from "@/lib/types";

// ─── Mood ─────────────────────────────────────────────────────────────────────

const MOOD_EMOJI: Record<MoodType, string> = {
  happy:   "😊",
  settled: "😌",
  tired:   "😴",
  upset:   "😟",
  excited: "🤩",
};

const MOOD_LABEL: Record<MoodType, string> = {
  happy:   "Happy day",
  settled: "Settled day",
  tired:   "Tired today",
  upset:   "Needed support",
  excited: "Exciting day",
};

// ─── Greeting ─────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// ─── Date formatting ──────────────────────────────────────────────────────────

function formatCardDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const then = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.floor((today.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";

  return d.toLocaleDateString("en-SG", { weekday: "long", day: "numeric", month: "short" });
}

// ─── Card components ──────────────────────────────────────────────────────────

function DailyUpdateCard({ item }: { item: FeedItem }) {
  const mood = item.mood!;
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--color-bg-cream)",
        border: "1px solid var(--color-border)",
        borderLeft: "4px solid var(--color-primary)",
      }}
    >
      {/* Header: mood + date */}
      <div className="flex items-center gap-2 mb-3">
        <span style={{ fontSize: 20 }}>{MOOD_EMOJI[mood]}</span>
        <div>
          <p className="font-medium" style={{ fontSize: 13, color: "var(--color-text-dark)" }}>
            {MOOD_LABEL[mood]}
          </p>
          <p style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
            {formatCardDate(item.timestamp)}
          </p>
        </div>
      </div>

      {/* Text */}
      <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.65 }}>
        {item.text}
      </p>

      {/* Photos */}
      {item.photos && item.photos.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {item.photos.map((url, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ maxWidth: 200 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="w-full object-cover"
                style={{ maxHeight: 140 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MilestoneCard({ item }: { item: FeedItem }) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ background: "#FEF9EC", borderColor: "#F5C842" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span style={{ fontSize: 18 }}>⭐</span>
        <p
          className="font-semibold uppercase tracking-wide"
          style={{ fontSize: 11, letterSpacing: "0.06em", color: "#8A6800" }}
        >
          Milestone reached
        </p>
      </div>

      {/* Headline */}
      <p
        className="font-medium mb-3 leading-snug"
        style={{ fontSize: 15, color: "#4A3200" }}
      >
        {item.headline}
      </p>

      {/* What this means */}
      {item.whatThisMeans && (
        <div
          className="rounded-xl px-3 py-2"
          style={{ background: "rgba(245, 200, 66, 0.18)" }}
        >
          <p
            className="font-medium mb-0.5"
            style={{ fontSize: 11, color: "#8A6800", letterSpacing: "0.04em" }}
          >
            What this means
          </p>
          <p style={{ fontSize: 13, color: "#5C4600", lineHeight: 1.55 }}>
            {item.whatThisMeans}
          </p>
        </div>
      )}

      <p className="mt-3" style={{ fontSize: 11, color: "#8A6800" }}>
        {formatCardDate(item.timestamp)}
      </p>
    </div>
  );
}

function TeacherUpdateCard({ item }: { item: FeedItem }) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ background: "white", borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
          style={{ background: "#E8F5EE" }}
        >
          📝
        </div>
        <div>
          <p className="font-medium" style={{ fontSize: 13, color: "var(--color-text-dark)" }}>
            {item.teacherName}
          </p>
          <p style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
            {formatCardDate(item.timestamp)}
          </p>
        </div>
      </div>

      <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.6 }}>
        {item.updateText}
      </p>

      {item.media && item.media.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {item.media.map((m, i) =>
            m.type === "photo" ? (
              <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--color-border)", maxWidth: 180 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.url}
                  alt=""
                  className="w-full h-24 object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            ) : (
              <div
                key={i}
                className="rounded-xl border flex items-center gap-1 px-3 py-2"
                style={{ borderColor: "var(--color-border)", background: "var(--color-bg-cream)" }}
              >
                <span className="text-sm">🎬</span>
                <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>Video</span>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

function HomeLearningCard({ childId }: { childId: string }) {
  return (
    <Link
      href={`/parent/${childId}/activities`}
      className="block rounded-2xl border p-4 transition-colors active:opacity-80"
      style={{ background: "#F0F7FF", borderColor: "#BDD8F5" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ fontSize: 18 }}>🏠</span>
        <p
          className="font-semibold uppercase tracking-wide"
          style={{ fontSize: 11, letterSpacing: "0.06em", color: "#1A5FA8" }}
        >
          Activity for today
        </p>
      </div>

      <p className="font-medium mb-1" style={{ fontSize: 14, color: "#0D3B6E" }}>
        Tell me a story about your day
      </p>
      <p style={{ fontSize: 13, color: "#2D6CB5", lineHeight: 1.55 }}>
        Supports language &amp; early literacy · About 10 minutes · No materials needed
      </p>

      <div className="mt-4 flex justify-end">
        <span
          className="rounded-full px-4 py-1.5 font-medium"
          style={{ background: "#1A5FA8", color: "white", fontSize: 13 }}
        >
          See full activity
        </span>
      </div>
    </Link>
  );
}

function FeedCard({ item, childId }: { item: FeedItem; childId: string }) {
  void childId;
  if (item.type === "daily_update") return <DailyUpdateCard item={item} />;
  if (item.type === "milestone_achieved") return <MilestoneCard item={item} />;
  if (item.type === "teacher_update") return <TeacherUpdateCard item={item} />;
  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ParentHomePage() {
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

  const childName = getChildDisplayName(child);
  void getPronounFromGender(child.gender);

  const feedItems = getFeedItems(
    childId,
    store.sessions,
    store.progress,
    store.milestones,
    store.chatMessages,
    store.teachers,
    store.dailyUpdates
  );

  // Insert home learning card after the first daily update (or at top if none)
  type EnrichedItem = FeedItem | { type: "__home_learning__" };
  const enrichedFeed: EnrichedItem[] = [];
  let homeLearningInserted = false;
  for (const item of feedItems) {
    enrichedFeed.push(item);
    if (!homeLearningInserted && item.type === "daily_update") {
      enrichedFeed.push({ type: "__home_learning__" });
      homeLearningInserted = true;
    }
  }
  if (!homeLearningInserted) {
    enrichedFeed.unshift({ type: "__home_learning__" });
  }

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">

      {/* Greeting */}
      <div className="mb-4">
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {getGreeting()}
        </p>
        <h1
          className="font-medium leading-tight mt-0.5"
          style={{ fontSize: 22, color: "var(--color-text-dark)" }}
        >
          {childName}&apos;s updates
        </h1>
      </div>

      {/* Progress shortcut row */}
      <Link
        href={`/parent/${childId}/area`}
        className="flex items-center justify-between rounded-2xl border px-4 py-3 mb-5 transition-colors active:opacity-80"
        style={{ background: "white", borderColor: "var(--color-border)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-bg-cream)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "white"; }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "var(--color-primary-wash)" }}
          >
            <span style={{ fontSize: 16 }}>📈</span>
          </div>
          <div>
            <p className="font-medium" style={{ fontSize: 13, color: "var(--color-text-dark)" }}>
              {childName}&apos;s progress
            </p>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
              Development across all 6 learning areas
            </p>
          </div>
        </div>
        <span style={{ fontSize: 16, color: "var(--color-primary)" }}>→</span>
      </Link>

      {/* Feed */}
      {feedItems.length === 0 && !homeLearningInserted ? (
        <div
          className="rounded-2xl border p-6 text-center"
          style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
        >
          <p style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.6 }}>
            Updates from {childName}&apos;s teacher will appear here each school day.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {enrichedFeed.map((item, i) => {
            if (item.type === "__home_learning__") {
              return <HomeLearningCard key="home-learning" childId={childId} />;
            }
            return <FeedCard key={(item as FeedItem).id ?? i} item={item as FeedItem} childId={childId} />;
          })}
        </div>
      )}

      {/* P1 readiness footer link */}
      <Link
        href={`/parent/${childId}/p1`}
        className="flex items-center justify-between mt-5 rounded-xl border px-4 py-3 transition-colors active:opacity-80"
        style={{ background: "white", borderColor: "var(--color-border)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-bg-cream)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "white"; }}
      >
        <p style={{ fontSize: 13, color: "var(--color-text-mid)" }}>
          Primary 1 readiness
        </p>
        <span style={{ fontSize: 13, color: "var(--color-primary)" }}>See milestones →</span>
      </Link>

    </div>
  );
}
