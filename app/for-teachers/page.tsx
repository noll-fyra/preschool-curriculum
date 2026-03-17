"use client";

import Header from "@/components/sections/Header";
import FooterCTA from "@/components/sections/FooterCTA";
import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const quickFeatures = [
  { icon: "📋", label: "Class dashboard" },
  { icon: "✏️", label: "Observation logger" },
  { icon: "📊", label: "Auto-drafted reports" },
  { icon: "👤", label: "Child profiles" },
];

const toolGrid = [
  {
    title: "Class roster with status cards",
    body: "Every child's current level (Beginning / Developing / Secure) per learning area at a glance. Colour-coded. Critical flags visible before you open a profile.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="16" height="14" rx="2.5" stroke="#4A9B6F" strokeWidth="1.5"/>
        <path d="M6 7h8M6 10.5h5" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Child profile with milestone tracker",
    body: "Full view per child: every milestone, its status, and for in-progress — mastery count (e.g. 3/5 observations for SED, 2/3 passing sessions for LL).",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="7" r="3.5" stroke="#4A9B6F" strokeWidth="1.5"/>
        <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Weekly activity assignment",
    body: "The system pre-selects activities for each child based on their current level. Review the queue and swap individual activities before the week begins.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="#4A9B6F" strokeWidth="1.5"/>
        <path d="M7 10l2 2 4-4" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Quick-observation logger",
    body: "One-tap logging of a behaviour against a specific SED milestone. Five observations across five separate days achieves the milestone — no manual counting.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 10a7 7 0 1014 0A7 7 0 003 10z" stroke="#4A9B6F" strokeWidth="1.5"/>
        <path d="M10 6v4l2.5 2.5" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Auto-generated report draft",
    body: "At report time, a pre-written developmental summary per child pulled from milestone and observation data. You read it, add what only you know, and approve.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 3h10v14H5z" rx="1" stroke="#4A9B6F" strokeWidth="1.5"/>
        <path d="M8 7h4M8 10h4M8 13h2" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Report publishing to parents",
    body: "Approved reports go directly to the parent's app from your dashboard. They see the same warm, plain-language summary you've signed off on.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5h14v10H3z" rx="1.5" stroke="#4A9B6F" strokeWidth="1.5"/>
        <path d="M3 5l7 6 7-6" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const profileSections = [
  {
    title: "Who this child is",
    body: "Personality, learning style, emotional cues, what helps them settle, what tends to upset them. The personality snapshot is the most important section — it's the information that takes weeks to accumulate and disappears when a teacher leaves unless you capture it.",
    example: "Curious and methodical — she may seem slow to start but rarely makes mistakes once she begins. Check in proactively when she goes quiet; she won't always ask for help.",
    color: "#F5A623",
    bg: "#FFF8E8",
  },
  {
    title: "Where they are developmentally",
    body: "Structured milestone data: current level per learning area, which milestones are achieved, which are in progress (with mastery counts). A new or substitute teacher needs this to continue the child's journey without regression.",
    example: null,
    color: "#4A9B6F",
    bg: "#F0FAF5",
  },
  {
    title: "What has been tried and what works",
    body: "Operational knowledge — specific strategies that help this child, patterns to watch for, recent context. The difference: 'she is methodical' is who they are; 'give her a 2-minute transition warning' is what works.",
    example: null,
    color: "#7BA3D4",
    bg: "#F2F7FD",
  },
];

const roles = [
  {
    title: "Class teacher",
    body: "Your daily tool. Opens to your class roster, shows you where every child is, and lets you log observations as they happen. Report writing becomes reviewing, not starting from scratch.",
    icon: "👩‍🏫",
  },
  {
    title: "Substitute teacher",
    body: "Every child's profile has what you need before you've met them. Personality, flags, current milestone — a stranger who reads only this page knows enough to serve this child well today.",
    icon: "🤝",
  },
  {
    title: "School director",
    body: "Class-level and school-level views show coverage, milestone distribution, and report status. The oversight you need without the surveillance that undermines trust.",
    icon: "🏫",
  },
];

const dayInLife = [
  {
    time: "Morning",
    icon: "🌅",
    heading: "Open your dashboard.",
    body: "Each child's status card shows exactly where they are — no digging through notes from last week. Green, amber, red at a glance.",
  },
  {
    time: "During the day",
    icon: "✏️",
    heading: "Log in two taps.",
    body: "You notice Kai waiting patiently for his turn during circle time. You tap his name, tap the milestone, and log it. Five seconds.",
  },
  {
    time: "End of term",
    icon: "📋",
    heading: "Review, don't write.",
    body: "The report for each child is already drafted — pulled from activity data and observation logs. You read it, add the things only you know, and publish it. 15 minutes instead of two hours.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ForTeachersPage() {
  return (
    <>
      <Header />
      <main id="main">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="for-teachers-heading"
          className="pt-28 pb-16"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <p className="text-sm font-semibold mb-4" style={{ color: "#4A9B6F" }}>For teachers</p>
              <h1
                id="for-teachers-heading"
                className="font-extrabold mb-5 leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}
              >
                Less paperwork.<br />
                <span style={{ color: "#4A9B6F" }}>Same professional judgment.</span>
              </h1>
              <p className="text-lg mb-8 max-w-xl leading-relaxed" style={{ color: "#737373" }}>
                Nurture works with how you already think about children&apos;s development — it just takes care of the recording. The observation you&apos;ve always done is now connected to a system that tracks it.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  href="/teacher/class"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg"
                  style={{ backgroundColor: "#1A1A1A", color: "white" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2D2D2D"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A1A1A"; }}
                >
                  Try the teacher demo →
                </Link>
                <a
                  href="#tools"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg"
                  style={{ backgroundColor: "transparent", color: "#1A1A1A", border: "1px solid #E5E5E5" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F5F5F5"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}
                >
                  See all tools
                </a>
              </div>

              {/* Quick feature pills */}
              <div className="flex flex-wrap gap-2">
                {quickFeatures.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-full"
                    style={{ backgroundColor: "#F7F7F5", color: "#4A4A4A", border: "1px solid #E5E5E5" }}
                  >
                    <span aria-hidden="true">{f.icon}</span>
                    {f.label}
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Dashboard mockup ─────────────────────────────────────────── */}
        <section className="pb-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid #E5E5E5", boxShadow: "0 8px 48px rgba(0,0,0,0.06)" }}
              >
                {/* Browser bar */}
                <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#FAFAFA", borderBottom: "1px solid #F0F0F0" }}>
                  <div className="flex gap-1.5">
                    {["#F87171","#FBBF24","#34D399"].map((c) => (
                      <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="flex-1 mx-4 h-6 rounded flex items-center px-3 text-xs" style={{ backgroundColor: "#F0F0F0", color: "#999" }}>
                    app.nurture.edu.sg/teacher/class
                  </div>
                </div>

                {/* App layout */}
                <div className="grid grid-cols-5" style={{ backgroundColor: "#F8FAF8", minHeight: 380 }}>
                  {/* Sidebar */}
                  <div className="col-span-1 border-r p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#F0F0F0" }}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs" style={{ backgroundColor: "#4A9B6F" }}>🌱</div>
                      <span className="text-xs font-bold" style={{ color: "#1A1A1A" }}>Nurture</span>
                    </div>
                    {["Class overview","Child profiles","Activities","Observations","Reports"].map((item, i) => (
                      <div key={item} className="text-xs px-2 py-1.5 rounded-md mb-0.5"
                        style={{ backgroundColor: i === 0 ? "#E8F5EE" : "transparent", color: i === 0 ? "#4A9B6F" : "#737373", fontWeight: i === 0 ? 600 : 400 }}>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Main */}
                  <div className="col-span-4 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-bold" style={{ color: "#1A1A1A" }}>Caterpillar Class · K2</p>
                        <p className="text-xs mt-0.5" style={{ color: "#999" }}>23 children · Term 2, Week 11</p>
                      </div>
                      <button className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#4A9B6F", color: "white" }}>+ Log observation</button>
                    </div>

                    {/* Class grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "Aiden T.", ll: "Secure", num: "Developing", sed: "Secure", flag: null },
                        { name: "Sophia L.", ll: "Developing", num: "Secure", sed: "Beginning", flag: null },
                        { name: "Marcus H.", ll: "Beginning", num: "Developing", sed: "Secure", flag: "⚠️" },
                        { name: "Priya K.", ll: "Secure", num: "Beginning", sed: "Developing", flag: null },
                      ].map((child) => (
                        <div key={child.name} className="rounded-xl p-3" style={{ backgroundColor: "white", border: "1px solid #F0F0F0" }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}>
                              {child.name[0]}
                            </div>
                            <span className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>{child.name}</span>
                            {child.flag && <span className="ml-auto text-xs" aria-hidden="true">{child.flag}</span>}
                          </div>
                          <div className="flex gap-1">
                            {[
                              { label: "LL", val: child.ll, color: child.ll === "Secure" ? "#4A9B6F" : child.ll === "Developing" ? "#F5A623" : "#E8745A" },
                              { label: "NUM", val: child.num, color: child.num === "Secure" ? "#4A9B6F" : child.num === "Developing" ? "#F5A623" : "#E8745A" },
                              { label: "SED", val: child.sed, color: child.sed === "Secure" ? "#4A9B6F" : child.sed === "Developing" ? "#F5A623" : "#E8745A" },
                            ].map((a) => (
                              <span key={a.label} className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: a.color + "15", color: a.color, fontSize: 10 }}>
                                {a.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Go way beyond basic reports ──────────────────────────────── */}
        <section id="tools" className="py-24" style={{ backgroundColor: "#F7F7F5" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>Everything you need</p>
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  Go way beyond basic reports.
                </h2>
                <p className="text-lg" style={{ color: "#737373" }}>
                  Six tools built for how teaching actually works — not how admin wishes it worked.
                </p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#E5E5E5", border: "1px solid #E5E5E5", borderRadius: 16, overflow: "hidden" }}>
              {toolGrid.map((item, i) => (
                <AnimateIn key={item.title} delay={i * 0.07}>
                  <div className="p-7 h-full" style={{ backgroundColor: "#FFFFFF" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "#F0FAF5" }}>
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-base mb-2" style={{ color: "#1A1A1A" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>{item.body}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── A day in the life ────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <AnimateIn>
                <p className="text-sm font-semibold mb-4" style={{ color: "#4A9B6F" }}>A day in the life</p>
                <h2 className="font-extrabold mb-5 leading-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  Get your whole class on the same page, instantly.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "#737373" }}>
                  From morning check-in to term-end reporting — Nurture works alongside you, not instead of you.
                </p>
              </AnimateIn>

              <div className="space-y-4">
                {dayInLife.map((item, i) => (
                  <AnimateIn key={item.time} delay={i * 0.1}>
                    <div className="flex gap-4 items-start p-5 rounded-2xl" style={{ backgroundColor: "#F7F7F5", border: "1px solid #EDEDED" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: "white", border: "1px solid #E5E5E5" }} aria-hidden="true">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: "#4A9B6F" }}>{item.time}</p>
                        <p className="text-sm font-bold mb-1" style={{ color: "#1A1A1A" }}>{item.heading}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>{item.body}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Student profile ──────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#F7F7F5" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>Child profiles</p>
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  Store everything you know<br />about every child.
                </h2>
                <p className="text-lg" style={{ color: "#737373" }}>
                  Would a stranger who reads only this page know enough to serve this child well today?
                </p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {profileSections.map((item, i) => (
                <AnimateIn key={item.title} delay={i * 0.1}>
                  <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: item.bg, border: `1px solid ${item.color}30` }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4" style={{ backgroundColor: item.color + "20", color: item.color }}>
                      {i + 1}
                    </div>
                    <h3 className="font-bold mb-3" style={{ color: "#1A1A1A" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A4A4A" }}>{item.body}</p>
                    {item.example && (
                      <div className="p-3 rounded-xl text-xs italic leading-relaxed" style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#5C5C5C", borderLeft: `3px solid ${item.color}` }}>
                        &ldquo;{item.example}&rdquo;
                      </div>
                    )}
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── For every teacher in the room ────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="text-center mb-14 max-w-xl mx-auto">
                <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                  For every teacher in the room.
                </h2>
                <p className="text-base" style={{ color: "#737373" }}>
                  Whether you know the child well or are meeting them for the first time.
                </p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {roles.map((role, i) => (
                <AnimateIn key={role.title} delay={i * 0.1}>
                  <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: "#F7F7F5", border: "1px solid #E5E5E5" }}>
                    <div className="text-2xl mb-4" aria-hidden="true">{role.icon}</div>
                    <h3 className="font-bold mb-3" style={{ color: "#1A1A1A" }}>{role.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>{role.body}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Privacy note ─────────────────────────────────────────────── */}
        <section className="py-10" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5">
            <AnimateIn>
              <div className="rounded-2xl p-7 flex gap-5 items-start" style={{ backgroundColor: "#1A2E22" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white" style={{ backgroundColor: "#4A9B6F" }}>i</div>
                <div>
                  <p className="font-bold mb-2 text-white">Nurture does not track teachers&apos; performance.</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    The dashboard is a tool for teachers to understand their students — not for administrators to monitor staff. What you see in the system is yours to use in service of your children. No one is looking over your shoulder.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-5 text-center">
            <AnimateIn>
              <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                Open your dashboard.
              </h2>
              <p className="text-base mb-8" style={{ color: "#737373" }}>See what a week with Nurture actually looks like.</p>
              <Link
                href="/teacher/class"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg"
                style={{ backgroundColor: "#1A1A1A", color: "white" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2D2D2D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A1A1A"; }}
              >
                Try the teacher demo →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
      <FooterCTA />
    </>
  );
}
