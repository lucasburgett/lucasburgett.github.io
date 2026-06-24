# Editorial Redesign — Lucas Burgett personal site

**Date:** 2026-06-23
**Branch:** `lucasburgett/redesign-portfolio-ui`
**Direction:** Option B — "Editorial" (modern crafted / research-publication aesthetic)

## Why

The current site is technically polished but wears every tell of the AI/Tailwind
portfolio template: indigo gradient glow + dot-grid hero background, a pulsing
"status" dot, `rounded-2xl` cards with soft shadows, pill buttons, tag-pill
clusters on every item, and fade/slide-up-on-scroll on everything. In the
research/ML circles Lucas is aiming at, that decoration reads as "template,"
which undercuts the genuinely strong content (detailed RL research, a real demo
video, shipped products).

The goal: reframe the substance as the hero with a designed, editorial,
research-publication aesthetic that signals taste and craft — "a researcher who
can also ship," not "a bootcamp portfolio."

Modeled on: Distill.pub (breakout grid, soft-black editorial type), Bartosz
Ciechanowski (substance-is-the-design, reader-controlled media), with Linear /
Vercel chrome discipline (tokenized neutrals, one rationed accent, big-light-tight
display type, restraint on motion).

## Locked direction (from mockup review, 2026-06-23)
Chose **Variant B's typography** (serif display + serif body, research-journal),
on a **light-only** system, with **Variant A's ink-blue accent**. Mockups reviewed
and verified non-slop: `.context/mockups/variant-{A,B,C}-*.html` + `.png`.
Reference build to match: `variant-B-serif-light.html`, adjusted to ink-blue accent.

## Design system

### Typography
- **Display (name, section headings):** **Fraunces** (variable, optical-size +
  high-contrast axis, free via Fontsource), used LARGE + LIGHT + TIGHTLY TRACKED.
  Hero name `clamp(3.1rem, 8.5vw, 5.6rem)`, weight ~340, letter-spacing -0.025em,
  line-height ~0.98. Section heads Fraunces ~weight 420, ~1.05rem. This
  "large + light + negative tracking" treatment is the universal tell of editorial
  taste — never big-and-bold.
- **Body:** **serif** — **Newsreader** (variable, optical-size; free via Fontsource)
  at ~20px / line-height ~1.6 on a ~40rem (~64ch) measure. `font-variant-numeric:
  oldstyle-nums` on prose. Taglines set in Newsreader italic. This is the
  Distill/Olah research-credibility move the user chose over a sans body.
- **Mono (metadata):** keep **JetBrains Mono**. Used for dates, venues, affiliations,
  status, and technical tags rendered as inline microtype — "Math @ Stanford · RL
  for robots," "GRPO · π₀.₅ · JAX," paper venues. Replaces the pill-tag clusters
  entirely. (Mono resets `font-variant-numeric` to normal.)

### Color (light only)
- Warm off-white "paper" `#f8f6f0`; soft near-black ink `#1f1b16` for display,
  body `#2e2820`; muted `#6b6253`, faint `#948a78`; rules `#e4ddcf` /
  `#d4cab7`. Keep the oklch token architecture in `global.css`; swap the values
  to these warm neutrals.
- Exactly ONE rationed accent: **ink-blue `#2b4ba0`**, used roughly once per
  section (links, the play triangle, an occasional rule) — never as ambient glow.
  Verify ≥4.5:1 contrast on paper (it passes; it is dark).
- **Light only.** REMOVE the existing dark-mode tokens, the `.dark` variant, the
  theme toggle, and the theme-fade transitions from `global.css`. Simpler system,
  cleaner editorial feel.

### Layout
- Single reading column, left-aligned, measure ~680-720px (~65ch) for prose.
- A Distill-style **breakout grid**: text stays in the reading measure; figures,
  the VLA-memory video, and code/media break wider than the text column.
- Generous, rhythmic vertical spacing (a real spacing scale), not decorative padding.

### Motion (restraint is the craft signal)
- REMOVE: ambient gradient glow, dot-grid background, pulsing status dot, the
  fade/slide-up-on-everything scroll reveal, the scroll progress bar.
- KEEP/ADD only: at most one quiet entrance on the hero name, and reader-controlled
  media (the VLA video plays on user action, never autoplay). Everything gated on
  `prefers-reduced-motion`.

### AI-slop kill list (explicit)
gradient glow · dot/graph-paper background · pulsing "available" dot ·
`rounded-2xl` cards everywhere · pill buttons with gradient fill · tag-pill
clusters · fade-up-on-scroll on every element · centered-everything ·
3-column icon-in-circle feature grid.

## Per-section treatment

- **Hero:** big light tight serif name; one-to-two sentence bio in body type; a
  single mono metadata line (role · focus · location); a quiet row of text links
  (résumé, GitHub, LinkedIn, email) — no pill button, no glow, no status dot.
  The "Now / Summer" cards become a restrained mono-labeled "Currently" block or
  a single line, not two shadowed cards.
- **Research (the centerpiece):** each item is an editorial entry — serif title,
  a mono metadata line (status · venue), prose body, and for VLA Memory the demo
  video as a WIDE breakout figure with a real caption. Highlights become prose or
  a clean list, not bullet-pills. Tags become inline mono microtype.
- **Projects:** a typographic index (likely two columns on desktop), each row:
  serif/strong title, mono "kind · year," one-line body, inline "Source" link
  where public. No cards.
- **Experience:** CV-style list; mono period in the left margin, role/org/body
  in the column. Quiet "incoming" marker for Parametric instead of a glowing badge.
- **About / Education / Skills:** prose column; education + skills as compact
  mono-labeled lists rather than pill grids.
- **Nav:** minimal text links; thin top bar. Drop the glassmorphic elevation
  gimmick (or keep it extremely subtle).
- **Footer:** quiet — name, a line, the same few links.

## Implementation approach
- Astro + Tailwind v4. Reuse the CSS-variable token system in
  `src/styles/global.css`; swap font `@import`s + token values + component markup.
- Refactor component-by-component (Hero → Research → Projects → Experience →
  About → Nav → Footer), keeping `src/data/content.ts` as the single source of
  truth (content does not change in this redesign).
- `npm install` is required first — `node_modules` is currently absent in this
  workspace (the `astro` binary is missing), so the dev server can't run yet.

## Navigation (resolved)
Minimal **sticky top bar**: name (left, Fraunces, small) + section links (right:
Research · Building · Experience · About). Quiet — paper background, 1px bottom
rule that strengthens slightly on scroll; NO glassmorphism/blur, NO drop shadow.
Current section gets a subtle indicator (accent underline or ink weight). Hidden
or collapsed into a simple anchor row on mobile (see Responsive). Logo/name links
to top. This satisfies Krug's "trunk test" wayfinding without chrome.

## Resolved structural decisions
- **Currently block:** keep the two-column block directly under the hero
  (Parametric summer role + Stanford research), mono labels. It is the one place
  Parametric is featured up top.
- **Education & Skills:** fold compact, mono-labeled list versions into the
  **About** section (no standalone Skills pill-grid, no standalone Education card).
- **Video:** keep the VLA Memory demo as a click-to-play breakout figure using the
  REAL poster (`/media/vla-memory-poster.png`), not a placeholder texture.

## Interaction states
What the USER sees (not backend behavior). Static content site, so states are
mostly media + links + progressive enhancement.

```
FEATURE            | DEFAULT            | HOVER/FOCUS         | LOADING/EMPTY        | ERROR/FALLBACK
-------------------|--------------------|---------------------|----------------------|------------------
Research video     | real poster +      | play control gets   | poster shows while   | if video 404/codec
(VLA Memory)       | centered play mark | focus ring; cursor  | mp4 buffers; native  | fail: poster stays
                   | (click to play,    | pointer             | controls after play  | + caption, no
                   | NOT autoplay)      |                     |                      | broken-media box
In-prose links     | accent ink-blue,   | underline thickens/ | n/a                  | n/a
                   | underlined         | accent; focus ring  |                      |
Nav / utility      | ink, no underline  | accent + 1px under- | n/a                  | n/a
links              | (obvious by place) | line; focus ring    |                      |
Résumé link        | text link w/ ↗     | accent; focus ring  | opens PDF in new tab | if PDF missing,
                   |                    |                     |                      | link still valid
Section reveal     | visible by default | n/a                 | no-JS: fully visible | reduced-motion:
(if any motion)    | (content-first)    |                     | (no hidden content)  | no transform
Sticky nav         | rule = faint       | current section     | n/a                  | no-JS: static bar
                   |                    | indicated           |                      | (position: sticky
                   |                    |                     |                      | is CSS-only)
```
Principles: nothing is hidden without JS (content-first); the video never
autoplays (reader-controlled = the craft signal); every interactive element has a
visible `:focus-visible` ring.

## Responsive (per viewport, not just "stacked")
- **Desktop (≥1024px):** reading measure ~40rem centered in a ~62rem frame;
  breakout figure goes to frame width; Currently block 2-col; nav bar shows name +
  inline section links.
- **Tablet (640–1023px):** measure fluid up to ~40rem; breakout figure = frame
  width minus padding; Currently stays 2-col until ~560px.
- **Mobile (<640px):** single column, side padding 1.25–1.5rem; hero name scales
  via `clamp` (floor ~3.1rem); Currently collapses to 1-col; breakout figure goes
  near-full-bleed (small side padding); nav collapses to name + a single "menu"
  anchor row OR a compact wrap of section links (no hamburger needed for 4 links).
  Body stays ≥18px; never shrink below 16px.

## Accessibility (specified, not assumed)
- **Contrast:** body `#2e2820` on paper `#f8f6f0` and accent `#2b4ba0` on paper
  both exceed 4.5:1. Faint `#948a78` is for non-essential metadata only; keep any
  text that must be read at ≥4.5:1 (bump muted, not faint, for real content).
- **Links:** in-prose links are underlined (never color-only — colorblind-safe).
  Visited state: keep a perceptibly different shade for in-prose links.
- **Keyboard:** visible `:focus-visible` outline (accent, 2px, offset) on all
  links and the video; logical tab order; skip-to-content link before the nav.
- **Touch targets:** the hero/footer link row uses ≥44px hit areas (padding),
  even though the text is small.
- **Media:** the `<video>` uses native controls once played, has the caption as
  visible text, and a poster; respects `prefers-reduced-motion` (no scroll motion).
- **Semantics:** one `<h1>` (name), section `<h2>`s, `<nav aria-label>`, landmark
  regions, `<article>` per research/project entry.

## Per-section build spec (supersedes earlier sketch where they differ)
- **Nav:** as in Navigation section above.
- **Hero:** Fraunces name (big/light/tight) → Newsreader bio sentence → mono
  metadata line → utility link row (Résumé ↗, GitHub, LinkedIn, Email) → Currently
  two-column block (mono labels, Fraunces sub-heads). No glow, no dot grid, no
  status dot, no pill button.
- **Research:** `<h2>` "Research". Each item = `<article>`: Fraunces title,
  Newsreader-italic tagline, mono meta line (status · venue), prose body,
  highlights as prose or a clean ruled list (NOT pills), tags as inline mono
  microtype with `·` separators. VLA Memory gets the wide breakout `<video>`
  (real poster, click-to-play) + caption.
- **Building (Projects):** `<h2>` "Building". Typographic index, one `<article>`
  per row: Fraunces title + mono "KIND · YEAR" + one-line Newsreader body +
  inline "Source ↗" where public (respect `repoPrivate`). Top/bottom hairline
  rules, no cards.
- **Experience:** CV list; mono period in a left column (desktop), role/org/body
  in the main column. Quiet "Incoming" marker for Parametric (mono label, not a
  glowing badge).
- **About:** prose column (the three About paragraphs) + compact mono-labeled
  lists for Education (school/degree/period/GPA/coursework) and Skills (grouped:
  Languages, ML & RL, Infrastructure, Product, Spoken). Lists, not pill grids.
- **Footer:** name · year, the same few links, quiet.

## Implementation notes (added during review)
- `npm install` first (node_modules absent → `astro` binary missing).
- Centralize all tokens in `src/styles/global.css`; delete `.dark` block, theme
  toggle, theme-fade, scroll-progress bar, parallax/glow/dot-grid, and the
  blanket `[data-reveal]` motion. Keep only `prefers-reduced-motion`-safe pieces.
- Swap font imports: drop Inter + Instrument Serif; add Fraunces + Newsreader
  (Fontsource variable), keep JetBrains Mono.
- `content.ts` is unchanged (no copy edits in this redesign).
- Reference implementation to match: `.context/mockups/variant-B-serif-light.html`
  with accent set to ink-blue `#2b4ba0`.

## NOT in scope
- Copy/content rewrites (handled previously; `content.ts` stays as-is).
- Dark mode (explicitly removed; light-only chosen).
- A blog/writing index, search, or CMS (no content for it yet).
- Per-research-paper detail pages (single-page site stays single-page).
- Custom illustrations / interactive WebGL diagrams (the real demo video is the
  one rich-media element; bespoke interactives are a future nice-to-have).

## What already exists (reuse)
- The oklch CSS-variable token architecture in `global.css` (keep the pattern,
  swap values; remove dark tokens).
- `content.ts` single-source-of-truth content model and interfaces.
- Component structure (Hero/Research/Projects/Experience/About/Nav/Footer) —
  refactor in place rather than rebuild.
- The `.eyebrow` / mono microtype idea (repurposed as the mono metadata system).

## Implementation Tasks
Synthesized from this review's findings. Build in order (tokens first). Run with
Claude Code or Codex; checkbox as you ship.

- [ ] **T1 (P1, human: ~2h / CC: ~20min)** — global.css — token + foundation overhaul
  - Surfaced by: Design system + Pass 4/5. Swap to warm-paper light palette, add
    Fraunces + Newsreader (Fontsource variable), keep JetBrains Mono; DELETE
    `.dark` tokens, theme toggle, theme-fade, scroll-progress, parallax/glow/
    dot-grid, blanket `[data-reveal]` motion. Set measure/spacing scale.
  - Files: `src/styles/global.css`, `package.json`
  - Verify: `npm install && npm run dev`; hero renders in Fraunces, no dark toggle
- [ ] **T2 (P1, human: ~1.5h / CC: ~15min)** — Nav.astro — minimal sticky top bar
  - Surfaced by: Pass 1. Name (left) + section links (right), current-section
    indicator, 1px rule strengthening on scroll, no blur/shadow; mobile collapse.
  - Files: `src/components/Nav.astro`, `src/layouts/Base.astro`
  - Verify: sticky on scroll; keyboard-focusable; trunk test passes
- [ ] **T3 (P1, human: ~2h / CC: ~20min)** — Hero.astro — editorial hero
  - Surfaced by: Pass 1/4. Fraunces name, Newsreader bio, mono metadata line,
    utility link row, Currently 2-col block; remove glow/dot-grid/status-dot/pill.
  - Files: `src/components/Hero.astro`
  - Verify: matches `variant-B-serif-light.html` (ink-blue accent); no slop tells
- [ ] **T4 (P1, human: ~2.5h / CC: ~25min)** — Research.astro — research entries + breakout video
  - Surfaced by: Pass 2/4. `<article>` entries, mono meta, prose body, mono-microtype
    tags; VLA Memory wide breakout `<video>` using real poster, click-to-play,
    failure fallback to poster.
  - Files: `src/components/Research.astro`
  - Verify: video plays on click only; poster shows if mp4 fails; focus ring on control
- [ ] **T5 (P1, human: ~1.5h / CC: ~15min)** — Projects.astro — typographic "Building" index
  - Surfaced by: Pass 4. Ruled rows, Fraunces title, mono KIND·YEAR, inline Source ↗
    (respect `repoPrivate`); no cards/pills.
  - Files: `src/components/Projects.astro`
  - Verify: private repos show no link; hairline rules, not cards
- [ ] **T6 (P2, human: ~1h / CC: ~12min)** — Experience.astro — CV list
  - Surfaced by: Pass 1. Mono period left column, quiet "Incoming" marker for Parametric.
  - Files: `src/components/Experience.astro`
- [ ] **T7 (P2, human: ~1.5h / CC: ~15min)** — About.astro — prose + folded Education/Skills
  - Surfaced by: Pass 1 decision. Three About paragraphs + compact mono-labeled
    Education and Skills lists (no pill grid, no standalone sections).
  - Files: `src/components/About.astro`; remove any standalone education/skills usage
- [ ] **T8 (P2, human: ~45min / CC: ~8min)** — Footer.astro + Base.astro cleanup
  - Surfaced by: Pass 4/6. Quiet footer; add skip-to-content link; strip theme
    script and motion leftovers from layout.
  - Files: `src/components/Footer.astro`, `src/layouts/Base.astro`
- [ ] **T9 (P2, human: ~2h / CC: ~20min)** — Responsive + a11y pass
  - Surfaced by: Pass 6. focus-visible rings, underlined+visited prose links, 44px
    touch targets, mobile nav, breakout near-full-bleed on mobile, contrast verify.
  - Files: `global.css` + all components
  - Verify: keyboard-only nav works; `browse responsive`; contrast ≥4.5:1 on body
- [ ] **T10 (P3, human: ~30min / CC: ~5min)** — Verify against mockup + remove `.context/mockups`
  - Surfaced by: Pass 4. Screenshot live site, diff against `variant-B-serif-light`,
    confirm no slop regressions; delete scratch mockups before merge.
  - Verify: `browse screenshot` vs mockup; visual parity

_DESIGN.md extraction: declined (YAGNI) — tokens live in global.css._

## Approved Mockups

| Screen | Mockup | Direction | Notes |
|--------|--------|-----------|-------|
| Homepage | `.context/mockups/variant-B-serif-light.html` (+ `.png`) | Editorial / Fraunces display + Newsreader serif body / warm-paper light | Reference build. Override accent to ink-blue `#2b4ba0` (from Variant A). Verified non-slop against the AI-slop blacklist. |

Scratch alternatives (not chosen): `variant-A-sans-light.html` (sans body),
`variant-C-sans-dark.html` (dark). Delete `.context/mockups/` before merge.

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | not run |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | — | not run |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 0 | — | not run |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | CLEAR (FULL) | score 6/10 → 9/10, 7 decisions, 0 unresolved |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | n/a (no dev-facing surface) |

- **Dimensions:** Info Arch 7→9 · States 5→9 · Journey 8→9 · AI-Slop 9→9 ·
  Design System 6→7 · Responsive & A11y 5→9 · Decisions all resolved.
- **Mockups:** 3 generated (hand-built HTML, browse-screenshot verified), 1 approved.
- **UNRESOLVED:** 0.
- **VERDICT:** DESIGN CLEARED — plan is design-complete (9/10). Eng review not yet
  run; it is the required shipping gate. Run `/plan-eng-review` before implementing.
