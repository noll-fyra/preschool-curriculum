import { ReactNode } from "react";

interface FeatureHeroCardProps {
  eyebrow: string;
  headline: string;
  body: string;
  bullets?: string[];
  visual: ReactNode;
  /** Background color for the visual panel. Default: #FEF0E7 */
  visualBg?: string;
  /** Which side the visual panel sits on. Default: "right" */
  visualSide?: "left" | "right";
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" fill="#E5F4F1" />
      <path d="M5 8l2 2 4-4" stroke="#ACD9CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FeatureHeroCard({
  eyebrow,
  headline,
  body,
  bullets,
  visual,
  visualBg = "#FEF0E7",
  visualSide = "right",
}: FeatureHeroCardProps) {
  const textCol = (
    <div className="p-8 md:p-12 flex flex-col justify-center">
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#F79863" }}>{eyebrow}</p>
      <h3
        className="font-extrabold mb-4 leading-tight"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#333333", letterSpacing: "-0.02em" }}
      >
        {headline}
      </h3>
      <p className="text-base mb-6 leading-relaxed" style={{ color: "#666666" }}>{body}</p>
      {bullets && bullets.length > 0 && (
        <ul className="space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: "#666666" }}>
              <CheckIcon />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const visualCol = (
    <div
      className="p-6 flex items-center justify-center"
      style={{ backgroundColor: visualBg }}
    >
      <div className="w-full max-w-sm">{visual}</div>
    </div>
  );

  return (
    <div
      className="rounded-3xl overflow-hidden mb-4"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5", boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {visualSide === "left" ? (
          <>
            {/* Visual first in DOM → left column on desktop, top on mobile */}
            <div className="order-first">{visualCol}</div>
            <div className="order-last">{textCol}</div>
          </>
        ) : (
          <>
            {textCol}
            {visualCol}
          </>
        )}
      </div>
    </div>
  );
}
