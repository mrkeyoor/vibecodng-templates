# ecommerce-01

Loom+Co is a fictional minimal-flat homeware shop. The template is light-first, image-independent, and uses CSS-built product still lifes so it works offline with no remote asset requests.

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
| Hero / story image split | `meraki-feature-grid-list-with-image` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 83.9 / 65.4 / 18.5 | 64476 |
| Product grid | `hyperui-blog-cards-4` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 82.7 / 65.4 / 17.3 | 18865 |
| Brand principles | `hyperui-stats-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.2 / 65.4 / 17.8 | 68051 |
| Testimonial | `meraki-testimonials-slider` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 83.6 / 65.4 / 18.2 | 65017 |
| Journal signup | `meraki-cta-form` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 83.3 / 65.4 / 17.9 | 58661 |
| Footer | `tailark-mist-footer-2` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 117.3 / 65.4 / 51.9 | 99918 |
| Section reveals | `motion-primitives-in-view` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |

Every selected record has indexed `build.ok` and `mount.ok` set to `true`, zero indexed a11y findings, and no overflow at 375, 768, or 1440 pixels.

## Run locally

```bash
npm install
npm run dev
```

Build with `npx vite build`.

## Adaptation notes

Meraki and HyperUI section shapes were retained while the retail story, product cards, and journal capture were rewritten for Loom+Co. CSS-native still lifes replace remote images. Reduced-motion mode keeps all content visible and disables reveals, smooth scrolling, and hover transitions.
