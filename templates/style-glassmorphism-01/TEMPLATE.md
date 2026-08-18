# style-glassmorphism-01 — Vantage

A full glassmorphism landing page for Vantage, a fictional product analytics SaaS. Every
surface is a translucent frosted panel over a fixed field of blurred color orbs: backdrop
blur, low-opacity fills, 1px light borders, and inset top highlights are the entire design
language, not an accent.

## Stack

- Vite
- React 19
- Tailwind CSS 4 (`@tailwindcss/vite`)
- No component runtime dependencies

Typography: Familjen Grotesk (display and body) with IBM Plex Mono for data labels, loaded
from Google Fonts. Palette runs through `--bw-accent`, `--bw-surface`, `--bw-text`,
`--bw-muted`; a companion hue is derived from the accent with CSS relative color syntax
(`oklch(from ...)`) so palette swaps re-tint the whole atmosphere.

## Provenance and measured results

Numbers are copied verbatim from `/var/www/mrkeyoor.com/harness/out/<slug>/results.json`.
A11y columns are critical / serious / moderate / minor counts. Bundle columns are
gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar | first-party | — | — | — | — |
| Hero (structure, orb backdrop) | `tripled-glassmorphism-hero-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 95.8 / 65.4 / 30.4 | 109814 |
| Hero dashboard mock | first-party | — | — | — | — |
| Logo strip | `tripled-glassmorphism-logo-showcase-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 136.4 / 65.4 / 71 | 118069 |
| Features | `tripled-feature-cards-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 93.3 / 65.4 / 27.9 | 134963 |
| Stats / metrics | `tripled-glassmorphism-minimal-metrics-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 137.4 / 65.4 / 72 | 113683 |
| Pricing | `tripled-glassmorphism-pricing-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 95.8 / 65.4 / 30.4 | 115064 |
| Testimonials | `tripled-glassmorphism-testimonials-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 93.2 / 65.4 / 27.8 | 121610 |
| CTA | `tripled-glassmorphism-cta-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 94.8 / 65.4 / 29.4 | 126745 |
| Footer | first-party | — | — | — | — |
| Reveal controller, icons, logo art | first-party | — | — | — | — |

All seven indexed sources have `build.ok` and `mount.ok` true and no recorded overflow at
375 / 768 / 1440 px.

## Adaptation notes

Source structures were kept (frosted panel geometry, blurred orb backdrops, icon wells,
featured pricing tier, quote card footers) while shadcn/ui, lucide-react, and framer-motion
were replaced with first-party glass primitives, inline SVG icons, and an
IntersectionObserver reveal controller so the template ships zero component runtime
dependencies. All copy, data, and artwork were written for Vantage.

Motion: once-only scroll reveals with a 90ms stagger, a one-pass sheen over the hero chart,
funnel bars that grow on first reveal, and hover lift on glass cards. Every animation and
transition is disabled under `prefers-reduced-motion`; content is always visible without
JavaScript-driven motion.

Honest accessibility note: glassmorphism trades some contrast for depth. Body text and
controls sit at AA-contrast values on the base palette, but muted monospace labels over
frosted panels land near the AA boundary, and the low-opacity panel borders are decorative
rather than perceivable structure. Darker custom palettes can push muted text below AA;
audit after any palette swap.

## Build

```bash
npm install
npx vite build
```

Measured production bundle (this commit): `index.html` 0.52 KB gzip + CSS 6.29 KB gzip +
JS 67.33 KB gzip = **74.14 KB gzip total** (budget: under 160 KB).

## Run locally

```bash
npm install
npm run dev
```
