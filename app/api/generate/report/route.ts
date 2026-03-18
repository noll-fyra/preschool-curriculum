import { NextRequest, NextResponse } from "next/server";
import { buildReportPrompt, generateWithOpenAI } from "@/lib/ai-prompts";
import { generateReportDraft } from "@/lib/report-generator";
import type { ChildContext } from "@/lib/ai-prompts";

export async function POST(req: NextRequest) {
  try {
    const ctx: ChildContext = await req.json();
    const { system, user } = buildReportPrompt(ctx);
    const fallback = generateReportDraft(
      ctx.child.id,
      [ctx.child],
      ctx.milestones,
      ctx.progress,
      ctx.sessions,
      ctx.observations
    );
    const content = await generateWithOpenAI({ system, user, fallback });
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[/api/generate/report]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
