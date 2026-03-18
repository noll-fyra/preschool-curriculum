"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getMilestoneProgressForChild, getChildLevelPerArea } from "@/lib/selectors";
import { getChildDisplayName, getPronounFromGender } from "@/lib/display-name";
import { getProgressBarFill, getProgressBarColor, getAreaSummaryText } from "@/lib/parent-summary";
import { LEARNING_AREAS, LEVEL_LABELS, type LearningAreaId, type LevelId, type MilestoneStatus } from "@/lib/types";

// ─── Spec colours ──────────────────────────────────────────────────────────────

const LEVEL_BADGE: Record<LevelId, { bg: string; text: string }> = {
  B: { bg: "#FAECE7", text: "#712B13" },
  D: { bg: "#FAEEDA", text: "#633806" },
  S: { bg: "#EAF3DE", text: "#27500A" },
};

// ─── Milestone row icon ────────────────────────────────────────────────────────

function MilestoneIcon({ status }: { status: MilestoneStatus | "locked" }) {
  if (status === "achieved") {
    return (
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "#EAF3DE" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27500A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    );
  }
  if (status === "in_progress") {
    return (
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "#FAEEDA" }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF9F27" }} />
      </div>
    );
  }
  // locked / not_started
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
      style={{ background: "var(--color-bg-deep)" }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AreaDetailPage() {
  const params = useParams();
  const childId = params.childId as string;
  const areaId = params.areaId as LearningAreaId;
  const store = useStore();

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
        <Link href="/parent" style={{ color: "var(--color-primary)" }}>← Back</Link>
      </div>
    );
  }

  const area = LEARNING_AREAS.find((a) => a.id === areaId);
  if (!area) return null;

  const allProgress = getMilestoneProgressForChild(childId, store);
  const areaMilestones = allProgress.filter((m) => m.areaId === areaId);
  const levels = getChildLevelPerArea(childId, store);
  const currentLevel = levels[areaId];

  const bMilestones = areaMilestones.filter((m) => m.levelId === "B");
  const dMilestones = areaMilestones.filter((m) => m.levelId === "D");
  const sMilestones = areaMilestones.filter((m) => m.levelId === "S");

  const fill = getProgressBarFill(store.milestones, store.progress, childId, areaId);
  const barColor = getProgressBarColor(currentLevel);

  const hasReachedSecure = currentLevel === "S" ||
    sMilestones.some((m) => m.status === "achieved" || m.status === "in_progress");

  const areaSummary = getAreaSummaryText(getChildDisplayName(child), getPronounFromGender(child.gender), areaId, currentLevel);

  function sectionSummary(milestones: typeof areaMilestones): string {
    const achievedCount = milestones.filter((m) => m.status === "achieved").length;
    const total = milestones.length;
    if (achievedCount === total) return `✓ All ${total} achieved`;
    if (achievedCount === 0) return "Not yet started";
    return `${achievedCount} of ${total} achieved`;
  }

  function renderLevel(levelMilestones: typeof areaMilestones, levelId: LevelId) {
    const badge = LEVEL_BADGE[levelId];
    const isSecureDimmed = levelId === "S" && !hasReachedSecure;

    return (
      <div
        key={levelId}
        className="mb-5"
        style={{ opacity: isSecureDimmed ? 0.5 : 1 }}
      >
        {/* Section header */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: badge.bg, color: badge.text }}
          >
            {LEVEL_LABELS[levelId]}
          </span>
          <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            {sectionSummary(levelMilestones)}
          </span>
        </div>

        {/* Milestone rows */}
        <div className="flex flex-col gap-1.5">
          {levelMilestones.map((m) => {
            const isActive = m.status === "in_progress";
            const isAchieved = m.status === "achieved";
            const isLocked = m.status === "not_started" && levelId !== currentLevel && !isAchieved;

            const canTap = isActive || isAchieved;
            const milestoneHref = `/parent/${childId}/area/${areaId}/milestone/${m.id}`;

            const rowContent = (
              <div
                className={`flex items-start gap-3 rounded-xl px-3 py-3 ${isActive ? "border" : ""}`}
                style={{
                  background: isActive ? "#FAEEDA" : "white",
                  borderColor: isActive ? "#EF9F27" : undefined,
                }}
              >
                <MilestoneIcon status={isLocked ? "locked" : m.status} />
                <div className="flex-1 min-w-0">
                  <p
                    className={isActive ? "font-medium" : ""}
                    style={{
                      fontSize: 13,
                      color: isLocked ? "var(--color-text-muted)" : "var(--color-text-dark)",
                      lineHeight: 1.5,
                    }}
                  >
                    {m.statement}
                  </p>
                  <p className="mt-0.5" style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                    {isAchieved ? "Achieved" : isActive ? "In progress" : isLocked ? "Unlocks later" : "Unlocks next"}
                  </p>

                  {/* Mastery progress for in-progress milestone — SED shows bar without count */}
                  {isActive && (
                    <div className="mt-2">
                      {areaId === "SED" ? (
                        <div
                          className="w-full rounded-full overflow-hidden"
                          style={{ height: 4, background: "var(--color-bg-deep)" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(m.masteryCount / m.masteryTotal) * 100}%`,
                              background: "#EF9F27",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: m.masteryTotal }).map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full"
                              style={{
                                background: i < m.masteryCount ? "#EF9F27" : "var(--color-bg-deep)",
                              }}
                            />
                          ))}
                          <span
                            className="ml-1 text-xs font-medium"
                            style={{ color: "#633806" }}
                          >
                            {m.masteryCount} of {m.masteryTotal} passing sessions
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {canTap && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </div>
            );

            return canTap ? (
              <Link key={m.id} href={milestoneHref} className="block">
                {rowContent}
              </Link>
            ) : (
              <div key={m.id}>{rowContent}</div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      {/* Back */}
      <Link
        href={`/parent/${childId}`}
        className="inline-flex items-center gap-1 text-sm mb-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        ← Back
      </Link>

      {/* Title */}
      <h1
        className="font-medium mb-3"
        style={{ fontSize: 22, color: "var(--color-text-dark)" }}
      >
        {area.name}
      </h1>

      {/* Area summary paragraph */}
      <p
        className="leading-relaxed mb-4"
        style={{ fontSize: 13, color: "var(--color-text-mid)" }}
      >
        {areaSummary}
      </p>

      {/* Full-width progress bar with level labels */}
      <div className="mb-5">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 8, background: "var(--color-bg-deep)" }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${fill}%`, background: barColor }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          {(["Beginning", "Developing", "Secure"] as const).map((label) => (
            <span
              key={label}
              style={{ fontSize: 10, color: "var(--color-text-muted)" }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Milestone list grouped by level */}
      {renderLevel(bMilestones, "B")}
      {renderLevel(dMilestones, "D")}
      {renderLevel(sMilestones, "S")}

      {/* Rubric link */}
      <div
        className="mt-4 pt-4 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <Link
          href={`/parent/${childId}/area/${areaId}/rubric`}
          className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-bg-cream)",
            color: "var(--color-text-dark)",
          }}
        >
          <div>
            <p className="text-sm font-medium">View full rubric</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              See all milestones across every level with plain-language descriptions
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 ml-2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
