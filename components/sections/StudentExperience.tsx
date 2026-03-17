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

function ActivityMockup() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: "#1A2E22" }}>
        <span className="text-xs font-bold text-white">Aiden&apos;s activities</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill={i < 3 ? "#F5A623" : "rgba(255,255,255,0.25)"} aria-hidden="true">
              <path d="M6 1l1.5 3 3.2.5L8.5 6.7l.6 3.3L6 8.5 2.9 10l.6-3.3L1.3 4.5l3.2-.5z" />
            </svg>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#FFF8E8", border: "1px solid #FDE8B0" }}>
          <div className="text-3xl mb-2" aria-hidden="true">🔤</div>
          <p className="text-xs font-semibold mb-2" style={{ color: "#333333" }}>What sound does this letter make?</p>
          <div className="text-4xl font-black mb-3" style={{ color: "#F5A623", letterSpacing: "-0.03em" }}>B</div>
          <div className="flex gap-2 justify-center">
            {["buh", "puh", "duh"].map((opt) => (
              <button key={opt} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ backgroundColor: "white", color: "#333333", border: "2px solid #E5E5E5" }}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AudioMockup() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div className="p-4 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-3" style={{ backgroundColor: "#FEF0E7" }} aria-hidden="true">🐣</div>
        <p className="text-xs font-semibold mb-3" style={{ color: "#333333" }}>&#34;Tap the picture that starts with B!&#34;</p>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 rounded-full flex-1" style={{ backgroundColor: "#E5E5E5" }}>
            <div className="h-1 rounded-full w-2/5" style={{ backgroundColor: "#F79863" }} />
          </div>
          <span className="text-xs shrink-0" style={{ color: "#999999", fontSize: 10 }}>0:08 / 0:22</span>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: "#F79863" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="white" aria-hidden="true"><path d="M4 2.5v7l5.5-3.5L4 2.5z" /></svg>
        </div>
      </div>
    </div>
  );
}

function StickerMockup() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div className="p-4 text-center">
        <p className="text-xs font-semibold mb-3" style={{ color: "#333333" }}>This week&apos;s stickers</p>
        <div className="flex justify-center gap-2 mb-3 flex-wrap">
          {["🌟", "🎉", "🏆", "⭐", "🌈", "🎨"].map((s, i) => (
            <div key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: i < 4 ? "#FFF8E8" : "#F5F5F5", border: "1px solid #F0F0F0", opacity: i < 4 ? 1 : 0.35 }}>
              {i < 4 ? s : "?"}
            </div>
          ))}
        </div>
        <p className="text-xs" style={{ color: "#999999", fontSize: 10 }}>4 of 6 earned this week</p>
      </div>
    </div>
  );
}

export default function StudentExperience() {
  return (
    <section id="students" aria-labelledby="students-heading" className="py-24" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-5xl mx-auto px-5">

        <AnimateIn>
          <p className="text-sm font-semibold mb-3" style={{ color: "#999999" }}>Children</p>
          <h2
            id="students-heading"
            className="font-extrabold mb-10 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#333333", letterSpacing: "-0.03em" }}
          >
            Learning that feels{" "}
            <span style={{ color: "#F79863" }}>like play.</span>
          </h2>
        </AnimateIn>

        <div className="flex flex-col gap-4">

          {/* Feature 1 — large card, button below text */}
          <AnimateIn delay={0.05}>
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 flex flex-col gap-4">
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: "#999999" }}>Activity queue</p>
                    <p className="font-extrabold leading-tight" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#333333", letterSpacing: "-0.02em" }}>
                      Personalised sessions, every day.
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    Each child gets a short queue of tap-to-answer activities matched to their current milestone level. No reading required.
                  </p>
                  <div>
                    <ArrowButton href="/children" label="See the activity queue" />
                  </div>
                </div>
                <div className="p-6 lg:p-8" style={{ backgroundColor: "#FEF0E7" }}>
                  <ActivityMockup />
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
                    <p className="text-sm font-semibold" style={{ color: "#999999" }}>Audio guidance</p>
                    <ArrowButton href="/children" label="Learn about audio guidance" />
                  </div>
                  <p className="font-extrabold leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#333333", letterSpacing: "-0.02em" }}>
                    A friendly voice guides every step.
                  </p>
                </div>
                <div className="flex-1 px-6 pb-6" style={{ backgroundColor: "#E5F4F1", paddingTop: "1.25rem" }}>
                  <AudioMockup />
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.12} className="h-full">
              <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}>
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold" style={{ color: "#999999" }}>Rewards</p>
                    <ArrowButton href="/children" label="Learn about rewards" />
                  </div>
                  <p className="font-extrabold leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#333333", letterSpacing: "-0.02em" }}>
                    Earn stickers, not scores.
                  </p>
                </div>
                <div className="flex-1 px-6 pb-6" style={{ backgroundColor: "#EAF2FB", paddingTop: "1.25rem" }}>
                  <StickerMockup />
                </div>
              </div>
            </AnimateIn>

          </div>
        </div>

        <AnimateIn delay={0.16}>
          <div className="mt-8 text-center">
            <Link
              href="/children"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: "#ACD9CD", color: "#1C2B29" }}
            >
              Learn more about the child experience →
            </Link>
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}
