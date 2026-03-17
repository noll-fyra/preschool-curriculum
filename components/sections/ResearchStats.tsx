"use client";

import { useEffect, useRef, useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";

const stats = [
  {
    value: 45,
    suffix: "%",
    label: "of early childhood educators report high burnout",
    sub: "Administrative load is a leading cause.",
  },
  {
    value: 60,
    suffix: "%+",
    label: "of parents want to engage their child in learning at home",
    sub: "But most don't know what to do or whether it aligns to school.",
  },
  {
    value: 3,
    suffix: "×",
    label: "stronger outcomes with consistent parent-teacher collaboration",
    sub: "Across literacy, numeracy, and social development.",
  },
];

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
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
    <span ref={ref} className="font-extrabold leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", color: "#1A1A1A" }}>
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
      style={{ backgroundColor: "#F7F7F5" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <AnimateIn>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-sm font-semibold mb-3" style={{ color: "#4A9B6F" }}>
              Why it matters
            </p>
            <h2
              id="research-heading"
              className="font-extrabold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#1A1A1A",
                letterSpacing: "-0.03em",
              }}
            >
              More outcomes. Less admin.
            </h2>
            <p className="text-lg" style={{ color: "#737373" }}>
              Nurture was built in direct response to real problems — starting with conversations with teachers, parents, and school directors.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-12" style={{ backgroundColor: "#E5E5E5", border: "1px solid #E5E5E5", borderRadius: 16, overflow: "hidden" }}>
          {stats.map((stat, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div className="p-8 text-center" style={{ backgroundColor: "#FFFFFF" }}>
                <div className="mb-3">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: "#1A1A1A" }}>
                  {stat.label}
                </p>
                <p className="text-xs" style={{ color: "#9A9A9A" }}>
                  {stat.sub}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: "#1A2E22", color: "white" }}
          >
            <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
              &ldquo;The milestone framework, the activity design, and the parent experience were all shaped by how preschool education actually works in Singapore — not by technology looking for a problem.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: "#4A9B6F" }}>🌱</div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Nurture</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Built for Singapore&apos;s preschools · Aligned to NEL Framework 2022</p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
