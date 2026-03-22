import type {
  Class,
  Teacher,
  Milestone,
  Child,
  ChildMilestoneProgress,
  ActivitySession,
  TeacherObservation,
  PlannedActivity,
  ActivityFeedback,
  ChatMessage,
  PersonalitySnapshot,
  TeacherStrategies,
  FamilyContext,
  TeacherNote,
  CalendarHoliday,
  ClassSchedule,
  Organisation,
  School,
  Employee,
  EmployeeSchoolRole,
  ClassTeacherAssignment,
  Parent,
  StudentParentLink,
  StudentEnrollment,
  ChildAttendance,
  DailyUpdate,
} from "./types";
import { getWeekStart } from "./assignments";

// ─── Milestones ────────────────────────────────────────────────────────────

export const MILESTONES: Milestone[] = [
  // Language & Literacy — Beginning
  {
    id: "LL-B-01",
    areaId: "LL",
    levelId: "B",
    sequence: 1,
    statement: "Recognises own name in print",
    parentDescription:
      "Your child can spot their own name written down — one of the very first reading moments.",
    teacherNotes:
      "Child correctly picks their own name card when presented alongside 4+ classmates' name cards — without prompting.",
  },
  {
    id: "LL-B-02",
    areaId: "LL",
    levelId: "B",
    sequence: 2,
    statement: "Identifies at least 10 letters of the alphabet by name",
    parentDescription:
      "Knowing letter names by sight is the foundation everything else builds on.",
    teacherNotes:
      "Child correctly names at least 10 letters when shown flashcards or letters pointed to in random order (not recited sequentially).",
  },
  {
    id: "LL-B-03",
    areaId: "LL",
    levelId: "B",
    sequence: 3,
    statement: "Understands that text is read left to right, top to bottom",
    parentDescription:
      "Knowing how to look at a page correctly is a key early literacy concept.",
    teacherNotes:
      "When reading together, child moves finger left to right across a line and drops down to the next line unprompted — not randomly pointing at text.",
  },

  // Language & Literacy — Developing
  {
    id: "LL-D-01",
    areaId: "LL",
    levelId: "D",
    sequence: 1,
    statement: "Matches all uppercase letters to their lowercase pairs",
    parentDescription:
      "Connecting 'A' with 'a' helps children read both printed books and handwriting.",
    teacherNotes:
      "Child correctly matches all 26 uppercase letters to their lowercase counterparts in a pairing task — not just the most common letters.",
  },
  {
    id: "LL-D-02",
    areaId: "LL",
    levelId: "D",
    sequence: 2,
    statement: "Identifies the beginning sound of familiar words",
    parentDescription:
      "Knowing that 'fish' starts with an 'f' sound is called phonemic awareness — the key to cracking reading.",
    teacherNotes:
      "When asked 'what sound does [word] start with?', child correctly isolates the initial phoneme across multiple familiar 3–4 letter words (e.g. cat, sun, dog).",
  },
  {
    id: "LL-D-03",
    areaId: "LL",
    levelId: "D",
    sequence: 3,
    statement:
      "Recognises 15+ common sight words (I, a, the, is, my, he, she, we, go, and, in, it, to, on, at)",
    parentDescription:
      "Sight words are read on sight without sounding out — building a bank of them makes reading much faster.",
    teacherNotes:
      "Child correctly reads at least 15 of the target sight words on sight — saying the whole word immediately without sounding out letter by letter.",
  },
  {
    id: "LL-D-04",
    areaId: "LL",
    levelId: "D",
    sequence: 4,
    statement:
      "Sequences 3–4 pictures to tell a simple story in correct order",
    parentDescription:
      "Ordering story pictures shows your child understands how events connect — a reading comprehension skill.",
    teacherNotes:
      "Child arranges 3–4 picture cards into a logical story sequence and can explain, in their own words, what happens at each step.",
  },

  // Language & Literacy — Secure
  {
    id: "LL-S-01",
    areaId: "LL",
    levelId: "S",
    sequence: 1,
    statement:
      "Blends consonant-vowel-consonant sounds to read simple words (e.g. cat, sun, pig)",
    parentDescription:
      "Blending sounds into words is the breakthrough moment in learning to read — a huge milestone.",
    teacherNotes:
      "Child hears individual phonemes (e.g. /k/–/a/–/t/) and blends them into the correct word across multiple CVC words — not just memorised examples.",
  },
  {
    id: "LL-S-02",
    areaId: "LL",
    levelId: "S",
    sequence: 2,
    statement: "Reads simple sentences using known sight words and phonics",
    parentDescription:
      "Reading short sentences independently shows everything is coming together.",
    teacherNotes:
      "Child reads a 4–6 word sentence aloud independently, using a combination of sight-word recall and phonics decoding for unfamiliar words.",
  },
  {
    id: "LL-S-03",
    areaId: "LL",
    levelId: "S",
    sequence: 3,
    statement:
      "Answers simple comprehension questions about a short passage read aloud",
    parentDescription:
      "Understanding what was just read — not just saying the words — is true reading comprehension.",
    teacherNotes:
      "After hearing a short passage, child correctly answers at least 2 of 3 'who', 'what', or 'why' questions — showing understanding, not just word-decoding.",
  },

  // Numeracy — Beginning
  {
    id: "NUM-B-01",
    areaId: "NUM",
    levelId: "B",
    sequence: 1,
    statement: "Rote counts aloud to 10 in correct sequence",
    parentDescription:
      "Counting to 10 in order is the starting point — like learning the alphabet before reading.",
    teacherNotes:
      "Child counts aloud from 1 to 10 in the correct sequence without prompting, skipping, or reversing — demonstrated on multiple occasions.",
  },
  {
    id: "NUM-B-02",
    areaId: "NUM",
    levelId: "B",
    sequence: 2,
    statement: "Counts objects 1–5 with one-to-one correspondence",
    parentDescription:
      "Matching one count to one object (not just saying numbers) is an important conceptual leap.",
    teacherNotes:
      "Child physically touches or moves each object once while counting a set of 1–5 objects, stopping at the correct total — not just reciting numbers.",
  },
  {
    id: "NUM-B-03",
    areaId: "NUM",
    levelId: "B",
    sequence: 3,
    statement: "Recognises and names written numerals 1–5",
    parentDescription:
      "Knowing what the numeral '3' looks like is different from being able to count — both matter.",
    teacherNotes:
      "Child correctly names written numerals 1–5 shown in random order — not counting up to identify them.",
  },

  // Numeracy — Developing
  {
    id: "NUM-D-01",
    areaId: "NUM",
    levelId: "D",
    sequence: 1,
    statement: "Counts objects 1–10 with one-to-one correspondence",
    parentDescription:
      "Counting accurately to 10 with real objects shown is solid early number sense.",
    teacherNotes:
      "Child counts a set of 6–10 objects with one-to-one correspondence, stating the final total correctly — demonstrated with different object types.",
  },
  {
    id: "NUM-D-02",
    areaId: "NUM",
    levelId: "D",
    sequence: 2,
    statement: "Recognises and names written numerals 1–10",
    parentDescription:
      "Knowing what '7' looks like and that it means seven things is a key number milestone.",
    teacherNotes:
      "Child correctly names written numerals 1–10 shown in random order without needing to count up from 1.",
  },
  {
    id: "NUM-D-03",
    areaId: "NUM",
    levelId: "D",
    sequence: 3,
    statement: "Identifies which group has more or fewer objects (up to 10)",
    parentDescription:
      "Comparing quantities ('this pile has more') is the beginning of mathematical thinking.",
    teacherNotes:
      "When shown two groups of objects (up to 10), child correctly identifies which has more and which has fewer — including groups of similar size (e.g. 7 vs. 8).",
  },
  {
    id: "NUM-D-04",
    areaId: "NUM",
    levelId: "D",
    sequence: 4,
    statement: "Sorts objects by one attribute: colour, size, or shape",
    parentDescription:
      "Sorting is how children first experience categories — a foundation for logical thinking.",
    teacherNotes:
      "Child sorts a mixed set of objects into consistent groups using one self-chosen or teacher-specified attribute, and can name the rule they used.",
  },

  // Numeracy — Secure
  {
    id: "NUM-S-01",
    areaId: "NUM",
    levelId: "S",
    sequence: 1,
    statement: "Counts and sequences numbers 1–20",
    parentDescription:
      "Counting to 20 correctly prepares children for addition and subtraction in Primary 1.",
    teacherNotes:
      "Child counts aloud to 20 correctly and can identify any numeral 1–20 when pointed to — demonstrated in both directions (ascending and from a random starting point).",
  },
  {
    id: "NUM-S-02",
    areaId: "NUM",
    levelId: "S",
    sequence: 2,
    statement: "Identifies and names basic 2D shapes and their properties",
    parentDescription:
      "Knowing a triangle has 3 sides and a circle has no corners is early geometry.",
    teacherNotes:
      "Child correctly names at least 4 basic 2D shapes (circle, square, triangle, rectangle) and states one property of each (e.g. 'a triangle has 3 sides').",
  },
  {
    id: "NUM-S-03",
    areaId: "NUM",
    levelId: "S",
    sequence: 3,
    statement: "Completes simple addition and subtraction within 5",
    parentDescription:
      "Sums within 5 are the first formal maths operations — exactly what Primary 1 starts with.",
    teacherNotes:
      "Child correctly solves simple addition and subtraction problems within 5, using objects, fingers, or mental calculation — demonstrated across multiple examples.",
  },

  // Social & Emotional Development — Beginning
  {
    id: "SED-B-01",
    areaId: "SED",
    levelId: "B",
    sequence: 1,
    statement:
      "Names at least 4 basic emotions when shown pictures or faces",
    parentDescription:
      "Naming emotions is the first step to understanding and managing them.",
    teacherNotes:
      "Child correctly labels happy, sad, angry, and scared when shown pictures or facial expressions — not just guessing from context clues like colour.",
  },
  {
    id: "SED-B-02",
    areaId: "SED",
    levelId: "B",
    sequence: 2,
    statement: "Follows a 2–3 step classroom routine without reminders",
    parentDescription:
      "Following routines shows self-regulation — one of the most important school-readiness skills.",
    teacherNotes:
      "Child independently moves through a 2–3 step routine (e.g. pack up → wash hands → sit on mat) without being individually reminded each time.",
  },
  {
    id: "SED-B-03",
    areaId: "SED",
    levelId: "B",
    sequence: 3,
    statement: "Takes turns with a peer during a structured activity",
    parentDescription:
      "Turn-taking is an early social contract children need for friendships to work.",
    teacherNotes:
      "Child waits for their turn and allows another child their go without prompting, grabbing, or persistent protest during a structured group or pair activity.",
  },

  // Social & Emotional Development — Developing
  {
    id: "SED-D-01",
    areaId: "SED",
    levelId: "D",
    sequence: 1,
    statement:
      "Identifies what caused a character's emotion in a story or situation",
    parentDescription:
      "Connecting emotions to causes shows your child is developing empathy and emotional intelligence.",
    teacherNotes:
      "When asked 'why is she sad?' or 'why is he happy?', child gives a plausible situational reason rather than just repeating the emotion name.",
  },
  {
    id: "SED-D-02",
    areaId: "SED",
    levelId: "D",
    sequence: 2,
    statement:
      "Uses words to express their own feelings rather than acting out",
    parentDescription:
      "Putting feelings into words is a major step in emotional self-management.",
    teacherNotes:
      "Child says 'I'm angry' or 'that hurt my feelings' instead of hitting, throwing objects, or crying without explanation — observed across genuine moments of frustration.",
  },
  {
    id: "SED-D-03",
    areaId: "SED",
    levelId: "D",
    sequence: 3,
    statement: "Identifies helpful vs. unhelpful behaviour in a scenario",
    parentDescription:
      "Distinguishing kind from unkind actions shows your child is developing a moral compass.",
    teacherNotes:
      "When shown or told about a situation, child correctly identifies whether the behaviour shown was kind or unkind, and can give a brief reason why.",
  },
  {
    id: "SED-D-04",
    areaId: "SED",
    levelId: "D",
    sequence: 4,
    statement: "Shows care toward a peer who is upset or struggling",
    parentDescription:
      "Noticing and responding to a friend's feelings — this is empathy in action.",
    teacherNotes:
      "Child spontaneously offers comfort, checks in verbally, or tells a teacher when a friend seems distressed — not prompted by the teacher to do so.",
  },

  // Social & Emotional Development — Secure
  {
    id: "SED-S-01",
    areaId: "SED",
    levelId: "S",
    sequence: 1,
    statement:
      "Explains their own feelings and gives a reason unprompted",
    parentDescription:
      "Being able to name and explain a feeling unprompted is advanced emotional literacy.",
    teacherNotes:
      "Child volunteers an explanation of their emotional state without being asked — e.g. 'I feel nervous because it's my first time' — in real, naturally occurring moments.",
  },
  {
    id: "SED-S-02",
    areaId: "SED",
    levelId: "S",
    sequence: 2,
    statement: "Proposes a solution to a peer conflict independently",
    parentDescription:
      "Problem-solving in friendships rather than escalating — strong social competence.",
    teacherNotes:
      "Child suggests 'we could take turns' or 'let's ask the teacher' or another constructive solution during a real peer conflict — without adult prompting.",
  },
  {
    id: "SED-S-03",
    areaId: "SED",
    levelId: "S",
    sequence: 3,
    statement:
      "Demonstrates responsibility toward group or classroom tasks",
    parentDescription:
      "Taking responsibility in a group shows your child is ready to thrive in Primary 1.",
    teacherNotes:
      "Child consistently takes ownership of shared responsibilities — packs up materials without being asked, reminds peers of rules, or helps set up — observed across multiple days.",
  },

  // Aesthetics & Creative Expression — Beginning
  {
    id: "ACE-B-01",
    areaId: "ACE",
    levelId: "B",
    sequence: 1,
    statement: "Explores and uses basic art materials freely (paint, crayons, clay)",
    parentDescription:
      "Freely exploring art materials — mixing colours, squishing clay — is how creativity first takes root.",
    teacherNotes:
      "Child independently picks up and experiments with art materials during free-choice time without needing encouragement to start or continue.",
  },
  {
    id: "ACE-B-02",
    areaId: "ACE",
    levelId: "B",
    sequence: 2,
    statement: "Participates in group singing and music activities",
    parentDescription:
      "Singing along with others builds listening skills, language, and a sense of belonging.",
    teacherNotes:
      "Child joins in group singing, clapping, or musical activities — following the rhythm or words, even partially — rather than sitting out.",
  },
  {
    id: "ACE-B-03",
    areaId: "ACE",
    levelId: "B",
    sequence: 3,
    statement: "Engages in imaginative role play with simple props",
    parentDescription:
      "Pretending — playing house, being a doctor — is how children develop imagination and language.",
    teacherNotes:
      "Child takes on a role and sustains imaginative play for at least a few minutes, using objects or space to represent something else (e.g. a block as a phone).",
  },

  // Aesthetics & Creative Expression — Developing
  {
    id: "ACE-D-01",
    areaId: "ACE",
    levelId: "D",
    sequence: 1,
    statement: "Creates artwork with a recognisable subject or intention",
    parentDescription:
      "When your child draws 'a flower' or 'our family', they are expressing ideas through art — a big creative step.",
    teacherNotes:
      "Child's artwork has a clear subject or intention the child can describe — the drawing or construction represents something recognisable, even if not realistic.",
  },
  {
    id: "ACE-D-02",
    areaId: "ACE",
    levelId: "D",
    sequence: 2,
    statement: "Sings a familiar song with correct melody and most of the words",
    parentDescription:
      "Singing a whole song correctly shows musical memory, language development, and confidence.",
    teacherNotes:
      "Child sings a familiar song (from class repertoire) with the correct tune and most of the lyrics — not just humming or joining in on key phrases only.",
  },
  {
    id: "ACE-D-03",
    areaId: "ACE",
    levelId: "D",
    sequence: 3,
    statement: "Combines different materials or art forms in one creation",
    parentDescription:
      "Using paint and collage together, or acting and singing in the same story — this is artistic thinking growing.",
    teacherNotes:
      "Child deliberately combines two or more materials or modes (e.g. draws then adds collage elements, or incorporates movement into dramatic play) in a single creative work.",
  },
  {
    id: "ACE-D-04",
    areaId: "ACE",
    levelId: "D",
    sequence: 4,
    statement: "Responds to music through movement that matches the mood or tempo",
    parentDescription:
      "Moving differently to fast vs. slow music shows your child is really listening and feeling the music.",
    teacherNotes:
      "When music changes tempo or mood, child's movement adapts accordingly — e.g. moves slowly to slow music, energetically to fast — not just random movement.",
  },

  // Aesthetics & Creative Expression — Secure
  {
    id: "ACE-S-01",
    areaId: "ACE",
    levelId: "S",
    sequence: 1,
    statement: "Describes their own creative choices and what they made",
    parentDescription:
      "Talking about their own art — 'I used blue because the sea is calm' — shows creative thinking and language growing together.",
    teacherNotes:
      "Child can explain at least one deliberate choice in their artwork or performance (e.g. colour, shape, character, expression) rather than just naming what it is.",
  },
  {
    id: "ACE-S-02",
    areaId: "ACE",
    levelId: "S",
    sequence: 2,
    statement: "Performs a song, poem, or story with expression and confidence",
    parentDescription:
      "Performing for others — even just the class — builds confidence, communication, and a love of the arts.",
    teacherNotes:
      "Child performs with clear expression (changes in voice, facial expression, or gesture) and remains engaged throughout — not just reciting flatly or needing constant prompting.",
  },
  {
    id: "ACE-S-03",
    areaId: "ACE",
    levelId: "S",
    sequence: 3,
    statement: "Sustains collaborative creative play with a narrative arc",
    parentDescription:
      "When children create and maintain a shared story together — 'and then the dragon came' — they are building advanced social and creative skills.",
    teacherNotes:
      "Child participates in collaborative dramatic play where a story develops across multiple turns with other children — adding to the narrative, negotiating roles, and sustaining the play beyond a few minutes.",
  },

  // Discovery of the World — Beginning
  {
    id: "DOW-B-01",
    areaId: "DOW",
    levelId: "B",
    sequence: 1,
    statement: "Notices and names observable changes in the environment",
    parentDescription:
      "Noticing that a puddle dried up or that plants grow — these are the first steps in scientific thinking.",
    teacherNotes:
      "Child spontaneously or with a simple prompt ('what do you notice?') identifies a visible change in the environment (e.g. weather, plant growth, a wet surface drying).",
  },
  {
    id: "DOW-B-02",
    areaId: "DOW",
    levelId: "B",
    sequence: 2,
    statement: "Asks questions about how or why things work",
    parentDescription:
      "Asking 'why does the moon follow us?' shows curiosity — the engine of all learning.",
    teacherNotes:
      "Child asks unprompted 'how' or 'why' questions about the natural or physical world — even if the questions are unanswerable or fanciful.",
  },
  {
    id: "DOW-B-03",
    areaId: "DOW",
    levelId: "B",
    sequence: 3,
    statement: "Sorts objects by observable physical properties",
    parentDescription:
      "Sorting rocks as 'rough' or 'smooth', leaves as 'big' or 'small' — this is early science observation.",
    teacherNotes:
      "Child sorts a collection of natural or classroom objects into groups based on a physical property they name (e.g. smooth/rough, heavy/light, big/small).",
  },

  // Discovery of the World — Developing
  {
    id: "DOW-D-01",
    areaId: "DOW",
    levelId: "D",
    sequence: 1,
    statement: "Makes a simple prediction before a class experiment or activity",
    parentDescription:
      "Guessing what will happen before trying — 'I think it will sink' — is how scientists think.",
    teacherNotes:
      "Before a class experiment or sensory activity, child states what they think will happen (even if wrong) — showing they are reasoning rather than waiting to be told.",
  },
  {
    id: "DOW-D-02",
    areaId: "DOW",
    levelId: "D",
    sequence: 2,
    statement: "Compares the properties of two materials or objects",
    parentDescription:
      "Noticing that water flows but sand doesn't, or that metal is cold and wood is warm — this is scientific observation.",
    teacherNotes:
      "Child compares two materials or objects using at least two observable properties (e.g. 'this one is harder and heavier') — not just naming one difference.",
  },
  {
    id: "DOW-D-03",
    areaId: "DOW",
    levelId: "D",
    sequence: 3,
    statement: "Recalls and shares observations from a class investigation",
    parentDescription:
      "Remembering and describing what they found out — not just what they did — shows real learning happened.",
    teacherNotes:
      "After a class investigation, child can recall a specific observation (what they saw, heard, felt, or measured) — not just describe the activity itself.",
  },
  {
    id: "DOW-D-04",
    areaId: "DOW",
    levelId: "D",
    sequence: 4,
    statement: "Identifies living vs. non-living things and gives a reason",
    parentDescription:
      "Knowing that a tree is alive but a rock isn't — and being able to explain why — is an important science concept.",
    teacherNotes:
      "Child correctly classifies at least 4 examples as living or non-living and can give a simple reason (e.g. 'it grows', 'it needs water', 'it can't move by itself').",
  },

  // Discovery of the World — Secure
  {
    id: "DOW-S-01",
    areaId: "DOW",
    levelId: "S",
    sequence: 1,
    statement: "Conducts a simple guided experiment and describes what they did",
    parentDescription:
      "Following steps to test something and then explaining it — that's the scientific method in action.",
    teacherNotes:
      "Child follows the steps of a simple structured experiment (e.g. sink or float, mixing colours, dissolving) and can describe in sequence what they did and what happened.",
  },
  {
    id: "DOW-S-02",
    areaId: "DOW",
    levelId: "S",
    sequence: 2,
    statement: "Explains a cause-and-effect relationship they observed",
    parentDescription:
      "'The ice melted because it got warm' — connecting what caused something to happen is real scientific thinking.",
    teacherNotes:
      "Child states a cause-and-effect relationship based on a direct observation — using language like 'because', 'so', or 'when…then…' — not just describing what happened.",
  },
  {
    id: "DOW-S-03",
    areaId: "DOW",
    levelId: "S",
    sequence: 3,
    statement: "Connects a class observation to something in their own life",
    parentDescription:
      "When your child says 'that's like when our bread went mouldy' — they're linking school learning to the real world.",
    teacherNotes:
      "Child draws an unprompted or lightly prompted connection between a class observation or discovery and a real-world experience from their own life.",
  },

  // Health, Safety & Motor Skills — Beginning
  {
    id: "HMS-B-01",
    areaId: "HMS",
    levelId: "B",
    sequence: 1,
    statement: "Runs, jumps, and climbs with basic coordination",
    parentDescription:
      "Moving confidently in space — running, jumping over a step — builds the body awareness children need for everything else.",
    teacherNotes:
      "Child runs without tripping repeatedly, jumps with both feet, and climbs low playground structures — showing basic whole-body coordination in unstructured play.",
  },
  {
    id: "HMS-B-02",
    areaId: "HMS",
    levelId: "B",
    sequence: 2,
    statement: "Holds a pencil or crayon with a functional grip",
    parentDescription:
      "A good pencil grip makes writing and drawing easier — it's the starting point for all written work.",
    teacherNotes:
      "Child holds a pencil or crayon with a functional grip (tripod or equivalent) that allows controlled marks — not a full-fist grip that limits movement.",
  },
  {
    id: "HMS-B-03",
    areaId: "HMS",
    levelId: "B",
    sequence: 3,
    statement: "Follows basic classroom and playground safety rules",
    parentDescription:
      "Knowing 'walk inside, run outside' and other basic rules keeps children safe and shows they understand why rules matter.",
    teacherNotes:
      "Child follows at least 3 basic safety rules consistently without individual reminders — e.g. walks indoors, doesn't push on the stairs, reports injuries to the teacher.",
  },

  // Health, Safety & Motor Skills — Developing
  {
    id: "HMS-D-01",
    areaId: "HMS",
    levelId: "D",
    sequence: 1,
    statement: "Hops on one foot and skips with alternating feet",
    parentDescription:
      "Hopping and skipping show growing balance and coordination — skills children need for PE, dance, and playground games.",
    teacherNotes:
      "Child hops consecutively on one foot (at least 3 times) and can skip with alternating feet — not just gallop — showing bilateral coordination.",
  },
  {
    id: "HMS-D-02",
    areaId: "HMS",
    levelId: "D",
    sequence: 2,
    statement: "Uses scissors to cut along a straight line",
    parentDescription:
      "Cutting with scissors looks simple but requires both hands working together — a key fine motor milestone.",
    teacherNotes:
      "Child uses scissors correctly (thumb up, moves paper not scissors) to cut along a straight or gently curved line without large deviations.",
  },
  {
    id: "HMS-D-03",
    areaId: "HMS",
    levelId: "D",
    sequence: 3,
    statement: "Washes hands correctly and independently at appropriate times",
    parentDescription:
      "Knowing when and how to wash hands properly is one of the most important health habits a child can build.",
    teacherNotes:
      "Child washes hands with soap for an adequate duration (15–20 seconds) — before eating and after the toilet — without needing individual prompting.",
  },
  {
    id: "HMS-D-04",
    areaId: "HMS",
    levelId: "D",
    sequence: 4,
    statement: "Identifies unsafe situations and explains why they are dangerous",
    parentDescription:
      "Knowing that running near a pool or touching a hot stove is dangerous — and why — is the beginning of self-protection.",
    teacherNotes:
      "When shown or described a safety scenario, child correctly identifies the hazard and gives a simple reason why it is dangerous (e.g. 'you could fall', 'it's hot and could burn you').",
  },

  // Health, Safety & Motor Skills — Secure
  {
    id: "HMS-S-01",
    areaId: "HMS",
    levelId: "S",
    sequence: 1,
    statement: "Catches a thrown ball with two hands consistently",
    parentDescription:
      "Catching a ball requires eyes and hands to work together — a sign of well-developed coordination.",
    teacherNotes:
      "Child successfully catches a medium-sized ball thrown from a short distance (2–3 metres) using two hands — demonstrated on at least 3 of 5 attempts.",
  },
  {
    id: "HMS-S-02",
    areaId: "HMS",
    levelId: "S",
    sequence: 2,
    statement: "Draws a recognisable figure of a person with key body parts",
    parentDescription:
      "Drawing a person with a head, body, arms, and legs shows fine motor control and how your child understands the human body.",
    teacherNotes:
      "Child's drawing of a person includes at least 5 recognisable body parts (e.g. head, body, two arms, two legs, or face details) — not just a circle with lines.",
  },
  {
    id: "HMS-S-03",
    areaId: "HMS",
    levelId: "S",
    sequence: 3,
    statement: "Explains why healthy habits (sleep, food, exercise) matter",
    parentDescription:
      "Understanding why we eat vegetables and get enough sleep — not just following rules — shows health literacy is taking root.",
    teacherNotes:
      "Child can explain a simple reason why a healthy habit is important (e.g. 'we sleep so our body can rest and grow', 'vegetables give us energy') — in their own words, not just reciting a phrase.",
  },
];

// ─── Classes ───────────────────────────────────────────────────────────────

export const CLASSES: Class[] = [
  { id: "class-1", schoolId: "school-1", name: "Kingfisher N1", preschoolYear: "N1", academicYear: 2026, termLabel: "Term 2, 2026" },
  { id: "class-2", schoolId: "school-1", name: "Sparrow K2",    preschoolYear: "K2", academicYear: 2026, termLabel: "Term 2, 2026" },
];

// ─── Teachers ──────────────────────────────────────────────────────────────

export const TEACHERS: Teacher[] = [
  { id: "teacher-1", firstName: "Siti", lastName: "", email: "siti@myschool.edu.sg", classIds: ["class-1"] },
  { id: "teacher-2", firstName: "Lim", lastName: "", email: "lim@myschool.edu.sg", classIds: ["class-2"] },
];

// ─── Children ──────────────────────────────────────────────────────────────

export const CHILDREN: Child[] = [
  {
    id: "child-rayan",
    firstName: "Rayan",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-04-15",
    primaryGuardian: {
      name: "Mr Ahmed",
      phone: "+65 8123 4567",
      email: "ahmed.rayan@example.com",
    },
    flags: {
      allergy: "Peanut allergy – EpiPen in classroom",
    },
  },
  {
    id: "child-aisha",
    firstName: "Aisha",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-07-02",
    primaryGuardian: {
      name: "Mdm Nur",
      phone: "+65 9456 7890",
      email: "nur.aisha@example.com",
    },
    flags: {
      medicalNote: "Mild asthma – inhaler in school office",
    },
  },
  {
    id: "child-mei",
    firstName: "Mei",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-02-10",
    primaryGuardian: {
      name: "Mrs Tan",
      phone: "+65 9001 2233",
      email: "tan.mei@example.com",
    },
  },
  {
    id: "child-omar",
    firstName: "Omar",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2022-12-05",
    primaryGuardian: {
      name: "Mr Ali",
      phone: "+65 9345 6677",
    },
  },
  {
    id: "child-priya",
    firstName: "Priya",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-05-28",
    primaryGuardian: {
      name: "Mdm Kavitha",
      phone: "+65 8123 8899",
      email: "kavitha.priya@example.com",
    },
    flags: {
      specialNeed: "Speech therapy support – weekly sessions",
    },
  },
  {
    id: "child-kai",
    firstName: "Kai",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-09-09",
    primaryGuardian: {
      name: "Mr Lim",
      phone: "+65 8765 0011",
    },
  },
  {
    id: "child-sara",
    firstName: "Sara",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-03-21",
    primaryGuardian: {
      name: "Mrs Rahman",
      phone: "+65 9333 4455",
      email: "rahman.sara@example.com",
    },
  },
  {
    id: "child-darius",
    firstName: "Darius",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2022-11-18",
    primaryGuardian: {
      name: "Ms Lee",
      phone: "+65 9888 7766",
    },
  },
  {
    id: "child-aryan",
    firstName: "Aryan",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-01-30",
    primaryGuardian: {
      name: "Mr Singh",
      phone: "+65 8123 9900",
    },
  },
  {
    id: "child-fatimah",
    firstName: "Fatimah",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-08-12",
    primaryGuardian: {
      name: "Mdm Siti",
      phone: "+65 9455 6677",
    },
  },
  {
    id: "child-jingwei",
    firstName: "Jing Wei",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2022-10-03",
    primaryGuardian: {
      name: "Mr Ng",
      phone: "+65 8111 2233",
    },
  },
  {
    id: "child-lakshmi",
    firstName: "Lakshmi",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2022-09-25",
    primaryGuardian: {
      name: "Mrs Iyer",
      phone: "+65 9222 3344",
    },
  },
  {
    id: "child-nathan",
    firstName: "Nathan",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-06-06",
    primaryGuardian: {
      name: "Mr Koh",
      phone: "+65 9666 7788",
    },
  },
  {
    id: "child-nurul",
    firstName: "Nurul",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-11-19",
    primaryGuardian: {
      name: "Mdm Zainab",
      phone: "+65 9333 2211",
    },
  },
  {
    id: "child-ethan",
    firstName: "Ethan",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-02-02",
    primaryGuardian: {
      name: "Ms Chua",
      phone: "+65 9555 6677",
    },
  },
  {
    id: "child-siti",
    firstName: "Siti",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-12-01",
    primaryGuardian: {
      name: "Mdm Hana",
      phone: "+65 9777 8899",
    },
  },
  {
    id: "child-rohan",
    firstName: "Rohan",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2022-07-17",
    primaryGuardian: {
      name: "Mr Patel",
      phone: "+65 9011 2233",
    },
  },
  {
    id: "child-zoe",
    firstName: "Zoe",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-04-09",
    primaryGuardian: {
      name: "Mrs Lim",
      phone: "+65 9344 5566",
    },
  },
  {
    id: "child-darren",
    firstName: "Darren",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2022-06-23",
    primaryGuardian: {
      name: "Mr Ong",
      phone: "+65 9888 1122",
    },
  },
  {
    id: "child-nadia",
    firstName: "Nadia",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-1",
    yearLevel: "N1",
    dateOfBirth: "2023-09-30",
    primaryGuardian: {
      name: "Mdm Farah",
      phone: "+65 9123 4455",
    },
    flags: {
      welfareConcern: "Recent family change – check-in weekly",
    },
  },
  // ── Sparrow K2 ────────────────────────────────────────────────────────────
  {
    id: "child-amir",
    firstName: "Amir",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-01-14",
    primaryGuardian: {
      name: "Mr Hassan",
      phone: "+65 9333 0099",
    },
  },
  {
    id: "child-bao",
    firstName: "Bao",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-12-28",
    primaryGuardian: {
      name: "Mrs Chen",
      phone: "+65 9555 0011",
    },
  },
  {
    id: "child-clara",
    firstName: "Clara",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-03-08",
    primaryGuardian: {
      name: "Ms Wong",
      phone: "+65 9777 3344",
    },
  },
  {
    id: "child-dev",
    firstName: "Dev",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-05-11",
    primaryGuardian: {
      name: "Mr Kumar",
      phone: "+65 9002 3344",
    },
  },
  {
    id: "child-elise",
    firstName: "Elise",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-02-19",
    primaryGuardian: {
      name: "Mrs Laurent",
      phone: "+65 9222 5566",
    },
  },
  {
    id: "child-hafiz",
    firstName: "Hafiz",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-09-04",
    primaryGuardian: {
      name: "Mr Roslan",
      phone: "+65 9444 5566",
    },
  },
  {
    id: "child-xinyi",
    firstName: "Xin Yi",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-11-20",
    primaryGuardian: {
      name: "Mrs Goh",
      phone: "+65 9001 3344",
    },
  },
  {
    id: "child-jessica",
    firstName: "Jessica",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-02-14",
    primaryGuardian: {
      name: "Ms Tan",
      phone: "+65 9345 7788",
    },
  },
  {
    id: "child-vikram",
    firstName: "Vikram",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-07-30",
    primaryGuardian: {
      name: "Mr Krishnan",
      phone: "+65 9678 1122",
    },
  },
  {
    id: "child-leila",
    firstName: "Leila",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-10-18",
    primaryGuardian: {
      name: "Mdm Suriani",
      phone: "+65 9234 5566",
    },
  },
  {
    id: "child-jayden",
    firstName: "Jayden",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-08-05",
    primaryGuardian: {
      name: "Mr Chia",
      phone: "+65 9556 7788",
    },
  },
  {
    id: "child-nabilah",
    firstName: "Nabilah",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-04-22",
    primaryGuardian: {
      name: "Mdm Rohani",
      phone: "+65 9012 3344",
    },
  },
  {
    id: "child-marcus",
    firstName: "Marcus",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-06-11",
    primaryGuardian: {
      name: "Mr Teo",
      phone: "+65 9789 0011",
    },
  },
  {
    id: "child-shreya",
    firstName: "Shreya",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-01-09",
    primaryGuardian: {
      name: "Mrs Pillai",
      phone: "+65 9456 0011",
    },
  },
  {
    id: "child-iskandar",
    firstName: "Iskandar",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-12-03",
    primaryGuardian: {
      name: "Mr Fadzli",
      phone: "+65 9123 6677",
    },
  },
  {
    id: "child-yuki",
    firstName: "Yuki",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-05-25",
    primaryGuardian: {
      name: "Mrs Tanaka",
      phone: "+65 9667 8899",
    },
  },
  {
    id: "child-luca",
    firstName: "Luca",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-03-17",
    primaryGuardian: {
      name: "Mr Ferretti",
      phone: "+65 9334 5566",
    },
  },
  {
    id: "child-aileen",
    firstName: "Aileen",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-08-28",
    primaryGuardian: {
      name: "Mrs Yap",
      phone: "+65 9890 1122",
    },
    flags: {
      medicalNote: "Frequent absences – chronic ear infections",
    },
  },
  {
    id: "child-zaid",
    firstName: "Zaid",
    lastName: "",
    gender: "male",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2019-11-07",
    primaryGuardian: {
      name: "Mr Azman",
      phone: "+65 9567 8899",
    },
  },
  {
    id: "child-phoebe",
    firstName: "Phoebe",
    lastName: "",
    gender: "female",
    organisationId: "org-1",
    schoolId: "school-1",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-04-01",
    primaryGuardian: {
      name: "Mrs Kwek",
      phone: "+65 9223 4455",
    },
  },
];

// ─── Initial progress (all not_started) ───────────────────────────────────

export function buildInitialProgress(): ChildMilestoneProgress[] {
  const rows: ChildMilestoneProgress[] = [];
  for (const child of CHILDREN) {
    for (const milestone of MILESTONES) {
      rows.push({
        childId: child.id,
        milestoneId: milestone.id,
        status: "not_started",
      });
    }
  }
  return rows;
}

// ─── Demo activity sessions ────────────────────────────────────────────────

function session(
  id: string,
  childId: string,
  milestoneId: string,
  passed: boolean,
  score: number,
  daysAgo: number,
  location?: "home" | "school"
): ActivitySession {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return {
    id,
    childId,
    milestoneId,
    passed,
    score,
    attemptedAt: d.toISOString(),
    ...(location ? { location } : {}),
  };
}

export const DEMO_SESSIONS: ActivitySession[] = [
  // Rayan — LL-B-01: achieved early Jan (3 consecutive passes)
  session("s001", "child-rayan", "LL-B-01", true, 3, 80),
  session("s002", "child-rayan", "LL-B-01", true, 2, 76),
  session("s003", "child-rayan", "LL-B-01", true, 3, 72), // achieved ~Jan 6

  // Rayan — LL-B-02: achieved mid-Jan (3 consecutive passes)
  session("s004", "child-rayan", "LL-B-02", true, 3, 70),
  session("s005", "child-rayan", "LL-B-02", true, 2, 66),
  session("s006", "child-rayan", "LL-B-02", true, 3, 62), // achieved ~Jan 16

  // Rayan — LL-B-03: achieved late Jan (5 of 7 passes)
  session("s007", "child-rayan", "LL-B-03", false, 1, 82),
  session("s008", "child-rayan", "LL-B-03", true,  2, 76),
  session("s009", "child-rayan", "LL-B-03", false, 1, 72),
  session("s010", "child-rayan", "LL-B-03", true,  3, 68),
  session("s011", "child-rayan", "LL-B-03", true,  2, 62),
  session("s012", "child-rayan", "LL-B-03", true,  2, 57),
  session("s013", "child-rayan", "LL-B-03", true,  3, 52), // achieved ~Jan 26

  // Rayan — LL-D-01: in_progress (2 passing sessions, not 3 consecutive)
  session("s014", "child-rayan", "LL-D-01", false, 1,  7),
  session("s015", "child-rayan", "LL-D-01", true,  2,  5),
  session("s016", "child-rayan", "LL-D-01", true,  3,  3),

  // Rayan — NUM-B-01: achieved early Feb (3 consecutive passes)
  session("s017", "child-rayan", "NUM-B-01", true, 3, 55),
  session("s018", "child-rayan", "NUM-B-01", true, 2, 50),
  session("s019", "child-rayan", "NUM-B-01", true, 3, 45), // achieved ~Feb 1

  // Rayan — NUM-B-02: achieved mid-Feb (3 consecutive passes)
  session("s020", "child-rayan", "NUM-B-02", true, 2, 44),
  session("s021", "child-rayan", "NUM-B-02", true, 3, 40),
  session("s022", "child-rayan", "NUM-B-02", true, 2, 35), // achieved ~Feb 11

  // Rayan — NUM-B-03: achieved late Feb (3 consecutive passes)
  session("s023", "child-rayan", "NUM-B-03", true, 3, 34),
  session("s024", "child-rayan", "NUM-B-03", true, 3, 30),
  session("s025", "child-rayan", "NUM-B-03", true, 3, 25), // achieved ~Feb 21

  // Aisha — LL-B-01: achieved (3 consecutive passes)
  session("s026", "child-aisha", "LL-B-01", true, 3, 16),
  session("s027", "child-aisha", "LL-B-01", true, 2, 14),
  session("s028", "child-aisha", "LL-B-01", true, 3, 12),

  // Aisha — LL-B-02: achieved (3 consecutive passes)
  session("s029", "child-aisha", "LL-B-02", true, 2, 15),
  session("s030", "child-aisha", "LL-B-02", true, 3, 13),
  session("s031", "child-aisha", "LL-B-02", true, 2, 11),

  // Aisha — LL-B-03: achieved (3 consecutive passes)
  session("s032", "child-aisha", "LL-B-03", true, 3, 14),
  session("s033", "child-aisha", "LL-B-03", true, 3, 12),
  session("s034", "child-aisha", "LL-B-03", true, 2, 10),

  // Aisha — LL-D-01: in_progress (1 passing session)
  session("s035", "child-aisha", "LL-D-01", false, 1, 6, "home"),
  session("s036", "child-aisha", "LL-D-01", true,  2, 4, "home"),

  // Aisha — LL-D-02: in_progress (0 passes yet)
  session("s037", "child-aisha", "LL-D-02", false, 1, 5),
  session("s038", "child-aisha", "LL-D-02", false, 0, 3),

  // Mei — LL-B-01: in_progress (1 passing session)
  session("s039", "child-mei", "LL-B-01", false, 1, 8),
  session("s040", "child-mei", "LL-B-01", true,  2, 6),

  // Mei — NUM-B-01: in_progress (1 passing session)
  session("s041", "child-mei", "NUM-B-01", false, 0, 7),
  session("s042", "child-mei", "NUM-B-01", true,  2, 5),

  // Aryan — LL-B-01: achieved (3 consecutive passes)
  session("s043", "child-aryan", "LL-B-01", true, 3, 14),
  session("s044", "child-aryan", "LL-B-01", true, 2, 11),
  session("s045", "child-aryan", "LL-B-01", true, 3,  8),
  // Aryan — NUM-B-01: in_progress (1 pass)
  session("s046", "child-aryan", "NUM-B-01", false, 1, 6),
  session("s047", "child-aryan", "NUM-B-01", true,  2, 3),

  // Fatimah — LL-B-01: in_progress (1 pass)
  session("s048", "child-fatimah", "LL-B-01", false, 1, 9),
  session("s049", "child-fatimah", "LL-B-01", true,  2, 5),

  // Jing Wei — LL-B all achieved
  session("s050", "child-jingwei", "LL-B-01", true, 3, 20),
  session("s051", "child-jingwei", "LL-B-01", true, 3, 17),
  session("s052", "child-jingwei", "LL-B-01", true, 3, 14),
  session("s053", "child-jingwei", "LL-B-02", true, 3, 19),
  session("s054", "child-jingwei", "LL-B-02", true, 2, 16),
  session("s055", "child-jingwei", "LL-B-02", true, 3, 13),
  session("s056", "child-jingwei", "LL-B-03", true, 3, 18),
  session("s057", "child-jingwei", "LL-B-03", true, 3, 15),
  session("s058", "child-jingwei", "LL-B-03", true, 2, 12),
  // Jing Wei — LL-D-01: achieved
  session("s059", "child-jingwei", "LL-D-01", true, 3, 11),
  session("s060", "child-jingwei", "LL-D-01", true, 2,  9),
  session("s061", "child-jingwei", "LL-D-01", true, 3,  7),
  // Jing Wei — NUM-B all achieved
  session("s062", "child-jingwei", "NUM-B-01", true, 3, 20),
  session("s063", "child-jingwei", "NUM-B-01", true, 3, 17),
  session("s064", "child-jingwei", "NUM-B-01", true, 3, 14),
  session("s065", "child-jingwei", "NUM-B-02", true, 3, 19),
  session("s066", "child-jingwei", "NUM-B-02", true, 2, 16),
  session("s067", "child-jingwei", "NUM-B-02", true, 3, 13),
  session("s068", "child-jingwei", "NUM-B-03", true, 3, 18),
  session("s069", "child-jingwei", "NUM-B-03", true, 3, 15),
  session("s070", "child-jingwei", "NUM-B-03", true, 2, 12),

  // Lakshmi — LL-B-01: achieved
  session("s071", "child-lakshmi", "LL-B-01", true, 3, 15),
  session("s072", "child-lakshmi", "LL-B-01", true, 2, 12),
  session("s073", "child-lakshmi", "LL-B-01", true, 3,  9),
  // Lakshmi — NUM-B-01+02: achieved
  session("s074", "child-lakshmi", "NUM-B-01", true, 3, 14),
  session("s075", "child-lakshmi", "NUM-B-01", true, 3, 11),
  session("s076", "child-lakshmi", "NUM-B-01", true, 2,  8),
  session("s077", "child-lakshmi", "NUM-B-02", true, 2, 13),
  session("s078", "child-lakshmi", "NUM-B-02", true, 3, 10),
  session("s079", "child-lakshmi", "NUM-B-02", true, 3,  7),

  // Nathan — LL-B-01: in_progress (2 passes, not consecutive)
  session("s080", "child-nathan", "LL-B-01", false, 1, 10),
  session("s081", "child-nathan", "LL-B-01", true,  2,  7),
  session("s082", "child-nathan", "LL-B-01", false, 1,  4),
  session("s083", "child-nathan", "LL-B-01", true,  2,  2),

  // Nurul — LL-B-01+02: achieved
  session("s084", "child-nurul", "LL-B-01", true, 3, 16),
  session("s085", "child-nurul", "LL-B-01", true, 2, 13),
  session("s086", "child-nurul", "LL-B-01", true, 3, 10),
  session("s087", "child-nurul", "LL-B-02", true, 3, 15),
  session("s088", "child-nurul", "LL-B-02", true, 2, 12),
  session("s089", "child-nurul", "LL-B-02", true, 3,  9),
  // Nurul — NUM-B-01: in_progress (1 pass)
  session("s090", "child-nurul", "NUM-B-01", false, 0, 7),
  session("s091", "child-nurul", "NUM-B-01", true,  2, 4),

  // Ethan — LL-B-01+02: achieved, LL-D-01: in_progress
  session("s092", "child-ethan", "LL-B-01", true, 3, 17),
  session("s093", "child-ethan", "LL-B-01", true, 2, 14),
  session("s094", "child-ethan", "LL-B-01", true, 3, 11),
  session("s095", "child-ethan", "LL-B-02", true, 3, 16),
  session("s096", "child-ethan", "LL-B-02", true, 2, 13),
  session("s097", "child-ethan", "LL-B-02", true, 3, 10),
  session("s098", "child-ethan", "LL-D-01", false, 1, 6),
  session("s099", "child-ethan", "LL-D-01", true,  2, 3),

  // Siti — LL-B-01: in_progress (1 pass)
  session("s100", "child-siti", "LL-B-01", false, 0, 8),
  session("s101", "child-siti", "LL-B-01", true,  2, 5),

  // Rohan — NUM-B all achieved, NUM-D-01: in_progress
  session("s102", "child-rohan", "NUM-B-01", true, 3, 18),
  session("s103", "child-rohan", "NUM-B-01", true, 3, 15),
  session("s104", "child-rohan", "NUM-B-01", true, 2, 12),
  session("s105", "child-rohan", "NUM-B-02", true, 3, 17),
  session("s106", "child-rohan", "NUM-B-02", true, 2, 14),
  session("s107", "child-rohan", "NUM-B-02", true, 3, 11),
  session("s108", "child-rohan", "NUM-B-03", true, 3, 16),
  session("s109", "child-rohan", "NUM-B-03", true, 3, 13),
  session("s110", "child-rohan", "NUM-B-03", true, 2, 10),
  session("s111", "child-rohan", "NUM-D-01", false, 1, 6),
  session("s112", "child-rohan", "NUM-D-01", true,  2, 3),

  // Zoe — LL-B-01+02: achieved, NUM-B-01: achieved
  session("s113", "child-zoe", "LL-B-01", true, 3, 15),
  session("s114", "child-zoe", "LL-B-01", true, 2, 12),
  session("s115", "child-zoe", "LL-B-01", true, 3,  9),
  session("s116", "child-zoe", "LL-B-02", true, 3, 14),
  session("s117", "child-zoe", "LL-B-02", true, 2, 11),
  session("s118", "child-zoe", "LL-B-02", true, 3,  8),
  session("s119", "child-zoe", "NUM-B-01", true, 3, 13),
  session("s120", "child-zoe", "NUM-B-01", true, 2, 10),
  session("s121", "child-zoe", "NUM-B-01", true, 3,  7),

  // Darren — LL-B-01: achieved, NUM-B-01: in_progress
  session("s122", "child-darren", "LL-B-01", true, 3, 14),
  session("s123", "child-darren", "LL-B-01", true, 2, 11),
  session("s124", "child-darren", "LL-B-01", true, 3,  8),
  session("s125", "child-darren", "NUM-B-01", false, 1, 7),
  session("s126", "child-darren", "NUM-B-01", true,  2, 4),

  // Nadia — LL-B-01+02: achieved, LL-B-03: in_progress
  session("s127", "child-nadia", "LL-B-01", true, 3, 16),
  session("s128", "child-nadia", "LL-B-01", true, 2, 13),
  session("s129", "child-nadia", "LL-B-01", true, 3, 10),
  session("s130", "child-nadia", "LL-B-02", true, 3, 15),
  session("s131", "child-nadia", "LL-B-02", true, 2, 12),
  session("s132", "child-nadia", "LL-B-02", true, 3,  9),
  session("s133", "child-nadia", "LL-B-03", false, 1, 6),
  session("s134", "child-nadia", "LL-B-03", true,  2, 3),

  // ── Sparrow K2 ────────────────────────────────────────────────────────────

  // Amir — LL-B-01: achieved
  session("s135", "child-amir", "LL-B-01", true, 3, 14),
  session("s136", "child-amir", "LL-B-01", true, 2, 11),
  session("s137", "child-amir", "LL-B-01", true, 3,  8),
  // Amir — NUM-B-01: in_progress
  session("s138", "child-amir", "NUM-B-01", false, 1, 6),
  session("s139", "child-amir", "NUM-B-01", true,  2, 3),

  // Bao — LL-B-01: in_progress
  session("s140", "child-bao", "LL-B-01", false, 1, 9),
  session("s141", "child-bao", "LL-B-01", true,  2, 5),

  // Clara — LL-B-01+02: achieved
  session("s142", "child-clara", "LL-B-01", true, 3, 16),
  session("s143", "child-clara", "LL-B-01", true, 2, 13),
  session("s144", "child-clara", "LL-B-01", true, 3, 10),
  session("s145", "child-clara", "LL-B-02", true, 3, 15),
  session("s146", "child-clara", "LL-B-02", true, 2, 12),
  session("s147", "child-clara", "LL-B-02", true, 3,  9),
  // Clara — NUM-B-01: achieved
  session("s148", "child-clara", "NUM-B-01", true, 3, 14),
  session("s149", "child-clara", "NUM-B-01", true, 2, 11),
  session("s150", "child-clara", "NUM-B-01", true, 3,  8),

  // Dev — no sessions yet (brand new)

  // Elise — LL-B-01: achieved, NUM-B-01: in_progress
  session("s151", "child-elise", "LL-B-01", true, 3, 15),
  session("s152", "child-elise", "LL-B-01", true, 2, 12),
  session("s153", "child-elise", "LL-B-01", true, 3,  9),
  session("s154", "child-elise", "NUM-B-01", false, 0, 7),
  session("s155", "child-elise", "NUM-B-01", true,  2, 4),

  // ── Kingfisher N1: children with no prior data ────────────────────────────

  // Omar — NUM-B-01: in_progress (1 pass)
  session("s156", "child-omar", "NUM-B-01", false, 0, 9),
  session("s157", "child-omar", "NUM-B-01", true,  2, 5),

  // Priya — LL-B-01: in_progress (1 pass; speech therapy support)
  session("s158", "child-priya", "LL-B-01", false, 0, 11),
  session("s159", "child-priya", "LL-B-01", true,  1, 7),

  // Kai — NUM-B-01: achieved, NUM-B-02: achieved
  session("s160", "child-kai", "NUM-B-01", true, 3, 19),
  session("s161", "child-kai", "NUM-B-01", true, 3, 15),
  session("s162", "child-kai", "NUM-B-01", true, 2, 11),
  session("s163", "child-kai", "NUM-B-02", true, 3, 18),
  session("s164", "child-kai", "NUM-B-02", true, 2, 14),
  session("s165", "child-kai", "NUM-B-02", true, 3, 10),

  // Sara — LL-B-01: achieved, LL-B-02: achieved
  session("s166", "child-sara", "LL-B-01", true, 3, 17),
  session("s167", "child-sara", "LL-B-01", true, 2, 14),
  session("s168", "child-sara", "LL-B-01", true, 3, 11),
  session("s169", "child-sara", "LL-B-02", true, 3, 16),
  session("s170", "child-sara", "LL-B-02", true, 2, 13),
  session("s171", "child-sara", "LL-B-02", true, 3, 10),

  // Darius — LL-B-01: achieved, NUM-B-01: achieved
  session("s172", "child-darius", "LL-B-01", true, 3, 15),
  session("s173", "child-darius", "LL-B-01", true, 2, 12),
  session("s174", "child-darius", "LL-B-01", true, 3,  9),
  session("s175", "child-darius", "NUM-B-01", true, 3, 14),
  session("s176", "child-darius", "NUM-B-01", true, 3, 11),
  session("s177", "child-darius", "NUM-B-01", true, 2,  8),

  // ── Sparrow K2: new children ──────────────────────────────────────────────

  // Hafiz — LL-B-01: in_progress (1 pass)
  session("s178", "child-hafiz", "LL-B-01", false, 0, 8),
  session("s179", "child-hafiz", "LL-B-01", true,  2, 4),

  // Xinyi — no sessions (brand new)

  // Aileen — LL-B-01: in_progress (1 pass; frequent absences)
  session("s180", "child-aileen", "LL-B-01", false, 0, 12),
  session("s181", "child-aileen", "LL-B-01", true,  1, 7),

  // Jessica — LL-B-01+02: achieved, NUM-B-01: achieved
  session("s182", "child-jessica", "LL-B-01", true, 3, 20),
  session("s183", "child-jessica", "LL-B-01", true, 2, 17),
  session("s184", "child-jessica", "LL-B-01", true, 3, 14),
  session("s185", "child-jessica", "LL-B-02", true, 3, 19),
  session("s186", "child-jessica", "LL-B-02", true, 2, 16),
  session("s187", "child-jessica", "LL-B-02", true, 3, 13),
  session("s188", "child-jessica", "NUM-B-01", true, 3, 18),
  session("s189", "child-jessica", "NUM-B-01", true, 2, 15),
  session("s190", "child-jessica", "NUM-B-01", true, 3, 12),

  // Shreya — LL-B-01+02+03: achieved, NUM-B-01+02: achieved
  session("s191", "child-shreya", "LL-B-01", true, 3, 22),
  session("s192", "child-shreya", "LL-B-01", true, 3, 19),
  session("s193", "child-shreya", "LL-B-01", true, 2, 16),
  session("s194", "child-shreya", "LL-B-02", true, 3, 21),
  session("s195", "child-shreya", "LL-B-02", true, 2, 18),
  session("s196", "child-shreya", "LL-B-02", true, 3, 15),
  session("s197", "child-shreya", "LL-B-03", true, 3, 20),
  session("s198", "child-shreya", "LL-B-03", true, 2, 17),
  session("s199", "child-shreya", "LL-B-03", true, 3, 14),
  session("s200", "child-shreya", "NUM-B-01", true, 3, 18),
  session("s201", "child-shreya", "NUM-B-01", true, 2, 15),
  session("s202", "child-shreya", "NUM-B-01", true, 3, 12),
  session("s203", "child-shreya", "NUM-B-02", true, 3, 17),
  session("s204", "child-shreya", "NUM-B-02", true, 2, 14),
  session("s205", "child-shreya", "NUM-B-02", true, 3, 11),

  // Vikram — LL-B-01: achieved, NUM-B-01+02+03: achieved
  session("s206", "child-vikram", "LL-B-01", true, 3, 18),
  session("s207", "child-vikram", "LL-B-01", true, 2, 15),
  session("s208", "child-vikram", "LL-B-01", true, 3, 12),
  session("s209", "child-vikram", "NUM-B-01", true, 3, 20),
  session("s210", "child-vikram", "NUM-B-01", true, 3, 17),
  session("s211", "child-vikram", "NUM-B-01", true, 2, 14),
  session("s212", "child-vikram", "NUM-B-02", true, 3, 19),
  session("s213", "child-vikram", "NUM-B-02", true, 2, 16),
  session("s214", "child-vikram", "NUM-B-02", true, 3, 13),
  session("s215", "child-vikram", "NUM-B-03", true, 3, 18),
  session("s216", "child-vikram", "NUM-B-03", true, 2, 15),
  session("s217", "child-vikram", "NUM-B-03", true, 3, 12),

  // Luca — LL-B-01: achieved, NUM-B all: achieved, NUM-D-01: in_progress
  session("s218", "child-luca", "LL-B-01", true, 3, 17),
  session("s219", "child-luca", "LL-B-01", true, 2, 14),
  session("s220", "child-luca", "LL-B-01", true, 3, 11),
  session("s221", "child-luca", "NUM-B-01", true, 3, 22),
  session("s222", "child-luca", "NUM-B-01", true, 3, 19),
  session("s223", "child-luca", "NUM-B-01", true, 2, 16),
  session("s224", "child-luca", "NUM-B-02", true, 3, 21),
  session("s225", "child-luca", "NUM-B-02", true, 2, 18),
  session("s226", "child-luca", "NUM-B-02", true, 3, 15),
  session("s227", "child-luca", "NUM-B-03", true, 3, 20),
  session("s228", "child-luca", "NUM-B-03", true, 3, 17),
  session("s229", "child-luca", "NUM-B-03", true, 2, 14),
  session("s230", "child-luca", "NUM-D-01", false, 1, 7),
  session("s231", "child-luca", "NUM-D-01", true,  2, 4),

  // Marcus — LL-B-01+02: achieved, LL-D-01: in_progress, NUM-B all: achieved
  session("s232", "child-marcus", "LL-B-01", true, 3, 21),
  session("s233", "child-marcus", "LL-B-01", true, 2, 18),
  session("s234", "child-marcus", "LL-B-01", true, 3, 15),
  session("s235", "child-marcus", "LL-B-02", true, 3, 20),
  session("s236", "child-marcus", "LL-B-02", true, 2, 17),
  session("s237", "child-marcus", "LL-B-02", true, 3, 14),
  session("s238", "child-marcus", "LL-D-01", false, 1, 8),
  session("s239", "child-marcus", "LL-D-01", true,  2, 5),
  session("s240", "child-marcus", "NUM-B-01", true, 3, 22),
  session("s241", "child-marcus", "NUM-B-01", true, 3, 19),
  session("s242", "child-marcus", "NUM-B-01", true, 2, 16),
  session("s243", "child-marcus", "NUM-B-02", true, 3, 21),
  session("s244", "child-marcus", "NUM-B-02", true, 2, 18),
  session("s245", "child-marcus", "NUM-B-02", true, 3, 15),
  session("s246", "child-marcus", "NUM-B-03", true, 3, 20),
  session("s247", "child-marcus", "NUM-B-03", true, 2, 17),
  session("s248", "child-marcus", "NUM-B-03", true, 3, 14),

  // Nabilah — LL-B all: achieved, NUM-B all: achieved, NUM-D-01: in_progress
  session("s249", "child-nabilah", "LL-B-01", true, 3, 25),
  session("s250", "child-nabilah", "LL-B-01", true, 3, 22),
  session("s251", "child-nabilah", "LL-B-01", true, 2, 19),
  session("s252", "child-nabilah", "LL-B-02", true, 3, 24),
  session("s253", "child-nabilah", "LL-B-02", true, 2, 21),
  session("s254", "child-nabilah", "LL-B-02", true, 3, 18),
  session("s255", "child-nabilah", "LL-B-03", true, 3, 23),
  session("s256", "child-nabilah", "LL-B-03", true, 2, 20),
  session("s257", "child-nabilah", "LL-B-03", true, 3, 17),
  session("s258", "child-nabilah", "NUM-B-01", true, 3, 26),
  session("s259", "child-nabilah", "NUM-B-01", true, 3, 23),
  session("s260", "child-nabilah", "NUM-B-01", true, 2, 20),
  session("s261", "child-nabilah", "NUM-B-02", true, 3, 25),
  session("s262", "child-nabilah", "NUM-B-02", true, 2, 22),
  session("s263", "child-nabilah", "NUM-B-02", true, 3, 19),
  session("s264", "child-nabilah", "NUM-B-03", true, 3, 24),
  session("s265", "child-nabilah", "NUM-B-03", true, 2, 21),
  session("s266", "child-nabilah", "NUM-B-03", true, 3, 18),
  session("s267", "child-nabilah", "NUM-D-01", false, 1, 9),
  session("s268", "child-nabilah", "NUM-D-01", true,  2, 5),

  // Leila — LL-B all: achieved, LL-D-01: in_progress, NUM-B all: achieved
  session("s269", "child-leila", "LL-B-01", true, 3, 24),
  session("s270", "child-leila", "LL-B-01", true, 3, 21),
  session("s271", "child-leila", "LL-B-01", true, 2, 18),
  session("s272", "child-leila", "LL-B-02", true, 3, 23),
  session("s273", "child-leila", "LL-B-02", true, 2, 20),
  session("s274", "child-leila", "LL-B-02", true, 3, 17),
  session("s275", "child-leila", "LL-B-03", true, 3, 22),
  session("s276", "child-leila", "LL-B-03", true, 2, 19),
  session("s277", "child-leila", "LL-B-03", true, 3, 16),
  session("s278", "child-leila", "LL-D-01", false, 1, 10),
  session("s279", "child-leila", "LL-D-01", true,  2,  6),
  session("s280", "child-leila", "NUM-B-01", true, 3, 25),
  session("s281", "child-leila", "NUM-B-01", true, 3, 22),
  session("s282", "child-leila", "NUM-B-01", true, 2, 19),
  session("s283", "child-leila", "NUM-B-02", true, 3, 24),
  session("s284", "child-leila", "NUM-B-02", true, 2, 21),
  session("s285", "child-leila", "NUM-B-02", true, 3, 18),
  session("s286", "child-leila", "NUM-B-03", true, 3, 23),
  session("s287", "child-leila", "NUM-B-03", true, 2, 20),
  session("s288", "child-leila", "NUM-B-03", true, 3, 17),

  // Iskandar — LL-B all: achieved, LL-D-01: achieved, NUM-B all: achieved
  session("s289", "child-iskandar", "LL-B-01", true, 3, 28),
  session("s290", "child-iskandar", "LL-B-01", true, 3, 25),
  session("s291", "child-iskandar", "LL-B-01", true, 2, 22),
  session("s292", "child-iskandar", "LL-B-02", true, 3, 27),
  session("s293", "child-iskandar", "LL-B-02", true, 2, 24),
  session("s294", "child-iskandar", "LL-B-02", true, 3, 21),
  session("s295", "child-iskandar", "LL-B-03", true, 3, 26),
  session("s296", "child-iskandar", "LL-B-03", true, 2, 23),
  session("s297", "child-iskandar", "LL-B-03", true, 3, 20),
  session("s298", "child-iskandar", "LL-D-01", true, 3, 18),
  session("s299", "child-iskandar", "LL-D-01", true, 2, 15),
  session("s300", "child-iskandar", "LL-D-01", true, 3, 12),
  session("s301", "child-iskandar", "NUM-B-01", true, 3, 30),
  session("s302", "child-iskandar", "NUM-B-01", true, 3, 27),
  session("s303", "child-iskandar", "NUM-B-01", true, 2, 24),
  session("s304", "child-iskandar", "NUM-B-02", true, 3, 29),
  session("s305", "child-iskandar", "NUM-B-02", true, 2, 26),
  session("s306", "child-iskandar", "NUM-B-02", true, 3, 23),
  session("s307", "child-iskandar", "NUM-B-03", true, 3, 28),
  session("s308", "child-iskandar", "NUM-B-03", true, 2, 25),
  session("s309", "child-iskandar", "NUM-B-03", true, 3, 22),

  // Zaid — LL-B all: achieved, NUM-B all: achieved
  session("s310", "child-zaid", "LL-B-01", true, 3, 27),
  session("s311", "child-zaid", "LL-B-01", true, 3, 24),
  session("s312", "child-zaid", "LL-B-01", true, 2, 21),
  session("s313", "child-zaid", "LL-B-02", true, 3, 26),
  session("s314", "child-zaid", "LL-B-02", true, 2, 23),
  session("s315", "child-zaid", "LL-B-02", true, 3, 20),
  session("s316", "child-zaid", "LL-B-03", true, 3, 25),
  session("s317", "child-zaid", "LL-B-03", true, 2, 22),
  session("s318", "child-zaid", "LL-B-03", true, 3, 19),
  session("s319", "child-zaid", "NUM-B-01", true, 3, 28),
  session("s320", "child-zaid", "NUM-B-01", true, 3, 25),
  session("s321", "child-zaid", "NUM-B-01", true, 2, 22),
  session("s322", "child-zaid", "NUM-B-02", true, 3, 27),
  session("s323", "child-zaid", "NUM-B-02", true, 2, 24),
  session("s324", "child-zaid", "NUM-B-02", true, 3, 21),
  session("s325", "child-zaid", "NUM-B-03", true, 3, 26),
  session("s326", "child-zaid", "NUM-B-03", true, 2, 23),
  session("s327", "child-zaid", "NUM-B-03", true, 3, 20),

  // Jayden — LL-B all + LL-D-01+02: achieved, NUM-B all + NUM-D-01: achieved
  session("s328", "child-jayden", "LL-B-01", true, 3, 40),
  session("s329", "child-jayden", "LL-B-01", true, 3, 37),
  session("s330", "child-jayden", "LL-B-01", true, 2, 34),
  session("s331", "child-jayden", "LL-B-02", true, 3, 38),
  session("s332", "child-jayden", "LL-B-02", true, 2, 35),
  session("s333", "child-jayden", "LL-B-02", true, 3, 32),
  session("s334", "child-jayden", "LL-B-03", true, 3, 36),
  session("s335", "child-jayden", "LL-B-03", true, 2, 33),
  session("s336", "child-jayden", "LL-B-03", true, 3, 30),
  session("s337", "child-jayden", "LL-D-01", true, 3, 28),
  session("s338", "child-jayden", "LL-D-01", true, 2, 25),
  session("s339", "child-jayden", "LL-D-01", true, 3, 22),
  session("s340", "child-jayden", "LL-D-02", true, 3, 20),
  session("s341", "child-jayden", "LL-D-02", true, 2, 17),
  session("s342", "child-jayden", "LL-D-02", true, 3, 14),
  session("s343", "child-jayden", "NUM-B-01", true, 3, 42),
  session("s344", "child-jayden", "NUM-B-01", true, 3, 39),
  session("s345", "child-jayden", "NUM-B-01", true, 2, 36),
  session("s346", "child-jayden", "NUM-B-02", true, 3, 40),
  session("s347", "child-jayden", "NUM-B-02", true, 2, 37),
  session("s348", "child-jayden", "NUM-B-02", true, 3, 34),
  session("s349", "child-jayden", "NUM-B-03", true, 3, 38),
  session("s350", "child-jayden", "NUM-B-03", true, 2, 35),
  session("s351", "child-jayden", "NUM-B-03", true, 3, 32),
  session("s352", "child-jayden", "NUM-D-01", true, 3, 28),
  session("s353", "child-jayden", "NUM-D-01", true, 2, 25),
  session("s354", "child-jayden", "NUM-D-01", true, 3, 22),

  // Yuki — LL-B all + LL-D-01: achieved, NUM-B all + NUM-D-01+02: achieved
  session("s355", "child-yuki", "LL-B-01", true, 3, 45),
  session("s356", "child-yuki", "LL-B-01", true, 3, 42),
  session("s357", "child-yuki", "LL-B-01", true, 2, 39),
  session("s358", "child-yuki", "LL-B-02", true, 3, 43),
  session("s359", "child-yuki", "LL-B-02", true, 2, 40),
  session("s360", "child-yuki", "LL-B-02", true, 3, 37),
  session("s361", "child-yuki", "LL-B-03", true, 3, 41),
  session("s362", "child-yuki", "LL-B-03", true, 2, 38),
  session("s363", "child-yuki", "LL-B-03", true, 3, 35),
  session("s364", "child-yuki", "LL-D-01", true, 3, 32),
  session("s365", "child-yuki", "LL-D-01", true, 2, 29),
  session("s366", "child-yuki", "LL-D-01", true, 3, 26),
  session("s367", "child-yuki", "NUM-B-01", true, 3, 50),
  session("s368", "child-yuki", "NUM-B-01", true, 3, 47),
  session("s369", "child-yuki", "NUM-B-01", true, 2, 44),
  session("s370", "child-yuki", "NUM-B-02", true, 3, 48),
  session("s371", "child-yuki", "NUM-B-02", true, 2, 45),
  session("s372", "child-yuki", "NUM-B-02", true, 3, 42),
  session("s373", "child-yuki", "NUM-B-03", true, 3, 46),
  session("s374", "child-yuki", "NUM-B-03", true, 2, 43),
  session("s375", "child-yuki", "NUM-B-03", true, 3, 40),
  session("s376", "child-yuki", "NUM-D-01", true, 3, 35),
  session("s377", "child-yuki", "NUM-D-01", true, 2, 32),
  session("s378", "child-yuki", "NUM-D-01", true, 3, 29),
  session("s379", "child-yuki", "NUM-D-02", true, 3, 25),
  session("s380", "child-yuki", "NUM-D-02", true, 2, 22),
  session("s381", "child-yuki", "NUM-D-02", true, 3, 19),

  // Phoebe — LL-B all + LL-D all: achieved, NUM-B all + NUM-D-01: achieved
  session("s382", "child-phoebe", "LL-B-01", true, 3, 55),
  session("s383", "child-phoebe", "LL-B-01", true, 3, 52),
  session("s384", "child-phoebe", "LL-B-01", true, 2, 49),
  session("s385", "child-phoebe", "LL-B-02", true, 3, 53),
  session("s386", "child-phoebe", "LL-B-02", true, 2, 50),
  session("s387", "child-phoebe", "LL-B-02", true, 3, 47),
  session("s388", "child-phoebe", "LL-B-03", true, 3, 51),
  session("s389", "child-phoebe", "LL-B-03", true, 2, 48),
  session("s390", "child-phoebe", "LL-B-03", true, 3, 45),
  session("s391", "child-phoebe", "LL-D-01", true, 3, 42),
  session("s392", "child-phoebe", "LL-D-01", true, 2, 39),
  session("s393", "child-phoebe", "LL-D-01", true, 3, 36),
  session("s394", "child-phoebe", "LL-D-02", true, 3, 33),
  session("s395", "child-phoebe", "LL-D-02", true, 2, 30),
  session("s396", "child-phoebe", "LL-D-02", true, 3, 27),
  session("s397", "child-phoebe", "LL-D-03", true, 3, 24),
  session("s398", "child-phoebe", "LL-D-03", true, 2, 21),
  session("s399", "child-phoebe", "LL-D-03", true, 3, 18),
  session("s400", "child-phoebe", "NUM-B-01", true, 3, 58),
  session("s401", "child-phoebe", "NUM-B-01", true, 3, 55),
  session("s402", "child-phoebe", "NUM-B-01", true, 2, 52),
  session("s403", "child-phoebe", "NUM-B-02", true, 3, 56),
  session("s404", "child-phoebe", "NUM-B-02", true, 2, 53),
  session("s405", "child-phoebe", "NUM-B-02", true, 3, 50),
  session("s406", "child-phoebe", "NUM-B-03", true, 3, 54),
  session("s407", "child-phoebe", "NUM-B-03", true, 2, 51),
  session("s408", "child-phoebe", "NUM-B-03", true, 3, 48),
  session("s409", "child-phoebe", "NUM-D-01", true, 3, 42),
  session("s410", "child-phoebe", "NUM-D-01", true, 2, 39),
  session("s411", "child-phoebe", "NUM-D-01", true, 3, 36),
];

// ─── Demo teacher observations ────────────────────────────────────────────

function obs(
  id: string,
  childId: string,
  milestoneId: string,
  daysAgo: number,
  note?: string,
  teacherId?: string
): TeacherObservation {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const row: TeacherObservation = {
    id,
    childId,
    milestoneId,
    observedAt: d.toISOString().slice(0, 10),
  };
  if (note) row.note = note;
  if (teacherId) row.teacherId = teacherId;
  return row;
}

export const DEMO_OBSERVATIONS: TeacherObservation[] = [
  // Rayan — SED-B-01: achieved early Feb (5 observations on 5 separate days)
  obs("o001", "child-rayan", "SED-B-01", 60),
  obs("o002", "child-rayan", "SED-B-01", 52),
  obs("o003", "child-rayan", "SED-B-01", 46),
  obs("o004", "child-rayan", "SED-B-01", 43),
  obs("o005", "child-rayan", "SED-B-01", 40), // achieved ~Feb 7

  // Rayan — SED-B-02: in_progress (3 of 5 observations)
  obs("o006", "child-rayan", "SED-B-02", 18),
  obs("o007", "child-rayan", "SED-B-02", 11),
  obs("o008", "child-rayan", "SED-B-02",  5),

  // Mei — SED-B-01: in_progress (2 of 5 observations)
  obs("o009", "child-mei", "SED-B-01", 10),
  obs("o010", "child-mei", "SED-B-01",  5),

  // Aryan — SED-B-01: achieved (5 observations)
  obs("o011", "child-aryan", "SED-B-01", 21),
  obs("o012", "child-aryan", "SED-B-01", 17),
  obs("o013", "child-aryan", "SED-B-01", 13),
  obs("o014", "child-aryan", "SED-B-01",  9),
  obs("o015", "child-aryan", "SED-B-01",  4),

  // Fatimah — SED-B-01: in_progress (2 observations)
  obs("o016", "child-fatimah", "SED-B-01", 12),
  obs("o017", "child-fatimah", "SED-B-01",  6),

  // Jing Wei — SED-B-01: achieved, SED-B-02: in_progress (3 obs)
  obs("o018", "child-jingwei", "SED-B-01", 22),
  obs("o019", "child-jingwei", "SED-B-01", 18),
  obs("o020", "child-jingwei", "SED-B-01", 14),
  obs("o021", "child-jingwei", "SED-B-01",  9),
  obs("o022", "child-jingwei", "SED-B-01",  4),
  obs("o023", "child-jingwei", "SED-B-02", 15),
  obs("o024", "child-jingwei", "SED-B-02",  8),
  obs("o025", "child-jingwei", "SED-B-02",  3),

  // Nurul — SED-B-01: in_progress (3 observations)
  obs("o026", "child-nurul", "SED-B-01", 16),
  obs("o027", "child-nurul", "SED-B-01", 10),
  obs("o028", "child-nurul", "SED-B-01",  4),

  // Ethan — SED-B-01: achieved
  obs("o029", "child-ethan", "SED-B-01", 20),
  obs("o030", "child-ethan", "SED-B-01", 15),
  obs("o031", "child-ethan", "SED-B-01", 10),
  obs("o032", "child-ethan", "SED-B-01",  6),
  obs("o033", "child-ethan", "SED-B-01",  2),

  // Rohan — SED-B-01: in_progress (3 observations)
  obs("o034", "child-rohan", "SED-B-01", 14),
  obs("o035", "child-rohan", "SED-B-01",  8),
  obs("o036", "child-rohan", "SED-B-01",  3),

  // Zoe — SED-B-01: achieved
  obs("o037", "child-zoe", "SED-B-01", 19),
  obs("o038", "child-zoe", "SED-B-01", 14),
  obs("o039", "child-zoe", "SED-B-01",  9),
  obs("o040", "child-zoe", "SED-B-01",  5),
  obs("o041", "child-zoe", "SED-B-01",  1),

  // Aisha — sample SED observation (parent home feed)
  obs(
    "o-aisha-sed1",
    "child-aisha",
    "SED-B-02",
    3,
    "Offered to help a friend tidy up after craft.",
    "teacher-1"
  ),

  // ── Kingfisher N1: children with no prior observations ───────────────────

  // Omar — SED-B-01: in_progress (1 observation)
  obs("o049", "child-omar",  "SED-B-01", 8),

  // Sara — SED-B-01: in_progress (2 observations)
  obs("o050", "child-sara",  "SED-B-01", 14),
  obs("o051", "child-sara",  "SED-B-01",  7),

  // ── Sparrow K2 ────────────────────────────────────────────────────────────

  // Amir — SED-B-01: in_progress (2 observations)
  obs("o042", "child-amir", "SED-B-01", 12),
  obs("o043", "child-amir", "SED-B-01",  6),

  // Clara — SED-B-01: achieved
  obs("o044", "child-clara", "SED-B-01", 20),
  obs("o045", "child-clara", "SED-B-01", 15),
  obs("o046", "child-clara", "SED-B-01", 10),
  obs("o047", "child-clara", "SED-B-01",  6),
  obs("o048", "child-clara", "SED-B-01",  2),

  // Jessica — SED-B-01: in_progress (3 observations)
  obs("o052", "child-jessica", "SED-B-01", 18),
  obs("o053", "child-jessica", "SED-B-01", 12),
  obs("o054", "child-jessica", "SED-B-01",  5),

  // Vikram — SED-B-01: achieved (5 observations on 5 days)
  obs("o055", "child-vikram", "SED-B-01", 25),
  obs("o056", "child-vikram", "SED-B-01", 20),
  obs("o057", "child-vikram", "SED-B-01", 14),
  obs("o058", "child-vikram", "SED-B-01",  9),
  obs("o059", "child-vikram", "SED-B-01",  4),

  // Marcus — SED-B-01: achieved (5 observations)
  obs("o060", "child-marcus", "SED-B-01", 28),
  obs("o061", "child-marcus", "SED-B-01", 22),
  obs("o062", "child-marcus", "SED-B-01", 16),
  obs("o063", "child-marcus", "SED-B-01", 10),
  obs("o064", "child-marcus", "SED-B-01",  4),

  // Nabilah — SED-B-01: achieved (5 observations)
  obs("o065", "child-nabilah", "SED-B-01", 30),
  obs("o066", "child-nabilah", "SED-B-01", 25),
  obs("o067", "child-nabilah", "SED-B-01", 19),
  obs("o068", "child-nabilah", "SED-B-01", 13),
  obs("o069", "child-nabilah", "SED-B-01",  6),

  // Leila — SED-B-01: achieved (5 observations)
  obs("o070", "child-leila", "SED-B-01", 32),
  obs("o071", "child-leila", "SED-B-01", 26),
  obs("o072", "child-leila", "SED-B-01", 20),
  obs("o073", "child-leila", "SED-B-01", 14),
  obs("o074", "child-leila", "SED-B-01",  7),

  // Iskandar — SED-B-01: in_progress (3 obs), SED-B-02: in_progress (3 obs)
  obs("o075", "child-iskandar", "SED-B-01", 20),
  obs("o076", "child-iskandar", "SED-B-01", 14),
  obs("o077", "child-iskandar", "SED-B-01",  7),
  obs("o078", "child-iskandar", "SED-B-02", 18),
  obs("o079", "child-iskandar", "SED-B-02", 11),
  obs("o080", "child-iskandar", "SED-B-02",  5),

  // Zaid — SED-B-01: in_progress (4 observations)
  obs("o081", "child-zaid", "SED-B-01", 24),
  obs("o082", "child-zaid", "SED-B-01", 18),
  obs("o083", "child-zaid", "SED-B-01", 11),
  obs("o084", "child-zaid", "SED-B-01",  5),

  // Jayden — SED-B-01: achieved, SED-B-02: achieved
  obs("o085", "child-jayden", "SED-B-01", 50),
  obs("o086", "child-jayden", "SED-B-01", 44),
  obs("o087", "child-jayden", "SED-B-01", 38),
  obs("o088", "child-jayden", "SED-B-01", 32),
  obs("o089", "child-jayden", "SED-B-01", 26),
  obs("o090", "child-jayden", "SED-B-02", 22),
  obs("o091", "child-jayden", "SED-B-02", 16),
  obs("o092", "child-jayden", "SED-B-02", 11),
  obs("o093", "child-jayden", "SED-B-02",  6),
  obs("o094", "child-jayden", "SED-B-02",  2),

  // Yuki — SED-B-01: achieved, SED-B-02: achieved, SED-B-03: achieved
  obs("o095", "child-yuki", "SED-B-01", 60),
  obs("o096", "child-yuki", "SED-B-01", 54),
  obs("o097", "child-yuki", "SED-B-01", 47),
  obs("o098", "child-yuki", "SED-B-01", 41),
  obs("o099", "child-yuki", "SED-B-01", 35),
  obs("o100", "child-yuki", "SED-B-02", 30),
  obs("o101", "child-yuki", "SED-B-02", 24),
  obs("o102", "child-yuki", "SED-B-02", 18),
  obs("o103", "child-yuki", "SED-B-02", 12),
  obs("o104", "child-yuki", "SED-B-02",  6),
  obs("o105", "child-yuki", "SED-B-03", 20),
  obs("o106", "child-yuki", "SED-B-03", 15),
  obs("o107", "child-yuki", "SED-B-03", 10),
  obs("o108", "child-yuki", "SED-B-03",  5),
  obs("o109", "child-yuki", "SED-B-03",  1),

  // Phoebe — SED-B-01: achieved, SED-B-02: achieved, SED-B-03: achieved, SED-D-01: in_progress (3 obs)
  obs("o110", "child-phoebe", "SED-B-01", 70),
  obs("o111", "child-phoebe", "SED-B-01", 63),
  obs("o112", "child-phoebe", "SED-B-01", 57),
  obs("o113", "child-phoebe", "SED-B-01", 51),
  obs("o114", "child-phoebe", "SED-B-01", 45),
  obs("o115", "child-phoebe", "SED-B-02", 40),
  obs("o116", "child-phoebe", "SED-B-02", 34),
  obs("o117", "child-phoebe", "SED-B-02", 28),
  obs("o118", "child-phoebe", "SED-B-02", 22),
  obs("o119", "child-phoebe", "SED-B-02", 16),
  obs("o120", "child-phoebe", "SED-B-03", 28),
  obs("o121", "child-phoebe", "SED-B-03", 22),
  obs("o122", "child-phoebe", "SED-B-03", 16),
  obs("o123", "child-phoebe", "SED-B-03", 10),
  obs("o124", "child-phoebe", "SED-B-03",  4),
  obs("o125", "child-phoebe", "SED-D-01", 15),
  obs("o126", "child-phoebe", "SED-D-01",  9),
  obs("o127", "child-phoebe", "SED-D-01",  3),
];

// ─── Demo planned activities ───────────────────────────────────────────────
// Spread across Mon–Thu of the current week so the calendar has content on multiple days

function weekDay(offsetFromMonday: number): string {
  const monday = new Date(getWeekStart() + "T00:00:00");
  monday.setDate(monday.getDate() + offsetFromMonday);
  return monday.toISOString().slice(0, 10);
}

export const DEMO_PLANNED_ACTIVITIES: PlannedActivity[] = [
  {
    id: "act-001",
    classId: "class-1",
    title: "Letter Hunt",
    description:
      "Walk around the classroom together and point to letters on signs, books, and labels. Ask each child to name the letter they spot.",
    areaId: "LL",
    milestoneId: "LL-B-02",
    childIds: ["child-mei", "child-omar", "child-priya", "child-kai", "child-sara", "child-darius", "child-fatimah", "child-nathan", "child-siti"],
    date: weekDay(0), // Monday
    startTime: "09:00",
    durationMins: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: "act-002",
    classId: "class-1",
    title: "Sound Sorting Game",
    description:
      "Lay out picture cards face up. Say a beginning sound and ask children to collect all the cards that start with that sound. Swap sounds each round.",
    areaId: "LL",
    milestoneId: "LL-D-02",
    childIds: ["child-rayan", "child-aisha", "child-jingwei", "child-nurul", "child-ethan", "child-nadia"],
    date: weekDay(1), // Tuesday
    startTime: "10:00",
    durationMins: 20,
    createdAt: new Date().toISOString(),
  },
  {
    id: "act-003",
    classId: "class-1",
    title: "Counting with Objects",
    description:
      "Use counters, buttons, or small toys. Ask children to count a set of objects into numbered boxes (1–10), touching each one as they count.",
    areaId: "NUM",
    milestoneId: "NUM-B-01",
    childIds: ["child-mei", "child-omar", "child-priya", "child-kai", "child-sara", "child-darius", "child-aryan", "child-lakshmi", "child-rohan", "child-darren"],
    date: weekDay(2), // Wednesday
    startTime: "10:30",
    durationMins: 25,
    createdAt: new Date().toISOString(),
  },
  {
    id: "act-004",
    classId: "class-1",
    title: "Feelings Story Circle",
    description:
      "Read a short picture book to the class. Pause after key moments and ask: 'How do you think this character feels? What made them feel that way?' Encourage children to explain causes, not just name emotions.",
    areaId: "SED",
    milestoneId: "SED-D-01",
    childIds: [
      "child-rayan", "child-aisha", "child-mei", "child-omar",
      "child-priya", "child-kai", "child-sara", "child-darius",
      "child-aryan", "child-fatimah", "child-jingwei", "child-lakshmi",
      "child-nathan", "child-nurul", "child-ethan", "child-siti",
      "child-rohan", "child-zoe", "child-darren", "child-nadia",
    ],
    date: weekDay(3), // Thursday
    startTime: "11:15",
    durationMins: 30,
    createdAt: new Date().toISOString(),
  },

  // Sparrow K2 activities
  {
    id: "act-005",
    classId: "class-2",
    title: "Name Recognition Game",
    description:
      "Write each child's name on a card. Mix the cards up and ask children to find their own name, then a friend's name. Ask them to trace the letters with their finger.",
    areaId: "LL",
    milestoneId: "LL-B-01",
    childIds: ["child-bao", "child-dev"],
    date: weekDay(0), // Monday
    createdAt: new Date().toISOString(),
  },
  {
    id: "act-006",
    classId: "class-2",
    title: "Counting Circle",
    description:
      "Sit in a circle. Pass a bean bag around — each child says the next number. When you reach 10, reverse direction and count down. Repeat with different objects.",
    areaId: "NUM",
    milestoneId: "NUM-B-01",
    childIds: ["child-amir", "child-bao", "child-clara", "child-dev", "child-elise"],
    date: weekDay(2), // Wednesday
    createdAt: new Date().toISOString(),
  },
];

export const DEMO_ACTIVITY_FEEDBACK: ActivityFeedback[] = [
  {
    id: "fb-001",
    activityId: "act-004",
    childId: "child-rayan",
    note: "Rayan confidently explained that the bear was sad because his friend left. He linked the cause and feeling without prompting.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-002",
    activityId: "act-004",
    childId: "child-mei",
    note: "Mei could name the emotion (sad) but needed prompting to explain why. Will revisit with a simpler scenario next week.",
    createdAt: new Date().toISOString(),
  },
];

// ─── Demo teacher updates ───────────────────────────────────────────────────

function chatMsg(
  id: string,
  childId: string,
  senderId: string,
  senderType: ChatMessage["senderType"],
  kind: ChatMessage["kind"],
  text: string,
  media: ChatMessage["media"],
  daysAgo: number,
  hoursOffset = 0,
  readAt?: string
): ChatMessage {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(d.getHours() - hoursOffset);
  return { id, childId, senderId, senderType, kind, text, media, createdAt: d.toISOString(), readAt };
}

// Class-1 children IDs for broadcast messages
const CLASS_1_CHILDREN = [
  "child-rayan", "child-aisha", "child-mei", "child-omar",
  "child-priya", "child-kai", "child-sara", "child-darius",
  "child-aryan", "child-fatimah", "child-jingwei",
];

function broadcast(
  idPrefix: string,
  senderId: string,
  kind: ChatMessage["kind"],
  text: string,
  media: ChatMessage["media"],
  daysAgo: number
): ChatMessage[] {
  return CLASS_1_CHILDREN.map((childId, i) =>
    chatMsg(`${idPrefix}-${i}`, childId, senderId, "teacher", kind, text, media, daysAgo)
  );
}

export const DEMO_CHAT_MESSAGES: ChatMessage[] = [
  // Broadcast: art session (whole class, progress update)
  ...broadcast(
    "chat-art",
    "teacher-1",
    "progress_update",
    "We had a wonderful art session today! The children painted butterflies and practiced their fine motor skills. So proud of everyone's creativity!",
    [{ type: "photo", url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400" }],
    1
  ),

  // Broadcast: story time (whole class, regular message)
  ...broadcast(
    "chat-story",
    "teacher-1",
    "message",
    "Story time with our favourite book today. The children loved predicting what happens next!",
    [{ type: "photo", url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" }],
    3
  ),

  // Per-child: progress update for Rayan
  chatMsg("chat-rayan-pu1", "child-rayan", "teacher-1", "teacher", "progress_update",
    "Rayan reached a new milestone today — he was able to identify and write all the letters in his name independently! His letter recognition is really coming along.",
    [], 2),

  // Per-child: regular message for Rayan
  chatMsg("chat-rayan-m1", "child-rayan", "teacher-1", "teacher", "message",
    "Rayan had a great day today. He was very engaged during our counting activity and helped his friends when they were unsure of the answers.",
    [], 4),

  // Parent reply for Rayan — older, already read
  chatMsg("chat-rayan-p1", "child-rayan", "parent-ahmed", "parent", "message",
    "Thank you for sharing! He's been practicing his letters at home too. Great to hear he's making progress.",
    [], 4, 2, "2026-03-16T08:00:00.000Z"),

  // Per-child: messages for Aisha
  chatMsg("chat-aisha-pu1", "child-aisha", "teacher-1", "teacher", "progress_update",
    "Aisha completed the letter tracing activity with excellent control today. She's developing strong fine motor skills and pencil grip.",
    [], 2),
  chatMsg("chat-aisha-m1", "child-aisha", "teacher-1", "teacher", "message",
    "Aisha and Rayan worked beautifully together during our letter hunt activity. They helped each other find letters around the classroom!",
    [], 2, 3),

  // Parent reply for Aisha — unread
  chatMsg("chat-aisha-p1", "child-aisha", "parent-lin", "parent", "message",
    "Thank you! She's been very excited about school this week. Can we schedule a quick call to discuss her progress?",
    [], 0, 2),

  // Per-child: messages for Mei
  chatMsg("chat-mei-m1", "child-mei", "teacher-1", "teacher", "message",
    "Mei was quietly observant during group time today — she asked a really thoughtful question about the story that impressed the whole class.",
    [], 5),

  // Parent message for Mei — unread
  chatMsg("chat-mei-p1", "child-mei", "parent-mei", "parent", "message",
    "Mei mentioned she loves the story sessions. Is there a book list we can follow at home?",
    [], 1, 0),
];

// ─── Demo personality snapshots ─────────────────────────────────────────────

export const DEMO_PERSONALITY_SNAPSHOTS: PersonalitySnapshot[] = [
  {
    childId: "child-aisha",
    content:
      "Curious and methodical — she likes to understand something fully before she tries it, so she may seem slow to start but rarely makes mistakes once she begins. She responds well to being given a helper role. She is close to Kai and learns better when seated near him. Tends to go quiet rather than asking for help when confused — check in proactively.",
    updatedAt: "2026-03-10T09:15:00.000Z",
  },
  {
    childId: "child-rayan",
    content:
      "High energy and enthusiastic — jumps into activities without hesitation. Works well in pairs but loses focus in larger groups. Responds strongly to visual timers and clear step-by-step instructions. Becomes frustrated quickly when a task is too hard; try breaking it into smaller steps.",
    updatedAt: "2026-03-08T10:00:00.000Z",
  },
  {
    childId: "child-mei",
    content:
      "Very observant and quiet — she takes everything in before she speaks. One of the most socially perceptive children in the class. Prefers one-on-one or small group work over whole-class activities. Warms up slowly with new teachers; give her time.",
    updatedAt: "2026-03-05T11:30:00.000Z",
  },
];

// ─── Demo teacher strategies ─────────────────────────────────────────────────

export const DEMO_TEACHER_STRATEGIES: TeacherStrategies[] = [
  {
    childId: "child-aisha",
    whatWorks:
      "Give her a helper role at the start of an activity — she settles faster\n2-minute transition warning before switching activities\nSeat near Kai — they work well together",
    whatToWatch:
      "Goes quiet rather than asking for help — check in proactively when she seems stuck\nCan get overwhelmed in noisy, large-group transitions",
    updatedAt: "2026-03-10T09:20:00.000Z",
  },
  {
    childId: "child-rayan",
    whatWorks:
      "Use a visual timer during centre play — he transitions without meltdown when he can see the time\nPair with a calmer child for collaborative tasks",
    whatToWatch:
      "Watch for frustration cues (clenching hands, turning away) — intervene early before it escalates",
    updatedAt: "2026-03-08T10:05:00.000Z",
  },
];

// ─── Demo family contexts ─────────────────────────────────────────────────────

export const DEMO_FAMILY_CONTEXTS: FamilyContext[] = [
  {
    childId: "child-aisha",
    content:
      "Parents separated Oct 2024. Both on the authorised pickup list — Mum (primary contact) Mon/Wed/Fri, Dad Tue/Thu. They prefer separate communication. Aisha has been quieter at drop-off since the change — normal settling behaviour per counsellor.",
    updatedAt: "2026-02-15T11:00:00.000Z",
  },
  {
    childId: "child-nadia",
    content:
      "Family moved house in Feb 2026 — some disruption to routine expected. Mum (Mdm Farah) is the primary contact and is very responsive on the app.",
    updatedAt: "2026-02-20T09:00:00.000Z",
  },
];

// ─── Demo teacher notes ───────────────────────────────────────────────────────

export const DEMO_TEACHER_NOTES: TeacherNote[] = [
  {
    id: "tnote-001",
    childId: "child-aisha",
    content:
      "Completed the letter matching activity independently today — stayed on task for the full 15 minutes without a check-in. First time I've seen her this focused.",
    tags: ["learning", "milestone_moment"],
    welfare: false,
    createdAt: "2026-03-15T10:30:00.000Z",
  },
  {
    id: "tnote-002",
    childId: "child-aisha",
    content:
      "Noticeably quiet at drop-off this week. Took about 20 minutes to settle. Spoke briefly with Mdm Nur — she mentioned some ongoing family adjustment. Nothing alarming but worth monitoring.",
    tags: ["welfare", "family"],
    welfare: true,
    createdAt: "2026-03-12T09:00:00.000Z",
  },
  {
    id: "tnote-003",
    childId: "child-aisha",
    content:
      "Helped Nurul during the sorting activity today without being asked — explained the pattern to her very patiently. Really positive social moment.",
    tags: ["social"],
    welfare: false,
    createdAt: "2026-03-10T14:00:00.000Z",
  },
  {
    id: "tnote-004",
    childId: "child-rayan",
    content:
      "Used the visual timer during centre play for the first time — transitioned to clean-up without any difficulty. This is significant improvement from last week.",
    tags: ["behaviour"],
    welfare: false,
    createdAt: "2026-03-14T11:00:00.000Z",
  },
  {
    id: "tnote-005",
    childId: "child-rayan",
    content:
      "Peanut allergy incident — child touched a snack brought in by another family. EpiPen was not needed but parents were informed immediately. Incident report filed.",
    tags: ["welfare"],
    welfare: true,
    createdAt: "2026-03-06T12:30:00.000Z",
  },
  {
    id: "tnote-006",
    childId: "child-mei",
    content:
      "Spoke up in group circle for the first time today — shared her observation about the caterpillar without prompting. Small moment but big for her.",
    tags: ["social", "milestone_moment"],
    welfare: false,
    createdAt: "2026-03-13T09:45:00.000Z",
  },
];

// ─── Demo calendar holidays ────────────────────────────────────────────────

export const DEMO_CALENDAR_HOLIDAYS: CalendarHoliday[] = [
  // Org-wide public holidays & observances (Singapore 2026 + school observances)
  {
    id: "holiday-001",
    organisationId: "org-1",
    schoolId: null,
    title: "New Year's Day",
    startDate: "2026-01-01",
    endDate: "2026-01-01",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-002",
    organisationId: "org-1",
    schoolId: null,
    title: "Chinese New Year",
    startDate: "2026-02-17",
    endDate: "2026-02-18",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-003",
    organisationId: "org-1",
    schoolId: null,
    title: "Hari Raya Puasa",
    startDate: "2026-03-21",
    endDate: "2026-03-21",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-004",
    organisationId: "org-1",
    schoolId: null,
    title: "My First Skool's Continuing Professional Development Day",
    startDate: "2026-03-27",
    endDate: "2026-03-27",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-005",
    organisationId: "org-1",
    schoolId: null,
    title: "Good Friday",
    startDate: "2026-04-03",
    endDate: "2026-04-03",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-006",
    organisationId: "org-1",
    schoolId: null,
    title: "My First Skool's Operations & Quality Day #1",
    startDate: "2026-04-30",
    endDate: "2026-04-30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-007",
    organisationId: "org-1",
    schoolId: null,
    title: "Labour Day",
    startDate: "2026-05-01",
    endDate: "2026-05-01",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-008",
    organisationId: "org-1",
    schoolId: null,
    title: "My First Skool's Festival",
    startDate: "2026-05-22",
    endDate: "2026-05-22",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-009",
    organisationId: "org-1",
    schoolId: null,
    title: "Hari Raya Haji",
    startDate: "2026-05-27",
    endDate: "2026-05-27",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-010",
    organisationId: "org-1",
    schoolId: null,
    title: "Vesak Day",
    startDate: "2026-05-31",
    endDate: "2026-06-01",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-011",
    organisationId: "org-1",
    schoolId: null,
    title: "My First Skool's Health & Wellness Day",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-012",
    organisationId: "org-1",
    schoolId: null,
    title: "National Day",
    startDate: "2026-08-09",
    endDate: "2026-08-10",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-013",
    organisationId: "org-1",
    schoolId: null,
    title: "Teacher's Day",
    startDate: "2026-09-04",
    endDate: "2026-09-04",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-014",
    organisationId: "org-1",
    schoolId: null,
    title: "Children's Day",
    startDate: "2026-10-02",
    endDate: "2026-10-02",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-015",
    organisationId: "org-1",
    schoolId: null,
    title: "Deepavali",
    startDate: "2026-11-08",
    endDate: "2026-11-09",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-016",
    organisationId: "org-1",
    schoolId: null,
    title: "My First Skool's Annual Centres' Planning Day",
    startDate: "2026-11-13",
    endDate: "2026-11-13",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-017",
    organisationId: "org-1",
    schoolId: null,
    title: "My First Skool's Operations & Quality Day #2",
    startDate: "2026-12-04",
    endDate: "2026-12-04",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "holiday-018",
    organisationId: "org-1",
    schoolId: null,
    title: "Christmas",
    startDate: "2026-12-25",
    endDate: "2026-12-25",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

// ─── Demo class schedules ──────────────────────────────────────────────────
// Kingfisher N1 weekly programme (repeats every week, full academic year)
// Daily structure: 08:00–12:00 morning, 12:00–16:00 midday, 16:00–19:00 afternoon

export const DEMO_CLASS_SCHEDULES: ClassSchedule[] = [
  // ── Daily fixed blocks (every weekday) ────────────────────────────────────
  {
    id: "sched-n1-breakfast",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Breakfast & Morning Routines",
    description: "Children arrive, wash hands, eat breakfast, and settle in. Teachers greet each child and check in on how they're feeling.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "08:00",
    endTime: "08:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-outdoor",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Outdoor Play",
    description: "Supervised free play in the outdoor area. Children develop gross motor skills, take healthy risks, and build friendships through unstructured movement.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "10:00",
    endTime: "10:45",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-circletime",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Circle Time & Morning Snack",
    description: "Group gathering on the carpet: teachers lead a short discussion, read a picture book, or revisit the morning's theme. Mid-way break for morning snack and handwashing.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "10:45",
    endTime: "12:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-lunch",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Lunch & Self-Care",
    description: "Children eat lunch and practise self-care skills: washing hands, serving themselves, and tidying up after eating.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "12:00",
    endTime: "12:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-nap",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Rest Time",
    description: "Quiet rest on mats with soft music. Teachers circulate to soothe children who need support settling.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "12:30",
    endTime: "14:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-routinecare",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Routine Care & Sing-Along",
    description: "Post-nap hygiene routines (toileting, handwashing, changing) followed by a group sing-along to familiar songs. A calm transition back into the afternoon.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "14:30",
    endTime: "15:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-teatime",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Teatime",
    description: "Afternoon snack. Children practise table manners and conversation skills in a relaxed group setting.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "15:30",
    endTime: "16:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-freeplay",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Free Play & Fine Motor Activities",
    description: "Child-led exploration across learning stations: puzzles, playdough, threading, drawing, and building. Teachers observe and document play.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "16:00",
    endTime: "17:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-storytelling",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Storytelling",
    description: "Teacher-led read-aloud or oral storytelling. Children ask questions, predict outcomes, and retell parts of the story.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "17:30",
    endTime: "18:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-hometime",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Home Sweet Home",
    description: "End-of-day wind-down. Children pack their bags, collect artwork, and wait for pick-up. Teachers share brief highlights of the day with caregivers.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "18:30",
    endTime: "19:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  // ── Rotating morning blocks (domain-specific, by day of week) ─────────────
  {
    id: "sched-n1-music-mon",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Music & Movement",
    description: "Singing, clapping rhythms, and moving to music. Supports early literacy through rhyme and phonological awareness.",
    recurrence: "weekly",
    daysOfWeek: [1], // Monday
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "08:30",
    endTime: "10:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-sensory-tue",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Sensory Play",
    description: "Guided exploration with sand, water, clay, and textured materials. Children describe what they observe, building scientific thinking and vocabulary.",
    recurrence: "weekly",
    daysOfWeek: [2], // Tuesday
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "08:30",
    endTime: "10:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-creative-wed",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Creative Expressions",
    description: "Art and craft using paints, collage, and loose parts. Children represent their ideas visually and develop number concepts through counting and sorting materials.",
    recurrence: "weekly",
    daysOfWeek: [3], // Wednesday
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "08:30",
    endTime: "10:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-mothertongue-thu",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Mother Tongue Songs & Stories",
    description: "Songs, rhymes, and picture books in children's mother tongue languages (Mandarin, Malay, Tamil). Celebrates cultural identity and builds early multilingual literacy.",
    recurrence: "weekly",
    daysOfWeek: [4], // Thursday
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "08:30",
    endTime: "10:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-n1-discovery-fri",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "N1",
    title: "Discovery Play",
    description: "Open-ended exploration with blocks, loose parts, and role-play props. Children collaborate, negotiate, and develop early social skills through play.",
    recurrence: "weekly",
    daysOfWeek: [5], // Friday
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "08:30",
    endTime: "10:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  // ── Sparrow K2 daily programme ────────────────────────────────────────────
  {
    id: "sched-k2-breakfast",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Breakfast",
    description: "Nutritious meals prepared in line with Health Promotion Board guidelines. Children clean up after themselves, reinforcing daily routines that build independence.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "08:00",
    endTime: "08:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-assembly",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Assembly",
    description: "Children participate in morning exercises and recite the national anthem and pledge. This daily tradition builds a sense of unity, pride, and appreciation for their country.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "08:30",
    endTime: "09:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-morningmessage",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Current Affairs & Morning Message",
    description: "Children are introduced to local news and cultural events in ways that spark conversation and curiosity. Encourages inquiry-based thinking, communication skills, and critical reflection.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "09:00",
    endTime: "09:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-curriculum",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Core Curriculum",
    description: "One hour of English and one hour of Chinese, taught by native or fluent speakers. Activities include show-and-tell, letter recognition, reading, and conversation — building early literacy and bilingual confidence.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "09:30",
    endTime: "11:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-creative",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Creative Expressions",
    description: "Children explore painting, drawing, and construction with peers. Art corners and manipulatives encourage imagination, problem-solving, and collaboration.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "11:30",
    endTime: "12:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-lunch",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Lunch",
    description: "Healthy meals prepared to HPB standards, tailored for individual dietary needs. Lunch reinforces good table manners, healthy eating habits, and social conversation.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "12:00",
    endTime: "12:45",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-music",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Music & Movement",
    description: "Children explore basic instruments, rhythms, and movement activities. Supports language development, coordination, and emotional expression in a fun and engaging setting.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "12:45",
    endTime: "13:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-break",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Mid-afternoon Break",
    description: "A short rest to reset and reflect on the morning's learning. Prepares children mentally and emotionally for the rest of the day.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "13:30",
    endTime: "14:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-freeplay",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Free Choice Play",
    description: "Children choose their own activities, exploring personal interests and developing leadership, cooperation, and decision-making. Supports self-directed learning and social awareness.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "14:00",
    endTime: "15:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-teatime",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Teatime",
    description: "Healthy snacks to recharge energy and support brain development. A relaxed social setting that encourages conversation and fine motor skills.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "15:30",
    endTime: "16:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-outdoor",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Outdoor Play",
    description: "Physical activities in nearby parks and gardens — obstacle courses, group games, and tricycle play. Strengthens gross motor skills and encourages teamwork in an open, natural setting.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "16:00",
    endTime: "17:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-learningcorner",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Learning Corner Activities",
    description: "Children explore specialised corners based on their interests: manipulatives for fine motor control, dramatic play for storytelling, plus English, Chinese, and art corners that reinforce language, creativity, and cognitive skills.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "17:00",
    endTime: "18:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-multiage",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Multi-age Integration",
    description: "Children participate in shared activities with older adults from the community. These sessions encourage respect, empathy, and inclusivity while broadening each child's sense of belonging.",
    recurrence: "weekly",
    daysOfWeek: [1, 3, 5], // Mon, Wed, Fri
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "18:00",
    endTime: "18:30",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sched-k2-hometime",
    organisationId: "org-1",
    schoolId: "school-1",
    scope: "year_level",
    yearLevel: "K2",
    title: "Home Sweet Home",
    description: "End-of-day wind-down and reunification with families. Parents and caregivers check their child out via the app for a safe and smooth dismissal.",
    recurrence: "weekly",
    daysOfWeek: [1, 2, 3, 4, 5],
    startDate: "2026-01-05",
    endDate: "2026-11-27",
    startTime: "18:30",
    endTime: "19:00",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

// ─── Organisation ──────────────────────────────────────────────────────────

export const ORGANISATION: Organisation = {
  id: "org-1",
  name: "My First Skool",
};

// ─── School ────────────────────────────────────────────────────────────────

export const SCHOOL: School = {
  id: "school-1",
  organisationId: "org-1",
  name: "Yew Tee Campus",
  address: "Blk 322A Tengah Drive, Singapore 671322",
  openingHours: "7:00am – 7:00pm",
  supportedYears: ["N1", "N2", "K1", "K2"],
};

// ─── Employees ─────────────────────────────────────────────────────────────

export const EMPLOYEES: Employee[] = [
  {
    id: "emp-siti",
    organisationId: "org-1",
    firstName: "Siti",
    lastName: "Binte Rahmat",
    email: "siti@myfirstskool.edu.sg",
  },
  {
    id: "emp-lim",
    organisationId: "org-1",
    firstName: "Lim",
    lastName: "Wei Ling",
    email: "lim@myfirstskool.edu.sg",
  },
  {
    id: "emp-priya",
    organisationId: "org-1",
    firstName: "Priya",
    lastName: "Shankar",
    email: "priya@myfirstskool.edu.sg",
  },
  {
    id: "emp-david",
    organisationId: "org-1",
    firstName: "David",
    lastName: "Tan",
    email: "david@myfirstskool.edu.sg",
  },
];

// ─── Employee school roles ─────────────────────────────────────────────────

export const EMPLOYEE_SCHOOL_ROLES: EmployeeSchoolRole[] = [
  { id: "role-siti",         employeeId: "emp-siti",   schoolId: "school-1", role: "teacher",      isPrimary: true, startDate: "2026-01-06" },
  { id: "role-lim",          employeeId: "emp-lim",    schoolId: "school-1", role: "teacher",      isPrimary: true, startDate: "2026-01-06" },
  { id: "role-priya",        employeeId: "emp-priya",  schoolId: null,       role: "org_admin",    isPrimary: true, startDate: "2026-01-06" },
  { id: "role-david",        employeeId: "emp-david",  schoolId: "school-1", role: "school_admin", isPrimary: true, startDate: "2026-01-06" },
];

// ─── Class teacher assignments ─────────────────────────────────────────────

export const CLASS_TEACHER_ASSIGNMENTS: ClassTeacherAssignment[] = [
  { id: "cta-1", classId: "class-1", employeeId: "emp-siti", isPrimary: true },
  { id: "cta-2", classId: "class-2", employeeId: "emp-lim",  isPrimary: true },
];

// ─── Parents ───────────────────────────────────────────────────────────────
// parent-ahmed: K1 parent — 1 child (Rayan)
// parent-nur:   K2 parent — 2 children (Amir + Bao), the "2-child" demo persona

export const PARENTS: Parent[] = [
  {
    id: "parent-ahmed",
    organisationId: "org-1",
    firstName: "Ahmed",
    lastName: "Al-Rashid",
    email: "ahmed@example.com",
    phone: "+65 8123 4567",
  },
  {
    id: "parent-nur",
    organisationId: "org-1",
    firstName: "Nur",
    lastName: "Hassan",
    email: "nur@example.com",
    phone: "+65 9333 0099",
  },
];

// ─── Student–parent links ──────────────────────────────────────────────────

export const STUDENT_PARENT_LINKS: StudentParentLink[] = [
  { id: "spl-1", childId: "child-rayan", parentId: "parent-ahmed", relationship: "parent", parentType: "active" },
  { id: "spl-2", childId: "child-amir",  parentId: "parent-nur",   relationship: "parent", parentType: "active" },
  { id: "spl-3", childId: "child-bao",   parentId: "parent-nur",   relationship: "parent", parentType: "passive" },
];

// ─── Student enrollments (active) ─────────────────────────────────────────

export const STUDENT_ENROLLMENTS: StudentEnrollment[] = [
  // Kingfisher N1
  { id: "enr-rayan",    childId: "child-rayan",    classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-aisha",    childId: "child-aisha",    classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-mei",      childId: "child-mei",      classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-omar",     childId: "child-omar",     classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-priya",    childId: "child-priya",    classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-kai",      childId: "child-kai",      classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-sara",     childId: "child-sara",     classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-darius",   childId: "child-darius",   classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-aryan",    childId: "child-aryan",    classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-fatimah",  childId: "child-fatimah",  classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-jingwei",  childId: "child-jingwei",  classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-lakshmi",  childId: "child-lakshmi",  classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-nathan",   childId: "child-nathan",   classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-nurul",    childId: "child-nurul",    classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-ethan",    childId: "child-ethan",    classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-siti",     childId: "child-siti",     classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-rohan",    childId: "child-rohan",    classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-zoe",      childId: "child-zoe",      classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-darren",   childId: "child-darren",   classId: "class-1", startDate: "2026-01-06", isActive: true },
  { id: "enr-nadia",    childId: "child-nadia",    classId: "class-1", startDate: "2026-01-06", isActive: true },
  // Sparrow K2
  { id: "enr-amir",     childId: "child-amir",     classId: "class-2", startDate: "2026-01-06", isActive: true },
  { id: "enr-bao",      childId: "child-bao",      classId: "class-2", startDate: "2026-01-06", isActive: true },
  { id: "enr-clara",    childId: "child-clara",    classId: "class-2", startDate: "2026-01-06", isActive: true },
  { id: "enr-dev",      childId: "child-dev",      classId: "class-2", startDate: "2026-01-06", isActive: true },
  { id: "enr-elise",    childId: "child-elise",    classId: "class-2", startDate: "2026-01-06", isActive: true },
];

// ─── Attendance ─────────────────────────────────────────────────────────────
// Kingfisher N1: 20 children, 17 present, 2 absent, 1 late
// Sparrow K2: 5 children, all present

const TODAY = new Date().toISOString().slice(0, 10);

export const DEMO_ATTENDANCE: ChildAttendance[] = [
  // Kingfisher N1 — present (14)
  { id: "att-rayan",   childId: "child-rayan",   date: TODAY, status: "present" },
  { id: "att-aisha",   childId: "child-aisha",   date: TODAY, status: "present" },
  { id: "att-mei",     childId: "child-mei",     date: TODAY, status: "present" },
  { id: "att-omar",    childId: "child-omar",    date: TODAY, status: "present" },
  { id: "att-priya",   childId: "child-priya",   date: TODAY, status: "present" },
  { id: "att-kai",     childId: "child-kai",     date: TODAY, status: "present" },
  { id: "att-sara",    childId: "child-sara",    date: TODAY, status: "present" },
  { id: "att-darius",  childId: "child-darius",  date: TODAY, status: "present" },
  { id: "att-aryan",   childId: "child-aryan",   date: TODAY, status: "present" },
  { id: "att-fatimah", childId: "child-fatimah", date: TODAY, status: "present" },
  { id: "att-jingwei", childId: "child-jingwei", date: TODAY, status: "present" },
  { id: "att-lakshmi", childId: "child-lakshmi", date: TODAY, status: "present" },
  { id: "att-siti",    childId: "child-siti",    date: TODAY, status: "present" },
  { id: "att-darren",  childId: "child-darren",  date: TODAY, status: "present" },
  // Kingfisher N1 — pending (3, not yet checked in)
  { id: "att-nathan",  childId: "child-nathan",  date: TODAY, status: "pending" },
  { id: "att-nurul",   childId: "child-nurul",   date: TODAY, status: "pending" },
  { id: "att-rohan",   childId: "child-rohan",   date: TODAY, status: "pending" },
  // Kingfisher N1 — late (1)
  { id: "att-ethan",   childId: "child-ethan",   date: TODAY, status: "late" },
  // Kingfisher N1 — absent (2, with reasons)
  { id: "att-zoe",     childId: "child-zoe",     date: TODAY, status: "absent", absentReason: "Fever — parent messaged this morning" },
  { id: "att-nadia",   childId: "child-nadia",   date: TODAY, status: "absent", absentReason: "Family trip, back Monday" },
  // Sparrow K2 — present (3) + pending (2)
  { id: "att-amir",    childId: "child-amir",    date: TODAY, status: "present" },
  { id: "att-bao",     childId: "child-bao",     date: TODAY, status: "present" },
  { id: "att-clara",   childId: "child-clara",   date: TODAY, status: "present" },
  { id: "att-dev",     childId: "child-dev",     date: TODAY, status: "pending" },
  { id: "att-elise",   childId: "child-elise",   date: TODAY, status: "pending" },
];

// ─── Daily Updates ───────────────────────────────────────────────────────────

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function daysAgoISO(n: number, hour = 15, minute = 30): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const DEMO_DAILY_UPDATES: DailyUpdate[] = [
  {
    id: "du-rayan-1",
    childId: "child-rayan",
    teacherId: "emp-siti",
    text: "Rayan had a wonderful morning in the reading corner today. He picked up a picture book about animals and spent a good 15 minutes looking through it on his own — pointing at each animal and trying to name them. Later during group time he was full of energy and kept his friends laughing with his storytelling.",
    mood: "happy",
    photos: [],
    date: daysAgo(1),
    createdAt: daysAgoISO(1),
  },
  {
    id: "du-rayan-2",
    childId: "child-rayan",
    teacherId: "emp-siti",
    text: "A calm and focused day for Rayan. He spent most of the morning at the number table, carefully sorting coloured counters into groups. He counted to 8 on his own and looked very pleased with himself. He was a little quiet at lunchtime — seemed like he needed some time to himself, which is perfectly normal.",
    mood: "settled",
    photos: [],
    date: daysAgo(2),
    createdAt: daysAgoISO(2),
  },
  {
    id: "du-rayan-3",
    childId: "child-rayan",
    teacherId: "emp-siti",
    text: "Rayan was absolutely buzzing today — we had a visiting music session and he was one of the most enthusiastic in the class. He learned a simple rhythm pattern on the drum and kept practising it even during free play. He also helped a classmate with a puzzle, which was a lovely moment to see.",
    mood: "excited",
    photos: ["https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80"],
    date: daysAgo(3),
    createdAt: daysAgoISO(3),
  },
  {
    id: "du-rayan-4",
    childId: "child-rayan",
    teacherId: "emp-siti",
    text: "Rayan joined in well with the outdoor session this morning — he particularly enjoyed the balancing beam and had a go three times. In the afternoon he was a little tired after all that activity but settled nicely into the quiet reading session. A solid, steady day.",
    mood: "settled",
    photos: [],
    date: daysAgo(4),
    createdAt: daysAgoISO(4),
  },
];
