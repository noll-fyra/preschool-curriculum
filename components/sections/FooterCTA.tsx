"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

export default function FooterCTA() {
  return (
    <footer id="footer" aria-labelledby="footer-cta-heading">
      {/* Main CTA */}
      <section className="py-28" style={{ backgroundColor: "#ACD9CD" }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <AnimateIn>
              <h2
                id="footer-cta-heading"
                className="font-extrabold mb-5"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  color: "#1C2B29",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Ready to bring Nurture
                <br />
                <span style={{ color: "#FFFFFF" }}>to your school?</span>
              </h2>
              <p
                className="text-lg mb-10 leading-relaxed"
                style={{ color: "#2D4A46" }}
              >
                Try the demo, request a walkthrough, or get in touch to discuss
                how Nurture fits your school&apos;s curriculum.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150"
                  style={{ backgroundColor: "#333333", color: "white" }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "#444444";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "#333333";
                  }}
                >
                  Try the demo
                </Link>
                <a
                  href="mailto:hello@nurture.edu.sg"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: "transparent",
                    color: "#1C2B29",
                    border: "1px solid rgba(28,43,41,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "#1C2B29";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(28,43,41,0.35)";
                  }}
                >
                  Get in touch →
                </a>
              </div>
            </AnimateIn>

            {/* Right: role links */}
            <AnimateIn delay={0.1}>
              <div className="space-y-3">
                {[
                  {
                    label: "Teachers",
                    sub: "Dashboard, observations, and pre-drafted reports.",
                    href: "/teachers",
                    color: "#F79863",
                    bg: "#FFFFFF",
                  },
                  {
                    label: "Parents",
                    sub: "Real-time progress feed and at-home activity suggestions.",
                    href: "/parents",
                    color: "#7BA3D4",
                    bg: "#FFFFFF",
                  },
                  {
                    label: "Schools",
                    sub: "Cohort analytics, curriculum alignment, and PDPA-conscious data.",
                    href: "/schools",
                    color: "#4A9B6F",
                    bg: "#FFFFFF",
                  },
                  {
                    label: "Children",
                    sub: "Personalised, audio-guided activities that feel like play.",
                    href: "/children",
                    color: "#F5A623",
                    bg: "#FFFFFF",
                  },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-150"
                    style={{
                      backgroundColor: item.bg,
                      border: "1px solid #E5E5E5",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "#CCCCCC";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "#E5E5E5";
                    }}
                  >
                    <div className="flex-1">
                      <p
                        className="text-sm font-semibold mb-0.5"
                        style={{ color: item.color }}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs" style={{ color: "#999999" }}>
                        {item.sub}
                      </p>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 7h8M8 4l3 3-3 3"
                        stroke="#CCCCCC"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <div
        className="py-5"
        style={{
          backgroundColor: "#1C2B29",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-sm"
              style={{ backgroundColor: "#F79863" }}
              aria-hidden="true"
            >
              🌱
            </div>
            <span className="text-sm font-bold" style={{ color: "#FFFFFF" }}>
              Nurture
            </span>
          </div>
          <p
            className="text-xs text-center"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            A learning platform for Singapore&apos;s preschools · Aligned to NEL
            Framework
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
            Built for NTUC First Campus
          </p>
        </div>
      </div>
    </footer>
  );
}
