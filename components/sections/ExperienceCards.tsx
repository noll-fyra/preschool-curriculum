"use client";

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
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

/* ── Teacher dashboard mockup ─────────────────────────── */
function TeacherMockup() {
  const children = [
    {
      name: "Aiden T.",
      status: "Secure",
      area: "LL",
      color: "#2D7A4F",
      bg: "#E5F4F1",
    },
    {
      name: "Sophia L.",
      status: "Developing",
      area: "NUM",
      color: "#7BA3D4",
      bg: "#EAF2FB",
    },
    {
      name: "Marcus H.",
      status: "Beginning",
      area: "SED",
      color: "#E8745A",
      bg: "#FEF0EC",
    },
    {
      name: "Priya K.",
      status: "Secure",
      area: "LL",
      color: "#2D7A4F",
      bg: "#E5F4F1",
    },
  ];
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E5E5",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          borderBottom: "1px solid #F0F0F0",
          backgroundColor: "#FAFAFA",
        }}
      >
        <span className="text-xs font-bold" style={{ color: "#333333" }}>
          Caterpillar Class · 23 children
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "#E5F4F1", color: "#2D7A4F" }}
        >
          Live
        </span>
      </div>
      <div className="p-3 space-y-2">
        {children.map((child) => (
          <div
            key={child.name}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg"
            style={{ backgroundColor: "#F8F8F8", border: "1px solid #F0F0F0" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: child.bg, color: child.color }}
              >
                {child.name[0]}
              </div>
              <span
                className="text-xs font-medium"
                style={{ color: "#333333" }}
              >
                {child.name}
              </span>
            </div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: child.bg, color: child.color }}
            >
              {child.area} · {child.status}
            </span>
          </div>
        ))}
      </div>
      <div
        className="flex gap-2 px-3 py-3"
        style={{ borderTop: "1px solid #F0F0F0" }}
      >
        <div
          className="flex-1 text-xs font-semibold py-2 rounded-lg text-center"
          style={{ backgroundColor: "#F79863", color: "white" }}
        >
          + Log observation
        </div>
        <div
          className="flex-1 text-xs font-semibold py-2 rounded-lg text-center"
          style={{ backgroundColor: "#F0F0F0", color: "#666666" }}
        >
          View reports
        </div>
      </div>
    </div>
  );
}

/* ── Student activity mockup ──────────────────────────── */
function StudentMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E5E5",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "#1A2E22" }}
      >
        <span className="text-xs font-bold text-white">Aiden's activities</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill={i < 3 ? "#F5A623" : "rgba(255,255,255,0.25)"}
              aria-hidden="true"
            >
              <path d="M6 1l1.5 3 3.2.5L8.5 6.7l.6 3.3L6 8.5 2.9 10l.6-3.3L1.3 4.5l3.2-.5z" />
            </svg>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div
          className="rounded-xl p-4 text-center mb-3"
          style={{ backgroundColor: "#FFF8E8", border: "1px solid #FDE8B0" }}
        >
          <div className="text-3xl mb-2" aria-hidden="true">
            🔤
          </div>
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: "#333333" }}
          >
            What sound does this letter make?
          </p>
          <div
            className="text-4xl font-black mb-3"
            style={{ color: "#F5A623", letterSpacing: "-0.03em" }}
          >
            B
          </div>
          <div className="flex gap-2 justify-center">
            {["buh", "puh", "duh"].map((opt) => (
              <button
                key={opt}
                className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  backgroundColor: "white",
                  color: "#333333",
                  border: "2px solid #E5E5E5",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <p
          className="text-xs font-semibold mb-1.5 px-0.5"
          style={{ color: "#999999" }}
        >
          Up next
        </p>
        {[
          {
            emoji: "🔢",
            label: "Count to 10",
            area: "NUM",
            color: "#7BA3D4",
            bg: "#EAF2FB",
          },
          {
            emoji: "🌟",
            label: "Share & take turns",
            area: "SED",
            color: "#E8745A",
            bg: "#FEF0EC",
          },
        ].map((act) => (
          <div
            key={act.label}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1.5"
            style={{
              backgroundColor: act.bg,
              border: `1px solid ${act.color}30`,
            }}
          >
            <span className="text-base" aria-hidden="true">
              {act.emoji}
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: "#333333" }}
            >
              {act.label}
            </span>
            <span
              className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: act.color + "25", color: act.color }}
            >
              {act.area}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Parent feed mockup ───────────────────────────────── */
function ParentMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E5E5",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="px-4 pt-3 pb-3"
        style={{ borderBottom: "1px solid #F0F0F0" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center text-sm"
            style={{ backgroundColor: "#F79863" }}
          >
            🌱
          </div>
          <div>
            <p
              className="text-xs font-bold leading-none"
              style={{ color: "#333333" }}
            >
              Aiden's progress
            </p>
            <p className="text-xs" style={{ color: "#999999" }}>
              K2 · Caterpillar Class
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3" style={{ backgroundColor: "#FAFAFA" }}>
        <p className="text-xs font-semibold mb-2" style={{ color: "#333333" }}>
          This week
        </p>
        {[
          { label: "Language & Literacy", value: 78, color: "#F5A623" },
          { label: "Numeracy", value: 65, color: "#7BA3D4" },
          { label: "Social & Emotional", value: 90, color: "#2D7A4F" },
        ].map((area) => (
          <div key={area.label} className="mb-1.5">
            <div className="flex justify-between mb-0.5">
              <span style={{ color: "#999999", fontSize: 10 }}>
                {area.label}
              </span>
              <span
                className="font-semibold"
                style={{ color: area.color, fontSize: 10 }}
              >
                {area.value}%
              </span>
            </div>
            <div
              className="h-1.5 rounded-full"
              style={{ backgroundColor: "#E5E5E5" }}
            >
              <div
                className="h-1.5 rounded-full"
                style={{ width: `${area.value}%`, backgroundColor: area.color }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 space-y-2">
        <p className="text-xs font-semibold" style={{ color: "#333333" }}>
          Latest updates
        </p>
        {[
          {
            emoji: "🌟",
            text: "Aiden achieved Secure on Letter Sounds",
            time: "2m ago",
            bg: "#E5F4F1",
          },
          {
            emoji: "🔢",
            text: "Aiden completed Count to 20",
            time: "Yesterday",
            bg: "#EAF2FB",
          },
        ].map((u, i) => (
          <div key={i} className="flex gap-2.5 items-start">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
              style={{ backgroundColor: u.bg }}
            >
              {u.emoji}
            </div>
            <div>
              <p className="text-xs leading-snug" style={{ color: "#333333" }}>
                {u.text}
              </p>
              <p style={{ color: "#999999", fontSize: 10 }}>{u.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────── */
export default function ExperienceCards() {
  return (
    <section
      aria-label="Who Nurture is for"
      className="py-24"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col gap-4">
          {/* Teacher — featured wide card */}
          <AnimateIn>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E5E5",
                boxShadow: "0 2px 24px rgba(0,0,0,0.04)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Text */}
                <div className="p-8 lg:p-10 flex flex-col gap-6">
                  <div className="grid grid-cols-[1fr_auto] gap-x-4 items-start">
                    <p
                      className="text-sm font-semibold mb-3"
                      style={{ color: "#999999" }}
                    >
                      Teachers
                    </p>
                    <div aria-hidden="true" />
                    <h2
                      className="font-extrabold leading-tight"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        color: "#333333",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Less paperwork.{" "}
                      <span style={{ color: "#F79863" }}>
                        More time to teach.
                      </span>
                    </h2>
                    <div className="pt-1">
                      <ArrowButton
                        href="/teachers"
                        label="Explore teacher tools"
                      />
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#666666" }}
                  >
                    Your dashboard shows each child's milestone status at a
                    glance. Log a behaviour observation in two taps. Reports are
                    pre-drafted from activity and observation data.
                  </p>
                </div>
                {/* Mockup panel */}
                <div
                  className="p-6 lg:p-8"
                  style={{ backgroundColor: "#FEF0E7" }}
                >
                  <TeacherMockup />
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Children + Parents — two equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student card */}
            <AnimateIn delay={0.06}>
              <div
                className="rounded-2xl overflow-hidden h-full flex flex-col"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5E5",
                  boxShadow: "0 2px 24px rgba(0,0,0,0.04)",
                }}
              >
                <div className="p-6">
                  <div className="grid grid-cols-[1fr_auto] gap-x-4 items-start">
                    <p
                      className="text-sm font-semibold mb-2"
                      style={{ color: "#999999" }}
                    >
                      Children
                    </p>
                    <div aria-hidden="true" />
                    <h2
                      className="font-extrabold leading-tight"
                      style={{
                        fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
                        color: "#333333",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Learning that feels{" "}
                      <span style={{ color: "#F79863" }}>like play.</span>
                    </h2>
                    <div className="pt-1">
                      <ArrowButton
                        href="/children"
                        label="See what children experience"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="flex-1 px-6 pb-6"
                  style={{ backgroundColor: "#E5F4F1", paddingTop: "1.25rem" }}
                >
                  <StudentMockup />
                </div>
              </div>
            </AnimateIn>

            {/* Parent card */}
            <AnimateIn delay={0.12}>
              <div
                className="rounded-2xl overflow-hidden h-full flex flex-col"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5E5",
                  boxShadow: "0 2px 24px rgba(0,0,0,0.04)",
                }}
              >
                <div className="p-6">
                  <div className="grid grid-cols-[1fr_auto] gap-x-4 items-start">
                    <p
                      className="text-sm font-semibold mb-2"
                      style={{ color: "#999999" }}
                    >
                      Parents
                    </p>
                    <div aria-hidden="true" />
                    <h2
                      className="font-extrabold leading-tight"
                      style={{
                        fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
                        color: "#333333",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Never miss a milestone.{" "}
                      <span style={{ color: "#F79863" }}>Every day.</span>
                    </h2>
                    <div className="pt-1">
                      <ArrowButton
                        href="/parents"
                        label="Explore parent experience"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="flex-1 px-6 pb-6"
                  style={{ backgroundColor: "#EAF2FB", paddingTop: "1.25rem" }}
                >
                  <ParentMockup />
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
