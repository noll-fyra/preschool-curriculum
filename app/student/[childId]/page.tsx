"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { autoSelectAssignments } from "@/lib/assignments";
import { PLACES } from "@/lib/places";

// Child-palette colours — hardcoded, never CSS variables (spec §1)
const C = {
  bg: "#FFF8F0",
  surface: "#FFFFFF",
  borderWarm: "#E8D5B0",
  textDark: "#251B14",
  textMuted: "#7A6A5A",
  avatarBg: "#F5C518",
  avatarText: "#251B14",
  bubbleBg: "#FFFFFF",
  bubbleBorder: "#E8D5B0",
};

function CharacterBubble({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24 }}>
      {/* Character — owl mascot */}
      <div
        style={{
          flexShrink: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#FFF8EC",
          border: "2px solid #F5A623",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        🦉
      </div>
      <div
        style={{
          background: C.bubbleBg,
          border: `2px solid ${C.bubbleBorder}`,
          borderRadius: "0 16px 16px 16px",
          padding: "10px 14px",
          fontSize: 15,
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

export default function StudentWorldHomePage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);

  if (!child) {
    return (
      <div style={{ padding: "32px 20px", textAlign: "center", background: C.bg, minHeight: "100vh" }}>
        <p style={{ color: C.textMuted }}>Child not found.</p>
        <Link href="/student" style={{ display: "inline-block", marginTop: 16, fontSize: 14, color: "#7DC873" }}>
          ← Back
        </Link>
      </div>
    );
  }

  const allAssigned = autoSelectAssignments(
    childId,
    store.milestones,
    store.progress,
    store.sessions,
    store.observations
  );

  // Which area IDs have assigned activities today?
  const assignedAreaIds = new Set(allAssigned.map((m) => m.areaId));

  // Find a place with an assigned activity to highlight in the character message
  const highlightedPlace = PLACES.find((p) => assignedAreaIds.has(p.areaId));

  // Build character greeting message
  const firstName = child.firstName;
  let bubbleText: string;
  if (highlightedPlace) {
    bubbleText = `Hi ${firstName}! Your teacher left something special in ${highlightedPlace.name} today! 🌟`;
  } else {
    bubbleText = `Hi ${firstName}! Which place do you want to visit today? 🌟`;
  }

  // Derive initials for the child avatar
  const initials = `${child.firstName[0]}${child.lastName[0]}`.toUpperCase();

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 20px 48px" }}>

        {/* Top row: character bubble + child avatar */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
          {/* Character bubble — takes up most of the width */}
          <div style={{ flex: 1 }}>
            <CharacterBubble text={bubbleText} />
          </div>

          {/* Child avatar — taps to scrapbook */}
          <Link
            href={`/student/${childId}/scrapbook`}
            style={{
              flexShrink: 0,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: C.avatarBg,
              color: C.avatarText,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              textDecoration: "none",
              border: "3px solid #E8B800",
              marginTop: 4,
            }}
            title="My Scrapbook"
          >
            {initials}
          </Link>
        </div>

        {/* Six place cards — 2×3 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          {PLACES.map((place) => {
            const hasAssigned = assignedAreaIds.has(place.areaId);
            return (
              <Link
                key={place.id}
                href={`/student/${childId}/place/${place.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "20px 12px",
                  borderRadius: 20,
                  background: place.bg,
                  border: `3px solid ${hasAssigned ? place.color : C.borderWarm}`,
                  textDecoration: "none",
                  position: "relative",
                  boxShadow: hasAssigned
                    ? `0 0 0 3px ${place.color}40`
                    : "none",
                  minHeight: 120,
                }}
              >
                {/* Assigned sparkle badge */}
                {hasAssigned && (
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 10,
                      fontSize: 16,
                    }}
                  >
                    ✨
                  </span>
                )}

                {/* Place emoji */}
                <span style={{ fontSize: 40, lineHeight: 1 }}>{place.emoji}</span>

                {/* Place name */}
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.textDark,
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {place.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Scrapbook hint */}
        <p
          style={{
            marginTop: 28,
            textAlign: "center",
            fontSize: 13,
            color: C.textMuted,
          }}
        >
          Tap your initials to see your scrapbook
        </p>
      </div>
    </div>
  );
}
