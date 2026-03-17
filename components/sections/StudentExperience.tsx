"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

const activities = [
  { emoji: "🔤", label: "Letter sounds", area: "LL", color: "#F5A623", bg: "#FFF8E8" },
  { emoji: "🔢", label: "Count to 10", area: "NUM", color: "#7BA3D4", bg: "#F2F7FD" },
  { emoji: "🌟", label: "Share & take turns", area: "SED", color: "#E8745A", bg: "#FEF0EC" },
  { emoji: "📖", label: "Rhyming words", area: "LL", color: "#F5A623", bg: "#FFF8E8" },
];

export default function StudentExperience() {
  return (
    <section
      id="students"
      aria-labelledby="students-heading"
      className="py-24"
      style={{ backgroundColor: "#F7F7F5" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Activity mockup */}
          <AnimateIn>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #E5E5E5", boxShadow: "0 4px 40px rgba(0,0,0,0.06)", backgroundColor: "#FFFFFF" }}
            >
              {/* App bar */}
              <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: "#1A2E22" }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: "#4A9B6F" }}>🌱</div>
                  <span className="text-xs font-bold text-white">Aiden&apos;s activities</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i < 3 ? "#F5A623" : "rgba(255,255,255,0.2)"} aria-hidden="true">
                      <path d="M6 1l1.5 3 3.2.5L8.5 6.7l.6 3.3L6 8.5 2.9 10l.6-3.3L1.3 4.5l3.2-.5z"/>
                    </svg>
                  ))}
                </div>
              </div>

              {/* Activity card */}
              <div className="p-5">
                <div
                  className="rounded-xl p-5 mb-4 text-center"
                  style={{ backgroundColor: "#FFF8E8", border: "1px solid #FDE8B0" }}
                >
                  <div className="text-5xl mb-4" aria-hidden="true">🔤</div>
                  <p className="text-sm font-bold mb-2" style={{ color: "#1A1A1A" }}>What sound does this letter make?</p>
                  <div className="text-6xl font-black mb-4" style={{ color: "#F5A623", letterSpacing: "-0.03em" }}>B</div>
                  <div className="flex gap-2 justify-center">
                    {["buh", "puh", "duh"].map((opt) => (
                      <button
                        key={opt}
                        className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                        style={{ backgroundColor: "white", color: "#1A1A1A", border: "2px solid #E5E5E5" }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Queue */}
                <p className="text-xs font-semibold mb-2 px-1" style={{ color: "#737373" }}>Up next</p>
                <div className="space-y-2">
                  {activities.slice(1).map((act) => (
                    <div
                      key={act.label}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ backgroundColor: act.bg, border: `1px solid ${act.color}30` }}
                    >
                      <span className="text-xl" aria-hidden="true">{act.emoji}</span>
                      <span className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>{act.label}</span>
                      <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: act.color + "20", color: act.color }}>{act.area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Text side */}
          <AnimateIn delay={0.12}>
            <div>
              <p className="text-sm font-semibold mb-4" style={{ color: "#4A9B6F" }}>
                For children
              </p>
              <h2
                id="students-heading"
                className="font-extrabold mb-5 leading-tight"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  color: "#1A1A1A",
                  letterSpacing: "-0.03em",
                }}
              >
                Learning that feels{" "}
                <span style={{ color: "#4A9B6F" }}>like play.</span>
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#737373" }}>
                Each child gets a personalised activity queue — short, audio-guided sessions with a friendly character. No reading required. No scores or levels visible to the child; they just play and earn stickers.
              </p>
              <Link
                href="/for-students"
                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: "#1A1A1A", color: "white" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2D2D2D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A1A1A"; }}
              >
                See what children experience →
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
