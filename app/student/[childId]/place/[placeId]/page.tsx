"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getPlaceById } from "@/lib/places";
import { autoSelectAssignments } from "@/lib/assignments";
import { ACTIVITY_CONFIGS } from "@/lib/activity-data";

// Child-palette colours — hardcoded, never CSS variables (spec §1)
const C = {
  bg: "#FFF8F0",
  surface: "#FFFFFF",
  textDark: "#251B14",
  textMuted: "#7A6A5A",
  green: "#7DC873",
  greenLight: "#F0FAF0",
  borderWarm: "#E8D5B0",
};

function CharacterBubble({ text, color }: { text: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
      <div
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#FFF8EC",
          border: `2px solid ${color}`,
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
        {text}
      </div>
    </div>
  );
}

export default function PlacePage() {
  const params = useParams();
  const childId = params.childId as string;
  const placeId = params.placeId as string;

  const store = useStore();
  const child = store.children.find((c) => c.id === childId);
  const place = getPlaceById(placeId);

  if (!child || !place) {
    return (
      <div style={{ padding: "32px 20px", textAlign: "center", background: C.bg, minHeight: "100vh" }}>
        <p style={{ color: C.textMuted }}>Place not found.</p>
        <Link href={`/student/${childId}`} style={{ display: "inline-block", marginTop: 16, fontSize: 14, color: C.green }}>
          ← Back to world
        </Link>
      </div>
    );
  }

  // Find assigned milestone for this domain
  const allAssigned = autoSelectAssignments(
    childId,
    store.milestones,
    store.progress,
    store.sessions,
    store.observations
  );
  const assignedForDomain = allAssigned.find((m) => m.areaId === place.areaId);

  // Get all milestones for this domain that have an activity config (max 5)
  const activityConfigOverrides = store.activityConfigOverrides;
  const domainMilestones = store.milestones.filter((m) => m.areaId === place.areaId);
  const activitiesForPlace = domainMilestones
    .filter((m) => {
      const config = activityConfigOverrides[m.id] ?? ACTIVITY_CONFIGS.find((a) => a.milestoneId === m.id);
      return !!config;
    })
    .slice(0, 5)
    .map((m) => ({
      milestone: m,
      config: activityConfigOverrides[m.id] ?? ACTIVITY_CONFIGS.find((a) => a.milestoneId === m.id)!,
    }));

  // Which activities has the child passed today?
  const today = new Date().toISOString().slice(0, 10);
  const passedTodayIds = new Set(
    store.sessions
      .filter((s) => s.childId === childId && s.passed && s.attemptedAt.slice(0, 10) === today)
      .map((s) => s.milestoneId)
  );

  const hasActivities = activitiesForPlace.length > 0;

  // Build character message
  let bubbleText: string;
  if (!hasActivities) {
    bubbleText = `${place.greeting} More activities are coming soon — check back later!`;
  } else if (assignedForDomain) {
    const cfg = activityConfigOverrides[assignedForDomain.id] ?? ACTIVITY_CONFIGS.find((a) => a.milestoneId === assignedForDomain.id);
    bubbleText = cfg
      ? `Your teacher picked "${cfg.name}" for you today! You can also explore the other activities here.`
      : place.greeting;
  } else {
    bubbleText = place.greeting;
  }

  return (
    <div style={{ background: place.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 20px 48px" }}>

        {/* Header: place name */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          {/* Home button — illustrated world icon (spec §4.2) */}
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
            <span style={{ fontSize: 32 }}>{place.emoji}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: C.textDark }}>{place.name}</span>
          </div>
        </div>

        {/* Character speech bubble */}
        <CharacterBubble text={bubbleText} color={place.color} />

        {/* Activity shelf */}
        {!hasActivities ? (
          <div
            style={{
              borderRadius: 20,
              padding: "32px 20px",
              textAlign: "center",
              background: C.surface,
              border: `2px solid ${C.borderWarm}`,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌟</div>
            <p style={{ color: C.textMuted, fontSize: 15 }}>
              Amazing things are being built here — come back soon!
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {activitiesForPlace.map(({ milestone, config }) => {
              const isDone = passedTodayIds.has(milestone.id);
              const isAssigned = milestone.id === assignedForDomain?.id;

              let cardBg = C.surface;
              let cardBorder = C.borderWarm;
              if (isDone) {
                cardBg = C.greenLight;
                cardBorder = C.green;
              } else if (isAssigned) {
                cardBg = place.bg;
                cardBorder = place.color;
              }

              return (
                <div
                  key={milestone.id}
                  style={{
                    borderRadius: 20,
                    border: `3px solid ${cardBorder}`,
                    background: cardBg,
                    overflow: "hidden",
                    boxShadow: isAssigned && !isDone ? `0 0 0 2px ${place.color}40` : "none",
                  }}
                >
                  <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 36, lineHeight: 1 }}>{config.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 17, fontWeight: 600, color: C.textDark, display: "block" }}>
                        {config.name}
                      </span>
                      {isAssigned && !isDone && (
                        <span style={{ fontSize: 12, color: place.color, fontWeight: 600, display: "block", marginTop: 3 }}>
                          ✨ Your teacher picked this!
                        </span>
                      )}
                      {isDone && (
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.green, display: "block", marginTop: 3 }}>
                          ✓ Done!
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: "0 16px 16px" }}>
                    <Link
                      href={`/student/${childId}/play/${milestone.id}?from=${placeId}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        width: "100%",
                        padding: "14px",
                        borderRadius: 32,
                        border: "none",
                        background: isDone ? C.borderWarm : place.color,
                        color: isDone ? C.textMuted : "#FFFFFF",
                        fontSize: 17,
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "none",
                        boxSizing: "border-box",
                      }}
                    >
                      {isDone ? "Play again" : "▶  Play"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
