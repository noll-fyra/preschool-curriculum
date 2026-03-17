"use client";

import AnimateIn from "@/components/ui/AnimateIn";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="16" height="14" rx="3" stroke="#4A9B6F" strokeWidth="1.5"/>
        <path d="M6 8h8M6 11h5" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Personalised activity queues",
    body: "Each child gets their own set of activities matched to exactly where they are — not where the curriculum says they should be.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="#4A9B6F" strokeWidth="1.5"/>
        <path d="M10 6v4l2.5 2.5" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Real-time milestone tracking",
    body: "Progress is captured as children play. Teachers see every child's milestone status update instantly — no manual data entry.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5h14M3 10h14M3 15h8" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Pre-drafted progress reports",
    body: "Report time means reviewing a pre-drafted summary, not starting from a blank page. Teachers add context; Nurture handles the data.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 4h12v10H4z" rx="2" stroke="#4A9B6F" strokeWidth="1.5"/>
        <circle cx="10" cy="15.5" r="1" fill="#4A9B6F"/>
        <path d="M7 18h6" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Audio-guided children's activities",
    body: "Short, voiced activities designed for 3–6 year olds. No reading required. Children tap, choose, and play — while the system learns.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L3 7v6l7 5 7-5V7L10 2z" stroke="#4A9B6F" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Parent progress feed",
    body: "Parents see what their child is working on and what it means — in plain language, updated in real time. No more waiting for term reports.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="7" r="3.5" stroke="#4A9B6F" strokeWidth="1.5"/>
        <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Teacher observation logger",
    body: "Log a behaviour-based observation in two taps. Social & emotional milestones are captured with your professional judgment intact.",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="py-24"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <AnimateIn>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>
              The platform
            </p>
            <h2
              id="problem-heading"
              className="font-extrabold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#1A1A1A",
                letterSpacing: "-0.03em",
              }}
            >
              Meet your new learning platform.
            </h2>
            <p className="text-lg" style={{ color: "#737373" }}>
              Automate repetitive work. Personalise every child&apos;s experience. Keep teachers, parents, and children connected.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#E5E5E5", border: "1px solid #E5E5E5", borderRadius: 16, overflow: "hidden" }}>
          {features.map((f, i) => (
            <AnimateIn key={f.title} delay={i * 0.07}>
              <div
                className="p-7 h-full transition-colors duration-150"
                style={{ backgroundColor: "#FFFFFF" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#FAFAFA"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#FFFFFF"; }}
              >
                <div className="mb-4 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F0FAF5" }}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: "#1A1A1A" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>
                  {f.body}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
