# style-minimal-flat-01 — Ledger

A style showcase for **minimal flat** design: clean typography, large whitespace, simple shapes, almost no decoration. The fictional product is Ledger, invoicing for freelancers.

The restraint is the point. One typeface (Instrument Sans), four text sizes, 1px hairline rules, a 2px corner radius, no shadows, no gradients, and a single deliberate motion moment (the hero settles in on load, once, disabled under `prefers-reduced-motion`). Every section divider is the same hairline. Money is set in tabular figures.

## Stack

- Vite
- React 19
- Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies

## Theme

Palette flows through four CSS variables, overridable at build time via `BW_PALETTE` (see `vite.config.js`):

| Variable | Value | Role |
|---|---|---|
| `--bw-accent` | `#1b5e45` | Ledger green: paid marks, checks, links |
| `--bw-surface` | `#fcfcf9` | Paper |
| `--bw-text` | `#191916` | Ink |
| `--bw-muted` | `#6f6f67` | Secondary text |

## Provenance and measured results

Sections were derived from published entries in the `mrkeyoor.components` index (style: `minimal-flat`). Each derived section file carries the source slug and author repository in a header comment. All numbers below are copied verbatim from `harness/out/<slug>/results.json` (mirrored in `provenance/results/`). A11y columns are critical / serious / moderate / minor counts; bundle columns are gzip / baseline gzip / marginal, in KB; `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar | `efferd-header-1` | https://github.com/shabanhr/efferd-ui | 0 / 0 / 0 / 0 | 100.2 / 65.4 / 34.8 | 197992 |
| Hero + invoice document | `tailark-mist-hero-section-5` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 130.2 / 65.4 / 64.8 | 101031 |
| Client row | `meraki-logo-wall-trusted-by` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 90.5 / 65.4 / 25.1 | 58667 |
| Features | `meraki-feature-simple` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 85.6 / 65.4 / 20.2 | 69555 |
| Stats | `tailark-mist-stats-2` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 83.0 / 65.4 / 17.6 | 103469 |
| Pricing | `meraki-pricing-side-by-side` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 84.2 / 65.4 / 18.8 | 65294 |
| Testimonial | `meraki-testimonials-centered` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 83.8 / 65.4 / 18.4 | 53269 |
| FAQ | `meraki-faq-collapse` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 83.3 / 65.4 / 17.9 | 67818 |
| CTA | `meraki-cta-simple` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 83.1 / 65.4 / 17.7 | 61931 |
| Footer | `efferd-footer-3` | https://github.com/shabanhr/efferd-ui | 0 / 0 / 0 / 0 | 95.9 / 65.4 / 30.5 | 222391 |

All ten source records report `build.ok` and `mount.ok` as `true` and zero a11y violations at every severity. The harness bundle numbers above measure each source component in isolation against a 65.4 KB React baseline; they are properties of the sources, not of this template.

## This template's bundle

Measured from `npx vite build` output (gzip):

| Asset | gzip KB |
|---|---:|
| JS | 65.17 |
| CSS | 4.21 |
| HTML | 0.53 |
| **Total** | **69.91** |

The budget for these showcases is 160 KB gzip. Ledger ships at **69.91 KB, which is 56% under budget** and within 4.6 KB of the harness's empty-page React baseline (65.4 KB). The entire design layer, all ten sections plus theme, costs less gzip than a single JPEG icon. That is what restraint buys.

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

- Source structures were retained (see per-file header comments); color, spacing, and copy were rewritten for Ledger's flat system. Filled buttons, tinted panels, icon badges, and shadows in the sources were flattened to hairlines and type.
- The FAQ uses native `details`/`summary`, so it works with JavaScript disabled.
- Motion: the hero load-in is the only animation on the page. It runs once and is fully disabled under `prefers-reduced-motion` (as are smooth scrolling and transitions).
- The invoice document in the hero is first-party artwork built from HTML and one inline SVG check mark, inheriting the CSS variables.
- Instrument Sans is loaded from Google Fonts with system-ui fallbacks; the page is fully readable if the font never arrives.
