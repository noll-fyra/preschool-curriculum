// Authored content for each of the 30 milestones.
// Used by the parent dashboard: milestone detail screen, achievement celebrations.

export interface MilestoneContent {
  whyMatters: string;   // 3–5 sentences, parent-facing, non-specialist language
  tryAtHome: string;    // 1 specific suggestion: under 5 min, no materials needed
  celebration: string;  // 1–2 sentences for the achievement moment
}

const CONTENT: Record<string, MilestoneContent> = {
  // ── Language & Literacy — Beginning ────────────────────────────────────

  "LL-B-01": {
    whyMatters:
      "Seeing their own name written down is one of the very first 'reading moments' for a young child. It proves that marks on a page can mean something personally important — a realisation that sparks curiosity about reading. Research shows that children who recognise their own name early tend to engage more readily with written text. This is a tiny but genuinely significant milestone.",
    tryAtHome:
      "Point to your child's name on their bag, lunchbox, or books. Ask: 'That spells your name — can you find it somewhere else?'",
    celebration:
      "Your child can spot their own name in writing. That's the very first 'aha' moment in learning to read!",
  },

  "LL-B-02": {
    whyMatters:
      "Knowing what letters are called — 'that's an M, that's a T' — gives children the vocabulary to talk about reading. Before a child can crack how letters work, they need to know them by name. Ten letters is a meaningful threshold: enough to engage with real text, start spotting patterns, and build momentum. Each letter recognised is one more tool in the reading toolkit.",
    tryAtHome:
      "Play letter spotting on a walk or at the supermarket. Call out a letter and see who spots it first on a sign or label.",
    celebration:
      "Your child knows their first 10 letters! They can now start spotting them everywhere — on signs, books, and packaging.",
  },

  "LL-B-03": {
    whyMatters:
      "Knowing how to look at a page correctly is called print directionality — and it's a key concept before reading can begin. In English, we always go left to right and then drop down; this isn't obvious to a child encountering text for the first time. Until this is secure, a child may guess or read randomly, which slows everything else down.",
    tryAtHome:
      "Sit together with a picture book. Run your finger under the words as you read so your child sees how you go left to right, then drop down to the next line.",
    celebration:
      "Your child knows how to look at a page of text correctly. Every book they pick up, they're looking in the right place.",
  },

  // ── Language & Literacy — Developing ───────────────────────────────────

  "LL-D-01": {
    whyMatters:
      "Books use both uppercase and lowercase letters, but they look completely different — 'A' and 'a' are technically the same letter. Until children can reliably match them, they're navigating a world of 52 symbols, not 26. Making the connection between a capital and its lowercase twin unlocks the ability to read printed books, handwriting, and screens consistently.",
    tryAtHome:
      "Write a letter in uppercase on paper and ask your child to write the matching lowercase letter beside it. Try 3–4 pairs — A/a, B/b, T/t.",
    celebration:
      "Your child can match every uppercase letter to its lowercase pair. The alphabet is no longer two separate sets of symbols — it's one unified system.",
  },

  "LL-D-02": {
    whyMatters:
      "Hearing that 'fish' starts with an 'f' sound is called phonemic awareness — the ability to notice and work with the individual sounds in words. This skill is the single strongest predictor of early reading success. A child who can isolate beginning sounds is ready to connect sounds to letters, which is the core mechanism of how reading works. This milestone is a genuine turning point.",
    tryAtHome:
      "Say a word and ask what sound it starts with. Start with their name or favourite foods. 'What sound does mango start with?'",
    celebration:
      "Your child can hear the first sound in a word — that's phonemic awareness, and it's the key that unlocks reading.",
  },

  "LL-D-03": {
    whyMatters:
      "Sight words like 'the', 'I', and 'is' make up around 50–75% of words in early reading books. They don't always follow phonics rules, so they need to be recognised instantly without sounding out. Building a bank of sight words speeds up reading dramatically — it frees up attention to focus on harder, less-familiar words. Fifteen words is the threshold where this starts to make a meaningful difference.",
    tryAtHome:
      "Stick a few sight words (I, the, go, is) on the fridge. Point to one each morning and ask your child to say it without sounding out.",
    celebration:
      "Your child can instantly recognise 15 common words on sight. This will make their first reading books feel achievable and rewarding.",
  },

  "LL-D-04": {
    whyMatters:
      "Ordering story pictures shows that a child understands how events connect over time — something happened, then something else happened because of it. This is the foundation of reading comprehension: following the thread of a narrative, predicting what comes next, and understanding cause and effect. A child who can sequence a story is a child who will understand what they read, not just decode words.",
    tryAtHome:
      "After a TV show or story, describe 3 events and ask your child to put them in the right order. 'What happened first, next, and last?'",
    celebration:
      "Your child can put story events in order. They're starting to think about why things happen — the heart of reading comprehension.",
  },

  // ── Language & Literacy — Secure ────────────────────────────────────────

  "LL-S-01": {
    whyMatters:
      "Blending sounds — hearing 'c', 'a', 't' and saying 'cat' — is the breakthrough moment in learning to read. Once a child can blend consonant-vowel-consonant words reliably, they have cracked the alphabetic code and can start to tackle unfamiliar words independently. This is the point at which reading becomes self-reinforcing: the more a child reads, the better they get, and the better they get, the more they enjoy it.",
    tryAtHome:
      "Sound out simple words together from labels or packaging. Tap each sound on your fingers, then blend. 'C-A-T... what word is that?'",
    celebration:
      "Your child can blend sounds to read words. This is the big breakthrough — they can now begin to read independently.",
  },

  "LL-S-02": {
    whyMatters:
      "Reading sentences — not just individual words — means that everything is coming together. The child is combining phonics knowledge (sounding out unknown words) with their sight word bank (reading familiar words instantly) and their understanding of left-to-right directionality. Reading real sentences, however simple, is genuinely reading.",
    tryAtHome:
      "Point to a short sentence in a book or on a cereal box and ask your child to read it aloud — they know more words than you think!",
    celebration:
      "Your child can read simple sentences. That's not just learning — that's reading. A real, wonderful milestone.",
  },

  "LL-S-03": {
    whyMatters:
      "Understanding what was just read — not just saying the words aloud — is the difference between decoding and true comprehension. Many children can read the words but don't yet understand what they mean together. This milestone shows that the two skills have joined up: your child can follow a narrative, hold it in their working memory, and answer questions about it. This is exactly the skill needed for Primary 1.",
    tryAtHome:
      "Read a short picture book together, then ask 1–2 questions: 'What happened first? Why did she do that?' Let your child answer in their own words.",
    celebration:
      "Your child understands what they read, not just the words on the page. They're a reader in every meaningful sense.",
  },

  // ── Numeracy — Beginning ────────────────────────────────────────────────

  "NUM-B-01": {
    whyMatters:
      "Counting to 10 in the correct order is the very starting point of number sense — like learning the alphabet before reading. Until the sequence is automatic and fluent, every other number activity requires extra working memory to maintain it. Once counting is effortless, children can focus on what numbers actually mean. Getting this right, in order, without hesitation is the foundation everything else builds on.",
    tryAtHome:
      "Count together during everyday moments — steps on the stairs, bites of food, cars you pass. Make counting a natural habit rather than a formal exercise.",
    celebration:
      "Your child can count to 10 perfectly. The sequence is solid — now they're ready to attach meaning to those numbers.",
  },

  "NUM-B-02": {
    whyMatters:
      "Counting objects by touching each one in sequence — and saying exactly one number per object — is called one-to-one correspondence. Many children who can recite numbers can't yet do this reliably; they rush, skip, or double-count. This matching of 'one count = one object' is the crucial conceptual step that turns counting from a recitation into a tool for understanding how many things actually exist.",
    tryAtHome:
      "Put 1–5 small objects on the table. Ask your child to count them by touching each one as they say the number. Slow and careful matters more than fast.",
    celebration:
      "Your child can count real objects accurately to 5. They understand that counting is about matching numbers to things — a real mathematical concept.",
  },

  "NUM-B-03": {
    whyMatters:
      "Knowing what the numeral '3' looks like and that it refers to three things is different from being able to count — both skills matter. A child who can count but not recognise written numerals can't read a price tag, a score, or a page number. Written numeral recognition connects spoken counting to the symbols used in every maths context they will encounter in school and life.",
    tryAtHome:
      "Write the numbers 1–5 on small cards. Ask your child to place the right number of objects (coins, raisins, blocks) next to each card.",
    celebration:
      "Your child can recognise and name the numerals 1 to 5. Numbers written on a page now mean something real to them.",
  },

  // ── Numeracy — Developing ───────────────────────────────────────────────

  "NUM-D-01": {
    whyMatters:
      "Counting accurately to 10 with real objects — touching each one and saying exactly one number — is solid early number sense. Extending this to 10 is not trivial: children who lose track, double-count, or rush at higher numbers are showing that the skill isn't yet secure. When counting to 10 is reliable, it forms a stable platform for all the addition, subtraction, and comparison that comes next in Primary 1.",
    tryAtHome:
      "Ask your child to count out exactly 7 grapes, 8 blocks, or 9 stickers. Praise slow, careful one-by-one counting — accuracy matters more than speed.",
    celebration:
      "Your child can count 10 objects accurately every time. Their number sense is solid and they're ready for what comes next.",
  },

  "NUM-D-02": {
    whyMatters:
      "Knowing what '7' looks like and that it means seven things extends the connection between symbols and quantities all the way to 10. This is the numeral range used in early Primary 1 maths, including worksheets, number lines, and exercises. A child who can read all numerals to 10 on sight will engage with Primary 1 maths material without the extra cognitive load of decoding what each number says.",
    tryAtHome:
      "Write the numbers 1–10 in random order on paper. Call out a number and ask your child to point to it as fast as they can.",
    celebration:
      "Your child knows all the numerals from 1 to 10. Written numbers are now a language they can read.",
  },

  "NUM-D-03": {
    whyMatters:
      "Comparing two quantities — deciding which pile has more — is the beginning of mathematical thinking and reasoning. This goes beyond simply counting: the child must hold two counts in mind simultaneously and compare them. This comparative thinking is the conceptual backbone of subtraction and inequality, which are introduced in the first weeks of Primary 1 maths. Getting this secure now gives children a meaningful head start.",
    tryAtHome:
      "Put two groups of objects on the table (e.g. 4 vs. 7 blocks). Ask 'which group has more?' then count together to check. Then swap the amounts and ask again.",
    celebration:
      "Your child can look at two groups and say which has more or fewer. They're starting to think mathematically.",
  },

  "NUM-D-04": {
    whyMatters:
      "Sorting — grouping things by a shared property like colour or size — is how children first experience categories and logical rules. It is the foundation of pattern recognition and data classification, and it directly underlies the concept of sets in maths. A child who can sort by one rule confidently is developing the logical thinking skills that structure all of mathematics. It looks like play, but it's genuinely early mathematical reasoning.",
    tryAtHome:
      "Sort household items together by colour or size. 'Can you put all the red ones here and all the blue ones there?' Then change the rule: 'Now sort by size.'",
    celebration:
      "Your child can sort things by a consistent rule. They're thinking logically — a real mathematical skill that surprises many adults.",
  },

  // ── Numeracy — Secure ───────────────────────────────────────────────────

  "NUM-S-01": {
    whyMatters:
      "Counting and sequencing to 20 is the direct preparation for the addition and subtraction introduced in Primary 1, which typically works within the range 1–20. A child who can count fluently to 20 — forwards and without hesitation — is ready to work with a number line, understand place value at the most basic level, and handle the arithmetic their first weeks of school will require.",
    tryAtHome:
      "Count together whenever you can — up the stairs, cars in the car park, or items in the shopping trolley. Aim for 20. Ask: 'Can you count back from 10 to 1?'",
    celebration:
      "Your child can count all the way to 20. They're fully prepared for the number range used in Primary 1 maths.",
  },

  "NUM-S-02": {
    whyMatters:
      "Geometry begins with shapes. Knowing that a triangle has 3 sides and 3 corners — and that a circle has no corners — is the start of spatial reasoning, which is one of the three core strands of primary school maths alongside number and measurement. Shape knowledge also helps children describe the world precisely and supports early writing, since letters are made of lines and curves. This is genuine early geometry.",
    tryAtHome:
      "Spot shapes around the house together. 'The window is a rectangle — how many sides? The clock is a circle — does it have any corners?' Let your child lead the counting.",
    celebration:
      "Your child knows their 2D shapes and can say what makes each one different. Early geometry is underway.",
  },

  "NUM-S-03": {
    whyMatters:
      "Adding and subtracting within 5 are the first formal maths operations — exactly where Primary 1 begins. A child who has experienced this informally (using fingers, objects, or everyday situations) will enter school with a conceptual head start, experiencing the maths as familiar rather than completely new. Getting this secure before school means the first weeks of maths class feel like reinforcement, not discovery.",
    tryAtHome:
      "Use fingers for simple sums during snack time. 'You have 3 biscuits and I give you 2 more — how many is that? Let's count.' Then take some away.",
    celebration:
      "Your child can add and subtract within 5. They have arrived at Primary 1 maths — fully ready.",
  },

  // ── Social & Emotional Development — Beginning ─────────────────────────

  "SED-B-01": {
    whyMatters:
      "Naming emotions is the first step to understanding and managing them. A child who cannot name what they're feeling is stuck — they can feel the emotion but have no way to think about it or communicate it. Research consistently shows that emotional vocabulary is one of the strongest predictors of positive peer relationships and behavioural self-regulation in school. Four named emotions is a meaningful starting threshold.",
    tryAtHome:
      "Look at photos together — family photos, story books, or even your child's face in a mirror. Ask 'How is this person feeling? How can you tell?' Let your child lead the guessing.",
    celebration:
      "Your child can name the basic emotions — happy, sad, angry, scared. This vocabulary will serve them every single day of their life.",
  },

  "SED-B-02": {
    whyMatters:
      "Following a sequence of steps independently — without being told each time — shows self-regulation: the ability to manage behaviour in relation to expectations. This is one of the most important school-readiness skills. Children who have this tend to transition to new environments more easily, experience less anxiety in structured settings, and maintain friendships more successfully. This is not just about rules — it's about a child feeling confident and in control.",
    tryAtHome:
      "Set a short home routine together (e.g. arrive home → shoes off → wash hands → snack). Let your child lead the steps without reminders. Praise when they complete it independently.",
    celebration:
      "Your child can follow a routine without being reminded. They're building the self-management skills that make school feel safe and predictable.",
  },

  "SED-B-03": {
    whyMatters:
      "Turn-taking is an early social contract — the first agreement children learn to make and keep with another person. It requires impulse control (waiting when you want to go), perspective-taking (understanding that the other person also gets a turn), and trust (believing your turn will come). These three capacities together are foundational to friendship, collaborative work, and social belonging throughout school and life.",
    tryAtHome:
      "Play a simple board game or card game. When it's not your child's turn, say 'Now we wait — it's my turn!' and model patient waiting. Praise when they wait without being told.",
    celebration:
      "Your child can wait for their turn and let others have theirs. They're showing the self-control that strong friendships are built on.",
  },

  // ── Social & Emotional Development — Developing ────────────────────────

  "SED-D-01": {
    whyMatters:
      "Connecting emotions to their causes — 'she's sad because her friend left' — shows developing empathy and causal reasoning. This is more sophisticated than simply naming an emotion: it requires the child to build a mental model of another person's experience and trace how an event led to a feeling. This skill directly underlies conflict resolution, friendship repair, and the ability to comfort others, all of which are central to social belonging in school.",
    tryAtHome:
      "When watching a show together, pause at an emotional moment. Ask 'Why do you think he feels that way? What happened just before?' Let your child work it out without jumping in.",
    celebration:
      "Your child can explain why a character feels the way they do. That's empathy — one of the most important skills they'll ever develop.",
  },

  "SED-D-02": {
    whyMatters:
      "Putting feelings into words — 'I'm frustrated' instead of hitting — is a major step in emotional self-management. It requires the child to pause in a moment of strong feeling, identify what the feeling is, find words for it, and use them. This is cognitively demanding, which is why it takes time to develop. Once secure, it transforms a child's ability to resolve conflicts, navigate disagreements, and maintain relationships under stress.",
    tryAtHome:
      "When your child is frustrated, ask 'Can you tell me what's bothering you?' Give them time to find words. Resist filling in the blanks for them — the struggle to find words is the learning.",
    celebration:
      "Your child is using words for their feelings instead of acting out. That's emotional intelligence — hard-won and genuinely impressive.",
  },

  "SED-D-03": {
    whyMatters:
      "Distinguishing between helpful and unhelpful actions shows that a child is developing a moral compass — an internal sense of what is right and kind. This goes beyond following rules: the child is beginning to reason about the impact of behaviour on others. This moral reasoning directly underlies prosocial behaviour, the ability to be a good friend, and the kind of behaviour that makes a child a valued classroom member in Primary 1.",
    tryAtHome:
      "Describe a simple scenario: 'Someone takes your toy without asking — is that helpful or not helpful? What would be a better way?' Talk it through without judging their first answer.",
    celebration:
      "Your child can tell the difference between helpful and unhelpful behaviour. They're developing moral reasoning — knowing why being kind matters.",
  },

  "SED-D-04": {
    whyMatters:
      "Noticing that a friend is upset and choosing to respond with care — offering comfort, staying nearby, or fetching a teacher — is empathy in action. This is the bridge from understanding emotions to acting on that understanding. Children who show this kind of prosocial behaviour build stronger friendships, are more welcome in peer groups, and tend to experience school as a positive and supportive environment.",
    tryAtHome:
      "If a sibling or friend is upset, quietly ask your child 'What do you think you could do to help them feel better?' Support whatever they try, however small.",
    celebration:
      "Your child notices when a friend is struggling and responds with care. That's genuine kindness — and it will open doors throughout their life.",
  },

  // ── Social & Emotional Development — Secure ────────────────────────────

  "SED-S-01": {
    whyMatters:
      "Naming a feeling and explaining why — without being asked — is advanced emotional literacy. It means the child is monitoring their own emotional state, reflecting on what's driving it, and choosing to communicate that to another person. This combination of self-awareness, reflection, and communication is what psychologists call emotional intelligence. It predicts better mental health outcomes, stronger relationships, and greater academic resilience throughout school.",
    tryAtHome:
      "At the end of the day, ask 'How were you feeling today? What made you feel that way?' Then listen without correcting or reframing. Their words matter more than the right answer.",
    celebration:
      "Your child can name their feelings and explain why, without being prompted. That's emotional intelligence at work — something to be genuinely proud of.",
  },

  "SED-S-02": {
    whyMatters:
      "Coming up with a solution to a conflict without adult intervention — 'what if we both take turns?' — is one of the most sophisticated social skills a preschooler can demonstrate. It requires simultaneously holding two perspectives, generating an option that works for both, and having the confidence to propose it. Children with this skill navigate peer groups much more successfully and are better prepared for the collaborative demands of Primary 1.",
    tryAtHome:
      "If a sibling argument comes up, step back and say 'Can you two figure out a fair solution together?' Step in only if they're stuck for more than a minute. Their independent attempt matters.",
    celebration:
      "Your child can propose a solution to a conflict without help. This is strong social competence — rare and genuinely valuable at their age.",
  },

  "SED-S-03": {
    whyMatters:
      "Taking responsibility within a group — tidying up, helping set up, following through on a class task without being watched — shows that a child has internalised the idea that they belong to something larger than themselves. This sense of social responsibility is exactly what teachers look for when assessing P1 readiness, where group learning is the primary mode of instruction. It also predicts leadership qualities that become increasingly important through school.",
    tryAtHome:
      "Give your child a small home responsibility — setting the table, tidying their books, feeding a pet. Thank them afterwards: 'You really helped the family today.' Specific, genuine appreciation matters.",
    celebration:
      "Your child takes responsibility for group tasks without being reminded. They're showing the kind of character that makes them a great classmate — and a great person.",
  },
};

export function getMilestoneContent(milestoneId: string): MilestoneContent | undefined {
  return CONTENT[milestoneId];
}
