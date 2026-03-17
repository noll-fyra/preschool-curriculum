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
  HeroPhoneMockup,
  PipCompanionMockup,
  AudioInstructionMockup,
  CelebrationMockup,
  WrongAnswerMockup,
  NextUpMockup,
  PersonalizedQueueMockup,
  HomeSchoolMockup,
  InvisibleAssessmentMockup,
  ResearchBackedMockup,
  TapInteractionMockup,
  SessionLengthMockup,
  StickerCollectionMockup,
} from "@/components/persona/child/Mockups";

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ForStudentsPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Section 1: Hero */}
        <PersonaHero
          badgeLabel="Nurture for Children"
          headline="Learning that feels like play."
          subheadline="Nurture gives every child a companion, a queue of activities matched to exactly where they are, and a celebration every time they finish — whether they got every answer right or not."
          primaryCTA={{
            label: "See the child experience",
            href: "/demo/student",
          }}
          secondaryCTA={{
            label: "Get early access",
            href: "mailto:hello@nurture.edu.sg",
          }}
          visual={<HeroPhoneMockup />}
        />

        {/* Section 2: Positioning line */}
        <PositioningLine>
          Learning for little ones,
          <br />
          designed from the ground up.
        </PositioningLine>

        {/* Section 3: Primary features (5) */}
        <PrimaryFeaturesSection
          sectionEyebrow="The child experience"
          sectionHeadline={
            <>
              The learning is real.
              <br />
              The test is invisible.
            </>
          }
          heroFeature={{
            eyebrow: "Pip companion",
            headline: "A companion who's always there.",
            body: "Pip — Nurture's friendly character — appears on every screen, speaks every instruction aloud, reacts to every answer, and celebrates every session end. Children who cannot read a single word on screen can still navigate entirely on their own, guided by Pip's voice and animations.",
            bullets: [
              "Character-led guidance on every screen",
              "Fully navigable without reading a single word",
              "Warm, consistent reactions to every answer",
            ],
            visual: <PipCompanionMockup />,
            visualBg: "#FEF0E7",
          }}
          gridFeatures={[
            {
              eyebrow: "Audio-first design",
              headline: "Every instruction is spoken, not written.",
              body: "The entire experience is designed for children who cannot read. Every prompt, option label, and piece of feedback is delivered through audio. Text on screen is for the adult reading over their shoulder — never for the child.",
              visual: <AudioInstructionMockup />,
            },
            {
              eyebrow: "Celebration design",
              headline: "Every session ends in celebration.",
              body: "A completion sticker is awarded for finishing — not for accuracy. Whether a child sailed through or needed a little help, the session always ends with dancing, confetti, and a sticker earned. Children who feel good at the end come back.",
              visual: <CelebrationMockup />,
            },
            {
              eyebrow: "Safe to fail",
              headline: "Wrong answers feel like discovery, not failure.",
              body: 'There are no red X marks, buzzers, or harsh "Wrong!" messages. A wrong answer gets a gentle shake, an encouraging re-prompt from Pip, and another chance. After two attempts, the correct answer is gently highlighted and the child finds it themselves.',
              visual: <WrongAnswerMockup />,
            },
            {
              eyebrow: "Activity queue",
              headline: "No choices, no confusion — just what's next.",
              body: "The child's screen shows one thing: what comes next. Their teacher has already chosen the right activity for where they are. The child's only job is to play — no menus, no decisions, no paralysis.",
              visual: <NextUpMockup />,
            },
          ]}
        />

        {/* Section 4: Integration / connected experience (3) */}
        <IntegrationSection
          sectionEyebrow="Built around real children"
          sectionHeadline={
            <>
              Built around how young
              <br />
              children actually learn.
            </>
          }
          heroFeature={{
            eyebrow: "Personalised queues",
            headline: "Activities matched to exactly where each child is.",
            body: "Every child's queue is personalised to their current developmental level — not the class average, not what the curriculum assumes. A child at Beginning sees Beginning activities. A child ready for more sees more. The system adjusts invisibly as they progress, without ever labelling or comparing them.",
            bullets: [
              "Queue matched to Beginning / Developing / Secure",
              "Level adjusts automatically based on activity data",
              "Child never sees levels, only the next activity",
            ],
            visual: <PersonalizedQueueMockup />,
            visualBg: "#F7F7F5",
            visualSide: "left",
          }}
          halfFeatures={[
            {
              eyebrow: "Home + school",
              headline: "Learns at school. Practises at home.",
              body: "The same activity queue available on the classroom tablet is accessible through the parent's phone at home. Children experience Nurture as one continuous, familiar game — not a school tool and a separate home app.",
              visual: <HomeSchoolMockup />,
            },
            {
              eyebrow: "Invisible assessment",
              headline: "Assessment is invisible to the child.",
              body: "Nurture is tracking milestones, recording session results, and updating the teacher dashboard — but the child never sees any of it. No scores. No levels. No performance indicators. From a child's perspective, they are playing a game with their friend Pip.",
              visual: <InvisibleAssessmentMockup />,
            },
          ]}
        />

        {/* Section 5: Breadth / range (4) */}
        <BreadthSection
          sectionEyebrow="Research-backed design"
          sectionHeadline={
            <>
              Built for little hands and
              <br />
              short attention spans.
            </>
          }
          heroFeature={{
            eyebrow: "Research foundations",
            headline:
              "Every design decision is backed by research on how children at this age learn.",
            body: "Nurture's child experience is built on HCI research, Sesame Workshop guidelines, and practitioner studies of what works for ages 3–6. The tap-to-select interaction, the 80×80px touch targets, the cadence of feedback, and the character's role — none of it is guesswork.",
            bullets: [
              "Grounded in Sesame Workshop and EdTech research",
              "Optimised for ages 3–6 attention and motor skills",
              "Designed with practitioners in real classrooms",
            ],
            visual: <ResearchBackedMockup />,
            visualBg: "#1C2B29",
          }}
          thirdFeatures={[
            {
              eyebrow: "Tap interaction",
              headline: "Tap is the only gesture needed.",
              body: "No drag-and-drop, no swiping, no precision taps. Research confirms that tap-to-select is the only reliable interaction for ages 3–5. Every activity in Nurture uses it — large, clearly tappable targets with immediate feedback.",
              visual: <TapInteractionMockup />,
            },
            {
              eyebrow: "Session length",
              headline: "3–5 minutes of focused attention per session.",
              body: "Sessions are designed to fit the natural attention span of a preschooler. Three questions per activity, each with immediate audio and visual feedback. Long enough to learn something. Short enough to leave them wanting more.",
              visual: <SessionLengthMockup />,
            },
            {
              eyebrow: "Sticker collection",
              headline: "A sticker collection that grows with them.",
              body: "Each milestone unlocked earns a unique sticker on the achievements board. Locked stickers appear as friendly question marks — inviting curiosity, not marking absence. Over time, a child builds a visual record of everything they've learned.",
              visual: <StickerCollectionMockup />,
            },
          ]}
        />

        {/* Section 6: Ecosystem grid */}
        <EcosystemGrid
          headline="Designed to fit into a child's world."
          items={[
            {
              icon: "🌱",
              name: "Pip the companion",
              desc: "A consistent character present on every screen — the child's guide through the entire experience.",
              iconBg: "#FEF0E7",
            },
            {
              icon: "🎧",
              name: "Audio-first design",
              desc: "Every instruction spoken aloud — fully navigable without reading a single word.",
              iconBg: "#FFF8E8",
            },
            {
              icon: "🌟",
              name: "Achievement stickers",
              desc: "One unique sticker per milestone — a growing collection the child is proud of.",
              iconBg: "#F5EFE0",
            },
            {
              icon: "👉",
              name: "Tap-to-select activities",
              desc: "The only gesture needed — large, forgiving touch targets on phone and tablet.",
              iconBg: "#F0F5FC",
            },
            {
              icon: "🏠",
              name: "Home + school queue",
              desc: "The same experience available at home and in the classroom.",
              iconBg: "#E5F4F1",
            },
            {
              icon: "🔍",
              name: "Invisible assessment",
              desc: "All tracking and reporting happens behind the scenes — the child only ever sees the game.",
              iconBg: "#FEF2EF",
            },
          ]}
        />

        {/* Section 7: Final CTA */}
        <PersonaFinalCTA
          headline="Let your child try Nurture."
          subheadline="A learning companion your child will actually want to open — designed with care for every child aged 3–6."
          proof="Designed with and for children at Singapore's largest preschool network."
          options={[
            {
              icon: "🌱",
              title: "Get early access",
              desc: "Reserve a spot for your child or class in the pilot rollout.",
              ctaLabel: "Get early access →",
              ctaHref: "mailto:hello@nurture.edu.sg",
              primary: true,
            },
            {
              icon: "🎬",
              title: "See it for yourself",
              desc: "Watch a short demo of the child experience from a parent's phone.",
              ctaLabel: "Watch the demo →",
              ctaHref: "mailto:hello@nurture.edu.sg",
            },
          ]}
        />

        {/* Section 8: Q&A */}
        <PersonaQA
          items={[
            {
              q: "Will my child be able to use this independently?",
              a: "Yes — that's the core design goal. The entire experience is audio-first. Pip speaks every instruction and every feedback response. A child who cannot read a single word can navigate the full experience on their own. The only thing a parent needs to do is turn the sound on.",
            },
            {
              q: "What if my child gets an answer wrong?",
              a: "There are no red marks, buzzers, or negative feedback in Nurture. A wrong answer gets a gentle animation, an encouraging re-prompt from Pip, and another try. After two attempts, the correct answer is gently highlighted and the child taps it themselves. Every session always ends on a success — the sticker is awarded for finishing, regardless of how the session went.",
            },
            {
              q: "How long are the activities?",
              a: "Each activity session has three questions. For most children aged 3–6, a full session takes 3–5 minutes. There are no timers, no pressure, and no penalty for taking longer. The experience adapts to the child's pace, not the other way around.",
            },
            {
              q: "Can my child choose which activity to do?",
              a: "No — and this is intentional. Research on children at this age shows that presenting multiple choices creates decision anxiety and can lead to disengagement. The teacher has already chosen the right activity for where your child is developmentally. Your child's screen shows them what's next. Their job is to play.",
            },
            {
              q: "Is there any comparison to other children?",
              a: "Never. Nurture does not show leaderboards, class averages, or any data that implies comparison. Your child's progress is measured only against their own previous performance. There is no feature in Nurture that could make your child feel behind — by design.",
            },
          ]}
        />
      </main>

      {/* Section 9: Footer */}
      <PersonaFooter />
    </>
  );
}
