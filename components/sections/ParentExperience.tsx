import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

function ArrowButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ backgroundColor: "#333333" }}
      aria-label={label}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

function FeedMockup() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div className="px-4 py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center text-sm" style={{ backgroundColor: "#F79863" }}>🌱</div>
          <div>
            <p className="text-xs font-bold leading-none" style={{ color: "#333333" }}>Aiden&apos;s progress</p>
            <p className="text-xs" style={{ color: "#999999" }}>K2 · Caterpillar Class</p>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {[
          { emoji: "🌟", text: "Achieved Secure on Letter Sounds", time: "2m ago", bg: "#E5F4F1" },
          { emoji: "🔢", text: "Completed Count to 20 activity", time: "Yesterday", bg: "#EAF2FB" },
          { emoji: "💬", text: "Working on Rhyming Words", time: "Yesterday", bg: "#FFF8E8" },
        ].map((u, i) => (
          <div key={i} className="flex gap-2.5 items-start px-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ backgroundColor: u.bg }}>{u.emoji}</div>
            <div>
              <p className="text-xs leading-snug" style={{ color: "#333333" }}>{u.text}</p>
              <p style={{ color: "#999999", fontSize: 10 }}>{u.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestoneMockup() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div className="px-4 py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
        <p className="text-xs font-bold" style={{ color: "#333333" }}>This week&apos;s progress</p>
      </div>
      <div className="p-3 space-y-2">
        {[
          { label: "Language & Literacy", value: 78, color: "#F5A623" },
          { label: "Numeracy", value: 65, color: "#7BA3D4" },
          { label: "Social & Emotional", value: 90, color: "#2D7A4F" },
        ].map((area) => (
          <div key={area.label}>
            <div className="flex justify-between mb-0.5">
              <span style={{ color: "#666666", fontSize: 11 }}>{area.label}</span>
              <span className="font-semibold" style={{ color: area.color, fontSize: 11 }}>{area.value}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ backgroundColor: "#E5E5E5" }}>
              <div className="h-1.5 rounded-full" style={{ width: `${area.value}%`, backgroundColor: area.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivitySuggestionMockup() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div className="px-4 py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
        <p className="text-xs font-bold" style={{ color: "#333333" }}>Try this at home</p>
      </div>
      <div className="p-4">
        <div className="rounded-xl p-3" style={{ backgroundColor: "#FFF8E8", border: "1px solid #FDE8B0" }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: "white" }} aria-hidden="true">📚</div>
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ color: "#333333" }}>Rhyming game · 5 min</p>
              <p className="text-xs" style={{ color: "#666666" }}>Say a word, take turns finding a rhyme. Great for LL.</p>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#F79863", color: "white" }}>Let&apos;s go →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ParentExperience() {
  return (
    <section id="parents" aria-labelledby="parents-heading" className="py-24" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-5xl mx-auto px-5">

        <AnimateIn>
          <p className="text-sm font-semibold mb-3" style={{ color: "#999999" }}>Parents</p>
          <h2
            id="parents-heading"
            className="font-extrabold mb-10 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#333333", letterSpacing: "-0.03em" }}
          >
            Never miss a milestone.{" "}
            <span style={{ color: "#F79863" }}>Every day.</span>
          </h2>
        </AnimateIn>

        <div className="flex flex-col gap-4">

          {/* Feature 1 — large card, button below text */}
          <AnimateIn delay={0.05}>
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 flex flex-col gap-4">
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: "#999999" }}>Progress feed</p>
                    <p className="font-extrabold leading-tight" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#333333", letterSpacing: "-0.02em" }}>
                      Real-time updates from the classroom.
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    See exactly what your child worked on today, in plain language — no jargon, no waiting for term reports.
                  </p>
                  <div>
                    <ArrowButton href="/parents" label="Explore the progress feed" />
                  </div>
                </div>
                <div className="p-6 lg:p-8" style={{ backgroundColor: "#FEF0E7" }}>
                  <FeedMockup />
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Features 2 + 3 — equal-height small cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">

            <AnimateIn delay={0.08} className="h-full">
              <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}>
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold" style={{ color: "#999999" }}>Milestone view</p>
                    <ArrowButton href="/parents" label="Learn about milestone view" />
                  </div>
                  <p className="font-extrabold leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#333333", letterSpacing: "-0.02em" }}>
                    The full picture of your child&apos;s journey.
                  </p>
                </div>
                <div className="flex-1 px-6 pb-6" style={{ backgroundColor: "#E5F4F1", paddingTop: "1.25rem" }}>
                  <MilestoneMockup />
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.12} className="h-full">
              <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}>
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold" style={{ color: "#999999" }}>At-home activities</p>
                    <ArrowButton href="/parents" label="See at-home activities" />
                  </div>
                  <p className="font-extrabold leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#333333", letterSpacing: "-0.02em" }}>
                    5-minute ideas to try together.
                  </p>
                </div>
                <div className="flex-1 px-6 pb-6" style={{ backgroundColor: "#EAF2FB", paddingTop: "1.25rem" }}>
                  <ActivitySuggestionMockup />
                </div>
              </div>
            </AnimateIn>

          </div>
        </div>

        <AnimateIn delay={0.16}>
          <div className="mt-8 text-center">
            <Link
              href="/parents"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: "#ACD9CD", color: "#1C2B29" }}
            >
              Learn more about the parent experience →
            </Link>
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}
