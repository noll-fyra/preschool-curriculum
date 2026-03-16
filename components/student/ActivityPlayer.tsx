"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ActivityConfig, ActivityQuestion } from "@/lib/activity-data";
import { generateNameCardQuestions } from "@/lib/activity-data";

interface ActivityPlayerProps {
  childId: string;
  childName: string;
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

type Phase = "question" | "feedback" | "result";

function pickQuestions(config: ActivityConfig, childName: string): ActivityQuestion[] {
  let pool: ActivityQuestion[];

  if (config.isDynamic) {
    pool = generateNameCardQuestions(childName);
  } else {
    pool = config.questions;
  }

  // Shuffle and take 3
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(3, shuffled.length));
}

export function ActivityPlayer({ childId: _childId, childName, config, onComplete }: ActivityPlayerProps) {
  const router = useRouter();

  const [questions] = useState<ActivityQuestion[]>(() => pickQuestions(config, childName));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]); // true = correct

  const current = questions[questionIndex];
  const totalQuestions = questions.length;

  const handleOptionTap = useCallback(
    (optionId: string) => {
      if (phase !== "question") return;

      setSelectedId(optionId);

      if (optionId === current.correctId) {
        setScores((prev) => [...prev, true]);
        setPhase("feedback");
      } else {
        const newWrong = wrongAttempts + 1;
        setWrongAttempts(newWrong);
        if (newWrong >= 2) {
          // After 2 wrong, record as wrong and move on
          setScores((prev) => [...prev, false]);
          setPhase("feedback");
        }
        // else: allow retry (don't change phase)
      }
    },
    [phase, current, wrongAttempts]
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
    }
  }, [questionIndex, totalQuestions]);

  const handleDone = useCallback(() => {
    const passCount = scores.filter(Boolean).length;
    onComplete(passCount);
  }, [scores, onComplete]);

  // ── Result screen ─────────────────────────────────────────────────────────
  if (phase === "result") {
    const passCount = scores.filter(Boolean).length;
    const passed = passCount >= 2;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-6">
        <div className="text-6xl">{passed ? "🎉" : "💪"}</div>

        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-dark)" }}
          >
            {passed ? "Well done!" : "Keep practising!"}
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            {passed
              ? "You passed this activity! 🌟"
              : "You're getting better — try again another time!"}
          </p>
        </div>

        {/* Stars */}
        <div className="flex gap-3">
          {questions.map((_, i) => (
            <span key={i} className="text-3xl">
              {scores[i] ? "⭐" : "☆"}
            </span>
          ))}
        </div>

        <p className="text-lg font-semibold" style={{ color: "var(--color-text-dark)" }}>
          {passCount} / {totalQuestions} correct
        </p>

        <button
          onClick={handleDone}
          className="px-8 py-3 rounded-2xl font-bold text-white text-base transition-opacity hover:opacity-90"
          style={{ background: "var(--color-primary)" }}
        >
          Done! →
        </button>
      </div>
    );
  }

  // ── Question / Feedback screen ────────────────────────────────────────────
  if (!current) return null;

  const isCorrectSelected = phase === "feedback" && scores[scores.length - 1] === true;
  const isWrongSelected = phase === "feedback" && scores[scores.length - 1] === false;

  return (
    <div className="flex flex-col gap-5 max-w-md mx-auto px-5 py-6">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-2 rounded-full"
              style={{
                background:
                  i < questionIndex
                    ? "var(--color-primary)"
                    : i === questionIndex
                    ? "var(--color-primary-wash)"
                    : "var(--color-bg-deep)",
              }}
            />
          ))}
        </div>
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          {questionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Scene card */}
      {current.scene && (
        <div
          className="rounded-2xl px-5 py-5 text-center"
          style={{ background: "var(--color-bg-cream)" }}
        >
          <p
            className="text-2xl leading-relaxed font-medium"
            style={{ color: "var(--color-text-dark)" }}
          >
            {current.scene}
          </p>
        </div>
      )}

      {/* Prompt */}
      <div>
        <p
          className="text-lg font-bold leading-snug"
          style={{ color: "var(--color-text-dark)" }}
        >
          {current.prompt}
        </p>
      </div>

      {/* Feedback message */}
      {phase === "feedback" && (
        <div
          className="rounded-xl px-4 py-3 text-sm font-medium"
          style={{
            background: isCorrectSelected ? "#E8F5EE" : "#FEE9E5",
            color: isCorrectSelected ? "#2D7A4F" : "#C0432A",
          }}
        >
          {isCorrectSelected ? current.feedbackCorrect : current.feedbackWrong}
        </div>
      )}

      {/* Options grid */}
      <div
        className={`grid gap-3 ${
          current.options.length <= 2 ? "grid-cols-2" :
          current.options.length <= 4 ? "grid-cols-2" :
          "grid-cols-3"
        }`}
      >
        {current.options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.id === current.correctId;
          const showCorrect = phase === "feedback" && isCorrect;
          const showWrong = phase === "feedback" && isSelected && !isCorrect;
          // After 2 wrong attempts in question phase, highlight correct
          const highlightCorrect =
            phase === "question" && wrongAttempts >= 2 && isCorrect;

          let bg = "white";
          let border = "var(--color-border)";
          let textColor = "var(--color-text-dark)";

          if (showCorrect) {
            bg = "#E8F5EE";
            border = "#2D7A4F";
            textColor = "#2D7A4F";
          } else if (showWrong) {
            bg = "#FEE9E5";
            border = "#C0432A";
            textColor = "#C0432A";
          } else if (highlightCorrect) {
            bg = "#FEF3D7";
            border = "#F5A623";
            textColor = "#A06010";
          } else if (isSelected && phase === "question") {
            bg = "var(--color-primary-wash)";
            border = "var(--color-primary)";
            textColor = "var(--color-primary)";
          }

          return (
            <button
              key={option.id}
              onClick={() => handleOptionTap(option.id)}
              disabled={phase === "feedback"}
              className="rounded-2xl border-2 px-3 py-4 font-semibold text-base text-center transition-all active:scale-95 disabled:cursor-default"
              style={{
                background: bg,
                borderColor: border,
                color: textColor,
                // Shake animation on wrong (CSS class won't work easily, so we skip)
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Wrong attempt retry hint */}
      {phase === "question" && wrongAttempts > 0 && wrongAttempts < 2 && (
        <p className="text-sm text-center" style={{ color: "#C0432A" }}>
          Not quite — try again!
        </p>
      )}

      {/* Next button (shown after feedback) */}
      {phase === "feedback" && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-2xl font-bold text-white text-base transition-opacity hover:opacity-90 mt-1"
          style={{ background: "var(--color-primary)" }}
        >
          {questionIndex + 1 >= totalQuestions ? "See result →" : "Next →"}
        </button>
      )}

      {/* Back link */}
      <button
        onClick={() => router.back()}
        className="text-center text-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        Quit activity
      </button>
    </div>
  );
}
