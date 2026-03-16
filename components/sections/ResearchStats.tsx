"use client";

import { useEffect, useRef, useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";

const stats = [
  {
    value: 45,
    suffix: "%",
    color: "#E8745A",
    label: "of early childhood educators report high burnout",
    sub: "Administrative load is a leading cause.",
  },
  {
    value: 60,
    suffix: "%+",
    color: "#F5A623",
    label: "of parents want to engage their child in learning at home",
    sub: "But most don't know what to do or whether their effort is aligned to school.",
  },
  {
    value: 3,
    suffix: "×",
    color: "#4A9B6F",
    label: "stronger outcomes with consistent parent-teacher collaboration",
    sub: "Across literacy, numeracy, and social development.",
  },
];

function StatCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;

          // Respect reduced motion
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setCount(value);
            return;
          }

          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span
      ref={ref}
      className="font-extrabold leading-none tracking-tight"
      style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color }}
    >
      {count}{suffix}
    </span>
  );
}

export default function ResearchStats() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="py-24"
      style={{ backgroundColor: "#F5EFE0" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <AnimateIn>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2
              id="research-heading"
              className="font-extrabold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                color: "#2D3A2E",
                letterSpacing: "-0.02em",
              }}
            >
              Why this matters —{" "}
              <span style={{ color: "#4A9B6F" }}>and why now.</span>
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {stats.map((stat, i) => (
            <AnimateIn key={i} delay={i * 0.12}>
              <div className="text-center">
                <div className="mb-3">
                  <StatCounter value={stat.value} suffix={stat.suffix} color={stat.color} />
                </div>
                <p className="font-bold text-sm mb-1.5" style={{ color: "#2D3A2E" }}>
                  {stat.label}
                </p>
                <p className="text-xs" style={{ color: "#9DAE9E" }}>
                  {stat.sub}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div
            className="rounded-2xl p-8 text-center max-w-2xl mx-auto"
            style={{ backgroundColor: "white", boxShadow: "0 2px 16px rgba(74,155,111,0.08)" }}
          >
            <p className="leading-relaxed" style={{ color: "#5C6B5D" }}>
              Nurture was built in direct response to these realities — starting with conversations
              with school directors, teachers, and parents, not with technology looking for a problem.
              The milestone framework, the activity design, and the parent experience were all shaped
              by how preschool education actually works in Singapore.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
