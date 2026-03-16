# Nurture — Activity Specifications
*Version 1.0 | MVP scope | 20 activities (Language & Literacy + Numeracy)*

---

## Overview

This document specifies the 20 tap-to-select activities used in the MVP. Each activity maps to one milestone (see `milestone-schema.md`) and is designed to be completed by a child aged 3–6 with zero adult assistance and zero reading ability.

---

## Design Principles

**All instructions are audio-delivered.** Every prompt, every label, every feedback message is spoken aloud. Text on screen is supplementary — for teacher or parent reference only.

**Correct answer position is always randomised.** The correct answer must be placed in a random position on every attempt. Children will pattern-match position if the answer is always in the same spot.

**Feedback is immediate and emotionally calibrated.** Correct: animated reward (stars, bounce, cheerful audio). Incorrect: gentle visual wobble + audio re-prompt — no buzzer, no negative sound. After 2 consecutive incorrect attempts on the same question, the correct answer gently highlights. This prevents frustration without giving away the answer prematurely.

**A session = 3 questions, 2/3 to pass.** Each activity play-through presents 3 questions drawn from the milestone's variant pool. The child needs 2 correct answers for a passing session. One passing session contributes to the milestone mastery count.

**Sessions take 2–4 minutes maximum.** Three questions, immediate feedback, a celebratory end screen. It should feel like one short game, not a test.

**Each activity has 4–5 variants.** Variants change the specific content (objects, numbers, characters, themes) while keeping the same underlying skill. This prevents memorisation and keeps the experience feeling fresh.

---

## Activity Anatomy (all activities share this structure)

```
- Milestone ID       : which milestone this maps to
- Scene              : what the child sees on screen
- Audio prompt       : the spoken instruction when the activity loads
- Answer options     : what the child can tap
- Correct answer     : how the system scores the response
- Feedback (correct) : visual + audio response on correct tap
- Feedback (wrong)   : visual + audio response on incorrect tap
- Variant dimensions : what changes across the 4–5 variants
```

---

## Language & Literacy Activities

---

### LL-B-01 — Find your name card

**Milestone:** Recognises own name in print

**Scene:** Four name cards laid out on an illustrated classroom table. One card shows the child's own name (pulled from their profile). The other three show common Singapore names drawn from a pool of 20 (e.g. Aisha, Rayan, Mei, Omar, Priya, Kai, Sara).

**Audio prompt:** "Can you find YOUR name? Tap the name card that belongs to you!"

**Answer options:** 4 name cards

**Correct answer:** The card matching the logged-in child's name (dynamically generated per child)

**Feedback (correct):** Cards animate upward with confetti; audio: "That's you! Well done!"

**Feedback (wrong):** Cards gently shake; audio: "Let's look again — which one is YOUR name?"

**Variant dimensions:**
- Position of correct answer (rotate across 4 positions each session)
- Three distractor names (draw fresh from the pool each session)
- Visual theme of the name cards: classroom table / pigeonhole wall / lunchbox label / school bag tag

---

### LL-B-02 — Tap the letter named

**Milestone:** Identifies at least 10 letters of the alphabet by name

**Scene:** Four large letters displayed on colourful tiles. A friendly animal character points at the screen.

**Audio prompt:** "Tap the letter [B]!" (letter name spoken clearly)

**Answer options:** 4 letter tiles (correct letter + 3 distractors)

**Correct answer:** The tile showing the letter named in the audio prompt

**Feedback (correct):** Tile bounces and glows; audio: "That's [B]! Great job!"

**Feedback (wrong):** Tile wobbles; audio: "Let's try again! Which one is [B]?"

**Variant dimensions:**
- Letter tested (rotate across all 26; prioritise commonly confused pairs: b/d, p/q, m/n, u/n)
- Distractor selection (use visually similar letters for harder variants — b with d/p/q; m with n/w)
- Animal character (dog, rabbit, bird, monkey — rotated each session)

---

### LL-B-03 — Which way does the worm read?

**Milestone:** Understands that text is read left to right, top to bottom

**Scene:** An open storybook with a line of illustrated word-pictures. A small worm character sits at the left edge of the first line. Two large arrows appear — one pointing left, one pointing right.

**Audio prompt:** "The worm wants to read the story! Which way should it go? Tap the arrow!"

**Answer options:** Left arrow, right arrow

**Correct answer:** Right arrow

**Feedback (correct):** Worm wiggles right across the line; audio: "That's right! We read this way!"

**Feedback (wrong):** Worm bumps into the page edge and falls; audio: "Oops! Let's go the other way!"

**Variant dimensions:**
- Character: worm / caterpillar / snail / ant
- Storybook theme: jungle / ocean / farm / city
- Second question variant (harder): after the left-right question, ask "Now which line does the worm go to next?" — adds a top-to-bottom arrow choice

---

### LL-D-01 — Match uppercase to lowercase door

**Milestone:** Matches all uppercase letters to their lowercase pairs

**Scene:** A large uppercase letter displayed on a signpost above three colourful doors, each showing a lowercase letter.

**Audio prompt:** "This big letter is looking for its little partner! Tap the door with the matching small letter!"

**Answer options:** 3 lowercase letters on doors (correct pair + 2 distractors)

**Correct answer:** The door showing the lowercase equivalent of the displayed uppercase letter

**Feedback (correct):** The door opens to reveal a matching pair dancing; audio: "They match! [A] and [a] are friends!"

**Feedback (wrong):** Door shakes and stays closed; audio: "Not quite — try another door!"

**Variant dimensions:**
- Letter pair tested (rotate across all 26; prioritise visually confusing pairs)
- Distractor similarity (easy: different shapes entirely; hard: b/d/p or m/n/w as distractors)
- Visual theme: doors / treasure chests / windows / flowers

---

### LL-D-02 — What sound does this word start with?

**Milestone:** Identifies the beginning sound of familiar words

**Scene:** A large, clear illustration of a familiar object (e.g. a banana). Three letter tiles appear below.

**Audio prompt:** "[BANANA]! What sound does [BANANA] start with? Tap the letter!"

**Answer options:** 3 letter tiles (correct starting letter + 2 distractors)

**Correct answer:** The letter tile matching the initial phoneme of the object name

**Feedback (correct):** Letter tile glows; audio: "Yes! [Banana] starts with [B]!"

**Feedback (wrong):** Tile wobbles; audio: "Listen again... [B]anana. What does it start with?"

**Variant dimensions:**
- Object shown: rotate across 15 familiar objects — banana, cat, dog, fish, hat, jar, kite, lion, mango, net, pen, sun, tree, van, web
- Distractor phonetic distance: easy (b vs. m vs. s — very different sounds); hard (b vs. d vs. p — similar sounds)
- Object illustration style: photo-realistic / cartoon / simple line drawing

---

### LL-D-03 — Find the sight word on the card

**Milestone:** Recognises 15+ common sight words

**Scene:** Three word cards displayed on a table. A character points to the screen.

**Audio prompt:** "Find the word [THE]! Tap the card that says [THE]!"

**Answer options:** 3 word cards (correct sight word + 2 distractors from the same sight word pool)

**Correct answer:** The card matching the word spoken in the audio prompt

**Feedback (correct):** Card flips over to reveal a star; audio: "That's right — [THE]! You know that word!"

**Feedback (wrong):** Card shakes; audio: "Listen again — find [THE]!"

**Variant dimensions:**
- Word tested: rotate across the 15-word set (I, a, the, is, my, he, she, we, go, and, in, it, to, on, at)
- Distractor words: use words of similar visual shape (the/this/that; my/by/me; is/it/in)
- Number of cards: 3 (easy) or 4 (harder variant, once child approaches Developing→Secure transition)

---

### LL-D-04 — Put the story pictures in order

**Milestone:** Sequences 3–4 pictures to tell a simple story in correct order

**Scene:** 3 story pictures shown jumbled on screen. Three numbered slots appear below (1, 2, 3).

**Audio prompt:** "These pictures tell a story! Tap the picture that comes FIRST, then SECOND, then LAST!"

**Answer options:** Child taps pictures one at a time in order; each tapped picture slides into the next numbered slot

**Correct answer:** All three pictures placed in the correct narrative sequence

**Feedback (correct):** Pictures animate into a mini storybook; audio: "Great story! You got it right!"

**Feedback (wrong — mid sequence):** Incorrect picture slides back out; audio: "Hmm, not quite — think about what happened first!"

**Variant dimensions:**
- Story used: rotate across 5 simple 3-frame stories:
  1. Egg in nest → chick hatching → chick walking
  2. Seed → sprout → flower blooming
  3. Wake up → eat breakfast → go to school
  4. Empty bowl → add ingredients → finished cake
  5. Meet a friend → play together → wave goodbye
- Number of frames: 3 (standard) or 4 (harder variant)

---

### LL-S-01 — Blend the sounds, tap the picture

**Milestone:** Blends CVC sounds to read simple words

**Scene:** Three letter tiles appear one at a time with popping sound effects: c... a... t. The tiles then push together and the complete word appears. Three picture options appear below.

**Audio prompt:** "Listen to the sounds... [c]... [a]... [t]. What word is that? Tap the picture!"

**Answer options:** 3 pictures (correct illustration + 2 distractors — one rhyming, one phonetically unrelated)

**Correct answer:** The picture matching the blended CVC word

**Feedback (correct):** Picture bounces; audio: "[CAT]! You blended it!"

**Feedback (wrong):** Audio re-segments: "Listen again... [c]...[a]...[t]... what does that make?"

**Variant dimensions:**
- CVC word: rotate across 12 words — cat, dog, sun, pin, hop, red, big, fun, wet, sit, box, man
- Distractor strategy: one rhyme-adjacent (cat → bat), one phonetically unrelated (cat → bus)
- Presentation: animated tiles pushing together (standard) vs. static word appearing (simpler variant for first attempts)

---

### LL-S-02 — Read the sentence, tap the scene

**Milestone:** Reads simple sentences using sight words and phonics

**Scene:** A short sentence displayed on screen in large clear text, read aloud by the audio. Three illustrated scene pictures appear below.

**Audio prompt:** "I will read a sentence. Then tap the picture that shows what it says. Ready? [THE CAT SITS.]"

**Answer options:** 3 scene pictures (correct illustration + 2 distractors — one with wrong subject, one with wrong action)

**Correct answer:** The picture correctly illustrating the sentence

**Feedback (correct):** Scene picture comes to life with a small animation; audio: "You read it!"

**Feedback (wrong):** Audio re-reads sentence slowly; "Listen again — [THE CAT SITS]. Which picture shows that?"

**Variant dimensions:**
- Sentence: rotate across 8 sentences — "The dog runs.", "My cat is big.", "He sits on it.", "We go in.", "She is at the mat.", "A hen sat.", "I see a red sun.", "The hen and the cat."
- Distractor strategy varies: wrong subject (dog vs. cat) and wrong action (sits vs. runs) ensure the child must read the full sentence

---

### LL-S-03 — Answer a question about the story

**Milestone:** Answers comprehension questions about a short passage read aloud

**Scene:** A simple 3-sentence story shown as an illustrated storybook spread, read aloud in full. A question then appears below and is also read aloud. Three answer options appear (pictures or short spoken phrases).

**Audio prompt:** Story read in full, then: "[What colour is Mia's cat?] Tap the right answer!"

**Answer options:** 3 picture or spoken-word options (correct + 2 plausible distractors based on story details)

**Correct answer:** The option matching the explicitly stated or clearly implied answer in the passage

**Feedback (correct):** Storybook closes with a star; audio: "You understood the story!"

**Feedback (wrong):** Audio replays the relevant sentence from the story; "Let's listen again..."

**Variant dimensions:**
- Story: rotate across 5 short 3-sentence passages (animals, family, food, school, nature themes)
- Question type: literal retrieval ("what colour?") / simple inference ("why does Mia feed the cat?") / character identification ("who has the cat?")
- Answer format: picture options (easier) or spoken-word options (harder — tapping each reads the word aloud)

---

## Numeracy Activities

---

### NUM-B-01 — Tap the animals into their numbered spots

**Milestone:** Rote counts aloud to 10 in correct sequence

**Scene:** Ten empty numbered ponds (1–10) arranged on screen. One frog appears at a time, waiting to be sent to its pond.

**Audio prompt:** "Let's count the frogs into their ponds! Tap each frog to count it in! 1..."

**Answer options:** One frog visible at a time; child taps it to send it to the next pond in sequence. Audio counts along: "1... 2... 3..."

**Correct answer:** Child taps through all 10 frogs in sequence without skipping

**Feedback (correct):** All frogs in their ponds; a celebration plays across the screen; audio: "You counted to 10!"

**Feedback (wrong — if child taps in wrong area):** A gentle nudge points to the waiting frog

**Variant dimensions:**
- Animal: frogs / ducks / bees / fish / ladybirds
- Visual theme of containers: ponds / nests / flowers / jars / clouds

---

### NUM-B-02 — Count the objects, tap the number (1–5)

**Milestone:** Counts objects 1–5 with one-to-one correspondence

**Scene:** A plate or bowl with 1–5 pieces of illustrated food (or objects). A row of number buttons (1–5) appears at the bottom.

**Audio prompt:** "How many [apples] are on the plate? Count them and tap the number!"

**Answer options:** Numbers 1–5 as large tappable tiles

**Correct answer:** The tile matching the quantity shown on the plate

**Feedback (correct):** Objects bounce and the correct number lights up; audio: "Yes! [3] apples!"

**Feedback (wrong):** Audio: "Let's count together — point to each one... [1], [2], [3]..."

**Variant dimensions:**
- Quantity: 1 / 2 / 3 / 4 / 5 (each session randomly picks one)
- Object type: apples / fish / stars / flowers / balls / mangoes
- Arrangement: linear (easier) / scattered (harder)
- Distractor prominence: easy (show 1/3/5 as options — spread apart); hard (show 2/3/4 — adjacent numbers)

---

### NUM-B-03 — Tap the numeral called (1–5)

**Milestone:** Recognises and names written numerals 1–5

**Scene:** Five large numeral cards laid out on a colourful mat (1, 2, 3, 4, 5). A friendly character stands beside them.

**Audio prompt:** "Tap the number [4]!"

**Answer options:** All 5 numerals displayed; child taps the one called

**Correct answer:** The numeral matching the spoken number

**Feedback (correct):** Card spins and glows; audio: "That's [4]! Well done!"

**Feedback (wrong):** Card shakes; audio: "That's not [4] — let's find it!"

**Variant dimensions:**
- Numeral called: rotate through 1–5
- Visual style: plain numeral / numeral on a star / numeral on an animal / handwritten-style numeral

---

### NUM-D-01 — Count the objects, tap the number (6–10)

**Milestone:** Counts objects 1–10 with one-to-one correspondence

*Same mechanic as NUM-B-02, extended to quantities 6–10.*

**Scene:** A basket or container with 6–10 illustrated objects.

**Audio prompt:** "How many [mangoes] are in the basket? Count carefully and tap the number!"

**Answer options:** 4 number tiles showing a range centred near the correct answer (e.g. for 7 objects: options show 5, 6, 7, 8) — forces careful discrimination

**Correct answer:** The tile matching the quantity shown

**Variant dimensions:**
- Quantity: 6 / 7 / 8 / 9 / 10
- Object type: mangoes / cars / pencils / buttons / leaves
- Arrangement: 2-row layout (medium) / scattered (hard)

---

### NUM-D-02 — Find the numeral on the washing line (1–10)

**Milestone:** Recognises and names written numerals 1–10

**Scene:** A washing line with 10 number cards pegged on it (1–10, in random order on the line).

**Audio prompt:** "Find the number [8] on the washing line! Tap it!"

**Answer options:** All 10 cards visible on the line; child taps the correct one

**Correct answer:** The card showing the spoken numeral

**Feedback (correct):** Card spins off the line and floats with stars; audio: "That's [8]!"

**Variant dimensions:**
- Numeral called: focus on commonly confused pairs (6/9, 2/5, 3/8) more frequently than others
- Difficulty variant: instead of all 10, show only 4 random cards and ask "Is [8] here? Tap it if you see it, or tap NO if it's not." — adds a yes/no judgment layer

---

### NUM-D-03 — Which plate has more / fewer?

**Milestone:** Identifies which group has more or fewer objects (up to 10)

**Scene:** Two plates side by side — one with a larger quantity of illustrated objects, one with fewer. Both quantities labelled with how many objects are shown (audio only, not text).

**Audio prompt:** "Which plate has MORE [strawberries]? Tap it!" (alternates: "Which has FEWER?" in other variants)

**Answer options:** Left plate or right plate (large tap targets)

**Correct answer:** The plate with the higher (or lower) quantity, matching the audio prompt

**Feedback (correct):** Winning plate grows larger; audio: "Right! That plate has MORE!"

**Feedback (wrong):** Both plates count out loud; audio: "Let's count — this one has [3], that one has [7]..."

**Variant dimensions:**
- Quantities: easy (2 vs. 8 — obvious difference); medium (4 vs. 7); hard (5 vs. 6 — adjacent, subtle)
- Prompt word: "more" vs. "fewer" — alternate so children learn both concepts
- Object type: strawberries / coins / blocks / buttons / fish
- Occasional catch question: equal quantities on both plates + a middle "SAME" button appears

---

### NUM-D-04 — Sort the objects into bins

**Milestone:** Sorts objects by one attribute (colour, size, or shape)

**Scene:** A row of mixed illustrated objects (e.g. red and blue balls mixed together). Two labelled sorting bins appear below.

**Audio prompt:** "Let's sort these! Tap each [ball] and put it in the right bin — sort by [COLOUR]!"

**Interaction:** Child taps an object; both bins highlight; child taps the bin where the object belongs. Repeat for all 4–6 objects.

**Correct answer:** All objects placed in the bin matching their specified attribute

**Feedback (correct — each object):** Object bounces into bin with a satisfying pop

**Feedback (correct — all done):** Both bins do a happy shake; audio: "You sorted them all!"

**Feedback (wrong):** Object bounces back out; audio: "Look at the [colour] — which bin does it go in?"

**Variant dimensions:**
- Attribute: colour (easy) / size: big vs. small (medium) / shape (harder)
- Number of objects: 4 (easy) / 6 (medium) / 8 (hard)
- Distractor complexity: for shape sorting, objects also vary in colour — child must ignore colour and sort by shape only

---

### NUM-S-01 — Fill the missing numbers on the train

**Milestone:** Counts and sequences numbers 1–20

**Scene:** A number train with carriages numbered 1–20. Some carriages show their numbers clearly; 2–4 carriages show question marks. When the child taps a question mark carriage, 3 number options appear.

**Audio prompt:** "Some numbers are missing from the train! Tap the right number for each empty carriage!"

**Answer options:** For each gap: 3 number tiles (correct missing number + 2 distractors — adjacent numbers)

**Correct answer:** Each gap filled with the correct sequential number

**Feedback (correct — each gap):** Number pops into the carriage; a train whistle sounds

**Feedback (correct — all gaps):** Train drives off-screen to applause; audio: "The train is ready!"

**Feedback (wrong):** Number tile bounces off; audio: "Not quite — what comes after [X]?"

**Variant dimensions:**
- Which numbers are missing: vary position (early gaps are easier than late-sequence gaps)
- Range: 1–10 (easy) / 6–15 (medium) / 11–20 (hard)
- Number of gaps: 2 (easy) / 3 (medium) / 4 (hard)
- Distractor proximity: adjacent numbers always used (most challenging possible distractors)

---

### NUM-S-02 — Find the shape by its property

**Milestone:** Identifies and names basic 2D shapes and their properties

**Scene:** A "shape museum" with 4 shape exhibits on gallery walls — triangle, square, circle, rectangle (harder variants add hexagon and oval).

**Audio prompt:** "Find the shape that has [3 sides and 3 corners]! Tap it!"

**Answer options:** 4 shape exhibits

**Correct answer:** The shape matching the described property

**Feedback (correct):** Shape exhibit frame lights up; audio: "Yes! A [triangle] has 3 sides!"

**Feedback (wrong):** Audio gives a hint: "Count the sides on that one — does it have [3]?"

**Variant dimensions:**
- Property described: sides count (3, 4, 0) / corners count / "has no straight sides" / "has 4 equal sides"
- Shape set: standard (triangle/square/circle/rectangle) / extended (adds hexagon + oval for harder variants)
- Classic hard pair: square vs. rectangle — used deliberately in harder variants

---

### NUM-S-03 — Story maths: how many now?

**Milestone:** Completes simple addition and subtraction within 5

**Scene:** A short visual story plays as a 2-step animation: 3 frogs sit on a log → 2 more hop on → scene freezes. Six answer tiles appear (0–5).

**Audio prompt:** "[3] frogs are on the log. [2] more frogs hop on. How many frogs are there NOW? Tap the answer!"

**Answer options:** Six tiles showing numerals 0–5 (always the full range — no narrowing)

**Correct answer:** The correct sum or difference

**Feedback (correct):** All frogs bounce together; audio: "Yes! [3] and [2] makes [5]!"

**Feedback (wrong):** Animation replays slowly; audio: "Let's count them together — [1, 2, 3]... then [4, 5]..."

**Variant dimensions:**
- Operation: addition (and) / subtraction (some jump away) — alternate across sessions
- Number combinations: all within-5 pairs — 1+1, 2+1, 3+1, 1+2, 2+2, 3+2, 4+1, 5-1, 5-2, 4-2, 3-1, 2-1
- Story context: frogs on a log / birds on a wire / fish in a bowl / flowers in a vase / children on a bench
- Answer range: always shows 0–5 (never narrowed — child must independently recall the answer)

---

## Activity–Milestone Cross Reference

| Activity name | Milestone ID | Level | Area |
|---|---|---|---|
| Find your name card | LL-B-01 | Beginning | Language & Literacy |
| Tap the letter named | LL-B-02 | Beginning | Language & Literacy |
| Which way does the worm read? | LL-B-03 | Beginning | Language & Literacy |
| Match uppercase to lowercase door | LL-D-01 | Developing | Language & Literacy |
| What sound does this word start with? | LL-D-02 | Developing | Language & Literacy |
| Find the sight word on the card | LL-D-03 | Developing | Language & Literacy |
| Put the story pictures in order | LL-D-04 | Developing | Language & Literacy |
| Blend the sounds, tap the picture | LL-S-01 | Secure | Language & Literacy |
| Read the sentence, tap the scene | LL-S-02 | Secure | Language & Literacy |
| Answer a question about the story | LL-S-03 | Secure | Language & Literacy |
| Tap the animals into their numbered spots | NUM-B-01 | Beginning | Numeracy |
| Count the objects, tap the number (1–5) | NUM-B-02 | Beginning | Numeracy |
| Tap the numeral called (1–5) | NUM-B-03 | Beginning | Numeracy |
| Count the objects, tap the number (6–10) | NUM-D-01 | Developing | Numeracy |
| Find the numeral on the washing line (1–10) | NUM-D-02 | Developing | Numeracy |
| Which plate has more / fewer? | NUM-D-03 | Developing | Numeracy |
| Sort the objects into bins | NUM-D-04 | Developing | Numeracy |
| Fill the missing numbers on the train | NUM-S-01 | Secure | Numeracy |
| Find the shape by its property | NUM-S-02 | Secure | Numeracy |
| Story maths: how many now? | NUM-S-03 | Secure | Numeracy |

