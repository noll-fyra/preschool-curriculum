import AnimateIn from "@/components/ui/AnimateIn";

const problems = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        {/* Three same-sized figures */}
        <circle cx="10" cy="12" r="5" fill="#9DAE9E" />
        <ellipse cx="10" cy="26" rx="5" ry="7" fill="#9DAE9E" />
        <circle cx="20" cy="12" r="5" fill="#9DAE9E" />
        <ellipse cx="20" cy="26" rx="5" ry="7" fill="#9DAE9E" />
        <circle cx="30" cy="12" r="5" fill="#9DAE9E" />
        <ellipse cx="30" cy="26" rx="5" ry="7" fill="#9DAE9E" />
        {/* Same lesson board */}
        <rect x="4" y="35" width="32" height="3" rx="1.5" fill="#D8E8DC" />
      </svg>
    ),
    title: "Every child in the same lesson",
    body: "A child who has mastered letter sounds sits through the same phonics lesson as a child just starting out. Neither gets what they need.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        {/* Calendar */}
        <rect x="4" y="8" width="32" height="28" rx="4" fill="#9DAE9E" opacity="0.3" />
        <rect x="4" y="8" width="32" height="10" rx="4" fill="#9DAE9E" />
        <rect x="4" y="14" width="32" height="4" fill="#9DAE9E" />
        {/* Calendar dots */}
        <circle cx="12" cy="26" r="2" fill="#4A9B6F" />
        <rect x="18" y="22" width="14" height="2" rx="1" fill="#D8E8DC" />
        <rect x="18" y="27" width="10" height="2" rx="1" fill="#D8E8DC" />
        {/* Gap indicator */}
        <path d="M8 32 L32 32" stroke="#E8745A" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="32" cy="26" r="2" fill="#E8745A" />
      </svg>
    ),
    title: "Updates every few months",
    body: "Parents find out how their child is doing once or twice a term — too infrequently to support learning at home, too late to catch problems early.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        {/* Stack of papers */}
        <rect x="8" y="18" width="24" height="16" rx="3" fill="#9DAE9E" opacity="0.4" />
        <rect x="6" y="14" width="24" height="16" rx="3" fill="#9DAE9E" opacity="0.6" />
        <rect x="4" y="10" width="24" height="16" rx="3" fill="#9DAE9E" />
        <rect x="8" y="14" width="12" height="2" rx="1" fill="white" opacity="0.7" />
        <rect x="8" y="18" width="8" height="2" rx="1" fill="white" opacity="0.5" />
        {/* Clock overlay */}
        <circle cx="30" cy="28" r="8" fill="#FDF6E8" stroke="#D8E8DC" strokeWidth="1.5" />
        <path d="M30 24 L30 28 L33 28" stroke="#E8745A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Hours on paperwork",
    body: "Teachers spend significant time observing, documenting, and writing reports — time taken directly from teaching and relationship-building.",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="py-24"
      style={{ backgroundColor: "#FDF6E8" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <AnimateIn>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2
              id="problem-heading"
              className="font-extrabold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                color: "#2D3A2E",
                letterSpacing: "-0.02em",
              }}
            >
              Most preschools are still working with{" "}
              <span style={{ color: "#E8745A" }}>one-size-fits-all</span> learning,
              quarterly reports, and manual paperwork.
            </h2>
            <p style={{ color: "#5C6B5D" }}>
              These aren&apos;t new problems. They&apos;re accepted as the way things are.
              They don&apos;t have to be.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 0.1}>
              <div
                className="bg-white rounded-2xl p-7 h-full"
                style={{
                  borderTop: "3px solid #A8D9BC",
                  boxShadow: "0 2px 16px rgba(74, 155, 111, 0.08)",
                }}
              >
                <div className="mb-4">{p.icon}</div>
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: "#2D3A2E" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5C6B5D" }}>
                  {p.body}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
