"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

const features = [
  {
    id: "activities",
    title: "Personalised activity queues",
    subtitle: "Each child gets activities matched to exactly where they are, not where the curriculum says they should be.",
    color: "#F79863",
    accentBg: "#FEF0E7",
  },
  {
    id: "tracking",
    title: "Real-time milestone tracking",
    subtitle: "Progress is captured as children play, so teachers never need to enter data manually.",
    color: "#F5A623",
    accentBg: "#FFFBF2",
  },
  {
    id: "reports",
    title: "Pre-drafted progress reports",
    subtitle: "Reports arrive pre-filled and ready to review — not a blank page to fill in.",
    color: "#7BA3D4",
    accentBg: "#F2F7FD",
  },
  {
    id: "audio",
    title: "Audio-guided children's activities",
    subtitle: "Short, voiced activities for ages 3–6 that require no reading — children tap, choose, and play.",
    color: "#E8745A",
    accentBg: "#FDF3F1",
  },
  {
    id: "parents",
    title: "Parent progress feed",
    subtitle: "Parents see what their child is working on in plain language, updated in real time.",
    color: "#F79863",
    accentBg: "#FEF0E7",
  },
  {
    id: "observations",
    title: "Teacher observation logger",
    subtitle: "Log a behaviour-based observation in two taps, keeping your professional judgment intact.",
    color: "#F5A623",
    accentBg: "#FFFBF2",
  },
];

function FeaturePlaceholder({ feature }: { feature: typeof features[0] }) {
  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: feature.accentBg,
        border: `1px solid ${feature.color}25`,
        minHeight: 400,
      }}
    >
      {/* Browser bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{ borderBottom: `1px solid ${feature.color}15`, backgroundColor: "white" }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E0E0E0" }} />
          ))}
        </div>
        <div
          className="flex-1 mx-3 h-5 rounded flex items-center px-2.5 text-xs"
          style={{ backgroundColor: "#F4F4F4", color: "#999" }}
        >
          app.nurture.edu.sg
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-1">
          <div className="h-4 rounded-full w-40" style={{ backgroundColor: `${feature.color}25` }} />
          <div className="h-7 rounded-lg w-20" style={{ backgroundColor: `${feature.color}18` }} />
        </div>

        {[88, 72, 80, 60, 75].map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: "white", border: `1px solid ${feature.color}12` }}
          >
            <div className="w-7 h-7 rounded-full shrink-0" style={{ backgroundColor: `${feature.color}18` }} />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 rounded-full" style={{ width: `${w}%`, backgroundColor: `${feature.color}22` }} />
              <div className="h-2 rounded-full" style={{ width: `${w * 0.55}%`, backgroundColor: "#EBEBEB" }} />
            </div>
            <div className="w-14 h-2 rounded-full" style={{ backgroundColor: `${feature.color}18` }} />
          </div>
        ))}
      </div>

      <div className="px-6 pb-5 shrink-0">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: feature.color, display: "inline-block" }} />
          {feature.title}
        </span>
      </div>
    </div>
  );
}

type RoleCardData = { label: string; href: string; dark: boolean; icon: ReactNode };

function RoleCard({ card }: { card: RoleCardData }) {
  const [hovered, setHovered] = useState(false);
  const isExternal = card.href.startsWith("mailto:");

  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-5 flex flex-col justify-between h-full transition-shadow duration-200"
      style={{
        backgroundColor: card.dark ? "#1C2B29" : "#FFFFFF",
        border: card.dark ? "none" : "1px solid #E8E8E8",
        minHeight: 150,
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
        cursor: "pointer",
      }}
    >
      <div className="mb-4">{card.icon}</div>
      <p
        className="font-extrabold leading-snug"
        style={{ fontSize: "1rem", color: card.dark ? "#FFFFFF" : "#333333" }}
      >
        {card.label} →
      </p>
    </div>
  );

  if (isExternal) {
    return <a href={card.href} className="block">{inner}</a>;
  }
  return <Link href={card.href} className="block">{inner}</Link>;
}

export default function Problem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = features[activeIndex];

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="py-24"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="max-w-5xl mx-auto px-5">

        {/* Headline above feature box */}
        <AnimateIn>
          <h2
            id="problem-heading"
            className="font-extrabold mb-3"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#333333",
              letterSpacing: "-0.03em",
            }}
          >
            Meet your new learning platform.
          </h2>
          <p className="text-lg mb-10" style={{ color: "#737373" }}>
            Automate repetitive work. Personalise every child&apos;s experience. Keep teachers, parents, and children connected.
          </p>
        </AnimateIn>

        {/* White feature box */}
        <AnimateIn delay={0.05}>
        <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>

          {/* Mobile: image + dots on top */}
          <div className="md:hidden mb-6">
            <FeaturePlaceholder feature={active} />
            <div className="flex items-center justify-center gap-2 mt-4">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Select feature ${i + 1}`}
                  className="transition-all duration-200"
                  style={{
                    width: i === activeIndex ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: i === activeIndex ? active.color : "#D0D0D0",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Left: feature list */}
            <div>
            <AnimateIn delay={0.05}>
              <ul role="list">
                {features.map((feature, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={feature.id}>
                      {i > 0 && <div style={{ height: 1, backgroundColor: "#EBEBEB" }} />}
                      <button
                        onClick={() => setActiveIndex(i)}
                        className="w-full text-left py-4 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                        aria-pressed={isActive}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: `${feature.color}20` }}
                          >
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: feature.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-bold leading-snug"
                              style={{ fontSize: "0.9375rem", color: isActive ? "#333333" : "#666666" }}
                            >
                              {feature.title}
                            </p>
                            {isActive && (
                              <p className="text-sm mt-1 leading-snug" style={{ color: "#737373" }}>
                                {feature.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </AnimateIn>
            </div>

            {/* Right: image — hidden on mobile */}
            <div className="hidden md:block">
              <FeaturePlaceholder feature={active} />
            </div>
          </div>

        </div>
        </AnimateIn>

        {/* Role cards */}
        <AnimateIn delay={0.1}>
          <p className="text-sm font-semibold mt-10 mb-3" style={{ color: "#737373" }}>
            See how Nurture helps you succeed
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              {
                label: "Teachers",
                href: "/teachers",
                dark: false,
                icon: (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                    <rect width="44" height="44" rx="22" fill="#FEF0E7"/>
                    <path d="M14 16h16M14 21h11M22 30l5-3h3a1.5 1.5 0 001.5-1.5V16A1.5 1.5 0 0030 14.5H14A1.5 1.5 0 0012.5 16v9.5A1.5 1.5 0 0014 27h2" stroke="#F79863" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                label: "Children",
                href: "/children",
                dark: false,
                icon: (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                    <rect width="44" height="44" rx="22" fill="#FFF3D0"/>
                    <path d="M22 13l2.5 6H30l-4.5 3.5 1.5 6L22 25l-5 3.5 1.5-6L14 19h5.5L22 13z" stroke="#F5A623" strokeWidth="1.75" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                label: "Parents",
                href: "/parents",
                dark: false,
                icon: (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                    <rect width="44" height="44" rx="22" fill="#FDE8D8"/>
                    <path d="M22 21a4 4 0 100-8 4 4 0 000 8zM13 33c0-4.418 4.03-8 9-8s9 3.582 9 8" stroke="#E8745A" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                label: "For schools",
                href: "mailto:hello@nurture.edu.sg",
                dark: false,
                icon: (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                    <rect width="44" height="44" rx="22" fill="#EEF3FB"/>
                    <path d="M13 32V21l9-7 9 7v11M18 32v-6h8v6" stroke="#7BA3D4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                label: "Try demo",
                href: "/teachers",
                dark: true,
                icon: (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                    <rect width="44" height="44" rx="22" fill="rgba(255,255,255,0.12)"/>
                    <path d="M19 15l10 7-10 7V15z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map((card) => (
              <RoleCard key={card.label} card={card} />
            ))}
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}
