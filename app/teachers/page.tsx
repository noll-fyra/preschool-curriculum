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
import {
  HeroDashboardMockup,
  CohortViewMockup,
  ReportDraftMockup,
  ObservationMockup,
  ActivityQueueMockup,
  ChildProfileMockup,
  NELAlignmentMockup,
  HomeLearningMockup,
  MessagingMockup,
  BreadthHeroMockup,
  SubstituteProfileMockup,
  ObservationLogMockup,
  AdjustQueueMockup,
} from "@/components/persona/teacher/Mockups";

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ForTeachersPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Section 1: Hero */}
        <PersonaHero
          badgeLabel="Nurture for Teachers"
          headline={
            <>
              Less paperwork.
              <br />
              More teaching.
            </>
          }
          subheadline="Your morning dashboard answers three questions before the first child walks in — who's here, what are we doing, and who needs your attention."
          primaryCTA={{
            label: "See how it works",
            href: "/demo/teacher",
          }}
          visual={<HeroDashboardMockup />}
        />

        {/* Section 2: Positioning line */}
        <PositioningLine>
          Three questions.
          <br />
          Answered the moment you open the app.
        </PositioningLine>

        {/* Section 3: Primary features (5) */}
        <PrimaryFeaturesSection
          sectionEyebrow="Built for the school day"
          sectionHeadline={
            <>
              Every question answered.
              <br />
              Every moment captured.
            </>
          }
          heroFeature={{
            eyebrow: "Morning briefing",
            headline: "Three questions. Answered before the first child walks in.",
            body: "Your morning dashboard surfaces everything in one view: who's present, what's on for today, and which children need your attention this week. The children grid updates in real time as children check in. Five domain coverage dots on each card show where each child has — and hasn't — been observed this week. No manual checking. No spreadsheet audit.",
            bullets: [
              "Presence updates in real time as children check in",
              "Five domain coverage dots show where each child needs attention this week",
              "Flagged children surface automatically — no manual auditing",
            ],
            visual: <CohortViewMockup />,
            visualBg: "#FEF0E7",
          }}
          gridFeatures={[
            {
              eyebrow: "Progress reports",
              headline: "Report drafts written before you open the page.",
              body: "When report time comes, a developmental summary for each child has already been drafted — based on your logged observations and domain coverage data. You read, add your voice, and approve. No more blank-page dread.",
              visual: <ReportDraftMockup />,
            },
            {
              eyebrow: "Quick-Log",
              headline: "Capture any observation in under 20 seconds.",
              body: "Tap Quick-Log from anywhere in the app. Select the child, speak or type a one-line note, and the system suggests the domain tag. Confirm and done — the sheet dismisses and you're back where you were. No clipboard. No catch-up.",
              visual: <ObservationMockup />,
            },
            {
              eyebrow: "AI insight",
              headline: "The system notices what you might miss.",
              body: "One AI insight per session — timed to where you are in the day. Morning: forward-looking nudges. Afternoon: reflective. One insight. One tap to act on it or dismiss it.",
              visual: <ActivityQueueMockup />,
            },
            {
              eyebrow: "Today's schedule",
              headline: "Your whole day, in one view.",
              body: "Today's schedule shows every activity block with its domain tags, duration, and status — done, in progress, or upcoming. The current block is always highlighted. Tap any block for the activity plan and a quick-log prompt.",
              visual: <ChildProfileMockup />,
            },
          ]}
        />

        {/* Section 4: Integration / connected experience (3) */}
        <IntegrationSection
          sectionEyebrow="Works with your world"
          sectionHeadline={
            <>
              Built to work with the way
              <br />
              you already teach.
            </>
          }
          heroFeature={{
            eyebrow: "NEL Framework",
            headline: "Aligned to all five learning domains, from day one.",
            body: "Nurture's curriculum framework maps directly to the Ministry of Education's Nurturing Early Learners Framework across all five developmental domains — Language & Literacy, Numeracy, Social-Emotional, Motor, and Creative Arts. The domain coverage dots you see on every child card reflect real observation activity in each domain this week. No translation required.",
            bullets: [
              "All five NEL domains covered — Language, Numeracy, SE, Motor, Creative Arts",
              "Domain coverage tracks observation recency, not scores or grades",
              "No additional configuration or alignment work required",
            ],
            visual: <NELAlignmentMockup />,
            visualBg: "#E5F4F1",
            visualSide: "left",
          }}
          halfFeatures={[
            {
              eyebrow: "Co-teaching",
              headline: "Co-teaching, made visible.",
              body: "Every observation logged by a co-teacher or assistant appears in the observations feed in real time. A teacher can see what her colleague captured across the room without asking. All real-time data reflects the whole class team.",
              visual: <HomeLearningMockup />,
            },
            {
              eyebrow: "Parent messaging",
              headline: "Message parents directly, from the same app.",
              body: "Unread parent messages surface on the dashboard. Direct messages, milestone updates, and daily summaries all flow through Nurture — keeping the conversation in the same place as the observation data. One-tap translation for multilingual families.",
              visual: <MessagingMockup />,
            },
          ]}
        />

        {/* Section 5: Breadth / range (4) */}
        <BreadthSection
          sectionEyebrow="Designed for real classrooms"
          sectionHeadline={
            <>
              Individual children and the whole class,
              <br />
              always in view.
            </>
          }
          heroFeature={{
            eyebrow: "Macro and micro",
            headline: "From one child to the whole cohort — instantly.",
            body: "Open the dashboard to see every child in the class: who's present, which domains have been covered, who's been flagged. Tap any child card to open their full profile — observations, milestone map, family notes — then return to exactly where you were. Nurture is designed for both the macro and the micro, without switching tools.",
            bullets: [
              "One tap from class grid to individual child profile",
              "Flagged children surface on the grid — no hunting through lists",
              "Always returns to your exact scroll position on the way back",
            ],
            visual: <BreadthHeroMockup />,
            visualBg: "#1C2B29",
          }}
          thirdFeatures={[
            {
              eyebrow: "Cover days",
              headline: "Substitute-ready profiles.",
              body: 'Every child profile passes the "substitute teacher test" — would a stranger reading only this page know enough to serve this child well today? Personality, what works, medical flags, emergency contacts — all in one place.',
              visual: <SubstituteProfileMockup />,
            },
            {
              eyebrow: "Record-keeping",
              headline: "Observation logs that build over time.",
              body: "Every observation is timestamped, domain-tagged, and searchable. Logged by you or a co-teacher. They build automatically as you work — no separate logging system, no clipboard.",
              visual: <ObservationLogMockup />,
            },
            {
              eyebrow: "Five phases",
              headline: "Five phases. One dashboard.",
              body: "The dashboard adapts to where you are in the day — preparation, arrival, teaching, rest time, and end-of-day handover. One interface. Always the right emphasis.",
              visual: <AdjustQueueMockup />,
            },
          ]}
        />

        {/* Section 6: Ecosystem grid */}
        <EcosystemGrid
          headline="Designed to fit into your school day."
          items={[
            {
              icon: "🌅",
              name: "Morning dashboard",
              desc: "Who's here, what's next, who needs attention — answered before the first child walks in",
              iconBg: "#FEF0E7",
            },
            {
              icon: "⚡",
              name: "Quick-Log",
              desc: "Capture any observation in under 20 seconds, from anywhere in the app",
              iconBg: "#FFF8E8",
            },
            {
              icon: "✦",
              name: "AI insight",
              desc: "One nudge per session — forward-looking in the morning, reflective in the afternoon",
              iconBg: "#E5F4F1",
            },
            {
              icon: "💬",
              name: "Parent messages",
              desc: "Unread messages surface on the dashboard; one-tap translation for multilingual families",
              iconBg: "#FEF2EF",
            },
            {
              icon: "📅",
              name: "Schedule view",
              desc: "Today's activities with domain tags, current block highlighted, materials checklist per block",
              iconBg: "#F0F5FC",
            },
            {
              icon: "📄",
              name: "Report generator",
              desc: "Auto-drafted developmental summaries for every child, ready for your review at term end",
              iconBg: "#FFF8E8",
            },
          ]}
        />

        {/* Section 7: Final CTA */}
        <PersonaFinalCTA
          headline="Try Nurture free."
          subheadline="Join the teachers spending less time on admin and more time with their class."
          proof="Trusted by teachers at NTUC First Campus and My First Skool."
          options={[
            {
              icon: "💻",
              title: "Get started free",
              desc: "Full teacher dashboard. No credit card required.",
              ctaLabel: "Open on web →",
              ctaHref: "/demo/teacher",
              primary: true,
            },
            {
              icon: "🎓",
              title: "Request a demo",
              desc: "See Nurture set up for your school with your class.",
              ctaLabel: "Book a demo →",
              ctaHref: "mailto:hello@nurture.edu.sg",
            },
          ]}
        />

        {/* Section 8: Q&A */}
        <PersonaQA
          items={[
            {
              q: "What does the morning dashboard actually show?",
              a: "Four stat cards at the top: children present, activities today, observations logged this week, and children flagged for attention. Below that, every child in the class as a card — with a presence indicator (present, absent, late) and five domain coverage dots showing which learning areas have been observed this week. On the right: one AI insight and your unread parent messages. Everything you need, before the first child walks in.",
            },
            {
              q: "How does Quick-Log work?",
              a: "Tap the button from anywhere in the app — it's always one tap away. Select the child from the grid or type their name. Speak or type a one-line observation note. The system suggests a domain tag in real time. Confirm it, or override. Tap save. The sheet dismisses immediately. Most teachers complete the whole flow in under 20 seconds.",
            },
            {
              q: "Does this replace my professional judgment?",
              a: "No. Nurture generates AI insights, domain suggestions, and report drafts based on data — but you review, adjust, and approve everything. Insights are dismissible. Domain tags can be overridden. Report drafts can be rewritten. The system handles the blank-page problem; your professional knowledge handles everything else. You remain essential.",
            },
            {
              q: "How does Nurture know which children need my attention?",
              a: "The system flags children when: there's been no observation in any domain for 5+ days, a specific domain has had no observation for 10+ days, there's an unread parent message relating to that child, or you've manually flagged them. The flag appears on their card in the children grid. The stat strip at the top of the dashboard always shows the count.",
            },
            {
              q: "Is Nurture aligned to My First Skool's PETAL approach?",
              a: "Nurture's curriculum framework is built on the NEL Framework, which is the foundation of the PETAL pedagogical approach. All five domains — including Motor and Creative Arts — are covered. No separate configuration or domain mapping is required.",
            },
          ]}
        />
      </main>

      {/* Section 9: Footer */}
      <PersonaFooter />
    </>
  );
}
