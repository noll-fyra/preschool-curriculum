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
  NELAlignmentMockup,
  MessagingMockup,
  BreadthHeroMockup,
} from "@/components/persona/teacher/Mockups";

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ForSchoolsPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Section 1: Hero */}
        <PersonaHero
          badgeLabel="Nurture for Schools"
          headline="The learning platform built for Singapore preschools."
          subheadline="Nurture closes the gap between your curriculum and your data — aligning every classroom activity, every milestone, and every parent update to the NEL Framework, automatically."
          primaryCTA={{
            label: "See how it works",
            href: "/demo/teacher",
          }}
          visual={<HeroDashboardMockup />}
        />

        {/* Section 2: Positioning line */}
        <PositioningLine>
          Curriculum-aligned learning intelligence, built for early childhood at
          scale.
        </PositioningLine>

        {/* Section 3: Primary features (5) */}
        <PrimaryFeaturesSection
          sectionEyebrow="Built for Singapore preschools"
          sectionHeadline={
            <>
              Close the gap between
              <br />
              curriculum and data.
            </>
          }
          heroFeature={{
            eyebrow: "NEL alignment",
            headline: "Every milestone mapped to the NEL Framework — out of the box.",
            body: "Nurture's milestone schema translates the Ministry of Education's end-of-K2 learning goals into observable, sequenced milestones across Language & Literacy, Numeracy, and Social & Emotional Development. The translation work your curriculum team does independently is already done. Your teachers start from day one with a framework they recognise.",
            bullets: [
              "30 NEL-aligned milestones across three MVP learning areas",
              "Observable, sequenced levels (Beginning / Developing / Secure)",
              "Curriculum team starts from a trusted baseline, not a blank page",
            ],
            visual: <NELAlignmentMockup />,
            visualBg: "#E5F4F1",
          }}
          gridFeatures={[
            {
              eyebrow: "Cohort analytics",
              headline: "Cohort-level attainment data without a separate analytics tool.",
              body: "Directors and academic leads see class-wide milestone attainment rates, cohort progress by term, and centre-to-centre comparison across your network. Inspection readiness is not a quarterly scramble — it's the current state of your dashboard.",
            },
            {
              eyebrow: "Teacher workload",
              headline: "Measurable reduction in teacher administrative load.",
              body: "Assessment documentation, milestone tracking, and report drafting are the primary drivers of teacher burnout in early childhood education. Nurture automates all three — activity completions update the tracker automatically; report drafts are generated before the teacher opens the page. The same quality of documentation, in a fraction of the time.",
            },
            {
              eyebrow: "Parent engagement",
              headline: "Parent engagement that goes beyond the newsletter.",
              body: "Parents receive a live progress feed — milestone achievements, activity completions, and teacher notes — in plain language, in real time. The parent satisfaction question at inspection is no longer about frequency of contact. It is about the quality of information parents receive.",
            },
            {
              eyebrow: "Built to scale",
              headline: "Built to scale from one centre to your entire network.",
              body: "Nurture's architecture is designed for multi-centre deployment — with school-level configuration, class-level data isolation, and network-wide attainment visibility for operators managing multiple campuses. Start with one centre. Expand without re-implementation.",
            },
          ]}
        />

        {/* Section 4: Integration / connected experience (3) */}
        <IntegrationSection
          sectionEyebrow="Works with what you have"
          sectionHeadline={
            <>
              Integrates with the curriculum,
              <br />
              the classroom, and the home.
            </>
          }
          heroFeature={{
            eyebrow: "Completes the picture",
            headline: "Nurture completes the picture your existing platforms can't.",
            body: "Brightwheel, Illumine, and similar platforms handle operations — attendance, billing, parent messaging. They do not deliver or track learning. Nurture fills exactly that gap: adaptive learning delivery, automatic assessment, and real-time progress visibility, aligned to the NEL Framework. The two types of platform are complementary — not competing.",
            bullets: [
              "Sits alongside existing operations platforms",
              "Focuses purely on learning delivery and measurement",
              "Closes the gap between curriculum plans and real data",
            ],
            visual: <MessagingMockup />,
            visualBg: "#F0F5FC",
          }}
          halfFeatures={[
            {
              eyebrow: "PDPA-conscious",
              headline: "PDPA-conscious architecture, designed for Singapore.",
              body: "Nurture is built with Singapore's Personal Data Protection Act in mind. Child data is held at the class level with strict access controls — teachers see only their own class, directors see their own centre, network operators see only aggregated data. No child data is shared across school accounts.",
            },
            {
              eyebrow: "Curriculum editor",
              headline:
                "A curriculum editor that lets your team customise without breaking the framework.",
              body: "Your academic team can modify milestone statements, add centre-specific milestones, and reorder within levels — without touching the underlying data structure. Milestone IDs remain immutable; historical records remain intact. Customisation without technical risk.",
            },
          ]}
        />

        {/* Section 5: Breadth / range (4) */}
        <BreadthSection
          sectionEyebrow="From classroom to network"
          sectionHeadline={
            <>
              From classroom practice to
              <br />
              network governance — one platform.
            </>
          }
          heroFeature={{
            eyebrow: "Continuous data loop",
            headline: "One continuous data loop, from teacher to director.",
            body: "The teacher logs an observation. The milestone tracker updates automatically. The parent sees the progress feed. The director sees cohort attainment. Nurture is not a reporting tool added on top of classroom practice — it is the loop that connects classroom practice to every stakeholder who needs to understand it.",
            bullets: [
              "Every interaction feeds the same underlying data model",
              "Real-time views for teachers, directors, and parents",
              "No separate data entry for reporting or inspection",
            ],
            visual: <BreadthHeroMockup />,
            visualBg: "#E5F4F1",
          }}
          thirdFeatures={[
            {
              eyebrow: "Onboarding",
              headline: "Onboarding that works from day one.",
              body: "New children complete a short placement assessment on enrolment — determining their starting level rather than defaulting every child to Beginning. New teachers access fully populated student profiles on their first day. The institutional knowledge is in the system, not in individual heads.",
            },
            {
              eyebrow: "Compliance",
              headline: "Curriculum compliance, documented automatically.",
              body: "Every activity completion is timestamped and tied to a specific NEL milestone. Every teacher observation is logged with date and teacher identity. The audit trail for curriculum delivery is built as teachers work — not reconstructed before an inspection.",
            },
            {
              eyebrow: "Roadmap",
              headline:
                "A roadmap built for where Singapore early childhood education is going.",
              body: "Nurture's post-MVP roadmap includes multilingual support (Mandarin, Malay, Tamil), full coverage of all six NEL learning areas, a P1 readiness extension track, and a portfolio mode that follows each child from enrolment to graduation. The platform grows with the sector.",
            },
          ]}
        />

        {/* Section 6: Ecosystem grid */}
        <EcosystemGrid
          headline="Designed for the institutional realities of Singapore preschools."
          items={[
            {
              icon: "📘",
              name: "NEL Framework",
              desc: "All milestones pre-mapped — no curriculum alignment work required from your team.",
              iconBg: "#E5F4F1",
            },
            {
              icon: "🏫",
              name: "Multi-centre architecture",
              desc: "Centre-level configuration with network-wide visibility for operators and directors.",
              iconBg: "#FEF0E7",
            },
            {
              icon: "🔐",
              name: "PDPA-conscious data model",
              desc: "Class-level access controls, Singapore data residency, and audit-ready records.",
              iconBg: "#FFF8E8",
            },
            {
              icon: "✏️",
              name: "Curriculum editor",
              desc: "Academic leads can customise milestones without touching the underlying data structure.",
              iconBg: "#FEF2EF",
            },
            {
              icon: "📄",
              name: "Auto-generated reports",
              desc: "Developmental summaries drafted automatically for every child — teacher reviews and approves.",
              iconBg: "#F0F5FC",
            },
            {
              icon: "📊",
              name: "Director analytics",
              desc: "Cohort attainment rates, centre comparison, and term-over-term progress for academic leadership.",
              iconBg: "#E5F4F1",
            },
          ]}
        />

        {/* Section 7: Final CTA */}
        <PersonaFinalCTA
          headline="Request a demo for your school."
          subheadline="See how Nurture works in a Singapore preschool context — and what it would look like deployed across your centre or network."
          proof="Built with NTUC First Campus — Singapore's largest preschool operator, serving 28,800 children across 170 centres."
          options={[
            {
              icon: "🏫",
              title: "Request a demo",
              desc: "See Nurture set up for your school with your own context in mind.",
              ctaLabel: "Request a demo →",
              ctaHref: "mailto:hello@nurture.edu.sg",
              primary: true,
            },
            {
              icon: "📄",
              title: "Download product overview",
              desc: "Get a concise overview PDF to share with your leadership team.",
              ctaLabel: "Download overview →",
              ctaHref: "mailto:hello@nurture.edu.sg",
            },
          ]}
        />

        {/* Section 8: Q&A */}
        <PersonaQA
          items={[
            {
              q: "How does Nurture align to the NEL Framework?",
              a: "Nurture's milestone schema was built directly from the Ministry of Education's Nurturing Early Learners Framework. The framework defines end-of-K2 learning goals across five areas. Nurture translates those goals into observable, sequenced milestones across three MVP areas — Language & Literacy, Numeracy, and Social & Emotional Development — with Aesthetics & Creative Expression, Discovery of the World, and Motor Skills planned for Wave 1. Your teachers work with milestones they already recognise from their curriculum planning.",
            },
            {
              q: "How does this complement the platforms we already use?",
              a: "Platforms like Brightwheel and Illumine solve the operations layer — billing, attendance, parent messaging. Nurture solves the learning layer: adaptive content delivery, automatic assessment, and real-time progress visibility. The two categories of platform are complementary. Nurture does not replace your existing operations platform — it closes the gap it leaves in learning intelligence.",
            },
            {
              q: "How does Nurture handle data privacy and PDPA compliance?",
              a: "Nurture's data model enforces strict access controls at the class level. Teachers access only their own children's data. Directors access only their own centre. Network operators see aggregated data, not individual child records. Data residency and PDPA compliance posture are addressed before any production deployment beyond the pilot. Full PDPA documentation is available for review as part of the procurement process.",
            },
            {
              q: "How long does deployment take, and what does onboarding require?",
              a: "A single-centre deployment can be stood up within one school term. The NEL milestone framework is pre-loaded — your academic team does not need to build it from scratch. Class rosters are imported during setup. Teacher onboarding takes approximately one school day. A dedicated implementation support resource is available for network-scale deployments.",
            },
            {
              q: "What does Nurture cost?",
              a: "Nurture is currently in early access for pilot schools. Pricing for production deployment is structured per-centre, with network pricing available for operators managing multiple campuses. Contact us to discuss pricing for your organisation's context — we are not a one-size-fits-all platform and we do not price like one.",
            },
          ]}
        />
      </main>

      {/* Section 9: Footer */}
      <PersonaFooter />
    </>
  );
}

