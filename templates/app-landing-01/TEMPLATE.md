# app-landing-01

Petal is a complete claymorphic app landing template for a fictional gentle habit tracker. It mirrors the `landing-01` assembly pattern and prominently adapts the first-party components in `/var/www/sir-originals`: clay cards, buttons, badges, and progress surfaces appear across the hero, feature grid, and download CTA.

## Stack

- Vite
- React 19
- Tailwind CSS 4
- No component runtime dependencies
- MIT license

## Provenance and measured results

Numbers are copied from each indexed component's `results.json`. A11y is critical / serious / moderate / minor. Bundle is gzip / baseline gzip / marginal in KB. `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Header | `hyperui-headers-4` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 84.5 / 65.4 / 19.1 | 18133 |
| Hero structure | `tailark-mist-hero-section-5` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 130.2 / 65.4 / 64.8 | 101031 |
| Phone frame | `ruixen-phone-mockup-card` | https://github.com/ruixenui/ruixen.com | 0 / 0 / 0 / 0 | 126.1 / 65.4 / 60.7 | 110887 |
| Clay cards | `clay-card` | `mrkeyoor/sir-originals` | 0 / 0 / 0 / 0 | 86.6 / 65.4 / 21.2 | 73862 |
| Clay buttons | `clay-button` | `mrkeyoor/sir-originals` | 0 / 0 / 0 / 0 | 86.4 / 65.4 / 21 | 69149 |
| Clay badges | `clay-badge` | `mrkeyoor/sir-originals` | 0 / 0 / 0 / 0 | 83.3 / 65.4 / 17.9 | 55341 |
| Clay progress | `clay-progress` | `mrkeyoor/sir-originals` | 0 / 0 / 0 / 0 | 83.4 / 65.4 / 18 | 54445 |
| Feature grid | `tailark-mist-features-2` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 95.8 / 65.4 / 30.4 | 101286 |
| Screens carousel | `cultui-feature-carousel` | https://github.com/nolly-studio/cult-ui | 0 / 0 / 0 / 0 | 144.1 / 65.4 / 78.7 | 114725 |
| Download CTA | `meraki-cta-card` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 83.4 / 65.4 / 18 | 87387 |
| Footer | `hyperui-footers-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 92 / 65.4 / 26.6 | 14568 |
| Section reveals | `motion-primitives-in-view` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |

Every selected record has indexed `build.ok` and `mount.ok` set to `true`; all copied records report zero indexed accessibility findings. The carousel is implemented with native React state and CSS rather than importing its source runtime, and it is contained at narrow widths. The 768px capture is 768px wide with no page overflow.

## Run locally

```bash
npm install
npm run dev
```

Build the production bundle with `npm run build`.

## Palette

Edit `--bw-accent`, `--bw-surface`, `--bw-text`, and `--bw-muted` in `src/styles.css`, or provide them through `BW_PALETTE` at build time. Derived clay highlights, pastels, and shadows use `color-mix()` so the complete visual system follows the four base variables.

## Adaptation notes

The copied clay components remain dependency-free and keep their original inset-highlight / inset-shadow construction. Petal adds a custom phone screen, three selectable screenshot states, substantive habit-tracking copy, and keyboard-operable carousel selection. Reduced motion disables orbit rotation, smooth scrolling, staggered reveals, and animated transforms while preserving every screen and control.
