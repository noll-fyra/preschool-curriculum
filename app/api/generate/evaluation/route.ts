import { NextRequest, NextResponse } from "next/server";
import { buildEvaluationPrompt, generateWithOpenAI } from "@/lib/ai-prompts";
import type { ChildContext } from "@/lib/ai-prompts";
import { getChildDisplayName } from "@/lib/display-name";

export async function POST(req: NextRequest) {
  try {
    const ctx: ChildContext = await req.json();
    const { system, user } = buildEvaluationPrompt(ctx);
    const name = getChildDisplayName(ctx.child);
    const fallback = `## Child Profile\n\nName: ${name}\nYear Level: ${ctx.child.yearLevel ?? "N2"}\n\n## Developmental Summary\n\nThis evaluation documents ${name}'s developmental progress across NEL learning areas based on teacher observation and activity session records.\n\n## Learning Area Assessments\n\nDetailed assessment data is available in the Nurture platform across Language & Literacy, Numeracy, and Social & Emotional Development.\n\n## Strengths\n\n${name} demonstrates consistent engagement and effort across learning activities.\n\n## Areas for Support\n\nContinued scaffolding and encouragement across developmental milestones will support further growth.\n\n## Recommendations\n\n- Continue regular activity sessions aligned to current milestone targets\n- Maintain home–school partnership through parent communication\n- Review progress at mid-term\n\n## Professional Summary\n\n${name} is progressing appropriately and is supported by a warm and responsive learning environment.`;
    const content = await generateWithOpenAI({ system, user, fallback });
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[/api/generate/evaluation]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
