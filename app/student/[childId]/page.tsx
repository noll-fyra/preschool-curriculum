"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getActivityConfig } from "@/lib/activity-data";
import { autoSelectAssignments } from "@/lib/assignments";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";

// Child-palette colours — hardcoded, never CSS variables (spec §Visual design system)
const C = {
  bg: "#FFF8F0",
  surface: "#FFFFFF",
  borderWarm: "#E8D5B0",
  yellow: "#F5C518",
  yellowLight: "#FFFBEB",
  green: "#7DC873",
  greenLight: "#F0FAF0",
  textDark: "#251B14",
  textMuted: "#5C4A3A",
  textAmber: "#5C4200",
};

export default function StudentActivityHomePage() {
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

  // Get milestones for this child — only LL and NUM have digital activities
  const allAssigned = autoSelectAssignments(
    childId,
    store.milestones,
    store.progress,
    store.sessions,
    store.observations
  );
  const digitalActivities = allAssigned.filter((m) => m.areaId !== "SED");

  // Which activities has the child passed today?
  const today = new Date().toISOString().slice(0, 10);
  const passedTodayIds = new Set(
    store.sessions
      .filter((s) => s.childId === childId && s.passed && s.attemptedAt.slice(0, 10) === today)
      .map((s) => s.milestoneId)
  );

  // Only the first not-yet-done activity is "active" (spec §Screen 1 — only one tile active at a time)
  const firstActiveMilestoneId = digitalActivities.find((m) => !passedTodayIds.has(m.id))?.id ?? null;

  // Recent teacher messages visible to this child
  const visibleUpdates = store.chatMessages
    .filter((m) => m.childId === childId && m.senderType === "teacher")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 440, margin: "0 auto", padding: "32px 20px 48px" }}>
        {/* Back link — small, top */}
        <Link
          href="/student"
          style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 14, color: C.textMuted, marginBottom: 24 }}
        >
          ← Back
        </Link>

        {/* Child greeting — warm, personal */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <ChildAvatar name={getChildDisplayName(child)} size="lg" />
          <h1 style={{ fontSize: 26, fontWeight: 700, color: C.textDark, margin: 0 }}>
            Hi {getChildDisplayName(child)}! 👋
          </h1>
        </div>

        {/* Teacher updates feed — class news for students */}
        {visibleUpdates.length > 0 && (
          <div
            style={{
              borderRadius: 20,
              padding: 16,
              marginBottom: 24,
              border: `2px solid ${C.borderWarm}`,
              background: C.surface,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: C.textDark, marginBottom: 12 }}>
              📢 News from your teacher
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {visibleUpdates.map((u) => (
                <div
                  key={u.id}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    background: C.yellowLight,
                    border: `1px solid ${C.yellow}`,
                  }}
                >
                  <p style={{ fontSize: 14, color: C.textDark, lineHeight: 1.5, margin: 0 }}>
                    {u.text}
                  </p>
                  {u.media.some((m) => m.type === "photo") && (
                    <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {u.media
                        .filter((m) => m.type === "photo")
                        .map((m, i) => (
                          <div
                            key={i}
                            style={{
                              borderRadius: 8,
                              overflow: "hidden",
                              width: 80,
                              height: 80,
                              border: `1px solid ${C.borderWarm}`,
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={m.url}
                              alt=""
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity tiles (spec §Screen 1 — Activity queue) */}
        {digitalActivities.length === 0 ? (
          <div
            style={{
              borderRadius: 20,
              padding: 20,
              textAlign: "center",
              border: `2px solid ${C.borderWarm}`,
              background: C.surface,
            }}
          >
            <p style={{ color: C.textMuted, fontSize: 15 }}>No activities yet — check back soon!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {digitalActivities.map((milestone) => {
              const config = activityConfigOverrides[milestone.id] ?? getActivityConfig(milestone.id);
              if (!config) return null;

              const isDone = passedTodayIds.has(milestone.id);
              const isActive = milestone.id === firstActiveMilestoneId;
              // Remaining tiles are locked — the child cannot play out of order
              const isLocked = !isDone && !isActive;

              // Tile appearance (spec §Screen 1 — Activity tile states)
              let tileBg = C.surface;
              let tileBorder = C.borderWarm;
              let tileOpacity = 1;

              if (isDone) {
                tileBg = C.greenLight;
                tileBorder = C.green;
              } else if (isActive) {
                tileBg = C.yellowLight;
                tileBorder = C.yellow;
              } else {
                tileOpacity = 0.6;
              }

              return (
                <div
                  key={milestone.id}
                  style={{
                    borderRadius: 20,
                    border: `3px solid ${tileBorder}`,
                    background: tileBg,
                    opacity: tileOpacity,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", gap: 14 }}>
                    {/* Emoji — large, child-legible */}
                    <span style={{ fontSize: 36, lineHeight: 1 }}>{config.emoji}</span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Activity name — no area/level badges (children cannot interpret assessment language) */}
                      <span style={{ fontSize: 17, fontWeight: 600, color: C.textDark, display: "block" }}>
                        {config.name}
                      </span>

                      {/* Done badge — completion only, never performance (spec §Principle 5) */}
                      {isDone && (
                        <span
                          style={{
                            display: "inline-block",
                            marginTop: 4,
                            fontSize: 13,
                            fontWeight: 600,
                            color: C.green,
                          }}
                        >
                          ✓ Done!
                        </span>
                      )}
                    </div>

                    {/* Lock icon for locked tiles — friendly, not punitive (spec §Design note on locked tiles) */}
                    {isLocked && (
                      <span style={{ fontSize: 24, opacity: 0.5 }}>🔒</span>
                    )}
                  </div>

                  {/* Play button — only on active tile; locked tiles show no button */}
                  {(isActive || isDone) && (
                    <div style={{ padding: "0 16px 16px" }}>
                      <Link
                        href={`/student/${childId}/play/${milestone.id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          width: "100%",
                          padding: "14px",
                          borderRadius: 32,
                          border: "none",
                          background: isDone ? C.borderWarm : C.yellow,
                          color: isDone ? C.textMuted : C.textAmber,
                          fontSize: 18,
                          fontWeight: 700,
                          cursor: "pointer",
                          textDecoration: "none",
                          boxSizing: "border-box",
                        }}
                      >
                        {isDone ? "Play again" : "▶  Play"}
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
