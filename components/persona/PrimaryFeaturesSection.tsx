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
}

interface GridFeature {
  eyebrow: string;
  headline: string;
  body?: string;
  visual?: ReactNode;
}

interface PrimaryFeaturesSectionProps {
  sectionEyebrow: string;
  sectionHeadline: ReactNode;
  heroFeature: HeroFeature;
  /** Exactly 4 features rendered in a 2×2 grid */
  gridFeatures: [GridFeature, GridFeature, GridFeature, GridFeature];
  /** Section background. Default: #F5F5F5 */
  bg?: string;
}

export default function PrimaryFeaturesSection({
  sectionEyebrow,
  sectionHeadline,
  heroFeature,
  gridFeatures,
  bg = "#F5F5F5",
}: PrimaryFeaturesSectionProps) {
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
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gridFeatures.map((f) => (
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
