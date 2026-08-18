# style-editorial-01 — Longform

A style showcase for **editorial** design: oversized typography, strong ruled grids, magazine structure. The type is the interface; there is not a single raster image or decorative illustration on the page. The fictional product is Longform, a writing platform, so the landing page is built like an issue of a magazine: masthead with dateline, a front-page hero with a two-column deck and drop cap, a numbered feature spread, an essay index, a pull-quote plate, circulation figures, subscription notices, a queries column, and a colophon.

Fraunces (optical sizes up to 144) carries the display voice; Newsreader sets the text; a mono face handles folios and small caps. The palette is cream, near-black ink, and one editorial red. Every section opens with the thick-thin double rule, the signature of the design.

## Stack

- Vite
- React 19
- Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies

## Theme

Palette flows through four CSS variables, overridable at build time via `BW_PALETTE` (see `vite.config.js`):

| Variable | Value | Role |
|---|---|---|
| `--bw-accent` | `#bf3311` | Editorial red: italics, numerals, markers |
| `--bw-surface` | `#f6f1e7` | Cream paper |
| `--bw-text` | `#1c1510` | Ink; also the inverted plates |
| `--bw-muted` | `#6f6354` | Secondary text |

## Provenance and measured results

Sections were derived from published entries in the `mrkeyoor.components` index (style: `editorial`). Each derived section file carries the source slug and author repository in a header comment; the hero poster and pull-quote spread are first-party. All numbers below are copied verbatim from `harness/out/<slug>/results.json` (mirrored in `provenance/results/`). A11y columns are critical / serious / moderate / minor counts; bundle columns are gzip / baseline gzip / marginal, in KB; `totalMs` is the recorded harness total.

| Section | Source | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Masthead | `hyperui-headers-4` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 84.5 / 65.4 / 19.1 | 18133 |
| Hero poster | first-party | this template | n/a | n/a | n/a |
| The instrument (features) | `hyperui-feature-grids-1` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.3 / 65.4 / 17.9 | 28407 |
| Essay index | `hyperui-blog-cards-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 82.9 / 65.4 / 17.5 | 15182 |
| Pull quote | first-party | this template | n/a | n/a | n/a |
| Circulation (stats) | `hyperui-stats-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.2 / 65.4 / 17.8 | 68051 |
| Subscriptions (pricing) | `hyperui-pricing-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.6 / 65.4 / 18.2 | 62177 |
| Notes & queries (FAQ) | `hyperui-faq-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.0 / 65.4 / 17.6 | 68757 |
| Final page (CTA) | `hyperui-ctas-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.4 / 65.4 / 18.0 | 24801 |
| Colophon (footer) | `hyperui-footers-3` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 92.0 / 65.4 / 26.6 | 24903 |

All eight source records report `build.ok` and `mount.ok` as `true` with zero a11y violations at every severity. The harness numbers measure each source in isolation against a 65.4 KB React baseline; they are properties of the sources, not of this template.

## This template's bundle

Measured from `npx vite build` output (gzip):

| Asset | gzip KB |
|---|---:|
| JS | 65.68 |
| CSS | 4.66 |
| HTML | 0.56 |
| **Total** | **70.90** |

Budget for these showcases is 160 KB gzip; Longform ships at 70.90 KB, 56% under. The variable-font files come from Google Fonts and are not part of the app bundle; the page renders on Georgia until they arrive.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npx vite build
```

## Adaptation notes

- The hyperui sources are utility-styled Tailwind blocks; their structures (row anatomy, accordion semantics, plan-card composition) were retained while the visual language was rebuilt around rules and Fraunces. Every derivation is noted in the file header.
- All copy is written for Longform in a magazine register; the three essays and their authors are fictional.
- Motion: sections fade up once on first intersection with a 90ms internal stagger; the only other movement is the essay-arrow nudge and the FAQ plus rotation. Everything is disabled under `prefers-reduced-motion`.
- The FAQ is native `details`/`summary` and works without JavaScript, as does every link and layout on the page.
- The section screenshots for this style pool skew simple (hyperui blocks); the design work here is mostly first-party typography. That is the honest trade of an editorial pool with 55 entries and no hero/testimonial patterns.
