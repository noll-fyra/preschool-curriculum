// Co-activity suggestions for Active parents — one per milestone ID.
// Each is a short, plain-language suggestion for a 5-minute home activity.

export const CO_ACTIVITIES: Record<string, string> = {
  // Language & Literacy — Beginning
  "LL-B-01":
    "Point to your child's name on their bag, lunchbox, or books. Ask: 'That spells your name — can you find it somewhere else?'",
  "LL-B-02":
    "Play letter spotting on a walk or at the supermarket. Call out a letter and see who spots it first on a sign or label.",
  "LL-B-03":
    "Sit together with a picture book. Run your finger under the words as you read so your child sees how you go left to right, then drop down to the next line.",

  // Language & Literacy — Developing
  "LL-D-01":
    "Write a letter in uppercase on paper and ask your child to write the matching lowercase letter beside it. Try 3–4 pairs — A/a, B/b, T/t.",
  "LL-D-02":
    "Say a word and ask what sound it starts with. Start with their name or favourite foods. 'What sound does 'mango' start with?'",
  "LL-D-03":
    "Stick a few sight words (I, the, go, is) on the fridge. Point to one each morning and ask your child to say it without sounding out.",
  "LL-D-04":
    "After a TV show or story, describe 3 events and ask your child to put them in the right order. 'What happened first, next, last?'",

  // Language & Literacy — Secure
  "LL-S-01":
    "Sound out simple words together from labels or packaging. Tap each sound on your fingers, then blend. 'C-A-T... what word is that?'",
  "LL-S-02":
    "Point to a short sentence in a book or on a cereal box and ask your child to read it aloud — they know more words than you think!",
  "LL-S-03":
    "Read a short picture book together, then ask 1–2 questions: 'What happened first? Why did she do that?' Let your child answer in their own words.",

  // Numeracy — Beginning
  "NUM-B-01":
    "Count together during everyday moments — steps on the stairs, bites of food, cars you pass. Make it a natural habit.",
  "NUM-B-02":
    "Put 1–5 small objects on the table. Ask your child to count them by touching each one as they say the number.",
  "NUM-B-03":
    "Write the numbers 1–5 on small cards. Ask your child to place the right number of objects (coins, raisins, blocks) next to each card.",

  // Numeracy — Developing
  "NUM-D-01":
    "Ask your child to count out exactly 7 grapes, 8 blocks, or 9 stickers. Praise slow, careful one-by-one counting — accuracy matters more than speed.",
  "NUM-D-02":
    "Write the numbers 1–10 in random order on paper. Call out a number and ask your child to point to it as fast as they can.",
  "NUM-D-03":
    "Put two groups of objects on the table (e.g. 4 vs. 7 blocks). Ask 'which group has more?' then count together to check.",
  "NUM-D-04":
    "Sort household items together by colour or size. 'Can you put all the red ones here and all the blue ones there?' Then switch the rule.",

  // Numeracy — Secure
  "NUM-S-01":
    "Count together whenever you can — up the stairs, cars in the car park, or items in the shopping trolley. Aim for 20.",
  "NUM-S-02":
    "Spot shapes around the house together. 'The window is a rectangle — how many sides? The clock is a circle — does it have any corners?'",
  "NUM-S-03":
    "Use fingers for simple sums during snack time. 'You have 3 biscuits and I give you 2 more — how many is that? Let's count.'",

  // Social & Emotional Development — Beginning
  "SED-B-01":
    "Look at photos together — family photos, story books, or even your child's face in a mirror. Ask 'How is this person feeling? How can you tell?'",
  "SED-B-02":
    "Set a short home routine together (e.g. arrive home → shoes off → wash hands → snack). Let your child lead the steps without reminders.",
  "SED-B-03":
    "Play a simple board game or card game. When it's not your child's turn, say 'Now we wait — it's my turn!' and model patient waiting.",

  // Social & Emotional Development — Developing
  "SED-D-01":
    "When watching a show together, pause at an emotional moment. Ask 'Why do you think she feels that way? What happened just before?'",
  "SED-D-02":
    "When your child is frustrated, ask 'Can you tell me what's bothering you?' Give them time to find words before you fill in the blanks.",
  "SED-D-03":
    "Describe a simple scenario: 'Someone takes your toy without asking. Is that helpful or not helpful? What would be a better way?' Discuss together.",
  "SED-D-04":
    "If a sibling or friend is upset, quietly ask your child 'What do you think you could do to help them feel better?' and support whatever they try.",

  // Social & Emotional Development — Secure
  "SED-S-01":
    "At the end of the day, ask 'How were you feeling today? What made you feel that way?' Let your child lead — listen without jumping in.",
  "SED-S-02":
    "If a sibling argument comes up, step back and say 'Can you two figure out a fair solution together?' Step in only if they're stuck.",
  "SED-S-03":
    "Give your child a small home responsibility — setting the table, tidying their books. Thank them afterwards: 'You really helped the family today.'",
};

export function getCoActivity(milestoneId: string): string | undefined {
  return CO_ACTIVITIES[milestoneId];
}
