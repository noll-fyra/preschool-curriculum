import { ReactNode } from "react";
import Link from "next/link";

interface CTAProps {
  label: string;
  href: string;
  primary?: boolean;
}

function CTAButton({
  cta,
  variant,
}: {
  cta: CTAProps;
  variant: "primary" | "secondary";
}) {
  const className =
    "inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl";

  const style: React.CSSProperties =
    variant === "primary"
      ? { backgroundColor: "#F79863", color: "white" }
      : {
          backgroundColor: "#FFFFFF",
          color: "#333333",
          border: "1px solid #E5E5E5",
        };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === "primary") {
      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E06B4A";
      return;
    }
    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F5F5F5";
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === "primary") {
      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F79863";
      return;
    }
    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FFFFFF";
  };

  const isInternal = cta.href.startsWith("/");

  if (isInternal) {
    return (
      <Link
        href={cta.href}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {cta.label}
      </Link>
    );
  }

  return (
    <a
      href={cta.href}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {cta.label}
    </a>
  );
}

interface PersonaHeroProps {
  badgeLabel: string;
  headline: ReactNode;
  subheadline: string;
  primaryCTA: CTAProps;
  secondaryCTA?: CTAProps;
  visual: ReactNode;
}

export default function PersonaHero({
  badgeLabel,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  visual,
}: PersonaHeroProps) {
  return (
    <section aria-labelledby="persona-hero-heading" className="pt-32 pb-0" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-4xl mx-auto px-5 text-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
          style={{ backgroundColor: "#FEF0E7", border: "1px solid #F7986340" }}
        >
          <div
            className="w-4 h-4 rounded flex items-center justify-center text-xs"
            style={{ backgroundColor: "#F79863" }}
            aria-hidden="true"
          >
            🌱
          </div>
          <span className="text-xs font-semibold" style={{ color: "#F79863" }}>{badgeLabel}</span>
        </div>

        {/* Headline */}
        <h1
          id="persona-hero-heading"
          className="font-extrabold mb-5 leading-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 4.25rem)", color: "#333333", letterSpacing: "-0.03em" }}
        >
          {headline}
        </h1>

        {/* Sub-headline */}
        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: "#666666" }}>
          {subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <CTAButton cta={primaryCTA} variant="primary" />
          {secondaryCTA && <CTAButton cta={secondaryCTA} variant="secondary" />}
        </div>

        {/* Hero visual */}
        {visual}
      </div>
    </section>
  );
}
