# Parent Experience — Design Specification

## Purpose

This document specifies the parent-facing product experience for Nurture — a preschool education and learning platform. It covers all screens, interactions, and design principles for the parent-facing layer of the platform.

It is intended as a reference for AI coding assistants and developers building the parent-facing product.

For the teacher-facing experience, see `teacher-dashboard-spec.md` and `secondary-screens-spec.md`.
For the child-facing experience, see `child-experience-spec.md`.

---

## 1. Design Principles

### The emotional brief
The parent experience answers one underlying question: *"Is my child okay, and is there anything I should be doing?"*

Every screen, card, and interaction should be evaluated against this brief. If it doesn't help answer that question, it doesn't belong in the parent experience.

### The two parent archetypes
The product must serve both simultaneously:

**The engaged parent** — checks the app daily, wants detail, eager to do home activities, may ask questions. Needs depth available when they want it.

**The reassured parent** — mostly wants to know their child is happy and progressing. Checks occasionally. Needs the top line to be instantly clear without digging.

**Solution:** Lead with simplicity. Make depth available. Default views are warm and scannable. Detail is always one tap deeper, never forced.

### Usage context
Parents use this app on a phone, one-handed, often distracted — at 7am before work, during a lunch break, or after the child is in bed. The experience must be fast, readable at a glance, and never require extended attention to understand.

### Language rule
**Parents are not teachers.** Every piece of developmental data shown in the parent experience has been translated into plain English — either by the teacher when writing, or by the system before surfacing. Framework codes, milestone IDs, assessment terminology, and domain percentages never appear in the parent view.

---

## 2. Screen Inventory

| # | Screen | Type |
|---|---|---|
| 1 | Child Profile Selector | Entry screen (multi-child families) |
| 2 | Home Feed | Primary screen |
| 3 | Check-In | Dedicated screen + top bar shortcut |
| 4 | My Child | Full screen (3 tabs) |
| 5 | Home Learning | Full screen |
| 6 | Messages | Full screen |
| 7 | Notifications | Panel / sheet |

---

## 3. Child Profile Selector

### Purpose
Entry screen for families with more than one child enrolled. Allows parents to navigate between children's experiences.

### When it appears
- On app open, if the account has more than one child profile
- Single-child families skip this screen entirely and go directly to the Home Feed

### What it shows
Each child is represented by:
- Their avatar and name
- School name (relevant if children attend different schools on the platform)
- A small indicator badge if there is something new: a new daily update, an unread message, a new milestone, or a pending check-in

### Switching between children
A persistent child switcher in the top bar on all main screens allows switching between children without returning to this screen. Switching re-renders all screens for the selected child.

### Design note
This screen must not feel like administration. It should feel like choosing which child to check in on — warm, personal, and fast. Avatars should be large and tappable.

---

## 4. Home Feed

### Purpose
The parent's primary screen. A narrative of what their child has been doing, learning, and experiencing — not a dashboard of data.

### Structure
A chronological feed, most recent at the top. Each entry is a card. Cards feel like dispatches from the child's day — not data points.

---

### Card types

#### Daily Update card
Teacher-authored (or system-generated, teacher-approved) summary of the child's day.

**Contains:**
- A short paragraph in warm, plain language
- One or two photos from the day (if the teacher has attached them)
- A mood indicator — a simple illustrated face showing how the child seemed that day
- Timestamp

**Frequency:** Every school day
**Design note:** Must feel like a personal note from the teacher, not a generated report. Tone is warm and specific, not generic.

---

#### Milestone card
Surfaces when the system confirms a developmental milestone has been observed.

**Contains:**
- A warm, specific headline in plain English: *"Ayla counted to 10 all by herself during garden time today!"*
- A brief "what this means" line providing developmental context: *"Counting to 10 reliably is a key step in early number sense"*
- The milestone name in small, secondary text for parents who want it — never as the headline
- A celebratory visual treatment (subtle animation or illustration)

**Tapping:** Opens the relevant milestone in My Child → Milestones tab

---

#### Artefact card
Surfaces when the child creates something in the app — a drawing, a voice story, a recorded puppet show — or when the teacher attaches a creative output to an observation.

**Contains:**
- Thumbnail of the artefact
- Child's name and the place in the world it came from (e.g. "Made in the Making Studio")
- Timestamp
- Reaction options: a small set of warm responses (heart, star, smiley face)

**Tapping:** Opens the full artefact — drawing in full, voice story with playback, puppet show animation

**Reactions:** Parent reactions are visible to the teacher in the observation feed. The teacher can relay the reaction to the child: *"Your mum loved your drawing today."* The child does not see reactions directly in the app.

---

#### Home learning card
A suggested activity for today, directly connected to what the child has been working on at school.

**Contains:**
- A title and one-sentence description
- Which domain it supports — in plain language: *"This supports Ayla's language development"*
- Estimated time: typically 5–15 minutes
- What you need: usually nothing, or simple household items
- Step-by-step instructions in plain, parent-friendly language
- A "We did this!" button — tapping logs the activity as a home observation visible to the teacher

**Frequency:** One per day, rotating across domains
**Tapping:** Opens the Home Learning screen

---

#### School update card
Class-wide announcements from the teacher — reminders, event notifications, photos from a class activity.

**Frequency:** As needed by teacher
**Design note:** Visually distinct from child-specific cards — uses a slightly different visual treatment to signal it is about the class, not specifically about this child

---

### What the home feed does not show
- Raw observation notes
- Developmental domain percentages
- Milestone codes or framework references
- Anything requiring interpretation by a non-specialist

---

## 5. Check-In

### Purpose
Allows parents to digitally check their child in (and out) of school. Check-in status updates in real time on the teacher's dashboard — the child's presence indicator updates immediately on the teacher's children grid when the parent checks in.

This replaces or supplements the physical sign-in sheet at the school gate. It also enables parents to communicate context at drop-off without needing a face-to-face conversation with the teacher.

### Entry points
- A prominent **Check In** button on the Home Feed (visible on school days before the school's configured start time)
- A persistent shortcut in the top bar on school day mornings
- The Check-In screen in the bottom navigation (always accessible)

---

### Check-In Flow

**Step 1: Confirm attendance**
The parent sees their child's name and avatar with a simple question: *"Is [child name] coming to school today?"*

Two options:
- **Yes, checking in** — proceeds to Step 2
- **Not today** — proceeds to absence reporting (see below)

---

**Step 2: Drop-off context (optional but encouraged)**
A short, optional note field with a set of quick-tap presets:

| Preset | Example label |
|---|---|
| All good | "All good today!" |
| Tired | "Tired — early night" |
| Unwell but coming | "Slight cold, keep an eye" |
| Upset at home | "Had a hard morning" |
| Excited | "Really looking forward to today" |
| Custom | Free text field |

The parent selects one preset or types a custom note. This note appears on the teacher's dashboard as a context note on the child's card — visible before the school day begins, so the teacher can greet the child with appropriate awareness.

**This field is optional.** Parents who just want to check in without context can skip it in one tap.

---

**Step 3: Confirmation**
A simple confirmation screen: *"[Child name] is checked in. See you at pick-up!"*

The check-in timestamp and any drop-off note are sent immediately to:
- The teacher's dashboard (child presence indicator updates to "present")
- The school's attendance record (admin layer)

---

### Check-Out Flow

**Entry point:** Same Check-In screen, which switches to a Check-Out state once the child is marked as present.

**Step 1: Confirm pick-up**
*"Are you picking up [child name] today?"*

Two options:
- **Yes, I'm collecting** — confirms the parent is the authorised pick-up for today; proceeds to Step 2
- **Someone else is collecting** — opens a short form to specify who (from the authorised pick-up list stored in the child's profile, or a free-text field for adding a one-off authorised adult)

**Step 2: Estimated arrival time (optional)**
A simple time picker — *"What time are you arriving?"* — optional, but helpful for teachers managing end-of-day logistics.

**Step 3: Confirmation**
The check-out intention is logged and the teacher is notified: *"Ayla's parent is on the way — arriving at approximately 3:15pm."*

When the teacher marks the child as physically departed on the teacher dashboard, the parent receives a confirmation: *"Ayla has been signed out. Have a great afternoon!"*

---

### Absence Reporting Flow

Triggered when the parent selects "Not today" in Step 1 of the check-in flow, or separately from the Messages screen.

**Step 1: Reason**
A set of quick-tap reason presets:

| Preset |
|---|
| Unwell / sick |
| Family appointment |
| Family event |
| Holiday / travel |
| Other |

**Step 2: Expected return**
A simple date picker — *"When do you expect [child name] back?"*

**Step 3: Optional note**
A free-text field for any additional context the teacher should know.

**Confirmation:** Absence is logged in the attendance system and a notification is sent to the teacher before the school day begins. The teacher's stat strip updates to reflect the expected absence. No manual follow-up required from either side.

---

### Real-Time Sync with Teacher Dashboard

| Parent action | Teacher dashboard update |
|---|---|
| Check-in confirmed | Child presence indicator updates to `present` on children grid |
| Drop-off note submitted | Context note appears on child's card in the children grid |
| Check-out intention logged | Teacher receives notification: *"[Child]'s parent is on the way"* |
| Absence reported | Absence logged; stat strip updates; teacher notified |
| Someone else collecting | Teacher notified of authorised pick-up person's name |

All updates are real-time — no page refresh required on the teacher's side.

---

### Late Arrival Flow
If a parent checks in after the school's configured start time, the system flags it automatically as a late arrival. The check-in flow is identical but the timestamp is marked as `late` on the teacher's children grid.

---

### Edge Cases

**No check-in by start time:** If a child has no check-in by a configurable threshold after school starts (e.g. 15 minutes), the teacher receives an automatic prompt: *"No check-in from [child]'s family. Mark as present or follow up?"* The teacher can confirm presence manually from the dashboard.

**Multiple authorised adults on one account:** If both parents or guardians use the app, only one check-in per child per day is accepted. If one parent has already checked in, the other sees a confirmation state rather than a check-in prompt.

**Check-in outside school hours:** The Check-In button is only prominent on school day mornings (based on the school's configured calendar). Outside school hours it is accessible but visually de-emphasised — checking in at 9pm does nothing meaningful and the flow communicates this.

---

## 6. My Child

### Purpose
The dedicated screen for understanding this child's developmental picture in depth. For the engaged parent who wants more than the home feed.

### Structure: Three tabs

---

### Tab 1: Development

**Purpose:** Domain-by-domain developmental snapshot framed in human, non-specialist language.

**Layout:** Each domain is a card, not a chart. Six domain cards total.

**Each domain card shows:**
- Domain name in plain English
- A one-sentence description of what this domain means: *"How Ayla expresses herself through words, stories, and listening"*
- A simple visual progress indicator — not a percentage; a warm visual metaphor (e.g. a plant at different growth stages, or a path with markers)
- The most recent observation in plain English: *"This week: Ayla retold the story of a book she'd heard, using her own words"*
- A "what this means" line providing developmental context: *"Retelling stories is a strong sign of listening comprehension and early narrative skill"*

**Tapping a domain card** expands it to show the last 3–5 observations in that domain, in plain English with dates. This is the depth layer for the engaged parent.

**Language requirement:** Every observation shown in this tab has been through a translation layer — written by the teacher in parent-friendly language, or converted by the system from teacher's raw observation notes. Parents never see professional assessment language.

---

### Tab 2: Portfolio

**Purpose:** Everything the child has made — a visual record of their creative output and artefacts.

**Layout:** Visual collection in reverse chronological order.

**Each artefact card shows:**
- Thumbnail
- Date
- Which place in the child's world it came from

**Tapping an artefact** opens the full item — drawing in full size, voice story with playback, puppet show animation.

**Parent reactions:** Heart, star, or smiley face reaction. Visible to the teacher in the observation feed.

**Share from home button:**
- Allows parents to upload a photo or short video of something the child did at home — a drawing, a block construction, a moment of play
- The upload appears in:
  - The child's portfolio (visible to parents)
  - The teacher's observation feed (as a home observation, tagged as parent-contributed)
- This creates a two-way developmental record — school contributions and home contributions in one place
- The teacher can respond to home contributions in the message thread

---

### Tab 3: Milestones

**Purpose:** The most formal layer of the parent experience. Designed for parents who want it, not surfaced as the default.

**What it shows:**
- Milestones organised by domain
- Each milestone described in plain English — no framework codes
- Status: `Observed`, `Developing`, `Not yet observed`
- Date observed, with the plain-English observation note that confirmed it

**School readiness view:**
Surfaces automatically as the child approaches the transition to primary school. A clear, encouraging summary of where the child is across key readiness indicators — framed as strengths and areas still developing. Not a pass/fail. Not a score. A picture.

**Design note:** This tab is intentionally the third tab — accessible but not the default. Parents who want this level of detail can find it. Parents who don't are never confronted with it.

---

## 7. Home Learning

### Purpose
The parent's action layer. Answers: *"What can I actually do with my child today?"*

The research is unambiguous: children whose parents engage with their learning at home develop faster across every domain. Most parents don't engage not because they don't care — but because they don't know what to do, or they default to direct instruction (quizzing, drilling) which is less effective than guided play. This screen solves the knowledge gap, not the motivation gap.

### Structure: Three sections

---

#### Section 1: Today's Suggestion (top)
One activity. Specific, brief, and directly connected to what the child has been working on at school this week.

**Each suggestion contains:**
- A title and one-sentence description
- Which domain it supports — in plain language
- Estimated time: typically 5–15 minutes
- What you need: usually nothing, or simple household items
- Step-by-step instructions written for a parent, not a teacher
- A **"We did this!"** button — tapping logs the activity as a home observation, visible to the teacher on the child's profile

**Frequency:** New suggestion each day, rotating across domains to mirror the balance the teacher maintains at school.

**System logic:** Suggestions are generated based on which domains the teacher has been observing this week, which milestones are currently in focus, and which home activities the parent has already completed. A parent who does one home activity per day meaningfully extends the child's learning without it feeling like homework.

---

#### Section 2: This Week's Ideas (middle)
3–4 additional activities for the parent to browse — more casual in tone than the daily suggestion.

**Examples:**
- *"When you're out: point out shapes on signs and ask your child to name them."*
- *"At dinner: ask your child to tell you about one thing they did today — wait for the whole story."*
- *"Before bed: ask your child to draw how they felt today."*

These range from structured activities to spontaneous in-the-moment prompts for walks, mealtimes, and bedtime.

---

#### Section 3: Learning at Home Guide (bottom)
A curated set of short, readable guides on topics relevant to this child's current developmental stage.

**Format:** Never longer than a 3-minute read. Written in warm, non-expert language.

**Examples:**
- *"How to talk about feelings with your preschooler"*
- *"Why imaginative play matters and how to encourage it"*
- *"Reading together: what to do when your child doesn't want to sit still"*

**Curation logic:** Guides are surfaced based on the child's current developmental picture — if the child is developing in social-emotional skills, relevant guides surface; if in a strong literacy phase, literacy guides appear. Not a static library — a contextually relevant selection.

---

## 8. Messages

### Purpose
Direct human-to-human communication between parent and teacher. Distinct from automated daily updates — this is genuine conversation.

### Layout
Full-screen conversation view. One thread per teacher (or per class, if there are multiple teachers). On single-teacher accounts there is no conversation list — the thread opens directly.

### Thread contents
- Full message history
- Teacher's messages on one side, parent on the other
- Timestamps
- Read receipts (parent can see when the teacher has read their message)
- Photo and short video sharing

### Key features

**Translation:**
One-tap translation of the entire thread between the parent's preferred language and the teacher's language. Native to the product — not a third-party integration. Critical for multilingual families and non-negotiable for the Singapore context.

**Response suggestions:**
For common exchanges (acknowledging a daily update, confirming attendance, responding to a teacher prompt) the system suggests short replies the parent can send or edit. Reduces friction for parents who are not confident communicating with teachers or who are short on time.

**Share from home:**
Parents can attach a photo or short video directly in the message thread. The attachment is also saved to the child's portfolio as a home observation. Encourages the two-way communication loop.

**Absence notification shortcut:**
A dedicated shortcut within the Messages screen for reporting a child's absence. Pre-fills the absence form (reason, expected return date). Sends notification to the teacher and logs in the attendance system. This is a frequent parent action — it must take three taps or fewer, not require composing a message.

### Design note
This is a professional relationship tool, not a customer service channel. The tone of the product throughout should reinforce that this is a partnership between parent and teacher.

---

## 9. Notifications

### Purpose
Surfaces items worth the parent's attention. Single feed — not tabbed. Parents do not need the operational complexity of the teacher's three-category notification system.

### Notification types

**High priority (push notification by default):**
- Teacher has sent a message
- A new daily update is available
- A milestone has been observed: *"Ayla hit a new milestone in language today!"*
- Check-in reminder on school day mornings (configurable — on by default)
- Teacher has flagged a wellbeing concern (see handling note below)
- Child has been signed out by teacher (end-of-day confirmation)

**Standard (in-feed, not push by default):**
- A new home learning suggestion is available
- The child completed an activity in the app
- A new artefact has been added to the portfolio
- School-wide announcement from teacher

### Wellbeing flag notifications
If the teacher flags a wellbeing concern, the notification to the parent must be handled with care:
- Push notification text must be warm, not alarming: *"A note from Ayla's teacher — tap to read"*
- The full message is in the Messages thread, where the teacher has framed it appropriately
- The notification must not disclose the nature of the concern before the parent opens the full message

### Parent notification controls
Parents can configure which types trigger a push alert vs. appearing only in the notification feed. Default setting is conservative — daily update and teacher message as push; everything else in-feed. Parents who want more can enable it.

### Behaviour
- Each notification is individually dismissible
- Tapping any notification navigates directly to the relevant screen and context — never to a generic home screen
- Unread count badge on the notification icon reflects high-priority items only

---

## 10. Navigation and Screen Connections

| From | Action | Goes to |
|---|---|---|
| Home Feed — Daily Update card | Tap | Full daily update view (expanded within feed) |
| Home Feed — Milestone card | Tap | My Child → Milestones tab, scrolled to that milestone |
| Home Feed — Artefact card | Tap | Full artefact view |
| Home Feed — Home learning card | Tap | Home Learning screen |
| Home Feed — Check-In button | Tap | Check-In screen |
| Top bar check-in shortcut | Tap | Check-In screen |
| My Child → Development | Tap domain card | Expanded domain view with recent observations |
| My Child → Portfolio | Tap artefact | Full artefact view |
| My Child → Portfolio | Share from home | Photo/video upload — saved to portfolio and teacher feed |
| My Child → Milestones | Tap milestone | Expanded view with observation note that confirmed it |
| Messages | Share from home | Attachment saved to portfolio + sent in thread |
| Notification | Tap | Direct to relevant screen and context |
| Check-In — Someone else collecting | Tap | Authorised pick-up selection or free-text |

---

## 11. What the Parent Experience Does Not Have

| Element | Reason excluded |
|---|---|
| Raw observation data | All observations are translated before surfacing |
| Framework codes or milestone IDs | Assessment language belongs in the teacher view only |
| Domain percentages or completion scores | Replaced by warm progress indicators and qualitative descriptions |
| Admin controls (billing, enrolment) | Managed in a separate admin layer; not part of the learning experience |
| The teacher's operational or scheduling view | The parent view is the translated, human version of the same underlying data |
| Ability to modify child's activities or schedule | That agency belongs to the teacher |
| Child's in-app performance metrics | Children are assessed through observation, not app performance data |
| Access to other children's data | Each parent only sees their own child or children |

---

## 12. Data Connections to Other Parts of the System

The parent experience is a consumer of data generated elsewhere. Understanding these connections is important for implementation.

| Parent action | System effect |
|---|---|
| Check-in confirmed | Updates attendance record; updates teacher children grid in real time |
| Drop-off note submitted | Appears as context note on child card in teacher dashboard |
| Check-out — someone else collecting | Sends pick-up person name to teacher as notification |
| Absence reported | Logs in attendance; notifies teacher; updates stat strip |
| "We did this!" on home activity | Creates home observation event in child's record, visible to teacher |
| Share from home (portfolio or messages) | Creates parent-contributed observation in child's record, visible to teacher |
| Reacting to artefact | Reaction visible to teacher in observation feed |
| Reading a daily update | Generates read receipt visible to teacher |
| Reading a report | Generates read receipt visible to teacher |

---

## 13. The Underlying Philosophy

The parent experience is built on a single research-backed insight: **parents want to be involved but don't always know how.**

The platform's job is to close that gap — not by giving parents more data, but by giving them the right information in the right form at the right moment.

A daily update that feels like a personal note. A milestone described as a real moment, not a checkbox. A home activity that takes 10 minutes and directly connects to what happened at school today. A message thread where the teacher feels like a partner. A check-in that replaces a paper sign-in sheet and takes five seconds.

Done well, the parent experience turns a child's education from something that happens at school into something the whole family participates in. That is not a feature. That is the point.

---

*This specification covers the parent-facing experience. Teacher-facing screens are covered in `teacher-dashboard-spec.md` and `secondary-screens-spec.md`. The child-facing experience is covered in `child-experience-spec.md`.*
