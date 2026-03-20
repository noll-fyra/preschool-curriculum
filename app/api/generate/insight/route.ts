import { NextRequest, NextResponse } from "next/server";
import { generateWithOpenAI } from "@/lib/ai-prompts";
import { getInsightText } from "@/lib/dashboard-utils";
import type { DayPhase, InsightStats } from "@/lib/dashboard-utils";

interface InsightRequest {
  phase: DayPhase;
  stats: InsightStats;
  teacherName: string;
}

export async function POST(req: NextRequest) {
  try {
    const { phase, stats, teacherName }: InsightRequest = await req.json();

    const fallback = getInsightText(phase, stats);

    const system = `You are a warm, supportive assistant for ${teacherName}, a preschool teacher in Singapore using the Nurture learning platform. Your job is to generate a single short insight paragraph (2–3 sentences) to help the teacher at this moment in their school day. Be practical, specific, and encouraging — not generic. Never use lists or headings. Write as if speaking directly to the teacher.`;

    const phaseLabel: Record<DayPhase, string> = {
      before_school: "before school starts",
      morning_arrival: "during morning arrival",
      active_teaching: "during active teaching time",
      rest_time: "during rest/admin time",
      end_of_day: "at end of day",
    };

    const user = `The teacher is ${phaseLabel[phase]}. Here is the class context:
- ${stats.presentCount} of ${stats.totalCount} children present
- ${stats.activitiesToday} activities planned today
- ${stats.observationsThisWeek} observations logged this week
- ${stats.flaggedCount} children flagged for attention
${stats.absentNames.length > 0 ? `- Absent today: ${stats.absentNames.join(", ")}` : ""}

Write one short, specific insight paragraph for this teacher right now.`;

    const content = await generateWithOpenAI({ system, user, fallback });
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[/api/generate/insight]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
