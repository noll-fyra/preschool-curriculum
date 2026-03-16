# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository layout

```
/preschool-curriculum/
├── nurture/              ← Next.js app (landing page + future MVP)
│   ├── app/              ← Next.js App Router root
│   ├── components/
│   │   ├── sections/     ← One file per landing page section
│   │   ├── ui/           ← Shared primitives (AnimateIn, MilestoneCard, PhoneMockup)
│   │   └── icons/        ← Inline SVG components
│   └── ...
├── nurture-prd.md        ← Full product requirements for the Nurture platform
├── landing-page-prd.md   ← Requirements for the landing page specifically
├── milestone-schema.md   ← 30 NEL-aligned milestones, mastery rules, data model
└── activities.md         ← 20 tap-to-select activity specifications
```

The Markdown files in the root are the source of truth for product decisions. Read them before making changes to content, copy, or data structures.

---

## Commands

All commands are run from `nurture/`:

```bash
npm run dev      # Development server (hot reload via Turbopack)
npm run build    # Production build + TypeScript check
npm run lint     # ESLint
npm run start    # Serve the production build
```

There are no tests yet. TypeScript errors surface during `npm run build` — always run it before considering a change complete.

---

## Tech stack

- **Next.js 16 / App Router** — static export, no server-side data fetching on the landing page
- **Tailwind CSS v4** — configured entirely via `@theme` in `app/globals.css` (no `tailwind.config.ts`). All brand tokens live there.
- **Framer Motion 12** — used only through the `AnimateIn` wrapper component. All scroll animations go through that component.
- **TypeScript strict mode** — `@/*` maps to the project root

---

## Architecture: how the landing page is assembled

`app/page.tsx` imports and stacks all 10 section components in order. There is no routing; the entire site is one page.

**Section render order:** `Header` → `Hero` → `Problem` → `Solution` → `Milestones` → `TeacherExperience` → `ParentExperience` → `LearningAreas` → `ResearchStats` → `ForProviders` → `FooterCTA`

**Client vs Server Components:**
- Server (default): all section components except those with browser APIs
- `"use client"`: `Header` (scroll listener), `ResearchStats` (IntersectionObserver counter), `FooterCTA` (mouse event handlers), `AnimateIn` (Framer Motion)

**Animations:** Wrap any element that should fade+slide in on scroll with `<AnimateIn delay={0.1}>`. It uses Framer Motion `whileInView` with `once: true` and respects `prefers-reduced-motion` automatically.

**Inline SVGs** live in `components/icons/` as React components. `LoopDiagram.tsx` exports two components — `LoopDiagramDesktop` (SVG) and `LoopDiagramMobile` (HTML list) — toggled via Tailwind responsive classes (`hidden md:block` / `md:hidden`).

---

## Design system

All tokens are CSS custom properties defined in `app/globals.css` under `@theme`. Reference them with Tailwind's arbitrary value syntax (`bg-[var(--color-primary)]`) or plain inline styles.

| Token group | Key values |
|---|---|
| Brand green | `--color-primary: #4A9B6F`, `--color-primary-wash: #E8F5EE` |
| Backgrounds | `--color-bg-warm: #FFFDF8` (default), `--color-bg-cream: #FDF6E8`, `--color-bg-deep: #F5EFE0` |
| Text | `--color-text-dark: #2D3A2E`, `--color-text-mid: #5C6B5D` |
| Accents | amber `#F5A623`, coral `#E8745A`, blue `#7BA3D4` |

Font: **Nunito** loaded via `next/font/google` in `app/layout.tsx`, applied as `--font-nunito` CSS variable.

Section backgrounds alternate: warm → cream → warm → cream → warm → wash → warm → deep → wash → deep.

---

## Domain context

**Nurture** is a preschool learning platform for NTUC First Campus (Singapore), aligned to the Ministry of Education's NEL Framework 2022. Key domain terms:

- **NEL** — Nurturing Early Learners framework; defines learning goals for ages 4–6
- **Beginning / Developing / Secure** — the three developmental levels used throughout the UI
- **Skill-based milestone** (LL, NUM) — achieved via 3 consecutive passing activity sessions, or 5 of 7
- **Behaviour-based milestone** (SED) — achieved via 5 teacher observations on 5 separate days
- **Passive / Active parent** — passive sees progress feed only; active also sees co-activity suggestions

The MVP covers one school, one class, three learning areas: Language & Literacy (LL), Numeracy (NUM), Social & Emotional Development (SED).
