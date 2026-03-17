import { ReactNode } from "react";

interface PositioningLineProps {
  children: ReactNode;
}

export default function PositioningLine({ children }: PositioningLineProps) {
  return (
    <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-3xl mx-auto px-5 text-center">
        <p
          className="font-extrabold leading-tight"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#333333", letterSpacing: "-0.03em" }}
        >
          {children}
        </p>
      </div>
    </section>
  );
}
