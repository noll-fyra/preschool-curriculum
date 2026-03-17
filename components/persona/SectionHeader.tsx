import { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  headline: ReactNode;
}

export default function SectionHeader({ eyebrow, headline }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#F79863" }}>{eyebrow}</p>
      <h2
        className="font-extrabold leading-tight"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#333333", letterSpacing: "-0.03em" }}
      >
        {headline}
      </h2>
    </div>
  );
}
