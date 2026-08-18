# style-gradient-glow-01 — "Bloom"

A style-showcase landing page for a fictional creator monetization product.
The direction is gradient-glow: a sunset triad (pink `#FF5DA2`, warm
`#FFB36B`, cool `#9D6BFF`) on deep plum `#160A14`, serif display type, and
soft illumination around every interactive surface.

## Stack

- Vite
- React 19
- Tailwind CSS 4
- No component runtime dependencies

Theme is driven by `--bw-accent`, `--bw-surface`, `--bw-text`, `--bw-muted`;
the two gradient companions (`--glow-warm`, `--glow-cool`) are defined next
to them and derived nowhere else.

## Provenance and measured results

All numbers are copied from each indexed component's
`/var/www/mrkeyoor.com/harness/out/<slug>/results.json` (copies in
`provenance/results/`). A11y columns are critical / serious / moderate /
minor counts. Bundle columns are gzip / baseline gzip / marginal, in KB.
`totalMs` is the recorded harness total.

| Section | Index slug / first-party | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar | `ruixen-hover-gradient-navbar` | https://github.com/ruixenui/ruixen.com | 0 / 0 / 0 / 0 | 126.3 / 65.4 / 60.9 | 92392 |
| Hero backdrop + waves | `tripled-glowy-waves-hero-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 1 / 0 / 0 | 138.3 / 65.4 / 72.9 | 123100 |
| Hero gradient headline | `magicui-animated-gradient-text` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 91.5 / 65.4 / 26.1 | 65970 |
| Hero payout card | first-party | — | — | — | — |
| Feature cards | `magicui-magic-card` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 134.0 / 65.4 / 68.6 | 72398 |
| Stats panel | `tripled-stats-counter-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 1 / 0 / 0 | 139.7 / 65.4 / 74.3 | 210627 |
| Stats count-up | `motion-primitives-animated-number` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 132.6 / 65.4 / 67.2 | 83599 |
| Pricing card borders | `magicui-shine-border` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 91.5 / 65.4 / 26.1 | 73329 |
| Pricing featured tier | `magicui-neon-gradient-card` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 92.6 / 65.4 / 27.2 | 74168 |
| Button shine | `magicui-shiny-button` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 132.5 / 65.4 / 67.1 | 75298 |
| Testimonials | `ruixen-client-carousel-showcase` | https://github.com/ruixenui/ruixen.com | 0 / 1 / 0 / 0 | 92.8 / 65.4 / 27.4 | 76791 |
| CTA spotlight | `tripled-dynamic-spotlight-cta-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 0 / 0 | 129.7 / 65.4 / 64.3 | 305168 |
| Footer wordmark | `ruixen-ruixen-gradient-footer` | https://github.com/ruixenui/ruixen.com | 0 / 0 / 0 / 0 | 83.5 / 65.4 / 18.1 | 86792 |
| Reveal controller, copy, icons, SVG waves | first-party | — | — | — | — |

Indexed caveats preserved honestly: `ruixen-client-carousel-showcase`
recorded overflow at 375 and 768 (fixed-width moving track); this adaptation
keeps the card content but lays it in a fluid grid, so nothing scrolls
sideways and nothing loops. The serious contrast findings on the two tripled
blocks came from their low-contrast gray copy; the adaptation uses
`--bw-muted` `#C4A3B4` on `#160A14` (7.6:1). The indexed animated gradient
text and shiny button loop forever; here the headline gradient sweeps once
on reveal and the shine passes once per hover.

## Build

```
npx vite build
dist/index.html                 0.71 kB │ gzip:  0.42 kB
dist/assets/index-*.css        24.68 kB │ gzip:  5.49 kB
dist/assets/index-*.js        210.73 kB │ gzip: 66.11 kB
```

Total gzip: **72.02 KB** (budget 160 KB).

## Honest costs

- Glow layers cost paint time. Every soft halo here is a colored
  `box-shadow` or a static radial gradient: painted once, cheap to scroll,
  but the hero stacks three radial fields and the nav adds
  `backdrop-filter: blur(16px)`, which repaints under every scrolled frame.
- The featured pricing card originally used the indexed blurred
  pseudo-element halo; the reveal transform's stacking context lifted that
  blur above the card background, so it was replaced with layered
  box-shadows. Documented because it is a real interaction between reveal
  transforms and negative z-index glow layers.
- Magic-card and CTA spotlights write two CSS custom properties per
  pointermove while hovered. No idle cost, but it is main-thread work during
  hover.
- Nothing loops. Reveals and count-ups run once per view; shine and
  spotlight respond to hover only. All of it is disabled under
  `prefers-reduced-motion` via the global reduce block.

## Run locally

```bash
npm install
npm run dev
```
