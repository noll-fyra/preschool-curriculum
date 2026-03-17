"use client";

import Header from "@/components/sections/Header";
import FooterCTA from "@/components/sections/FooterCTA";
import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const researchBadges = [
  "Harvard EdTech guidelines",
  "Sesame Workshop principles",
  "NEL Framework 2022",
  "Ages 3–6 validated",
];

const canCantDo = {
  cant: [
    "Read text on screen",
    "Navigate a menu or list",
    "Understand levels or scores",
    "Recover from harsh 'wrong' feedback",
    "Sustain more than 5 minutes",
  ],
  can: [
    "Tap large, obvious targets",
    "Follow audio cues reliably",
    "Attach to a familiar character",
    "Sustain 3–5 minutes on one task",
    "Respond to celebration and praise",
  ],
};

const principles = [
  {
    icon: "🔊",
    title: "Audio is primary, visual is secondary.",
    body: "Every instruction is spoken. Every feedback state is announced. The experience is fully operable by a child who cannot read a single word. Text on screen is for parents reading over their shoulder.",
    color: "#F5A623",
    bg: "#FFF8E8",
  },
  {
    icon: "🌟",
    title: "The character is the constant.",
    body: "A friendly character guides every screen — they speak instructions, react to answers, and celebrate completions. Research shows children learn more from a character they feel attached to.",
    color: "#7BA3D4",
    bg: "#F2F7FD",
  },
  {
    icon: "▶️",
    title: "The child never chooses — they proceed.",
    body: "Choice paralysis is real at ages 3–6. The screen shows what's next, not a menu of options. The teacher has made the choice; the child's job is to play.",
    color: "#4A9B6F",
    bg: "#F0FAF5",
  },
  {
    icon: "💚",
    title: "Wrong answers feel like discovery, not failure.",
    body: "No red X, no buzzer. A gentle shake, then the character re-prompts. After two wrong attempts, the correct answer is gently highlighted — the child finds it and still gets a positive response.",
    color: "#E8745A",
    bg: "#FEF0EC",
  },
];

const researchBacked = [
  {
    title: "Specific feedback reinforces learning.",
    body: "'Yes! Banana starts with B!' is far more valuable than 'Great job!' Nurture's character names the concept after every correct answer — so the payoff reflects what was learned.",
  },
  {
    title: "Considerate interactivity.",
    body: "Every interaction directs attention toward the learning content. There are no random hotspots or unrelated reward animations. Celebrations are reserved for correct answers and session completion.",
  },
  {
    title: "Tap-to-select is research-validated.",
    body: "Studies of children aged 3–6 show tap is the only reliable gesture. Large tap targets (80×80px minimum), 3 answer options, and immediate audio — all calibrated to what this age can do.",
  },
  {
    title: "2–4 minute sessions match attention spans.",
    body: "Sustained task attention at ages 3–4 averages 3–5 minutes. Each activity is 3 questions, one clear start and end — so the child finishes feeling proud and wants to come back.",
  },
];

const sessionFlow = [
  {
    step: "1. Queue",
    detail: "Character greets by name. Up to 3 activity tiles; only the next one is tappable. 'My stars' shows earned stickers. Simple, familiar, every time.",
    icon: "🏠",
  },
  {
    step: "2. Activity intro",
    detail: "Character explains what we're doing. One big 'Let's go!' button. Same ritual every time so the child knows what to expect.",
    icon: "🚀",
  },
  {
    step: "3. Three questions",
    detail: "Large scene image, spoken word, 3 large tap targets. Child taps; they hear the answer they chose, then whether it was right. After 2 wrong tries, a hint highlights the correct option.",
    icon: "🎯",
  },
  {
    step: "4. Celebration",
    detail: "Character dances. Three stars (always 3). 'You finished!' A new sticker. No score, no fraction, no comparison — finishing is winning.",
    icon: "🎉",
  },
];

const neverSee = [
  "No progress bars, levels, or scores — at this age they can't interpret them, and visibility risks parental projection onto the child.",
  "No performance-based star ratings — the celebration always shows 3 stars and a sticker for finishing.",
  "No peer comparison. No leaderboards. No 'ahead of' or 'behind'. Ever.",
  "No timer or time pressure — wrong answers get gentle re-prompts, not urgency.",
  "No red X or negative sound — wrong answers use warm coral and encouraging audio.",
];

const faqs = [
  {
    q: "How long is each activity?",
    a: "2–4 minutes. Three questions, one start, one end. Purposeful screen time — and many activities can be done with a parent offline, turning screen time into together time.",
  },
  {
    q: "What if my child gets everything wrong?",
    a: "They still get the same celebration at the end. Accuracy is captured for the teacher; the child never sees it. They always end on a positive response.",
  },
  {
    q: "What does the character look like?",
    a: "A friendly illustrated character who speaks every instruction. They're consistent across every activity so the child builds a bond with them over time.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ForStudentsPage() {
  return (
    <>
      <Header />
      <main id="main">

        {/* ── Hero (dark, AI Agents style) ─────────────────────────────── */}
        <section
          aria-labelledby="for-students-heading"
          className="pt-28 pb-0 relative overflow-hidden"
          style={{ backgroundColor: "#1A2E22" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(74,155,111,0.3) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="max-w-5xl mx-auto px-5 relative text-center">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-8"
                style={{ backgroundColor: "rgba(74,155,111,0.2)", color: "#6BBF8E", border: "1px solid rgba(74,155,111,0.3)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#6BBF8E", display: "inline-block" }} />
                For children aged 3–6
              </div>
            </AnimateIn>

            <AnimateIn delay={0.05}>
              <h1
                id="for-students-heading"
                className="font-extrabold mb-6 leading-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 4rem)", color: "#FFFFFF", letterSpacing: "-0.03em" }}
              >
                Meet your child&apos;s<br />
                <span style={{ color: "#6BBF8E" }}>learning companion.</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <p className="max-w-2xl mx-auto mb-10 leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.65)" }}>
                Short, audio-guided activities designed for ages 3–6. No reading required. The child plays with a friendly character and earns stickers. The learning is real; the test is invisible.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                <Link
                  href="/student"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg"
                  style={{ backgroundColor: "white", color: "#1A1A1A" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F0F0F0"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "white"; }}
                >
                  Try the student experience →
                </Link>
                <a
                  href="#principles"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg"
                  style={{ backgroundColor: "transparent", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.25)" }}
                >
                  See how it works
                </a>
              </div>
            </AnimateIn>

            {/* Research badges */}
            <AnimateIn delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-14">
                {researchBadges.map((badge, i) => (
                  <span key={badge} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {i > 0 && <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "inline-block" }} />}
                    {badge}
                  </span>
                ))}
              </div>
            </AnimateIn>

            {/* Activity mockup */}
            <AnimateIn delay={0.25}>
              <div className="relative mx-auto" style={{ maxWidth: 700 }}>
                <div className="rounded-t-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)", borderBottom: "none" }}>
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex gap-1.5">
                      {["rgba(255,255,255,0.15)","rgba(255,255,255,0.15)","rgba(255,255,255,0.15)"].map((c, i) => (
                        <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="flex-1 mx-4 h-5 rounded flex items-center px-2 text-xs" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>
                      Aiden&apos;s activities
                    </div>
                  </div>
                  {/* Activity UI */}
                  <div style={{ backgroundColor: "#FFFFFF" }}>
                    {/* App header */}
                    <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: "#1A2E22" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4A9B6F" }}>🌱</div>
                        <span className="text-xs font-bold text-white">Aiden&apos;s activities</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i < 3 ? "#F5A623" : "rgba(255,255,255,0.2)"} aria-hidden="true">
                            <path d="M6 1l1.5 3 3.2.5L8.5 5.7l.6 3.3L6 7.5 2.9 9l.6-3.3L1.3 3.5l3.2-.5z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    {/* Active question */}
                    <div className="p-5">
                      <div className="rounded-2xl p-5 text-center mb-4" style={{ backgroundColor: "#FFF8E8", border: "1px solid #FDE8B0" }}>
                        <div className="text-4xl mb-3" aria-hidden="true">🔤</div>
                        <p className="text-sm font-bold mb-3" style={{ color: "#1A1A1A" }}>What sound does this letter make?</p>
                        <div className="text-6xl font-black mb-4" style={{ color: "#F5A623", letterSpacing: "-0.03em" }}>B</div>
                        <div className="flex gap-2 justify-center">
                          {["buh", "puh", "duh"].map((opt, i) => (
                            <div key={opt} className="px-5 py-2.5 rounded-xl text-sm font-bold" style={{
                              backgroundColor: i === 0 ? "#4A9B6F" : "white",
                              color: i === 0 ? "white" : "#1A1A1A",
                              border: `2px solid ${i === 0 ? "#4A9B6F" : "#E5E5E5"}`,
                            }}>
                              {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Queue */}
                      <div className="flex gap-2">
                        {[
                          { label: "Count to 10", color: "#7BA3D4", bg: "#F2F7FD" },
                          { label: "Rhyming words", color: "#F5A623", bg: "#FFF8E8" },
                        ].map((a) => (
                          <div key={a.label} className="flex-1 px-3 py-2 rounded-xl flex items-center gap-2" style={{ backgroundColor: a.bg, border: `1px solid ${a.color}30`, opacity: 0.6 }}>
                            <span className="text-xs font-medium" style={{ color: a.color }}>{a.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Fade */}
                <div className="h-16 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #1A2E22)" }} aria-hidden="true" />
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Quote ────────────────────────────────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#F7F7F5" }}>
          <div className="max-w-3xl mx-auto px-5 text-center">
            <AnimateIn>
              <p className="text-xl font-semibold leading-relaxed mb-6" style={{ color: "#1A1A1A" }}>
                &ldquo;The single job of the child experience: make the child want to open it, feel capable while using it, and feel proud when they close it. Everything else is invisible to the child.&rdquo;
              </p>
              <p className="text-sm font-semibold" style={{ color: "#4A9B6F" }}>Nurture — design principle</p>
            </AnimateIn>
          </div>
        </section>

        {/* ── Built for ages 3–6 ──────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-xl mx-auto">
                <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>Learning that works for every child</p>
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  Designed entirely around<br />what they can do.
                </h2>
                <p className="text-base" style={{ color: "#737373" }}>
                  Preschool children cannot read menus, interpret scores, or tolerate ambiguity. The experience is designed entirely around their actual capabilities.
                </p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <AnimateIn delay={0.05}>
                <div className="rounded-2xl p-7 h-full" style={{ backgroundColor: "#F7F7F5", border: "1px solid #E5E5E5" }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-5" style={{ color: "#9A9A9A" }}>Can&apos;t yet</h3>
                  <ul className="space-y-3">
                    {canCantDo.cant.map((item) => (
                      <li key={item} className="flex gap-3 items-start text-sm" style={{ color: "#737373" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                          <circle cx="8" cy="8" r="7" fill="#F0F0F0"/>
                          <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <div className="rounded-2xl p-7 h-full" style={{ backgroundColor: "#F0FAF5", border: "1px solid #B8DEC8" }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-5" style={{ color: "#4A9B6F" }}>Can</h3>
                  <ul className="space-y-3">
                    {canCantDo.can.map((item) => (
                      <li key={item} className="flex gap-3 items-start text-sm" style={{ color: "#1A1A1A" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                          <circle cx="8" cy="8" r="7" fill="#4A9B6F"/>
                          <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── Five design principles ───────────────────────────────────── */}
        <section id="principles" className="py-24" style={{ backgroundColor: "#F7F7F5" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-xl mx-auto">
                <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>Activities that adapt every session</p>
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  Four design principles.<br />Every one backed by research.
                </h2>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {principles.map((p, i) => (
                <AnimateIn key={p.title} delay={i * 0.08}>
                  <div className="rounded-2xl p-7 h-full" style={{ backgroundColor: p.bg, border: `1px solid ${p.color}25` }}>
                    <div className="text-2xl mb-4" aria-hidden="true">{p.icon}</div>
                    <h3 className="font-bold mb-3 leading-snug" style={{ color: "#1A1A1A" }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{p.body}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Character guides every moment ─────────────────────────── */}
        <section className="py-16" style={{ backgroundColor: "#1A2E22" }}>
          <div className="max-w-4xl mx-auto px-5 text-center">
            <AnimateIn>
              <div className="text-4xl mb-5" aria-hidden="true">🌟</div>
              <p className="text-sm font-semibold mb-4" style={{ color: "#6BBF8E" }}>Your child&apos;s character guides every moment.</p>
              <p className="text-2xl font-extrabold mb-4 text-white" style={{ letterSpacing: "-0.02em" }}>
                Same character, every session.
              </p>
              <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Research shows children learn more from a character they feel attached to. The same character greets them by name, guides them through each activity, and celebrates with them at the end — building a bond that makes them want to return.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* ── Research-backed ───────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-xl mx-auto">
                <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>Research-backed design</p>
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  How it furthers their education.
                </h2>
                <p className="text-base" style={{ color: "#737373" }}>Grounded in Harvard EdTech studies, Sesame Workshop guidelines, and child development research.</p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: "#E5E5E5", border: "1px solid #E5E5E5", borderRadius: 16, overflow: "hidden" }}>
              {researchBacked.map((item, i) => (
                <AnimateIn key={item.title} delay={i * 0.08}>
                  <div className="p-7 h-full" style={{ backgroundColor: "#FFFFFF" }}>
                    <h3 className="font-semibold text-base mb-3" style={{ color: "#1A1A1A" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>{item.body}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Session walkthrough ───────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#F7F7F5" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-xl mx-auto">
                <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>See what a session looks like</p>
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  Queue → intro → questions → celebration.
                </h2>
                <p className="text-base" style={{ color: "#737373" }}>Linear flow. No back-stack, no menus. The child always knows what to do.</p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sessionFlow.map((item, i) => (
                <AnimateIn key={item.step} delay={i * 0.08}>
                  <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}>
                        {i + 1}
                      </div>
                      <span className="text-xl" aria-hidden="true">{item.icon}</span>
                      <h3 className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{item.step}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>{item.detail}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── What children never see ──────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateIn>
                <p className="text-sm font-semibold mb-4" style={{ color: "#4A9B6F" }}>Trusted by parents and teachers</p>
                <h2 className="font-extrabold mb-5 leading-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  What children<br />never see.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "#737373" }}>
                  These omissions are intentional. They protect motivation, self-image, and the joy of learning at this age.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <ul className="space-y-3">
                  {neverSee.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start text-sm p-4 rounded-xl" style={{ backgroundColor: "#F7F7F5", border: "1px solid #EDEDED", color: "#4A4A4A" }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                        <circle cx="9" cy="9" r="8" fill="#E8F5EE"/>
                        <path d="M6 9l2 2 4-4" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#F7F7F5" }}>
          <div className="max-w-3xl mx-auto px-5">
            <AnimateIn>
              <h2 className="font-extrabold mb-10 text-center" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#1A1A1A", letterSpacing: "-0.02em" }}>
                Questions &amp; answers
              </h2>
            </AnimateIn>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <AnimateIn key={i} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}>
                    <p className="font-semibold mb-2" style={{ color: "#1A1A1A" }}>{faq.q}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>{faq.a}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#1A2E22" }}>
          <div className="max-w-5xl mx-auto px-5 text-center">
            <AnimateIn>
              <div className="text-3xl mb-5" aria-hidden="true">🌱</div>
              <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#FFFFFF", letterSpacing: "-0.03em" }}>
                Experience it as<br /><span style={{ color: "#6BBF8E" }}>a child would.</span>
              </h2>
              <p className="text-base mb-8 max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>See the activity queue, answer some questions, earn a sticker.</p>
              <Link
                href="/student"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg"
                style={{ backgroundColor: "white", color: "#1A1A1A" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F0F0F0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "white"; }}
              >
                Open student demo →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
      <FooterCTA />
    </>
  );
}
