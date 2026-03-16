import AnimateIn from "@/components/ui/AnimateIn";
import { LiteracyIcon, NumeracyIcon, SEDIcon } from "@/components/icons/LearningAreaIcons";

const areas = [
  {
    Icon: LiteracyIcon,
    title: "Language & Literacy",
    body: "From recognising their own name to reading simple sentences — Nurture tracks every step of the literacy journey. Knowing that 'fish' starts with an 'f' sound is called phonemic awareness — the key to cracking reading.",
    accent: "#F5A623",
    badge: "Activity-based",
  },
  {
    Icon: NumeracyIcon,
    title: "Numeracy",
    body: "From counting objects to simple addition — milestones aligned to Primary 1 readiness, tracked as children play. One-to-one correspondence (matching one object to one number) is the foundation everything else builds on.",
    accent: "#7BA3D4",
    badge: "Activity-based",
  },
  {
    Icon: SEDIcon,
    title: "Social & Emotional Development",
    body: "Empathy, self-regulation, turn-taking, and emotional literacy — assessed by teachers through observation, not algorithms. These milestones are logged with a tap when you see the behaviour in action.",
    accent: "#E8745A",
    badge: "Teacher-observed",
  },
];

export default function LearningAreas() {
  return (
    <section
      id="learning-areas"
      aria-labelledby="learning-areas-heading"
      className="py-24"
      style={{ backgroundColor: "#FFFDF8" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <AnimateIn>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2
              id="learning-areas-heading"
              className="font-extrabold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                color: "#2D3A2E",
                letterSpacing: "-0.02em",
              }}
            >
              Three areas of learning.{" "}
              <span style={{ color: "#4A9B6F" }}>One continuous picture.</span>
            </h2>
            <p style={{ color: "#5C6B5D" }}>
              Whole-child development — not just academic drilling.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {areas.map((area, i) => (
            <AnimateIn key={area.title} delay={i * 0.1}>
              <div
                className="bg-white rounded-2xl p-7 h-full flex flex-col"
                style={{
                  borderLeft: `4px solid ${area.accent}`,
                  boxShadow: "0 2px 16px rgba(74, 155, 111, 0.08)",
                }}
              >
                <div className="mb-4">
                  <area.Icon />
                </div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-lg" style={{ color: "#2D3A2E" }}>
                    {area.title}
                  </h3>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                    style={{ backgroundColor: area.accent + "18", color: area.accent }}
                  >
                    {area.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#5C6B5D" }}>
                  {area.body}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <p
            className="text-center text-sm italic"
            style={{ color: "#9DAE9E" }}
          >
            More learning areas — including Discovery of the World, Aesthetics &amp; Creative
            Expression, and Motor Skills Development — will be added as the platform grows.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
