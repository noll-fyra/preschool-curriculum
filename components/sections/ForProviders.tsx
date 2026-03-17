"use client";

import AnimateIn from "@/components/ui/AnimateIn";

const testimonials = [
  {
    quote: "Finally, a platform that respects teachers' professional judgment instead of replacing it. The observation logging alone saves us hours every week.",
    name: "Preschool Director",
    org: "NTUC First Campus, Singapore",
    initial: "P",
  },
  {
    quote: "As a parent, I used to wait until term reports to understand how my child was really doing. Now I know what she worked on today and what it means for her development.",
    name: "Parent",
    org: "K2, Caterpillar Class",
    initial: "S",
  },
];

const badges = [
  "NEL Framework 2022 aligned",
  "Adaptable milestone schema",
  "Built for Singapore's preschools",
  "Skill-based & behaviour-based tracking",
];

export default function ForProviders() {
  return (
    <section
      id="providers"
      aria-labelledby="providers-heading"
      className="py-24"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <AnimateIn>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>
              Trusted by schools that put children first
            </p>
            <h2
              id="providers-heading"
              className="font-extrabold mb-5"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#1A1A1A",
                letterSpacing: "-0.03em",
              }}
            >
              &ldquo;Your AI everything app&rdquo; —{" "}
              <span style={{ color: "#4A9B6F" }}>for preschools.</span>
            </h2>
          </div>
        </AnimateIn>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {testimonials.map((t, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div
                className="p-7 rounded-2xl h-full flex flex-col"
                style={{ backgroundColor: "#F7F7F5", border: "1px solid #E5E5E5" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#F5A623" aria-hidden="true">
                      <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L1.2 5.2l4-.6L7 1z"/>
                    </svg>
                  ))}
                </div>

                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#4A4A4A" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#737373" }}>{t.org}</p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* For school operators */}
        <AnimateIn>
          <div
            className="rounded-2xl p-8 text-center"
            style={{ border: "1px solid #E5E5E5" }}
          >
            <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>For education providers</p>
            <h3 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "#1A1A1A", letterSpacing: "-0.02em" }}>
              Interested in building this for your school?
            </h3>
            <p className="text-base mb-7 max-w-xl mx-auto" style={{ color: "#737373" }}>
              Nurture&apos;s milestone schema is grounded in the NEL Framework but can be extended to reflect any school&apos;s curriculum emphasis. We&apos;d like to talk.
            </p>

            <div className="flex flex-wrap gap-2 justify-center mb-7">
              {badges.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full"
                  style={{ backgroundColor: "#F7F7F5", color: "#4A4A4A", border: "1px solid #E5E5E5" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <circle cx="6" cy="6" r="5.5" fill="#E8F5EE"/>
                    <path d="M3.5 6l1.7 1.7 3.3-3.4" stroke="#4A9B6F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {b}
                </div>
              ))}
            </div>

            <a
              href="mailto:hello@nurture.edu.sg"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-150"
              style={{ backgroundColor: "#1A1A1A", color: "white" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2D2D2D"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A1A1A"; }}
            >
              Get in touch →
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
