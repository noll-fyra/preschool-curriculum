"use client";

import AnimateIn from "@/components/ui/AnimateIn";

const roles = [
  {
    icon: "👩‍🏫",
    title: "Get started as a teacher",
    desc: "Dashboard, observations, and pre-drafted reports.",
    href: "/for-teachers",
    bg: "#F0FAF5",
    border: "#B8DEC8",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Get started as a parent",
    desc: "Real-time progress feed and at-home activity suggestions.",
    href: "/for-parents",
    bg: "#F2F7FD",
    border: "#B8D4E8",
  },
  {
    icon: "🧒",
    title: "Get started as a child",
    desc: "Personalised, audio-guided activities that feel like play.",
    href: "/for-students",
    bg: "#FFF8E8",
    border: "#FDE8B0",
  },
];

export default function FooterCTA() {
  return (
    <footer id="footer" aria-labelledby="footer-cta-heading">
      {/* Main CTA */}
      <section
        className="py-24"
        style={{ backgroundColor: "#1A2E22" }}
      >
        <div className="max-w-4xl mx-auto px-5 text-center">
          <AnimateIn>
            <p className="text-sm font-semibold mb-4" style={{ color: "#6BBF8E" }}>
              Try for free
            </p>
            <h2
              id="footer-cta-heading"
              className="font-extrabold mb-5"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Nurture is coming soon<br />
              <span style={{ color: "#6BBF8E" }}>to your school.</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              If you&apos;re a parent, you&apos;ll receive more information when the platform launches. If you&apos;re a teacher, your school director will walk you through how it fits your classroom.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-16">
              <a
                href="mailto:hello@nurture.edu.sg"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-150"
                style={{ backgroundColor: "white", color: "#1A1A1A" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F0F0F0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "white"; }}
              >
                Get started free
              </a>
              <a
                href="mailto:hello@nurture.edu.sg"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-150"
                style={{
                  backgroundColor: "transparent",
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
                }}
              >
                Request a demo →
              </a>
            </div>

            {/* Role cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {roles.map((role) => (
                <a
                  key={role.title}
                  href={role.href}
                  className="p-5 rounded-2xl text-left transition-all duration-150 block focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ backgroundColor: role.bg, border: `1px solid ${role.border}` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                >
                  <div className="text-2xl mb-3" aria-hidden="true">{role.icon}</div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#1A1A1A" }}>{role.title}</p>
                  <p className="text-xs" style={{ color: "#737373" }}>{role.desc}</p>
                </a>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Footer bar */}
      <div className="py-5" style={{ backgroundColor: "#111D14", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-sm" style={{ backgroundColor: "#4A9B6F" }} aria-hidden="true">
              🌱
            </div>
            <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>Nurture</span>
          </div>
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
            A learning platform for Singapore&apos;s preschools · Aligned to NEL Framework 2022
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Built for NTUC First Campus
          </p>
        </div>
      </div>
    </footer>
  );
}
