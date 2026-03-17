"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

const features = [
  "Class dashboard showing every child at a glance",
  "Milestone progress updates automatically as children play",
  "Log a behaviour observation in two taps",
  "Reports pre-drafted from activity and observation data",
];

export default function TeacherExperience() {
  return (
    <section
      id="teachers"
      aria-labelledby="teachers-heading"
      className="py-24"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <AnimateIn>
            <div>
              <p className="text-sm font-semibold mb-4" style={{ color: "#4A9B6F" }}>
                For teachers
              </p>
              <h2
                id="teachers-heading"
                className="font-extrabold mb-5 leading-tight"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  color: "#1A1A1A",
                  letterSpacing: "-0.03em",
                }}
              >
                Less paperwork.{" "}
                <span style={{ color: "#4A9B6F" }}>More time to teach.</span>
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#737373" }}>
                Your dashboard shows each child&apos;s status at a glance. The system is for you, not for monitoring you.
              </p>

              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#4A4A4A" }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                      <circle cx="9" cy="9" r="8" fill="#E8F5EE"/>
                      <path d="M5.5 9l2.5 2.5 5-5" stroke="#4A9B6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/for-teachers"
                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: "#1A1A1A", color: "white" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2D2D2D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A1A1A"; }}
              >
                Explore teacher tools →
              </Link>
            </div>
          </AnimateIn>

          {/* Dashboard mockup */}
          <AnimateIn delay={0.12}>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #E5E5E5", boxShadow: "0 4px 40px rgba(0,0,0,0.06)" }}
            >
              {/* Mockup header */}
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #F0F0F0", backgroundColor: "#FAFAFA" }}>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center text-xs" style={{ backgroundColor: "#4A9B6F" }}>🌱</div>
                  <span className="text-xs font-bold" style={{ color: "#1A1A1A" }}>Teacher Dashboard</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}>Live</span>
              </div>

              {/* Child list */}
              <div className="p-4 space-y-2" style={{ backgroundColor: "#FFFFFF" }}>
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>Caterpillar Class · 23 children</span>
                  <span className="text-xs" style={{ color: "#999" }}>Week 11</span>
                </div>
                {[
                  { name: "Aiden T.", status: "Secure", area: "LL", color: "#4A9B6F", bg: "#E8F5EE" },
                  { name: "Sophia L.", status: "Developing", area: "NUM", color: "#F5A623", bg: "#FFF8E8" },
                  { name: "Marcus H.", status: "Beginning", area: "SED", color: "#E8745A", bg: "#FEF0EC" },
                  { name: "Priya K.", status: "Secure", area: "LL", color: "#4A9B6F", bg: "#E8F5EE" },
                  { name: "Dylan W.", status: "Developing", area: "NUM", color: "#F5A623", bg: "#FFF8E8" },
                ].map((child) => (
                  <div
                    key={child.name}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: "#F8F8F8", border: "1px solid #F0F0F0" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}>
                        {child.name[0]}
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>{child.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: child.bg, color: child.color }}>
                        {child.area} · {child.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick log footer */}
              <div className="flex items-center gap-3 px-4 py-4" style={{ borderTop: "1px solid #F0F0F0", backgroundColor: "#FAFAFA" }}>
                <button
                  className="flex-1 text-xs font-semibold py-2.5 rounded-lg text-center"
                  style={{ backgroundColor: "#4A9B6F", color: "white" }}
                >
                  + Log observation
                </button>
                <button
                  className="flex-1 text-xs font-semibold py-2.5 rounded-lg text-center"
                  style={{ backgroundColor: "#F0F0F0", color: "#4A4A4A" }}
                >
                  View reports
                </button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
