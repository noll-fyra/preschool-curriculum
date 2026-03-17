# Product Requirements Document: Nurture

_Version 1.0 | Status: In Progress | Owner: Director, NTUC First Campus_

---

## Table of Contents

1. Background & Context
2. Problem Statement
3. Solution Approach
4. Stakeholder Experiences
5. MVP Features
6. Data Architecture Overview
7. Post-MVP Roadmap
8. Open Questions & Resolved Decisions
9. Referenced Documents

---

## 1. Background & Context

### About the school

The director leading this initiative is from NTUC First Campus, Singapore's largest preschool network, operating over 170 centres under the My First Skool and Little Skool-House brands and serving approximately 28,800 children annually. My First Skool uses the PETAL© pedagogical approach — Playing, Exploring, Thinking, and Applying Learning — rooted in the Ministry of Education's Nurturing Early Learners (NEL) Framework 2022.

In 2021, My First Skool ran a Home Learning Programme for 22,000 children that included guided video sessions and parent-accessible activities. A 2019 Nielsen survey commissioned by the organisation found that over 60% of parents want to engage their children in learning at home, and one in two parents prefer a preschool that offers home-based learning. The product described in this PRD builds directly on this validated demand.

### The NEL Framework

The Nurturing Early Learners (NEL) Framework 2022, published by Singapore's Ministry of Education, is the national curriculum framework for preschool children aged four to six (Nursery 2, Kindergarten 1, and Kindergarten 2). It defines five learning areas — Aesthetics & Creative Expression, Discovery of the World, Health, Safety & Motor Skills Development, Language & Literacy (English and Mother Tongue), and Numeracy — along with values, social and emotional competencies, and learning dispositions.

The framework specifies end-of-K2 learning goals but does not publish the intermediate milestone progressions that teachers use to track children along the way. Translating those learning goals into observable, sequenced milestones is a curriculum design task each school undertakes independently. Nurture's milestone schema (see `milestone-schema.md`) performs this translation for the MVP's three active learning areas.

### Market context

The global EdTech for Early Childhood market was valued at USD 13.4 billion in 2024 and is projected to reach USD 55.6 billion by 2034, growing at 15.3% CAGR. The most-used platforms in Singapore and Southeast Asia — Brightwheel, Illumine, HiMama/Lillio — solve the operations layer (attendance, billing, parent messaging) but do not deliver or track learning. No platform currently integrates adaptive learning delivery, automatic assessment, real-time parent progress visibility, and home learning into a single product aligned to the NEL framework.

---

## 2. Problem Statement

### The four core problems

**Problem 1: One-pace curriculum delivery**
All children in a class are taught the same content at the same pace, regardless of their current developmental level. A child who has already mastered letter recognition sits through the same lesson as a child who is just starting. This wastes instructional time for the advanced child and fails to provide enough support for the child who is behind.

**Problem 2: School-only learning**
Learning effectively stops when the school day ends. Parents want to support learning at home — validated by NFC's own research — but don't know what their child is working on, what the right level of activity looks like, or how to tell whether their effort is actually aligned to school. The school-home loop is broken.

**Problem 3: Infrequent parent updates**
Parents receive formal updates on their child's progress once or twice per term at most. In between, they have little visibility into what their child knows, what they're working toward, and whether they're on track for Primary 1 readiness. This creates anxiety and disengagement.

**Problem 4: Manual, time-intensive assessment**
Teachers assess each child through continuous observation, manually document findings against developmental frameworks, and periodically produce written reports. This process is time-consuming, inconsistent across teachers, and difficult to scale. It is one of the primary drivers of teacher administrative burden and burnout — 45% of early childhood educators in a 2024 survey reported battling burnout, with administrative load as a leading cause.

### Validated demand

A parent survey conducted at the pilot school confirmed:

- 100% of parents want to understand how their child is doing and how they can help support development
- ~50% said they do not have time to participate in activities alongside their child but want their child to be able to learn independently
- ~50% said they are open to participating in activities with their child

This creates two distinct parent personas — **passive parents** (want independent child learning) and **active parents** (want to co-participate) — both of whom need to be served within the same product.

---

## 3. Solution Approach

Nurture is a learning platform for preschool and kindergarten classrooms that closes all four gaps simultaneously by building one continuous data loop across teacher, child, and parent.

```
Teacher assigns activity set
         ↓
Child completes activities (at school or at home)
         ↓
System records results, updates milestone progress
         ↓
Parent sees real-time progress feed + context blurb
         ↓
Teacher reviews dashboard (auto-updated), not a blank report
```

The four gaps are addressed as follows:

| Problem                   | How Nurture solves it                                                                                                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One-pace curriculum       | Each child has their own activity queue, personalised to their current milestone level. A child at Developing sees Developing activities; a child at Beginning still sees Beginning activities regardless of their classmates' progress. |
| School-only learning      | Activities are available in the parent-facing app. Passive parents see their child's queue and let the child complete independently. Active parents see suggested co-activities alongside the standard queue.                            |
| Infrequent parent updates | A living progress feed replaces the quarterly report. Parents see milestone progress, recent activity results, and plain-language explanations of what their child is working on.                                                        |
| Manual assessment         | Activity completions automatically update the milestone tracker. Teacher dashboard shows each child's current level across learning areas. Auto-generated report drafts replace blank-page writing.                                      |

### What Nurture is not

Nurture is not a school management platform — it does not handle billing, attendance, HR, or enrolment. It is not a general-purpose consumer education app. It is not designed to replace teachers; teachers remain essential for observation, relationship, and the irreducible human work of early childhood education.

---

## 4. Stakeholder Experiences

### Teacher / Director

The teacher opens the dashboard each morning and sees a status card per child, showing their current developmental level across the active learning areas (Language & Literacy, Numeracy, Social & Emotional Development) as a Beginning / Developing / Secure status for each area.

She opens a child's profile to see granular milestone progress — which milestones are achieved, which are in progress (and how close to the mastery threshold), and which have not yet started. The activity queue for that child is pre-populated by the system based on current level. She can review and swap activities if needed.

At report time, she opens the report generator. For each child, a developmental summary has been pre-drafted based on activity completion data and teacher observation logs. She reads it, adds qualitative notes where relevant, and approves it. The report is published directly to the parent's app.

For Social & Emotional Development, she uses a quick-log mechanic throughout her day: when she observes a behaviour linked to a milestone (e.g. a child taking turns unprompted), she taps the child's name and the relevant milestone and records an observation. Once five observations are logged across five separate days, the milestone is achieved automatically.

### Child

The child opens the app on a classroom tablet or a parent's phone and sees a simple queue of 2–3 illustrated activity tiles. Each tile shows a character and a visual cue — no text required to understand what it is. The child taps an activity and is immediately guided by audio. Every instruction is spoken. Every answer option is tappable. The session takes 2–4 minutes and ends with a celebration screen.

The child never sees numbers, scores, or levels. The experience is entirely framed as a game.

### Parent — Passive mode

The passive parent opens the app and sees their child's progress feed: a milestone-by-milestone view of what their child is working on and how they are doing. Each entry includes a plain-language explanation of why this milestone matters ("Knowing that 'fish' starts with an 'f' sound is called phonemic awareness — the key to cracking reading").

When their child completes an activity (at school or via the app), the parent receives a push notification: "Rayan completed a letter sounds activity today. He got it right 2 out of 3 times — he's making great progress." The child's activity queue is also visible, so the passive parent can hand the phone to their child to play independently.

### Parent — Active mode

The active parent sees everything the passive parent sees, plus a co-activity suggestion alongside each standard activity. Co-activities are 5-minute guided parent-child interactions that reinforce the same skill in a real-world context (e.g. "Point to letters you see on food packaging together"). These are simple, no-setup activities described in plain language.

---

## 5. MVP Features

### Scope boundary

The MVP covers one school, one class, and three learning areas (Language & Literacy, Numeracy, and Social & Emotional Development — the last teacher-assessed only). It is a prototype to demonstrate the full loop end-to-end, not a production-ready multi-school deployment.

### Must-have features

#### Teacher / Director side

| Feature                                      | Description                                                                                                                                                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Class roster with developmental status cards | Dashboard showing each child's current level (Beginning / Developing / Secure) per learning area, displayed as a colour-coded status. Red = Beginning, Amber = Developing, Green = Secure.                              |
| Child profile with milestone tracker         | Detailed view per child showing every milestone, current status (not started / in progress / achieved), and — for in-progress milestones — the current mastery count (e.g. "3/5 observations" or "2 passing sessions"). |
| Weekly activity assignment                   | System pre-selects the appropriate activities for each child based on their current milestone level. Teacher can review the queue and swap individual activities if needed before the week begins.                      |
| Quick-observation logger (SED)               | One-tap logging of a teacher observation against a specific SED milestone for a specific child. Daily uniqueness enforced (one log per child per milestone per day).                                                    |
| Auto-generated assessment draft              | At report time, the system produces a pre-written developmental summary per child based on milestone achievement data and observation logs. Teacher reviews, edits qualitative notes, and approves.                     |
| Report publishing                            | Approved report is published to the parent's app directly from the teacher dashboard.                                                                                                                                   |

#### Child-facing (tablet / parent phone)

| Feature                                 | Description                                                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Activity queue (2–3 tiles)              | Simple illustrated queue of the child's current assigned activities. No menus, no browsing. The queue is curated by level. |
| 20 NEL-aligned tap-to-select activities | Full activity set as specified in `activities.md`. Each activity has 4–5 variants to prevent memorisation.                 |
| Audio-guided interaction                | Every instruction, prompt, and feedback message delivered by audio. No reading required at any point.                      |
| Activity completion tracking            | System records each session result (pass/fail), timestamps it, and feeds into the milestone mastery calculation.           |
| Celebration end screen                  | After completing a session, a brief celebratory animation plays before the child returns to the queue.                     |

#### Parent-facing

| Feature                          | Description                                                                                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Progress feed                    | Milestone-by-milestone view of the child's developmental status. Each milestone shows current level, status, and a plain-language parent description explaining why it matters. |
| Activity completion notification | Push notification when the child completes an activity, with a short context blurb about what the child is learning.                                                            |
| Passive / Active mode toggle     | Parents self-select their mode. Passive: sees progress feed and child's queue only. Active: also sees co-activity suggestions alongside the standard queue.                     |
| Published report access          | Formal reports published by the teacher appear in the parent's app as a formatted developmental summary.                                                                        |

### Out of scope for MVP

| Feature                         | Reason deferred                                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Onboarding placement assessment | Planned for Wave 1. For MVP, all new children start at the Beginning level.                                          |
| AI adaptive sequencing          | Rules-based level assignment is sufficient. Algorithmic adaptation adds complexity without proportional MVP benefit. |
| Full 6-area content library     | 3 learning areas (LL, NUM, SED) cover the MVP. Remaining 3 NEL areas deferred to Wave 1.                             |
| Multilingual support            | English first. Mandarin and Malay in Wave 2.                                                                         |
| In-app two-way messaging        | Notifications are one-directional in MVP. Two-way messaging deferred to Wave 1.                                      |
| Admin curriculum editor         | Administrators cannot modify the milestone schema in MVP. Planned for Wave 1.                                        |
| Billing / attendance / HR       | Not the problem being solved.                                                                                        |
| Multi-school deployment         | MVP covers one school. Multi-school architecture deferred to Wave 3.                                                 |
| Offline support                 | Assumed reliable connectivity for MVP.                                                                               |
| Data privacy compliance (PDPA)  | Not in scope for prototype phase. Required before any production launch.                                             |

---

## 6. Data Architecture Overview

### Key entities

| Entity                   | Purpose                                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `School`                 | The institution. One school in MVP.                                                                                        |
| `Class`                  | A group of children. One class in MVP.                                                                                     |
| `Teacher`                | Educator account. Manages class, logs observations, approves reports.                                                      |
| `Child`                  | The learner. Accessed via teacher or parent account — no independent login.                                                |
| `Parent`                 | Parent/guardian account. Has a mode setting (passive / active). Linked to one or more children.                            |
| `LearningArea`           | One of the three MVP areas (LL, NUM, SED). Has an assessment_type (skill / behaviour).                                     |
| `DevelopmentalLevel`     | Beginning / Developing / Secure, with sort order.                                                                          |
| `Milestone`              | Individual milestone record with ID, area, level, statement, parent description. See full schema in `milestone-schema.md`. |
| `ChildMilestoneProgress` | Per-child, per-milestone status. Updated by activity results (skill) or teacher observations (behaviour).                  |
| `Activity`               | Content unit. Maps to one milestone. Has a type, audio assets, image assets, correct answer logic.                         |
| `ActivityVariant`        | One of 4–5 versions of an activity. Different objects/numbers/characters but same skill being tested.                      |
| `ActivitySession`        | One play-through by a child. Records 3 question results and a pass/fail outcome.                                           |
| `TeacherObservation`     | Single observation log: child, milestone, teacher, date. Date must be unique per child-milestone pair.                     |
| `Report`                 | Teacher-generated developmental summary for a child. Has a draft state (auto-generated) and published state.               |

### Milestone mastery logic

```
Skill-based milestone (LL, NUM):
  ACHIEVED if:
    last 3 ActivitySessions for this child × milestone = PASS  [3 consecutive]
    OR
    5 of last 7 ActivitySessions = PASS  [5 of 7]

Behaviour-based milestone (SED):
  ACHIEVED if:
    COUNT(TeacherObservations WHERE child = X AND milestone = Y AND date is unique) >= 5
```

Full schema reference: see `milestone-schema.md`.

---

## 7. Post-MVP Roadmap

### Wave 1 — Completing the core product

These features were deliberately excluded from MVP but are required before the platform can be offered to additional schools.

| Feature                               | Description                                                                                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Onboarding placement assessment       | Short placement activity set (3–4 questions per area) that determines a new child's starting level on enrolment rather than always beginning at Beginning.                       |
| Admin curriculum editor               | Allows school administrators to modify milestone statements, reorder within levels, and add custom milestones without affecting historical data (IDs remain immutable).          |
| Full NEL content library              | Extends to all 6 NEL learning areas: adds Aesthetics & Creative Expression, Discovery of the World, and Motor Skills Development. Additional milestones and activities for each. |
| In-app two-way messaging              | Two-way communication channel between teacher and parent within the app, replacing reliance on WhatsApp or external channels.                                                    |
| Photo / video in teacher observations | Allows teachers to attach a photo or short video to an observation log, providing richer evidence for developmental records.                                                     |
| Director-level analytics              | Class-wide progress charts, cohort-level milestone attainment rates, and term-over-term comparison views for the school director.                                                |

### Wave 2 — Deepening the learning loop

| Feature                               | Description                                                                                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Multilingual support                  | Mandarin, Malay, and Tamil interfaces. Mother Tongue Language (MTL) literacy milestones and activities aligned to NEL MTL framework.                                |
| Co-activity content library           | Expanded set of parent-child co-activities for active parents, with themed packs (e.g. "Kitchen Maths", "Story Walk") that reinforce school learning in daily life. |
| Sibling accounts                      | One parent account managing multiple children across the same school.                                                                                               |
| Term developmental trajectory reports | Longitudinal view showing a child's progress from enrolment to present, not just current snapshot. Exported as a formatted PDF.                                     |
| Customisable activity upload          | Teachers can write and upload their own activities using a simple content template, extending beyond the built-in library.                                          |

### Wave 3 — Platform and scale

| Feature                        | Description                                                                                                                                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Multi-school deployment        | Architecture to support multiple schools under one administrator, with school-level configuration and class-level isolation.                                                                    |
| Franchise / operator dashboard | For operators like NTUC First Campus managing multiple centres: network-wide attainment data, centre comparison, and curriculum compliance monitoring.                                          |
| School curriculum overlay      | Base NEL milestones remain constant, but each school can add pedagogical overlays (Reggio Emilia themes, PETAL-aligned framing, Montessori variations) without modifying the underlying schema. |
| AI activity generation         | Teacher describes a learning goal in plain language; the system drafts a new activity aligned to the relevant milestone. Teacher reviews and approves before publishing.                        |
| P1 extension track             | Once a child achieves Secure across all areas, an optional Primary 1 readiness track unlocks, providing bridging content and milestones beyond the NEL end-of-K2 scope.                         |
| Portfolio mode                 | Each child accumulates a visual developmental record from enrolment through graduation. The portfolio is exportable and shareable with the child's Primary 1 school on request.                 |

---

## 8. Open Questions & Resolved Decisions

### Resolved

| Decision                                   | Resolution                                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Developmental levels                       | Three-tier: Beginning / Developing / Secure                                                                         |
| Milestone types                            | Skill-based (LL, NUM) assessed via activities; Behaviour-based (SED) assessed via teacher observation               |
| MVP learning areas                         | Language & Literacy + Numeracy (activity-based); Social & Emotional Development (observation-based)                 |
| Activity format                            | Tap-to-select only in MVP                                                                                           |
| Child login                                | No child login. Children access via teacher's classroom tablet or parent's app.                                     |
| Offline support                            | Not required for MVP (assumed reliable connectivity)                                                                |
| Data privacy (PDPA)                        | Deferred. Not in MVP scope. Required before any production launch beyond the prototype.                             |
| Milestone framework alignment              | NEL Framework. My First Skool's PETAL approach is pedagogically compatible; no separate milestone schema required.  |
| Starting level for new children            | MVP: all children start at Beginning. Wave 1: onboarding placement assessment will determine starting level.        |
| SED milestone mastery rule                 | 5 teacher observations across 5 separate calendar days (1 observation per child per milestone per day maximum)      |
| Skill milestone mastery rule               | 3 consecutive passing sessions, OR 5 passing sessions out of 7 attempts                                             |
| Secure level ceiling                       | Secure is the MVP ceiling. Wave 3 will add a P1 extension track.                                                    |
| Parent modes                               | Passive (progress feed + independent child queue) and Active (adds co-activity suggestions)                         |
| Terminology                                | Beginning / Developing / Secure confirmed with teaching staff                                                       |
| NTUC First Campus curriculum compatibility | My First Skool curriculum is NEL-aligned. No divergent proprietary framework requiring a separate milestone schema. |

### Open

| Question                    | Status                                                                                                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content production pipeline | Who creates the activity illustrations and audio assets? In-house, contractor, or AI-generated? This is a significant scope item before build can begin.              |
| Technology stack            | Not yet specified. Key constraints: must run on tablets (iOS/Android), must support audio playback, must work as both a web app and native app (or one or the other). |
| Character and visual style  | The animal/character system used across activities needs a consistent visual identity before content production starts.                                               |
| Report format               | What does the auto-generated developmental summary look like? A template should be agreed with the director before the report generator is built.                     |

---

## 9. Referenced Documents

| Document              | Description                                                                                                                                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `milestone-schema.md` | Full milestone definitions for all 30 MVP milestones across Language & Literacy, Numeracy, and Social & Emotional Development. Includes mastery rules, data model entities, and future extension notes.               |
| `activities.md`       | Complete activity specifications for all 20 MVP tap-to-select activities across Language & Literacy and Numeracy. Includes scene descriptions, audio prompts, answer options, feedback logic, and variant dimensions. |
