# agency-studio-01

Blunt Object is a complete neo-brutalist landing template for a fictional independent design studio. It mirrors the `landing-01` pattern with section-level files, indexed attribution comments, copied verification records, palette injection, substantive copy, responsive layouts, and reduced-motion behavior.

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
| Navigation | `neobrutalism-navigation-menu` | https://github.com/ekmas/neobrutalism-components | 0 / 0 / 0 / 0 | 91.7 / 65.4 / 26.3 | 12658 |
| Hero | `tailark-mist-hero-section-5` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 130.2 / 65.4 / 64.8 | 101031 |
| Work cards | `neobrutalism-image-card` | https://github.com/ekmas/neobrutalism-components | 0 / 0 / 0 / 0 | 76.9 / 65.4 / 11.5 | 9254 |
| Work grid | `tripled-gallery-grid-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 1 / 0 | 138.6 / 65.4 / 73.2 | 138733 |
| Capabilities | `hyperui-feature-grids-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.7 / 65.4 / 18.3 | 22241 |
| Manifesto | `tailark-mist-content-3` | https://github.com/tailark/blocks | 0 / 0 / 0 / 0 | 89.5 / 65.4 / 24.1 | 136898 |
| Contact | `hyperui-contact-forms-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 82.9 / 65.4 / 17.5 | 19685 |
| Footer | `efferd-footer-2` | https://github.com/shabanhr/efferd-ui | 0 / 0 / 0 / 0 | 130.4 / 65.4 / 65 | 225182 |
| Section reveals | `motion-primitives-in-view` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |

Every selected record has indexed `build.ok` and `mount.ok` set to `true`. The source gallery's moderate duplicate-landmark finding is removed: this adaptation exposes one named work section and uses ordinary project links inside it. Every selected indexed viewport reports no overflow at 375, 768, and 1440 pixels.

## Run locally

```bash
npm install
npm run dev
```

Build the production bundle with `npm run build`.

## Palette

Edit `--bw-accent`, `--bw-surface`, `--bw-text`, and `--bw-muted` in `src/styles.css`, or provide the four values through `BW_PALETTE` at build time. Borders, shadows, work surfaces, and selection color follow those tokens.

## Adaptation notes

The visual system deliberately uses hard three-pixel rules, offset shadows, high-contrast color fields, tight grotesk type, and dense editorial grids. All project imagery is CSS-native, avoiding external media and keeping the template portable. Motion is limited to the discipline ticker, once-only section reveals, and direct hover feedback. Reduced motion stops the ticker and removes reveal and hover transforms without hiding content.
