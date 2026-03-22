/**
 * Parent–child "group" activity ideas (off-device).
 * Each links to a real milestone for observation logging and teacher visibility.
 */
export interface ParentGroupActivity {
  id: string;
  milestoneId: string;
  title: string;
  description: string;
  /** How this practice supports the milestone skill */
  learningRationale: string;
  /** Step-by-step for families */
  instructions: string;
}

export const PARENT_GROUP_ACTIVITIES: ParentGroupActivity[] = [
  {
    id: "g-name-scavenger",
    milestoneId: "LL-B-01",
    title: "Name scavenger hunt",
    description:
      "Hunt for your child’s name (or the letters in it) on packaging, signs, and books around the home.",
    learningRationale:
      "Spotting their name in real print builds the same recognition skill teachers look for when children pick their own name among classmates’ labels — it connects symbols on a page to something meaningful.",
    instructions:
      "1. Write your child’s first name clearly on a sticky note.\n2. Together, search the house for those letters or the whole name (cereal boxes, book covers, labels).\n3. Each time they find a match, they point and you read it aloud together.\n4. Keep it playful — stop after 5–8 finds or when interest fades.",
  },
  {
    id: "g-letter-of-the-day",
    milestoneId: "LL-B-02",
    title: "Letter of the day walk",
    description:
      "Pick one letter and notice it together on a short walk or around one room.",
    learningRationale:
      "Naming letters in context (not only reciting the alphabet) matches how teachers check that a child recognises letters by name when they see them, not just in order.",
    instructions:
      "1. Choose a letter that starts with something your child likes (e.g. B for bus).\n2. Spend 5–10 minutes finding that letter on signs, toys, or packaging.\n3. Ask: “What letter is this?” and let them try before you help.\n4. Celebrate each find with a high-five or silly sound.",
  },
  {
    id: "g-read-together-direction",
    milestoneId: "LL-B-03",
    title: "Finger follows the words",
    description:
      "While you read aloud, your child slides a finger along the line in the direction we read.",
    learningRationale:
      "Moving left-to-right and top-to-bottom mirrors how fluent reading works in English and matches the milestone about understanding how print is organised on a page.",
    instructions:
      "1. Open any picture book to a page with a single short line of text.\n2. Read the line slowly while your child runs a finger under the words.\n3. At the end of the line, pause and ask: “Where do we go next?” — guide them to the start of the next line.\n4. Try 3–4 lines, then let them “be the teacher” and trace while you listen.",
  },
  {
    id: "g-story-about-your-day",
    milestoneId: "LL-D-04",
    title: "Tell me a story about your day",
    description:
      "Ask your child to recount the day in order — like a short story with a beginning, middle, and end.",
    learningRationale:
      "Ordering what happened first, next, and last builds the same narrative sequencing teachers assess when children arrange story pictures or retell events in logical order.",
    instructions:
      "1. Choose a calm moment (mealtime, bath, or bedtime).\n2. Say: “Tell me a story about your day — what happened first?”\n3. After each bit, ask “And then what?” until they feel finished.\n4. If they stall, offer a gentle prompt (e.g. “Anything fun with friends?”).\n5. Thank them for sharing; keep it warm — no quiz unless they want help finding a word.",
  },
  {
    id: "g-count-the-setting",
    milestoneId: "NUM-B-02",
    title: "Count the setting",
    description:
      "Count real objects (1–5) during play — spoons, blocks, or toys in a basket.",
    learningRationale:
      "One-to-one counting (touch-move-count) is exactly what teachers assess: saying one number per object and stopping at the right total, not just chanting numbers.",
    instructions:
      "1. Gather 3–5 similar items (e.g. toy cars).\n2. Line them up together.\n3. Model touching each item once while saying the numbers.\n4. Ask your child to try; if they skip or double-count, gently redo one item together.\n5. Finish by asking “How many altogether?”",
  },
  {
    id: "g-more-or-less-snack",
    milestoneId: "NUM-D-03",
    title: "More or less snack math",
    description:
      "Use two small piles of snacks to talk about which has more and which has fewer.",
    learningRationale:
      "Comparing two groups builds the ideas behind “more” and “fewer” that sit under the numeracy milestone about identifying which set has more or fewer objects.",
    instructions:
      "1. Put 4 crackers on one plate and 7 on another (or similar small counts ≤10).\n2. Ask which plate has more and which has fewer — no need to count first unless they want to.\n3. Switch amounts and play again.\n4. Optional: let them “fix” it so both sides are equal, then ask again.",
  },
  {
    id: "g-emotion-faces",
    milestoneId: "SED-B-01",
    title: "Emotion faces game",
    description:
      "Use photos, drawings, or emojis to name happy, sad, angry, and scared together.",
    learningRationale:
      "Labelling basic emotions from faces links directly to the SED milestone about naming emotions from pictures — it gives teachers evidence that practice is happening at home too.",
    instructions:
      "1. Find or draw four simple faces showing happy, sad, angry, and scared.\n2. Show one at a time and ask: “How is this person feeling?”\n3. If they’re unsure, offer two choices: “Is this happy or sad?”\n4. Take turns: they pick a face for you to name, then you pick one for them.",
  },
  {
    id: "g-mini-routine",
    milestoneId: "SED-B-02",
    title: "Our three-step routine",
    description:
      "Create a short before-bed or after-meal routine your child can lead.",
    learningRationale:
      "Following and remembering a short sequence without constant reminders supports the milestone about following a 2–3 step routine — home practice makes the skill transferable to class.",
    instructions:
      "1. Agree on three clear steps (e.g. pyjamas → brush teeth → choose a story).\n2. Write or draw the steps on a card.\n3. For a few days, you say the steps first; then ask your child to tell you what comes next before you move on.\n4. Praise when they remember the order without a reminder.",
  },
  {
    id: "g-story-why-feeling",
    milestoneId: "SED-D-01",
    title: "Why did they feel that?",
    description:
      "After a short story or show, wonder together why a character felt the way they did.",
    learningRationale:
      "Linking feelings to events (“she’s sad because…”) is the same skill as identifying causes of emotions in stories — it stretches empathy and narrative understanding.",
    instructions:
      "1. After one scene or picture book page, pause at a clear emotion.\n2. Ask: “Why do you think they feel like that?”\n3. Accept simple answers; if needed, give one hint from the story.\n4. Avoid quizzing — keep it conversational: “What would help them feel better?”",
  },

  // ── Aesthetics & Creative Expression (ACE) ─────────────────────────────
  {
    id: "g-art-materials-tray",
    milestoneId: "ACE-B-01",
    title: "Messy tray studio",
    description:
      "Set out paint, crayons, or dough on a tray or mat and let your child explore without a fixed “finished” picture.",
    learningRationale:
      "Free exploration of real art materials matches the ACE milestone about using paint, crayons, and clay freely — process matters more than a perfect product.",
    instructions:
      "1. Cover the table and offer two or three materials (e.g. crayons + paper, or play dough).\n2. Say: “You choose what to make — I’m here if you need help.”\n3. Stay nearby; comment on colours or textures without directing the outcome.\n4. When they slow down, ask if they’d like to add one more colour or stop and display their work.",
  },
  {
    id: "g-kitchen-band",
    milestoneId: "ACE-B-02",
    title: "Kitchen band singalong",
    description:
      "Sing a nursery rhyme or favourite song together while clapping, tapping spoons, or shaking a rice shaker.",
    learningRationale:
      "Joining in music as a pair supports the milestone about participating in group singing and music — at home, “group” can be just you and your child.",
    instructions:
      "1. Pick a short song your child knows from school or home.\n2. Sing it twice — first you lead, then they lead a line.\n3. Add simple rhythm (clap on each beat or tap a pot with a wooden spoon).\n4. End with a silly bow or curtsy together.",
  },
  {
    id: "g-prop-box-story",
    milestoneId: "ACE-B-03",
    title: "Prop box story",
    description:
      "Gather a scarf, empty box, and toy — take turns pretending who you are and what happens next.",
    learningRationale:
      "Sustained pretend play with everyday objects builds the same imaginative skills teachers look for when children use simple props in role play.",
    instructions:
      "1. Put three “props” in a box (e.g. hat, spoon, soft toy).\n2. You start: “I’m the shopkeeper — who are you?”\n3. Take turns adding one sentence to the story.\n4. After 3–5 minutes, swap roles or change the setting (hospital, space ship, school).",
  },

  // ── Discovery of the World (DOW) ─────────────────────────────────────────
  {
    id: "g-change-spotters",
    milestoneId: "DOW-B-01",
    title: "Change spotters walk",
    description:
      "On a walk or at the window, point out something that looks different from last time (sky, plants, puddles).",
    learningRationale:
      "Noticing how the environment changes links to the milestone about naming observable changes — you’re practising the habit of looking closely.",
    instructions:
      "1. Before you go out, ask: “What might look different today?”\n2. Stop once or twice to compare: “Last week this tree had no leaves…”\n3. Let your child name what they see; you add one new word if helpful.\n4. Back home, draw or tell one change they remember.",
  },
  {
    id: "g-curious-why",
    milestoneId: "DOW-B-02",
    title: "Curious why time",
    description:
      "During bath, cooking, or play, pause and wonder aloud — then invite your child’s “how” or “why” questions.",
    learningRationale:
      "Modelling curiosity encourages the unprompted how/why questions that sit under the Discovery milestone about asking how or why things work.",
    instructions:
      "1. Choose a routine moment (e.g. water going down the drain, toast browning).\n2. Say: “I wonder why…” and trail off.\n3. If they ask a question, celebrate it even if you don’t know the answer — look up a short child-friendly explanation together.\n4. Aim for one genuine question from them; don’t turn it into a quiz.",
  },
  {
    id: "g-laundry-scientists",
    milestoneId: "DOW-B-03",
    title: "Laundry scientists",
    description:
      "Sort socks or utensils by a property your child picks — colour, size, or texture.",
    learningRationale:
      "Sorting by a property they can name and see supports the milestone about grouping objects by observable physical properties.",
    instructions:
      "1. Spread out 8–12 safe items (socks, spoons, leaves from the garden).\n2. Ask: “How could we sort these?” If stuck, offer: “By colour or by size?”\n3. Let them place items into piles and say the rule aloud.\n4. Try a second rule (e.g. first by colour, then by size) if they’re still engaged.",
  },

  // ── Health, Safety & Motor Skills (HMS) ────────────────────────────────
  {
    id: "g-park-challenge",
    milestoneId: "HMS-B-01",
    title: "Park movement challenge",
    description:
      "At the park or corridor, try run–stop–jump and gentle climbing with you spotting.",
    learningRationale:
      "Varied running, jumping, and climbing in a safe space practises the gross motor coordination described in the HMS beginning milestone.",
    instructions:
      "1. Warm up with a slow jog for 10–15 seconds, then freeze when you say “stop”.\n2. Try three small jumps with both feet (off a low step if available).\n3. If there’s safe climbing, stay beside them; praise effort, not height.\n4. Cool down with a slow walk and a drink of water together.",
  },
  {
    id: "g-ready-to-draw",
    milestoneId: "HMS-B-02",
    title: "Ready to draw",
    description:
      "Draw side by side — check that the crayon is held in a comfortable grip and the marks are small controlled scribbles or shapes.",
    learningRationale:
      "Short, relaxed drawing sessions help reinforce a functional pencil or crayon grip, which teachers observe during writing and art tasks.",
    instructions:
      "1. Sit at a table with feet supported and paper taped flat if needed.\n2. Model holding the crayon with thumb and fingers (not a tight fist).\n3. Draw circles and lines together; copy each other’s shapes.\n4. Keep it to 5–8 minutes — end while it still feels fun.",
  },
  {
    id: "g-handwash-champions",
    milestoneId: "HMS-D-03",
    title: "Handwash champions",
    description:
      "Learn a 20-second song or rhyme for soapy hand washing before meals and after the toilet.",
    learningRationale:
      "Repeating a full wash with soap for enough time builds the independence and timing teachers expect for washing hands at the right moments.",
    instructions:
      "1. Pick a short song chorus or count slowly to 20 while rubbing palms, backs, and fingers.\n2. Do it together before one meal today.\n3. Next time, ask your child to lead while you follow.\n4. Name one time when we always wash (before eating, after toilet) without nagging — just remind with the song.",
  },
];

/** Deep-linked from the parent home “Activity for today” card. */
export const PARENT_HOME_SPOTLIGHT_GROUP_ACTIVITY_ID = "g-story-about-your-day";

export function getParentGroupActivityById(
  id: string
): ParentGroupActivity | undefined {
  return PARENT_GROUP_ACTIVITIES.find((a) => a.id === id);
}
