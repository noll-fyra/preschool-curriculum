"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

const updates = [
  { emoji: "🌟", child: "Aiden", text: "achieved Secure on Letter Sounds", time: "2m ago", color: "#4A9B6F", bg: "#E8F5EE" },
  { emoji: "🔢", child: "Aiden", text: "completed Count to 20 activity", time: "Yesterday", color: "#7BA3D4", bg: "#F2F7FD" },
  { emoji: "💬", child: "Aiden", text: "is working on Rhyming Words", time: "Yesterday", color: "#F5A623", bg: "#FFF8E8" },
];

export default function ParentExperience() {
  return (
    <section
      id="parents"
      aria-labelledby="parents-heading"
      className="py-24"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <AnimateIn>
            <div>
              <p className="text-sm font-semibold mb-4" style={{ color: "#4A9B6F" }}>
                For parents
              </p>
              <h2
                id="parents-heading"
                className="font-extrabold mb-5 leading-tight"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  color: "#1A1A1A",
                  letterSpacing: "-0.03em",
                }}
              >
                Never miss a milestone.{" "}
                <span style={{ color: "#4A9B6F" }}>Every day.</span>
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#737373" }}>
                Real-time progress feed, milestone-by-milestone view, and plain-language context. Active parents also get suggested 5-minute activities to try at home.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Real-time updates", desc: "See what your child worked on today" },
                  { label: "Plain language", desc: "No jargon — just what it means" },
                  { label: "At-home activities", desc: "5-minute suggestions to try together" },
                  { label: "Milestone view", desc: "Full picture of your child's journey" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl" style={{ backgroundColor: "#F7F7F5", border: "1px solid #E5E5E5" }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#1A1A1A" }}>{item.label}</p>
                    <p className="text-xs" style={{ color: "#737373" }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/for-parents"
                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: "#1A1A1A", color: "white" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2D2D2D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A1A1A"; }}
              >
                Explore parent experience →
              </Link>
            </div>
          </AnimateIn>

          {/* Phone-style feed mockup */}
          <AnimateIn delay={0.12}>
            <div className="max-w-xs mx-auto">
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  border: "8px solid #1A1A1A",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
                  backgroundColor: "#FFFFFF",
                }}
              >
                {/* Status bar */}
                <div className="flex justify-between items-center px-4 pt-3 pb-1" style={{ backgroundColor: "#FFFFFF" }}>
                  <span className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#1A1A1A", opacity: 0.4 }} />
                  </div>
                </div>

                {/* App header */}
                <div className="px-4 pt-2 pb-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ backgroundColor: "#4A9B6F" }}>🌱</div>
                    <div>
                      <p className="text-xs font-bold leading-none" style={{ color: "#1A1A1A" }}>Aiden&apos;s progress</p>
                      <p className="text-xs" style={{ color: "#737373" }}>K2 · Caterpillar Class</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar summary */}
                <div className="px-4 py-3" style={{ backgroundColor: "#F8FAF8" }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#1A1A1A" }}>This week&apos;s progress</p>
                  <div className="space-y-1.5">
                    {[
                      { label: "Language & Literacy", value: 78, color: "#F5A623" },
                      { label: "Numeracy", value: 65, color: "#7BA3D4" },
                      { label: "Social & Emotional", value: 90, color: "#4A9B6F" },
                    ].map((area) => (
                      <div key={area.label}>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs" style={{ color: "#737373", fontSize: 10 }}>{area.label}</span>
                          <span className="text-xs font-semibold" style={{ color: area.color, fontSize: 10 }}>{area.value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ backgroundColor: "#E5E5E5" }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${area.value}%`, backgroundColor: area.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feed */}
                <div className="px-4 py-3 space-y-2.5">
                  <p className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>Latest updates</p>
                  {updates.map((u, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0" style={{ backgroundColor: u.bg }}>
                        {u.emoji}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs leading-snug" style={{ color: "#1A1A1A" }}>
                          <strong>{u.child}</strong> {u.text}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "#999", fontSize: 10 }}>{u.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Home indicator */}
                <div className="flex justify-center py-3">
                  <div className="w-24 h-1 rounded-full" style={{ backgroundColor: "#E5E5E5" }} />
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
