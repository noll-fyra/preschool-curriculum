"use client";

import Header from "@/components/sections/Header";
import PersonaHero from "@/components/persona/PersonaHero";
import PositioningLine from "@/components/persona/PositioningLine";
import PrimaryFeaturesSection from "@/components/persona/PrimaryFeaturesSection";
import IntegrationSection from "@/components/persona/IntegrationSection";
import BreadthSection from "@/components/persona/BreadthSection";
import EcosystemGrid from "@/components/persona/EcosystemGrid";
import PersonaFinalCTA from "@/components/persona/PersonaFinalCTA";
import PersonaQA from "@/components/persona/PersonaQA";
import PersonaFooter from "@/components/persona/PersonaFooter";

// ─── Simple parent app mockups used as visuals ───────────────────────────────

function ParentHomeMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden mx-auto"
      style={{
        maxWidth: 360,
        border: "1px solid #E5E5E5",
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{
          backgroundColor: "#FAFAFA",
          borderBottom: "1px solid #F0F0F0",
        }}
      >
        <span className="text-xs font-semibold" style={{ color: "#333333" }}>
          Aisha's week
        </span>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}
        >
          Live
        </span>
      </div>
      <div className="p-4 space-y-3">
        <div
          className="rounded-xl p-3"
          style={{ backgroundColor: "#F0FAF5", border: "1px solid #B8DEC8" }}
        >
          <p
            className="text-xs font-semibold mb-1"
            style={{ color: "#4A9B6F" }}
          >
            This week
          </p>
          <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
            Aisha had a great week. 🌱
          </p>
          <p className="text-xs mt-1" style={{ color: "#737373" }}>
            She completed 3 activities and unlocked a new milestone in Language
            &amp; Literacy.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Language & Literacy", level: "Secure", color: "#4A9B6F" },
            { label: "Numeracy", level: "Developing", color: "#7BA3D4" },
            {
              label: "Social & Emotional",
              level: "Secure",
              color: "#E8745A",
            },
          ].map((area) => (
            <div
              key={area.label}
              className="rounded-lg p-2"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E5E5",
              }}
            >
              <p
                className="text-[10px] font-semibold"
                style={{ color: area.color }}
              >
                {area.label.split(" ")[0]}
              </p>
              <p className="text-[10px]" style={{ color: "#333333" }}>
                {area.level}
              </p>
            </div>
          ))}
        </div>
        <div
          className="rounded-xl p-3"
          style={{ backgroundColor: "#FEF5F3", border: "1px solid #F5C4B8" }}
        >
          <p className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>
            Recent activity
          </p>
          <p className="text-xs mt-1" style={{ color: "#737373" }}>
            🔤 Letter Sounds · ✅ Completed · Today, 4:12 PM
          </p>
          <p className="text-xs" style={{ color: "#737373" }}>
            🌟 New milestone unlocked: Letter Sounds
          </p>
        </div>
      </div>
    </div>
  );
}

function ParentProgressMockup() {
  return (
    <div
      className="rounded-xl p-4 mx-auto"
      style={{
        maxWidth: 360,
        backgroundColor: "#F7F7F5",
        border: "1px solid #E5E5E5",
      }}
    >
      <p className="text-xs font-semibold mb-2" style={{ color: "#4A9B6F" }}>
        Milestones
      </p>
      <div className="space-y-1.5">
        {[
          {
            name: "Recognises all 26 letters",
            status: "Secure",
            color: "#4A9B6F",
          },
          {
            name: "Counts objects to 20",
            status: "Developing",
            color: "#7BA3D4",
          },
          {
            name: "Takes turns with peers",
            status: "Secure",
            color: "#E8745A",
          },
        ].map((m) => (
          <div
            key={m.name}
            className="rounded-lg p-2 flex items-center justify-between"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
          >
            <span className="text-xs" style={{ color: "#1A1A1A" }}>
              {m.name}
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: m.color + "20", color: m.color }}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParentActivitiesMockup() {
  return (
    <div
      className="rounded-xl p-4 mx-auto"
      style={{
        maxWidth: 360,
        backgroundColor: "#FFF8E8",
        border: "1px solid #FDE8B0",
      }}
    >
      <p className="text-xs font-semibold mb-2" style={{ color: "#F5A623" }}>
        Activities · This week
      </p>
      <div className="space-y-1.5">
        {[
          "🔤 Alphabet hunt around the house",
          "🔢 Count toys together to 20",
          "🤝 Share & take turns game",
        ].map((label) => (
          <div
            key={label}
            className="rounded-lg px-3 py-2 text-xs"
            style={{ backgroundColor: "#FFFFFF", color: "#1A1A1A" }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ForParentsPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Section 1: Hero */}
        <PersonaHero
          badgeLabel="Nurture for Parents"
          headline="Always know how your child is doing."
          subheadline="Nurture gives you a live window into your child's learning — what they're working on, what they've just achieved, and exactly how you can help — updated every time they complete an activity."
          primaryCTA={{
            label: "See how it works",
            href: "/demo/parent",
          }}
          visual={<ParentHomeMockup />}
        />

        {/* Section 2: Category positioning line */}
        <PositioningLine>
          Your child's progress, in plain language — not once a term, but
          always.
        </PositioningLine>

        {/* Section 3: Primary features (5) */}
        <PrimaryFeaturesSection
          sectionEyebrow="The parent dashboard"
          sectionHeadline={
            <>
              A live view of your child's learning,
              <br />
              written for you — not a report.
            </>
          }
          heroFeature={{
            eyebrow: "Weekly summary",
            headline: "A weekly summary that actually tells you something.",
            body: "The moment you open the app, you see a plain-language summary of how your child is doing this week — what they completed, what they achieved, and what's coming next. No education jargon, no raw numbers without context. Just: how is my child doing?",
            bullets: [
              "Warm, readable language before you see any numbers",
              "Highlights completions, achievements, and what comes next",
              "Works whether learning happens at school, at home, or both",
            ],
            visual: <ParentHomeMockup />,
            visualBg: "#F0FAF5",
          }}
          gridFeatures={[
            {
              eyebrow: "Live progress",
              headline: "Real progress, updated in real time.",
              body: "Your child's developmental level across Language & Literacy, Numeracy, and Social & Emotional Development updates automatically as they complete activities — at school or at home. You see where they are on their own journey, never compared to their classmates.",
              visual: <ParentProgressMockup />,
            },
            {
              eyebrow: "Milestone celebrations",
              headline: "Celebrate milestones the moment they happen.",
              body: "When your child masters a new skill — recognises all 26 letters, counts to 20, learns to take turns — you'll know the same day it happens. Not at the end of term. Now.",
              visual: <ParentProgressMockup />,
            },
            {
              eyebrow: "Activities tab",
              headline: "Hand your phone over and let them learn.",
              body: "The Activities tab shows your child's current learning queue — the same activities their teacher has assigned, ready to complete at home. Tap to hand the phone to your child. Pip guides them through the rest.",
              visual: <ParentActivitiesMockup />,
            },
            {
              eyebrow: "Teacher messaging",
              headline: "A direct line to your child's teacher.",
              body: "Questions, updates, and teacher notes all live in the same app as the progress data. No switching between apps. No chasing messages across multiple platforms. One place for everything.",
              visual: <ParentHomeMockup />,
            },
          ]}
        />

        {/* Section 4: Integration / connected experience (3) */}
        <IntegrationSection
          sectionEyebrow="Connected to school"
          sectionHeadline={
            <>
              Connected to your child's school,
              <br />
              in real time.
            </>
          }
          heroFeature={{
            eyebrow: "School-day visibility",
            headline: "What happens at school doesn't stay at school.",
            body: "Every activity your child completes in the classroom feeds directly into the app you hold. Their teacher's observations, their milestone achievements, their daily learning — you see it all, framed in language that makes sense, within the same day it happens.",
            bullets: [
              "Updates appear as teachers log activities and observations",
              "One continuous record across school and home",
              "Plain-language summaries instead of raw score tables",
            ],
            visual: <ParentHomeMockup />,
            visualBg: "#F0FAF5",
            visualSide: "left",
          }}
          halfFeatures={[
            {
              eyebrow: "Home learning",
              headline: "Home learning that counts toward school progress.",
              body: "When your child completes an activity at home through the app, the result flows back to their teacher's dashboard automatically. Home learning and school learning are one continuous record — not two separate systems your child has to bridge.",
              visual: <ParentActivitiesMockup />,
            },
            {
              eyebrow: "Milestone explanations",
              headline: "Milestones explained, not just listed.",
              body: "Every milestone comes with a plain-language explanation of what it means, why it matters for your child's development, and one simple thing you can try at home to support it. The detail is there when you want it — never forced on you.",
              visual: <ParentProgressMockup />,
            },
          ]}
        />

        {/* Section 5: Breadth / range (4) */}
        <BreadthSection
          sectionEyebrow="Built for real family life"
          sectionHeadline={
            <>
              Whether you have five minutes or a full evening,
              <br />
              Nurture meets you there.
            </>
          }
          heroFeature={{
            eyebrow: "Two valid ways to engage",
            headline: "Two ways to support your child — both equally valid.",
            body: "Some days you can sit alongside your child and do an activity together. Other days, you hand them the phone and let them go. Nurture supports both. Passive parents see their child's queue and let the learning happen independently. Active parents see co-activity suggestions tied to what school is teaching. You choose what fits today.",
            bullets: [
              "Passive and active parents both fully supported",
              "Activities designed for independent or co-play",
              "Suggestions always tied to what school is teaching",
            ],
            visual: <ParentActivitiesMockup />,
            visualBg: "#FFF8E8",
          }}
          thirdFeatures={[
            {
              eyebrow: "No guilt",
              headline: "No guilt for quiet weeks.",
              body: "There are no streaks, no daily goals, no \"you've missed 3 days\" notifications. Life happens. Nurture will be here when you're ready — and your child's progress will still be waiting for them exactly where they left off.",
              visual: <ParentHomeMockup />,
            },
            {
              eyebrow: "Their own journey",
              headline: "Progress on their timeline, not the class average.",
              body: "Your child's dashboard shows only their own journey — their milestones, their progress, their achievements. There are no percentiles, no class rankings, no data point that implies your child is ahead or behind anyone else.",
              visual: <ParentProgressMockup />,
            },
            {
              eyebrow: "Shareable view",
              headline: "Readable by anyone who cares about your child.",
              body: "Send the app link to a grandparent, a second caregiver, or a tutor. Nurture is designed to be understood by anyone who loves your child — no teaching background required.",
              visual: <ParentHomeMockup />,
            },
          ]}
        />

        {/* Section 6: Ecosystem grid */}
        <EcosystemGrid
          headline="Designed to fit into family life."
          items={[
            {
              icon: "📈",
              name: "Live progress feed",
              desc: "Updates automatically as your child completes activities — at home or at school.",
              iconBg: "#E8F5EE",
            },
            {
              icon: "⭐",
              name: "Milestone explanations",
              desc: 'Every milestone explained in plain language, with one "try at home" suggestion.',
              iconBg: "#FFF8E8",
            },
            {
              icon: "🎯",
              name: "Activity queue",
              desc: "Your child's personalised activity set, ready whenever they are.",
              iconBg: "#F5EFE0",
            },
            {
              icon: "🌱",
              name: "Pip the companion",
              desc: "A friendly character who guides your child through every activity independently.",
              iconBg: "#F0F5FC",
            },
            {
              icon: "💬",
              name: "Teacher messages",
              desc: "Direct communication with your child's teacher — in the same app as their progress.",
              iconBg: "#E5F4F1",
            },
            {
              icon: "🚫",
              name: "No comparison data",
              desc: "Every data point is relative to your child's own journey — never to their classmates.",
              iconBg: "#FEF2EF",
            },
          ]}
        />

        {/* Section 7: Final CTA */}
        <PersonaFinalCTA
          headline="Get Nurture free."
          subheadline="A window into your child's learning that actually tells you how they're doing."
          proof="Built with parents at Singapore's largest preschool network. 100% of parents surveyed said they wanted exactly this."
          options={[
            {
              icon: "📱",
              title: "Download the app",
              desc: "Parent app for iOS and Android — free to get started.",
              ctaLabel: "Download Nurture →",
              ctaHref: "mailto:hello@nurture.edu.sg",
              primary: true,
            },
            {
              icon: "🏫",
              title: "Ask your child's school",
              desc: "Share Nurture with your child's preschool and invite them to join the pilot.",
              ctaLabel: "Share with school →",
              ctaHref: "mailto:hello@nurture.edu.sg",
            },
          ]}
        />

        {/* Section 8: Q&A */}
        <PersonaQA
          items={[
            {
              q: "What does the app actually show me?",
              a: "Your home screen shows a plain-language weekly summary, your child's current developmental level across three areas (Language & Literacy, Numeracy, and Social & Emotional Development), and a live feed of recent activity completions and milestone achievements. Each piece of data comes with context — what it means, why it matters, and what's coming next.",
            },
            {
              q: "How is this different from the updates I already get from school?",
              a: "Most schools send formal progress updates once or twice per term. Nurture updates automatically every time your child completes an activity — at school or at home. You'll know about a milestone the day it happens, not three months later at a parent–teacher meeting.",
            },
            {
              q: "Do I have to do activities with my child, or can they do it independently?",
              a: "Both work. If you have time to sit alongside your child, Nurture will suggest co-activities you can do together. If you want to hand your child the phone and let them go, the experience is entirely self-guided — Pip speaks every instruction aloud, so your child doesn't need to read anything. You choose what fits.",
            },
            {
              q: "Will I be able to see how my child compares to the rest of the class?",
              a: 'No — and this is intentional. Nurture never shows class averages, percentile rankings, or any data that implies comparison to other children. Your child\'s progress is measured only against their own journey. There is no data point in Nurture that could make you feel your child is "behind."',
            },
            {
              q: "Is this app separate from what the school uses?",
              a: "No. Nurture is one connected platform. The teacher's dashboard, your parent app, and your child's activity experience are all part of the same system. When your child completes an activity at home, it appears in their teacher's dashboard. When the teacher logs an observation at school, it appears in your feed.",
            },
          ]}
        />
      </main>

      {/* Section 9: Footer */}
      <PersonaFooter />
    </>
  );
}
