"use client";

import { useEffect, useRef, useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";

const stats = [
  {
    value: 40,
    suffix: "%",
    role: "Teachers",
    label: "less time on admin each week",
    sub: "Automated tracking and pre-drafted reports free teachers to focus on what they do best — teaching.",
    color: "#F79863",
    bg: "#FEF0E7",
  },
  {
    value: 2,
    suffix: "×",
    role: "Children",
    label: "faster milestone progress with personalised activities",
    sub: "Children advance more quickly when activities are matched to exactly where they are developmentally.",
    color: "#F5A623",
    bg: "#FFF8E8",
  },
  {
    value: 3,
    suffix: "×",
    role: "Parents",
    label: "stronger outcomes with consistent home-school connection",
    sub: "When parents are kept in the loop and given simple ways to help, children thrive across all three learning areas.",
    color: "#7BA3D4",
    bg: "#F2F7FD",
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
    <span ref={ref} className="font-extrabold leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", color: "#333333" }}>
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
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <AnimateIn>
          <div className="mb-12">
            <h2
              id="research-heading"
              className="font-extrabold mb-3"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#333333",
                letterSpacing: "-0.03em",
              }}
            >
              Better together.
            </h2>
            <p className="text-lg" style={{ color: "#737373" }}>
              Children thrive when teachers and parents work as one team.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div className="p-8 rounded-2xl h-full flex flex-col" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-5 w-fit" style={{ backgroundColor: stat.bg, color: stat.color }}>
                  {stat.role}
                </span>
                <div className="mb-3">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-semibold mb-2 leading-snug" style={{ color: "#333333" }}>
                  {stat.label}
                </p>
                <p className="text-xs leading-relaxed mt-auto pt-3" style={{ color: "#9A9A9A", borderTop: "1px solid #F0F0F0" }}>
                  {stat.sub}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
