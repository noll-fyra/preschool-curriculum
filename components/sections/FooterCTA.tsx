"use client";

import AnimateIn from "@/components/ui/AnimateIn";

export default function FooterCTA() {
  return (
    <footer
      id="footer"
      aria-labelledby="footer-heading"
      style={{ backgroundColor: "#F5EFE0" }}
    >
      {/* CTA block */}
      <section className="py-20 border-b" style={{ borderColor: "#D8E8DC" }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <AnimateIn>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6"
              style={{ backgroundColor: "#4A9B6F" }}
              aria-hidden="true"
            >
              🌱
            </div>
            <h2
              id="footer-heading"
              className="font-extrabold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                color: "#2D3A2E",
                letterSpacing: "-0.02em",
              }}
            >
              Nurture is coming soon to{" "}
              <span style={{ color: "#4A9B6F" }}>your school.</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "#5C6B5D" }}>
              If you&apos;re a parent, you&apos;ll receive more information when the platform
              launches. If you&apos;re a teacher, your school director will walk you through
              how it fits into your classroom.
            </p>

            {/* Three audience links */}
            <nav aria-label="Audience links">
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="#parents"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: "#4A9B6F",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#3D8860";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#4A9B6F";
                  }}
                >
                  <span>👨‍👩‍👧</span>
                  What to expect as a parent →
                </a>
                <a
                  href="#teachers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: "white",
                    color: "#2D3A2E",
                    border: "1.5px solid #D8E8DC",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FDF6E8";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "white";
                  }}
                >
                  <span>👩‍🏫</span>
                  How Nurture works in the classroom →
                </a>
                <a
                  href="mailto:hello@nurture.edu.sg"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: "white",
                    color: "#2D3A2E",
                    border: "1.5px solid #D8E8DC",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FDF6E8";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "white";
                  }}
                >
                  <span>🏫</span>
                  For education providers: Get in touch →
                </a>
              </div>
            </nav>
          </AnimateIn>
        </div>
      </section>

      {/* Footer bar */}
      <div className="py-6">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ backgroundColor: "#4A9B6F" }}
              aria-hidden="true"
            >
              🌱
            </div>
            <span className="font-bold text-sm" style={{ color: "#2D3A2E" }}>Nurture</span>
          </div>
          <p className="text-xs text-center" style={{ color: "#9DAE9E" }}>
            A learning platform for Singapore&apos;s preschools · Aligned to NEL Framework 2022
          </p>
          <p className="text-xs" style={{ color: "#9DAE9E" }}>
            Built for NTUC First Campus
          </p>
        </div>
      </div>
    </footer>
  );
}
