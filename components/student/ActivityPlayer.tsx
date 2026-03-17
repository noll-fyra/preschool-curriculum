"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ActivityConfig, ActivityQuestion } from "@/lib/activity-data";
import { generateNameCardQuestions } from "@/lib/activity-data";

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
};

const CONFETTI_COLOURS = ["#F5C518", "#7DC873", "#E8604A", "#7BA3D4", "#F4A8C4", "#C5B3E6"];

interface ActivityPlayerProps {
  childId: string;
  childName: string;
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

type Phase = "intro" | "question" | "feedback" | "result";

function pickQuestions(config: ActivityConfig, childName: string): ActivityQuestion[] {
  let pool: ActivityQuestion[];
  if (config.isDynamic) {
    pool = generateNameCardQuestions(childName);
  } else {
    pool = config.questions;
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(3, shuffled.length));
}

// 800ms hold-to-exit home button
function HomeButton({ onExit }: { onExit: () => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [fillPct, setFillPct] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const HOLD_MS = 800;

  const startHold = useCallback(() => {
    startRef.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - (startRef.current ?? 0);
      setFillPct(Math.min(elapsed / HOLD_MS, 1));
      if (elapsed < HOLD_MS) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onExit();
        setFillPct(0);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [onExit]);

  const cancelHold = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    setFillPct(0);
    startRef.current = null;
  }, []);

  return (
    <button
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      aria-label="Hold to exit activity"
      style={{
        position: "relative",
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: `2px solid ${C.borderWarm}`,
        background: C.surface,
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Fill indicator */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: C.yellowLight,
          transformOrigin: "bottom",
          transform: `scaleY(${fillPct})`,
          transition: fillPct === 0 ? "none" : undefined,
        }}
      />
      <span style={{ position: "relative", fontSize: 18 }}>🏠</span>
    </button>
  );
}

// Confetti: 28 CSS-animated squares (spec §Screen 6)
function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: CONFETTI_COLOURS[i % CONFETTI_COLOURS.length],
    delay: `${(Math.random() * 0.6).toFixed(2)}s`,
    duration: `${(0.9 + Math.random() * 0.6).toFixed(2)}s`,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
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

export function ActivityPlayer({ childId: _childId, childName, config, onComplete }: ActivityPlayerProps) {
  const router = useRouter();
  const [questions] = useState<ActivityQuestion[]>(() => pickQuestions(config, childName));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]);
  // Track the last wrong tap id so we can grey it out on subsequent attempts
  const [lastWrongId, setLastWrongId] = useState<string | null>(null);
  // Track which option should shake
  const [shakingId, setShakingId] = useState<string | null>(null);

  const current = questions[questionIndex];
  const totalQuestions = questions.length;

  const handleOptionTap = useCallback(
    (optionId: string) => {
      if (phase !== "question") return;
      // Prevent tapping the already-wrong option
      if (optionId === lastWrongId) return;

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
    [phase, current, wrongAttempts, lastWrongId]
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
    router.back();
  }, [router]);

  // ── Intro screen (spec §Screen 2) ────────────────────────────────────────
  if (phase === "intro") {
    return (
      <>
        <style>{CSS_ANIMATIONS}</style>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
            padding: "24px 24px 40px",
            gap: 24,
            background: C.bg,
            position: "relative",
          }}
        >
          {/* Home button — top right */}
          <div style={{ position: "absolute", top: 16, right: 16 }}>
            <HomeButton onExit={handleExit} />
          </div>

          {/* Activity emoji — large */}
          <div style={{ fontSize: 72, lineHeight: 1 }}>{config.emoji}</div>

          {/* Speech bubble */}
          <div
            style={{
              background: C.surface,
              border: `2px solid ${C.borderWarm}`,
              borderRadius: 20,
              padding: "16px 20px",
              maxWidth: 300,
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Bubble tail */}
            <div
              style={{
                position: "absolute",
                bottom: -14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: `14px solid ${C.surface}`,
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -17,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: `16px solid ${C.borderWarm}`,
              }}
            />
            <p style={{ fontSize: 16, color: C.textDark, margin: 0, lineHeight: 1.5 }}>
              {config.name}
            </p>
          </div>

          {/* Let's go button */}
          <button
            onClick={() => setPhase("question")}
            style={{
              marginTop: 16,
              padding: "16px 48px",
              borderRadius: 32,
              border: "none",
              background: C.yellow,
              color: C.textAmber,
              fontSize: 20,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: `0 4px 0 ${C.yellowDark}`,
            }}
          >
            Let&apos;s go! ▶
          </button>
        </div>
      </>
    );
  }

  // ── Result / Celebration screen (spec §Screen 6) ─────────────────────────
  if (phase === "result") {
    const passCount = scores.filter(Boolean).length;
    return (
      <>
        <style>{CSS_ANIMATIONS}</style>
        <Confetti />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
            padding: "40px 24px",
            gap: 24,
            background: C.bg,
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          {/* Character placeholder — celebration emoji (Pip would go here) */}
          <div style={{ fontSize: 80, animation: "celebration-dance 0.6s ease-in-out 3" }}>
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

          {/* Always celebratory — no performance language (spec Principle 5) */}
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: C.textDark, margin: 0 }}>
              {childName}! You finished!
            </h2>
            <p style={{ fontSize: 16, color: C.textMuted, marginTop: 6 }}>
              Amazing work today! 🎉
            </p>
          </div>

          {/* Done button */}
          <button
            onClick={handleDone}
            style={{
              padding: "16px 40px",
              borderRadius: 32,
              border: "none",
              background: C.yellow,
              color: C.textAmber,
              fontSize: 20,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: `0 4px 0 ${C.yellowDark}`,
            }}
          >
            Back to activities →
          </button>

          {/* Hidden from child — data captured invisibly (spec §Session scoring) */}
          <p style={{ display: "none" }} aria-hidden="true">
            score:{passCount}
          </p>
        </div>
      </>
    );
  }

  // ── Question / Feedback screens (spec §Screens 3–5) ──────────────────────
  if (!current) return null;

  const isInFeedback = phase === "feedback";
  const lastScoreCorrect = scores[scores.length - 1] === true;

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
        {/* Top row: progress dots + home button */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Progress dots (spec §Screens 3–5 — no fraction counter) */}
          <div style={{ display: "flex", gap: 8, flex: 1, justifyContent: "center" }}>
            {questions.map((_, i) => {
              const done = i < questionIndex;
              const current = i === questionIndex;
              return (
                <div
                  key={i}
                  style={{
                    width: current ? 14 : 10,
                    height: current ? 14 : 10,
                    borderRadius: "50%",
                    background: done ? C.green : current ? C.yellow : C.borderWarm,
                    transition: "all 0.2s ease",
                  }}
                />
              );
            })}
          </div>
          <HomeButton onExit={handleExit} />
        </div>

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
            <p style={{ fontSize: 22, color: C.textDark, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
              {current.scene}
            </p>
          </div>
        )}

        {/* Prompt — spoken by character, text for parents */}
        <p style={{ fontSize: 18, fontWeight: 700, color: C.textDark, margin: 0, lineHeight: 1.4 }}>
          {current.prompt}
        </p>

        {/* Warm re-prompt after 1 wrong attempt (spec §Wrong answer flow) */}
        {phase === "question" && wrongAttempts === 1 && (
          <p style={{ fontSize: 15, color: C.textMuted, textAlign: "center", margin: 0 }}>
            Have another look! Which one do you think?
          </p>
        )}

        {/* Feedback pill — shown after answering */}
        {isInFeedback && (
          <div
            style={{
              borderRadius: 16,
              padding: "12px 16px",
              fontSize: 15,
              fontWeight: 500,
              background: lastScoreCorrect ? C.greenLight : C.coralLight,
              border: `2px solid ${lastScoreCorrect ? C.green : C.coral}`,
              color: C.textDark,
            }}
          >
            {lastScoreCorrect ? current.feedbackCorrect : current.feedbackWrong}
          </div>
        )}

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
            const showHintPulse = phase === "question" && wrongAttempts >= 1 && isCorrect;

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
                  transition: "opacity 0.2s, background 0.2s, border-color 0.2s",
                  animation: isShaking
                    ? "shake 0.4s ease-out"
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

        {/* Next / Finish button — appears after feedback (child taps deliberately, no auto-advance) */}
        {isInFeedback && (
          <button
            onClick={handleNext}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 32,
              border: "none",
              background: C.yellow,
              color: C.textAmber,
              fontSize: 20,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: `0 4px 0 ${C.yellowDark}`,
              marginTop: 4,
            }}
          >
            {questionIndex + 1 >= totalQuestions ? "Finish! 🎉" : "Next ▶"}
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
