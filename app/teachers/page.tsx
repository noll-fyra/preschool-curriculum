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
  ChildProfileMockup,
  ActivityQueueMockup,
  ObservationMockup,
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
          subheadline="Nurture automatically tracks what every child knows and generates your report drafts for you — so you can spend your time on what only you can do."
          primaryCTA={{
            label: "See how it works",
            href: "mailto:hello@nurture.edu.sg",
          }}
          secondaryCTA={{
            label: "Request early access",
            href: "mailto:hello@nurture.edu.sg",
          }}
          visual={<HeroDashboardMockup />}
        />

        {/* Section 2: Positioning line */}
        <PositioningLine>
          Assessment and reporting,
          <br />
          finally on autopilot.
        </PositioningLine>

        {/* Section 3: Primary features (5) */}
        <PrimaryFeaturesSection
          sectionEyebrow="Everything you need"
          sectionHeadline={
            <>
              Five tools that give teachers
              <br />
              their time back.
            </>
          }
          heroFeature={{
            eyebrow: "Class overview",
            headline: "See every child's progress the moment you open the app.",
            body: "Your morning dashboard shows each child's current developmental level across Language & Literacy, Numeracy, and Social & Emotional Development — no manual updating required. Activity completions feed the tracker automatically overnight.",
            bullets: [
              "Colour-coded milestone status for every child at a glance",
              "Critical flags surface before you open a profile",
              "Auto-updates from both school and home activity sessions",
            ],
            visual: <CohortViewMockup />,
            visualBg: "#FEF0E7",
          }}
          gridFeatures={[
            {
              eyebrow: "Progress reports",
              headline: "Report drafts written before you open the page.",
              body: "When report time comes, a developmental summary for each child has already been drafted — based on activity data and your observation logs. You read, add your voice, and approve. No more blank-page dread.",
              visual: <ReportDraftMockup />,
            },
            {
              eyebrow: "Child profiles",
              headline: "One profile that captures the whole child.",
              body: "Personality snapshot, learning strategies, family context, and medical flags — all in one place. The knowledge that usually lives in your head now lives in the profile.",
              visual: <ChildProfileMockup />,
            },
            {
              eyebrow: "Activity queues",
              headline:
                "Activity queues built for each child, not the whole class.",
              body: "Every child gets an activity set matched to where they actually are. A child at Beginning sees Beginning activities. A child ready for Secure gets Secure content. You can review and swap at any time.",
              visual: <ActivityQueueMockup />,
            },
            {
              eyebrow: "Observation logging",
              headline:
                "Log a Social & Emotional observation in under ten seconds.",
              body: "For behaviour-based milestones, tap to record on the spot — while the moment is fresh. Five observations across five days moves the milestone forward automatically. No clipboard. No catch-up.",
              visual: <ObservationMockup />,
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
            headline: "Aligned to the NEL Framework, from day one.",
            body: "Nurture's milestone schema maps directly to the Ministry of Education's Nurturing Early Learners Framework — the same framework your curriculum is built on. No translation required. The milestones you see are the milestones you teach.",
            bullets: [
              "All 30 milestones pre-loaded across LL, NUM, and SED",
              "Mastery rules match NEL guidance (3 consecutive, 5 of 7)",
              "No additional configuration or alignment work required",
            ],
            visual: <NELAlignmentMockup />,
            visualBg: "#E5F4F1",
            visualSide: "left",
          }}
          halfFeatures={[
            {
              eyebrow: "Home learning",
              headline: "Home learning feeds your classroom data.",
              body: "When a child completes an activity at home through the parent app, the result appears in your dashboard as if it happened in class. One continuous record — wherever learning happens.",
              visual: <HomeLearningMockup />,
            },
            {
              eyebrow: "Parent messaging",
              headline: "Message parents directly, from the same app.",
              body: "No more switching to WhatsApp to follow up on a parent question. Milestone updates, teacher notes, and direct messages all flow through Nurture — keeping the conversation in the same place as the progress data.",
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
            body: "Open a child's profile to go deep on their individual journey. Step back to the class view to see who needs attention this week across the room. Nurture is designed for both the macro and the micro — without switching tools.",
            bullets: [
              "One tap from class view to individual child profile",
              "Flag children who need attention this week at a glance",
              "Milestone gaps surface automatically — no manual auditing",
            ],
            visual: <BreadthHeroMockup />,
            visualBg: "#1C2B29",
          }}
          thirdFeatures={[
            {
              eyebrow: "Cover days",
              headline: "Substitute-ready profiles.",
              body: 'Every profile is written to the "substitute teacher test" — would a stranger who reads only this page know enough to serve this child well today?',
              visual: <SubstituteProfileMockup />,
            },
            {
              eyebrow: "Record-keeping",
              headline: "Observation logs that build over time.",
              body: "Teacher notes are timestamped and searchable. Welfare notes are permanent and cannot be deleted. A complete observational record builds itself as you work.",
              visual: <ObservationLogMockup />,
            },
            {
              eyebrow: "Your judgment",
              headline: "Activity queues you can adjust.",
              body: "The system suggests the next activity based on milestone progress — but you're always in control. Swap, reprioritise, or assign a specific activity for a specific reason.",
              visual: <AdjustQueueMockup />,
            },
          ]}
        />

        {/* Section 6: Ecosystem grid */}
        <EcosystemGrid
          headline="Designed to fit into your school day."
          items={[
            {
              icon: "📋",
              name: "NEL Framework",
              desc: "Every milestone maps to the national preschool curriculum — no additional alignment work",
              iconBg: "#E5F4F1",
            },
            {
              icon: "👨‍👩‍👧",
              name: "Parent app",
              desc: "Activities completed at home appear in your dashboard automatically with a home tag",
              iconBg: "#FEF0E7",
            },
            {
              icon: "📄",
              name: "Report generator",
              desc: "Auto-drafted developmental summaries for every child, ready for your review at term end",
              iconBg: "#FFF8E8",
            },
            {
              icon: "👁",
              name: "Observation logger",
              desc: "Log Social & Emotional milestones on the spot, from any device, in under ten seconds",
              iconBg: "#FEF2EF",
            },
            {
              icon: "🏫",
              name: "Class roster",
              desc: "One view of every child's level across all three learning areas — updated overnight",
              iconBg: "#F0F5FC",
            },
            {
              icon: "🔄",
              name: "Substitute handover",
              desc: "Profiles built to be read by a new teacher on their first day — no handover doc required",
              iconBg: "#E5F4F1",
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
              ctaHref: "mailto:hello@nurture.edu.sg",
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
              q: "How does Nurture track milestone progress without me doing the work?",
              a: "When a child completes an activity, Nurture records the result and updates their milestone tracker automatically. For skill-based milestones (Language & Literacy and Numeracy), three consecutive passes — or five out of seven — counts as mastery. For Social & Emotional milestones, you log a quick observation on the spot, and five separate-day observations marks the milestone achieved. The system does the counting; you do the observing.",
            },
            {
              q: "Does this replace my professional judgment?",
              a: "No. Nurture generates activity queues and report drafts based on data — but you review, adjust, and approve everything. Activity queues can be swapped. Report drafts can be rewritten. The system handles the blank-page problem; your professional knowledge handles everything else. You remain essential.",
            },
            {
              q: "How long does it take to get set up?",
              a: "Most teachers are up and running within one school day. Your class roster, learning areas, and milestone framework are pre-loaded — aligned to the NEL Framework by default. You add your children, and the system is ready to go.",
            },
            {
              q: "What if a child completes activities at home? Does that count?",
              a: 'Yes. Activity completions from the parent app feed into the same milestone tracker as school sessions. The result appears in your dashboard with a "home" tag so you know where it happened. One continuous record, regardless of where learning takes place.',
            },
            {
              q: "Is Nurture aligned to My First Skool's PETAL approach?",
              a: "Nurture's milestone framework is built on the NEL Framework, which is the foundation of the PETAL pedagogical approach. The two are compatible — no separate milestone schema or additional configuration is required.",
            },
          ]}
        />
      </main>

      {/* Section 9: Footer */}
      <PersonaFooter />
    </>
  );
}
