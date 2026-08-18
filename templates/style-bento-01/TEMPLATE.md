# style-bento-01 — Hub

A style showcase for **bento grid** design: the entire page is one continuous grid of varied-size rounded cards, including the header, the hero, the pricing, and the footer. The fictional product is Hub, a team workspace, so the page itself behaves like a workspace dashboard: live activity, a sprint gauge, presence, and docs are all cards sitting beside the marketing copy.

Bricolage Grotesque carries the voice; the palette is warm bone with one electric blue accent and two inverted card tones (ink, accent) used sparingly for rhythm. Cards reveal once on scroll with a 60ms stagger and never move again.

## Stack

- Vite
- React 19
- Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies

## Theme

Palette flows through four CSS variables, overridable at build time via `BW_PALETTE` (see `vite.config.js`):

| Variable | Value | Role |
|---|---|---|
| `--bw-accent` | `#2c41f0` | Electric blue: buttons, gauge, live dots, accent card |
| `--bw-surface` | `#edebe3` | Bone canvas between cards |
| `--bw-text` | `#1c1b16` | Ink; also the inverted card tone |
| `--bw-muted` | `#77746a` | Secondary text |

## Provenance and measured results

The published `bento` pool in the `mrkeyoor.components` index is small (six entries), so this template is mostly first-party with four derived cards. Each derived file carries the source slug and author repository in a header comment. All numbers below are copied verbatim from `harness/out/<slug>/results.json` (mirrored in `provenance/results/`). A11y columns are critical / serious / moderate / minor counts; bundle columns are gzip / baseline gzip / marginal, in KB; `totalMs` is the recorded harness total.

| Card | Source | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Sprint gauge | `magicui-animated-circular-progress-bar` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 91.7 / 65.4 / 26.3 | 19211 |
| Presence avatars | `magicui-avatar-circles` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 91.4 / 65.4 / 26.0 | 58969 |
| Team docs tree | `magicui-file-tree` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 107.5 / 65.4 / 42.1 | 81566 |
| Testimonial post | `magicui-client-tweet-card` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 100.7 / 65.4 / 35.3 | 61114 |
| Header, hero, activity feed, features, stats, integrations, pricing, CTA, setup, footer cards; reveal controller | first-party | this template | n/a | n/a | n/a |

All four source records report `build.ok` and `mount.ok` as `true` with zero a11y violations. The two remaining pool entries were deliberately skipped: `magicui-tweet-card` overflows at 375px in its harness record, and `magicui-code-comparison` records one serious a11y violation and a 1,886.5 KB marginal bundle (it ships a syntax highlighter). Their numbers are from the index, not measured here.

Derivations are reimplementations, not copies: the gauge keeps the SVG ring plus in-view count-up but uses a CSS `stroke-dashoffset` transition instead of the source's runtime dependency; the file tree is static semantic lists; the tweet card is rendered statically instead of fetching a live post.

## This template's bundle

Measured from `npx vite build` output (gzip):

| Asset | gzip KB |
|---|---:|
| JS | 67.16 |
| CSS | 5.08 |
| HTML | 0.54 |
| **Total** | **72.78** |

Budget for these showcases is 160 KB gzip; Hub ships at 72.78 KB, 55% under.

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

- Every element on the page, header and footer included, is a `.card` inside one 12-column grid (`.bento`). Spans collapse to full width below 960px, with a 6-column step at 640px for the pricing pair.
- Motion: cards fade-and-lift once on first intersection (60ms stagger); the gauge draws once and counts up once. All of it, plus hover transforms and smooth scroll, is disabled under `prefers-reduced-motion`, and the gauge then renders its final value immediately.
- Avatars, the poster mark, integration glyphs, and the hero dot field are inline SVG inheriting the CSS variables. No raster images, no icon font.
- Bricolage Grotesque loads from Google Fonts with system fallbacks; the layout does not depend on it.
