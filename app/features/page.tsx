import Header from "@/components/sections/Header";
import FooterCTA from "@/components/sections/FooterCTA";
import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

const FEATURES_BY_PERSONA = [
  {
    persona: "Teachers",
    description: "Tools to track development, assign activities, and communicate with parents.",
    subgroups: [
      {
        name: "Class & roster",
        features: [
          {
            name: "Class roster with status cards",
            description:
              "Dashboard showing each child's current level (Beginning / Developing / Secure) per learning area with colour-coded status at a glance.",
          },
          {
            name: "Learning area filter",
            description:
              "Filter and group children by proficiency in Language & Literacy, Numeracy, or Social & Emotional Development.",
          },
          {
            name: "Student search",
            description:
              "Quick search to find any child by name across classes.",
          },
        ],
      },
      {
        name: "Child profiles",
        features: [
          {
            name: "Child profile with milestone tracker",
            description:
              "Full view per child: every milestone, status (not started / in progress / achieved), and mastery count (e.g. 3/5 observations for SED, 2/3 passing sessions for LL or NUM).",
          },
          {
            name: "Identity and flags",
            description:
              "Name, year level, age, enrolment date, class, and any medical, welfare, or special need flags always visible.",
          },
        ],
      },
      {
        name: "Activity assignment",
        features: [
          {
            name: "Weekly activity assignment",
            description:
              "System pre-selects activities for each child based on their current level. Teachers review the queue and can swap individual activities before the week begins.",
          },
          {
            name: "Assignment week view",
            description:
              "See the full week's activity plan per child and adjust as needed.",
          },
        ],
      },
      {
        name: "Observation & assessment",
        features: [
          {
            name: "Quick-observation logger (SED)",
            description:
              "One-tap logging of an observation against a specific Social & Emotional milestone. Daily uniqueness enforced — five observations across five separate days achieves the milestone.",
          },
          {
            name: "Auto-generated report draft",
            description:
              "Pre-written developmental summary per child from milestone and observation data. Teachers read, add qualitative notes, and approve — no blank-page writing.",
          },
          {
            name: "Report publishing",
            description:
              "Approved reports go to the parent's app directly from the dashboard.",
          },
        ],
      },
      {
        name: "Communication",
        features: [
          {
            name: "Teacher updates",
            description:
              "Share photos, videos, and notes with parents — to the whole class or specific students. Updates appear in the parent Messages tab.",
          },
        ],
      },
    ],
  },
  {
    persona: "Parents",
    description: "Visibility into your child's learning with anxiety-reducing design.",
    subgroups: [
      {
        name: "Home dashboard",
        features: [
          {
            name: "Hero card — emotional headline first",
            description:
              "Warm, plain-language summary of how your child is doing this week before any data. Reassurance before numbers.",
          },
          {
            name: "Learning area cards",
            description:
              "Three cards (Language & Literacy, Numeracy, Social & Emotional) with current level, progress bar, and what they're working on.",
          },
          {
            name: "Activity feed",
            description:
              "Completions, milestone achievements, and teacher notes from the week — with context, not raw scores.",
          },
        ],
      },
      {
        name: "Learning areas & milestones",
        features: [
          {
            name: "Full milestone journey",
            description:
              "Per-area view of achieved, in-progress, and upcoming milestones with plain-language explanations.",
          },
          {
            name: "Why this matters",
            description:
              "Each milestone explains what the skill is and why it matters for Primary 1 readiness.",
          },
          {
            name: "Try at home",
            description:
              "One specific 5-minute suggestion per milestone for parents who want to support learning at home.",
          },
        ],
      },
      {
        name: "Activities",
        features: [
          {
            name: "Personalised activity queue",
            description:
              "Your child's queue — hand the device to them or play together. Updated weekly by the teacher to match where they are.",
          },
        ],
      },
      {
        name: "Messages & reports",
        features: [
          {
            name: "Messages",
            description:
              "Async feed of teacher updates — photos, videos, and notes. Class-wide or tagged to your child.",
          },
          {
            name: "Published reports",
            description:
              "Formal developmental reports approved by the teacher appear as a formatted summary.",
          },
        ],
      },
      {
        name: "P1 readiness",
        features: [
          {
            name: "P1 readiness at a glance",
            description:
              "One-tap view of progress toward skills expected at Primary 1. Calibrating note: \"There's no rush — this is a guide, not a test.\"",
          },
        ],
      },
    ],
  },
  {
    persona: "Children",
    description: "Learning that feels like play — designed for ages 3–6.",
    subgroups: [
      {
        name: "Activity experience",
        features: [
          {
            name: "Personalised activity queue",
            description:
              "2–3 illustrated activity tiles. Only the next one is tappable — no menus, no choice paralysis. The teacher has chosen; the child proceeds.",
          },
          {
            name: "Audio-guided interaction",
            description:
              "Every instruction, prompt, and feedback delivered by audio. No reading required. Fully operable by a child who cannot read.",
          },
          {
            name: "Tap-to-select activities",
            description:
              "20 NEL-aligned activities with 4–5 variants each. Large tap targets (80×80px minimum), 3 answer options. Research-validated for ages 3–6.",
          },
          {
            name: "Wrong answers feel like discovery",
            description:
              "No red X or buzzer. Gentle re-prompt after wrong attempts. After two wrong tries, the correct answer is highlighted — the child always ends on success.",
          },
          {
            name: "Celebration end screen",
            description:
              "Session complete means a celebration animation and sticker — for finishing, not for a score. Accuracy is captured for the teacher; the child never sees it.",
          },
        ],
      },
      {
        name: "Child-friendly design",
        features: [
          {
            name: "Character guide",
            description:
              "A friendly character guides every screen — speaks instructions, reacts to answers, celebrates completions. Same character every time builds attachment.",
          },
          {
            name: "Teacher news feed",
            description:
              "Class updates from the teacher appear as friendly news cards — photos, videos, and notes.",
          },
          {
            name: "My stars",
            description:
              "Stickers earned for completing activities. No scores, levels, or peer comparison.",
          },
        ],
      },
    ],
  },
  {
    persona: "Administrators",
    description: "School setup and curriculum management.",
    subgroups: [
      {
        name: "School setup",
        features: [
          {
            name: "Classes management",
            description:
              "Create and edit classes. Assign term labels and link teachers to classes.",
          },
          {
            name: "Teachers management",
            description:
              "Add and edit teacher accounts. Assign teachers to one or more classes.",
          },
          {
            name: "Students management",
            description:
              "Add and edit student records. Assign children to classes, set enrolment dates, and manage identity and flags.",
          },
        ],
      },
      {
        name: "Curriculum",
        features: [
          {
            name: "Activities library",
            description:
              "View and manage activity configurations. Edit activity content per milestone for customisation.",
          },
        ],
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Hero */}
        <section
          aria-labelledby="features-heading"
          className="pt-28 pb-16"
          style={{ backgroundColor: "#FFFDF8" }}
        >
          <div className="max-w-4xl mx-auto px-5">
            <AnimateIn>
              <div
                className="inline-flex text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}
              >
                Features
              </div>
              <h1
                id="features-heading"
                className="font-extrabold mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  color: "#2D3A2E",
                  letterSpacing: "-0.02em",
                }}
              >
                Everything Nurture can do
              </h1>
              <p
                className="text-lg max-w-2xl"
                style={{ color: "#5C6B5D" }}
              >
                A comprehensive list of features, grouped by who uses them. Each
                feature is designed to close the loop between teacher, child, and
                parent — aligned to the NEL Framework.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Features by persona */}
        <section className="py-12 pb-24" style={{ backgroundColor: "#FFFDF8" }}>
          <div className="max-w-4xl mx-auto px-5">
            {FEATURES_BY_PERSONA.map((persona, personaIdx) => (
              <AnimateIn key={persona.persona} delay={personaIdx * 0.05}>
                <div
                  className="mb-16 last:mb-0"
                  style={{
                    paddingBottom: personaIdx < FEATURES_BY_PERSONA.length - 1 ? 48 : 0,
                    borderBottom:
                      personaIdx < FEATURES_BY_PERSONA.length - 1
                        ? "1px solid #D8E8DC"
                        : "none",
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <h2
                      className="font-extrabold"
                      style={{
                        fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                        color: "#2D3A2E",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {persona.persona}
                    </h2>
                    {persona.persona !== "Administrators" && (
                      <Link
                        href={
                          persona.persona === "Teachers"
                            ? "/for-teachers"
                            : persona.persona === "Parents"
                              ? "/for-parents"
                              : "/for-students"
                        }
                        className="text-sm font-medium"
                        style={{ color: "#4A9B6F" }}
                      >
                        Learn more →
                      </Link>
                    )}
                  </div>
                  <p
                    className="mb-8 text-sm max-w-2xl"
                    style={{ color: "#5C6B5D" }}
                  >
                    {persona.description}
                  </p>

                  <div className="space-y-8">
                    {persona.subgroups.map((subgroup, subIdx) => (
                      <div key={subgroup.name}>
                        <h3
                          className="font-semibold mb-4 text-sm uppercase tracking-wider"
                          style={{ color: "#4A9B6F" }}
                        >
                          {subgroup.name}
                        </h3>
                        <div className="space-y-3">
                          {subgroup.features.map((feature, featIdx) => (
                            <div
                              key={feature.name}
                              className="rounded-xl p-4"
                              style={{
                                backgroundColor: "#FDF6E8",
                                border: "1px solid #D8E8DC",
                              }}
                            >
                              <p
                                className="font-semibold mb-1"
                                style={{
                                  fontSize: 15,
                                  color: "#2D3A2E",
                                }}
                              >
                                {feature.name}
                              </p>
                              <p
                                className="text-sm leading-relaxed"
                                style={{ color: "#5C6B5D" }}
                              >
                                {feature.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20"
          style={{ backgroundColor: "#E8F5EE" }}
        >
          <div className="max-w-4xl mx-auto px-5 text-center">
            <AnimateIn>
              <p
                className="font-semibold mb-4"
                style={{ color: "#2D3A2E" }}
              >
                See it in action
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/teacher/class"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: "#4A9B6F",
                    color: "white",
                  }}
                >
                  Teacher demo →
                </Link>
                <Link
                  href="/parent"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 border-2"
                  style={{
                    borderColor: "#4A9B6F",
                    color: "#4A9B6F",
                  }}
                >
                  Parent demo →
                </Link>
                <Link
                  href="/student"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 border-2"
                  style={{
                    borderColor: "#4A9B6F",
                    color: "#4A9B6F",
                  }}
                >
                  Student demo →
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
      <FooterCTA />
    </>
  );
}
