import { LoopDiagramDesktop, LoopDiagramMobile } from "@/components/icons/LoopDiagram";
import AnimateIn from "@/components/ui/AnimateIn";

const pillars = [
  {
    color: "#F5A623",
    emoji: "🧒",
    title: "For the child",
    body: "Each child gets their own personalised activity queue — based on where they are right now, not where the curriculum says they should be. Activities are designed for 3–6 year olds: short, audio-guided, and genuinely fun. No reading required.",
  },
  {
    color: "#4A9B6F",
    emoji: "👩‍🏫",
    title: "For the teacher",
    body: "The classroom observation you've always done is now connected to a system that tracks it. Milestone progress is recorded as children play. Report time means reviewing a pre-drafted summary — not starting from a blank page.",
  },
  {
    color: "#7BA3D4",
    emoji: "👨‍👩‍👧",
    title: "For the parent",
    body: "Instead of waiting for the next parent-teacher conference, parents get a real-time view of what their child is working on and what it means. For parents who want to help at home, there are simple suggested activities to try together.",
  },
];

export default function Solution() {
  return (
    <section
      id="solution"
      aria-labelledby="solution-heading"
      className="py-24"
      style={{ backgroundColor: "#FFFDF8" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <AnimateIn>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2
              id="solution-heading"
              className="font-extrabold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                color: "#2D3A2E",
                letterSpacing: "-0.02em",
              }}
            >
              Nurture closes the loop between{" "}
              <span style={{ color: "#4A9B6F" }}>classroom, home, and teacher.</span>
            </h2>
            <p style={{ color: "#5C6B5D" }}>
              One continuous data loop — so learning doesn&apos;t stop when the school day does.
            </p>
          </div>
        </AnimateIn>

        {/* Loop diagram */}
        <AnimateIn className="mb-16">
          {/* Desktop diagram */}
          <div className="hidden md:block">
            <LoopDiagramDesktop />
          </div>
          {/* Mobile list */}
          <div className="md:hidden max-w-sm mx-auto">
            <LoopDiagramMobile />
          </div>
        </AnimateIn>

        {/* Three pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 0.1}>
              <div
                className="rounded-2xl p-7 h-full"
                style={{ backgroundColor: p.color + "12", border: `1.5px solid ${p.color}30` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
                  style={{ backgroundColor: p.color + "25" }}
                >
                  {p.emoji}
                </div>
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
