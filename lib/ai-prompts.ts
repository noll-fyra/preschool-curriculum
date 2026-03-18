/**
 * Shared prompt-building utilities for AI document generation.
 * Each function returns a system prompt + user prompt pair for OpenAI.
 */

import type {
  Child,
  Milestone,
  ChildMilestoneProgress,
  ActivitySession,
  TeacherObservation,
  TeacherNote,
  PersonalitySnapshot,
  TeacherStrategies,
  FamilyContext,
  LearningAreaId,
  Class,
} from "./types";
import { LEARNING_AREAS, LEVEL_LABELS } from "./types";
import { getCurrentLevel } from "./mastery";
import { getChildDisplayName, getPronounFromGender } from "./display-name";
import { evaluateSkillMastery, evaluateSEDMastery } from "./mastery";

const NEL_CONTEXT = `
The NEL (Nurturing Early Learners) Framework is Singapore's Ministry of Education preschool curriculum for ages 4–6.
Key learning areas:
- Language & Literacy (LL): reading, writing, oral communication — assessed by activity sessions (3 consecutive passes or 5 of 7)
- Numeracy (NUM): counting, patterns, shapes, measurement — assessed by activity sessions
- Social & Emotional Development (SED): self-awareness, relationships, social skills — assessed by teacher observations (5 across 5 separate days)
- Aesthetics & Creative Expression (ACE), Discovery of the World (DOW), Health Safety & Motor Skills (HMS)

Developmental levels: Beginning (B) → Developing (D) → Secure (S).
`.trim();

export interface ChildContext {
  child: Child;
  milestones: Milestone[];
  progress: ChildMilestoneProgress[];
  sessions: ActivitySession[];
  observations: TeacherObservation[];
  notes?: TeacherNote[];
  snapshot?: PersonalitySnapshot;
  strategies?: TeacherStrategies;
  familyContext?: FamilyContext;
}

function buildChildSummary(ctx: ChildContext): string {
  const { child, milestones, progress, sessions, observations, notes, snapshot, strategies } = ctx;
  const name = getChildDisplayName(child);
  const pronoun = getPronounFromGender(child.gender);
  const possessive = pronoun === "they" ? "their" : pronoun === "he" ? "his" : "her";

  const levelPerArea = (["LL", "NUM", "SED", "ACE", "DOW", "HMS"] as LearningAreaId[]).reduce(
    (acc, areaId) => {
      acc[areaId] = getCurrentLevel(milestones, progress, child.id, areaId);
      return acc;
    },
    {} as Record<LearningAreaId, string>
  );

  const areaDetails = LEARNING_AREAS.slice(0, 3).map((area) => {
    const level = levelPerArea[area.id];
    const areaMilestones = milestones.filter((m) => m.areaId === area.id);
    const achieved = areaMilestones.filter((m) => {
      if (area.assessmentType === "skill") return evaluateSkillMastery(sessions, child.id, m.id) === "achieved";
      return evaluateSEDMastery(observations, child.id, m.id) === "achieved";
    });
    const inProgress = areaMilestones.filter((m) => {
      if (area.assessmentType === "skill") return evaluateSkillMastery(sessions, child.id, m.id) === "in_progress";
      return evaluateSEDMastery(observations, child.id, m.id) === "in_progress";
    });

    return `${area.name} (${LEVEL_LABELS[level as keyof typeof LEVEL_LABELS] ?? level}):
  Achieved: ${achieved.map((m) => m.statement).join("; ") || "none yet"}
  In progress: ${inProgress.map((m) => m.statement).join("; ") || "none"}`;
  }).join("\n\n");

  const notesText = notes && notes.length > 0
    ? `\nTeacher notes:\n${notes.slice(0, 5).map((n) => `- [${n.tags.join(",")}] ${n.content}`).join("\n")}`
    : "";

  const snapshotText = snapshot?.content
    ? `\nPersonality snapshot: ${snapshot.content}`
    : "";

  const strategiesText = strategies
    ? `\nWhat works: ${strategies.whatWorks}\nWhat to watch: ${strategies.whatToWatch}`
    : "";

  return `Child: ${name} (${pronoun}/${possessive}), Year level: ${child.yearLevel ?? "N2"}

Progress by area:
${areaDetails}${notesText}${snapshotText}${strategiesText}`;
}

// ─── Report ──────────────────────────────────────────────────────────────────

export function buildReportPrompt(ctx: ChildContext): { system: string; user: string } {
  const system = `You are an expert early childhood educator writing developmental progress reports for preschool children in Singapore, aligned to the NEL Framework. Write in a warm, professional tone suitable for parents. Use clear, jargon-free language. Structure the report as 4–5 flowing paragraphs covering: overall summary, Language & Literacy, Numeracy, Social & Emotional Development, and a forward-looking closing. Do not use bullet points. Refer to the child by name and use correct pronouns.

${NEL_CONTEXT}`;

  const user = `Write a developmental progress report for this child's parent.\n\n${buildChildSummary(ctx)}`;

  return { system, user };
}

// ─── Portfolio ───────────────────────────────────────────────────────────────

export function buildPortfolioPrompt(ctx: ChildContext): { system: string; user: string } {
  const system = `You are an expert early childhood educator creating a student learning portfolio narrative for a preschool child in Singapore, aligned to the NEL Framework. A portfolio narrative celebrates the child's growth, captures their learning journey, and highlights memorable moments and strengths. Write in 5–7 paragraphs with warm, celebratory language. Include headings for each section: "Learning Journey", "Language & Literacy", "Numeracy", "Social & Emotional Growth", "Strengths & Character", and "Looking Forward". Use markdown headings (##).

${NEL_CONTEXT}`;

  const user = `Create a portfolio narrative for this child.\n\n${buildChildSummary(ctx)}`;

  return { system, user };
}

// ─── Lesson Plan ─────────────────────────────────────────────────────────────

export interface LessonPlanContext {
  title: string;
  description: string;
  areaId: LearningAreaId;
  milestoneStatement?: string;
  levelId: string;
  childCount: number;
}

export function buildLessonPlanPrompt(ctx: LessonPlanContext): { system: string; user: string } {
  const areaName = LEARNING_AREAS.find((a) => a.id === ctx.areaId)?.name ?? ctx.areaId;
  const level = LEVEL_LABELS[ctx.levelId as keyof typeof LEVEL_LABELS] ?? ctx.levelId;

  const system = `You are an expert early childhood educator creating detailed lesson plans for Singapore preschool classrooms, aligned to the NEL Framework and PETAL© pedagogy (Playing, Exploring, Thinking, Applying Learning). Write practical, classroom-ready lesson plans with the following sections using markdown headings (##): "Learning Objective", "Materials Needed", "Introduction (5 min)", "Main Activity (15–20 min)", "Facilitation Questions", "Differentiation", and "Assessment Notes". Be specific and practical.

${NEL_CONTEXT}`;

  const user = `Create a detailed lesson plan for:
Activity: ${ctx.title}
Description: ${ctx.description}
Learning Area: ${areaName}
Developmental Level: ${level}
${ctx.milestoneStatement ? `Target Milestone: ${ctx.milestoneStatement}` : ""}
Group size: ${ctx.childCount} children`;

  return { system, user };
}

// ─── Curriculum Plan ─────────────────────────────────────────────────────────

export interface CurriculumContext {
  className: string;
  yearLevel: string;
  term: string;
  focusAreas: string[];
  classSize: number;
}

export function buildCurriculumPrompt(ctx: CurriculumContext): { system: string; user: string } {
  const system = `You are an expert early childhood curriculum designer creating term-long curriculum plans for Singapore preschool classes, aligned to the NEL Framework and PETAL© pedagogy. Create a structured, week-by-week curriculum overview using markdown. Include: an "Overview" section, then a table or weekly breakdown covering themes, learning objectives per NEL area, suggested activities, and assessment opportunities. Be practical and achievable.

${NEL_CONTEXT}`;

  const user = `Create a ${ctx.term} curriculum plan for:
Class: ${ctx.className}
Year Level: ${ctx.yearLevel}
Class size: ${ctx.classSize} children
Focus learning areas: ${ctx.focusAreas.join(", ")}

Cover 10 weeks with clear themes, weekly objectives, and 2–3 suggested activities per week.`;

  return { system, user };
}

// ─── Evaluation ──────────────────────────────────────────────────────────────

export function buildEvaluationPrompt(ctx: ChildContext): { system: string; user: string } {
  const system = `You are an expert early childhood educator writing a formal developmental evaluation for a preschool child in Singapore, aligned to the NEL Framework. An evaluation is more structured than a progress report — it includes assessed competencies, evidence, recommendations, and a professional summary for school records. Use markdown with sections: "## Child Profile", "## Developmental Summary", "## Learning Area Assessments", "## Strengths", "## Areas for Support", "## Recommendations", "## Professional Summary". Write in formal, objective educator language.

${NEL_CONTEXT}`;

  const user = `Write a formal developmental evaluation for this child.\n\n${buildChildSummary(ctx)}`;

  return { system, user };
}

// ─── Event/Activity Proposal ─────────────────────────────────────────────────

export interface ProposalContext {
  eventTitle: string;
  eventType: string;
  targetAudience: string;
  objectives: string;
  date?: string;
  additionalNotes?: string;
}

export function buildProposalPrompt(ctx: ProposalContext): { system: string; user: string } {
  const system = `You are an expert early childhood educator writing a formal event or activity proposal for submission to school administration at a Singapore preschool. Write a professional proposal with markdown sections: "## Proposal Summary", "## Learning Objectives (NEL Alignment)", "## Programme Overview", "## Resources & Materials", "## Timeline", "## Budget Considerations", "## Expected Outcomes". Be concise, professional, and NEL-aligned.

${NEL_CONTEXT}`;

  const user = `Write a formal proposal for:
Event/Activity: ${ctx.eventTitle}
Type: ${ctx.eventType}
Target audience: ${ctx.targetAudience}
Objectives: ${ctx.objectives}
${ctx.date ? `Proposed date: ${ctx.date}` : ""}
${ctx.additionalNotes ? `Additional notes: ${ctx.additionalNotes}` : ""}`;

  return { system, user };
}

// ─── Shared OpenAI caller ─────────────────────────────────────────────────────

export interface GenerateOptions {
  system: string;
  user: string;
  fallback: string;
}

export async function generateWithOpenAI(opts: GenerateOptions): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return opts.fallback;

  const OpenAI = (await import("openai")).default;
  const client = new OpenAI({ apiKey });

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.user },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  return response.choices[0]?.message?.content ?? opts.fallback;
}
