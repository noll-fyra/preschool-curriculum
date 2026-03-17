"use client";

import Header from "@/components/sections/Header";
import FooterCTA from "@/components/sections/FooterCTA";
import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const trustLogos = [
  "NEL Framework 2022",
  "NTUC First Campus",
  "20,000+ students",
  "Singapore MOE aligned",
];

const threeQuestions = [
  {
    q: "Is my child okay?",
    sub: "30-second check",
    body: "A warm, plain-language summary at the top of the home screen gives you reassurance before you see any data. You read the headline first — never a raw number.",
    icon: "💚",
    color: "#4A9B6F",
    bg: "#F0FAF5",
  },
  {
    q: "What are they actually working on?",
    sub: "3–5 minute exploration",
    body: "Tap into any learning area to see the full journey: achieved milestones, the one they're working on now, and what's coming next. Every label is in plain language with context.",
    icon: "📚",
    color: "#7BA3D4",
    bg: "#F2F7FD",
  },
  {
    q: "Is there something I should be doing?",
    sub: "The prompted action",
    body: "P1 readiness is one tap away. Teacher notes and activity results show up in your feed with context. You're never left staring at a score without an explanation.",
    icon: "🤝",
    color: "#F5A623",
    bg: "#FFF8E8",
  },
];

const threeRules = [
  {
    title: "Progress is always about your child, never peers.",
    body: "No class averages, no 'ahead of' or 'behind' labels. Every number refers only to what your child has done and where they are on their own journey.",
  },
  {
    title: "Data always comes with context.",
    body: "'Beginning' is explained. '3 of 5 sessions' sits next to what it means. Raw data and plain-language meaning are always shown together.",
  },
  {
    title: "The emotional headline comes first.",
    body: "Every screen leads with a human sentence before any structured data. You read the summary first, then see the details — so numbers are interpreted in context.",
  },
];

const whatYouSee = [
  {
    title: "Home",
    icon: "🏠",
    items: [
      "Hero card: 'This week' summary in warm, specific language",
      "Three learning area cards with level and current focus",
      "Activity feed: completions, milestone achievements, teacher notes",
      "P1 readiness — one tap to see the full picture",
    ],
  },
  {
    title: "Learning areas",
    icon: "📊",
    items: [
      "Full milestone journey per area: achieved, in progress, upcoming",
      "'Why this matters' — what the skill means for P1",
      "'Try at home' — one specific 5-minute suggestion per milestone",
      "Recent activity results so you see consistency, not just one day",
    ],
  },
  {
    title: "Activities",
    icon: "🎯",
    items: [
      "Your child's personalised queue — hand the device to them",
      "Or play together: every activity works as a co-activity",
      "Updated weekly by the teacher to match where they are",
    ],
  },
  {
    title: "Messages",
    icon: "💬",
    items: [
      "Async thread with the class teacher",
      "Warm, specific notes — the kind a good teacher says at pickup",
      "No read receipts — no pressure to respond immediately",
    ],
  },
];

const weDontDo = [
  "No class averages or peer comparison — your child's journey is their own.",
  "No percentage scores — we show fractions (e.g. 2 of 3) with context, not 67%.",
  "No red status indicators — 'Beginning' uses warm coral, not alarm red.",
  "No streak tracking or 'you've missed 3 days' — milestone progress speaks for itself.",
  "No guilt. No urgency. No comparison. Just your child.",
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ForParentsPage() {
  return (
    <>
      <Header />
      <main id="main">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="for-parents-heading"
          className="pt-28 pb-16"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <p className="text-sm font-semibold mb-4" style={{ color: "#4A9B6F" }}>For parents</p>
              <h1
                id="for-parents-heading"
                className="font-extrabold mb-5 leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}
              >
                The dashboard that redefines<br />
                <span style={{ color: "#4A9B6F" }}>staying informed.</span>
              </h1>
              <p className="text-lg mb-8 max-w-xl leading-relaxed" style={{ color: "#737373" }}>
                Your child has entered an institution for the first time. You deserve real visibility into what&apos;s happening — in language that reassures rather than alarms.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/parent"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg"
                  style={{ backgroundColor: "#1A1A1A", color: "white" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2D2D2D"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A1A1A"; }}
                >
                  Try the parent demo →
                </Link>
                <a
                  href="#what-youll-see"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg"
                  style={{ backgroundColor: "transparent", color: "#1A1A1A", border: "1px solid #E5E5E5" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F5F5F5"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}
                >
                  See what&apos;s inside
                </a>
              </div>

              {/* Trust logos */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {trustLogos.map((logo, i) => (
                  <span key={logo} className="flex items-center gap-2 text-xs" style={{ color: "#AAAAAA" }}>
                    {i > 0 && <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "#D5D5D5", display: "inline-block" }} />}
                    {logo}
                  </span>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Phone mockup ─────────────────────────────────────────────── */}
        <section className="pb-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-4xl mx-auto px-5 flex justify-center">
            <AnimateIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                {/* Phone mockup */}
                <div className="max-w-xs mx-auto">
                  <div className="rounded-3xl overflow-hidden" style={{ border: "7px solid #1A1A1A", boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}>
                    {/* Status bar */}
                    <div className="flex justify-between items-center px-4 pt-3 pb-1 bg-white">
                      <span className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>9:41</span>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#E5E5E5" }} />
                    </div>
                    {/* App header */}
                    <div className="px-4 py-3 bg-white" style={{ borderBottom: "1px solid #F0F0F0" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#4A9B6F" }}>🌱</div>
                        <div>
                          <p className="text-xs font-bold leading-none" style={{ color: "#1A1A1A" }}>Aiden&apos;s week</p>
                          <p className="text-xs" style={{ color: "#737373" }}>K2 · Caterpillar Class</p>
                        </div>
                      </div>
                    </div>
                    {/* Hero card */}
                    <div className="px-4 py-3" style={{ backgroundColor: "#F0FAF5", borderBottom: "1px solid #E5E5E5" }}>
                      <p className="text-xs font-semibold mb-1" style={{ color: "#4A9B6F" }}>This week</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#1A1A1A" }}>Aiden completed 4 activities and achieved his Letter Sounds milestone. He&apos;s doing great.</p>
                    </div>
                    {/* Area cards */}
                    <div className="px-4 py-3 space-y-2 bg-white">
                      {[
                        { label: "Language & Literacy", level: "Secure", color: "#4A9B6F", bar: 78 },
                        { label: "Numeracy", level: "Developing", color: "#7BA3D4", bar: 55 },
                        { label: "Social & Emotional", level: "Secure", color: "#E8745A", bar: 90 },
                      ].map((a) => (
                        <div key={a.label} className="p-2.5 rounded-xl" style={{ backgroundColor: "#F8F8F8", border: "1px solid #F0F0F0" }}>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium" style={{ color: "#1A1A1A", fontSize: 10 }}>{a.label}</span>
                            <span className="text-xs font-semibold" style={{ color: a.color, fontSize: 10 }}>{a.level}</span>
                          </div>
                          <div className="h-1 rounded-full" style={{ backgroundColor: "#E5E5E5" }}>
                            <div className="h-1 rounded-full" style={{ width: `${a.bar}%`, backgroundColor: a.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Home indicator */}
                    <div className="flex justify-center py-3 bg-white">
                      <div className="w-20 h-1 rounded-full" style={{ backgroundColor: "#E5E5E5" }} />
                    </div>
                  </div>
                </div>

                {/* Testimonial card */}
                <div>
                  <div className="rounded-2xl p-6 mb-4" style={{ backgroundColor: "#F7F7F5", border: "1px solid #E5E5E5" }}>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#F5A623" aria-hidden="true">
                          <path d="M6 1l1.5 3 3.2.5L8.5 5.7l.6 3.3L6 7.5 2.9 9l.6-3.3L1.3 3.5l3.2-.5z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A4A4A" }}>
                      &ldquo;Instead of waiting three months to find out how Rayan is doing, I know what he&apos;s working on right now — and what it means for Primary 1.&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}>S</div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>Sarah M.</p>
                        <p className="text-xs" style={{ color: "#737373" }}>Parent of K2 student</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: "#1A2E22" }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: "#6BBF8E" }}>P1 readiness</p>
                    <p className="text-sm font-bold mb-2 text-white">Always one tap away.</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Progress toward Primary 1 skills, with a calibrating note: &ldquo;There&apos;s no rush — she has time. This is a guide, not a test.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Three questions ──────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#F7F7F5" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-xl mx-auto">
                <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>Find, check in, act.</p>
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  We craft an experience parents love.
                </h2>
                <p className="text-base" style={{ color: "#737373" }}>
                  The dashboard is built to answer the three questions every parent brings to every session.
                </p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {threeQuestions.map((item, i) => (
                <AnimateIn key={item.q} delay={i * 0.1}>
                  <div className="rounded-2xl p-6 h-full flex flex-col" style={{ backgroundColor: item.bg, border: `1px solid ${item.color}25` }}>
                    <div className="text-2xl mb-4" aria-hidden="true">{item.icon}</div>
                    <p className="text-xs font-semibold mb-2" style={{ color: item.color }}>{item.sub}</p>
                    <h3 className="font-bold mb-3 leading-snug" style={{ color: "#1A1A1A" }}>{item.q}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "#4A4A4A" }}>{item.body}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Waste less time worrying ─────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateIn>
                <p className="text-sm font-semibold mb-4" style={{ color: "#4A9B6F" }}>Designed to reduce anxiety</p>
                <h2 className="font-extrabold mb-5 leading-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  Waste less time worrying.<br />More time connecting.
                </h2>
                <p className="text-base mb-8 leading-relaxed" style={{ color: "#737373" }}>
                  Three rules govern every design decision on the parent dashboard. They protect your peace of mind.
                </p>
                <ul className="space-y-4">
                  {threeRules.map((rule, i) => (
                    <li key={rule.title} className="flex gap-4 items-start">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1" style={{ color: "#1A1A1A" }}>{rule.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>{rule.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </AnimateIn>

              {/* Visual */}
              <AnimateIn delay={0.12}>
                <div className="space-y-3">
                  {/* Feed preview */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E5E5E5", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                    <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: "#FAFAFA", borderBottom: "1px solid #F0F0F0" }}>
                      <span className="text-xs font-bold" style={{ color: "#1A1A1A" }}>Aiden&apos;s feed</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}>Live</span>
                    </div>
                    <div className="px-4 py-3 space-y-3">
                      {[
                        { icon: "🌟", text: "Achieved Letter Sounds milestone", time: "2m ago", color: "#4A9B6F", bg: "#E8F5EE" },
                        { icon: "🔢", text: "Completed Count to 20 activity", time: "Yesterday", color: "#7BA3D4", bg: "#F2F7FD" },
                        { icon: "💬", text: "Teacher note: 'Aiden helped a friend settle in today. Really lovely to see.'", time: "Yesterday", color: "#F5A623", bg: "#FFF8E8" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.bg }}>{item.icon}</div>
                          <div>
                            <p className="text-xs leading-snug" style={{ color: "#1A1A1A" }}>{item.text}</p>
                            <p className="text-xs mt-0.5" style={{ color: "#999", fontSize: 10 }}>{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-center" style={{ color: "#AAAAAA" }}>Real-time feed · Plain language · No raw scores</p>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── What you'll see ──────────────────────────────────────────── */}
        <section id="what-youll-see" className="py-24" style={{ backgroundColor: "#F7F7F5" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-xl mx-auto">
                <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>Simple navigation</p>
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  What you&apos;ll see.
                </h2>
                <p className="text-base" style={{ color: "#737373" }}>
                  Home, Learning Areas, Activities, Messages. No digging through menus.
                </p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: "#E5E5E5", border: "1px solid #E5E5E5", borderRadius: 16, overflow: "hidden" }}>
              {whatYouSee.map((block, i) => (
                <AnimateIn key={block.title} delay={i * 0.07}>
                  <div className="p-7 h-full" style={{ backgroundColor: "#FFFFFF" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl" aria-hidden="true">{block.icon}</span>
                      <h3 className="font-semibold text-base" style={{ color: "#1A1A1A" }}>{block.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm items-start" style={{ color: "#4A4A4A" }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                            <circle cx="8" cy="8" r="7" fill="#E8F5EE"/>
                            <path d="M5 8l2 2 4-4" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

        {/* ── Two ways to use it ───────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-xl mx-auto">
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  Two ways to use it.
                </h2>
                <p className="text-base" style={{ color: "#737373" }}>
                  Both are valid. Neither requires guilt about the other.
                </p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {[
                {
                  icon: "⏱️",
                  title: "If you're busy",
                  body: "Nurture works in the background. Your child's queue is always ready. You don't have to do anything — but you'll always know what's happening.",
                  tag: "Passive mode: progress feed + child's queue only",
                  bg: "#F7F7F5",
                  border: "#E5E5E5",
                },
                {
                  icon: "🤝",
                  title: "If you want to help",
                  body: "Nurture suggests simple 5-minute activities you can do with your child at home — tied to exactly what they're learning that week. No setup, no homework feel.",
                  tag: "Active mode: same as above + co-activity suggestions",
                  bg: "#F0FAF5",
                  border: "#B8DEC8",
                },
              ].map((mode) => (
                <AnimateIn key={mode.title} delay={0.1}>
                  <div className="rounded-2xl p-7 h-full" style={{ backgroundColor: mode.bg, border: `1px solid ${mode.border}` }}>
                    <div className="text-2xl mb-4" aria-hidden="true">{mode.icon}</div>
                    <h3 className="font-bold text-lg mb-3" style={{ color: "#1A1A1A" }}>{mode.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#737373" }}>{mode.body}</p>
                    <p className="text-xs font-medium" style={{ color: "#9A9A9A" }}>{mode.tag}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>

            {/* Screen time note */}
            <AnimateIn delay={0.2}>
              <div className="rounded-2xl p-6 flex gap-4 items-start" style={{ backgroundColor: "#F7F7F5", border: "1px solid #E5E5E5" }}>
                <span className="text-xl shrink-0" aria-hidden="true">💬</span>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#1A1A1A" }}>On screen time</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>
                    Activities are 2–4 minutes each and purposeful. Many are designed so you can do them with your child offline — turning screen time into together time. We never show guilt-inducing streaks or &ldquo;you missed a day&rdquo; messages.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── What we don't do ─────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#1A2E22" }}>
          <div className="max-w-5xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateIn>
                <p className="text-sm font-semibold mb-4" style={{ color: "#6BBF8E" }}>Intentional omissions</p>
                <h2 className="font-extrabold mb-5 leading-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#FFFFFF", letterSpacing: "-0.03em" }}>
                  What we don&apos;t do.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  These omissions are intentional. They protect your peace of mind — and your child&apos;s relationship with learning.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <ul className="space-y-3">
                  {weDontDo.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                        <circle cx="9" cy="9" r="8" fill="rgba(74,155,111,0.2)"/>
                        <path d="M6 9l2 2 4-4" stroke="#6BBF8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5 text-center">
            <AnimateIn>
              <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                Get your parent dashboard<br />up and running.
              </h2>
              <p className="text-base mb-8" style={{ color: "#737373" }}>See the dashboard your child&apos;s teacher will use to keep you informed.</p>
              <Link
                href="/parent"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg"
                style={{ backgroundColor: "#1A1A1A", color: "white" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2D2D2D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A1A1A"; }}
              >
                Open parent demo →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
      <FooterCTA />
    </>
  );
}
