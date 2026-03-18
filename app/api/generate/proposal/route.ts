import { NextRequest, NextResponse } from "next/server";
import { buildProposalPrompt, generateWithOpenAI } from "@/lib/ai-prompts";
import type { ProposalContext } from "@/lib/ai-prompts";

const FALLBACK = `## Proposal Summary

This proposal outlines a planned event or activity designed to enrich the learning experience of our preschool children in alignment with the NEL Framework.

## Learning Objectives (NEL Alignment)

This event supports development across multiple NEL learning areas, fostering holistic growth in Language & Literacy, Social & Emotional Development, and broader learning dispositions.

## Programme Overview

The activity will be structured around child-centred, play-based learning experiences following the PETAL© pedagogical approach (Playing, Exploring, Thinking, Applying Learning).

## Resources & Materials

- Learning materials appropriate to the activity theme
- Teacher facilitation guides
- Parent communication materials

## Timeline

- Planning & preparation: 2 weeks prior
- Activity implementation: As scheduled
- Documentation and follow-up: 1 week after

## Budget Considerations

Estimated costs to be confirmed based on materials and venue requirements. Budget approval requested from school leadership.

## Expected Outcomes

Children will benefit from enriched learning experiences, strengthened community bonds, and increased engagement with NEL-aligned curriculum content.`;

export async function POST(req: NextRequest) {
  try {
    const ctx: ProposalContext = await req.json();
    const { system, user } = buildProposalPrompt(ctx);
    const content = await generateWithOpenAI({ system, user, fallback: FALLBACK });
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[/api/generate/proposal]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
