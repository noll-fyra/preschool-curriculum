"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { autoSelectAssignments } from "@/lib/assignments";
import { PLACES } from "@/lib/places";

// Child-palette colours — hardcoded, never CSS variables (spec §1)
const C = {
  bg: "#FFF8F0",
  borderWarm: "#E8D5B0",
  textDark: "#251B14",
  textMuted: "#7A6A5A",
  avatarBg: "#F5C518",
  bubbleBg: "#FFFFFF",
  bubbleBorder: "#E8D5B0",
};

function CharacterBubble({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 0 }}>
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
          padding: "14px 16px",
          flex: 1,
          minWidth: 0,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.15,
            color: C.textDark,
          }}
        >
          {text}
        </h1>
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

  const firstName = child.firstName;
  const bubbleText = `Hi ${firstName}!`;

  return (
    <div
      style={{
        background: C.bg,
        flex: 1,
        minHeight: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: "12px 12px 10px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Top row: character bubble + scrapbook */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          {/* Character bubble — takes up most of the width */}
          <div style={{ flex: 1 }}>
            <CharacterBubble text={bubbleText} />
          </div>

          {/* Scrapbook — icon only */}
          <Link
            href={`/student/${childId}/scrapbook`}
            aria-label="My scrapbook"
            title="My scrapbook"
            style={{
              flexShrink: 0,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: C.avatarBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              border: "3px solid #E8B800",
              marginTop: 4,
              fontSize: 26,
              lineHeight: 1,
            }}
          >
            📔
          </Link>
        </div>
      </div>

      {/* Six place tiles — fill remaining viewport (2×3) */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          boxSizing: "border-box",
          padding: "0 10px 10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "repeat(3, minmax(0, 1fr))",
          gap: 10,
        }}
      >
        {PLACES.map((place) => {
          const hasAssigned = assignedAreaIds.has(place.areaId);
          return (
            <Link
              key={place.id}
              href={`/student/${childId}/place/${place.id}`}
              aria-label={place.name}
              title={place.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 0,
                height: "100%",
                width: "100%",
                boxSizing: "border-box",
                padding: 8,
                borderRadius: 22,
                background: place.bg,
                border: `3px solid ${hasAssigned ? place.color : C.borderWarm}`,
                textDecoration: "none",
                position: "relative",
                boxShadow: hasAssigned ? `0 0 0 3px ${place.color}40` : "none",
                containerType: "size",
              }}
            >
              {hasAssigned && (
                <span
                  style={{
                    position: "absolute",
                    top: "clamp(6px, 1.8cqmin, 14px)",
                    right: "clamp(8px, 2cqmin, 16px)",
                    fontSize: "clamp(22px, 12cqmin, 40px)",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  ✨
                </span>
              )}

              <span
                style={{
                  fontSize: "clamp(52px, 48cqmin, 220px)",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {place.emoji}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
