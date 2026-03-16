import type {
  Class,
  Milestone,
  Child,
  ChildMilestoneProgress,
  ActivitySession,
  TeacherObservation,
  PlannedActivity,
  ActivityFeedback,
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
  },
  {
    id: "LL-B-02",
    areaId: "LL",
    levelId: "B",
    sequence: 2,
    statement: "Identifies at least 10 letters of the alphabet by name",
    parentDescription:
      "Knowing letter names by sight is the foundation everything else builds on.",
  },
  {
    id: "LL-B-03",
    areaId: "LL",
    levelId: "B",
    sequence: 3,
    statement: "Understands that text is read left to right, top to bottom",
    parentDescription:
      "Knowing how to look at a page correctly is a key early literacy concept.",
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
  },
  {
    id: "LL-D-02",
    areaId: "LL",
    levelId: "D",
    sequence: 2,
    statement: "Identifies the beginning sound of familiar words",
    parentDescription:
      "Knowing that 'fish' starts with an 'f' sound is called phonemic awareness — the key to cracking reading.",
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
  },
  {
    id: "LL-S-02",
    areaId: "LL",
    levelId: "S",
    sequence: 2,
    statement: "Reads simple sentences using known sight words and phonics",
    parentDescription:
      "Reading short sentences independently shows everything is coming together.",
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
  },
  {
    id: "NUM-B-02",
    areaId: "NUM",
    levelId: "B",
    sequence: 2,
    statement: "Counts objects 1–5 with one-to-one correspondence",
    parentDescription:
      "Matching one count to one object (not just saying numbers) is an important conceptual leap.",
  },
  {
    id: "NUM-B-03",
    areaId: "NUM",
    levelId: "B",
    sequence: 3,
    statement: "Recognises and names written numerals 1–5",
    parentDescription:
      "Knowing what the numeral '3' looks like is different from being able to count — both matter.",
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
  },
  {
    id: "NUM-D-02",
    areaId: "NUM",
    levelId: "D",
    sequence: 2,
    statement: "Recognises and names written numerals 1–10",
    parentDescription:
      "Knowing what '7' looks like and that it means seven things is a key number milestone.",
  },
  {
    id: "NUM-D-03",
    areaId: "NUM",
    levelId: "D",
    sequence: 3,
    statement: "Identifies which group has more or fewer objects (up to 10)",
    parentDescription:
      "Comparing quantities ('this pile has more') is the beginning of mathematical thinking.",
  },
  {
    id: "NUM-D-04",
    areaId: "NUM",
    levelId: "D",
    sequence: 4,
    statement: "Sorts objects by one attribute: colour, size, or shape",
    parentDescription:
      "Sorting is how children first experience categories — a foundation for logical thinking.",
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
  },
  {
    id: "NUM-S-02",
    areaId: "NUM",
    levelId: "S",
    sequence: 2,
    statement: "Identifies and names basic 2D shapes and their properties",
    parentDescription:
      "Knowing a triangle has 3 sides and a circle has no corners is early geometry.",
  },
  {
    id: "NUM-S-03",
    areaId: "NUM",
    levelId: "S",
    sequence: 3,
    statement: "Completes simple addition and subtraction within 5",
    parentDescription:
      "Sums within 5 are the first formal maths operations — exactly what Primary 1 starts with.",
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
  },
  {
    id: "SED-B-02",
    areaId: "SED",
    levelId: "B",
    sequence: 2,
    statement: "Follows a 2–3 step classroom routine without reminders",
    parentDescription:
      "Following routines shows self-regulation — one of the most important school-readiness skills.",
  },
  {
    id: "SED-B-03",
    areaId: "SED",
    levelId: "B",
    sequence: 3,
    statement: "Takes turns with a peer during a structured activity",
    parentDescription:
      "Turn-taking is an early social contract children need for friendships to work.",
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
  },
  {
    id: "SED-D-03",
    areaId: "SED",
    levelId: "D",
    sequence: 3,
    statement: "Identifies helpful vs. unhelpful behaviour in a scenario",
    parentDescription:
      "Distinguishing kind from unkind actions shows your child is developing a moral compass.",
  },
  {
    id: "SED-D-04",
    areaId: "SED",
    levelId: "D",
    sequence: 4,
    statement: "Shows care toward a peer who is upset or struggling",
    parentDescription:
      "Noticing and responding to a friend's feelings — this is empathy in action.",
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
  },
  {
    id: "SED-S-02",
    areaId: "SED",
    levelId: "S",
    sequence: 2,
    statement: "Proposes a solution to a peer conflict independently",
    parentDescription:
      "Problem-solving in friendships rather than escalating — strong social competence.",
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
  },
];

// ─── Classes ───────────────────────────────────────────────────────────────

export const CLASSES: Class[] = [
  { id: "class-1", name: "Kingfisher K1", termLabel: "Term 2, 2026" },
  { id: "class-2", name: "Sparrow K2",    termLabel: "Term 2, 2026" },
];

// ─── Children ──────────────────────────────────────────────────────────────

export const CHILDREN: Child[] = [
  {
    id: "child-rayan",
    name: "Rayan",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-04-15",
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
    name: "Aisha",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-07-02",
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
    name: "Mei",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-02-10",
    primaryGuardian: {
      name: "Mrs Tan",
      phone: "+65 9001 2233",
      email: "tan.mei@example.com",
    },
  },
  {
    id: "child-omar",
    name: "Omar",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2020-12-05",
    primaryGuardian: {
      name: "Mr Ali",
      phone: "+65 9345 6677",
    },
  },
  {
    id: "child-priya",
    name: "Priya",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-05-28",
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
    name: "Kai",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-09-09",
    primaryGuardian: {
      name: "Mr Lim",
      phone: "+65 8765 0011",
    },
  },
  {
    id: "child-sara",
    name: "Sara",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-03-21",
    primaryGuardian: {
      name: "Mrs Rahman",
      phone: "+65 9333 4455",
      email: "rahman.sara@example.com",
    },
  },
  {
    id: "child-darius",
    name: "Darius",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2020-11-18",
    primaryGuardian: {
      name: "Ms Lee",
      phone: "+65 9888 7766",
    },
  },
  {
    id: "child-aryan",
    name: "Aryan",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-01-30",
    primaryGuardian: {
      name: "Mr Singh",
      phone: "+65 8123 9900",
    },
  },
  {
    id: "child-fatimah",
    name: "Fatimah",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-08-12",
    primaryGuardian: {
      name: "Mdm Siti",
      phone: "+65 9455 6677",
    },
  },
  {
    id: "child-jingwei",
    name: "Jing Wei",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2020-10-03",
    primaryGuardian: {
      name: "Mr Ng",
      phone: "+65 8111 2233",
    },
  },
  {
    id: "child-lakshmi",
    name: "Lakshmi",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2020-09-25",
    primaryGuardian: {
      name: "Mrs Iyer",
      phone: "+65 9222 3344",
    },
  },
  {
    id: "child-nathan",
    name: "Nathan",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-06-06",
    primaryGuardian: {
      name: "Mr Koh",
      phone: "+65 9666 7788",
    },
  },
  {
    id: "child-nurul",
    name: "Nurul",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-11-19",
    primaryGuardian: {
      name: "Mdm Zainab",
      phone: "+65 9333 2211",
    },
  },
  {
    id: "child-ethan",
    name: "Ethan",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-02-02",
    primaryGuardian: {
      name: "Ms Chua",
      phone: "+65 9555 6677",
    },
  },
  {
    id: "child-siti",
    name: "Siti",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-12-01",
    primaryGuardian: {
      name: "Mdm Hana",
      phone: "+65 9777 8899",
    },
  },
  {
    id: "child-rohan",
    name: "Rohan",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2020-07-17",
    primaryGuardian: {
      name: "Mr Patel",
      phone: "+65 9011 2233",
    },
  },
  {
    id: "child-zoe",
    name: "Zoe",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-04-09",
    primaryGuardian: {
      name: "Mrs Lim",
      phone: "+65 9344 5566",
    },
  },
  {
    id: "child-darren",
    name: "Darren",
    pronoun: "he",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2020-06-23",
    primaryGuardian: {
      name: "Mr Ong",
      phone: "+65 9888 1122",
    },
  },
  {
    id: "child-nadia",
    name: "Nadia",
    pronoun: "she",
    classId: "class-1",
    yearLevel: "K1",
    dateOfBirth: "2021-09-30",
    primaryGuardian: {
      name: "Mdm Farah",
      phone: "+65 9123 4455",
    },
    flags: {
      welfareConcern: "Recent family change – check-in weekly",
    },
  },
  // Sparrow K2
  {
    id: "child-amir",
    name: "Amir",
    pronoun: "he",
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
    name: "Bao",
    pronoun: "he",
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
    name: "Clara",
    pronoun: "she",
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
    name: "Dev",
    pronoun: "he",
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
    name: "Elise",
    pronoun: "she",
    classId: "class-2",
    yearLevel: "K2",
    dateOfBirth: "2020-02-19",
    primaryGuardian: {
      name: "Mrs Laurent",
      phone: "+65 9222 5566",
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
  daysAgo: number
): ActivitySession {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return { id, childId, milestoneId, passed, score, attemptedAt: d.toISOString() };
}

export const DEMO_SESSIONS: ActivitySession[] = [
  // Rayan — LL-B-01: achieved (3 consecutive passes)
  session("s001", "child-rayan", "LL-B-01", true, 3, 14),
  session("s002", "child-rayan", "LL-B-01", true, 2, 12),
  session("s003", "child-rayan", "LL-B-01", true, 3, 10),

  // Rayan — LL-B-02: achieved (3 consecutive passes)
  session("s004", "child-rayan", "LL-B-02", true, 3, 13),
  session("s005", "child-rayan", "LL-B-02", true, 2, 11),
  session("s006", "child-rayan", "LL-B-02", true, 3, 9),

  // Rayan — LL-B-03: achieved (5 of 7 passes)
  session("s007", "child-rayan", "LL-B-03", false, 1, 20),
  session("s008", "child-rayan", "LL-B-03", true,  2, 18),
  session("s009", "child-rayan", "LL-B-03", false, 1, 16),
  session("s010", "child-rayan", "LL-B-03", true,  3, 14),
  session("s011", "child-rayan", "LL-B-03", true,  2, 12),
  session("s012", "child-rayan", "LL-B-03", true,  2, 10),
  session("s013", "child-rayan", "LL-B-03", true,  3,  8),

  // Rayan — LL-D-01: in_progress (2 passing sessions, not 3 consecutive)
  session("s014", "child-rayan", "LL-D-01", false, 1,  7),
  session("s015", "child-rayan", "LL-D-01", true,  2,  5),
  session("s016", "child-rayan", "LL-D-01", true,  3,  3),

  // Rayan — NUM-B-01: achieved (3 consecutive passes)
  session("s017", "child-rayan", "NUM-B-01", true, 3, 15),
  session("s018", "child-rayan", "NUM-B-01", true, 2, 13),
  session("s019", "child-rayan", "NUM-B-01", true, 3, 11),

  // Rayan — NUM-B-02: achieved (3 consecutive passes)
  session("s020", "child-rayan", "NUM-B-02", true, 2, 14),
  session("s021", "child-rayan", "NUM-B-02", true, 3, 12),
  session("s022", "child-rayan", "NUM-B-02", true, 2, 10),

  // Rayan — NUM-B-03: achieved (3 consecutive passes)
  session("s023", "child-rayan", "NUM-B-03", true, 3, 13),
  session("s024", "child-rayan", "NUM-B-03", true, 3, 11),
  session("s025", "child-rayan", "NUM-B-03", true, 3,  9),

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
  session("s035", "child-aisha", "LL-D-01", false, 1, 6),
  session("s036", "child-aisha", "LL-D-01", true,  2, 4),

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
];

// ─── Demo teacher observations ────────────────────────────────────────────

function obs(
  id: string,
  childId: string,
  milestoneId: string,
  daysAgo: number
): TeacherObservation {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return { id, childId, milestoneId, observedAt: d.toISOString().slice(0, 10) };
}

export const DEMO_OBSERVATIONS: TeacherObservation[] = [
  // Rayan — SED-B-01: achieved (5 observations on 5 separate days)
  obs("o001", "child-rayan", "SED-B-01", 20),
  obs("o002", "child-rayan", "SED-B-01", 16),
  obs("o003", "child-rayan", "SED-B-01", 12),
  obs("o004", "child-rayan", "SED-B-01",  8),
  obs("o005", "child-rayan", "SED-B-01",  4),

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
