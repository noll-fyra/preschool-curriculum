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

interface ThirdFeature {
  eyebrow: string;
  headline: string;
  body?: string;
  visual?: ReactNode;
}

interface BreadthSectionProps {
  sectionEyebrow: string;
  sectionHeadline: ReactNode;
  heroFeature: HeroFeature;
  /** Exactly 3 features rendered in equal thirds */
  thirdFeatures: [ThirdFeature, ThirdFeature, ThirdFeature];
  /** Section background. Default: #F5F5F5 */
  bg?: string;
}

export default function BreadthSection({
  sectionEyebrow,
  sectionHeadline,
  heroFeature,
  thirdFeatures,
  bg = "#F5F5F5",
}: BreadthSectionProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {thirdFeatures.map((f) => (
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
