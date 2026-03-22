"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, List, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { getPlaceById } from "@/lib/places";
import { ACTIVITY_CONFIGS } from "@/lib/activity-data";
import {
  PATH_STEP_COUNT,
  compareMilestonesForPath,
  computePathSlotStatuses,
} from "@/lib/student-path";
import { DuolingoActivityPath, PATH_CIRCLE_NODE_PX } from "@/components/student/DuolingoActivityPath";
import { LEARNING_AREAS, type LearningAreaId } from "@/lib/types";

const C = {
  bg: "#FFF8F0",
  surface: "#FFFFFF",
  textMuted: "#7A6A5A",
  textDark: "#2D3A2E",
  green: "#7DC873",
  borderWarm: "#E8D5B0",
};

const BTN = PATH_CIRCLE_NODE_PX;

/** Short child-friendly blurb per NEL learning area (domain description in the info modal). */
const DOMAIN_DESCRIPTION: Record<LearningAreaId, string> = {
  LL: "Stories, letters, sounds, and words — building the skills that help you read, write, and share ideas.",
  NUM: "Counting, shapes, and patterns — playing with numbers and how they fit together.",
  SED: "Feelings, friends, and solving problems together — growing confident and kind.",
  ACE: "Colours, music, movement, and making things — expressing yourself in lots of ways.",
  DOW: "Asking why, trying things out, and noticing the world around you.",
  HMS: "Moving your body, staying safe, and looking after yourself.",
};

export default function PlacePage() {
  const params = useParams();
  const childId = params.childId as string;
  const placeId = params.placeId as string;

  const store = useStore();
  const child = store.children.find((c) => c.id === childId);
  const place = getPlaceById(placeId);
  const [infoOpen, setInfoOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const pathSteps = useMemo(() => {
    if (!place) return [];
    const activityConfigOverrides = store.activityConfigOverrides;
    const domainMilestones = store.milestones.filter((m) => m.areaId === place.areaId);
    const rows = domainMilestones
      .filter((m) => {
        const config = activityConfigOverrides[m.id] ?? ACTIVITY_CONFIGS.find((a) => a.milestoneId === m.id);
        return !!config;
      })
      .sort((a, b) => compareMilestonesForPath(a, b))
      .map((m) => ({
        milestone: m,
        config: activityConfigOverrides[m.id] ?? ACTIVITY_CONFIGS.find((a) => a.milestoneId === m.id)!,
      }));

    if (rows.length === 0) return [];

    const cycle = rows.map((r) => ({
      milestoneId: r.milestone.id,
      emoji: r.config.emoji,
    }));

    const slots = Array.from({ length: PATH_STEP_COUNT }, (_, i) => ({
      slotIndex: i,
      milestoneId: cycle[i % cycle.length]!.milestoneId,
      emoji: cycle[i % cycle.length]!.emoji,
    }));

    const statuses = computePathSlotStatuses(
      PATH_STEP_COUNT,
      childId,
      placeId,
      store.pathSlotCompleted
    );

    return slots.map((s, i) => ({
      slotIndex: s.slotIndex,
      milestoneId: s.milestoneId,
      emoji: s.emoji,
      status: statuses[i]!,
    }));
  }, [
    place,
    childId,
    placeId,
    store.milestones,
    store.activityConfigOverrides,
    store.pathSlotCompleted,
  ]);

  const domainMeta = place ? LEARNING_AREAS.find((a) => a.id === place.areaId) : undefined;
  const domainDescription = place ? DOMAIN_DESCRIPTION[place.areaId] : "";

  const currentStep = useMemo(
    () => pathSteps.find((s) => s.status === "current"),
    [pathSteps]
  );

  const currentMilestone = useMemo(() => {
    if (!currentStep) return undefined;
    return store.milestones.find((m) => m.id === currentStep.milestoneId);
  }, [currentStep, store.milestones]);

  const currentActivityConfig = useMemo(() => {
    if (!currentStep) return undefined;
    return (
      store.activityConfigOverrides[currentStep.milestoneId] ??
      ACTIVITY_CONFIGS.find((a) => a.milestoneId === currentStep.milestoneId)
    );
  }, [currentStep, store.activityConfigOverrides]);

  useEffect(() => {
    if (!infoOpen) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [infoOpen]);

  useEffect(() => {
    if (!infoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInfoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [infoOpen]);

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

  const hasActivities = pathSteps.length > 0;
  const headerPadTop = `calc(12px + env(safe-area-inset-top, 0px))`;
  const headerBlockHeight = `calc(${headerPadTop} + ${BTN}px + 12px)`;

  const pathButtonStyle: CSSProperties = {
    width: BTN,
    height: BTN,
    borderRadius: "50%",
    background: C.surface,
    border: `2px solid ${C.borderWarm}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 0 rgba(0,0,0,0.04)",
    textDecoration: "none",
    color: C.textDark,
    padding: 0,
    cursor: "pointer",
  };

  return (
    <div style={{ background: place.bg, minHeight: "100vh" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: place.bg,
          borderBottom: `1px solid ${C.borderWarm}99`,
          paddingTop: headerPadTop,
          paddingLeft: "max(16px, env(safe-area-inset-left))",
          paddingRight: "max(16px, env(safe-area-inset-right))",
          paddingBottom: 12,
        }}
      >
        <div
          style={{
            maxWidth: 520,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href={`/student/${childId}`}
            style={pathButtonStyle}
            aria-label="Back to world"
            title="Back"
          >
            <ChevronLeft size={28} strokeWidth={2.5} aria-hidden />
          </Link>
          <button
            type="button"
            style={pathButtonStyle}
            onClick={() => setInfoOpen(true)}
            aria-label="About this place"
            title="About this place"
          >
            <List size={26} strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      </header>

      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: `16px 16px 40px`,
          paddingTop: headerBlockHeight,
        }}
      >
        {!hasActivities ? (
          <div
            style={{
              borderRadius: 20,
              padding: "48px 20px",
              textAlign: "center",
              background: C.surface,
              border: `2px solid ${C.borderWarm}`,
            }}
            aria-hidden
          >
            <div style={{ fontSize: 56 }}>🌟</div>
          </div>
        ) : (
          <DuolingoActivityPath
            steps={pathSteps}
            childId={childId}
            placeId={placeId}
            accentColor={place.color}
          />
        )}
      </div>

      {infoOpen ? (
        <div
          role="presentation"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(45, 58, 46, 0.45)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "max(16px, env(safe-area-inset-left)) max(16px, env(safe-area-inset-right)) max(24px, env(safe-area-inset-bottom))",
          }}
          onClick={() => setInfoOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="place-info-title"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 440,
              maxHeight: "min(85vh, 560px)",
              overflow: "auto",
              borderRadius: 20,
              background: C.surface,
              border: `2px solid ${C.borderWarm}`,
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
              padding: "20px 20px 24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
              <h2
                id="place-info-title"
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 800,
                  color: C.textDark,
                  lineHeight: 1.25,
                  fontFamily: "var(--font-nunito), Nunito, system-ui, sans-serif",
                }}
              >
                {domainMeta?.name ?? "This place"}
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setInfoOpen(false)}
                aria-label="Close"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: `2px solid ${C.borderWarm}`,
                  background: place.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  color: C.textDark,
                }}
              >
                <X size={22} strokeWidth={2.5} aria-hidden />
              </button>
            </div>

            <p
              style={{
                margin: "0 0 20px",
                fontSize: 16,
                lineHeight: 1.5,
                color: C.textMuted,
                fontFamily: "var(--font-nunito), Nunito, system-ui, sans-serif",
              }}
            >
              {domainDescription}
            </p>

            <div
              style={{
                borderRadius: 16,
                padding: "16px 18px",
                background: place.bg,
                border: `1px solid ${C.borderWarm}`,
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: place.color,
                  fontFamily: "var(--font-nunito), Nunito, system-ui, sans-serif",
                }}
              >
                What you&apos;re practising now
              </p>
              {currentActivityConfig && currentMilestone ? (
                <>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: 18,
                      fontWeight: 700,
                      color: C.textDark,
                      fontFamily: "var(--font-nunito), Nunito, system-ui, sans-serif",
                    }}
                  >
                    {currentActivityConfig.emoji} {currentActivityConfig.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: C.textMuted,
                      fontFamily: "var(--font-nunito), Nunito, system-ui, sans-serif",
                    }}
                  >
                    {currentMilestone.parentDescription}
                  </p>
                </>
              ) : (
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: C.textMuted,
                    fontFamily: "var(--font-nunito), Nunito, system-ui, sans-serif",
                  }}
                >
                  {hasActivities
                    ? "Your next activity will show here when you’re on the path."
                    : "Activities will appear here when this place is ready."}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
