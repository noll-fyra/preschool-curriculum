# Secondary Screens — Design Specification

## Purpose

This document specifies every screen and surface in the teacher-facing product beyond the primary dashboard. It covers sidebar navigation screens, global action surfaces, and child-triggered views. It is intended as a reference for AI coding assistants and developers building the Nurture platform.

For the primary Teacher Dashboard specification, see `teacher-dashboard-spec.md`.

---

## Full Screen Inventory

| # | Screen / Surface | Type | Entry point(s) |
|---|---|---|---|
| 1 | Children Screen | Full screen | Sidebar nav |
| 2 | Child Detail View | Full screen (4 tabs) | Children grid, Children screen, Observations, Messages, Notifications |
| 3 | Schedule & Activities Screen | Full screen (2 sub-views) | Sidebar nav |
| 4 | Observations Screen | Full screen | Sidebar nav |
| 5 | Reports Screen | Full screen (3 sections) | Sidebar nav |
| 6 | Messages Screen | Full screen | Sidebar nav |
| 7 | Class Selector | Sheet / dropdown popover | Top bar |
| 8 | Quick-Log Sheet | Bottom sheet (global) | Top bar, contextual triggers throughout app |
| 9 | Notifications Panel | Side panel / sheet | Top bar bell icon |

---

## 1. Children Screen

### Purpose
The full roster view. The dashboard's children grid is optimised for scanning. This screen is optimised for managing and understanding the class.

### Layout
- Filter/sort controls and search field at the top
- Children displayed in the same grid format as the dashboard, but each card shows more information
- List view toggle for teachers who prefer tabular layout

### Each child card shows (expanded vs. dashboard)
- Name, avatar, presence indicator
- Domain coverage dots (same as dashboard)
- Brief developmental status summary — which domains are strong, which need attention
- Flag indicator if the child has been flagged

### Filter and sort options
- By presence status: present, absent, all
- By attention flag: flagged children first
- By domain gap: children with no observation in a selected domain this week
- Sort: alphabetical, or by date last observed

### Actions available from this screen (not available from dashboard grid)
- Add a new child to the class
- Archive a child who has left
- View a child's contact and emergency details
- Bulk actions: mark all as present, send message to all parents

### Navigation
- Tapping any child card opens the **Child Detail View**
- Always returns to Children screen when navigating back from Child Detail View

---

## 2. Child Detail View

### Purpose
The most information-rich screen in the teacher-facing product. A profile, developmental record, and communication hub for one individual child. Reachable from multiple entry points — always returns to the originating screen.

### Entry points
- Dashboard children grid
- Children screen
- Observations screen (when filtered to a specific child)
- Messages screen (from within a parent thread)
- Notifications panel (when a child is flagged)

### Back navigation
Always returns to the exact screen and scroll position the teacher came from. Context must be preserved regardless of entry point.

### Structure: Four tabs

---

#### Tab 1: Overview

**Contents:**
- Domain-by-domain developmental summary — for each domain: observation count (recent period), last observation note excerpt, milestone progress indicator
- Progress indicator style: relative position within age-typical expectations — not a grade or score; communicates "where this child is" and "how recently they've been observed in this area"
- "About this child" section: interests, temperament, how this child learns best — editable by the teacher; can also be contributed to by parents

**Purpose:** Gives the teacher a fast, holistic picture of the child before observing, interacting with the family, or writing a report.

---

#### Tab 2: Observations

**Contents:**
- Chronological feed of every observation ever logged for this child, across all teachers
- Each entry shows: date, domain tag (colour-coded), full observation note, logged-by (teacher name), any attached photo or voice note
- Filter controls: by domain, by date range, by logged-by
- New observation button — logs directly against this child, pre-filling the child field in the Quick-Log sheet

**Permissions:**
- Teacher can edit her own observations
- Teacher can view but not edit observations logged by colleagues

---

#### Tab 3: Milestones

**Contents:**
- Full curriculum framework mapped to this child — every milestone across every domain
- Each milestone shows one of three states:
  - `Observed` — milestone has been confirmed through logged observations
  - `Not yet observed` — not yet recorded
  - `Needs support` — teacher has flagged this area as requiring additional attention
- Milestones can be marked directly by the teacher, or populated automatically by the system when logged observations provide sufficient evidence
- Milestone data feeds directly into the Report generator (see Section 5)

**Purpose:** The formal developmental tracking layer. Structured, framework-aligned, and the source of truth for reports.

---

#### Tab 4: Family

**Contents:**
- Parent and caregiver contact details
- Authorised pick-up list
- Emergency contacts
- Medical notes and allergy records
- **Full parent message thread** for this family (mirrors the Messages screen, scoped to this child)
- Home activity engagement history — shows whether parents have been using the home learning features and which activities have been completed
- Parent-contributed notes — anything parents have shared about what's happening at home

---

## 3. Schedule & Activities Screen

### Purpose
The dashboard shows today's schedule as a read-only timeline. This screen is where schedules are built, managed, and connected to the Activity Library.

### Structure: Two sub-views accessible via tabs

---

### Sub-view 1: Schedule

**Default view:** Week view. Toggle options: day view, month view.

**Each day shows:**
- Sequence of activity blocks in chronological order
- Today's blocks show completion status (done, in progress, upcoming)
- Future days show the configured plan

**Interactions:**
- Drag and drop blocks to reorder within a day
- Tap a block to edit it
- Tap an empty slot to add a new activity (opens Activity Library search or new activity builder)

**Each scheduled block contains:**
- Activity name and description
- Duration
- Learning domain tags
- Materials checklist — items can be ticked off before the session begins
- Intended observation focus — which children or which milestones the teacher plans to observe during this block
- Post-session notes field — for reflection after the activity ends

**AI scheduling suggestions:**
- When a day has unfilled slots, the system suggests activities from the library
- When the developmental snapshot shows a domain has been underserved this week, the system surfaces relevant activities
- Suggestions are presented as dismissible recommendations — the teacher accepts, modifies, or ignores

**Connection to Observations:**
- After a scheduled activity is completed, it is surfaced as a context option in Quick-Log
- Observations can be tagged to a specific activity ("outdoor play, Tuesday 10am"), creating a richer record than free-floating notes

---

### Sub-view 2: Activity Library

**Contents:**
- Searchable, filterable library of all activities available to the teacher
- Sources: school-created activities, platform-curated activities, teacher's own saved activities

**Filter dimensions:**
- Learning domain
- Duration
- Age group / difficulty level
- Indoor / outdoor
- Group size: whole class, small group, individual
- Materials required (option to filter for low-prep activities)
- Framework alignment: which specific milestones does this activity target?

**Each activity card shows:**
- Thumbnail, title, domain tags, duration
- Brief description
- "Used recently" indicator

**Full activity view (tapping a card):**
- Learning objectives
- Step-by-step instructions
- Materials list
- Suggested adaptations for different ability levels
- List of milestones this activity can generate evidence for

**Actions from full activity view:**
- Save to favourites
- Add to today's schedule
- Add to tomorrow's schedule
- Duplicate and edit to create a custom variant

---

## 4. Observations Screen

### Purpose
The full observation log — every observation ever recorded, in one searchable, filterable place. Also serves as the quality control layer where incomplete observations are reviewed and enriched.

### Layout
- Filter bar at the top
- Chronological feed below
- Insight panel on the right side when a child is selected (tablet/desktop only)

### Each observation card shows
- Child name and avatar
- Domain tag (colour-coded)
- Observation note excerpt (expandable to full note)
- Timestamp
- Logged-by (teacher name)
- Attached media indicator if photo or voice note is present
- Incomplete indicator if domain tag or milestone link is missing

### Filter options
- By child (single or multiple)
- By domain
- By date range
- By logged-by
- Untagged observations only (no domain assigned — these need attention)
- Linked to a scheduled activity vs. spontaneous

### Quality control function
Quick-log observations are intentionally fast and may be sparse. This screen is where teachers enrich raw notes during downtime:
- Add or confirm domain tags
- Link observations to specific milestones
- Attach photos
- Expand a quick note into a fuller description

Observations with missing domain tags or no milestone link are highlighted with a subtle incomplete indicator to make them easy to find and address.

### Insight panel (right side, tablet/desktop)
When a child is selected in the filter, the right panel shows a mini developmental snapshot for that child — domain coverage and observation recency. Provides context while the teacher reviews that child's observation history.

### Export
Observations can be exported per child as a dated log. Use cases: reporting cycles, inclusion reviews, year-end handover to the next teacher.

---

## 5. Reports Screen

### Purpose
The end-to-end workflow for generating, editing, and sending developmental progress reports to parents.

### Core principle
**The teacher reviews, not writes.** The system generates report drafts from logged observations and milestone data. The teacher reads, adjusts tone or emphasis, and approves. She does not start from a blank page.

### Structure: Three sections

---

### Section 1: Drafts

Reports generated by the system that the teacher has not yet opened.

**Each draft card shows:**
- Child name
- Reporting period
- Number of observations that fed into this draft
- Confidence level indicator:
  - `Rich` — many observations, good domain coverage, draft will be meaningful
  - `Thin` — few observations or domain gaps; teacher should log more before finalising
  - `Incomplete` — critical domains have no observations; report cannot be responsibly generated yet

A thin or incomplete confidence level links directly to the Observations screen, filtered to that child, prompting the teacher to log additional observations before proceeding.

---

### Section 2: In Review

Reports the teacher has opened and is actively editing.

**Editing interface:**
- Structured narrative — not a free-text field
- Divided into domain-by-domain sections
- Each section shows: the system-generated narrative + the underlying observations it was drawn from
- The teacher can verify accuracy and adjust language without rewriting from scratch

**Tone control:**
- A simple tone selector (e.g. Formal / Warm / Concise) shifts the register of the generated language
- Does not require manual rewriting

**Completeness indicator (top of each report):**
- Shows which domains have strong observational evidence
- Highlights thin domains — prompts teacher to add observations before finalising
- Shows which domains have no observations at all

---

### Section 3: Sent

Archive of all sent reports.

**Each entry shows:**
- Child name, reporting period, date sent
- Read receipt — whether the parent has opened the report

Teachers can re-open any sent report to see exactly what the parent received.

### Report scheduling
The Admin layer (separate section of the app) sets the reporting calendar. This screen shows:
- Countdown to the next report due date
- Progress indicator: e.g. *"11 of 19 reports ready for review"*

---

## 6. Messages Screen

### Purpose
Direct, human-to-human communication between teacher and parents. Distinct from automated daily updates generated by the system — those are system-generated content. This screen is for genuine conversation.

### Layout
- Two-panel on tablet/desktop: conversation list on the left, active thread on the right
- Collapses to full-screen per view on mobile

### Conversation list
- Each item: parent name, child name, message preview, timestamp, unread indicator
- Default sort: most recent
- Filter: unread only
- Conversations can be tagged: e.g. "behaviour", "wellbeing", "general", "absence" — for future retrieval

### Thread view
- Full message history with one parent
- Text messages; photos can be attached
- Read receipts visible to the teacher (teacher can see when the parent opened the message)

### Key features

**Translation toggle:**
- One tap translates the entire thread between the teacher's language and the parent's preferred language
- Must be native to the product — not a third-party integration
- Critical for multilingual settings (e.g. Singapore context)

**Suggested replies:**
- For common message types (absence acknowledgement, activity feedback, general reassurance), the system surfaces a pre-written suggested reply
- Teacher can send as-is or edit before sending
- Reduces cognitive load during busy periods

**Link to child profile:**
- From any message thread, the teacher can tap to open that child's Detail View
- Useful when a parent raises a concern and the teacher wants to reference recent observations before responding

**Class broadcast:**
- Separate compose mode for sending a message to all parents in the class at once
- Use cases: reminders, event updates, end-of-week summaries
- Broadcasts appear in each parent's individual message thread — not as a group chat
- Parents cannot see each other's responses

---

## 7. Class Selector

### Purpose
Allows a teacher to switch between classes she is assigned to. Re-renders all teacher-facing screens to reflect the selected class.

### Appearance
- Bottom sheet on mobile
- Dropdown popover on tablet/desktop
- Triggered by tapping the class name/selector in the top bar

### Contents
- List of all classes the logged-in teacher is assigned to (as lead teacher or co-teacher)
- Each class item shows: class name, age group, enrolled child count
- Currently active class is marked with a checkmark

### Switching behaviour
- Selecting a different class immediately re-renders the dashboard and all subsequent screens for that class
- Switch must be instant — no full page reload
- All data (children, schedule, observations, messages) updates to reflect the selected class

### Edge cases
- **Substitute / guest teacher:** Class appears in selector with a "covering" label; certain historical data may be restricted based on access policy
- **Director / programme lead:** Class selector may offer an additional school-wide overview mode — this is an Admin-level view, not a teacher view, and is out of scope for this document

---

## 8. Quick-Log Sheet

### Purpose
The single most frequently used action in the app. Allows a teacher to capture an observation in under 20 seconds without losing her place in any other workflow.

### Appearance
- Slides up from the bottom as a sheet — not a full screen
- Keyboard opens automatically on appearance
- Feels fast and light — a notepad, not a form

### Accessibility
- Available from the top bar button on every screen
- Also triggered contextually:
  - After a scheduled activity block ends (gentle prompt)
  - From the Child Detail View (Observations tab)
  - From the Schedule screen (within a scheduled block)

### Flow

**Step 1: Select child**
- Scrollable grid of child avatars — same layout as dashboard grid
- If opened from a scheduled activity context, relevant children for that activity may be pre-highlighted
- Teacher taps the child — or types a name to search

**Step 2: Capture observation**
- Large text field, autocursor placed immediately
- Teacher types or dictates
- No minimum length enforced
- If opened from a scheduled activity context, that activity is shown as a pre-attached tag at the top of the note

**Step 3: Domain suggestion**
- As the teacher types, the system suggests a domain tag in real time (not after submission)
- Suggested tag appears as a chip below the text field
- One tap to confirm; tap again to change to a different domain
- AI classification — the teacher does not need to manually select a domain in most cases

**Step 4: Optional enrichment (collapsible, behind a "More" disclosure)**
- Attach a photo
- Record a voice note
- Link directly to a specific milestone
- Adjust timestamp (for retrospective logging)

These are secondary options. Most quick-logs will be text only. The enrichment panel must not slow down teachers who don't need it.

**Submission:**
- One tap to submit
- Sheet dismisses immediately
- Teacher is returned to whatever screen she was on
- Observation appears immediately in the observations feed and in the child's profile

### Technical requirement
Quick-Log must function offline and sync when connection is restored. Teachers move around classrooms that may have intermittent or no connectivity.

---

## 9. Notifications Panel

### Purpose
Surfaces items requiring attention and informational updates in a single, organised panel. Does not replace in-context nudges on the dashboard — complements them.

### Appearance
- Slides in from the right on tablet/desktop
- Bottom sheet on mobile
- Triggered by tapping the bell icon in the top bar

### Structure: Three tabs

---

**Tab 1: For You**
High-signal items that require the teacher's attention or action. These inflate the unread badge on the bell icon.

Examples:
- A parent has sent a message
- A report draft is ready for review
- A child has been flagged by the system (observation gap, wellbeing concern)
- A scheduled activity starts in 15 minutes (configurable timing)
- A co-teacher has flagged a concern about a specific child

---

**Tab 2: Updates**
Lower-signal informational items. No action required. Do not inflate the unread badge.

Examples:
- A parent has read a daily update
- A parent has completed a home learning activity with their child
- A milestone has been auto-confirmed by the system based on recent observations
- End-of-week observation count summary

---

**Tab 3: Reminders**
Time-based nudges from the system, or ones the teacher has set herself.

Examples:
- Report due date approaching (e.g. 3 days away)
- A child hasn't been observed in 7 days
- Materials for tomorrow's activity not yet confirmed
- Teacher-set personal reminders

---

### Notification behaviour
- Each notification is individually dismissible
- Bulk clear available within each tab
- **Tapping a notification navigates directly to the relevant screen and context** — never to a generic home screen
- The unread badge on the bell icon reflects For You count only — Updates and Reminders do not inflate it

---

## 10. Navigation and Screen Connections

Understanding how screens connect is as important as the screens themselves. Below are the primary navigation flows.

### Dashboard as hub
The dashboard is the central view. Every sidebar screen is reachable from the nav, but many are also reachable contextually from within the dashboard:

| Dashboard element | Taps through to |
|---|---|
| Children grid (any child card) | Child Detail View |
| Today's schedule (any block) | Schedule & Activities screen |
| Observations feed | Observations screen |
| Parent messages panel | Messages screen |
| AI insight (expanded) | Relevant screen depending on insight type |

### Child Detail View as crossroads
Child Detail View is reachable from multiple entry points and must always return to the originating screen:

| Entry point | Back navigates to |
|---|---|
| Dashboard children grid | Dashboard |
| Children screen | Children screen |
| Observations screen (child filter selected) | Observations screen |
| Messages screen (from thread) | Messages screen (thread) |
| Notifications panel (child flagged) | Notifications panel |

### Quick-Log as floating layer
Quick-Log is the only surface that is truly global — it can be opened from any screen without losing context. It is a floating layer, not a navigation destination. Dismissing it always returns the teacher to her previous screen and state.

### Reports and Observations are tightly coupled
The quality of generated reports depends on observation volume and completeness:
- A thin report draft should link directly to the Observations screen filtered to that child
- When a teacher opens the Observations screen from a report draft, the system shows which domains need more observations and offers a shortcut to open Quick-Log
- This connection should be visible in the UI — the teacher must understand that what she logs in Observations becomes the content of her reports

---

## 11. Global Design Constraints

These constraints apply to all secondary screens and must be respected across the implementation.

| Constraint | Requirement |
|---|---|
| Quick-Log accessibility | Never more than one tap to open from any screen in the app |
| Performance | Children grid and observations feed must load instantly; skeleton states acceptable, blank states are not |
| Offline support | Quick-Log must work offline and sync on reconnection |
| Context-preserving navigation | Child Detail View and all sheet surfaces must always return to the exact originating screen and position |
| Co-teaching awareness | All real-time data (observations, attendance, messages) reflects activity from all staff assigned to the class, not just the logged-in teacher |
| Phase-aware content | Dashboard and notification behaviour adapts based on phase of day (see `teacher-dashboard-spec.md` Section 3); secondary screens do not need phase awareness except where explicitly noted |
| Dismissibility | Every AI insight, system prompt, and nudge is dismissible in one tap; the system offers, the teacher decides |
| Child data privacy | No child's full name, photo, or developmental data appears in push notifications, browser tab titles, or any surface visible outside an authenticated session |
| Translation | Message threads must support one-tap translation; this is a native feature, not a third-party add-on |

---

*This specification covers teacher-facing secondary screens. Parent-facing screens (home learning, child visibility, parent messages) and Admin / School screens (enrolment, billing, programme analytics) are covered in separate specification documents.*
