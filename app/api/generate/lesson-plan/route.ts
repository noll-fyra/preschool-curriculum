import { NextRequest, NextResponse } from "next/server";
import { buildLessonPlanPrompt, generateWithOpenAI } from "@/lib/ai-prompts";
import type { LessonPlanContext } from "@/lib/ai-prompts";

const FALLBACK = `## Learning Objective

Children will develop key skills aligned to the target milestone through guided play and exploration.

## Materials Needed

- Relevant manipulatives or props for the activity
- Activity worksheets or visual aids
- Timer

## Introduction (5 min)

Gather children in a circle. Ask open-ended questions to activate prior knowledge: "What do you already know about...?" Share the learning goal in child-friendly language.

## Main Activity (15–20 min)

Guide children through the activity step by step. Circulate to observe, prompt, and support. Encourage peer interaction and verbalisation of thinking.

## Facilitation Questions

- "What are you noticing?"
- "Can you tell me more about what you did?"
- "What would happen if...?"

## Differentiation

- **Beginning**: Provide additional scaffolding, visual cues, and one-to-one support.
- **Developing**: Encourage independence with prompts; introduce slight variations.
- **Secure**: Extend with challenge tasks or peer mentoring roles.

## Assessment Notes

Observe and record: Did the child demonstrate the target skill? Note evidence for milestone tracking. Record session outcome in the Nurture app.`;

export async function POST(req: NextRequest) {
  try {
    const ctx: LessonPlanContext = await req.json();
    const { system, user } = buildLessonPlanPrompt(ctx);
    const content = await generateWithOpenAI({ system, user, fallback: FALLBACK });
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[/api/generate/lesson-plan]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
