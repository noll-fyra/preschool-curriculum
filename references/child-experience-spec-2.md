# Child Experience — Design Specification

## Purpose

This document specifies the child-facing product experience for Nurture — a preschool education and learning platform. It covers the screen structure, interaction model, activity types, and design principles for children aged 3–6.

It is intended as a reference for AI coding assistants and developers building the child-facing layer of the platform.

For the teacher-facing experience, see `teacher-dashboard-spec.md` and `secondary-screens-spec.md`.

---

## 1. Core Design Constraints

The child experience operates under fundamentally different design rules from the teacher and parent products. These constraints are non-negotiable and must be applied across every screen, interaction, and activity.

| Constraint | Requirement |
|---|---|
| No text navigation | All navigation elements must be large recognisable images, characters, or icons with audio support — never text labels |
| Audio is primary | Every label, instruction, prompt, and piece of feedback must be speakable; the child should never be stuck because they cannot read something |
| Fat-finger friendly | Tap targets must be significantly larger than adult UI standards; small buttons, tight spacing, and hover states are not appropriate for this audience |
| No punishing feedback | Incorrect responses never produce red marks, buzzers, or failure states; feedback is always gentle and encouraging |
| Short sessions by design | Activities are 3–8 minutes; the interface does not ask children to manage their own time or commit to long sessions |
| Character-mediated | All instructions, feedback, celebration, and navigation guidance are delivered through a trusted character, not through UI conventions |
| Closed environment | A child tapping anywhere must never leave the product; no ads, no external links, no in-app purchase prompts |
| No adult UI conventions | No sidebar, no hamburger menu, no notification badges, no unread counts, no settings screens, no login screen for the child |
| No scores visible to child | Performance metrics exist in the teacher and parent views only; the child sees celebration and collection, not percentages or ratings |
| No social comparison | No multiplayer, no leaderboards, no comparison with other children; the experience is between the child and their world |
| Offline capable | Core activities must function without internet connectivity and sync when connection is restored |

---

## 2. The World Metaphor

Rather than screens and menus, the child experience is built around a **world** — a gentle, illustrated environment the child inhabits. The child navigates by exploring places in their world, not by reading navigation labels.

The world has a small number of distinct **places**, each associated with a domain of learning. The child arrives at a home base, sees their world, and taps a place to visit it.

This metaphor is used because it maps to how young children already think about space and place. It removes the need for any navigational literacy.

---

## 3. The Two Use Contexts

The child uses this product in two distinct settings. The experience must feel identical in both — same character, same world, same activities — but the entry point differs.

### At school (teacher-directed)
- Teacher selects an activity from the Schedule screen on the teacher dashboard and assigns it to a child or small group
- The child's home view opens directly to that activity or place
- The teacher is nearby; the interface runs the activity
- The child does not need to navigate to find the assigned activity

### At home (parent-assisted or independent)
- Parent opens the app and selects the child's profile
- Child may be guided to a recommended activity or explore freely
- A parent may sit alongside or leave the child to engage independently
- The interface provides enough guidance for the child to navigate without adult interpretation

In both contexts: the child never sees the adult UI. There is no way to navigate from the child experience into the teacher dashboard or parent app.

---

## 4. Screens

### 4.1 Home — The World View

**What it is:**
The screen the child sees every time they open the app. A full-bleed illustrated scene — a warm, colourful world that belongs to this child.

**What it contains:**

- **The child's character or avatar** — visible in the scene; tapping it opens the Scrapbook (see Section 4.4)
- **Six tappable places** — each a visually distinct location in the illustrated world, representing a learning domain (see below); each place has an audio label spoken by the character when tapped or hovered
- **Today's activity highlight** — if the teacher has assigned an activity, one of the places glows gently; the character says: *"Your teacher left something special in the Number Garden today!"*; the child can go there or explore freely
- **Continue shortcut** — if the child was mid-activity in a previous session, their character holds a small visual reminder; the character says: *"Want to finish what we started?"*

**The six places:**

| Place name | Domain | Visual metaphor |
|---|---|---|
| The Reading Nook | Language & Literacy | A cosy book-lined room |
| The Number Garden | Numeracy & Early Maths | An outdoor garden with counters and shapes |
| The Feelings Corner | Social-Emotional Learning | A warm, softly lit indoor space |
| The Making Studio | Creative Arts | A bright workshop with art supplies |
| The Discovery Patch | Science & Discovery | An outdoor exploration area |
| The Movement Yard | Motor Skills | An open outdoor play area |

**What it does not have:**
- No back button (the child is always "home")
- No text menus or navigation labels
- No adult UI elements of any kind

**World progression:**
The world changes subtly as the child engages. New elements appear, plants grow, decorations are added. This is a long-term motivational layer — the world feels alive and responsive to the child's presence. Changes are gentle and cumulative, never disruptive or jarring.

---

### 4.2 Inside a Place — The Activity Shelf

**What it is:**
The sub-scene the child enters when they tap a place. Each place has its own visual identity matching its domain.

**What it contains:**

- **3–5 activities** represented as large, friendly objects in the scene — a book on a shelf, a puzzle on a table, a game on the floor; not a list of titles but physical objects in a physical space
- **Character narration** — the character describes what's available: *"Look — there's a new story on the shelf! And that counting game is waiting for you."*
- **Teacher-assigned indicator** — activities assigned by the teacher carry a small visual tag; the character says: *"Your teacher picked this one for you!"*

**Navigation:**
- Tapping an object starts the activity immediately — no confirmation screen, no loading splash, no separate instructions page
- A **home button** is always visible in the corner — a small illustration of the child's world home, not a text label
- Tapping the home button returns the child to the World View

---

### 4.3 Inside an Activity

**What it is:**
Where learning happens. Every activity, regardless of domain, follows the same structural rhythm.

**The activity rhythm:**

**Open:**
- The character introduces the activity in 1–2 sentences of audio
- No text instruction to read
- The first action is immediately available and self-explanatory through visual design

**Middle:**
- The child engages through tapping, dragging, speaking, drawing, listening, or building — depending on activity type
- The interface responds generously: visual effects, sound effects, character reactions
- Correct responses: delightful — animation, sound, the character celebrating
- Incorrect responses: gentle — the character says something like *"Hmm, let's try that one again"* or offers a hint; never a failure state; always another attempt available
- If the child hesitates for more than a few seconds: the character offers a gentle nudge — *"What do you think? Give it a try!"* — without giving the answer

**Close:**
- A brief celebration moment — the character cheers, an item is added to the child's scrapbook or world
- Two choices are offered (illustrated, not text):
  - Do another activity (forward arrow, character looking curious)
  - Return to the place (illustrated scene of the place)
- No score is shown; no star rating; no percentage; no performance summary

**Character presence:**
The character is visible throughout the activity — in a corner of the screen, reacting in real time to what the child does. The character is the product's personality, not a UI element.

**Exit at any time:**
The home button is always visible. A child who exits mid-activity is not penalised. Partial progress is saved and the activity can be resumed.

---

### 4.4 The Scrapbook

**What it is:**
A celebration space, not a progress report. Accessible by tapping the child's own character on the home view.

**What it contains:**
- Completed activities represented as illustrated cards or objects — a visual collection, not a list of titles
- Things the child has made: drawings, voice recordings, stories — displayed as physical artefacts on scrapbook pages
- Stickers and mementos collected through engagement — not points or scores, but collected keepsakes
- A simple visual of which places in the world the child has visited recently

**What it does not contain:**
- No developmental domain language
- No milestone names or framework terminology
- No percentages, progress bars, or completion rates
- No comparison to other children or age-typical benchmarks

**Character narration:**
The character narrates the scrapbook: *"You made this drawing in the Making Studio! And look — you finished three stories this week!"*

**Data connection (invisible to child):**
Items in the scrapbook are the same observations and artefacts that appear in the teacher's observation feed and the parent's portfolio view. The child sees a collection; the teacher and parent see developmental evidence. This mapping happens in the background — the child is never aware of it.

---

### 4.5 The Handoff Moment

**What it is:**
Not a screen the child navigates — the moment a teacher or parent sets the child up in the app.

**How it works:**
- The adult authenticates in the teacher or parent app
- They assign an activity or open a specific place for the child
- The child's home view opens directly to that activity or place
- The character greets the child: *"Look what's waiting for you today!"*

**Critical rule:**
The child never sees the adult's UI. There is no way to navigate back to the teacher dashboard or parent app from within the child session.

---

### 4.6 Child Profile Selection (Parent/Teacher-facing)

**What it is:**
Not a child-facing screen — the screen where a parent or teacher selects which child's profile to open before handing the device to the child.

**How it works:**
- After the adult authenticates, a simple avatar picker shows the children associated with their account
- Each child is represented by their avatar and name
- Tapping a child's avatar launches the child experience for that child
- No password required from the child

---

## 5. Activity Types

### 5.1 Language & Literacy

---

**Phonics Tap**
A word or image appears with its component sounds. The character says the word aloud, then breaks it into individual sounds. The child taps each sound block as the character says it, reinforcing the connection between spoken sound and symbol. No reading required — the child tracks sound, not text.

*Primary skill: phonological awareness*

---

**Story Listen and Choose**
A short illustrated story plays — narrated by the character with pages that turn automatically. At two or three moments, the narrative pauses and offers the child a choice: *"What do you think happens next?"* Two large illustrated options appear. The child picks one. The story continues (the same way regardless of choice, but the character responds warmly to what they picked).

*Primary skill: listening comprehension and prediction*

---

**Word Builder**
A picture of a familiar object appears. Three or four large letter tiles are scattered nearby. The child drags the letters into the correct order to spell the word. The character says each letter as it's placed and reads the completed word aloud.

*Primary skill: early spelling and letter-sound correspondence*

---

**Read Aloud Together**
A picture book page is displayed with highlighted text. The character reads aloud, highlighting each word as it is spoken. At certain points the character pauses and invites the child to say the next word — either by tapping a microphone to speak or by selecting from two displayed word options.

*Primary skill: sight word recognition and shared reading*

---

**Rhyme Match**
A word or image is shown. Four other images appear. The child taps the ones that rhyme. The character sounds out each option before the child decides.

*Primary skill: phonological awareness and rhyme*

---

**Story Creator**
A blank scene with illustrated characters, objects, and backgrounds the child drags into position to build a picture. When ready, the character asks: *"Tell me about your picture!"* The child speaks into the microphone. The recording is saved as a voice-illustrated story in the scrapbook and shared to the teacher's observation feed.

*Primary skill: oral language, narrative, and creative expression*
*Assessment signal: oral language sample captured for teacher observation*

---

### 5.2 Numeracy & Early Maths

---

**Counting Garden**
Objects appear in a scene. The character asks: *"How many apples can you count?"* The child taps each object as they count — each tap produces a sound and highlights the object. When all are tapped, the child selects the correct number from a small set of options.

*Primary skill: one-to-one correspondence and numeral recognition*

---

**Sort It**
A collection of mixed objects appears alongside two or three containers, each labelled with a visual sorting rule. The child drags each object into the correct container.

*Primary skill: classification and categorisation*

---

**Number Line Jump**
A frog sits on a number line from 1 to 10. The character calls a number and the child taps it. The frog jumps there with animation. Subsequent prompts add movement: *"Now jump two more!"*

*Primary skill: number sense, sequencing, and early addition intuition*

---

**More or Less**
Two groups of objects appear side by side. The character asks: *"Which group has more?"* The child taps their answer. For children further along: *"How many more?"* with a counting scaffold available.

*Primary skill: comparison and early quantitative reasoning*

---

**Shape Hunt**
A busy illustrated scene — a playground, a kitchen, a park. The character asks the child to find all examples of a target shape hidden in the scene.

*Primary skill: shape recognition in real-world context*

---

**Pattern Maker**
A sequence of objects or colours with a gap at the end. The child selects the missing piece from a small set of options. The character reads the pattern aloud rhythmically to scaffold thinking. Complexity increases progressively (AB → ABC → AABB).

*Primary skill: pattern recognition and extension*

---

**Simple Adding**
Two groups of objects are shown. The character narrates the combining action. Objects animate together and the child counts the total, then taps the correct number.

*Primary skill: early addition through concrete representation*

---

### 5.3 Social-Emotional Learning

---

**How Does This Feel?**
A short illustrated scenario plays. The child is asked how the character in the story feels. Four large emotion faces appear. The child taps their answer. The character validates and asks: *"What could help them feel better?"*

*Primary skill: emotion recognition and empathy*

---

**What Would You Do?**
A social scenario is presented with two or three illustrated choices. The child picks one. The character explores what might happen next for each choice — not judging, but playing out consequences.

*Primary skill: social problem-solving*

---

**Feelings Check-In**
A simple daily ritual. The character asks: *"How are you feeling right now?"* Five large illustrated faces from very happy to very sad are shown. The child taps one. The character responds warmly. The selection is logged quietly and surfaced to the parent and teacher as a wellbeing signal.

*Primary skill: self-awareness and emotional vocabulary*
*Assessment signal: daily wellbeing data point surfaced to teacher and parent*

---

**Calm Down Corner**
Not a game — a toolkit. The character guides the child through a simple regulation technique: three big breaths with animation. A gentle bubble-pop activity follows. Ends with: *"How do you feel now?"* Can be used proactively or in response to a difficult moment.

*Primary skill: emotional self-regulation*

---

**Kindness Collector**
The character describes small acts of kindness and the child identifies whether an illustrated action was kind. As the collection builds, a kindness garden in the child's world grows new flowers.

*Primary skill: values vocabulary and moral reasoning*

---

**The Same and Different**
Two illustrated characters are shown alongside each other. The child taps things that are the same, then things that are different. The character narrates similarities and differences warmly.

*Primary skill: identity awareness, inclusion, and perspective-taking*

---

### 5.4 Creative Arts

---

**Free Draw**
A blank canvas with a simple set of tools: brushes of different sizes, a colour palette, an eraser, a stamp set. No instructions. The character says: *"Make anything you like."* Output is saved to the scrapbook and shared to the teacher's observation feed.

*Primary skill: creative expression and fine motor control*
*Assessment signal: drawing artefact captured for teacher portfolio*

---

**Colour Mix Lab**
Two paint colours are shown. The child taps to mix them — the colours blend with animation and the new colour is named by the character. The child can experiment freely with different combinations.

*Primary skill: colour theory through discovery*

---

**Music Maker**
Illustrated instruments arranged on screen. The child taps to play notes or beats and can record a sequence to play back. More advanced: the character plays a short pattern and the child taps it back.

*Primary skill: rhythm, sequencing, and musical memory*

---

**Finish the Picture**
A partially drawn illustration is shown. The child completes it using simple drawing or stamping tools. The character reacts to what they create.

*Primary skill: spatial reasoning and creative confidence*

---

**Puppet Show**
An illustrated stage with character puppets the child drags into position. Each puppet makes a sound or says a phrase when tapped. Scenes can be recorded as a short animation and saved to the scrapbook.

*Primary skill: imaginative play and narrative*
*Assessment signal: recorded scene captured for teacher observation*

---

**Clay Play**
The child uses pinch and drag gestures to shape a virtual lump of clay. Stamps and textures can be pressed into the surface. Simulates the tactile motor challenge with haptic feedback where available.

*Primary skill: fine motor skills and imaginative play*

---

### 5.5 Science & Discovery

---

**What Happens If...?**
A cause-and-effect experiment scene. The child performs an action — dragging water onto soil, adding heat to ice — and an animation shows the result. A question follows with two illustrated answer options.

*Primary skill: observation, prediction, and basic scientific reasoning*

---

**Sort and Classify (Nature Version)**
A collection of illustrated natural objects. The child sorts them by characteristics they notice — size, texture, colour, shape. Multiple sorting approaches are valid and the character validates different logic.

*Primary skill: observation skills and scientific classification*

---

**Weather Watcher**
A daily ritual. The child taps what the weather looks like today from a set of illustrated options. A simple weather calendar builds in their world over time.

*Primary skill: observation habits and scientific record-keeping*
*Assessment signal: contributes to longitudinal observation record*

---

**Sink or Float?**
A bowl of illustrated water and a collection of objects. The child predicts by dragging an object to a "sink" or "float" zone, then the answer is revealed with animation.

*Primary skill: hypothesis-testing and the scientific method as play*

---

**Life Cycle Puzzle**
An illustrated life cycle shown as jumbled stages. The child drags them into the correct sequence. The character narrates the completed cycle with animation.

*Primary skill: sequencing and early biology concepts*

---

**Mixing Colours (Science Version)**
Similar to the art version but framed as a science experiment with transparent coloured liquids. The character introduces scientific vocabulary: *"Scientists call this a mixture!"*

*Primary skill: scientific vocabulary and observation*

---

### 5.6 Motor Skills

---

**Tracing Paths**
A dotted line in a fun shape — a rainbow, a rocket, a leaf — that the child traces with their finger. The line fills with colour as they trace. Difficulty increases from large loose curves to tighter, more precise paths.

*Primary skill: pre-writing hand control and directional movement*

---

**Cut and Stick (Digital)**
Illustrated objects with dotted outlines. The child traces the outline with their finger — the cut-out pops free and can be placed anywhere on the canvas. Simulates scissor use in a zero-risk environment.

*Primary skill: hand-eye coordination and fine motor precision*

---

**Catching Game**
Objects fall from the top of the screen. The child taps them before they hit the ground. Speed and quantity increase with ability.

*Primary skill: hand-eye coordination and reaction timing*

---

**Lacing and Threading**
An illustrated shoe or bead necklace. The child drags a thread through a sequence of holes in the correct order. Mirrors the real-world fine motor challenge.

*Primary skill: bilateral coordination and sequencing*

---

**Balance Beam**
A character walks a balance beam. The child keeps them upright by tilting the device (accelerometer) or tapping left and right controls.

*Primary skill: gross motor awareness and spatial sense*

---

**Building Blocks**
Open-ended stacking activity. Illustrated 3D blocks the child drags and arranges. Simple physics applied — an unstable stack topples.

*Primary skill: spatial reasoning, fine motor control, and early engineering intuition*

---

## 6. Activity Design Principles

All activities across all domains follow these five principles:

**1. Audio-first**
Every activity can be completed without reading. Instructions are spoken. Labels are voiced. Text supports audio — it never replaces it.

**2. Immediate action**
There is no instruction screen before the activity begins. The activity teaches through the first interaction. Confusion is resolved by doing, not by reading a tutorial.

**3. Gentle failure**
Incorrect responses produce a kind nudge, never a punishment. The child always has another attempt. The character might say: *"Hmm, not quite — want to try again?"*

**4. Visible outcome**
Every activity ends with something — a completed drawing, a recorded story, a sorted collection, a finished puzzle. The child can see and feel that they made or achieved something. This output feeds the scrapbook and gives the experience meaning.

**5. Variable duration**
Every activity can be exited at any time without penalty. Partial progress is saved and the activity can be resumed. Short sessions are as valid as long ones.

---

## 7. The Assessment Layer (Invisible to Child)

Every interaction the child has generates data that feeds the teacher and parent views. This is entirely invisible to the child — from their perspective, they are playing in a world they love.

**What is captured:**

| Child action | What it generates |
|---|---|
| Completing an activity | Observation event tagged to a domain and linked to milestones |
| Free Draw output | Artefact saved to teacher portfolio and parent scrapbook view |
| Story Creator recording | Voice sample saved as observation evidence |
| Feelings Check-In | Daily wellbeing data point surfaced to teacher and parent |
| Puppet Show recording | Recorded scene saved as creative arts observation |
| Activity engagement pattern | Time-on-task and domain frequency data for teacher analytics |
| Activity exit point | Partial completion data used to inform adaptive sequencing |

**The child is never shown:**
- Domain names or framework terminology
- Milestone labels or completion percentages
- Comparison to peers or age-typical benchmarks
- Any indication that their play is being observed or assessed

---

## 8. Adaptive Sequencing

The child experience adapts over time based on engagement and performance data — but this must be invisible and unhurried.

**How sequencing works:**
- Activities within each place are presented in a loose progression from simpler to more complex
- Completion and accuracy data from each session informs which activities are surfaced next
- If a child consistently engages successfully with an activity type, more challenging variants are introduced
- If a child consistently disengages or struggles, simpler or different variants are offered
- The character frames new activities as natural discovery: *"There's something new in the garden today!"* — never as advancement or level-up

**What it does not do:**
- Lock a child out of activities they want to revisit
- Announce difficulty levels or levels to the child
- Surface adaptation logic in any way the child can perceive

---

## 9. What the Child Experience Does Not Have

| Element | Reason excluded |
|---|---|
| Login screen for child | Parent or teacher authenticates; child selects avatar |
| Text navigation menus | Not readable by the target age group |
| Scores or ratings | Belong in teacher and parent views only |
| Social or multiplayer features | Experience is between child and their world; no comparison |
| Ads, purchase prompts, external links | Closed environment; child safety requirement |
| Notification badges or unread counts | Adult UI conventions inappropriate for this context |
| Settings or account screens | Managed entirely in parent and teacher layers |
| Difficulty labels or level indicators | Adaptive progression is invisible and unjudged |

---

*This specification covers the child-facing experience. Parent-facing screens are covered in a separate specification document. Teacher-facing screens are covered in `teacher-dashboard-spec.md` and `secondary-screens-spec.md`.*
