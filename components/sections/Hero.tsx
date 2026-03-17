"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-14"
      style={{ backgroundColor: "#1A2E22" }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(74,155,111,0.25) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-5 pt-20 pb-0 relative text-center">
        {/* Badge */}
        <AnimateIn>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-8"
            style={{ backgroundColor: "rgba(74,155,111,0.2)", color: "#6BBF8E", border: "1px solid rgba(74,155,111,0.3)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#6BBF8E", display: "inline-block" }} />
            Aligned to Singapore&apos;s NEL Framework 2022
          </div>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn delay={0.05}>
          <h1
            id="hero-heading"
            className="leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 4.5rem)",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
            }}
          >
            Meet every child<br />
            <span style={{ color: "#6BBF8E" }}>where they are.</span>
          </h1>
        </AnimateIn>

        {/* Subheadline */}
        <AnimateIn delay={0.1}>
          <p
            className="max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(255,255,255,0.65)",
              fontWeight: 400,
            }}
          >
            Personalised learning activities, real-time parent updates, and less admin — all in one platform built for Singapore&apos;s preschools.
          </p>
        </AnimateIn>

        {/* CTAs */}
        <AnimateIn delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="mailto:hello@nurture.edu.sg"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: "white", color: "#1A1A1A" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F0F0F0"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "white"; }}
            >
              Get started free
            </a>
            <a
              href="mailto:hello@nurture.edu.sg"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: "transparent",
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)";
              }}
            >
              Request a demo →
            </a>
          </div>
        </AnimateIn>

        {/* Trust bar */}
        <AnimateIn delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-14">
            {["NEL Framework 2022", "NTUC First Campus", "20,000+ students"].map((item, i) => (
              <span key={item} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.25)", display: "inline-block" }} />}
                {item}
              </span>
            ))}
          </div>
        </AnimateIn>

        {/* App screenshot mockup */}
        <AnimateIn delay={0.25}>
          <div className="relative mx-auto" style={{ maxWidth: 860 }}>
            {/* Browser chrome */}
            <div
              className="rounded-t-xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderBottom: "none",
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
            >
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                </div>
                <div
                  className="flex-1 mx-4 h-6 rounded-md flex items-center px-3 text-xs"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
                >
                  app.nurture.edu.sg
                </div>
              </div>

              {/* App UI */}
              <div
                className="grid grid-cols-4 text-left"
                style={{ minHeight: 340, backgroundColor: "#F8FAF8" }}
              >
                {/* Sidebar */}
                <div className="col-span-1 border-r p-4 space-y-1" style={{ borderColor: "#E5EDE7", backgroundColor: "#FFFFFF" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs" style={{ backgroundColor: "#4A9B6F" }}>🌱</div>
                    <span className="text-xs font-bold" style={{ color: "#1A1A1A" }}>Nurture</span>
                  </div>
                  {["Class overview", "Activities", "Observations", "Reports"].map((item, i) => (
                    <div
                      key={item}
                      className="text-xs px-2 py-1.5 rounded-md"
                      style={{
                        backgroundColor: i === 0 ? "#E8F5EE" : "transparent",
                        color: i === 0 ? "#4A9B6F" : "#5C5C5C",
                        fontWeight: i === 0 ? 600 : 400,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="col-span-3 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs font-bold mb-0.5" style={{ color: "#1A1A1A" }}>Caterpillar Class — K2</p>
                      <p className="text-xs" style={{ color: "#888" }}>23 children · Week 11</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}>
                        Live
                      </div>
                    </div>
                  </div>

                  {/* Child rows */}
                  <div className="space-y-2">
                    {[
                      { name: "Aiden T.", ll: 78, num: 65, sed: 90 },
                      { name: "Sophia L.", ll: 92, num: 88, sed: 72 },
                      { name: "Marcus H.", ll: 45, num: 70, sed: 83 },
                      { name: "Priya K.", ll: 88, num: 55, sed: 95 },
                    ].map((child) => (
                      <div key={child.name} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: "white", border: "1px solid #E8EDE8" }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}>
                          {child.name[0]}
                        </div>
                        <span className="text-xs font-medium shrink-0" style={{ color: "#1A1A1A", width: 68 }}>{child.name}</span>
                        <div className="flex gap-2 flex-1 items-center">
                          {[
                            { label: "LL", value: child.ll, color: "#F5A623" },
                            { label: "NUM", value: child.num, color: "#7BA3D4" },
                            { label: "SED", value: child.sed, color: "#E8745A" },
                          ].map((area) => (
                            <div key={area.label} className="flex-1">
                              <div className="flex justify-between mb-0.5">
                                <span className="text-xs" style={{ color: "#999", fontSize: 9 }}>{area.label}</span>
                                <span className="text-xs font-semibold" style={{ color: area.color, fontSize: 9 }}>{area.value}%</span>
                              </div>
                              <div className="h-1.5 rounded-full" style={{ backgroundColor: "#F0F0F0" }}>
                                <div className="h-1.5 rounded-full" style={{ width: `${area.value}%`, backgroundColor: area.color }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Fade-out at bottom */}
            <div
              className="h-20 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent, #1A2E22)",
              }}
              aria-hidden="true"
            />
          </div>
        </AnimateIn>
      </div>

      {/* Role navigation links below fold */}
      <div style={{ backgroundColor: "#142318" }}>
        <div className="max-w-5xl mx-auto px-5 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "For teachers", href: "/for-teachers" },
              { label: "For parents", href: "/for-parents" },
              { label: "For children", href: "/for-students" },
              { label: "For schools", href: "mailto:hello@nurture.edu.sg" },
            ].map((role) => (
              <Link
                key={role.label}
                href={role.href}
                className="text-sm flex items-center gap-1.5 transition-colors duration-150"
                style={{ color: "rgba(255,255,255,0.5)", fontWeight: 500 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}
              >
                {role.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
