interface EcosystemItem {
  icon: string;
  name: string;
  desc: string;
  iconBg: string;
}

interface EcosystemGridProps {
  headline: string;
  items: [EcosystemItem, EcosystemItem, EcosystemItem, EcosystemItem, EcosystemItem, EcosystemItem];
  /** Section background. Default: #FFFFFF */
  bg?: string;
}

export default function EcosystemGrid({ headline, items, bg = "#FFFFFF" }: EcosystemGridProps) {
  return (
    <section className="py-20" style={{ backgroundColor: bg }}>
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2
            className="font-extrabold leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#333333", letterSpacing: "-0.03em" }}
          >
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl p-5"
              style={{ backgroundColor: "#FAFAFA", border: "1px solid #E5E5E5" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ backgroundColor: item.iconBg }}
              >
                {item.icon}
              </div>
              <p className="font-bold text-sm mb-1.5" style={{ color: "#333333" }}>{item.name}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
