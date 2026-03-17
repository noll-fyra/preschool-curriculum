import { ReactNode } from "react";
import SectionHeader from "./SectionHeader";
import FeatureHeroCard from "./FeatureHeroCard";
import FeatureCard from "./FeatureCard";

interface HeroFeature {
  eyebrow: string;
  headline: string;
  body: string;
  bullets?: string[];
  visual: ReactNode;
  visualBg?: string;
  visualSide?: "left" | "right";
}

interface HalfFeature {
  eyebrow: string;
  headline: string;
  body?: string;
  visual?: ReactNode;
}

interface IntegrationSectionProps {
  sectionEyebrow: string;
  sectionHeadline: ReactNode;
  heroFeature: HeroFeature;
  /** Exactly 2 features rendered side-by-side */
  halfFeatures: [HalfFeature, HalfFeature];
  /** Section background. Default: #FFFFFF */
  bg?: string;
}

export default function IntegrationSection({
  sectionEyebrow,
  sectionHeadline,
  heroFeature,
  halfFeatures,
  bg = "#FFFFFF",
}: IntegrationSectionProps) {
  return (
    <section className="py-20" style={{ backgroundColor: bg }}>
      <div className="max-w-5xl mx-auto px-5">
        <SectionHeader eyebrow={sectionEyebrow} headline={sectionHeadline} />

        <FeatureHeroCard
          eyebrow={heroFeature.eyebrow}
          headline={heroFeature.headline}
          body={heroFeature.body}
          bullets={heroFeature.bullets}
          visual={heroFeature.visual}
          visualBg={heroFeature.visualBg}
          visualSide={heroFeature.visualSide}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {halfFeatures.map((f) => (
            <FeatureCard
              key={f.eyebrow}
              eyebrow={f.eyebrow}
              headline={f.headline}
              body={f.body}
              visual={f.visual}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
