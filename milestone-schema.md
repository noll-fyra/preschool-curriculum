# Nurture — Milestone Schema
*Version 1.0 | MVP scope | NEL Framework 2022 aligned*

---

## Overview

This document defines the full milestone schema used by the Nurture platform to track each child's developmental progress. Milestones are the core data contract between activities, the teacher dashboard, and the parent progress feed.

### Developmental Levels

All milestones sit within one of three levels:

| Level | Label | Typical stage | Description |
|---|---|---|---|
| 1 | Beginning | N2–early K1 | Earliest observable skills; foundational concepts |
| 2 | Developing | K1–early K2 | Consolidating core knowledge; applying with support |
| 3 | Secure | End of K2 | Consistent independent mastery; P1-ready |

Level advancement is automatic: when all milestones within a level are achieved across the active learning areas, the system unlocks the next level and notifies the teacher.

### Assessment Types

**Skill-based milestones** (Language & Literacy, Numeracy) are assessed through in-app activities. A milestone is achieved when a child passes an activity session linked to that milestone 3 times consecutively, or 5 times out of 7 attempts — whichever comes first.

**Behaviour-based milestones** (Social & Emotional Development) are awarded by teachers via the dashboard observation mechanic. A teacher logs an observation against a specific milestone. The milestone is achieved once 5 observations have been logged on 5 separate calendar days (one observation per milestone per child per day maximum).

---

## Milestone ID Format

```
[AREA]-[LEVEL]-[SEQUENCE]

Examples:
  LL-B-01   Language & Literacy, Beginning, first milestone
  NUM-D-03  Numeracy, Developing, third milestone
  SED-S-02  Social & Emotional Development, Secure, second milestone
```

**Important:** Milestone IDs are immutable once assigned. If a milestone statement is updated, the ID must remain the same to preserve historical data integrity.

---

## Learning Area 1: Language & Literacy (English)

*10 milestones across 3 levels. Assessed via in-app activities (skill-based).*
*Sequencing follows standard emergent literacy progression: print awareness → letter knowledge → phonological awareness → decoding → reading comprehension.*

### Beginning (3 milestones)

| ID | Milestone statement | Parent-facing description | Linked activity |
|---|---|---|---|
| LL-B-01 | Recognises own name in print | "Your child can spot their own name written down — one of the very first reading moments." | Find your name card |
| LL-B-02 | Identifies at least 10 letters of the alphabet by name | "Knowing letter names by sight is the foundation everything else builds on." | Tap the letter named |
| LL-B-03 | Understands that text is read left to right, top to bottom | "Knowing how to look at a page correctly is a key early literacy concept." | Which way does the worm read? |

### Developing (4 milestones)

| ID | Milestone statement | Parent-facing description | Linked activity |
|---|---|---|---|
| LL-D-01 | Matches all uppercase letters to their lowercase pairs | "Connecting 'A' with 'a' helps children read both printed books and handwriting." | Match uppercase to lowercase door |
| LL-D-02 | Identifies the beginning sound of familiar words | "Knowing that 'fish' starts with an 'f' sound is called phonemic awareness — the key to cracking reading." | What sound does this word start with? |
| LL-D-03 | Recognises 15+ common sight words (I, a, the, is, my, he, she, we, go, and, in, it, to, on, at) | "Sight words are read on sight without sounding out — building a bank of them makes reading much faster." | Find the sight word on the card |
| LL-D-04 | Sequences 3–4 pictures to tell a simple story in correct order | "Ordering story pictures shows your child understands how events connect — a reading comprehension skill." | Put the story pictures in order |

### Secure (3 milestones)

| ID | Milestone statement | Parent-facing description | Linked activity |
|---|---|---|---|
| LL-S-01 | Blends consonant-vowel-consonant sounds to read simple words (e.g. cat, sun, pig) | "Blending sounds into words is the breakthrough moment in learning to read — a huge milestone." | Blend the sounds — tap the picture |
| LL-S-02 | Reads simple sentences using known sight words and phonics | "Reading short sentences independently shows everything is coming together." | Read the sentence — tap the scene |
| LL-S-03 | Answers simple comprehension questions about a short passage read aloud | "Understanding what was just read — not just saying the words — is true reading comprehension." | Answer a question about the story |

---

## Learning Area 2: Numeracy

*10 milestones across 3 levels. Assessed via in-app activities (skill-based).*
*Sequencing follows standard early numeracy progression: number words → counting objects → numeral recognition → quantity comparison → operations.*

### Beginning (3 milestones)

| ID | Milestone statement | Parent-facing description | Linked activity |
|---|---|---|---|
| NUM-B-01 | Rote counts aloud to 10 in correct sequence | "Counting to 10 in order is the starting point — like learning the alphabet before reading." | Tap the animals into their numbered spots |
| NUM-B-02 | Counts objects 1–5 with one-to-one correspondence | "Matching one count to one object (not just saying numbers) is an important conceptual leap." | Count the objects — tap the number (1–5) |
| NUM-B-03 | Recognises and names written numerals 1–5 | "Knowing what the numeral '3' looks like is different from being able to count — both matter." | Tap the numeral called (1–5) |

### Developing (4 milestones)

| ID | Milestone statement | Parent-facing description | Linked activity |
|---|---|---|---|
| NUM-D-01 | Counts objects 1–10 with one-to-one correspondence | "Counting accurately to 10 with real objects shown is solid early number sense." | Count the objects — tap the number (6–10) |
| NUM-D-02 | Recognises and names written numerals 1–10 | "Knowing what '7' looks like and that it means seven things is a key number milestone." | Find the numeral on the washing line (1–10) |
| NUM-D-03 | Identifies which group has more or fewer objects (up to 10) | "Comparing quantities ('this pile has more') is the beginning of mathematical thinking." | Which plate has more / fewer? |
| NUM-D-04 | Sorts objects by one attribute: colour, size, or shape | "Sorting is how children first experience categories — a foundation for logical thinking." | Sort the objects into bins |

### Secure (3 milestones)

| ID | Milestone statement | Parent-facing description | Linked activity |
|---|---|---|---|
| NUM-S-01 | Counts and sequences numbers 1–20 | "Counting to 20 correctly prepares children for addition and subtraction in Primary 1." | Fill the missing numbers on the train |
| NUM-S-02 | Identifies and names basic 2D shapes and their properties | "Knowing a triangle has 3 sides and a circle has no corners is early geometry." | Find the shape by its property |
| NUM-S-03 | Completes simple addition and subtraction within 5 | "Sums within 5 are the first formal maths operations — exactly what Primary 1 starts with." | Story maths: how many now? |

---

## Learning Area 3: Social & Emotional Development

*10 milestones across 3 levels. Assessed via teacher observation (behaviour-based).*
*All milestones require 5 confirmed observations on 5 separate calendar days to be achieved.*

### Beginning (3 milestones)

| ID | Milestone statement | What the teacher is watching for | Parent-facing description |
|---|---|---|---|
| SED-B-01 | Names at least 4 basic emotions when shown pictures or faces | Child correctly labels happy, sad, angry, scared when asked | "Naming emotions is the first step to understanding and managing them." |
| SED-B-02 | Follows a 2–3 step classroom routine without reminders | Child independently moves through a routine (e.g. pack up → wash hands → sit) | "Following routines shows self-regulation — one of the most important school-readiness skills." |
| SED-B-03 | Takes turns with a peer during a structured activity | Child waits and allows another child their turn without prompting | "Turn-taking is an early social contract children need for friendships to work." |

### Developing (4 milestones)

| ID | Milestone statement | What the teacher is watching for | Parent-facing description |
|---|---|---|---|
| SED-D-01 | Identifies what caused a character's emotion in a story or situation | When asked "why is she sad?", child gives a plausible situational reason | "Connecting emotions to causes shows your child is developing empathy and emotional intelligence." |
| SED-D-02 | Uses words to express their own feelings rather than acting out | Child says "I'm angry" or "that hurt my feelings" rather than hitting or crying without explanation | "Putting feelings into words is a major step in emotional self-management." |
| SED-D-03 | Identifies helpful vs. unhelpful behaviour in a scenario | When shown a situation, child correctly says whether the behaviour was kind or unkind | "Distinguishing kind from unkind actions shows your child is developing a moral compass." |
| SED-D-04 | Shows care toward a peer who is upset or struggling | Child spontaneously offers comfort, checks in, or tells a teacher when a friend seems distressed | "Noticing and responding to a friend's feelings — this is empathy in action." |

### Secure (3 milestones)

| ID | Milestone statement | What the teacher is watching for | Parent-facing description |
|---|---|---|---|
| SED-S-01 | Explains their own feelings and gives a reason unprompted | Child volunteers "I feel nervous because it's my first time" without being asked | "Being able to name and explain a feeling unprompted is advanced emotional literacy." |
| SED-S-02 | Proposes a solution to a peer conflict independently | Child suggests "we could take turns" or "let's ask the teacher" without adult prompting | "Problem-solving in friendships rather than escalating — strong social competence." |
| SED-S-03 | Demonstrates responsibility toward group or classroom tasks | Child consistently takes ownership (packs up materials, reminds peers of rules, helps set up) | "Taking responsibility in a group shows your child is ready to thrive in Primary 1." |

---

## Mastery Rules Reference

### Skill-based (LL and NUM)

```
A milestone is ACHIEVED when either condition is met:
  Condition A: 3 consecutive passing sessions
  Condition B: 5 passing sessions out of any 7 attempts

A session is a PASS when: 2 out of 3 questions answered correctly

One session = one activity play-through (3 questions from the milestone's variant pool)
```

### Behaviour-based (SED)

```
A milestone is ACHIEVED when:
  5 teacher observations have been logged
  across 5 separate calendar days
  (maximum 1 observation per milestone per child per day)

Progress is visible to the teacher as: "[X] / 5 observations recorded"
```

---

## Data Model Entities

The following entities are required to implement this schema:

| Entity | Key fields |
|---|---|
| `LearningArea` | id, name, assessment_type (skill / behaviour) |
| `DevelopmentalLevel` | id, name (Beginning / Developing / Secure), order |
| `Milestone` | id (e.g. LL-B-01), learning_area_id, level_id, statement, parent_description, teacher_notes |
| `ChildMilestoneProgress` | child_id, milestone_id, status (not_started / in_progress / achieved), achieved_at |
| `ActivityResult` | child_id, milestone_id, session_id, passed (bool), attempted_at |
| `TeacherObservation` | child_id, milestone_id, teacher_id, observed_at (date only — no duplicate dates) |

---

## Future Extensions (Post-MVP)

- **Onboarding assessment**: A short placement activity set (3–4 questions per area) to determine a new child's starting level rather than always beginning at B-01. Planned for Wave 1.
- **P1 extension track**: Once a child reaches Secure across all areas, an optional P1-readiness track will unlock further milestones aligned to early primary expectations. Planned for Wave 3.
- **Admin curriculum editor**: Allows school administrators to modify milestone statements, reorder within levels, and add new milestones — without affecting historical data (ID immutability preserved). Planned for Wave 1.
- **Mother Tongue Language (MTL)**: A parallel Language & Literacy track for Mandarin, Malay, and Tamil, aligned to NEL MTL framework. Planned for Wave 2.

