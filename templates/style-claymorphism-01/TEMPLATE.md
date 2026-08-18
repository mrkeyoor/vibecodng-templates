# style-claymorphism-01 — Petalboard

A complete claymorphism landing page for Petalboard, a fictional learning app for ages 3 to 8. Chunky rounded clay slabs, pastel fills mixed from one petal-pink accent, thick soft highlights on top, deep rosy shadows underneath, and a garden of first-party inline SVG flowers. Built almost entirely from the first-party `clay-*` primitives in sir-originals (mrkeyoor/sir-originals), adapted in `src/components/Clay.jsx`.

## Stack

- Vite 7, React 19, Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies
- Theme is four CSS variables: `--bw-accent`, `--bw-surface`, `--bw-text`, `--bw-muted`. Pastel fills, clay highlights, and clay shadows are all `color-mix` derivations of accent and surface, so one palette swap re-molds every slab and every SVG flower
- Production build: 74.8 KB gzip total (index.html + all assets, gzip -9)

## Provenance and measured results

Every number below is copied from the indexed component's `results.json` (copies in `provenance/results/`). A11y columns are critical / serious / moderate / minor counts. Bundle columns are gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total. All twelve slugs are first-party sir-originals entries with indexed `build.ok`, `mount.ok`, and bare-project checks true, and no overflow at 375 / 768 / 1440.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar CTA, hero CTAs | `clay-button` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 86.4 / 65.4 / 21.0 | 69149 |
| Feature + testimonial cards | `clay-card` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 86.6 / 65.4 / 21.2 | 73862 |
| Weekend-pause toggle (features) | `clay-toggle` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.6 / 65.4 / 18.2 | 57151 |
| Quest-length slider (features) | `clay-slider` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.5 / 65.4 / 18.1 | 53367 |
| Hero quest progress | `clay-progress` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.4 / 65.4 / 18.0 | 54445 |
| Garden stats row | `clay-stat-card` | mrkeyoor/sir-originals | 0 / 1 / 0 / 0 | 83.7 / 65.4 / 18.3 | 56331 |
| Pricing tiers | `clay-pricing` | mrkeyoor/sir-originals | 0 / 1 / 0 / 0 | 84.3 / 65.4 / 18.9 | 54050 |
| Hero eyebrow, section badges | `clay-badge` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.3 / 65.4 / 17.9 | 55341 |
| Hero child + parent portraits | `clay-avatar` | mrkeyoor/sir-originals | 0 / 1 / 0 / 0 | 83.6 / 65.4 / 18.2 | 53860 |
| CTA email field | `clay-input` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.3 / 65.4 / 17.9 | 56910 |
| Hero quest checklist | `clay-checkbox` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.6 / 65.4 / 18.2 | 56664 |
| Quest-library search (garden) | `clay-search-input` | mrkeyoor/sir-originals | 0 / 0 / 0 / 0 | 83.7 / 65.4 / 18.3 | 53841 |
| Navbar / footer / section layout | first-party | this template | — | — | — |
| Flowers, sprout, butterfly, garden row (inline SVG) | first-party | this template | — | — | — |
| Reveal controller (IntersectionObserver) | first-party | this template | — | — | — |

## Honest notes

Three of the indexed `clay-*` components carry a recorded serious finding, and the adaptations address each in code:

- `clay-stat-card` and `clay-pricing`: axe `color-contrast` on muted labels over pastel fills. This template darkens the page muted to `#6C5B86` and additionally mixes label colors toward `--bw-text` (`color-mix(... 40-45% muted, text)`), keeping small text above 4.5:1 on the pink pastel.
- `clay-avatar`: `aria-prohibited-attr` (an `aria-label` on a plain `span`). The adaptation moves the accessible name to a `role="img"` wrapper and marks the initials presentational.

Remaining honest costs of the style: the thick 3 to 4px white borders and heavy drop shadows are load-bearing decoration, so the page carries more painted pixels per component than a flat design, and the near-monochrome pastel scheme means state changes rely on the accent fill plus motion. Checked states therefore always change fill color and glyph, never just shadow depth. The pastel tone ramps are derived from a single accent by design; a second accent hue would add variety but would break the one-palette re-theming contract, and was deliberately not added.

Emoji accents from the indexed `clay-card` and `clay-badge` defaults were replaced with palette-aware inline SVG (the `accent`/`icon` props now accept nodes) so the artwork re-themes with the CSS variables instead of shipping fixed-color glyphs.

## Motion

Springy once-only reveals (overshoot cubic-bezier), flowers that pop up stem by stem in the hero garden, two slow-floating decorations, squish-on-press buttons, and a wobble hover on the hero clay slab. All of it is disabled under `prefers-reduced-motion`; flowers render fully grown.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npx vite build
```

Fonts load from Google Fonts (Baloo 2 + Nunito); everything else is self-contained.
