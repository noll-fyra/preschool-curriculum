"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import Image from "next/image";

const testimonials = [
  {
    quote: "Finally, a platform that respects teachers' professional judgment instead of replacing it. The observation logging alone saves us hours every week.",
    name: "Sarah Lim",
    role: "K2 Teacher",
    org: "My First Skool, Tampines",
    image: "https://www.myfirstskool.com/wp-content/uploads/2025/08/MFS-Sengkang-Shoot-29-May-202400515.webp",
  },
  {
    quote: "I love doing my activities! I got a new sticker today because I know all my letter sounds now.",
    name: "Aiden, age 5",
    role: "Student",
    org: "K1, Caterpillar Class",
    image: "/images/testimonials/aiden.jpg",
  },
  {
    quote: "My son asks to do his activities every evening now. He shows me his stickers and explains what he learnt. I never expected him to be so excited about learning.",
    name: "Wei Ming Tan",
    role: "Parent",
    org: "N2, Butterfly Class",
    image: "https://www.myfirstskool.com/wp-content/uploads/2025/10/MFS-Sumang-June-202502607-cropped-mobile2.jpg",
  },
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
          <h2
            id="providers-heading"
            className="font-extrabold mb-10"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#333333",
              letterSpacing: "-0.03em",
            }}
          >
            Loved by teachers, children and parents.
          </h2>
        </AnimateIn>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {testimonials.map((t, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div
                className="p-7 rounded-2xl h-full flex flex-col"
                style={{ backgroundColor: "#F5F5F5", border: "1px solid #E5E5E5" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#F5A623" aria-hidden="true">
                      <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L1.2 5.2l4-.6L7 1z"/>
                    </svg>
                  ))}
                </div>

                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "#555555" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#333333" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#737373" }}>{t.role} · {t.org}</p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
}
