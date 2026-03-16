import AnimateIn from "@/components/ui/AnimateIn";

const steps = [
  {
    day: "Monday morning.",
    body: "You open your dashboard. Each child's status card shows exactly where they are — no digging through notes from last week. Green, amber, red at a glance.",
    icon: "🌅",
  },
  {
    day: "During the day.",
    body: "You notice Kai waiting patiently for his turn during circle time — something he struggled with last month. You tap his name, tap the milestone, and log it. Five seconds.",
    icon: "✏️",
  },
  {
    day: "At the end of term.",
    body: "The report for each child is already drafted — pulled from the activity data and observation logs. You read it, add the things only you know, and publish it to parents. 15 minutes instead of two hours.",
    icon: "📋",
  },
];

export default function TeacherExperience() {
  return (
    <section
      id="teachers"
      aria-labelledby="teachers-heading"
      className="py-24"
      style={{ backgroundColor: "#FFFDF8" }}
    >
      <div className="max-w-4xl mx-auto px-5">
        <AnimateIn>
          <div className="text-center mb-14">
            <div
              className="inline-flex text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}
            >
              For teachers
            </div>
            <h2
              id="teachers-heading"
              className="font-extrabold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                color: "#2D3A2E",
                letterSpacing: "-0.02em",
              }}
            >
              Less paperwork.{" "}
              <span style={{ color: "#4A9B6F" }}>Same professional judgment.</span>{" "}
              More time to teach.
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#5C6B5D" }}>
              Nurture works with how you already think about children&apos;s development —
              it just takes care of the recording.
            </p>
          </div>
        </AnimateIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-8 bottom-8 w-0.5 hidden sm:block"
            style={{ backgroundColor: "#D8E8DC" }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <AnimateIn key={step.day} delay={i * 0.12}>
                <div className="flex gap-6 sm:gap-8 items-start">
                  {/* Step marker */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 z-10"
                    style={{
                      backgroundColor: "#4A9B6F",
                      boxShadow: "0 0 0 4px #E8F5EE",
                    }}
                    aria-hidden="true"
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 rounded-2xl p-6"
                    style={{
                      backgroundColor: "#FDF6E8",
                      border: "1.5px solid #D8E8DC",
                    }}
                  >
                    <p className="font-bold mb-2" style={{ color: "#2D3A2E" }}>
                      <span style={{ color: "#4A9B6F" }}>{step.day}</span>{" "}
                      {step.body}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Important note */}
        <AnimateIn delay={0.3}>
          <div
            className="mt-10 rounded-2xl px-6 py-5 flex gap-4 items-start"
            style={{ backgroundColor: "#E8F5EE", border: "1.5px solid #A8D9BC" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-sm font-bold"
              style={{ backgroundColor: "#4A9B6F" }}
            >
              i
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#2D3A2E" }}>
              <strong>Nurture does not track teachers&apos; performance.</strong> The dashboard
              is a tool for teachers to understand their students — not for administrators to
              monitor staff. What you see in the system is yours to use in service of your children.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
