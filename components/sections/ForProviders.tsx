import AnimateIn from "@/components/ui/AnimateIn";

export default function ForProviders() {
  return (
    <section
      id="providers"
      aria-labelledby="providers-heading"
      className="py-24"
      style={{ backgroundColor: "#E8F5EE" }}
    >
      <div className="max-w-3xl mx-auto px-5 text-center">
        <AnimateIn>
          <div
            className="inline-flex text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: "#4A9B6F", color: "white" }}
          >
            For education providers
          </div>
          <h2
            id="providers-heading"
            className="font-extrabold mb-5"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              color: "#2D3A2E",
              letterSpacing: "-0.02em",
            }}
          >
            Interested in building something like this{" "}
            <span style={{ color: "#4A9B6F" }}>for your school?</span>
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#5C6B5D" }}>
            Nurture was designed with adaptability in mind. The milestone schema is grounded in the
            NEL Framework but can be extended or modified to reflect any school&apos;s curriculum emphasis,
            pedagogical approach, or learning area priorities. If you&apos;re a preschool director,
            curriculum specialist, or early childhood operator exploring what a structured learning
            platform could look like for your context, we&apos;d like to talk.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <div
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#FFFDF8", color: "#2D3A2E", border: "1.5px solid #D8E8DC" }}
            >
              <span aria-hidden="true">✓</span> NEL Framework aligned
            </div>
            <div
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#FFFDF8", color: "#2D3A2E", border: "1.5px solid #D8E8DC" }}
            >
              <span aria-hidden="true">✓</span> Adaptable milestone schema
            </div>
            <div
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#FFFDF8", color: "#2D3A2E", border: "1.5px solid #D8E8DC" }}
            >
              <span aria-hidden="true">✓</span> Built for Singapore&apos;s preschools
            </div>
          </div>

          <a
            href="mailto:hello@nurture.edu.sg"
            className="inline-flex items-center gap-2 font-bold text-lg transition-all duration-200 hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
            style={{ color: "#4A9B6F" }}
          >
            Get in touch
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10H16M10 4L16 10L10 16" stroke="#4A9B6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}
