# style-neumorphism-01 — Pulse

A complete neumorphism landing page for Pulse, a fictional wellness tracker. The whole page lives in one soft-extrusion material system: a single light-gray surface, dual light/dark shadows derived from it, and one deep teal accent. Built almost entirely from the first-party `neu-*` primitives in sir-originals (mrkeyoor/sir-originals), adapted in `src/components/Neu.jsx`.

## Stack

- Vite 7, React 19, Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies
- Theme is four CSS variables: `--bw-accent`, `--bw-surface`, `--bw-text`, `--bw-muted`; both shadow tones are `color-mix` derivations of `--bw-surface`, so any palette re-themes the extrusion
- Production build: 73.8 KB gzip total (index.html + all assets, gzip -9)

## Provenance and measured results

Every number below is copied from the indexed component's `results.json` (copies in `provenance/results/`). A11y columns are critical / serious / moderate / minor counts. Bundle columns are gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total. All twelve slugs are first-party sir-originals entries with indexed `build.ok`, `mount.ok`, and bare-project checks true, and no overflow at 375 / 768 / 1440.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar CTA, hero CTAs | `neu-button` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 86.3 / 65.4 / 20.9 | 83977 |
| Feature + testimonial cards | `neu-card` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 86.2 / 65.4 / 20.8 | 71056 |
| Hero quiet-mornings, pricing billing switch | `neu-toggle` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.2 / 65.4 / 17.8 | 55252 |
| Hero training-load slider | `neu-slider` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.1 / 65.4 / 17.7 | 56033 |
| Hero sleep-debt bar | `neu-progress` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.2 / 65.4 / 17.8 | 56157 |
| Stats row | `neu-stat-card` | mrkeyoor/sir-originals | 0 / 1 / 0 / 0 | 83.3 / 65.4 / 17.9 | 55328 |
| Pricing tiers | `neu-pricing` | mrkeyoor/sir-originals | 0 / 1 / 0 / 0 | 83.8 / 65.4 / 18.4 | 59671 |
| Hero eyebrow, section badges | `neu-badge` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 82.9 / 65.4 / 17.5 | 56259 |
| Testimonial portraits | `neu-avatar` | mrkeyoor/sir-originals | 0 / 1 / 0 / 0 | 83.2 / 65.4 / 17.8 | 55439 |
| CTA email field | `neu-input` | mrkeyoor/sir-originals | 0 / 1 / 0 / 0 | 83.1 / 65.4 / 17.7 | 56088 |
| Habit-anchor feature demo | `neu-checkbox` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.3 / 65.4 / 17.9 | 55887 |
| History search feature demo | `neu-search-input` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.5 / 65.4 / 18.1 | 53986 |
| Navbar / footer / section layout | first-party | this template | — | — | — |
| Score rings, HRV wave, sleep bars (inline SVG) | first-party | this template | — | — | — |
| Reveal controller (IntersectionObserver) | first-party | this template | — | — | — |

## The honest part: neumorphism and contrast

Neumorphism's visual language is low contrast by construction: raised and inset states are communicated by shadows of the *same* surface color, not by hue or luminance of the content. The index reflects this honestly; four of the twelve source components carry a recorded serious finding:

- `neu-stat-card`, `neu-pricing`, `neu-input`: axe `color-contrast` on muted small text (the indexed default muted `#667085` on `#E0E5EC` is roughly 4.0:1, below the 4.5:1 threshold for small text).
- `neu-avatar`: `aria-prohibited-attr` (an `aria-label` on a plain `span`).

Mitigations chosen in this template, in code rather than in the README:

1. **Darker global muted.** The page palette uses `--bw-muted: #57627A` on `--bw-surface: #E4E9F1`, about 5.5:1, so plain muted text passes AA for small sizes.
2. **Muted-to-text mixing at the risky spots.** The adapted stat-card caption, pricing description/period, input placeholder and hints use `color-mix` blends that lean toward `--bw-text`, so they stay above 4.5:1 even if a user palette supplies a weaker muted value.
3. **Accent chosen for text duty.** `--bw-accent: #0E7C6B` measures about 4.9:1 on the surface, so accent-colored labels and links are legible, not just decorative.
4. **Shadow is never the only signal.** Toggles and checkboxes change fill color when active, focus is a solid 2px accent ring (`:focus-visible`), and pressed buttons also translate. Someone who cannot perceive the emboss still gets state.
5. **Avatar a11y fix.** The adaptation moves the accessible name to a `role="img"` wrapper and makes the initials presentational, resolving the recorded `aria-prohibited-attr` pattern.

What is *not* fixed: the aesthetic still depends on subtle shadow differences to separate raised surfaces from the background, and on a low-chroma page. Users with low contrast sensitivity will find section boundaries softer than on a bordered design. That is the honest cost of the style; hairline borders would remove it but would stop being neumorphism.

## Motion

Once-only section reveals via IntersectionObserver, a single ring-sweep and line-draw in the hero and features, and press/hover micro-interactions on the primitives. Everything is disabled under `prefers-reduced-motion` (reveals become instant, arcs render at their final state).

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npx vite build
```

Fonts load from Google Fonts (Manrope); everything else is self-contained.
