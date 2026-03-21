"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-14"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-5xl mx-auto px-5 pt-20 pb-0 relative text-center">
        {/* Headline */}
        <AnimateIn delay={0.05}>
          <h1
            id="hero-heading"
            className="leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 4.5rem)",
              fontWeight: 900,
              color: "#333333",
              letterSpacing: "-0.03em",
            }}
          >
            Meet every child
            <br />
            <span style={{ color: "#F79863" }}>where they are.</span>
          </h1>
        </AnimateIn>

        {/* Subheadline */}
        <AnimateIn delay={0.1}>
          <p
            className="max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#666666",
              fontWeight: 400,
            }}
          >
            Personalised learning activities, real-time progress updates, and
            way less paperwork — all in one platform built for Singapore's
            preschools.
          </p>
        </AnimateIn>

        {/* CTAs */}
        <AnimateIn delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-base font-semibold px-5 py-3 rounded-full transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: "#F79863", color: "#FFFFFF" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#E06B4A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#F79863";
              }}
            >
              Get started free
            </Link>
          </div>
        </AnimateIn>

        {/* App screenshot mockup */}
        <AnimateIn delay={0.2}>
          <div className="relative">
            {/* Browser chrome */}
            <div
              className="rounded-t-xl overflow-hidden"
              style={{
                border: "1px solid rgba(51,51,51,0.12)",
                borderBottom: "none",
                backgroundColor: "rgba(51,51,51,0.04)",
              }}
            >
              {/* Browser bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(51,51,51,0.08)" }}
              >
                <div className="flex gap-1.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "rgba(51,51,51,0.15)" }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "rgba(51,51,51,0.15)" }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "rgba(51,51,51,0.15)" }}
                  />
                </div>
                <div
                  className="flex-1 mx-4 h-6 rounded-md flex items-center px-3 text-xs"
                  style={{
                    backgroundColor: "rgba(51,51,51,0.06)",
                    color: "rgba(51,51,51,0.4)",
                  }}
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
                <div
                  className="col-span-1 border-r p-4 space-y-1"
                  style={{ borderColor: "#E5EDE7", backgroundColor: "#FFFFFF" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                      style={{ backgroundColor: "#F79863" }}
                    >
                      🌱
                    </div>
                    <span
                      className="text-xs font-bold"
                      style={{ color: "#333333" }}
                    >
                      Nurture
                    </span>
                  </div>
                  {[
                    "Class overview",
                    "Activities",
                    "Observations",
                    "Reports",
                  ].map((item, i) => (
                    <div
                      key={item}
                      className="text-xs px-2 py-1.5 rounded-md"
                      style={{
                        backgroundColor: i === 0 ? "#FEF0E7" : "transparent",
                        color: i === 0 ? "#F79863" : "#666666",
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
                      <p
                        className="text-xs font-bold mb-0.5"
                        style={{ color: "#333333" }}
                      >
                        Caterpillar Class — K2
                      </p>
                      <p className="text-xs" style={{ color: "#888" }}>
                        23 children · Week 11
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ backgroundColor: "#FEF0E7", color: "#F79863" }}
                      >
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
                      <div
                        key={child.name}
                        className="flex items-center gap-3 p-2 rounded-lg"
                        style={{
                          backgroundColor: "white",
                          border: "1px solid #E8EDE8",
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{
                            backgroundColor: "#FEF0E7",
                            color: "#F79863",
                          }}
                        >
                          {child.name[0]}
                        </div>
                        <span
                          className="text-xs font-medium shrink-0"
                          style={{ color: "#333333", width: 68 }}
                        >
                          {child.name}
                        </span>
                        <div className="flex gap-2 flex-1 items-center">
                          {[
                            { label: "LL", value: child.ll, color: "#F5A623" },
                            {
                              label: "NUM",
                              value: child.num,
                              color: "#7BA3D4",
                            },
                            {
                              label: "SED",
                              value: child.sed,
                              color: "#E8745A",
                            },
                          ].map((area) => (
                            <div key={area.label} className="flex-1">
                              <div className="flex justify-between mb-0.5">
                                <span
                                  className="text-xs"
                                  style={{ color: "#999", fontSize: 9 }}
                                >
                                  {area.label}
                                </span>
                                <span
                                  className="text-xs font-semibold"
                                  style={{ color: area.color, fontSize: 9 }}
                                >
                                  {area.value}%
                                </span>
                              </div>
                              <div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: "#F0F0F0" }}
                              >
                                <div
                                  className="h-1.5 rounded-full"
                                  style={{
                                    width: `${area.value}%`,
                                    backgroundColor: area.color,
                                  }}
                                />
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
                background: "linear-gradient(to bottom, transparent, #FFFFFF)",
              }}
              aria-hidden="true"
            />
          </div>
        </AnimateIn>

        {/* Social proof below image */}
        <AnimateIn delay={0.25}>
          <div className="flex flex-col items-center gap-1.5 pb-16">
            <div className="flex items-center gap-0.5" aria-label="5 stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="36"
                  height="36"
                  viewBox="0 0 20 20"
                  fill="#F5A623"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-semibold" style={{ color: "#666666" }}>
              Used by 160+ schools
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
