# portfolio-01

Mira Vale is a fictional independent designer portfolio with an editorial, light-first art direction. The page uses a warm paper surface, a single vermilion accent, and custom CSS still lifes instead of remote assets.

## Stack

- Vite
- React 19
- Tailwind CSS 4
- No component runtime dependencies

## Provenance and measured results

All numbers below are copied from each selected index component's `provenance/results/<slug>.json`. A11y columns are critical / serious / moderate / minor. Bundle columns are gzip / baseline gzip / marginal, in KB. `totalMs` is the recorded harness total.

| Section | Index slug | Author repository | A11y C/S/M/m | Bundle KB gzip/base/marginal | totalMs |
|---|---|---|---:|---:|---:|
| Navbar | `hyperui-headers-4` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 84.5 / 65.4 / 19.1 | 18133 |
| Hero highlighter | `magicui-highlighter` | https://github.com/magicuidesign/magicui | 0 / 0 / 0 / 0 | 87.1 / 65.4 / 21.7 | 92769 |
| Selected work | `hyperui-blog-cards-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 82.9 / 65.4 / 17.5 | 15182 |
| Practice grid | `hyperui-feature-grids-1` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.3 / 65.4 / 17.9 | 28407 |
| Testimonial | `meraki-testimonials-centered` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 83.8 / 65.4 / 18.4 | 53269 |
| CTA | `hyperui-ctas-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.4 / 65.4 / 18 | 24801 |
| Footer | `hyperui-footers-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 92 / 65.4 / 26.6 | 14568 |
| Section reveals | `motion-primitives-in-view` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |

Every selected record has indexed `build.ok` and `mount.ok` set to `true`, zero indexed a11y findings, and no overflow at 375, 768, or 1440 pixels.

## Run locally

```bash
npm install
npm run dev
```

Build with `npx vite build`.

## Adaptation notes

Source structures were retained while copy, spacing, palette, and imagery were rebuilt for Mira Vale. All art is CSS-native. Reveals run once with a restrained stagger; reduced-motion mode disables reveals, smooth scrolling, and transitions while leaving all content visible.
