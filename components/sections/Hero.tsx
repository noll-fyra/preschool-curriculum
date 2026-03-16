import HeroIllustration from "@/components/icons/HeroIllustration";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ backgroundColor: "#FFFDF8" }}
    >
      {/* Soft background blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #E8F5EE 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FDF6E8 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-1">
            <AnimateIn delay={0}>
              <div
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#4A9B6F" }}
                />
                Aligned to Singapore&apos;s NEL Framework
              </div>
            </AnimateIn>

            <AnimateIn delay={0.08}>
              <h1
                id="hero-heading"
                className="font-extrabold leading-tight mb-5"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "#2D3A2E",
                  letterSpacing: "-0.02em",
                }}
              >
                Every child learns differently.{" "}
                <span style={{ color: "#4A9B6F" }}>
                  Now your school can keep up.
                </span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.16}>
              <p
                className="text-lg leading-relaxed mb-8 max-w-md"
                style={{ color: "#5C6B5D" }}
              >
                Nurture is a learning platform for preschools that adapts to
                each child&apos;s pace, keeps parents in the loop every day,
                and gives teachers their time back.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.24}>
              <div className="flex flex-wrap gap-3">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm-1 10L3.5 7.5l1.41-1.41L7 8.17l4.09-4.09L12.5 5.5 7 11z" fill="#4A9B6F"/>
                  </svg>
                  Personalised for every child
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: "#FDF6E8", color: "#5C6B5D" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm-1 10L3.5 7.5l1.41-1.41L7 8.17l4.09-4.09L12.5 5.5 7 11z" fill="#5C6B5D"/>
                  </svg>
                  Real-time parent updates
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: "#FDF6E8", color: "#5C6B5D" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm-1 10L3.5 7.5l1.41-1.41L7 8.17l4.09-4.09L12.5 5.5 7 11z" fill="#5C6B5D"/>
                  </svg>
                  Less admin for teachers
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* Illustration */}
          <AnimateIn delay={0.1} className="order-2 flex justify-center">
            <HeroIllustration />
          </AnimateIn>
        </div>
      </div>

      {/* Scroll nudge */}
      <div className="flex justify-center pb-10 absolute bottom-0 left-0 right-0">
        <a
          href="#problem"
          className="flex flex-col items-center gap-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
          style={{ color: "#9DAE9E" }}
          aria-label="Scroll down to learn how Nurture works"
        >
          <span>Learn how it works</span>
          <span className="bounce text-xl" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
