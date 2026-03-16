# Nurture — Child Experience: Design Specification
*Version 1.0 | Scope: MVP child-facing mobile experience*

---

## Purpose of this document

This specification describes the child-facing experience in full — the design philosophy, interaction principles, screen-by-screen behaviour, component details, character system, and the reasoning behind every significant decision. It is written for an AI coding agent or developer implementing the feature from scratch.

This document is a companion to `parent-dashboard-spec.md`. The two surfaces share a backend but have entirely different design languages, interaction models, and emotional goals. Do not carry assumptions from one into the other.

Read this document in full before writing any code. The philosophy sections encode constraints that will produce a broken experience if ignored.

---

## The fundamental design problem

A preschool child aged 3–6 cannot:
- Read any text on screen
- Navigate a menu or make meaningful choices from a list
- Understand progress metrics, levels, or scores
- Tolerate ambiguity about what to do next
- Recover gracefully from frustration without adult support
- Wait more than approximately 2 seconds for feedback before losing attention

A preschool child can:
- Recognise familiar characters and attach to them emotionally
- Tap large, visually obvious targets
- Respond immediately to audio cues
- Experience delight from animation and sound
- Feel the difference between success and struggle — and disengage if struggle feels like failure
- Sustain attention for 3–5 minutes on a single engaging task

The child experience is designed entirely around what children at this age can do, not what would be technically convenient or consistent with the parent dashboard.

---

## The single job of the child experience

Make the child want to open it, feel capable while using it, and feel proud when they close it.

Everything else — milestone tracking, level progression, assessment data — is invisible to the child. The child never sees their level, their score, their position relative to peers, or any indication that they are being assessed. From the child's perspective, they are playing a game with a friendly character. The learning is real; the test is invisible.

---

## The five design principles

These principles govern every decision in the child experience. When a design question arises that this document does not explicitly address, apply these principles to resolve it.

### Principle 1: Audio is primary, visual is secondary

The entire experience must be operable by a child who cannot read a single word on screen. Every instruction is spoken. Every feedback state is announced by audio. Every navigation cue is voiced. Text on screen exists for parents and teachers reading over the child's shoulder — never for the child.

Practical implications:
- Every screen transition triggers a character audio line
- Every answer option plays its label aloud when tapped (before scoring the answer)
- Every feedback state (correct, wrong, hint) has a distinct audio response
- The app detects muted device state and prompts the parent to enable sound before the first activity begins
- If audio fails for any reason, the visual design must still communicate the state — but the experience is significantly degraded without sound, and this should be acknowledged

### Principle 2: The character is the constant

Every screen the child encounters features the same character. Activities change. Difficulty changes. Content changes. The character never changes. They are the one familiar thing in an otherwise varying experience, and they provide the emotional scaffolding that makes unfamiliar content feel safe.

The character speaks all instructions, reacts to all answers, celebrates all completions, and says goodbye at the end. A screen without the character feels abandoned. Never design a child-facing screen without considering where the character appears and what they are communicating.

### Principle 3: The child never chooses, they always proceed

Choice paralysis is real at this age. More than two visible options creates confusion. A queue or menu of activities creates decision anxiety that can lead to the child refusing to engage entirely.

The child's screen shows them what is next. Not what they could do. What is next. The teacher has made the choice. The child's job is to play.

The only valid child-initiated navigations in the MVP:
- Tapping the play button on the next activity tile (proceeding forward)
- Tapping the home button to exit an activity (returning to the queue)
- Tapping "My stars" to see the achievements board

Everything else is system-driven.

### Principle 4: Wrong answers feel like discovery, not failure

This is the most important principle in the entire child experience. Getting an answer wrong must never make a child feel bad about themselves or afraid to try again. The emotional tone of wrong-answer feedback must be warm, encouraging, and forward-moving — never negative, alarming, or final.

Specific prohibitions:
- No red X icon on wrong answers
- No buzzer or negative sound effect
- No "Wrong!" or "Not quite!" text (these feel like judgment even to adults)
- No score display during the activity (no "1/3" counter that reminds the child they've got something wrong)
- No visible failure state at the end of a session

The wrong-answer flow has exactly three steps:
1. The tapped option animates (gentle shake — communicates "that's not it" without alarm)
2. The character speaks an encouraging re-prompt ("Let's try again! Which one do you think?")
3. The child tries again

After two wrong attempts on the same question, the correct answer is gently highlighted (pulsing border animation) without being explicitly revealed. The child finds it and taps it. They still receive a positive response. They always end every question on a success state.

### Principle 5: Everything ends in celebration

The session end screen is always celebratory, regardless of how the session went. A child who got all three questions wrong still gets the celebration animation, the character dancing, and the completion sticker. The completion sticker is awarded for finishing, not for accuracy.

Accuracy data is captured in the background and sent to the teacher dashboard. The child never sees it.

This is not about deceiving children — it is about understanding what motivation means at ages 3–6. Intrinsic motivation at this age comes from the experience of engagement and completion, not from performance metrics. A child who finishes a session feeling good will come back. A child who finishes feeling like they failed will not.

---

## Character specification

### Role

The character is the most important design asset in the child experience. They are not a mascot, not a logo element, and not decoration. They are the child's companion and guide through every moment in the app.

### Name

The character name used in this document is Pip — a placeholder. The final name should be chosen by the school director in consultation with teachers, as it will be used by teachers when talking to children about the app ("time to play with Pip!"). The name should be:
- Short (1–2 syllables)
- Easy for 3-year-olds to pronounce
- Warm and approachable in sound
- Not already associated with another well-known children's character

### Visual design brief

The character must be:
- Round and soft — no sharp edges, no angular features
- Non-threatening — large expressive eyes, small or no visible teeth, gentle colours
- Simple enough to animate fluidly on a mid-range mobile device
- Distinct enough to be immediately recognisable at small sizes (52px) and large sizes (120px)
- Consistent in colour and form across all animation states

The character should not be:
- A real animal species (avoids cultural associations)
- Humanoid (avoids uncanny valley effects)
- Based on any existing IP

The design shown in the mockup (a hatching chick) is illustrative. The final character design should be commissioned from a children's illustrator familiar with the 3–6 age group, not generated by AI image tools.

### Animation states

The character has four named animation states used throughout the experience. These are not decorative — each state communicates a specific emotional message to the child.

| State | Name | Description | Used when |
|---|---|---|---|
| 1 | Idle bounce | Gentle continuous vertical bob (8px travel, 1.8s cycle, ease-in-out) | Queue screen, intro screens, any waiting state |
| 2 | Happy jump | Quick scale-up to 125% with slight rotation, returns to normal (0.4s total) | Correct answer confirmed |
| 3 | Encouraging tilt | Gentle head-tilt with small forward lean, holds briefly | Wrong answer re-prompt, hint shown |
| 4 | Celebration dance | Full-body rotation alternating ±10 degrees with slight scale pulse, repeats 3 times (0.6s per cycle) | Session completion, achievement earned |

All animations use CSS keyframes. Animation durations must be respected exactly — they are calibrated to match typical audio line lengths. A celebration animation that finishes before the audio does, or that continues after the audio ends, breaks the synchronisation that makes the feedback feel alive.

### Voice

The character's voice is a warm, slightly higher-pitched adult voice (not a child voice — child voice acting is difficult to produce consistently and can feel patronising). The voice is enthusiastic without being frantic, and encouraging without being saccharine.

Every character audio line must be recorded as a separate asset. Text-to-speech is not acceptable for this surface — the emotional calibration of the character's voice is too important to leave to synthesis. Audio line categories:

**Queue/navigation lines (3–5 variants each, played randomly):**
- Greeting on open: "Hi [name]! Ready to play?" / "Hello! Let's have fun today!" / "Yay, you're here!"
- Activity intro: "Here we go!" / "Let's try this one!" / "Ready? Here's your game!"
- Goodbye: "See you next time! Bye bye!" / "Great playing today! Come back soon!" / "Bye [name]!"

**Activity instruction lines (1 per activity type — these must be consistent):**
- Written once per activity, recorded once, played at the start of every session for that activity type

**Correct answer lines (5–8 variants, played randomly to prevent repetition):**
- "Yes!" / "That's right!" / "Amazing!" / "You got it!" / "Brilliant!" / "Woohoo!" / "You did it!"
- Followed immediately by the specific feedback ("Banana starts with B!")

**Wrong answer lines (3–5 variants, calibrated to not sound negative):**
- "Let's try again!" / "Hmm, which one do you think?" / "Have another look!" / "Almost — which one?"

**Hint lines (1–2 per activity type — specific to the skill):**
- "Listen again... [word repeated slowly]" / "Let me help — [key sound emphasised]"

**Completion lines (3–5 variants):**
- "Amazing work today!" / "You finished! I'm so proud of you!" / "Wow, you did it! That was brilliant!"

### Audio production notes

All audio lines must be:
- Recorded in a consistent acoustic environment (no reverb changes between sessions)
- Normalised to a consistent volume level
- Stored as MP3 at 128kbps minimum
- Named with a consistent scheme: `pip_[category]_[variant].mp3` (e.g. `pip_correct_03.mp3`)
- Loaded into a preload queue on app start to prevent playback delay

The correct answer specific feedback ("Banana starts with B!") is generated as a template with dynamic slots filled at content-authoring time, not at runtime. This means each specific feedback line is a separate recorded asset, not text-to-speech inserted into a template.

---

## Screen specifications

### Screen 1: Activity queue

**Entry point.** The first screen the child sees when the parent hands them the device.

**Layout (top to bottom):**

1. Character (Pip) — large (80px), centred, idle bounce animation
2. Speech bubble — greeting line (one of 3–5 variants, randomly selected)
3. Activity tile list — up to 3 tiles, stacked vertically
4. "My stars" button — small, bottom-left, secondary affordance

**Activity tile states:**

| State | Visual treatment | Interaction |
|---|---|---|
| Completed | Light green background and border, "Done!" badge in green, activity label muted | Not tappable — tap produces a gentle completed sound |
| Active (next) | Yellow border and background tint, play button visible | Tappable — full card and play button both navigate to activity intro |
| Locked | Standard border, padlock icon replacing play button, label muted, opacity 0.6 | Not tappable — tap produces a gentle locked sound |

Only one tile is ever in Active state at a time. Tiles are shown in queue order — the next unplayed activity is always Active. When an activity is completed, the next tile transitions from Locked to Active (animated transition: border colour changes, padlock fades out, opacity increases).

**"My stars" button:**

A small square tile in the bottom-left (52×52px), showing the star icon and the label "My stars". When a new sticker has been earned since the last visit, a small green badge appears in the top-right corner of the button ("+1"). This creates pull toward the achievements board after session completion.

**Design note on locked tiles:**
Locked tiles are visible but inactive. This is intentional — hiding them would make the queue feel sparse and give the child no sense of what's ahead. Seeing a locked activity creates mild anticipation ("I wonder what that one is"). The padlock should feel friendly and temporary, not punitive.

### Screen 2: Activity intro

**Purpose:** Give the child a moment to understand what is about to happen before questions begin. Prevents the disorientation of being dropped directly into a question with no context.

**Layout:**

1. Home button — top-right corner (44×44px), house icon, requires deliberate tap
2. Character — extra large (120px), centre-top, idle bounce
3. Speech bubble — activity instruction line, delivered clearly and slowly
4. Single large "Let's go! ▶" button — centre-bottom, yellow

The home button uses a deliberate-tap mechanic: it requires a press-and-hold of 800ms to activate. This prevents accidental exits during the moment of transition. Implementation: `ontouchstart` begins a timer; `ontouchend` cancels it if under 800ms; if 800ms elapses, trigger navigation. Visual feedback: the button gradually fills with a darker background during the hold.

The intro screen is shown for every activity, every time — even if the child has played the same activity before. Skipping the intro would disorient children who need the ritual of "here's what we're doing" before each session.

### Screens 3–5: Question screens

**The core loop.** Each session contains 3 questions drawn from the activity's variant pool. The question screen, wrong-answer screen, and correct-answer screen form a micro-loop that repeats 3 times.

**Question screen layout:**

1. Home button — top-right, deliberate-tap (800ms hold)
2. Character + speech bubble — small character (52px), question prompt in bubble. The question is displayed as text AND spoken by character audio. The text is in the bubble for parents to read; the audio is for the child.
3. Scene display — large central card (full width, ~220px tall) showing the stimulus image. This is the largest element on screen because it is what the child is reasoning about.
4. Spoken word display — below the scene card, the word shown in large letters (18px medium, not for reading — for the parent, and for children beginning to recognise whole words). The character speaks the word aloud.
5. Answer options — 3 large tap targets arranged horizontally. See answer option specifications below.
6. Progress dots — 3 dots at the bottom, showing position in the 3-question sequence (inactive: grey; current: yellow, slightly larger; completed: green)

**Answer option specifications:**

Minimum size: 140px wide × 120px tall. This is a hard minimum — preschool motor control requires large targets. On screens narrower than 360px, scale proportionally but never below 110px wide.

Each option shows:
- The answer content (a letter, a number, a picture) — large, centred
- A short label below if applicable (e.g. the sound a letter makes: "buh")

Answer options are arranged in a horizontal row of 3. For MVP (tap-to-select format only), 3 options is always the count. Do not add a 4th option — it creates a layout that is too small on most devices and increases difficulty beyond the intended level.

**The answer tap sequence (critical — implement exactly as described):**

When a child taps an answer option, the following happens in precise order:

1. Immediate visual feedback — the tapped option animates (correct: green border + background; wrong: shake animation)
2. Immediate audio — character speaks the answer content (e.g. "B!") — this plays before the scoring response
3. Short delay (400ms) — allows the child to perceive the animation
4. Scoring response audio — character speaks correct ("Yes! Banana starts with B!") or wrong re-prompt ("Let's try again!")
5. Screen transition — after correct: brief hold (600ms) then transition to correct-state screen; after wrong: immediate transition to wrong-state screen

Step 2 (playing the answer content on tap, before scoring) is important. Children need to hear what they selected before they hear whether it was right or wrong. Scoring the answer silently and jumping straight to feedback skips this grounding step.

**Wrong-answer screen layout:**

Same as question screen, with these differences:
- The wrong option is shown with wrong styling (shake animation completed, border remains coral/warm, opacity 0.6) and is non-interactive (pointer-events: none)
- The character is in Encouraging tilt state
- The speech bubble contains the re-prompt line specific to this activity
- The other options remain interactive

After 2 wrong attempts on the same question: the correct option receives the hint animation (pulsing yellow border, slightly brighter background). The wrong option from the most recent attempt is greyed out. The child is not told explicitly which one is correct — the visual hint guides them to it.

**Correct-answer screen layout:**

- Character in Happy jump state
- The correct option highlighted (green border + background, no shake)
- All other options at 0.4 opacity, non-interactive
- Character's specific feedback line in the speech bubble
- "Next ▶" button (or "Finish! 🎉" for the final question)
- Progress dot for this question turns green

The "Next ▶" button should not auto-advance. The child taps it deliberately. Auto-advancing removes agency and can cause disorientation if the child is still processing the feedback.

### Screen 6: Celebration screen

**The most important screen in the app.** This is the moment that determines whether the child wants to open the app again tomorrow.

**Layout:**

1. Character — extra large (120px), celebration dance animation, runs 3 cycles
2. Three stars — animated in with a pop sequence (star 1: 100ms delay, star 2: 250ms delay, star 3: 400ms delay). Scale from 0 to 1.2 to 1.0. Always show all 3 stars regardless of session score.
3. Primary text — "[Name]! You finished!" — large, warm, specific to the child
4. Sticker earned card — shows the sticker icon for the milestone this activity maps to, with label "You earned a new star!" and the milestone name in plain language
5. Single button — "See my stars! ⭐" navigates to achievements board

Confetti animation: 28 small coloured squares (8px, 2px border-radius) fall from the top of the screen. Each has a random horizontal start position, random fall duration (0.9–1.5s), random start delay (0–0.6s), and random colour from a warm palette (yellow, green, coral, blue, pink, lavender). Confetti is purely CSS animation — no canvas, no physics library.

**What is never shown on this screen:**
- No fraction score (e.g. "2/3 correct")
- No star rating that reflects performance (e.g. 2/3 stars for a session with errors — always show 3)
- No comparison to previous sessions
- No level or milestone name in assessment language ("you've advanced to Developing")

The sticker card does show the milestone name, but framed as "what you can do now" not "what level you're at."

### Screen 7: Achievements board

**The child's personalised record of what they've done.** A visual collection that grows over time.

**Layout:**

1. Back arrow — returns to queue
2. Character — small (52px), idle bounce, positioned with a speech bubble ("Look at all the things you can do, [name]!")
3. Sticker grid — 3 columns, variable rows, each sticker is 80×80px

**Sticker states:**

| State | Visual treatment |
|---|---|
| Earned | Full colour, yellow border, normal opacity |
| Newly earned (since last visit) | Full colour, green border, pop-in animation on entry |
| Locked | Greyscale, grey border, opacity 0.5, shows "❓" instead of sticker art |

Tapping an earned sticker plays the character saying the plain-language milestone name ("You know all your letters!"). Tapping a locked sticker plays the character saying "Keep playing to find this one!" — not silence, not an error, but an encouraging tease.

The grid is ordered by milestone sequence — earned stickers fill from top-left, locked stickers continue in sequence. The child can see how many stickers remain (visible as question marks) without knowing what they are. This creates collection motivation without explicit level progression.

**Sticker design:**

Each sticker is a distinct illustrated icon (not an emoji — emoji render inconsistently across devices and look cheap at 80px). One sticker per milestone. For the MVP with 20 skill milestones (LL and NUM only — SED milestones do not have stickers in MVP), 20 sticker illustrations are required.

Sticker art brief:
- Simple, bold, recognisable at 80px
- Warm colour palette consistent with the app's visual language
- Directly illustrative of the milestone concept (a book for reading milestones, a number for numeracy)
- No text within the sticker art

---

## Visual design system

The child experience has a deliberately different visual language from the parent dashboard. They should not look like the same product skinned differently — they should feel like entirely different surfaces that happen to share data.

### Colour palette

| Role | Value | Usage |
|---|---|---|
| Background | #FFF8F0 | All screen backgrounds — warm off-white |
| Surface white | #FFFFFF | Card backgrounds, speech bubbles, answer options |
| Border warm | #E8D5B0 | Default borders on cards and tiles |
| Yellow primary | #F5C518 | Active state borders, primary buttons, progress indicators |
| Yellow dark | #E5B518 | Button press state |
| Yellow light | #FFFBEB | Active tile background tint |
| Green success | #7DC873 | Correct answer state, completion badges, achievement borders |
| Green light | #F0FAF0 | Correct answer card background |
| Coral wrong | #E8604A | Wrong answer border (warm, not alarming red) |
| Coral light | #FEF0EE | Wrong answer background |
| Text primary | #3D2B1F | All primary text — warm dark brown |
| Text muted | #8B7355 | Secondary text, labels |
| Text amber | #5C4200 | Text on yellow backgrounds |

**Critical: do not use pure red (#FF0000 or similar) anywhere in the child experience.** Red triggers alarm responses. The wrong-answer colour (#E8604A) is a warm coral — it communicates "not this one" without communicating danger or failure.

**Dark mode:** The child experience does not support dark mode. It uses hardcoded hex values throughout. Preschool children do not configure their device display settings. The parent may have dark mode enabled — the child experience should override this with a light forced theme on the child surface.

### Typography

| Element | Size | Weight | Colour |
|---|---|---|---|
| Screen title | 20px | 500 | #3D2B1F |
| Activity tile label | 17px | 500 | #3D2B1F |
| Speech bubble body | 16px | 400 | #3D2B1F |
| Spoken word display | 18px | 500 | #3D2B1F |
| Answer option letter | 48px | 400 | #3D2B1F |
| Answer option label | 14px | 500 | #3D2B1F |
| Badge text | 13px | 500 | context-dependent |
| Secondary labels | 11–12px | 400 | #8B7355 |
| Button text | 20px | 500 | #3D2B1F |

No font size below 11px anywhere in the child experience. No italic text. Bold (500) is used for key words in speech bubbles to match audio emphasis, but sparingly — maximum one or two words per bubble.

### Shape and sizing

- All interactive elements: minimum 80×80px tap target, no exceptions
- Cards and tiles: border-radius 20–24px — significantly rounder than the parent dashboard
- Character speech bubbles: border-radius 20px with a downward-pointing tail (CSS border triangle, not an SVG)
- Buttons: border-radius 32px (pill shape for primary) or 50% (circle for icon buttons)
- All borders: 2–3px width — heavier than the parent dashboard's 0.5px. Children's interfaces need more visual weight to feel solid.
- Answer options: 140px wide × 120px tall, border-radius 20px, border 3px

### Animation timing reference

| Animation | Duration | Easing | Notes |
|---|---|---|---|
| Pip idle bounce | 1.8s cycle | ease-in-out | Infinite, continuous |
| Pip happy jump | 0.4s | ease-out | Triggered on correct answer |
| Pip encouraging tilt | 0.5s | ease-in-out | Triggered on wrong answer |
| Pip celebration dance | 0.6s × 3 | ease-in-out | Triggered on session complete |
| Wrong answer shake | 0.4s | ease-out | translateX ±8px, 4 oscillations |
| Correct answer pop | 0.4s | ease-out | Scale 1→1.12→1 |
| Hint pulse | 0.6s | ease-in-out | Alternate, infinite while hint is shown |
| Star entrance | 0.3s per star | ease-out | Scale 0→1.2→1, sequential delays |
| Sticker new pop | 0.5s | ease-out | Scale 0→1.15→1 |
| Confetti fall | 0.9–1.5s per piece | ease-in | 28 pieces, staggered delays |
| Screen transition | 200ms | ease | Fade or slide — no complex transitions |

All animations use CSS keyframes. No JavaScript animation libraries. The device must render these smoothly on a mid-range Android tablet from 2021 or later — keep total animation complexity per screen under 30 simultaneous elements.

---

## Navigation and routing

The child experience has a flat, linear navigation model with no back-stack deeper than one level.

```
Queue
  ├── Activity intro → Question 1 → Question 2 → Question 3 → Celebration → Queue (updated)
  └── Achievements board → Queue
```

The home button (house icon, top-right, 44×44px) appears on all activity screens. It uses the deliberate-tap mechanic (800ms hold) to prevent accidental exits. When triggered, it returns the child to the Queue screen immediately — no confirmation dialog. Session results up to that point are saved; the activity is not marked complete.

There is no back navigation within an activity sequence. Once Question 1 is answered, the child cannot return to it. Forward only.

The Achievements board has a standard back arrow (← , 36×36px) that returns to the Queue. No hold required — this is not an accidental exit risk.

---

## Session scoring and data capture

The child never sees scoring. The system captures it invisibly.

Per session, the system records:
- Child ID
- Milestone ID
- Activity variant IDs shown (which specific variants of the 3 questions)
- Per question: what was shown, what the child tapped, whether it was correct, how many attempts were required (1, 2, or auto-completed via hint)
- Session pass/fail (pass = 2 of 3 questions correct on first attempt)
- Session duration (ms from first question shown to celebration screen loaded)
- Initiated from (teacher tablet / parent phone)
- Timestamp

A question answered correctly after a hint is scored as incorrect for milestone mastery purposes (it counts as an attempt, not a pass). This is invisible to the child but feeds the correct data to the teacher dashboard.

The sticker is awarded on session completion regardless of score. The completion sticker award and the mastery session result are separate events in the data model.

---

## Content requirements

The following content must be produced before the child experience can function. This is a production deliverable, not a technical task.

### Character assets

| Asset | Format | Quantity |
|---|---|---|
| Character in idle state | SVG or PNG sequence | 1 |
| Idle bounce animation frames | PNG sequence or Lottie JSON | 1 animation (8 frames) |
| Happy jump animation frames | PNG sequence or Lottie JSON | 1 animation (6 frames) |
| Encouraging tilt animation frames | PNG sequence or Lottie JSON | 1 animation (5 frames) |
| Celebration dance animation frames | PNG sequence or Lottie JSON | 1 animation (12 frames) |
| Character at 4 sizes (52px, 80px, 120px, display) | PNG @2x and @3x | 4 sizes |

Recommended implementation: Lottie JSON files for animations (Lottie is lightweight, scales cleanly, and renders consistently across devices). Fallback: CSS-animated PNG sprite sheets.

### Audio assets

| Category | Quantity |
|---|---|
| Greeting lines | 5 |
| Goodbye lines | 5 |
| Activity instruction lines (one per activity) | 20 |
| Correct answer generic lines | 8 |
| Correct answer specific lines (one per question type, not per variant) | ~30 |
| Wrong answer re-prompt lines | 5 |
| Hint lines (one per activity type) | 10 |
| Session completion lines | 5 |
| Sticker tap lines (one per milestone) | 20 |
| Locked sticker tap line | 2 |

Total audio assets: approximately 110 recorded lines. Recording time estimate: 3–4 hours in a sound studio. Post-production (normalisation, trimming, export): 1–2 days.

### Sticker illustrations

20 sticker illustrations (one per LL and NUM milestone). Each delivered as:
- SVG at native resolution
- PNG at 80×80px @3x (240×240px)
- With transparent background

### Activity scene images

Each activity variant requires a scene image (the stimulus shown in the large central card). For the 20 activities with 4–5 variants each, this represents approximately 90–100 scene images. These can be illustrated in a consistent style or sourced from a high-quality illustration library with consistent visual language. Scene images must:
- Be clear and unambiguous (the child must immediately understand what is depicted)
- Have consistent visual style across all activities
- Show objects in isolation on a clean background
- Be culturally appropriate for Singapore's multicultural context (represent diverse foods, animals, objects familiar to local children)

---

## What the child experience does not include

These omissions are intentional. Do not add them without an explicit product decision and documented rationale.

| Absent feature | Reason |
|---|---|
| Progress bars or level indicators | Children at this age cannot interpret developmental progress metrics. Showing them creates no value and risks parental projection onto the child's self-image. |
| Score display (fractions, percentages, stars that reflect performance) | Violates Principle 4. Performance visibility at session end would cause children who struggled to feel bad and disengage. |
| Activity choice / browsing | Violates Principle 3. Choice paralysis is real. The teacher controls sequencing for pedagogical reasons. |
| Replay of completed activities | In MVP, replaying completed activities is not supported. A child who replays their favourite activity instead of attempting the next one would generate false mastery data and slow progression. Post-MVP consideration: a "free play" mode separate from the main queue. |
| Streak tracking or daily goals | Creates guilt and obligation anxiety for time-poor families. The product should have no feature that makes a parent feel bad for missing a day. |
| Push notifications to the child | Children do not manage notifications. All notifications go to the parent. |
| Settings or account management | Children cannot configure settings. All configuration is done by parents or teachers. |
| In-app purchases or premium features | Not applicable. Any monetisation decision will be made at the product level, not within the child experience. |
| Social features (comparing with friends) | Absolutely not. Never. Peer comparison at this age causes harm. |
| Timer or time pressure | Eliminates the experience of discovery and makes wrong answers feel like emergencies. |

---

## Device and platform notes

**Primary target device:** Parent's smartphone (iOS and Android, mid-range and above, screen size 5.5"–6.7"). Secondary: classroom tablet (iPad or Android tablet, 10"–11").

**Orientation:** Portrait only on phones. Landscape supported on tablets with layout reflow (answer options arrange in a 2×2 grid on landscape rather than a 3-column row).

**Touch targets:** All interactive elements must pass the 80×80px minimum on phone. On tablet, scale to 100×100px minimum. Never rely on text links for child-facing navigation.

**Audio output:** The experience assumes audio is on. At session start, if the device is in silent mode, display a modal (parent-facing, with readable text): "Turn on sound for the best experience — [name] needs to hear the instructions!" with a dismiss button. This modal does not appear mid-session.

**Performance:** All character animations must run at 60fps on devices from 2020 onwards. If performance degrades on older devices, degrade animation complexity (reduce confetti count, simplify character animation to CSS transforms only) before degrading interaction responsiveness.

---

## Handoff checklist

Before the child experience is considered shippable for prototype testing, verify:

- [ ] Every screen is fully navigable without reading any text
- [ ] Every answer option produces audio feedback on tap (letter/number/word spoken)
- [ ] The wrong-answer flow never shows a red X or negative sound
- [ ] The correct answer hint appears correctly after 2 wrong attempts
- [ ] The celebration screen shows 3 stars regardless of session performance
- [ ] The sticker is awarded on every session completion regardless of score
- [ ] The home button requires an 800ms hold to activate on all activity screens
- [ ] No score, fraction, or performance metric is visible to the child at any point
- [ ] The achievements board shows locked stickers as greyed question marks
- [ ] Tapping a locked sticker produces an encouraging audio response
- [ ] The character appears on every child-facing screen
- [ ] All child-facing screens use the hardcoded colour palette (not CSS variables that would invert in dark mode)
- [ ] All tap targets are minimum 80×80px on phone viewport
- [ ] Audio preloads on app open, not on first play

