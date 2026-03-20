# Admin Experience — Design Specification

## Purpose

This document specifies the admin-facing product experience for Nurture — a preschool education and learning platform. It covers the screens and features that support teachers from the outside: organising classes, managing students, assigning teachers, configuring the curriculum and calendar, overseeing parent engagement, tracking attendance, and monitoring learning outcomes at a programme level.

It is explicitly scoped to **school operations in support of teaching quality**. Enrolment and waitlist management, finance and billing, staffing and rosters, and compliance are out of scope for this document and will be covered separately.

For teacher-facing screens, see `teacher-dashboard-spec.md` and `secondary-screens-spec.md`.
For parent-facing screens, see `parent-experience-spec.md`.
For the child-facing experience, see `child-experience-spec.md`.

---

## 1. Who This Is For

The admin user in this context is typically a **Centre Director** or **Curriculum Lead** — someone responsible for ensuring the school runs well and teachers are well-supported. She is not in the classroom day-to-day, but the quality of what happens in classrooms is her primary concern.

Her core question is not _"Is this child developing?"_ (that belongs to teachers and parents). Her question is: **"Is this school set up to give every child the best chance?"**

The admin experience answers that question by giving her:

- Full control over how the school is organised
- Visibility into what is actually happening across all classrooms
- Tools to support teachers, not manage or surveil them
- A clear picture of whether the programme is working at scale

---

## 2. Screen Inventory

| #   | Screen              | Primary function                                                    |
| --- | ------------------- | ------------------------------------------------------------------- |
| 1   | Admin Dashboard     | Overview of school health                                           |
| 2   | Classes & Students  | Organise classes; manage student profiles                           |
| 3   | Teacher Assignments | Assign teachers to classes; manage access                           |
| 4   | Curriculum Manager  | Configure the school's developmental framework and learning content |
| 5   | School Calendar     | Manage the school year, terms, and events                           |
| 6   | Class Schedules     | Build and manage the weekly activity schedule per class             |
| 7   | Parent Engagement   | Monitor and manage school-wide parent communication and involvement |
| 8   | Attendance Overview | School-wide attendance tracking and absence management              |
| 9   | Learning Outcomes   | Programme-level analytics on developmental progress                 |

---

## 3. Admin Dashboard

### Purpose

The entry point for every admin session. A single screen that answers the most important operational questions at a glance, with direct links to the detail behind each one.

### Structure

A grid of status panels — each representing one domain of school health. Each panel is colour-coded: green (healthy), amber (needs attention), red (requires action). The admin scans the grid and drills into anything that is not green.

---

### Status Panel: Classes & Students

- Total students enrolled, grouped by class
- Any classes that are over or under configured capacity
- Students with incomplete profiles (missing contacts, medical notes, or consent records)
- New students added in the last 7 days

---

### Status Panel: Teacher Coverage

- Classes with a lead teacher assigned vs. unassigned
- Classes with no co-teacher where one is recommended
- Any teacher who has not logged in or logged an observation in the last 3 days — surfaced as a support signal, not a disciplinary flag

---

### Status Panel: Curriculum & Schedule

- Classes with an incomplete or unplanned schedule this week
- Domains not scheduled across the school this week (e.g. no motor skills activities planned for any class)
- Curriculum framework coverage rate — are all domains being taught across the programme?

---

### Status Panel: Parent Engagement

- School-wide daily update delivery rate — percentage of children who received a daily update today
- Parent app adoption rate — percentage of enrolled families who have activated their parent account
- Unread broadcast messages older than 3 days
- Upcoming events with low RSVP rates

---

### Status Panel: Attendance

- Today's school-wide attendance rate
- Absent children with and without prior notification from parents
- Classes with attendance below a configurable threshold
- Check-in completion rate via parent app

---

### Status Panel: Learning Outcomes

- Percentage of children with at least one observation this week across the school
- Percentage of children on track across key developmental domains
- Number of children flagged as needing additional support (count only at this level)
- Outstanding report drafts across the school

---

### Daily Activity Feed (below the status grid)

A chronological pulse of notable events from today — observations logged, check-ins completed, messages sent, curriculum updates made. Gives the admin a sense of the school's activity without opening individual screens.

---

## 4. Classes & Students

### Purpose

The master record of how the school is organised — which classes exist, which students are in them, and whether every student profile is complete and current.

### Structure: Two sub-views

---

### Sub-view 1: Classes

**Class list:**
All active classes displayed as cards. Each class card shows:

- Class name
- Age group
- Capacity and current enrolment count
- Lead teacher name
- Co-teacher name(s) if assigned
- A quick status indicator: schedule complete, observations active, parent updates running

**Admin actions on a class:**

- Create a new class
- Edit class name, age group, and capacity
- Archive a class at end of year (historical data retained)
- Move students between classes (with effective date)
- View the class in the teacher's perspective — a read-only view of that class's dashboard

**Class detail view (tapping a class card):**
Opens an expanded view of the class showing:

- Full student list with quick status per student
- Assigned teachers
- This week's schedule summary
- Observation activity for the current week
- Link to the full schedule, curriculum coverage, and class-level analytics

---

### Sub-view 2: Students

**Student directory:**
Every enrolled student across all classes in a searchable, filterable list.

**Filter options:**

- By class
- By age group
- By profile completeness (flag incomplete profiles)
- By attendance status (present today, absent today, no check-in)
- By developmental flag (students the teacher has flagged as needing support)

**Each student entry shows:**

- Name, age, class
- Profile completeness indicator
- Lead teacher
- Last observation date

**Student profile (tapping any student):**
Opens the full student profile — the same profile visible to the teacher in Child Detail View, with the addition of the admin data layer:

- Personal and family contact details
- Authorised pick-up list
- Emergency contacts
- Medical notes and allergy records
- Consent records
- Class history

**Admin actions on a student profile:**

- Edit personal and family details
- Add or update emergency contacts
- Add or update medical notes and allergies
- Update authorised pick-up list
- Move student to a different class (with effective date logged)
- Archive a student who has left (with departure date and reason — historical data retained)
- Add a note visible only to admin and teachers (not parents)

**Bulk actions on the student list:**

- Export student list (CSV or PDF)
- Send a message to all parents in a selected class
- Flag incomplete profiles and send a data request to the relevant parents

---

## 5. Teacher Assignments

### Purpose

Controlling which teachers have access to which classes and in what capacity. This screen is the source of truth for teacher-class relationships — every piece of data a teacher sees on her dashboard is scoped by these assignments.

### Structure

**Assignment overview:**
A matrix view — classes on one axis, teachers on the other. Each cell shows the assignment type:

- Lead teacher
- Co-teacher
- Guest / covering (time-limited access)
- No assignment

The admin can see at a glance which classes are well-staffed, which have only one teacher assigned, and which have no lead.

**Assigning a teacher:**
Tapping a cell opens a simple assignment editor:

- Select the teacher from the school's staff list
- Select the assignment type: lead, co-teacher, or guest
- For guest assignments: set a start and end date (access expires automatically)
- Confirm — the teacher's dashboard immediately updates to include this class

**Access implications of assignment type:**
Each assignment type controls what the teacher can see and do:

| Access type      | Can see    | Can log observations | Can edit schedule | Can message parents | Can view reports |
| ---------------- | ---------- | -------------------- | ----------------- | ------------------- | ---------------- |
| Lead teacher     | Full class | Yes                  | Yes               | Yes                 | Yes              |
| Co-teacher       | Full class | Yes                  | No                | Yes                 | View only        |
| Guest / covering | Full class | Yes                  | No                | No                  | No               |

**Removing or changing an assignment:**
The admin can reassign, change type, or remove an assignment at any time. Removing a teacher's access does not delete their historical observations or contributions — the data is retained and attributed to them.

**Platform access levels (separate from class assignments):**
Beyond class-level access, the admin can assign a platform-wide role to each staff member:

| Role            | Scope                                                                          |
| --------------- | ------------------------------------------------------------------------------ |
| Teacher         | Access to assigned classes only                                                |
| Curriculum Lead | Read access to all classes; can edit curriculum framework and activity library |
| Admin           | Full access to all admin screens; cannot access compliance or finance          |
| Director        | Full access to everything                                                      |

---

## 6. Curriculum Manager

### Purpose

The configuration layer that defines what the school teaches and how it is organised. Everything in the platform that involves developmental domains, milestones, and learning objectives references the curriculum configured here.

This screen is typically set up once and refined over time — not visited daily.

### Structure: Three sections

---

### Section 1: Developmental Framework

**What it is:**
The school's chosen early childhood developmental framework — the structure of domains and milestones that teachers observe against, reports are generated from, and outcomes are measured by.

**Options:**

- Select from pre-loaded frameworks (MOE NEL 2022, EYFS, Head Start, Montessori, Creative Curriculum, or others as supported)
- Upload a custom framework (structured CSV or guided builder)
- Use a pre-loaded framework as a base and customise it — add, edit, or remove domains and milestones

**Structure of a framework:**

```
Framework
└── Domain (e.g. Language & Literacy)
    └── Sub-domain (e.g. Listening & Speaking)
        └── Milestone (e.g. "Retells familiar stories in sequence")
            └── Age band (e.g. 4–5 years)
```

**Admin actions:**

- Add a new domain
- Add or edit milestones within a domain
- Assign age bands to milestones
- Archive outdated milestones (historical data retained)
- Preview how the framework appears in the teacher observation view

**Impact when changed:**
Changes to the framework propagate forward only — existing observations are not re-tagged. The admin receives a warning if a change would affect active report drafts.

---

### Section 2: Activity Library

**What it is:**
The school's library of activities available to teachers when building class schedules. Teachers can browse and use these activities. Admins can curate and manage them.

**Library sources:**

- Platform-curated activities (provided by Nurture, filtered for the school's configured framework)
- School-created activities (added by the admin or curriculum lead)
- Teacher-created activities (submitted by teachers, approved by the curriculum lead before becoming available school-wide)

**Each activity in the library contains:**

- Title and description
- Learning domain(s) and milestone(s) it supports
- Duration
- Age group suitability
- Group size (whole class, small group, individual)
- Indoor / outdoor
- Materials required
- Step-by-step instructions
- Differentiation suggestions (for children at different ability levels)

**Admin actions:**

- Add a new activity to the library
- Edit any existing activity
- Archive activities no longer in use
- Review and approve teacher-submitted activities
- Tag activities as recommended or featured
- Export the activity library

**Library analytics:**

- Most used activities across the school
- Least used activities (candidates for review or removal)
- Activities covering domains that are underserved in current schedules

---

### Section 3: Learning Objectives

**What it is:**
A tool for the curriculum lead to define specific learning priorities for each term or year — the milestones the school intends to focus on, at the cohort level.

This is not prescriptive for individual children — individual progression is always child-led. But having school-wide priorities lets the admin compare intended coverage with actual coverage in the Learning Outcomes screen.

**Each objective set:**

- Term or year
- Class or age group it applies to
- Selected milestones from the framework
- Priority level: focus, standard, or background

**Impact:**
Objectives are surfaced in the teacher's schedule builder as suggested priorities — _"The curriculum lead has marked this milestone as a focus this term."_ They appear as an additional layer in the Learning Outcomes analytics.

---

## 7. School Calendar

### Purpose

The school's official calendar — the single source of truth for dates that affect all platform behaviour. When the school calendar says it is a holiday, the teacher's phase-aware dashboard pauses. When the calendar marks a reporting period, the reports screen activates. When a term begins, check-in prompts start appearing for parents.

### Structure: Two sections

---

### Section 1: Academic Calendar

**Year overview:**
A full-year calendar view showing:

- Term dates (start and end of each term)
- School holidays and public holidays
- Professional development days (school closed, no children)
- Reporting periods (when reports are due)
- Key school events (open day, concerts, parent workshops)

**Admin actions:**

- Add or edit term dates
- Add holidays and school closure days
- Add professional development days — these trigger an automatic notification to parents
- Set reporting period dates — this activates the Reports screen countdown for teachers and sends a preparation reminder
- Add school events (see also: Events management in Section 8)

**Platform behaviour driven by the calendar:**
| Calendar entry | Platform effect |
|---|---|
| Term start | Phase-aware dashboard activates; check-in prompts begin for parents |
| Term end | End-of-term reports due reminder sent to teachers |
| School holiday | Teacher dashboard pauses phase logic; parent app shows school closed |
| Reporting period opens | Teacher report drafts become active; countdown shown to teachers |
| Reporting period closes | Admin notified of any outstanding reports |
| PD day | Parents notified automatically via app and message |

---

### Section 2: Class Events

**What it is:**
Class-specific events that appear on the relevant class schedule and in the relevant parents' app — excursions, special visitors, themed days, parent observation mornings.

**Each event contains:**

- Title and description
- Date and time
- Class(es) it applies to
- Whether parents are invited or need to be notified
- RSVP option (yes/no) if parent attendance is required
- Any preparation notes for the teacher

**Admin actions:**

- Create a new class event
- Send event notification to parents (via parent app broadcast)
- Track RSVP responses
- Edit or cancel an event — cancellation triggers automatic parent notification

---

## 8. Class Schedules

### Purpose

The admin's view of all class schedules across the school — not for building individual schedules (that belongs to teachers) but for ensuring all classes are planned, coverage is balanced, and the curriculum is being delivered across all domains.

### Structure: Two sub-views

---

### Sub-view 1: Schedule Overview

**What it shows:**
A school-wide view of this week's schedules across all classes — a compact grid showing each class and each day, with colour-coded domain coverage for each day's activities.

At a glance the admin can see:

- Which classes have complete schedules this week
- Which classes have gaps or unplanned blocks
- Which classes are missing a specific domain this week (e.g. no creative arts planned anywhere)
- Which classes have activities scheduled across a good spread of domains

**Admin actions:**

- Flag a class schedule as needing attention — sends a gentle nudge to the lead teacher: _"Your schedule for this week has some gaps — need help filling them?"_
- Suggest activities from the library to fill gaps — the admin can push a recommendation to the teacher without overriding their plan
- View the previous week's schedule for any class to understand patterns

**What the admin cannot do:**
Override or edit a teacher's schedule directly. The admin's role here is to support, not to manage. The tools are nudges and suggestions — not commands.

---

### Sub-view 2: Schedule Templates

**What it is:**
A library of reusable weekly schedule templates that the admin or curriculum lead can create and share with teachers.

Templates provide a starting point — a model week that reflects good domain coverage and age-appropriate pacing. Teachers can use a template as-is, or adapt it to their class.

**Each template contains:**

- A name (e.g. "Standard 4-year-old week", "High motor skills focus")
- A weekly schedule structure — time blocks, activity types, domain labels
- Notes on the pedagogical rationale

**Admin actions:**

- Create a new template
- Edit or archive templates
- Assign a template as the recommended starting point for a specific class or age group
- Push a template to a teacher's schedule builder as a suggestion

---

## 9. Parent Engagement

### Purpose

Monitoring and managing how the school communicates with parents at scale — ensuring every family receives consistent, high-quality information and that no family is being left behind.

This is not the admin reading individual parent-teacher messages (those are private unless escalated). It is a programme-level view of communication health.

### Structure: Four sections

---

### Section 1: App Adoption

**What it shows:**
The percentage of enrolled families who have activated their parent app account, broken down by class.

For families who have not yet activated:

- Parent name and child name
- Number of days since invitation was sent
- Last reminder sent (if any)

**Admin actions:**

- Resend app invitation to a specific family
- Bulk resend invitations to all non-activated families in a class
- Export non-activated family list for follow-up by phone or in-person

**Why this matters:**
The parent app is the primary communication channel. A family that hasn't activated it is not receiving daily updates, home learning suggestions, or check-in prompts. App adoption rate is a direct proxy for the quality of the home-school connection.

---

### Section 2: Daily Updates

**What it shows:**
School-wide delivery rate of daily updates — the teacher-authored or system-generated summaries of each child's day.

For each class:

- Number of children who received a daily update today
- Number who did not
- Whether the teacher has approved and sent updates or whether they are still in draft

**Flags:**

- If a class has not sent daily updates for 2+ consecutive days, this surfaces as an amber flag on the admin dashboard and in this section
- The admin can tap to see which teacher is responsible and send a support nudge

**What the admin cannot do:**
Read the content of individual daily updates. Those are communications between teacher and parent. The admin sees whether they were sent, not what they said.

---

### Section 3: Broadcasts & Announcements

**School-wide messaging:**
Compose and send a message to all parents, or to a selected group (all parents in a specific class, all parents of a specific age group). Each broadcast appears in the relevant parents' messaging threads — not as a group chat.

**Announcement composer:**
A richer format for important communications — formatted text, image embedding, a subject line. Used for term newsletters, event announcements, policy updates.

**Templates:**
Reusable message templates for common communications:

- Term start welcome
- Upcoming public holiday notice
- School event invitation
- Curriculum theme update for parents
- End-of-term message

**Delivery tracking:**
For each broadcast or announcement:

- Total recipients
- Opened count and rate
- Unopened count — with option to send a follow-up reminder to non-openers

---

### Section 4: Events

**What it is:**
Creation and management of school-wide events visible to all parents in the app.

**Each event contains:**

- Title, description, date, time, location
- Which classes or families it is relevant to
- RSVP option with capacity limit (optional)
- Reminder notification schedule (e.g. 1 week before, 1 day before)

**Admin actions:**

- Create, edit, or cancel events
- View RSVP responses by family
- Send reminder to families who have not yet responded
- Post-event: send a follow-up message or share photos with attending families

**Parent-facing:**
Events appear in the parent app's home feed as a school update card, and in a dedicated Events section. Parents can RSVP directly from the app.

---

## 10. Attendance Overview

### Purpose

School-wide visibility into child attendance — not for compliance (that is out of scope here) but as a support tool: identifying patterns, flagging concerns early, and ensuring no child falls through the cracks.

### Structure: Three sections

---

### Section 1: Today's Attendance

**What it shows:**

- School-wide attendance summary: present, absent with notification, absent without notification, late
- Per-class breakdown
- Children who checked in via parent app vs. teacher-marked vs. admin override
- Children whose parents have not yet checked in and have not reported an absence — requires follow-up

**Admin actions:**

- Mark a child present manually (with reason logged — e.g. parent called the school directly)
- Trigger an automatic absence follow-up message to a parent who has not checked in or reported an absence
- View the drop-off notes submitted by parents at check-in — useful context for any child with a difficult morning

---

### Section 2: Attendance Trends

**What it shows:**
Historical attendance data — not a compliance report, but a pattern-spotting tool.

For each class:

- Weekly and monthly attendance rate
- Trend over the current term
- Days of the week with consistently lower attendance (relevant for scheduling)

For individual students (accessible by tapping a child's name in the class view):

- Attendance history for the current term
- Absence reasons logged by parents
- Pattern flags: e.g. a child who is consistently absent on Mondays, or who has had 5+ absences in 4 weeks

**Why this matters:**
Attendance patterns in preschool can be an early signal of family stress, health issues, or disengagement. The admin's role is not to investigate — it is to ensure the teacher is aware and can have a supportive conversation with the family.

---

### Section 3: Absence Management

**What it shows:**
All absences — current and recent — in one manageable list.

Each absence entry shows:

- Child name and class
- Date(s) absent
- Reason provided (or flagged as no reason given)
- Expected return date (if provided)
- Status: resolved (child has returned), ongoing, or unexplained

**Admin actions:**

- Add a note to an absence record
- Mark an absence as resolved when the child returns
- Flag an absence for teacher follow-up (sends a nudge to the lead teacher)
- Export absence records for a selected period

---

## 11. Learning Outcomes

### Purpose

The admin's strategic view of whether the school's programme is working — aggregated across all children and all classes, without exposing individual child data at this level.

This is the most important screen for a curriculum lead. It answers the question: **"Is the education we are delivering actually developing children?"**

### Structure: Three sections

---

### Section 1: Curriculum Coverage

**What it shows:**
School-wide and per-class view of whether all developmental domains are being actively observed and taught.

For each class:

- Domain coverage this week: which of the six domains had at least one observation
- Domain coverage this term: cumulative coverage per domain
- Coverage gaps: domains that have been consistently underserved for 2+ weeks

**Cross-class comparison:**
A heatmap-style view showing all classes on one axis and all domains on the other. Dark colour = strong coverage. Light colour = light coverage. Instantly reveals whether the whole school is strong in language and literacy but weak in creative arts — a programme-level insight the admin can act on.

**Admin actions:**

- Flag a domain gap to the relevant teacher (sends a support nudge, not a directive)
- Suggest activities from the library that would address a specific domain gap
- Schedule a curriculum review conversation with a class's lead teacher

---

### Section 2: Developmental Progress

**What it shows:**
Aggregated milestone progress data across the school — not individual children, but cohort-level trends.

**School-wide summary:**

- Percentage of children who have had milestones observed in each domain this term
- Percentage on track relative to age-expected milestones
- Percentage flagged as developing (progressing but not yet at expected level)
- Percentage flagged as needing additional support

**Cohort comparison (optional):**

- This year's intake vs. last year's intake at the same point in the year
- Comparison across classes for the same age group — are all classes delivering similar outcomes?

**Drilling down:**
The admin can drill from school-wide → class level → child list (showing names and status). At the child level, the admin sees the same developmental summary as the teacher, not raw data. Drilling down is a support function — the admin identifying which children might need a conversation or additional resources.

**What this is not:**
A performance ranking of teachers. Outcome differences between classes can reflect many things — cohort mix, attendance patterns, the particular strengths of a group of children. The data is surfaced to prompt curiosity and support, not judgement.

---

### Section 3: Observation Quality

**What it shows:**
A layer below coverage — not just whether domains are being observed, but how richly and consistently.

For each teacher:

- Average observations per child per week
- Observation spread across domains (are they observing all six or concentrating on two?)
- Percentage of observations that are linked to milestones (a measure of observation depth)
- Percentage of report drafts that are rated "rich" vs. "thin" by the system

**Admin actions:**

- Identify teachers who would benefit from PD support in observation practice
- Share examples of high-quality observations with the team (anonymised, with teacher's permission)
- Schedule an observation coaching session with a specific teacher

**Framing principle:**
Observation data about teachers is surfaced to the admin as a **support and development tool**, not a performance management tool. A teacher who logs fewer observations may be struggling with workload, may need help with the quick-log flow, or may be new to digital documentation. The data prompts a conversation — it does not trigger a disciplinary process.

---

### Section 4: Reports Cycle

**What it shows:**
Status of the current and upcoming report cycles across the school.

For each class:

- Total children requiring a report
- Reports in draft (system-generated, not yet reviewed by teacher)
- Reports in review (teacher is editing)
- Reports approved and sent
- Reports read by parents

**Admin actions:**

- Send a bulk reminder to teachers who are behind on report reviews
- Extend the reporting deadline for a specific class (with reason logged)
- View any report that has been sent — read-only access for quality assurance

**Reporting period timeline:**
A visual timeline showing where the school is in the current reporting cycle — days remaining, completion percentage, projected completion rate.

---

## 12. Navigation and Screen Connections

| From                                     | Action | Goes to                                    |
| ---------------------------------------- | ------ | ------------------------------------------ |
| Admin Dashboard — any status panel       | Tap    | Full screen for that domain                |
| Classes & Students — class card          | Tap    | Class detail view                          |
| Classes & Students — student entry       | Tap    | Student full profile                       |
| Teacher Assignments — cell               | Tap    | Assignment editor                          |
| Curriculum Manager — activity            | Tap    | Full activity detail and edit              |
| School Calendar — event                  | Tap    | Event detail and RSVP management           |
| Class Schedules — flagged class          | Tap    | Teacher schedule view (read-only)          |
| Parent Engagement — non-activated family | Tap    | Resend invitation                          |
| Parent Engagement — daily updates flag   | Tap    | Teacher nudge composer                     |
| Attendance — unexplained absence         | Tap    | Parent message thread                      |
| Attendance — child pattern flag          | Tap    | Child attendance history                   |
| Learning Outcomes — domain gap           | Tap    | Teacher nudge + activity suggestion        |
| Learning Outcomes — class drill-down     | Tap    | Class-level developmental summary          |
| Learning Outcomes — child drill-down     | Tap    | Child developmental summary (teacher view) |

---

## 13. What the Admin Cannot Do

These constraints are as important as the features themselves.

| Restriction                                              | Reason                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Cannot see individual staff wellbeing check-in responses | Wellbeing data is aggregate only at admin level                                 |
| Cannot log observations                                  | Observation is a teacher function; admin has no role in direct child assessment |
| Cannot access another school's data                      | Even in a multi-site organisation, each school's data is scoped separately      |

---

## 14. Global Design Constraints

| Constraint                    | Requirement                                                                                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Data is aggregated by default | Drilling from school-level to child-level requires intentional navigation; the admin does not see individual child data unless they actively seek it                                 |
| Nudges not directives         | Every tool the admin has to influence a teacher's behaviour is a nudge (suggestion, reminder, resource) — never a directive or override                                              |
| Real-time sync                | Attendance, check-in status, observation counts, and report status update in real time without page refresh                                                                          |
| Role-based access             | What the admin sees is determined by their assigned platform role; a curriculum lead and an operations manager see different default screens                                         |
| Audit trail                   | All admin actions that affect student records, teacher assignments, or curriculum configuration are logged with timestamp and user — not surfaced in the UI but available for export |
| Multi-site awareness          | If the platform supports a school group with multiple sites, the admin's view is scoped to their site by default; a group-level director role can see across sites                   |

---

_This specification covers the admin experience scoped to school operations in support of teaching quality. Enrolment and waitlist management, finance and billing, staffing and rosters, and compliance are covered in separate specification documents._
