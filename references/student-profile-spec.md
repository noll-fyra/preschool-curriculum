# Nurture — Student Profile: Design Specification
*Version 1.0 | Scope: MVP teacher-facing student profile*

---

## Purpose of this document

This specification describes the student profile in full — the information architecture, section-by-section content, screen flows, data requirements, and the reasoning behind every structural decision. It is written for an AI coding agent or developer implementing the feature from scratch.

The student profile is the teacher's primary reference for understanding a child as an individual. It serves two distinct use cases that must be designed for simultaneously:

The **primary teacher** who knows the child well and uses the profile to log observations, check milestone progress, and manage family communications.

The **new or substitute teacher** who has never met this child and needs to become effective within minutes — not hours. Every section of this profile should be evaluated against the question: "Would a stranger who reads only this page know enough to serve this child well today?"

The substitute teacher test is the quality bar. If information only lives in the departing teacher's head, the profile has failed.

---

## The three categories of information

All information on the student profile belongs to one of three categories. Understanding this taxonomy prevents the common mistake of building a profile that captures structured data well (assessment scores, attendance) while losing the human knowledge that makes teachers effective.

**Category 1 — Who this child is**
Personality, learning style, emotional cues, social relationships, what helps them, what upsets them. This is the information that takes weeks to accumulate through observation and disappears entirely when a teacher leaves unless deliberately captured. It has no other home in a standard school management system.

**Category 2 — Where they are developmentally**
Structured milestone data — current level per learning area, which milestones are achieved, which are in progress, mastery counts. A new teacher needs this to continue the child's journey without regression.

**Category 3 — What has been tried and what works**
Operational knowledge — specific strategies that help this child, patterns to watch for, recent context that affects behaviour. The difference between this and Category 1 is specificity: "she is methodical" is Category 1; "give her a 2-minute transition warning" is Category 3.

Most school systems capture Category 2 well. Almost none capture Categories 1 or 3 in a structured, transferable way.

---

## Screen architecture

The student profile is a single-page view with four drill-down screens:

```
Student profile (main)
  ├── Learning area detail (LL / NUM / SED)
  │     (shared component with teacher dashboard)
  ├── Family contacts
  ├── Add note
  └── Edit snapshot / Edit works / Edit context
      (inline edit views for the three teacher-written fields)
```

All navigation is push-stack. Every drill-down has a back arrow returning to the main profile. No modals or overlays — the iframe height constraint makes these unreliable.

---

## Main profile screen

### Section 1: Identity header

**Purpose:** Instant identification and critical safety flags.

**Content:**

Child avatar: initials circle (no photo in MVP — photo upload is Wave 1). Background colour derived from child ID for visual distinction across the class roster.

Identity block (right of avatar):
- Full name (18px medium)
- Year level + age in years and months (13px secondary) — age in months matters because a 4-year-3-month child and a 4-year-11-month child are developmentally different
- Enrolment date + class name (12px tertiary)

Flag row (below identity block):
Coloured pills displaying any active flags. Flags are the most safety-critical information on the profile and must be immediately visible without scrolling or tapping.

**Flag types and their colour coding:**

| Flag type | Colour | Example |
|---|---|---|
| Medical / allergy | Red | "Nut allergy — EpiPen in office" |
| Welfare / family concern | Amber | "Parents separated — Oct 2024" |
| Special need / IEP | Blue | "Speech therapy — Tues 10am" |
| Positive note | Green | "Gifted — extended activities available" |

A child can have zero flags (no pills shown) or multiple flags (all shown in a wrapping row). Flags are always visible on the main profile without tapping. They are never collapsed or hidden.

**Design rules:**
- Flag text must be short enough to read at a glance — 40 characters maximum
- Flag pills are tappable and open the relevant detail (medical flags open to medical notes, welfare flags open to family context)
- In the class roster view, the most severe flag (red > amber > blue > green) is shown as a dot indicator on the child's card so teachers are aware before opening the profile

**Data model:**

```
Flag {
  child_id
  type: enum (medical, welfare, special_need, positive)
  text: string (max 80 chars)
  detail: text (full description shown on tap)
  created_by: teacher_id
  created_at: timestamp
  active: boolean
}
```

---

### Section 2: Personality snapshot

**Purpose:** The most important section on the profile. Answers: "Who is this child?" in the time it takes to read four sentences.

**Content:** A free-text field, teacher-written, displayed in a visually distinct coloured card (green background, green border — warm and positive, not clinical). 2–4 sentences maximum.

**The snapshot addresses:**
- How the child approaches new things (cautious, impulsive, methodical, curious)
- What helps them settle or engage
- What tends to upset or overwhelm them
- Who they are close to in the class
- Any counterintuitive behaviour patterns a stranger might misread

**Example:**
"Curious and methodical — she likes to understand something fully before she tries it, so she may seem slow to start but rarely makes mistakes once she begins. She responds well to being given a helper role. She is close to Kai and learns better when seated near her. Tends to go quiet rather than asking for help when confused — check in proactively."

**Edit affordance:** An "Edit ↗" link in the bottom-right of the card opens the edit view for this field.

**Writing prompt (shown in the edit view, not the main view):**
"Write 2–4 sentences. Think about: how they approach new things, what settles them, what upsets them, who they're close to, what a stranger should know on day one."

**Behaviour:**
- If the snapshot has never been written, the card shows a prompt: "No snapshot yet — tap to write one. This is the most useful thing you can do for a substitute teacher."
- The snapshot is updated by the class teacher. In MVP, any teacher with access to this child's profile can edit it.
- Snapshot is timestamped with "Last updated [date] by [teacher name]" shown in small tertiary text at the bottom of the card.

**Data model:**

```
PersonalitySnapshot {
  child_id
  content: text
  updated_by: teacher_id
  updated_at: timestamp
}
```

---

### Section 3: Learning snapshot

**Purpose:** At-a-glance developmental status across all three MVP learning areas.

**Content:** Three stacked rows — one per learning area — each showing:
- Area name + level badge (Beginning / Developing / Secure, colour-coded)
- Thin progress bar (gestural, not a percentage — shows approximate position within the current level)
- Current in-progress milestone in plain language
- Mastery progress where applicable (e.g. "3 of 5 sessions" for skill milestones, "3 of 5 observations" for SED)

**Progress bar fill values:**
The bar visually represents position within the current level, not overall progress. Fill is calculated as:

```
achieved_milestones_in_current_level / total_milestones_in_current_level
```

Colour of fill: amber for Beginning/Developing, green for Secure.

**Tapping** any area row navigates to the full learning area detail screen (shared component with the main teacher dashboard — see `nurture-prd.md` for full spec).

**Edge cases:**
- If no milestones have been started in a learning area, the progress bar is empty and the milestone text reads "Not yet started"
- If all milestones are Secure, the bar is full green and the text reads "All milestones achieved"
- The Secure level has no "in-progress" milestone — it shows "P1 ready" in green

**Data source:** Read from `ChildMilestoneProgress` records for this child. No additional data model required — this section is a projection of existing milestone data.

---

### Section 4: Recent activity feed

**Purpose:** Shows the current trajectory. A new teacher reading this can tell immediately whether things are going well, whether there's a struggle, or whether something is off.

**Content:** Last 7–14 days of events, reverse chronological (most recent first). Maximum 5 items shown on the main profile; a "See all" link opens the full history (post-MVP).

**Event types and their visual treatment:**

| Event | Dot colour | Title format |
|---|---|---|
| Activity completed — pass | Green | "Completed [activity name] — [X]/3 correct" |
| Activity completed — retry | Amber | "[Activity name] — [X]/3 correct (retry)" |
| Milestone achieved | Green | "Milestone achieved: [milestone statement]" |
| SED observation logged | Blue | "SED observation logged: [behaviour observed]" |
| Teacher note added | Purple | "Note added by [teacher name]" |

**Contextual meta line** below each item: date/time + location ("at home" / "at school") + initiating account ("by Ms Priya" for teacher-initiated events).

**Location logic:** "At home" = session initiated from a parent account. "At school" = session initiated from the teacher classroom account.

**De-duplication rule:** If a child completed the same activity multiple times in one day, show only the most recent attempt for that activity that day. Multiple activities on the same day are all shown.

**Feed items are not tappable** in the main profile view in MVP — they are informational only. Post-MVP, tapping an activity result will show the question-level detail.

---

### Section 5: What works / what to watch

**Purpose:** Operational instructions for a new teacher. Specific, actionable, immediately applicable.

**Content:** Two subsections within one card:

"What works" — a list of 2–5 specific strategies or contextual facts that help this child engage, settle, or learn. Each item is one sentence, specific and actionable.

"What to watch" — a list of 1–3 patterns or signals to be aware of. Each item is one sentence describing the behaviour and its significance.

**Examples of good "what works" items:**
- "Give her a helper role at the start of an activity — she settles faster"
- "2-minute transition warning before switching activities"
- "Seat near Kai — they work well together"

**Examples of bad "what works" items (too generic to be useful):**
- "Encouragement helps" — every child responds to encouragement
- "She likes art" — too vague, no actionable instruction
- "Be patient" — not specific to this child

**Examples of good "what to watch" items:**
- "Goes quiet rather than asking for help — check in proactively when she seems stuck"
- "Can get overwhelmed in noisy, large-group transitions"

**Edit affordance:** Same "Edit ↗" pattern as the personality snapshot. Edit view shows both "what works" and "what to watch" as separate text areas, each with item prompts.

**If empty:** Card shows a prompt for each section separately. "What works" prompt: "What strategies help this child engage or settle?" "What to watch" prompt: "Are there patterns or signals this child's teacher should know about?"

**Data model:**

```
TeacherStrategies {
  child_id
  what_works: text  (stored as newline-separated items, rendered as a list)
  what_to_watch: text  (same format)
  updated_by: teacher_id
  updated_at: timestamp
}
```

---

### Section 6: Family & current context

**Purpose:** Two distinct needs in one section — the narrative context (what is currently happening in this family's life that affects this child) and the structured contact information (who to call, who can pick up, how to communicate).

**6a: Current context box**

A teacher-written narrative field, amber background (warm, not alarming), displayed as a coloured card similar to the personality snapshot.

This field captures what is currently relevant about the family situation. Not a history — the present. Updated by the teacher when significant changes occur.

What belongs here:
- Family structure changes (separation, new sibling, illness, bereavement)
- Cultural or linguistic context that affects communication
- Specific communication preferences between parents
- Any professional involvement (social services, counsellor, speech therapist) that the teacher should be aware of
- Anything that explains current behaviour patterns that would otherwise be puzzling

**Example:**
"Parents separated Oct 2024. Both on the authorised pickup list — Mum (primary contact) Mon/Wed/Fri, Dad Tue/Thu. They prefer separate communication. Aisha has been quieter at drop-off since the change — normal settling behaviour per counsellor."

This field is the most sensitive on the profile. In Wave 2, access to this field should be role-gated — class teacher and director only, not all staff. In MVP, all teachers with profile access can read and edit it.

**Edit affordance:** "Edit ↗" link. Edit view has no writing prompt shown in the interface — the label "Current family context" is sufficient for a trained teacher.

**If empty:** The amber card is not shown. A muted text link "Add family context note" appears in its place.

**6b: Family contact card**

Structured contact information displayed in a table format within a standard card. On the main profile, shows a summary row per family member. Tapping the card navigates to the full family contacts detail screen.

**Summary rows shown on main profile:**
- Primary contact: name + phone
- Secondary contact: name + phone (if applicable)
- Parent app mode: Active / Passive per parent
- Last app opened: timestamp + which parent (green if within 7 days, amber if 7–30 days, grey if >30 days)
- Home activities this week: X of Y completed

**Why app engagement belongs here:** A new teacher who knows a parent is highly engaged can lean on them as a resource and expect responses. One who knows a family has been hard to reach for weeks calibrates their communication approach accordingly. This is operational intelligence.

**Data model for context:**

```
FamilyContext {
  child_id
  content: text
  updated_by: teacher_id
  updated_at: timestamp
}
```

---

### Section 7: Teacher notes log

**Purpose:** The institutional memory of everything significant that has been observed or communicated about this child. A new teacher reading backwards through this log gets a rich picture of who this child is and what has happened recently.

**Content:** Reverse chronological list of teacher-written notes. Each note shows:
- Author name (teacher who wrote it)
- Date (relative: "Today", "Tuesday", "3 weeks ago"; exact date on hover/tap)
- Tag (colour-coded pill): Learning, Milestone moment, Behaviour, Social, Welfare, Family
- Note body (free text, no length limit but teachers should be encouraged to keep notes specific and brief)

**Tag system:**

| Tag | Colour | When to use |
|---|---|---|
| Learning | Blue | Observations about how the child engages with academic content |
| Milestone moment | Green | A notable step forward — not a formal milestone achievement, but something worth recording |
| Behaviour | Amber | A specific behaviour event (positive or concerning) |
| Social | Blue | Observations about peer relationships or group dynamics |
| Welfare | Red | Anything related to the child's wellbeing, safety, or family situation that raises concern |
| Family | Amber | Communication with parents, family updates, or context that came from home |

**Welfare notes** are treated differently in the data layer:
- Marked with a `welfare: true` flag
- Cannot be deleted once saved (audit trail requirement)
- Shown with a subtle red left border in the notes log to ensure visibility
- In Wave 2: welfare notes trigger a notification to the director

**Notes shown on main profile:** 3 most recent. A "See all" link opens the full log (scrollable list, same format, all notes for this child across all teachers).

**Add note affordance:** A "+ Add note" button below the three preview notes. Opens the add note screen.

---

## Add note screen

**Purpose:** Quick note entry during or after the school day.

**Content:**

Free-text area:
- Placeholder: "Describe what you noticed — what happened, how [child name] responded, any context that would help a future teacher understand..."
- No character limit
- Auto-saves draft if teacher navigates away without saving

Tag selector:
- Row of colour-coded pills (Learning, Milestone moment, Behaviour, Social, Welfare, Family)
- Tap to select/deselect
- Multiple tags allowed
- No tag is required — untagged notes are saved without a tag and shown without a pill

Save and Cancel buttons.

**Save behaviour:**
- Creates a `TeacherNote` record with the current teacher's ID and timestamp
- Returns to the main profile with the new note at the top of the notes log
- No confirmation dialog — the action is low-stakes and immediately reversible (delete is available in the full notes log)

**Welfare tag behaviour:**
- Selecting the Welfare tag shows a subtle inline note: "Welfare notes cannot be deleted once saved."
- No modal, no interruption — just an inline reminder

**Data model:**

```
TeacherNote {
  child_id
  author_id: teacher_id
  content: text
  tags: array of enum (learning, milestone_moment, behaviour, social, welfare, family)
  welfare: boolean  (true if welfare tag is selected)
  created_at: timestamp
  deleted_at: timestamp (nullable — soft delete, welfare notes cannot be soft-deleted)
}
```

---

## Family contacts detail screen

**Purpose:** Full contact information for all authorised adults connected to this child.

**Content:**

Per parent/guardian — a contact card showing:
- Initials avatar
- Full name + relationship to child
- Mobile number (tappable — initiates call)
- App mode (Active / Passive)
- Language preferences (for multilingual communication, Wave 2)
- Pickup days (if the family has a defined schedule)

Authorised pickup list:
A separate card listing all adults who are authorised to collect this child. Each entry shows name + relationship. In MVP, this list is entered manually by the teacher or director. In Wave 2, parents can manage this list from their own app.

**Important:** The authorised pickup list must be visible on this screen without any further navigation. A teacher managing afternoon pickup cannot be three taps deep trying to find who is allowed to collect a child.

**Edit affordance:** A single "Edit family info" button at the bottom of the screen. Opens a form view for all fields. In MVP, this is teacher-editable. In Wave 2, changes to authorised pickup list require director approval.

---

## Edit screens (snapshot, what works, context)

All three teacher-written narrative fields (personality snapshot, what works / what to watch, family context) share the same edit screen pattern:

**Layout:**
- Top bar with back arrow and field name as title
- Writing prompt (only shown if field is empty or has never been saved — not shown on subsequent edits)
- Text area with current content pre-filled
- Save + Cancel buttons

**Auto-save:** Draft is saved to local storage every 5 seconds. If the teacher is interrupted and navigates away, reopening the edit screen restores the draft with a notice: "You have an unsaved draft from [time]. Continue editing?"

**Character guidance:** No hard limit, but a soft guidance note appears when content exceeds 500 characters: "Consider whether this could be more specific and shorter — a new teacher needs to absorb this quickly."

**Version history (Wave 2):** All edits are versioned. A teacher can see what the previous version said and who changed it. In MVP, only the current version is stored.

---

## Data requirements

The following data must be readable and writable by the teacher profile view. This is not a full data model — it lists what the profile feature requires.

**Read:**

| Data | Source |
|---|---|
| Child name, DOB, year level, enrolment date, class | `Child` record |
| Active flags | `Flag` records for this child where `active = true` |
| Personality snapshot | `PersonalitySnapshot` for this child |
| Current milestone status per area | `ChildMilestoneProgress` records |
| In-progress milestone details | `Milestone` content records |
| Teacher strategies | `TeacherStrategies` for this child |
| Family context | `FamilyContext` for this child |
| Parent contact details | `Parent` records linked to this child |
| Parent app mode | `Parent.mode` |
| Parent last app open | `ParentSession` most recent timestamp per parent |
| Home activities this week | `ActivitySession` records this week where `initiated_from = parent` |
| Recent activity feed (last 14 days) | `ActivitySession` + `ChildMilestoneProgress` change events + `TeacherObservation` records |
| Teacher notes | `TeacherNote` records for this child, ordered by `created_at` desc |

**Write:**

| Action | Writes to |
|---|---|
| Edit personality snapshot | `PersonalitySnapshot` (upsert) |
| Edit what works / what to watch | `TeacherStrategies` (upsert) |
| Edit family context | `FamilyContext` (upsert) |
| Add flag | `Flag` (insert) |
| Deactivate flag | `Flag.active = false` (update) |
| Add teacher note | `TeacherNote` (insert) |
| Edit family contacts | `Parent` records (update) |
| Edit authorised pickup list | `AuthorisedPickup` records (insert / soft-delete) |

---

## Access control

In MVP, all teachers assigned to a class have full read and write access to all student profiles in that class. The director has read access to all profiles across all classes.

Post-MVP access refinements (Wave 2):
- Welfare notes: read/write restricted to class teacher + director only
- Family context: read/write restricted to class teacher + director only
- Authorised pickup list edits: require director approval workflow
- Substitute teachers: read-only access to all profile sections, write access to notes only

---

## Profile completeness indicator

A subtle completeness signal appears at the top of the profile for teachers, not students or parents.

It shows a small pill: "Profile [X]% complete" where completeness is calculated as:

| Field | Weight |
|---|---|
| Personality snapshot written | 30% |
| What works has at least 2 items | 20% |
| What to watch has at least 1 item | 15% |
| Family context written | 15% |
| Primary contact information complete | 10% |
| At least one teacher note in last 30 days | 10% |

A profile at 0–40%: amber pill ("Profile incomplete")
A profile at 41–79%: no indicator (neutral)
A profile at 80–100%: no indicator (assumed complete)

The indicator is specifically for the benefit of a new teacher or director who is reviewing whether the knowledge transfer has happened. It does not appear on the parent-facing experience.

---

## What the student profile does not include

These omissions are intentional. Do not add them without a product decision and rationale.

**Attendance records.** Not in scope for MVP — this is an operations feature. If a new teacher needs to know about absences, the teacher notes log is the appropriate place.

**Academic scores or test results.** The milestone data is the assessment record. Separate test scores create a parallel system that contradicts the milestone data and adds confusion.

**Photos of the child.** Deferred to Wave 1 due to data sensitivity. The initials avatar is sufficient for MVP.

**Communication history with parents.** The messages thread lives in the Messages tab. The profile shows engagement metrics (last opened, activities completed) but not message history. A link to the message thread would be appropriate in Wave 2.

**Comparison to class average or peers.** Under no circumstances should any profile element compare this child to other children. Every data point is relative to the child's own progress only.

**Editable milestone data.** Teachers cannot manually override or edit milestone achievement records from the profile. They can add observational notes, but milestone data is generated only from activity sessions and the formal teacher observation mechanic. This preserves data integrity.

---

## Handoff checklist

Before the student profile is considered shippable for prototype testing, verify:

- [ ] Flags are visible immediately on profile load without any scrolling
- [ ] Red flags (medical) are visually distinct from amber flags (welfare) at a glance
- [ ] Personality snapshot shows a prompt when empty
- [ ] "What works" and "what to watch" show prompts when empty
- [ ] Family context amber card is hidden entirely (not shown empty) when no content exists
- [ ] Recent activity feed shows "No recent activity" when empty, not a blank section
- [ ] Teacher notes show the 3 most recent with a "See all" link
- [ ] Welfare notes display with a red left border and cannot be deleted
- [ ] Add note: welfare tag shows the "cannot be deleted" inline note
- [ ] All three edit screens restore draft if teacher navigated away mid-edit
- [ ] Family contacts screen shows the authorised pickup list without further navigation
- [ ] Profile completeness indicator appears for teacher role, not parent role
- [ ] No comparison to other children appears anywhere on the profile
- [ ] Milestone data cannot be manually overridden from the profile view

