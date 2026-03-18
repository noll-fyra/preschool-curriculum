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

  // ── Aesthetics & Creative Expression — Beginning ────────────────────────

  "ACE-B-01": {
    whyMatters:
      "Freely exploring art materials — mixing colours, pressing clay, making marks with a brush — is where creative development begins. At this stage, the process matters far more than the product. When a child squishes paint between their fingers or smears colours across a page, they are developing sensory awareness, fine motor skills, and the deep understanding that they can change things in the world through their own actions. This is the creative impulse in its earliest, purest form.",
    tryAtHome:
      "Set out a piece of paper and whatever you have — crayons, chalk, finger paints — and let your child make whatever they want with no instructions. Don't ask 'what is it?' — just say 'tell me about this!'",
    celebration:
      "Your child dives in and explores art materials freely. They're not waiting to be shown what to do — they're creating. That's where all artistic confidence begins.",
  },

  "ACE-B-02": {
    whyMatters:
      "Joining in with songs, rhythm, and music-making is one of the earliest forms of belonging. Children who participate in group music activities are developing listening skills, memory, language, and social synchrony — the ability to do something at the same time as others. Research shows that musical participation in early childhood is linked to stronger language development, better phonological awareness, and a greater sense of community.",
    tryAtHome:
      "Sing a favourite song together on the way to school or at bathtime. It doesn't matter if it's out of tune — what matters is that you're doing it together and your child joins in.",
    celebration:
      "Your child joins in with songs and music activities. They're learning to listen, synchronise, and belong — through music.",
  },

  "ACE-B-03": {
    whyMatters:
      "Pretending — playing house, being a doctor, using a block as a phone — is one of the most cognitively rich things a young child can do. Role play requires the ability to hold two realities at once (this block IS a phone, but it's also a block), which is a precursor to abstract thinking. It also develops language, empathy (seeing the world from another character's perspective), and narrative understanding. Children who engage in rich imaginative play consistently demonstrate stronger reading comprehension later.",
    tryAtHome:
      "Set aside 10 minutes for unstructured play with a few props — a scarf, some cups, a toy animal. Resist directing the story. Let your child take the lead and follow along if they invite you in.",
    celebration:
      "Your child can lose themselves in imaginative play. That's not just fun — it's some of the most valuable learning they can do.",
  },

  // ── Aesthetics & Creative Expression — Developing ───────────────────────

  "ACE-D-01": {
    whyMatters:
      "When a child draws 'our house' or makes a sculpture 'that's a rocket', they have crossed from pure sensory exploration into intentional expression. They are now using art as a language — choosing marks, shapes, and materials to represent something they have in mind. This is a significant shift: the child is thinking ahead, making decisions, and communicating meaning. These are the same cognitive processes used in writing, where the goal is to encode what you mean into a form others can understand.",
    tryAtHome:
      "Ask your child to draw something they love — a favourite food, their bedroom, a superhero. When they're done, ask: 'Tell me about what you made.' Listen to what they say — the idea is as important as the drawing.",
    celebration:
      "Your child creates artwork with a clear idea in mind. They're using art as a language — and that means they have something to say.",
  },

  "ACE-D-02": {
    whyMatters:
      "Singing a whole song correctly — with the right tune and most of the words — shows musical memory, phonological processing, and language development all working together. The ability to hold a melody and lyrics simultaneously in working memory while producing them in sequence is genuinely demanding. Children who can do this are also typically stronger at sequencing in other areas, including narrative comprehension and early reading.",
    tryAtHome:
      "Choose a favourite song from class or a film and practise it together at home. Focus on getting the full song — including verses that are easy to skip. Sing it through from start to finish.",
    celebration:
      "Your child can sing a whole song with the right tune and words. That's memory, music, and language all in one.",
  },

  "ACE-D-03": {
    whyMatters:
      "Combining materials — adding collage to a drawing, mixing paint colours deliberately, using clay alongside found objects — shows that a child is thinking about art as a set of tools that can be used together. This is multi-modal thinking: the ability to draw on different resources and modes of expression and combine them purposefully. It's the artistic equivalent of using vocabulary and grammar together to construct meaning — rather than just individual words.",
    tryAtHome:
      "Offer two art materials at once — crayons and torn paper for collage, or paint and leaves. Invite your child to use both in the same picture. Talk about why they chose to combine them.",
    celebration:
      "Your child combines different materials in a single creation. They're thinking like an artist — using whatever tools serve the idea.",
  },

  "ACE-D-04": {
    whyMatters:
      "Moving differently to fast versus slow music shows that a child is genuinely listening — not just hearing. This kind of active musical engagement develops auditory discrimination, rhythmic sensitivity, and the ability to translate sound into physical response. It is also the foundation of performance: understanding that music has character and mood, and that the body and voice can reflect that. Children who respond to music this way tend to engage more deeply with all art forms as they grow.",
    tryAtHome:
      "At home, play two contrasting pieces of music — something fast and energetic, then something slow and gentle. Ask your child to show you what the music feels like through movement. There's no wrong answer.",
    celebration:
      "Your child moves with the music — fast when it's fast, slow when it's slow. They're not just hearing it; they're feeling it.",
  },

  // ── Aesthetics & Creative Expression — Secure ───────────────────────────

  "ACE-S-01": {
    whyMatters:
      "Talking about why they made a creative choice — 'I used dark blue because it looked like night' — shows that a child is not just making, but reflecting. This metacognitive layer — thinking about thinking, or in this case, thinking about creating — is the same skill that underlies self-correction in writing, reasoning in maths, and critical thinking in science. Arts education that includes reflection builds some of the most transferable skills in all of learning.",
    tryAtHome:
      "After your child finishes a drawing or craft, ask one specific question: 'Why did you choose that colour?' or 'What was the hardest part to make?' One good question beats a dozen vague ones.",
    celebration:
      "Your child can talk about the choices they made in their artwork. They're not just creating — they're thinking about creating. That's artistic maturity.",
  },

  "ACE-S-02": {
    whyMatters:
      "Performing for others — even just for the class — builds confidence, public communication, and a positive relationship with being seen. Children who can hold an audience's attention, vary their voice or expression, and sustain a performance to completion are developing skills that serve them in presentations, debates, interviews, and leadership throughout their education. The arts are one of the few school contexts where emotional expression is not just allowed but required.",
    tryAtHome:
      "Create a small 'stage' at home — a cleared space, maybe a makeshift curtain. Let your child perform a song, a story, or a dance for the family. Applaud warmly and ask what their favourite part was.",
    celebration:
      "Your child performs with expression and confidence. Whatever they do next in life, being comfortable in front of others will help them do it better.",
  },

  "ACE-S-03": {
    whyMatters:
      "Collaborative storytelling — where children build a shared narrative across many turns, negotiate roles, and maintain a consistent imaginary world together — is among the most sophisticated social and cognitive activities a preschooler can engage in. It requires active listening, flexible thinking, negotiation, and creative improvisation. Children who do this well are practising the very skills that underlie collaborative writing, group projects, and teamwork throughout their school lives.",
    tryAtHome:
      "Start a story together with your child: 'Once upon a time there was a small dragon who lived in the park...' Then let your child continue. Take turns adding one sentence at a time. See where the story goes.",
    celebration:
      "Your child can build a story together with others — taking turns, adding ideas, and keeping the world alive. That's creativity, language, and social skill all at once.",
  },

  // ── Discovery of the World — Beginning ─────────────────────────────────

  "DOW-B-01": {
    whyMatters:
      "Noticing that the puddle dried up, the plant grew taller, or the sky changed colour is the first act of scientific observation. Before a child can experiment or reason about the world, they must first notice that the world changes — and that some changes are worth paying attention to. This attentiveness to observable change is the precursor to all inquiry-based learning. Children who are taught to notice become children who ask questions.",
    tryAtHome:
      "On a walk, ask your child: 'What looks different from last week?' Or watch a puddle over the course of a day and ask: 'What do you think will happen to it?' Wondering together counts.",
    celebration:
      "Your child notices changes in the world around them. That watchfulness is the very beginning of scientific thinking.",
  },

  "DOW-B-02": {
    whyMatters:
      "Asking 'why does the moon follow us?' or 'how does the bird know where to go?' shows a mind that is actively trying to make sense of the world. Curiosity is not something that can be taught — but it can be either nurtured or suppressed. Children who ask questions freely, and whose questions are treated as valuable, build the motivation to keep investigating. Curiosity is the engine of all learning, in science and far beyond.",
    tryAtHome:
      "When your child asks a 'why' question, resist looking it up immediately. Ask: 'What do you think? What's your guess?' First ideas — even wrong ones — are valuable. Then look it up together.",
    celebration:
      "Your child asks big questions about how and why things work. That curiosity is one of the most valuable things they can have.",
  },

  "DOW-B-03": {
    whyMatters:
      "Sorting rocks as rough or smooth, or leaves as big or small, is the beginning of empirical classification — the foundation of all scientific taxonomy, data organisation, and logical thinking. Before children can reason about categories, they must first be able to observe properties directly and group things accordingly. This skill, developed with natural materials, transfers directly to mathematical sorting, data handling in primary school, and scientific classification in later years.",
    tryAtHome:
      "Collect a small handful of objects from a walk — leaves, pebbles, sticks. Ask your child to sort them into two groups any way they choose, then name the rule they used. There's no wrong answer.",
    celebration:
      "Your child can group objects by what they observe. They're thinking like a scientist — sorting the world into patterns that make sense.",
  },

  // ── Discovery of the World — Developing ────────────────────────────────

  "DOW-D-01": {
    whyMatters:
      "Making a prediction before testing something — 'I think the heavy one will sink' — is the first act of hypothesis formation. It shows that a child is not just reacting to the world but actively reasoning about it before the evidence arrives. This predictive thinking is the core of the scientific method, but it also develops mathematical reasoning, reading comprehension (predicting what happens next), and planning skills. Children who predict are children who think ahead.",
    tryAtHome:
      "Before any household experiment — a recipe, mixing drinks, anything that changes — ask your child: 'What do you think will happen?' Write it down if you can. Then check after. Being wrong is fine and interesting.",
    celebration:
      "Your child makes predictions before testing things. They're thinking like a scientist — forming ideas before they see the answer.",
  },

  "DOW-D-02": {
    whyMatters:
      "Comparing two materials — noticing that one is hard and light while the other is soft and heavy — requires simultaneous observation across multiple dimensions. This multi-attribute comparison is far more cognitively demanding than naming a single property, and it is the foundation of controlled experiments, where the goal is to isolate one variable at a time. It also builds precise descriptive language, which directly supports writing across all subject areas.",
    tryAtHome:
      "Give your child two objects from the kitchen — a wooden spoon and a metal spoon, a plastic cup and a glass. Ask: 'How are these the same? How are they different?' Go for at least two differences.",
    celebration:
      "Your child can compare two objects and describe how they're both similar and different. That's careful scientific thinking.",
  },

  "DOW-D-03": {
    whyMatters:
      "Remembering and describing what was found out — not just what was done — shows that learning actually happened during the investigation. Many children can describe the activity ('we put things in water') but not the observation ('the rubber duck floated and the metal spoon sank'). The ability to recall and communicate findings is the bridge between doing and understanding, and it directly mirrors what scientists do when they record and report results.",
    tryAtHome:
      "After a class experiment your child tells you about, ask: 'What did you actually find out? What did you notice?' Follow up with 'why do you think that happened?' — and be curious, not testing.",
    celebration:
      "Your child can recall what they found out — not just what they did. Real learning has happened, and they can talk about it.",
  },

  "DOW-D-04": {
    whyMatters:
      "Understanding that a tree is alive and a rock isn't — and being able to explain why — introduces children to one of science's most fundamental classifications. Knowing that living things grow, need food and water, and respond to their environment gives children a framework for understanding biology, ecology, and ultimately what it means to be alive. This concept is visited and revisited throughout all science education, and establishing a correct intuition now prevents misconceptions that are hard to unlearn later.",
    tryAtHome:
      "On a walk, point to different things — a plant, a cloud, a bird, a car — and ask: 'Is that living or not living? How do you know?' Let your child reason it out and explain their thinking.",
    celebration:
      "Your child can tell living from non-living things and explain why. That's a foundational science concept — and they've got it.",
  },

  // ── Discovery of the World — Secure ────────────────────────────────────

  "DOW-S-01": {
    whyMatters:
      "Following the steps of a simple experiment — setting it up, observing what happens, and describing the process — is the complete scientific cycle in miniature. A child who can do this has understood that knowledge is produced through deliberate, ordered action and careful observation: not just told, not guessed, but found out. This procedural understanding underpins science education at every level, from primary school to university.",
    tryAtHome:
      "Try a simple experiment at home: dissolve salt vs. sand in water, or float different objects. Ask your child to explain to you what you did and what you found — as if you were telling a friend who wasn't there.",
    celebration:
      "Your child can conduct a simple experiment and explain what happened step by step. They're doing science — not just learning about it.",
  },

  "DOW-S-02": {
    whyMatters:
      "Stating a cause-and-effect relationship — 'the ice melted because the room got warm' — is one of the most cognitively demanding things a young child can do. It requires connecting two separate events in time, understanding that one caused the other, and expressing that relationship in language. Causal reasoning is foundational to science, maths problem-solving, reading comprehension (understanding story motivation), and everyday logical thinking.",
    tryAtHome:
      "During any change you observe together — ice melting, bread toasting, plants wilting — ask: 'What happened? And why do you think that happened?' Encourage full sentences with 'because'.",
    celebration:
      "Your child can explain why something happened, not just what happened. Cause-and-effect reasoning — that's scientific thinking fully in motion.",
  },

  "DOW-S-03": {
    whyMatters:
      "Connecting what was learned at school to something in their own life — 'that's like when our bread went mouldy' — is how knowledge becomes truly owned. This transfer of learning, from one context to another, is the deepest form of understanding. It shows that the concept has not just been memorised but genuinely internalised. Children who make these connections tend to have stronger long-term retention and a more positive relationship with learning because knowledge feels relevant and alive.",
    tryAtHome:
      "When you hear about something your child is learning at school, ask: 'Can you think of anything at home that's like that?' Give them time to think. Even a loose connection shows real thinking.",
    celebration:
      "Your child can connect what they learned at school to their own life. That's the deepest kind of understanding — when learning becomes personal.",
  },

  // ── Health, Safety & Motor Skills — Beginning ───────────────────────────

  "HMS-B-01": {
    whyMatters:
      "Moving confidently in space — running without tripping, jumping over a step, climbing a low structure — builds the physical foundation for everything from PE to handwriting. Gross motor development underlies fine motor development: children who struggle with large body movements often struggle with the precise small ones too. Confident physical movers tend to be more willing to take risks in learning and to engage in active play, which has consistent benefits for cognitive development, attention, and wellbeing.",
    tryAtHome:
      "Spend 15 minutes at a playground or open space. Watch how your child moves — encourage jumping over cracks, hopping along a line, or climbing where it's safe. Physical confidence is built through opportunity.",
    celebration:
      "Your child moves with coordination and confidence. A strong body is a foundation for a strong mind — and they're building both.",
  },

  "HMS-B-02": {
    whyMatters:
      "A functional pencil grip — holding a pencil between the thumb and first two fingers — allows for the controlled, efficient marks that drawing and eventually writing require. Children who grip with their whole fist can make marks but cannot produce the fine motor movements needed for letter formation. Getting the grip right early prevents compensatory habits that become harder to correct with age. This is one physical skill worth addressing gently and consistently before formal writing begins.",
    tryAtHome:
      "Offer pencils and paper for free drawing at home. If you notice a full-fist grip, try a short, chunky pencil or a triangular grip — these make the correct hold more natural. Don't force it; just offer.",
    celebration:
      "Your child is holding their pencil correctly. That might seem small, but it will make drawing and writing so much easier for them.",
  },

  "HMS-B-03": {
    whyMatters:
      "Following basic safety rules — walking inside, not pushing on stairs, telling an adult about injuries — shows that a child understands the purpose of rules, not just the content. Children who follow safety rules are also learning to self-regulate impulses, to anticipate consequences, and to take responsibility for their own wellbeing. These are the same cognitive capacities involved in following classroom academic rules, managing behaviour during lessons, and eventually self-managing study.",
    tryAtHome:
      "At home, have a short conversation about two or three safety rules — and the reason behind each one. 'We walk inside because the floor is hard and we could hurt ourselves.' Understanding the why makes the rule much more likely to stick.",
    celebration:
      "Your child follows safety rules without being reminded. They understand that rules protect — and they're taking responsibility for their own safety.",
  },

  // ── Health, Safety & Motor Skills — Developing ──────────────────────────

  "HMS-D-01": {
    whyMatters:
      "Hopping on one foot and skipping with alternating feet are bilateral coordination skills — they require both sides of the body to work in a coordinated sequence. This kind of cross-lateral movement is strongly associated with brain development, particularly the development of the corpus callosum, which connects the brain's two hemispheres. Children who develop bilateral coordination well tend to show stronger reading and writing skills, as these tasks also require the two halves of the brain to work together efficiently.",
    tryAtHome:
      "Practise hopping and skipping in the corridor or at the park. Make it a game — hop 5 times on one foot, then the other. Skipping takes most children a while to get right; celebrate every attempt.",
    celebration:
      "Your child can hop and skip. These movements seem playful but they reflect coordination in the brain as well as the body.",
  },

  "HMS-D-02": {
    whyMatters:
      "Using scissors correctly — thumb up, moving the paper not just the scissors, cutting along a line — requires both hands to work together doing different jobs simultaneously. This bilateral fine motor coordination is also used in buttoning clothes, tying laces, and eventually in using a keyboard. Children who develop scissor skills on time tend to have stronger overall fine motor control, which directly affects the ease and quality of their handwriting in Primary 1.",
    tryAtHome:
      "Set up simple cutting activities at home — straight lines drawn on paper, then curved ones. Hold the paper for your child at first if needed. The key habits to build: thumb up, and move the paper toward the scissors.",
    celebration:
      "Your child can cut along a line. Their hands are working together skillfully — and that coordination will serve them in writing and so much more.",
  },

  "HMS-D-03": {
    whyMatters:
      "Washing hands correctly and independently — at the right times, with soap, for long enough — is one of the highest-impact health habits a young child can develop. It directly reduces the transmission of gastrointestinal illness, respiratory illness, and skin infections. Teaching the habit now, when children are in a critical period for habit formation, means it becomes automatic rather than something that needs reminding. The habit of good handwashing in early childhood has been shown to reduce sick days throughout the school years.",
    tryAtHome:
      "Make handwashing a consistent part of the home routine — before eating and after the toilet, every time. Sing the 'Happy Birthday' song twice to time it (about 20 seconds). Make it a habit, not a negotiation.",
    celebration:
      "Your child washes their hands correctly without being told. That one habit will keep them healthier throughout their life.",
  },

  "HMS-D-04": {
    whyMatters:
      "Identifying a hazard and explaining why it's dangerous — 'running near the pool means you could slip and fall in' — shows that safety knowledge has moved from rule-following to genuine understanding. A child who understands why something is dangerous will generalise that understanding to new situations they haven't been specifically told about. This kind of risk reasoning is the basis of lifelong safety, from road sense to fire safety to online safety as they grow.",
    tryAtHome:
      "At home and outdoors, ask your child: 'Can you see anything here that could be dangerous? Why?' Treat every answer as thoughtful — the reasoning matters, not the perfect answer.",
    celebration:
      "Your child can spot danger and explain why it's risky. They're thinking about safety — not just following rules — and that will protect them their whole life.",
  },

  // ── Health, Safety & Motor Skills — Secure ──────────────────────────────

  "HMS-S-01": {
    whyMatters:
      "Catching a thrown ball reliably requires the eyes and hands to work together in real time — a skill called hand-eye coordination. This visual-motor integration is also used in reading (tracking text across a page), writing (controlling a pen while looking at what you're producing), and many team sports and activities throughout school life. Physical confidence with a ball also contributes to social inclusion: children who can participate in playground ball games are more likely to be included in peer groups.",
    tryAtHome:
      "Practise catching at home — start close and close-range, with a large soft ball, and increase distance gradually. Five minutes of catching practice is meaningful. Celebrate near-catches as well as successful ones.",
    celebration:
      "Your child can catch a ball! Eyes and hands working together — that's coordination, and it opens up so many games and activities ahead.",
  },

  "HMS-S-02": {
    whyMatters:
      "Drawing a recognisable person with head, body, limbs, and face details is one of the clearest indicators of fine motor development and body-schema awareness. Developmental psychologists use this measure as a standard assessment of overall development in early childhood. A complex figure drawing requires planning (where will the parts go?), fine motor control (producing the shapes), and spatial reasoning (relative size and placement of parts). These skills transfer directly to letter formation, spacing, and layout in writing.",
    tryAtHome:
      "Ask your child to draw a picture of your family. Afterwards, ask them to tell you who each person is and point out the different body parts. Don't correct proportions — celebrate the attempt and the detail.",
    celebration:
      "Your child can draw a whole person. That level of detail shows fine motor control, body awareness, and planning — all in one drawing.",
  },

  "HMS-S-03": {
    whyMatters:
      "Understanding why healthy habits matter — not just following them — marks the shift from compliance to agency. A child who can explain 'I need sleep so my body can rest and grow' has internalised a health concept in a way that makes them far more likely to maintain that habit independently, resist peer pressure against it, and extend the reasoning to new situations. Health literacy — understanding the why behind healthy choices — is the foundation of lifelong wellbeing.",
    tryAtHome:
      "During meals, bedtime, or outdoor play, ask your child: 'Why is this good for us?' Don't just accept 'it's healthy' — ask 'but why?' You'll be surprised what they know, and what they come up with.",
    celebration:
      "Your child understands why healthy habits matter. That knowledge is the foundation of taking care of themselves — for the rest of their life.",
  },
};

export function getMilestoneContent(milestoneId: string): MilestoneContent | undefined {
  return CONTENT[milestoneId];
}
