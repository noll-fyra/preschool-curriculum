"use client";

import AnimateIn from "@/components/ui/AnimateIn";

const pillars = [
  {
    color: "#F5A623",
    bg: "#FFFBF2",
    border: "#FDE8B0",
    label: "Children",
    title: "Learning that feels like play.",
    body: "Each child gets their own personalised activity queue — based on where they are right now, not where the curriculum says they should be. Activities are short, audio-guided, and genuinely fun.",
    items: ["Personalised activity queue per child", "Audio-guided — no reading required", "Earns stickers, not scores"],
  },
  {
    color: "#F79863",
    bg: "#FEF0E7",
    border: "#C8E8E2",
    label: "Teachers",
    title: "Less paperwork. Same professional judgment.",
    body: "Milestone progress is recorded as children play. Observation logging takes two taps. Report time means reviewing a pre-drafted summary — not starting from a blank page.",
    items: ["Class dashboard with every child at a glance", "Observation log in two taps", "Pre-drafted progress reports"],
  },
  {
    color: "#7BA3D4",
    bg: "#F2F7FD",
    border: "#B8D4E8",
    label: "Parents",
    title: "Never miss a milestone.",
    body: "Instead of waiting for the next parent-teacher conference, parents get a real-time view of what their child is working on and what it means. Active parents also get suggested at-home activities.",
    items: ["Real-time progress feed", "Plain-language milestone context", "Suggested at-home activities"],
  },
];

export default function Solution() {
  return (
    <section
      id="solution"
      aria-labelledby="solution-heading"
      className="py-24"
      style={{ backgroundColor: "#F3ECE4" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <AnimateIn>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-sm font-semibold mb-3" style={{ color: "#F79863" }}>
              Built for every role
            </p>
            <h2
              id="solution-heading"
              className="font-extrabold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#333333",
                letterSpacing: "-0.03em",
              }}
            >
              Ask your on-demand learning assistant.
            </h2>
            <p className="text-lg" style={{ color: "#737373" }}>
              One platform. Three roles. A continuous loop between classroom, home, and teacher.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <AnimateIn key={p.label} delay={i * 0.1}>
              <div
                className="rounded-2xl p-7 h-full flex flex-col"
                style={{ backgroundColor: p.bg, border: `1px solid ${p.border}` }}
              >
                <div
                  className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-full mb-5 w-fit"
                  style={{ backgroundColor: p.color + "20", color: p.color }}
                >
                  {p.label}
                </div>
                <h3
                  className="font-bold text-lg mb-3 leading-snug"
                  style={{ color: "#333333", letterSpacing: "-0.02em" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "#737373" }}>
                  {p.body}
                </p>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#555555" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" fill={p.color} fillOpacity="0.15"/>
                        <path d="M5 8l2 2 4-4" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
