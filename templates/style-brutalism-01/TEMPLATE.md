# sir-style-brutalism-01 — "Slab"

Style showcase: **neobrutalism, as a product page**. Slab is a fictional no-nonsense CMS and the page argues
like one: acid-yellow surface, 3px black borders, hard offset shadows, a NOT-doing ticker, a measured spec
sheet, a benchmark table built to be argued with, public pricing, and an FAQ with teeth. This is deliberately
a dense PRODUCT page, distinct from `agency-studio-01` (raw-brutalist agency portfolio, bone/orange,
Arial/Courier): different palette (yellow/ultramarine), different type (Anton + Archivo + IBM Plex Mono),
different components (spec tables, tickers, sticker badges), different register (sales page, not portfolio).

## Stack

- Vite, React 19, Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies (accordion is native `<details>`, no Radix)
- Fonts: Anton / Archivo / IBM Plex Mono via Google Fonts

## Provenance and measured results

Component patterns were selected from the `mrkeyoor.components` index (`style: 'brutalism'`, published,
mount ok) — the `neobrutalism-*` set — and rebuilt as plain CSS/JSX primitives (the source library wraps
Radix + shadcn; this template keeps the visual/interaction grammar without those runtimes). Numbers are
copied verbatim from `/var/www/mrkeyoor.com/harness/out/<slug>/results.json`. A11y columns are critical /
serious / moderate / minor counts; bundle columns are gzip / baseline gzip / marginal in KB; `totalMs` is
the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar (strip navigation) | `neobrutalism-navigation-menu` | https://github.com/ekmas/neobrutalism-components | 0 / 0 / 0 / 0 | 91.7 / 65.4 / 26.3 | 12658 |
| Ticker (looping strip) | `neobrutalism-marquee` | https://github.com/ekmas/neobrutalism-components | 0 / 0 / 0 / 0 | 82.7 / 65.4 / 17.3 | 63706 |
| Cards (features, stats, pricing, spec sheet) | `neobrutalism-card` | https://github.com/ekmas/neobrutalism-components | 0 / 0 / 0 / 0 | 77.1 / 65.4 / 11.7 | 14935 |
| Buttons (all CTAs) | `neobrutalism-button` | https://github.com/ekmas/neobrutalism-components | 1 / 0 / 0 / 0 | 93.4 / 65.4 / 28 | 21044 |
| Badges (stickers, tier flags, version chip) | `neobrutalism-badge` | https://github.com/ekmas/neobrutalism-components | 0 / 0 / 0 / 0 | 93.2 / 65.4 / 27.8 | 17286 |
| Benchmarks (hard-ruled table) | `neobrutalism-table` | https://github.com/ekmas/neobrutalism-components | 0 / 0 / 0 / 0 | 77.5 / 65.4 / 12.1 | 9632 |
| FAQ (accordion) | `neobrutalism-accordion` | https://github.com/ekmas/neobrutalism-components | 0 / 0 / 0 / 0 | 101.1 / 65.4 / 35.7 | 75302 |
| CTA (email input) | `neobrutalism-input` | https://github.com/ekmas/neobrutalism-components | 1 / 0 / 0 / 0 | 77.3 / 65.4 / 11.9 | 10745 |
| Section reveals | `motion-primitives-in-view` (cross-style, spatial index) | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |
| Hero composition | first-party (built from the card/badge/button primitives above) | — | — | — | — |
| Footer | first-party | — | — | — | — |

Honesty notes:

- `neobrutalism-button` and `neobrutalism-input` each carry 1 critical indexed finding (harness demo
  contrast/labeling). This template's buttons are white-on-`#3b2bee` (≈8.6:1) or yellow-on-black, and the
  CTA input has an explicit `<label for>`, `type="email"`, and `autocomplete` — the flagged conditions do
  not recur here, but the indexed numbers are reported unchanged above.
- The benchmark numbers, site counts, and quotes on the page are fictional product copy for a fictional
  CMS. The numbers in THIS table are real harness measurements.
- The reveal controller comes from a spatial-index entry; the brutalism set has no scroll-reveal
  primitive. Reveal distance/stagger are toned down (18px, 70ms) to keep the page blunt.

## Motion policy

Almost none, on principle: press-in button/card hovers, the ticker loop, and once-only 18px reveals.
Nothing follows the pointer. Under `prefers-reduced-motion` the ticker stops (duplicate set removed from
view, text wraps as a static list), hovers stop translating, and reveals render instantly. `?static` in
the URL forces the fully revealed, motionless state for screenshot tooling.

## Build

```bash
npm install
npx vite build --base=./
```

Measured production bundle (dist html+css+js, gzip): **71.4 KB** total
(index.html 0.68 KB, CSS 5.5 KB, JS 67 KB gzip). Budget: < 160 KB. Fonts load from Google Fonts at runtime.

Screenshot (768px full page): `/tmp/opus-style-brutalism.png`
