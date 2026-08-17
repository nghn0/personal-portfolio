# Design Reference: How It Works (chamaac)

Source: `npx shadcn@latest add "https://21st.dev/r/chamaac/how-it-works"`
Retrieved: 2026-08-15
Original component code preserved below (verbatim, unmodified) so we can edit it in isolation.

## Structure of the original (single file)
1. `Pin` — small SVG pushpin icon rendered on each card.
2. `Card` — a rounded card (`bg-white dark:bg-neutral-900 p-2 rounded-[25px]`) containing:
   - a Pin (colored)
   - an inner tinted block (`rounded-[15px]`) with a big handwritten number (`01`, `02`, ...), title, description
   - `hover:scale-105`, `hover:z-30`
   - a `rotate` string (e.g. `rotate-8` / `-rotate-8`)
   - custom colors via `colors={{ bg, text, border }}` (this is our hook for the silver theme)
3. `HowItWorks` — the section:
   - horizontal grid paper background (two gradient lines layers, light + dark)
   - edge fade gradients (`from-background` left/right)
   - a container of `--md-height` px that holds absolutely-positioned cards + an SVG dashed connector path
   - SVG path drawn from card 1 → 2 → ... → n, `strokeDashoffset` animated infinitely for a flowing dashed line
   - `DEFAULT_CARD_POSITIONS`: absolute top/left/right offsets, each with rotate
   - height derived from `data.length` (2 → 450, 3 → 800, 4 → 900, else 1130)

## Card color theming (colors prop)
```
colors: { bg, text, border }
bg    → tinted block background
text  → pin + number color
border→ tinted block border
```

## Adaptation plan for the Experience section (our work)
- Replace the 5 generic steps with the 2 real experiences from `src/components/Experience.tsx`
  (Janmamithra Trust → Full-Stack Developer Intern; Dhee Center → AI Intern).
- Use GSAP (already a dependency) instead of `motion/react` for the scroll-driven
  "pinned/connected" reveal — the section should feel scroll-scrubbed like the
  featured projects StackedCarousel deal.
- Colors: map the original orange/blue/purple to the monochrome silver theme used across
  the site (`#0d0d12` cards, `#b9c3d4` silver accents, white/10 borders, neutral text).
- Inside each card keep the current content: role, company + duration (Briefcase/Calendar),
  and the description bullets.
- Section heading mirrors the featured projects header (BlurReveal + font-mono, white).
- The connector SVG keeps the animated dashed line.