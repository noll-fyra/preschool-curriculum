import MilestoneCard from "@/components/ui/MilestoneCard";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Milestones() {
  return (
    <section
      id="milestones"
      aria-labelledby="milestones-heading"
      className="py-24"
      style={{ backgroundColor: "#FDF6E8" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Text side */}
          <AnimateIn>
            <div>
              <div
                className="inline-flex text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}
              >
                Singapore NEL Framework 2022
              </div>
              <h2
                id="milestones-heading"
                className="font-extrabold mb-5"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  color: "#2D3A2E",
                  letterSpacing: "-0.02em",
                }}
              >
                Built on Singapore&apos;s NEL Framework —{" "}
                <span style={{ color: "#4A9B6F" }}>structured, but never rigid.</span>
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: "#5C6B5D" }}>
                Nurture&apos;s milestone schema is mapped directly to the Ministry of Education&apos;s
                Nurturing Early Learners (NEL) Framework 2022. Every learning goal is translated into
                observable, sequenced milestones — from{" "}
                <strong style={{ color: "#2D3A2E" }}>Beginning</strong> through{" "}
                <strong style={{ color: "#2D3A2E" }}>Developing</strong> to{" "}
                <strong style={{ color: "#2D3A2E" }}>Secure</strong> — aligned to what children
                should know by the end of Kindergarten 2.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#F5A623", color: "white" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: "#2D3A2E" }}>Skill-based milestones</p>
                    <p className="text-sm" style={{ color: "#5C6B5D" }}>
                      Language & Literacy and Numeracy milestones are tracked automatically through
                      in-app activities. No manual entry needed.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#7BA3D4", color: "white" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: "#2D3A2E" }}>Behaviour-based milestones</p>
                    <p className="text-sm" style={{ color: "#5C6B5D" }}>
                      Social & Emotional Development milestones are logged by teachers as they observe
                      real behaviour — using their professional judgment the way they always have.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#6BBF8E", color: "white" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: "#2D3A2E" }}>Adaptable to your school</p>
                    <p className="text-sm" style={{ color: "#5C6B5D" }}>
                      Schools can adapt the milestone schema to reflect their own curriculum emphasis,
                      ensuring the system fits the school — not the other way around.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Card side */}
          <AnimateIn delay={0.15} className="flex justify-center">
            <div className="relative">
              {/* Decorative circle behind */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #E8F5EE 0%, transparent 65%)",
                  transform: "scale(1.4)",
                }}
                aria-hidden="true"
              />
              <MilestoneCard />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
