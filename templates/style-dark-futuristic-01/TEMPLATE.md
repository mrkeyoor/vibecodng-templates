# style-dark-futuristic-01 — "Blacksite"

A style-showcase landing page for a fictional wire-level security monitoring
product. The direction is cyber-terminal: all-mono typography, a static
scanline film, corner-bracket reticles, threat-red `#FF4545` on near-black
`#050607`. Deliberately distinct from the dark+lime SaaS look of `landing-01`.

## Stack

- Vite
- React 19
- Tailwind CSS 4
- No component runtime dependencies

Theme is driven by `--bw-accent`, `--bw-surface`, `--bw-text`, `--bw-muted`.

## Provenance and measured results

All numbers are copied from each indexed component's
`/var/www/mrkeyoor.com/harness/out/<slug>/results.json` (copies in
`provenance/results/`). A11y columns are critical / serious / moderate / minor
counts. Bundle columns are gzip / baseline gzip / marginal, in KB. `totalMs`
is the recorded harness total.

| Section | Index slug / first-party | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar + hero skeleton | `tailark-dusk-hero-section-3` | https://github.com/tailark/blocks | 0 / 1 / 3 / 0 | 134.2 / 65.4 / 68.8 | 108052 |
| Hero headline scramble | `motion-primitives-text-scramble` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.7 / 65.4 / 58.3 | 80706 |
| Hero flicker field | `magicui-flickering-grid` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 92.6 / 65.4 / 27.2 | 82107 |
| Hero live terminal | first-party | — | — | — | — |
| Features | `tailark-dusk-features-6` | https://github.com/tailark/blocks | 0 / 1 / 0 / 0 | 91.4 / 65.4 / 26.0 | 118454 |
| Detections showcase | first-party | — | — | — | — |
| Stats | `tailark-dusk-stats-2` | https://github.com/tailark/blocks | 0 / 1 / 0 / 0 | 83.1 / 65.4 / 17.7 | 122364 |
| Stats count-up | `motion-primitives-animated-number` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 132.6 / 65.4 / 67.2 | 83599 |
| Pricing | `tailark-dusk-pricing-1` | https://github.com/tailark/blocks | 0 / 1 / 0 / 0 | 116.7 / 65.4 / 51.3 | 98478 |
| FAQ | `tailark-dusk-faqs-1` | https://github.com/tailark/blocks | 0 / 1 / 0 / 0 | 123.2 / 65.4 / 57.8 | 104010 |
| CTA | `tailark-dusk-call-to-action-1` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 115.4 / 65.4 / 50.0 | 95837 |
| Footer | `tailark-dusk-footer-1` | https://github.com/tailark/blocks | 0 / 1 / 0 / 0 | 117.1 / 65.4 / 51.7 | 100442 |
| Scanlines, reticles, reveal controller | first-party | — | — | — | — |

Indexed caveats preserved honestly: most tailark dusk blocks carry one serious
color-contrast finding in the index; this adaptation replaces the offending
low-contrast grays with `--bw-muted` `#848E95` on `#050607` (7.0:1).
`tailark-dusk-features-6` recorded overflow at 375 and 768 in the harness
(fixed card widths); the adaptation uses fluid grid tracks and shows no
overflow at 375, 768, or 1440. `magicui-flickering-grid` recorded overflow at
375; the adaptation sizes the canvas to its container.

## Build

```
npx vite build
dist/index.html                 0.70 kB │ gzip:  0.41 kB
dist/assets/index-*.css        22.91 kB │ gzip:  5.24 kB
dist/assets/index-*.js        215.07 kB │ gzip: 67.40 kB
```

Total gzip: **73.05 KB** (budget 160 KB).

## Honest costs

- The fixed scanline layer uses `mix-blend-mode: multiply` over the whole
  viewport: one extra full-screen composite, always. It is static (never
  animated), so the cost is composite-only, not repaint.
- The flicker field is a canvas that repaints about 2% of its cells every
  240ms, and only while the hero is on screen (IntersectionObserver gates the
  interval). The indexed original repaints every cell every frame; this
  adaptation trades that fidelity for idle-friendly paint cost.
- The sticky nav uses `backdrop-filter: blur(14px)`, which costs paint on
  every scrolled frame under it.
- The headline scramble and stat count-ups run once (mount / first view) and
  never loop. The only perpetual animation is the 1Hz terminal cursor blink
  and the 1Hz UTC clock text; both stop under `prefers-reduced-motion`, as
  does everything else via the global reduce block.

## Run locally

```bash
npm install
npm run dev
```
