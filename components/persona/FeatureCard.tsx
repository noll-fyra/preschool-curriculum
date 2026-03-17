import { ReactNode } from "react";

interface FeatureCardProps {
  eyebrow: string;
  headline: string;
  body?: string;
  visual?: ReactNode;
}

export default function FeatureCard({ eyebrow, headline, body, visual }: FeatureCardProps) {
  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div className="p-7 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#F79863" }}>{eyebrow}</p>
        <h3 className="font-bold text-xl leading-snug mb-2" style={{ color: "#333333", letterSpacing: "-0.02em" }}>
          {headline}
        </h3>
        {body && (
          <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>{body}</p>
        )}
      </div>
      {visual && (
        <div className="px-5 pb-5 mt-auto">{visual}</div>
      )}
    </div>
  );
}
