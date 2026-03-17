interface CTAOption {
  icon: string;
  title: string;
  desc: string;
  ctaLabel: string;
  ctaHref: string;
  primary?: boolean;
}

interface PersonaFinalCTAProps {
  headline: string;
  subheadline: string;
  proof?: string;
  options: [CTAOption, CTAOption];
}

export default function PersonaFinalCTA({
  headline,
  subheadline,
  proof,
  options,
}: PersonaFinalCTAProps) {
  return (
    <section className="py-20" style={{ backgroundColor: "#1C2B29" }}>
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2
            className="font-extrabold leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#FFFFFF", letterSpacing: "-0.03em" }}
          >
            {headline}
          </h2>
          <p className="text-base" style={{ color: "rgba(172,217,205,0.8)" }}>{subheadline}</p>
          {proof && (
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>{proof}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {options.map((opt) => (
            <div
              key={opt.title}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ backgroundColor: opt.primary ? "#F79863" : "rgba(172,217,205,0.2)" }}
              >
                {opt.icon}
              </div>
              <p className="font-bold text-white mb-1">{opt.title}</p>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>{opt.desc}</p>
              <a
                href={opt.ctaHref}
                className="block w-full text-center text-sm font-bold py-3 rounded-xl"
                style={
                  opt.primary
                    ? { backgroundColor: "#F79863", color: "white" }
                    : { backgroundColor: "rgba(255,255,255,0.10)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }
                }
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = opt.primary
                    ? "#E06B4A"
                    : "rgba(255,255,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = opt.primary
                    ? "#F79863"
                    : "rgba(255,255,255,0.10)";
                }}
              >
                {opt.ctaLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
