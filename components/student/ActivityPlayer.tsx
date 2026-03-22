"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import type { ActivityConfig, ActivityQuestion } from "@/lib/activity-data";
import { generateNameCardQuestions } from "@/lib/activity-data";
import {
  hashStringToSeed,
  mulberry32,
  shuffleDeterministic,
} from "@/lib/seeded-shuffle";
import {
  cancelActivitySpeech,
  prefersReducedMotion,
  speakActivityText,
} from "@/lib/activity-speech";

// ── Child-palette colours (hardcoded — never CSS variables, spec §Visual design system) ──
const C = {
  bg: "#FFF8F0",
  surface: "#FFFFFF",
  borderWarm: "#E8D5B0",
  yellow: "#F5C518",
  yellowDark: "#E5B518",
  yellowLight: "#FFFBEB",
  green: "#7DC873",
  greenLight: "#F0FAF0",
  coral: "#E8604A",
  coralLight: "#FEF0EE",
  textDark: "#251B14",
  textMuted: "#5C4A3A",
  textAmber: "#5C4200",
  progressBlue: "#7BA3D4",
  progressBlueDark: "#5B8ABF",
};

const CONFETTI_COLOURS = [
  "#F5C518",
  "#7DC873",
  "#E8604A",
  "#7BA3D4",
  "#F4A8C4",
  "#C5B3E6",
];

interface ActivityPlayerProps {
  childId: string;
  childName: string;
  config: ActivityConfig;
  onComplete: (score: number) => void;
  /** When set, leaving the activity returns to this place’s path */
  placeId?: string | null;
}

type Phase = "question" | "feedback" | "result";

function pickQuestions(
  config: ActivityConfig,
  childName: string,
  childId: string,
): ActivityQuestion[] {
  const baseSeed = hashStringToSeed(`${childId}:${config.milestoneId}`);
  let pool: ActivityQuestion[];
  if (config.isDynamic) {
    pool = generateNameCardQuestions(childName, baseSeed);
  } else {
    pool = config.questions;
  }
  const shuffled = shuffleDeterministic(
    pool,
    (baseSeed ^ 0xdeadbeef) >>> 0,
  );
  return shuffled.slice(0, Math.min(3, shuffled.length));
}

function ActivityHeaderBar({
  progress,
  onClose,
}: {
  /** 0–1 filled amount */
  progress: number;
  onClose: () => void;
}) {
  const pct = Math.min(100, Math.max(0, Math.round(progress * 1000) / 10));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Leave activity"
        style={{
          flexShrink: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: `2px solid ${C.borderWarm}`,
          background: C.surface,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: C.textMuted,
        }}
      >
        <X strokeWidth={2.5} size={22} aria-hidden />
      </button>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Activity progress"
        style={{
          flex: 1,
          height: 12,
          borderRadius: 999,
          background: C.borderWarm,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 999,
            background: `linear-gradient(90deg, ${C.progressBlueDark} 0%, ${C.progressBlue} 100%)`,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

// Confetti: 28 CSS-animated squares (spec §Screen 6)
function Confetti() {
  const rng = mulberry32(0xc0ffee);
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(rng() * 100).toFixed(2)}%`,
    color: CONFETTI_COLOURS[i % CONFETTI_COLOURS.length],
    delay: `${(rng() * 0.6).toFixed(2)}s`,
    duration: `${(0.9 + rng() * 0.6).toFixed(2)}s`,
  }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: -10,
            left: p.left,
            width: 8,
            height: 8,
            borderRadius: 2,
            background: p.color,
            animation: `confetti-fall ${p.duration} ${p.delay} ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

export function ActivityPlayer({
  childId,
  childName,
  config,
  onComplete,
  placeId,
}: ActivityPlayerProps) {
  const router = useRouter();
  const [questions] = useState<ActivityQuestion[]>(() =>
    pickQuestions(config, childName, childId),
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]);
  // Track the last wrong tap id so we can grey it out on subsequent attempts
  const [lastWrongId, setLastWrongId] = useState<string | null>(null);
  // Track which option should shake
  const [shakingId, setShakingId] = useState<string | null>(null);

  const current = questions[questionIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    return () => cancelActivitySpeech();
  }, []);

  useEffect(() => {
    if (phase === "result") cancelActivitySpeech();
  }, [phase]);

  useEffect(() => {
    if (phase !== "question") return;
    if (prefersReducedMotion()) return;
    const q = questions[questionIndex];
    if (!q) return;
    speakActivityText(q.prompt);
  }, [phase, questionIndex, questions]);

  const handleOptionTap = useCallback(
    (optionId: string) => {
      if (phase !== "question") return;
      // Prevent tapping the already-wrong option
      if (optionId === lastWrongId) return;

      const tapped = current.options.find((o) => o.id === optionId);
      if (tapped) speakActivityText(tapped.label);

      setSelectedId(optionId);

      if (optionId === current.correctId) {
        setScores((prev) => [...prev, true]);
        setPhase("feedback");
        setLastWrongId(null);
      } else {
        // Shake the wrong option
        setShakingId(optionId);
        setTimeout(() => setShakingId(null), 420);

        const newWrong = wrongAttempts + 1;
        setWrongAttempts(newWrong);
        setLastWrongId(optionId);

        if (newWrong >= 2) {
          // After 2 wrong attempts, record as incorrect, show feedback
          setScores((prev) => [...prev, false]);
          setPhase("feedback");
        }
        // else: stay on question, hint pulse kicks in after 1 wrong
      }
    },
    [phase, current, wrongAttempts, lastWrongId],
  );

  const handleNext = useCallback(() => {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= totalQuestions) {
      setPhase("result");
    } else {
      setQuestionIndex(nextIndex);
      setPhase("question");
      setSelectedId(null);
      setWrongAttempts(0);
      setLastWrongId(null);
    }
  }, [questionIndex, totalQuestions]);

  const handleDone = useCallback(() => {
    const passCount = scores.filter(Boolean).length;
    onComplete(passCount);
  }, [scores, onComplete]);

  const handleExit = useCallback(() => {
    if (placeId) {
      router.push(`/student/${childId}/place/${placeId}`);
    } else {
      router.push(`/student/${childId}`);
    }
  }, [router, childId, placeId]);

  // ── Result / Celebration screen (spec §Screen 6) ─────────────────────────
  if (phase === "result") {
    const passCount = scores.filter(Boolean).length;
    return (
      <>
        <style>{CSS_ANIMATIONS}</style>
        <Confetti />
        <div
          style={{
            minHeight: "100vh",
            background: C.bg,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "16px 20px 0",
              maxWidth: 440,
              width: "100%",
              margin: "0 auto",
              boxSizing: "border-box",
            }}
          >
            <ActivityHeaderBar progress={1} onClose={handleExit} />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 24px 40px",
              gap: 24,
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
          {/* Character placeholder — celebration emoji (Pip would go here) */}
          <div
            style={{
              fontSize: 80,
              animation: "celebration-dance 0.6s ease-in-out 3",
            }}
          >
            🐣
          </div>

          {/* 3 stars — always, regardless of performance (spec Principle 5) */}
          <div style={{ display: "flex", gap: 12 }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  fontSize: 40,
                  animation: `star-pop 0.3s ease-out ${[0.1, 0.25, 0.4][i]}s both`,
                  display: "inline-block",
                }}
              >
                ⭐
              </span>
            ))}
          </div>

          {/* Continue — icon only (large arrow) */}
          <button
            type="button"
            onClick={handleDone}
            aria-label="Back to activities"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 112,
              height: 112,
              borderRadius: "50%",
              border: "none",
              background: C.yellow,
              color: C.textAmber,
              cursor: "pointer",
              boxShadow: `0 6px 0 ${C.yellowDark}`,
            }}
          >
            <ArrowRight strokeWidth={3.2} size={72} aria-hidden />
          </button>

          {/* Hidden from child — data captured invisibly (spec §Session scoring) */}
          <p style={{ display: "none" }} aria-hidden="true">
            score:{passCount}
          </p>
          </div>
        </div>
      </>
    );
  }

  // ── Question / Feedback screens (spec §Screens 3–5) ──────────────────────
  if (!current) return null;

  const isInFeedback = phase === "feedback";
  const lastScoreCorrect = scores[scores.length - 1] === true;
  const progressRatio =
    totalQuestions > 0
      ? (phase === "feedback" ? questionIndex + 1 : questionIndex) /
        totalQuestions
      : 0;

  return (
    <>
      <style>{CSS_ANIMATIONS}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 440,
          margin: "0 auto",
          padding: "20px 20px 32px",
          background: C.bg,
          minHeight: "100vh",
        }}
      >
        <ActivityHeaderBar progress={progressRatio} onClose={handleExit} />

        {/* Scene card */}
        {current.scene && (
          <div
            style={{
              background: C.surface,
              border: `2px solid ${C.borderWarm}`,
              borderRadius: 20,
              padding: "20px 20px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 22,
                color: C.textDark,
                margin: 0,
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              {current.scene}
            </p>
          </div>
        )}

        {/* Prompt — spoken by character, text for parents */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: C.textDark,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {current.prompt}
        </p>

        {/* Answer options grid (spec §Answer option specifications — min 140×120px) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {current.options.map((option) => {
            const isCorrect = option.id === current.correctId;
            const isLastWrong = option.id === lastWrongId;
            const isShaking = option.id === shakingId;

            // Hint pulse: after 1 wrong attempt on question phase, pulse the correct answer
            const showHintPulse =
              phase === "question" && wrongAttempts >= 1 && isCorrect;

            const showSuccessPulse =
              isInFeedback && lastScoreCorrect && isCorrect;

            // Feedback phase styling
            let bg = C.surface;
            let borderColor = C.borderWarm;
            let opacity = 1;
            let pointerEvents: "none" | "auto" = "auto";

            if (isInFeedback) {
              if (isCorrect) {
                bg = C.greenLight;
                borderColor = C.green;
              } else if (option.id === selectedId) {
                bg = C.coralLight;
                borderColor = C.coral;
                opacity = 0.6;
              } else {
                opacity = 0.4;
              }
              pointerEvents = "none";
            } else {
              // Question phase
              if (isLastWrong) {
                bg = C.coralLight;
                borderColor = C.coral;
                opacity = 0.5;
                pointerEvents = "none";
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleOptionTap(option.id)}
                disabled={isInFeedback || isLastWrong === true}
                style={{
                  minHeight: 120,
                  borderRadius: 20,
                  border: `3px solid ${borderColor}`,
                  background: bg,
                  color: C.textDark,
                  fontSize: option.label.length <= 2 ? 40 : 16,
                  fontWeight: option.label.length <= 2 ? 400 : 600,
                  cursor: isInFeedback || isLastWrong ? "default" : "pointer",
                  opacity,
                  pointerEvents,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  padding: "8px 4px",
                  transition:
                    "opacity 0.2s, background 0.2s, border-color 0.2s",
                  animation: isShaking
                    ? "shake 0.4s ease-out"
                    : showSuccessPulse
                      ? "success-pulse 0.55s ease-in-out 3"
                      : showHintPulse
                        ? "hint-pulse 0.6s ease-in-out infinite"
                        : undefined,
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Continue — arrow only (after feedback); last question matches celebration arrow size */}
        {isInFeedback && (
          <button
            type="button"
            onClick={handleNext}
            aria-label={
              questionIndex + 1 >= totalQuestions
                ? "Continue"
                : "Next question"
            }
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding:
                questionIndex + 1 >= totalQuestions
                  ? "22px 16px"
                  : "18px 16px",
              borderRadius: 32,
              border: "none",
              background: C.yellow,
              color: C.textAmber,
              cursor: "pointer",
              boxShadow: `0 4px 0 ${C.yellowDark}`,
              marginTop: 4,
            }}
          >
            <ArrowRight
              strokeWidth={3.2}
              size={questionIndex + 1 >= totalQuestions ? 72 : 44}
              aria-hidden
            />
          </button>
        )}
      </div>
    </>
  );
}

// ── CSS keyframes (spec §Animation timing reference) ──────────────────────
const CSS_ANIMATIONS = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-8px); }
  80%       { transform: translateX(4px); }
}
@keyframes hint-pulse {
  0%, 100% { border-color: #F5C518; box-shadow: 0 0 0 0 rgba(245,197,24,0.4); }
  50%       { border-color: #E5B518; box-shadow: 0 0 0 6px rgba(245,197,24,0); }
}
@keyframes success-pulse {
  0%, 100% { border-color: #7DC873; box-shadow: 0 0 0 0 rgba(125,200,115,0.45); }
  50%       { border-color: #5AB85A; box-shadow: 0 0 0 8px rgba(125,200,115,0); }
}
@keyframes confetti-fall {
  0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
@keyframes star-pop {
  0%   { transform: scale(0); }
  60%  { transform: scale(1.2); }
  100% { transform: scale(1); }
}
@keyframes celebration-dance {
  0%, 100% { transform: rotate(-10deg) scale(1); }
  50%       { transform: rotate(10deg) scale(1.05); }
}
`;
