# Children's App Design: Research Reference
*Compiled for Nurture design team | Covers interaction patterns, feedback, characters, visual design*

---

## How to use this document

This document translates academic research and practitioner guidelines into practical design decisions. Each section covers one design domain, cites the research behind it, and ends with concrete implications for Nurture specifically. It is a companion to `child-experience-spec.md` — that document says *what* to build; this one explains *why* and shows what it looks like in practice.

Sources are drawn from peer-reviewed HCI research, the Sesame Workshop's published design guidelines (the industry's most authoritative practitioner resource for this age group), Nielsen Norman Group's child UX studies, and analysis of the apps covered in the reference library.

---

## 1. Touch interaction — what children can and cannot do

### The research

A large study of 89 children aged 3–6 collected 2,912 touch interaction records across phone and tablet devices. The findings establish a clear capability ladder by age:

- **Ages 2–3:** Cannot reliably tap an intended target. Only 27% can tap accurately. Cannot follow any prompting technique. Require caregiver assistance for essentially all app interactions.
- **Ages 4–6:** Can perform simple taps and slides (57% success rate). Can follow audio and animation instructions (63% success rate). Cannot reliably drag and drop — they frequently lose contact during the drag, losing progress.
- **Ages 7–8:** Begin to manage drag-and-drop (30% success rate) and can follow audio/video instructions (34%).

A separate Nielsen Norman Group study (user testing with ages 3–12) confirmed the drag finding with a practical recommendation: **for children under 5, replace drag-and-drop with tap-and-tap** — the child taps the object to select it, then taps the destination to place it. This eliminates the lost-contact failure mode entirely.

The Sesame Workshop's published guidelines specify: "Hot spots must be large and adequately isolated from one another." Their recommendation for minimum tap target size aligns with the 80×80px figure in the Nurture spec. UXmatters research on children's apps corroborates: younger children (2–3) need even larger targets with generous "hot spot" margins that extend beyond the visible element boundary.

### What this means in practice

**Tap is the only reliable gesture for ages 3–5.** Nurture's decision to use tap-to-select for all MVP activities is correct and research-validated. Drag-and-drop can be introduced cautiously in Wave 2 activities for K2 children (age 5–6), using the tap-and-tap pattern rather than drag.

**Target size minimums are non-negotiable.** The 80×80px minimum from the spec is backed by research. For 3-year-olds at the low end of the target range, 100×100px is better. On tablets, scale to 100–110px.

**Visual affordance must signal tappability.** The Sesame Workshop guidelines specify: "Objects should only look touchable when they are touchable" and recommend "a strong visual highlight (typically yellow) behind an active icon" to signal interactivity. This is exactly what Nurture's yellow border on the active activity tile does — it is the research-correct affordance signal.

**Accidental taps are inevitable and should be absorbed.** Research shows children tap frequently and indiscriminately, especially when excited. The 800ms hold requirement for the home button (to prevent accidental exits) is the right design response. For answer options, a short delay (200ms) between tap and response prevents accidental double-taps from being scored twice.

### What good apps do

**Pok Pok Playroom:** Everything is tappable in an immediately legible way — objects have visual weight and respond to the lightest touch with immediate audio and animation feedback. Nothing requires sustained contact or precision placement.

**Thinkrolls (Avokiddo):** Specifically cited in UX research for its "larger tolerances" — hit areas extend well beyond the visible object boundary. A child who taps near the character, not exactly on it, still registers the tap.

**Khan Academy Kids:** Uses tap-and-tap for all sorting and placement activities, never drag-and-drop, despite the activities (sorting into categories, placing items) being exactly the type that an adult designer might implement as drag-and-drop.

---

## 2. Feedback — what works and what backfires

### The research

This is the most extensively studied area in preschool educational app design, and the findings are surprising to many designers.

A Harvard Graduate School of Education study examined 76 digital games produced by three major US children's networks, categorising 15 distinct feedback types. The key finding: **most educational apps provide feedback that is useful for testing but not for learning.** Specifically:
- Most games use only "verification feedback" — a correct/wrong signal with no further information
- Very few use "elaborative feedback" — telling the child *why* their answer was right or wrong
- Excessive, irrelevant enhancements after every correct answer (multiple animations, sounds, rewards) were found to potentially undermine learning by conditioning children to chase stimulation rather than engage with content

A separate study reviewing 242 apps found that 55% included "encouragement" but none of it addressed the task or the child's effort — the type of encouragement shown to be most valuable from a learning perspective.

Research on feedback and wrong answers found a counterintuitive result: **feedback that includes explicit verification cues ("WRONG!") led to decreased persistence and reduced strategy variability** compared to feedback that simply provided the correct answer. Children with low prior knowledge were most harmed by verification-heavy feedback. The mechanism: "stark indication of error may heighten attention to the self or threaten reputation," consuming cognitive resources that should go toward the learning task.

The Sesame Workshop guidelines state: "Payoffs are very important to children. They keep them motivated and invested. If possible, payoffs should reflect the curricular concept and user choice (e.g., 'Nice job choosing the letter A!')." This is the distinction between *generic* positive feedback ("Great job!") and *specific* positive feedback ("Yes — banana starts with B!") — the latter is more valuable because it reinforces the learning content, not just the act of answering.

### The "considerate" vs "inconsiderate" interactivity distinction

A Frontiers in Psychology study introduced a critical concept: **"considerate" vs "inconsiderate" interactivity.** Considerate interactivity directs a child's attention toward the learning content. Inconsiderate interactivity (random hotspots that produce entertaining effects when tapped, unrelated reward animations) directs attention away from content.

The study tested whether tapping or dragging named objects during a word-learning task aided retention. Children who interacted with the objects (tap or drag) learned significantly more than those who just watched — but only when the interaction was *directly relevant to the object being named*. Irrelevant entertainment interactions (tapping to produce an explosion, tapping to make a character dance) did not produce learning benefits and in some cases detracted from them.

### What this means in practice

**Never show a red X or play a negative sound.** This is not just intuitive good design — it is research-validated. Negative verification cues harm persistence and learning, especially for children who are already struggling.

**Wrong-answer feedback must redirect, not judge.** The Nurture spec's approach — gentle shake animation, then character re-prompt with the specific phoneme re-emphasized — is the research-correct pattern. "Let me help — F-ish. Can you hear the F?" is elaborative feedback that directs attention back to the learning content.

**Correct-answer feedback must be specific, not just celebratory.** "Yes!" alone is less valuable than "Yes! Banana starts with B!" The character's specific correct-answer line must always name the concept being practised, not just indicate correctness.

**Limit celebration to relevant moments.** Research found that "excessive, irrelevant enhancements after every action" in apps like Monkey Preschool Fix-It — where the character jumps and squeals after every single tap — can undermine learning by conditioning children to tap for the animation rather than to answer. Celebrations should be reserved for correct answers and session completion, not every interaction.

**The hint at attempt 3 is correct.** After two wrong attempts, showing the correct answer (gently, without fanfare) and letting the child tap it — then celebrating as if they found it — is both the research-supported pattern and emotionally correct. The child always ends on success.

### What good apps do

**Bedtime Math (cited in Harvard study):** Scored highest for feedback quality — the correct answer slides across the screen with a sound, but no other enhancements, no irrelevant rewards. Clean, relevant, learning-focused.

**Khan Academy Kids:** Character (Kodi) always names the specific concept in positive feedback. After a correct phonics answer, Kodi says "That's right! The letter B makes the 'buh' sound!" — not just "Awesome!"

**Endless Alphabet:** Every correct answer triggers the monster acting out the word's meaning. The celebration is the learning content — you can't separate the reward from the concept. This is the gold standard for "payoffs that reflect the curricular concept."

**What to avoid — Monkey Preschool Fix-It (cited as negative example):** A sparkling rainbow trail appears after every correct answer, followed by narrated affirmation, followed by earning a virtual toy. The child learns to chase the rainbow, not to answer correctly. The learning signal is buried under noise.

---

## 3. Characters — the parasocial relationship effect

### The research

This is the most robust and practically important finding in children's educational media research. It has a name: the **parasocial relationship effect**.

A parasocial relationship is the one-sided, emotionally genuine attachment a child forms with a media character — treating Dora, Elmo, or a favourite app mascot as a real friend. Research from Georgetown University's Children's Media Lab (Sandra Calvert's group) has produced extensive evidence that:

- Children aged 4–6 who have a stronger parasocial relationship with a character **learn more content from that character** than children with weaker attachment
- The effect is measurable in mathematics, language, and STEM domains
- Children who engaged in "math talk" (discussing math content with the character, even one-sidedly) during a learning app performed better on subsequent math tasks — and performed even better when the character was perceived as "socially contingent" (appearing to wait for the child's response before continuing)
- Toddlers were more likely to learn an early math skill from Elmo (a familiar character) than from an unfamiliar character — familiarity is a precondition for the learning effect

**The contingency mechanism is critical.** Dora the Explorer's famous long pause after "Can you help me find the bridge?" is not bad design — it is research-informed. The pause invites the child to respond. The character then continues as if it heard the child. This creates the feeling of a real interaction and strengthens the parasocial bond. Apps that use this pattern ("What do you think we should do? ... [pause] ... Let's try it!") have been shown to increase engagement and learning.

**Characters of the same gender as the child produced stronger learning outcomes** in controlled studies — boys learned more from male characters, girls from female characters, when the content was directly relevant to the task. This suggests Nurture's character system (when it expands beyond one character) should include gender diversity.

**Physical toys of the character amplify the effect.** Children who were given a plush toy of a character and encouraged to nurture it (feed it, hold it) subsequently showed better learning outcomes from that character in video/app contexts. This has implications for Nurture's commercial future — a Pip plush toy is not just merchandise, it is an evidence-based learning amplifier.

### What this means in practice

**The character is the single most important design asset in the child experience.** This is not subjective — it is the finding most consistently replicated across children's media research. More investment in the character equals more learning.

**Pip needs to feel contingent.** After asking a question, the character should appear to wait — idle animation, slight forward lean, maybe a small "hmm?" if the child takes too long. When the child answers, the character should react immediately and specifically. This creates the social contingency that makes the relationship feel real.

**Pip should be named consistently and used by teachers.** The Sesame Workshop research shows that familiarity is a precondition for the learning effect. Teachers should introduce Pip by name, talk about Pip in class, and reference what Pip is teaching. This cross-context presence strengthens the parasocial bond that makes the character an effective teacher.

**Pip should not be changed or replaced.** The parasocial relationship takes time to form. Changing the character's design, voice, or personality — even with good intentions — breaks the continuity that makes the relationship work. Lock Pip's design before launch and treat it as a long-term commitment.

**Consider gender.** For a single primary character, a gender-neutral or gently ambiguous design may be preferable to a clearly gendered one. If a second character is introduced (in Wave 2), making it a different gender allows the same-gender learning effect to reach more children.

### What good apps do

**Dora the Explorer:** The foundational example. Direct address to camera, pseudo-interactive pauses, the character appearing to hear and respond. Despite being television rather than an app, Dora's interaction model is the template every children's media producer studies.

**Khan Academy Kids:** Kodi the bear is consistently present, consistently warm, and specifically named in parent and teacher communications. The character is introduced in onboarding and referenced in the parent report ("Kodi helped your child practice letter sounds today").

**Endless Alphabet:** The monsters are not named characters with backstories — but they react so expressively and specifically to each interaction that children form parasocial relationships with them anyway. Character does not require a name; it requires consistency and expressiveness.

**Daniel Tiger's Neighborhood (PBS Kids):** The app specifically cited in research for "expressing greater understanding of the player's actions through tailored feedback, leading to development of a stronger parasocial relationship" — contrasted against apps that provide only "generic, affirmative feedback." The distinction: "Great job!" vs "Daniel says: You did it! The letter B is for Ball!"

---

## 4. Visual design — colour, hierarchy, and clutter

### The research

Research on visual design for preschool-age children consistently identifies three critical concerns: colour preference and comprehension, visual hierarchy, and the effects of clutter on attention.

**Colour preferences by age:**
- Ages 2–3: Prefer bold, primary colours (red, yellow, blue) and high contrast. Warm colours are more attention-capturing. This age group responds to colour as a navigational cue — they will explore more in environments with high colour contrast.
- Ages 4–6: Can distinguish a wider range of colours and begin to use colour as a categorical signal (red = stop/wrong, green = go/correct). UXmatters research notes that "making clickable or tappable elements bigger, adding subtle contour lines, or using a broader colour palette than the one used in the background graphics" is the correct approach to distinguishing interactive from non-interactive elements.

**The clutter problem is severe.** A Stanford study found that kindergarteners in classrooms with many colourful decorations had greater difficulty focusing on instructed tasks. The same principle applies to apps: preschoolers "perform worse on tasks when distractions are continuously presented." The Sesame Workshop guidelines state this directly: "Choose style carefully and monitor volume of background music" and recommend minimal non-interactive visual elements in the foreground.

Research examining the difference between apps with and without clear visual hierarchy found that children could not reliably identify interactive elements when background and foreground elements had similar visual weight. The solution: interactive elements must be visually dominant — larger, more saturated, or outlined — relative to the scene background.

**Red as wrong-answer colour is specifically contraindicated.** While adults associate red with error in a neutral way, children at this age associate red with alarm, danger, and negative emotion. Research on feedback shows that visual cues indicating error (red X, alarming sound) increase self-focused attention (thinking about having failed) rather than task-focused attention (thinking about the correct answer). Red is the correct signal for "danger" (safety content) but the wrong signal for "try again."

**Font recommendations from Sesame Workshop:** "Fonts should not include serifs." Sans-serif fonts are more legible for pre-readers who are learning letter shapes. Serif detail is decorative noise at this developmental stage.

### What this means in practice

**Warm, high-contrast backgrounds with cooler, less saturated scene elements.** The activity scene (the stimulus image the child is reasoning about) should be the most visually dominant element on screen. Answer options should have clear, high-contrast borders against their background. The overall screen background should be warm but relatively plain — not competing with the interactive content.

**Yellow as the active-state signal is research-correct.** The Sesame Workshop specifically recommends yellow as the highlight colour for interactive elements. Yellow is high-luminance, warm, and cross-culturally legible as "pay attention here." Nurture's yellow border on the active activity tile and yellow buttons are both evidence-based design choices.

**Coral/warm orange for wrong answers, never red.** The Nurture spec's choice of #E8604A (warm coral) for the wrong-answer border is the correct approach. It communicates "this is not the right one" without communicating "danger" or "failure."

**The scene background should not compete with the answer options.** In activities where a scene image (the banana, the fish, the tree) is displayed above answer options, the scene image should have a simple, clean card background (white or very light) with clear visual separation from the answer options below it. If the scene image is visually complex, children at this age will have difficulty separating it from the interactive elements.

**Avoid decorative animations in the background.** Floating particles, waving grass, animated clouds in the background of activity screens — all of these are visual distractors that consume the attentional resources that should be directed at the answer options. Animations should be triggered by interactions, not running continuously in the background.

### What good apps do

**Pok Pok Playroom:** Three primary colours (red, yellow, blue) applied with ruthless consistency. All interactive objects are visually distinct from environmental elements through size, saturation difference, or subtle outline. Background animations are minimal and on a slow cycle — they provide life without creating noise.

**Thinkrolls:** Specifically praised in UX research for large, high-contrast interactive elements against clean backgrounds. The character and interactive objects have a graphic outline that makes them visually "pop" against the scene environment.

**What to avoid:** Apps where the background illustration is as visually complex as the interactive elements. Research shows children in these environments cannot reliably identify what to tap, leading to random tapping behaviour — which produces false mastery data when the random tap happens to be correct.

---

## 5. Audio — the primary instructional channel

### The research

Research on preschool touchscreen interactions established that animation prompts (showing the correct gesture via animation) were the most effective instructional technique for this age group — more effective than audio instructions alone. However, the combination of audio and animation together is more effective than either alone for the 4–6 age range.

The Sesame Workshop guidelines make audio the primary design concern: "For audio payoffs, include sound effects (e.g., trumpet blare, ding-ding-ding). When possible, also include a visual payoff via animation or light movement." The sequencing is audio-first, animation-second.

A study examining app educational potential found that "apps with a learning goal had higher educational potential, more opportunities for feedback, a higher proportion of ostensive feedback, and age-appropriate language." Ostensive feedback is feedback that points at the thing being learned ("That's B! B is the first letter of banana!") — naming the content explicitly rather than just indicating correctness.

Research on language accessibility in children's apps found that apps supporting learning goals used "age-appropriate language to support learning and language development" — specifically shorter sentences, simpler vocabulary, and more direct address ("Your turn!" rather than "The player should now...").

### What this means in practice

**Every screen must have a primary audio line.** Silence feels like a broken app to a preschool user. Every screen transition should trigger a character audio line. Every answer tap should produce immediate audio (the answer content spoken, then the scoring response). Every end screen should be audio-rich.

**Instructions must combine audio and animation.** A text-only instruction is invisible to non-readers. An audio-only instruction can be missed or forgotten. An instruction shown as a brief animation (the character miming what to do) while audio plays simultaneously is the most effective format for this age group.

**Character voices must use age-appropriate language.** Short sentences. Direct address. Present tense. Active voice. Name the concept explicitly after every correct answer. The written scripts for all character audio lines should be reviewed against these criteria before recording.

**Sound design matters as much as music.** The Pok Pok approach — recording every interaction sound from real-world objects — is research-aligned. Sounds that have physical reality (a wooden block tapping, a gentle bell, water sounds for counting drops) are more cognitively grounding than synthesised digital sounds. If budget constrains custom sound design, at minimum use sound libraries that prioritise natural acoustic textures over digital ones.

**Muted devices are a significant failure mode.** Research shows that when audio is unavailable, children's interaction with apps degrades significantly — they tap more randomly and less purposefully. The app should detect muted state and display a parent-facing prompt before the first session.

### What good apps do

**Endless Alphabet:** Every single element produces a sound when tapped. Letters make their sounds. Objects react audibly. The monster's "explanation" animation is always voiced. A child who taps randomly learns something from every tap because every tap produces relevant audio.

**Khan Academy Kids:** Kodi voices all instructions, all feedback, all transitions. The character's voice is the primary instructional medium. Visual elements support and reinforce what the audio communicates; they never carry information that is not also in the audio.

---

## 6. Session length and pacing

### The research

Khan Academy Kids' research found that 3–5 minute sessions produced a 50% higher completion rate than longer sessions. This aligns with developmental research on preschool attention spans: sustained task attention at ages 3–4 averages 3–5 minutes, extending to 5–8 minutes at ages 5–6, and 8–15 minutes at ages 7–10.

Research on activity design for preschoolers recommends: **short, rewarding interactions with clear start and end points.** The session should feel like one game, not a series of tests.

The Sesame Workshop guidelines specifically note: "In app-specific experiences, adults tend not to use tutorials located in the 'Help' sections. It is better to teach through the experience itself." This implies the first question in every session should be easier than subsequent ones — functioning as an embedded tutorial — rather than relying on a separate instructions screen.

The research on "considerate interactivity" also applies to pacing: interactions should allow enough time for a child to process the stimulus before presenting the answer options. Flashing immediately to answer options before the child has processed what they are being asked creates confusion and random tapping.

### What this means in practice

**3 questions per session (2–4 minutes) is evidence-based.** The Nurture spec's session length is correctly calibrated.

**Question 1 of each session should be the easiest variant.** This serves as an embedded tutorial and builds confidence before the difficulty increases. The variant pool for each activity should be structured with easy variants (1, 2) reserved for Q1 in any session.

**Allow processing time before presenting answer options.** After the stimulus image is shown and the audio instruction plays, a brief pause (500–800ms) before the answer options become interactive gives the child time to form an answer before being distracted by the options. This also prevents the pattern of tapping an option the moment it appears without engaging with the stimulus.

**The "what's next" transition matters.** Research shows children need a clear ritual signalling session end and a bridge to what follows. The correct-answer screen after Q3 always shows a "Finish!" button rather than auto-advancing — the child must consciously end the session. The celebration screen then provides full closure before returning to the queue.

---

## 7. What the research says about activity types — a taxonomy

This section maps activity types to the research evidence for their effectiveness at each age and skill area. This is the practical design pattern library.

### Matching activities (stimulus → tap correct from options)

**Best for:** Letter recognition, numeral recognition, shape recognition, sight word identification
**Age appropriateness:** 3+
**Research basis:** Tap-to-select is the most reliable gesture at ages 4–6 (57% success rate). Matching tasks (see X, find X from options) require only recognition memory, not recall — this is developmentally appropriate for ages 3–5.
**How top apps present this:**
- Duolingo ABC: Shows a large, clear image; presents 3 letter tiles below in a horizontal row. Audio names the image ("BANANA") then asks the question ("What sound does it start with?"). Child taps a letter tile.
- Khan Academy Kids: Shows a letter; presents 4 picture tiles (items beginning with that letter + distractors). Audio names the letter and its sound. Child taps the matching picture.
- Endless Alphabet: Shows a word; presents jumbled letter tiles. Child taps/drags letters to their correct positions. (Note: this is the more complex variant — appropriate for K2, not N2.)

**Nurture's current activities using this pattern:** LL-B-02, LL-B-03, LL-D-01, LL-D-02, LL-D-03, LL-S-01, LL-S-02, LL-S-03, NUM-B-03, NUM-D-02, NUM-S-02

### Counting activities (see quantity → tap number)

**Best for:** Number sense, one-to-one correspondence, numeral recognition
**Age appropriateness:** 3+ (small quantities), 4+ (larger quantities)
**Research basis:** Counting activities where objects animate in one at a time (rather than being shown as a static group) reinforce one-to-one correspondence — each count maps to one physical movement (the object landing in its slot).
**How top apps present this:**
- Moose Math: Objects animate one at a time into a container as the child counts aloud. The final count triggers a number to light up on a number line.
- Khan Academy Kids: Shows a group of objects; a pointing finger animation counts through them; child then taps the correct numeral.
- Sago Mini School: Uses themed counting contexts (counting apples in a basket, counting animals on a farm) with high-contrast scene images on clean backgrounds.

**Nurture's current activities using this pattern:** NUM-B-01, NUM-B-02, NUM-D-01

**Key design detail from research:** The Moose Math pattern — objects animate into position one at a time, synchronized with audio counting — is superior to presenting all objects simultaneously. It forces one-to-one correspondence rather than allowing visual estimation.

### Comparison activities (which has more/fewer)

**Best for:** Quantity comparison, early mathematical thinking
**Age appropriateness:** 4+ (large differences), 5+ (adjacent quantities)
**Research basis:** Comparison tasks begin to develop mathematical reasoning beyond rote counting. Research on numeracy development shows children can reliably compare quantities with large visual differences (2 vs 8) before they can compare adjacent quantities (5 vs 6). Activities should scaffold from large differences to adjacent quantities.
**How top apps present this:**
- Moose Math: Two plates/containers side by side; child taps the larger/smaller group. Visual emphasis on the objects' spatial arrangement (linear arrangement vs scattered) varies difficulty.
- Khan Academy Kids: Uses a balance scale metaphor — child taps the side that "goes down" (is heavier, has more). The scale animation reinforces the concept physically.

**Nurture's current activity using this pattern:** NUM-D-03

### Sorting activities (tap and categorise)

**Best for:** Attribute recognition, early logical thinking, classification skills
**Age appropriateness:** 3+ (one attribute), 5+ (two attributes)
**Research basis:** Sorting is one of the earliest mathematical skills — categorisation by one attribute is achievable at 3–4, by two attributes at 5+. Apps that present sorting as a single-attribute task with clear visual feedback (the sorted objects "click" into place visually) produce better outcomes than those with complex multi-attribute sorting.
**How top apps present this:**
- Sago Mini School: Objects appear one at a time; child taps the correct bin. Bins have clear visual labels (colour-coded or illustrated). When the child taps an object, it briefly highlights; when they tap a bin, the object animates into it.
- Khan Academy Kids: Uses a "machine" metaphor — objects go into one side, come out sorted into the correct category on the other side.

**Nurture's current activity using this pattern:** NUM-D-04

### Sequencing activities (tap pictures in order)

**Best for:** Narrative comprehension, logical sequencing, story understanding
**Age appropriateness:** 4+ (3 frames), 5+ (4 frames)
**Research basis:** Story sequencing is a strong predictor of reading comprehension. For preschoolers, 3-frame sequences are appropriate — they represent beginning, middle, end. Four frames increase cognitive load significantly and are appropriate for children closer to K2.
**How top apps present this:**
- Khan Academy Kids: Shows scrambled pictures in a row; child taps each picture and it slides to a numbered slot. Audio narrates what is happening in the story as each picture is placed.
- PBS Kids apps: Uses character-familiar stories so children have prior context for the sequence. Familiarity reduces cognitive load and allows focus on the sequencing skill rather than story comprehension.

**Nurture's current activity using this pattern:** LL-D-04

**Key design detail:** After all pictures are placed in sequence, the app should briefly "play" the story — showing each picture in sequence with the character narrating it. This confirms the correct order and provides elaborative feedback.

### Number gap/fill-in activities (complete a sequence)

**Best for:** Number sequence knowledge, pattern recognition
**Age appropriateness:** 5+ (sequences to 10), 5–6 (sequences to 20)
**Research basis:** Fill-in-the-gap tasks require recall (what comes next) rather than recognition (which of these is correct) — they are cognitively more demanding than matching tasks. Research recommends scaffolding with the context clearly visible (showing the surrounding numbers on either side of the gap) to reduce working memory load.
**How top apps present this:**
- Moose Math: A number line with visible numbers on either side of the gap; 3 options shown below. The gap "pulses" to draw attention. When the correct number is tapped, it slides into the gap and the surrounding numbers briefly animate.

**Nurture's current activity using this pattern:** NUM-S-01

### Comprehension activities (listen to story → answer question)

**Best for:** Reading comprehension, listening comprehension, inferencing
**Age appropriateness:** 5+
**Research basis:** Comprehension activities require the child to hold the story in working memory while answering a question — more cognitively demanding than recognition tasks. For 5–6 year olds, literal questions (who, what, where) are appropriate. Inferential questions ("why did she feel sad?") are appropriate for K2 but challenging for K1.
**How top apps present this:**
- Khan Academy Kids: Shows an illustrated 3-sentence story with audio narration; question then appears at the bottom with 3 picture answer options. The story remains visible while the child answers.

**Nurture's current activity using this pattern:** LL-S-03

**Key design detail from research:** Keeping the story visible (not hiding it when the question appears) reduces working memory load and produces better performance. The child answers from the text/image, not from recall alone — this is a reading comprehension skill, not a memory test.

---

## 8. The "considerate interactivity" checklist

This framework, from the Frontiers in Psychology research, provides a practical tool for evaluating any activity before it goes into production. Each question should be answerable with "yes" for the activity to be considered well-designed.

1. Does every interaction in the activity direct attention toward the learning content?
2. Is there any interaction that produces entertainment unrelated to the concept being taught? (If yes — remove it.)
3. When the child gets an answer right, does the feedback name the specific concept being learned?
4. When the child gets an answer wrong, does the feedback re-direct toward the correct answer without shame?
5. Is the activity free of "hotspots" — elements that produce entertaining animations when tapped but are not part of the learning task? (If no — remove them.)
6. Does the activity end when the learning task is complete, rather than continuing with an extended reward sequence?
7. Does the stimulus (the thing the child is reasoning about) remain visible throughout the question, or is it removed when the answer options appear? (It should remain visible.)

---

## 9. Key sources for further reading

For the designer who wants to go deeper on any topic:

**Touch interaction and motor capabilities:**
- Nielsen Norman Group: "Design for Kids Based on Their Stage of Physical Development" (2024) — free, practitioner-level, comprehensive
- Nacher et al. (2015) "Multi-touch gestures for pre-kindergarten children" — academic, available via ScienceDirect
- UX Matters: "Playful Interfaces: Designing Interactive Experiences for Children" — free, practitioner-level

**Feedback design:**
- Callaghan & Reich (2020) "Review of feedback in edutainment games for preschoolers" — Journal of Children and Media
- Sesame Workshop "Best Practices: Designing Touch Tablet Experiences for Preschoolers" (2012) — free PDF, the most practical single document for this age group

**Character and parasocial relationships:**
- Brunick et al. (2016) "Children's future parasocial relationships with media characters" — Georgetown University, available free online
- Calvert et al. (2020) "Young Children's Mathematical Learning From Intelligent Characters" — PMC open access
- UCLA Center for Scholars & Storytellers blog post "Encourage Friendships With Kids and the Characters They Watch" — free, excellent practitioner summary

**Visual design:**
- Sesame Workshop "Best Practices" (above) — includes specific colour, font, and layout guidance
- UXmatters: "Effective Use of Color and Graphics in Applications for Children" — free

**Activity type effectiveness:**
- Russo-Johnson et al. (2017) "All Tapped Out: Touchscreen Interactivity and Young Children's Word Learning" — Frontiers in Psychology, open access
- Hirsh-Pasek et al. (2015) "Putting Education in Educational Apps" — Psychological Science in the Public Interest — the foundational paper on considerate vs inconsiderate interactivity

