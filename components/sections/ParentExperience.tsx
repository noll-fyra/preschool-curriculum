import PhoneMockup from "@/components/ui/PhoneMockup";
import AnimateIn from "@/components/ui/AnimateIn";

export default function ParentExperience() {
  return (
    <section
      id="parents"
      aria-labelledby="parents-heading"
      className="py-24"
      style={{ backgroundColor: "#E8F5EE" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Phone mockup */}
          <AnimateIn className="order-2 md:order-1">
            <PhoneMockup />
          </AnimateIn>

          {/* Text side */}
          <AnimateIn delay={0.12} className="order-1 md:order-2">
            <div>
              <div
                className="inline-flex text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: "#4A9B6F", color: "white" }}
              >
                For parents
              </div>
              <h2
                id="parents-heading"
                className="font-extrabold mb-5"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  color: "#2D3A2E",
                  letterSpacing: "-0.02em",
                }}
              >
                Know what your child is learning.{" "}
                <span style={{ color: "#4A9B6F" }}>Every day.</span>
              </h2>

              <blockquote
                className="text-lg font-semibold leading-relaxed mb-8 pl-4"
                style={{
                  color: "#2D3A2E",
                  borderLeft: "3px solid #4A9B6F",
                }}
              >
                &ldquo;Instead of waiting three months to find out how Rayan is doing,
                you&apos;ll know what he&apos;s working on right now — and what it means
                for Primary 1.&rdquo;
              </blockquote>

              {/* Two mode cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "white", boxShadow: "0 2px 12px rgba(74,155,111,0.10)" }}
                >
                  <div className="text-xl mb-3">⏱️</div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: "#2D3A2E" }}>
                    If you&apos;re busy
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5C6B5D" }}>
                    Nurture works in the background. Your child&apos;s queue is always ready.
                    You don&apos;t have to do anything — but you&apos;ll always know what&apos;s happening.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "white", boxShadow: "0 2px 12px rgba(74,155,111,0.10)" }}
                >
                  <div className="text-xl mb-3">🤝</div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: "#2D3A2E" }}>
                    If you want to help
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5C6B5D" }}>
                    Nurture suggests simple 5-minute activities you can do with your child at home —
                    tied to exactly what they&apos;re learning that week.
                  </p>
                </div>
              </div>

              {/* Screen time note */}
              <div
                className="mt-5 rounded-xl p-4 flex gap-3 items-start text-sm"
                style={{ backgroundColor: "#FFFDF8", border: "1px solid #D8E8DC" }}
              >
                <span className="text-base flex-shrink-0">💬</span>
                <p style={{ color: "#5C6B5D" }}>
                  <strong style={{ color: "#2D3A2E" }}>On screen time:</strong> Activities are
                  2–4 minutes each and purposeful. Many activities are designed so parents can
                  do them with their child offline, turning screen time into together time.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
