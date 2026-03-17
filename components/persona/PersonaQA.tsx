"use client";

import { useState } from "react";

interface QAItem {
  q: string;
  a: string;
}

function QAAccordionItem({ q, a }: QAItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#E5E5E5" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold pr-8" style={{ color: "#333333" }}>{q}</span>
        <svg
          width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M5 7.5l5 5 5-5" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

interface PersonaQAProps {
  items: QAItem[];
  /** Section background. Default: #FFFFFF */
  bg?: string;
}

export default function PersonaQA({ items, bg = "#FFFFFF" }: PersonaQAProps) {
  return (
    <section className="py-20" style={{ backgroundColor: bg }}>
      <div className="max-w-2xl mx-auto px-5">
        <h2
          className="font-extrabold mb-10"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#333333", letterSpacing: "-0.02em" }}
        >
          Questions &amp; answers
        </h2>
        <div>
          {items.map((item) => (
            <QAAccordionItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
