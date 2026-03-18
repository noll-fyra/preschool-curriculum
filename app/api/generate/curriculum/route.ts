import { NextRequest, NextResponse } from "next/server";
import { buildCurriculumPrompt, generateWithOpenAI } from "@/lib/ai-prompts";
import type { CurriculumContext } from "@/lib/ai-prompts";

const FALLBACK = `## Overview

This term-long curriculum plan is designed to support holistic development across all NEL learning areas, with a focus on building confidence, curiosity, and collaboration.

## Weekly Plan

| Week | Theme | Language & Literacy | Numeracy | Social & Emotional |
|------|-------|--------------------|-----------|--------------------|
| 1 | Getting Started | Introduce reading routines, sight words | Counting to 10, number recognition | Class agreements, making friends |
| 2 | Our Community | Community vocabulary, storytelling | Patterns in everyday objects | Roles and responsibilities |
| 3 | Nature Explorers | Nature journals, descriptive language | Measuring and comparing | Teamwork in outdoor play |
| 4 | Feelings & Me | Emotion vocabulary, expressive writing | Data collection (feelings chart) | Identifying and managing emotions |
| 5 | Shapes & Spaces | Environmental print, labels | 2D and 3D shapes | Cooperative building |
| 6 | Stories & Authors | Author study, retelling | Sequencing and ordinal numbers | Empathy through characters |
| 7 | Mini Scientists | Question words, non-fiction texts | Counting and recording data | Curiosity and wondering |
| 8 | Friends & Families | Family vocabulary, letter writing | One-to-one correspondence | Diversity and belonging |
| 9 | Celebrations | Recount writing, oral presentations | Time and calendar concepts | Cultural appreciation |
| 10 | Looking Forward | Reflective writing, portfolios | Review and consolidation | Self-assessment and goals |`;

export async function POST(req: NextRequest) {
  try {
    const ctx: CurriculumContext = await req.json();
    const { system, user } = buildCurriculumPrompt(ctx);
    const content = await generateWithOpenAI({ system, user, fallback: FALLBACK });
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[/api/generate/curriculum]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
