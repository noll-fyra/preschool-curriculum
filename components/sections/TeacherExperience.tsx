import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

function ArrowIcon() {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: "#333333" }}
      aria-hidden="true"
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
    </div>
  );
}

function DashboardMockup() {
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
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
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
      <div className="p-3 space-y-1.5">
        {children.map((child) => (
          <div
            key={child.name}
            className="flex items-center justify-between px-3 py-2 rounded-lg"
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
    </div>
  );
}

function ObservationMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div className="px-4 py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
        <p className="text-xs font-bold" style={{ color: "#333333" }}>
          Log observation
        </p>
      </div>
      <div className="p-3 space-y-2">
        <div
          className="px-3 py-2 rounded-lg"
          style={{ backgroundColor: "#F8F8F8", border: "1px solid #F0F0F0" }}
        >
          <p className="text-xs font-semibold" style={{ color: "#333333" }}>
            Marcus H.
          </p>
          <p className="text-xs" style={{ color: "#999999" }}>
            SED · Sharing behaviour
          </p>
        </div>
        <div className="flex gap-1.5">
          {["Observed ✓", "Not yet"].map((opt, i) => (
            <div
              key={opt}
              className="flex-1 text-center text-xs font-semibold py-2 rounded-lg"
              style={{
                backgroundColor: i === 0 ? "#F79863" : "#F0F0F0",
                color: i === 0 ? "white" : "#666",
              }}
            >
              {opt}
            </div>
          ))}
        </div>
        <p
          className="text-xs text-center"
          style={{ color: "#999", fontSize: 10 }}
        >
          Saved · 2 of 5 days
        </p>
      </div>
    </div>
  );
}

function ReportMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div className="px-4 py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
        <p className="text-xs font-bold" style={{ color: "#333333" }}>
          Aiden T. — Term report
        </p>
      </div>
      <div className="p-3 space-y-1.5">
        {[
          {
            label: "Language & Literacy",
            status: "Secure",
            color: "#2D7A4F",
            bg: "#E5F4F1",
          },
          {
            label: "Numeracy",
            status: "Developing",
            color: "#7BA3D4",
            bg: "#EAF2FB",
          },
          {
            label: "Social & Emotional",
            status: "Secure",
            color: "#2D7A4F",
            bg: "#E5F4F1",
          },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: "#F8F8F8" }}
          >
            <span className="text-xs" style={{ color: "#333333" }}>
              {row.label}
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: row.bg, color: row.color }}
            >
              {row.status}
            </span>
          </div>
        ))}
        <div className="text-center pt-1">
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: "#F79863", color: "white" }}
          >
            Export PDF
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TeacherExperience() {
  return (
    <section
      id="teachers"
      aria-labelledby="teachers-heading"
      className="py-24"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <AnimateIn>
          <p
            className="text-sm font-semibold mb-3"
            style={{ color: "#999999" }}
          >
            Teachers
          </p>
          <h2
            id="teachers-heading"
            className="font-extrabold mb-10 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#333333",
              letterSpacing: "-0.03em",
            }}
          >
            Less paperwork.{" "}
            <span style={{ color: "#F79863" }}>More time to teach.</span>
          </h2>
        </AnimateIn>

        <div className="flex flex-col gap-4">
          {/* Feature 1 — large card, button below text */}
          <AnimateIn delay={0.05}>
            <Link
              href="/teachers"
              aria-label="Explore the class dashboard"
              className="block rounded-2xl overflow-hidden transition-transform duration-150 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E5E5",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="p-8 flex flex-col gap-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 items-start">
                    <p
                      className="text-sm font-semibold mb-2 col-span-2"
                      style={{ color: "#999999" }}
                    >
                      Class dashboard
                    </p>
                    <p
                      className="font-extrabold leading-tight"
                      style={{
                        fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                        color: "#333333",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Every child's status, at a glance.
                    </p>
                    <div className="pt-1 self-start">
                      <ArrowIcon />
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#666666" }}
                  >
                    Milestone progress updates automatically as children
                    complete activities. No manual entry needed.
                  </p>
                </div>
                <div
                  className="p-6 lg:p-8"
                  style={{ backgroundColor: "#FEF0E7" }}
                >
                  <DashboardMockup />
                </div>
              </div>
            </Link>
          </AnimateIn>

          {/* Features 2 + 3 — equal-height small cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <AnimateIn delay={0.08} className="h-full">
              <Link
                href="/teachers"
                aria-label="Learn about observations"
                className="block rounded-2xl overflow-hidden h-full transition-transform duration-150 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5E5",
                }}
              >
                <div className="h-full flex flex-col">
                  <div className="p-6 flex flex-col gap-3">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 items-start">
                      <p
                        className="text-sm font-semibold col-span-2"
                        style={{ color: "#999999" }}
                      >
                        Observations
                      </p>
                      <p
                        className="font-extrabold leading-tight"
                        style={{
                          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                          color: "#333333",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        Log a behaviour in two taps.
                      </p>
                      <div className="pt-1 self-start">
                        <ArrowIcon />
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex-1 px-6 pb-6"
                    style={{
                      backgroundColor: "#E5F4F1",
                      paddingTop: "1.25rem",
                    }}
                  >
                    <ObservationMockup />
                  </div>
                </div>
              </Link>
            </AnimateIn>

            <AnimateIn delay={0.12} className="h-full">
              <Link
                href="/teachers"
                aria-label="Learn about reports"
                className="block rounded-2xl overflow-hidden h-full transition-transform duration-150 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5E5",
                }}
              >
                <div className="h-full flex flex-col">
                  <div className="p-6 flex flex-col gap-3">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 items-start">
                      <p
                        className="text-sm font-semibold col-span-2"
                        style={{ color: "#999999" }}
                      >
                        Reports
                      </p>
                      <p
                        className="font-extrabold leading-tight"
                        style={{
                          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                          color: "#333333",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        Pre-drafted from real data.
                      </p>
                      <div className="pt-1 self-start">
                        <ArrowIcon />
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex-1 px-6 pb-6"
                    style={{
                      backgroundColor: "#EAF2FB",
                      paddingTop: "1.25rem",
                    }}
                  >
                    <ReportMockup />
                  </div>
                </div>
              </Link>
            </AnimateIn>
          </div>
        </div>

        <AnimateIn delay={0.16}>
          <div className="mt-8 text-center">
            <Link
              href="/teachers"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: "#ACD9CD", color: "#1C2B29" }}
            >
              Learn more about the teacher experience →
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
