import { NextRequest, NextResponse } from "next/server";
import { buildPortfolioPrompt, generateWithOpenAI } from "@/lib/ai-prompts";
import type { ChildContext } from "@/lib/ai-prompts";
import { getChildDisplayName } from "@/lib/display-name";

export async function POST(req: NextRequest) {
  try {
    const ctx: ChildContext = await req.json();
    const { system, user } = buildPortfolioPrompt(ctx);
    const name = getChildDisplayName(ctx.child);
    const fallback = `## Learning Journey\n\n${name} has been on a wonderful learning journey this term, growing in curiosity, confidence, and capability across all learning areas.\n\n## Language & Literacy\n\nThis term, ${name} has been building foundational literacy skills with enthusiasm.\n\n## Numeracy\n\n${name} has been exploring numbers and patterns with growing confidence.\n\n## Social & Emotional Growth\n\n${name} continues to develop meaningful relationships with peers and teachers.\n\n## Strengths & Character\n\n${name} shows particular strength in perseverance and curiosity.\n\n## Looking Forward\n\nWe look forward to supporting ${name}'s continued growth next term.`;
    const content = await generateWithOpenAI({ system, user, fallback });
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[/api/generate/portfolio]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
