// All 20 tap-to-select activity configs for the student demo.
// Each has a pool of questions; the player picks 3 per session.
// Audio prompts are shown as text (simulating audio delivery).

import { shuffleDeterministic } from "./seeded-shuffle";

export interface QuestionOption {
  id: string;
  label: string;
}

export interface ActivityQuestion {
  id: string;
  scene?: string;   // emoji / short scene description
  prompt: string;   // question text (normally spoken aloud)
  options: QuestionOption[];
  correctId: string;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export interface ActivityConfig {
  milestoneId: string;
  name: string;
  emoji: string;
  isDynamic?: boolean; // if true, questions are generated at runtime (LL-B-01)
  questions: ActivityQuestion[];
  /** Milestone IDs this activity trains (admin-editable; defaults to [milestoneId]) */
  skillMilestoneIds?: string[];
}

// ─── Language & Literacy ────────────────────────────────────────────────────

// LL-B-01 — Find your name card
// Questions are generated dynamically at runtime from the child's name.
// The `questions` array here is a fallback / used as a template.
export const LL_B_01: ActivityConfig = {
  milestoneId: "LL-B-01",
  name: "Find your name card",
  emoji: "🪪",
  isDynamic: true,
  questions: [], // populated dynamically
};

// LL-B-02 — Tap the letter named
export const LL_B_02: ActivityConfig = {
  milestoneId: "LL-B-02",
  name: "Tap the letter named",
  emoji: "🔤",
  questions: [
    {
      id: "llb02-1",
      scene: "🦁  A  🦁",
      prompt: 'Tap the letter  A !',
      options: [{ id: "A", label: "A" }, { id: "B", label: "B" }, { id: "D", label: "D" }, { id: "P", label: "P" }],
      correctId: "A",
      feedbackCorrect: "That's A! Great job! 🌟",
      feedbackWrong: "Let's try again! Which one is A?",
    },
    {
      id: "llb02-2",
      scene: "🐰  B  🐰",
      prompt: 'Tap the letter  B !',
      options: [{ id: "D", label: "D" }, { id: "B", label: "B" }, { id: "P", label: "P" }, { id: "Q", label: "Q" }],
      correctId: "B",
      feedbackCorrect: "That's B! Brilliant! 🌟",
      feedbackWrong: "Look carefully! Which one is B?",
    },
    {
      id: "llb02-3",
      scene: "🐦  M  🐦",
      prompt: 'Tap the letter  M !',
      options: [{ id: "N", label: "N" }, { id: "W", label: "W" }, { id: "M", label: "M" }, { id: "H", label: "H" }],
      correctId: "M",
      feedbackCorrect: "That's M! Amazing! 🌟",
      feedbackWrong: "Let's find M! Try again!",
    },
    {
      id: "llb02-4",
      scene: "🐒  S  🐒",
      prompt: 'Tap the letter  S !',
      options: [{ id: "S", label: "S" }, { id: "Z", label: "Z" }, { id: "C", label: "C" }, { id: "G", label: "G" }],
      correctId: "S",
      feedbackCorrect: "That's S! Super! 🌟",
      feedbackWrong: "Which one is S? Try again!",
    },
    {
      id: "llb02-5",
      scene: "🦁  T  🦁",
      prompt: 'Tap the letter  T !',
      options: [{ id: "F", label: "F" }, { id: "I", label: "I" }, { id: "T", label: "T" }, { id: "L", label: "L" }],
      correctId: "T",
      feedbackCorrect: "That's T! Terrific! 🌟",
      feedbackWrong: "Find the T! Try again!",
    },
  ],
};

// LL-B-03 — Which way does the worm read?
export const LL_B_03: ActivityConfig = {
  milestoneId: "LL-B-03",
  name: "Which way does the worm read?",
  emoji: "🐛",
  questions: [
    {
      id: "llb03-1",
      scene: "📖  🐛 ___________",
      prompt: "The worm wants to read the story! Which way should it go?",
      options: [{ id: "left", label: "⬅️  This way" }, { id: "right", label: "➡️  This way" }],
      correctId: "right",
      feedbackCorrect: "That's right! We read this way! ➡️",
      feedbackWrong: "Oops! We read the other way! ➡️",
    },
    {
      id: "llb03-2",
      scene: "📗  🐌 ___________",
      prompt: "The snail wants to read! Which direction does it go?",
      options: [{ id: "right", label: "➡️  This way" }, { id: "left", label: "⬅️  This way" }],
      correctId: "right",
      feedbackCorrect: "Yes! We always read left to right! ➡️",
      feedbackWrong: "Let's go the other way! We read left to right! ➡️",
    },
    {
      id: "llb03-3",
      scene: "📘  🐜 ___________",
      prompt: "Which way does the ant walk to read the words?",
      options: [{ id: "left", label: "⬅️  Left" }, { id: "right", label: "➡️  Right" }],
      correctId: "right",
      feedbackCorrect: "Right! Words go from left to right! ➡️",
      feedbackWrong: "Try the other arrow! We read left to right! ➡️",
    },
    {
      id: "llb03-4",
      scene: "📕  🐛  ⬇️  next line",
      prompt: "The worm finished one line. Which way does it go next?",
      options: [{ id: "down", label: "⬇️  Down to next line" }, { id: "up", label: "⬆️  Back up" }],
      correctId: "down",
      feedbackCorrect: "Correct! We read top to bottom! ⬇️",
      feedbackWrong: "We go down to the next line! ⬇️",
    },
  ],
};

// LL-D-01 — Match uppercase to lowercase door
export const LL_D_01: ActivityConfig = {
  milestoneId: "LL-D-01",
  name: "Match uppercase to lowercase",
  emoji: "🚪",
  questions: [
    {
      id: "lld01-1",
      scene: "🚪🚪🚪   Big letter:  A",
      prompt: "This big letter A is looking for its little partner! Which door has the small letter?",
      options: [{ id: "b", label: "b" }, { id: "a", label: "a" }, { id: "d", label: "d" }],
      correctId: "a",
      feedbackCorrect: "A and a are friends! They match! 🎉",
      feedbackWrong: "Not quite! Try another door!",
    },
    {
      id: "lld01-2",
      scene: "🚪🚪🚪   Big letter:  B",
      prompt: "Find the little partner for B! Tap the right door!",
      options: [{ id: "d", label: "d" }, { id: "p", label: "p" }, { id: "b", label: "b" }],
      correctId: "b",
      feedbackCorrect: "B and b match! Well done! 🎉",
      feedbackWrong: "Look carefully! B and which small letter go together?",
    },
    {
      id: "lld01-3",
      scene: "🚪🚪🚪   Big letter:  M",
      prompt: "Which door has the small letter that matches M?",
      options: [{ id: "m", label: "m" }, { id: "n", label: "n" }, { id: "w", label: "w" }],
      correctId: "m",
      feedbackCorrect: "M and m are a perfect pair! 🎉",
      feedbackWrong: "Try again! Find the small m!",
    },
    {
      id: "lld01-4",
      scene: "🌺🌺🌺   Big letter:  S",
      prompt: "Find the flower with the small letter that matches S!",
      options: [{ id: "z", label: "z" }, { id: "s", label: "s" }, { id: "c", label: "c" }],
      correctId: "s",
      feedbackCorrect: "S and s match perfectly! 🎉",
      feedbackWrong: "Look again! Which one matches S?",
    },
    {
      id: "lld01-5",
      scene: "🪟🪟🪟   Big letter:  G",
      prompt: "Which window has the small letter that goes with G?",
      options: [{ id: "q", label: "q" }, { id: "c", label: "c" }, { id: "g", label: "g" }],
      correctId: "g",
      feedbackCorrect: "G and g — great match! 🎉",
      feedbackWrong: "Try another window! Find the small g!",
    },
  ],
};

// LL-D-02 — What sound does this word start with?
export const LL_D_02: ActivityConfig = {
  milestoneId: "LL-D-02",
  name: "What sound does this word start with?",
  emoji: "🔊",
  questions: [
    {
      id: "lld02-1",
      scene: "🍌",
      prompt: "Banana! What sound does BANANA start with? Tap the letter!",
      options: [{ id: "B", label: "B" }, { id: "M", label: "M" }, { id: "S", label: "S" }],
      correctId: "B",
      feedbackCorrect: "Yes! Banana starts with B! 🌟",
      feedbackWrong: "Listen... B-anana. What does it start with?",
    },
    {
      id: "lld02-2",
      scene: "🐱",
      prompt: "Cat! What sound does CAT start with? Tap the letter!",
      options: [{ id: "D", label: "D" }, { id: "C", label: "C" }, { id: "G", label: "G" }],
      correctId: "C",
      feedbackCorrect: "Yes! Cat starts with C! 🌟",
      feedbackWrong: "C-at... it starts with C! Try again!",
    },
    {
      id: "lld02-3",
      scene: "🐟",
      prompt: "Fish! What sound does FISH start with? Tap the letter!",
      options: [{ id: "V", label: "V" }, { id: "P", label: "P" }, { id: "F", label: "F" }],
      correctId: "F",
      feedbackCorrect: "Yes! Fish starts with F! 🌟",
      feedbackWrong: "F-ish! It starts with F!",
    },
    {
      id: "lld02-4",
      scene: "🌞",
      prompt: "Sun! What sound does SUN start with? Tap the letter!",
      options: [{ id: "S", label: "S" }, { id: "Z", label: "Z" }, { id: "C", label: "C" }],
      correctId: "S",
      feedbackCorrect: "Yes! Sun starts with S! 🌟",
      feedbackWrong: "S-un! Try again — it starts with S!",
    },
    {
      id: "lld02-5",
      scene: "🪁",
      prompt: "Kite! What sound does KITE start with? Tap the letter!",
      options: [{ id: "G", label: "G" }, { id: "K", label: "K" }, { id: "T", label: "T" }],
      correctId: "K",
      feedbackCorrect: "Yes! Kite starts with K! 🌟",
      feedbackWrong: "K-ite! It starts with K!",
    },
  ],
};

// LL-D-03 — Find the sight word on the card
export const LL_D_03: ActivityConfig = {
  milestoneId: "LL-D-03",
  name: "Find the sight word",
  emoji: "🃏",
  questions: [
    {
      id: "lld03-1",
      scene: "🃏 🃏 🃏",
      prompt: 'Find the word  THE ! Tap the card that says THE!',
      options: [{ id: "this", label: "this" }, { id: "the", label: "the" }, { id: "that", label: "that" }],
      correctId: "the",
      feedbackCorrect: "That's THE! You know that word! 🌟",
      feedbackWrong: "Listen again — find THE!",
    },
    {
      id: "lld03-2",
      scene: "🃏 🃏 🃏",
      prompt: 'Find the word  MY ! Tap the card that says MY!',
      options: [{ id: "by", label: "by" }, { id: "my", label: "my" }, { id: "me", label: "me" }],
      correctId: "my",
      feedbackCorrect: "That's MY! Well done! 🌟",
      feedbackWrong: "Find MY! Try again!",
    },
    {
      id: "lld03-3",
      scene: "🃏 🃏 🃏",
      prompt: 'Find the word  GO ! Tap the card that says GO!',
      options: [{ id: "go", label: "go" }, { id: "to", label: "to" }, { id: "do", label: "do" }],
      correctId: "go",
      feedbackCorrect: "That's GO! Fantastic! 🌟",
      feedbackWrong: "Find GO! Look at the letters carefully!",
    },
    {
      id: "lld03-4",
      scene: "🃏 🃏 🃏",
      prompt: 'Find the word  IS ! Tap the card that says IS!',
      options: [{ id: "it", label: "it" }, { id: "in", label: "in" }, { id: "is", label: "is" }],
      correctId: "is",
      feedbackCorrect: "That's IS! You got it! 🌟",
      feedbackWrong: "Find IS! Try again!",
    },
    {
      id: "lld03-5",
      scene: "🃏 🃏 🃏",
      prompt: 'Find the word  AND ! Tap the card that says AND!',
      options: [{ id: "on", label: "on" }, { id: "an", label: "an" }, { id: "and", label: "and" }],
      correctId: "and",
      feedbackCorrect: "That's AND! Brilliant! 🌟",
      feedbackWrong: "Find AND! Look for the d at the end!",
    },
  ],
};

// LL-D-04 — Put the story pictures in order
export const LL_D_04: ActivityConfig = {
  milestoneId: "LL-D-04",
  name: "Put the story in order",
  emoji: "📚",
  questions: [
    {
      id: "lld04-1",
      scene: "🥚  🐣  🐥",
      prompt: "Which picture comes FIRST in the story? Tap it!",
      options: [{ id: "egg", label: "🥚 Egg in nest" }, { id: "hatch", label: "🐣 Chick hatching" }, { id: "walk", label: "🐥 Chick walking" }],
      correctId: "egg",
      feedbackCorrect: "Yes! The egg comes first! 🌟",
      feedbackWrong: "Think about what happens at the very beginning!",
    },
    {
      id: "lld04-2",
      scene: "🌱  🌸  🌰",
      prompt: "Which picture comes SECOND in the story? A seed grew into...?",
      options: [{ id: "flower", label: "🌸 Flower blooming" }, { id: "seed", label: "🌰 A seed" }, { id: "sprout", label: "🌱 A little sprout" }],
      correctId: "sprout",
      feedbackCorrect: "Yes! The sprout comes second! 🌟",
      feedbackWrong: "What grows first from a seed? Try again!",
    },
    {
      id: "lld04-3",
      scene: "🌅  🥣  🏫",
      prompt: "Which picture comes FIRST? What do we do when we wake up?",
      options: [{ id: "school", label: "🏫 Go to school" }, { id: "wake", label: "🌅 Wake up" }, { id: "breakfast", label: "🥣 Eat breakfast" }],
      correctId: "wake",
      feedbackCorrect: "Right! We wake up first! 🌟",
      feedbackWrong: "What's the very first thing in the morning? Try again!",
    },
    {
      id: "lld04-4",
      scene: "🤝  🎮  👋",
      prompt: "Which picture comes LAST in this friendship story?",
      options: [{ id: "meet", label: "🤝 Meet a friend" }, { id: "play", label: "🎮 Play together" }, { id: "bye", label: "👋 Wave goodbye" }],
      correctId: "bye",
      feedbackCorrect: "Yes! Saying goodbye comes last! 🌟",
      feedbackWrong: "Think about what happens at the very end of playing!",
    },
    {
      id: "lld04-5",
      scene: "🥣  🧑‍🍳  🎂",
      prompt: "Which picture comes SECOND? What do we do after gathering ingredients?",
      options: [{ id: "empty", label: "🥣 Empty bowl" }, { id: "mix", label: "🧑‍🍳 Mix ingredients" }, { id: "cake", label: "🎂 Finished cake" }],
      correctId: "mix",
      feedbackCorrect: "Yes! We mix the ingredients next! 🌟",
      feedbackWrong: "After the empty bowl, what do we do? Try again!",
    },
  ],
};

// LL-S-01 — Blend the sounds, tap the picture
export const LL_S_01: ActivityConfig = {
  milestoneId: "LL-S-01",
  name: "Blend the sounds",
  emoji: "🔡",
  questions: [
    {
      id: "lls01-1",
      scene: "c... a... t  →  CAT",
      prompt: "Listen to the sounds... c... a... t. What word is that? Tap the picture!",
      options: [{ id: "cat", label: "🐱 cat" }, { id: "bat", label: "🦇 bat" }, { id: "bus", label: "🚌 bus" }],
      correctId: "cat",
      feedbackCorrect: "CAT! You blended it! 🌟",
      feedbackWrong: "Listen again... c...a...t. What does that make?",
    },
    {
      id: "lls01-2",
      scene: "s... u... n  →  SUN",
      prompt: "Listen... s... u... n. Tap the picture!",
      options: [{ id: "sun", label: "☀️ sun" }, { id: "run", label: "🏃 run" }, { id: "cup", label: "☕ cup" }],
      correctId: "sun",
      feedbackCorrect: "SUN! Amazing blending! 🌟",
      feedbackWrong: "s...u...n... try again!",
    },
    {
      id: "lls01-3",
      scene: "d... o... g  →  DOG",
      prompt: "Listen... d... o... g. Tap the picture!",
      options: [{ id: "log", label: "🪵 log" }, { id: "dog", label: "🐶 dog" }, { id: "hat", label: "🎩 hat" }],
      correctId: "dog",
      feedbackCorrect: "DOG! Brilliant blending! 🌟",
      feedbackWrong: "d...o...g... which picture is that?",
    },
    {
      id: "lls01-4",
      scene: "p... i... n  →  PIN",
      prompt: "Listen... p... i... n. Tap the picture!",
      options: [{ id: "pin", label: "📌 pin" }, { id: "bin", label: "🗑️ bin" }, { id: "pan", label: "🍳 pan" }],
      correctId: "pin",
      feedbackCorrect: "PIN! You got it! 🌟",
      feedbackWrong: "p...i...n... listen carefully!",
    },
    {
      id: "lls01-5",
      scene: "h... o... p  →  HOP",
      prompt: "Listen... h... o... p. Tap the picture!",
      options: [{ id: "top", label: "🪀 top" }, { id: "hop", label: "🐸 hop" }, { id: "mop", label: "🧹 mop" }],
      correctId: "hop",
      feedbackCorrect: "HOP! Excellent blending! 🌟",
      feedbackWrong: "h...o...p... try again!",
    },
  ],
};

// LL-S-02 — Read the sentence, tap the scene
export const LL_S_02: ActivityConfig = {
  milestoneId: "LL-S-02",
  name: "Read the sentence",
  emoji: "📜",
  questions: [
    {
      id: "lls02-1",
      scene: '"The dog runs."',
      prompt: 'Read this sentence: "The dog runs." Tap the picture that shows what it says!',
      options: [{ id: "dog-run", label: "🐶💨 A dog running" }, { id: "cat-sit", label: "🐱🪑 A cat sitting" }, { id: "dog-eat", label: "🐶🍖 A dog eating" }],
      correctId: "dog-run",
      feedbackCorrect: "You read it! The dog runs! 🌟",
      feedbackWrong: 'Listen again — "The dog runs." Which picture shows that?',
    },
    {
      id: "lls02-2",
      scene: '"My cat is big."',
      prompt: 'Read: "My cat is big." Tap the right picture!',
      options: [{ id: "big-cat", label: "🐱⬆️ A big cat" }, { id: "small-cat", label: "🐱⬇️ A small cat" }, { id: "big-dog", label: "🐶⬆️ A big dog" }],
      correctId: "big-cat",
      feedbackCorrect: "My cat is BIG! You read it! 🌟",
      feedbackWrong: 'Read it again — "My cat is big."',
    },
    {
      id: "lls02-3",
      scene: '"She is at the mat."',
      prompt: 'Read: "She is at the mat." Tap the right picture!',
      options: [{ id: "girl-mat", label: "👧🪆 Girl on a mat" }, { id: "boy-mat", label: "👦🪆 Boy on a mat" }, { id: "girl-chair", label: "👧🪑 Girl on a chair" }],
      correctId: "girl-mat",
      feedbackCorrect: "She is at the mat! 🌟",
      feedbackWrong: 'Try again — "She is at the mat."',
    },
    {
      id: "lls02-4",
      scene: '"We go in."',
      prompt: 'Read: "We go in." Tap the right picture!',
      options: [{ id: "in", label: "🚪➡️ Going inside" }, { id: "out", label: "🚪⬅️ Going outside" }, { id: "up", label: "⬆️ Going up" }],
      correctId: "in",
      feedbackCorrect: "We go IN! You read it! 🌟",
      feedbackWrong: '"We go in" — which direction?',
    },
  ],
};

// LL-S-03 — Answer a question about the story
export const LL_S_03: ActivityConfig = {
  milestoneId: "LL-S-03",
  name: "Answer a question about the story",
  emoji: "📖",
  questions: [
    {
      id: "lls03-1",
      scene: "🐱 Story: Mia has a cat. The cat is orange. It likes fish.",
      prompt: "What colour is Mia's cat? Tap the right answer!",
      options: [{ id: "orange", label: "🟠 Orange" }, { id: "black", label: "⚫ Black" }, { id: "white", label: "⚪ White" }],
      correctId: "orange",
      feedbackCorrect: "The cat is orange! You understood the story! 🌟",
      feedbackWrong: "Let's listen again... The cat is orange.",
    },
    {
      id: "lls03-2",
      scene: "🐶 Story: Sam has a dog. The dog is small. Sam loves the dog.",
      prompt: "What is Sam's dog like? Tap the right answer!",
      options: [{ id: "big", label: "⬆️ Big" }, { id: "small", label: "⬇️ Small" }, { id: "fast", label: "💨 Fast" }],
      correctId: "small",
      feedbackCorrect: "The dog is small! Great listening! 🌟",
      feedbackWrong: "Listen again... The dog is small.",
    },
    {
      id: "lls03-3",
      scene: "🌳 Story: Ben went to the park. He saw a big tree. He sat under it.",
      prompt: "Where did Ben sit? Tap the right answer!",
      options: [{ id: "tree", label: "🌳 Under the tree" }, { id: "bench", label: "🪑 On a bench" }, { id: "grass", label: "🌿 On the grass" }],
      correctId: "tree",
      feedbackCorrect: "He sat under the tree! 🌟",
      feedbackWrong: "Let's listen again... He sat under the tree.",
    },
    {
      id: "lls03-4",
      scene: "🍎 Story: Lily is hungry. She sees an apple. She eats it up!",
      prompt: "Why does Lily eat the apple? Tap the right answer!",
      options: [{ id: "hungry", label: "😋 She is hungry" }, { id: "bored", label: "😐 She is bored" }, { id: "thirsty", label: "💧 She is thirsty" }],
      correctId: "hungry",
      feedbackCorrect: "She eats because she is hungry! 🌟",
      feedbackWrong: "Listen again... Lily is hungry.",
    },
  ],
};

// ─── Numeracy ───────────────────────────────────────────────────────────────

// NUM-B-01 — Tap the animals into their numbered spots
export const NUM_B_01: ActivityConfig = {
  milestoneId: "NUM-B-01",
  name: "Count the animals to 10",
  emoji: "🐸",
  questions: [
    {
      id: "numb01-1",
      scene: "🐸🐸🐸🐸🐸  ponds: 1 2 3 4 5 6 7 8 9 10",
      prompt: "Let's count the frogs into their ponds! How many ponds are there? Tap the number!",
      options: [{ id: "8", label: "8" }, { id: "9", label: "9" }, { id: "10", label: "10" }, { id: "7", label: "7" }],
      correctId: "10",
      feedbackCorrect: "10 ponds! You counted to 10! 🎉",
      feedbackWrong: "Count again — 1, 2, 3... all the way to 10!",
    },
    {
      id: "numb01-2",
      scene: "🦆🦆🦆🦆🦆🦆🦆  nests: 1 2 3 4 5 6 7 8 9 10",
      prompt: "Count the duck nests! Which number comes after 9?",
      options: [{ id: "8", label: "8" }, { id: "11", label: "11" }, { id: "10", label: "10" }, { id: "9", label: "9" }],
      correctId: "10",
      feedbackCorrect: "10 comes after 9! Great counting! 🎉",
      feedbackWrong: "After 9 comes... 10! Try again!",
    },
    {
      id: "numb01-3",
      scene: "🐝🐝🐝  flowers: 1 2 3 4 5 6 7 8 9 10",
      prompt: "Count with the bees! Which number comes after 7?",
      options: [{ id: "6", label: "6" }, { id: "9", label: "9" }, { id: "8", label: "8" }, { id: "10", label: "10" }],
      correctId: "8",
      feedbackCorrect: "8 comes after 7! Brilliant counting! 🎉",
      feedbackWrong: "Count along: 6, 7, ... what comes next?",
    },
    {
      id: "numb01-4",
      scene: "🐟🐟🐟🐟  jars: 1 2 3 4 5 6 7 8 9 10",
      prompt: "Count the fish jars! Which number comes after 5?",
      options: [{ id: "4", label: "4" }, { id: "7", label: "7" }, { id: "6", label: "6" }, { id: "5", label: "5" }],
      correctId: "6",
      feedbackCorrect: "6 comes after 5! You're counting so well! 🎉",
      feedbackWrong: "5, then... 6! Try again!",
    },
  ],
};

// NUM-B-02 — Count the objects, tap the number (1–5)
export const NUM_B_02: ActivityConfig = {
  milestoneId: "NUM-B-02",
  name: "Count objects 1–5",
  emoji: "🍎",
  questions: [
    {
      id: "numb02-1",
      scene: "🍎🍎🍎",
      prompt: "How many apples are on the plate? Count them and tap the number!",
      options: [{ id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "3",
      feedbackCorrect: "Yes! 3 apples! 🌟",
      feedbackWrong: "Let's count together — 1, 2, 3... try again!",
    },
    {
      id: "numb02-2",
      scene: "⭐⭐",
      prompt: "How many stars are there? Tap the number!",
      options: [{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }],
      correctId: "2",
      feedbackCorrect: "Yes! 2 stars! 🌟",
      feedbackWrong: "Count the stars — 1, 2. Try again!",
    },
    {
      id: "numb02-3",
      scene: "🌸🌸🌸🌸🌸",
      prompt: "How many flowers are there? Count and tap the number!",
      options: [{ id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }, { id: "2", label: "2" }],
      correctId: "5",
      feedbackCorrect: "5 flowers! Great counting! 🌟",
      feedbackWrong: "Count each flower — 1, 2, 3, 4, 5!",
    },
    {
      id: "numb02-4",
      scene: "🐟🐟🐟🐟",
      prompt: "How many fish are in the bowl? Tap the number!",
      options: [{ id: "3", label: "3" }, { id: "5", label: "5" }, { id: "4", label: "4" }, { id: "2", label: "2" }],
      correctId: "4",
      feedbackCorrect: "4 fish! Excellent! 🌟",
      feedbackWrong: "Count each fish carefully — there are 4!",
    },
    {
      id: "numb02-5",
      scene: "⚽",
      prompt: "How many balls are there? Tap the number!",
      options: [{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }],
      correctId: "1",
      feedbackCorrect: "1 ball! That's right! 🌟",
      feedbackWrong: "Count again — just 1 ball!",
    },
  ],
};

// NUM-B-03 — Tap the numeral called (1–5)
export const NUM_B_03: ActivityConfig = {
  milestoneId: "NUM-B-03",
  name: "Tap the numeral 1–5",
  emoji: "🔢",
  questions: [
    {
      id: "numb03-1",
      scene: "🃏 1  🃏 2  🃏 3  🃏 4  🃏 5",
      prompt: "Tap the number  4 !",
      options: [{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "4",
      feedbackCorrect: "That's 4! Well done! 🌟",
      feedbackWrong: "That's not 4 — let's find it!",
    },
    {
      id: "numb03-2",
      scene: "⭐ 1  ⭐ 2  ⭐ 3  ⭐ 4  ⭐ 5",
      prompt: "Tap the number  2 !",
      options: [{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "2",
      feedbackCorrect: "That's 2! 🌟",
      feedbackWrong: "Find the number 2!",
    },
    {
      id: "numb03-3",
      scene: "🐶 1  🐶 2  🐶 3  🐶 4  🐶 5",
      prompt: "Tap the number  5 !",
      options: [{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "5",
      feedbackCorrect: "That's 5! Fantastic! 🌟",
      feedbackWrong: "Find the 5!",
    },
    {
      id: "numb03-4",
      scene: "🌟 1  🌟 2  🌟 3  🌟 4  🌟 5",
      prompt: "Tap the number  1 !",
      options: [{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "1",
      feedbackCorrect: "That's 1! 🌟",
      feedbackWrong: "Find the number 1!",
    },
    {
      id: "numb03-5",
      scene: "🦋 1  🦋 2  🦋 3  🦋 4  🦋 5",
      prompt: "Tap the number  3 !",
      options: [{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "3",
      feedbackCorrect: "That's 3! Great job! 🌟",
      feedbackWrong: "Find the 3!",
    },
  ],
};

// NUM-D-01 — Count the objects, tap the number (6–10)
export const NUM_D_01: ActivityConfig = {
  milestoneId: "NUM-D-01",
  name: "Count objects 6–10",
  emoji: "🥭",
  questions: [
    {
      id: "numd01-1",
      scene: "🥭🥭🥭🥭🥭🥭🥭",
      prompt: "How many mangoes are in the basket? Count carefully and tap the number!",
      options: [{ id: "6", label: "6" }, { id: "7", label: "7" }, { id: "8", label: "8" }, { id: "9", label: "9" }],
      correctId: "7",
      feedbackCorrect: "7 mangoes! Excellent counting! 🌟",
      feedbackWrong: "Count each one carefully — there are 7!",
    },
    {
      id: "numd01-2",
      scene: "🚗🚗🚗🚗🚗🚗🚗🚗🚗",
      prompt: "How many cars are there? Count them all!",
      options: [{ id: "7", label: "7" }, { id: "8", label: "8" }, { id: "9", label: "9" }, { id: "10", label: "10" }],
      correctId: "9",
      feedbackCorrect: "9 cars! Great counting! 🌟",
      feedbackWrong: "Count each car — there are 9!",
    },
    {
      id: "numd01-3",
      scene: "✏️✏️✏️✏️✏️✏️",
      prompt: "How many pencils are there? Count and tap!",
      options: [{ id: "5", label: "5" }, { id: "6", label: "6" }, { id: "7", label: "7" }, { id: "8", label: "8" }],
      correctId: "6",
      feedbackCorrect: "6 pencils! Brilliant! 🌟",
      feedbackWrong: "Count again — there are 6 pencils!",
    },
    {
      id: "numd01-4",
      scene: "🍂🍂🍂🍂🍂🍂🍂🍂🍂🍂",
      prompt: "How many leaves are there? Count them all!",
      options: [{ id: "8", label: "8" }, { id: "9", label: "9" }, { id: "10", label: "10" }, { id: "7", label: "7" }],
      correctId: "10",
      feedbackCorrect: "10 leaves! You counted to 10! 🌟",
      feedbackWrong: "Count each leaf — there are 10!",
    },
  ],
};

// NUM-D-02 — Find the numeral on the washing line (1–10)
export const NUM_D_02: ActivityConfig = {
  milestoneId: "NUM-D-02",
  name: "Find the numeral 1–10",
  emoji: "🔢",
  questions: [
    {
      id: "numd02-1",
      scene: "📎 1  2  4  6  8  9  10  3  7  5 📎",
      prompt: "Find the number  8  on the washing line! Tap it!",
      options: [{ id: "6", label: "6" }, { id: "8", label: "8" }, { id: "9", label: "9" }, { id: "3", label: "3" }],
      correctId: "8",
      feedbackCorrect: "That's 8! 🌟",
      feedbackWrong: "Look for the 8 — try again!",
    },
    {
      id: "numd02-2",
      scene: "📎 3  7  1  9  5  2  8  4  6  10 📎",
      prompt: "Find the number  6  on the washing line! Tap it!",
      options: [{ id: "9", label: "9" }, { id: "6", label: "6" }, { id: "5", label: "5" }, { id: "2", label: "2" }],
      correctId: "6",
      feedbackCorrect: "That's 6! 🌟",
      feedbackWrong: "Find the 6 — be careful with 9!",
    },
    {
      id: "numd02-3",
      scene: "📎 2  5  8  1  4  7  10  3  6  9 📎",
      prompt: "Find the number  3  on the washing line! Tap it!",
      options: [{ id: "8", label: "8" }, { id: "3", label: "3" }, { id: "5", label: "5" }, { id: "2", label: "2" }],
      correctId: "3",
      feedbackCorrect: "That's 3! 🌟",
      feedbackWrong: "Find 3 — don't mix it up with 8!",
    },
    {
      id: "numd02-4",
      scene: "📎 6  9  4  2  7  5  10  1  8  3 📎",
      prompt: "Find the number  9  on the washing line! Tap it!",
      options: [{ id: "6", label: "6" }, { id: "9", label: "9" }, { id: "7", label: "7" }, { id: "4", label: "4" }],
      correctId: "9",
      feedbackCorrect: "That's 9! 🌟",
      feedbackWrong: "Find 9 — look carefully, not 6!",
    },
  ],
};

// NUM-D-03 — Which plate has more / fewer?
export const NUM_D_03: ActivityConfig = {
  milestoneId: "NUM-D-03",
  name: "Which plate has more or fewer?",
  emoji: "🍓",
  questions: [
    {
      id: "numd03-1",
      scene: "🍓🍓🍓  vs  🍓🍓🍓🍓🍓🍓🍓",
      prompt: "Which plate has MORE strawberries? Tap it!",
      options: [{ id: "left", label: "🍽️ Left plate (3)" }, { id: "right", label: "🍽️ Right plate (7)" }],
      correctId: "right",
      feedbackCorrect: "Right! That plate has MORE — 7 is more than 3! 🌟",
      feedbackWrong: "Let's count — left has 3, right has 7. Which is more?",
    },
    {
      id: "numd03-2",
      scene: "🪙🪙🪙🪙🪙🪙  vs  🪙🪙",
      prompt: "Which plate has FEWER coins? Tap it!",
      options: [{ id: "left", label: "🍽️ Left plate (6)" }, { id: "right", label: "🍽️ Right plate (2)" }],
      correctId: "right",
      feedbackCorrect: "Right! 2 is fewer than 6! 🌟",
      feedbackWrong: "FEWER means less — which plate has less?",
    },
    {
      id: "numd03-3",
      scene: "🐟🐟🐟🐟  vs  🐟🐟🐟🐟🐟",
      prompt: "Which plate has MORE fish? Tap it!",
      options: [{ id: "left", label: "🍽️ Left plate (4)" }, { id: "right", label: "🍽️ Right plate (5)" }],
      correctId: "right",
      feedbackCorrect: "Right! 5 is more than 4! 🌟",
      feedbackWrong: "Left has 4, right has 5 — which is more?",
    },
    {
      id: "numd03-4",
      scene: "🧊🧊🧊🧊🧊🧊🧊🧊  vs  🧊🧊🧊",
      prompt: "Which plate has FEWER blocks? Tap it!",
      options: [{ id: "left", label: "🍽️ Left plate (8)" }, { id: "right", label: "🍽️ Right plate (3)" }],
      correctId: "right",
      feedbackCorrect: "Right! 3 is fewer than 8! 🌟",
      feedbackWrong: "FEWER means the smaller amount — which is less?",
    },
  ],
};

// NUM-D-04 — Sort the objects into bins
export const NUM_D_04: ActivityConfig = {
  milestoneId: "NUM-D-04",
  name: "Sort the objects into bins",
  emoji: "🗂️",
  questions: [
    {
      id: "numd04-1",
      scene: "🔴🔵🔴🔵🔴  Bin 1: Red  Bin 2: Blue",
      prompt: "Sort by COLOUR! How many RED things should go in the red bin?",
      options: [{ id: "2", label: "2 things" }, { id: "3", label: "3 things" }, { id: "4", label: "4 things" }],
      correctId: "3",
      feedbackCorrect: "3 red things go in the red bin! 🌟",
      feedbackWrong: "Count the red things — there are 3!",
    },
    {
      id: "numd04-2",
      scene: "⬛⬜⬛⬜⬛⬜  Bin 1: Black  Bin 2: White",
      prompt: "Sort by COLOUR! How many WHITE things go in the white bin?",
      options: [{ id: "2", label: "2 things" }, { id: "3", label: "3 things" }, { id: "4", label: "4 things" }],
      correctId: "3",
      feedbackCorrect: "3 white things! You sorted correctly! 🌟",
      feedbackWrong: "Count the white ones — there are 3!",
    },
    {
      id: "numd04-3",
      scene: "🔴🔴🔵🔵🔵🔵  Sort by colour",
      prompt: "Sort by COLOUR! How many BLUE things are there?",
      options: [{ id: "2", label: "2 blue" }, { id: "3", label: "3 blue" }, { id: "4", label: "4 blue" }],
      correctId: "4",
      feedbackCorrect: "4 blue things! Great sorting! 🌟",
      feedbackWrong: "Count the blue ones — there are 4!",
    },
    {
      id: "numd04-4",
      scene: "🔺🔺🔺⬛⬛  Sort: triangles vs squares",
      prompt: "Sort by SHAPE! How many triangles should go in the triangle bin?",
      options: [{ id: "2", label: "2 triangles" }, { id: "3", label: "3 triangles" }, { id: "4", label: "4 triangles" }],
      correctId: "3",
      feedbackCorrect: "3 triangles! You sorted by shape! 🌟",
      feedbackWrong: "Count the triangles — there are 3!",
    },
  ],
};

// NUM-S-01 — Fill the missing numbers on the train
export const NUM_S_01: ActivityConfig = {
  milestoneId: "NUM-S-01",
  name: "Fill the missing numbers on the train",
  emoji: "🚂",
  questions: [
    {
      id: "nums01-1",
      scene: "🚂 1  2  3  ?  5  6  7  8  9  10",
      prompt: "Some numbers are missing from the train! What number goes in the empty carriage?",
      options: [{ id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "4",
      feedbackCorrect: "4! The train is complete! 🚂🌟",
      feedbackWrong: "What comes after 3? Try again!",
    },
    {
      id: "nums01-2",
      scene: "🚂 1  2  3  4  5  6  ?  8  9  10",
      prompt: "What number goes in the empty carriage after 6?",
      options: [{ id: "6", label: "6" }, { id: "7", label: "7" }, { id: "8", label: "8" }],
      correctId: "7",
      feedbackCorrect: "7! Chugga chugga! 🚂🌟",
      feedbackWrong: "After 6 comes... try again!",
    },
    {
      id: "nums01-3",
      scene: "🚂 11  12  ?  14  15  16  17  18  19  20",
      prompt: "What number is missing? It goes between 12 and 14.",
      options: [{ id: "11", label: "11" }, { id: "13", label: "13" }, { id: "15", label: "15" }],
      correctId: "13",
      feedbackCorrect: "13! The train goes all the way to 20! 🚂🌟",
      feedbackWrong: "Between 12 and 14 is... try again!",
    },
    {
      id: "nums01-4",
      scene: "🚂 6  7  8  9  ?  11  12  13  14  15",
      prompt: "What number is missing after 9?",
      options: [{ id: "9", label: "9" }, { id: "10", label: "10" }, { id: "11", label: "11" }],
      correctId: "10",
      feedbackCorrect: "10! All aboard! 🚂🌟",
      feedbackWrong: "After 9 comes... 10! Try again!",
    },
    {
      id: "nums01-5",
      scene: "🚂 15  16  17  ?  19  20",
      prompt: "What number is missing between 17 and 19?",
      options: [{ id: "16", label: "16" }, { id: "18", label: "18" }, { id: "20", label: "20" }],
      correctId: "18",
      feedbackCorrect: "18! The train is full! 🚂🌟",
      feedbackWrong: "Between 17 and 19 is... try again!",
    },
  ],
};

// NUM-S-02 — Find the shape by its property
export const NUM_S_02: ActivityConfig = {
  milestoneId: "NUM-S-02",
  name: "Find the shape by its property",
  emoji: "🔺",
  questions: [
    {
      id: "nums02-1",
      scene: "🔺 △  □ ▭  ○  ⬡",
      prompt: "Find the shape that has 3 sides and 3 corners! Tap it!",
      options: [{ id: "square", label: "□ Square" }, { id: "triangle", label: "△ Triangle" }, { id: "circle", label: "○ Circle" }, { id: "rectangle", label: "▭ Rectangle" }],
      correctId: "triangle",
      feedbackCorrect: "A triangle has 3 sides! 🌟",
      feedbackWrong: "Count the sides — which has 3?",
    },
    {
      id: "nums02-2",
      scene: "🔵 △  □ ▭  ○  ⬡",
      prompt: "Find the shape that has NO straight sides! Tap it!",
      options: [{ id: "triangle", label: "△ Triangle" }, { id: "square", label: "□ Square" }, { id: "circle", label: "○ Circle" }, { id: "rectangle", label: "▭ Rectangle" }],
      correctId: "circle",
      feedbackCorrect: "A circle has no straight sides! 🌟",
      feedbackWrong: "Which shape is perfectly round with no corners?",
    },
    {
      id: "nums02-3",
      scene: "⬛ △  □ ▭  ○",
      prompt: "Find the shape that has 4 EQUAL sides! Tap it!",
      options: [{ id: "rectangle", label: "▭ Rectangle" }, { id: "triangle", label: "△ Triangle" }, { id: "square", label: "□ Square" }, { id: "circle", label: "○ Circle" }],
      correctId: "square",
      feedbackCorrect: "A square has 4 equal sides! 🌟",
      feedbackWrong: "4 equal sides — which shape is that?",
    },
    {
      id: "nums02-4",
      scene: "▭ △  □ ▭  ○",
      prompt: "Find the shape that has 4 sides but they are NOT all equal! Tap it!",
      options: [{ id: "square", label: "□ Square" }, { id: "circle", label: "○ Circle" }, { id: "rectangle", label: "▭ Rectangle" }, { id: "triangle", label: "△ Triangle" }],
      correctId: "rectangle",
      feedbackCorrect: "A rectangle has 4 sides, 2 long and 2 short! 🌟",
      feedbackWrong: "Which shape has 4 sides that aren't all equal?",
    },
    {
      id: "nums02-5",
      scene: "⬡ △  □ ○  ⬡",
      prompt: "Find the shape that has 6 sides! Tap it!",
      options: [{ id: "square", label: "□ Square" }, { id: "hexagon", label: "⬡ Hexagon" }, { id: "triangle", label: "△ Triangle" }, { id: "circle", label: "○ Circle" }],
      correctId: "hexagon",
      feedbackCorrect: "A hexagon has 6 sides! 🌟",
      feedbackWrong: "Count the sides — which has 6?",
    },
  ],
};

// NUM-S-03 — Story maths: how many now?
export const NUM_S_03: ActivityConfig = {
  milestoneId: "NUM-S-03",
  name: "Story maths",
  emoji: "➕",
  questions: [
    {
      id: "nums03-1",
      scene: "🐸🐸🐸  +  🐸🐸  =  ?",
      prompt: "3 frogs are on the log. 2 more frogs hop on. How many frogs are there NOW?",
      options: [{ id: "0", label: "0" }, { id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "5",
      feedbackCorrect: "3 and 2 makes 5! 🌟",
      feedbackWrong: "Count them together — 1, 2, 3... then 4, 5!",
    },
    {
      id: "nums03-2",
      scene: "🐦🐦🐦🐦  -  🐦  =  ?",
      prompt: "4 birds are on a wire. 1 bird flies away. How many birds are left?",
      options: [{ id: "0", label: "0" }, { id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "3",
      feedbackCorrect: "4 take away 1 is 3! 🌟",
      feedbackWrong: "4 birds, then 1 flies away — how many stay?",
    },
    {
      id: "nums03-3",
      scene: "🌸🌸  +  🌸🌸🌸  =  ?",
      prompt: "2 flowers in a vase. 3 more are added. How many flowers are there NOW?",
      options: [{ id: "0", label: "0" }, { id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "5",
      feedbackCorrect: "2 and 3 makes 5! 🌟",
      feedbackWrong: "Count them all — 1, 2... then 3, 4, 5!",
    },
    {
      id: "nums03-4",
      scene: "🐟🐟🐟🐟🐟  -  🐟🐟  =  ?",
      prompt: "5 fish in a bowl. 2 fish swim away. How many fish are left?",
      options: [{ id: "0", label: "0" }, { id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "3",
      feedbackCorrect: "5 take away 2 is 3! 🌟",
      feedbackWrong: "5 fish, 2 swim away — count what's left!",
    },
    {
      id: "nums03-5",
      scene: "👧👧👧  +  👧  =  ?",
      prompt: "3 children on a bench. 1 more child sits down. How many children are there NOW?",
      options: [{ id: "0", label: "0" }, { id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }, { id: "4", label: "4" }, { id: "5", label: "5" }],
      correctId: "4",
      feedbackCorrect: "3 and 1 makes 4! 🌟",
      feedbackWrong: "Count them all — 1, 2, 3, 4!",
    },
  ],
};

// ─── Registry ────────────────────────────────────────────────────────────────

export const ACTIVITY_CONFIGS: ActivityConfig[] = [
  LL_B_01, LL_B_02, LL_B_03,
  LL_D_01, LL_D_02, LL_D_03, LL_D_04,
  LL_S_01, LL_S_02, LL_S_03,
  NUM_B_01, NUM_B_02, NUM_B_03,
  NUM_D_01, NUM_D_02, NUM_D_03, NUM_D_04,
  NUM_S_01, NUM_S_02, NUM_S_03,
];

export function getActivityConfig(milestoneId: string): ActivityConfig | undefined {
  return ACTIVITY_CONFIGS.find((a) => a.milestoneId === milestoneId);
}

// Distractors pool for LL-B-01 (Find your name card)
export const NAME_DISTRACTORS = [
  "Aisha", "Rayan", "Mei", "Omar", "Priya", "Kai", "Sara", "Darius",
  "Lena", "Noah", "Zara", "Ivan", "Mia", "Ethan", "Lily", "Lucas",
  "Hana", "Adam", "Chloe", "Finn",
];

// Generate LL-B-01 questions dynamically for a given child name
export function generateNameCardQuestions(
  childName: string,
  seed: number,
): ActivityQuestion[] {
  const pool = NAME_DISTRACTORS.filter((n) => n !== childName);
  const shuffled = shuffleDeterministic(pool, seed);

  const questions: ActivityQuestion[] = [];
  for (let i = 0; i < 5; i++) {
    const distractors = shuffled.slice(i * 3, i * 3 + 3).map((name) => ({
      id: name,
      label: name,
    }));
    const options = shuffleDeterministic(
      [...distractors, { id: childName, label: childName }],
      (seed ^ (i + 1) * 0x9e3779b1) >>> 0,
    );
    questions.push({
      id: `llb01-${i + 1}`,
      scene: "🪪 🪪 🪪 🪪  Name cards on the table",
      prompt: "Can you find YOUR name? Tap the name card that belongs to you!",
      options,
      correctId: childName,
      feedbackCorrect: `That's you, ${childName}! Well done! 🌟`,
      feedbackWrong: "Let's look again — which one is YOUR name?",
    });
  }
  return questions;
}
