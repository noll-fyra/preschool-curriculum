"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { ACTIVITY_CONFIGS } from "@/lib/activity-data";
import { getPlaceByAreaId } from "@/lib/places";

// Child-palette colours — hardcoded, never CSS variables (spec §1)
const C = {
  bg: "#FFF8F0",
  surface: "#FFFFFF",
  textDark: "#251B14",
  textMuted: "#7A6A5A",
  borderWarm: "#E8D5B0",
  yellow: "#F5C518",
  yellowLight: "#FFFBEB",
  green: "#7DC873",
};

export default function ScrapbookPage() {
  const params = useParams();
  const childId = params.childId as string;

  const store = useStore();
  const child = store.children.find((c) => c.id === childId);
  const activityConfigOverrides = store.activityConfigOverrides;

  if (!child) {
    return (
      <div style={{ padding: "32px 20px", textAlign: "center", background: C.bg, minHeight: "100vh" }}>
        <p style={{ color: C.textMuted }}>Child not found.</p>
        <Link href="/student" style={{ display: "inline-block", marginTop: 16, fontSize: 14, color: C.green }}>
          ← Back
        </Link>
      </div>
    );
  }

  // All passed sessions for this child (unique milestone IDs, most recent first)
  const passedSessions = store.sessions
    .filter((s) => s.childId === childId && s.passed)
    .sort((a, b) => b.attemptedAt.localeCompare(a.attemptedAt));

  // Deduplicate by milestoneId — keep only the most recent pass per activity
  const seen = new Set<string>();
  const uniquePasses = passedSessions.filter((s) => {
    if (seen.has(s.milestoneId)) return false;
    seen.add(s.milestoneId);
    return true;
  });

  const firstName = child.firstName;

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 20px 48px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <Link
            href={`/student/${childId}`}
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: C.surface,
              border: `2px solid ${C.borderWarm}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              textDecoration: "none",
            }}
            title="Back to world"
          >
            🏠
          </Link>
          <span style={{ fontSize: 22, fontWeight: 700, color: C.textDark }}>My Scrapbook ✨</span>
        </div>

        {/* Character speech bubble */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24 }}>
          <div
            style={{
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#FFF8EC",
              border: "2px solid #F5A623",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            🦉
          </div>
          <div
            style={{
              background: C.surface,
              border: `2px solid ${C.borderWarm}`,
              borderRadius: "0 16px 16px 16px",
              padding: "10px 14px",
              fontSize: 14,
              lineHeight: 1.4,
              color: C.textDark,
              flex: 1,
            }}
          >
            {uniquePasses.length === 0
              ? `Hi ${firstName}! Start exploring the world to fill your scrapbook! 🌟`
              : uniquePasses.length === 1
              ? `Wow ${firstName}, you've already done your first activity! Keep exploring! 🎉`
              : `Look at everything you've done, ${firstName}! You've completed ${uniquePasses.length} activities! 🌟`}
          </div>
        </div>

        {/* Scrapbook cards */}
        {uniquePasses.length === 0 ? (
          <div
            style={{
              borderRadius: 20,
              padding: "40px 20px",
              textAlign: "center",
              background: C.surface,
              border: `2px solid ${C.borderWarm}`,
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 16 }}>📖</div>
            <p style={{ color: C.textMuted, fontSize: 15 }}>
              Your scrapbook is empty — go explore the world and fill it up!
            </p>
            <Link
              href={`/student/${childId}`}
              style={{
                display: "inline-block",
                marginTop: 20,
                padding: "12px 24px",
                borderRadius: 32,
                background: C.yellow,
                color: C.textDark,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Go explore! 🌍
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {uniquePasses.map((session) => {
              const config = activityConfigOverrides[session.milestoneId]
                ?? ACTIVITY_CONFIGS.find((a) => a.milestoneId === session.milestoneId);
              if (!config) return null;

              // Find the place this activity belongs to via milestone's areaId
              const milestone = store.milestones.find((m) => m.id === session.milestoneId);
              const place = milestone ? getPlaceByAreaId(milestone.areaId) : undefined;

              // Format date nicely for the child (just day + month)
              const date = new Date(session.attemptedAt);
              const dateLabel = date.toLocaleDateString("en-SG", { day: "numeric", month: "short" });

              return (
                <div
                  key={session.milestoneId}
                  style={{
                    borderRadius: 18,
                    background: place ? place.bg : C.yellowLight,
                    border: `2px solid ${place ? place.color : C.yellow}`,
                    padding: "16px 12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 36 }}>{config.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.textDark, lineHeight: 1.3 }}>
                    {config.name}
                  </span>
                  {place && (
                    <span style={{ fontSize: 11, color: place.color, fontWeight: 600 }}>
                      {place.emoji} {place.name}
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: C.textMuted }}>{dateLabel}</span>
                  <span style={{ fontSize: 18 }}>⭐</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
