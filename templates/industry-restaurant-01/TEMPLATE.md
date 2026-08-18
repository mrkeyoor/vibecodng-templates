# industry-restaurant-01

Saffron Trail is a modern Indian dining pack derived from `local-business-01`. It keeps the verified component provenance, inline attribution comments, and the four-variable `--bw-*` palette contract.

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
| Hero | `meraki-hero-side-image` | https://github.com/merakiui/merakiui | 0 / 1 / 0 / 0 | 84.2 / 65.4 / 18.8 | 76668 |
| Services | `hyperui-feature-grids-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 83.7 / 65.4 / 18.3 | 22241 |
| Gallery | `tripled-gallery-grid-block-shadcnui` | https://github.com/moumen-soliman/uitripled | 0 / 0 / 1 / 0 | 138.6 / 65.4 / 73.2 | 138733 |
| Testimonials | `meraki-testimonials-full-page-cards` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 84.1 / 65.4 / 18.7 | 53505 |
| Hours + map | `hyperui-contact-forms-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 82.9 / 65.4 / 17.5 | 19685 |
| Booking CTA | `meraki-cta-card` | https://github.com/merakiui/merakiui | 0 / 0 / 0 / 0 | 83.4 / 65.4 / 18 | 87387 |
| Footer | `hyperui-footers-2` | https://github.com/markmead/hyperui | 0 / 0 / 0 / 0 | 92 / 65.4 / 26.6 | 14568 |
| Section reveals | `motion-primitives-in-view` | https://github.com/ibelick/motion-primitives | 0 / 0 / 0 / 0 | 123.5 / 65.4 / 58.1 | 82257 |

Every selected record has indexed `build.ok` and `mount.ok` set to `true`. The source hero's unnamed-link finding is removed by explicit link text and labels. The gallery adaptation uses a single uniquely identified section rather than duplicate unnamed landmarks. Every selected indexed viewport reports no overflow at 375, 768, and 1440 pixels.

## Run locally

```bash
npm install
npm run dev
```

Build with `npx vite build --base=/social/templates/industry-restaurant-01/`.

## Palette

Edit `--bw-accent`, `--bw-surface`, `--bw-text`, and `--bw-muted` in `src/styles.css`, or pass the same four colors through `BW_PALETTE` at build time. The Vite hook mirrors the `landing-01` palette-injection behavior.

## Pack

- Base skeleton: `local-business-01`
- Fictional business: Saffron Trail, Bengaluru
- Default catalog palette: `canyon-dusk`
- Replaced the cafe content with a modern Indian dinner menu, regional sourcing story, reservation flow, dining hours, and INR pricing.
- Reworked the section mix around menu groups, chef-led positioning, guest notes, and a Bengaluru location panel.
- Replaced all remote imagery with original inline SVG dish, map, and identity art.
